"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, ChevronLeft, LogOut, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export default function SkillDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [userName, setUserName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [skill, setSkill] = useState<any>(null)

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
    setLoading(false)
  }, [router, params])

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
              <Button variant="ghost" size="sm" onClick={() => router.push("/skills")}>
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
                <span className="text-6xl">{skill.icon}</span>
              </div>

              <Tabs defaultValue="progression" className="w-full">
                <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
                  <TabsTrigger value="progression">Progression</TabsTrigger>
                  <TabsTrigger value="training">Training Tips</TabsTrigger>
                </TabsList>

                <TabsContent value="progression" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {skill.progression.map((level: any, index: number) => (
                      <motion.div
                        key={index}
                        variants={fadeIn}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Card
                          className={`border-t-4 h-full`}
                          style={{ borderTopColor: `hsl(var(--${level.color.split("-")[1]}-500))` }}
                        >
                          <CardHeader className="p-4">
                            <div className="flex justify-between items-center">
                              <CardTitle className={`text-xl ${level.textColor}`}>{level.name}</CardTitle>
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
                                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter className="p-4 pt-0">
                            <Button variant="outline" className="w-full">
                              Mark as Completed
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
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
    dips: {
      name: "Dips",
      description: "Develop triceps and chest strength",
      icon: "🔄",
      levels: [
        { name: "Beginner", color: "from-green-400/20 to-green-600/30" },
        { name: "Intermediate", color: "from-blue-400/20 to-blue-600/30" },
        { name: "Advanced", color: "from-purple-400/20 to-purple-600/30" },
        { name: "Elite", color: "from-amber-400/20 to-amber-600/30" },
      ],
      progression: [
        {
          name: "Beginner",
          description: "Building the foundation for dips",
          color: "green",
          textColor: "text-green-800",
          badgeColor: "from-green-400/20 to-green-600/30",
          steps: [
            "Bench dips: 3 sets of 8-12 reps",
            "Straight bar support hold: 3 sets of 20-30 seconds",
            "Negative dips: 3 sets of 5-8 reps",
            "Band-assisted dips: 3 sets of 5-8 reps",
          ],
        },
        {
          name: "Intermediate",
          description: "Developing dip strength and endurance",
          color: "blue",
          textColor: "text-blue-800",
          badgeColor: "from-blue-400/20 to-blue-600/30",
          steps: [
            "Parallel bar dips: 3 sets of 8-12 reps",
            "Straight bar dips: 3 sets of 5-8 reps",
            "L-sit dip holds: 3 sets of 10-15 seconds",
            "Tempo dips (slow eccentric): 3 sets of 5-8 reps",
          ],
        },
        {
          name: "Advanced",
          description: "Mastering dip variations",
          color: "purple",
          textColor: "text-purple-800",
          badgeColor: "from-purple-400/20 to-purple-600/30",
          steps: [
            "Ring dips: 3 sets of 5-8 reps",
            "L-sit dips: 3 sets of 5-8 reps",
            "Korean dips: 3 sets of 3-5 reps",
            "Weighted dips: 3 sets of 5-8 reps with 10-20% bodyweight",
          ],
        },
        {
          name: "Elite",
          description: "Advanced dip variations",
          color: "amber",
          textColor: "text-amber-800",
          badgeColor: "from-amber-400/20 to-amber-600/30",
          steps: [
            "Weighted ring dips: 3 sets of 5-8 reps with 20-30% bodyweight",
            "Bulgarian dips: 3 sets of 5-8 reps",
            "Russian dips: 3 sets of 5-8 reps",
            "Ring RTO dips: 3 sets of 5-8 reps",
          ],
        },
      ],
      tips: {
        frequency: "Train dips 2-3 times per week with at least 48 hours of rest between sessions.",
        volume: "Aim for 30-50 total reps per session, spread across multiple sets. Focus on quality over quantity.",
        mistakes: [
          "Insufficient depth",
          "Hunching shoulders",
          "Flaring elbows too wide",
          "Leaning too far forward or backward",
        ],
        complementary: [
          "Push-ups (horizontal pushing)",
          "Tricep extensions",
          "Chest flies",
          "Shoulder mobility exercises",
        ],
      },
    },
    handstand: {
      name: "Handstand",
      description: "Master the art of balance and shoulder strength",
      icon: "🤸",
      levels: [
        { name: "Beginner", color: "from-green-400/20 to-green-600/30" },
        { name: "Intermediate", color: "from-blue-400/20 to-blue-600/30" },
        { name: "Advanced", color: "from-purple-400/20 to-purple-600/30" },
        { name: "Elite", color: "from-amber-400/20 to-amber-600/30" },
      ],
      progression: [
        {
          name: "Beginner",
          description: "Building the foundation for handstands",
          color: "green",
          textColor: "text-green-800",
          badgeColor: "from-green-400/20 to-green-600/30",
          steps: [
            "Wall plank: 3 sets of 30-60 seconds",
            "Pike hold: 3 sets of 30-60 seconds",
            "Wall walks: 3 sets of 5-8 reps",
            "Back-to-wall handstand: 3 sets of 20-30 seconds",
          ],
        },
        {
          name: "Intermediate",
          description: "Developing handstand balance and endurance",
          color: "blue",
          textColor: "text-blue-800",
          badgeColor: "from-blue-400/20 to-blue-600/30",
          steps: [
            "Chest-to-wall handstand: 3 sets of 30-60 seconds",
            "Wall handstand shoulder taps: 3 sets of 5-8 reps per side",
            "Toe pulls: 3 sets of 5-8 reps",
            "Heel pulls: 3 sets of 5-8 reps",
          ],
        },
        {
          name: "Advanced",
          description: "Mastering freestanding handstands",
          color: "purple",
          textColor: "text-purple-800",
          badgeColor: "from-purple-400/20 to-purple-600/30",
          steps: [
            "Freestanding handstand: 3 sets of 10-30 seconds",
            "Handstand pirouettes: 3 sets of 3-5 reps per side",
            "Handstand walking: 3 sets of 5-10 steps",
            "Tuck handstand: 3 sets of 5-10 seconds",
          ],
        },
        {
          name: "Elite",
          description: "Advanced handstand variations",
          color: "amber",
          textColor: "text-amber-800",
          badgeColor: "from-amber-400/20 to-amber-600/30",
          steps: [
            "One-arm handstand progressions: 3 sets of 5-10 seconds",
            "Handstand push-ups: 3 sets of 3-5 reps",
            "Straddle handstand: 3 sets of 10-20 seconds",
            "Press to handstand: 3 sets of 3-5 reps",
          ],
        },
      ],
      tips: {
        frequency: "Practice handstands 3-5 times per week, with shorter but more frequent sessions.",
        volume: "Aim for 10-15 minutes of total handstand practice per session, focusing on quality holds.",
        mistakes: [
          "Arched back",
          "Bent arms",
          "Looking at the floor instead of between hands",
          "Insufficient shoulder flexibility",
        ],
        complementary: [
          "Pike stretches",
          "Shoulder mobility exercises",
          "Hollow body holds",
          "Wrist conditioning exercises",
        ],
      },
    },
    planche: {
      name: "Planche",
      description: "The ultimate test of upper body strength",
      icon: "💯",
      levels: [
        { name: "Beginner", color: "from-green-400/20 to-green-600/30" },
        { name: "Intermediate", color: "from-blue-400/20 to-blue-600/30" },
        { name: "Advanced", color: "from-purple-400/20 to-purple-600/30" },
        { name: "Elite", color: "from-amber-400/20 to-amber-600/30" },
      ],
      progression: [
        {
          name: "Beginner",
          description: "Building the foundation for planche",
          color: "green",
          textColor: "text-green-800",
          badgeColor: "from-green-400/20 to-green-600/30",
          steps: [
            "Plank: 3 sets of 30-60 seconds",
            "Pseudo planche leans: 3 sets of 10-15 seconds",
            "Frog stand: 3 sets of 20-30 seconds",
            "Advanced frog stand: 3 sets of 10-20 seconds",
          ],
        },
        {
          name: "Intermediate",
          description: "Developing planche strength",
          color: "blue",
          textColor: "text-blue-800",
          badgeColor: "from-blue-400/20 to-blue-600/30",
          steps: [
            "Tuck planche: 3 sets of 10-20 seconds",
            "Advanced tuck planche: 3 sets of 5-15 seconds",
            "Tuck planche push-ups: 3 sets of 3-5 reps",
            "One-leg tuck planche: 3 sets of 5-10 seconds",
          ],
        },
        {
          name: "Advanced",
          description: "Mastering planche variations",
          color: "purple",
          textColor: "text-purple-800",
          badgeColor: "from-purple-400/20 to-purple-600/30",
          steps: [
            "Straddle planche: 3 sets of 5-10 seconds",
            "Half-lay planche: 3 sets of 3-8 seconds",
            "Straddle planche push-up negatives: 3 sets of 2-3 reps",
            "Planche leans with elevated feet: 3 sets of 10-15 seconds",
          ],
        },
        {
          name: "Elite",
          description: "Advanced planche variations",
          color: "amber",
          textColor: "text-amber-800",
          badgeColor: "from-amber-400/20 to-amber-600/30",
          steps: [
            "Full planche: 3 sets of 3-8 seconds",
            "Planche push-up progressions: 3 sets of 1-3 reps",
            "One-arm planche progressions: 3 sets of 2-5 seconds",
            "Maltese cross progressions: 3 sets of 2-5 seconds",
          ],
        },
      ],
      tips: {
        frequency: "Train planche 2-3 times per week with at least 48-72 hours of rest between sessions.",
        volume: "Keep total hold time under 60 seconds per session for maximum strength gains.",
        mistakes: [
          "Insufficient protraction of shoulders",
          "Bent arms",
          "Piked hips",
          "Insufficient wrist preparation",
        ],
        complementary: [
          "Pseudo planche push-ups",
          "Plank variations",
          "Straight arm strength exercises",
          "Wrist conditioning exercises",
        ],
      },
    },
    "front-lever": {
      name: "Front Lever",
      description: "Build incredible core and back strength",
      icon: "⬆️",
      levels: [
        { name: "Beginner", color: "from-green-400/20 to-green-600/30" },
        { name: "Intermediate", color: "from-blue-400/20 to-blue-600/30" },
        { name: "Advanced", color: "from-purple-400/20 to-purple-600/30" },
        { name: "Elite", color: "from-amber-400/20 to-amber-600/30" },
      ],
      progression: [
        {
          name: "Beginner",
          description: "Building the foundation for front lever",
          color: "green",
          textColor: "text-green-800",
          badgeColor: "from-green-400/20 to-green-600/30",
          steps: [
            "Dead hang: 3 sets of 30-60 seconds",
            "Arch hang: 3 sets of 20-30 seconds",
            "Tuck front lever: 3 sets of 10-15 seconds",
            "Tuck front lever pulls: 3 sets of 3-5 reps",
          ],
        },
        {
          name: "Intermediate",
          description: "Developing front lever strength",
          color: "blue",
          textColor: "text-blue-800",
          badgeColor: "from-blue-400/20 to-blue-600/30",
          steps: [
            "Advanced tuck front lever: 3 sets of 10-15 seconds",
            "Single leg front lever: 3 sets of 5-10 seconds per leg",
            "Advanced tuck front lever pulls: 3 sets of 3-5 reps",
            "Front lever negatives: 3 sets of 3-5 reps",
          ],
        },
        {
          name: "Advanced",
          description: "Mastering front lever variations",
          color: "purple",
          textColor: "text-purple-800",
          badgeColor: "from-purple-400/20 to-purple-600/30",
          steps: [
            "Straddle front lever: 3 sets of 5-10 seconds",
            "Half-lay front lever: 3 sets of 5-8 seconds",
            "Straddle front lever pulls: 3 sets of 3-5 reps",
            "Ice cream maker: 3 sets of 3-5 reps",
          ],
        },
        {
          name: "Elite",
          description: "Advanced front lever variations",
          color: "amber",
          textColor: "text-amber-800",
          badgeColor: "from-amber-400/20 to-amber-600/30",
          steps: [
            "Full front lever: 3 sets of 5-10 seconds",
            "Front lever pulls: 3 sets of 3-5 reps",
            "Weighted front lever: 3 sets of 3-5 seconds",
            "One-arm front lever progressions: 3 sets of 2-5 seconds",
          ],
        },
      ],
      tips: {
        frequency: "Train front lever 2-3 times per week with at least 48-72 hours of rest between sessions.",
        volume: "Keep total hold time under 60 seconds per session for maximum strength gains.",
        mistakes: ["Bent arms", "Piked hips", "Insufficient scapular depression", "Arched back"],
        complementary: [
          "Pull-ups and rows",
          "Hollow body holds",
          "Hanging leg raises",
          "Scapular depression exercises",
        ],
      },
    },
    "muscle-up": {
      name: "Muscle-Up",
      description: "The pinnacle of pull-up and dip combination",
      icon: "🔝",
      levels: [
        { name: "Beginner", color: "from-green-400/20 to-green-600/30" },
        { name: "Intermediate", color: "from-blue-400/20 to-blue-600/30" },
        { name: "Advanced", color: "from-purple-400/20 to-purple-600/30" },
        { name: "Elite", color: "from-amber-400/20 to-amber-600/30" },
      ],
      progression: [
        {
          name: "Beginner",
          description: "Building the foundation for muscle-ups",
          color: "green",
          textColor: "text-green-800",
          badgeColor: "from-green-400/20 to-green-600/30",
          steps: [
            "Pull-ups: 3 sets of 8-12 reps",
            "Dips: 3 sets of 8-12 reps",
            "Explosive pull-ups: 3 sets of 5-8 reps",
            "Straight bar support hold: 3 sets of 20-30 seconds",
          ],
        },
        {
          name: "Intermediate",
          description: "Developing muscle-up strength",
          color: "blue",
          textColor: "text-blue-800",
          badgeColor: "from-blue-400/20 to-blue-600/30",
          steps: [
            "High pull-ups: 3 sets of 5-8 reps",
            "Deep dips: 3 sets of 5-8 reps",
            "Negative muscle-ups: 3 sets of 3-5 reps",
            "False grip hangs: 3 sets of 20-30 seconds",
          ],
        },
        {
          name: "Advanced",
          description: "Mastering muscle-up technique",
          color: "purple",
          textColor: "text-purple-800",
          badgeColor: "from-purple-400/20 to-purple-600/30",
          steps: [
            "Band-assisted muscle-ups: 3 sets of 3-5 reps",
            "Kipping muscle-ups: 3 sets of 3-5 reps",
            "Slow negative muscle-ups: 3 sets of 3-5 reps",
            "Transition drills: 3 sets of 5-8 reps",
          ],
        },
        {
          name: "Elite",
          description: "Advanced muscle-up variations",
          color: "amber",
          textColor: "text-amber-800",
          badgeColor: "from-amber-400/20 to-amber-600/30",
          steps: [
            "Strict muscle-ups: 3 sets of 3-5 reps",
            "Ring muscle-ups: 3 sets of 3-5 reps",
            "Weighted muscle-ups: 3 sets of 3-5 reps",
            "One-arm muscle-up progressions: 3 sets of 1-3 reps",
          ],
        },
      ],
      tips: {
        frequency: "Train muscle-up components 2-3 times per week with at least 48 hours of rest between sessions.",
        volume: "Focus on quality over quantity, especially for the transition phase.",
        mistakes: [
          "Weak false grip",
          "Insufficient explosive pull",
          "Poor transition technique",
          "Chicken wing (asymmetrical pull)",
        ],
        complementary: ["Explosive pull-ups", "Deep dips", "False grip training", "Straight arm strength exercises"],
      },
    },
    "pistol-squat": {
      name: "Pistol Squat",
      description: "Single-leg strength and balance",
      icon: "🦵",
      levels: [
        { name: "Beginner", color: "from-green-400/20 to-green-600/30" },
        { name: "Intermediate", color: "from-blue-400/20 to-blue-600/30" },
        { name: "Advanced", color: "from-purple-400/20 to-purple-600/30" },
        { name: "Elite", color: "from-amber-400/20 to-amber-600/30" },
      ],
      progression: [
        {
          name: "Beginner",
          description: "Building the foundation for pistol squats",
          color: "green",
          textColor: "text-green-800",
          badgeColor: "from-green-400/20 to-green-600/30",
          steps: [
            "Assisted squats: 3 sets of 8-12 reps",
            "Single-leg partial squats: 3 sets of 5-8 reps per leg",
            "Box pistols: 3 sets of 5-8 reps per leg",
            "Counterbalance pistol squats: 3 sets of 5-8 reps per leg",
          ],
        },
        {
          name: "Intermediate",
          description: "Developing pistol squat strength and balance",
          color: "blue",
          textColor: "text-blue-800",
          badgeColor: "from-blue-400/20 to-blue-600/30",
          steps: [
            "Assisted pistol squats: 3 sets of 5-8 reps per leg",
            "Negative pistol squats: 3 sets of 5-8 reps per leg",
            "Partial range pistol squats: 3 sets of 5-8 reps per leg",
            "Elevated pistol squats: 3 sets of 3-5 reps per leg",
          ],
        },
        {
          name: "Advanced",
          description: "Mastering pistol squat technique",
          color: "purple",
          textColor: "text-purple-800",
          badgeColor: "from-purple-400/20 to-purple-600/30",
          steps: [
            "Full pistol squats: 3 sets of 5-8 reps per leg",
            "Tempo pistol squats: 3 sets of 3-5 reps per leg",
            "Hands behind head pistol squats: 3 sets of 3-5 reps per leg",
            "Elevated surface pistol squats: 3 sets of 3-5 reps per leg",
          ],
        },
        {
          name: "Elite",
          description: "Advanced pistol squat variations",
          color: "amber",
          textColor: "text-amber-800",
          badgeColor: "from-amber-400/20 to-amber-600/30",
          steps: [
            "Weighted pistol squats: 3 sets of 5-8 reps per leg",
            "Jumping pistol squats: 3 sets of 3-5 reps per leg",
            "Deficit pistol squats: 3 sets of 3-5 reps per leg",
            "One-arm pistol squats: 3 sets of 3-5 reps per leg",
          ],
        },
      ],
      tips: {
        frequency: "Train pistol squats 2-3 times per week with at least 48 hours of rest between sessions.",
        volume: "Aim for 15-30 total reps per leg per session, focusing on quality over quantity.",
        mistakes: [
          "Heel rising off the ground",
          "Knee caving inward",
          "Insufficient ankle mobility",
          "Poor balance and core control",
        ],
        complementary: [
          "Regular squats",
          "Ankle mobility exercises",
          "Balance training",
          "Hamstring flexibility exercises",
        ],
      },
    },
    "human-flag": {
      name: "Human Flag",
      description: "The ultimate display of core and grip strength",
      icon: "🚩",
      levels: [
        { name: "Beginner", color: "from-green-400/20 to-green-600/30" },
        { name: "Intermediate", color: "from-blue-400/20 to-blue-600/30" },
        { name: "Advanced", color: "from-purple-400/20 to-purple-600/30" },
        { name: "Elite", color: "from-amber-400/20 to-amber-600/30" },
      ],
      progression: [
        {
          name: "Beginner",
          description: "Building the foundation for human flag",
          color: "green",
          textColor: "text-green-800",
          badgeColor: "from-green-400/20 to-green-600/30",
          steps: [
            "Side plank: 3 sets of 30-60 seconds per side",
            "Vertical flag hold: 3 sets of 10-20 seconds",
            "Tucked flag hold: 3 sets of 5-10 seconds",
            "Flag pulls: 3 sets of 3-5 reps",
          ],
        },
        {
          name: "Intermediate",
          description: "Developing human flag strength",
          color: "blue",
          textColor: "text-blue-800",
          badgeColor: "from-blue-400/20 to-blue-600/30",
          steps: [
            "Advanced tuck flag: 3 sets of 5-10 seconds",
            "Single leg flag: 3 sets of 5-8 seconds",
            "Flag negatives: 3 sets of 3-5 reps",
            "Oblique raises: 3 sets of 8-12 reps per side",
          ],
        },
        {
          name: "Advanced",
          description: "Mastering human flag technique",
          color: "purple",
          textColor: "text-purple-800",
          badgeColor: "from-purple-400/20 to-purple-600/30",
          steps: [
            "Straddle flag: 3 sets of 5-8 seconds",
            "Half-lay flag: 3 sets of 3-5 seconds",
            "Flag pulls to straddle: 3 sets of 3-5 reps",
            "Flag transitions: 3 sets of 2-3 reps",
          ],
        },
        {
          name: "Elite",
          description: "Advanced human flag variations",
          color: "amber",
          textColor: "text-amber-800",
          badgeColor: "from-amber-400/20 to-amber-600/30",
          steps: [
            "Full human flag: 3 sets of 5-10 seconds",
            "Flag raises: 3 sets of 2-3 reps",
            "One-arm flag progressions: 3 sets of 2-5 seconds",
            "Dynamic flag movements: 3 sets of 2-3 reps",
          ],
        },
      ],
      tips: {
        frequency: "Train human flag 2-3 times per week with at least 48-72 hours of rest between sessions.",
        volume: "Keep total hold time under 60 seconds per session for maximum strength gains.",
        mistakes: [
          "Improper grip placement",
          "Insufficient lat engagement",
          "Weak obliques and core",
          "Poor shoulder positioning",
        ],
        complementary: [
          "Pull-ups and rows",
          "Side planks and oblique exercises",
          "Grip training",
          "Straight arm strength exercises",
        ],
      },
    },
  }

  return skills[slug] || null
}
