import { generateBinarySearchSteps } from "@/algorithms/binary-search"
import { generateBubbleSortSteps } from "@/algorithms/bubble-sort"
import { generateLinearSearchSteps } from "@/algorithms/linear-search"
import { generateSelectionSortSteps } from "@/algorithms/selection-sort"
import type { SearchAlgorithmStep, SortAlgorithmStep } from "@/algorithms/types"

export type SortingAlgorithmDefinition = {
  slug: string
  generateSteps: (input: number[]) => SortAlgorithmStep[]
}

export type SearchAlgorithmDefinition = {
  slug: string
  requiresSorted: boolean
  generateSteps: (input: number[], target: number) => SearchAlgorithmStep[]
}

const sortingAlgorithms: Record<string, SortingAlgorithmDefinition> = {
  "bubble-sort": {
    slug: "bubble-sort",
    generateSteps: generateBubbleSortSteps,
  },
  "selection-sort": {
    slug: "selection-sort",
    generateSteps: generateSelectionSortSteps,
  },
}

const searchAlgorithms: Record<string, SearchAlgorithmDefinition> = {
  "linear-search": {
    slug: "linear-search",
    requiresSorted: false,
    generateSteps: generateLinearSearchSteps,
  },
  "binary-search": {
    slug: "binary-search",
    requiresSorted: true,
    generateSteps: generateBinarySearchSteps,
  },
}

export function getSortingAlgorithm(slug: string) {
  return sortingAlgorithms[slug]
}

export function getSearchAlgorithm(slug: string) {
  return searchAlgorithms[slug]
}
