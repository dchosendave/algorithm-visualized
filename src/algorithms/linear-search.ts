import type { SearchAlgorithmStep, SortBar, SearchStepType } from "@/algorithms/types"

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

export function generateLinearSearchSteps(
  input: number[],
  target: number
): SearchAlgorithmStep[] {
  const array = input.map((value, index) => ({
    id: `cell-${index}`,
    value,
  }))

  const steps: SearchAlgorithmStep[] = []
  const visitedIndices: number[] = []

  let checks = 0

  steps.push(
    createStep(
      "start",
      array,
      [],
      [],
      null,
      `Start scanning from left to right to find ${target}.`,
      checks,
      target,
      null
    )
  )

  for (let index = 0; index < array.length; index += 1) {
    const current = array[index]
    checks += 1
    visitedIndices.push(index)

    steps.push(
      createStep(
        "visit",
        array,
        [index],
        visitedIndices,
        null,
        `Check index ${index}. Does ${current.value} match ${target}?`,
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
          [index],
          visitedIndices,
          null,
          `Found ${target} at index ${index}. Linear Search can stop here.`,
          checks,
          target,
          index
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
      visitedIndices,
      null,
      `${target} is not in the array, so the search ends after checking every item.`,
      checks,
      target,
      null
    )
  )

  return steps
}
