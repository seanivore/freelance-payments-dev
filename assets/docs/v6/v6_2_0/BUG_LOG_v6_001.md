# Bug Log v6.001

## Logging Instructions for AI Agents

This log tracks bugs and fixes during v6 development environment setup. Follow these conventions:

- **File Naming**: `BUG_LOG_v6_XXX.md` where XXX is the log number (001, 002, etc.)
- **Bug Numbering**: `BUG_v6_XXX_YYY` where XXX matches log number, YYY is sequential bug count
- **Content**: Keep entries concise - include observed behavior, expected behavior, root cause, and fixes implemented
- **Additional Details**: Log any relevant technical details, console errors, workflow runs, commit hashes, or related context

---

# Bug Log v6.001 - Development Environment Setup

**Created**: 2026-01-29
**Last Updated**: 2026-01-29
**Status**: Partially Resolved (1 open bug)

**Context**:

Setting up `freelance-payments-dev` as a duplicate development repository cloned from `freelance-payments` (production). The dev environment uses:
- Frontend: `dev.payments.august.style` (GitHub Pages)
- Backend: `freelance-payments-dev.vercel.app` (Vercel)
- Stripe: Test mode keys

---

## BUG_v6_001_001 - GitHub Actions Workflow Dispatch Returns 404

**Reported**: 2026-01-29
**Status**: RESOLVED

### Observed Behavior

- Frontend events were collected and sent to `/api/track-event` on Vercel
- Vercel received the events (200 response to client)
- GitHub Actions workflow dispatch failed with 404 error:
  ```
  "GitHub Actions trigger failed: { \"message\": \"Not Found\", \"status\": \"404\" }"
  ```
- `admin-push.yml` workflow (triggered by git push) worked correctly
- `user-exit-events.yml` workflow (triggered by API dispatch) failed

### Expected Behavior

The `/api/track-event` endpoint should successfully dispatch the `user-exit-events.yml` workflow via GitHub API.

### Initial Investigation

Verified the following were correctly configured:
- `GITHUB_TOKEN` in Vercel - Classic PAT with `repo` and `workflow` scopes, 40 characters
- `GITHUB_REPO` in Vercel - Set to `seanivore/freelance-payments-dev`
- Workflow file exists at `.github/workflows/user-exit-events.yml`
- Workflow has `workflow_dispatch` trigger with correct inputs
- API URL in `track-event.js` using correct workflow filename

### Root Cause

**GitHub had not indexed the `user-exit-events.yml` workflow for API dispatch.**

When a repository is cloned/copied, GitHub does not automatically index all workflows for API dispatch. The workflow file existed in the repository, but GitHub's Actions system had not registered it as dispatchable via the API.

**Key Evidence**:
- Navigating to `https://github.com/seanivore/freelance-payments-dev/actions`
- Only `Admin Push Workflow` appeared in the left sidebar
- `User Exit Events` was **not listed** despite the workflow file existing

This explains why:
- `admin-push.yml` worked (triggered by push events, not API dispatch)
- `user-exit-events.yml` failed with 404 (GitHub didn't know it existed for API purposes)

### Why This Happened

GitHub indexes workflows when:
1. A workflow file is **created** in the repository
2. A workflow file is **modified** (any edit triggers re-indexing)
3. A workflow runs for the first time

When cloning a repository, the workflow files are copied but GitHub treats them as "already existing" - no creation event fires, so no indexing occurs. The workflow exists in the filesystem but isn't registered in GitHub's workflow dispatch registry.

### Fix Applied

**Force GitHub to re-index the workflow by making any edit to the file:**

```yaml
# Added comment to .github/workflows/user-exit-events.yml
name: User Exit Events
# Force GitHub to index this workflow   <-- Added this line

# TRIGGER=user-exit-events
```

**Commit**: `b4c9ee5` - "Force GitHub to index user-exit-events workflow + add debug logging"

### Verification

After pushing the edit:
1. Navigated to `https://github.com/seanivore/freelance-payments-dev/actions`
2. `User Exit Events` now appeared in the left sidebar
3. "Run workflow" button was available
4. Tested frontend event tracking:
   ```
   📝 Event queued: logged_in, buffer size: 1
   📝 Event queued: contract_signed, buffer size: 2
   🔧 DEBUG: Dispatching to URL: https://api.github.com/repos/seanivore/freelance-payments-dev/actions/workflows/user-exit-events.yml/dispatches
   🔧 DEBUG: Token present: true, length: 40
   ✅ Dispatched workflow with 2 event(s) for job uid-mrl-500
   ```
5. Workflow ran successfully and updated JSON file

### Additional Notes

**Debug logging added during investigation** (left in place for dev environment):

`api/track-event.js`:
```javascript
console.log(`🔧 DEBUG: Dispatching to URL: ${dispatchUrl}`);
console.log(`🔧 DEBUG: GITHUB_REPO env: "${process.env.GITHUB_REPO}" (using: "${repo}")`);
console.log(`🔧 DEBUG: Token present: ${!!githubToken}, length: ${githubToken?.length || 0}`);
```

`src/App.tsx`:
```javascript
console.log(`📝 Event queued: ${type}, buffer size: ${eventBufferRef.current.length}`);
console.log(`🚀 sendEvents called: ${events.length} events, useBeacon: ${useBeacon}`);
console.log(`🚪 handleUnload triggered, buffer size: ${eventBufferRef.current.length}`);
```

---

## Future Prevention

When copying/cloning this repository to create new environments:

1. **After cloning, make a trivial edit to ALL workflow files that use `workflow_dispatch`**
2. Push the changes to trigger GitHub to index the workflows
3. Verify workflows appear in the Actions tab sidebar before testing API dispatch
4. The "Run workflow" button in the Actions UI confirms the workflow is indexed

### Workflows Requiring This Treatment

| Workflow | Trigger Type | Needs Indexing for API? |
|----------|--------------|-------------------------|
| `admin-push.yml` | `push` | No (push-triggered) |
| `user-exit-events.yml` | `workflow_dispatch` | **Yes** |

---

## Related Commits

| Commit | Description |
|--------|-------------|
| `b4c9ee5` | Force GitHub to index user-exit-events workflow + add debug logging |
| `ddf708e` | Add frontend debug logging for event tracking |

---

## Lessons Learned

1. **GitHub workflow indexing is not automatic for cloned repos** - Workflow files must be modified (even trivially) to be registered for API dispatch
2. **Push-triggered vs API-triggered workflows behave differently** - A workflow can work via push but fail via API if not indexed
3. **404 from GitHub Actions API usually means the workflow isn't registered** - Not that the file doesn't exist
4. **Debug logging is valuable** - The logs helped confirm the fix worked immediately

---

## BUG_v6_001_002 - Missing `contract_signed` and `invoice` Events

**Reported**: 2026-01-29
**Status**: OPEN - TO BE INVESTIGATED

### Observed Behavior

During testing, some events were recorded while others were skipped:
- `logged_in` - **Recorded** ✅
- `contract_signed` - **Skipped** ❌
- `invoice` - **Skipped** ❌
- `payment_1` - **Recorded** ✅

### Expected Behavior

All four events should be recorded in the JSON file with timestamps.

### Similar Issue

This matches the pattern from **BUG_06_001** in `v5/v5_6_0/LOG_06.md`:
- Same symptom: middle events (`contract_signed`, `invoice`) lost
- First event (`logged_in`) and payment event (`payment_1`) recorded
- Events were likely buffered but lost before flush

### Potential Causes (from v5 investigation)

1. **Back navigation cleared buffer**: React re-render reset `eventBufferRef`
2. **Stripe redirect timing**: Redirect occurred before buffer flushed
3. **Session storage dedup false positive**: `shouldSkipFlush` hash check incorrectly skipped
4. **Unified flush not triggering**: Payment completion should flush all buffered events together

### Root Cause Hypothesis

The `payment_1` event triggers a unified flush that should include all buffered events. If `contract_signed` and `invoice` were in the buffer, they should have been sent together with `payment_1`. Their absence suggests either:
1. Events never made it to the buffer (queueing issue)
2. Buffer was cleared before payment flush (premature flush or navigation)
3. Events were in buffer but excluded from the unified flush payload

### Investigation Steps (for next session)

1. Check browser console logs for `📝 Event queued:` messages during contract signing and invoice acknowledgment
2. Check if `📊 Sending all events in one batch:` log shows all expected events
3. Review the unified flush logic in `App.tsx` around payment completion
4. Test with network tab open to see actual payload sent to `/api/track-event`

### Notes

- This is a recurring pattern from v5 that may not have been fully resolved
- The v5 fix involved unified flush on payment completion - verify this is working correctly
- Debug logging is already in place which should help investigation

---

*This issue may recur when promoting updates from dev to production if workflow files are copied without modification. Always verify workflows appear in the Actions sidebar after copying.*
