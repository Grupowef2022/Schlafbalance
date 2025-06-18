"use client"

import { CheckCircle2, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface RoutineStepProps {
  step: {
    id: number
    title: string
    completed: boolean
  }
  isActive: boolean
  onClick: () => void
}

export function RoutineStep({ step, isActive, onClick }: RoutineStepProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
        isActive && "border-purple-300 bg-purple-50",
        step.completed && "bg-green-50 border-green-200",
        !isActive && !step.completed && "hover:bg-gray-50",
      )}
      onClick={onClick}
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center">
        {step.completed ? (
          <CheckCircle2 className="h-5 w-5 text-green-600" />
        ) : (
          <Circle className={cn("h-5 w-5", isActive ? "text-purple-600" : "text-gray-400")} />
        )}
      </div>
      <span
        className={cn(
          "text-sm font-medium",
          step.completed && "text-green-800",
          isActive && !step.completed && "text-purple-800",
          !isActive && !step.completed && "text-gray-700",
        )}
      >
        {step.title}
      </span>
    </div>
  )
}
