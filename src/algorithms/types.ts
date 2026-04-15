export type SortStepType =
  | "start"
  | "compare"
  | "swap"
  | "mark-sorted"
  | "done"

export type SearchStepType =
  | "start"
  | "range"
  | "visit"
  | "found"
  | "done"

export type SortBar = {
  id: string
  value: number
}

export type SortAlgorithmStep = {
  type: SortStepType
  array: SortBar[]
  activeIndices: number[]
  sortedIndices: number[]
  message: string
  comparisons: number
  swaps: number
}

export type SearchAlgorithmStep = {
  type: SearchStepType
  array: SortBar[]
  activeIndices: number[]
  visitedIndices: number[]
  range: [number, number] | null
  message: string
  checks: number
  target: number
  foundIndex: number | null
}

export type AlgorithmStep = SortAlgorithmStep | SearchAlgorithmStep
