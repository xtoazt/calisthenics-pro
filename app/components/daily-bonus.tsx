"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Gift, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { recordActivity } from "@/lib/workout-utils"

export default function DailyBonus() {
  const [visible, setVisible] = useState(false)
  const [streak, setStreak] = useState(1)
  const [points, setPoints] = useState(10)

  useEffect(() => {
    // Check if user has already claimed today's bonus
    const lastClaimDate = localStorage.getItem("lastDailyBonusClaim")
    const today = new Date().toDateString()

    if (lastClaimDate !== today) {
      // Check streak
      const lastClaimDay = lastClaimDate ? new Date(lastClaimDate) : null
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)

      let currentStreak = Number(localStorage.getItem("dailyBonusStreak") || "0")

      // If last claim was yesterday, increment streak
      if (lastClaimDay && lastClaimDay.toDateString() === yesterday.toDateString()) {
        currentStreak += 1
      } else if (!lastClaimDay) {
        // First time login
        currentStreak = 1
      } else {
        // Streak broken
        currentStreak = 1
      }

      setStreak(currentStreak)

      // Calculate bonus points based on streak
      const bonusPoints = Math.min(10 + (currentStreak - 1) * 5, 50) // Cap at 50 points
      setPoints(bonusPoints)

      // Show bonus after a short delay
      setTimeout(() => {
        setVisible(true)
      }, 1500)
    }
  }, [])

  const handleClaim = () => {
    // Save claim date and streak
    const today = new Date().toDateString()
    localStorage.setItem("lastDailyBonusClaim", today)
    localStorage.setItem("dailyBonusStreak", streak.toString())

    // Award points
    recordActivity("login", `Claimed daily login bonus (Day ${streak})`, points)

    // Hide dialog
    setVisible(false)
  }

  const handleClose = () => {
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full overflow-hidden"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
          >
            <div className="relative">
              <div className="absolute top-2 right-2">
                <Button variant="ghost" size="icon" onClick={handleClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white text-center">
                <Gift className="h-16 w-16 mx-auto mb-2" />
                <h2 className="text-2xl font-bold">Daily Login Bonus!</h2>
                <p>
                  You've logged in for {streak} day{streak !== 1 ? "s" : ""} in a row
                </p>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Calendar className="h-8 w-8 text-primary" />
                  <div className="text-3xl font-bold text-primary">+{points} Points</div>
                </div>

                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    Login tomorrow to continue your streak and earn even more points!
                  </p>
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`w-8 h-2 rounded-full ${i < streak ? "bg-primary" : "bg-muted"}`} />
                    ))}
                  </div>
                </div>

                <Button className="w-full" onClick={handleClaim}>
                  Claim Bonus
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
