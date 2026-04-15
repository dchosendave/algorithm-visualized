# Product Requirements Document

## Project
`Algorithm Visualized`

## Build Status

### Status Snapshot as of April 16, 2026
The project has moved beyond planning and now has a working interactive MVP foundation.

Completed so far:
- Vite + React + TypeScript + `react-router` app scaffold
- shared app shell with header, home page, algorithms page, algorithm detail page, and Big O page route
- persistent dark / light theme toggle in the app shell
- algorithm registry and reusable step-based playback architecture
- reusable playback controls with play, pause, step, reset, randomize, and speed control
- reusable metrics and explanation panels
- `Bubble Sort` implemented as a working interactive visualizer
- `Selection Sort` implemented as a working interactive visualizer
- `Linear Search` implemented as a working interactive visualizer
- `Binary Search` implemented as a working interactive visualizer
- animated sorting swaps using Motion layout animation
- search visualizer with active cell highlighting
- binary-search-specific active range / search window visualization
- complexity summary cards for each algorithm detail page

Current MVP coverage:
- `Bubble Sort`: working
- `Selection Sort`: working
- `Linear Search`: working
- `Binary Search`: working
- `Big O Lab`: routed and scaffolded, but not yet built as an interactive learning tool

Still pending:
- interactive Big O chart and slider
- richer educational content and pseudocode sections
- visual polish and responsive refinement
- accessibility pass
- localStorage preferences
- deployment hardening for Vercel

### Next Session Plan for April 17, 2026
The next build session should continue with the `Big O Lab`.

Primary focus:
- replace the current Big O placeholder page with a real interactive lab
- add reusable complexity functions for `O(1)`, `O(log n)`, `O(n)`, `O(n log n)`, and `O(n^2)`
- build a chart view for comparing growth classes
- add an input size slider that updates the visual comparison live
- add explanation cards that connect complexity classes to real algorithms already implemented in the app

Secondary follow-up if time remains:
- polish the search visualizer further so midpoint and active range states feel even clearer
- refine dark-theme contrast for custom visualization surfaces if needed
- clean up small UX details across the algorithm detail page
- prepare the app for a later deployment pass

## Product Summary
`Algorithm Visualized` is a browser-based educational web app that helps students and beginners understand how common algorithms work through interactive step-by-step visualizations. The product will also include a `Big O Lab` that explains algorithmic complexity through charts, sliders, and concrete examples.

The app is designed to be:
- useful and shareable
- visually polished enough to publish on Vercel
- fully client-side, with no separate API or database
- educational without feeling like a school-only demo

## Problem Statement
Most beginners struggle to understand algorithms because:
- static text and pseudocode are hard to translate into actual execution
- Big O notation feels abstract and disconnected from real behavior
- many visualizers either look outdated, explain too little, or overwhelm users

This product should make algorithms easier to understand by showing:
- what the algorithm is doing right now
- why it is doing that step
- how the work grows as input size increases

## Goals
- Make core algorithms intuitive through animation and interaction.
- Help users connect algorithm steps to complexity concepts.
- Ship a client-side app that can be deployed easily on Vercel.
- Use the project as a solid React learning vehicle through routing, state, animation, reusable UI, and charting.

## Non-Goals
- No backend, authentication, or user accounts.
- No server-side storage or shared collaborative sessions.
- No focus on benchmarking real runtime across devices.
- No attempt to cover every algorithm in the first release.

## Target Users
- students learning algorithms and data structures
- self-taught developers reviewing fundamentals
- interview prep learners
- teachers or mentors who want a quick visual teaching aid

## Product Principles
- `Visual first`: the animation should be the primary learning surface.
- `Explain as it moves`: each step should be paired with a short plain-English explanation.
- `Interactive, not passive`: users should control speed, stepping, reset, and input presets.
- `Clarity over quantity`: fewer polished algorithms are better than many shallow ones.
- `Big O should feel concrete`: show growth through relative operation counts, not wall-clock timing.

## Platform and Technical Constraints
- Frontend only
- Deployable on Vercel
- No separate API or database
- Local persistence only through `localStorage`
- Built with `Vite`, `React`, `TypeScript`, `react-router`, `Tailwind CSS`, `shadcn/ui`, `Motion`, and `Recharts`

## Core User Experience
The user should be able to:
- open the app and quickly understand what it offers
- choose an algorithm to explore
- watch the algorithm step through a dataset visually
- pause, resume, step forward, reset, and change speed
- see what elements are being compared, swapped, or checked
- read a short explanation of the current step
- learn the algorithm's best, average, and worst-case complexity
- switch to a Big O page and compare growth classes visually

## Information Architecture
- `/` - Home / landing page
- `/algorithms` - Algorithm explorer
- `/algorithms/:slug` - Single algorithm detail page
- `/big-o` - Big O Lab
- `/compare` - Compare mode (post-MVP or stretch goal)

## MVP Scope

### 1. Home Page
The home page should:
- explain the product in one clear sentence
- let users jump directly into algorithms or Big O Lab
- highlight the supported algorithms in MVP
- briefly explain that the app is interactive and educational

### 2. Algorithm Visualizer
The algorithm visualizer is the main feature of the product.

It should include:
- a primary visualization area
- playback controls
- speed controls
- input/data controls
- metrics panel
- explanation panel
- complexity summary

### 3. Big O Lab
The Big O Lab should be a separate dedicated learning area.

It should include:
- a growth chart
- an input size slider
- relative operation values for each complexity class
- plain-English explanations
- examples that connect complexity classes to real algorithms

## MVP Algorithms
The first release should support:
- `Bubble Sort`
- `Selection Sort`
- `Linear Search`
- `Binary Search`

These algorithms give a good balance of:
- easy-to-understand visuals
- different algorithm categories
- different complexity patterns
- strong educational value

## Algorithm Visualizer Requirements

### Data Visualization
- Sorting algorithms should display data as vertical bars or cells.
- Search algorithms should display data as boxes or indexed cells.
- The currently active indices must be visually highlighted.
- Compared elements must be clearly distinct from swapped or confirmed elements.
- Sorted or already-processed elements should have a different final-state style.

### Playback Controls
- `Play`
- `Pause`
- `Step`
- `Reset`
- `Randomize`
- `Speed control`

### Input Controls
- input size slider
- random data generation
- reversed dataset preset
- nearly sorted dataset preset for sorting algorithms
- target selection for search algorithms
- manual custom array input as a later MVP enhancement if time allows

### Explanation Panel
Each algorithm page should show:
- what the algorithm does
- what is happening in the current step
- why that step matters
- when the algorithm is useful
- best, average, and worst-case time complexity
- space complexity

### Metrics Panel
The app should show live metrics such as:
- current step number
- number of comparisons
- number of swaps for sorting algorithms
- number of checks or visits for search algorithms
- current target or active range where relevant

### Educational Content
Each algorithm page should include:
- short overview
- intuition section
- complexity summary
- short pseudocode or algorithm outline

## Big O Lab Requirements

### Supported Complexity Classes
The first release should visualize:
- `O(1)`
- `O(log n)`
- `O(n)`
- `O(n log n)`
- `O(n^2)`

### Big O Interactions
- input size slider for changing `n`
- live-updating line chart for growth curves
- side-by-side value comparison at the current `n`
- plain-language interpretation of each complexity class

### Big O Explanations
The page should help users understand:
- what changes as `n` grows
- why `O(log n)` scales differently from `O(n)`
- why quadratic growth becomes expensive quickly
- which real algorithms roughly map to each complexity class

### Big O Measurement Rule
The Big O Lab should use:
- relative operation counts
- theoretical growth values

The Big O Lab should not use:
- raw wall-clock timings as the primary teaching signal

This keeps the experience educational and avoids misleading users based on device speed.

## Post-MVP Features
- `Insertion Sort`
- `Merge Sort`
- `Quick Sort`
- `Interpolation Search`
- `Compare Mode` for side-by-side algorithm comparison
- shareable URLs for selected algorithm and dataset state
- import/export of custom arrays or lesson presets
- code tabs for pseudocode and real code examples
- theme customization
- richer charts and learning cards

## Compare Mode Requirements
Compare Mode is not required for the first release, but it is a strong follow-up feature.

It should allow users to:
- choose two algorithms
- run them on the same dataset
- compare comparisons, swaps, and completion steps
- compare complexity summaries
- better understand why one algorithm scales differently from another

## Persistence Requirements
- Save basic preferences in `localStorage`
- Save preferred speed
- Save theme preference if theming is added
- Save the most recently used algorithm and selected dataset options where useful

## UX and Design Requirements
- polished, modern look suitable for public sharing
- readable on desktop and mobile
- motion should support understanding, not distract from it
- controls should stay simple and obvious
- colors should communicate state clearly
- typography and spacing should feel intentional, not tutorial-template-like

## Accessibility Requirements
- keyboard-accessible controls
- visible focus states
- sufficient color contrast
- non-color indicators for important state when possible
- reduced-motion support for users who prefer less animation

## Performance Requirements
- smooth animation for common dataset sizes in modern browsers
- instant route changes between core pages
- no dependency on network requests after the app loads

## Success Criteria
The MVP is successful if:
- a first-time user can start an algorithm visualization without explanation
- the current step is understandable from both visuals and text
- the difference between `O(log n)`, `O(n)`, and `O(n^2)` is visually obvious in Big O Lab
- the app feels polished enough to share publicly
- the whole product works as a client-side app on Vercel

## Suggested Delivery Plan

### Phase 1: Foundation
- app shell
- routing
- shared layout
- reusable control components
- base theming and visual language
Status: completed

### Phase 2: Core MVP
- Bubble Sort
- Selection Sort
- Linear Search
- Binary Search
- playback controls
- metrics panel
- explanation panel
- Big O Lab with chart and slider
Status: mostly completed
Note: the four MVP algorithms and the shared visualizer/player flow are working; the interactive Big O Lab is the main remaining Phase 2 item.

### Phase 3: Polish
- animation improvements
- responsive behavior
- accessibility pass
- content refinement
- deployment setup
Status: not started

### Phase 4: Expansion
- more algorithms
- compare mode
- richer educational content
- sharing features
Status: not started

## Open Questions
- Should the single algorithm page use one shared layout for both sorting and searching, or allow type-specific layouts?
- Should custom array input be in MVP or moved just after launch?
- Should compare mode be included in v1 if the core pages finish early?
- What visual style should become the brand identity for the project?
