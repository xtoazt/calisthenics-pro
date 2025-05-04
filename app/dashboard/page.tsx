"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dumbbell, Award, Settings, LogOut, BarChart3, Calendar, Users, Utensils } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WorkoutTimer from "../components/workout-timer"
import ProgressGallery from "../components/progress-gallery"
import AchievementBadges from "../components/achievement-badges"
import NutritionGuide from "../components/nutrition-guide"
import CommunityFeed from "../components/community-feed"
import { motion, AnimatePresence } from "framer-motion"

export default function DashboardPage() {
  const [userProfile, setUserProfile] = useState({
    name: "User",
    goal: "Build Strength & Learn Skills",
    level: "Intermediate",
    daysCompleted: 12,
    totalWorkouts: 36,
    streak: 3,
    nextWorkout: "Upper Body Push",
    recommendedSkills: [
      { name: "Pull-Up Progression", progress: 65, level: "Negative Pull-Ups" },
      { name: "Handstand Progression", progress: 40, level: "Wall Handstand" },
      { name: "L-Sit Progression", progress: 25, level: "Tucked L-Sit" },
    ],
    weeklySchedule: [
      { day: "Monday", workout: "Upper Body Push", completed: true },
      { day: "Tuesday", workout: "Rest Day", completed: true },
      { day: "Wednesday", workout: "Upper Body Pull", completed: true },
      { day: "Thursday", workout: "Rest Day", completed: false },
      { day: "Friday", workout: "Lower Body & Core", completed: false },
      { day: "Saturday", workout: "Skill Work", completed: false },
      { day: "Sunday", workout: "Rest Day", completed: false },
    ],
    recommendedWorkouts: [],
  })

  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("workouts")

  // Load personalized plan from localStorage
  useEffect(() => {
    const loadPersonalizedPlan = () => {
      setLoading(true)

      const savedPlan = localStorage.getItem("calisthenics-personalized-plan")
      if (savedPlan) {
        const plan = JSON.parse(savedPlan)

        // Update user profile with personalized plan data
        setUserProfile((prev) => ({
          ...prev,
          goal: plan.goal || prev.goal,
          level: plan.level || prev.level,
          recommendedSkills: plan.recommendedSkills || prev.recommendedSkills,
          recommendedWorkouts: plan.recommendedWorkouts || [],
          // Calculate total workouts based on workouts per week
          totalWorkouts: plan.workoutsPerWeek ? plan.workoutsPerWeek * 12 : prev.totalWorkouts,
        }))
      }

      // Simulate loading delay for animation
      setTimeout(() => {
        setLoading(false)
      }, 800)
    }

    loadPersonalizedPlan()
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

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
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full mb-4"
              />
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl font-medium"
              >
                Loading your personalized dashboard...
              </motion.h2>
            </div>
          ) : (
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
                <h1 className="text-3xl font-bold tracking-tighter">Welcome to Your Dashboard</h1>
                <p className="text-muted-foreground">
                  Your personalized calisthenics training program based on your quiz results.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="col-span-full md:col-span-2 lg:col-span-2">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Your Training Program</CardTitle>
                    <CardDescription>
                      Goal: {userProfile.goal} | Level: {userProfile.level}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Card>
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm font-medium">Progress</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold">
                              {Math.round((userProfile.daysCompleted / userProfile.totalWorkouts) * 100)}%
                            </div>
                            <Progress
                              value={(userProfile.daysCompleted / userProfile.totalWorkouts) * 100}
                              className="h-2 mt-2"
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                              {userProfile.daysCompleted} of {userProfile.totalWorkouts} workouts completed
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Card>
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm font-medium">Streak</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold">{userProfile.streak} days</div>
                            <p className="text-xs text-muted-foreground mt-2">
                              Keep it going! Your longest streak was 7 days.
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Card>
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm font-medium">Next Workout</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold">{userProfile.nextWorkout}</div>
                            <p className="text-xs text-muted-foreground mt-2">Scheduled for today</p>
                          </CardContent>
                        </Card>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Card>
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="text-2xl font-bold">3 of 4</div>
                            <Progress value={75} className="h-2 mt-2" />
                            <p className="text-xs text-muted-foreground mt-2">
                              1 more workout to reach your weekly goal
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-bold mb-4">Weekly Schedule</h3>
                      <div className="grid gap-2 md:grid-cols-7">
                        {userProfile.weeklySchedule.map((day, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Card className={day.completed ? "bg-muted" : ""}>
                              <CardHeader className="p-3 pb-1">
                                <CardTitle className="text-sm font-medium">{day.day}</CardTitle>
                              </CardHeader>
                              <CardContent className="p-3 pt-0">
                                <p className="text-xs">{day.workout}</p>
                                {day.completed && (
                                  <div className="flex items-center mt-1 text-xs text-green-500">
                                    <Award className="h-3 w-3 mr-1" /> Completed
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Start Today's Workout</Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn} className="col-span-full md:col-span-1 lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Skill Progressions</CardTitle>
                    <CardDescription>Track your progress on key skills</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userProfile.recommendedSkills.map((skill, index) => (
                        <motion.div
                          key={index}
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex justify-between">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-sm">{skill.progress}%</span>
                          </div>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            className="relative"
                          >
                            <Progress value={skill.progress} className="h-2" />
                          </motion.div>
                          <p className="text-xs text-muted-foreground">Current level: {skill.level}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Skills
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn} className="col-span-full">
                <Tabs defaultValue="workouts" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-5 w-full">
                    <TabsTrigger value="workouts" className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" /> Workouts
                    </TabsTrigger>
                    <TabsTrigger value="timer" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> Timer
                    </TabsTrigger>
                    <TabsTrigger value="progress" className="flex items-center gap-2">
                      <Award className="h-4 w-4" /> Progress
                    </TabsTrigger>
                    <TabsTrigger value="nutrition" className="flex items-center gap-2">
                      <Utensils className="h-4 w-4" /> Nutrition
                    </TabsTrigger>
                    <TabsTrigger value="community" className="flex items-center gap-2">
                      <Users className="h-4 w-4" /> Community
                    </TabsTrigger>
                  </TabsList>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TabsContent value="workouts" className="mt-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {(userProfile.recommendedWorkouts.length > 0
                            ? userProfile.recommendedWorkouts
                            : [
                                {
                                  title: "Full Body Basics",
                                  description: "A complete workout focusing on fundamental movements",
                                  duration: "30-45 min",
                                  image: "/images/workouts/full-body.png",
                                },
                                {
                                  title: "Upper Body Focus",
                                  description: "Build strength in your chest, back, and arms",
                                  duration: "30-45 min",
                                  image: "/images/workouts/upper-body.png",
                                },
                                {
                                  title: "Core Foundations",
                                  description: "Develop a strong and stable midsection",
                                  duration: "20-30 min",
                                  image: "/images/workouts/core.png",
                                },
                                {
                                  title: "Lower Body Power",
                                  description: "Build strength and explosiveness in your legs",
                                  duration: "30-40 min",
                                  image: "/images/workouts/lower-body.png",
                                },
                                {
                                  title: "Skill Development",
                                  description: "Focus on progressions for advanced skills",
                                  duration: "45-60 min",
                                  image: "/images/workouts/skills.png",
                                },
                                {
                                  title: "HIIT Cardio",
                                  description: "High-intensity interval training for conditioning",
                                  duration: "20-30 min",
                                  image: "/images/workouts/hiit.png",
                                },
                              ]
                          ).map((workout, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ scale: 1.03, y: -5 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <Card className="overflow-hidden">
                                <div className="aspect-video w-full overflow-hidden">
                                  <Image
                                    src={workout.image || "/images/workouts/default.png"}
                                    alt={workout.title}
                                    width={250}
                                    height={150}
                                    className="object-cover w-full h-full"
                                  />
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

                      <TabsContent value="progress" className="mt-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <ProgressGallery />
                          <AchievementBadges />
                        </div>
                      </TabsContent>

                      <TabsContent value="nutrition" className="mt-6">
                        <NutritionGuide />
                      </TabsContent>

                      <TabsContent value="community" className="mt-6">
                        <CommunityFeed />
                      </TabsContent>
                    </motion.div>
                  </AnimatePresence>
                </Tabs>
              </motion.div>
            </motion.div>
          )}
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
            Made By Rohan &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
