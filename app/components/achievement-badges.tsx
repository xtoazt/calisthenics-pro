import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function AchievementBadges() {
  const achievements = [
    {
      name: "First Pull-Up",
      description: "Completed your first proper pull-up",
      image: "/placeholder.svg?height=80&width=80",
      earned: true,
      date: "March 15, 2023",
    },
    {
      name: "Push-Up Master",
      description: "Performed 50 push-ups in a single set",
      image: "/placeholder.svg?height=80&width=80",
      earned: true,
      date: "April 22, 2023",
    },
    {
      name: "Handstand Holder",
      description: "Held a freestanding handstand for 10+ seconds",
      image: "/placeholder.svg?height=80&width=80",
      earned: true,
      date: "July 8, 2023",
    },
    {
      name: "Muscle-Up Achieved",
      description: "Performed your first clean muscle-up",
      image: "/placeholder.svg?height=80&width=80",
      earned: false,
    },
    {
      name: "Front Lever",
      description: "Held a full front lever for 5+ seconds",
      image: "/placeholder.svg?height=80&width=80",
      earned: false,
    },
    {
      name: "Pistol Squat Pro",
      description: "Performed 5 pistol squats on each leg",
      image: "/placeholder.svg?height=80&width=80",
      earned: true,
      date: "May 30, 2023",
    },
    {
      name: "Planche Progress",
      description: "Achieved a tuck planche for 10+ seconds",
      image: "/placeholder.svg?height=80&width=80",
      earned: false,
    },
    {
      name: "L-Sit Master",
      description: "Held an L-sit for 30+ seconds",
      image: "/placeholder.svg?height=80&width=80",
      earned: false,
    },
    {
      name: "30-Day Streak",
      description: "Trained consistently for 30 days",
      image: "/placeholder.svg?height=80&width=80",
      earned: true,
      date: "June 12, 2023",
    },
  ]

  const earnedCount = achievements.filter((a) => a.earned).length
  const totalCount = achievements.length
  const earnedPercentage = Math.round((earnedCount / totalCount) * 100)

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>
              You've earned {earnedCount} of {totalCount} badges ({earnedPercentage}%)
            </CardDescription>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            Level 3
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          <TooltipProvider>
            {achievements.map((achievement, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div className={`relative flex flex-col items-center ${!achievement.earned ? "opacity-40" : ""}`}>
                    <div className="relative w-16 h-16 mb-1">
                      <Image
                        src={achievement.image || "/placeholder.svg"}
                        alt={achievement.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xs text-center font-medium line-clamp-1">{achievement.name}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <div className="text-sm">
                    <p className="font-bold">{achievement.name}</p>
                    <p>{achievement.description}</p>
                    {achievement.earned && (
                      <p className="text-xs text-muted-foreground mt-1">Earned on {achievement.date}</p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}
