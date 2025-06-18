import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, Star, Moon } from "lucide-react"
import Link from "next/link"
import type { UserData } from "@/hooks/use-user-data"

interface DailyRoutineCardProps {
  userData: UserData
}

export function DailyRoutineCard({ userData }: DailyRoutineCardProps) {
  const getRoutineForAge = () => {
    const { ageValue, ageUnit, babyName } = userData

    // Rotina base adaptada à idade
    const baseRoutine = [
      {
        id: 1,
        time: "19:00",
        title: "Entspannendes Bad",
        description: `Warmes Bad für ${babyName} mit beruhigenden Düften`,
        duration: "10 Min",
        completed: true,
      },
      {
        id: 2,
        time: "19:15",
        title: "Sanfte Massage & Schlafkleidung",
        description: `Liebevolle Massage für ${babyName} mit Babyöl, dann Schlafanzug anziehen`,
        duration: "10 Min",
        completed: false,
      },
      {
        id: 3,
        time: "19:30",
        title: "Beruhigende Geschichte",
        description:
          ageUnit === "wochen" && ageValue < 12
            ? `Sanfte Melodie oder leises Sprechen für ${babyName}`
            : `Kurze, ruhige Geschichte für ${babyName} vorlesen`,
        duration: ageUnit === "wochen" && ageValue < 12 ? "5 Min" : "10 Min",
        completed: false,
      },
      {
        id: 4,
        time: "19:40",
        title: "Abdunkeln & Weißes Rauschen",
        description: `${babyName}s Zimmer abdunkeln und beruhigende Geräusche einschalten`,
        duration: "2 Min",
        completed: false,
      },
      {
        id: 5,
        time: "19:45",
        title: `${babyName} ins Bett legen`,
        description: `${babyName} schläfrig, aber noch wach ins Bett legen - das ist der wichtigste Schritt!`,
        duration: "5 Min",
        completed: false,
      },
    ]

    // Anpassungen für sehr junge Babys
    if (ageUnit === "wochen" && ageValue < 8) {
      baseRoutine[0].description = `Sehr kurzes, warmes Bad für ${babyName} (optional bei Neugeborenen)`
      baseRoutine[1].description = `Sanfte Berührungen und frische Windel für ${babyName}`
      baseRoutine[2].title = "Stillen/Füttern"
      baseRoutine[2].description = `${babyName} füttern in ruhiger Atmosphäre`
    }

    return baseRoutine
  }

  const routineSteps = getRoutineForAge()
  const completedSteps = routineSteps.filter((step) => step.completed).length
  const totalSteps = routineSteps.length
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100)

  const getMotivationalMessage = () => {
    if (completedSteps === 0) {
      return `Bereit für ${userData.babyName}s Abendritual? Jeder Schritt bringt euch dem Ziel näher! 🌙`
    } else if (completedSteps < totalSteps) {
      return `Super! ${userData.babyName} macht schon mit. Weiter so! 💪`
    } else {
      return `Perfekt! ${userData.babyName}s Abendritual ist abgeschlossen! 🌟`
    }
  }

  return (
    <Card className="border-purple-100">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Moon className="h-5 w-5 text-purple-600" />
            {userData.babyName}s Abendritual
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Tag {userData.currentDay}</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500" />
              <span>
                {completedSteps}/{totalSteps}
              </span>
            </Badge>
          </div>
        </div>
        <p className="text-sm text-gray-600">{getMotivationalMessage()}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            {routineSteps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${
                  step.completed ? "bg-green-50 border-green-200" : "bg-white hover:bg-purple-50"
                }`}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-white">
                  {step.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <span className="text-xs font-medium text-gray-500">{step.id}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-medium ${step.completed ? "text-green-800" : "text-gray-900"}`}>
                      {step.title}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {step.duration}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                  <p className="text-xs text-gray-500">{step.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-800">Fortschritt heute</span>
              <span className="text-sm font-bold text-purple-600">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
            <Link href="/routine">
              {completedSteps === 0
                ? `Ritual für ${userData.babyName} starten`
                : completedSteps < totalSteps
                  ? `Ritual für ${userData.babyName} fortsetzen`
                  : `Ritual für ${userData.babyName} abschließen`}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
