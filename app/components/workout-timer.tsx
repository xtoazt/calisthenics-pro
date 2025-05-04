"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function WorkoutTimer() {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [time, setTime] = useState(0)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)

  const exercises = [
    { name: "Push-Ups", sets: 3, duration: 45, rest: 30 },
    { name: "Plank", sets: 3, duration: 30, rest: 20 },
    { name: "Squats", sets: 3, duration: 45, rest: 30 },
    { name: "Pull-Ups", sets: 3, duration: 30, rest: 30 },
  ]

  const totalExercises = exercises.length
  const currentExerciseData = exercises[currentExercise]
  const totalSets = currentExerciseData.sets
  const isRest = time >= currentExerciseData.duration
  const currentDuration = isRest ? currentExerciseData.rest : currentExerciseData.duration
  const progress = Math.min(100, (time / currentDuration) * 100)

  useEffect(() => {
    let interval = null

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => time + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isActive, isPaused])

  useEffect(() => {
    if (time >= currentExerciseData.duration + currentExerciseData.rest) {
      if (currentSet < totalSets) {
        setCurrentSet(currentSet + 1)
        setTime(0)
      } else {
        if (currentExercise < totalExercises - 1) {
          setCurrentExercise(currentExercise + 1)
          setCurrentSet(1)
          setTime(0)
        } else {
          // Workout complete
          setIsActive(false)
          setIsPaused(true)
        }
      }
    }
  }, [time, currentExercise, currentSet, currentExerciseData, totalSets, totalExercises])

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
    setCurrentExercise(0)
    setCurrentSet(1)
  }

  const handleSkip = () => {
    if (isRest) {
      setTime(0)
      if (currentSet < totalSets) {
        setCurrentSet(currentSet + 1)
      } else {
        if (currentExercise < totalExercises - 1) {
          setCurrentExercise(currentExercise + 1)
          setCurrentSet(1)
        } else {
          // Workout complete
          setIsActive(false)
          setIsPaused(true)
        }
      }
    } else {
      setTime(currentExerciseData.duration) // Skip to rest
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const remainingTime = currentDuration - time

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Workout Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold">{isRest ? "Rest" : exercises[currentExercise].name}</h3>
          <p className="text-muted-foreground">
            Set {currentSet} of {totalSets} | Exercise {currentExercise + 1} of {totalExercises}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="text-4xl font-bold tabular-nums">{formatTime(remainingTime)}</div>
        </div>

        <Progress value={progress} className="h-3" />

        <div className="text-center text-sm text-muted-foreground">
          {isRest ? "Get ready for the next set" : "Keep pushing!"}
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
        <Button variant="secondary" onClick={handleSkip} className="w-24">
          <SkipForward className="mr-2 h-4 w-4" /> Skip
        </Button>
      </CardFooter>
    </Card>
  )
}
