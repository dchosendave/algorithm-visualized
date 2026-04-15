import { Route, Routes } from "react-router"

import { SiteHeader } from "@/components/app/site-header"
import { AlgorithmDetailPage } from "@/pages/algorithm-detail-page"
import { AlgorithmsPage } from "@/pages/algorithms-page"
import { BigOPage } from "@/pages/big-o-page"
import { HomePage } from "@/pages/home-page"

export default function App() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/algorithms" element={<AlgorithmsPage />} />
          <Route path="/algorithms/:slug" element={<AlgorithmDetailPage />} />
          <Route path="/big-o" element={<BigOPage />} />
        </Routes>
      </main>
    </div>
  )
}
