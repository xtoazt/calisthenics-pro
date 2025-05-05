"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Clock, Save } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface WorkoutTimerProps {
  onTimeUpdate?: (time: number) => void
  onSave?: (time: number) => void
}

export default function WorkoutTimer({ onTimeUpdate, onSave }: WorkoutTimerProps) {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [emoji, setEmoji] = useState("⏱️")
  const [savedTimes, setSavedTimes] = useState<number[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Start or pause the timer
  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev)
  }, [])

  // Reset the timer
  const resetTimer = useCallback(() => {
    setIsRunning(false)
    setTime(0)
    setEmoji("⏱️")
    if (onTimeUpdate) {
      onTimeUpdate(0)
    }
  }, [onTimeUpdate])

  // Save the current time
  const saveTime = useCallback(() => {
    if (time > 0) {
      setSavedTimes((prev) => [...prev, time])

      if (onSave) {
        onSave(time)
      }

      toast({
        title: "Time saved",
        description: `Saved time: ${formatTime(time)}`,
      })
    }
  }, [time, onSave])

  // Format time as MM:SS
  const formatTime = useCallback((timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }, [])

  // Update emoji based on time
  useEffect(() => {
    if (time < 60) {
      setEmoji("⏱️")
    } else if (time < 300) {
      setEmoji("🏃")
    } else if (time < 600) {
      setEmoji("💪")
    } else if (time < 1200) {
      setEmoji("🔥")
    } else {
      setEmoji("🏆")
    }

    // Pass time to parent component if callback provided
    if (onTimeUpdate) {
      onTimeUpdate(time)
    }
  }, [time, onTimeUpdate])

  // Handle timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  // Load saved times from localStorage on mount
  useEffect(() => {
    try {
      const savedTimesJSON = localStorage.getItem("savedTimes")
      if (savedTimesJSON) {
        const parsed = JSON.parse(savedTimesJSON)
        if (Array.isArray(parsed)) {
          setSavedTimes(parsed)
        }
      }
    } catch (error) {
      console.error("Error loading saved times:", error)
    }
  }, [])

  // Save times to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem("savedTimes", JSON.stringify(savedTimes))
    } catch (error) {
      console.error("Error saving times to localStorage:", error)
    }
  }, [savedTimes])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" /> Workout Timer
        </CardTitle>
        <CardDescription>Track the duration of your workout</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-6">
        <div className="text-6xl mb-4">{emoji}</div>
        <div className="text-6xl font-bold tabular-nums">{formatTime(time)}</div>
        <p className="mt-2 text-sm text-muted-foreground">
          {time < 60
            ? "Let's get started!"
            : time < 300
              ? "Warming up nicely!"
              : time < 600
                ? "Keep pushing!"
                : time < 1200
                  ? "You're on fire!"
                  : "Amazing endurance!"}
        </p>

        {savedTimes.length > 0 && (
          <div className="mt-6 w-full">
            <h3 className="text-sm font-medium mb-2">Saved Times</h3>
            <div className="flex flex-wrap gap-2">
              {savedTimes.map((savedTime, index) => (
                <div key={index} className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10">
                  {index + 1}: {formatTime(savedTime)}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetTimer} disabled={time === 0}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>

          <Button variant="outline" onClick={saveTime} disabled={time === 0}>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
        </div>

        <Button onClick={toggleTimer}>
          {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isRunning ? "Pause" : "Start"}
        </Button>
      </CardFooter>
    </Card>
  )
}
