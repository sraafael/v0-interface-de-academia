"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, LogOut, Users, Clock, ClipboardList, Calendar } from "lucide-react"

interface DashboardProfessorProps {
  onLogout: () => void
}

export function DashboardProfessor({ onLogout }: DashboardProfessorProps) {
  const todayClasses = [
    { time: "06:00", name: "Musculacao - Turma A", students: 12, status: "concluida" },
    { time: "08:00", name: "Funcional", students: 8, status: "concluida" },
    { time: "10:00", name: "Musculacao - Turma B", students: 15, status: "em-andamento" },
    { time: "14:00", name: "Personal - Maria Silva", students: 1, status: "proxima" },
    { time: "16:00", name: "Crossfit", students: 20, status: "proxima" },
    { time: "18:00", name: "Musculacao - Turma C", students: 18, status: "proxima" },
  ]

  const myStudents = [
    { name: "Ana Costa", plan: "Hipertrofia", lastSession: "Hoje" },
    { name: "Bruno Lima", plan: "Emagrecimento", lastSession: "Ontem" },
    { name: "Carla Mota", plan: "Condicionamento", lastSession: "Hoje" },
    { name: "Diego Reis", plan: "Hipertrofia", lastSession: "2 dias" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[oklch(0.55_0.15_250)]">
              <Dumbbell className="h-5 w-5 text-foreground" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-base font-semibold font-mono text-foreground">FitPro</h1>
              <p className="text-xs text-muted-foreground">Painel do Professor</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout} className="text-muted-foreground hover:text-foreground">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold font-mono text-foreground">
            Ola, Professor
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Confira sua agenda e seus alunos de hoje.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Aulas Hoje", value: "6", icon: Calendar },
            { label: "Meus Alunos", value: "45", icon: Users },
            { label: "Horas Trabalhadas", value: "4h 30m", icon: Clock },
          ].map((stat) => (
            <Card key={stat.label} className="border-border bg-card">
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[oklch(0.55_0.15_250)]/15">
                  <stat.icon className="h-6 w-6 text-[oklch(0.65_0.18_250)]" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-semibold font-mono text-foreground">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <Card className="border-border bg-card lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground font-mono">
                <ClipboardList className="h-5 w-5 text-[oklch(0.65_0.18_250)]" />
                Agenda de Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {todayClasses.map((cls, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg border border-border bg-secondary p-3">
                    <span className="w-14 text-sm font-mono font-medium text-muted-foreground">{cls.time}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{cls.name}</p>
                      <p className="text-xs text-muted-foreground">{cls.students} aluno{cls.students > 1 ? "s" : ""}</p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        cls.status === "concluida"
                          ? "bg-primary/15 text-primary"
                          : cls.status === "em-andamento"
                          ? "bg-[oklch(0.75_0.15_85)]/15 text-[oklch(0.75_0.15_85)]"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {cls.status === "concluida" ? "Concluida" : cls.status === "em-andamento" ? "Em andamento" : "Proxima"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground font-mono">
                <Users className="h-5 w-5 text-[oklch(0.65_0.18_250)]" />
                Alunos Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {myStudents.map((student, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-secondary p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[oklch(0.55_0.15_250)]/20 text-sm font-semibold text-[oklch(0.65_0.18_250)]">
                        {student.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.plan}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{student.lastSession}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
