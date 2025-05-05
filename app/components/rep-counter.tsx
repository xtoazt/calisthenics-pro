"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, MinusCircle, RotateCcw, Save } from "lucide-react"
import { motion } from "framer-motion"

export default function RepCounter() {
  const [count, setCount] = useState(0)
  const [sets, setSets] = useState<number[]>([])
  const [exercise, setExercise] = useState("Push-Ups")

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  const reset = () => {
    setCount(0)
  }

  const addSet = () => {
    if (count > 0) {
      const newSets = [...sets, count]
      setSets(newSets)
      setCount(0)
    }
  }

  const saveWorkout = () => {
    if (sets.length > 0) {
      // In a real app, this would save to a database
      // For now, we'll just reset the state
      setSets([])
      setCount(0)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Rep Counter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="exercise">Exercise</Label>
          <Input
            id="exercise"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            placeholder="Exercise name"
          />
        </div>

        <div className="text-center mb-4">
          <h3 className="text-xl font-bold">{exercise}</h3>
          {sets.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Set {sets.length + 1} | Previous: {sets.join(", ")}
            </p>
          )}
        </div>

        <div className="flex justify-center items-center my-8">
          <Button variant="outline" size="icon" className="h-16 w-16 rounded-full" onClick={decrement}>
            <MinusCircle className="h-8 w-8" />
          </Button>
          <div className="mx-8">
            <motion.div
              key={count}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-6xl font-bold tabular-nums"
            >
              {count}
            </motion.div>
          </div>
          <Button variant="outline" size="icon" className="h-16 w-16 rounded-full" onClick={increment}>
            <PlusCircle className="h-8 w-8" />
          </Button>
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
          <Button onClick={addSet}>Complete Set</Button>
        </div>
      </CardContent>
      <CardFooter>
        {sets.length > 0 && (
          <Button variant="secondary" className="w-full" onClick={saveWorkout}>
            <Save className="mr-2 h-4 w-4" /> Finish Workout
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
