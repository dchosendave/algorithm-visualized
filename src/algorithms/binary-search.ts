import type {
  SearchAlgorithmStep,
  SearchStepType,
  SortBar,
} from "@/algorithms/types"

function createStep(
  type: SearchStepType,
  array: SortBar[],
  activeIndices: number[],
  visitedIndices: number[],
  range: [number, number] | null,
  message: string,
  checks: number,
  target: number,
  foundIndex: number | null
): SearchAlgorithmStep {
  return {
    type,
    array: [...array],
    activeIndices: [...activeIndices],
    visitedIndices: [...visitedIndices],
    range,
    message,
    checks,
    target,
    foundIndex,
  }
}

export function generateBinarySearchSteps(
  input: number[],
  target: number
): SearchAlgorithmStep[] {
  const sortedInput = [...input].sort((left, right) => left - right)
  const array = sortedInput.map((value, index) => ({
    id: `cell-${index}`,
    value,
  }))

  const steps: SearchAlgorithmStep[] = []
  const visitedIndices: number[] = []

  let checks = 0
  let low = 0
  let high = array.length - 1

  steps.push(
    createStep(
      "start",
      array,
      [],
      [],
      [low, high],
      `Start with the full sorted range and look for ${target}.`,
      checks,
      target,
      null
    )
  )

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const current = array[mid]

    steps.push(
      createStep(
        "range",
        array,
        [mid],
        visitedIndices,
        [low, high],
        `Focus on indices ${low} through ${high}. The middle value is ${current.value} at index ${mid}.`,
        checks,
        target,
        null
      )
    )

    checks += 1

    if (!visitedIndices.includes(mid)) {
      visitedIndices.push(mid)
    }

    steps.push(
      createStep(
        "visit",
        array,
        [mid],
        visitedIndices,
        [low, high],
        `Compare the middle value ${current.value} with the target ${target}.`,
        checks,
        target,
        null
      )
    )

    if (current.value === target) {
      steps.push(
        createStep(
          "found",
          array,
          [mid],
          visitedIndices,
          [low, high],
          `Found ${target} at index ${mid}. Binary Search finishes here.`,
          checks,
          target,
          mid
        )
      )

      return steps
    }

    if (current.value < target) {
      const nextLow = mid + 1

      steps.push(
        createStep(
          "range",
          array,
          [mid],
          visitedIndices,
          nextLow <= high ? [nextLow, high] : null,
          `${target} is larger than ${current.value}, so discard the left half and search the right half.`,
          checks,
          target,
          null
        )
      )

      low = nextLow
      continue
    }

    const nextHigh = mid - 1

    steps.push(
      createStep(
        "range",
        array,
        [mid],
        visitedIndices,
        low <= nextHigh ? [low, nextHigh] : null,
        `${target} is smaller than ${current.value}, so discard the right half and search the left half.`,
        checks,
        target,
        null
      )
    )

    high = nextHigh
  }

  steps.push(
    createStep(
      "done",
      array,
      [],
      visitedIndices,
      null,
      `${target} is not in the sorted array, so Binary Search ends with an empty range.`,
      checks,
      target,
      null
    )
  )

  return steps
}
