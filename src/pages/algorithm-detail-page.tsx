import { useMemo, useState } from "react"
import { Link, useParams } from "react-router"

import { getSearchAlgorithm, getSortingAlgorithm } from "@/algorithms/registry"
import { AlgorithmControls } from "@/components/algorithms/algorithm-controls"
import { AlgorithmExplanation } from "@/components/algorithms/algorithm-explanation"
import { AlgorithmMetrics } from "@/components/algorithms/algorithm-metrics"
import { VisualizerStage } from "@/components/algorithms/visualizer-stage"
import { PageContainer } from "@/components/app/page-container"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type AlgorithmSummary,
  getAlgorithmBySlug,
} from "@/data/algorithm-content"
import { useAlgorithmPlayer } from "@/hooks/use-algorithm-player"
import { generateRandomArray } from "@/lib/array"

function pickRandomTarget(values: number[]) {
  return values[Math.floor(Math.random() * values.length)] ?? 0
}

function generateUniqueSearchArray(length: number, min = 10, max = 96) {
  const uniqueValues = new Set<number>()

  while (uniqueValues.size < length) {
    uniqueValues.add(Math.floor(Math.random() * (max - min + 1)) + min)
  }

  return Array.from(uniqueValues)
}

function createSearchScenario(sorted = false) {
  const dataset = generateUniqueSearchArray(10, 10, 96)
  const finalDataset = sorted ? [...dataset].sort((left, right) => left - right) : dataset

  return {
    dataset: finalDataset,
    target: pickRandomTarget(finalDataset),
  }
}

function ComplexitySummaryCard({ algorithm }: { algorithm: AlgorithmSummary }) {
  return (
    <Card className="border border-border/70">
      <CardHeader>
        <CardTitle>Complexity Summary</CardTitle>
        <CardDescription>
          Quick reference for this algorithm.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 text-sm">
        <div className="rounded-3xl border border-border/70 bg-muted/40 p-4">
          <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Best
          </span>
          <span className="mt-1 block text-base font-medium">
            {algorithm.complexity.best}
          </span>
        </div>

        <div className="rounded-3xl border border-border/70 bg-muted/40 p-4">
          <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Average
          </span>
          <span className="mt-1 block text-base font-medium">
            {algorithm.complexity.average}
          </span>
        </div>

        <div className="rounded-3xl border border-border/70 bg-muted/40 p-4">
          <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Worst
          </span>
          <span className="mt-1 block text-base font-medium">
            {algorithm.complexity.worst}
          </span>
        </div>

        <div className="rounded-3xl border border-border/70 bg-muted/40 p-4">
          <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Space
          </span>
          <span className="mt-1 block text-base font-medium">
            {algorithm.complexity.space}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

function SortingAlgorithmExperience({
  algorithm,
}: {
  algorithm: AlgorithmSummary
}) {
  const sortingAlgorithm = getSortingAlgorithm(algorithm.slug)
  const [dataset, setDataset] = useState(() => generateRandomArray(10, 10, 96))

  const steps = useMemo(() => {
    if (!sortingAlgorithm) {
      return []
    }

    return sortingAlgorithm.generateSteps(dataset)
  }, [dataset, sortingAlgorithm])

  const {
    currentStep,
    isAtEnd,
    isPlaying,
    nextStep,
    reset,
    setSpeed,
    speed,
    stepIndex,
    togglePlay,
    totalSteps,
  } = useAlgorithmPlayer(steps, 420)

  function handleRandomize() {
    setDataset(generateRandomArray(10, 10, 96))
  }

  if (!sortingAlgorithm) {
    return (
      <Card className="border border-border/70">
        <CardHeader>
          <CardTitle>Sorting engine not found</CardTitle>
          <CardDescription>
            This sorting route has summary content, but no registered step generator yet.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
      <Card className="border border-border/70">
        <CardHeader>
          <CardTitle>Visualizer Stage</CardTitle>
          <CardDescription>
            {algorithm.name} runs as a real precomputed step sequence.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <VisualizerStage step={currentStep} />

          <AlgorithmControls
            isPlaying={isPlaying}
            isStepDisabled={isAtEnd}
            onRandomize={handleRandomize}
            onReset={reset}
            onStep={nextStep}
            onTogglePlay={togglePlay}
            onSpeedChange={setSpeed}
            speed={speed}
          />
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="border border-border/70">
          <CardHeader>
            <CardTitle>Live Metrics</CardTitle>
            <CardDescription>
              These values update as each step plays.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlgorithmMetrics
              step={currentStep}
              stepIndex={stepIndex}
              totalSteps={totalSteps}
            />
          </CardContent>
        </Card>

        <Card className="border border-border/70">
          <CardHeader>
            <CardTitle>Step Explanation</CardTitle>
            <CardDescription>
              The message changes as the algorithm compares, selects, and swaps.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlgorithmExplanation algorithm={algorithm} step={currentStep} />
          </CardContent>
        </Card>

        <ComplexitySummaryCard algorithm={algorithm} />
      </div>
    </section>
  )
}

function SearchAlgorithmExperience({
  algorithm,
}: {
  algorithm: AlgorithmSummary
}) {
  const searchAlgorithm = getSearchAlgorithm(algorithm.slug)
  const [scenario, setScenario] = useState(() =>
    createSearchScenario(searchAlgorithm?.requiresSorted)
  )

  const steps = useMemo(() => {
    if (!searchAlgorithm) {
      return []
    }

    return searchAlgorithm.generateSteps(scenario.dataset, scenario.target)
  }, [scenario, searchAlgorithm])

  const {
    currentStep,
    isAtEnd,
    isPlaying,
    nextStep,
    reset,
    setSpeed,
    speed,
    stepIndex,
    togglePlay,
    totalSteps,
  } = useAlgorithmPlayer(steps, 420)

  function handleRandomize() {
    setScenario(createSearchScenario(searchAlgorithm?.requiresSorted))
  }

  if (!searchAlgorithm) {
    return (
      <Card className="border border-border/70">
        <CardHeader>
          <CardTitle>Search engine not found</CardTitle>
          <CardDescription>
            This search route has summary content, but no registered step generator yet.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
      <Card className="border border-border/70">
        <CardHeader>
          <CardTitle>Visualizer Stage</CardTitle>
          <CardDescription>
            {searchAlgorithm.requiresSorted
              ? `${algorithm.name} repeatedly halves a sorted search window to find the target faster.`
              : `${algorithm.name} checks one value at a time until it finds the target.`}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <VisualizerStage step={currentStep} />

          <AlgorithmControls
            isPlaying={isPlaying}
            isStepDisabled={isAtEnd}
            onRandomize={handleRandomize}
            onReset={reset}
            onStep={nextStep}
            onTogglePlay={togglePlay}
            onSpeedChange={setSpeed}
            speed={speed}
          />
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="border border-border/70">
          <CardHeader>
            <CardTitle>Live Metrics</CardTitle>
            <CardDescription>
              These values update as each cell gets checked.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlgorithmMetrics
              step={currentStep}
              stepIndex={stepIndex}
              totalSteps={totalSteps}
            />
          </CardContent>
        </Card>

        <Card className="border border-border/70">
          <CardHeader>
            <CardTitle>Step Explanation</CardTitle>
            <CardDescription>
              The message changes as the search moves across the array.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlgorithmExplanation algorithm={algorithm} step={currentStep} />
          </CardContent>
        </Card>

        <ComplexitySummaryCard algorithm={algorithm} />
      </div>
    </section>
  )
}

function PlaceholderExperience({ algorithm }: { algorithm: AlgorithmSummary }) {
  return (
    <>
      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="border border-border/70">
          <CardHeader>
            <CardTitle>Visualizer Stage</CardTitle>
            <CardDescription>
              This route is scaffolded and ready for its own step engine next.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-80 items-center justify-center rounded-3xl border border-dashed border-border/70 bg-muted/20 p-6 text-center text-sm text-muted-foreground">
              {algorithm.name} is planned, but it has not been wired into the player yet.
            </div>
          </CardContent>
        </Card>

        <ComplexitySummaryCard algorithm={algorithm} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border border-border/70">
          <CardHeader>
            <CardTitle>What lands here next</CardTitle>
            <CardDescription>
              This page will get its own step generator and visual treatment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-3xl border border-border/70 bg-muted/40 p-4">
              Step generation
            </div>
            <div className="rounded-3xl border border-border/70 bg-muted/40 p-4">
              Visualization state
            </div>
            <div className="rounded-3xl border border-border/70 bg-muted/40 p-4">
              Metrics and explanation messages
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/70">
          <CardHeader>
            <CardTitle>Build Note</CardTitle>
            <CardDescription>
              This route is the next milestone after the current vertical slices.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Bubble Sort and Selection Sort cover the sorting flow.
            </p>
            <p>
              Linear Search introduces the first search visualizer, and Binary Search
              is the natural next follow-up.
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  )
}

export function AlgorithmDetailPage() {
  const { slug = "" } = useParams()
  const algorithm = getAlgorithmBySlug(slug)

  if (!algorithm) {
    return (
      <PageContainer className="py-10 sm:py-14">
        <Card className="border border-border/70">
          <CardHeader>
            <CardTitle>Algorithm not found</CardTitle>
            <CardDescription>
              This route does not match the current MVP list.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              to="/algorithms"
              className="text-sm font-medium text-foreground underline underline-offset-4"
            >
              Back to Algorithms
            </Link>
          </CardContent>
        </Card>
      </PageContainer>
    )
  }

  const isInteractiveSort =
    algorithm.kind === "sort" && Boolean(getSortingAlgorithm(algorithm.slug))

  const isInteractiveSearch =
    algorithm.kind === "search" && Boolean(getSearchAlgorithm(algorithm.slug))

  return (
    <PageContainer className="space-y-8 py-10 sm:py-14">
      <div className="space-y-4">
        <Link
          to="/algorithms"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Back to Algorithms
        </Link>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{algorithm.kind}</Badge>
            {isInteractiveSort || isInteractiveSearch ? (
              <Badge variant="outline">Interactive</Badge>
            ) : (
              <Badge variant="outline">Coming next</Badge>
            )}
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {algorithm.name}
          </h1>

          <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            {algorithm.description}
          </p>
        </div>
      </div>

      {isInteractiveSort ? (
        <SortingAlgorithmExperience algorithm={algorithm} />
      ) : isInteractiveSearch ? (
        <SearchAlgorithmExperience algorithm={algorithm} />
      ) : (
        <PlaceholderExperience algorithm={algorithm} />
      )}
    </PageContainer>
  )
}
