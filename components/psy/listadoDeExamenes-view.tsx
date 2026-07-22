"use client"

import { useState } from "react"
import {
  LogOut,
  type LucideIcon,
  Ruler,
  SplitSquareVertical,
  ThumbsUp,
  ArrowRight,
  ClipboardList,
  GitCompareArrows,
  BarChart2,
  PlusCircle,
  List,
  Upload,
  FileText,
  Eye,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Save,
} from "lucide-react"

import { CheckCircle2 } from "lucide-react"


import { Brand } from "@/components/psy/brand"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  AiWinnersChart,
  DStudyChart,
  PreferencePie,
  RaterFitChart,
  VarianceChart,
  WrightMapChart,
} from "@/components/psy/auditor-charts"

import {
  EXAM,
  G_STATS,
  JUSTIFICATIONS,
  VARIANCE_KEYS,
  AUDIT_RECORD,
  EVALUATORS,
} from "@/lib/mock-data"

// ======================= TIPOS Y ESTADOS GLOBALES =======================
type GlobalView = "crear" | "listar" | "detalle"
type DetailTab = "audit" | "gtheory" | "mfrm" | "preferences" | "calificaciones"

// Datos de prueba para el listado de exámenes
const MOCK_EXAM_LIST = [
  { id: 1, name: "Examen de Psicometría", date: "2023-10-15" },
  { id: 2, name: "Evaluación Diagnóstica: Teoría de Respuesta", date: "2023-11-02" },
  { id: 3, name: "Cuestionario de Personalidad Múltiple", date: "2023-11-20" },
]

export function ListadoDeExamenesView({ onLogout }: { onLogout: () => void }) {
  const [currentView, setCurrentView] = useState<GlobalView>("listar")
  const [selectedExam, setSelectedExam] = useState<typeof MOCK_EXAM_LIST[0] | null>(null)

  const handleViewDetail = (exam: typeof MOCK_EXAM_LIST[0]) => {
    setSelectedExam(exam)
    setCurrentView("detalle")
  }

  return (
    <div className="flex min-h-svh bg-background">
      {/* ======================= SIDEBAR ======================= */}
      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
        <div className="border-b border-sidebar-border px-5 py-5">
          <Brand invert />
        </div>
        <nav className="flex-1 space-y-2 p-3">
          <p className="px-3 py-2 text-[11px] font-semibold tracking-wider text-sidebar-foreground/50 uppercase">
            Gestión de Exámenes
          </p>

          <button
            onClick={() => setCurrentView("crear")}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              currentView === "crear"
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <PlusCircle className="size-4 shrink-0" />
            Crear examen
          </button>

          <button
            onClick={() => setCurrentView("listar")}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              currentView === "listar" || currentView === "detalle"
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <List className="size-4 shrink-0" />
            Exámenes
          </button>
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold">
              AK
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-medium">Marcos</p>
              <p className="truncate text-xs text-sidebar-foreground/50">Administrador</p>
            </div>
            <button onClick={onLogout} className="text-sidebar-foreground/60 hover:text-sidebar-foreground">
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ======================= MAIN CONTENT ======================= */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="border-b border-border bg-card lg:hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <Brand subtitle={false} />
            <Button variant="outline" size="sm" onClick={onLogout} className="gap-1.5">
              <LogOut className="size-4" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
          <div className="flex gap-2 border-t border-border px-4 py-2">
            <Button
              variant={currentView === "crear" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentView("crear")}
              className="flex-1 gap-2"
            >
              <PlusCircle className="size-4 shrink-0" />
              Crear examen
            </Button>
            <Button
              variant={currentView === "listar" || currentView === "detalle" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentView("listar")}
              className="flex-1 gap-2"
            >
              <List className="size-4 shrink-0" />
              Exámenes
            </Button>
          </div>
        </div>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
          {currentView === "crear" && <CrearExamenView />}
          {currentView === "listar" && <ListarExamenesView onSelectExam={handleViewDetail} />}
          {currentView === "detalle" && selectedExam && <DetalleExamenView examName={selectedExam.name} />}
        </main>
      </div>
    </div>
  )
}

/* ======================= VISTAS PRINCIPALES ======================= */

function CrearExamenView() {
  // Estado para saber si el formulario ya se envió
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Si ya se envió, mostramos la vista de éxito
  if (isSubmitted) {
    return <RespuestaDeExamenCreadoView onReset={() => setIsSubmitted(false)} />
  }

  // Si no se ha enviado, mostramos el formulario normalmente
  return (
    <div className="max-w-2xl animate-in fade-in duration-300">
      <header className="mb-6">
        <h1 className="font-serif text-xl font-semibold tracking-tight text-balance sm:text-2xl">Crear Nuevo Examen</h1>
        <p className="text-sm text-muted-foreground">Configura los detalles y sube el banco de preguntas.</p>
      </header>

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-lg">Detalles del Examen</CardTitle>
          <CardDescription>Asegúrate de que el archivo TXT tenga el formato correcto.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="exam-name">Nombre del examen</Label>
            <Input id="exam-name" placeholder="Ej. Examen Parcial de Psicología Clínica..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="exam-file">Archivo de preguntas (.txt)</Label>
            <Input id="exam-file" type="file" accept=".txt" className="cursor-pointer" />
            <p className="text-xs text-muted-foreground mt-1">Solo se admiten archivos de texto plano (.txt)</p>
          </div>
          
          {/* AL HACER CLIC, CAMBIAMOS EL ESTADO A TRUE */}
          <Button onClick={() => setIsSubmitted(true)} className="gap-2 w-full sm:w-auto">
            <Upload className="size-4" />
            Crear y Guardar Examen
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}


function RespuestaDeExamenCreadoView({ onReset }: { onReset: () => void }) {
  return (
    <div className="max-w-2xl animate-in zoom-in-95 duration-500">
      <header className="mb-6">
        <h1 className="font-serif text-xl font-semibold tracking-tight text-balance sm:text-2xl">Proceso Finalizado</h1>
        <p className="text-sm text-muted-foreground">Resumen de la operación.</p>
      </header>

      {/* Le damos un toque verde (success) a la tarjeta para que se sienta como un éxito */}
      <Card className="border-success/40 bg-success/5 shadow-sm">
        <CardHeader className="text-center pt-10 pb-6 space-y-4">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/20 text-success">
            <CheckCircle2 className="size-8" />
          </div>
          <div>
            <CardTitle className="text-2xl font-serif text-success">¡Examen creado con éxito!</CardTitle>
            <CardDescription className="mt-2 text-base">
              El archivo de preguntas ha sido procesado correctamente. El examen ya está disponible en el listado para asignar evaluadores.
            </CardDescription>
          </div>
        </CardHeader>
        
        {/* Agregamos un botón para volver a crear otro examen si lo desea */}
        <CardContent className="flex justify-center pb-10">
          <Button onClick={onReset} variant="outline" className="gap-2 border-success text-success hover:bg-success/10">
            <PlusCircle className="size-4" />
            Crear otro examen
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function ListarExamenesView({ onSelectExam }: { onSelectExam: (exam: any) => void }) {
  return (
    <div>
      <header className="mb-6">
        <h1 className="font-serif text-xl font-semibold tracking-tight text-balance sm:text-2xl">Listado de Exámenes</h1>
        <p className="text-sm text-muted-foreground">Selecciona un examen para ver sus análisis y detalles.</p>
      </header>

      <div className="grid gap-4">
        {MOCK_EXAM_LIST.map((exam) => (
          <Card key={exam.id} className="border-border/70 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 shadow-sm hover:border-primary/40 transition-colors">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className="p-3 bg-primary/10 text-primary rounded-lg">
                <FileText className="size-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{exam.name}</h3>
                <p className="text-sm text-muted-foreground">Creado el: {exam.date}</p>
              </div>
            </div>
            <Button variant="secondary" onClick={() => onSelectExam(exam)} className="w-full sm:w-auto gap-2">
              <Eye className="size-4" />
              Ver detalle
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}

function DetalleExamenView({ examName }: { examName: string }) {
  const [activeTab, setActiveTab] = useState<DetailTab>("audit")

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-6">
        <h1 className="font-serif text-xl font-semibold tracking-tight text-balance break-words text-primary sm:text-2xl">
          {examName}
        </h1>
        <p className="text-sm text-muted-foreground">Panel de análisis.</p>
      </header>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as DetailTab)} className="w-full">
        <TabsList className="mb-6 grid w-full! grid-cols-2 gap-1 p-1 h-auto! group-data-horizontal/tabs:h-auto! sm:grid-cols-3 lg:grid-cols-5">

          <TabsTrigger value="audit" className="min-h-11 h-auto! gap-2 py-2.5 text-xs sm:text-sm">
            <ClipboardList className="size-4 shrink-0" />
            <span className="truncate">Preguntas del examen</span>
          </TabsTrigger>

          <TabsTrigger value="calificaciones" className="min-h-11 h-auto! gap-2 py-2.5 text-xs sm:text-sm">
            <FileCheck className="size-4 shrink-0" />
            <span className="truncate">Correccion de examen</span>
          </TabsTrigger>

          <TabsTrigger value="preferences" className="min-h-11 h-auto! gap-2 py-2.5 text-xs sm:text-sm">
            <GitCompareArrows className="size-4 shrink-0" />
            <span className="truncate">Evaluacion corrector</span>
          </TabsTrigger>

          <TabsTrigger value="gtheory" className="min-h-11 h-auto! gap-2 py-2.5 text-xs sm:text-sm">
            <BarChart2 className="size-4 shrink-0" />
            <span className="truncate">Generalizability Theory</span>
          </TabsTrigger>

          <TabsTrigger value="mfrm" className="min-h-11 h-auto! gap-2 py-2.5 text-xs sm:text-sm">
            <SplitSquareVertical className="size-4 shrink-0" />
            <span className="truncate">Many-Facet Rasch</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calificaciones" className="space-y-6 mt-4">
          <VerCalificaciones />
        </TabsContent>
        <TabsContent value="audit" className="space-y-6 mt-4"><AuditPage /></TabsContent>
        <TabsContent value="gtheory" className="space-y-6 mt-4"><GTheoryPage /></TabsContent>
        <TabsContent value="mfrm" className="space-y-6 mt-4"><MfrmPage /></TabsContent>
        <TabsContent value="preferences" className="space-y-6 mt-4"><PreferencesPage /></TabsContent>
      </Tabs>
    </div>
  )
}

/* ======================= NUEVA PÁGINA: VER CALIFICACIONES ======================= */
function VerCalificaciones() {
  const [choice, setChoice] = useState("b")
  const [editingA, setEditingA] = useState(false)
  const [editingB, setEditingB] = useState(false)
  const [scoresA, setScoresA] = useState(AUDIT_RECORD.scores.map((s) => s.score))
  const [scoresB, setScoresB] = useState(AUDIT_RECORD.scores.map((s) => s.score - 1)) // Simulamos notas ligeramente distintas para el Prof B

  return (
    <div className="space-y-6">
      
      {/* 1. FILTROS SUPERIORES */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Selector de Pregunta */}
        <Card className="border-border/70 p-4 space-y-3 shadow-sm bg-muted/20">
          <Label className="text-sm font-semibold">Pregunta:</Label>
          <Select defaultValue="Pregunta 1">
            <SelectTrigger className="w-full gap-2 bg-background">
              <SelectValue placeholder="Seleccione una pregunta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pregunta 1">Pregunta 1: Teoría Cognitiva</SelectItem>
              <SelectItem value="Pregunta 2">Pregunta 2: Análisis Estadístico</SelectItem>
              <SelectItem value="Pregunta 3">Pregunta 3: Ética Clínica</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex flex-col gap-2 sm:flex-row">

          <Button className="min-h-11 w-full gap-2 sm:w-auto">
            Pregunta Anterior
          </Button>

          <Button className="min-h-11 w-full gap-2 sm:w-auto">
            Siguiente Pregunta
          </Button>

          </div>
        </Card>

        {/* Selector de Alumno */}
        <Card className="border-border/70 p-4 space-y-3 shadow-sm bg-muted/20">
          <Label className="text-sm font-semibold">Alumno:</Label>
          <Select defaultValue="Miguel">
            <SelectTrigger className="w-full bg-background">
              <SelectValue>
                {(v: string) => EVALUATORS.find((e) => e.value === v)?.label || "Seleccione un alumno"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {EVALUATORS.map((e) => (
                <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-col gap-2 sm:flex-row">

          <Button className="min-h-11 w-full gap-2 sm:w-auto">
            Alumno Anterior
          </Button>

          <Button className="min-h-11 w-full gap-2 sm:w-auto">
            Siguiente Alumno
          </Button>

          </div>
        </Card>
      </div>

      {/* 2. RESPUESTA DEL ESTUDIANTE */}
      <Card className="border-border/70 shadow-sm">


        <CardHeader className="pb-3 border-b border-border/50 bg-muted/10">


          <CardTitle className="text-lg mt-2 leading-relaxed">
            {EXAM.question.prompt}
          </CardTitle>
        </CardHeader>


        <CardContent className="pt-4">
          <div className="rounded-lg bg-muted/30 p-4 border border-border/50">
            <p className="text-sm leading-relaxed text-foreground/90 italic">
              "{AUDIT_RECORD.answerExcerpt}"
            </p>
          </div>
        </CardContent>




      </Card>

      {/* 3. CORRECCIONES Y FEEDBACK (A vs B) */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profesor A */}
        <Card className={editingA ? "border-primary/50 shadow-[0_0_0_3px] shadow-primary/10" : "border-border/70"}>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-4 border-b border-border/50 bg-muted/10">
            <div>
              <CardTitle className="text-base flex items-center gap-2">Evaluador Marcos: Gabriel</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-5">
              {AUDIT_RECORD.scores.map((s, i) => (
                <div key={s.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">{s.label}</Label>
                    <span className={`rounded-md px-2 py-0.5 text-sm font-semibold tabular-nums ${editingA ? "bg-primary/10 text-primary" : "bg-muted"}`}>
                      {scoresA[i]} / 10
                    </span>
                  </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${scoresA[i] * 10}%` }} />
                    </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="rounded-lg bg-primary/5 border border-primary/10 p-4">
                <p className="text-sm leading-relaxed text-foreground/85">
                  "Tu análisis es bueno, pero te faltó citar evidencia empírica en el segundo párrafo. Mejora la estructura conceptual."
                </p>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Profesor B */}
        <Card className={editingB ? "border-primary/50 shadow-[0_0_0_3px] shadow-primary/10" : "border-border/70"}>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-4 border-b border-border/50 bg-muted/10">
            <div>
              <CardTitle className="text-base flex items-center gap-2">Evaluador IA: Gemini</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-5">
              {AUDIT_RECORD.scores.map((s, i) => (
                <div key={s.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">{s.label}</Label>
                    <span className={`rounded-md px-2 py-0.5 text-sm font-semibold tabular-nums ${editingB ? "bg-primary/10 text-primary" : "bg-muted"}`}>
                      {scoresB[i]} / 10
                    </span>
                  </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-chart-2" style={{ width: `${scoresB[i] * 10}%` }} />
                    </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="rounded-lg bg-chart-2/5 border border-chart-2/10 p-4">
                <p className="text-sm leading-relaxed text-foreground/85">
                  "Gran nivel de detalle. El argumento principal está bien fundamentado, aunque la conclusión resulta un poco precipitada."
                </p>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* 4. PREFERENCIA DEL ALUMNO */}
      <Card className="border-border/70 shadow-sm">
        <CardHeader className="pb-3 border-b border-border/50">
          <CardTitle className="text-base text-primary">Feedback preferido por el estudiante</CardTitle>
          <CardDescription>¿Qué comentario del evaluador consideró más útil el estudiante?</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <RadioGroup value={choice} onValueChange={setChoice} className="grid gap-4 sm:grid-cols-2" disabled>
            <ChoiceItem value="a" label="Prefirió el Feedback del Evaluador Humano Marcos" selected={choice === "a"} />
            <ChoiceItem value="b" label="Prefirió el Feedback del Evaluador IA ChatGPT" selected={choice === "b"} />
          </RadioGroup>
          <div className="space-y-2">
            <Label htmlFor="justify">Motivo de la elección</Label>



      <Card className="border-border/70 shadow-sm">

        <CardContent className="pt-4">
          <div className="rounded-lg bg-muted/30 p-4 border border-border/50">
            <p className="text-sm leading-relaxed text-foreground/90 italic">
              "{AUDIT_RECORD.answerExcerpt}"
            </p>
          </div>
        </CardContent>

      </Card>




          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ======================= COMPONENTES AUXILIARES Y RESTO DE VISTAS ======================= */
function ChoiceItem({ value, label, selected }: { value: string; label: string; selected: boolean }) {
  return (
    <Label
      htmlFor={`choice-${value}`}
      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
        selected ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border bg-background"
      }`}
    >
      <RadioGroupItem id={`choice-${value}`} value={value} />
      <span className="text-sm font-medium">{label}</span>
    </Label>
  )
}

// ... AQUÍ VAN LAS OTRAS VISTAS (AuditPage, GTheoryPage, MfrmPage, PreferencesPage, StatCard)
// Son exactamente las mismas que en la versión anterior. 


function AuditPage() {
  const pct = 10
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-end justify-between">
          <div><h2 className="font-serif text-xl font-semibold">Preguntas del examen</h2></div>
        </div>
        <Progress value={pct} className="h-2" />
      </div>
      <Card className="border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle className="font-serif leading-relaxed">{EXAM.question.prompt}</CardTitle>
        </CardHeader>
        <CardHeader>
          <CardTitle className="font-serif leading-relaxed">{EXAM.question.prompt}</CardTitle>
        </CardHeader>
      </Card>
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

function StatCard({ label, value, hint, tone }: { label: string; value: string; hint: string; tone: "primary" | "success" }) {
  return (
    <Card className="border-border/70">
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className={`mt-1 font-serif text-4xl font-semibold tabular-nums text-primary`}>{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  )
}
