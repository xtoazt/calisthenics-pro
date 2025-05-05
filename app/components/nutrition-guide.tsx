import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function NutritionGuide() {
  const dailyNutrition = {
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
  }

  const mealPlans = [
    {
      name: "Strength Building",
      description: "High protein, moderate carbs for muscle growth",
      meals: [
        {
          name: "Breakfast",
          time: "7:00 AM",
          foods: ["4 egg whites + 1 whole egg", "1/2 cup oatmeal with berries", "1 scoop protein powder"],
        },
        {
          name: "Snack",
          time: "10:00 AM",
          foods: ["Greek yogurt with honey", "Handful of almonds"],
        },
        {
          name: "Lunch",
          time: "1:00 PM",
          foods: ["6oz grilled chicken breast", "1 cup brown rice", "1 cup steamed vegetables"],
        },
        {
          name: "Pre-Workout",
          time: "4:00 PM",
          foods: ["Banana", "1 scoop protein powder"],
        },
        {
          name: "Dinner",
          time: "7:00 PM",
          foods: ["6oz salmon", "Sweet potato", "Large green salad with olive oil"],
        },
      ],
    },
    {
      name: "Fat Loss",
      description: "High protein, low carb for preserving muscle while cutting",
      meals: [
        {
          name: "Breakfast",
          time: "7:00 AM",
          foods: ["3 egg whites + 1 whole egg", "1/4 avocado", "Spinach and tomato"],
        },
        {
          name: "Snack",
          time: "10:00 AM",
          foods: ["Protein shake with almond milk", "Celery with almond butter"],
        },
        {
          name: "Lunch",
          time: "1:00 PM",
          foods: ["5oz grilled chicken breast", "Large green salad with lemon juice", "1/4 cup quinoa"],
        },
        {
          name: "Pre-Workout",
          time: "4:00 PM",
          foods: ["Apple", "Small handful of nuts"],
        },
        {
          name: "Dinner",
          time: "7:00 PM",
          foods: ["5oz white fish", "Roasted vegetables", "1/4 avocado"],
        },
      ],
    },
    {
      name: "Maintenance",
      description: "Balanced macros for maintaining current physique",
      meals: [
        {
          name: "Breakfast",
          time: "7:00 AM",
          foods: ["2 whole eggs", "2 slices whole grain toast", "1/2 avocado"],
        },
        {
          name: "Snack",
          time: "10:00 AM",
          foods: ["Greek yogurt with berries", "Handful of mixed nuts"],
        },
        {
          name: "Lunch",
          time: "1:00 PM",
          foods: ["Turkey and vegetable wrap", "Side salad", "Piece of fruit"],
        },
        {
          name: "Pre-Workout",
          time: "4:00 PM",
          foods: ["Protein bar", "Banana"],
        },
        {
          name: "Dinner",
          time: "7:00 PM",
          foods: ["5oz lean beef or tofu", "1/2 cup brown rice", "Steamed vegetables"],
        },
      ],
    },
  ]

  const calculatePercentage = (current, target) => {
    return Math.min(100, Math.round((current / target) * 100))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Nutrition Guide</CardTitle>
        <CardDescription>Personalized nutrition recommendations for your goals</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tracking">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tracking">Daily Tracking</TabsTrigger>
            <TabsTrigger value="meal-plans">Meal Plans</TabsTrigger>
          </TabsList>
          <TabsContent value="tracking" className="space-y-4 mt-4">
            <div className="space-y-4">
              {Object.entries(dailyNutrition).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium capitalize">{key}</span>
                    <span className="text-sm">
                      {value.current} / {value.target}
                      {value.unit ? ` ${value.unit}` : ""}
                    </span>
                  </div>
                  <Progress value={calculatePercentage(value.current, value.target)} />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Recommended Food Groups</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                    <div className="text-xl">🥩</div>
                  </div>
                  <span className="text-xs">Lean Protein</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                    <div className="text-xl">🥦</div>
                  </div>
                  <span className="text-xs">Vegetables</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                    <div className="text-xl">🍎</div>
                  </div>
                  <span className="text-xs">Fruits</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                    <div className="text-xl">🌾</div>
                  </div>
                  <span className="text-xs">Whole Grains</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                    <div className="text-xl">🥑</div>
                  </div>
                  <span className="text-xs">Healthy Fats</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                    <div className="text-xl">🐟</div>
                  </div>
                  <span className="text-xs">Omega-3s</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="meal-plans" className="mt-4">
            <Tabs defaultValue="Strength Building">
              <TabsList className="mb-4">
                {mealPlans.map((plan) => (
                  <TabsTrigger key={plan.name} value={plan.name}>
                    {plan.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {mealPlans.map((plan) => (
                <TabsContent key={plan.name} value={plan.name}>
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  <div className="space-y-4">
                    {plan.meals.map((meal, index) => (
                      <Card key={index}>
                        <CardHeader className="py-3 px-4">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-sm font-medium">{meal.name}</CardTitle>
                            <span className="text-xs text-muted-foreground">{meal.time}</span>
                          </div>
                        </CardHeader>
                        <CardContent className="py-2 px-4">
                          <ul className="text-sm space-y-1">
                            {meal.foods.map((food, foodIndex) => (
                              <li key={foodIndex} className="list-disc ml-4">
                                {food}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
