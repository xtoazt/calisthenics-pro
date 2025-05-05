"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Dumbbell, Award, Users, LogIn } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
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

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Dumbbell className="h-6 w-6" />
            <span>CalisthenicsPro</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/skills-overview" className="text-sm font-medium hover:underline underline-offset-4">
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
          <div className="flex gap-4">
            <Link href="/account">
              <Button variant="outline">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
            <Link href="/quiz">
              <Button>Get Started</Button>
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
                  <Link href="/quiz">
                    <Button size="lg" className="gap-1">
                      Take the Quiz <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/skills">
                    <Button size="lg" variant="outline">
                      Explore Skills
                    </Button>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                className="mx-auto w-full max-w-[500px] aspect-video overflow-hidden rounded-xl"
                variants={fadeIn}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src="/placeholder.svg?height=500&width=800"
                  alt="Calisthenics athlete performing a planche"
                  width={800}
                  height={500}
                  className="object-cover w-full h-full"
                />
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Skills</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our most popular skill progressions and start your journey today.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
            >
              {[
                {
                  title: "Pull-Up Mastery",
                  description: "From dead hangs to one-arm pull-ups",
                  image: "/images/skills/pull-up.png",
                  link: "/skills/pull-ups",
                },
                {
                  title: "Handstand Journey",
                  description: "Wall stands to free-standing handstands",
                  image: "/images/skills/handstand.png",
                  link: "/skills/handstands",
                },
                {
                  title: "Planche Progression",
                  description: "Frog stands to full planche",
                  image: "/images/skills/planche.png",
                  link: "/skills/planche",
                },
                {
                  title: "Front Lever",
                  description: "Tuck to full front lever",
                  image: "/images/skills/front-lever.png",
                  link: "/skills/front-lever",
                },
                {
                  title: "Muscle-Up",
                  description: "Pull-ups to explosive muscle-ups",
                  image: "/images/skills/muscle-up.png",
                  link: "/skills/muscle-up",
                },
                {
                  title: "Human Flag",
                  description: "Vertical to horizontal flag holds",
                  image: "/images/skills/human-flag.png",
                  link: "/skills/human-flag",
                },
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link href={skill.link} className="group relative overflow-hidden rounded-lg border">
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={skill.image || "/images/skills/default.png"}
                        alt={skill.title}
                        width={400}
                        height={300}
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 bg-background">
                      <h3 className="font-bold">{skill.title}</h3>
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            <div className="flex justify-center">
              <Link href="/skills">
                <Button variant="outline" size="lg">
                  View All Skills
                </Button>
              </Link>
            </div>
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Personalized For You</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take our comprehensive quiz to get a training program tailored to your goals, experience, and
                  available equipment.
                </p>
              </div>
              <Link href="/quiz">
                <Button size="lg" className="mt-4">
                  Start Your Journey
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <motion.div
              className="grid gap-6 lg:grid-cols-2 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerChildren}
            >
              <motion.div className="space-y-4" variants={fadeIn}>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Track Your Progress</h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  Our platform helps you visualize your journey with progress photos, achievement badges, and detailed
                  tracking of your skill development.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard">
                    <Button>View Dashboard</Button>
                  </Link>
                </div>
              </motion.div>
              <motion.div className="grid grid-cols-2 gap-4" variants={staggerChildren}>
                <motion.div
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image
                    src="/images/progress/progress-1.png"
                    alt="Progress tracking"
                    width={300}
                    height={400}
                    className="rounded-lg object-cover w-full aspect-[3/4]"
                  />
                </motion.div>
                <div className="grid gap-4">
                  <motion.div
                    variants={fadeIn}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Image
                      src="/images/progress/progress-2.png"
                      alt="Achievement badges"
                      width={300}
                      height={200}
                      className="rounded-lg object-cover w-full aspect-video"
                    />
                  </motion.div>
                  <motion.div
                    variants={fadeIn}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Image
                      src="/images/progress/progress-3.png"
                      alt="Skill development"
                      width={300}
                      height={200}
                      className="rounded-lg object-cover w-full aspect-video"
                    />
                  </motion.div>
                </div>
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join Our Community</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connect with like-minded athletes, share your progress, and get support from coaches and peers.
                </p>
              </div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerChildren}
              >
                <motion.div
                  className="flex flex-col items-center text-center space-y-2"
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Community Forums</h3>
                  <p className="text-muted-foreground">
                    Ask questions, share tips, and connect with other calisthenics enthusiasts.
                  </p>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center text-center space-y-2"
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <Award className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Challenges</h3>
                  <p className="text-muted-foreground">
                    Participate in monthly challenges to push your limits and earn special badges.
                  </p>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center text-center space-y-2"
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <Dumbbell className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Live Sessions</h3>
                  <p className="text-muted-foreground">
                    Join weekly live training sessions with expert coaches and fellow members.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
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
