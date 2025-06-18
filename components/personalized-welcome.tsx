import type { UserData } from "@/hooks/use-user-data"
import { Badge } from "@/components/ui/badge"
import { Star, Award, Clock, Sparkles } from "lucide-react"

interface PersonalizedWelcomeProps {
  userData: UserData
}

export function PersonalizedWelcome({ userData }: PersonalizedWelcomeProps) {
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return { greeting: "Guten Morgen", emoji: "🌅" }
    if (hour < 18) return { greeting: "Guten Tag", emoji: "☀️" }
    return { greeting: "Guten Abend", emoji: "🌆" }
  }

  const getAgeSpecificMessage = () => {
    const { ageValue, ageUnit, babyName } = userData

    if (ageUnit === "wochen") {
      if (ageValue < 8) {
        return `${babyName} ist noch ganz klein - jede kleine Verbesserung ist ein großer Erfolg! 🌟`
      } else {
        return `${babyName} entwickelt langsam einen Rhythmus - perfekte Zeit für unser Programm! 💪`
      }
    } else {
      if (ageValue < 6) {
        return `${babyName} lernt gerade die Welt kennen - Geduld und Routine sind der Schlüssel! 🗝️`
      } else if (ageValue < 12) {
        return `${babyName} ist in der perfekten Phase für Schlaftraining - Sie schaffen das! 🎯`
      } else {
        return `${babyName} kann schon viel verstehen - nutzen Sie das für bessere Schlafgewohnheiten! 🧠`
      }
    }
  }

  const timeGreeting = getTimeBasedGreeting()

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl">{timeGreeting.emoji}</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {timeGreeting.greeting}, {userData.parentName}!
              </h1>
              <p className="text-gray-600 mt-1">
                Hier ist der Schlafplan für <span className="font-semibold text-purple-700">{userData.babyName}</span> (
                {userData.ageValue} {userData.ageUnit === "wochen" ? "Wochen" : "Monate"} alt) 💕
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-md">
              <Star className="h-3.5 w-3.5 mr-1" />
              {userData.stars} Sterne
            </Badge>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-md">
              <Award className="h-3.5 w-3.5 mr-1" />
              {userData.streakDays} Tage Streak
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0 shadow-md">
              <Clock className="h-3.5 w-3.5 mr-1" />
              Tag {userData.currentDay}
            </Badge>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-4 border border-purple-200/50 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 rounded-full p-2 mt-1">
              <Sparkles className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-sm text-purple-800 font-medium leading-relaxed">{getAgeSpecificMessage()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
