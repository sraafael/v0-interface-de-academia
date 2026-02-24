"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoginFormProps {
  role: string
  roleLabel: string
  icon: LucideIcon
  accentColor: string
  onBack: () => void
  onLogin: () => void
}

export function LoginForm({ role, roleLabel, icon: Icon, accentColor, onBack, onLogin }: LoginFormProps) {
  const [ra, setRa] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    onLogin()
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors self-start group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Voltar
      </button>

      <div className="flex flex-col items-center gap-4">
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-xl",
            accentColor
          )}
        >
          <Icon className="h-8 w-8 text-card-foreground" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold font-mono tracking-tight text-foreground">
            {roleLabel}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Entre com suas credenciais para acessar
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${role}-ra`} className="text-foreground">
            RA (Registro Academico)
          </Label>
          <Input
            id={`${role}-ra`}
            type="text"
            placeholder="Ex: 2024001234"
            value={ra}
            onChange={(e) => setRa(e.target.value)}
            required
            className="h-11 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/30"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={`${role}-password`} className="text-foreground">
            Senha
          </Label>
          <div className="relative">
            <Input
              id={`${role}-password`}
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11 bg-secondary border-border text-foreground placeholder:text-muted-foreground pr-10 focus-visible:border-primary focus-visible:ring-primary/30"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="button"
            className="text-xs text-primary hover:text-primary/80 transition-colors"
          >
            Esqueceu a senha?
          </button>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Entrando...
            </div>
          ) : (
            "Entrar"
          )}
        </Button>
      </form>
    </div>
  )
}
