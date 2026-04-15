import type { AlgorithmStep } from "@/algorithms/types"
import type { AlgorithmSummary } from "@/data/algorithm-content"
import { formatArray } from "@/lib/format"

type AlgorithmExplanationProps = {
  algorithm: AlgorithmSummary
  step: AlgorithmStep | null
}

export function AlgorithmExplanation({
  algorithm,
  step,
}: AlgorithmExplanationProps) {
  const isSearchStep = step !== null && "target" in step

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Current step
        </p>
        <p className="text-sm leading-7">
          {step?.message ?? "Press Play to start the visualization."}
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Algorithm intuition
        </p>
        <p className="text-sm leading-7 text-muted-foreground">
          {algorithm.description}
        </p>
      </div>

      {isSearchStep ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Search target
            </p>
            <div className="rounded-3xl border border-border/70 bg-muted/35 p-4 font-mono text-sm">
              {step.target}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Active window
            </p>
            <div className="rounded-3xl border border-border/70 bg-muted/35 p-4 font-mono text-sm">
              {step.range ? `${step.range[0]} - ${step.range[1]}` : "--"}
            </div>
          </div>
        </div>
      ) : null}

      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Current array
        </p>
        <div className="rounded-3xl border border-border/70 bg-muted/35 p-4 font-mono text-sm">
          [{formatArray(step?.array.map((item) => item.value) ?? [])}]
        </div>
      </div>
    </div>
  )
}
