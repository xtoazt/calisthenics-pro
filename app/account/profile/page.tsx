"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dumbbell, Trophy, Star, Award, LogOut } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const router = useRouter()
  const [userName, setUserName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/account")
      return
    }

    setUserName(user)
    setLoading(false)
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

  // Simple rank system based on first letter of username
  const getRank = () => {
    if (!userName) return { name: "Novice", color: "bg-zinc-400", progress: 10 }

    const firstChar = userName.charAt(0).toLowerCase()

    if (firstChar >= "a" && firstChar <= "e") {
      return { name: "Novice", color: "bg-zinc-400", progress: 10 }
    } else if (firstChar >= "f" && firstChar <= "j") {
      return { name: "Apprentice", color: "bg-green-500", progress: 30 }
    } else if (firstChar >= "k" && firstChar <= "o") {
      return { name: "Adept", color: "bg-blue-500", progress: 50 }
    } else if (firstChar >= "p" && firstChar <= "t") {
      return { name: "Expert", color: "bg-purple-500", progress: 70 }
    } else {
      return { name: "Master", color: "bg-amber-500", progress: 90 }
    }
  }

  const userRank = getRank()
  const nextRank = getNextRank(userRank.name)

  function getNextRank(currentRank: string) {
    const ranks = ["Novice", "Apprentice", "Adept", "Expert", "Master", "Grandmaster", "Legend"]
    const currentIndex = ranks.indexOf(currentRank)

    if (currentIndex === -1 || currentIndex === ranks.length - 1) {
      return "Legend"
    }

    return ranks[currentIndex + 1]
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
              <h1 className="text-3xl font-bold tracking-tighter">My Account</h1>
              <p className="text-muted-foreground">View your profile information and current rank</p>
            </motion.div>

            <motion.div variants={fadeIn} className="col-span-full md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center mb-6">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">{userName?.charAt(0).toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Username</h3>
                    <p>{userName}</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Account Type</h3>
                    <p>Standard User</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Member Since</h3>
                    <p>Today</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={handleLogout}>
                    Sign Out
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn} className="col-span-full md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Your Rank</CardTitle>
                  <CardDescription>Current progress and achievements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-center">
                    <motion.div
                      className="relative"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className={`h-24 w-24 rounded-full flex items-center justify-center ${userRank.color}`}>
                        <Trophy className="h-12 w-12 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 bg-background rounded-full p-1">
                        <div className="bg-yellow-400 rounded-full p-1">
                          <Star className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold">{userRank.name}</h3>
                    <p className="text-sm text-muted-foreground">Keep training to reach {nextRank}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{userRank.name}</span>
                      <span>{nextRank}</span>
                    </div>
                    <Progress value={userRank.progress} className="h-2" />
                    <p className="text-xs text-center text-muted-foreground">
                      {100 - userRank.progress}% more progress needed for next rank
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">How to earn points:</h4>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Complete daily workouts: 10 points</li>
                      <li>• Maintain a streak: 5 points per day</li>
                      <li>• Achieve a new skill level: 25 points</li>
                      <li>• Complete weekly challenges: 50 points</li>
                      <li>• Track nutrition goals: 5 points per day</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard">
                    <Button className="w-full">Go to Dashboard</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn} className="col-span-full md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                  <CardDescription>Your latest accomplishments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Account Created</h3>
                        <p className="text-sm text-muted-foreground">
                          You've taken the first step in your calisthenics journey
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Trophy className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Rank Assigned</h3>
                        <p className="text-sm text-muted-foreground">
                          You've been assigned the rank of {userRank.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    Complete workouts and challenges to earn more achievements
                  </p>
                </CardFooter>
              </Card>
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
