import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dumbbell, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExercisesPage() {
  const exerciseCategories = ["All", "Push", "Pull", "Legs", "Core", "Cardio", "Mobility"]

  const exercises = [
    {
      name: "Push-Up",
      category: "Push",
      difficulty: "Beginner",
      muscles: "Chest, Shoulders, Triceps",
      image: "/placeholder.svg?height=200&width=300",
      link: "/exercises/push-up",
    },
    {
      name: "Pull-Up",
      category: "Pull",
      difficulty: "Intermediate",
      muscles: "Back, Biceps, Forearms",
      image: "/placeholder.svg?height=200&width=300",
      link: "/exercises/pull-up",
    },
    {
      name: "Bodyweight Squat",
      category: "Legs",
      difficulty: "Beginner",
      muscles: "Quadriceps, Glutes, Hamstrings",
      image: "/placeholder.svg?height=200&width=300",
      link: "/exercises/bodyweight-squat",
    },
    {
      name: "Plank",
      category: "Core",
      difficulty: "Beginner",
      muscles: "Abs, Lower Back",
      image: "/placeholder.svg?height=200&width=300",
      link: "/exercises/plank",
    },
    {
      name: "Dips",
      category: "Push",
      difficulty: "Intermediate",
      muscles: "Chest, Triceps, Shoulders",
      image: "/placeholder.svg?height=200&width=300",
      link: "/exercises/dips",
    },
    {
      name: "Inverted Row",
      category: "Pull",
      difficulty: "Beginner",
      muscles: "Back, Biceps",
      image: "/placeholder.svg?height=200&width=300",
      link: "/exercises/inverted-row",
    },
    {
      name: "Pistol Squat",
      category: "Legs",
      difficulty: "Advanced",
      muscles: "Quadriceps, Glutes, Hamstrings, Balance",
      image: "/placeholder.svg?height=200&width=300",
      link: "/exercises/pistol-squat",
    },
    {
      name: "L-Sit",
      category: "Core",
      difficulty: "Intermediate",
      muscles: "Abs, Hip Flexors, Quads",
      image: "/placeholder.svg?height=200&width=300",
      link: "/exercises/l-sit",
    },
    {
      name: "Handstand Push-Up",
      category: "Push",
      difficulty: "Advanced",
      muscles: "Shoulders, Triceps, Core",
      image: "/placeholder.svg?height=200&width=300",
      link: "/exercises/handstand-push-up",
    },
    {
      name: "Muscle-Up",
      category: "Pull",
      difficulty: "Advanced",
      muscles: "Back, Biceps, Triceps, Shoulders",
      image: "/placeholder.svg?height=200&width=300",
      link: "/exercises/muscle-up",
    },
    {
      name: "Burpee",
      category: "Cardio",
      difficulty: "Intermediate",
      muscles: "Full Body",
      image: "/placeholder.svg?height=200&width=300",
      link: "/exercises/burpee",
    },
    {
      name: "Jefferson Curl",
      category: "Mobility",
      difficulty: "Intermediate",
      muscles: "Spine, Hamstrings",
      image: "/placeholder.svg?height=200&width=300",
      link: "/exercises/jefferson-curl",
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Exercise Library</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Browse our comprehensive collection of calisthenics exercises for all levels.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search exercises..." className="pl-8" />
              </div>
              <div className="flex gap-4">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </div>
            </div>

            <Tabs defaultValue="All">
              <TabsList className="mb-8 flex flex-wrap h-auto">
                {exerciseCategories.map((category, index) => (
                  <TabsTrigger key={index} value={category} className="mb-2">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {exerciseCategories.map((category, categoryIndex) => (
                <TabsContent key={categoryIndex} value={category}>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {exercises
                      .filter((exercise) => category === "All" || exercise.category === category)
                      .map((exercise, exerciseIndex) => (
                        <Card key={exerciseIndex} className="overflow-hidden">
                          <div className="aspect-video w-full overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-6xl">
                              {exercise.category === "Push"
                                ? "💪"
                                : exercise.category === "Pull"
                                  ? "🏋️"
                                  : exercise.category === "Legs"
                                    ? "🦵"
                                    : exercise.category === "Core"
                                      ? "🔄"
                                      : exercise.category === "Cardio"
                                        ? "❤️"
                                        : exercise.category === "Mobility"
                                          ? "🤸"
                                          : "🏆"}
                            </div>
                          </div>
                          <CardHeader className="p-4">
                            <CardTitle>{exercise.name}</CardTitle>
                            <CardDescription>{exercise.muscles}</CardDescription>
                          </CardHeader>
                          <CardFooter className="p-4 pt-0 flex justify-between">
                            <div className="flex items-center text-sm">
                              <span className="font-medium">{exercise.difficulty}</span>
                            </div>
                            <Link href={exercise.link}>
                              <Button variant="outline" size="sm">
                                View Details
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Need Guidance?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take our personalization quiz to get exercise recommendations tailored to your goals and current
                  fitness level.
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
