# Algorithm Visualized

Algorithm Visualized is a frontend-only learning app that helps beginners understand algorithms by watching them play out step by step. It combines interactive visualizers for sorting and searching with supporting explanations, live metrics, and a growing Big O learning area.

## Current Status

As of April 16, 2026, the project includes:

- Interactive visualizers for `Bubble Sort`, `Selection Sort`, `Linear Search`, and `Binary Search`
- Shared playback controls with play, pause, step, reset, randomize, and speed adjustment
- Live metrics and step-by-step explanations for each algorithm route
- A persistent light/dark theme toggle powered by `localStorage`
- A routed `Big O Lab` page with current teaching content and scaffolded components for a richer interactive version

## Features

- Step-based animation flow driven by reusable algorithm player hooks
- Separate visual treatments for sorting bars and search cells
- Algorithm detail pages with complexity summaries and current-array context
- Clean route structure for home, algorithm explorer, individual algorithms, and Big O
- Tailwind-based UI with reusable primitives and motion-friendly visuals

## Available Routes

- `/` - landing page and featured algorithms
- `/algorithms` - algorithm explorer
- `/algorithms/:slug` - interactive detail pages for each supported algorithm
- `/big-o` - Big O Lab foundation page

## Supported Algorithms

- `Bubble Sort`
- `Selection Sort`
- `Linear Search`
- `Binary Search`

## Tech Stack

- `Vite`
- `React 19`
- `TypeScript`
- `React Router 7`
- `Tailwind CSS 4`
- `Radix UI` and `shadcn`-style component primitives
- `Motion`
- `Recharts` for upcoming chart-driven Big O work

## Getting Started

### Prerequisites

- `Node.js`
- `npm`

### Install

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Run the linter

```bash
npm run lint
```

### Preview the production build

```bash
npm run preview
```

## How the App Is Organized

Each interactive algorithm generates a sequence of visualization steps in `src/algorithms/`. Those steps are consumed by the shared `useAlgorithmPlayer` hook, then rendered through reusable visualizer components in `src/components/algorithms/`.

Static route content and algorithm metadata live in `src/data/`, while page-level route components live in `src/pages/`. The project also uses the `@/` path alias for imports mapped to `src/`.

## Folder Structure

High-level layout of the repository with generated folders such as `node_modules/` and `.git/` omitted:

```text
algorithm-visualized/
|-- public/
|   |-- favicon.svg
|   `-- icons.svg
|-- src/
|   |-- algorithms/         # step generators and registry
|   |   |-- binary-search.ts
|   |   |-- bubble-sort.ts
|   |   |-- linear-search.ts
|   |   |-- registry.ts
|   |   |-- selection-sort.ts
|   |   `-- types.ts
|   |-- app/                # reserved for app-level wiring
|   |-- assets/             # static image assets
|   |-- components/
|   |   |-- algorithms/     # visualizer UI, controls, metrics, explanations
|   |   |-- app/            # header and shared page layout pieces
|   |   |-- big-o/          # scaffolded Big O UI components
|   |   |-- shared/         # shared presentation helpers
|   |   `-- ui/             # reusable UI primitives
|   |-- data/               # algorithm metadata and content
|   |-- hooks/              # theme, player, and local storage hooks
|   |-- lib/                # arrays, formatting, and utility helpers
|   |-- pages/              # route-level pages
|   |-- types/              # shared content types
|   |-- App.tsx
|   |-- index.css
|   `-- main.tsx
|-- components.json
|-- eslint.config.js
|-- implementation-plan.md
|-- index.html
|-- package.json
|-- product-requirement-document.md
|-- tsconfig.app.json
|-- tsconfig.json
|-- tsconfig.node.json
`-- vite.config.ts
```

## Project Documents

- `product-requirement-document.md` outlines the MVP goals, scope, and future direction
- `implementation-plan.md` tracks the build approach and progress across milestones

## Next Major Improvements

- Turn `Big O Lab` into a full interactive chart and slider experience
- Expand educational content and pseudocode across algorithm pages
- Continue polish work for responsiveness, accessibility, and deployment readiness
