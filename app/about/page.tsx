import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dumbbell, Mail, Github, Linkedin } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getPlaceholderImage } from "@/lib/placeholder"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Rohan Sharma",
      role: "Founder & Head Coach",
      bio: "Former gymnast with 10+ years of calisthenics experience. Specializes in advanced bodyweight skills and mobility training.",
      image: getPlaceholderImage(300, 300, "Rohan"),
    },
    {
      name: "Sarah Johnson",
      role: "Nutrition Specialist",
      bio: "Certified nutritionist with expertise in performance nutrition for strength athletes and body composition optimization.",
      image: getPlaceholderImage(300, 300, "Sarah"),
    },
    {
      name: "Michael Chen",
      role: "Movement Coach",
      bio: "Background in physical therapy and movement science. Focuses on injury prevention and rehabilitation through proper movement patterns.",
      image: getPlaceholderImage(300, 300, "Michael"),
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About CalisthenicsPro</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our mission is to make calisthenics training accessible to everyone, regardless of their fitness
                  level.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Our Story</h2>
                <p className="text-muted-foreground">
                  CalisthenicsPro was founded in 2023 with a simple goal: to create the most comprehensive and
                  accessible calisthenics training platform available. We believe that bodyweight training is one of the
                  most effective, sustainable, and empowering forms of exercise.
                </p>
                <p className="text-muted-foreground">
                  Our team consists of experienced coaches, physical therapists, and nutrition experts who are
                  passionate about helping people achieve their fitness goals through proper calisthenics training.
                </p>
                <p className="text-muted-foreground">
                  Whether you're just starting your fitness journey or you're an advanced athlete looking to master
                  complex skills like the planche or front lever, we have the resources and expertise to help you
                  succeed.
                </p>
              </div>
              <div className="mx-auto w-full max-w-[500px] overflow-hidden rounded-xl">
                <div className="aspect-video w-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-6xl">
                  👥
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Meet Our Team</h2>
                <p className="max-w-[900px] text-muted-foreground">
                  Our expert coaches and specialists are here to guide you on your calisthenics journey.
                </p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-6xl">
                      {member.name.includes("Rohan")
                        ? "👨‍💻"
                        : member.name.includes("Sarah")
                          ? "👩‍⚕️"
                          : member.name.includes("Michael")
                            ? "👨‍🔬"
                            : "👤"}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Mail className="h-4 w-4" />
                      <span className="sr-only">Email</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Our Philosophy</h2>
                <p className="text-muted-foreground">
                  At CalisthenicsPro, we believe in progressive, sustainable training that builds both physical and
                  mental strength. Our approach is based on these core principles:
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                  <li>
                    <strong>Progressive Overload:</strong> Gradually increasing the challenge to continually build
                    strength and skill.
                  </li>
                  <li>
                    <strong>Proper Form:</strong> Emphasizing correct technique to prevent injuries and maximize
                    results.
                  </li>
                  <li>
                    <strong>Consistency:</strong> Regular practice is key to mastering calisthenics skills.
                  </li>
                  <li>
                    <strong>Patience:</strong> Understanding that advanced skills take time to develop.
                  </li>
                  <li>
                    <strong>Community:</strong> Supporting each other on the journey to bodyweight mastery.
                  </li>
                </ul>
              </div>
              <div className="mx-auto w-full max-w-[500px] overflow-hidden rounded-xl">
                <div className="aspect-video w-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-6xl">
                  🧠
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Ready to Start Your Journey?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take our personalization quiz to get a training program tailored to your goals and current fitness
                  level.
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
