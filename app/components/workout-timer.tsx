"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Timer } from "lucide-react"
import { motion } from "framer-motion"

export default function WorkoutTimer() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [savedTimes, setSavedTimes] = useState<number[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const handleStartStop = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
  }

  const handleSaveTime = () => {
    setSavedTimes([...savedTimes, time])
  }

  const handleClearSavedTimes = () => {
    setSavedTimes([])
  }

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const milliseconds = Math.floor((ms % 1000) / 10)

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(2, "0")}`
  }

  // Get color based on time
  const getTimeColor = () => {
    const minutes = Math.floor(time / 60000)
    if (minutes < 1) return "text-green-800"
    if (minutes < 3) return "text-blue-800"
    if (minutes < 5) return "text-purple-800"
    return "text-amber-800"
  }

  // Get background color based on time
  const getTimeBg = () => {
    const minutes = Math.floor(time / 60000)
    if (minutes < 1) return "bg-green-100"
    if (minutes < 3) return "bg-blue-100"
    if (minutes < 5) return "bg-purple-100"
    return "bg-amber-100"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workout Timer</CardTitle>
        <CardDescription>Track your workout duration</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <motion.div
          className={`flex items-center justify-center w-48 h-48 rounded-full mb-6 ${getTimeBg()}`}
          animate={{ scale: isRunning ? [1, 1.02, 1] : 1 }}
          transition={{ duration: 1, repeat: isRunning ? Number.POSITIVE_INFINITY : 0, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center">
            <span className={`text-3xl font-bold font-mono ${getTimeColor()}`}>{formatTime(time)}</span>
            <div className="text-2xl mt-2">
              {time < 60000 ? "⏱️" : time < 180000 ? "⌛" : time < 300000 ? "🔥" : "💪"}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
          <Button variant="outline" size="lg" onClick={handleReset}>
            <RotateCcw className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" onClick={handleStartStop}>
            {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button variant="outline" size="lg" onClick={handleSaveTime} disabled={time === 0}>
            <Timer className="h-5 w-5" />
          </Button>
        </div>

        {savedTimes.length > 0 && (
          <div className="mt-6 w-full">
            <h3 className="text-sm font-medium mb-2">Saved Times</h3>
            <div className="flex flex-wrap gap-2">
              {savedTimes.map((savedTime, index) => {
                const minutes = Math.floor(savedTime / 60000)
                const bgColor =
                  minutes < 1
                    ? "bg-green-100 text-green-800"
                    : minutes < 3
                      ? "bg-blue-100 text-blue-800"
                      : minutes < 5
                        ? "bg-purple-100 text-purple-800"
                        : "bg-amber-100 text-amber-800"

                return (
                  <div key={index} className={`px-3 py-1 rounded-full text-sm font-medium ${bgColor}`}>
                    {index + 1}: {formatTime(savedTime)}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleClearSavedTimes} disabled={savedTimes.length === 0}>
          Clear Saved
        </Button>
        <Button onClick={handleSaveTime} disabled={time === 0}>
          Save Time
        </Button>
      </CardFooter>
    </Card>
  )
}
