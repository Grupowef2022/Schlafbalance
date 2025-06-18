"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BedDouble, Gift, Home, LifeBuoy, Moon, Music, User } from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Schlafroutine",
    href: "/routine",
    icon: Moon,
  },
  {
    title: "Schlafmusik",
    href: "/audio",
    icon: Music,
  },
  {
    title: "Bonusinhalte",
    href: "/bonuses",
    icon: Gift,
  },
  {
    title: "Kundenservice",
    href: "/support",
    icon: LifeBuoy,
  },
  {
    title: "Profil",
    href: "/profile",
    icon: User,
  },
]

export function MobileSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-14 items-center px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <BedDouble className="h-6 w-6 text-purple-600" />
          <span className="text-lg font-bold text-purple-800">SchlafBalance</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-purple-900",
                pathname === item.href ? "bg-purple-50 text-purple-900" : "text-gray-500 hover:bg-purple-50",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
