"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      try {
        const auth = localStorage.getItem("schlafbalance_auth")
        const user = localStorage.getItem("schlafbalance_user")

        // Verificação rigorosa: precisa ter AMBOS os dados
        if (auth === "true" && user) {
          const userData = JSON.parse(user)
          if (userData && userData.parentName && userData.babyName) {
            setIsAuthenticated(true)
            setIsLoading(false)
            return
          }
        }

        // Se não está autenticado, redirecionar para login
        router.push("/login")
      } catch (error) {
        // Se houver erro, limpar dados e redirecionar
        localStorage.removeItem("schlafbalance_auth")
        localStorage.removeItem("schlafbalance_user")
        localStorage.removeItem("schlafbalance_email")
        router.push("/login")
      }
    }

    // Delay para evitar hydration mismatch
    const timer = setTimeout(checkAuth, 100)
    return () => clearTimeout(timer)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-pulse mb-6">
            <div className="w-32 h-32 bg-purple-300 rounded-full mx-auto mb-4"></div>
          </div>
          <p className="text-purple-600 font-medium font-rounded">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Não renderiza nada enquanto redireciona
  }

  return <>{children}</>
}
