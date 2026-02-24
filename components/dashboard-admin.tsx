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
} from "lucide-react"
import { Input } from "@/components/ui/input"

interface DashboardAdminProps {
  onLogout: () => void
}

type SheetType = "alunos" | "professores" | "financeiro" | "agenda" | "relatorios" | null

export function DashboardAdmin({ onLogout }: DashboardAdminProps) {
  const [activeSheet, setActiveSheet] = useState<SheetType>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const stats = [
    { label: "Alunos Ativos", value: "247", icon: Users, change: "+12%" },
    { label: "Professores", value: "18", icon: Dumbbell, change: "+2" },
    { label: "Receita Mensal", value: "R$ 45.8k", icon: DollarSign, change: "+8.2%" },
    { label: "Novos Alunos", value: "34", icon: TrendingUp, change: "+15%" },
  ]

  const recentActions = [
    { action: "Novo aluno cadastrado", name: "Maria Silva", time: "2 min" },
    { action: "Plano renovado", name: "Carlos Santos", time: "15 min" },
    { action: "Aula agendada", name: "Prof. Ana Lima", time: "30 min" },
    { action: "Pagamento recebido", name: "Pedro Costa", time: "1h" },
    { action: "Treino atualizado", name: "Juliana Melo", time: "2h" },
  ]

  const allStudents = [
    { name: "Maria Silva", ra: "2024001001", plan: "Premium", status: "ativo", payment: "em-dia" },
    { name: "Carlos Santos", ra: "2024001002", plan: "Basico", status: "ativo", payment: "em-dia" },
    { name: "Pedro Costa", ra: "2024001003", plan: "Premium", status: "ativo", payment: "atrasado" },
    { name: "Juliana Melo", ra: "2024001004", plan: "Premium", status: "ativo", payment: "em-dia" },
    { name: "Lucas Ferreira", ra: "2024001005", plan: "Basico", status: "inativo", payment: "em-dia" },
    { name: "Ana Beatriz", ra: "2024001006", plan: "Premium", status: "ativo", payment: "em-dia" },
    { name: "Bruno Alves", ra: "2024001007", plan: "Basico", status: "ativo", payment: "atrasado" },
    { name: "Camila Rocha", ra: "2024001008", plan: "Premium", status: "ativo", payment: "em-dia" },
  ]

  const allProfessors = [
    { name: "Prof. Ana Lima", ra: "P2024001", speciality: "Musculacao", students: 45, status: "ativo" },
    { name: "Prof. Ricardo Souza", ra: "P2024002", speciality: "Funcional", students: 32, status: "ativo" },
    { name: "Prof. Fernanda Costa", ra: "P2024003", speciality: "Crossfit", students: 28, status: "ativo" },
    { name: "Prof. Marcos Oliveira", ra: "P2024004", speciality: "Personal", students: 15, status: "ativo" },
    { name: "Prof. Julia Santos", ra: "P2024005", speciality: "Pilates", students: 22, status: "ferias" },
    { name: "Prof. Thiago Reis", ra: "P2024006", speciality: "Natacao", students: 18, status: "ativo" },
  ]

  const financialData = [
    { month: "Fevereiro 2026", receita: "R$ 45.800", despesas: "R$ 28.200", lucro: "R$ 17.600", status: "positivo" },
    { month: "Janeiro 2026", receita: "R$ 43.200", despesas: "R$ 27.800", lucro: "R$ 15.400", status: "positivo" },
    { month: "Dezembro 2025", receita: "R$ 38.500", despesas: "R$ 26.500", lucro: "R$ 12.000", status: "positivo" },
    { month: "Novembro 2025", receita: "R$ 41.100", despesas: "R$ 29.300", lucro: "R$ 11.800", status: "positivo" },
    { month: "Outubro 2025", receita: "R$ 39.800", despesas: "R$ 30.100", lucro: "R$ 9.700", status: "positivo" },
  ]

  const agendaToday = [
    { time: "06:00", event: "Musculacao - Turma A", professor: "Prof. Ana Lima", room: "Sala 1" },
    { time: "07:00", event: "Funcional", professor: "Prof. Ricardo Souza", room: "Area Externa" },
    { time: "08:00", event: "Musculacao - Turma B", professor: "Prof. Ana Lima", room: "Sala 1" },
    { time: "09:00", event: "Pilates", professor: "Prof. Julia Santos", room: "Sala 2" },
    { time: "10:00", event: "Crossfit", professor: "Prof. Fernanda Costa", room: "Box" },
    { time: "14:00", event: "Personal Training", professor: "Prof. Marcos Oliveira", room: "Sala 3" },
    { time: "16:00", event: "Natacao", professor: "Prof. Thiago Reis", room: "Piscina" },
    { time: "18:00", event: "Musculacao - Turma C", professor: "Prof. Ana Lima", room: "Sala 1" },
    { time: "19:00", event: "Crossfit Noturno", professor: "Prof. Fernanda Costa", room: "Box" },
  ]

  const reports = [
    { title: "Frequencia Mensal", description: "Taxa de presenca dos alunos em Fevereiro", value: "78%", trend: "+3%" },
    { title: "Retencao de Alunos", description: "Alunos que renovaram nos ultimos 3 meses", value: "92%", trend: "+5%" },
    { title: "Satisfacao", description: "Nota media da pesquisa de satisfacao", value: "4.7/5", trend: "+0.2" },
    { title: "Horario de Pico", description: "Periodo com maior movimento na academia", value: "18h-20h", trend: "" },
    { title: "Aulas mais Populares", description: "Modalidade com mais inscritos este mes", value: "Musculacao", trend: "" },
    { title: "Inadimplencia", description: "Porcentagem de pagamentos atrasados", value: "4.2%", trend: "-1.3%" },
  ]

  const quickActions = [
    { label: "Gerenciar Alunos", icon: Users, sheet: "alunos" as SheetType },
    { label: "Gerenciar Professores", icon: Dumbbell, sheet: "professores" as SheetType },
    { label: "Financeiro", icon: DollarSign, sheet: "financeiro" as SheetType },
    { label: "Agenda", icon: Calendar, sheet: "agenda" as SheetType },
    { label: "Relatorios", icon: BarChart3, sheet: "relatorios" as SheetType },
  ]

  const filteredStudents = allStudents.filter(
    (s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.ra.includes(searchQuery)
  )

  const filteredProfessors = allProfessors.filter(
    (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.ra.includes(searchQuery)
  )

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
        <div className="mb-8">
          <h2 className="text-2xl font-semibold font-mono text-foreground">
            Bom dia, Administrador
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Aqui esta o resumo da sua academia hoje.
          </p>
        </div>

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

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
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

      {/* SHEET: Gerenciar Alunos */}
      <Sheet open={activeSheet === "alunos"} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent className="w-full sm:max-w-lg bg-card border-border overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-foreground font-mono">Gerenciar Alunos</SheetTitle>
            <SheetDescription>{allStudents.length} alunos cadastrados</SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou RA..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-3">
              {filteredStudents.map((student, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-3">
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
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* SHEET: Gerenciar Professores */}
      <Sheet open={activeSheet === "professores"} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent className="w-full sm:max-w-lg bg-card border-border overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-foreground font-mono">Gerenciar Professores</SheetTitle>
            <SheetDescription>{allProfessors.length} professores na equipe</SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-4">
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
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-3">
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
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* SHEET: Financeiro */}
      <Sheet open={activeSheet === "financeiro"} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent className="w-full sm:max-w-lg bg-card border-border overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-foreground font-mono">Financeiro</SheetTitle>
            <SheetDescription>Resumo financeiro dos ultimos meses</SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-4">
            {/* Summary cards */}
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

      {/* SHEET: Agenda */}
      <Sheet open={activeSheet === "agenda"} onOpenChange={(open) => !open && setActiveSheet(null)}>
        <SheetContent className="w-full sm:max-w-lg bg-card border-border overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-foreground font-mono">Agenda de Hoje</SheetTitle>
            <SheetDescription>{agendaToday.length} atividades programadas</SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-4">
            <div className="flex flex-col gap-3">
              {agendaToday.map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-3">
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

      {/* SHEET: Relatorios */}
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
    </div>
  )
}
