"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular delay de login
    setTimeout(() => {
      // Fazer login direto
      localStorage.setItem("schlafbalance_auth", "true")
      localStorage.setItem("schlafbalance_email", email)

      // Verificar se é primeira vez
      const existingUser = localStorage.getItem("schlafbalance_user")

      if (!existingUser) {
        // Primeira vez - ir para onboarding
        router.push("/onboarding")
      } else {
        // Usuário existente - ir para dashboard
        router.push("/dashboard")
      }

      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated stars */}
        <div className="absolute top-20 left-8 text-yellow-200 text-2xl animate-pulse">✨</div>
        <div className="absolute top-32 right-12 text-yellow-200 text-lg animate-pulse delay-1000">⭐</div>
        <div className="absolute bottom-40 right-8 text-yellow-200 text-2xl animate-pulse delay-700">⭐</div>
        <div className="absolute bottom-64 left-12 text-yellow-200 text-lg animate-pulse delay-300">✨</div>

        {/* Floating moons */}
        <div className="absolute top-16 right-20 text-yellow-200 text-3xl animate-bounce">🌙</div>
        <div className="absolute bottom-32 left-6 text-yellow-200 text-2xl animate-bounce delay-1000">🌙</div>

        {/* Floating clouds */}
        <div className="absolute top-40 left-4 text-white text-4xl opacity-30 animate-float">☁️</div>
        <div className="absolute top-80 right-6 text-white text-3xl opacity-20 animate-float delay-500">☁️</div>
        <div className="absolute bottom-20 right-16 text-white text-5xl opacity-25 animate-float delay-1000">☁️</div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="mb-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <Image
                src="/images/schlafbalance-logo.png"
                width={100}
                height={100}
                alt="SchlafBalance Logo"
                className="mx-auto relative z-10 drop-shadow-2xl"
              />
            </div>
            <h1 className="mt-6 text-3xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent">
              SchlafBalance
            </h1>
            <p className="text-sm text-gray-600 mt-2 font-medium">Willkommen zurück! 🌙</p>
          </div>

          {/* Cover Image */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-lg opacity-30"></div>
              <Image
                src="/images/mother-baby-cover.png"
                width={220}
                height={220}
                alt="Mutter mit Baby"
                className="relative z-10 rounded-3xl shadow-2xl border-4 border-white/50"
              />
            </div>
          </div>

          {/* Login Card */}
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-purple-50/80"></div>
            <div className="relative z-10">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                  Anmelden
                </CardTitle>
                <CardDescription className="text-gray-600">Geben Sie Ihre Zugangsdaten ein</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6 px-6">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="flex items-center gap-2 text-gray-700 font-medium">
                      <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                        <Mail className="h-3 w-3 text-white" />
                      </div>
                      E-Mail-Adresse
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@beispiel.de"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 bg-white/80 border-2 border-purple-200 focus:border-purple-400 rounded-xl text-gray-800 placeholder:text-gray-400"
                    />
                    <div className="text-xs text-gray-600 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-2">
                        <span className="text-blue-500">💡</span>
                        <div>
                          <strong className="text-blue-700">Wichtig:</strong> Bitte verwenden Sie die E-Mail-Adresse,
                          die Sie beim Kauf von SchlafBalance angegeben haben.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="password" className="flex items-center gap-2 text-gray-700 font-medium">
                      <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                        <Lock className="h-3 w-3 text-white" />
                      </div>
                      Passwort
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Ihr Passwort"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 bg-white/80 border-2 border-purple-200 focus:border-purple-400 rounded-xl text-gray-800 placeholder:text-gray-400 pr-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 px-6 pb-6">
                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800 shadow-xl text-white font-bold text-lg rounded-2xl border-0 transition-all duration-300 transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span>Wird angemeldet...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Anmelden</span>
                        <span className="text-xl">🚀</span>
                      </div>
                    )}
                  </Button>
                  <div className="text-center text-sm">
                    <span className="text-gray-600">Noch kein Konto? </span>
                    <Link
                      href="/register"
                      className="text-purple-600 hover:text-purple-800 font-semibold hover:underline transition-colors"
                    >
                      Hier registrieren
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </div>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">Sichere Anmeldung • Ihre Daten sind geschützt 🔒</p>
          </div>
        </div>
      </div>
    </div>
  )
}
