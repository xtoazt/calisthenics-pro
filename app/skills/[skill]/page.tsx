"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dumbbell, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This is a dynamic page that would normally fetch data based on the skill parameter
// For demo purposes, we're using a static example for the pull-up progression
export default function SkillPage({ params }: { params: { skill: string } }) {
  // In a real app, you would fetch this data based on the skill parameter
  const skillData = {
    name: "Pull-Up Progression",
    description: "Master the pull-up from zero to hero with this step-by-step progression.",
    image: "/placeholder.svg?height=400&width=800",
    levels: [
      {
        name: "Level 1: Dead Hang",
        description: "Build grip strength and shoulder stability by hanging from the bar.",
        instructions: [
          "Grab the pull-up bar with hands slightly wider than shoulder-width apart",
          "Hang with arms fully extended, shoulders engaged (pulled down and back)",
          "Keep your body tight, with a slight hollow body position",
          "Start with 10-20 seconds and gradually increase to 60 seconds",
        ],
        reps: "3-5 sets of 20-60 seconds",
        tips: "Focus on keeping your shoulders down and away from your ears. Engage your core throughout the movement.",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        name: "Level 2: Scapular Pull-Ups",
        description: "Learn to engage your back muscles properly, which is crucial for pull-ups.",
        instructions: [
          "Start in a dead hang position",
          "Without bending your arms, pull your shoulder blades down and together",
          "You'll rise slightly as your shoulders depress",
          "Lower back to the starting position with control",
        ],
        reps: "3-4 sets of 5-10 reps",
        tips: "This is not an arm movement. Focus on moving your shoulder blades only.",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        name: "Level 3: Negative Pull-Ups",
        description: "Build strength by focusing on the lowering (eccentric) phase of the pull-up.",
        instructions: [
          "Use a box or jump to get your chin above the bar",
          "Slowly lower yourself down with control",
          "Aim for a 3-5 second descent",
          "Once at the bottom, repeat by jumping back to the top position",
        ],
        reps: "3-4 sets of 5-8 reps",
        tips: "The slower you lower yourself, the more effective this exercise will be.",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        name: "Level 4: Band-Assisted Pull-Ups",
        description: "Use resistance bands to reduce your effective body weight and build pull-up strength.",
        instructions: [
          "Attach a resistance band to the pull-up bar",
          "Place your feet or knees in the band",
          "Perform pull-ups with the assistance of the band",
          "As you get stronger, use thinner bands that provide less assistance",
        ],
        reps: "3-4 sets of 5-10 reps",
        tips: "Keep your core engaged and avoid swinging. Focus on proper form.",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        name: "Level 5: Full Pull-Ups",
        description: "The standard pull-up, the foundation for many advanced calisthenics skills.",
        instructions: [
          "Hang from the bar with arms extended and shoulders engaged",
          "Pull yourself up until your chin clears the bar",
          "Lower yourself with control back to the starting position",
          "Repeat for the desired number of repetitions",
        ],
        reps: "3-5 sets of 5-8 reps",
        tips: "Avoid using momentum. Each rep should be controlled and deliberate.",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        name: "Level 6: Weighted Pull-Ups",
        description: "Add external weight to continue building strength beyond bodyweight pull-ups.",
        instructions: [
          "Use a weight belt, weighted vest, or hold a dumbbell between your feet",
          "Perform standard pull-ups with the additional weight",
          "Start with a small amount of weight and gradually increase",
        ],
        reps: "3-5 sets of 3-5 reps",
        tips: "Master regular pull-ups (8-10 clean reps) before attempting weighted pull-ups.",
        image: "/placeholder.svg?height=300&width=500",
      },
    ],
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
          <div className="flex gap-4">
            <Link href="/quiz">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <Link href="/skills" className="inline-flex items-center text-sm font-medium mb-4">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to Skills
            </Link>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{skillData.name}</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {skillData.description}
                </p>
              </div>
              <div className="mx-auto w-full max-w-[500px] overflow-hidden rounded-xl">
                <Image
                  src={skillData.image || "/placeholder.svg"}
                  alt={skillData.name}
                  width={800}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter mb-8">Progression Levels</h2>

            <Tabs defaultValue="level1" className="w-full">
              <TabsList className="mb-8 flex flex-wrap h-auto">
                {skillData.levels.map((level, index) => (
                  <TabsTrigger key={index} value={`level${index + 1}`} className="mb-2">
                    Level {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>

              {skillData.levels.map((level, index) => (
                <TabsContent key={index} value={`level${index + 1}`}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{level.name}</CardTitle>
                      <CardDescription>{level.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="text-lg font-bold mb-2">Instructions</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {level.instructions.map((instruction, i) => (
                            <li key={i} className="text-sm">
                              {instruction}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4">
                          <h3 className="text-lg font-bold mb-2">Recommended</h3>
                          <p className="text-sm">{level.reps}</p>
                        </div>
                        <div className="mt-4">
                          <h3 className="text-lg font-bold mb-2">Tips</h3>
                          <p className="text-sm">{level.tips}</p>
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-lg">
                        <Image
                          src={level.image || "/placeholder.svg"}
                          alt={level.name}
                          width={500}
                          height={300}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {index > 0 && (
                        <Button
                          variant="outline"
                          onClick={() => document.querySelector(`[value="level${index}"]`)?.click()}
                        >
                          Previous Level
                        </Button>
                      )}
                      {index < skillData.levels.length - 1 && (
                        <Button onClick={() => document.querySelector(`[value="level${index + 2}"]`)?.click()}>
                          Next Level
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Start Training?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take our personalization quiz to get a training program that includes this skill progression.
                </p>
              </div>
              <Link href="/quiz">
                <Button size="lg" className="mt-4">
                  Take the Quiz
                </Button>
              </Link>
            </div>
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
