"use client"

import { useState, useEffect } from "react"

export interface UserData {
  parentName: string
  babyName: string
  ageValue: number
  ageUnit: "wochen" | "monate"
  registrationDate: string
  currentDay: number
  totalDays: number
  stars: number
  completedRoutines: number
  streakDays: number
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se está autenticado
    const auth = localStorage.getItem("schlafbalance_auth")
    const user = localStorage.getItem("schlafbalance_user")

    if (auth === "true") {
      setIsAuthenticated(true)
      if (user) {
        try {
          setUserData(JSON.parse(user))
        } catch (e) {
          console.error("Error parsing user data:", e)
        }
      }
    }
    setIsLoading(false)
  }, [])

  const login = (email: string, password: string) => {
    // Simular login - sempre bem-sucedido para teste
    localStorage.setItem("schlafbalance_auth", "true")
    localStorage.setItem("schlafbalance_email", email)
    setIsAuthenticated(true)
    return true
  }

  const completeOnboarding = (data: Partial<UserData>) => {
    const newUserData: UserData = {
      parentName: data.parentName || "",
      babyName: data.babyName || "",
      ageValue: data.ageValue || 6,
      ageUnit: data.ageUnit || "monate",
      registrationDate: new Date().toISOString(),
      currentDay: 1,
      totalDays: 14,
      stars: 0,
      completedRoutines: 0,
      streakDays: 0,
    }

    localStorage.setItem("schlafbalance_user", JSON.stringify(newUserData))
    setUserData(newUserData)
  }

  const logout = () => {
    localStorage.removeItem("schlafbalance_auth")
    localStorage.removeItem("schlafbalance_user")
    localStorage.removeItem("schlafbalance_email")
    setIsAuthenticated(false)
    setUserData(null)
  }

  const updateUserData = (updates: Partial<UserData>) => {
    if (!userData) return
    const newData = { ...userData, ...updates }
    setUserData(newData)
    localStorage.setItem("schlafbalance_user", JSON.stringify(newData))
  }

  return {
    isAuthenticated,
    userData,
    isLoading,
    login,
    logout,
    completeOnboarding,
    updateUserData,
  }
}
