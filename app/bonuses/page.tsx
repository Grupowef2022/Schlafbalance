"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Music, Calendar, ArrowLeft, Eye, Star, Clock, Target, AlertTriangle } from "lucide-react"
import { SleepTracker } from "@/components/bonus-content/sleep-tracker"
import { ExclusiveAudio } from "@/components/bonus-content/exclusive-audio"
import { EmergencyCryingPlan } from "@/components/bonus-content/emergency-crying-plan"
import { AuthGuard } from "@/components/auth-guard"
import { MobileLayout } from "@/components/mobile-layout"

export default function BonusesPage() {
  const router = useRouter()
  const [activeBonus, setActiveBonus] = useState<string | null>(null)

  const bonuses = [
    {
      id: "emergency-crying-plan",
      title: "Notfallplan gegen Schreikrisen",
      description: "Sofortige Hilfe und bewährte Techniken für akute Schreiphasen - Schritt für Schritt Anleitung",
      icon: AlertTriangle,
      type: "emergency",
      premium: true,
      features: ["5 Module Notfallplan", "Sofort-Beruhigungs-Techniken", "Ursachen-Check", "Emotionaler Support"],
      estimatedTime: "SOS-Hilfe",
    },
    {
      id: "sleep-tracker",
      title: "30-Tage-Schlaf-Tracker",
      description: "Verfolgen Sie den Schlaffortschritt Ihres Babys über einen Monat mit detaillierten Analysen",
      icon: Calendar,
      type: "tracker",
      premium: true,
      features: ["Tägliche Schlafzeiten", "Fortschritts-Diagramme", "Muster-Erkennung", "Tipps basierend auf Daten"],
      estimatedTime: "5 Min täglich",
    },
    {
      id: "exclusive-audio",
      title: "Exklusive Schlafgeräusche Premium",
      description: "Spezielle Aufnahmen und Kompositionen für einen besseren Babyschlaf",
      icon: Music,
      type: "audio",
      premium: true,
      features: ["15 exklusive Tracks", "Binaurale Beats", "Naturgeräusche HD", "Endlos-Wiedergabe"],
      estimatedTime: "Unbegrenzt",
    },
  ]

  const handleBonusClick = (bonusId: string) => {
    setActiveBonus(activeBonus === bonusId ? null : bonusId)
  }

  const renderBonusContent = (bonusId: string) => {
    switch (bonusId) {
      case "emergency-crying-plan":
        return <EmergencyCryingPlan />
      case "sleep-tracker":
        return <SleepTracker />
      case "exclusive-audio":
        return <ExclusiveAudio />
      default:
        return null
    }
  }

  if (activeBonus) {
    return (
      <AuthGuard>
        <MobileLayout>
          <div className="container max-w-4xl mx-auto py-6 px-4">
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveBonus(null)}
                className="mr-3 hover:bg-white/80"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-purple-800">
                  {bonuses.find((b) => b.id === activeBonus)?.title}
                </h1>
                <p className="text-gray-600">Ihr exklusiver Bonusinhalt</p>
              </div>
            </div>
            {renderBonusContent(activeBonus)}
          </div>
        </MobileLayout>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <MobileLayout>
        <div className="container max-w-6xl mx-auto py-6 px-4">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-3 hover:bg-white/80">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Ihre Bonusinhalte
              </h1>
              <p className="text-gray-600 mt-1">Exklusive Materialien für Ihren SchlafBalance-Erfolg ✨</p>
            </div>
          </div>

          {/* Premium Badge */}
          <div className="mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-2">
                    <Star className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Premium-Mitglied</h3>
                    <p className="text-sm opacity-90">Sie haben Zugang zu allen exklusiven Bonusinhalten!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bonus Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bonuses.map((bonus) => (
              <Card
                key={bonus.id}
                className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                onClick={() => handleBonusClick(bonus.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full p-3">
                      <bonus.icon className="h-6 w-6 text-white" />
                    </div>
                    {bonus.premium && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                        Premium
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg text-purple-800 group-hover:text-purple-600 transition-colors">
                    {bonus.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">{bonus.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-700">Inhalte:</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {bonus.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {bonus.estimatedTime}
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Öffnen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mt-8">
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold text-purple-800">Maximieren Sie Ihren Erfolg</h3>
                </div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Diese Bonusinhalte wurden speziell entwickelt, um Ihren Erfolg mit SchlafBalance zu verstärken. Nutzen
                  Sie alle verfügbaren Ressourcen für die besten Ergebnisse mit Ihrem Baby.
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mt-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span>Premium-Qualität</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </MobileLayout>
    </AuthGuard>
  )
}
