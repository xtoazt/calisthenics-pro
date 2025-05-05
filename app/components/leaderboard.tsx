"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { calculateUserPoints, getUserRank, getNextRank, calculateProgressToNextRank } from "@/lib/user-utils"
import { toast } from "@/components/ui/use-toast"

// Mock data for friends
const friends = [
  { name: "Alex", points: 320, achievements: 12 },
  { name: "Jordan", points: 450, achievements: 15 },
  { name: "Taylor", points: 180, achievements: 8 },
  { name: "Casey", points: 600, achievements: 20 },
  { name: "Riley", points: 90, achievements: 5 },
]

export default function Leaderboard() {
  const [userName, setUserName] = useState<string | null>(null)
  const [userExperience, setUserExperience] = useState<string | null>(null)
  const [userPoints, setUserPoints] = useState(0)
  const [leaderboardData, setLeaderboardData] = useState<any[]>([])
  const [achievementData, setAchievementData] = useState<any[]>([])

  useEffect(() => {
    // Get user data from localStorage
    const name = localStorage.getItem("user")
    const experience = localStorage.getItem("userExperience")

    setUserName(name)
    setUserExperience(experience)

    // Calculate user points
    const points = calculateUserPoints(name, experience)
    setUserPoints(points)

    // Create leaderboard with user and friends
    const leaderboard = [...friends, { name: name || "You", points: points, achievements: 2 }]
    leaderboard.sort((a, b) => b.points - a.points)

    // Add rank and position
    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      ...entry,
      position: index + 1,
      rank: getUserRank(entry.points),
      isUser: entry.name === name || entry.name === "You",
    }))

    setLeaderboardData(rankedLeaderboard)

    // Sort by achievements for achievement tab
    const achievementLeaderboard = [...rankedLeaderboard]
    achievementLeaderboard.sort((a, b) => b.achievements - a.achievements)

    // Update positions for achievement ranking
    const rankedAchievements = achievementLeaderboard.map((entry, index) => ({
      ...entry,
      position: index + 1,
    }))

    setAchievementData(rankedAchievements)
  }, [])

  const handleShare = () => {
    toast({
      title: "Share your progress",
      description: "Sharing functionality would be implemented here in a real app.",
    })
  }

  // Get user's current rank
  const userRankData = getUserRank(userPoints)
  const nextRankData = getNextRank(userRankData.name)
  const progressPercentage = calculateProgressToNextRank(userPoints, userRankData, nextRankData)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Leaderboard</CardTitle>
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Compare your progress with friends</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ranks">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ranks">Ranks</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="ranks" className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Your Rank: {userRankData.name}</span>
                <span>Next: {nextRankData.name}</span>
              </div>
              <Progress value={progressPercentage} className={`h-2 ${userRankData.color}`} />
              <p className="text-xs text-center text-muted-foreground">
                {userPoints} points ({progressPercentage}% to next rank)
              </p>
            </div>

            <div className="space-y-2">
              {leaderboardData.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-2 rounded-md ${
                    entry.isUser ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 font-medium">{entry.position}.</div>
                    <div className={`w-2 h-8 rounded-full ${entry.rank.color}`}></div>
                    <div>
                      <p className="font-medium">
                        {entry.name} {entry.isUser && "(You)"}
                      </p>
                      <p className="text-xs text-muted-foreground">{entry.rank.name}</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{entry.points} pts</div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4 mt-4">
            <div className="space-y-2">
              {achievementData.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-2 rounded-md ${
                    entry.isUser ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 font-medium">{entry.position}.</div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      <div className="text-xl">🏅</div>
                    </div>
                    <div>
                      <p className="font-medium">
                        {entry.name} {entry.isUser && "(You)"}
                      </p>
                      <p className="text-xs text-muted-foreground">{entry.achievements} achievements</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{entry.rank.name}</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Complete workouts and challenges to earn more points and climb the leaderboard.
        </p>
      </CardFooter>
    </Card>
  )
}
