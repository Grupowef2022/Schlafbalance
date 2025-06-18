"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Lightbulb, BookOpen, Search, Star, Crown, Baby, Clock, Brain } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useUserData } from "@/hooks/use-user-data"

export function SleepMythsGuide() {
  const { userData } = useUserData()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Alle")

  const sleepMyths = [
    {
      id: 1,
      myth: "Babys müssen durchschlafen, um gesund zu sein",
      truth: "Nächtliches Aufwachen ist völlig normal und gesund für Babys",
      category: "Schlafmuster",
      ageRelevant: "0-12 Monate",
      explanation:
        "Babys haben kürzere Schlafzyklen als Erwachsene (45-60 Minuten vs. 90-120 Minuten). Nächtliches Aufwachen ist ein natürlicher Schutzmechanismus und hilft bei der Gehirnentwicklung. Die meisten Babys schlafen erst zwischen 3-6 Monaten längere Phasen am Stück.",
      tips: [
        "Erwarten Sie nicht, dass Ihr Baby vor 3-4 Monaten durchschläft",
        "Kurze Aufwachphasen sind normal und meist kein Grund zur Sorge",
        "Geben Sie Ihrem Baby Zeit, selbst wieder einzuschlafen",
      ],
      scientificBasis: "Studien zeigen, dass 70% der Babys erst nach 6 Monaten regelmäßig durchschlafen.",
      icon: "🌙",
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: 2,
      myth: "Babys schlafen besser, wenn sie tagsüber müde gemacht werden",
      truth: "Übermüdete Babys schlafen schlechter und haben mehr Probleme beim Einschlafen",
      category: "Schlafhygiene",
      ageRelevant: "0-24 Monate",
      explanation:
        "Übermüdung führt zur Ausschüttung von Stresshormonen wie Cortisol und Adrenalin. Diese Hormone machen es schwerer einzuschlafen und führen zu unruhigerem Schlaf. Babys brauchen regelmäßige Ruhepausen und sollten nicht überstimuliert werden.",
      tips: [
        "Achten Sie auf frühe Müdigkeitszeichen (Gähnen, Augen reiben)",
        "Planen Sie regelmäßige Schlafpausen ein",
        "Vermeiden Sie Überstimulation vor dem Schlafen",
      ],
      scientificBasis: "Cortisol-Level sind bei übermüdeten Babys bis zu 3x höher als normal.",
      icon: "😴",
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: 3,
      myth: "Babys sollten in völliger Stille schlafen",
      truth: "Leichte Hintergrundgeräusche können den Schlaf verbessern",
      category: "Schlafumgebung",
      ageRelevant: "0-6 Monate",
      explanation:
        "Im Mutterleib war es nicht still - Babys sind an konstante Geräusche gewöhnt. Weißes Rauschen oder sanfte Musik können beruhigend wirken und plötzliche Geräusche überdecken, die das Baby aufwecken könnten.",
      tips: [
        "Verwenden Sie weißes Rauschen oder sanfte Musik",
        "Halten Sie die Lautstärke unter 50 Dezibel",
        "Konstante Geräusche sind besser als wechselnde",
      ],
      scientificBasis: "85% der Babys schlafen mit weißem Rauschen besser ein (Studie 2019).",
      icon: "🔊",
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 4,
      myth: "Co-Sleeping ist immer gefährlich",
      truth: "Sicheres Co-Sleeping kann Vorteile haben, wenn richtig durchgeführt",
      category: "Schlafumgebung",
      ageRelevant: "0-12 Monate",
      explanation:
        "Während das Teilen des Bettes Risiken birgt, kann sicheres Co-Sleeping (z.B. Beistellbett) das Stillen erleichtern und die Bindung stärken. Wichtig sind die richtigen Sicherheitsmaßnahmen.",
      tips: [
        "Verwenden Sie ein Beistellbett als sichere Alternative",
        "Achten Sie auf eine feste Matratze ohne Kissen/Decken",
        "Niemals Co-Sleeping bei Alkohol/Drogen/Rauchen",
      ],
      scientificBasis: "WHO empfiehlt Zimmer teilen, aber nicht Bett teilen in den ersten 6 Monaten.",
      icon: "🛏️",
      color: "from-pink-500 to-rose-600",
    },
    {
      id: 5,
      myth: "Babys müssen lernen, alleine zu schlafen",
      truth: "Babys entwickeln Selbstberuhigung natürlich, aber in ihrem eigenen Tempo",
      category: "Schlaftraining",
      ageRelevant: "3-12 Monate",
      explanation:
        "Selbstberuhigung ist eine Fähigkeit, die sich entwickelt, nicht erzwungen werden muss. Jedes Baby ist anders - manche brauchen mehr Unterstützung, andere weniger. Sanfte Methoden sind oft effektiver als strikte Schlaftrainings.",
      tips: [
        "Geben Sie Ihrem Baby Gelegenheit, sich selbst zu beruhigen",
        "Warten Sie kurz, bevor Sie eingreifen",
        "Bleiben Sie konsistent, aber flexibel",
      ],
      scientificBasis: "Sanfte Schlafmethoden zeigen langfristig bessere Ergebnisse als strikte Methoden.",
      icon: "🤱",
      color: "from-yellow-500 to-orange-600",
    },
    {
      id: 6,
      myth: "Stillen in der Nacht schadet dem Schlaf",
      truth: "Nächtliches Stillen ist normal und kann sogar den Schlaf fördern",
      category: "Ernährung",
      ageRelevant: "0-12 Monate",
      explanation:
        "Muttermilch enthält Tryptophan und andere Substanzen, die den Schlaf fördern. Nächtliches Stillen ist evolutionär normal und unterstützt die Milchproduktion. Die meisten Babys reduzieren nächtliche Mahlzeiten natürlich.",
      tips: [
        "Stillen Sie in gedämpftem Licht",
        "Halten Sie die Interaktion minimal",
        "Vertrauen Sie darauf, dass sich nächtliches Stillen reduziert",
      ],
      scientificBasis: "Prolaktin-Level sind nachts 2-3x höher, was nächtliches Stillen natürlich macht.",
      icon: "🍼",
      color: "from-teal-500 to-cyan-600",
    },
    {
      id: 7,
      myth: "Babys brauchen keine Routine",
      truth: "Routinen geben Babys Sicherheit und verbessern den Schlaf",
      category: "Routine",
      ageRelevant: "2-24 Monate",
      explanation:
        "Babys fühlen sich sicher, wenn sie wissen, was als nächstes kommt. Eine vorhersagbare Routine hilft dem Körper, sich auf den Schlaf vorzubereiten und reduziert Stress für Baby und Eltern.",
      tips: [
        "Entwickeln Sie eine einfache, wiederholbare Routine",
        "Beginnen Sie 30-60 Minuten vor der Schlafenszeit",
        "Bleiben Sie flexibel - Routinen können sich anpassen",
      ],
      scientificBasis: "Babys mit festen Routinen schlafen im Durchschnitt 37 Minuten länger.",
      icon: "⏰",
      color: "from-indigo-500 to-purple-600",
    },
    {
      id: 8,
      myth: "Schreien lassen ist die einzige Lösung bei Schlafproblemen",
      truth: "Es gibt viele sanfte Alternativen zum 'Schreien lassen'",
      category: "Schlaftraining",
      ageRelevant: "4-24 Monate",
      explanation:
        "Während kontrolliertes Schreien für manche Familien funktioniert, gibt es viele sanftere Methoden. Wichtig ist, eine Methode zu finden, die zur Familie passt und mit der sich alle wohlfühlen.",
      tips: [
        "Probieren Sie sanfte Methoden wie 'Pick up/Put down'",
        "Reduzieren Sie Hilfen schrittweise",
        "Seien Sie geduldig - Veränderungen brauchen Zeit",
      ],
      scientificBasis: "Sanfte Schlafmethoden sind genauso effektiv wie strikte, mit weniger Stress.",
      icon: "🤗",
      color: "from-red-500 to-pink-600",
    },
  ]

  const categories = [
    { id: "Alle", name: "Alle", icon: "📚", color: "from-gray-500 to-slate-600" },
    { id: "Schlafmuster", name: "Schlafmuster", icon: "🌙", color: "from-blue-500 to-cyan-600" },
    { id: "Schlafhygiene", name: "Schlafhygiene", icon: "😴", color: "from-purple-500 to-indigo-600" },
    { id: "Schlafumgebung", name: "Schlafumgebung", icon: "🏠", color: "from-green-500 to-emerald-600" },
    { id: "Schlaftraining", name: "Schlaftraining", icon: "🎯", color: "from-yellow-500 to-orange-600" },
    { id: "Routine", name: "Routine", icon: "⏰", color: "from-indigo-500 to-purple-600" },
    { id: "Ernährung", name: "Ernährung", icon: "🍼", color: "from-teal-500 to-cyan-600" },
  ]

  const filteredMyths = sleepMyths.filter((myth) => {
    const matchesSearch =
      myth.myth.toLowerCase().includes(searchTerm.toLowerCase()) ||
      myth.truth.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Alle" || myth.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Premium Header */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
              <Brain className="h-10 w-10" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Schlaf-Mythen aufgeklärt</h2>
              <p className="text-white/90 text-lg mb-3">
                Wissenschaftlich fundierte Fakten für {userData?.babyName}s gesunden Schlaf
              </p>
              <div className="flex items-center gap-3">
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium Guide
                </Badge>
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                  <BookOpen className="h-3 w-3 mr-1" />
                  {sleepMyths.length} Mythen
                </Badge>
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                  <Baby className="h-3 w-3 mr-1" />
                  Für {userData?.babyName}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Mythen durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-white/80 border-2 border-gray-200 focus:border-purple-400 rounded-xl text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700">Kategorien:</h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`rounded-xl transition-all duration-300 ${
                      selectedCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white border-0 shadow-lg scale-105`
                        : "border-gray-200 hover:bg-gray-50 hover:border-purple-200"
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Counter */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-purple-600" />
              <span className="font-semibold text-purple-800">
                {filteredMyths.length} {filteredMyths.length === 1 ? "Mythos" : "Mythen"} gefunden
              </span>
            </div>
            {selectedCategory !== "Alle" && (
              <Badge className="bg-purple-100 text-purple-800 border-purple-200">Kategorie: {selectedCategory}</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Myths List */}
      <div className="space-y-6">
        {filteredMyths.map((myth) => (
          <Card key={myth.id} className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
            {/* Myth Header */}
            <div className={`bg-gradient-to-r ${myth.color} p-6 text-white`}>
              <div className="flex items-start gap-4">
                <div className="text-4xl">{myth.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">{myth.category}</Badge>
                    <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                      <Clock className="h-3 w-3 mr-1" />
                      {myth.ageRelevant}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Mythos #{myth.id}</h3>
                  <p className="text-white/90 text-lg">{myth.myth}</p>
                </div>
              </div>
            </div>

            <CardContent className="p-6 space-y-6">
              {/* Truth Section */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-green-800 mb-2 flex items-center gap-2">✅ Die Wahrheit</h4>
                    <p className="text-green-700 text-lg font-medium leading-relaxed">{myth.truth}</p>
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
                <h4 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Wissenschaftliche Erklärung für {userData?.babyName}
                </h4>
                <p className="text-blue-700 leading-relaxed">{myth.explanation}</p>
              </div>

              {/* Tips and Scientific Basis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                  <h4 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />💡 Praktische Tipps
                  </h4>
                  <ul className="space-y-3">
                    {myth.tips.map((tip, index) => (
                      <li key={index} className="text-purple-700 flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200">
                  <h4 className="text-lg font-bold text-orange-800 mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5" />🔬 Wissenschaftliche Basis
                  </h4>
                  <p className="text-orange-700 leading-relaxed font-medium">{myth.scientificBasis}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredMyths.length === 0 && (
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl">
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Keine Mythen gefunden</h3>
            <p className="text-gray-500 text-lg mb-6 max-w-md mx-auto">
              Versuchen Sie andere Suchbegriffe oder wählen Sie eine andere Kategorie.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("Alle")
              }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl"
            >
              Filter zurücksetzen
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Summary Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl">
        <CardHeader>
          <CardTitle className="text-2xl text-purple-800 flex items-center gap-3">
            <Star className="h-6 w-6 text-yellow-500" />📚 Zusammenfassung für {userData?.babyName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/80 rounded-2xl p-6 border border-purple-200">
              <h4 className="text-lg font-bold text-purple-700 mb-4 flex items-center gap-2">
                🎯 Wichtigste Erkenntnisse:
              </h4>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <span>Jedes Baby ist einzigartig und entwickelt sich in seinem eigenen Tempo</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <span>Nächtliches Aufwachen ist normal und gesund</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <span>Routinen geben Sicherheit und verbessern den Schlaf</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <span>Sanfte Methoden sind oft effektiver als strikte Ansätze</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/80 rounded-2xl p-6 border border-purple-200">
              <h4 className="text-lg font-bold text-purple-700 mb-4 flex items-center gap-2">💪 Für Ihren Erfolg:</h4>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span>Vertrauen Sie Ihrem Instinkt als Eltern</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span>Seien Sie geduldig - Veränderungen brauchen Zeit</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span>Holen Sie sich Unterstützung, wenn Sie sie brauchen</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span>Feiern Sie kleine Fortschritte</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white text-center">
            <h4 className="text-xl font-bold mb-2">🌟 Wissen ist Macht!</h4>
            <p className="text-white/90 mb-4">
              Mit diesem Wissen können Sie {userData?.babyName} noch besser beim Schlafen helfen.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Baby className="h-4 w-4" />
                <span>Für {userData?.babyName} optimiert</span>
              </div>
              <div className="flex items-center gap-1">
                <Brain className="h-4 w-4" />
                <span>Wissenschaftlich fundiert</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
