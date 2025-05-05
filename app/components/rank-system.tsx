"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Trophy, Star, Info } from "lucide-react"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface RankSystemProps {
  currentRank: string
  nextRank: string
  progress: number
  currentPoints: number
  pointsToNextRank: number
}

const ranks = [
  { name: "Novice", color: "bg-zinc-400", points: 0 },
  { name: "Apprentice", color: "bg-green-500", points: 100 },
  { name: "Adept", color: "bg-blue-500", points: 250 },
  { name: "Expert", color: "bg-purple-500", points: 500 },
  { name: "Master", color: "bg-amber-500", points: 1000 },
  { name: "Grandmaster", color: "bg-red-500", points: 2000 },
  { name: "Legend", color: "bg-gradient-to-r from-purple-500 to-pink-500", points: 5000 },
]

export default function RankSystem({
  currentRank,
  nextRank,
  progress,
  currentPoints,
  pointsToNextRank,
}: RankSystemProps) {
  const currentRankData = ranks.find((r) => r.name === currentRank) || ranks[0]
  const nextRankData = ranks.find((r) => r.name === nextRank) || ranks[1]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Your Rank</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Complete workouts, achieve goals, and master skills to earn points and increase your rank.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>Earn points to increase your rank</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center">
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className={`h-24 w-24 rounded-full flex items-center justify-center ${currentRankData.color}`}>
              <Trophy className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 bg-background rounded-full p-1">
              <div className="bg-yellow-400 rounded-full p-1">
                <Star className="h-4 w-4 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold">{currentRank}</h3>
          <p className="text-sm text-muted-foreground">
            {currentPoints} / {pointsToNextRank} points
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{currentRank}</span>
            <span>{nextRank}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-center text-muted-foreground">
            {pointsToNextRank - currentPoints} points needed for next rank
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">How to earn points:</h4>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• Complete daily workouts: 10 points</li>
            <li>• Maintain a streak: 5 points per day</li>
            <li>• Achieve a new skill level: 25 points</li>
            <li>• Complete weekly challenges: 50 points</li>
            <li>• Track nutrition goals: 5 points per day</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Ranks
        </Button>
      </CardFooter>
    </Card>
  )
}
