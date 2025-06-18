"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Waves, ArrowLeft, Star, Volume2, Clock } from "lucide-react"
import { SoundCloudPlayer } from "@/components/soundcloud-player"
import { useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { MobileLayout } from "@/components/mobile-layout"
import { useUserData } from "@/hooks/use-user-data"

export default function AudioPage() {
  const router = useRouter()
  const { userData } = useUserData()
  const [selectedCategory, setSelectedCategory] = useState("lullabies")

  const categories = [
    {
      id: "lullabies",
      name: "Schlaflieder",
      icon: Music,
      description: "Sanfte Melodien für einen ruhigen Schlaf",
      color: "from-purple-500 to-indigo-600",
      tracks: "8 Tracks",
    },
    {
      id: "white-noise",
      name: "Weißes Rauschen",
      icon: Waves,
      description: "Beruhigende Hintergrundgeräusche",
      color: "from-blue-500 to-cyan-600",
      tracks: "10 Tracks",
    },
  ]

  const getCurrentCategory = () => {
    return categories.find((cat) => cat.id === selectedCategory) || categories[0]
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
                Schlafmusik
              </h1>
              <p className="text-gray-600 mt-1">Beruhigende Klänge für {userData?.babyName}s besseren Schlaf ✨</p>
            </div>
          </div>

          {/* Music Header Card */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 rounded-full p-3">
                  <Music className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Schlafmusik für {userData?.babyName}</h2>
                  <p className="opacity-90">Professionell kuratierte Playlists für perfekte Schlafrituale</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-white/20 text-white border-0">
                      <Volume2 className="h-3 w-3 mr-1" />
                      SoundCloud Integration
                    </Badge>
                    <span className="text-sm opacity-80">Hochqualitative Streams</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className={`border-0 shadow-lg cursor-pointer transition-all duration-300 ${
                  selectedCategory === category.id ? "shadow-2xl scale-105" : "hover:shadow-xl hover:scale-102"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-6">
                  <div className={`bg-gradient-to-r ${category.color} rounded-full p-4 w-fit mb-4`}>
                    {React.createElement(category.icon, { className: "h-8 w-8 text-white" })}
                  </div>
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      selectedCategory === category.id ? "text-purple-800" : "text-gray-800"
                    }`}
                  >
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-sm">
                      {category.tracks}
                    </Badge>
                    {selectedCategory === category.id && (
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                        <Star className="h-3 w-3 mr-1" />
                        Aktiv
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* SoundCloud Player for Selected Category */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`bg-gradient-to-r ${getCurrentCategory().color} rounded-full p-3`}>
                  {React.createElement(getCurrentCategory().icon, { className: "h-6 w-6 text-white" })}
                </div>
                <div>
                  <CardTitle className="text-2xl text-purple-800">{getCurrentCategory().name}</CardTitle>
                  <p className="text-gray-600">{getCurrentCategory().description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <SoundCloudPlayer category={selectedCategory as "lullabies" | "white-noise"} />
            </CardContent>
          </Card>

          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-800 flex items-center gap-2">
                  <Music className="h-5 w-5 text-purple-600" />
                  Musik-Vorteile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Beruhigt {userData?.babyName} natürlich
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Fördert tieferen Schlaf
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Reduziert Einschlafzeit
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Wissenschaftlich bewährt
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Stärkt die Eltern-Kind-Bindung
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="text-purple-800 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  Anwendungstipps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-700">🎵 Für {userData?.babyName}:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Lautstärke sanft halten (30-50%)</li>
                    <li>• 15 Min vor Schlafenszeit starten</li>
                    <li>• Mit Abendritual kombinieren</li>
                    <li>• Konsistenz ist der Schlüssel</li>
                    <li>• Verschiedene Stile ausprobieren</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Success Message */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 rounded-full p-3">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800">Perfekt für {userData?.babyName}!</h3>
                  <p className="text-green-700">
                    Diese Schlafmusik wurde speziell für Babys im Alter von {userData?.ageValue}{" "}
                    {userData?.ageUnit === "wochen" ? "Wochen" : "Monaten"} kuratiert. Nutzen Sie sie täglich für die
                    besten Ergebnisse.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </MobileLayout>
    </AuthGuard>
  )
}
