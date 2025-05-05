// Workout completion utilities

// Save completed workout to localStorage with validation
export function saveCompletedWorkout(workoutId: string, workoutTitle: string, duration: number) {
  try {
    // Validate inputs
    if (!workoutId || !workoutTitle) {
      console.error("Invalid workout data: Missing ID or title")
      return null
    }

    // Ensure duration is a positive number
    const validDuration = Math.max(1, duration || 0)

    // Get existing completed workouts
    const completedWorkoutsJSON = localStorage.getItem("completedWorkouts")
    let completedWorkouts = []

    try {
      completedWorkouts = completedWorkoutsJSON ? JSON.parse(completedWorkoutsJSON) : []
      // Validate that it's an array
      if (!Array.isArray(completedWorkouts)) {
        completedWorkouts = []
      }
    } catch (e) {
      console.error("Error parsing completed workouts:", e)
      completedWorkouts = []
    }

    // Add new completed workout
    const newCompletedWorkout = {
      id: workoutId,
      title: workoutTitle,
      completedAt: new Date().toISOString(),
      duration: validDuration,
      points: calculateWorkoutPoints(validDuration),
    }

    completedWorkouts.push(newCompletedWorkout)

    // Save back to localStorage
    localStorage.setItem("completedWorkouts", JSON.stringify(completedWorkouts))

    // Update total points
    updateTotalPoints(newCompletedWorkout.points)

    return newCompletedWorkout
  } catch (error) {
    console.error("Error saving completed workout:", error)
    return null
  }
}

// Calculate points for a workout based on duration
export function calculateWorkoutPoints(duration: number) {
  try {
    // Ensure duration is a positive number
    const validDuration = Math.max(0, duration || 0)

    // Base points: 10 points per minute
    const basePoints = Math.floor(validDuration / 60) * 10

    // Minimum points for very short workouts
    if (basePoints < 10 && validDuration > 0) {
      return 10
    }

    // Bonus points for longer workouts
    let bonusPoints = 0
    if (validDuration >= 1800) {
      // 30+ minutes: 50% bonus
      bonusPoints = Math.floor(basePoints * 0.5)
    } else if (validDuration >= 1200) {
      // 20+ minutes: 30% bonus
      bonusPoints = Math.floor(basePoints * 0.3)
    } else if (validDuration >= 600) {
      // 10+ minutes: 20% bonus
      bonusPoints = Math.floor(basePoints * 0.2)
    }

    return basePoints + bonusPoints
  } catch (error) {
    console.error("Error calculating workout points:", error)
    return 10 // Default points if calculation fails
  }
}

// Update total points in localStorage
export function updateTotalPoints(points: number) {
  try {
    if (isNaN(points) || points < 0) {
      console.error("Invalid points value:", points)
      return 0
    }

    const currentPointsStr = localStorage.getItem("userPoints")
    let currentPoints = 0

    try {
      currentPoints = currentPointsStr ? Number.parseInt(currentPointsStr, 10) : 0
      if (isNaN(currentPoints)) currentPoints = 0
    } catch (e) {
      console.error("Error parsing current points:", e)
      currentPoints = 0
    }

    const newTotal = currentPoints + points
    localStorage.setItem("userPoints", newTotal.toString())

    // Also update in cookies for server-side access
    document.cookie = `userPoints=${newTotal}; path=/; max-age=2592000` // 30 days

    return newTotal
  } catch (error) {
    console.error("Error updating total points:", error)
    return 0
  }
}

// Get all completed workouts with error handling
export function getCompletedWorkouts() {
  try {
    const completedWorkoutsJSON = localStorage.getItem("completedWorkouts")
    if (!completedWorkoutsJSON) return []

    const completedWorkouts = JSON.parse(completedWorkoutsJSON)
    return Array.isArray(completedWorkouts) ? completedWorkouts : []
  } catch (error) {
    console.error("Error getting completed workouts:", error)
    return []
  }
}

// Get total points with error handling
export function getTotalPoints() {
  try {
    const currentPointsStr = localStorage.getItem("userPoints")
    if (!currentPointsStr) return 0

    const currentPoints = Number.parseInt(currentPointsStr, 10)
    return isNaN(currentPoints) ? 0 : currentPoints
  } catch (error) {
    console.error("Error getting total points:", error)
    return 0
  }
}

// Save completed skill to localStorage with validation
export function saveCompletedSkill(skillId: string, skillName: string, level: string) {
  try {
    // Validate inputs
    if (!skillId || !skillName || !level) {
      console.error("Invalid skill data: Missing ID, name, or level")
      return null
    }

    // Get existing completed skills
    const completedSkillsJSON = localStorage.getItem("completedSkills")
    let completedSkills = []

    try {
      completedSkills = completedSkillsJSON ? JSON.parse(completedSkillsJSON) : []
      // Validate that it's an array
      if (!Array.isArray(completedSkills)) {
        completedSkills = []
      }
    } catch (e) {
      console.error("Error parsing completed skills:", e)
      completedSkills = []
    }

    // Check if this skill level is already completed
    const existingIndex = completedSkills.findIndex((skill: any) => skill.id === skillId && skill.level === level)

    // If already completed, return early
    if (existingIndex >= 0) {
      return completedSkills[existingIndex]
    }

    // Add new completed skill
    const newCompletedSkill = {
      id: skillId,
      name: skillName,
      level: level,
      completedAt: new Date().toISOString(),
      points: calculateSkillPoints(level),
    }

    completedSkills.push(newCompletedSkill)

    // Save back to localStorage
    localStorage.setItem("completedSkills", JSON.stringify(completedSkills))

    // Update total points
    updateTotalPoints(newCompletedSkill.points)

    return newCompletedSkill
  } catch (error) {
    console.error("Error saving completed skill:", error)
    return null
  }
}

// Calculate points for a skill based on level
export function calculateSkillPoints(level: string) {
  try {
    if (!level) return 25

    switch (level.toLowerCase()) {
      case "beginner":
        return 50
      case "intermediate":
        return 100
      case "advanced":
        return 200
      case "elite":
        return 300
      default:
        return 25
    }
  } catch (error) {
    console.error("Error calculating skill points:", error)
    return 25 // Default points if calculation fails
  }
}

// Get all completed skills with error handling
export function getCompletedSkills() {
  try {
    const completedSkillsJSON = localStorage.getItem("completedSkills")
    if (!completedSkillsJSON) return []

    const completedSkills = JSON.parse(completedSkillsJSON)
    return Array.isArray(completedSkills) ? completedSkills : []
  } catch (error) {
    console.error("Error getting completed skills:", error)
    return []
  }
}

// Check if a skill level is completed with error handling
export function isSkillLevelCompleted(skillId: string, level: string) {
  try {
    if (!skillId || !level) return false

    const completedSkills = getCompletedSkills()
    return completedSkills.some((skill: any) => skill.id === skillId && skill.level === level)
  } catch (error) {
    console.error("Error checking if skill level is completed:", error)
    return false
  }
}

// Get completed skill count
export function getCompletedSkillCount() {
  return getCompletedSkills().length
}

// Get completed workout count
export function getCompletedWorkoutCount() {
  return getCompletedWorkouts().length
}

// Get total exercise count (estimated from workouts)
export function getTotalExerciseCount() {
  const workouts = getCompletedWorkouts()
  // Estimate 5 exercises per workout
  return workouts.length * 5
}

// Initialize user data if not already present
export function initializeUserData() {
  try {
    // Check if user exists
    const user = localStorage.getItem("user")
    if (!user) return false

    // Initialize points if not present
    if (!localStorage.getItem("userPoints")) {
      localStorage.setItem("userPoints", "0")
    }

    // Initialize completed workouts if not present
    if (!localStorage.getItem("completedWorkouts")) {
      localStorage.setItem("completedWorkouts", "[]")
    }

    // Initialize completed skills if not present
    if (!localStorage.getItem("completedSkills")) {
      localStorage.setItem("completedSkills", "[]")
    }

    return true
  } catch (error) {
    console.error("Error initializing user data:", error)
    return false
  }
}

// Reset user progress (for testing)
export function resetUserProgress() {
  try {
    localStorage.removeItem("userPoints")
    localStorage.removeItem("completedWorkouts")
    localStorage.removeItem("completedSkills")

    // Reset cookies
    document.cookie = "userPoints=0; path=/; max-age=2592000"

    return true
  } catch (error) {
    console.error("Error resetting user progress:", error)
    return false
  }
}
