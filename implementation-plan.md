# Implementation Plan

## Purpose
This document turns the PRD into a practical build plan for `Algorithm Visualized`.

The goal is to keep the project:
- simple enough to finish
- structured enough to scale
- educational for React, not just algorithm theory

## Build Strategy
Build the app as a series of vertical slices.

That means:
1. set up the route/layout foundation
2. build one full algorithm page end-to-end
3. reuse the same engine and UI patterns for the remaining algorithms
4. add Big O Lab after the main algorithm experience is proven

This is better than building many pages at once because it gives you:
- faster visible progress
- fewer architecture mistakes
- more reusable components

## Recommended App Structure

```text
src/
  app/
    router.tsx

  algorithms/
    bubble-sort.ts
    selection-sort.ts
    linear-search.ts
    binary-search.ts
    registry.ts
    types.ts

  components/
    app/
      app-shell.tsx
      site-header.tsx
      page-container.tsx

    algorithms/
      algorithm-card.tsx
      algorithm-controls.tsx
      algorithm-explanation.tsx
      algorithm-metrics.tsx
      algorithm-overview.tsx
      playback-toolbar.tsx
      sorting-bars.tsx
      search-cells.tsx
      visualizer-stage.tsx

    big-o/
      complexity-card.tsx
      complexity-chart.tsx
      complexity-slider.tsx
      complexity-table.tsx

    shared/
      section-heading.tsx
      stat-pill.tsx
      empty-state.tsx

    ui/
      ...

  data/
    algorithm-content.ts
    complexity-content.ts

  hooks/
    use-algorithm-player.ts
    use-local-storage.ts
    use-media-query.ts

  lib/
    array.ts
    complexity.ts
    format.ts
    utils.ts

  pages/
    home-page.tsx
    algorithms-page.tsx
    algorithm-detail-page.tsx
    big-o-page.tsx

  types/
    content.ts

  App.tsx
  main.tsx
  index.css
```

## Why This Structure
- `pages/` owns route-level UI
- `components/` owns reusable presentational pieces
- `algorithms/` owns the actual algorithm logic and step generation
- `data/` owns static explanatory content
- `hooks/` owns shared React behavior
- `lib/` owns general helpers

This keeps logic, content, and UI from getting mixed together.

## Routing Plan

### Routes for MVP
- `/` -> `HomePage`
- `/algorithms` -> `AlgorithmsPage`
- `/algorithms/:slug` -> `AlgorithmDetailPage`
- `/big-o` -> `BigOPage`

### Route Responsibilities

#### HomePage
- hero section
- short explanation of the product
- CTA buttons to start learning
- featured algorithm cards
- link to Big O Lab

#### AlgorithmsPage
- list of available algorithms
- filter by category if needed later
- cards with complexity and short descriptions

#### AlgorithmDetailPage
- algorithm title and summary
- visualization stage
- playback controls
- dataset controls
- metrics
- explanation panel
- complexity info

#### BigOPage
- chart of growth classes
- slider for changing `n`
- comparison cards
- real examples section

## Core Architecture Decision

### Use Precomputed Steps
For each algorithm, generate a list of steps up front and then play them back in React.

This is the most important architecture choice for the project.

Each algorithm should:
- receive an input dataset
- produce a list of step objects
- include enough information to render each step clearly

Why this approach is good:
- easier to pause and resume
- easier to step forward manually
- easier to show explanations for each step
- easier to keep the UI deterministic

Avoid animating directly inside the algorithm loop in the component.

## Algorithm Data Model

Create a shared step model in `src/algorithms/types.ts`.

Suggested starting point:

```ts
export type AlgorithmKind = "sort" | "search"

export type Complexity = {
  best: string
  average: string
  worst: string
  space: string
}

export type AlgorithmStep =
  | {
      type: "compare"
      array: number[]
      indices: number[]
      message: string
    }
  | {
      type: "swap"
      array: number[]
      indices: number[]
      message: string
    }
  | {
      type: "mark-sorted"
      array: number[]
      indices: number[]
      message: string
    }
  | {
      type: "visit"
      array: number[]
      indices: number[]
      message: string
    }
  | {
      type: "range"
      array: number[]
      indices: number[]
      range: [number, number]
      message: string
    }
  | {
      type: "found"
      array: number[]
      indices: number[]
      message: string
    }
  | {
      type: "done"
      array: number[]
      indices: number[]
      message: string
    }

export type AlgorithmDefinition = {
  slug: string
  name: string
  kind: AlgorithmKind
  description: string
  complexity: Complexity
  generateSteps: (input: number[], target?: number) => AlgorithmStep[]
}
```

This does not need to be perfect on day one. Keep it small and evolve it when needed.

## Algorithm Registry Plan
Create a single source of truth in `src/algorithms/registry.ts`.

It should export:
- all supported algorithms
- metadata used in cards and detail pages
- the `slug -> algorithm definition` lookup

This will keep routing simple and make the UI data-driven.

## First Four Algorithm Modules

### Bubble Sort
Good first algorithm because:
- visual behavior is obvious
- steps are easy to explain
- great for proving the whole UI flow

### Selection Sort
Second best addition because:
- still simple
- introduces the idea of current minimum and selection

### Linear Search
Adds search behavior with minimal complexity.

### Binary Search
Great educational counterpart because it introduces ranges and `O(log n)`.

## Visualizer Component Plan

### `visualizer-stage.tsx`
The parent rendering component for the main animation area.

Responsibilities:
- choose the correct visual component
- receive `currentStep`
- render sorting or searching view

### `sorting-bars.tsx`
Render bar charts for sorting algorithms.

Responsibilities:
- draw array values as vertical bars
- highlight compared indices
- highlight swapped indices
- highlight sorted indices

### `search-cells.tsx`
Render horizontal cells for search algorithms.

Responsibilities:
- show array positions
- show active index or active range
- show found state

### `playback-toolbar.tsx`
Controls for:
- play
- pause
- step
- reset
- randomize
- speed

### `algorithm-metrics.tsx`
Show:
- current step
- comparisons
- swaps
- visits

### `algorithm-explanation.tsx`
Show:
- current step explanation
- algorithm summary
- complexity values

## State Management Plan
Use local component state and custom hooks only.

Do not introduce Redux or other global state libraries.

### Main Hook: `use-algorithm-player.ts`
This hook should manage:
- the current step index
- play/pause state
- playback speed
- stepping forward
- resetting

Suggested return shape:

```ts
{
  isPlaying,
  stepIndex,
  currentStep,
  play,
  pause,
  reset,
  nextStep,
  setSpeed,
}
```

### Supporting Hook: `use-local-storage.ts`
Use it later for:
- speed preference
- theme preference
- last selected algorithm

## Page-by-Page Build Plan

## Phase 1: Foundation

### Task 1. Clean starter files
- remove unused Vite starter assets
- remove starter CSS that no longer matches the app
- keep `index.css` as the main global entry

### Task 2. Create route pages
Create:
- `home-page.tsx`
- `algorithms-page.tsx`
- `algorithm-detail-page.tsx`
- `big-o-page.tsx`

### Task 3. Convert `App.tsx` into layout + routes only
`App.tsx` should become a thin shell that renders:
- header
- page container
- route definitions

### Task 4. Build shared app shell
Create:
- `site-header.tsx`
- `page-container.tsx`

Goal:
- a clean reusable frame before deeper feature work starts

## Phase 2: First Vertical Slice

### Target
Build `Bubble Sort` completely before touching the others.

### Task 1. Define algorithm types
Create:
- `src/algorithms/types.ts`
- `src/algorithms/registry.ts`

### Task 2. Implement Bubble Sort step generation
Create:
- `src/algorithms/bubble-sort.ts`

It should:
- accept an array
- emit a list of steps
- attach human-readable messages

### Task 3. Build playback hook
Create:
- `src/hooks/use-algorithm-player.ts`

### Task 4. Build sorting visualizer
Create:
- `src/components/algorithms/sorting-bars.tsx`
- `src/components/algorithms/visualizer-stage.tsx`

### Task 5. Build controls and explanation panel
Create:
- `src/components/algorithms/playback-toolbar.tsx`
- `src/components/algorithms/algorithm-metrics.tsx`
- `src/components/algorithms/algorithm-explanation.tsx`

### Task 6. Wire Bubble Sort into the detail page
The page should now support:
- random dataset generation
- play/pause
- step forward
- reset
- speed adjustment
- explanation text

At this point, you have a real product slice.

## Phase 3: Expand Algorithm Support

### Selection Sort
Reuse the same sorting UI.

Create:
- `src/algorithms/selection-sort.ts`

### Linear Search
Introduce `search-cells.tsx`.

Create:
- `src/algorithms/linear-search.ts`
- `src/components/algorithms/search-cells.tsx`

### Binary Search
Extend the search visualization with:
- current midpoint
- active search range

Create:
- `src/algorithms/binary-search.ts`

## Phase 4: Build Big O Lab

### Required Files
- `src/lib/complexity.ts`
- `src/data/complexity-content.ts`
- `src/components/big-o/complexity-chart.tsx`
- `src/components/big-o/complexity-slider.tsx`
- `src/components/big-o/complexity-card.tsx`
- `src/pages/big-o-page.tsx`

### Big O Page Layout
- intro section
- complexity chart
- slider and selected `n`
- comparison cards
- example mapping section

### Data Plan
Use pure functions like:

```ts
constant(n)
logarithmic(n)
linear(n)
linearithmic(n)
quadratic(n)
```

These should return relative values for charting and display.

## Phase 5: Polish and Hardening
- improve transitions with Motion
- improve mobile layout
- add reduced-motion handling
- save speed and preferences to `localStorage`
- add empty/error guards for invalid routes
- prepare Vercel SPA rewrite

## Recommended Static Content Files

### `src/data/algorithm-content.ts`
This should store:
- short description
- intuition
- use cases
- complexity values
- pseudocode snippets if you add them later

This keeps educational copy out of the page components.

## UI Component Mapping

Use `shadcn/ui` for:
- `Button`
- `Card`
- `Tabs`
- `Slider`
- `Select`
- `Tooltip`
- `Accordion`
- `Badge`
- `Separator`
- `Dialog` later if needed

Use custom components for:
- sorting bars
- search cells
- algorithm stage
- metric cards
- complexity chart wrapper

## First Milestone Checklist
This is the exact first milestone I recommend building.

### Milestone 1
- route shell finished
- home page presentable
- algorithms list page presentable
- Bubble Sort detail page working
- playback controls working
- metrics updating
- explanation messages changing with steps

Do not start Big O Lab before Milestone 1 works well.

## Suggested Coding Order
Follow this exact order:

1. clean `App.tsx` and create real page files
2. build the shared header and page container
3. create `algorithms/types.ts`
4. implement `bubble-sort.ts`
5. build `use-algorithm-player.ts`
6. build `sorting-bars.tsx`
7. build the Bubble Sort detail page
8. add `selection-sort.ts`
9. add `linear-search.ts`
10. add `binary-search.ts`
11. build Big O Lab
12. polish and deploy

## Guardrails
- keep the algorithm step objects simple
- do not over-abstract too early
- do not add compare mode in MVP
- do not add backend features
- prefer reusable UI only after one real page works

## Immediate Next Step
The best next move is:

### Build the route skeleton
Create:
- `src/pages/home-page.tsx`
- `src/pages/algorithms-page.tsx`
- `src/pages/algorithm-detail-page.tsx`
- `src/pages/big-o-page.tsx`

Then update `App.tsx` so it only handles:
- navigation
- layout
- routes

Once that is done, move straight into `Bubble Sort` as the first vertical slice.
