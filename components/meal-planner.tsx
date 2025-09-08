"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChefHat, Clock, Users, Utensils } from "lucide-react"
import { sampleMealPlans } from "@/data/nutrition-data"
import type { FoodItem } from "@/types/nutrition"
import Image from "next/image"

interface MealPlannerProps {
  currentPhase: "menstruation" | "follicular" | "ovulation" | "luteal"
}

export function MealPlanner({ currentPhase }: MealPlannerProps) {
  const [selectedMeal, setSelectedMeal] = useState<"breakfast" | "lunch" | "dinner" | "snacks">("breakfast")

  const currentMealPlan = sampleMealPlans.find((plan) => plan.phase === currentPhase)

  const getMealLabel = (meal: string) => {
    switch (meal) {
      case "breakfast":
        return "Petit-déjeuner"
      case "lunch":
        return "Déjeuner"
      case "dinner":
        return "Dîner"
      case "snacks":
        return "Collations"
      default:
        return meal
    }
  }

  const FoodCard = ({ food }: { food: FoodItem }) => (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center overflow-hidden">
            {food.imageUrl ? (
              <Image
                src={food.imageUrl || "/placeholder.svg"}
                alt={food.name}
                width={64}
                height={64}
                className="object-cover"
              />
            ) : (
              <Utensils className="h-8 w-8 text-primary" />
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-sm">{food.name}</h4>
            <p className="text-xs text-muted-foreground italic mb-2">{food.localName}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {food.nutrients.slice(0, 3).map((nutrient) => (
                <Badge key={nutrient} variant="outline" className="text-xs">
                  {nutrient}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">{food.benefits[0]}</p>
          </div>
        </div>
        {food.preparation && (
          <div className="mt-3 pt-3 border-t">
            <h5 className="text-xs font-medium mb-1">Préparation rapide:</h5>
            <p className="text-xs text-muted-foreground">{food.preparation[0]}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Meal Plan Overview */}
      <Card className="border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-accent" />
            Plan de Repas Personnalisé
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentMealPlan && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{currentMealPlan.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Aujourd'hui</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{currentMealPlan.totalCalories} cal</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {currentMealPlan.keyNutrients.map((nutrient) => (
                  <Badge key={nutrient} className="bg-accent/10 text-accent">
                    {nutrient}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Meal Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Repas du jour</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedMeal} onValueChange={(value) => setSelectedMeal(value as any)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="breakfast">Matin</TabsTrigger>
              <TabsTrigger value="lunch">Midi</TabsTrigger>
              <TabsTrigger value="dinner">Soir</TabsTrigger>
              <TabsTrigger value="snacks">Collations</TabsTrigger>
            </TabsList>

            {["breakfast", "lunch", "dinner", "snacks"].map((mealType) => (
              <TabsContent key={mealType} value={mealType} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{getMealLabel(mealType)}</h3>
                  <Button size="sm" variant="outline">
                    Personnaliser
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentMealPlan?.meals[mealType as keyof typeof currentMealPlan.meals].map((food) => (
                    <FoodCard key={food.id} food={food} />
                  ))}
                </div>

                {/* Quick Recipe */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-sm mb-2">Recette rapide du jour</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Combine les aliments recommandés pour un repas équilibré et savoureux
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        15 min
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Facile
                      </Badge>
                      <Button size="sm" variant="outline" className="ml-auto bg-transparent">
                        Voir la recette
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Nutrition Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Conseils nutritionnels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Hydratation</p>
                <p className="text-xs text-muted-foreground">
                  Buvez de l'eau de coco pour reconstituer les électrolytes perdus
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Fer</p>
                <p className="text-xs text-muted-foreground">
                  Associez les brèdes avec du citron pour améliorer l'absorption du fer
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
              <div className="w-2 h-2 bg-amber-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Anti-inflammatoire</p>
                <p className="text-xs text-muted-foreground">
                  Le gingembre frais aide à réduire les crampes menstruelles
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
