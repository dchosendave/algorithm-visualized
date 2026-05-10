import { MoonStar, SunMedium } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { Link, NavLink } from "react-router"

import { PageContainer } from "@/components/app/page-container"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"

const navItems = [
  {
    to: "/",
    label: "Home",
    end: true,
  },
  {
    to: "/algorithms",
    label: "Algorithms",
  },
  {
    to: "/big-o",
    label: "Big O Lab",
  },
]

export function SiteHeader() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
      <PageContainer className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
            AV
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight">
              Algorithm Visualized
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Learn algorithms by watching them move
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1 rounded-full border border-border/70 bg-background/90 p-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className="relative rounded-full px-3 py-2 text-sm font-medium"
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-foreground"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-10",
                        isActive
                          ? "text-background"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -30 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 30 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {theme === "dark" ? <SunMedium /> : <MoonStar />}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      </PageContainer>
    </header>
  )
}
