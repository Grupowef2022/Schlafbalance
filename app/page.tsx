"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Verificar se está logado
    const checkAuth = () => {
      try {
        const auth = localStorage.getItem("schlafbalance_auth")
        const user = localStorage.getItem("schlafbalance_user")

        // Se está logado e tem dados completos, vai para dashboard
        if (auth === "true" && user) {
          const userData = JSON.parse(user)
          if (userData && userData.parentName && userData.babyName) {
            router.push("/dashboard")
            return
          }
        }

        // Se não está logado, vai direto para login
        router.push("/login")
      } catch (error) {
        // Se houver erro, limpar dados e ir para login
        localStorage.removeItem("schlafbalance_auth")
        localStorage.removeItem("schlafbalance_user")
        localStorage.removeItem("schlafbalance_email")
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  // Mostrar loading enquanto redireciona
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="animate-pulse mb-6">
          <Image
            src="/images/schlafbalance-logo.png"
            width={120}
            height={120}
            alt="SchlafBalance Logo"
            className="mx-auto"
          />
        </div>
        <p className="text-purple-600 font-medium font-rounded">Wird geladen...</p>
      </div>
    </main>
  )
}
