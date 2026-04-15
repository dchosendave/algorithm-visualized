export type AlgorithmKind = "sort" | "search"

export type AlgorithmSummary = {
  slug: string
  name: string
  kind: AlgorithmKind
  description: string
  complexity: {
    best: string
    average: string
    worst: string
    space: string
  }
  featured?: boolean
}

export const algorithms: AlgorithmSummary[] = [
  {
    slug: "bubble-sort",
    name: "Bubble Sort",
    kind: "sort",
    description:
      "Compares neighboring values and swaps them until larger items bubble to the end.",
    complexity: {
      best: "O(n)",
      average: "O(n^2)",
      worst: "O(n^2)",
      space: "O(1)",
    },
    featured: true,
  },
  {
    slug: "selection-sort",
    name: "Selection Sort",
    kind: "sort",
    description:
      "Finds the smallest remaining value and places it into the next sorted position.",
    complexity: {
      best: "O(n^2)",
      average: "O(n^2)",
      worst: "O(n^2)",
      space: "O(1)",
    },
    featured: true,
  },
  {
    slug: "linear-search",
    name: "Linear Search",
    kind: "search",
    description:
      "Checks each item one by one until the target is found or the list ends.",
    complexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    featured: true,
  },
  {
    slug: "binary-search",
    name: "Binary Search",
    kind: "search",
    description:
      "Repeatedly halves a sorted range to locate a target much faster than a full scan.",
    complexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
      space: "O(1)",
    },
    featured: true,
  },
]

export function getAlgorithmBySlug(slug: string) {
  return algorithms.find((algorithm) => algorithm.slug === slug)
}
