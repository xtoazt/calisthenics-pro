"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { getTotalPoints } from "./workout-utils"

type PointsContextType = {
  points: number
  refreshPoints: () => void
  addPoints: (amount: number, description: string) => void
}

const PointsContext = createContext<PointsContextType | undefined>(undefined)

export function PointsProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(0)
  const [initialized, setInitialized] = useState(false)

  // Load points only on initial mount
  useEffect(() => {
    if (!initialized) {
      const currentPoints = getTotalPoints()
      setPoints(currentPoints)
      setInitialized(true)
    }
  }, [initialized])

  // Function to refresh points from localStorage - but don't call this in useEffect
  const refreshPoints = useCallback(() => {
    const currentPoints = getTotalPoints()
    setPoints(currentPoints)
  }, [])

  // Function to add points and update state
  const addPoints = useCallback((amount: number, description: string) => {
    // Get current points from localStorage to avoid stale state
    const currentPoints = getTotalPoints()
    const newTotal = currentPoints + amount

    // Update localStorage
    localStorage.setItem("userPoints", newTotal.toString())

    // Update state
    setPoints(newTotal)

    // You could add toast notification here if needed
    console.log(`Earned ${amount} points: ${description}. Total: ${newTotal}`)
  }, [])

  return <PointsContext.Provider value={{ points, refreshPoints, addPoints }}>{children}</PointsContext.Provider>
}

export function usePoints() {
  const context = useContext(PointsContext)
  if (context === undefined) {
    throw new Error("usePoints must be used within a PointsProvider")
  }
  return context
}
