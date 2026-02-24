"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Dumbbell, DollarSign, TrendingUp, LogOut, BarChart3, Calendar, Settings } from "lucide-react"

interface DashboardAdminProps {
  onLogout: () => void
}

export function DashboardAdmin({ onLogout }: DashboardAdminProps) {
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
                {[
                  { label: "Gerenciar Alunos", icon: Users },
                  { label: "Gerenciar Professores", icon: Dumbbell },
                  { label: "Financeiro", icon: DollarSign },
                  { label: "Agenda", icon: Calendar },
                  { label: "Relatorios", icon: BarChart3 },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-3 text-sm text-foreground transition-colors hover:border-primary/30 hover:bg-secondary/80"
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                    {item.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
