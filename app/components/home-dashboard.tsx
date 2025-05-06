"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dumbbell,
  Clock,
  Trophy,
  BookOpen,
  Dices,
  Calendar,
  Settings,
  User,
  ChevronRight,
  Activity,
} from "lucide-react"
import { motion } from "framer-motion"
import { getUserRank, getNextRank, calculateProgressToNextRank, getRecommendedSkills } from "@/lib/user-utils"
import { Progress } from "@/components/ui/progress"
import { getActivities, recordActivity } from "@/lib/workout-utils"

export default function HomeDashboard({
  userName,
  userPoints,
  userExperience,
  userGoal,
}: {
  userName: string
  userPoints: number
  userExperience: string | null
  userGoal: string | null
}) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [recommendedSkills, setRecommendedSkills] = useState<any[]>([])
  const [recentActivities, setRecentActivities] = useState<any[]>([])

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Get recommended skills based on user preferences
    const skills = getRecommendedSkills(userExperience, userGoal)
    setRecommendedSkills(skills)

    // Get recent activities
    const activities = getActivities().slice(-5).reverse()
    setRecentActivities(activities)

    // Record dashboard view (awards 3 points)
    recordActivity("view", "Viewed home dashboard", 3)

    return () => clearInterval(timer)
  }, [userExperience, userGoal])

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

  // Format activity time
  const formatActivityTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return "just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return date.toLocaleDateString()
  }

  // Get activity icon
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "workout":
        return <Dumbbell className="h-4 w-4 text-green-500" />
      case "view":
        return <BookOpen className="h-4 w-4 text-blue-500" />
      case "navigation":
        return <ChevronRight className="h-4 w-4 text-purple-500" />
      case "interaction":
        return <Activity className="h-4 w-4 text-amber-500" />
      case "exercise":
        return <Activity className="h-4 w-4 text-red-500" />
      case "tool":
        return <Settings className="h-4 w-4 text-indigo-500" />
      case "milestone":
        return <Trophy className="h-4 w-4 text-yellow-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
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
            <Link href="/dashboard" onClick={() => recordActivity("navigation", "Navigated to dashboard from home", 2)}>
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
                <Link
                  key={index}
                  href={link.href}
                  onClick={() =>
                    recordActivity("navigation", `Navigated to ${link.name.toLowerCase()} from quick links`, 2)
                  }
                >
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

      {/* Recent Activities */}
      <motion.div variants={fadeIn} className="col-span-full md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest actions and points earned</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivities.length > 0 ? (
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-muted">{getActivityIcon(activity.type)}</div>
                      <div>
                        <p className="text-sm font-medium">{activity.name}</p>
                        <p className="text-xs text-muted-foreground">{formatActivityTime(activity.completedAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                      +{activity.points}
                      <Trophy className="h-3.5 w-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>No activities yet. Start exploring to earn points!</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Every action you take on the platform earns you points toward your next rank!
            </p>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Stats Summary */}
      <motion.div variants={fadeIn} className="col-span-full md:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Points Summary</CardTitle>
            <CardDescription>Your progress at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center p-4 rounded-lg bg-primary/10">
              <Settings className="h-8 w-8 text-primary mb-2" />
              <span className="text-3xl font-bold">{userPoints}</span>
              <span className="text-sm text-muted-foreground">Total Points</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current Rank</span>
                <span className={userRank.textColor}>{userRank.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Next Rank</span>
                <span>{nextRank.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Points Needed</span>
                <span>{nextRank.minPoints - userPoints}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full bg-amber-100 p-2 rounded-md text-xs text-amber-800">
              <p className="font-medium">Pro Tip:</p>
              <p>Complete workouts, track skills, and interact with the app to earn more points!</p>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Recommended Skills Based on Quiz */}
      {recommendedSkills.length > 0 && (
        <motion.div variants={fadeIn} className="col-span-full">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Skills</CardTitle>
              <CardDescription>Based on your experience level and goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {recommendedSkills.slice(0, 3).map((skill, index) => (
                  <Link
                    key={index}
                    href={`/skills/${skill.slug}`}
                    onClick={() => recordActivity("navigation", `Viewed ${skill.name} skill from recommendations`, 3)}
                  >
                    <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">{skill.name}</CardTitle>
                        <CardDescription className="text-xs">{skill.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="ghost" size="sm" className="w-full justify-between">
                          View Skill <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href="/skills"
                className="w-full"
                onClick={() => recordActivity("navigation", "Viewed all skills from recommendations", 3)}
              >
                <Button variant="outline" className="w-full">
                  View All Skills
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
