import { BrainCircuit } from "lucide-react"
import { cn } from "@/lib/utils"

export function Brand({
  className,
  subtitle = true,
  invert = false,
}: {
  className?: string
  subtitle?: boolean
  invert?: boolean
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg shadow-sm",
          invert
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "bg-primary text-primary-foreground",
        )}
      >
        <BrainCircuit className="size-5" />
      </div>
      <div className="leading-tight">
        <p
          className={cn(
            "font-serif text-base font-semibold tracking-tight",
            invert ? "text-sidebar-foreground" : "text-foreground",
          )}
        >
          Psychometrica
        </p>
        {subtitle && (
          <p
            className={cn(
              "text-[11px] font-medium",
              invert ? "text-sidebar-foreground/60" : "text-muted-foreground",
            )}
          >
            AI vs. Human Evaluation
          </p>
        )}
      </div>
    </div>
  )
}
