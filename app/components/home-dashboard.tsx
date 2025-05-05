"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, Clock, Trophy, BookOpen, Dices, Calendar, BarChart, Settings, User } from "lucide-react"
import { motion } from "framer-motion"
import { getUserRank, getNextRank, calculateProgressToNextRank } from "@/lib/user-utils"
import { Progress } from "@/components/ui/progress"

export default function HomeDashboard({ userName, userPoints }: { userName: string; userPoints: number }) {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format time as HH:MM:SS
  const formattedTime = currentTime.toLocaleTimeString()

  // Format date as Day, Month Date, Year
  const formattedDate = currentTime.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Get user's rank information
  const userRank = getUserRank(userPoints)
  const nextRank = getNextRank(userRank.name)
  const progressPercentage = calculateProgressToNextRank(userPoints, userRank, nextRank)

  // Quick links
  const quickLinks = [
    { name: "Workouts", icon: <Dumbbell className="h-5 w-5" />, href: "/dashboard" },
    { name: "Skills", icon: <Trophy className="h-5 w-5" />, href: "/skills" },
    { name: "Exercises", icon: <BookOpen className="h-5 w-5" />, href: "/exercises" },
    { name: "Programs", icon: <Calendar className="h-5 w-5" />, href: "/programs" },
    { name: "Profile", icon: <User className="h-5 w-5" />, href: "/account/profile" },
    { name: "Quiz", icon: <Dices className="h-5 w-5" />, href: "/quiz" },
  ]

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
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
      {/* Welcome and Time Card */}
      <motion.div variants={fadeIn} className="col-span-full md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back, {userName}</CardTitle>
            <CardDescription>{formattedDate}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Clock className="h-10 w-10 text-primary" />
              <div className="text-3xl font-bold">{formattedTime}</div>
            </div>
            <p className="mt-4">
              Ready to continue your calisthenics journey? Choose a quick link below or head to your dashboard for
              today's workout.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Rank Card */}
      <motion.div variants={fadeIn} className="col-span-full md:col-span-1">
        <Card className="border-t-4" style={{ borderTopColor: `hsl(var(--${userRank.color.split("-")[1]}-500))` }}>
          <CardHeader>
            <CardTitle>Your Rank</CardTitle>
            <CardDescription>{userPoints} points earned</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className={`h-20 w-20 rounded-full flex items-center justify-center ${userRank.badge}`}>
                <Trophy className="h-10 w-10 text-white" />
              </div>
            </div>

            <div className="text-center">
              <h3 className={`text-xl font-bold ${userRank.textColor}`}>{userRank.name}</h3>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={userRank.textColor}>{userRank.name}</span>
                <span>{nextRank.name}</span>
              </div>
              <Progress value={progressPercentage} className={`h-2 ${userRank.color}`} />
              <p className="text-xs text-center text-muted-foreground">
                {nextRank.minPoints - userPoints} more points needed for next rank
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Links */}
      <motion.div variants={fadeIn} className="col-span-full">
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Access your most important pages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {quickLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted transition-colors text-center">
                    <div className="p-2 rounded-full bg-primary/10">{link.icon}</div>
                    <span className="text-sm font-medium">{link.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Summary */}
      <motion.div variants={fadeIn} className="col-span-full">
        <Card>
          <CardHeader>
            <CardTitle>Today's Stats</CardTitle>
            <CardDescription>Your progress at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 rounded-lg bg-primary/10">
                <BarChart className="h-8 w-8 text-primary mb-2" />
                <span className="text-2xl font-bold">0</span>
                <span className="text-sm text-muted-foreground">Workouts</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-primary/10">
                <Trophy className="h-8 w-8 text-primary mb-2" />
                <span className="text-2xl font-bold">2</span>
                <span className="text-sm text-muted-foreground">Achievements</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-primary/10">
                <Dumbbell className="h-8 w-8 text-primary mb-2" />
                <span className="text-2xl font-bold">0</span>
                <span className="text-sm text-muted-foreground">Exercises</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-primary/10">
                <Settings className="h-8 w-8 text-primary mb-2" />
                <span className="text-2xl font-bold">{userPoints}</span>
                <span className="text-sm text-muted-foreground">Points</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">Complete workouts to update your stats</p>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}
