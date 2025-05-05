"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, ChevronRight, LogOut } from "lucide-react"
import { motion } from "framer-motion"

export default function SkillsPage() {
  const router = useRouter()
  const [userName, setUserName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

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
    setLoading(false)
  }, [router])

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

  const skills = [
    {
      name: "Pull-Ups",
      description: "Master the fundamental vertical pulling movement",
      levels: [
        { name: "Beginner", color: "from-green-400/20 to-green-600/30" },
        { name: "Intermediate", color: "from-blue-400/20 to-blue-600/30" },
        { name: "Advanced", color: "from-purple-400/20 to-purple-600/30" },
        { name: "Elite", color: "from-amber-400/20 to-amber-600/30" },
      ],
      category: "upper",
      slug: "pull-ups",
      icon: "💪",
    },
    {
      name: "Push-Ups",
      description: "Build pushing strength with progressive variations",
      levels: [
        { name: "Beginner", color: "from-green-400/20 to-green-600/30" },
        { name: "Intermediate", color: "from-blue-400/20 to-blue-600/30" },
        { name: "Advanced", color: "from-purple-400/20 to-purple-600/30" },
        { name: "Elite", color: "from-amber-400/20 to-amber-600/30" },
      ],
      category: "upper",
      slug: "push-ups",
      icon: "👐",
    },
    {
      name: "Dips",
      description: "Develop triceps and chest strength",
      levels: [
        { name: "Beginner", color: "from-green-400/20 to-green-600/30" },
        { name: "Intermediate", color: "from-blue-400/20 to-blue-600/30" },
        { name: "Advanced", color: "from-purple-400/20 to-purple-600/30" },
        { name: "Elite", color: "from-amber-400/20 to-amber-600/30" },
      ],
      category: "upper",
      slug: "dips",
      icon: "🔄",
    },
    {
      name: "Handstand",
      description: "Master the art of balance and shoulder strength",
      levels: [
        { name: "Beginner", color: "from-green-400/20 to-green-600/30" },
        { name: "Intermediate", color: "from-blue-400/20 to-blue-600/30" },
        { name: "Advanced", color: "from-purple-400/20 to-purple-600/30" },
        { name: "Elite", color: "from-amber-400/20 to-amber-600/30" },
      ],
      category: "balance",
      slug: "handstand",
      icon: "🤸",
    },
    {
      name: "Planche",
      description: "The ultimate test of upper body strength",
      levels: [
        { name: "Beginner", color: "from-green-400/20 to-green-600/30" },
        { name: "Intermediate", color: "from-blue-400/20 to-blue-600/30" },
        { name: "Advanced", color: "from-purple-400/20 to-purple-600/30" },
        { name: "Elite", color: "from-amber-400/20 to-amber-600/30" },
      ],
      category: "strength",
      slug: "planche",
      icon: "💯",
    },
    {
      name: "Front Lever",
      description: "Build incredible core and back strength",
      levels: [
        { name: "Beginner", color: "from-green-400/20 to-green-600/30" },
        { name: "Intermediate", color: "from-blue-400/20 to-blue-600/30" },
        { name: "Advanced", color: "from-purple-400/20 to-purple-600/30" },
        { name: "Elite", color: "from-amber-400/20 to-amber-600/30" },
      ],
      category: "core",
      slug: "front-lever",
      icon: "⬆️",
    },
    {
      name: "Muscle-Up",
      description: "The pinnacle of pull-up and dip combination",
      levels: [
        { name: "Beginner", color: "from-green-400/20 to-green-600/30" },
        { name: "Intermediate", color: "from-blue-400/20 to-blue-600/30" },
        { name: "Advanced", color: "from-purple-400/20 to-purple-600/30" },
        { name: "Elite", color: "from-amber-400/20 to-amber-600/30" },
      ],
      category: "upper",
      slug: "muscle-up",
      icon: "🔝",
    },
    {
      name: "Pistol Squat",
      description: "Single-leg strength and balance",
      levels: [
        { name: "Beginner", color: "from-green-400/20 to-green-600/30" },
        { name: "Intermediate", color: "from-blue-400/20 to-blue-600/30" },
        { name: "Advanced", color: "from-purple-400/20 to-purple-600/30" },
        { name: "Elite", color: "from-amber-400/20 to-amber-600/30" },
      ],
      category: "lower",
      slug: "pistol-squat",
      icon: "🦵",
    },
    {
      name: "Human Flag",
      description: "The ultimate display of core and grip strength",
      levels: [
        { name: "Beginner", color: "from-green-400/20 to-green-600/30" },
        { name: "Intermediate", color: "from-blue-400/20 to-blue-600/30" },
        { name: "Advanced", color: "from-purple-400/20 to-purple-600/30" },
        { name: "Elite", color: "from-amber-400/20 to-amber-600/30" },
      ],
      category: "strength",
      slug: "human-flag",
      icon: "🚩",
    },
  ]

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
            <motion.div variants={fadeIn} className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skill Progressions</h1>
              <p className="max-w-[700px] text-muted-foreground">
                Master these fundamental calisthenics skills with our step-by-step progressions.
              </p>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 mb-8">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="upper">Upper Body</TabsTrigger>
                  <TabsTrigger value="lower">Lower Body</TabsTrigger>
                  <TabsTrigger value="core">Core & Balance</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {skills.map((skill) => (
                      <motion.div
                        key={skill.slug}
                        variants={fadeIn}
                        whileHover={{ scale: 1.03, y: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Link href={`/skills/${skill.slug}`}>
                          <Card className="h-full overflow-hidden">
                            <div
                              className={`aspect-video w-full overflow-hidden bg-gradient-to-br ${skill.levels[0].color} flex items-center justify-center text-6xl`}
                            >
                              {skill.icon}
                            </div>
                            <CardHeader className="p-4">
                              <CardTitle className="text-xl">{skill.name}</CardTitle>
                              <CardDescription>{skill.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <div className="flex flex-wrap gap-2">
                                {skill.levels.map((level, index) => (
                                  <div
                                    key={index}
                                    className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${level.color}`}
                                  >
                                    {level.name}
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                              <Button variant="ghost" className="w-full justify-between group">
                                View Progression
                                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="upper" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {skills
                      .filter((skill) => skill.category === "upper")
                      .map((skill) => (
                        <motion.div
                          key={skill.slug}
                          variants={fadeIn}
                          whileHover={{ scale: 1.03, y: -5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Link href={`/skills/${skill.slug}`}>
                            <Card className="h-full overflow-hidden">
                              <div
                                className={`aspect-video w-full overflow-hidden bg-gradient-to-br ${skill.levels[0].color} flex items-center justify-center text-6xl`}
                              >
                                {skill.icon}
                              </div>
                              <CardHeader className="p-4">
                                <CardTitle className="text-xl">{skill.name}</CardTitle>
                                <CardDescription>{skill.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="p-4 pt-0">
                                <div className="flex flex-wrap gap-2">
                                  {skill.levels.map((level, index) => (
                                    <div
                                      key={index}
                                      className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${level.color}`}
                                    >
                                      {level.name}
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                              <CardFooter className="p-4 pt-0">
                                <Button variant="ghost" className="w-full justify-between group">
                                  View Progression
                                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                              </CardFooter>
                            </Card>
                          </Link>
                        </motion.div>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="lower" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {skills
                      .filter((skill) => skill.category === "lower")
                      .map((skill) => (
                        <motion.div
                          key={skill.slug}
                          variants={fadeIn}
                          whileHover={{ scale: 1.03, y: -5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Link href={`/skills/${skill.slug}`}>
                            <Card className="h-full overflow-hidden">
                              <div
                                className={`aspect-video w-full overflow-hidden bg-gradient-to-br ${skill.levels[0].color} flex items-center justify-center text-6xl`}
                              >
                                {skill.icon}
                              </div>
                              <CardHeader className="p-4">
                                <CardTitle className="text-xl">{skill.name}</CardTitle>
                                <CardDescription>{skill.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="p-4 pt-0">
                                <div className="flex flex-wrap gap-2">
                                  {skill.levels.map((level, index) => (
                                    <div
                                      key={index}
                                      className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${level.color}`}
                                    >
                                      {level.name}
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                              <CardFooter className="p-4 pt-0">
                                <Button variant="ghost" className="w-full justify-between group">
                                  View Progression
                                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                              </CardFooter>
                            </Card>
                          </Link>
                        </motion.div>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="core" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {skills
                      .filter((skill) => skill.category === "core" || skill.category === "balance")
                      .map((skill) => (
                        <motion.div
                          key={skill.slug}
                          variants={fadeIn}
                          whileHover={{ scale: 1.03, y: -5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Link href={`/skills/${skill.slug}`}>
                            <Card className="h-full overflow-hidden">
                              <div
                                className={`aspect-video w-full overflow-hidden bg-gradient-to-br ${skill.levels[0].color} flex items-center justify-center text-6xl`}
                              >
                                {skill.icon}
                              </div>
                              <CardHeader className="p-4">
                                <CardTitle className="text-xl">{skill.name}</CardTitle>
                                <CardDescription>{skill.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="p-4 pt-0">
                                <div className="flex flex-wrap gap-2">
                                  {skill.levels.map((level, index) => (
                                    <div
                                      key={index}
                                      className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${level.color}`}
                                    >
                                      {level.name}
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                              <CardFooter className="p-4 pt-0">
                                <Button variant="ghost" className="w-full justify-between group">
                                  View Progression
                                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                              </CardFooter>
                            </Card>
                          </Link>
                        </motion.div>
                      ))}
                  </div>
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
