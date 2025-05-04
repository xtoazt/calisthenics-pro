"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dumbbell, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/use-toast"

export default function QuizPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({
    goal: "",
    experience: "",
    frequency: "",
    equipment: [],
    targetAreas: [],
    timeAvailable: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load saved answers if they exist
  useEffect(() => {
    const savedAnswers = localStorage.getItem("calisthenics-quiz-answers")
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers))
    }
  }, [])

  const totalSteps = 6
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (step < totalSteps) {
      // Save current progress to localStorage
      localStorage.setItem("calisthenics-quiz-answers", JSON.stringify(answers))

      setStep(step + 1)
      window.scrollTo(0, 0)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  const updateAnswer = (field, value) => {
    setAnswers({
      ...answers,
      [field]: value,
    })
  }

  const updateMultipleAnswer = (field, value) => {
    const currentValues = answers[field] || []
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value]

    setAnswers({
      ...answers,
      [field]: newValues,
    })
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Save final answers to localStorage
    localStorage.setItem("calisthenics-quiz-answers", JSON.stringify(answers))

    // Generate a personalized plan based on answers
    const personalizedPlan = generatePersonalizedPlan(answers)
    localStorage.setItem("calisthenics-personalized-plan", JSON.stringify(personalizedPlan))

    // Show success message
    toast({
      title: "Quiz completed!",
      description: "Your personalized training plan is ready.",
      duration: 3000,
    })

    // Redirect to dashboard after a short delay to show the animation
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  const generatePersonalizedPlan = (answers) => {
    // This function would generate a personalized plan based on quiz answers
    // For now, we'll create a simple example

    const plan = {
      goal: answers.goal,
      level: getExperienceLevel(answers.experience),
      workoutsPerWeek: Number.parseInt(answers.frequency) || 3,
      workoutDuration: getWorkoutDuration(answers.timeAvailable),
      focusAreas: answers.targetAreas,
      equipment: answers.equipment,
      recommendedSkills: getRecommendedSkills(answers),
      recommendedWorkouts: getRecommendedWorkouts(answers),
      createdAt: new Date().toISOString(),
    }

    return plan
  }

  const getExperienceLevel = (experience) => {
    switch (experience) {
      case "beginner":
        return "Beginner"
      case "novice":
        return "Novice"
      case "intermediate":
        return "Intermediate"
      case "advanced":
        return "Advanced"
      case "expert":
        return "Expert"
      default:
        return "Beginner"
    }
  }

  const getWorkoutDuration = (timeAvailable) => {
    switch (timeAvailable) {
      case "15-30":
        return "15-30 minutes"
      case "30-45":
        return "30-45 minutes"
      case "45-60":
        return "45-60 minutes"
      case "60-90":
        return "60-90 minutes"
      case "90+":
        return "90+ minutes"
      default:
        return "30-45 minutes"
    }
  }

  const getRecommendedSkills = (answers) => {
    const skills = []

    // Based on experience level
    if (answers.experience === "beginner" || answers.experience === "novice") {
      skills.push(
        { name: "Push-Up Progression", progress: 20, level: "Knee Push-Ups" },
        { name: "Pull-Up Progression", progress: 10, level: "Negative Pull-Ups" },
        { name: "Squat Progression", progress: 30, level: "Assisted Squats" },
      )
    } else if (answers.experience === "intermediate") {
      skills.push(
        { name: "Pull-Up Progression", progress: 65, level: "Full Pull-Ups" },
        { name: "Handstand Progression", progress: 40, level: "Wall Handstand" },
        { name: "L-Sit Progression", progress: 25, level: "Tucked L-Sit" },
      )
    } else {
      skills.push(
        { name: "Muscle-Up Progression", progress: 50, level: "Transition Training" },
        { name: "Planche Progression", progress: 30, level: "Tuck Planche" },
        { name: "Front Lever Progression", progress: 45, level: "Advanced Tuck" },
      )
    }

    // Add skills based on target areas
    if (answers.targetAreas.includes("upper-push")) {
      skills.push({ name: "Dip Progression", progress: 35, level: "Bench Dips" })
    }

    if (answers.targetAreas.includes("upper-pull")) {
      skills.push({ name: "Row Progression", progress: 40, level: "Incline Rows" })
    }

    if (answers.targetAreas.includes("core")) {
      skills.push({ name: "Hollow Body Progression", progress: 30, level: "Hollow Hold" })
    }

    // Return 3-5 skills
    return skills.slice(0, 5)
  }

  const getRecommendedWorkouts = (answers) => {
    const workouts = []

    // Based on goal
    if (answers.goal === "strength") {
      workouts.push(
        {
          title: "Strength Fundamentals",
          description: "Focus on building raw strength",
          duration: "45-60 min",
          image: "/images/workouts/strength.png",
        },
        {
          title: "Progressive Overload",
          description: "Gradually increasing resistance training",
          duration: "50-65 min",
          image: "/images/workouts/progressive.png",
        },
      )
    } else if (answers.goal === "skills") {
      workouts.push(
        {
          title: "Skill Development",
          description: "Master impressive calisthenics moves",
          duration: "45-60 min",
          image: "/images/workouts/skills.png",
        },
        {
          title: "Technical Practice",
          description: "Focus on form and technique",
          duration: "40-50 min",
          image: "/images/workouts/technical.jpg",
        },
      )
    } else if (answers.goal === "muscle") {
      workouts.push(
        {
          title: "Hypertrophy Focus",
          description: "Build muscle mass with high volume",
          duration: "50-65 min",
          image: "/images/workouts/hypertrophy.png",
        },
        {
          title: "Muscle Building",
          description: "Targeted exercises for growth",
          duration: "45-60 min",
          image: "/images/workouts/muscle.png",
        },
      )
    } else if (answers.goal === "endurance") {
      workouts.push(
        {
          title: "Endurance Circuit",
          description: "High-rep, low-rest training",
          duration: "30-45 min",
          image: "/images/workouts/endurance.png",
        },
        {
          title: "HIIT Training",
          description: "Intense intervals for stamina",
          duration: "25-35 min",
          image: "/images/workouts/hiit.png",
        },
      )
    } else if (answers.goal === "fat-loss") {
      workouts.push(
        {
          title: "Fat Burning HIIT",
          description: "High intensity fat loss workout",
          duration: "30-40 min",
          image: "/images/workouts/fat-loss.png",
        },
        {
          title: "Metabolic Conditioning",
          description: "Boost metabolism and burn calories",
          duration: "35-45 min",
          image: "/images/workouts/metabolic.png",
        },
      )
    }

    // Based on experience
    if (answers.experience === "beginner" || answers.experience === "novice") {
      workouts.push({
        title: "Fundamentals",
        description: "Master the basics of bodyweight training",
        duration: "30-45 min",
        image: "/images/workouts/fundamentals.png",
      })
    } else if (answers.experience === "intermediate") {
      workouts.push({
        title: "Intermediate Progressions",
        description: "Take your training to the next level",
        duration: "45-60 min",
        image: "/images/workouts/intermediate.png",
      })
    } else {
      workouts.push({
        title: "Advanced Techniques",
        description: "Complex movements for experienced athletes",
        duration: "60-75 min",
        image: "/images/workouts/advanced.png",
      })
    }

    // Based on target areas
    if (answers.targetAreas.includes("upper-push")) {
      workouts.push({
        title: "Upper Body Push",
        description: "Focus on chest, shoulders, and triceps",
        duration: "40-50 min",
        image: "/images/workouts/push.png",
      })
    }

    if (answers.targetAreas.includes("upper-pull")) {
      workouts.push({
        title: "Upper Body Pull",
        description: "Focus on back and biceps",
        duration: "40-50 min",
        image: "/images/workouts/pull.png",
      })
    }

    if (answers.targetAreas.includes("core")) {
      workouts.push({
        title: "Core Strength",
        description: "Build a strong and stable midsection",
        duration: "30-40 min",
        image: "/images/workouts/core.png",
      })
    }

    if (answers.targetAreas.includes("legs")) {
      workouts.push({
        title: "Lower Body Power",
        description: "Develop strong and powerful legs",
        duration: "40-50 min",
        image: "/images/workouts/legs.png",
      })
    }

    // Return 6 workouts
    return workouts.slice(0, 6)
  }

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return !!answers.goal
      case 2:
        return !!answers.experience
      case 3:
        return !!answers.frequency
      case 4:
        return answers.equipment.length > 0
      case 5:
        return answers.targetAreas.length > 0
      case 6:
        return !!answers.timeAvailable
      default:
        return false
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
          </nav>
        </div>
      </header>
      <main className="flex-1 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl">
            <motion.div className="mb-8" initial="hidden" animate="visible" variants={fadeIn}>
              <h1 className="text-3xl font-bold tracking-tighter mb-2">Personalization Quiz</h1>
              <p className="text-muted-foreground">
                Answer a few questions to get a personalized calisthenics training program.
              </p>
              <div className="mt-6">
                <Progress value={progress} className="h-2" />
                <div className="mt-2 text-sm text-muted-foreground">
                  Step {step} of {totalSteps}
                </div>
              </div>
            </motion.div>

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>What is your primary fitness goal?</CardTitle>
                    <CardDescription>This will help us tailor your program to your specific needs.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={answers.goal}
                      onValueChange={(value) => updateAnswer("goal", value)}
                      className="grid gap-4"
                    >
                      {[
                        {
                          value: "strength",
                          label: "Build Strength",
                          description: "Focus on getting stronger with progressive overload",
                        },
                        {
                          value: "skills",
                          label: "Learn Skills",
                          description: "Master impressive calisthenics moves like muscle-ups and handstands",
                        },
                        { value: "muscle", label: "Build Muscle", description: "Increase muscle size and definition" },
                        {
                          value: "endurance",
                          label: "Improve Endurance",
                          description: "Build stamina and muscular endurance",
                        },
                        {
                          value: "fat-loss",
                          label: "Lose Fat",
                          description: "Reduce body fat while maintaining muscle",
                        },
                      ].map((item) => (
                        <motion.div
                          key={item.value}
                          className="flex items-start space-x-2"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <RadioGroupItem value={item.value} id={item.value} className="mt-1" />
                          <Label htmlFor={item.value} className="flex flex-col cursor-pointer">
                            <span className="font-medium">{item.label}</span>
                            <span className="text-sm text-muted-foreground">{item.description}</span>
                          </Label>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevious} disabled={step === 1}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button onClick={handleNext} disabled={!isStepComplete()}>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>What's your experience level with calisthenics?</CardTitle>
                    <CardDescription>This helps us determine the appropriate starting difficulty.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={answers.experience}
                      onValueChange={(value) => updateAnswer("experience", value)}
                      className="grid gap-4"
                    >
                      {[
                        {
                          value: "beginner",
                          label: "Beginner",
                          description: "New to calisthenics or exercise in general",
                        },
                        {
                          value: "novice",
                          label: "Novice",
                          description: "Some experience with basic exercises (push-ups, pull-ups)",
                        },
                        {
                          value: "intermediate",
                          label: "Intermediate",
                          description: "Comfortable with standard exercises and some progressions",
                        },
                        {
                          value: "advanced",
                          label: "Advanced",
                          description: "Proficient in advanced variations and some skills",
                        },
                        {
                          value: "expert",
                          label: "Expert",
                          description: "Mastered multiple advanced skills and looking for new challenges",
                        },
                      ].map((item) => (
                        <motion.div
                          key={item.value}
                          className="flex items-start space-x-2"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <RadioGroupItem value={item.value} id={item.value} className="mt-1" />
                          <Label htmlFor={item.value} className="flex flex-col cursor-pointer">
                            <span className="font-medium">{item.label}</span>
                            <span className="text-sm text-muted-foreground">{item.description}</span>
                          </Label>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevious}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button onClick={handleNext} disabled={!isStepComplete()}>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>How many days per week can you train?</CardTitle>
                    <CardDescription>This helps us design a program that fits your schedule.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={answers.frequency}
                      onValueChange={(value) => updateAnswer("frequency", value)}
                      className="grid gap-4"
                    >
                      {[
                        { value: "2", label: "2 days per week", description: "Minimal commitment, good for beginners" },
                        {
                          value: "3",
                          label: "3 days per week",
                          description: "Balanced approach, good for most people",
                        },
                        {
                          value: "4",
                          label: "4 days per week",
                          description: "More frequent training for faster progress",
                        },
                        { value: "5", label: "5 days per week", description: "High frequency for dedicated trainees" },
                        {
                          value: "6+",
                          label: "6+ days per week",
                          description: "Advanced schedule for serious athletes",
                        },
                      ].map((item) => (
                        <motion.div
                          key={item.value}
                          className="flex items-start space-x-2"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <RadioGroupItem value={item.value} id={`frequency-${item.value}`} className="mt-1" />
                          <Label htmlFor={`frequency-${item.value}`} className="flex flex-col cursor-pointer">
                            <span className="font-medium">{item.label}</span>
                            <span className="text-sm text-muted-foreground">{item.description}</span>
                          </Label>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevious}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button onClick={handleNext} disabled={!isStepComplete()}>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>What equipment do you have access to?</CardTitle>
                    <CardDescription>
                      Select all that apply. This helps us recommend appropriate exercises.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {[
                        { id: "pull-up-bar", label: "Pull-Up Bar" },
                        { id: "dip-bars", label: "Dip Bars / Parallel Bars" },
                        { id: "rings", label: "Gymnastic Rings" },
                        { id: "resistance-bands", label: "Resistance Bands" },
                        { id: "weights", label: "Weights (Dumbbells/Kettlebells)" },
                        { id: "bench", label: "Workout Bench" },
                        { id: "none", label: "No Equipment (Bodyweight Only)" },
                      ].map((item) => (
                        <motion.div
                          key={item.id}
                          className="flex items-start space-x-2"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Checkbox
                            id={item.id}
                            checked={answers.equipment.includes(item.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateMultipleAnswer("equipment", item.id)
                              } else {
                                updateMultipleAnswer("equipment", item.id)
                              }
                            }}
                            className="mt-1"
                          />
                          <Label htmlFor={item.id} className="cursor-pointer">
                            {item.label}
                          </Label>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevious}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button onClick={handleNext} disabled={!isStepComplete()}>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Which areas would you like to focus on?</CardTitle>
                    <CardDescription>
                      Select all that apply. This helps us prioritize certain muscle groups or skills.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {[
                        { id: "upper-push", label: "Upper Body Push (Chest, Shoulders, Triceps)" },
                        { id: "upper-pull", label: "Upper Body Pull (Back, Biceps)" },
                        { id: "core", label: "Core Strength" },
                        { id: "legs", label: "Lower Body" },
                        { id: "flexibility", label: "Flexibility & Mobility" },
                        { id: "cardio", label: "Cardiovascular Endurance" },
                        { id: "full-body", label: "Full Body (Balanced Approach)" },
                      ].map((item) => (
                        <motion.div
                          key={item.id}
                          className="flex items-start space-x-2"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Checkbox
                            id={`area-${item.id}`}
                            checked={answers.targetAreas.includes(item.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateMultipleAnswer("targetAreas", item.id)
                              } else {
                                updateMultipleAnswer("targetAreas", item.id)
                              }
                            }}
                            className="mt-1"
                          />
                          <Label htmlFor={`area-${item.id}`} className="cursor-pointer">
                            {item.label}
                          </Label>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevious}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button onClick={handleNext} disabled={!isStepComplete()}>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>How much time can you dedicate to each workout?</CardTitle>
                    <CardDescription>This helps us design workouts that fit your schedule.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={answers.timeAvailable}
                      onValueChange={(value) => updateAnswer("timeAvailable", value)}
                      className="grid gap-4"
                    >
                      {[
                        { value: "15-30", label: "15-30 minutes", description: "Quick, focused sessions" },
                        { value: "30-45", label: "30-45 minutes", description: "Standard workout length" },
                        { value: "45-60", label: "45-60 minutes", description: "Comprehensive sessions" },
                        { value: "60-90", label: "60-90 minutes", description: "Extended training for serious gains" },
                        { value: "90+", label: "90+ minutes", description: "Long sessions for advanced athletes" },
                      ].map((item) => (
                        <motion.div
                          key={item.value}
                          className="flex items-start space-x-2"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <RadioGroupItem value={item.value} id={`time-${item.value}`} className="mt-1" />
                          <Label htmlFor={`time-${item.value}`} className="flex flex-col cursor-pointer">
                            <span className="font-medium">{item.label}</span>
                            <span className="text-sm text-muted-foreground">{item.description}</span>
                          </Label>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevious}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button onClick={handleNext} disabled={!isStepComplete() || isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                          />
                          Creating Plan...
                        </>
                      ) : (
                        <>
                          Complete Quiz <CheckCircle className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </div>
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
            Made By Rohan &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
