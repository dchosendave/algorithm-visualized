import { PageContainer } from "@/components/app/page-container"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const sampleN = 128

const complexityItems = [
  {
    label: "O(1)",
    value: 1,
    note: "Stays flat no matter how large the input grows.",
    example: "Array access",
  },
  {
    label: "O(log n)",
    value: Math.round(Math.log2(sampleN)),
    note: "Grows slowly by repeatedly cutting the search space down.",
    example: "Binary search",
  },
  {
    label: "O(n)",
    value: sampleN,
    note: "Grows in direct proportion to the input size.",
    example: "Linear search",
  },
  {
    label: "O(n log n)",
    value: Math.round(sampleN * Math.log2(sampleN)),
    note: "Often shows up in efficient divide-and-conquer algorithms.",
    example: "Merge sort",
  },
  {
    label: "O(n^2)",
    value: sampleN * sampleN,
    note: "Explodes quickly because work is repeated across pairs.",
    example: "Bubble sort",
  },
]

const maxValue = Math.max(...complexityItems.map((item) => item.value))

export function BigOPage() {
  return (
    <PageContainer className="space-y-8 py-10 sm:py-14">
      <header className="space-y-4">
        <Badge variant="outline">Big O Lab</Badge>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Visualize growth before you memorize notation
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            This page will become the complexity playground of the app. For now,
            it gives you the structure and the teaching direction we’ll turn
            into interactive charts next.
          </p>
        </div>
      </header>

      <Card className="border border-border/70">
        <CardHeader>
          <CardTitle>Relative growth at n = {sampleN}</CardTitle>
          <CardDescription>
            These are not runtime measurements. They are relative operation
            counts meant to show how growth changes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {complexityItems.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{item.label}</Badge>
                  <span className="text-muted-foreground">{item.example}</span>
                </div>
                <span className="font-medium">{item.value.toLocaleString()}</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-foreground transition-all"
                  style={{
                    width: `${Math.max((item.value / maxValue) * 100, 2)}%`,
                  }}
                />
              </div>

              <p className="text-sm text-muted-foreground">{item.note}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border border-border/70">
          <CardHeader>
            <CardTitle>What comes next here</CardTitle>
            <CardDescription>
              This route will become a true visual lab, not just a static page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-3xl border border-border/70 bg-muted/40 p-4">
              A line chart comparing O(1), O(log n), O(n), O(n log n), and O(n^2)
            </div>
            <div className="rounded-3xl border border-border/70 bg-muted/40 p-4">
              An input slider that changes n live and updates each curve
            </div>
            <div className="rounded-3xl border border-border/70 bg-muted/40 p-4">
              Real algorithm examples to connect the math to behavior
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/70">
          <CardHeader>
            <CardTitle>Teaching rule</CardTitle>
            <CardDescription>
              We want the page to feel intuitive, not overly academic.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              The final Big O experience should focus on growth, not device
              speed. That means we'll use theoretical relative values instead of
              real timing as the main teaching signal.
            </p>
            <p>
              Once the algorithm visualizer is working well, this page becomes a
              natural extension of that learning flow.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
