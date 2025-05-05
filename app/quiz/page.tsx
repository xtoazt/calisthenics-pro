"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dumbbell, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/use-toast"

export default function QuizPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [experience, setExperience] = useState("")
  const [goal, setGoal] = useState("")
  const [equipment, setEquipment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quizAlreadyCompleted, setQuizAlreadyCompleted] = useState(false)

  // Check if quiz is already completed
  useEffect(() => {
    const quizCompleted = localStorage.getItem("quizCompleted")
    const user = localStorage.getItem("user")

    if (quizCompleted === "true" && user) {
      setQuizAlreadyCompleted(true)
    }
  }, [])

  const handleNext = () => {
    if (step === 1 && !name) {
      toast({
        title: "Name required",
        description: "Please enter your name to continue",
        variant: "destructive",
      })
      return
    }

    if (step === 4) {
      handleSubmit()
      return
    }

    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Store user data in localStorage
    localStorage.setItem("user", name)
    localStorage.setItem("quizCompleted", "true")
    localStorage.setItem("userExperience", experience)
    localStorage.setItem("userGoal", goal)
    localStorage.setItem("userEquipment", equipment)

    // Also set cookies for server-side middleware
    document.cookie = `user=${name}; path=/; max-age=2592000` // 30 days
    document.cookie = `quizCompleted=true; path=/; max-age=2592000`
    document.cookie = `userExperience=${experience}; path=/; max-age=2592000`
    document.cookie = `userGoal=${goal}; path=/; max-age=2592000`
    document.cookie = `userEquipment=${equipment}; path=/; max-age=2592000`

    // Simulate processing
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Quiz completed!",
        description: "Your personalized dashboard is ready.",
      })
      router.push("/dashboard")
    }, 1000)
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // If quiz is already completed, show a message and redirect
  if (quizAlreadyCompleted) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="border-b">
          <div className="container flex h-16 items-center px-4 md:px-6">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Dumbbell className="h-6 w-6" />
              <span>CalisthenicsPro</span>
            </div>
          </div>
        </header>
        <main className="flex-1 py-12">
          <div className="container grid items-center gap-6 px-4 md:px-6">
            <div className="mx-auto w-full max-w-md space-y-6">
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Quiz Already Completed</CardTitle>
                    <CardDescription>You've already completed the onboarding quiz</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <p className="text-center mb-4">
                      You've already completed the quiz and your preferences are saved. Your dashboard has been
                      personalized based on your responses.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
        <footer className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
            <p className="text-center text-sm text-muted-foreground">
              Made By Rohan Salem &copy; {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Dumbbell className="h-6 w-6" />
            <span>CalisthenicsPro</span>
          </div>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container grid items-center gap-6 px-4 md:px-6">
          <div className="mx-auto w-full max-w-md space-y-6">
            <motion.div key={`step-${step}`} initial="hidden" animate="visible" variants={fadeIn} className="space-y-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {step === 1
                      ? "Welcome to CalisthenicsPro"
                      : step === 2
                        ? "Your Experience"
                        : step === 3
                          ? "Your Goals"
                          : "Available Equipment"}
                  </CardTitle>
                  <CardDescription>
                    {step === 1
                      ? "Let's get to know you"
                      : step === 2
                        ? "Tell us about your fitness background"
                        : step === 3
                          ? "What do you want to achieve?"
                          : "What equipment do you have access to?"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {step === 1 && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <RadioGroup value={experience} onValueChange={setExperience}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="beginner" id="beginner" />
                        <Label htmlFor="beginner">Beginner - New to fitness</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="intermediate" id="intermediate" />
                        <Label htmlFor="intermediate">Intermediate - Some experience</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="advanced" id="advanced" />
                        <Label htmlFor="advanced">Advanced - Experienced athlete</Label>
                      </div>
                    </RadioGroup>
                  )}

                  {step === 3 && (
                    <RadioGroup value={goal} onValueChange={setGoal}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="strength" id="strength" />
                        <Label htmlFor="strength">Build strength</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="skills" id="skills" />
                        <Label htmlFor="skills">Learn skills (muscle-ups, handstands, etc.)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="endurance" id="endurance" />
                        <Label htmlFor="endurance">Improve endurance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all">All of the above</Label>
                      </div>
                    </RadioGroup>
                  )}

                  {step === 4 && (
                    <RadioGroup value={equipment} onValueChange={setEquipment}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="none" id="none" />
                        <Label htmlFor="none">No equipment (bodyweight only)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="minimal" id="minimal" />
                        <Label htmlFor="minimal">Minimal (pull-up bar, rings)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="full" id="full" />
                        <Label htmlFor="full">Full home gym</Label>
                      </div>
                    </RadioGroup>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  {step > 1 ? (
                    <Button variant="outline" onClick={handleBack}>
                      Back
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  <Button onClick={handleNext} disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : step === 4 ? "Complete" : "Next"}
                  </Button>
                </CardFooter>
              </Card>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-2 w-2 rounded-full ${i === step ? "bg-primary" : "bg-muted"}`} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <p className="text-center text-sm text-muted-foreground">
            Made By Rohan Salem &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
