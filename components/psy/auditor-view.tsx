"use client"

import { useState } from "react"
import {
  ClipboardCheck,
  LogOut,
  type LucideIcon,
  Pencil,
  Ruler,
  Save,
  SplitSquareVertical,
  ThumbsUp,
} from "lucide-react"
import { Brand } from "@/components/psy/brand"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  GitCompareArrows,
} from "lucide-react"


import {
  AiWinnersChart,
  DStudyChart,
  PreferencePie,
  RaterFitChart,
  VarianceChart,
  WrightMapChart,
} from "@/components/psy/auditor-charts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  AUDITOR_NAV,
  AUDIT_RECORD,
  EVALUATORS,
  G_STATS,
  JUSTIFICATIONS,
  TEACHER_QUESTIONS,
  VARIANCE_KEYS,
  type AuditorPage,
} from "@/lib/mock-data"

const ICONS: Record<string, LucideIcon> = {
  ClipboardCheck,
  SplitSquareVertical,
  Ruler,
  ThumbsUp,
}

const PAGE_META: Record<AuditorPage, { title: string; subtitle: string }> = {
  audit: {
    title: "Audit & Edit Scores2",
    subtitle: "Review and, if necessary, override evaluator assignments.",
  },
  gtheory: {
    title: "Generalizability Theory2 (G-Study)",
    subtitle: "Variance decomposition and dependability projections.",
  },
  mfrm: {
    title: "Many-Facet Rasch Measurement2",
    subtitle: "Calibrating persons, judges, and items on a common logit scale.",
  },
  preferences: {
    title: "Feedback Preferences",
    subtitle: "Which evaluator do respondents find more useful?",
  },
}

export function AuditorView({ onLogout }: { onLogout: () => void }) {
  const [choice, setChoice] = useState("b")


  const [page, setPage] = useState<AuditPage>("audit")
  //const [page, setPage] = useState<GTheoryPage>("gtheory")
  //const [page, setPage] = useState<MfrmPage>("mfrm")
  //const [page, setPage] = useState<PreferencesPage>("preferences")
  const meta = PAGE_META[page]

  return (
    <div className="flex min-h-svh bg-background">


      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
        33<div className="border-b border-sidebar-border px-5 py-5">
          <Brand invert />22
        </div>
        <nav className="flex-1 space-y-1 p-3">
          <p className="px-3 py-2 text-[11px] font-semibold tracking-wider text-sidebar-foreground/50 uppercase">
            Analysis2
          </p>
          {AUDITOR_NAV.map((item) => {
            const Icon = ICONS[item.icon]
            const active = page === item.id
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </button>
            )
          })}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold">
              AK
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-medium">Dr. A. Kessler2</p>
              <p className="truncate text-xs text-sidebar-foreground/50">
                Supervisor
              </p>
            </div>
            <button
              onClick={onLogout}
              aria-label="Logout"
              className="text-sidebar-foreground/60 hover:text-sidebar-foreground"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile nav */}
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:hidden">
          <Brand subtitle={false} />
          <Button variant="outline" size="sm" onClick={onLogout} className="gap-1.5">
            <LogOut className="size-4" />
          </Button>
        </div>
        <div className="border-b border-border bg-card px-4 py-2 lg:hidden">
          <Select value={page} onValueChange={(v) => setPage(v as AuditorPage)}>
            <SelectTrigger className="w-full">
              <SelectValue>
                {(v: string) =>
                  AUDITOR_NAV.find((item) => item.id === v)?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {AUDITOR_NAV.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
          <header className="mb-6">
            <h1 className="font-serif text-2xl font-semibold tracking-tight">
              {meta.title}
            </h1>
            <p className="text-sm text-muted-foreground">{meta.subtitle}</p>
          </header>

          {page === "audit" && <AuditPage />}
          {page === "gtheory" && <GTheoryPage />}
          {page === "mfrm" && <MfrmPage />}
          {page === "preferences" && <PreferencesPage />}
        </main>
      </div>
    </div>
  )
}

/* ======================= PAGE A: Audit & Edit ======================= */
function AuditPage() {
  const [choice, setChoice] = useState("b")

  const [editing, setEditing] = useState(true)
  const [scores, setScores] = useState(AUDIT_RECORD.scores.map((s) => s.score))

  return (
    <div className="space-y-6">


      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">

        <div className="flex-1 space-y-1.5">
          <Label className="text-xs">Seleccione estudiante1</Label>
          <Select defaultValue="gemini">
            <SelectTrigger className="w-full">
              <SelectValue>
                {(v: string) => EVALUATORS.find((e) => e.value === v)?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {EVALUATORS.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>


              <Button
                onClick={() => setEditing(false)}
                className="gap-1.5 bg-success text-success-foreground hover:bg-success/90"
              >
                <Save className="size-4" /> Anterior estudiante1
              </Button>
              <Button
                onClick={() => setEditing(false)}
                className="gap-1.5 bg-success text-success-foreground hover:bg-success/90"
              >
                <Save className="size-4" /> Siguiente estudiante1
              </Button>
        </div>









        <div className="flex-1 space-y-1.5">
          <Label className="text-xs">Seleccione estudiante2</Label>
          <Select defaultValue="gemini">
            <SelectTrigger className="w-full">
              <SelectValue>
                {(v: string) => EVALUATORS.find((e) => e.value === v)?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {EVALUATORS.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>



              <Button
                onClick={() => setEditing(false)}
                className="gap-1.5 bg-success text-success-foreground hover:bg-success/90"
              >
                <Save className="size-4" /> Anterior estudiante2
              </Button>
              <Button
                onClick={() => setEditing(false)}
                className="gap-1.5 bg-success text-success-foreground hover:bg-success/90"
              >
                <Save className="size-4" /> Siguiente estudiante2
              </Button>
        </div>
      </div>









      <div className="grid gap-6 lg:grid-cols-2">
        {/* Answer */}
        <Card className="border-border/70">
          <CardHeader className="pb-2">
            <CardDescription>Respuesta del estudiante</CardDescription>
            <CardTitle className="text-base">{AUDIT_RECORD.student}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm leading-relaxed text-foreground/85">
                {AUDIT_RECORD.answerExcerpt}
              </p>

            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm leading-relaxed text-foreground/85">
                {AUDIT_RECORD.answerExcerpt}
              </p>

            </div>




          </CardContent>
        </Card>




            <Card className="border-border/70">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  ¿Qué comentario es más útil?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <RadioGroup
                  value={choice}
                  onValueChange={setChoice}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  <ChoiceItem
                    value="a"
                    label="Feedback A"
                    selected={choice === "a"}
                  />
                  <ChoiceItem
                    value="b"
                    label="Feedback B"
                    selected={choice === "b"}
                  />
                </RadioGroup>
                <div className="space-y-1.5">
                  <Label htmlFor="justify">Justificacion de la eleccion del alumno</Label>
                  <Textarea
                    id="justify"
                    rows={4}
                    placeholder="Explica qué hizo que esta retroalimentación fuera más accionable, específica o precisa…"
                    className="resize-none leading-relaxed"
                  />
                </div>
              </CardContent>
            </Card>





        {/* Scores A*/}
        <Card className={editing ? "border-warning/50 shadow-[0_0_0_3px] shadow-warning/10" : "border-border/70"}>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-base">Puntuaciones asignadas por A</CardTitle>
              <CardDescription>
                {editing ? "Adjust the sliders to override." : "Read-only view."}
              </CardDescription>
            </div>
            {editing ? (
              <Badge className="bg-warning/15 text-warning-foreground">
                Editing
              </Badge>
            ) : (
              <Badge variant="secondary">Locked</Badge>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {AUDIT_RECORD.scores.map((s, i) => (
              <div key={s.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">{s.label}</Label>
                  <span
                    className={`rounded-md px-2 py-0.5 text-sm font-semibold tabular-nums ${
                      editing
                        ? "bg-warning/15 text-warning-foreground shadow-[0_0_10px] shadow-warning/30"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {scores[i]} / 10
                  </span>
                </div>
                {editing ? (
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    value={[scores[i]]}
                    onValueChange={(v) =>
                      setScores((prev) => {
                        const next = [...prev]
                        next[i] = Array.isArray(v) ? v[0] : v
                        return next
                      })
                    }
                    className="[&_[data-slot=slider-range]]:bg-warning [&_[data-slot=slider-thumb]]:border-warning"
                  />
                ) : (
                  <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${scores[i] * 10}%` }}
                    />
                  </div>
                )}
              </div>
            ))}


            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm leading-relaxed text-foreground/85">
                {AUDIT_RECORD.answerExcerpt}
              </p>
            </div>


            {editing ? (
              <Button
                onClick={() => setEditing(false)}
                className="w-full gap-1.5 bg-success text-success-foreground hover:bg-success/90"
              >
                <Save className="size-4" /> Save overrides
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setEditing(true)}
                className="w-full gap-1.5"
              >
                <Pencil className="size-4" /> Edit grades
              </Button>
            )}


          </CardContent>





        </Card>






        {/* Scores B*/}
        <Card className={editing ? "border-warning/50 shadow-[0_0_0_3px] shadow-warning/10" : "border-border/70"}>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-base">Puntuaciones asignadas por B</CardTitle>
              <CardDescription>
                {editing ? "Adjust the sliders to override." : "Read-only view."}
              </CardDescription>
            </div>
            {editing ? (
              <Badge className="bg-warning/15 text-warning-foreground">
                Editing
              </Badge>
            ) : (
              <Badge variant="secondary">Locked</Badge>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {AUDIT_RECORD.scores.map((s, i) => (
              <div key={s.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">{s.label}</Label>
                  <span
                    className={`rounded-md px-2 py-0.5 text-sm font-semibold tabular-nums ${
                      editing
                        ? "bg-warning/15 text-warning-foreground shadow-[0_0_10px] shadow-warning/30"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {scores[i]} / 10
                  </span>
                </div>
                {editing ? (
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    value={[scores[i]]}
                    onValueChange={(v) =>
                      setScores((prev) => {
                        const next = [...prev]
                        next[i] = Array.isArray(v) ? v[0] : v
                        return next
                      })
                    }
                    className="[&_[data-slot=slider-range]]:bg-warning [&_[data-slot=slider-thumb]]:border-warning"
                  />
                ) : (
                  <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${scores[i] * 10}%` }}
                    />
                  </div>
                )}
              </div>
            ))}


            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm leading-relaxed text-foreground/85">
                {AUDIT_RECORD.answerExcerpt}
              </p>
            </div>


          </CardContent>





        </Card>






      </div>
    </div>
  )
}

/* ======================= PAGE B: G-Theory ======================= */
function GTheoryPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Generalizability Coefficient (Eρ²)"
          value={G_STATS.gCoefficient.toFixed(2)}
          hint="Relative decision reliability"
          tone="primary"
        />
        <StatCard
          label="Dependability Index (Φ)"
          value={G_STATS.phi.toFixed(2)}
          hint="Absolute decision reliability"
          tone="success"
        />
      </div>

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-base">Variance Components</CardTitle>
          <CardDescription>
            Proportion of total score variance attributable to each facet.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <VarianceChart />
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {VARIANCE_KEYS.map((k) => (
              <div key={k.key} className="flex items-center gap-2 text-sm">
                <span
                  className="size-3 rounded-[3px]"
                  style={{ background: k.color }}
                />
                <span className="text-muted-foreground">{k.label}</span>
                <span className="font-semibold tabular-nums">
                  {VARIANCE_COMPONENTS_VALUE(k.key)}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-base">D-Study Projection</CardTitle>
          <CardDescription>
            Projected reliability as the number of raters increases.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DStudyChart />
        </CardContent>
      </Card>
    </div>
  )
}

function VARIANCE_COMPONENTS_VALUE(key: string) {
  const rec = {
    Persons: 65,
    Raters: 12,
    Items: 5,
    Error: 18,
  } as Record<string, number>
  return rec[key]
}

/* ======================= PAGE C: MFRM ======================= */
function MfrmPage() {
  return (
    <div className="space-y-6">
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-base">Wright Map (Variable Map)</CardTitle>
          <CardDescription>
            Persons, judges, and items positioned on a shared logit scale.
            Higher = greater ability / severity / difficulty.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WrightMapChart />
          <p className="mt-2 text-xs text-muted-foreground">
            Note: Human judges cluster high (more severe), while Gemini sits low
            (more lenient) — evidence of a rater-severity effect.
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-base">Rater Fit Statistics</CardTitle>
          <CardDescription>
            Infit mean-square. Values outside 0.6–1.4 indicate misfit
            (over/under-discrimination).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RaterFitChart />
        </CardContent>
      </Card>
    </div>
  )
}

/* ======================= PAGE D: Preferences ======================= */
function PreferencesPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="text-base">Human vs. AI Preference</CardTitle>
            <CardDescription>
              Share of respondents preferring each evaluator type.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PreferencePie />
          </CardContent>
        </Card>

        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="text-base">Which AI won?</CardTitle>
            <CardDescription>
              Preference share among AI evaluators.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AiWinnersChart />
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-base">Student Justifications</CardTitle>
          <CardDescription>
            Qualitative rationale behind each preference selection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 space-y-3 overflow-y-auto pr-1">
            {JUSTIFICATIONS.map((j) => (
              <div
                key={j.id}
                className="rounded-lg border border-border/70 bg-card p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    Respondent {j.respondent}
                  </span>
                  <Badge
                    className={
                      j.choice === "AI"
                        ? "bg-primary/10 text-primary hover:bg-primary/10"
                        : "bg-chart-2/15 text-chart-2 hover:bg-chart-2/15"
                    }
                  >
                    Preferred {j.choice}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {j.text}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ======================= Shared stat card ======================= */
function StatCard({
  label,
  value,
  hint,
  tone,
}: {
  label: string
  value: string
  hint: string
  tone: "primary" | "success"
}) {
  const accent =
    tone === "primary"
      ? "text-primary"
      : "text-success"
  return (
    <Card className="border-border/70">
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className={`mt-1 font-serif text-4xl font-semibold tabular-nums ${accent}`}>
          {value}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  )
}

function ChoiceItem({
  value,
  label,
  selected,
}: {
  value: string
  label: string
  selected: boolean
}) {
  return (
    <Label
      htmlFor={`choice-${value}`}
      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
        selected
          ? "border-primary bg-primary/5"
          : "border-border hover:bg-muted/50"
      }`}
    >
      <RadioGroupItem id={`choice-${value}`} value={value} />
      <span className="text-sm font-medium">{label}</span>
    </Label>
  )
}
