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
  // Base workouts with default images
  const baseWorkouts = [
    {
      title: "Full Body Basics",
      description: "A complete workout focusing on fundamental movements",
      duration: "30-45 min",
      color: "from-blue-500/20 to-blue-600/30",
      icon: "💪",
      image: "/placeholder.svg?height=300&width=400&text=Full+Body",
    },
    {
      title: "Upper Body Focus",
      description: "Build strength in your chest, back, and arms",
      duration: "30-45 min",
      color: "from-green-500/20 to-green-600/30",
      icon: "🏋️",
      image: "/placeholder.svg?height=300&width=400&text=Upper+Body",
    },
    {
      title: "Core Foundations",
      description: "Develop a strong and stable midsection",
      duration: "20-30 min",
      color: "from-yellow-500/20 to-yellow-600/30",
      icon: "🔄",
      image: "/placeholder.svg?height=300&width=400&text=Core",
    },
    {
      title: "Lower Body Power",
      description: "Build strength and explosiveness in your legs",
      duration: "30-40 min",
      color: "from-purple-500/20 to-purple-600/30",
      icon: "🦵",
      image: "/placeholder.svg?height=300&width=400&text=Lower+Body",
    },
    {
      title: "Skill Development",
      description: "Focus on progressions for advanced skills",
      duration: "45-60 min",
      color: "from-red-500/20 to-red-600/30",
      icon: "🤸",
      image: "/placeholder.svg?height=300&width=400&text=Skills",
    },
    {
      title: "HIIT Cardio",
      description: "High-intensity interval training for conditioning",
      duration: "20-30 min",
      color: "from-orange-500/20 to-orange-600/30",
      icon: "🔥",
      image: "/placeholder.svg?height=300&width=400&text=HIIT",
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
      difficulty: "Beginner",
    }))
  } else if (experience === "intermediate") {
    customizedWorkouts = baseWorkouts.map((workout) => ({
      ...workout,
      title: workout.title.includes("Basics") ? "Intermediate Techniques" : workout.title,
      description: `Intermediate ${workout.description.toLowerCase()}`,
      difficulty: "Intermediate",
    }))
  } else if (experience === "advanced") {
    customizedWorkouts = baseWorkouts.map((workout) => ({
      ...workout,
      title: workout.title.includes("Basics") ? "Advanced Techniques" : workout.title,
      description: `Advanced ${workout.description.toLowerCase()}`,
      duration: workout.duration.includes("20") ? "30-45 min" : workout.duration,
      difficulty: "Advanced",
    }))
  }

  // Customize based on goal
  if (goal === "strength") {
    customizedWorkouts = customizedWorkouts.map((workout) => {
      if (workout.title.includes("Upper Body") || workout.title.includes("Lower Body")) {
        return {
          ...workout,
          color: "from-red-500/20 to-red-600/30",
          priority: "high",
        }
      }
      return workout
    })

    // Add a strength-specific workout
    customizedWorkouts.push({
      title: "Strength Progressions",
      description: "Focus on building raw strength with progressive overload",
      duration: "40-50 min",
      color: "from-red-500/20 to-red-600/30",
      icon: "💪",
      image: "/placeholder.svg?height=300&width=400&text=Strength",
      difficulty: experience || "Intermediate",
      priority: "high",
    })
  } else if (goal === "skills") {
    customizedWorkouts = customizedWorkouts.map((workout) => {
      if (workout.title.includes("Skill")) {
        return {
          ...workout,
          color: "from-purple-500/20 to-purple-600/30",
          priority: "high",
        }
      }
      return workout
    })

    // Add a skill-specific workout
    customizedWorkouts.push({
      title: "Skill Mastery",
      description: "Dedicated practice for mastering impressive calisthenics skills",
      duration: "40-50 min",
      color: "from-purple-500/20 to-purple-600/30",
      icon: "🤸",
      image: "/placeholder.svg?height=300&width=400&text=Skills+Mastery",
      difficulty: experience || "Intermediate",
      priority: "high",
    })
  } else if (goal === "endurance") {
    customizedWorkouts = customizedWorkouts.map((workout) => {
      if (workout.title.includes("HIIT") || workout.title.includes("Full Body")) {
        return {
          ...workout,
          color: "from-blue-500/20 to-blue-600/30",
          priority: "high",
        }
      }
      return workout
    })

    // Add an endurance-specific workout
    customizedWorkouts.push({
      title: "Endurance Circuit",
      description: "High-rep, low-rest circuit to build muscular endurance",
      duration: "30-40 min",
      color: "from-blue-500/20 to-blue-600/30",
      icon: "🔄",
      image: "/placeholder.svg?height=300&width=400&text=Endurance",
      difficulty: experience || "Intermediate",
      priority: "high",
    })
  }

  // Customize based on equipment
  if (equipment === "none") {
    customizedWorkouts = customizedWorkouts.map((workout) => ({
      ...workout,
      description: workout.description + " (bodyweight only)",
      equipment: "None",
    }))
  } else if (equipment === "minimal") {
    customizedWorkouts = customizedWorkouts.map((workout) => ({
      ...workout,
      description: workout.description + " (minimal equipment)",
      equipment: "Minimal",
    }))
  } else if (equipment === "full") {
    customizedWorkouts = customizedWorkouts.map((workout) => ({
      ...workout,
      description: workout.description + " (with equipment)",
      equipment: "Full",
    }))

    // Add an equipment-specific workout
    customizedWorkouts.push({
      title: "Equipment Mastery",
      description: "Maximize your gains using all available equipment",
      duration: "40-50 min",
      color: "from-green-500/20 to-green-600/30",
      icon: "🏋️",
      image: "/placeholder.svg?height=300&width=400&text=Equipment",
      difficulty: experience || "Intermediate",
      equipment: "Full",
    })
  }

  // Sort workouts to prioritize those matching user's goals
  customizedWorkouts.sort((a, b) => {
    if (a.priority === "high" && b.priority !== "high") return -1
    if (a.priority !== "high" && b.priority === "high") return 1
    return 0
  })

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

// Get recommended skills based on user preferences
export function getRecommendedSkills(experience: string | null, goal: string | null) {
  const allSkills = [
    {
      name: "Pull-Ups",
      description: "Master the fundamental vertical pulling movement",
      category: "upper",
      difficulty: "beginner-intermediate",
      forStrength: true,
      forSkills: true,
      forEndurance: false,
      slug: "pull-ups",
    },
    {
      name: "Push-Ups",
      description: "Build pushing strength with progressive variations",
      category: "upper",
      difficulty: "beginner",
      forStrength: true,
      forSkills: false,
      forEndurance: true,
      slug: "push-ups",
    },
    {
      name: "Dips",
      description: "Develop triceps and chest strength",
      category: "upper",
      difficulty: "intermediate",
      forStrength: true,
      forSkills: false,
      forEndurance: false,
      slug: "dips",
    },
    {
      name: "Handstand",
      description: "Master the art of balance and shoulder strength",
      category: "balance",
      difficulty: "intermediate-advanced",
      forStrength: false,
      forSkills: true,
      forEndurance: false,
      slug: "handstand",
    },
    {
      name: "Planche",
      description: "The ultimate test of upper body strength",
      category: "strength",
      difficulty: "advanced",
      forStrength: true,
      forSkills: true,
      forEndurance: false,
      slug: "planche",
    },
    {
      name: "Front Lever",
      description: "Build incredible core and back strength",
      category: "core",
      difficulty: "advanced",
      forStrength: true,
      forSkills: true,
      forEndurance: false,
      slug: "front-lever",
    },
    {
      name: "Muscle-Up",
      description: "The pinnacle of pull-up and dip combination",
      category: "upper",
      difficulty: "advanced",
      forStrength: true,
      forSkills: true,
      forEndurance: false,
      slug: "muscle-up",
    },
    {
      name: "Pistol Squat",
      description: "Single-leg strength and balance",
      category: "lower",
      difficulty: "intermediate",
      forStrength: true,
      forSkills: false,
      forEndurance: true,
      slug: "pistol-squat",
    },
    {
      name: "Human Flag",
      description: "The ultimate display of core and grip strength",
      category: "strength",
      difficulty: "advanced",
      forStrength: true,
      forSkills: true,
      forEndurance: false,
      slug: "human-flag",
    },
    {
      name: "L-Sit",
      description: "Fundamental core and compression strength",
      category: "core",
      difficulty: "intermediate",
      forStrength: true,
      forSkills: true,
      forEndurance: true,
      slug: "l-sit",
    },
    {
      name: "Burpees",
      description: "Full-body exercise for conditioning",
      category: "cardio",
      difficulty: "beginner",
      forStrength: false,
      forSkills: false,
      forEndurance: true,
      slug: "burpees",
    },
    {
      name: "Hollow Body Hold",
      description: "Essential core exercise for all calisthenics",
      category: "core",
      difficulty: "beginner",
      forStrength: true,
      forSkills: true,
      forEndurance: true,
      slug: "hollow-body",
    },
  ]

  // Filter skills based on experience level
  let filteredSkills = [...allSkills]

  if (experience === "beginner") {
    filteredSkills = filteredSkills.filter(
      (skill) => skill.difficulty === "beginner" || skill.difficulty.includes("beginner"),
    )
  } else if (experience === "intermediate") {
    filteredSkills = filteredSkills.filter(
      (skill) =>
        skill.difficulty === "intermediate" ||
        skill.difficulty.includes("intermediate") ||
        skill.difficulty === "beginner",
    )
  }
  // Advanced users get all skills

  // Further filter based on goal
  if (goal === "strength") {
    filteredSkills = filteredSkills.filter((skill) => skill.forStrength)
    // Prioritize strength skills
    filteredSkills.sort((a, b) => {
      if (a.forStrength && !b.forStrength) return -1
      if (!a.forStrength && b.forStrength) return 1
      return 0
    })
  } else if (goal === "skills") {
    filteredSkills = filteredSkills.filter((skill) => skill.forSkills)
    // Prioritize skills-focused exercises
    filteredSkills.sort((a, b) => {
      if (a.forSkills && !b.forSkills) return -1
      if (!a.forSkills && b.forSkills) return 1
      return 0
    })
  } else if (goal === "endurance") {
    filteredSkills = filteredSkills.filter((skill) => skill.forEndurance)
    // Prioritize endurance exercises
    filteredSkills.sort((a, b) => {
      if (a.forEndurance && !b.forEndurance) return -1
      if (!a.forEndurance && b.forEndurance) return 1
      return 0
    })
  }

  // Return top skills (limited to 6)
  return filteredSkills.slice(0, 6)
}

// Get nutrition recommendations based on user goals
export function getNutritionRecommendations(goal: string | null) {
  if (goal === "strength") {
    return {
      calories: {
        target: 2800,
        current: 2100,
      },
      protein: {
        target: 200,
        current: 150,
        unit: "g",
      },
      carbs: {
        target: 350,
        current: 260,
        unit: "g",
      },
      fat: {
        target: 80,
        current: 65,
        unit: "g",
      },
      water: {
        target: 3500,
        current: 2200,
        unit: "ml",
      },
      recommendedPlan: "Strength Building",
    }
  } else if (goal === "endurance") {
    return {
      calories: {
        target: 2500,
        current: 1900,
      },
      protein: {
        target: 150,
        current: 110,
        unit: "g",
      },
      carbs: {
        target: 400,
        current: 300,
        unit: "g",
      },
      fat: {
        target: 60,
        current: 45,
        unit: "g",
      },
      water: {
        target: 4000,
        current: 2500,
        unit: "ml",
      },
      recommendedPlan: "Maintenance",
    }
  } else if (goal === "skills") {
    return {
      calories: {
        target: 2600,
        current: 2000,
      },
      protein: {
        target: 180,
        current: 140,
        unit: "g",
      },
      carbs: {
        target: 320,
        current: 240,
        unit: "g",
      },
      fat: {
        target: 70,
        current: 55,
        unit: "g",
      },
      water: {
        target: 3200,
        current: 2000,
        unit: "ml",
      },
      recommendedPlan: "Strength Building",
    }
  } else {
    // Default/balanced nutrition
    return {
      calories: {
        target: 2500,
        current: 1850,
      },
      protein: {
        target: 180,
        current: 120,
        unit: "g",
      },
      carbs: {
        target: 300,
        current: 220,
        unit: "g",
      },
      fat: {
        target: 80,
        current: 65,
        unit: "g",
      },
      water: {
        target: 3000,
        current: 1800,
        unit: "ml",
      },
      recommendedPlan: "Maintenance",
    }
  }
}
