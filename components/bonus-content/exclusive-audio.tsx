"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Waves, Music, Heart, Star, Crown } from "lucide-react"
import { SoundCloudPlayer } from "@/components/soundcloud-player"
import { useUserData } from "@/hooks/use-user-data"

export function ExclusiveAudio() {
  const { userData } = useUserData()
  const [selectedCategory, setSelectedCategory] = useState("premium-lullabies")

  const categories = [
    {
      id: "premium-lullabies",
      name: "Premium Schlaflieder",
      icon: Music,
      description: "Exklusive Kompositionen für perfekten Babyschlaf",
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: "binaural-beats",
      name: "Binaurale Beats",
      icon: Waves,
      description: "Wissenschaftlich entwickelte Frequenzen für Tiefschlaf",
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: "womb-sounds",
      name: "Mutterleib-Simulation",
      icon: Heart,
      description: "Vertraute Geräusche aus den ersten 9 Monaten",
      color: "from-pink-500 to-rose-600",
    },
    {
      id: "meditation",
      name: "Meditation Premium",
      icon: Star,
      description: "Tiefe Entspannung für Eltern und Baby",
      color: "from-yellow-500 to-orange-600",
    },
    {
      id: "nature-hd",
      name: "Natur HD",
      icon: Waves,
      description: "Hochqualitative Naturaufnahmen",
      color: "from-green-500 to-emerald-600",
    },
  ]

  const getCurrentCategory = () => {
    return categories.find((cat) => cat.id === selectedCategory) || categories[0]
  }

  return (
    <div className="space-y-6">
      {/* Premium Header */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 rounded-full p-3">
              <Crown className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Premium Schlafgeräusche</h2>
              <p className="opacity-90">
                Exklusive, hochqualitative Aufnahmen für {userData?.babyName}s perfekten Schlaf
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-yellow-400 text-yellow-900 border-0">
                  <Star className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
                <span className="text-sm opacity-80">Echte SoundCloud-Integration</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={`border-0 shadow-lg cursor-pointer transition-all duration-300 ${
              selectedCategory === category.id ? "shadow-2xl scale-105" : "hover:shadow-xl hover:scale-102"
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <CardContent className="p-4">
              <div className={`bg-gradient-to-r ${category.color} rounded-full p-3 w-fit mb-3`}>
                {React.createElement(category.icon, { className: "h-6 w-6 text-white" })}
              </div>
              <h3
                className={`font-semibold mb-2 ${
                  selectedCategory === category.id ? "text-purple-800" : "text-gray-800"
                }`}
              >
                {category.name}
              </h3>
              <p className="text-sm text-gray-600">{category.description}</p>
              {selectedCategory === category.id && (
                <Badge className="mt-2 bg-purple-100 text-purple-800 border-purple-200">Aktiv</Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SoundCloud Player for Selected Category */}
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className={`bg-gradient-to-r ${getCurrentCategory().color} rounded-full p-2`}>
              {React.createElement(getCurrentCategory().icon, { className: "h-5 w-5 text-white" })}
            </div>
            <div>
              <CardTitle className="text-xl text-purple-800">{getCurrentCategory().name}</CardTitle>
              <p className="text-gray-600 text-sm">{getCurrentCategory().description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Usar o SoundCloudPlayer real baseado na categoria selecionada */}
          {selectedCategory === "premium-lullabies" && <SoundCloudPlayer category="lullabies" />}
          {selectedCategory === "binaural-beats" && <SoundCloudPlayer category="white-noise" />}
          {selectedCategory === "womb-sounds" && <SoundCloudPlayer category="white-noise" />}
          {selectedCategory === "meditation" && <SoundCloudPlayer category="lullabies" />}
          {selectedCategory === "nature-hd" && <SoundCloudPlayer category="white-noise" />}
        </CardContent>
      </Card>

      {/* Premium Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-xl bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Premium-Vorteile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Echte SoundCloud-Integration
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Hochqualitative Audio-Streams
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Professionell kuratierte Playlists
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Endlos-Wiedergabe möglich
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Speziell für {userData?.babyName}s Alter optimiert
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-purple-800">💡 Anwendungstipps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-700">🎵 Für {userData?.babyName}:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Lautstärke moderat halten (30-50%)</li>
                <li>• 15 Min vor Schlafenszeit starten</li>
                <li>• Mit Abendritual kombinieren</li>
                <li>• Verschiedene Kategorien testen</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Message */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 rounded-full p-2">
              <Crown className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800">Premium-Zugang aktiv!</h3>
              <p className="text-sm text-green-700">
                Sie haben Zugang zu allen exklusiven Schlafgeräuschen mit echter SoundCloud-Wiedergabe.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
