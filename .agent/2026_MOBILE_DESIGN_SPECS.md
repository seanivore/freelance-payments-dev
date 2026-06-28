# Mobile & Tablet Design Best Practices 

**CONTENT**: 2026 iOS, iPadOS Viewport Design Specification 
**MEASUREMENTS**: All measurements are approximate or have implied flex room 
**DOCUMENT**: Update this document to perfect it over time 

## About Mobile-First Designs 

* **The way 'mobile-first' is used colloquially is often not actually mobile-first** 
  
  - Button hover states and planned but can't be seen on mobile 
  - Layout doesn't feel intentional for the portrait aspect ratio 
  - Landscape isn't considered thoroughly, etc. 

---

## iPhone Standards 

### Measurements 

  + The 2026 web mobile viewport 
    - 393px x 852px CSS pixels 
    - Or around 375px x 812px 
  + From top: 
    - Status bar = 54px 
    - Navigation bar = 96px, excluding search bar 
  + From bottom: 
    - Home indicator = 21px
    - Tab bar = 83px 
  + From left and right = 16px margins 

![iOS Viewport Measurement Diagram](/.agent/apple-ui-design/ios-viewport-measurements.jpeg)

### Navigation 

  + Tabs at the bottom of the viewport 
    - No more than 5 tabs 

### Thinking Visually  

  1. Always be thinking of placement in a portrait
    + GOOD: One pie chart or graph with a dropdown to change the metric that is being viewed 
    + BAD: A row of pie charts simply made vertical or worse, not altered at all 
    + MEDIOCRE: Horizontal scrolling row of pie charts 
    + AMAZING: Don't plan the desktop layout first at all 

  2. Using landscape must FEEL intentional so the viewer intuits 
    + User knows they're clicking through to more formal or comprehensive content
      - Consider onscreen UI prompting user to turn device, only visible if they didn't
      - UI disappears quickly in case they don't want to 

  3. Design for fluidity and unexpected flexibility
    + Viewport measurements are **NOT** strict; apply the following principles instead 
      - Width, consider narrower squeeze: Make sure there is no layout shifting
      - Width, consider wider expansion: No huge enlarging image along with VW type expansion, instead add narrow column next to it, or just allow the subject more white space on the sides 
      - Height, almost completely subjective, wholely depending on the content; do not use "below the fold" principle and instead create a vertical scrollable experience 

    + Example of vertical scrollable experience **ANIMATIONS** to apply:
      - Content dipping just a bit below fold or near it depending on viewport? Make it smaller, and then add an animation so that as you scroll down the padding above the content expands MUCH slower than the scroll so that you end with a layout with nice whitespace expanded padding 
      - Then the next animation phase, as you add details below the subject, the subject now slowly shrinks as you scroll down so that it can stay in the frame with the content even longer than it otherwise would 

  4. Use proper format of images 
    + Make sure all designs use high-density, vector-based assets 
      - Only fallback to @3x images if that is the only option 
      - Note that @3x images account for a device pixel ratio (DPR) and maintains sharpness on retina screens

---

## iPad Standard

  + Two navigation options for both portrait and landscape oriented device screens. 

### iPad Sidebar vs. Tab Bar Navigation

  + **Sidebar** 
    - Can display many items for efficient navigation, including room to allow users to customize sidebar items, or to include actions like adding, drag and drop, etc. 

  + **Tab Bar** 
    - Maintains screen state so user can quickly move between tabs; less room so primarily used to support navigation between high-level sections (tabs) 

![iPad Illustrated Navigation Options](/.agent/apple-ui-design/art-ipad-navigation.jpeg)

### Choosing iPad Navigation 

```plaintext
                               ┌──────────────────────────┐
                               │           iPad           │
                               └──────────────────────────┘
                                │                        │
                   ┌─────────────┐                      ┌──────────────┐
                   │   Sidebar   │                      │   Tab Bar    │
                   └─────────────┘                      └──────────────┘
                    │           │                        │            │
          ┌───────────┐        ┌───────────┐        ┌───────────┐  ┌───────────┐
          │ Portrait  │        │ Landscape │        │ Portrait  │  │ Landscape │
          └───────────┘        └───────────┘        └───────────┘  └───────────┘
          │          │          │         │
┌───────────┐ ┌──────────┐ ┌───────────┐ ┌──────────┐     
│ Collapsed │ │ Expanded │ │ Collapsed │ │ Expanded │
└───────────┘ └──────────┘ └───────────┘ └──────────┘
  *default*                                *default*
```

### iPad Sidebar Navigation 

  1. Portrait Mode with collapsing/expanding sidebar

    + Measurements 
      - 768px wide and 1024px tall
    + From top: 
      - Status bar 24px tall 
      - Window grabber 24px height 
      - Navigation bar 93px tall, excluding search bar 
    + Navigation bar 
      - Sidebar Icon to expand or collapse sidebar 
      - Icon size 31px wide and 22px tall
    + From bottom: 
      - Home indicator = 19.5px tall  
    + Left and right side margins = 24px wide 

    + In portrait mode when sidebar is expanded the UI layout guidelines remain the same because sidebar acts as overlay on top of screen contents 
    + Expanded sidebar = 320px wide and spans entire height of screen from top to bottom, including status bar and home indicator areas 
    + Any color applied to the sidebar will be the background color for the status bar and home indicator areas as well 
    + Sidebar icon should be placed on top of the expanded sidebar 

![iPad Sidebar Portrait Measurement Diagram](/.agent/apple-ui-design/ipados-sidebar-portrait-expand-hidden.jpeg)

  1. Landscape Mode with collapsing/expanding sidebar 

    + Measurements 
      - 1024px wide and 768px tall
    + From top: 
      - Status bar 24px tall 
      - Window grabber 24px height 
      - Navigation bar 93px tall, excluding search bar 
    + Navigation bar 
      - Sidebar Icon to expand or collapse sidebar 
      - Icon size 31px wide and 22px tall
    + From bottom: 
      - Home indicator = 19.5px tall  
    + Left and right side margins = 24px wide 

    + In landscape mode when sidebar is expanded the UI layout guidelines remain the same because sidebar acts as overlay on top of screen contents 
    + Expanded sidebar = 320px wide and spans entire height of screen from top to bottom, including status bar and home indicator areas 
    + Any color applied to the sidebar will be the background color for the status bar and home indicator areas as well 
    + Sidebar icon should be placed on top of the expanded sidebar 

![iPad Sidebar Landscape Measurement Diagram](/.agent/apple-ui-design/ipados-sidebar-landscape-expand-hidden.jpeg)

### iPad Tab Bar Navigation 

  + Measurements 
    - 768px wide and 1024px tall (portrait)
  + From top: 
    - Status bar = 24px tall 
    - Window grabber = 24px height, excluding search bar 
  + From bottom: 
    - Tab bar height = 65px 
    - Home indicator = 19.5px tall, lies on top of tab bar 
  + Left and right side margins = 24px wide 

  + Tabs at bottom of viewport 
    - No more than 8 tabs 

![iPad Tab Bar Measurement Diagram](/.agent/apple-ui-design/ipados-tab-bar-landscape-portrait.jpeg)

---

## MacOS

### Sidebar Navigation Only 

* **Default behavior for a Mac app with a sidebar navigation is an expanded sidebar**

  + Measurements 
    - Screen size used is 1440px wide and 900px tall 
  + From top: 
    - Navigation bar = 52px tall 
    - Sidebar icon = 31px wide and 22px tall 
    - Left expanded sidebar is 200px wide 
  + Left and right margin = 20px wide  

* **Collapsed sidebar view**

  + UI layout guidelines are the same except for the Sidebar
    - Collapsed bar resizes all the contents of the screen 
    - The contents of the screen should resize themselves to the span of the full width 

![MacOS Sidebar Measurement Diagram](/.agent/apple-ui-design/macos-sidebar-expand-hidden.jpeg)

---