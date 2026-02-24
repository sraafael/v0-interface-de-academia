"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Dumbbell,
  LogOut,
  Flame,
  Target,
  Trophy,
  Calendar,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  Play,
} from "lucide-react"
import { ExerciseAnimation } from "@/components/exercise-animation"

interface DashboardStudentProps {
  onLogout: () => void
}

interface WorkoutExercise {
  exercise: string
  sets: string
  weight: string
  done: boolean
  animationType: string
}

export function DashboardStudent({ onLogout }: DashboardStudentProps) {
  const [workoutDays] = useState([
    {
      label: "Treino A",
      muscleGroups: "Peito e Triceps",
      exercises: [
        { exercise: "Supino Reto", sets: "4x12", weight: "60kg", done: true, animationType: "bench-press" },
        { exercise: "Supino Inclinado", sets: "4x10", weight: "50kg", done: true, animationType: "incline-press" },
        { exercise: "Crucifixo", sets: "3x15", weight: "16kg", done: false, animationType: "chest-fly" },
        { exercise: "Triceps Pulley", sets: "4x12", weight: "30kg", done: false, animationType: "tricep-pushdown" },
        { exercise: "Triceps Frances", sets: "3x12", weight: "12kg", done: false, animationType: "overhead-extension" },
        { exercise: "Abdominal Crunch", sets: "3x20", weight: "Peso corporal", done: false, animationType: "crunch" },
      ] as WorkoutExercise[],
    },
    {
      label: "Treino B",
      muscleGroups: "Costas e Biceps",
      exercises: [
        { exercise: "Puxada Frontal", sets: "4x12", weight: "55kg", done: false, animationType: "lat-pulldown" },
        { exercise: "Remada Curvada", sets: "4x10", weight: "50kg", done: false, animationType: "bent-row" },
        { exercise: "Remada Baixa", sets: "3x12", weight: "45kg", done: false, animationType: "seated-row" },
        { exercise: "Rosca Direta", sets: "4x12", weight: "18kg", done: false, animationType: "bicep-curl" },
        { exercise: "Rosca Martelo", sets: "3x12", weight: "14kg", done: false, animationType: "hammer-curl" },
        { exercise: "Prancha", sets: "3x45s", weight: "Peso corporal", done: false, animationType: "plank" },
      ] as WorkoutExercise[],
    },
    {
      label: "Treino C",
      muscleGroups: "Pernas e Ombros",
      exercises: [
        { exercise: "Agachamento", sets: "4x12", weight: "80kg", done: false, animationType: "squat" },
        { exercise: "Leg Press", sets: "4x15", weight: "150kg", done: false, animationType: "leg-press" },
        { exercise: "Cadeira Extensora", sets: "3x12", weight: "40kg", done: false, animationType: "leg-extension" },
        { exercise: "Cadeira Flexora", sets: "3x12", weight: "35kg", done: false, animationType: "leg-curl" },
        { exercise: "Desenvolvimento", sets: "4x10", weight: "30kg", done: false, animationType: "shoulder-press" },
        { exercise: "Elevacao Lateral", sets: "4x12", weight: "10kg", done: false, animationType: "lateral-raise" },
      ] as WorkoutExercise[],
    },
  ])

  const [selectedExercise, setSelectedExercise] = useState<WorkoutExercise | null>(null)
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set(["Supino Reto", "Supino Inclinado"]))

  const toggleComplete = (exerciseName: string) => {
    setCompletedExercises((prev) => {
      const next = new Set(prev)
      if (next.has(exerciseName)) {
        next.delete(exerciseName)
      } else {
        next.add(exerciseName)
      }
      return next
    })
  }

  const totalExercisesToday = workoutDays[0].exercises.length
  const doneToday = workoutDays[0].exercises.filter((e) => completedExercises.has(e.exercise)).length
  const progressPercent = Math.round((doneToday / totalExercisesToday) * 100)

  const paymentHistory = [
    { month: "Fevereiro 2026", value: "R$ 149,90", status: "pago", date: "05/02/2026" },
    { month: "Janeiro 2026", value: "R$ 149,90", status: "pago", date: "05/01/2026" },
    { month: "Dezembro 2025", value: "R$ 149,90", status: "pago", date: "05/12/2025" },
    { month: "Novembro 2025", value: "R$ 149,90", status: "pago", date: "05/11/2025" },
    { month: "Outubro 2025", value: "R$ 139,90", status: "pago", date: "05/10/2025" },
    { month: "Setembro 2025", value: "R$ 139,90", status: "atrasado", date: "12/09/2025" },
  ]

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
            { label: "Sequencia", value: "12 dias", icon: Flame, bgColor: "bg-[oklch(0.65_0.20_30)]/15", textColor: "text-[oklch(0.70_0.20_30)]" },
            { label: "Meta Semanal", value: "4/5", icon: Target, bgColor: "bg-primary/15", textColor: "text-primary" },
            { label: "Conquistas", value: "8", icon: Trophy, bgColor: "bg-[oklch(0.75_0.15_85)]/15", textColor: "text-[oklch(0.75_0.15_85)]" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border bg-card">
              <CardContent className="flex items-center gap-4 pt-6">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-semibold font-mono text-foreground">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="treino-a" className="mt-8">
          <TabsList className="bg-secondary">
            <TabsTrigger value="treino-a">Treino A</TabsTrigger>
            <TabsTrigger value="treino-b">Treino B</TabsTrigger>
            <TabsTrigger value="treino-c">Treino C</TabsTrigger>
            <TabsTrigger value="pagamento">Mensalidade</TabsTrigger>
          </TabsList>

          {workoutDays.map((day, dayIdx) => (
            <TabsContent key={dayIdx} value={`treino-${String.fromCharCode(97 + dayIdx)}`}>
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-foreground font-mono">
                      <Calendar className="h-5 w-5 text-[oklch(0.65_0.20_30)]" />
                      {day.label} - {day.muscleGroups}
                    </CardTitle>
                    {dayIdx === 0 && (
                      <span className="text-sm font-mono text-primary">{progressPercent}%</span>
                    )}
                  </div>
                  {dayIdx === 0 && (
                    <Progress value={progressPercent} className="mt-2 h-2 bg-secondary [&>div]:bg-primary" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {day.exercises.map((exercise, i) => {
                      const isDone = completedExercises.has(exercise.exercise)
                      return (
                        <div
                          key={i}
                          className={`flex items-center gap-4 rounded-lg border p-4 transition-colors ${
                            isDone
                              ? "border-primary/20 bg-primary/5"
                              : "border-border bg-secondary"
                          }`}
                        >
                          <button
                            onClick={() => toggleComplete(exercise.exercise)}
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                              isDone
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-muted-foreground hover:border-primary/50"
                            }`}
                            aria-label={isDone ? "Marcar como incompleto" : "Marcar como completo"}
                          >
                            {isDone ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            ) : (
                              <span className="text-xs font-mono">{i + 1}</span>
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${isDone ? "text-foreground line-through opacity-60" : "text-foreground"}`}>
                              {exercise.exercise}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {exercise.sets} - {exercise.weight}
                            </p>
                          </div>
                          <button
                            onClick={() => setSelectedExercise(exercise)}
                            className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                            aria-label={`Ver animacao de ${exercise.exercise}`}
                          >
                            <Play className="h-3 w-3" />
                            <span className="hidden sm:inline">Ver execucao</span>
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}

          {/* TAB: Pagamento */}
          <TabsContent value="pagamento">
            <div className="flex flex-col gap-6">
              {/* Status card */}
              <Card className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/15">
                        <CreditCard className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Mensalidade Atual</p>
                        <p className="text-2xl font-semibold font-mono text-foreground">R$ 149,90</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 sm:items-end">
                      <Badge className="bg-primary/15 text-primary border-0">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Em dia
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        Proximo vencimento: <span className="font-medium text-foreground">05/03/2026</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Plan info */}
              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="border-border bg-card">
                  <CardContent className="flex flex-col items-center gap-2 pt-6 text-center">
                    <Dumbbell className="h-6 w-6 text-primary" />
                    <p className="text-xs text-muted-foreground">Plano</p>
                    <p className="text-sm font-medium text-foreground">Premium</p>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardContent className="flex flex-col items-center gap-2 pt-6 text-center">
                    <Calendar className="h-6 w-6 text-[oklch(0.65_0.18_250)]" />
                    <p className="text-xs text-muted-foreground">Membro desde</p>
                    <p className="text-sm font-medium text-foreground">Mar 2025</p>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardContent className="flex flex-col items-center gap-2 pt-6 text-center">
                    <Clock className="h-6 w-6 text-[oklch(0.75_0.15_85)]" />
                    <p className="text-xs text-muted-foreground">Forma de pagamento</p>
                    <p className="text-sm font-medium text-foreground">Cartao de credito</p>
                  </CardContent>
                </Card>
              </div>

              {/* Payment history */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground font-mono">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Historico de Pagamentos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {paymentHistory.map((payment, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 rounded-lg border border-border bg-secondary p-3"
                      >
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                          payment.status === "pago"
                            ? "bg-primary/15"
                            : "bg-destructive/15"
                        }`}>
                          {payment.status === "pago" ? (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{payment.month}</p>
                          <p className="text-xs text-muted-foreground">Pago em {payment.date}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-sm font-mono font-medium text-foreground">{payment.value}</span>
                          <Badge
                            variant="outline"
                            className={
                              payment.status === "pago"
                                ? "border-primary/30 text-primary"
                                : "border-destructive/30 text-destructive"
                            }
                          >
                            {payment.status === "pago" ? "Pago" : "Atrasado"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* DIALOG: Exercise Animation */}
      <Dialog open={!!selectedExercise} onOpenChange={(open) => !open && setSelectedExercise(null)}>
        <DialogContent className="bg-card border-border sm:max-w-md">
          {selectedExercise && (
            <>
              <DialogHeader>
                <DialogTitle className="text-foreground font-mono">{selectedExercise.exercise}</DialogTitle>
                <DialogDescription>
                  {selectedExercise.sets} - {selectedExercise.weight}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4">
                <div className="relative flex h-48 w-48 items-center justify-center rounded-2xl bg-secondary">
                  <ExerciseAnimation
                    type={selectedExercise.animationType}
                    className="h-40 w-40"
                  />
                </div>
                <div className="grid w-full grid-cols-2 gap-3">
                  <div className="rounded-lg bg-secondary p-3 text-center">
                    <p className="text-xs text-muted-foreground">Series</p>
                    <p className="text-lg font-semibold font-mono text-foreground">
                      {selectedExercise.sets.split("x")[0]}
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary p-3 text-center">
                    <p className="text-xs text-muted-foreground">Repeticoes</p>
                    <p className="text-lg font-semibold font-mono text-foreground">
                      {selectedExercise.sets.split("x")[1]}
                    </p>
                  </div>
                </div>
                <div className="w-full rounded-lg bg-primary/10 p-3">
                  <p className="text-xs text-muted-foreground mb-1">Dica de execucao</p>
                  <p className="text-sm text-foreground leading-relaxed">
                    Mantenha o movimento controlado, expirando na fase concentrica e inspirando na fase excentrica. Descanse 60-90 segundos entre as series.
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
