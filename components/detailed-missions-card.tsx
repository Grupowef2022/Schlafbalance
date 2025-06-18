import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle, Star, Clock, Target, Gift } from "lucide-react"
import type { UserData } from "@/hooks/use-user-data"
import Link from "next/link"

interface DetailedMissionsCardProps {
  userData: UserData
}

export function DetailedMissionsCard({ userData }: DetailedMissionsCardProps) {
  const missions = [
    {
      id: 1,
      title: `Abendritual für ${userData.babyName} durchführen`,
      description: `Führe das komplette 6-Schritte Abendritual mit ${userData.babyName} durch. Jeder Schritt ist wichtig für die Schlafvorbereitung.`,
      progress: 60,
      maxProgress: 100,
      reward: 5,
      timeEstimate: "30-45 Min",
      difficulty: "Einfach",
      completed: false,
      urgent: true,
      steps: [
        "Entspannendes Bad (10 Min)",
        "Sanfte Massage mit Babyöl (5 Min)",
        "Schlafkleidung anziehen (5 Min)",
        "Beruhigende Geschichte vorlesen (10 Min)",
        "Raum abdunkeln & weißes Rauschen (2 Min)",
        `${userData.babyName} schläfrig ins Bett legen (5 Min)`,
      ],
    },
    {
      id: 2,
      title: `Schlafumgebung für ${userData.babyName} optimieren`,
      description: `Überprüfe und optimiere ${userData.babyName}s Schlafzimmer für die perfekte Schlafatmosphäre.`,
      progress: 25,
      maxProgress: 100,
      reward: 3,
      timeEstimate: "15 Min",
      difficulty: "Einfach",
      completed: false,
      urgent: false,
      steps: [
        "Raumtemperatur auf 18-20°C einstellen",
        "Verdunkelungsvorhänge schließen",
        "Störende Geräusche eliminieren",
        "Bett und Matratze überprüfen",
      ],
    },
    {
      id: 3,
      title: `Schlaftagebuch für ${userData.babyName} führen`,
      description: `Dokumentiere ${userData.babyName}s Schlafmuster für 3 Tage, um Verbesserungen zu erkennen.`,
      progress: 33,
      maxProgress: 100,
      reward: 4,
      timeEstimate: "5 Min täglich",
      difficulty: "Einfach",
      completed: false,
      urgent: false,
      steps: [
        "Einschlafzeit notieren",
        "Aufwachzeiten dokumentieren",
        "Schlafqualität bewerten (1-5)",
        "Besonderheiten aufschreiben",
      ],
    },
    {
      id: 4,
      title: `Entspannungsmusik für ${userData.babyName} testen`,
      description: `Teste verschiedene Schlaflieder und weißes Rauschen, um herauszufinden, was ${userData.babyName} am besten beruhigt.`,
      progress: 0,
      maxProgress: 100,
      reward: 2,
      timeEstimate: "20 Min",
      difficulty: "Sehr Einfach",
      completed: false,
      urgent: false,
      steps: [
        "3 verschiedene Schlaflieder abspielen",
        "Weißes Rauschen testen (Herzschlag, Regen)",
        `${userData.babyName}s Reaktion beobachten`,
        "Lieblingsklänge in Playlist speichern",
      ],
    },
  ]

  const completedMissions = missions.filter((m) => m.completed).length
  const totalMissions = missions.length

  return (
    <Card className="border-purple-100">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Heutige Missionen für {userData.babyName}
          </CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <span>
              {completedMissions}/{totalMissions}
            </span>
            <CheckCircle2 className="h-3 w-3" />
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Star className="h-4 w-4 text-yellow-500" />
          <span>Bis zu {missions.reduce((sum, m) => sum + m.reward, 0)} Sterne verfügbar</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className={`rounded-lg border p-4 transition-all ${
                mission.completed
                  ? "bg-green-50 border-green-200"
                  : mission.urgent
                    ? "bg-orange-50 border-orange-200"
                    : "bg-white border-gray-200 hover:border-purple-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center mt-1">
                  {mission.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`font-medium ${mission.completed ? "text-green-800" : "text-gray-900"}`}>
                        {mission.title}
                        {mission.urgent && (
                          <Badge variant="destructive" className="ml-2 text-xs">
                            Dringend
                          </Badge>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{mission.description}</p>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                      <Star className="h-3 w-3 fill-current" />
                      <span>{mission.reward}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{mission.timeEstimate}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {mission.difficulty}
                    </Badge>
                  </div>

                  {mission.progress > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Fortschritt</span>
                        <span>{mission.progress}%</span>
                      </div>
                      <Progress value={mission.progress} className="h-1.5" />
                    </div>
                  )}

                  <details className="text-sm">
                    <summary className="cursor-pointer text-purple-600 hover:text-purple-800 font-medium">
                      Schritte anzeigen ({mission.steps.length})
                    </summary>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      {mission.steps.map((step, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-300 rounded-full"></div>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </details>

                  {!mission.completed && (
                    <Button
                      asChild
                      size="sm"
                      className={
                        mission.urgent ? "bg-orange-600 hover:bg-orange-700" : "bg-purple-600 hover:bg-purple-700"
                      }
                    >
                      <Link href={mission.id === 1 ? "/routine" : mission.id === 4 ? "/audio" : "#"}>
                        {mission.id === 1 && "Ritual starten"}
                        {mission.id === 2 && "Umgebung prüfen"}
                        {mission.id === 3 && "Tagebuch öffnen"}
                        {mission.id === 4 && "Musik testen"}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {completedMissions === totalMissions && (
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 text-green-800">
              <Gift className="h-5 w-5" />
              <span className="font-medium">Alle Missionen abgeschlossen!</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Fantastisch! Du hast heute alles für {userData.babyName}s besseren Schlaf getan. Morgen warten neue
              Herausforderungen auf dich!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
