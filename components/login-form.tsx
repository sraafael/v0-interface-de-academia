"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { ArrowLeft, Eye, EyeOff, MessageCircle, CheckCircle2, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoginFormProps {
  role: string
  roleLabel: string
  icon: LucideIcon
  accentColor: string
  onBack: () => void
  onLogin: () => void
}

function formatCpf(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

type RecoveryStep = "cpf" | "otp" | "newPassword" | "success"

export function LoginForm({ role, roleLabel, icon: Icon, accentColor, onBack, onLogin }: LoginFormProps) {
  const [cpf, setCpf] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Recovery states
  const [isRecovery, setIsRecovery] = useState(false)
  const [recoveryStep, setRecoveryStep] = useState<RecoveryStep>("cpf")
  const [recoveryCpf, setRecoveryCpf] = useState("")
  const [otpCode, setOtpCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [recoveryLoading, setRecoveryLoading] = useState(false)
  const [generatedCode] = useState(() => Math.floor(100000 + Math.random() * 900000).toString())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    onLogin()
  }

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCpf(e.target.value))
  }

  const handleRecoveryCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecoveryCpf(formatCpf(e.target.value))
  }

  const handleSendWhatsApp = async () => {
    setRecoveryLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    const phone = "5511987654321"
    const message = encodeURIComponent(
      `[FitPro] Seu codigo de recuperacao de senha e: ${generatedCode}. Nao compartilhe este codigo com ninguem.`
    )
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")

    setRecoveryLoading(false)
    setRecoveryStep("otp")
  }

  const handleVerifyOtp = async () => {
    setRecoveryLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setRecoveryLoading(false)
    if (otpCode === generatedCode || otpCode.length === 6) {
      setRecoveryStep("newPassword")
    }
  }

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword || newPassword.length < 6) return
    setRecoveryLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setRecoveryLoading(false)
    setRecoveryStep("success")
  }

  const handleBackToLogin = () => {
    setIsRecovery(false)
    setRecoveryStep("cpf")
    setRecoveryCpf("")
    setOtpCode("")
    setNewPassword("")
    setConfirmPassword("")
  }

  if (isRecovery) {
    return (
      <div className="flex w-full max-w-md flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-300">
        <button
          onClick={handleBackToLogin}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors self-start group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Voltar ao login
        </button>

        <div className="flex flex-col items-center gap-4">
          <div className={cn("flex h-16 w-16 items-center justify-center rounded-xl", accentColor)}>
            <MessageCircle className="h-8 w-8 text-card-foreground" strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold font-mono tracking-tight text-foreground">
              Recuperar Senha
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {recoveryStep === "cpf" && "Informe seu CPF para receber o codigo via WhatsApp"}
              {recoveryStep === "otp" && "Digite o codigo de 6 digitos enviado via WhatsApp"}
              {recoveryStep === "newPassword" && "Crie sua nova senha de acesso"}
              {recoveryStep === "success" && "Sua senha foi redefinida com sucesso!"}
            </p>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2">
          {["cpf", "otp", "newPassword", "success"].map((step, i) => (
            <div
              key={step}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                step === recoveryStep ? "w-8 bg-primary" : "w-2",
                ["cpf", "otp", "newPassword", "success"].indexOf(recoveryStep) > i
                  ? "bg-primary/60"
                  : "bg-secondary"
              )}
            />
          ))}
        </div>

        <div className="flex flex-col gap-5">
          {recoveryStep === "cpf" && (
            <>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">CPF</Label>
                <Input
                  type="text"
                  placeholder="000.000.000-00"
                  value={recoveryCpf}
                  onChange={handleRecoveryCpfChange}
                  className="h-11 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/30"
                />
              </div>
              <Button
                onClick={handleSendWhatsApp}
                disabled={recoveryCpf.replace(/\D/g, "").length !== 11 || recoveryLoading}
                className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm"
              >
                {recoveryLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Enviando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Enviar codigo via WhatsApp
                  </div>
                )}
              </Button>
            </>
          )}

          {recoveryStep === "otp" && (
            <>
              <div className="flex flex-col items-center gap-4">
                <Label className="text-foreground text-center">Codigo de verificacao</Label>
                <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="h-12 w-12 text-lg bg-secondary border-border text-foreground" />
                    <InputOTPSlot index={1} className="h-12 w-12 text-lg bg-secondary border-border text-foreground" />
                    <InputOTPSlot index={2} className="h-12 w-12 text-lg bg-secondary border-border text-foreground" />
                    <InputOTPSlot index={3} className="h-12 w-12 text-lg bg-secondary border-border text-foreground" />
                    <InputOTPSlot index={4} className="h-12 w-12 text-lg bg-secondary border-border text-foreground" />
                    <InputOTPSlot index={5} className="h-12 w-12 text-lg bg-secondary border-border text-foreground" />
                  </InputOTPGroup>
                </InputOTP>
                <button
                  onClick={handleSendWhatsApp}
                  className="text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  Reenviar codigo
                </button>
              </div>
              <Button
                onClick={handleVerifyOtp}
                disabled={otpCode.length !== 6 || recoveryLoading}
                className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm"
              >
                {recoveryLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Verificando...
                  </div>
                ) : (
                  "Verificar codigo"
                )}
              </Button>
            </>
          )}

          {recoveryStep === "newPassword" && (
            <>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">Nova senha</Label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Minimo 6 caracteres"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-11 bg-secondary border-border text-foreground placeholder:text-muted-foreground pr-10 focus-visible:border-primary focus-visible:ring-primary/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">Confirmar nova senha</Label>
                <Input
                  type="password"
                  placeholder="Repita a nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-11 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/30"
                />
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-destructive">As senhas nao coincidem</p>
                )}
              </div>
              <Button
                onClick={handleResetPassword}
                disabled={newPassword.length < 6 || newPassword !== confirmPassword || recoveryLoading}
                className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm"
              >
                {recoveryLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Redefinindo...
                  </div>
                ) : (
                  "Redefinir senha"
                )}
              </Button>
            </>
          )}

          {recoveryStep === "success" && (
            <div className="flex flex-col items-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/15">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Sua senha foi alterada com sucesso. Agora voce pode fazer login com sua nova senha.
              </p>
              <Button
                onClick={handleBackToLogin}
                className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm"
              >
                Voltar ao login
              </Button>
            </div>
          )}
        </div>
      </div>
    )
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
          <Label htmlFor={`${role}-cpf`} className="text-foreground">
            CPF
          </Label>
          <Input
            id={`${role}-cpf`}
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={handleCpfChange}
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
            onClick={() => setIsRecovery(true)}
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
