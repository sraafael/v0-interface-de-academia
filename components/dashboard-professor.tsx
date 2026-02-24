"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dumbbell,
  LogOut,
  Users,
  Clock,
  ClipboardList,
  Calendar,
  UserPlus,
  ChevronRight,
  ArrowLeftRight,
  Trash2,
  Search,
  Eye,
  Ruler,
  Weight,
} from "lucide-react"
import { workoutPlans, getAllExercises, type Exercise, type WorkoutPlan, type GoalType } from "@/lib/workout-data"

interface DashboardProfessorProps {
  onLogout: () => void
}

interface StudentData {
  id: string
  name: string
  ra: string
  age: number
  weight: number
  height: number
  imc: number
  goal: GoalType
  plan: WorkoutPlan
  status: "ativo" | "inativo"
  startDate: string
}

function calculateIMC(weight: number, height: number): number {
  if (height <= 0) return 0
  const heightM = height / 100
  return Math.round((weight / (heightM * heightM)) * 10) / 10
}

function getIMCLabel(imc: number): { label: string; color: string } {
  if (imc < 18.5) return { label: "Abaixo do peso", color: "text-[oklch(0.65_0.18_250)]" }
  if (imc < 25) return { label: "Peso normal", color: "text-primary" }
  if (imc < 30) return { label: "Sobrepeso", color: "text-[oklch(0.75_0.15_85)]" }
  return { label: "Obesidade", color: "text-destructive" }
}

export function DashboardProfessor({ onLogout }: DashboardProfessorProps) {
  const [students, setStudents] = useState<StudentData[]>([
    {
      id: "1", name: "Ana Costa", ra: "2024001001", age: 25, weight: 62, height: 165,
      imc: calculateIMC(62, 165), goal: "hipertrofia",
      plan: JSON.parse(JSON.stringify(workoutPlans[0])),
      status: "ativo", startDate: "2025-01-15",
    },
    {
      id: "2", name: "Bruno Lima", ra: "2024001002", age: 30, weight: 95, height: 178,
      imc: calculateIMC(95, 178), goal: "emagrecimento",
      plan: JSON.parse(JSON.stringify(workoutPlans[1])),
      status: "ativo", startDate: "2025-02-01",
    },
    {
      id: "3", name: "Carla Mota", ra: "2024001003", age: 22, weight: 55, height: 160,
      imc: calculateIMC(55, 160), goal: "condicionamento",
      plan: JSON.parse(JSON.stringify(workoutPlans[2])),
      status: "ativo", startDate: "2025-01-20",
    },
    {
      id: "4", name: "Diego Reis", ra: "2024001004", age: 28, weight: 82, height: 175,
      imc: calculateIMC(82, 175), goal: "hipertrofia",
      plan: JSON.parse(JSON.stringify(workoutPlans[0])),
      status: "ativo", startDate: "2024-11-10",
    },
  ])

  const [showAddStudent, setShowAddStudent] = useState(false)
  const [showStudentDetail, setShowStudentDetail] = useState<StudentData | null>(null)
  const [showSwapExercise, setShowSwapExercise] = useState<{
    studentId: string
    dayIndex: number
    exerciseIndex: number
  } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Add student form state
  const [newName, setNewName] = useState("")
  const [newRa, setNewRa] = useState("")
  const [newAge, setNewAge] = useState("")
  const [newWeight, setNewWeight] = useState("")
  const [newHeight, setNewHeight] = useState("")
  const [newGoal, setNewGoal] = useState<GoalType | "">("")

  const todayClasses = [
    { time: "06:00", name: "Musculacao - Turma A", students: 12, status: "concluida" },
    { time: "08:00", name: "Funcional", students: 8, status: "concluida" },
    { time: "10:00", name: "Musculacao - Turma B", students: 15, status: "em-andamento" },
    { time: "14:00", name: "Personal - Maria Silva", students: 1, status: "proxima" },
    { time: "16:00", name: "Crossfit", students: 20, status: "proxima" },
    { time: "18:00", name: "Musculacao - Turma C", students: 18, status: "proxima" },
  ]

  const computedIMC = newWeight && newHeight ? calculateIMC(Number(newWeight), Number(newHeight)) : 0

  const handleAddStudent = () => {
    if (!newName || !newRa || !newAge || !newWeight || !newHeight || !newGoal) return

    const selectedPlan = workoutPlans.find((p) => p.goal === newGoal)
    if (!selectedPlan) return

    const newStudent: StudentData = {
      id: Date.now().toString(),
      name: newName,
      ra: newRa,
      age: Number(newAge),
      weight: Number(newWeight),
      height: Number(newHeight),
      imc: calculateIMC(Number(newWeight), Number(newHeight)),
      goal: newGoal,
      plan: JSON.parse(JSON.stringify(selectedPlan)),
      status: "ativo",
      startDate: new Date().toISOString().split("T")[0],
    }

    setStudents((prev) => [...prev, newStudent])
    setShowAddStudent(false)
    resetForm()
  }

  const resetForm = () => {
    setNewName("")
    setNewRa("")
    setNewAge("")
    setNewWeight("")
    setNewHeight("")
    setNewGoal("")
  }

  const handleSwapExercise = (newExercise: Exercise) => {
    if (!showSwapExercise) return
    const { studentId, dayIndex, exerciseIndex } = showSwapExercise

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s
        const updatedPlan = { ...s.plan }
        const updatedDays = [...updatedPlan.days]
        const updatedExercises = [...updatedDays[dayIndex].exercises]
        updatedExercises[exerciseIndex] = { ...newExercise }
        updatedDays[dayIndex] = { ...updatedDays[dayIndex], exercises: updatedExercises }
        updatedPlan.days = updatedDays
        return { ...s, plan: updatedPlan }
      })
    )

    if (showStudentDetail) {
      const updated = students.find((s) => s.id === showSwapExercise.studentId)
      if (updated) {
        const updatedPlan = { ...updated.plan }
        const updatedDays = [...updatedPlan.days]
        const updatedExercises = [...updatedDays[dayIndex].exercises]
        updatedExercises[exerciseIndex] = { ...newExercise }
        updatedDays[dayIndex] = { ...updatedDays[dayIndex], exercises: updatedExercises }
        updatedPlan.days = updatedDays
        setShowStudentDetail({ ...updated, plan: updatedPlan })
      }
    }

    setShowSwapExercise(null)
  }

  const handleRemoveExercise = (studentId: string, dayIndex: number, exerciseIndex: number) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s
        const updatedPlan = { ...s.plan }
        const updatedDays = [...updatedPlan.days]
        const updatedExercises = updatedDays[dayIndex].exercises.filter((_, i) => i !== exerciseIndex)
        updatedDays[dayIndex] = { ...updatedDays[dayIndex], exercises: updatedExercises }
        updatedPlan.days = updatedDays
        return { ...s, plan: updatedPlan }
      })
    )

    if (showStudentDetail && showStudentDetail.id === studentId) {
      setShowStudentDetail((prev) => {
        if (!prev) return prev
        const updatedPlan = { ...prev.plan }
        const updatedDays = [...updatedPlan.days]
        const updatedExercises = updatedDays[dayIndex].exercises.filter((_, i) => i !== exerciseIndex)
        updatedDays[dayIndex] = { ...updatedDays[dayIndex], exercises: updatedExercises }
        updatedPlan.days = updatedDays
        return { ...prev, plan: updatedPlan }
      })
    }
  }

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.ra.includes(searchQuery)
  )

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
            Confira sua agenda, seus alunos e gerencie os treinos.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Aulas Hoje", value: "6", icon: Calendar },
            { label: "Meus Alunos", value: String(students.length), icon: Users },
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

        <Tabs defaultValue="agenda" className="mt-8">
          <TabsList className="bg-secondary">
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
            <TabsTrigger value="alunos">Meus Alunos</TabsTrigger>
            <TabsTrigger value="cadastrar">Cadastrar Aluno</TabsTrigger>
          </TabsList>

          {/* TAB: Agenda */}
          <TabsContent value="agenda">
            <Card className="border-border bg-card">
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
          </TabsContent>

          {/* TAB: Meus Alunos */}
          <TabsContent value="alunos">
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="flex items-center gap-2 text-foreground font-mono">
                    <Users className="h-5 w-5 text-[oklch(0.65_0.18_250)]" />
                    Meus Alunos ({students.length})
                  </CardTitle>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nome ou RA..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {filteredStudents.map((student) => {
                    const imcInfo = getIMCLabel(student.imc)
                    return (
                      <div
                        key={student.id}
                        className="flex items-center gap-4 rounded-lg border border-border bg-secondary p-4 transition-colors hover:border-[oklch(0.55_0.15_250)]/30 cursor-pointer"
                        onClick={() => setShowStudentDetail(student)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter") setShowStudentDetail(student) }}
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[oklch(0.55_0.15_250)]/20 text-sm font-semibold text-[oklch(0.65_0.18_250)]">
                          {student.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{student.name}</p>
                          <p className="text-xs text-muted-foreground">RA: {student.ra}</p>
                        </div>
                        <div className="hidden sm:flex flex-col items-end gap-1">
                          <Badge variant="outline" className="border-[oklch(0.55_0.15_250)]/30 text-[oklch(0.65_0.18_250)]">
                            {student.plan.goalLabel}
                          </Badge>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Weight className="h-3 w-3" />{student.weight}kg
                            </span>
                            <span className="flex items-center gap-1">
                              <Ruler className="h-3 w-3" />{student.height}cm
                            </span>
                            <span className={`font-medium ${imcInfo.color}`}>
                              IMC {student.imc}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                      </div>
                    )
                  })}
                  {filteredStudents.length === 0 && (
                    <div className="flex flex-col items-center gap-2 py-8 text-center">
                      <Users className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Nenhum aluno encontrado.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: Cadastrar Aluno */}
          <TabsContent value="cadastrar">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground font-mono">
                  <UserPlus className="h-5 w-5 text-[oklch(0.65_0.18_250)]" />
                  Cadastrar Novo Aluno
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label className="text-foreground">Nome Completo</Label>
                    <Input
                      placeholder="Ex: Joao da Silva"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-foreground">RA (Registro Academico)</Label>
                    <Input
                      placeholder="Ex: 2024001234"
                      value={newRa}
                      onChange={(e) => setNewRa(e.target.value)}
                      className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-foreground">Idade</Label>
                    <Input
                      type="number"
                      placeholder="Ex: 25"
                      value={newAge}
                      onChange={(e) => setNewAge(e.target.value)}
                      className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-foreground">Peso (kg)</Label>
                    <Input
                      type="number"
                      placeholder="Ex: 75"
                      value={newWeight}
                      onChange={(e) => setNewWeight(e.target.value)}
                      className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-foreground">Altura (cm)</Label>
                    <Input
                      type="number"
                      placeholder="Ex: 175"
                      value={newHeight}
                      onChange={(e) => setNewHeight(e.target.value)}
                      className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-foreground">Objetivo do Treino</Label>
                    <Select value={newGoal} onValueChange={(v) => setNewGoal(v as GoalType)}>
                      <SelectTrigger className="w-full bg-secondary border-border text-foreground">
                        <SelectValue placeholder="Selecione o objetivo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hipertrofia">Hipertrofia</SelectItem>
                        <SelectItem value="emagrecimento">Emagrecimento</SelectItem>
                        <SelectItem value="condicionamento">Condicionamento</SelectItem>
                        <SelectItem value="funcional">Funcional</SelectItem>
                        <SelectItem value="forca">Forca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* IMC Preview */}
                {computedIMC > 0 && (
                  <div className="mt-5 rounded-lg border border-border bg-secondary p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">IMC Calculado</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold font-mono text-foreground">{computedIMC}</span>
                        <span className={`text-xs font-medium ${getIMCLabel(computedIMC).color}`}>
                          {getIMCLabel(computedIMC).label}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Selected plan preview */}
                {newGoal && (
                  <div className="mt-5">
                    <p className="mb-3 text-sm font-medium text-foreground">
                      Plano de treino atribuido: <span className="text-[oklch(0.65_0.18_250)]">{workoutPlans.find((p) => p.goal === newGoal)?.goalLabel} - ABC</span>
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {workoutPlans
                        .find((p) => p.goal === newGoal)
                        ?.days.map((day, i) => (
                          <div key={i} className="rounded-lg border border-border bg-background p-3">
                            <p className="text-sm font-medium text-foreground">{day.label}</p>
                            <p className="text-xs text-muted-foreground mb-2">{day.muscleGroups}</p>
                            {day.exercises.map((ex, j) => (
                              <p key={j} className="text-xs text-muted-foreground">
                                {ex.name} - {ex.sets}x{ex.reps}
                              </p>
                            ))}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleAddStudent}
                  disabled={!newName || !newRa || !newAge || !newWeight || !newHeight || !newGoal}
                  className="mt-6 h-11 bg-[oklch(0.55_0.15_250)] text-foreground hover:bg-[oklch(0.55_0.15_250)]/90"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Cadastrar Aluno
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* DIALOG: Student Detail */}
      <Dialog open={!!showStudentDetail} onOpenChange={(open) => !open && setShowStudentDetail(null)}>
        <DialogContent className="max-w-2xl bg-card border-border max-h-[85vh] overflow-y-auto">
          {showStudentDetail && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-foreground font-mono">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[oklch(0.55_0.15_250)]/20 text-sm font-semibold text-[oklch(0.65_0.18_250)]">
                    {showStudentDetail.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  {showStudentDetail.name}
                </DialogTitle>
                <DialogDescription>RA: {showStudentDetail.ra}</DialogDescription>
              </DialogHeader>

              {/* Student info grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Idade", value: `${showStudentDetail.age} anos` },
                  { label: "Peso", value: `${showStudentDetail.weight} kg` },
                  { label: "Altura", value: `${showStudentDetail.height} cm` },
                  { label: "IMC", value: `${showStudentDetail.imc} - ${getIMCLabel(showStudentDetail.imc).label}` },
                ].map((info) => (
                  <div key={info.label} className="rounded-lg bg-secondary p-3">
                    <p className="text-xs text-muted-foreground">{info.label}</p>
                    <p className="text-sm font-medium text-foreground">{info.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-[oklch(0.55_0.15_250)]/30 text-[oklch(0.65_0.18_250)]">
                  {showStudentDetail.plan.goalLabel}
                </Badge>
                <Badge variant="secondary" className="text-muted-foreground">
                  Inicio: {new Date(showStudentDetail.startDate).toLocaleDateString("pt-BR")}
                </Badge>
              </div>

              {/* Workout plan editor */}
              <div className="flex flex-col gap-4">
                <p className="text-sm font-medium text-foreground font-mono">Plano de Treino ABC</p>
                {showStudentDetail.plan.days.map((day, dayIdx) => (
                  <div key={dayIdx} className="rounded-lg border border-border bg-secondary p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{day.label}</p>
                        <p className="text-xs text-muted-foreground">{day.muscleGroups}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {day.exercises.map((exercise, exIdx) => (
                        <div
                          key={exIdx}
                          className="flex items-center gap-3 rounded-md bg-background p-2.5 text-sm"
                        >
                          <span className="w-5 text-xs font-mono text-muted-foreground">{exIdx + 1}</span>
                          <span className="flex-1 text-foreground">{exercise.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {exercise.sets}x{exercise.reps}
                          </span>
                          <button
                            onClick={() =>
                              setShowSwapExercise({
                                studentId: showStudentDetail.id,
                                dayIndex: dayIdx,
                                exerciseIndex: exIdx,
                              })
                            }
                            className="rounded p-1 text-muted-foreground hover:text-[oklch(0.65_0.18_250)] hover:bg-[oklch(0.55_0.15_250)]/10 transition-colors"
                            title="Trocar exercicio"
                          >
                            <ArrowLeftRight className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleRemoveExercise(showStudentDetail.id, dayIdx, exIdx)}
                            className="rounded p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            title="Remover exercicio"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* DIALOG: Swap Exercise */}
      <Dialog open={!!showSwapExercise} onOpenChange={(open) => !open && setShowSwapExercise(null)}>
        <DialogContent className="bg-card border-border max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground font-mono">Trocar Exercicio</DialogTitle>
            <DialogDescription>Selecione o novo exercicio para substituir.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            {getAllExercises().map((ex) => (
              <button
                key={ex.id}
                onClick={() => handleSwapExercise(ex)}
                className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-3 text-left transition-colors hover:border-[oklch(0.55_0.15_250)]/30 hover:bg-secondary/80"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{ex.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {ex.category} - {ex.sets}x{ex.reps}
                  </p>
                </div>
                <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowSwapExercise(null)} className="text-muted-foreground">
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
