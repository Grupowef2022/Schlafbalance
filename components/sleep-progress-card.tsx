import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Moon, Star, Clock, TrendingUp } from "lucide-react"
import type { UserData } from "@/hooks/use-user-data"

interface SleepProgressCardProps {
  progress: number
  userData: UserData
}

export function SleepProgressCard({ progress, userData }: SleepProgressCardProps) {
  const getProgressMessage = () => {
    if (progress >= 80) return `Ausgezeichnet! ${userData.babyName} macht fantastische Fortschritte! 🌟`
    if (progress >= 60) return `Sehr gut! ${userData.babyName} gewöhnt sich an die Routine! 👍`
    if (progress >= 40) return `Guter Start! Bleiben Sie dran mit ${userData.babyName}! 💪`
    return `Jeder Anfang ist schwer. ${userData.babyName} braucht noch etwas Zeit! 🤗`
  }

  const getNextGoal = () => {
    const daysLeft = userData.totalDays - userData.currentDay
    if (daysLeft > 7) return "Ziel: 7 Tage Routine etablieren"
    if (daysLeft > 0) return `Ziel: Programm in ${daysLeft} Tagen abschließen`
    return "Programm erfolgreich abgeschlossen!"
  }

  return (
    <Card className="border-purple-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Moon className="h-5 w-5 text-purple-600" />
          {userData.babyName}s Schlaffortschritt
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Heutige Routine</span>
              <span className="text-purple-600 font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <div>
                <div className="font-medium">{userData.stars} Sterne</div>
                <div className="text-xs text-gray-500">Heute: +3</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <div>
                <div className="font-medium">{userData.streakDays} Tage</div>
                <div className="text-xs text-gray-500">In Folge</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-purple-50 p-3">
            <p className="text-sm text-purple-800 font-medium">{getProgressMessage()}</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-purple-600">
              <Clock className="h-3 w-3" />
              <span>{getNextGoal()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
