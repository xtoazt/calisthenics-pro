"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, ChevronLeft, LogOut, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/use-toast"
import { saveCompletedSkill, isSkillLevelCompleted, recordActivity } from "@/lib/workout-utils"

export default function SkillDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [userName, setUserName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [skill, setSkill] = useState<any>(null)
  const [completedLevels, setCompletedLevels] = useState<Record<string, boolean>>({})

  // Check if user is logged in and has completed the quiz
  useEffect(() => {
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

    setUserName(user)

    // Get skill data based on slug
    const skillSlug = params.skill as string
    const skillData = getSkillData(skillSlug)

    if (!skillData) {
      router.push("/skills")
      return
    }

    setSkill(skillData)

    // Check which levels are completed
    if (skillData) {
      const completed: Record<string, boolean> = {}
      skillData.progression.forEach((level: any) => {
        completed[level.name] = isSkillLevelCompleted(skillSlug, level.name)
      })
      setCompletedLevels(completed)
    }

    // Record the activity of viewing a skill detail page (awards 5 points)
    recordActivity("view", `Viewed ${skillData?.name || "skill"} details`, 5)

    setLoading(false)
  }, [router, params])

  const handleMarkAsCompleted = (levelName: string) => {
    if (!skill) return

    // Save the completed skill
    saveCompletedSkill(params.skill as string, skill.name, levelName)

    // Update state
    setCompletedLevels({
      ...completedLevels,
      [levelName]: true,
    })

    toast({
      title: "Level completed!",
      description: `You've completed the ${levelName} level of ${skill.name}!`,
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("quizCompleted")

    // Also clear cookies
    document.cookie = "user=; path=/; max-age=0"
    document.cookie = "quizCompleted=; path=/; max-age=0"

    router.push("/")
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
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
            <Link href="/account/profile" className="text-sm font-medium hover:underline underline-offset-4">
              My Account
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <motion.div initial="hidden" animate="visible" variants={staggerChildren} className="space-y-8">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // Record navigation activity (awards 2 points)
                  recordActivity("navigation", "Returned to skills list", 2)
                  router.push("/skills")
                }}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to Skills
              </Button>
            </div>

            <motion.div variants={fadeIn} className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{skill.name}</h1>
              <p className="max-w-[700px] text-muted-foreground">{skill.description}</p>
            </motion.div>

            <motion.div variants={fadeIn}>
              <div
                className={`w-full h-48 rounded-lg bg-gradient-to-br ${skill.levels[0].color} flex items-center justify-center mb-8`}
              >
                <span className="text-8xl">{skill.icon}</span>
              </div>

              <Tabs
                defaultValue="progression"
                className="w-full"
                onValueChange={(value) => {
                  // Record tab change activity (awards 3 points)
                  recordActivity("interaction", `Viewed ${value} tab for ${skill.name}`, 3)
                }}
              >
                <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
                  <TabsTrigger value="progression">Progression</TabsTrigger>
                  <TabsTrigger value="training">Training Tips</TabsTrigger>
                </TabsList>

                <TabsContent value="progression" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {skill.progression.map((level: any, index: number) => {
                      const isCompleted = completedLevels[level.name] || false

                      return (
                        <motion.div
                          key={index}
                          variants={fadeIn}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Card
                            className={`border-t-4 h-full ${isCompleted ? "border-green-500" : ""}`}
                            style={{
                              borderTopColor: isCompleted ? "#22c55e" : `hsl(var(--${level.color.split("-")[1]}-500))`,
                            }}
                          >
                            <CardHeader className="p-4">
                              <div className="flex justify-between items-center">
                                <CardTitle className={`text-xl ${isCompleted ? "text-green-700" : level.textColor}`}>
                                  {level.name}
                                  {isCompleted && <CheckCircle className="inline-block ml-2 h-5 w-5 text-green-600" />}
                                </CardTitle>
                                <div className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${level.badgeColor}`}>
                                  Level {index + 1}
                                </div>
                              </div>
                              <CardDescription>{level.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <ul className="space-y-2">
                                {level.steps.map((step: string, stepIndex: number) => (
                                  <li key={stepIndex} className="flex items-start gap-2">
                                    <div className="text-primary flex-shrink-0 mt-0.5">✅</div>
                                    <span>{step}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                              <Button
                                variant={isCompleted ? "outline" : "default"}
                                className={`w-full ${isCompleted ? "text-green-700 border-green-500" : ""}`}
                                onClick={() => handleMarkAsCompleted(level.name)}
                                disabled={isCompleted}
                              >
                                {isCompleted ? "Completed ✓" : "Mark as Completed"}
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="training" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Training Tips for {skill.name}</CardTitle>
                      <CardDescription>Follow these guidelines for optimal progress</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">Frequency</h3>
                        <p>{skill.tips.frequency}</p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Volume</h3>
                        <p>{skill.tips.volume}</p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Common Mistakes</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {skill.tips.mistakes.map((mistake: string, index: number) => (
                            <li key={index}>{mistake}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium">Complementary Exercises</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {skill.tips.complementary.map((exercise: string, index: number) => (
                            <li key={index}>{exercise}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
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

// Helper function to get skill data
function getSkillData(slug: string) {
  const skills = {
    "pull-ups": {
      name: "Pull-Ups",
      description: "Master the fundamental vertical pulling movement",
      icon: "💪",
      levels: [
        { name: "Beginner", color: "from-green-400/20 to-green-600/30" },
        { name: "Intermediate", color: "from-blue-400/20 to-blue-600/30" },
        { name: "Advanced", color: "from-purple-400/20 to-purple-600/30" },
        { name: "Elite", color: "from-amber-400/20 to-amber-600/30" },
      ],
      progression: [
        {
          name: "Beginner",
          description: "Building the foundation for pull-ups",
          color: "green",
          textColor: "text-green-800",
          badgeColor: "from-green-400/20 to-green-600/30",
          steps: [
            "Dead hangs: 3 sets of 20-30 seconds",
            "Scapular pulls: 3 sets of 5-8 reps",
            "Negative pull-ups: 3 sets of 3-5 reps",
            "Band-assisted pull-ups: 3 sets of 5-8 reps",
          ],
        },
        {
          name: "Intermediate",
          description: "Developing pull-up strength and endurance",
          color: "blue",
          textColor: "text-blue-800",
          badgeColor: "from-blue-400/20 to-blue-600/30",
          steps: [
            "Full pull-ups: 3 sets of 5-8 reps",
            "Chin-ups: 3 sets of 5-10 reps",
            "Scapular pull-ups: 3 sets of 8-12 reps",
            "Archer pull-ups: 3 sets of 3-5 reps per side",
          ],
        },
        {
          name: "Advanced",
          description: "Mastering pull-up variations",
          color: "purple",
          textColor: "text-purple-800",
          badgeColor: "from-purple-400/20 to-purple-600/30",
          steps: [
            "Wide grip pull-ups: 3 sets of 8-12 reps",
            "L-sit pull-ups: 3 sets of 5-8 reps",
            "Typewriter pull-ups: 3 sets of 5-8 reps",
            "Weighted pull-ups: 3 sets of 5-8 reps with 10-20% bodyweight",
          ],
        },
        {
          name: "Elite",
          description: "Advanced pull-up variations and one-arm preparation",
          color: "amber",
          textColor: "text-amber-800",
          badgeColor: "from-amber-400/20 to-amber-600/30",
          steps: [
            "Weighted pull-ups: 3 sets of 5-8 reps with 30-50% bodyweight",
            "Archer pull-ups: 3 sets of 8-10 reps per side",
            "One-arm negative pull-ups: 3 sets of 3-5 reps per side",
            "One-arm pull-up progressions: 3 sets of 1-3 reps per side",
          ],
        },
      ],
      tips: {
        frequency: "Train pull-ups 2-3 times per week with at least 48 hours of rest between sessions.",
        volume: "Aim for 40-60 total reps per session, spread across multiple sets. Focus on quality over quantity.",
        mistakes: [
          "Using momentum and swinging the body",
          "Incomplete range of motion",
          "Poor scapular control",
          "Improper grip width",
        ],
        complementary: [
          "Rows (horizontal pulling)",
          "Scapular retraction exercises",
          "Grip training",
          "Core strengthening exercises",
        ],
      },
    },
    "push-ups": {
      name: "Push-Ups",
      description: "Build pushing strength with progressive variations",
      icon: "👐",
      levels: [
        { name: "Beginner", color: "from-green-400/20 to-green-600/30" },
        { name: "Intermediate", color: "from-blue-400/20 to-blue-600/30" },
        { name: "Advanced", color: "from-purple-400/20 to-purple-600/30" },
        { name: "Elite", color: "from-amber-400/20 to-amber-600/30" },
      ],
      progression: [
        {
          name: "Beginner",
          description: "Building the foundation for push-ups",
          color: "green",
          textColor: "text-green-800",
          badgeColor: "from-green-400/20 to-green-600/30",
          steps: [
            "Wall push-ups: 3 sets of 10-15 reps",
            "Incline push-ups: 3 sets of 8-12 reps",
            "Knee push-ups: 3 sets of 8-12 reps",
            "Negative push-ups: 3 sets of 5-8 reps",
          ],
        },
        {
          name: "Intermediate",
          description: "Developing push-up strength and endurance",
          color: "blue",
          textColor: "text-blue-800",
          badgeColor: "from-blue-400/20 to-blue-600/30",
          steps: [
            "Full push-ups: 3 sets of 10-15 reps",
            "Diamond push-ups: 3 sets of 8-12 reps",
            "Wide push-ups: 3 sets of 10-15 reps",
            "Archer push-ups: 3 sets of 5-8 reps per side",
          ],
        },
        {
          name: "Advanced",
          description: "Mastering push-up variations",
          color: "purple",
          textColor: "text-purple-800",
          badgeColor: "from-purple-400/20 to-purple-600/30",
          steps: [
            "Decline push-ups: 3 sets of 10-15 reps",
            "Pseudo planche push-ups: 3 sets of 8-12 reps",
            "Ring push-ups: 3 sets of 8-12 reps",
            "One-arm push-up progressions: 3 sets of 5-8 reps",
          ],
        },
        {
          name: "Elite",
          description: "Advanced push-up variations",
          color: "amber",
          textColor: "text-amber-800",
          badgeColor: "from-amber-400/20 to-amber-600/30",
          steps: [
            "One-arm push-ups: 3 sets of 3-5 reps per side",
            "Planche push-up progressions: 3 sets of 5-8 reps",
            "Ring RTO push-ups: 3 sets of 8-12 reps",
            "Handstand push-up progressions: 3 sets of 3-5 reps",
          ],
        },
      ],
      tips: {
        frequency: "Train push-ups 2-3 times per week with at least 48 hours of rest between sessions.",
        volume: "Aim for 50-100 total reps per session, spread across multiple sets. Focus on quality over quantity.",
        mistakes: [
          "Sagging hips or lower back",
          "Flaring elbows too wide",
          "Incomplete range of motion",
          "Poor scapular control",
        ],
        complementary: [
          "Dips (vertical pushing)",
          "Plank variations for core strength",
          "Scapular protraction exercises",
          "Shoulder mobility exercises",
        ],
      },
    },
    // Additional skills data...
  }

  return skills[slug as keyof typeof skills] || null
}
