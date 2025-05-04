import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dumbbell, ChevronRight } from "lucide-react"

export default function SkillsPage() {
  const skillCategories = [
    {
      title: "Upper Body Push",
      skills: [
        {
          name: "Push-Up",
          levels: "Knee Push-Ups to One-Arm Push-Ups",
          image: "/placeholder.svg?height=200&width=300",
          link: "/skills/push-up",
        },
        {
          name: "Dips",
          levels: "Bench Dips to Ring Dips",
          image: "/placeholder.svg?height=200&width=300",
          link: "/skills/dips",
        },
        {
          name: "Handstand Push-Up",
          levels: "Pike Push-Ups to Free HSPU",
          image: "/placeholder.svg?height=200&width=300",
          link: "/skills/hspu",
        },
        {
          name: "Planche",
          levels: "Frog Stand to Full Planche",
          image: "/placeholder.svg?height=200&width=300",
          link: "/skills/planche",
        },
      ],
    },
    {
      title: "Upper Body Pull",
      skills: [
        {
          name: "Pull-Up",
          levels: "Negative Pull-Ups to One-Arm Pull-Ups",
          image: "/placeholder.svg?height=200&width=300",
          link: "/skills/pull-up",
        },
        {
          name: "Rows",
          levels: "Incline Rows to Front Lever Rows",
          image: "/placeholder.svg?height=200&width=300",
          link: "/skills/rows",
        },
        {
          name: "Front Lever",
          levels: "Tuck to Full Front Lever",
          image: "/placeholder.svg?height=200&width=300",
          link: "/skills/front-lever",
        },
        {
          name: "Back Lever",
          levels: "Tuck to Full Back Lever",
          image: "/placeholder.svg?height=200&width=300",
          link: "/skills/back-lever",
        },
      ],
    },
    {
      title: "Core",
      skills: [
        {
          name: "L-Sit",
          levels: "Tucked to Full L-Sit",
          image: "/placeholder.svg?height=200&width=300",
          link: "/skills/l-sit",
        },
        {
          name: "Dragon Flag",
          levels: "Negative to Full Dragon Flag",
          image: "/placeholder.svg?height=200&width=300",
          link: "/skills/dragon-flag",
        },
        {
          name: "Human Flag",
          levels: "Vertical to Horizontal Flag",
          image: "/placeholder.svg?height=200&width=300",
          link: "/skills/human-flag",
        },
        {
          name: "Ab Wheel",
          levels: "Kneeling to Standing Rollouts",
          image: "/placeholder.svg?height=200&width=300",
          link: "/skills/ab-wheel",
        },
      ],
    },
    {
      title: "Lower Body",
      skills: [
        {
          name: "Squat",
          levels: "Assisted to Pistol Squats",
          image: "/placeholder.svg?height=200&width=300",
          link: "/skills/squat",
        },
        {
          name: "Nordic Curl",
          levels: "Assisted to Full Nordic Curls",
          image: "/placeholder.svg?height=200&width=300",
          link: "/skills/nordic-curl",
        },
        {
          name: "Shrimp Squat",
          levels: "Assisted to Full Shrimp Squats",
          image: "/placeholder.svg?height=200&width=300",
          link: "/skills/shrimp-squat",
        },
        {
          name: "Glute Bridge",
          levels: "Two-Leg to One-Leg Bridges",
          image: "/placeholder.svg?height=200&width=300",
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
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Skill Progressions</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Master impressive calisthenics skills with our step-by-step progression guides.
                </p>
              </div>
            </div>
          </div>
        </section>

        {skillCategories.map((category, categoryIndex) => (
          <section key={categoryIndex} className="w-full py-12 md:py-16">
            <div className="container px-4 md:px-6">
              <h2 className="text-2xl font-bold mb-8">{category.title}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {category.skills.map((skill, skillIndex) => (
                  <Link key={skillIndex} href={skill.link} className="group relative overflow-hidden rounded-lg border">
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={skill.image || "/placeholder.svg"}
                        alt={skill.name}
                        width={300}
                        height={200}
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 bg-background">
                      <h3 className="font-bold">{skill.name}</h3>
                      <p className="text-sm text-muted-foreground">{skill.levels}</p>
                      <div className="flex items-center mt-2 text-sm text-primary">
                        View Progression <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

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
            Made By Rohan &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
