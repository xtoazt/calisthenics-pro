"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Dumbbell, Award, Users } from "lucide-react"
import { motion } from "framer-motion"
import HomeDashboard from "./components/home-dashboard"
import { calculateUserPoints } from "@/lib/user-utils"
import { recordActivity } from "@/lib/workout-utils"

export default function Home() {
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [userExperience, setUserExperience] = useState<string | null>(null)
  const [userGoal, setUserGoal] = useState<string | null>(null)
  const [userPoints, setUserPoints] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if quiz is completed
    const quizStatus = localStorage.getItem("quizCompleted")
    const user = localStorage.getItem("user")
    const experience = localStorage.getItem("userExperience")
    const goal = localStorage.getItem("userGoal")

    if (quizStatus === "true" && user) {
      setQuizCompleted(true)
      setUserName(user)
      setUserExperience(experience)
      setUserGoal(goal)

      // Calculate user points
      const points = calculateUserPoints(user, experience)
      setUserPoints(points)

      // Record home page visit for logged in users (awards 5 points)
      recordActivity("visit", "Visited home page", 5)
    } else {
      // Record landing page visit for new users (awards 2 points)
      recordActivity("visit", "Visited landing page", 2)
    }

    setLoading(false)
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
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

  // If quiz is completed, show dashboard
  if (quizCompleted && userName) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl"
              onClick={() => recordActivity("navigation", "Clicked home logo", 1)}
            >
              <Dumbbell className="h-6 w-6" />
              <span>CalisthenicsPro</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/skills"
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={() => recordActivity("navigation", "Navigated to skills from home", 2)}
              >
                Skill Progressions
              </Link>
              <Link
                href="/exercises"
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={() => recordActivity("navigation", "Navigated to exercises from home", 2)}
              >
                Exercise Library
              </Link>
              <Link
                href="/programs"
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={() => recordActivity("navigation", "Navigated to programs from home", 2)}
              >
                Programs
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={() => recordActivity("navigation", "Navigated to about from home", 2)}
              >
                About
              </Link>
              <Link
                href="/account/profile"
                className="text-sm font-medium hover:underline underline-offset-4"
                onClick={() => recordActivity("navigation", "Navigated to profile from home", 2)}
              >
                My Account
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 py-12">
          <div className="container px-4 md:px-6">
            <HomeDashboard
              userName={userName}
              userPoints={userPoints}
              userExperience={userExperience}
              userGoal={userGoal}
            />
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

  // Otherwise, show landing page
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Dumbbell className="h-6 w-6" />
            <span>CalisthenicsPro</span>
          </div>
          <div className="flex gap-4">
            <Link href="/quiz" onClick={() => recordActivity("navigation", "Started quiz from landing page", 5)}>
              <Button>
                Take the Quiz <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
            >
              <motion.div className="space-y-4" variants={fadeIn}>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Master Your Body, Master Your Mind</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Unlock your full potential with our personalized calisthenics training programs. From beginner to
                  advanced, we'll guide you through every step of your journey.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/quiz" onClick={() => recordActivity("navigation", "Started quiz from hero section", 5)}>
                    <Button size="lg" className="gap-1">
                      Take the Quiz <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                className="mx-auto w-full max-w-[500px] aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center"
                variants={fadeIn}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Dumbbell className="h-24 w-24 text-primary/60" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Calisthenics?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Build strength, flexibility, and body control using just your bodyweight. No gym required.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
            >
              <motion.div
                className="flex flex-col justify-center space-y-4"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Dumbbell className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Functional Strength</h3>
                <p className="text-muted-foreground">
                  Build real-world strength that translates to everyday activities and athletic performance.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col justify-center space-y-4"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Impressive Skills</h3>
                <p className="text-muted-foreground">
                  Master advanced movements like muscle-ups, handstands, and human flags with our step-by-step
                  progressions.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col justify-center space-y-4"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Community Support</h3>
                <p className="text-muted-foreground">
                  Join a community of like-minded individuals on the same journey to mastery.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Personalized For You</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take our comprehensive quiz to get a training program tailored to your goals, experience, and
                  available equipment.
                </p>
              </div>
              <Link
                href="/quiz"
                onClick={() => recordActivity("navigation", "Started quiz from personalized section", 5)}
              >
                <Button size="lg" className="mt-4">
                  Start Your Journey
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 md:items-start md:gap-2">
            <div className="flex items-center gap-2 text-lg font-bold">
              <Dumbbell className="h-6 w-6" />
              <span>CalisthenicsPro</span>
            </div>
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
