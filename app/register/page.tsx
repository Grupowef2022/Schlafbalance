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

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Die Passwörter stimmen nicht überein")
      return
    }

    setIsLoading(true)

    // Simuliere Registrierungsprozess
    setTimeout(() => {
      setIsLoading(false)
      router.push("/onboarding")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Image
            src="/placeholder.svg?height=60&width=60"
            width={60}
            height={60}
            alt="SchlafBalance Logo"
            className="mx-auto"
          />
          <h1 className="mt-4 text-2xl font-bold text-purple-800">SchlafBalance</h1>
        </div>

        {/* Adicione esta nova seção da imagem de capa */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/images/mother-baby-cover.png"
            width={200}
            height={200}
            alt="Mutter mit Baby"
            className="rounded-2xl"
          />
        </div>

        <Card className="shadow-lg border-purple-100">
          <CardHeader>
            <CardTitle>Registrieren</CardTitle>
            <CardDescription>Erstellen Sie ein Konto für SchlafBalance</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@beispiel.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">
                  Bitte verwenden Sie die E-Mail-Adresse, die Sie beim Kauf angegeben haben
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Passwort bestätigen</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading ? "Wird registriert..." : "Registrieren"}
              </Button>
              <div className="text-center text-sm">
                Bereits ein Konto?{" "}
                <Link href="/login" className="text-purple-600 hover:text-purple-800">
                  Anmelden
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
