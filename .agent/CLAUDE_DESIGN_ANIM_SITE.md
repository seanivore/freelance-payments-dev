# Claude Design Tutorial 

**Updated**: 2026-05-18 **Tool**: `claude.ai/design` **Status**: Confirm resources to use

---

## Resources 

| Resource                           | Access                                        |
| ---------------------------------- | --------------------------------------------- |
| Animated website templates         | `motionsites.ai/`                             |
| Free looped backgrounds            | `motionsites.ai/backgrounds`                  |
| API Nano Banana 2 image generation | `aistudio.google.com`                         |
| API video generation by Kling 3.0  | Also in Google Studio                         |
| Seed Dance 2                       | `{find resource}`                             |
| Website design gallery             | `land-book.com`                               |
| Original tutorial guide            | `x.com/viktoroddy/status/2045492112054165813` |

### Creative Process 

  1. Find an example website that you like the 'bones' of but will update the visuals
  2. Create an image to use for generating a looping, animated video background
  3. Provide both to Claude to have the site generated
  4. Check the mobile version before repeating the process for the next section

### Following Tutorial Video

  1. Go to Claude Design > Select "Other" > Name the project.
  2. Find example site
     - See "Animated website templates"
     - Consider typography and UI
     - Plan to change visual imagery
     - Plan to remake UI elements based on needs
  3. Copy/paste site details into Claude
     > Build this out but do not add any of the video elements, we'll replace those later. 
  4. Find background video to replace the original
     - See "Animated Video Backgrounds"
     - Try prompting Nano Banana 2
     > *EXAMPLE*: A single amorphous translucent blob floating in deep black space; organic shape resembling a soft liquid droplet with smooth rounded contours; slightly asymmetrical like a stretched bubble. The surface is glass-like and semi-transparent with strong subsurface scattering. Edges glow with bright white rim lighting, creating a halo effect. The interior shows subtle iridescent rainbow refractions in blue, gold, orange, and hints of violet, appearing similar to oil-on-water interference. The center remains darker and slightly opaque. Lighting is cinematic and minimal with one strong light source from the left creating a bright highlight with subtle reflections across the surface. The background is pure black with faint tiny star-like specks scattered sparsely. Texture is ultra-smooth, glossy, like a liquid-glass material with high reflectivity and soft gradients. The blob appears weightless and suspended. Composition is centered horizontally and slightly lower than the vertical center, occupying roughly 40-50% of the frame width. Depth of field is shallow with soft focus edges and slight bloom/glow on highlights. Style is hyper-realistic 3D render, abstract, cinematic, high dynamic range, Octane/Redshift render style, ultra clean, minimal aesthetic. 
  5. Use generated image to create animated visual
     - Try Seed Dance 2 or other tool with settings: 1080p 7.0s 16:9
     > *EXAMPLE*: Create video animation like this but without any text of ui element. I just want the animated background looping animation. No camera movement, no extra element to be added, no zoom in and no zoom out, looping animation.
  6. Provide .mp4 for Claude to Replace Animation
     - Likely will want to upload directly to CDN already if there is one for the project and provide that URL
     > *EXAMPLE*: Replace the video background to be this one.
  7. Find UI elements from website screenshot example
     - Try searching on Dribbble, or continue on provided resources from above
     - Take screenshots just to show what is wanted to Claude 
     - In the tutorial he zoomed into a random website to copy a random block with unrelated text 
  8. Provide the UI element example to Claude to create
     - Provide the screenshot of the UI element you want to add
     > *EXAMPLE*: Add these two UI elements under the text in our hero section. Position them nicely under the content. Update their color so that they have the same liquid glass appearance as the nav bar and buttons above. The text should be white. 
  9. Preview mobile version of website
     - Ensure it is good before moving forward
  10. Next section provided to Claude
     - Tutorial followed similar flow as before
     - They found an image they liked on Pinterest and asked Nano Banana 2 to create it without text and other elements
     > *EXAMPLE*: Create an image like this in 8k. Remove the text, buttons, any logos. We just want the background with the same positioning. No zoom in or out. Give the image a plane black background. 
     - Then they referenced the resulting image along with the first section's animation image 
     > *EXAMPLE*: Make the second attached image into the same style as the first image. The background and texture should be the same, and it should otherwise look similar while maintaining the composition. 
     > *EXAMPLE*: Create for me a second image but in the same style as the first image. 
     > *EXAMPLE*: Remake the second image with the same background and color as the first image. We just want to copy the style of the first image and apply it to the new image without loosing too much of what looks great in the new image.
     - Then he used the resulting image and animated it, this time using Kling 3.0 with the settings at 1080p 12.0s 16:9
     - He further edited the image first, generative expanding it. 
     > *EXAMPLE*: Looping animation. No camera movement or extra elements should be added. No zooming in or out. 
     > *EXAMPLE*: Animate this.
     - Finally, he used the original example image, this time having Nano Banana 2 adapt it to just show text and UI cards, etc.
     > *EXAMPLE*: Create me an image like this in 8k using the same layout of the text. Remove the background and just keep the text and any cards and icons on plain black background. I don't want the background from the image. 
     - The result looked like a wireframe which was provided to Claude with the video URL of the new section background
     > *EXAMPLE*: Build out this section as it is, under the hero section. Here is the background video URL. 
