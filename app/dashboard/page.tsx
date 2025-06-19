"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Bath,
  Heart,
  BookOpen,
  Moon,
  Music,
  Waves,
  Star,
  Clock,
  Award,
  Target,
  TrendingUp,
  Crown,
  Brain,
} from "lucide-react"
import { useUserData } from "@/hooks/use-user-data"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"

export default function Dashboard() {
  const { userData, isLoading } = useUserData()
  const [completedTasks, setCompletedTasks] = useState(1)
  const totalTasks = 6

  const routineTasks = [
    {
      id: 1,
      title: "Bad",
      icon: Bath,
      href: "/routine",
      completed: true,
      color: "from-blue-500 to-cyan-600",
      description: "Entspannendes Bad",
    },
    {
      id: 2,
      title: "Massage",
      icon: Heart,
      href: "/routine",
      completed: false,
      color: "from-pink-500 to-rose-600",
      description: "Sanfte Massage",
    },
    {
      id: 3,
      title: "Vorlesen",
      icon: BookOpen,
      href: "/routine",
      completed: false,
      color: "from-yellow-500 to-orange-600",
      description: "Geschichte vorlesen",
    },
    {
      id: 4,
      title: "Beruhigen",
      icon: Moon,
      href: "/routine",
      completed: false,
      color: "from-purple-500 to-indigo-600",
      description: "Zimmer vorbereiten",
    },
    {
      id: 5,
      title: "Schlaflieder",
      icon: Music,
      href: "/audio",
      completed: false,
      color: "from-green-500 to-emerald-600",
      description: "Beruhigende Musik",
    },
    {
      id: 6,
      title: "Weißes Rauschen",
      icon: Waves,
      href: "/audio",
      completed: false,
      color: "from-indigo-500 to-purple-600",
      description: "Entspannende Geräusche",
    },
  ]

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse mb-6">
              <div className="w-20 h-20 bg-purple-300 rounded-full mx-auto mb-4"></div>
            </div>
            <p className="text-purple-600 font-medium font-rounded">Lade deinen Schlafplan...</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  const progressPercentage = (completedTasks / totalTasks) * 100

  return (
    <AuthGuard>
      <div className="px-4 pt-6 pb-6">
        {/* Welcome Header */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-3">
                <Crown className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-rounded mb-1">Hallo, {userData?.parentName || "Julia"}! 👋</h2>
                <p className="text-white/90 font-rounded text-lg">Schlafplan für {userData?.babyName || "Noah"}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-white/20 text-white border-0">
                    <Clock className="h-3 w-3 mr-1" />
                    Tag {userData?.currentDay || 1}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-0">
                    <Target className="h-3 w-3 mr-1" />
                    {userData?.totalDays || 14} Tage Programm
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-2xl">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 mx-auto mb-2 opacity-90" />
              <div className="text-2xl font-bold font-rounded">{userData?.stars || 0}</div>
              <div className="text-sm opacity-90 font-rounded">Sterne</div>
              <div className="text-xs opacity-75 mt-1">+3 heute möglich</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl">
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 mx-auto mb-2 opacity-90" />
              <div className="text-2xl font-bold font-rounded">{userData?.streakDays || 0}</div>
              <div className="text-sm opacity-90 font-rounded">Tage Streak</div>
              <div className="text-xs opacity-75 mt-1">Rekord: {userData?.streakDays || 0}</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-90" />
              <div className="text-2xl font-bold font-rounded">{Math.round(progressPercentage)}%</div>
              <div className="text-sm opacity-90 font-rounded">Heute</div>
              <div className="text-xs opacity-75 mt-1">
                {completedTasks}/{totalTasks} erledigt
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Premium Content Access */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full p-3">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-purple-800 mb-1">Schlaf-Mythen aufgeklärt</h3>
                <p className="text-purple-600 text-sm">
                  Wissenschaftlich fundierte Fakten für {userData?.babyName}s gesunden Schlaf
                </p>
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 mt-2">
                  Premium Content
                </Badge>
              </div>
              <Button
                asChild
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg"
              >
                <Link href="/sleep-myths">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Öffnen
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Progress Card */}
        <Card className="mx-auto mb-6 bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 pb-4">
            <CardTitle className="text-2xl font-bold text-slate-700 text-center font-rounded">
              Heutiger Fortschritt für {userData?.babyName}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Progress Circle */}
            <div className="relative mb-6">
              <div className="w-32 h-32 mx-auto relative">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" stroke="#e5e7eb" strokeWidth="8" fill="none" className="opacity-30" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - progressPercentage / 100)}`}
                    className="transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🌙</div>
                    <div className="text-2xl font-bold text-purple-600">{Math.round(progressPercentage)}%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="text-xl font-bold text-slate-600 mb-2 font-rounded">
                {completedTasks}/{totalTasks} Aufgaben erledigt
              </p>
              <p className="text-gray-500 font-rounded">Routine-Fortschritt für heute</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <Progress value={progressPercentage} className="h-3 rounded-full" />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Start</span>
                <span>{Math.round(progressPercentage)}%</span>
                <span>Ziel</span>
              </div>
            </div>

            <Button
              asChild
              className="w-full h-14 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl shadow-xl border-0 font-rounded"
            >
              <Link href="/routine">🌙 Abendritual starten</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Task Grid */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-700 font-rounded text-center">
              Heutige Aufgaben für {userData?.babyName || "Noah"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {routineTasks.map((task) => (
                <Link key={task.id} href={task.href}>
                  <div className="group relative overflow-hidden bg-white rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 min-h-[120px] flex flex-col justify-center">
                    <div
                      className={`w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center bg-gradient-to-r ${
                        task.completed ? "from-green-500 to-emerald-600" : task.color
                      } shadow-lg`}
                    >
                      <task.icon className="h-7 w-7 text-white" />
                    </div>
                    <p className="font-bold text-slate-700 leading-tight font-rounded text-sm mb-1">{task.title}</p>
                    <p className="text-xs text-gray-500 font-rounded">{task.description}</p>
                    {task.completed && (
                      <Badge className="absolute top-2 right-2 bg-green-100 text-green-800 border-green-200 text-xs">
                        ✓
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Motivational Message */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-xl font-bold text-purple-800 mb-2 font-rounded">Du machst das großartig!</h3>
            <p className="text-purple-700 font-rounded leading-relaxed">
              Jeder kleine Schritt bringt {userData?.babyName || "dein Baby"} zu besserem Schlaf. Bleib dran und
              vertraue dem Prozess! 💜
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-purple-600">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current" />
                <span>Konsistenz ist der Schlüssel</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  )
}
