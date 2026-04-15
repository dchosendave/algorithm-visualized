import type { AlgorithmStep } from "@/algorithms/types"
import { SearchCells } from "@/components/algorithms/search-cells"
import { SortingBars } from "@/components/algorithms/sorting-bars"

type VisualizerStageProps = {
  step: AlgorithmStep | null
}

export function VisualizerStage({ step }: VisualizerStageProps) {
  if (!step) {
    return (
      <div className="flex h-80 items-center justify-center rounded-3xl border border-dashed border-border/70 bg-muted/20 p-6 text-sm text-muted-foreground">
        No visualization data yet.
      </div>
    )
  }

  if ("sortedIndices" in step) {
    return <SortingBars step={step} />
  }

  return <SearchCells step={step} />
}
