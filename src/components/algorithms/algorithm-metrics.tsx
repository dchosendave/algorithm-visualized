import type { AlgorithmStep } from "@/algorithms/types"

type AlgorithmMetricsProps = {
  step: AlgorithmStep | null
  stepIndex: number
  totalSteps: number
}

export function AlgorithmMetrics({
  step,
  stepIndex,
  totalSteps,
}: AlgorithmMetricsProps) {
  const progressValue = `${Math.min(stepIndex + 1, totalSteps)} / ${totalSteps}`

  const items =
    step && "sortedIndices" in step
      ? [
          { label: "Progress", value: progressValue },
          { label: "Comparisons", value: step.comparisons },
          { label: "Swaps", value: step.swaps },
          { label: "Locked In", value: step.sortedIndices.length },
        ]
      : step
        ? [
            { label: "Progress", value: progressValue },
            { label: "Checks", value: step.checks },
            { label: "Visited", value: step.visitedIndices.length },
            {
              label: "Window",
              value: step.range ? `${step.range[0]} - ${step.range[1]}` : "--",
            },
            { label: "Target", value: step.target },
            {
              label: "Result",
              value:
                step.foundIndex !== null
                  ? `Index ${step.foundIndex}`
                  : step.type === "done"
                    ? "Not found"
                    : "Scanning",
            },
          ]
        : [{ label: "Progress", value: progressValue }]

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-3xl border border-border/70 bg-muted/35 p-4"
        >
          <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {item.label}
          </span>
          <span className="mt-2 block text-2xl font-semibold tracking-tight">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
}
