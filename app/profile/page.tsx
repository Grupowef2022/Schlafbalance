"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, Award, Calendar, Baby, Edit3, Save, User, Crown, TrendingUp, Clock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MobileLayout } from "@/components/mobile-layout"
import { useRouter } from "next/navigation"
import { useUserData } from "@/hooks/use-user-data"
import { AuthGuard } from "@/components/auth-guard"

export default function ProfilePage() {
  const router = useRouter()
  const { userData, updateUserData, isLoading } = useUserData()
  const [parentName, setParentName] = useState("")
  const [babyName, setBabyName] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (userData) {
      setParentName(userData.parentName)
      setBabyName(userData.babyName)
    }
  }, [userData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    setTimeout(() => {
      updateUserData({ parentName, babyName })
      setIsUpdating(false)
      setIsSuccess(true)
      setIsEditing(false)
      setTimeout(() => setIsSuccess(false), 3000)
    }, 1500)
  }

  if (isLoading) {
    return (
      <AuthGuard>
        <MobileLayout>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-pulse mb-6">
                <div className="w-20 h-20 bg-purple-300 rounded-full mx-auto mb-4"></div>
              </div>
              <p className="text-purple-600 font-medium font-rounded">Lade Profildaten...</p>
            </div>
          </div>
        </MobileLayout>
      </AuthGuard>
    )
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
                Dein Profil
              </h1>
              <p className="text-gray-600 mt-1">Verwalte deine Informationen und verfolge deinen Fortschritt ✨</p>
            </div>
          </div>

          {isSuccess && (
            <Alert className="mb-6 border-0 bg-gradient-to-r from-green-50 to-emerald-50 shadow-xl rounded-3xl">
              <AlertDescription className="text-green-700 font-rounded flex items-center gap-2">
                <Star className="h-5 w-5 text-green-600" />
                Deine Profilinformationen wurden erfolgreich aktualisiert! ✨
              </AlertDescription>
            </Alert>
          )}

          {/* Profile Header Card */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl mb-6">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="relative mb-6">
                  <Avatar className="h-24 w-24 mx-auto border-4 border-white/30 shadow-2xl">
                    <AvatarFallback className="bg-white/20 text-white text-3xl font-bold backdrop-blur-sm">
                      {parentName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg">
                    <Crown className="h-4 w-4 text-yellow-800" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold font-rounded mb-2">{parentName}</h2>
                <p className="text-white/90 font-rounded mb-4">Mutter/Vater von {babyName}</p>

                <div className="flex items-center justify-center gap-2 mb-6">
                  <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                    <Baby className="h-3 w-3 mr-1" />
                    {userData?.ageValue} {userData?.ageUnit === "wochen" ? "Wochen" : "Monate"}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    Seit{" "}
                    {new Date(userData?.registrationDate || "").toLocaleDateString("de-DE", {
                      month: "short",
                      year: "numeric",
                    })}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <Star className="h-6 w-6 mx-auto mb-2 text-yellow-300" />
                    <p className="text-2xl font-bold">{userData?.stars}</p>
                    <p className="text-sm text-white/80">Sterne</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <Award className="h-6 w-6 mx-auto mb-2 text-green-300" />
                    <p className="text-2xl font-bold">{userData?.streakDays}</p>
                    <p className="text-sm text-white/80">Tage Streak</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <TrendingUp className="h-6 w-6 mx-auto mb-2 text-blue-300" />
                    <p className="text-2xl font-bold">{userData?.currentDay}</p>
                    <p className="text-sm text-white/80">Tag</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 rounded-full p-3">
                    <Star className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{userData?.stars} Sterne</h3>
                    <p className="text-white/90">Gesammelt durch Routinen</p>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                      <span className="text-sm text-white/80">Heute: +3 Sterne möglich</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 rounded-full p-3">
                    <Award className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{userData?.streakDays} Tage</h3>
                    <p className="text-white/90">Erfolgreiche Streak</p>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                      <span className="text-sm text-white/80">Rekord: {userData?.streakDays} Tage</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Edit Profile Card */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full p-2">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-700 font-rounded">Profil bearbeiten</CardTitle>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-purple-200 hover:bg-purple-50 rounded-xl"
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Speichern
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Bearbeiten
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="parent-name" className="font-rounded text-gray-700 font-medium">
                      Dein Name
                    </Label>
                    <Input
                      id="parent-name"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      disabled={!isEditing}
                      className="h-12 rounded-xl bg-white/80 border-2 border-gray-200 focus:border-purple-400"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="baby-name" className="font-rounded text-gray-700 font-medium">
                      Name des Babys
                    </Label>
                    <Input
                      id="baby-name"
                      value={babyName}
                      onChange={(e) => setBabyName(e.target.value)}
                      disabled={!isEditing}
                      className="h-12 rounded-xl bg-white/80 border-2 border-gray-200 focus:border-purple-400"
                    />
                  </div>
                </div>

                {/* Baby Info Display */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                    <Baby className="h-4 w-4" />
                    Informationen über {babyName}
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Alter:</span>
                      <span className="ml-2 font-medium">
                        {userData?.ageValue} {userData?.ageUnit === "wochen" ? "Wochen" : "Monate"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Programm-Tag:</span>
                      <span className="ml-2 font-medium">
                        {userData?.currentDay} von {userData?.totalDays}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>

              {isEditing && (
                <CardContent>
                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-2xl font-rounded text-lg shadow-lg"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Wird aktualisiert...
                      </div>
                    ) : (
                      <>
                        <Save className="h-5 w-5 mr-2" />
                        Änderungen speichern
                      </>
                    )}
                  </Button>
                </CardContent>
              )}
            </form>
          </Card>

          {/* Progress Overview */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl">
            <CardHeader>
              <CardTitle className="text-xl text-purple-800 font-rounded flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Dein Fortschritt mit {babyName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold text-purple-800">{userData?.currentDay}</div>
                  <div className="text-sm text-purple-600">Tage im Programm</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <Award className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-green-800">{userData?.completedRoutines}</div>
                  <div className="text-sm text-green-600">Routinen abgeschlossen</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                  <Star className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <div className="text-2xl font-bold text-orange-800">
                    {Math.round(((userData?.currentDay || 1) / (userData?.totalDays || 14)) * 100)}%
                  </div>
                  <div className="text-sm text-orange-600">Programm-Fortschritt</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </MobileLayout>
    </AuthGuard>
  )
}
