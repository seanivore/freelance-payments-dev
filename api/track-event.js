/**
 * Vercel Serverless Function
 * Tracks user events (contract loaded, scrolled, invoice viewed, downloads, etc.)
 * 
 * POST /api/track-event
 * Body: { job_id: string, event_type: "batch", event_data: Array<{type: string; timestamp: string; data: any}> }
 * 
 * Queues events for batch processing to update state.client_status in JSON files (v4 schema)
 */

export default async (req, res) => {
  // CORS configuration - allow requests from frontend domain
  const allowedOrigins = [
    'https://dev.payments.august.style',
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000'  // Common dev port
  ];
  
  const origin = req.headers.origin;
  const isAllowedOrigin = origin && allowedOrigins.includes(origin);
  
  // Handle preflight OPTIONS request FIRST - before any other logic
  if (req.method === 'OPTIONS') {
    try {
      // Always allow OPTIONS requests (preflight) - set CORS headers
      if (isAllowedOrigin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
      }
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Max-Age', '86400');
      return res.status(200).json({});
    } catch (error) {
      // If there's an error, still try to return with CORS headers
      if (isAllowedOrigin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
      }
      return res.status(200).json({});
    }
  }
  
  // For actual requests (POST, GET), set CORS headers and validate origin
  if (isAllowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Reject if origin not allowed (for non-OPTIONS requests)
  if (!isAllowedOrigin) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Handle both application/json and text/plain (from sendBeacon)
    // sendBeacon uses text/plain to avoid CORS preflight, but body is still JSON
    let body = req.body;
    const contentType = req.headers['content-type'] || '';
    
    if (contentType.includes('text/plain') && typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (parseError) {
        return res.status(400).json({ error: 'Invalid JSON in text/plain body' });
      }
    }
    
    const { job_id, event_type, event_data } = body;

    // Validate required fields
    if (!job_id) {
      return res.status(400).json({ error: 'job_id is required' });
    }

    if (event_type !== 'batch') {
      return res.status(400).json({ error: 'event_type must be "batch"' });
    }

    if (!Array.isArray(event_data) || event_data.length === 0) {
      return res.status(400).json({ error: 'event_data must be a non-empty array' });
    }

    // Trigger GitHub Actions workflow to update state
    const githubToken = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO || 'seanivore/freelance-payments-dev';
    const workflowId = 'user-exit-events.yml';

    // Debug: Log what we're attempting (mask token for security)
    const dispatchUrl = `https://api.github.com/repos/${repo}/actions/workflows/${workflowId}/dispatches`;
    console.log(`🔧 DEBUG: Dispatching to URL: ${dispatchUrl}`);
    console.log(`🔧 DEBUG: GITHUB_REPO env: "${process.env.GITHUB_REPO}" (using: "${repo}")`);
    console.log(`🔧 DEBUG: Token present: ${!!githubToken}, length: ${githubToken?.length || 0}`);

    if (githubToken) {
      try {
        const eventsArray = event_data;

        // Dispatch single workflow run with all events
        // GitHub API expects just the workflow filename, not the full path
        const githubResponse = await fetch(
          dispatchUrl,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${githubToken}`,
              'Accept': 'application/vnd.github+json',
              'Content-Type': 'application/json',
              'X-GitHub-Api-Version': '2022-11-28'
            },
            body: JSON.stringify({
              ref: 'freelance-payments',
              inputs: {
                job_id: job_id,
                payload_json: JSON.stringify(eventsArray) // All events in one payload
              }
            })
          }
        );

        if (!githubResponse.ok) {
          const errorText = await githubResponse.text();
          console.warn(`🔧 DEBUG: GitHub API response status: ${githubResponse.status}`);
          console.warn('GitHub Actions trigger failed:', errorText);
          // Don't fail the request - event is still logged
        } else {
          console.log(`✅ Dispatched workflow with ${eventsArray.length} event(s) for job ${job_id}`);
        }
      } catch (githubError) {
        console.warn('Error triggering GitHub Actions:', githubError);
        // Don't fail the request - event is still logged
      }
    }

    // Return success (event will be processed by GitHub Actions)
    res.status(200).json({
      success: true,
      message: 'Event tracked and queued for processing',
      event_count: event_data.length
    });

  } catch (error) {
    console.error('Error tracking event:', error);
    res.status(500).json({
      error: 'Failed to track event',
      message: error.message,
    });
  }
};
