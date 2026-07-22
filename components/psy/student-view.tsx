"use client"

import { useState } from "react"
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  GitCompareArrows,
} from "lucide-react"
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
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EXAM, FEEDBACK_EVAL } from "@/lib/mock-data"

export function StudentView({ onLogout }: { onLogout: () => void }) {
  const pct = Math.round((EXAM.current / EXAM.total) * 100)
  const [choice, setChoice] = useState("b")

  return (
    <div className="min-h-svh">
      <TopNav portalLabel="Student Portal" onLogout={onLogout} />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <Tabs defaultValue="exam" className="w-full">
          <TabsList className="mb-6 grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="exam" className="gap-1.5">
              <ClipboardList className="size-4" /> 2Exam Panel
            </TabsTrigger>
            <TabsTrigger value="feedback" className="gap-1.5">
              <GitCompareArrows className="size-4" /> 3Feedback Eval
            </TabsTrigger>
          </TabsList>




          {/* ---------------- EXAM PANEL ---------------- */}
          <TabsContent value="exam" className="space-y-6">
            <div>
              <div className="mb-2 flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
                <div className="min-w-0">
                  <h2 className="font-serif text-lg font-semibold tracking-tight text-balance sm:text-xl">
                    {EXAM.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Answer thoughtfully — responses are anonymized before
                    grading.
                  </p>
                </div>
                <span className="shrink-0 text-sm font-medium text-muted-foreground">
                  Question {EXAM.current}
                  <span className="text-muted-foreground/60">
                    {" "}
                    / {EXAM.total}
                  </span>
                </span>
              </div>
              <Progress value={pct} className="h-2" />
            </div>

            <Card className="border-border/70 shadow-sm">
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                    {EXAM.question.id}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-accent text-accent-foreground"
                  >
                    {EXAM.question.construct}
                  </Badge>
                  <Badge variant="outline">{EXAM.question.difficulty}</Badge>
                </div>
                <CardTitle className="mt-3 text-pretty font-serif text-lg leading-relaxed font-medium">
                  {EXAM.question.prompt}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="answer">Your response</Label>
                  <Textarea
                    id="answer"
                    rows={9}
                    placeholder="Compose your critical evaluation here. Reference empirical evidence where possible…"
                    className="resize-none leading-relaxed"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Autosaved · Draft
                  </span>
                  <Button className="gap-1.5">
                    Submit &amp; Next <ArrowRight className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>





          {/* ---------------- FEEDBACK EVALUATION ---------------- */}
          <TabsContent value="feedback" className="space-y-6">
            <div>
              <h2 className="font-serif text-xl font-semibold tracking-tight">
                Evaluación comparativa de retroalimentación
              </h2>
              <p className="text-sm text-muted-foreground">
                Dos evaluadores revisaron tu respuesta. Dinos qué retroalimentación te resultó más útil; no te diremos cuál fue generada por IA.
              </p>
            </div>

            <Card className="border-border/70 bg-muted/40">
              <CardHeader className="pb-3">
                <CardDescription>La pregunta y tu respuesta</CardDescription>
                <CardTitle className="text-pretty font-serif text-base leading-relaxed font-medium">
                  {FEEDBACK_EVAL.question}
---
                  {FEEDBACK_EVAL.question}

                </CardTitle>

                <CardTitle className="text-pretty font-serif text-base leading-relaxed font-medium">
                  {FEEDBACK_EVAL.question}

                  {FEEDBACK_EVAL.question}

                </CardTitle>

              </CardHeader>
            </Card>




            <div className="grid gap-4 lg:grid-cols-2">
              <FeedbackCard
                data={FEEDBACK_EVAL.optionA}
                accent="indigo"
              />
              <FeedbackCard data={FEEDBACK_EVAL.optionB} accent="teal" />
            </div>

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
                  <Label htmlFor="justify">Justifique su eleccion</Label>
                  <Textarea
                    id="justify"
                    rows={4}
                    placeholder="Explica qué hizo que esta retroalimentación fuera más accionable, específica o precisa…"
                    className="resize-none leading-relaxed"
                  />
                </div>
                <div className="flex justify-end">
                  <Button className="gap-1.5">
                    Submit evaluation <CheckCircle2 className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function FeedbackCard({
  data,
  accent,
}: {
  data: { source: string; score: number; text: string }
  accent: "indigo" | "teal"
}) {
  const ring =
    accent === "indigo"
      ? "border-primary/25 bg-primary/[0.03]"
      : "border-chart-2/30 bg-chart-2/[0.05]"
  const dot = accent === "indigo" ? "bg-primary" : "bg-chart-2"
  return (
    <Card className={ring}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <span className={`size-2.5 rounded-full ${dot}`} />
            {data.source}
          </CardTitle>




        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-foreground/80">{data.text}</p>
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
