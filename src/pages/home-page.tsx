import { motion } from "motion/react"
import { Link } from "react-router"

import { PageContainer } from "@/components/app/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { algorithms } from "@/data/algorithm-content"

const featuredAlgorithms = algorithms.filter((algorithm) => algorithm.featured)

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

export function HomePage() {
  return (
    <>
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.06),transparent_32%)]">
        <PageContainer className="grid gap-6 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-20">
          <motion.div
            className="space-y-6"
            variants={heroContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={heroItem}>
              <Badge variant="outline">Interactive algorithm learning</Badge>
            </motion.div>

            <motion.div className="space-y-4" variants={heroItem}>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                See algorithms move. Understand why they work.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Algorithm Visualized is a client-side learning tool for sorting,
                searching, and Big O notation. The goal is simple: make each
                step obvious, not abstract.
              </p>
            </motion.div>

            <motion.div className="flex flex-wrap gap-3" variants={heroItem}>
              <Button asChild size="lg">
                <Link to="/algorithms">Explore Algorithms</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/big-o">Open Big O Lab</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <Card className="border border-border/70 bg-card/90 shadow-sm">
              <CardHeader>
                <CardTitle>What the MVP will teach</CardTitle>
                <CardDescription>
                  Start with four core algorithms and one clear complexity lab.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm text-muted-foreground">
                <div className="rounded-3xl border border-border/70 bg-muted/40 p-4">
                  Step-by-step playback with visual comparisons and swaps
                </div>
                <div className="rounded-3xl border border-border/70 bg-muted/40 p-4">
                  Search visualizations with active ranges and target matching
                </div>
                <div className="rounded-3xl border border-border/70 bg-muted/40 p-4">
                  A Big O playground that shows how growth changes as n increases
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </PageContainer>
      </section>

      <section className="py-12 sm:py-16">
        <PageContainer className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <Badge variant="secondary">MVP Algorithms</Badge>
              <h2 className="text-2xl font-semibold tracking-tight">
                The first learning paths
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                We'll build one polished vertical slice first, then reuse the
                same engine across the rest.
              </p>
            </div>

            <Button asChild variant="outline">
              <Link to="/algorithms">View All</Link>
            </Button>
          </div>

          <motion.div
            className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {featuredAlgorithms.map((algorithm) => (
              <motion.div key={algorithm.slug} variants={cardVariant}>
                <Link to={`/algorithms/${algorithm.slug}`}>
                  <Card className="h-full border border-border/70 transition-transform hover:-translate-y-0.5 hover:shadow-lg">
                    <CardHeader>
                      <CardDescription className="uppercase tracking-[0.18em]">
                        {algorithm.kind}
                      </CardDescription>
                      <CardTitle>{algorithm.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm leading-6 text-muted-foreground">
                        {algorithm.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">
                          Avg {algorithm.complexity.average}
                        </Badge>
                        <Badge variant="outline">
                          Space {algorithm.complexity.space}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </PageContainer>
      </section>
    </>
  )
}
