"use client"

import { useState } from "react"
import { AuthView } from "@/components/psy/auth-view"
import { StudentView } from "@/components/psy/student-view"
import { TeacherView } from "@/components/psy/teacher-view"
import { ListadoDeExamenesView } from "@/components/psy/listadoDeExamenes-view"


import type { Role } from "@/lib/mock-data"

type View = "auth" | Role

export default function Page() {
  const [view, setView] = useState<View>("student")
  //const [view, setView] = useState<View>("teacher")
  //const [view, setView] = useState<View>("auditor")
  //const [view, setView] = useState<View>("listadoDeExamenes")

  if (view === "student") return <StudentView onLogout={() => setView("auth")} />
  if (view === "teacher") return <TeacherView onLogout={() => setView("auth")} />
  if (view === "auditor") return <ListadoDeExamenesView onLogout={() => setView("auth")} />
  if (view === "listadoDeExamenes") return <ListadoDeExamenesView onLogout={() => setView("auth")} />

  return <AuthView onLogin={(role) => setView(role)} />
}
