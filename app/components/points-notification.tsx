"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PointsNotificationProps {
  points: number
  message: string
  onClose: () => void
}

export default function PointsNotification({ points, message, onClose }: PointsNotificationProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Auto-close after 3 seconds
    const timer = setTimeout(() => {
      handleClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => {
      onClose()
    }, 300) // Wait for exit animation
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, x: 0 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-lg shadow-lg max-w-xs">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">+{points} Points!</h3>
                  <p className="text-sm">{message}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleClose} className="text-white h-6 w-6 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
