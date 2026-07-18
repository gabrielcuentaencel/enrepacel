"use client"

import { useState } from "react"
import { ArrowRight, Lock, Mail, ShieldCheck, User } from "lucide-react"
import { Brand } from "@/components/psy/brand"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ROLES, type Role } from "@/lib/mock-data"

export function AuthView({ onLogin }: { onLogin: (role: Role) => void }) {
  const [role, setRole] = useState<Role>("student")

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-12">
      {/* Subtle scientific grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Brand subtitle={false} className="mb-5" />
          <h1 className="text-pretty font-serif text-2xl font-semibold tracking-tight">
            AI vs. Human Evaluation in Psychometrics
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            A research platform for comparative rater analysis, generalizability
            &amp; Rasch modeling.
          </p>
        </div>

        <Card className="border-border/70 shadow-xl shadow-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Access the platform</CardTitle>
            <CardDescription>
              Sign in or create a research account to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {/* LOGIN */}
              <TabsContent value="login" className="mt-5 space-y-4">
                <Field
                  id="login-email"
                  label="Email"
                  icon={<Mail className="size-4" />}
                  type="email"
                  placeholder="researcher@university.edu"
                />
                <Field
                  id="login-password"
                  label="Password"
                  icon={<Lock className="size-4" />}
                  type="password"
                  placeholder="••••••••••••"
                />
                <RoleSelect role={role} onChange={setRole} />
                <Button
                  className="mt-1 w-full gap-1.5"
                  onClick={() => onLogin(role)}
                >
                  Sign in as {ROLES.find((r) => r.value === role)?.label}
                  <ArrowRight className="size-4" />
                </Button>
              </TabsContent>

              {/* REGISTER */}
              <TabsContent value="register" className="mt-5 space-y-4">
                <Field
                  id="reg-name"
                  label="Full name"
                  icon={<User className="size-4" />}
                  placeholder="Dr. Jane Doe"
                />
                <Field
                  id="reg-email"
                  label="Email"
                  icon={<Mail className="size-4" />}
                  type="email"
                  placeholder="researcher@university.edu"
                />
                <Field
                  id="reg-password"
                  label="Password"
                  icon={<Lock className="size-4" />}
                  type="password"
                  placeholder="Create a strong password"
                />
                <RoleSelect role={role} onChange={setRole} />
                <Button
                  className="mt-1 w-full gap-1.5"
                  onClick={() => onLogin(role)}
                >
                  Create account &amp; continue
                  <ArrowRight className="size-4" />
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 text-success" />
          IRB-approved · Responses anonymized for blind evaluation
        </p>
      </div>
    </main>
  )
}

function Field({
  id,
  label,
  icon,
  ...props
}: {
  id: string
  label: string
  icon: React.ReactNode
} & React.ComponentProps<typeof Input>) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <Input id={id} className="pl-9" {...props} />
      </div>
    </div>
  )
}

function RoleSelect({
  role,
  onChange,
}: {
  role: Role
  onChange: (r: Role) => void
}) {
  return (
    <div className="space-y-1.5">
      <Label>Role</Label>
      <Select value={role} onValueChange={(v) => onChange(v as Role)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a role">
            {(value: string) => ROLES.find((r) => r.value === value)?.label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {ROLES.map((r) => (
            <SelectItem key={r.value} value={r.value}>
              <span className="flex flex-col">
                <span className="font-medium">{r.label}</span>
                <span className="text-xs text-muted-foreground">
                  {r.description}
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
