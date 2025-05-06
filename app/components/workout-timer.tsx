"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Save } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/use-toast"
import { recordActivity } from "@/lib/workout-utils"

interface WorkoutTimerProps {
  onTimeUpdate?: (time: number) => void
  onSave?: (time: number) => void
}

export default function WorkoutTimer({ onTimeUpdate, onSave }: WorkoutTimerProps) {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [lastMilestone, setLastMilestone] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Load saved time from localStorage
  useEffect(() => {
    const savedTime = localStorage.getItem("workoutTime")
    if (savedTime) {
      setTime(Number.parseInt(savedTime))
    }

    // Record opening the timer (awards 5 points)
    recordActivity("tool", "Opened workout timer", 5)
  }, [])

  // Save time to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("workoutTime", time.toString())

    // Call the onTimeUpdate callback if provided
    if (onTimeUpdate) {
      onTimeUpdate(time)
    }

    // Check for milestones (every 5 minutes)
    const minutes = Math.floor(time / 60)
    if (minutes > 0 && minutes % 5 === 0 && minutes !== lastMilestone) {
      setLastMilestone(minutes)

      // Award points for workout duration milestones
      const points = 10
      recordActivity("workout_milestone", `Reached ${minutes} minute workout milestone`, points)

      toast({
        title: `${minutes} Minute Milestone!`,
        description: `You've been working out for ${minutes} minutes! +${points} points`,
      })
    }
  }, [time, onTimeUpdate, lastMilestone])

  // Start/stop the timer
  const toggleTimer = () => {
    if (isRunning) {
      // Stop the timer
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setIsRunning(false)

      // Record pausing the timer (awards 2 points)
      recordActivity("interaction", "Paused workout timer", 2)
    } else {
      // Start the timer
      setIsRunning(true)
      const startTime = Date.now() - time * 1000
      intervalRef.current = setInterval(() => {
        setTime(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)

      // Record starting the timer (awards 5 points)
      recordActivity("interaction", "Started workout timer", 5)
    }
  }

  // Reset the timer
  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
    setTime(0)
    setLastMilestone(0)

    // Record resetting the timer (awards 2 points)
    recordActivity("interaction", "Reset workout timer", 2)
  }

  // Save the current time
  const saveTime = () => {
    if (time > 0) {
      // Call the onSave callback if provided
      if (onSave) {
        onSave(time)
      }

      // Record saving the time (awards 10 points)
      recordActivity("workout", "Saved workout time", 10)

      toast({
        title: "Time Saved",
        description: `Workout time saved: ${formatTime(time)}`,
      })
    } else {
      toast({
        title: "No Time to Save",
        description: "Start the timer first to track your workout time.",
        variant: "destructive",
      })
    }
  }

  // Format time as HH:MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return [
      hours > 0 ? hours.toString().padStart(2, "0") : null,
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ]
      .filter(Boolean)
      .join(":")
  }

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Get color based on time
  const getTimeColor = () => {
    const minutes = Math.floor(time / 60)
    if (minutes < 5) return "text-zinc-800"
    if (minutes < 15) return "text-green-800"
    if (minutes < 30) return "text-blue-800"
    if (minutes < 45) return "text-purple-800"
    return "text-amber-800"
  }

  // Get background color based on time
  const getTimeBg = () => {
    const minutes = Math.floor(time / 60)
    if (minutes < 5) return "bg-zinc-100"
    if (minutes < 15) return "bg-green-100"
    if (minutes < 30) return "bg-blue-100"
    if (minutes < 45) return "bg-purple-100"
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
          animate={{ scale: isRunning ? [1, 1.03, 1] : 1 }}
          transition={{ duration: 1, repeat: isRunning ? Number.POSITIVE_INFINITY : 0, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center">
            <span className={`text-4xl font-bold ${getTimeColor()} tabular-nums`}>{formatTime(time)}</span>
            <div className="text-xl mt-2">
              {Math.floor(time / 60) < 5
                ? "Just Started"
                : Math.floor(time / 60) < 15
                  ? "Warming Up"
                  : Math.floor(time / 60) < 30
                    ? "In the Zone"
                    : Math.floor(time / 60) < 45
                      ? "Pushing Hard"
                      : "Beast Mode"}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
          <Button
            variant={isRunning ? "destructive" : "default"}
            size="lg"
            onClick={toggleTimer}
            className="flex items-center gap-2"
          >
            {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button variant="outline" size="lg" onClick={resetTimer} className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5" />
            Reset
          </Button>
          <Button variant="outline" size="lg" onClick={saveTime} className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            Save
          </Button>
        </div>

        <div className="mt-6 w-full">
          <div className="text-sm text-muted-foreground">
            <p>
              <strong>Pro Tip:</strong> Earn points for every 5 minutes of workout time! Keep the timer running during
              your workout to track your progress and earn more points.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">{isRunning ? "Timer is running" : "Timer is paused"}</div>
        <div className="text-sm font-medium">
          {Math.floor(time / 60)} min {time % 60} sec
        </div>
      </CardFooter>
    </Card>
  )
}
