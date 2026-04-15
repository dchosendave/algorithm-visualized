import { Link } from "react-router"

import { PageContainer } from "@/components/app/page-container"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { algorithms } from "@/data/algorithm-content"

export function AlgorithmsPage() {
  return (
    <PageContainer className="space-y-8 py-10 sm:py-14">
      <header className="space-y-4">
        <Badge variant="outline">Algorithm Explorer</Badge>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Learn the mechanics before memorizing the terms
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            Each algorithm gets its own detail page with a visualizer, controls,
            step explanations, and complexity context. For now, this page is the
            launchpad into those routes.
          </p>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        {algorithms.map((algorithm) => (
          <Link key={algorithm.slug} to={`/algorithms/${algorithm.slug}`}>
            <Card className="h-full border border-border/70 transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <CardHeader className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{algorithm.kind}</Badge>
                  <Badge variant="outline">
                    Avg {algorithm.complexity.average}
                  </Badge>
                  <Badge variant="outline">
                    Space {algorithm.complexity.space}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <CardTitle>{algorithm.name}</CardTitle>
                  <CardDescription>{algorithm.description}</CardDescription>
                </div>
              </CardHeader>

              <CardContent className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                <div className="rounded-3xl border border-border/70 bg-muted/40 p-4">
                  <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Best
                  </span>
                  <span className="mt-1 block text-base font-medium text-foreground">
                    {algorithm.complexity.best}
                  </span>
                </div>
                <div className="rounded-3xl border border-border/70 bg-muted/40 p-4">
                  <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Worst
                  </span>
                  <span className="mt-1 block text-base font-medium text-foreground">
                    {algorithm.complexity.worst}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </PageContainer>
  )
}
