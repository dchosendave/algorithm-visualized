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

export function generateBubbleSortSteps(input: number[]): SortAlgorithmStep[] {
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

  for (let pass = 0; pass < array.length; pass += 1) {
    let swappedInThisPass = false

    for (let index = 0; index < array.length - pass - 1; index += 1) {
      const left = array[index]
      const right = array[index + 1]

      comparisons += 1

      steps.push(
        createStep(
          "compare",
          array,
          [index, index + 1],
          sortedIndices,
          `Compare ${left.value} and ${right.value}.`,
          comparisons,
          swaps
        )
      )

      if (left.value > right.value) {
        array[index] = right
        array[index + 1] = left
        swaps += 1
        swappedInThisPass = true

        steps.push(
          createStep(
            "swap",
            array,
            [index, index + 1],
            sortedIndices,
            `Swap ${left.value} and ${right.value} so the larger value moves to the right.`,
            comparisons,
            swaps
          )
        )
      }
    }

    const sortedIndex = array.length - pass - 1

    if (!sortedIndices.includes(sortedIndex)) {
      sortedIndices.push(sortedIndex)
    }

    steps.push(
      createStep(
        "mark-sorted",
        array,
        [sortedIndex],
        sortedIndices,
        `${array[sortedIndex].value} is now locked into its final position.`,
        comparisons,
        swaps
      )
    )

    if (!swappedInThisPass) {
      const allSorted = Array.from({ length: array.length }, (_, index) => index)

      steps.push(
        createStep(
          "done",
          array,
          [],
          allSorted,
          "No swaps happened in this pass, so the array is fully sorted.",
          comparisons,
          swaps
        )
      )

      return steps
    }
  }

  steps.push(
    createStep(
      "done",
      array,
      [],
      Array.from({ length: array.length }, (_, index) => index),
      "Bubble Sort finished. The array is sorted.",
      comparisons,
      swaps
    )
  )

  return steps
}
