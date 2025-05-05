"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Minus, RotateCcw } from "lucide-react"
import { motion } from "framer-motion"

export default function RepCounter() {
  const [count, setCount] = useState(0)
  const [sets, setSets] = useState<number[]>([])

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

  const completeSet = () => {
    if (count > 0) {
      setSets([...sets, count])
      setCount(0)
    }
  }

  const clearSets = () => {
    setSets([])
  }

  // Get color based on rep count
  const getCountColor = () => {
    if (count < 5) return "text-zinc-800"
    if (count < 10) return "text-green-800"
    if (count < 15) return "text-blue-800"
    if (count < 20) return "text-purple-800"
    return "text-amber-800"
  }

  // Get background color based on rep count
  const getCountBg = () => {
    if (count < 5) return "bg-zinc-100"
    if (count < 10) return "bg-green-100"
    if (count < 15) return "bg-blue-100"
    if (count < 20) return "bg-purple-100"
    return "bg-amber-100"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rep Counter</CardTitle>
        <CardDescription>Track your repetitions for each exercise</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <motion.div
          className={`flex items-center justify-center w-32 h-32 rounded-full mb-6 ${getCountBg()}`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <span className={`text-5xl font-bold ${getCountColor()}`}>{count}</span>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
          <Button variant="outline" size="lg" onClick={decrement}>
            <Minus className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" onClick={reset}>
            <RotateCcw className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" onClick={increment}>
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {sets.length > 0 && (
          <div className="mt-6 w-full">
            <h3 className="text-sm font-medium mb-2">Completed Sets</h3>
            <div className="flex flex-wrap gap-2">
              {sets.map((set, index) => (
                <div
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    set < 5
                      ? "bg-zinc-100 text-zinc-800"
                      : set < 10
                        ? "bg-green-100 text-green-800"
                        : set < 15
                          ? "bg-blue-100 text-blue-800"
                          : set < 20
                            ? "bg-purple-100 text-purple-800"
                            : "bg-amber-100 text-amber-800"
                  }`}
                >
                  Set {index + 1}: {set} reps
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={clearSets} disabled={sets.length === 0}>
          Clear Sets
        </Button>
        <Button onClick={completeSet} disabled={count === 0}>
          Complete Set
        </Button>
      </CardFooter>
    </Card>
  )
}
