import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dumbbell, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPlaceholderImage } from "@/lib/placeholder"

export default function SkillsOverviewPage() {
  const skillCategories = [
    {
      title: "Upper Body Push",
      skills: [
        {
          name: "Push-Up",
          description: "The foundation of upper body pushing strength",
          progressions: [
            "Incline Push-Ups",
            "Knee Push-Ups",
            "Full Push-Ups",
            "Diamond Push-Ups",
            "Archer Push-Ups",
            "One-Arm Push-Up Progressions",
          ],
          image: getPlaceholderImage(300, 200, "Push-Up"),
          link: "/skills/push-up",
        },
        {
          name: "Dips",
          description: "Great for chest, triceps and shoulders",
          progressions: [
            "Bench Dips",
            "Straight Bar Dips",
            "Parallel Bar Dips",
            "Ring Dips",
            "Russian Dips",
            "Korean Dips",
          ],
          image: getPlaceholderImage(300, 200, "Dips"),
          link: "/skills/dips",
        },
        {
          name: "Handstand Push-Up",
          description: "Ultimate shoulder and upper body strength",
          progressions: [
            "Pike Push-Ups",
            "Elevated Pike Push-Ups",
            "Wall Headstand Hold",
            "Wall Handstand Hold",
            "Wall Handstand Negatives",
            "Wall Handstand Push-Ups",
            "Free Handstand Push-Ups",
          ],
          image: getPlaceholderImage(300, 200, "HSPU"),
          link: "/skills/handstand",
        },
        {
          name: "Planche",
          description: "Advanced pushing strength skill",
          progressions: [
            "Plank",
            "Elevated Plank",
            "Frog Stand",
            "Tuck Planche",
            "Advanced Tuck Planche",
            "Straddle Planche",
            "Full Planche",
          ],
          image: getPlaceholderImage(300, 200, "Planche"),
          link: "/skills/planche",
        },
      ],
    },
    {
      title: "Upper Body Pull",
      skills: [
        {
          name: "Pull-Up",
          description: "Essential upper body pulling movement",
          progressions: [
            "Dead Hangs",
            "Scapular Pull-Ups",
            "Negative Pull-Ups",
            "Australian Pull-Ups",
            "Full Pull-Ups",
            "Weighted Pull-Ups",
            "One-Arm Pull-Up Progressions",
          ],
          image: getPlaceholderImage(300, 200, "Pull-Up"),
          link: "/skills/pull-up",
        },
        {
          name: "Rows",
          description: "Horizontal pulling for back development",
          progressions: ["Incline Rows", "Horizontal Rows", "Decline Rows", "Archer Rows", "One-Arm Row Progressions"],
          image: getPlaceholderImage(300, 200, "Rows"),
          link: "/skills/rows",
        },
        {
          name: "Front Lever",
          description: "Advanced core and back strength skill",
          progressions: [
            "Dead Hang",
            "Tuck Front Lever",
            "Advanced Tuck Front Lever",
            "Single Leg Front Lever",
            "Straddle Front Lever",
            "Full Front Lever",
          ],
          image: getPlaceholderImage(300, 200, "Front Lever"),
          link: "/skills/front-lever",
        },
        {
          name: "Muscle-Up",
          description: "Combination of pull-up and dip",
          progressions: [
            "Pull-Ups & Dips",
            "High Pull-Ups",
            "Explosive Pull-Ups",
            "Negative Muscle-Ups",
            "Kipping Muscle-Ups",
            "Strict Muscle-Ups",
          ],
          image: getPlaceholderImage(300, 200, "Muscle-Up"),
          link: "/skills/muscle-up",
        },
      ],
    },
    {
      title: "Core",
      skills: [
        {
          name: "L-Sit",
          description: "Fundamental core and compression strength",
          progressions: [
            "Foot Supported L-Sit",
            "One Leg L-Sit",
            "Tuck L-Sit",
            "Advanced Tuck L-Sit",
            "Full L-Sit",
            "V-Sit",
          ],
          image: getPlaceholderImage(300, 200, "L-Sit"),
          link: "/skills/l-sit",
        },
        {
          name: "Dragon Flag",
          description: "Advanced core control and strength",
          progressions: [
            "Lying Leg Raises",
            "Partial Dragon Flag",
            "Tuck Dragon Flag",
            "Single Leg Dragon Flag",
            "Straddle Dragon Flag",
            "Full Dragon Flag",
          ],
          image: getPlaceholderImage(300, 200, "Dragon Flag"),
          link: "/skills/dragon-flag",
        },
        {
          name: "Human Flag",
          description: "Impressive lateral core and shoulder strength",
          progressions: [
            "Vertical Flag Hold",
            "Tuck Human Flag",
            "Single Leg Human Flag",
            "Straddle Human Flag",
            "Full Human Flag",
          ],
          image: getPlaceholderImage(300, 200, "Human Flag"),
          link: "/skills/human-flag",
        },
        {
          name: "Ab Wheel",
          description: "Dynamic core stability and strength",
          progressions: ["Kneeling Ab Wheel Rollout", "Partial Standing Rollout", "Full Standing Rollout"],
          image: getPlaceholderImage(300, 200, "Ab Wheel"),
          link: "/skills/ab-wheel",
        },
      ],
    },
    {
      title: "Lower Body",
      skills: [
        {
          name: "Pistol Squat",
          description: "Single leg strength and balance",
          progressions: [
            "Assisted Squat",
            "Full Squat",
            "Assisted Pistol Squat",
            "Elevated Pistol Squat",
            "Full Pistol Squat",
          ],
          image: getPlaceholderImage(300, 200, "Pistol Squat"),
          link: "/skills/pistol-squat",
        },
        {
          name: "Nordic Curl",
          description: "Posterior chain and hamstring development",
          progressions: ["Partial Nordic Curl", "Assisted Nordic Curl", "Full Nordic Curl"],
          image: getPlaceholderImage(300, 200, "Nordic Curl"),
          link: "/skills/nordic-curl",
        },
        {
          name: "Shrimp Squat",
          description: "Advanced single leg strength variation",
          progressions: ["Assisted Shrimp Squat", "Partial Shrimp Squat", "Full Shrimp Squat", "Elevated Shrimp Squat"],
          image: getPlaceholderImage(300, 200, "Shrimp Squat"),
          link: "/skills/shrimp-squat",
        },
        {
          name: "Glute Bridge",
          description: "Posterior chain activation and strength",
          progressions: [
            "Two-Leg Glute Bridge",
            "Elevated Glute Bridge",
            "Single-Leg Glute Bridge",
            "Weighted Glute Bridge",
          ],
          image: getPlaceholderImage(300, 200, "Glute Bridge"),
          link: "/skills/glute-bridge",
        },
      ],
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
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Calisthenics Skill Progressions</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Master impressive bodyweight skills with our step-by-step progression guides.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="Upper Body Push" className="w-full">
              <TabsList className="flex flex-wrap h-auto mb-8">
                {skillCategories.map((category) => (
                  <TabsTrigger key={category.title} value={category.title} className="mb-2">
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {skillCategories.map((category) => (
                <TabsContent key={category.title} value={category.title}>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {category.skills.map((skill, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="aspect-video overflow-hidden">
                          <Image
                            src={skill.image || "/placeholder.svg"}
                            alt={skill.name}
                            width={300}
                            height={200}
                            className="object-cover w-full h-full transition-transform hover:scale-105"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle>{skill.name}</CardTitle>
                          <CardDescription>{skill.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <h3 className="text-sm font-medium mb-2">Progression Path:</h3>
                          <ul className="text-sm space-y-1 text-muted-foreground list-disc pl-5">
                            {skill.progressions.slice(0, 3).map((progression, i) => (
                              <li key={i}>{progression}</li>
                            ))}
                            {skill.progressions.length > 3 && (
                              <li className="text-primary">+ {skill.progressions.length - 3} more steps</li>
                            )}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Link href={skill.link} className="w-full">
                            <Button variant="outline" className="w-full">
                              View Full Progression <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Not Sure Where to Start?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take our personalization quiz to get recommendations tailored to your goals and current fitness level.
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
            Made By Rohan Salem &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
