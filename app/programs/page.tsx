import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dumbbell, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getPlaceholderImage } from "@/lib/placeholder"

export default function ProgramsPage() {
  const programs = [
    {
      title: "Beginner Calisthenics",
      description: "Perfect for those new to bodyweight training",
      duration: "8 weeks",
      level: "Beginner",
      workoutsPerWeek: 3,
      image: getPlaceholderImage(400, 250, "Beginner"),
      link: "/programs/beginner",
    },
    {
      title: "Intermediate Strength",
      description: "Build strength and master fundamental skills",
      duration: "12 weeks",
      level: "Intermediate",
      workoutsPerWeek: 4,
      image: getPlaceholderImage(400, 250, "Intermediate"),
      link: "/programs/intermediate",
    },
    {
      title: "Advanced Skills",
      description: "Master impressive calisthenics skills",
      duration: "16 weeks",
      level: "Advanced",
      workoutsPerWeek: 5,
      image: getPlaceholderImage(400, 250, "Advanced"),
      link: "/programs/advanced",
    },
    {
      title: "Hypertrophy Focus",
      description: "Build muscle mass with high-volume calisthenics",
      duration: "10 weeks",
      level: "Intermediate",
      workoutsPerWeek: 4,
      image: getPlaceholderImage(400, 250, "Hypertrophy"),
      link: "/programs/hypertrophy",
    },
    {
      title: "Fat Loss & Conditioning",
      description: "Burn fat and improve cardiovascular fitness",
      duration: "8 weeks",
      level: "All Levels",
      workoutsPerWeek: 5,
      image: getPlaceholderImage(400, 250, "Fat Loss"),
      link: "/programs/fat-loss",
    },
    {
      title: "Mobility & Recovery",
      description: "Improve flexibility and prevent injuries",
      duration: "6 weeks",
      level: "All Levels",
      workoutsPerWeek: 3,
      image: getPlaceholderImage(400, 250, "Mobility"),
      link: "/programs/mobility",
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Training Programs</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Structured calisthenics programs for all fitness levels and goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src={program.image || "/placeholder.svg"}
                      alt={program.title}
                      width={400}
                      height={250}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{program.title}</CardTitle>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Duration</p>
                        <p className="text-muted-foreground">{program.duration}</p>
                      </div>
                      <div>
                        <p className="font-medium">Level</p>
                        <p className="text-muted-foreground">{program.level}</p>
                      </div>
                      <div>
                        <p className="font-medium">Frequency</p>
                        <p className="text-muted-foreground">{program.workoutsPerWeek}x per week</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={program.link} className="w-full">
                      <Button className="w-full">
                        View Program <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Not Sure Which Program to Choose?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take our personalization quiz to get a program tailored to your goals and current fitness level.
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
