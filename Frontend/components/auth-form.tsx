"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface AuthFormProps {
  onClose: () => void
  onLoginSuccess: (user: { name: string; email: string; image: string }) => void
}

export default function AuthForm({ onClose, onLoginSuccess }: AuthFormProps) {
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      alert("Por favor completa todos los campos")
      return
    }

    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    const userName = mode === "signup" ? formData.name : "Usuario"
    onLoginSuccess({
      name: userName,
      email: formData.email,
      image: `/placeholder.svg?height=40&width=40&query=avatar`,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border p-4 sm:p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-foreground">{mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Nombre completo</label>
              <Input
                type="text"
                name="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                required={mode === "signup"}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Contraseña</label>
            <Input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Confirmar contraseña</label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <Button type="submit" size="lg" className="w-full">
            {mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
          </Button>
        </form>

        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-center text-sm text-muted-foreground mb-3">
            {mode === "login" ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
          </p>
          <Button
            type="button"
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Crear cuenta" : "Iniciar sesión"}
          </Button>
        </div>
      </div>
    </div>
  )
}
