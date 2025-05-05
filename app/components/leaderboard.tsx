"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Users, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface User {
  name: string
  rank: string
  points: number
  level: number
  achievements: number
  color: string
  badge: string
  textColor: string
}

export default function Leaderboard() {
  const [userName, setUserName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get user from localStorage
    const user = localStorage.getItem("user")
    if (user) {
      setUserName(user)
    }
    setLoading(false)
  }, [])

  // Mock leaderboard data - in a real app, this would come from a database
  const users: User[] = [
    {
      name: userName || "You",
      rank: "Adept",
      points: 350,
      level: 3,
      achievements: 5,
      color: "bg-blue-500",
      badge: "bg-gradient-to-br from-blue-400 to-blue-600",
      textColor: "text-blue-800",
    },
    {
      name: "Alex",
      rank: "Expert",
      points: 520,
      level: 4,
      achievements: 7,
      color: "bg-purple-500",
      badge: "bg-gradient-to-br from-purple-400 to-purple-600",
      textColor: "text-purple-800",
    },
    {
      name: "Sarah",
      rank: "Master",
      points: 1050,
      level: 5,
      achievements: 12,
      color: "bg-amber-500",
      badge: "bg-gradient-to-br from-amber-400 to-amber-600",
      textColor: "text-amber-800",
    },
    {
      name: "Mike",
      rank: "Apprentice",
      points: 180,
      level: 2,
      achievements: 3,
      color: "bg-green-500",
      badge: "bg-gradient-to-br from-green-400 to-green-600",
      textColor: "text-green-800",
    },
    {
      name: "Emma",
      rank: "Novice",
      points: 90,
      level: 1,
      achievements: 2,
      color: "bg-zinc-400",
      badge: "bg-gradient-to-br from-zinc-300 to-zinc-500",
      textColor: "text-zinc-800",
    },
    {
      name: "James",
      rank: "Grandmaster",
      points: 2200,
      level: 6,
      achievements: 15,
      color: "bg-red-500",
      badge: "bg-gradient-to-br from-red-400 to-red-600",
      textColor: "text-red-800",
    },
  ]

  // Sort users by points (descending)
  const sortedUsers = [...users].sort((a, b) => b.points - a.points)

  // Find user's position
  const userPosition = sortedUsers.findIndex((user) => user.name === userName || user.name === "You") + 1

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>See how you rank against your friends</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ranks">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="ranks">Ranks</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="ranks">
            <div className="space-y-4">
              {/* User's rank highlight */}
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div
                        className={`h-12 w-12 rounded-full flex items-center justify-center ${
                          sortedUsers.find((user) => user.name === userName || user.name === "You")?.badge ||
                          "bg-gradient-to-br from-blue-400 to-blue-600"
                        }`}
                      >
                        <Trophy className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 bg-background rounded-full p-0.5">
                        <div className="bg-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold text-primary-foreground">
                          {userPosition}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Your Rank</p>
                        <p
                          className={`text-sm ${
                            sortedUsers.find((user) => user.name === userName || user.name === "You")?.textColor ||
                            "text-blue-800"
                          }`}
                        >
                          {sortedUsers.find((user) => user.name === userName || user.name === "You")?.rank || "Adept"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Points</p>
                        <p className="text-sm">
                          {sortedUsers.find((user) => user.name === userName || user.name === "You")?.points || 350}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leaderboard list */}
              <div className="space-y-2">
                {sortedUsers.map((user, index) => (
                  <motion.div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      user.name === userName || user.name === "You" ? "bg-muted/50" : ""
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 text-center font-medium text-sm">{index + 1}</div>
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${user.badge}`}>
                        {index === 0 ? (
                          <Trophy className="h-4 w-4 text-white" />
                        ) : index === 1 ? (
                          <Medal className="h-4 w-4 text-white" />
                        ) : index === 2 ? (
                          <Medal className="h-4 w-4 text-white" />
                        ) : (
                          <Users className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className={`text-xs ${user.textColor}`}>{user.rank}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-sm">{user.points}</p>
                            <p className="text-xs text-muted-foreground">points</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <div className="space-y-4">
              {/* User's achievements highlight */}
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div
                      className={`h-12 w-12 rounded-full flex items-center justify-center ${
                        sortedUsers.find((user) => user.name === userName || user.name === "You")?.badge ||
                        "bg-gradient-to-br from-blue-400 to-blue-600"
                      }`}
                    >
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Your Achievements</p>
                        <p className="text-sm">
                          {sortedUsers.find((user) => user.name === userName || user.name === "You")?.achievements || 5}{" "}
                          unlocked
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Level</p>
                        <p className="text-sm">
                          {sortedUsers.find((user) => user.name === userName || user.name === "You")?.level || 3}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievement leaderboard */}
              <div className="space-y-2">
                {sortedUsers
                  .sort((a, b) => b.achievements - a.achievements)
                  .map((user, index) => (
                    <motion.div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        user.name === userName || user.name === "You" ? "bg-muted/50" : ""
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-6 text-center font-medium text-sm">{index + 1}</div>
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${user.badge}`}>
                          <Trophy className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-sm">{user.name}</p>
                              <p className="text-xs text-muted-foreground">Level {user.level}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-sm">{user.achievements}</p>
                              <p className="text-xs text-muted-foreground">achievements</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Share2 className="h-4 w-4 mr-2" /> Share Your Progress
        </Button>
      </CardFooter>
    </Card>
  )
}
