"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface MobileDashboardLayoutProps {
  children: React.ReactNode
}

export function MobileDashboardLayout({ children }: MobileDashboardLayoutProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated stars */}
        <div className="absolute top-20 left-8 text-yellow-200 text-2xl animate-pulse">✨</div>
        <div className="absolute top-32 right-12 text-yellow-200 text-lg animate-pulse delay-1000">⭐</div>
        <div className="absolute top-64 left-16 text-yellow-200 text-xl animate-pulse delay-500">✨</div>
        <div className="absolute bottom-40 right-8 text-yellow-200 text-2xl animate-pulse delay-700">⭐</div>
        <div className="absolute bottom-64 left-12 text-yellow-200 text-lg animate-pulse delay-300">✨</div>

        {/* Floating moons */}
        <div className="absolute top-16 right-20 text-yellow-200 text-3xl animate-bounce">🌙</div>
        <div className="absolute bottom-32 left-6 text-yellow-200 text-2xl animate-bounce delay-1000">🌙</div>

        {/* Floating clouds */}
        <div className="absolute top-40 left-4 text-white text-4xl opacity-30 animate-float">☁️</div>
        <div className="absolute top-80 right-6 text-white text-3xl opacity-20 animate-float delay-500">☁️</div>
        <div className="absolute bottom-20 right-16 text-white text-5xl opacity-25 animate-float delay-1000">☁️</div>
      </div>

      {/* Main content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
