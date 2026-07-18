import { LogOut } from "lucide-react"
import { Brand } from "@/components/psy/brand"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function TopNav({
  portalLabel,
  onLogout,
}: {
  portalLabel: string
  onLogout: () => void
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Brand subtitle={false} />
          <Badge
            variant="secondary"
            className="hidden bg-accent text-accent-foreground sm:inline-flex"
          >
            {portalLabel}
          </Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
          className="gap-1.5"
        >
          <LogOut className="size-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  )
}
