"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  Heart,
  Baby,
  Clock,
  CheckCircle,
  Download,
  Play,
  Pause,
  Crown,
  Star,
  Shield,
  Thermometer,
  Moon,
  Volume2,
  Headphones,
} from "lucide-react"
import { useUserData } from "@/hooks/use-user-data"

export function EmergencyCryingPlan() {
  const { userData } = useUserData()
  const [activeModule, setActiveModule] = useState(1)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [isPlayingWhiteNoise, setIsPlayingWhiteNoise] = useState(false)

  const modules = [
    {
      id: 1,
      title: "Schnelle Ursachen-Check",
      subtitle: "Warum schreit mein Baby?",
      icon: AlertTriangle,
      color: "from-red-500 to-pink-600",
    },
    {
      id: 2,
      title: "Körperliche Ursachen",
      subtitle: "Was jetzt am besten hilft",
      icon: Thermometer,
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: 3,
      title: "Sofort Beruhigen",
      subtitle: "Deine Notfall-Techniken",
      icon: Shield,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 4,
      title: "Die Nacht danach",
      subtitle: "Rückfall vermeiden",
      icon: Moon,
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: 5,
      title: "Emotionaler Support",
      subtitle: "Für DICH, liebe Mama",
      icon: Heart,
      color: "from-pink-500 to-rose-600",
    },
  ]

  const handleCheckItem = (itemId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }

  const toggleWhiteNoise = () => {
    setIsPlayingWhiteNoise(!isPlayingWhiteNoise)
  }

  const renderModule1 = () => {
    const reasons = [
      {
        id: "hunger",
        title: "🍼 Hunger?",
        description:
          "Auch wenn du denkst: Kann nicht sein, hat doch gerade gegessen - Babys wachsen, haben Schübe und plötzlich mehr Hunger.",
      },
      {
        id: "bauchweh",
        title: "🤱 Bauchweh / Koliken?",
        description: "Typisch: Beine anziehen, harter Bauch, unruhiges Strampeln.",
      },
      {
        id: "zahnen",
        title: "🦷 Zahnen?",
        description: "Viel Sabbern? Rote Wangen? Baby steckt alles in den Mund? Könnte sein...",
      },
      {
        id: "uebermudung",
        title: "😴 Übermüdung / Reizüberflutung?",
        description:
          "Zu viele Eindrücke, zu viel Licht, zu viel Lärm? Wenn dein Baby völlig drüber ist - schreit es, weil es nicht abschalten kann.",
      },
      {
        id: "naehe",
        title: "🤗 Entwicklungssprung / Nähe-Bedürfnis?",
        description: "Babys brauchen in bestimmten Phasen plötzlich viel mehr Körperkontakt.",
      },
    ]

    const symptoms = [
      ["Harte Bauchdecke", "Koliken / Blähungen"],
      ["Rotes Gesicht", "Frust / Anstrengung"],
      ["Viel Sabbern / Finger im Mund", "Zahnen"],
      ["Reiben an den Ohren", "Ohrenschmerzen"],
      ["Häufiges Gähnen / Augenreiben", "Übermüdung"],
    ]

    const questions = ["Füttern?", "Wickeln?", "Schlaf?", "Neue Umgebung?"]

    return (
      <div className="space-y-6">
        {/* Intro */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 rounded-full p-3">
                <Baby className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-800 mb-2">Liebe {userData?.parentName},</h3>
                <p className="text-red-700 leading-relaxed mb-4">
                  bevor du irgendetwas machst… <strong>atme tief durch</strong>.
                </p>
                <p className="text-red-700 leading-relaxed">
                  Jetzt schauen wir gemeinsam: Warum schreit {userData?.babyName} gerade wirklich?
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5 häufigste Gründe */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl">
          <CardHeader>
            <CardTitle className="text-2xl text-red-800 flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Die 5 häufigsten Gründe für akutes Schreien:
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reasons.map((reason) => (
              <div
                key={reason.id}
                className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 border border-gray-200"
              >
                <div className="flex items-start gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCheckItem(reason.id)}
                    className={`mt-1 ${checkedItems[reason.id] ? "text-green-600" : "text-gray-400"}`}
                  >
                    <CheckCircle className="h-5 w-5" />
                  </Button>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">{reason.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Symptom Table */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl">
          <CardHeader>
            <CardTitle className="text-2xl text-red-800 flex items-center gap-3">
              <Thermometer className="h-6 w-6 text-blue-600" />
              Körperliche Signale richtig deuten:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-bold text-gray-700">Symptom</th>
                    <th className="text-left py-3 px-4 font-bold text-gray-700">Mögliche Ursache</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {symptoms.map(([symptom, cause], index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">{symptom}</td>
                      <td className="py-3 px-4 text-gray-600">{cause}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Mini-Schnelltest */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-800 flex items-center gap-3">
              <Clock className="h-6 w-6 text-orange-600" />
              Mini-Schnelltest:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-orange-800 mb-4">👉 Was war die letzten 2 Stunden?</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {questions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-16 text-center border-orange-200 hover:bg-orange-100 hover:border-orange-300"
                  onClick={() => handleCheckItem(`test-${index}`)}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{checkedItems[`test-${index}`] ? "✅" : "❓"}</div>
                    <div className="text-sm font-medium">{question}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderModule2 = () => {
    const sections = [
      {
        title: "🤱 2.1 Koliken / Blähungen",
        tips: [
          "Fliegergriff (Baby bäuchlings auf deinen Unterarm legen)",
          "Sanfte Bauchmassage (Uhrzeigersinn, mit warmen Händen)",
          "Kirschkernkissen leicht erwärmen und auf den Bauch legen",
          "Fahrradbewegungen mit den Beinchen",
        ],
        prefix: "kolik",
      },
      {
        title: "🦷 2.2 Zahnen",
        tips: [
          "Gekühlter Beißring (aber nicht zu kalt!)",
          "Zahnfleisch sanft mit Finger massieren",
          "Kalter Waschlappen zum Draufbeißen",
          "Viel Nähe und Trost – der Schmerz stresst sie sehr",
        ],
        prefix: "zahnen",
      },
      {
        title: "🤗 2.3 Entwicklungssprünge",
        tips: [
          "Kuschelmodus an!",
          "Viel Körperkontakt (Tragetuch, Haut-an-Haut)",
          "Gedämpftes Licht, ruhige Umgebung",
          "Extra viel Geduld – diese Phase geht vorbei ❤️",
        ],
        prefix: "entwicklung",
      },
      {
        title: "😴 2.4 Reizüberflutung",
        tips: [
          "Licht dimmen",
          "Fernseher / Radio / Handy aus",
          "Baby in eine Decke einwickeln (Reizschutz)",
          "Leises Summen oder White Noise abspielen",
        ],
        prefix: "reiz",
      },
      {
        title: "💕 2.5 Trennungsangst / Nähe-Bedürfnis",
        tips: [
          "Tragen oder Körperkontakt geben",
          "Beruhigend sprechen",
          "Ich bin hier. Du bist sicher. – Immer wieder leise sagen",
          "Notfalls gemeinsam einschlafen (Co-Sleeping für die Nacht ok)",
        ],
        prefix: "trennung",
      },
    ]

    return (
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl text-blue-800 flex items-center gap-3">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {section.tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCheckItem(`${section.prefix}-${index}`)}
                    className={checkedItems[`${section.prefix}-${index}`] ? "text-green-600" : "text-gray-400"}
                  >
                    <CheckCircle className="h-5 w-5" />
                  </Button>
                  <span className="text-blue-700">{tip}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const renderModule3 = () => {
    const steps = [
      {
        step: "1",
        title: "Position wechseln:",
        description: "Nimm dein Baby in eine neue Haltung – z.B. Bauch an Brust.",
        color: "bg-green-100 text-green-800",
      },
      {
        step: "2",
        title: "Rhythmischer Reiz:",
        description: "Leichtes Wiegen, Summen oder Singen mit tiefem Ton.",
        color: "bg-blue-100 text-blue-800",
      },
      {
        step: "3",
        title: "Konstanter Druck:",
        description: "Leichtes Halten, sanft am ganzen Körper, gibt Sicherheit.",
        color: "bg-purple-100 text-purple-800",
      },
    ]

    return (
      <div className="space-y-6">
        {/* Intro */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
          <CardContent className="p-6">
            <p className="text-green-800 text-lg font-medium text-center">
              Wenn nichts mehr geht… dann hilft jetzt das:
            </p>
          </CardContent>
        </Card>

        {/* 3-Schritte-Methode */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl">
          <CardHeader>
            <CardTitle className="text-2xl text-green-800 flex items-center gap-3">
              <Shield className="h-6 w-6 text-green-600" />
              Die 3-Schritte-Sofort-Ruhe-Methode:
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {steps.map((step) => (
              <div
                key={step.step}
                className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${step.color}`}
                >
                  {step.step}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">{step.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* White Noise Technik */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl text-green-800 flex items-center gap-3">
              <Volume2 className="h-6 w-6 text-green-600" />
              Die White Noise Technik
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">👉 Starte sofort Geräusche wie: Fön, Staubsauger, Meeresrauschen.</p>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Headphones className="h-6 w-6 text-green-600" />
                  <span className="font-medium text-green-800">SOS White Noise Player</span>
                </div>
                <Button
                  onClick={toggleWhiteNoise}
                  className={`${
                    isPlayingWhiteNoise ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                  } text-white`}
                >
                  {isPlayingWhiteNoise ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start
                    </>
                  )}
                </Button>
              </div>
              {isPlayingWhiteNoise && (
                <div className="mt-3 text-sm text-green-700">
                  🎵 White Noise läuft... Beruhigende Geräusche für {userData?.babyName}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderModule4 = () => {
    const preventionTips = [
      "Ruhige Einschlafroutine am nächsten Abend",
      "Reizarmut vor dem Schlafen: Kein grelles Licht, keine wilden Spiele",
      "Gleiche Schlafenszeit beibehalten",
      "Baby tagsüber viel Körperkontakt geben",
      "Frühzeitige Anzeichen für neue Krisen erkennen (Unruhe, viel Weinen am Tag, Appetitverlust)",
    ]

    return (
      <div className="space-y-6">
        {/* Intro */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl">
          <CardContent className="p-6">
            <p className="text-purple-800 text-lg font-bold text-center">Die erste Regel: Kein Stress mehr aufbauen!</p>
          </CardContent>
        </Card>

        {/* Präventions-Checkliste */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-800 flex items-center gap-3">
              <Moon className="h-6 w-6 text-purple-600" />
              Rückfall-Prävention Checkliste:
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {preventionTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCheckItem(`prevention-${index}`)}
                  className={checkedItems[`prevention-${index}`] ? "text-green-600" : "text-gray-400"}
                >
                  <CheckCircle className="h-5 w-5" />
                </Button>
                <span className="text-purple-700 leading-relaxed">{tip}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderModule5 = () => {
    const affirmations = ["Ich bin stark.", "Ich finde Lösungen.", `${userData?.babyName} fühlt meine Liebe.`]

    return (
      <div className="space-y-6">
        {/* Emotionale Unterstützung */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-3xl">
          <CardContent className="p-8 text-center">
            <Heart className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Liebe {userData?.parentName}…</h2>
            <div className="space-y-3 text-lg">
              <p>Du bist NICHT allein.</p>
              <p>Du machst es richtig.</p>
              <p>Du bist die beste Mama für {userData?.babyName}.</p>
            </div>
          </CardContent>
        </Card>

        {/* Positive Affirmationen */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl text-pink-800 flex items-center gap-3">✨ Positive Affirmationen:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {affirmations.map((affirmation, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border border-pink-200"
                >
                  <Star className="h-8 w-8 text-pink-500 mx-auto mb-3" />
                  <p className="font-bold text-pink-800 text-lg">{affirmation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bonus Download */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl text-green-800 flex items-center gap-3">
              <Download className="h-6 w-6 text-green-600" />
              Bonus Download:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <h4 className="font-bold text-green-800 mb-2">PDF Krisen-Checklisten für den Kühlschrank</h4>
              <p className="text-green-600 mb-4">(Schnell ausdruckbar)</p>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                <Download className="h-4 w-4 mr-2" />
                PDF herunterladen
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderActiveModule = () => {
    switch (activeModule) {
      case 1:
        return renderModule1()
      case 2:
        return renderModule2()
      case 3:
        return renderModule3()
      case 4:
        return renderModule4()
      case 5:
        return renderModule5()
      default:
        return renderModule1()
    }
  }

  const completedModules = Object.keys(checkedItems).filter((key) => checkedItems[key]).length
  const totalItems = 25
  const progress = (completedModules / totalItems) * 100

  return (
    <div className="space-y-6">
      {/* Premium Header */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-3xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
              <AlertTriangle className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Notfallplan gegen Schreikrisen</h1>
              <p className="text-white/90 text-lg mb-3">
                Sofortige Hilfe für {userData?.babyName} und dich, liebe {userData?.parentName}
              </p>
              <div className="flex items-center gap-3">
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium Notfallplan
                </Badge>
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                  <Baby className="h-3 w-3 mr-1" />
                  Für {userData?.babyName}
                </Badge>
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                  <Shield className="h-3 w-3 mr-1" />
                  SOS-Hilfe
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700">Fortschritt:</span>
            <span className="text-sm text-gray-500">
              {completedModules} von {totalItems} Schritten
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Module Navigation */}
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {modules.map((module) => {
              const ModuleIcon = module.icon
              return (
                <Button
                  key={module.id}
                  variant={activeModule === module.id ? "default" : "outline"}
                  onClick={() => setActiveModule(module.id)}
                  className={`h-auto p-4 flex flex-col items-center gap-2 transition-all duration-300 ${
                    activeModule === module.id
                      ? `bg-gradient-to-r ${module.color} text-white border-0 shadow-lg scale-105`
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <ModuleIcon className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-bold text-sm">{module.title}</div>
                    <div className="text-xs opacity-80">{module.subtitle}</div>
                  </div>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Active Module Content */}
      <div className="min-h-[600px]">{renderActiveModule()}</div>

      {/* Navigation */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setActiveModule(Math.max(1, activeModule - 1))}
              disabled={activeModule === 1}
              className="border-gray-300"
            >
              ← Vorheriges Modul
            </Button>
            <div className="text-center">
              <div className="font-bold text-gray-700">Modul {activeModule} von 5</div>
              <div className="text-sm text-gray-500">{modules[activeModule - 1]?.title}</div>
            </div>
            <Button
              variant="outline"
              onClick={() => setActiveModule(Math.min(5, activeModule + 1))}
              disabled={activeModule === 5}
              className="border-gray-300"
            >
              Nächstes Modul →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
