"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dumbbell, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPlaceholderImage } from "@/lib/placeholder"
import { useEffect, useState } from "react"

// Define the skill data structure
interface SkillLevel {
  name: string
  description: string
  instructions: string[]
  reps: string
  tips: string
  image: string
}

interface SkillData {
  name: string
  description: string
  image: string
  levels: SkillLevel[]
}

export default function SkillPage({ params }: { params: { skill: string } }) {
  const [skillData, setSkillData] = useState<SkillData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get the skill data based on the skill parameter
    const data = getSkillData(params.skill)
    setSkillData(data)
    setLoading(false)
  }, [params.skill])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p>Loading skill data...</p>
        </div>
      </div>
    )
  }

  if (!skillData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-center max-w-md p-4">
          <h2 className="text-2xl font-bold">Skill Not Found</h2>
          <p className="text-muted-foreground mb-4">
            Sorry, we couldn't find the skill you're looking for. Please check the URL or browse our skill library.
          </p>
          <Link href="/skills-overview">
            <Button>Browse All Skills</Button>
          </Link>
        </div>
      </div>
    )
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
            <Link href="/account/profile" className="text-sm font-medium hover:underline underline-offset-4">
              My Account
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
            <Link href="/skills-overview" className="inline-flex items-center text-sm font-medium mb-4">
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
            &copy; {new Date().getFullYear()} CalisthenicsPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

// Function to get skill data based on the skill parameter
function getSkillData(skillId: string): SkillData {
  // Map of skill IDs to their data
  const skillsData: Record<string, SkillData> = {
    "pull-up": {
      name: "Pull-Up Progression",
      description: "Master the pull-up from zero to hero with this step-by-step progression.",
      image: getPlaceholderImage(800, 400, "Pull-Up Progression"),
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
          image: getPlaceholderImage(500, 300, "Dead Hang"),
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
          image: getPlaceholderImage(500, 300, "Scapular Pull-Ups"),
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
          image: getPlaceholderImage(500, 300, "Negative Pull-Ups"),
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
          image: getPlaceholderImage(500, 300, "Band-Assisted Pull-Ups"),
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
          image: getPlaceholderImage(500, 300, "Full Pull-Ups"),
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
          image: getPlaceholderImage(500, 300, "Weighted Pull-Ups"),
        },
      ],
    },
    "push-up": {
      name: "Push-Up Progression",
      description: "Master the push-up with proper form and progress to advanced variations.",
      image: getPlaceholderImage(800, 400, "Push-Up Progression"),
      levels: [
        {
          name: "Level 1: Wall Push-Ups",
          description: "The easiest variation to learn proper push-up form with minimal resistance.",
          instructions: [
            "Stand facing a wall at arm's length",
            "Place your hands on the wall at shoulder height, slightly wider than shoulder-width apart",
            "Bend your elbows to bring your chest toward the wall",
            "Push back to the starting position",
          ],
          reps: "3 sets of 10-15 reps",
          tips: "Focus on keeping your body in a straight line from head to heels. Engage your core throughout the movement.",
          image: getPlaceholderImage(500, 300, "Wall Push-Ups"),
        },
        {
          name: "Level 2: Incline Push-Ups",
          description: "An intermediate step between wall push-ups and floor push-ups.",
          instructions: [
            "Find a stable elevated surface (bench, table, etc.)",
            "Place your hands on the surface, slightly wider than shoulder-width apart",
            "Position your body in a straight line with arms extended",
            "Lower your chest to the surface and push back up",
          ],
          reps: "3 sets of 8-12 reps",
          tips: "The higher the surface, the easier the exercise. Gradually decrease the height as you get stronger.",
          image: getPlaceholderImage(500, 300, "Incline Push-Ups"),
        },
        {
          name: "Level 3: Knee Push-Ups",
          description: "A modified version of the standard push-up with reduced body weight.",
          instructions: [
            "Start in a modified plank position with knees on the ground",
            "Place hands slightly wider than shoulder-width apart",
            "Keep your back straight and core engaged",
            "Lower your chest to the ground and push back up",
          ],
          reps: "3 sets of 8-12 reps",
          tips: "Focus on full range of motion and proper form. Don't let your hips sag or pike up.",
          image: getPlaceholderImage(500, 300, "Knee Push-Ups"),
        },
        {
          name: "Level 4: Standard Push-Ups",
          description: "The classic push-up, a fundamental upper body exercise.",
          instructions: [
            "Start in a plank position with hands slightly wider than shoulder-width apart",
            "Keep your body in a straight line from head to heels",
            "Lower your chest to the ground by bending your elbows",
            "Push back up to the starting position",
          ],
          reps: "3 sets of 8-12 reps",
          tips: "Keep your elbows at about a 45-degree angle to your body, not flared out to the sides.",
          image: getPlaceholderImage(500, 300, "Standard Push-Ups"),
        },
        {
          name: "Level 5: Diamond Push-Ups",
          description: "A challenging variation that emphasizes the triceps.",
          instructions: [
            "Start in a plank position with hands close together, forming a diamond shape with your thumbs and index fingers",
            "Keep your body in a straight line from head to heels",
            "Lower your chest to your hands",
            "Push back up to the starting position",
          ],
          reps: "3 sets of 8-10 reps",
          tips: "Keep your elbows close to your body throughout the movement.",
          image: getPlaceholderImage(500, 300, "Diamond Push-Ups"),
        },
        {
          name: "Level 6: Decline Push-Ups",
          description: "An advanced variation with feet elevated to increase upper chest and shoulder engagement.",
          instructions: [
            "Place your feet on an elevated surface (bench, step, etc.)",
            "Position your hands on the ground, slightly wider than shoulder-width apart",
            "Keep your body in a straight line from head to heels",
            "Lower your chest to the ground and push back up",
          ],
          reps: "3 sets of 8-12 reps",
          tips: "The higher your feet, the more challenging the exercise becomes.",
          image: getPlaceholderImage(500, 300, "Decline Push-Ups"),
        },
      ],
    },
    planche: {
      name: "Planche Progression",
      description: "Master the impressive planche, one of the most challenging calisthenics skills.",
      image: getPlaceholderImage(800, 400, "Planche Progression"),
      levels: [
        {
          name: "Level 1: Plank",
          description: "Build the foundational strength and body awareness needed for planche training.",
          instructions: [
            "Start in a push-up position with arms straight",
            "Engage your core and keep your body in a straight line from head to heels",
            "Hold the position while breathing normally",
            "Focus on keeping shoulders protracted (pushed away from the ground)",
          ],
          reps: "3-5 sets of 30-60 second holds",
          tips: "Squeeze your glutes and quads to maintain a straight body line. Don't let your hips sag or pike up.",
          image: getPlaceholderImage(500, 300, "Plank"),
        },
        {
          name: "Level 2: Planche Lean",
          description: "Learn to shift your weight forward, a crucial component of the planche.",
          instructions: [
            "Start in a push-up position with arms straight",
            "Shift your shoulders forward beyond your wrists",
            "Keep your arms straight and body tight",
            "Lean as far forward as possible while maintaining position",
          ],
          reps: "3-5 sets of 15-30 second holds",
          tips: "The further you lean, the more difficult it becomes. Progress gradually to avoid wrist strain.",
          image: getPlaceholderImage(500, 300, "Planche Lean"),
        },
        {
          name: "Level 3: Frog Stand",
          description: "A beginner planche position that teaches balance and weight distribution.",
          instructions: [
            "Squat down and place your hands on the ground, shoulder-width apart",
            "Rest your knees on your elbows",
            "Lean forward until your feet lift off the ground",
            "Balance in this position with your head up",
          ],
          reps: "3-5 sets of 20-30 second holds",
          tips: "Look slightly forward, not down, to help with balance. Keep your arms straight.",
          image: getPlaceholderImage(500, 300, "Frog Stand"),
        },
        {
          name: "Level 4: Tuck Planche",
          description: "The first true planche position, with your body held parallel to the ground.",
          instructions: [
            "Start in a push-up position",
            "Lean forward, shifting your shoulders beyond your wrists",
            "Tuck your knees tightly to your chest",
            "Lift your feet off the ground while maintaining position",
          ],
          reps: "3-5 sets of 10-20 second holds",
          tips: "Keep your arms straight and shoulders protracted. Round your upper back slightly.",
          image: getPlaceholderImage(500, 300, "Tuck Planche"),
        },
        {
          name: "Level 5: Advanced Tuck Planche",
          description: "A progression from the tuck planche with less knee bend.",
          instructions: [
            "Start in a tuck planche position",
            "Gradually extend your hips, moving your knees away from your chest",
            "Keep your back parallel to the ground",
            "Maintain straight arms and protracted shoulders",
          ],
          reps: "3-5 sets of 8-15 second holds",
          tips: "This is significantly harder than the tuck planche. Progress slowly and be patient.",
          image: getPlaceholderImage(500, 300, "Advanced Tuck Planche"),
        },
        {
          name: "Level 6: Straddle Planche",
          description: "An advanced planche variation with legs spread wide apart.",
          instructions: [
            "Start in an advanced tuck planche",
            "Open your legs into a wide straddle position",
            "Keep your legs straight and toes pointed",
            "Maintain your body parallel to the ground",
          ],
          reps: "3-5 sets of 5-10 second holds",
          tips: "The wider your straddle, the easier the position. Gradually bring your legs closer as you get stronger.",
          image: getPlaceholderImage(500, 300, "Straddle Planche"),
        },
        {
          name: "Level 7: Full Planche",
          description: "The ultimate planche position with legs together and body parallel to the ground.",
          instructions: [
            "Start in a straddle planche",
            "Gradually bring your legs together",
            "Keep your body completely straight and parallel to the ground",
            "Maintain straight arms and protracted shoulders",
          ],
          reps: "3-5 sets of 3-8 second holds",
          tips: "This is an extremely advanced skill that may take years to achieve. Be patient and consistent with your training.",
          image: getPlaceholderImage(500, 300, "Full Planche"),
        },
      ],
    },
    "front-lever": {
      name: "Front Lever Progression",
      description: "Master the front lever, an impressive display of core and back strength.",
      image: getPlaceholderImage(800, 400, "Front Lever Progression"),
      levels: [
        {
          name: "Level 1: Dead Hang",
          description: "Build the grip and shoulder strength needed for front lever training.",
          instructions: [
            "Hang from a pull-up bar with hands shoulder-width apart",
            "Engage your shoulders by pulling them down and back",
            "Keep your body straight and core tight",
            "Hold the position while breathing normally",
          ],
          reps: "3-5 sets of 30-60 second holds",
          tips: "Focus on active hanging - pull your shoulders down away from your ears.",
          image: getPlaceholderImage(500, 300, "Dead Hang"),
        },
        {
          name: "Level 2: Tuck Front Lever",
          description: "The first progression toward a full front lever.",
          instructions: [
            "Hang from a pull-up bar with hands shoulder-width apart",
            "Pull your shoulder blades down and back",
            "Tuck your knees tightly to your chest",
            "Lift your body until it's parallel to the ground",
          ],
          reps: "3-5 sets of 10-20 second holds",
          tips: "Keep your arms straight and focus on pulling with your back muscles.",
          image: getPlaceholderImage(500, 300, "Tuck Front Lever"),
        },
        {
          name: "Level 3: Advanced Tuck Front Lever",
          description: "A progression from the tuck front lever with less knee bend.",
          instructions: [
            "Start in a tuck front lever position",
            "Gradually extend your hips, moving your knees away from your chest",
            "Keep your body parallel to the ground",
            "Maintain straight arms and engaged shoulders",
          ],
          reps: "3-5 sets of 8-15 second holds",
          tips: "Focus on keeping your hips at the same level as your shoulders.",
          image: getPlaceholderImage(500, 300, "Advanced Tuck Front Lever"),
        },
        {
          name: "Level 4: Single Leg Front Lever",
          description: "An intermediate step with one leg extended and one leg tucked.",
          instructions: [
            "Start in an advanced tuck front lever",
            "Extend one leg straight while keeping the other tucked",
            "Keep your body parallel to the ground",
            "Maintain straight arms and engaged shoulders",
          ],
          reps: "3-5 sets of 5-10 second holds per leg",
          tips: "Practice with both legs to ensure balanced development.",
          image: getPlaceholderImage(500, 300, "Single Leg Front Lever"),
        },
        {
          name: "Level 5: Straddle Front Lever",
          description: "An advanced front lever variation with legs spread wide apart.",
          instructions: [
            "Start in a single leg front lever",
            "Extend both legs into a wide straddle position",
            "Keep your legs straight and toes pointed",
            "Maintain your body parallel to the ground",
          ],
          reps: "3-5 sets of 5-10 second holds",
          tips: "The wider your straddle, the easier the position. Gradually bring your legs closer as you get stronger.",
          image: getPlaceholderImage(500, 300, "Straddle Front Lever"),
        },
        {
          name: "Level 6: Full Front Lever",
          description: "The ultimate front lever position with legs together and body parallel to the ground.",
          instructions: [
            "Start in a straddle front lever",
            "Gradually bring your legs together",
            "Keep your body completely straight and parallel to the ground",
            "Maintain straight arms and engaged shoulders",
          ],
          reps: "3-5 sets of 3-8 second holds",
          tips: "This is an advanced skill that requires significant strength. Be patient and consistent with your training.",
          image: getPlaceholderImage(500, 300, "Full Front Lever"),
        },
      ],
    },
    handstand: {
      name: "Handstand Progression",
      description: "Learn to balance upside down and build incredible shoulder strength and body control.",
      image: getPlaceholderImage(800, 400, "Handstand Progression"),
      levels: [
        {
          name: "Level 1: Wall Plank",
          description: "Build the shoulder strength and body awareness needed for handstand training.",
          instructions: [
            "Start in a plank position with your feet against a wall",
            "Walk your feet up the wall until your body forms roughly a 45-degree angle with the ground",
            "Keep your arms straight and shoulders engaged",
            "Hold the position while breathing normally",
          ],
          reps: "3-5 sets of 30-60 second holds",
          tips: "Focus on pushing the ground away and keeping your shoulders active.",
          image: getPlaceholderImage(500, 300, "Wall Plank"),
        },
        {
          name: "Level 2: Pike Push-Ups",
          description: "Develop the pushing strength needed for handstand work.",
          instructions: [
            "Start in a downward dog position with hands shoulder-width apart",
            "Bend your elbows to lower your head toward the ground",
            "Push back up to the starting position",
            "Keep your hips high throughout the movement",
          ],
          reps: "3 sets of 8-12 reps",
          tips: "The more vertical your body, the more challenging the exercise becomes.",
          image: getPlaceholderImage(500, 300, "Pike Push-Ups"),
        },
        {
          name: "Level 3: Wall Walks",
          description: "Learn to find the inverted position safely with wall support.",
          instructions: [
            "Start in a plank position with feet against the wall",
            "Walk your hands backward and feet up the wall",
            "Continue until your body is vertical or nearly vertical",
            "Walk back down with control",
          ],
          reps: "3-5 sets of 3-5 reps",
          tips: "Move slowly and with control. This exercise helps build confidence in the inverted position.",
          image: getPlaceholderImage(500, 300, "Wall Walks"),
        },
        {
          name: "Level 4: Wall Handstand",
          description: "Practice the full handstand position with wall support.",
          instructions: [
            "Place your hands on the ground about 6 inches from a wall",
            "Kick up into a handstand with your back facing the wall",
            "Use the wall for support and balance",
            "Keep your body straight and core engaged",
          ],
          reps: "3-5 sets of 30-60 second holds",
          tips: "Focus on body alignment - ears, shoulders, hips, and feet should form a straight line.",
          image: getPlaceholderImage(500, 300, "Wall Handstand"),
        },
        {
          name: "Level 5: Wall Handstand Shoulder Taps",
          description: "Build stability and control in the handstand position.",
          instructions: [
            "Start in a wall handstand position",
            "Slowly lift one hand and tap the opposite shoulder",
            "Return the hand to the ground and repeat with the other hand",
            "Maintain a stable position throughout",
          ],
          reps: "3 sets of 3-5 taps per side",
          tips: "Shift your weight slightly before lifting each hand to maintain balance.",
          image: getPlaceholderImage(500, 300, "Handstand Shoulder Taps"),
        },
        {
          name: "Level 6: Freestanding Handstand",
          description: "The ultimate goal - balancing on your hands without support.",
          instructions: [
            "Place your hands on the ground shoulder-width apart",
            "Kick up into a handstand, finding your balance point",
            "Keep your body straight and core engaged",
            "Use small finger adjustments to maintain balance",
          ],
          reps: "Practice for 10-15 minutes daily",
          tips: "Look at a spot on the ground between your hands. Be patient - this skill takes time to master.",
          image: getPlaceholderImage(500, 300, "Freestanding Handstand"),
        },
      ],
    },
    "l-sit": {
      name: "L-Sit Progression",
      description: "Develop incredible core strength and compression with this fundamental gymnastics position.",
      image: getPlaceholderImage(800, 400, "L-Sit Progression"),
      levels: [
        {
          name: "Level 1: Supported Foot L-Sit",
          description: "Learn the basic position with feet on the ground for support.",
          instructions: [
            "Sit on the edge of a bench or between parallel bars",
            "Place your hands beside your hips and press down to lift your body",
            "Extend your legs forward with feet on the ground",
            "Keep your back straight and shoulders down",
          ],
          reps: "3-5 sets of 20-30 second holds",
          tips: "Focus on pushing down through your hands and keeping your arms straight.",
          image: getPlaceholderImage(500, 300, "Supported Foot L-Sit"),
        },
        {
          name: "Level 2: One Foot Supported L-Sit",
          description: "A progression with one foot raised and one foot supporting.",
          instructions: [
            "Start in the supported foot L-sit position",
            "Lift one foot off the ground and extend it forward",
            "Keep your leg straight and toes pointed",
            "Maintain straight arms and an upright torso",
          ],
          reps: "3-5 sets of 15-20 seconds per leg",
          tips: "Practice with both legs to ensure balanced development.",
          image: getPlaceholderImage(500, 300, "One Foot L-Sit"),
        },
        {
          name: "Level 3: Tuck L-Sit",
          description: "Both feet off the ground but knees bent to reduce leverage.",
          instructions: [
            "Sit on the ground with hands placed beside your hips",
            "Press down to lift your entire body off the ground",
            "Tuck your knees toward your chest",
            "Keep your arms straight and shoulders down",
          ],
          reps: "3-5 sets of 10-15 second holds",
          tips: "If floor L-sits are too challenging, practice on parallel bars or the edge of a bench.",
          image: getPlaceholderImage(500, 300, "Tuck L-Sit"),
        },
        {
          name: "Level 4: Advanced Tuck L-Sit",
          description: "A progression from the tuck L-sit with less knee bend.",
          instructions: [
            "Start in a tuck L-sit position",
            "Gradually extend your hips, moving your knees away from your chest",
            "Keep your body lifted off the ground",
            "Maintain straight arms and shoulders down",
          ],
          reps: "3-5 sets of 8-12 second holds",
          tips: "Focus on keeping your back straight and chest up.",
          image: getPlaceholderImage(500, 300, "Advanced Tuck L-Sit"),
        },
        {
          name: "Level 5: Single Leg L-Sit",
          description: "One leg extended and one leg tucked - an intermediate step.",
          instructions: [
            "Start in an advanced tuck L-sit",
            "Extend one leg straight while keeping the other tucked",
            "Point your toes and keep your extended leg parallel to the ground",
            "Maintain straight arms and an upright torso",
          ],
          reps: "3-5 sets of 5-10 seconds per leg",
          tips: "Alternate legs to ensure balanced development.",
          image: getPlaceholderImage(500, 300, "Single Leg L-Sit"),
        },
        {
          name: "Level 6: Full L-Sit",
          description: "The complete L-sit position with both legs extended.",
          instructions: [
            "Sit on the ground with hands placed beside your hips",
            "Press down to lift your entire body off the ground",
            "Extend both legs forward, parallel to the ground",
            "Keep your back straight, arms straight, and shoulders down",
          ],
          reps: "3-5 sets of 5-15 second holds",
          tips: "This is a challenging position that requires significant strength. Progress gradually and be patient.",
          image: getPlaceholderImage(500, 300, "Full L-Sit"),
        },
      ],
    },
    "muscle-up": {
      name: "Muscle-Up Progression",
      description: "Master the impressive transition from below the bar to above it in one fluid movement.",
      image: getPlaceholderImage(800, 400, "Muscle-Up Progression"),
      levels: [
        {
          name: "Level 1: Pull-Ups & Dips",
          description: "Build the foundational strength needed for muscle-ups.",
          instructions: [
            "Practice strict pull-ups, focusing on full range of motion",
            "Practice deep dips on parallel bars or rings",
            "Aim to master both exercises separately before combining them",
            "For pull-ups, focus on pulling your chest to the bar",
          ],
          reps: "3-4 sets of 8-10 reps of each exercise",
          tips: "You should be able to do at least 10 clean pull-ups and 10 deep dips before progressing.",
          image: getPlaceholderImage(500, 300, "Pull-Ups and Dips"),
        },
        {
          name: "Level 2: High Pull-Ups",
          description: "Learn to pull higher than a regular pull-up, bringing your chest to the bar.",
          instructions: [
            "Hang from a pull-up bar with hands slightly wider than shoulder-width",
            "Pull yourself up explosively, aiming to get your chest to the bar",
            "Focus on pulling your elbows behind your back",
            "Lower with control and repeat",
          ],
          reps: "3-4 sets of 5-8 reps",
          tips: "The higher you can pull, the easier the transition to a muscle-up will be.",
          image: getPlaceholderImage(500, 300, "High Pull-Ups"),
        },
        {
          name: "Level 3: Negative Muscle-Ups",
          description: "Practice the muscle-up movement in reverse to build strength and technique.",
          instructions: [
            "Use a box to get into the top position of a muscle-up (above the bar)",
            "Slowly lower yourself through the transition phase",
            "Continue lowering until you're hanging below the bar",
            "Return to the starting position using the box",
          ],
          reps: "3-4 sets of 3-5 reps",
          tips: "Focus on the transition phase where you move from pull-up to dip. This is the most challenging part.",
          image: getPlaceholderImage(500, 300, "Negative Muscle-Ups"),
        },
        {
          name: "Level 4: Banded Muscle-Ups",
          description: "Use resistance bands to assist with the muscle-up movement.",
          instructions: [
            "Attach a resistance band to the pull-up bar",
            "Place one foot or knee in the band for assistance",
            "Perform the complete muscle-up movement with the band's help",
            "Focus on proper technique through the transition",
          ],
          reps: "3-4 sets of 3-5 reps",
          tips: "As you get stronger, use thinner bands that provide less assistance.",
          image: getPlaceholderImage(500, 300, "Banded Muscle-Ups"),
        },
        {
          name: "Level 5: Kipping Muscle-Ups",
          description: "Use momentum to help with the transition while learning the movement pattern.",
          instructions: [
            "Hang from the bar and initiate a swinging motion",
            "As you swing forward, pull explosively and lean your chest over the bar",
            "Quickly transition to the dipping phase by pushing down on the bar",
            "Complete the movement by straightening your arms",
          ],
          reps: "3-4 sets of 3-5 reps",
          tips: "While not as strict as a full muscle-up, this is a useful progression to learn the movement pattern.",
          image: getPlaceholderImage(500, 300, "Kipping Muscle-Ups"),
        },
        {
          name: "Level 6: Strict Muscle-Up",
          description: "The complete muscle-up performed with minimal momentum and perfect control.",
          instructions: [
            "Hang from the bar with a false grip (wrists over the bar)",
            "Pull explosively, bringing your chest to the bar",
            "As you reach the top of the pull, lean forward and rotate your wrists",
            "Transition to the dipping phase and press to straight arms",
          ],
          reps: "3-4 sets of 2-5 reps",
          tips: "The false grip is crucial for strict muscle-ups. Practice this grip separately until comfortable.",
          image: getPlaceholderImage(500, 300, "Strict Muscle-Up"),
        },
      ],
    },
    "pistol-squat": {
      name: "Pistol Squat Progression",
      description: "Master the one-legged squat for incredible leg strength, balance, and mobility.",
      image: getPlaceholderImage(800, 400, "Pistol Squat Progression"),
      levels: [
        {
          name: "Level 1: Assisted Squats",
          description: "Build basic squat strength and mobility with support.",
          instructions: [
            "Stand in front of a sturdy chair or bench",
            "Lower yourself until you touch the seat, then stand back up",
            "Keep your chest up and knees tracking over your toes",
            "Use your hands for balance if needed",
          ],
          reps: "3 sets of 10-15 reps",
          tips: "Focus on proper form - keep your heels down and back straight throughout the movement.",
          image: getPlaceholderImage(500, 300, "Assisted Squats"),
        },
        {
          name: "Level 2: Single Leg Sit to Stand",
          description: "Practice the one-legged movement with assistance.",
          instructions: [
            "Sit on a chair or bench with feet flat on the floor",
            "Extend one leg in front of you",
            "Stand up using primarily the planted foot (use hands for assistance if needed)",
            "Slowly sit back down and repeat",
          ],
          reps: "3 sets of 5-8 reps per leg",
          tips: "As you progress, try using less hand assistance.",
          image: getPlaceholderImage(500, 300, "Single Leg Sit to Stand"),
        },
        {
          name: "Level 3: Assisted Pistol Squat",
          description: "Practice the full range of motion with support for balance.",
          instructions: [
            "Stand next to a pole, TRX, or doorframe for support",
            "Extend one leg in front of you",
            "Hold onto the support and lower yourself on one leg",
            "Return to standing and repeat",
          ],
          reps: "3 sets of 5-8 reps per leg",
          tips: "Focus on controlling the descent. Use the support primarily for balance, not to pull yourself up.",
          image: getPlaceholderImage(500, 300, "Assisted Pistol Squat"),
        },
        {
          name: "Level 4: Box Pistol Squat",
          description: "Gradually increase range of motion by using boxes of decreasing height.",
          instructions: [
            "Stand in front of a box or stack of plates",
            "Extend one leg in front of you",
            "Lower yourself until you touch the box, then stand back up",
            "Progressively use lower boxes as you improve",
          ],
          reps: "3 sets of 5 reps per leg",
          tips: "This method allows you to incrementally increase the depth of your pistol squat.",
          image: getPlaceholderImage(500, 300, "Box Pistol Squat"),
        },
        {
          name: "Level 5: Counterbalance Pistol Squat",
          description: "Use a counterweight to help with balance and the ascent.",
          instructions: [
            "Hold a light weight (dumbbell, kettlebell) in front of you at arm's length",
            "Extend one leg in front of you",
            "Lower yourself into a full pistol squat",
            "Use the counterweight to help maintain balance",
          ],
          reps: "3 sets of 3-5 reps per leg",
          tips: "The counterweight helps shift your center of gravity forward, making balance easier.",
          image: getPlaceholderImage(500, 300, "Counterbalance Pistol Squat"),
        },
        {
          name: "Level 6: Full Pistol Squat",
          description: "The complete one-legged squat with no external support.",
          instructions: [
            "Stand on one leg with the other extended in front of you",
            "Keep your extended leg straight and off the ground",
            "Lower yourself into a full squat position",
            "Return to standing without losing balance",
          ],
          reps: "3 sets of 3-5 reps per leg",
          tips: "Keep your chest up and extended foot off the ground throughout the movement. Arms can be extended for balance.",
          image: getPlaceholderImage(500, 300, "Full Pistol Squat"),
        },
      ],
    },
    "human-flag": {
      name: "Human Flag Progression",
      description: "Learn to hold your body horizontally from a vertical pole - an impressive display of strength.",
      image: getPlaceholderImage(800, 400, "Human Flag Progression"),
      levels: [
        {
          name: "Level 1: Vertical Pull and Hold",
          description: "Build the foundational strength needed for the human flag.",
          instructions: [
            "Find a vertical pole or sturdy object you can grip with both hands",
            "Place your upper hand in an overhand grip and lower hand in an underhand grip",
            "Pull your body up and hold yourself close to the pole",
            "Focus on engaging your shoulders, core, and lats",
          ],
          reps: "3-5 sets of 20-30 second holds",
          tips: "This exercise helps you get comfortable with the grip and initial body position.",
          image: getPlaceholderImage(500, 300, "Vertical Pull and Hold"),
        },
        {
          name: "Level 2: Side Plank",
          description: "Develop the lateral core strength crucial for the human flag.",
          instructions: [
            "Lie on your side with elbow directly under shoulder",
            "Lift your hips to create a straight line from head to feet",
            "Extend your top arm toward the ceiling",
            "Hold the position while breathing normally",
          ],
          reps: "3 sets of 30-60 seconds per side",
          tips: "Focus on keeping your body in a perfectly straight line. Don't let your hips sag.",
          image: getPlaceholderImage(500, 300, "Side Plank"),
        },
        {
          name: "Level 3: Vertical Flag Hold",
          description: "Practice the flag position vertically to build specific strength.",
          instructions: [
            "Grip the pole with upper hand overhand and lower hand underhand",
            "Pull yourself up and position your body vertically along the pole",
            "Keep your body straight and legs together",
            "Hold this position, focusing on pulling with the upper arm and pushing with the lower arm",
          ],
          reps: "3-5 sets of 10-20 second holds",
          tips: "This vertical position is much easier than the horizontal flag but builds the same pattern of tension.",
          image: getPlaceholderImage(500, 300, "Vertical Flag Hold"),
        },
        {
          name: "Level 4: Tuck Human Flag",
          description: "The first true horizontal position, with knees tucked to reduce leverage.",
          instructions: [
            "Grip the pole with hands wide apart (upper hand overhand, lower hand underhand)",
            "Pull with your upper arm and push with your lower arm",
            "Lift your body to horizontal while tucking your knees to your chest",
            "Keep your core tight and body aligned",
          ],
          reps: "3-5 sets of 5-10 second holds",
          tips: "The tuck position significantly reduces the difficulty. Focus on getting truly horizontal.",
          image: getPlaceholderImage(500, 300, "Tuck Human Flag"),
        },
        {
          name: "Level 5: Single Leg Human Flag",
          description: "One leg extended and one leg tucked - an intermediate step.",
          instructions: [
            "Start in the tuck human flag position",
            "Extend one leg while keeping the other tucked",
            "Maintain the horizontal body position",
            "Keep pulling and pushing against the pole",
          ],
          reps: "3-5 sets of 3-8 seconds per leg",
          tips: "Practice with both legs to ensure balanced development.",
          image: getPlaceholderImage(500, 300, "Single Leg Human Flag"),
        },
        {
          name: "Level 6: Full Human Flag",
          description: "The complete human flag with body and legs fully extended horizontally.",
          instructions: [
            "Grip the pole with hands wide apart (upper hand overhand, lower hand underhand)",
            "Pull with your upper arm and push with your lower arm",
            "Lift your body to horizontal with legs fully extended and together",
            "Maintain a straight body line from head to toes",
          ],
          reps: "3-5 sets of 3-8 second holds",
          tips: "This is an extremely challenging skill. Even short holds are impressive. Focus on quality over duration.",
          image: getPlaceholderImage(500, 300, "Full Human Flag"),
        },
      ],
    },
  }

  // Return the data for the requested skill, or default to pull-up if not found
  return skillsData[skillId] || skillsData["pull-up"]
}
