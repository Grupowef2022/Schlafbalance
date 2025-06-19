"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { SleepMythsGuide } from "@/components/bonus-content/sleep-myths-guide"
import { AuthGuard } from "@/components/auth-guard"
import { MobileLayout } from "@/components/mobile-layout"

export default function SleepMythsPage() {
  const router = useRouter()

  return (
    <AuthGuard>
      <MobileLayout>
        <div className="container max-w-4xl mx-auto py-6 px-4">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-3 hover:bg-white/80">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-purple-800">Schlaf-Mythen aufgeklärt</h1>
              <p className="text-gray-600">Premium Content - Wissenschaftlich fundierte Fakten</p>
            </div>
          </div>
          <SleepMythsGuide />
        </div>
      </MobileLayout>
    </AuthGuard>
  )
}
