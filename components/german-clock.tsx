"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin } from "lucide-react"

export function GermanClock() {
  const [time, setTime] = useState<Date>(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("de-DE", {
      timeZone: "Europe/Berlin",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("de-DE", {
      timeZone: "Europe/Berlin",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getTimeOfDay = () => {
    const hour = new Date().toLocaleString("de-DE", {
      timeZone: "Europe/Berlin",
      hour: "numeric",
      hour12: false,
    })
    const currentHour = Number.parseInt(hour)

    if (currentHour >= 5 && currentHour < 12)
      return { period: "Morgen", emoji: "🌅", color: "from-orange-400 to-yellow-400" }
    if (currentHour >= 12 && currentHour < 17)
      return { period: "Mittag", emoji: "☀️", color: "from-blue-400 to-cyan-400" }
    if (currentHour >= 17 && currentHour < 21)
      return { period: "Abend", emoji: "🌆", color: "from-purple-400 to-pink-400" }
    return { period: "Nacht", emoji: "🌙", color: "from-indigo-500 to-purple-600" }
  }

  const timeOfDay = getTimeOfDay()

  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <div className={`bg-gradient-to-r ${timeOfDay.color} p-4 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium">Deutschland</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="text-xs">Berlin</span>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-2xl md:text-3xl font-bold font-mono tracking-wider">{formatTime(time)}</div>
            <div className="text-sm opacity-90 mt-1">{formatDate(time)}</div>
          </div>

          <div className="flex items-center gap-2 mt-3 text-sm">
            <span className="text-lg">{timeOfDay.emoji}</span>
            <span className="font-medium">{timeOfDay.period}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
