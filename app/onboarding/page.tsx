"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [parentName, setParentName] = useState("")
  const [babyName, setBabyName] = useState("")
  const [ageUnit, setAgeUnit] = useState("monate")
  const [ageValue, setAgeValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Verificar se está autenticado
    const auth = localStorage.getItem("schlafbalance_auth")
    if (auth !== "true") {
      router.push("/login")
    }
  }, [router])

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = () => {
    setIsLoading(true)

    setTimeout(() => {
      // Salvar dados do usuário
      const userData = {
        parentName,
        babyName,
        ageValue: Number.parseInt(ageValue),
        ageUnit,
        registrationDate: new Date().toISOString(),
        currentDay: 1,
        totalDays: 14,
        stars: 0,
        completedRoutines: 0,
        streakDays: 0,
      }

      localStorage.setItem("schlafbalance_user", JSON.stringify(userData))

      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>Willkommen bei SchlafBalance</CardTitle>
              <CardDescription>Erzählen Sie uns ein wenig über Sie</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="parent-name">Wie dürfen wir Sie nennen?</Label>
                <Input
                  id="parent-name"
                  placeholder="Ihr Name"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </>
        )
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Über Ihr Baby</CardTitle>
              <CardDescription>Wie heißt Ihr kleiner Schatz?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="baby-name">Name des Babys</Label>
                <Input
                  id="baby-name"
                  placeholder="Name des Babys"
                  value={babyName}
                  onChange={(e) => setBabyName(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </>
        )
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Alter des Babys</CardTitle>
              <CardDescription>Wie alt ist {babyName || "Ihr Baby"}?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="age-value">Alter</Label>
                  <Input
                    id="age-value"
                    type="number"
                    min="0"
                    max="36"
                    placeholder="z.B. 6"
                    value={ageValue}
                    onChange={(e) => setAgeValue(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="age-unit">Einheit</Label>
                  <Select value={ageUnit} onValueChange={setAgeUnit}>
                    <SelectTrigger id="age-unit">
                      <SelectValue placeholder="Wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wochen">Wochen</SelectItem>
                      <SelectItem value="monate">Monate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Image
            src="/images/schlafbalance-logo.png"
            width={80}
            height={80}
            alt="SchlafBalance Logo"
            className="mx-auto drop-shadow-lg"
          />
          <h1 className="mt-4 text-2xl font-bold text-purple-800">SchlafBalance</h1>
        </div>

        <Card className="shadow-lg border-purple-100">
          <div className="px-6 pt-6">
            <Progress value={(step / 3) * 100} className="h-2" />
            <p className="text-right text-xs text-gray-500 mt-1">Schritt {step} von 3</p>
          </div>

          {renderStep()}

          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Zurück
              </Button>
            ) : (
              <div></div>
            )}
            <Button
              onClick={handleNext}
              className="bg-purple-600 hover:bg-purple-700"
              disabled={
                (step === 1 && !parentName) || (step === 2 && !babyName) || (step === 3 && !ageValue) || isLoading
              }
            >
              {step === 3 ? (isLoading ? "Wird erstellt..." : "Fertigstellen") : "Weiter"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
