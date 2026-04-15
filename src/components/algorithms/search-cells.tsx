import { motion } from "motion/react"

import type { SearchAlgorithmStep } from "@/algorithms/types"
import { cn } from "@/lib/utils"

type SearchCellsProps = {
  step: SearchAlgorithmStep
}

export function SearchCells({ step }: SearchCellsProps) {
  const rangeLabel = step.range
    ? `Window ${step.range[0]}-${step.range[1]}`
    : "No active window"

  const resultLabel =
    step.foundIndex !== null
      ? `Found at index ${step.foundIndex}`
      : step.type === "done"
        ? "Not found"
        : rangeLabel

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border/70 bg-muted/25 p-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Target
          </p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">
            {step.target}
          </p>
        </div>

        <p className="text-sm text-muted-foreground">{resultLabel}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-5 xl:grid-cols-10">
        {step.array.map((item, index) => {
          const isActive = step.activeIndices.includes(index)
          const isVisited = step.visitedIndices.includes(index)
          const isFound = step.foundIndex === index
          const isInRange =
            step.range !== null &&
            index >= step.range[0] &&
            index <= step.range[1]

          return (
            <motion.div
              key={item.id}
              layout
              animate={{
                scale: isActive ? 1.03 : 1,
                y: isActive ? -4 : 0,
              }}
              className={cn(
                "flex min-h-24 flex-col items-center justify-center rounded-3xl border p-4 text-center transition-colors",
                isFound &&
                  "border-foreground bg-foreground text-background shadow-lg",
                !isFound &&
                  isActive &&
                  "border-foreground/20 bg-chart-4 text-foreground ring-2 ring-foreground/10",
                !isFound &&
                  !isActive &&
                  isVisited &&
                  "border-border bg-muted/60",
                !isFound &&
                  !isActive &&
                  !isVisited &&
                  isInRange &&
                  "border-foreground/10 bg-foreground/[0.04]",
                !isFound &&
                  !isActive &&
                  !isVisited &&
                  "border-border bg-background"
              )}
            >
              <span className="text-[11px] uppercase tracking-[0.14em] opacity-70">
                Idx {index}
              </span>
              <span className="mt-2 text-lg font-semibold">{item.value}</span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
