import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Baby, Clock, Thermometer } from "lucide-react"
import type { UserData } from "@/hooks/use-user-data"

interface TodayTipsCardProps {
  userData: UserData
}

export function TodayTipsCard({ userData }: TodayTipsCardProps) {
  const getAgeSpecificTip = () => {
    const { ageValue, ageUnit, babyName } = userData

    if (ageUnit === "wochen") {
      if (ageValue < 8) {
        return {
          title: `Für ${babyName} (${ageValue} Wochen)`,
          tip: "Neugeborene schlafen 14-17 Stunden täglich. Kurze Wachphasen sind normal - nutzen Sie diese für sanfte Interaktion.",
          icon: Baby,
        }
      } else {
        return {
          title: `Für ${babyName} (${ageValue} Wochen)`,
          tip: "Ihr Baby entwickelt langsam einen Tag-Nacht-Rhythmus. Helles Licht am Tag und Dunkelheit in der Nacht helfen dabei.",
          icon: Clock,
        }
      }
    } else {
      if (ageValue < 6) {
        return {
          title: `Für ${babyName} (${ageValue} Monate)`,
          tip: "In diesem Alter kann Ihr Baby 4-6 Stunden am Stück schlafen. Seien Sie geduldig - jedes Baby ist anders!",
          icon: Clock,
        }
      } else if (ageValue < 12) {
        return {
          title: `Für ${babyName} (${ageValue} Monate)`,
          tip: "Perfektes Alter für Schlaftraining! Ihr Baby kann jetzt längere Schlafphasen entwickeln und Routinen verstehen.",
          icon: Lightbulb,
        }
      } else {
        return {
          title: `Für ${babyName} (${ageValue} Monate)`,
          tip: "Ihr Kleinkind versteht schon viel! Erklären Sie die Schlafroutine und bleiben Sie konsequent bei den Zeiten.",
          icon: Baby,
        }
      }
    }
  }

  const tip = getAgeSpecificTip()

  const environmentTips = [
    {
      icon: Thermometer,
      title: "Optimale Temperatur",
      description: `${userData.babyName}s Zimmer sollte 18-20°C haben`,
    },
    {
      icon: Clock,
      title: "Timing ist wichtig",
      description: `Starten Sie das Ritual jeden Tag zur gleichen Zeit für ${userData.babyName}`,
    },
  ]

  return (
    <Card className="border-purple-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Tipps für {userData.babyName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg bg-blue-50 p-3 border border-blue-200">
            <div className="flex items-start gap-2">
              <tip.icon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-800 text-sm">{tip.title}</h4>
                <p className="text-sm text-blue-700 mt-1">{tip.tip}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-gray-700 text-sm">Zusätzliche Tipps:</h4>
            {environmentTips.map((envTip, index) => (
              <div key={index} className="flex items-start gap-2 p-2 rounded bg-gray-50">
                <envTip.icon className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-xs text-gray-800">{envTip.title}</div>
                  <div className="text-xs text-gray-600">{envTip.description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs text-gray-500 bg-yellow-50 p-2 rounded border border-yellow-200">
            💡 <strong>Erinnerung:</strong> Jedes Baby ist einzigartig. Was bei anderen funktioniert, braucht bei{" "}
            {userData.babyName} vielleicht etwas länger. Bleiben Sie geduldig und konsequent!
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
