"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
  Timer,
  TrendingDown,
  TrendingUp,
  Scale,
  Copy,
  QrCode,
  ArrowRight,
  Lock,
  Star,
  Zap,
  Award,
  Heart,
  Footprints,
  Sunrise,
  Moon,
  Weight,
  Repeat,
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

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ElementType
  progress: number
  maxProgress: number
  unlocked: boolean
  unlockedDate?: string
  category: "consistencia" | "forca" | "evolucao"
}

// Rest timer component
function RestTimer({ onClose }: { onClose: () => void }) {
  const [seconds, setSeconds] = useState(90)
  const [isRunning, setIsRunning] = useState(true)
  const [initialTime] = useState(90)

  useEffect(() => {
    if (!isRunning || seconds <= 0) return
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setIsRunning(false)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isRunning, seconds])

  const progressPercent = (seconds / initialTime) * 100
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-primary/30 bg-primary/5 p-5">
      <div className="flex items-center gap-2 text-sm font-medium text-primary">
        <Timer className="h-4 w-4" />
        Tempo de Descanso
      </div>
      <div className="relative flex h-28 w-28 items-center justify-center">
        <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(0.28 0.005 250)" strokeWidth="6" />
          <circle
            cx="50" cy="50" r="42" fill="none"
            stroke="oklch(0.72 0.19 145)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - progressPercent / 100)}`}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <span className="text-3xl font-semibold font-mono text-foreground">
          {minutes}:{secs.toString().padStart(2, "0")}
        </span>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => { setSeconds(90); setIsRunning(true) }}
          className="border-border text-foreground"
        >
          Reiniciar
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsRunning(!isRunning)}
          className="border-border text-foreground"
        >
          {isRunning ? "Pausar" : "Retomar"}
        </Button>
        <Button
          size="sm"
          onClick={onClose}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Fechar
        </Button>
      </div>
      {seconds === 0 && (
        <p className="animate-pulse text-sm font-medium text-primary">
          Descanso concluido! Hora da proxima serie.
        </p>
      )}
    </div>
  )
}

// PIX Payment Modal
function PixModal({ open, onClose, value }: { open: boolean; onClose: () => void; value: string }) {
  const [copied, setCopied] = useState(false)
  const pixKey = "studiobiofitness@pix.com.br"

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(pixKey).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }, [pixKey])

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground font-mono">Pagar com PIX</DialogTitle>
          <DialogDescription>
            Escaneie o QR Code ou copie a chave PIX para realizar o pagamento.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-5">
          <div className="flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-secondary">
            <div className="flex flex-col items-center gap-2">
              <QrCode className="h-20 w-20 text-primary/60" strokeWidth={1} />
              <p className="text-[10px] text-muted-foreground">QR Code PIX</p>
            </div>
          </div>

          <div className="w-full rounded-lg bg-secondary p-4">
            <p className="mb-2 text-xs text-muted-foreground">Chave PIX (e-mail)</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 truncate rounded bg-background px-3 py-2 text-sm font-mono text-foreground">
                {pixKey}
              </code>
              <Button
                size="sm"
                onClick={handleCopy}
                className={copied ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground border border-border"}
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" />
                {copied ? "Copiado!" : "Copiar"}
              </Button>
            </div>
          </div>

          <div className="w-full rounded-lg bg-primary/10 p-3">
            <p className="text-xs text-muted-foreground mb-1">Valor da mensalidade</p>
            <p className="text-xl font-semibold font-mono text-foreground">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Apos o pagamento, envie o comprovante na recepcao para confirmacao.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
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
  const [showRestTimer, setShowRestTimer] = useState(false)
  const [customWeights, setCustomWeights] = useState<Record<string, string>>({})
  const [showPixModal, setShowPixModal] = useState(false)
  const [pixValue, setPixValue] = useState("R$ 149,90")

  // Plan change state
  const [currentPlan, setCurrentPlan] = useState("Premium")
  const [currentPlanPrice] = useState("R$ 149,90")
  const [planEndDate] = useState("05/04/2026")
  const [showChangePlan, setShowChangePlan] = useState(false)
  const [selectedNewPlan, setSelectedNewPlan] = useState<string | null>(null)
  const [planChangeConfirmed, setPlanChangeConfirmed] = useState(false)
  const [pendingPlan, setPendingPlan] = useState<string | null>(null)

  const availablePlans = [
    { id: "basico", name: "Plano Basico", price: "R$ 80,00", modalidades: ["Musculacao"], extras: ["Vestiario"] },
    { id: "premium", name: "Plano Premium", price: "R$ 149,90", modalidades: ["Musculacao", "Funcional"], extras: ["Vestiario", "Armario"] },
    { id: "vip", name: "Plano VIP", price: "R$ 200,00", modalidades: ["Musculacao", "Funcional", "Crossfit", "Pilates", "Natacao", "HIIT", "Yoga"], extras: ["Vestiario", "Armario", "Suplementos", "Avaliacao Fisica"] },
  ]

  // Achievements state
  const [showAchievements, setShowAchievements] = useState(false)
  const achievements: Achievement[] = [
    { id: "a1", title: "Primeiro Treino", description: "Complete seu primeiro treino na academia", icon: Zap, progress: 1, maxProgress: 1, unlocked: true, unlockedDate: "15/03/2025", category: "consistencia" },
    { id: "a2", title: "7 Dias Seguidos", description: "Treine 7 dias consecutivos", icon: Flame, progress: 7, maxProgress: 7, unlocked: true, unlockedDate: "22/03/2025", category: "consistencia" },
    { id: "a3", title: "30 Dias Seguidos", description: "Treine 30 dias consecutivos sem faltar", icon: Star, progress: 12, maxProgress: 30, unlocked: false, category: "consistencia" },
    { id: "a4", title: "100 Treinos", description: "Complete 100 treinos no total", icon: Award, progress: 67, maxProgress: 100, unlocked: false, category: "consistencia" },
    { id: "a5", title: "Levantador de Ferro", description: "Levante mais de 100kg no supino", icon: Weight, progress: 1, maxProgress: 1, unlocked: true, unlockedDate: "10/01/2026", category: "forca" },
    { id: "a6", title: "Maratonista", description: "Complete 50 sessoes de cardio", icon: Footprints, progress: 32, maxProgress: 50, unlocked: false, category: "forca" },
    { id: "a7", title: "Madrugador", description: "Treine 20 vezes antes das 7h", icon: Sunrise, progress: 20, maxProgress: 20, unlocked: true, unlockedDate: "05/02/2026", category: "consistencia" },
    { id: "a8", title: "Coruja", description: "Treine 15 vezes apos as 21h", icon: Moon, progress: 8, maxProgress: 15, unlocked: false, category: "consistencia" },
    { id: "a9", title: "Perdeu 5kg", description: "Perca 5kg desde o inicio", icon: TrendingDown, progress: 5.3, maxProgress: 5, unlocked: true, unlockedDate: "01/02/2026", category: "evolucao" },
    { id: "a10", title: "Perdeu 10kg", description: "Perca 10kg desde o inicio", icon: TrendingDown, progress: 5.3, maxProgress: 10, unlocked: false, category: "evolucao" },
    { id: "a11", title: "Consistente", description: "Nao falte nenhum treino por 2 semanas", icon: Repeat, progress: 2, maxProgress: 2, unlocked: true, unlockedDate: "28/02/2026", category: "consistencia" },
    { id: "a12", title: "Coracaozao", description: "Frequencia cardiaca em zona ideal 30 vezes", icon: Heart, progress: 18, maxProgress: 30, unlocked: false, category: "evolucao" },
  ]

  const unlockedCount = achievements.filter((a) => a.unlocked).length

  // Body evolution state
  const [bodyWeights] = useState([
    { date: "01/10/2025", weight: 82.5 },
    { date: "01/11/2025", weight: 81.0 },
    { date: "01/12/2025", weight: 79.8 },
    { date: "01/01/2026", weight: 78.5 },
    { date: "01/02/2026", weight: 77.2 },
  ])
  const [newWeight, setNewWeight] = useState("")
  const [showWeightInput, setShowWeightInput] = useState(false)

  const initialWeight = bodyWeights[0].weight
  const currentWeight = bodyWeights[bodyWeights.length - 1].weight
  const weightDiff = currentWeight - initialWeight
  const isLoss = weightDiff < 0

  const toggleComplete = (exerciseName: string) => {
    setCompletedExercises((prev) => {
      const next = new Set(prev)
      if (next.has(exerciseName)) {
        next.delete(exerciseName)
        setShowRestTimer(false)
      } else {
        next.add(exerciseName)
        setShowRestTimer(true)
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

  const nextPaymentDate = "05/03/2026"
  const daysUntilPayment = 9
  const paymentNear = daysUntilPayment <= 10

  const handleConfirmPlanChange = () => {
    if (selectedNewPlan) {
      setPendingPlan(selectedNewPlan)
      setPlanChangeConfirmed(true)
      setShowChangePlan(false)
      setSelectedNewPlan(null)
    }
  }

  const handlePayNewPlan = () => {
    if (pendingPlan) {
      const plan = availablePlans.find((p) => p.id === pendingPlan)
      if (plan) {
        setPixValue(plan.price)
        setShowPixModal(true)
      }
    }
  }

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

        {/* Stats Row */}
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: "Sequencia", value: "12 dias", icon: Flame, bgColor: "bg-[oklch(0.65_0.20_30)]/15", textColor: "text-[oklch(0.70_0.20_30)]" },
            { label: "Meta Semanal", value: "4/5", icon: Target, bgColor: "bg-primary/15", textColor: "text-primary" },
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

          {/* Conquistas Card - Clickable */}
          <Card
            className="border-border bg-card cursor-pointer transition-colors hover:border-[oklch(0.75_0.15_85)]/40"
            onClick={() => setShowAchievements(true)}
          >
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[oklch(0.75_0.15_85)]/15">
                <Trophy className="h-6 w-6 text-[oklch(0.75_0.15_85)]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Conquistas</p>
                <p className="text-2xl font-semibold font-mono text-foreground">{unlockedCount}/{achievements.length}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>

          {/* Evolucao Corporal Card */}
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[oklch(0.55_0.18_250)]/15">
                  <Scale className="h-6 w-6 text-[oklch(0.60_0.18_250)]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Peso Atual</p>
                  <p className="text-2xl font-semibold font-mono text-foreground">{currentWeight}kg</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                {isLoss ? (
                  <TrendingDown className="h-4 w-4 text-primary" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-[oklch(0.65_0.20_30)]" />
                )}
                <span className={`text-xs font-medium ${isLoss ? "text-primary" : "text-[oklch(0.65_0.20_30)]"}`}>
                  {isLoss
                    ? `Voce ja perdeu ${Math.abs(weightDiff).toFixed(1)}kg desde o inicio!`
                    : `Ganho de ${weightDiff.toFixed(1)}kg de massa!`
                  }
                </span>
              </div>
              {!showWeightInput ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full border-border text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => setShowWeightInput(true)}
                >
                  Atualizar Peso
                </Button>
              ) : (
                <div className="mt-3 flex gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 76.5"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    className="h-8 bg-secondary border-border text-foreground text-xs"
                  />
                  <Button
                    size="sm"
                    className="h-8 bg-primary text-primary-foreground text-xs hover:bg-primary/90"
                    onClick={() => { setNewWeight(""); setShowWeightInput(false) }}
                  >
                    Salvar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Rest Timer */}
        {showRestTimer && (
          <div className="mt-6">
            <RestTimer onClose={() => setShowRestTimer(false)} />
          </div>
        )}

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
                      const customWeight = customWeights[exercise.exercise]
                      return (
                        <div
                          key={i}
                          className={`flex flex-col gap-3 rounded-lg border p-4 transition-colors ${
                            isDone
                              ? "border-primary/20 bg-primary/5"
                              : "border-border bg-secondary"
                          }`}
                        >
                          <div className="flex items-center gap-4">
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
                              <div className="mt-1 flex items-center gap-3">
                                <span className="text-xs text-muted-foreground">{exercise.sets}</span>
                                <span className="text-muted-foreground/40">|</span>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs text-muted-foreground">Carga:</span>
                                  <Input
                                    type="text"
                                    value={customWeight !== undefined ? customWeight : exercise.weight}
                                    onChange={(e) =>
                                      setCustomWeights((prev) => ({
                                        ...prev,
                                        [exercise.exercise]: e.target.value,
                                      }))
                                    }
                                    className="h-6 w-20 border-border bg-background px-2 text-xs font-mono text-foreground"
                                    aria-label={`Carga para ${exercise.exercise}`}
                                  />
                                </div>
                              </div>
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
                        <p className="text-2xl font-semibold font-mono text-foreground">{currentPlanPrice}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 sm:items-end">
                      {paymentNear ? (
                        <Badge className="bg-[oklch(0.75_0.15_85)]/15 text-[oklch(0.75_0.15_85)] border-0">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          Vencendo em {daysUntilPayment} dias
                        </Badge>
                      ) : (
                        <Badge className="bg-primary/15 text-primary border-0">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Em dia
                        </Badge>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Proximo vencimento: <span className="font-medium text-foreground">{nextPaymentDate}</span>
                      </p>
                    </div>
                  </div>

                  {paymentNear && (
                    <Button
                      onClick={() => { setPixValue(currentPlanPrice); setShowPixModal(true) }}
                      className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
                    >
                      <QrCode className="mr-2 h-4 w-4" />
                      Pagar com PIX
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Plan info + Change plan */}
              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="border-border bg-card">
                  <CardContent className="flex flex-col items-center gap-2 pt-6 text-center">
                    <Dumbbell className="h-6 w-6 text-primary" />
                    <p className="text-xs text-muted-foreground">Plano</p>
                    <p className="text-sm font-medium text-foreground">{currentPlan}</p>
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
                    <p className="text-sm font-medium text-foreground">PIX / Cartao</p>
                  </CardContent>
                </Card>
              </div>

              {/* Change plan section */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground font-mono">
                    <ArrowRight className="h-5 w-5 text-primary" />
                    Mudar Plano
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {pendingPlan && !planChangeConfirmed ? null : pendingPlan && planChangeConfirmed ? (
                    <div className="flex flex-col gap-4">
                      <div className="rounded-lg border border-[oklch(0.75_0.15_85)]/30 bg-[oklch(0.75_0.15_85)]/10 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-[oklch(0.75_0.15_85)]" />
                          <p className="text-sm font-medium text-foreground">Troca de plano agendada</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Seu plano atual ({currentPlan}) termina em <span className="font-medium text-foreground">{planEndDate}</span>.
                          O novo plano <span className="font-medium text-foreground">{availablePlans.find(p => p.id === pendingPlan)?.name}</span> sera
                          ativado apos o termino do plano atual e confirmacao do pagamento.
                        </p>
                      </div>
                      <Button
                        onClick={handlePayNewPlan}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                      >
                        <QrCode className="h-4 w-4" />
                        Pagar novo plano ({availablePlans.find(p => p.id === pendingPlan)?.price})
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => { setPendingPlan(null); setPlanChangeConfirmed(false) }}
                        className="w-full border-border text-muted-foreground hover:text-foreground"
                      >
                        Cancelar troca
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <p className="text-sm text-muted-foreground">
                        Escolha um novo plano. A mudanca sera implementada apos o termino do plano atual ({planEndDate}) e o pagamento.
                      </p>
                      <div className="flex flex-col gap-2">
                        {availablePlans.filter(p => p.name !== currentPlan).map((plan) => (
                          <button
                            key={plan.id}
                            onClick={() => { setSelectedNewPlan(plan.id); setShowChangePlan(true) }}
                            className="flex items-center gap-4 rounded-lg border border-border bg-secondary p-4 text-left transition-colors hover:border-primary/30"
                          >
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">{plan.name}</p>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {plan.modalidades.map((m) => (
                                  <span key={m} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">{m}</span>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold font-mono text-foreground">{plan.price}</p>
                              <p className="text-xs text-muted-foreground">/mes</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Body Evolution */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground font-mono">
                    <Scale className="h-5 w-5 text-[oklch(0.60_0.18_250)]" />
                    Evolucao Corporal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-end gap-2">
                      {bodyWeights.map((entry, i) => {
                        const minW = Math.min(...bodyWeights.map((w) => w.weight))
                        const maxW = Math.max(...bodyWeights.map((w) => w.weight))
                        const range = maxW - minW || 1
                        const heightPct = 30 + ((entry.weight - minW) / range) * 70
                        return (
                          <div key={i} className="flex flex-1 flex-col items-center gap-1">
                            <span className="text-[10px] font-mono text-foreground">{entry.weight}</span>
                            <div
                              className="w-full rounded-t-md bg-primary/60 transition-all"
                              style={{ height: `${heightPct}px` }}
                            />
                            <span className="text-[9px] text-muted-foreground">{entry.date.slice(3, 10)}</span>
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-primary/10 p-3">
                      {isLoss ? (
                        <TrendingDown className="h-5 w-5 text-primary" />
                      ) : (
                        <TrendingUp className="h-5 w-5 text-[oklch(0.65_0.20_30)]" />
                      )}
                      <p className="text-sm text-foreground">
                        {isLoss
                          ? `Parabens! Voce ja perdeu ${Math.abs(weightDiff).toFixed(1)}kg desde que comecou. Continue assim!`
                          : `Voce ganhou ${weightDiff.toFixed(1)}kg de massa desde o inicio. Otimo progresso!`
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
        <DialogContent className="bg-card border-border sm:max-w-lg">
          {selectedExercise && (
            <>
              <DialogHeader>
                <DialogTitle className="text-foreground font-mono">{selectedExercise.exercise}</DialogTitle>
                <DialogDescription>
                  {selectedExercise.sets} - {customWeights[selectedExercise.exercise] || selectedExercise.weight}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4">
                <div className="relative flex h-72 w-full items-center justify-center rounded-2xl bg-secondary overflow-hidden">
                  <ExerciseAnimation
                    type={selectedExercise.animationType}
                    className="h-64 w-64"
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

      {/* DIALOG: Confirmar Troca de Plano */}
      <Dialog open={showChangePlan} onOpenChange={setShowChangePlan}>
        <DialogContent className="bg-card border-border sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-foreground font-mono">Confirmar Troca de Plano</DialogTitle>
            <DialogDescription>
              Voce esta mudando do plano {currentPlan} para {availablePlans.find(p => p.id === selectedNewPlan)?.name}.
            </DialogDescription>
          </DialogHeader>
          {selectedNewPlan && (
            <div className="flex flex-col gap-4">
              <div className="rounded-lg bg-secondary p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-foreground">
                    {availablePlans.find(p => p.id === selectedNewPlan)?.name}
                  </p>
                  <p className="text-lg font-semibold font-mono text-primary">
                    {availablePlans.find(p => p.id === selectedNewPlan)?.price}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {availablePlans.find(p => p.id === selectedNewPlan)?.modalidades.map((m) => (
                    <span key={m} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary">{m}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-[oklch(0.75_0.15_85)]/20 bg-[oklch(0.75_0.15_85)]/5 p-3">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  O novo plano sera ativado apos o termino do seu plano atual ({planEndDate}) e quando voce realizar o pagamento do novo plano.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChangePlan(false)} className="border-border text-foreground hover:bg-secondary">
              Cancelar
            </Button>
            <Button onClick={handleConfirmPlanChange} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Confirmar Troca
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DIALOG: Conquistas */}
      <Dialog open={showAchievements} onOpenChange={setShowAchievements}>
        <DialogContent className="bg-card border-border sm:max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground font-mono">
              <Trophy className="h-5 w-5 text-[oklch(0.75_0.15_85)]" />
              Minhas Conquistas
            </DialogTitle>
            <DialogDescription>
              {unlockedCount} de {achievements.length} conquistas desbloqueadas
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Progress
              value={(unlockedCount / achievements.length) * 100}
              className="h-2 bg-secondary [&>div]:bg-[oklch(0.75_0.15_85)]"
            />

            {/* Category sections */}
            {(["consistencia", "forca", "evolucao"] as const).map((cat) => {
              const catAchievements = achievements.filter((a) => a.category === cat)
              const catLabel = cat === "consistencia" ? "Consistencia" : cat === "forca" ? "Forca" : "Evolucao"
              return (
                <div key={cat} className="mt-4">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{catLabel}</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {catAchievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${
                          achievement.unlocked
                            ? "border-[oklch(0.75_0.15_85)]/30 bg-[oklch(0.75_0.15_85)]/5"
                            : "border-border bg-secondary opacity-70"
                        }`}
                      >
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          achievement.unlocked
                            ? "bg-[oklch(0.75_0.15_85)]/20"
                            : "bg-muted"
                        }`}>
                          {achievement.unlocked ? (
                            <achievement.icon className="h-5 w-5 text-[oklch(0.75_0.15_85)]" />
                          ) : (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${achievement.unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                            {achievement.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{achievement.description}</p>
                          {achievement.unlocked ? (
                            <p className="text-[10px] text-[oklch(0.75_0.15_85)] mt-1">
                              Desbloqueada em {achievement.unlockedDate}
                            </p>
                          ) : (
                            <div className="mt-1.5">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] text-muted-foreground">
                                  {typeof achievement.progress === "number" && achievement.progress % 1 !== 0
                                    ? achievement.progress.toFixed(1)
                                    : achievement.progress}/{achievement.maxProgress}
                                </span>
                              </div>
                              <Progress
                                value={(Math.min(achievement.progress, achievement.maxProgress) / achievement.maxProgress) * 100}
                                className="h-1.5 bg-muted [&>div]:bg-muted-foreground"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* PIX Payment Modal */}
      <PixModal open={showPixModal} onClose={() => setShowPixModal(false)} value={pixValue} />
    </div>
  )
}
