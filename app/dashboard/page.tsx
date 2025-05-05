"use client"

import { Progress } from "@/components/ui/progress"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dumbbell, Settings, LogOut, BarChart3, Timer, Hash, Trophy } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WorkoutTimer from "../components/workout-timer"
import RepCounter from "../components/rep-counter"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/use-toast"
import Leaderboard from "../components/leaderboard"
import {
  calculateUserPoints,
  getUserRank,
  getNextRank,
  calculateProgressToNextRank,
  getPersonalizedWorkouts,
  getWelcomeMessage,
} from "@/lib/user-utils"

export default function DashboardPage() {
  const router = useRouter()
  const [userName, setUserName] = useState<string | null>(null)
  const [userExperience, setUserExperience] = useState<string | null>(null)
  const [userGoal, setUserGoal] = useState<string | null>(null)
  const [userEquipment, setUserEquipment] = useState<string | null>(null)
  const [userPoints, setUserPoints] = useState(0)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("workouts")

  // Check if user is logged in and has completed the quiz
  useEffect(() => {
    // Check for user in localStorage
    const user = localStorage.getItem("user")
    const quizCompleted = localStorage.getItem("quizCompleted")

    if (!user) {
      router.push("/account")
      return
    }

    if (!quizCompleted) {
      router.push("/quiz")
      return
    }

    const experience = localStorage.getItem("userExperience")
    const goal = localStorage.getItem("userGoal")
    const equipment = localStorage.getItem("userEquipment")

    setUserName(user)
    setUserExperience(experience)
    setUserGoal(goal)
    setUserEquipment(equipment)

    // Calculate user points based on name and experience
    const points = calculateUserPoints(user, experience)
    setUserPoints(points)

    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("quizCompleted")
    localStorage.removeItem("userExperience")
    localStorage.removeItem("userGoal")
    localStorage.removeItem("userEquipment")

    // Also clear cookies
    document.cookie = "user=; path=/; max-age=0"
    document.cookie = "quizCompleted=; path=/; max-age=0"
    document.cookie = "userExperience=; path=/; max-age=0"
    document.cookie = "userGoal=; path=/; max-age=0"
    document.cookie = "userEquipment=; path=/; max-age=0"

    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account",
    })
    router.push("/")
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // Get personalized workouts based on user preferences
  const workouts = getPersonalizedWorkouts(userExperience, userGoal, userEquipment)

  // Get personalized welcome message
  const welcomeMessage = getWelcomeMessage(userName, userExperience, userGoal)

  // Get user's current rank
  const userRankData = getUserRank(userPoints)
  const nextRankData = getNextRank(userRankData.name)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Dumbbell className="h-6 w-6" />
            <span>CalisthenicsPro</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/skills" className="text-sm font-medium hover:underline underline-offset-4">
              Skill Progressions
            </Link>
            <Link href="/exercises" className="text-sm font-medium hover:underline underline-offset-4">
              Exercise Library
            </Link>
            <Link href="/programs" className="text-sm font-medium hover:underline underline-offset-4">
              Programs
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="/account/profile" className="text-sm font-medium hover:underline underline-offset-4">
              My Account
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <motion.div variants={fadeIn} className="col-span-full">
              <h1 className="text-3xl font-bold tracking-tighter">Welcome, {userName}</h1>
              <p className="text-muted-foreground">{welcomeMessage}</p>
            </motion.div>

            <motion.div variants={fadeIn} className="col-span-full md:col-span-2">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>Choose a workout below or use our tools to track your training</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Welcome to your dashboard! This is where you can find workouts, track your progress, and access
                    training tools. To get started:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 mb-4">
                    <li>Choose a workout from the selection below</li>
                    <li>Use the timer to track your workout duration</li>
                    <li>Count your reps with the rep counter tool</li>
                    <li>Come back regularly to maintain your progress</li>
                  </ol>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn} className="col-span-full md:col-span-1">
              <Card
                className="border-t-4 h-full"
                style={{ borderTopColor: `hsl(var(--${userRankData.color.split("-")[1]}-500))` }}
              >
                <CardHeader>
                  <CardTitle>Your Rank: {userRankData.name}</CardTitle>
                  <CardDescription>{userPoints} points earned</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <div className={`h-20 w-20 rounded-full flex items-center justify-center ${userRankData.badge}`}>
                      <Trophy className="h-10 w-10 text-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={userRankData.textColor}>{userRankData.name}</span>
                      <span>{nextRankData.name}</span>
                    </div>
                    <Progress
                      value={calculateProgressToNextRank(userPoints, userRankData, nextRankData)}
                      className={`h-2 ${userRankData.color}`}
                    />
                    <p className="text-xs text-center text-muted-foreground">
                      {nextRankData.minPoints - userPoints} more points needed for next rank
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/account/profile" className="w-full">
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn} className="col-span-full">
              <Tabs defaultValue="workouts" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="workouts" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" /> Workouts
                  </TabsTrigger>
                  <TabsTrigger value="timer" className="flex items-center gap-2">
                    <Timer className="h-4 w-4" /> Timer
                  </TabsTrigger>
                  <TabsTrigger value="counter" className="flex items-center gap-2">
                    <Hash className="h-4 w-4" /> Counter
                  </TabsTrigger>
                  <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" /> Ranks
                  </TabsTrigger>
                </TabsList>

                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <TabsContent value="workouts" className="mt-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {workouts.map((workout, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.03, y: -5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Card className="overflow-hidden">
                            <div
                              className={`aspect-video w-full overflow-hidden bg-gradient-to-br ${workout.color} flex items-center justify-center text-4xl`}
                            >
                              {workout.icon}
                            </div>
                            <CardHeader className="p-4">
                              <CardTitle className="text-lg">{workout.title}</CardTitle>
                              <CardDescription>{workout.description}</CardDescription>
                            </CardHeader>
                            <CardFooter className="p-4 pt-0 flex justify-between">
                              <div className="text-sm">{workout.duration}</div>
                              <Button size="sm">Start</Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="timer" className="mt-6">
                    <div className="max-w-md mx-auto">
                      <WorkoutTimer />
                    </div>
                  </TabsContent>

                  <TabsContent value="counter" className="mt-6">
                    <div className="max-w-md mx-auto">
                      <RepCounter />
                    </div>
                  </TabsContent>

                  <TabsContent value="leaderboard" className="mt-6">
                    <div className="max-w-md mx-auto">
                      <Leaderboard />
                    </div>
                  </TabsContent>
                </motion.div>
              </Tabs>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 md:items-start md:gap-2">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <Dumbbell className="h-6 w-6" />
              <span>CalisthenicsPro</span>
            </Link>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              Your journey to bodyweight mastery starts here.
            </p>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-right">
            Made By Rohan Salem &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
