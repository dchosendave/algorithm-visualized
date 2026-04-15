import type {
  SortAlgorithmStep,
  SortBar,
  SortStepType,
} from "@/algorithms/types"

function createStep(
  type: SortStepType,
  array: SortBar[],
  activeIndices: number[],
  sortedIndices: number[],
  message: string,
  comparisons: number,
  swaps: number
): SortAlgorithmStep {
  return {
    type,
    array: [...array],
    activeIndices: [...activeIndices],
    sortedIndices: [...sortedIndices],
    message,
    comparisons,
    swaps,
  }
}

export function generateSelectionSortSteps(input: number[]): SortAlgorithmStep[] {
  const array = input.map((value, index) => ({
    id: `bar-${index}`,
    value,
  }))

  const steps: SortAlgorithmStep[] = []
  const sortedIndices: number[] = []

  let comparisons = 0
  let swaps = 0

  steps.push(
    createStep(
      "start",
      array,
      [],
      [],
      "Start with the unsorted array.",
      comparisons,
      swaps
    )
  )

  for (let start = 0; start < array.length; start += 1) {
    let minIndex = start

    steps.push(
      createStep(
        "compare",
        array,
        [start],
        sortedIndices,
        `Assume ${array[start].value} is the smallest value in the remaining unsorted section.`,
        comparisons,
        swaps
      )
    )

    for (let scan = start + 1; scan < array.length; scan += 1) {
      comparisons += 1

      steps.push(
        createStep(
          "compare",
          array,
          [minIndex, scan],
          sortedIndices,
          `Compare the current minimum ${array[minIndex].value} with ${array[scan].value}.`,
          comparisons,
          swaps
        )
      )

      if (array[scan].value < array[minIndex].value) {
        minIndex = scan

        steps.push(
          createStep(
            "compare",
            array,
            [start, minIndex],
            sortedIndices,
            `${array[minIndex].value} becomes the new minimum candidate.`,
            comparisons,
            swaps
          )
        )
      }
    }

    if (minIndex !== start) {
      const left = array[start]
      const right = array[minIndex]

      array[start] = right
      array[minIndex] = left
      swaps += 1

      steps.push(
        createStep(
          "swap",
          array,
          [start, minIndex],
          sortedIndices,
          `Swap ${left.value} with ${right.value} so the smallest remaining value moves into position ${start}.`,
          comparisons,
          swaps
        )
      )
    }

    if (!sortedIndices.includes(start)) {
      sortedIndices.push(start)
    }

    steps.push(
      createStep(
        "mark-sorted",
        array,
        [start],
        sortedIndices,
        `${array[start].value} is now locked into its final sorted position.`,
        comparisons,
        swaps
      )
    )
  }

  steps.push(
    createStep(
      "done",
      array,
      [],
      Array.from({ length: array.length }, (_, index) => index),
      "Selection Sort finished. The array is sorted.",
      comparisons,
      swaps
    )
  )

  return steps
}
