"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
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
  Users,
  Dumbbell,
  DollarSign,
  TrendingUp,
  LogOut,
  BarChart3,
  Calendar,
  Settings,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  Plus,
  UserPlus,
  Phone,
  Mail,
  CreditCard,
  Edit,
  Trash2,
  XCircle,
  Tag,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DashboardAdminProps {
  onLogout: () => void
}

type SheetType = "alunos" | "professores" | "financeiro" | "agenda" | "relatorios" | "planos" | null
type StudentFilter = "todos" | "em-dia" | "atrasado" | "inativo"
type FinanceDialogType = "despesa" | "recebimento" | null
type AgendaDialogType = "criar-turma" | "cancelar-aula" | null

interface Student {
  name: string
  ra: string
  plan: string
  status: string
  payment: string
  phone: string
  email: string
  vencimento: string
  lastPayment: string
  age: number
  weight: string
}

interface Professor {
  name: string
  ra: string
  speciality: string
  students: number
  status: string
  phone: string
  email: string
  horario: string
  salario: string
  modalidades: string[]
}

interface Plan {
  id: string
  name: string
  price: string
  duration: string
  features: string[]
  active: boolean
}

export function DashboardAdmin({ onLogout }: DashboardAdminProps) {
  const [activeSheet, setActiveSheet] = useState<SheetType>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [studentFilter, setStudentFilter] = useState<StudentFilter>("todos")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null)
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [showProfessorModal, setShowProfessorModal] = useState(false)
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false)
  const [showAddProfessorDialog, setShowAddProfessorDialog] = useState(false)
  const [financeDialog, setFinanceDialog] = useState<FinanceDialogType>(null)
  const [agendaDialog, setAgendaDialog] = useState<AgendaDialogType>(null)
  const [showAddPlanDialog, setShowAddPlanDialog] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)

  const stats = [
    { label: "Alunos Ativos", value: "247", icon: Users, change: "+12%" },
    { label: "Professores", value: "18", icon: Dumbbell, change: "+2" },
    { label: "Receita Mensal", value: "R$ 45.8k", icon: DollarSign, change: "+8.2%" },
    { label: "Novos Alunos", value: "34", icon: TrendingUp, change: "+15%" },
  ]

  const alerts = [
    { type: "danger", message: "3 alunos com mensalidade atrasada", icon: AlertCircle },
    { type: "warning", message: "2 planos vencem esta semana", icon: Clock },
    { type: "info", message: "5 novos alunos aguardando cadastro", icon: UserPlus },
  ]

  const recentActions = [
    { action: "Novo aluno cadastrado", name: "Maria Silva", time: "2 min" },
    { action: "Plano renovado", name: "Carlos Santos", time: "15 min" },
    { action: "Aula agendada", name: "Prof. Ana Lima", time: "30 min" },
    { action: "Pagamento recebido", name: "Pedro Costa", time: "1h" },
    { action: "Treino atualizado", name: "Juliana Melo", time: "2h" },
  ]

  const allStudents: Student[] = [
    { name: "Maria Silva", ra: "2024001001", plan: "Premium", status: "ativo", payment: "em-dia", phone: "(11) 98765-4321", email: "maria@email.com", vencimento: "10/03/2026", lastPayment: "10/02/2026", age: 25, weight: "62kg" },
    { name: "Carlos Santos", ra: "2024001002", plan: "Basico", status: "ativo", payment: "em-dia", phone: "(11) 91234-5678", email: "carlos@email.com", vencimento: "15/03/2026", lastPayment: "15/02/2026", age: 30, weight: "78kg" },
    { name: "Pedro Costa", ra: "2024001003", plan: "Premium", status: "ativo", payment: "atrasado", phone: "(11) 99876-1234", email: "pedro@email.com", vencimento: "05/02/2026", lastPayment: "05/01/2026", age: 28, weight: "85kg" },
    { name: "Juliana Melo", ra: "2024001004", plan: "Premium", status: "ativo", payment: "em-dia", phone: "(11) 94567-8901", email: "juliana@email.com", vencimento: "20/03/2026", lastPayment: "20/02/2026", age: 22, weight: "55kg" },
    { name: "Lucas Ferreira", ra: "2024001005", plan: "Basico", status: "inativo", payment: "em-dia", phone: "(11) 92345-6789", email: "lucas@email.com", vencimento: "-", lastPayment: "10/12/2025", age: 35, weight: "90kg" },
    { name: "Ana Beatriz", ra: "2024001006", plan: "Premium", status: "ativo", payment: "em-dia", phone: "(11) 93456-7890", email: "anab@email.com", vencimento: "12/03/2026", lastPayment: "12/02/2026", age: 27, weight: "58kg" },
    { name: "Bruno Alves", ra: "2024001007", plan: "Basico", status: "ativo", payment: "atrasado", phone: "(11) 95678-1234", email: "bruno@email.com", vencimento: "01/02/2026", lastPayment: "01/01/2026", age: 31, weight: "82kg" },
    { name: "Camila Rocha", ra: "2024001008", plan: "Premium", status: "ativo", payment: "em-dia", phone: "(11) 96789-2345", email: "camila@email.com", vencimento: "18/03/2026", lastPayment: "18/02/2026", age: 24, weight: "60kg" },
    { name: "Rafael Nunes", ra: "2024001009", plan: "Basico", status: "ativo", payment: "atrasado", phone: "(11) 97890-3456", email: "rafael@email.com", vencimento: "08/02/2026", lastPayment: "08/01/2026", age: 29, weight: "75kg" },
  ]

  const allProfessors: Professor[] = [
    { name: "Prof. Ana Lima", ra: "P2024001", speciality: "Musculacao", students: 45, status: "ativo", phone: "(11) 91111-2222", email: "ana.lima@fitpro.com", horario: "06:00 - 14:00", salario: "R$ 4.500,00", modalidades: ["Musculacao", "Funcional"] },
    { name: "Prof. Ricardo Souza", ra: "P2024002", speciality: "Funcional", students: 32, status: "ativo", phone: "(11) 93333-4444", email: "ricardo@fitpro.com", horario: "07:00 - 15:00", salario: "R$ 4.200,00", modalidades: ["Funcional", "Crossfit"] },
    { name: "Prof. Fernanda Costa", ra: "P2024003", speciality: "Crossfit", students: 28, status: "ativo", phone: "(11) 95555-6666", email: "fernanda@fitpro.com", horario: "08:00 - 16:00", salario: "R$ 4.800,00", modalidades: ["Crossfit", "HIIT"] },
    { name: "Prof. Marcos Oliveira", ra: "P2024004", speciality: "Personal", students: 15, status: "ativo", phone: "(11) 97777-8888", email: "marcos@fitpro.com", horario: "10:00 - 18:00", salario: "R$ 5.200,00", modalidades: ["Personal", "Musculacao"] },
    { name: "Prof. Julia Santos", ra: "P2024005", speciality: "Pilates", students: 22, status: "ferias", phone: "(11) 99999-0000", email: "julia@fitpro.com", horario: "07:00 - 15:00", salario: "R$ 3.800,00", modalidades: ["Pilates", "Yoga"] },
    { name: "Prof. Thiago Reis", ra: "P2024006", speciality: "Natacao", students: 18, status: "ativo", phone: "(11) 92222-3333", email: "thiago@fitpro.com", horario: "06:00 - 14:00", salario: "R$ 4.000,00", modalidades: ["Natacao", "Hidroginastica"] },
  ]

  const financialData = [
    { month: "Fevereiro 2026", receita: "R$ 45.800", despesas: "R$ 28.200", lucro: "R$ 17.600", status: "positivo" },
    { month: "Janeiro 2026", receita: "R$ 43.200", despesas: "R$ 27.800", lucro: "R$ 15.400", status: "positivo" },
    { month: "Dezembro 2025", receita: "R$ 38.500", despesas: "R$ 26.500", lucro: "R$ 12.000", status: "positivo" },
    { month: "Novembro 2025", receita: "R$ 41.100", despesas: "R$ 29.300", lucro: "R$ 11.800", status: "positivo" },
    { month: "Outubro 2025", receita: "R$ 39.800", despesas: "R$ 30.100", lucro: "R$ 9.700", status: "positivo" },
  ]

  const agendaToday = [
    { time: "06:00", event: "Musculacao - Turma A", professor: "Prof. Ana Lima", room: "Sala 1", id: "a1" },
    { time: "07:00", event: "Funcional", professor: "Prof. Ricardo Souza", room: "Area Externa", id: "a2" },
    { time: "08:00", event: "Musculacao - Turma B", professor: "Prof. Ana Lima", room: "Sala 1", id: "a3" },
    { time: "09:00", event: "Pilates", professor: "Prof. Julia Santos", room: "Sala 2", id: "a4" },
    { time: "10:00", event: "Crossfit", professor: "Prof. Fernanda Costa", room: "Box", id: "a5" },
    { time: "14:00", event: "Personal Training", professor: "Prof. Marcos Oliveira", room: "Sala 3", id: "a6" },
    { time: "16:00", event: "Natacao", professor: "Prof. Thiago Reis", room: "Piscina", id: "a7" },
    { time: "18:00", event: "Musculacao - Turma C", professor: "Prof. Ana Lima", room: "Sala 1", id: "a8" },
    { time: "19:00", event: "Crossfit Noturno", professor: "Prof. Fernanda Costa", room: "Box", id: "a9" },
  ]

  const reports = [
    { title: "Frequencia Mensal", description: "Taxa de presenca dos alunos em Fevereiro", value: "78%", trend: "+3%" },
    { title: "Retencao de Alunos", description: "Alunos que renovaram nos ultimos 3 meses", value: "92%", trend: "+5%" },
    { title: "Satisfacao", description: "Nota media da pesquisa de satisfacao", value: "4.7/5", trend: "+0.2" },
    { title: "Horario de Pico", description: "Periodo com maior movimento na academia", value: "18h-20h", trend: "" },
    { title: "Aulas mais Populares", description: "Modalidade com mais inscritos este mes", value: "Musculacao", trend: "" },
    { title: "Inadimplencia", description: "Porcentagem de pagamentos atrasados", value: "4.2%", trend: "-1.3%" },
  ]

  const plans: Plan[] = [
    { id: "1", name: "Plano Basico", price: "R$ 80,00", duration: "Mensal", features: ["Musculacao", "Vestiario"], active: true },
    { id: "2", name: "Plano Premium", price: "R$ 120,00", duration: "Mensal", features: ["Musculacao", "Funcional", "Vestiario", "Armario"], active: true },
    { id: "3", name: "Plano VIP", price: "R$ 200,00", duration: "Mensal", features: ["Todas as modalidades", "Personal 2x/semana", "Vestiario VIP", "Armario", "Suplementos"], active: true },
    { id: "4", name: "Plano Trimestral", price: "R$ 300,00", duration: "Trimestral", features: ["Musculacao", "Funcional", "Vestiario", "Armario"], active: true },
  ]

  const quickActions = [
    { label: "Gerenciar Alunos", icon: Users, sheet: "alunos" as SheetType },
    { label: "Gerenciar Professores", icon: Dumbbell, sheet: "professores" as SheetType },
    { label: "Financeiro", icon: DollarSign, sheet: "financeiro" as SheetType },
    { label: "Agenda", icon: Calendar, sheet: "agenda" as SheetType },
    { label: "Relatorios", icon: BarChart3, sheet: "relatorios" as SheetType },
    { label: "Planos da Academia", icon: Tag, sheet: "planos" as SheetType },
  ]

  const filteredStudents = allStudents.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.ra.includes(searchQuery)
    if (studentFilter === "todos") return matchSearch
    if (studentFilter === "em-dia") return matchSearch && s.payment === "em-dia" && s.status === "ativo"
    if (studentFilter === "atrasado") return matchSearch && s.payment === "atrasado"
    if (studentFilter === "inativo") return matchSearch && s.status === "inativo"
    return matchSearch
  })

  const filteredProfessors = allProfessors.filter(
    (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.ra.includes(searchQuery)
  )

  const atrasados = allStudents.filter((s) => s.payment === "atrasado").length

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Dumbbell className="h-5 w-5 text-primary-foreground" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-base font-semibold font-mono text-foreground">FitPro</h1>
              <p className="text-xs text-muted-foreground">Painel Administrativo</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout} className="text-muted-foreground hover:text-foreground">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Header + Novo Aluno button */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold font-mono text-foreground">
              Bom dia, Administrador
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Aqui esta o resumo da sua academia hoje.
            </p>
          </div>
          <Button
            onClick={() => setShowAddStudentDialog(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Novo Aluno
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border bg-card">
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-semibold font-mono text-foreground">{stat.value}</p>
                    <span className="text-xs font-medium text-primary">{stat.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alerts Card */}
        <Card className="mt-6 border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-foreground font-mono text-base">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Alertas e Pendencias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {alerts.map((alert, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 rounded-lg p-3 ${
                    alert.type === "danger"
                      ? "bg-destructive/10 border border-destructive/20"
                      : alert.type === "warning"
                      ? "bg-[oklch(0.75_0.15_85)]/10 border border-[oklch(0.75_0.15_85)]/20"
                      : "bg-primary/10 border border-primary/20"
                  }`}
                >
                  <alert.icon
                    className={`h-5 w-5 shrink-0 ${
                      alert.type === "danger"
                        ? "text-destructive"
                        : alert.type === "warning"
                        ? "text-[oklch(0.75_0.15_85)]"
                        : "text-primary"
                    }`}
                  />
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      setSearchQuery("")
                      if (alert.type === "danger") {
                        setStudentFilter("atrasado")
                        setActiveSheet("alunos")
                      } else {
                        setActiveSheet("alunos")
                      }
                    }}
                  >
                    Ver detalhes
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity + Quick Actions */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="border-border bg-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground font-mono">
                <BarChart3 className="h-5 w-5 text-primary" />
                Atividades Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {recentActions.map((item, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.action}</p>
                      <p className="text-xs text-muted-foreground">{item.name}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground font-mono">
                <Settings className="h-5 w-5 text-primary" />
                Acesso Rapido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {quickActions.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setSearchQuery("")
                      setStudentFilter("todos")
                      setActiveSheet(item.sheet)
                    }}
                    className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-3 text-sm text-foreground transition-colors hover:border-primary/30 hover:bg-secondary/80"
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* ==================== SHEET: Gerenciar Alunos ==================== */}
      <Sheet open={activeSheet === "alunos"} onOpenChange={(open) => { if (!open) { setActiveSheet(null); setStudentFilter("todos") } }}>
        <SheetContent className="w-full sm:max-w-lg bg-card border-border overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-foreground font-mono">Gerenciar Alunos</SheetTitle>
            <SheetDescription>{allStudents.length} alunos cadastrados ({atrasados} atrasados)</SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-4">
            <Button
              onClick={() => setShowAddStudentDialog(true)}
              className="mb-4 w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Cadastrar Novo Aluno
            </Button>

            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou RA..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Filter buttons */}
            <div className="mb-4 flex flex-wrap gap-2">
              {([
                { key: "todos" as StudentFilter, label: "Todos", count: allStudents.length },
                { key: "em-dia" as StudentFilter, label: "Em dia", count: allStudents.filter(s => s.payment === "em-dia" && s.status === "ativo").length },
                { key: "atrasado" as StudentFilter, label: "Atrasados", count: allStudents.filter(s => s.payment === "atrasado").length },
                { key: "inativo" as StudentFilter, label: "Inativos", count: allStudents.filter(s => s.status === "inativo").length },
              ]).map((f) => (
                <button
                  key={f.key}
                  onClick={() => setStudentFilter(f.key)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    studentFilter === f.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label} ({f.count})
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {filteredStudents.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">Nenhum aluno encontrado.</p>
              ) : (
                filteredStudents.map((student, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedStudent(student); setShowStudentModal(true) }}
                    className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-3 text-left transition-colors hover:border-primary/30"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                      {student.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{student.name}</p>
                      <p className="text-xs text-muted-foreground">RA: {student.ra}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="outline" className="text-xs border-primary/30 text-primary">{student.plan}</Badge>
                      <div className="flex items-center gap-1">
                        {student.payment === "em-dia" ? (
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-destructive" />
                        )}
                        <span className={`text-xs ${student.payment === "em-dia" ? "text-primary" : "text-destructive"}`}>
                          {student.payment === "em-dia" ? "Em dia" : "Atrasado"}
                        </span>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ==================== SHEET: Gerenciar Professores ==================== */}
      <Sheet open={activeSheet === "professores"} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent className="w-full sm:max-w-lg bg-card border-border overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-foreground font-mono">Gerenciar Professores</SheetTitle>
            <SheetDescription>{allProfessors.length} professores na equipe</SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-4">
            <Button
              onClick={() => setShowAddProfessorDialog(true)}
              className="mb-4 w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Cadastrar Professor
            </Button>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar professor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-3">
              {filteredProfessors.map((prof, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedProfessor(prof); setShowProfessorModal(true) }}
                  className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-3 text-left transition-colors hover:border-primary/30"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[oklch(0.55_0.15_250)]/20 text-xs font-semibold text-[oklch(0.65_0.18_250)]">
                    {prof.name.replace("Prof. ", "").split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{prof.name}</p>
                    <p className="text-xs text-muted-foreground">{prof.speciality} - {prof.students} alunos</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      prof.status === "ativo"
                        ? "border-primary/30 text-primary"
                        : "border-[oklch(0.75_0.15_85)]/30 text-[oklch(0.75_0.15_85)]"
                    }
                  >
                    {prof.status === "ativo" ? "Ativo" : "Ferias"}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ==================== SHEET: Financeiro ==================== */}
      <Sheet open={activeSheet === "financeiro"} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent className="w-full sm:max-w-lg bg-card border-border overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-foreground font-mono">Financeiro</SheetTitle>
            <SheetDescription>Resumo financeiro dos ultimos meses</SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-4">
            <div className="mb-4 flex gap-2">
              <Button
                onClick={() => setFinanceDialog("recebimento")}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-xs"
              >
                <Plus className="h-4 w-4" />
                Novo Recebimento
              </Button>
              <Button
                onClick={() => setFinanceDialog("despesa")}
                variant="outline"
                className="flex-1 border-border text-foreground hover:bg-secondary gap-2 text-xs"
              >
                <Plus className="h-4 w-4" />
                Nova Despesa
              </Button>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-primary/10 p-3">
                <p className="text-xs text-muted-foreground">Receita (Fev)</p>
                <p className="text-lg font-semibold font-mono text-primary">R$ 45.8k</p>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <p className="text-xs text-muted-foreground">Lucro (Fev)</p>
                <p className="text-lg font-semibold font-mono text-foreground">R$ 17.6k</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {financialData.map((item, i) => (
                <div key={i} className="rounded-lg border border-border bg-secondary p-3">
                  <p className="text-sm font-medium text-foreground mb-2">{item.month}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Receita</p>
                      <p className="text-sm font-mono text-primary">{item.receita}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Despesas</p>
                      <p className="text-sm font-mono text-foreground">{item.despesas}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Lucro</p>
                      <p className="text-sm font-mono text-primary">{item.lucro}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ==================== SHEET: Agenda ==================== */}
      <Sheet open={activeSheet === "agenda"} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent className="w-full sm:max-w-lg bg-card border-border overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-foreground font-mono">Agenda de Hoje</SheetTitle>
            <SheetDescription>{agendaToday.length} atividades programadas</SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-4">
            <div className="mb-4 flex gap-2">
              <Button
                onClick={() => setAgendaDialog("criar-turma")}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-xs"
              >
                <Plus className="h-4 w-4" />
                Criar Nova Turma
              </Button>
              <Button
                onClick={() => setAgendaDialog("cancelar-aula")}
                variant="outline"
                className="flex-1 border-border text-foreground hover:bg-secondary gap-2 text-xs"
              >
                <XCircle className="h-4 w-4" />
                Cancelar Aula
              </Button>
            </div>

            <div className="flex flex-col gap-3">
              {agendaToday.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-medium text-primary">{item.time}</span>
                      <span className="text-sm font-medium text-foreground">{item.event}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.professor} - {item.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ==================== SHEET: Relatorios ==================== */}
      <Sheet open={activeSheet === "relatorios"} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent className="w-full sm:max-w-lg bg-card border-border overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-foreground font-mono">Relatorios</SheetTitle>
            <SheetDescription>Indicadores de desempenho da academia</SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-4">
            <div className="flex flex-col gap-3">
              {reports.map((report, i) => (
                <div key={i} className="rounded-lg border border-border bg-secondary p-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-foreground">{report.title}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-semibold font-mono text-foreground">{report.value}</span>
                      {report.trend && (
                        <span className={`text-xs font-medium ${
                          report.trend.startsWith("+") ? "text-primary" : report.trend.startsWith("-") ? "text-destructive" : "text-muted-foreground"
                        }`}>
                          {report.trend}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{report.description}</p>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ==================== SHEET: Planos ==================== */}
      <Sheet open={activeSheet === "planos"} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent className="w-full sm:max-w-lg bg-card border-border overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-foreground font-mono">Planos da Academia</SheetTitle>
            <SheetDescription>Gerencie os planos e precos oferecidos</SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-4">
            <Button
              onClick={() => setShowAddPlanDialog(true)}
              className="mb-4 w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              <Plus className="h-4 w-4" />
              Criar Novo Plano
            </Button>

            <div className="flex flex-col gap-3">
              {plans.map((plan) => (
                <div key={plan.id} className="rounded-lg border border-border bg-secondary p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">{plan.name}</p>
                      <p className="text-xs text-muted-foreground">{plan.duration}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold font-mono text-primary">{plan.price}</span>
                      <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                        {plan.active ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {plan.features.map((f, j) => (
                      <span key={j} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary">
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground gap-1">
                      <Edit className="h-3 w-3" />
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs text-destructive hover:text-destructive gap-1">
                      <Trash2 className="h-3 w-3" />
                      Remover
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ==================== MODAL: Perfil do Aluno ==================== */}
      <Dialog open={showStudentModal} onOpenChange={setShowStudentModal}>
        <DialogContent className="bg-card border-border text-foreground sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-mono text-foreground">Perfil do Aluno</DialogTitle>
            <DialogDescription>Informacoes detalhadas do aluno</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/15 text-base font-semibold text-primary">
                  {selectedStudent.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-base font-medium text-foreground">{selectedStudent.name}</p>
                  <p className="text-sm text-muted-foreground">RA: {selectedStudent.ra}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-secondary p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Telefone</p>
                  </div>
                  <p className="text-sm text-foreground">{selectedStudent.phone}</p>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Email</p>
                  </div>
                  <p className="text-sm text-foreground truncate">{selectedStudent.email}</p>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <p className="text-xs text-muted-foreground mb-1">Idade / Peso</p>
                  <p className="text-sm text-foreground">{selectedStudent.age} anos / {selectedStudent.weight}</p>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <p className="text-xs text-muted-foreground mb-1">Plano</p>
                  <Badge variant="outline" className="border-primary/30 text-primary">{selectedStudent.plan}</Badge>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-secondary p-3">
                <p className="text-xs text-muted-foreground mb-2">Situacao de Pagamento</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedStudent.payment === "em-dia" ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    )}
                    <span className={`text-sm font-medium ${selectedStudent.payment === "em-dia" ? "text-primary" : "text-destructive"}`}>
                      {selectedStudent.payment === "em-dia" ? "Em dia" : "Atrasado"}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Vencimento</p>
                    <p className="text-sm text-foreground">{selectedStudent.vencimento}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Ultimo pagamento</p>
                    <p className="text-sm text-foreground">{selectedStudent.lastPayment}</p>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex gap-2 sm:gap-2">
                <Button
                  onClick={() => {
                    setShowPaymentDialog(true)
                  }}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Registrar Pagamento
                </Button>
                <Button variant="outline" className="border-border text-foreground hover:bg-secondary gap-2">
                  <Edit className="h-4 w-4" />
                  Editar
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ==================== MODAL: Perfil do Professor ==================== */}
      <Dialog open={showProfessorModal} onOpenChange={setShowProfessorModal}>
        <DialogContent className="bg-card border-border text-foreground sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-mono text-foreground">Perfil do Professor</DialogTitle>
            <DialogDescription>Informacoes detalhadas do professor</DialogDescription>
          </DialogHeader>
          {selectedProfessor && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[oklch(0.55_0.15_250)]/20 text-base font-semibold text-[oklch(0.65_0.18_250)]">
                  {selectedProfessor.name.replace("Prof. ", "").split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-base font-medium text-foreground">{selectedProfessor.name}</p>
                  <p className="text-sm text-muted-foreground">RA: {selectedProfessor.ra}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-secondary p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Telefone</p>
                  </div>
                  <p className="text-sm text-foreground">{selectedProfessor.phone}</p>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Email</p>
                  </div>
                  <p className="text-sm text-foreground truncate">{selectedProfessor.email}</p>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Horario</p>
                  </div>
                  <p className="text-sm text-foreground">{selectedProfessor.horario}</p>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Salario</p>
                  </div>
                  <p className="text-sm text-foreground">{selectedProfessor.salario}</p>
                </div>
              </div>

              <div className="rounded-lg bg-secondary p-3">
                <p className="text-xs text-muted-foreground mb-2">Modalidades</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProfessor.modalidades.map((m, i) => (
                    <span key={i} className="rounded-full bg-[oklch(0.55_0.15_250)]/15 px-2.5 py-0.5 text-xs text-[oklch(0.65_0.18_250)]">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-secondary p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Alunos Ativos</p>
                    <p className="text-lg font-semibold font-mono text-foreground">{selectedProfessor.students}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      selectedProfessor.status === "ativo"
                        ? "border-primary/30 text-primary"
                        : "border-[oklch(0.75_0.15_85)]/30 text-[oklch(0.75_0.15_85)]"
                    }
                  >
                    {selectedProfessor.status === "ativo" ? "Ativo" : "Ferias"}
                  </Badge>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" className="w-full border-border text-foreground hover:bg-secondary gap-2">
                  <Edit className="h-4 w-4" />
                  Editar Informacoes
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ==================== MODAL: Cadastrar Aluno ==================== */}
      <Dialog open={showAddStudentDialog} onOpenChange={setShowAddStudentDialog}>
        <DialogContent className="bg-card border-border text-foreground sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-mono text-foreground">Cadastrar Novo Aluno</DialogTitle>
            <DialogDescription>Preencha os dados do novo aluno</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 flex flex-col gap-1.5">
                <Label className="text-foreground text-xs">Nome Completo</Label>
                <Input placeholder="Nome do aluno" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground text-xs">RA</Label>
                <Input placeholder="2024001XXX" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground text-xs">Telefone</Label>
                <Input placeholder="(11) 9XXXX-XXXX" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="col-span-2 flex flex-col gap-1.5">
                <Label className="text-foreground text-xs">Email</Label>
                <Input type="email" placeholder="email@email.com" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground text-xs">Idade</Label>
                <Input type="number" placeholder="25" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground text-xs">Peso (kg)</Label>
                <Input type="number" placeholder="70" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="col-span-2 flex flex-col gap-1.5">
                <Label className="text-foreground text-xs">Plano</Label>
                <Select>
                  <SelectTrigger className="bg-secondary border-border text-foreground">
                    <SelectValue placeholder="Selecione o plano" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {plans.map((p) => (
                      <SelectItem key={p.id} value={p.id} className="text-foreground">{p.name} - {p.price}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddStudentDialog(false)} className="border-border text-foreground hover:bg-secondary">
              Cancelar
            </Button>
            <Button onClick={() => setShowAddStudentDialog(false)} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Cadastrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ==================== MODAL: Cadastrar Professor ==================== */}
      <Dialog open={showAddProfessorDialog} onOpenChange={setShowAddProfessorDialog}>
        <DialogContent className="bg-card border-border text-foreground sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-mono text-foreground">Cadastrar Professor</DialogTitle>
            <DialogDescription>Preencha os dados do novo professor</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 flex flex-col gap-1.5">
                <Label className="text-foreground text-xs">Nome Completo</Label>
                <Input placeholder="Nome do professor" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground text-xs">RA</Label>
                <Input placeholder="P2024XXX" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground text-xs">Telefone</Label>
                <Input placeholder="(11) 9XXXX-XXXX" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="col-span-2 flex flex-col gap-1.5">
                <Label className="text-foreground text-xs">Email</Label>
                <Input type="email" placeholder="email@fitpro.com" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground text-xs">Horario</Label>
                <Input placeholder="06:00 - 14:00" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground text-xs">Salario</Label>
                <Input placeholder="R$ 4.500,00" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="col-span-2 flex flex-col gap-1.5">
                <Label className="text-foreground text-xs">Especialidade Principal</Label>
                <Select>
                  <SelectTrigger className="bg-secondary border-border text-foreground">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {["Musculacao", "Funcional", "Crossfit", "Personal", "Pilates", "Natacao", "HIIT", "Yoga", "Hidroginastica"].map((m) => (
                      <SelectItem key={m} value={m} className="text-foreground">{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddProfessorDialog(false)} className="border-border text-foreground hover:bg-secondary">
              Cancelar
            </Button>
            <Button onClick={() => setShowAddProfessorDialog(false)} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Cadastrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ==================== MODAL: Registrar Pagamento ==================== */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="bg-card border-border text-foreground sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-mono text-foreground">Registrar Pagamento</DialogTitle>
            <DialogDescription>
              {selectedStudent ? `Pagamento para ${selectedStudent.name}` : "Registrar pagamento"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground text-xs">Valor</Label>
              <Input placeholder="R$ 120,00" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground text-xs">Forma de Pagamento</Label>
              <Select>
                <SelectTrigger className="bg-secondary border-border text-foreground">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="dinheiro" className="text-foreground">Dinheiro</SelectItem>
                  <SelectItem value="pix" className="text-foreground">PIX</SelectItem>
                  <SelectItem value="cartao-debito" className="text-foreground">Cartao de Debito</SelectItem>
                  <SelectItem value="cartao-credito" className="text-foreground">Cartao de Credito</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground text-xs">Referencia</Label>
              <Input placeholder="Mensalidade Mar/2026" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)} className="border-border text-foreground hover:bg-secondary">
              Cancelar
            </Button>
            <Button onClick={() => setShowPaymentDialog(false)} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              <CreditCard className="h-4 w-4" />
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ==================== MODAL: Nova Despesa / Novo Recebimento ==================== */}
      <Dialog open={financeDialog !== null} onOpenChange={(open) => !open && setFinanceDialog(null)}>
        <DialogContent className="bg-card border-border text-foreground sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-mono text-foreground">
              {financeDialog === "despesa" ? "Nova Despesa" : "Novo Recebimento"}
            </DialogTitle>
            <DialogDescription>
              {financeDialog === "despesa" ? "Registre uma despesa da academia" : "Registre um recebimento"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground text-xs">Descricao</Label>
              <Input
                placeholder={financeDialog === "despesa" ? "Ex: Conta de luz" : "Ex: Mensalidade aluno"}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground text-xs">Valor</Label>
              <Input placeholder="R$ 0,00" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground text-xs">Categoria</Label>
              <Select>
                <SelectTrigger className="bg-secondary border-border text-foreground">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {financeDialog === "despesa" ? (
                    <>
                      <SelectItem value="luz" className="text-foreground">Energia Eletrica</SelectItem>
                      <SelectItem value="agua" className="text-foreground">Agua</SelectItem>
                      <SelectItem value="aluguel" className="text-foreground">Aluguel</SelectItem>
                      <SelectItem value="salarios" className="text-foreground">Salarios</SelectItem>
                      <SelectItem value="equipamentos" className="text-foreground">Equipamentos</SelectItem>
                      <SelectItem value="manutencao" className="text-foreground">Manutencao</SelectItem>
                      <SelectItem value="outros-despesa" className="text-foreground">Outros</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="mensalidade" className="text-foreground">Mensalidade</SelectItem>
                      <SelectItem value="matricula" className="text-foreground">Matricula</SelectItem>
                      <SelectItem value="personal" className="text-foreground">Personal Training</SelectItem>
                      <SelectItem value="loja" className="text-foreground">Loja / Suplementos</SelectItem>
                      <SelectItem value="outros-receita" className="text-foreground">Outros</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground text-xs">Data</Label>
              <Input type="date" className="bg-secondary border-border text-foreground" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFinanceDialog(null)} className="border-border text-foreground hover:bg-secondary">
              Cancelar
            </Button>
            <Button onClick={() => setFinanceDialog(null)} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ==================== MODAL: Criar Turma / Cancelar Aula ==================== */}
      <Dialog open={agendaDialog !== null} onOpenChange={(open) => !open && setAgendaDialog(null)}>
        <DialogContent className="bg-card border-border text-foreground sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-mono text-foreground">
              {agendaDialog === "criar-turma" ? "Criar Nova Turma" : "Cancelar Aula"}
            </DialogTitle>
            <DialogDescription>
              {agendaDialog === "criar-turma" ? "Defina os detalhes da nova turma" : "Selecione a aula a ser cancelada"}
            </DialogDescription>
          </DialogHeader>
          {agendaDialog === "criar-turma" ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground text-xs">Nome da Turma</Label>
                <Input placeholder="Ex: Musculacao - Turma D" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground text-xs">Professor</Label>
                <Select>
                  <SelectTrigger className="bg-secondary border-border text-foreground">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {allProfessors.filter(p => p.status === "ativo").map((p) => (
                      <SelectItem key={p.ra} value={p.ra} className="text-foreground">{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-foreground text-xs">Horario</Label>
                  <Input type="time" className="bg-secondary border-border text-foreground" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-foreground text-xs">Sala</Label>
                  <Input placeholder="Sala 1" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto">
              {agendaToday.map((item) => (
                <button
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-3 text-left transition-colors hover:border-destructive/30"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-medium text-primary">{item.time}</span>
                      <span className="text-sm font-medium text-foreground">{item.event}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.professor}</p>
                  </div>
                  <XCircle className="h-5 w-5 shrink-0 text-muted-foreground hover:text-destructive transition-colors" />
                </button>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setAgendaDialog(null)} className="border-border text-foreground hover:bg-secondary">
              Cancelar
            </Button>
            <Button
              onClick={() => setAgendaDialog(null)}
              className={agendaDialog === "cancelar-aula"
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
              }
            >
              {agendaDialog === "criar-turma" ? "Criar Turma" : "Confirmar Cancelamento"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ==================== MODAL: Criar Plano ==================== */}
      <Dialog open={showAddPlanDialog} onOpenChange={setShowAddPlanDialog}>
        <DialogContent className="bg-card border-border text-foreground sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-mono text-foreground">Criar Novo Plano</DialogTitle>
            <DialogDescription>Defina os detalhes do novo plano</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground text-xs">Nome do Plano</Label>
              <Input placeholder="Ex: Plano Gold" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground text-xs">Preco</Label>
                <Input placeholder="R$ 0,00" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground text-xs">Duracao</Label>
                <Select>
                  <SelectTrigger className="bg-secondary border-border text-foreground">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="mensal" className="text-foreground">Mensal</SelectItem>
                    <SelectItem value="trimestral" className="text-foreground">Trimestral</SelectItem>
                    <SelectItem value="semestral" className="text-foreground">Semestral</SelectItem>
                    <SelectItem value="anual" className="text-foreground">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground text-xs">Beneficios (separados por virgula)</Label>
              <Input placeholder="Musculacao, Funcional, Vestiario..." className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddPlanDialog(false)} className="border-border text-foreground hover:bg-secondary">
              Cancelar
            </Button>
            <Button onClick={() => setShowAddPlanDialog(false)} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Criar Plano
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
