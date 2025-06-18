"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Moon, Music, Gift, User, Download, X, Bell } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useUserData } from "@/hooks/use-user-data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MobileLayoutProps {
  children: React.ReactNode
  showInstallPrompt?: boolean
  showNavbar?: boolean
}

export function MobileLayout({ children, showInstallPrompt = false, showNavbar = true }: MobileLayoutProps) {
  const pathname = usePathname()
  const { userData } = useUserData()
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallBanner, setShowInstallBanner] = useState(showInstallPrompt)
  const [isInstalled, setIsInstalled] = useState(false)
  const [notifications] = useState(2)

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
      setShowInstallBanner(false)
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      if (showInstallPrompt) {
        setShowInstallBanner(true)
      }
    }

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowInstallBanner(false)
      setDeferredPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [showInstallPrompt])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setShowInstallBanner(false)
      }
      setDeferredPrompt(null)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("schlafbalance_auth")
    localStorage.removeItem("schlafbalance_user")
    localStorage.removeItem("schlafbalance_email")
    window.location.href = "/login"
  }

  const navigationItems = [
    {
      href: "/dashboard",
      icon: Home,
      label: "Home",
      color: "from-purple-200 to-indigo-200",
      iconColor: "text-purple-600",
    },
    {
      href: "/routine",
      icon: Moon,
      label: "Routine",
      color: "from-pink-200 to-rose-200",
      iconColor: "text-pink-600",
    },
    {
      href: "/audio",
      icon: Music,
      label: "Musik",
      color: "from-blue-200 to-cyan-200",
      iconColor: "text-blue-600",
    },
    {
      href: "/bonuses",
      icon: Gift,
      label: "Bonus",
      color: "from-yellow-200 to-orange-200",
      iconColor: "text-yellow-600",
    },
    {
      href: "/profile",
      icon: User,
      label: "Profil",
      color: "from-green-200 to-emerald-200",
      iconColor: "text-green-600",
    },
  ]

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

      {/* Top Header - Centralizado e Fixo */}
      {showNavbar && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-white/50 shadow-lg">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Logo centralizado */}
            <div className="flex-1 text-center">
              <Link href="/dashboard">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform">
                  SchlafBalance
                </h1>
              </Link>
            </div>

            {/* Notifications e Profile */}
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="relative border-purple-200 hover:bg-purple-50 h-9 w-9"
                  >
                    <Bell className="h-4 w-4" />
                    {notifications > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-[10px] font-medium text-white shadow-lg">
                        {notifications}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <DropdownMenuLabel>Benachrichtigungen</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-3">
                    <div>
                      <p className="font-medium text-sm">
                        Zeit für das Abendritual von {userData?.babyName || "Emma"}!
                      </p>
                      <p className="text-xs text-gray-500">vor 5 Minuten</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3">
                    <div>
                      <p className="font-medium text-sm">Neuer Tipp für Tag 3 verfügbar</p>
                      <p className="text-xs text-gray-500">vor 1 Stunde</p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-purple-200 hover:bg-purple-50 h-9 w-9"
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold text-xs">
                        {userData?.parentName?.charAt(0).toUpperCase() || "M"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>
                    <div>
                      <p className="font-medium text-sm">{userData?.parentName || "Maria"}</p>
                      <p className="text-xs text-gray-500">Mutter von {userData?.babyName || "Emma"}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer text-sm">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/support" className="cursor-pointer text-sm">
                      <span>Support</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 text-sm">
                    Abmelden
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      )}

      {/* Install App Banner */}
      {showInstallBanner && !isInstalled && (
        <div className={`fixed ${showNavbar ? "top-16" : "top-4"} left-4 right-4 z-40`}>
          <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-2">
                    <Download className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">App installieren</h3>
                    <p className="text-xs opacity-90">Schneller Zugriff und offline</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleInstallClick}
                    className="bg-white/20 hover:bg-white/30 text-white border-0 text-xs"
                  >
                    Installieren
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowInstallBanner(false)}
                    className="text-white hover:bg-white/20 p-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main content with proper spacing */}
      <div className={`relative z-10 ${showNavbar ? "pt-16" : ""} pb-28`}>{children}</div>

      {/* Bottom Navigation - Melhorado e Fixo */}
      {showNavbar && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-white/50 z-50 shadow-lg">
          <div className="flex justify-center items-center py-2">
            <div className="flex justify-center items-center gap-4 px-4 max-w-md w-full">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center flex-1">
                    <div
                      className={cn(
                        "w-11 h-11 rounded-2xl flex items-center justify-center mb-1 transition-all duration-300",
                        isActive
                          ? `bg-gradient-to-br ${item.color} scale-110 shadow-lg`
                          : "bg-gray-100 hover:bg-gray-200",
                      )}
                    >
                      <item.icon
                        className={cn("h-5 w-5 transition-colors", isActive ? item.iconColor : "text-gray-500")}
                      />
                    </div>
                    <span
                      className={cn(
                        "text-xs font-rounded transition-colors text-center whitespace-nowrap",
                        isActive ? "text-purple-600 font-semibold" : "text-gray-500",
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
