// Rank definitions
export const ranks = [
  {
    name: "Novice",
    color: "bg-zinc-400",
    minPoints: 0,
    badge: "bg-gradient-to-br from-zinc-300 to-zinc-500",
    textColor: "text-zinc-800",
  },
  {
    name: "Apprentice",
    color: "bg-green-500",
    minPoints: 100,
    badge: "bg-gradient-to-br from-green-400 to-green-600",
    textColor: "text-green-800",
  },
  {
    name: "Adept",
    color: "bg-blue-500",
    minPoints: 250,
    badge: "bg-gradient-to-br from-blue-400 to-blue-600",
    textColor: "text-blue-800",
  },
  {
    name: "Expert",
    color: "bg-purple-500",
    minPoints: 500,
    badge: "bg-gradient-to-br from-purple-400 to-purple-600",
    textColor: "text-purple-800",
  },
  {
    name: "Master",
    color: "bg-amber-500",
    minPoints: 1000,
    badge: "bg-gradient-to-br from-amber-400 to-amber-600",
    textColor: "text-amber-800",
  },
  {
    name: "Grandmaster",
    color: "bg-red-500",
    minPoints: 2000,
    badge: "bg-gradient-to-br from-red-400 to-red-600",
    textColor: "text-red-800",
  },
  {
    name: "Legend",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    minPoints: 5000,
    badge: "bg-gradient-to-br from-purple-400 via-pink-500 to-amber-400",
    textColor: "text-purple-800",
  },
]

// Calculate user points based on name and experience
export function calculateUserPoints(name: string | null, experience: string | null): number {
  if (!name) return 0

  // Base points from name length (just for demonstration)
  let points = name.length * 10

  // Points from experience level
  if (experience === "beginner") {
    points += 50
  } else if (experience === "intermediate") {
    points += 150
  } else if (experience === "advanced") {
    points += 300
  }

  return points
}

// Get user rank based on points
export function getUserRank(points: number) {
  // Find the highest rank the user qualifies for
  for (let i = ranks.length - 1; i >= 0; i--) {
    if (points >= ranks[i].minPoints) {
      return ranks[i]
    }
  }

  // Default to Novice
  return ranks[0]
}

// Get next rank
export function getNextRank(currentRank: string) {
  const currentIndex = ranks.findIndex((rank) => rank.name === currentRank)

  if (currentIndex === -1 || currentIndex === ranks.length - 1) {
    return ranks[ranks.length - 1]
  }

  return ranks[currentIndex + 1]
}

// Calculate progress percentage to next rank
export function calculateProgressToNextRank(points: number, currentRank: any, nextRank: any): number {
  if (currentRank.name === "Legend") return 100

  const pointsToNextRank = nextRank.minPoints - currentRank.minPoints
  const pointsEarned = points - currentRank.minPoints

  return Math.min(Math.round((pointsEarned / pointsToNextRank) * 100), 100)
}

// Get personalized workouts based on user preferences
export function getPersonalizedWorkouts(experience: string | null, goal: string | null, equipment: string | null) {
  const baseWorkouts = [
    {
      title: "Full Body Basics",
      description: "A complete workout focusing on fundamental movements",
      duration: "30-45 min",
      color: "from-blue-500/20 to-blue-600/30",
      icon: "💪",
    },
    {
      title: "Upper Body Focus",
      description: "Build strength in your chest, back, and arms",
      duration: "30-45 min",
      color: "from-green-500/20 to-green-600/30",
      icon: "🏋️",
    },
    {
      title: "Core Foundations",
      description: "Develop a strong and stable midsection",
      duration: "20-30 min",
      color: "from-yellow-500/20 to-yellow-600/30",
      icon: "🔄",
    },
    {
      title: "Lower Body Power",
      description: "Build strength and explosiveness in your legs",
      duration: "30-40 min",
      color: "from-purple-500/20 to-purple-600/30",
      icon: "🦵",
    },
    {
      title: "Skill Development",
      description: "Focus on progressions for advanced skills",
      duration: "45-60 min",
      color: "from-red-500/20 to-red-600/30",
      icon: "🤸",
    },
    {
      title: "HIIT Cardio",
      description: "High-intensity interval training for conditioning",
      duration: "20-30 min",
      color: "from-orange-500/20 to-orange-600/30",
      icon: "🔥",
    },
  ]

  // Customize based on experience
  let customizedWorkouts = [...baseWorkouts]

  if (experience === "beginner") {
    customizedWorkouts = baseWorkouts.map((workout) => ({
      ...workout,
      title: workout.title.includes("Skill") ? "Beginner Skills" : workout.title,
      description: `Beginner-friendly ${workout.description.toLowerCase()}`,
      duration: workout.duration.includes("45") ? "20-30 min" : workout.duration,
    }))
  } else if (experience === "advanced") {
    customizedWorkouts = baseWorkouts.map((workout) => ({
      ...workout,
      title: workout.title.includes("Basics") ? "Advanced Techniques" : workout.title,
      description: `Advanced ${workout.description.toLowerCase()}`,
      duration: workout.duration.includes("20") ? "30-45 min" : workout.duration,
    }))
  }

  // Customize based on goal
  if (goal === "strength") {
    customizedWorkouts = customizedWorkouts.map((workout) =>
      workout.title.includes("Upper Body") || workout.title.includes("Lower Body")
        ? { ...workout, color: "from-red-500/20 to-red-600/30" }
        : workout,
    )
  } else if (goal === "skills") {
    customizedWorkouts = customizedWorkouts.map((workout) =>
      workout.title.includes("Skill") ? { ...workout, color: "from-purple-500/20 to-purple-600/30" } : workout,
    )
  } else if (goal === "endurance") {
    customizedWorkouts = customizedWorkouts.map((workout) =>
      workout.title.includes("HIIT") || workout.title.includes("Full Body")
        ? { ...workout, color: "from-blue-500/20 to-blue-600/30" }
        : workout,
    )
  }

  // Customize based on equipment
  if (equipment === "none") {
    customizedWorkouts = customizedWorkouts.map((workout) => ({
      ...workout,
      description: workout.description + " (bodyweight only)",
    }))
  } else if (equipment === "full") {
    customizedWorkouts = customizedWorkouts.map((workout) => ({
      ...workout,
      description: workout.description + " (with equipment)",
    }))
  }

  return customizedWorkouts
}

// Get welcome message based on user preferences
export function getWelcomeMessage(name: string | null, experience: string | null, goal: string | null): string {
  if (!name) return "Welcome to CalisthenicsPro!"

  let message = `Welcome, ${name}! `

  if (experience === "beginner") {
    message += "We've prepared some beginner-friendly workouts to get you started. "
  } else if (experience === "intermediate") {
    message += "Here are some intermediate workouts to challenge you. "
  } else if (experience === "advanced") {
    message += "Check out these advanced workouts to push your limits. "
  }

  if (goal === "strength") {
    message += "Focus on the strength-building workouts to achieve your goals."
  } else if (goal === "skills") {
    message += "The skill development workouts will help you master new techniques."
  } else if (goal === "endurance") {
    message += "Try the HIIT and endurance workouts to build your stamina."
  } else if (goal === "all") {
    message += "We've balanced your workouts to help you improve in all areas."
  }

  return message
}
