"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, LogOut, Flame, Target, Trophy, Calendar, ChevronRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface DashboardStudentProps {
  onLogout: () => void
}

export function DashboardStudent({ onLogout }: DashboardStudentProps) {
  const todayWorkout = [
    { exercise: "Supino Reto", sets: "4x12", weight: "60kg", done: true },
    { exercise: "Supino Inclinado", sets: "4x10", weight: "50kg", done: true },
    { exercise: "Crucifixo", sets: "3x15", weight: "16kg", done: false },
    { exercise: "Triceps Pulley", sets: "4x12", weight: "30kg", done: false },
    { exercise: "Triceps Frances", sets: "3x12", weight: "12kg", done: false },
    { exercise: "Abdominais", sets: "3x20", weight: "Peso corporal", done: false },
  ]

  const doneCount = todayWorkout.filter(e => e.done).length
  const progressPercent = Math.round((doneCount / todayWorkout.length) * 100)

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[oklch(0.65_0.20_30)]">
              <Dumbbell className="h-5 w-5 text-foreground" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-base font-semibold font-mono text-foreground">FitPro</h1>
              <p className="text-xs text-muted-foreground">Meu Treino</p>
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
            Ola, Aluno
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Continue firme no seu treino de hoje!
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Sequencia", value: "12 dias", icon: Flame, color: "bg-[oklch(0.65_0.20_30)]/15 text-[oklch(0.70_0.20_30)]" },
            { label: "Meta Semanal", value: "4/5", icon: Target, color: "bg-primary/15 text-primary" },
            { label: "Conquistas", value: "8", icon: Trophy, color: "bg-[oklch(0.75_0.15_85)]/15 text-[oklch(0.75_0.15_85)]" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border bg-card">
              <CardContent className="flex items-center gap-4 pt-6">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.color.split(" ")[0]}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color.split(" ")[1]}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-semibold font-mono text-foreground">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-border bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-foreground font-mono">
                <Calendar className="h-5 w-5 text-[oklch(0.65_0.20_30)]" />
                Treino de Hoje - Peito e Triceps
              </CardTitle>
              <span className="text-sm font-mono text-primary">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="mt-2 h-2 bg-secondary [&>div]:bg-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {todayWorkout.map((exercise, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 rounded-lg border p-4 transition-colors ${
                    exercise.done
                      ? "border-primary/20 bg-primary/5"
                      : "border-border bg-secondary"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                      exercise.done
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {exercise.done ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    ) : (
                      <span className="text-xs font-mono">{i + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${exercise.done ? "text-foreground line-through opacity-60" : "text-foreground"}`}>
                      {exercise.exercise}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {exercise.sets} - {exercise.weight}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
