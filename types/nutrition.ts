export interface NutritionRecommendation {
  id: string
  phase: "menstruation" | "follicular" | "ovulation" | "luteal"
  title: string
  description: string
  foods: FoodItem[]
  benefits: string[]
  tips: string[]
  priority: "high" | "medium" | "low"
}

export interface FoodItem {
  id: string
  name: string
  localName: string
  category: "fruits" | "vegetables" | "grains" | "proteins" | "dairy" | "herbs" | "beverages"
  nutrients: string[]
  benefits: string[]
  availability: "toute l'année" | "saison sèche" | "saison des pluies"
  region: string
  imageUrl?: string
  preparation?: string[]
}

export interface MealPlan {
  id: string
  name: string
  phase: "menstruation" | "follicular" | "ovulation" | "luteal"
  meals: {
    breakfast: FoodItem[]
    lunch: FoodItem[]
    dinner: FoodItem[]
    snacks: FoodItem[]
  }
  totalCalories: number
  keyNutrients: string[]
}

export interface NutritionProfile {
  userId: string
  age: number
  weight?: number
  height?: number
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active"
  dietaryRestrictions: string[]
  symptoms: string[]
  preferences: string[]
  goals: string[]
}
