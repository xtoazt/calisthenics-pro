"use client"

import { useEffect, useState } from "react"
import { usePoints } from "@/lib/points-context"
import { motion, AnimatePresence } from "framer-motion"
import { Award } from "lucide-react"

export default function PointsDisplay() {
  const { points } = usePoints()
  const [showAnimation, setShowAnimation] = useState(false)
  const [prevPoints, setPrevPoints] = useState(points)

  useEffect(() => {
    // If points have increased, show animation
    if (points > prevPoints) {
      setShowAnimation(true)
      const timer = setTimeout(() => {
        setShowAnimation(false)
      }, 2000)

      return () => clearTimeout(timer)
    }

    setPrevPoints(points)
  }, [points, prevPoints])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-full shadow-lg">
        <Award className="h-5 w-5" />
        <span className="font-bold">{points} pts</span>

        <AnimatePresence>
          {showAnimation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute -top-8 right-0 bg-green-500 text-white px-2 py-1 rounded-md text-sm font-bold"
            >
              +{points - prevPoints}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
