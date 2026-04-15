import type { SortAlgorithmStep } from "@/algorithms/types"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

type SortingBarsProps = {
  step: SortAlgorithmStep
}

export function SortingBars({ step }: SortingBarsProps) {
  const maxValue = Math.max(...step.array.map((item) => item.value), 1)

  return (
    <div className="flex h-80 items-end gap-2 rounded-3xl border border-border/70 bg-muted/25 p-5">
      {step.array.map((item, index) => {
        const isActive = step.activeIndices.includes(index)
        const isSorted = step.sortedIndices.includes(index)
        const isSwapping = isActive && step.type === "swap"

        return (
          <motion.div
            key={item.id}
            layout
            transition={{
              layout: {
                type: "spring",
                stiffness: 260,
                damping: 24,
              },
            }}
            animate={{
              y: isSwapping ? -10 : 0,
              scale: isSwapping ? 1.02 : 1,
            }}
            className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2"
          >
            <motion.span
              layout="position"
              className="text-xs text-muted-foreground"
            >
              {item.value}
            </motion.span>

            <motion.div
              layout
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 260,
                  damping: 24,
                },
              }}
              className={cn(
                "w-full rounded-t-2xl transition-colors duration-200",
                isSorted && "bg-foreground",
                !isSorted &&
                  isActive &&
                  step.type === "swap" &&
                  "bg-chart-4 ring-2 ring-foreground/10",
                !isSorted &&
                  isActive &&
                  step.type !== "swap" &&
                  "bg-chart-3 ring-2 ring-foreground/10",
                !isSorted && !isActive && "bg-muted-foreground/30"
              )}
              style={{
                height: `${Math.max((item.value / maxValue) * 220, 20)}px`,
              }}
            />

            <motion.span
              layout="position"
              className="text-[11px] text-muted-foreground/80"
            >
              {index}
            </motion.span>
          </motion.div>
        )
      })}
    </div>
  )
}
