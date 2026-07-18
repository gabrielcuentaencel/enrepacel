"use client"

import { useState } from "react"
import { CheckCircle2, FileText, HelpCircle, UserRoundX } from "lucide-react"
import { TopNav } from "@/components/psy/top-nav"
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
import { Textarea } from "@/components/ui/textarea"
import {
  GRADING_CONTEXT,
  TEACHER_FILTERS,
  TEACHER_QUESTIONS,
} from "@/lib/mock-data"

export function TeacherView({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="min-h-svh">
      <TopNav portalLabel="Rater / Teacher Panel" onLogout={onLogout} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Filter bar */}
        <div className="mb-6 flex flex-col gap-4 rounded-xl border border-border/70 bg-card p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold tracking-tight">
              Calificación a ciegas
            </h2>
            <p className="text-sm text-muted-foreground">
              La identidad del evaluador y la del estudiante se ocultan para evitar sesgos.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="space-y-1.5">
              <Label className="text-xs">Seleccionar pregunta</Label>
              <Select defaultValue="q1">
                <SelectTrigger className="w-full sm:w-52">
                  <SelectValue>
                    {(v: string) =>
                      TEACHER_QUESTIONS.find((q) => q.value === v)?.label}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {TEACHER_QUESTIONS.map((q) => (
                    <SelectItem key={q.value} value={q.value}>
                      {q.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Filtrar</Label>
              <Select defaultValue="pending">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue>
                    {(v: string) =>
                      TEACHER_FILTERS.find((f) => f.value === v)?.label}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {TEACHER_FILTERS.map((f) => (
                    <SelectItem key={f.value} value={f.value}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* LEFT: context */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-muted-foreground">
                Evaluating {GRADING_CONTEXT.questionLabel}
              </span>
              <Badge
                variant="secondary"
                className="bg-accent text-accent-foreground"
              >
                {GRADING_CONTEXT.construct}
              </Badge>
            </div>

            <Card className="border-border/70">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-1.5">
                  <HelpCircle className="size-3.5" /> Pregunta
                </CardDescription>
                <CardTitle className="text-pretty font-serif text-base leading-relaxed font-medium">
                  {GRADING_CONTEXT.question}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card className="border-border/70">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-1.5">
                  <UserRoundX className="size-3.5" /> Respuesta del estudiante
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm leading-relaxed text-foreground/85">
                    {GRADING_CONTEXT.anonymizedEssay}
                  </p>
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <FileText className="size-3.5" /> Submission #A-2291 · 412
                  words
                </p>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: rubric */}
          <RubricPanel />
        </div>
      </main>
    </div>
  )
}

function RubricPanel() {
  return (
    <Card className="border-border/70 lg:sticky lg:top-24 lg:self-start">
      <CardHeader>
        <CardTitle className="text-base">Rubricas</CardTitle>
        <CardDescription>Score each criterion from 0 to 10.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-7">
        {GRADING_CONTEXT.rubric.map((c) => (
          <RubricSlider key={c.id} label={c.label} initial={c.score} />
        ))}

        <div className="space-y-1.5">
          <Label htmlFor="qual">Qualitative feedback</Label>
          <Textarea
            id="qual"
            rows={4}
            placeholder="Provide constructive, criterion-referenced feedback…"
            className="resize-none leading-relaxed"
          />
        </div>

        <Button className="w-full gap-1.5 bg-success text-success-foreground hover:bg-success/90">
          <CheckCircle2 className="size-4" /> Submit Grade
        </Button>
      </CardContent>
    </Card>
  )
}

function RubricSlider({ label, initial }: { label: string; initial: number }) {
  const [val, setVal] = useState(initial)
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <Label className="text-sm">{label}</Label>
        <span className="flex items-baseline gap-1 rounded-md bg-primary/10 px-2 py-0.5 tabular-nums">
          <span className="text-sm font-semibold text-primary">{val}</span>
          <span className="text-xs text-primary/60">/ 10</span>
        </span>
      </div>
      <Slider
        min={0}
        max={10}
        step={1}
        value={[val]}
        onValueChange={(v) => setVal(Array.isArray(v) ? v[0] : v)}
      />
      <div className="flex justify-between text-[10px] font-medium text-muted-foreground/70">
        <span>0</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>
  )
}
