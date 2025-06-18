"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  ChevronRight,
  Clock,
  Star,
  ArrowLeft,
  CheckCircle2,
  Moon,
  Bath,
  Heart,
  BookOpen,
  BedDouble,
  Volume2,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { MobileLayout } from "@/components/mobile-layout"
import { useUserData } from "@/hooks/use-user-data"

interface RoutineStepData {
  id: number
  title: string
  description: string
  duration: string
  completed: boolean
  icon: any
  tips: string[]
  color: string
}

interface RoutineStepProps {
  step: RoutineStepData
  isActive: boolean
  onClick: () => void
}

function RoutineStep({ step, isActive, onClick }: RoutineStepProps) {
  const IconComponent = step.icon

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-2 p-4 cursor-pointer transition-all duration-300 ${
        isActive
          ? "border-purple-300 bg-gradient-to-r from-purple-50 to-indigo-50 shadow-lg scale-102"
          : step.completed
            ? "border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-md"
            : "border-gray-200 bg-white/80 hover:bg-gray-50 hover:border-purple-200 hover:shadow-md"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div
          className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
            step.completed
              ? "bg-gradient-to-r from-green-500 to-emerald-600"
              : isActive
                ? `bg-gradient-to-r ${step.color}`
                : "bg-gray-200"
          }`}
        >
          {step.completed ? (
            <CheckCircle2 className="h-6 w-6 text-white" />
          ) : (
            <IconComponent className={`h-6 w-6 ${isActive ? "text-white" : "text-gray-500"}`} />
          )}
        </div>

        <div className="flex-1">
          <h3
            className={`font-bold text-lg ${
              step.completed ? "text-green-800" : isActive ? "text-purple-800" : "text-gray-700"
            }`}
          >
            {step.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              {step.duration}
            </Badge>
            {step.completed && (
              <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">✓ Abgeschlossen</Badge>
            )}
          </div>
        </div>

        {isActive && !step.completed && (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-150"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function RoutinePage() {
  const router = useRouter()
  const { userData } = useUserData()
  const [currentStep, setCurrentStep] = useState(0)

  const routineSteps: RoutineStepData[] = [
    {
      id: 1,
      title: "Entspannendes Bad",
      description: `Ein warmes Bad mit beruhigenden Düften für ${userData?.babyName}`,
      duration: "10 Minuten",
      completed: false,
      icon: Bath,
      color: "from-blue-500 to-cyan-600",
      tips: ["Wassertemperatur: 37°C", "Lavendel-Badezusatz verwenden", "Ruhige Atmosphäre schaffen"],
    },
    {
      id: 2,
      title: "Sanfte Massage",
      description: `Liebevolle Massage für ${userData?.babyName} mit warmem Babyöl`,
      duration: "5 Minuten",
      completed: false,
      icon: Heart,
      color: "from-pink-500 to-rose-600",
      tips: ["Babyöl anwärmen", "Sanfte kreisende Bewegungen", "Auf Reaktionen achten"],
    },
    {
      id: 3,
      title: "Schlafkleidung anziehen",
      description: `Bequeme, warme Schlafkleidung für ${userData?.babyName}`,
      duration: "5 Minuten",
      completed: false,
      icon: Moon,
      color: "from-purple-500 to-indigo-600",
      tips: ["Atmungsaktive Materialien", "Nicht zu warm anziehen", "Frische Windel"],
    },
    {
      id: 4,
      title: "Beruhigende Geschichte",
      description: `Eine kurze, ruhige Geschichte für ${userData?.babyName} vorlesen`,
      duration: "5-10 Minuten",
      completed: false,
      icon: BookOpen,
      color: "from-yellow-500 to-orange-600",
      tips: ["Ruhige, sanfte Stimme", "Kurze, einfache Geschichten", "Wiederholung ist gut"],
    },
    {
      id: 5,
      title: "Abdunkeln & Weißes Rauschen",
      description: `${userData?.babyName}s Zimmer für den Schlaf vorbereiten`,
      duration: "2 Minuten",
      completed: false,
      icon: Volume2,
      color: "from-indigo-500 to-purple-600",
      tips: ["Licht langsam dimmen", "Weißes Rauschen einschalten", "Raumtemperatur prüfen"],
    },
    {
      id: 6,
      title: "Ins Bett legen",
      description: `${userData?.babyName} schläfrig, aber noch wach ins Bett legen`,
      duration: "5 Minuten",
      completed: false,
      icon: BedDouble,
      color: "from-green-500 to-emerald-600",
      tips: ["Schläfrig, aber wach", "Kurz beruhigen", "Dann das Zimmer verlassen"],
    },
  ]

  const [steps, setSteps] = useState(routineSteps)

  const handleCompleteStep = () => {
    const newSteps = [...steps]
    newSteps[currentStep].completed = true
    setSteps(newSteps)

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const progress = Math.round((steps.filter((step) => step.completed).length / steps.length) * 100)
  const currentStepData = steps[currentStep]
  const completedSteps = steps.filter((step) => step.completed).length

  if (!currentStepData) {
    return (
      <AuthGuard>
        <MobileLayout>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-pulse mb-6">
                <div className="w-16 h-16 bg-purple-300 rounded-full mx-auto mb-4"></div>
              </div>
              <p className="text-purple-600 font-medium font-rounded">Lade Routine...</p>
            </div>
          </div>
        </MobileLayout>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <MobileLayout>
        <div className="container max-w-4xl mx-auto py-6 px-4">
          {/* Header com botão de voltar */}
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-3 hover:bg-white/80">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {userData?.babyName}s Abendritual
              </h1>
              <p className="text-gray-600 mt-1">
                Tag {userData?.currentDay} von {userData?.totalDays} • Schritt für Schritt zum besseren Schlaf ✨
              </p>
            </div>
          </div>

          {/* Routine Header Card */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 rounded-full p-3">
                  <Moon className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Abendritual für {userData?.babyName}</h2>
                  <p className="opacity-90">Jeden Schritt mit Liebe und Geduld durchführen</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-white/20 text-white border-0">
                      <Star className="h-3 w-3 mr-1" />
                      {completedSteps}/{steps.length} Schritte
                    </Badge>
                    <span className="text-sm opacity-80">{progress}% abgeschlossen</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Card */}
          <Card className="mb-6 border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-rounded text-purple-800">Heutiger Fortschritt</CardTitle>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{progress}%</div>
                  <div className="text-sm text-gray-500">abgeschlossen</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="h-4 rounded-full mb-4" />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3">
                  <div className="text-lg font-bold text-green-600">{completedSteps}</div>
                  <div className="text-xs text-green-700">Erledigt</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-3">
                  <div className="text-lg font-bold text-purple-600">{steps.length - completedSteps}</div>
                  <div className="text-xs text-purple-700">Offen</div>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-3">
                  <div className="text-lg font-bold text-orange-600">+3</div>
                  <div className="text-xs text-orange-700">Sterne</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Step Card */}
          <Card className="mb-6 border-0 shadow-xl bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`bg-gradient-to-r ${currentStepData.color} rounded-full p-3`}>
                  <currentStepData.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-rounded text-slate-700">{currentStepData.title}</CardTitle>
                  <p className="text-gray-600">
                    Schritt {currentStep + 1} von {steps.length}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-rounded text-slate-600 text-lg">{currentStepData.description}</p>

              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  {currentStepData.duration}
                </Badge>
                <Badge className={`bg-gradient-to-r ${currentStepData.color} text-white border-0`}>
                  Aktiver Schritt
                </Badge>
              </div>

              {/* Tips */}
              <div className="bg-white/80 rounded-xl p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                  💡 Tipps für diesen Schritt:
                </h4>
                <ul className="space-y-1">
                  {currentStepData.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleCompleteStep}
                className="w-full h-14 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-2xl font-rounded text-lg shadow-lg"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    🌟 Ritual abschließen <Star className="ml-2 h-5 w-5" />
                  </>
                ) : (
                  <>
                    ✓ Schritt abschließen <ChevronRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* All Steps Overview */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl mb-6">
            <CardHeader>
              <CardTitle className="text-xl font-rounded text-purple-800">Alle Routine-Schritte</CardTitle>
              <p className="text-gray-600">Klicken Sie auf einen Schritt, um direkt dorthin zu springen</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <RoutineStep
                    key={step.id}
                    step={step}
                    isActive={index === currentStep}
                    onClick={() => setCurrentStep(index)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Success Message */}
          {completedSteps === steps.length && (
            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🎉</div>
                  <h3 className="text-2xl font-bold text-green-800">Fantastisch!</h3>
                  <p className="text-green-700 text-lg">
                    Sie haben das komplette Abendritual für {userData?.babyName} erfolgreich abgeschlossen!
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-green-800">+3 Sterne erhalten!</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </MobileLayout>
    </AuthGuard>
  )
}
