"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, TrendingUp, BarChart3, Plus, Save, Download, Target, Award } from "lucide-react"
import { useUserData } from "@/hooks/use-user-data"

export function SleepTracker() {
  const { userData } = useUserData()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [bedtime, setBedtime] = useState("")
  const [wakeupTime, setWakeupTime] = useState("")
  const [nightWakeups, setNightWakeups] = useState("")
  const [sleepQuality, setSleepQuality] = useState(3)
  const [notes, setNotes] = useState("")

  // Dados simulados para demonstração
  const sleepData = [
    { date: "2024-01-15", bedtime: "19:30", wakeup: "06:45", quality: 4, wakeups: 2, totalSleep: "11h 15m" },
    { date: "2024-01-14", bedtime: "19:45", wakeup: "07:00", quality: 3, wakeups: 3, totalSleep: "11h 15m" },
    { date: "2024-01-13", bedtime: "20:00", wakeup: "06:30", quality: 5, wakeups: 1, totalSleep: "10h 30m" },
    { date: "2024-01-12", bedtime: "19:30", wakeup: "07:15", quality: 4, wakeups: 2, totalSleep: "11h 45m" },
    { date: "2024-01-11", bedtime: "19:15", wakeup: "06:45", quality: 3, wakeups: 4, totalSleep: "11h 30m" },
  ]

  const averageSleepTime = "11h 15m"
  const averageQuality = 3.8
  const improvementTrend = "+15%"

  const handleSaveEntry = () => {
    // Hier würde normalerweise die Daten gespeichert werden
    alert("Schlafprotokoll gespeichert! ✅")
  }

  const exportData = () => {
    // Simuliere Export
    alert("Schlafprotokoll wird als PDF exportiert... 📊")
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
          <CardContent className="p-4 text-center">
            <Moon className="h-8 w-8 mx-auto mb-2 opacity-80" />
            <div className="text-2xl font-bold">{averageSleepTime}</div>
            <div className="text-sm opacity-90">Ø Schlafzeit</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-80" />
            <div className="text-2xl font-bold">{improvementTrend}</div>
            <div className="text-sm opacity-90">Verbesserung</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 mx-auto mb-2 opacity-80" />
            <div className="text-2xl font-bold">{averageQuality.toFixed(1)}/5</div>
            <div className="text-sm opacity-90">Ø Qualität</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 opacity-80" />
            <div className="text-2xl font-bold">{sleepData.length}</div>
            <div className="text-sm opacity-90">Tage erfasst</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Neuen Eintrag hinzufügen */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Plus className="h-5 w-5" />
              Neuer Schlaf-Eintrag für {userData?.babyName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Datum</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-white/80"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedtime">Zu Bett gegangen</Label>
                <Input
                  id="bedtime"
                  type="time"
                  value={bedtime}
                  onChange={(e) => setBedtime(e.target.value)}
                  className="bg-white/80"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="wakeup">Aufgewacht</Label>
                <Input
                  id="wakeup"
                  type="time"
                  value={wakeupTime}
                  onChange={(e) => setWakeupTime(e.target.value)}
                  className="bg-white/80"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wakeups">Nächtliche Aufwachphasen</Label>
                <Input
                  id="wakeups"
                  type="number"
                  min="0"
                  value={nightWakeups}
                  onChange={(e) => setNightWakeups(e.target.value)}
                  className="bg-white/80"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Schlafqualität (1-5 Sterne)</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSleepQuality(star)}
                    className={`text-2xl transition-colors ${
                      star <= sleepQuality ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ⭐
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">{sleepQuality}/5</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notizen</Label>
              <Textarea
                id="notes"
                placeholder={`Besonderheiten bei ${userData?.babyName}s Schlaf heute...`}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-white/80"
                rows={3}
              />
            </div>

            <Button onClick={handleSaveEntry} className="w-full bg-purple-600 hover:bg-purple-700">
              <Save className="h-4 w-4 mr-2" />
              Eintrag speichern
            </Button>
          </CardContent>
        </Card>

        {/* Verlauf */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <BarChart3 className="h-5 w-5" />
                Schlafverlauf
              </CardTitle>
              <Button variant="outline" size="sm" onClick={exportData} className="border-purple-200">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sleepData.map((entry, index) => (
                <div
                  key={entry.date}
                  className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="text-xs text-gray-500">
                        {new Date(entry.date).toLocaleDateString("de-DE", { weekday: "short" })}
                      </div>
                      <div className="text-sm font-medium">
                        {new Date(entry.date).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Moon className="h-3 w-3 text-purple-600" />
                        <span>{entry.bedtime}</span>
                        <Sun className="h-3 w-3 text-orange-500" />
                        <span>{entry.wakeup}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {entry.wakeups} Aufwachphasen • {entry.totalSleep}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: entry.quality }, (_, i) => (
                        <span key={i} className="text-yellow-400 text-sm">
                          ⭐
                        </span>
                      ))}
                    </div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {entry.quality}/5
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Ihre Schlaf-Insights für {userData?.babyName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h4 className="font-semibold mb-2">🎯 Beste Einschlafzeit</h4>
              <p className="text-sm opacity-90">
                {userData?.babyName} schläft am besten ein, wenn das Ritual um 19:30 Uhr beginnt.
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h4 className="font-semibold mb-2">📈 Verbesserungstrend</h4>
              <p className="text-sm opacity-90">
                Die Schlafqualität hat sich in den letzten 7 Tagen um 15% verbessert!
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h4 className="font-semibold mb-2">💡 Empfehlung</h4>
              <p className="text-sm opacity-90">
                Versuchen Sie, die Routine 15 Minuten früher zu beginnen für noch bessere Ergebnisse.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
