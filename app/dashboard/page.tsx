"use client"

import { Progress } from "@/components/ui/progress"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dumbbell, Settings, LogOut, Trophy, CheckCircle, AlertCircle, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/use-toast"
import RankUpNotification from "../components/rank-up-notification"
import DailyBonus from "../components/daily-bonus"
import PointsDisplay from "../components/points-display"
import { usePoints } from "@/lib/points-context"
import {
  getUserRank,
  getNextRank,
  calculateProgressToNextRank,
  getPersonalizedWorkouts,
  getWelcomeMessage,
  getRecommendedSkills,
} from "@/lib/user-utils"
import {
  saveCompletedWorkout,
  getCompletedWorkouts,
  getCompletedWorkoutCount,
  getCompletedSkillCount,
  getTotalExerciseCount,
  initializeUserData,
  recordActivity,
} from "@/lib/workout-utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function DashboardPage() {
  const router = useRouter()
  const { points: userPoints, refreshPoints } = usePoints()
  const [userName, setUserName] = useState<string | null>(null)
  const [userExperience, setUserExperience] = useState<string | null>(null)
  const [userGoal, setUserGoal] = useState<string | null>(null)
  const [userEquipment, setUserEquipment] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("workouts")
  const [recommendedSkills, setRecommendedSkills] = useState<any[]>([])
  const [completedWorkouts, setCompletedWorkouts] = useState<any[]>([])
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null)
  const [workoutDialogOpen, setWorkoutDialogOpen] = useState(false)
  const [workoutDuration, setWorkoutDuration] = useState(0)
  const [workoutCompleted, setWorkoutCompleted] = useState(false)
  const [earnedPoints, setEarnedPoints] = useState(0)
  const [rankUpNotification, setRankUpNotification] = useState<string | null>(null)
  const [stats, setStats] = useState({
    workouts: 0,
    achievements: 0,
    exercises: 0,
    skills: 0,
  })

  // Load user data
  const loadUserData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

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

      // Initialize user data if needed
      initializeUserData()

      const experience = localStorage.getItem("userExperience")
      const goal = localStorage.getItem("userGoal")
      const equipment = localStorage.getItem("userEquipment")

      setUserName(user)
      setUserExperience(experience)
      setUserGoal(goal)
      setUserEquipment(equipment)

      // Get completed workouts
      const completed = getCompletedWorkouts()
      setCompletedWorkouts(completed)

      // Refresh points from context
      refreshPoints()

      // Get recommended skills based on user preferences
      const skills = getRecommendedSkills(experience, goal)
      setRecommendedSkills(skills)

      // Get stats
      setStats({
        workouts: getCompletedWorkoutCount(),
        achievements: Math.min(getCompletedWorkoutCount() + getCompletedSkillCount(), 10), // Cap at 10 for now
        exercises: getTotalExerciseCount(),
        skills: getCompletedSkillCount(),
      })

      // Record dashboard visit (awards 5 points)
      recordActivity("visit", "Visited dashboard", 5)

      setLoading(false)
    } catch (err) {
      console.error("Error loading user data:", err)
      setError("Failed to load user data. Please try refreshing the page.")
      setLoading(false)
    }
  }, [router, refreshPoints])

  // Check if user is logged in and has completed the quiz
  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  // Listen for pointsUpdated events
  useEffect(() => {
    const handlePointsUpdated = () => {
      refreshPoints()
    }

    window.addEventListener("pointsUpdated", handlePointsUpdated)
    return () => {
      window.removeEventListener("pointsUpdated", handlePointsUpdated)
    }
  }, [refreshPoints])

  const handleLogout = () => {
    try {
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
    } catch (err) {
      console.error("Error during logout:", err)
      toast({
        title: "Error signing out",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleStartWorkout = (workout: any) => {
    // Record starting a workout (awards 10 points)
    recordActivity("workout", `Started ${workout.title}`, 10)
    refreshPoints() // Refresh points after recording activity

    setSelectedWorkout(workout)
    setWorkoutDialogOpen(true)
    setWorkoutDuration(0)
    setWorkoutCompleted(false)
    setEarnedPoints(0)
  }

  const handleCompleteWorkout = () => {
    try {
      if (!selectedWorkout) {
        toast({
          title: "Error",
          description: "No workout selected",
          variant: "destructive",
        })
        return
      }

      // Generate a unique ID for the workout
      const workoutId = `workout-${Date.now()}`

      // Get current rank before adding points
      const currentRank = getUserRank(userPoints)

      // Save the completed workout
      const completedWorkout = saveCompletedWorkout(
        workoutId,
        selectedWorkout.title,
        workoutDuration > 0 ? workoutDuration : Math.floor(Math.random() * 1200) + 600, // Random duration between 10-30 minutes if not set
      )

      if (!completedWorkout) {
        toast({
          title: "Error",
          description: "Failed to save workout",
          variant: "destructive",
        })
        return
      }

      // Update state
      refreshPoints() // Refresh points after completing workout
      setCompletedWorkouts([...completedWorkouts, completedWorkout])
      setEarnedPoints(completedWorkout.points)
      setWorkoutCompleted(true)

      // Check if user ranked up
      const newRank = getUserRank(userPoints + completedWorkout.points)
      if (newRank.name !== currentRank.name) {
        // Show rank up notification
        setRankUpNotification(newRank.name)
      }

      // Update stats
      setStats((prev) => ({
        ...prev,
        workouts: prev.workouts + 1,
        exercises: prev.exercises + 5, // Assume 5 exercises per workout
        achievements: Math.min(prev.achievements + 1, 10), // Cap at 10
      }))

      toast({
        title: "Workout completed!",
        description: `You earned ${completedWorkout.points} points!`,
      })
    } catch (err) {
      console.error("Error completing workout:", err)
      toast({
        title: "Error",
        description: "There was a problem completing your workout. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleTimeUpdate = (time: number) => {
    setWorkoutDuration(time)

    // Award points for every minute of workout time (1 point per minute)
    if (time % 60 === 0 && time > 0) {
      recordActivity("workout_time", "Workout time milestone", 1)
      refreshPoints() // Refresh points after recording activity
    }
  }

  const handleSaveTime = (time: number) => {
    if (time > 0) {
      // Record saving workout time (awards 5 points)
      recordActivity("save", "Saved workout time", 5)
      refreshPoints() // Refresh points after recording activity

      toast({
        title: "Time saved",
        description: `Workout time saved: ${Math.floor(time / 60)} minutes and ${time % 60} seconds`,
      })
    }
  }

  const handleTabChange = (value: string) => {
    // Record tab change (awards 2 points)
    recordActivity("navigation", `Switched to ${value} tab`, 2)
    refreshPoints() // Refresh points after recording activity
    setActiveTab(value)
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
          <p>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md p-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button className="mt-4 w-full" onClick={loadUserData}>
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
          </Button>
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
  const rankProgress = calculateProgressToNextRank(userPoints, userRankData, nextRankData)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl"
            onClick={() => recordActivity("navigation", "Navigated to home", 2)}
          >
            <Dumbbell className="h-6 w-6" />
            <span>CalisthenicsPro</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/skills"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => recordActivity("navigation", "Navigated to skills", 2)}
            >
              Skill Progressions
            </Link>
            <Link
              href="/exercises"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => recordActivity("navigation", "Navigated to exercises", 2)}
            >
              Exercise Library
            </Link>
            <Link
              href="/programs"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => recordActivity("navigation", "Navigated to programs", 2)}
            >
              Programs
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => recordActivity("navigation", "Navigated to about", 2)}
            >
              About
            </Link>
            <Link
              href="/account/profile"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => recordActivity("navigation", "Navigated to profile", 2)}
            >
              My Account
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                recordActivity("interaction", "Opened settings", 3)
                refreshPoints()
                toast({
                  title: "Settings",
                  description: "Settings feature coming soon!",
                })
              }}
            >
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
                    <li>Mark workouts as complete to earn points and rank up</li>
                  </ol>
                  <div className="bg-amber-100 p-3 rounded-md border border-amber-300">
                    <p className="text-amber-800 font-medium">Pro Tip: Earn Points with Every Action!</p>
                    <p className="text-sm text-amber-700">
                      Every activity you perform on the platform earns you points toward your next rank. Try different
                      features, complete workouts, and track your progress to rank up faster!
                    </p>
                  </div>
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
                    <Progress value={rankProgress} className={`h-2 ${userRankData.color}`} />
                    <p className="text-xs text-center text-muted-foreground">
                      {nextRankData.minPoints - userPoints} more points needed for next rank
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="/account/profile"
                    className="w-full"
                    onClick={() => recordActivity("navigation", "Viewed profile from rank card", 3)}
                  >
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Today's Stats */}
            <motion.div variants={fadeIn} className="col-span-full">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Stats</CardTitle>
                  <CardDescription>Your progress at a glance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center p-4 rounded-lg bg-primary/10">
                      <Dumbbell className="h-8 w-8 text-primary mb-2" />
                      <span className="text-2xl font-bold">{stats.workouts}</span>
                      <span className="text-sm text-muted-foreground">Workouts</span>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-lg bg-primary/10">
                      <Trophy className="h-8 w-8 text-primary mb-2" />
                      <span className="text-2xl font-bold">{stats.achievements}</span>
                      <span className="text-sm text-muted-foreground">Achievements</span>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-lg bg-primary/10">
                      <Dumbbell className="h-8 w-8 text-primary mb-2" />
                      <span className="text-2xl font-bold">{stats.exercises}</span>
                      <span className="text-sm text-muted-foreground">Exercises</span>
                    </div>
                    <div
                      className="flex flex-col items-center p-4 rounded-lg bg-primary/10 cursor-pointer"
                      onClick={() => {
                        recordActivity("interaction", "Viewed points details", 2)
                        refreshPoints()
                        toast({
                          title: "Points System",
                          description:
                            "Every activity earns you points! Complete workouts, view skills, and interact with the app to rank up.",
                        })
                      }}
                    >
                      <Settings className="h-8 w-8 text-primary mb-2" />
                      <span className="text-2xl font-bold">{userPoints}</span>
                      <span className="text-sm text-muted-foreground">Points</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Rest of the dashboard content */}
            {/* ... */}
          </motion.div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 md:items-start md:gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold"
              onClick={() => recordActivity("navigation", "Navigated to home from footer", 1)}
            >
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

      {/* Floating Points Display */}
      <PointsDisplay />

      {/* Workout Dialog */}
      <Dialog open={workoutDialogOpen} onOpenChange={setWorkoutDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedWorkout?.title}</DialogTitle>
            <DialogDescription>
              {workoutCompleted ? "Great job completing your workout!" : selectedWorkout?.description}
            </DialogDescription>
          </DialogHeader>

          {workoutCompleted ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Workout Complete!</h3>
              <p className="text-center text-muted-foreground">
                You've earned {earnedPoints} points for completing this workout.
              </p>
              <div className="flex items-center justify-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                <Trophy className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-600">+{earnedPoints} points</span>
              </div>
            </div>
          ) : (
            <div className="py-4">
              <p className="mb-4">Ready to start your workout?</p>
              <p className="text-sm text-muted-foreground">
                Click "Complete Workout" when you're done to earn points and track your progress.
              </p>
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setWorkoutDialogOpen(false)
                if (workoutCompleted) {
                  // Record closing completed workout dialog (awards 2 points)
                  recordActivity("interaction", "Closed completed workout dialog", 2)
                  refreshPoints()
                }
              }}
            >
              {workoutCompleted ? "Close" : "Cancel"}
            </Button>

            {!workoutCompleted && (
              <Button type="button" onClick={handleCompleteWorkout}>
                Complete Workout
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rank Up Notification */}
      {rankUpNotification && (
        <RankUpNotification rankName={rankUpNotification} onClose={() => setRankUpNotification(null)} />
      )}

      {/* Daily Bonus */}
      <DailyBonus />
    </div>
  )
}
