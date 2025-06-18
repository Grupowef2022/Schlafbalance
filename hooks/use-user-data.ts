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

const defaultUserData: UserData = {
  parentName: "Maria",
  babyName: "Emma",
  ageValue: 6,
  ageUnit: "monate",
  registrationDate: new Date().toISOString(),
  currentDay: 3,
  totalDays: 14,
  stars: 12,
  completedRoutines: 2,
  streakDays: 2,
}

export function useUserData() {
  const [userData, setUserData] = useState<UserData>(defaultUserData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const savedData = localStorage.getItem("schlafbalance_user")
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        setUserData(parsedData)
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateUserData = (updates: Partial<UserData>) => {
    const newData = { ...userData, ...updates }
    setUserData(newData)
    try {
      localStorage.setItem("schlafbalance_user", JSON.stringify(newData))
    } catch (error) {
      console.error("Error saving user data:", error)
    }
  }

  const addStars = (amount: number) => {
    updateUserData({ stars: userData.stars + amount })
  }

  const completeRoutine = () => {
    updateUserData({
      completedRoutines: userData.completedRoutines + 1,
      streakDays: userData.streakDays + 1,
      stars: userData.stars + 3,
    })
  }

  const advanceDay = () => {
    if (userData.currentDay < userData.totalDays) {
      updateUserData({ currentDay: userData.currentDay + 1 })
    }
  }

  return {
    userData,
    isLoading,
    updateUserData,
    addStars,
    completeRoutine,
    advanceDay,
  }
}
