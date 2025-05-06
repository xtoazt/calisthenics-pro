"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, RotateCcw, Save } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { recordActivity } from "@/lib/workout-utils"

interface RepCounterProps {
  onMilestone?: (count: number) => void
}

export default function RepCounter({ onMilestone }: RepCounterProps) {
  const [count, setCount] = useState(0)
  const [sets, setSets] = useState<number[]>([])
  const [exercise, setExercise] = useState("Exercise")

  // Load saved count from localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem("repCount")
    const savedSets = localStorage.getItem("repSets")
    const savedExercise = localStorage.getItem("repExercise")

    if (savedCount) setCount(Number.parseInt(savedCount))
    if (savedSets) setSets(JSON.parse(savedSets))
    if (savedExercise) setExercise(savedExercise)

    // Record opening the rep counter (awards 5 points)
    recordActivity("tool", "Opened rep counter", 5)
  }, [])

  // Save count to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("repCount", count.toString())

    // Check for milestones
    if (count > 0 && count % 10 === 0) {
      onMilestone?.(count)
    }
  }, [count, onMilestone])

  // Save sets to localStorage when they change
  useEffect(() => {
    localStorage.setItem("repSets", JSON.stringify(sets))
  }, [sets])

  // Save exercise to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("repExercise", exercise)
  }, [exercise])

  const increment = () => {
    setCount(count + 1)
    // Record rep (awards 1 point every 5 reps)
    if ((count + 1) % 5 === 0) {
      recordActivity("exercise", `Completed ${count + 1} reps`, 1)
    }
  }

  const decrement = () => {
    if (count > 0) setCount(count - 1)
  }

  const reset = () => {
    setCount(0)
  }

  const saveSet = () => {
    if (count > 0) {
      const newSets = [...sets, count]
      setSets(newSets)
      setCount(0)

      // Record saving a set (awards 5 points)
      recordActivity("exercise", `Saved set of ${count} reps`, 5)

      toast({
        title: "Set Saved",
        description: `Set of ${count} reps saved successfully.`,
      })
    } else {
      toast({
        title: "No Reps",
        description: "Please complete at least 1 rep before saving a set.",
        variant: "destructive",
      })
    }
  }

  const clearSets = () => {
    setSets([])
    toast({
      title: "Sets Cleared",
      description: "All sets have been cleared.",
    })
  }

  const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExercise(e.target.value)

    // Record changing exercise (awards 2 points)
    if (e.target.value !== exercise && e.target.value.trim() !== "") {
      recordActivity("exercise", `Changed exercise to ${e.target.value}`, 2)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Rep Counter</CardTitle>
        <CardDescription>Track your repetitions and sets</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="exercise" className="text-sm font-medium">
            Exercise
          </label>
          <input
            id="exercise"
            type="text"
            value={exercise}
            onChange={handleExerciseChange}
            className="rounded-md border border-input bg-background px-3 py-2"
            placeholder="Enter exercise name"
          />
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-6xl font-bold tabular-nums">{count}</div>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={decrement}>
              <Minus className="h-4 w-4" />
            </Button>
            <Button variant="default" size="icon" onClick={increment}>
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={reset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button className="w-full" onClick={saveSet}>
          <Save className="mr-2 h-4 w-4" /> Save Set
        </Button>

        {sets.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Saved Sets</h3>
              <Button variant="ghost" size="sm" onClick={clearSets}>
                Clear All
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {sets.map((set, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center rounded-md border border-border bg-muted p-2"
                >
                  <span className="font-medium">Set {index + 1}: </span>
                  <span className="ml-1">{set} reps</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Total reps: {sets.reduce((total, set) => total + set, 0) + count}
        </p>
      </CardFooter>
    </Card>
  )
}
