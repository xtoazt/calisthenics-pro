"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dumbbell, Settings, LogOut, BarChart3, Timer, Hash } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WorkoutTimer from "../components/workout-timer"
import RepCounter from "../components/rep-counter"
import { motion } from "framer-motion"
import { getPlaceholderImage } from "@/lib/placeholder"
import { toast } from "@/components/ui/use-toast"

export default function DashboardPage() {
  const router = useRouter()
  const [userName, setUserName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("workouts")

  // Check if user is logged in
  useEffect(() => {
    // Check for user in localStorage
    const user = localStorage.getItem("user")

    if (user) {
      setUserName(user)
      setLoading(false)
    } else {
      // If no user is found, redirect to login
      router.push("/account")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
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

  const workouts = [
    {
      title: "Full Body Basics",
      description: "A complete workout focusing on fundamental movements",
      duration: "30-45 min",
      image: getPlaceholderImage(300, 200, "Full Body"),
    },
    {
      title: "Upper Body Focus",
      description: "Build strength in your chest, back, and arms",
      duration: "30-45 min",
      image: getPlaceholderImage(300, 200, "Upper Body"),
    },
    {
      title: "Core Foundations",
      description: "Develop a strong and stable midsection",
      duration: "20-30 min",
      image: getPlaceholderImage(300, 200, "Core"),
    },
    {
      title: "Lower Body Power",
      description: "Build strength and explosiveness in your legs",
      duration: "30-40 min",
      image: getPlaceholderImage(300, 200, "Lower Body"),
    },
    {
      title: "Skill Development",
      description: "Focus on progressions for advanced skills",
      duration: "45-60 min",
      image: getPlaceholderImage(300, 200, "Skills"),
    },
    {
      title: "HIIT Cardio",
      description: "High-intensity interval training for conditioning",
      duration: "20-30 min",
      image: getPlaceholderImage(300, 200, "HIIT"),
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
              <p className="text-muted-foreground">
                Here are some workouts to get you started. Track your progress and stay consistent!
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="col-span-full">
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

            <motion.div variants={fadeIn} className="col-span-full">
              <Tabs defaultValue="workouts" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="workouts" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" /> Workouts
                  </TabsTrigger>
                  <TabsTrigger value="timer" className="flex items-center gap-2">
                    <Timer className="h-4 w-4" /> Timer
                  </TabsTrigger>
                  <TabsTrigger value="counter" className="flex items-center gap-2">
                    <Hash className="h-4 w-4" /> Counter
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
                            <div className="aspect-video w-full overflow-hidden">
                              <Image
                                src={workout.image || "/placeholder.svg"}
                                alt={workout.title}
                                width={300}
                                height={200}
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

                  <TabsContent value="counter" className="mt-6">
                    <div className="max-w-md mx-auto">
                      <RepCounter />
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
            &copy; {new Date().getFullYear()} CalisthenicsPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
