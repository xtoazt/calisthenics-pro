"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export default function WorkoutTimer() {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(60) // Default 60 seconds

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => {
          if (time >= duration) {
            clearInterval(interval as NodeJS.Timeout)
            setIsActive(false)
            setIsPaused(true)
            return duration
          }
          return time + 1
        })
      }, 1000)
    } else {
      if (interval) clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, isPaused, duration])

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(false)
  }

  const handlePauseResume = () => {
    setIsPaused(!isPaused)
  }

  const handleReset = () => {
    setIsActive(false)
    setIsPaused(true)
    setTime(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const progress = (time / duration) * 100

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Workout Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (seconds)</Label>
          <Input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => {
              const value = Number.parseInt(e.target.value)
              if (!isNaN(value) && value > 0) {
                setDuration(value)
                if (time > value) {
                  setTime(value)
                }
              }
            }}
            min={1}
            disabled={isActive && !isPaused}
          />
        </div>

        <div className="text-center my-8">
          <motion.div
            key={formatTime(time)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-5xl font-bold tabular-nums"
          >
            {formatTime(time)}
          </motion.div>
          <div className="mt-4 h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{formatTime(duration - time)} remaining</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-2">
        {!isActive || isPaused ? (
          <Button onClick={handleStart} className="w-24">
            <Play className="mr-2 h-4 w-4" /> Start
          </Button>
        ) : (
          <Button onClick={handlePauseResume} className="w-24">
            <Pause className="mr-2 h-4 w-4" /> Pause
          </Button>
        )}
        <Button variant="outline" onClick={handleReset} className="w-24">
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </CardFooter>
    </Card>
  )
}
