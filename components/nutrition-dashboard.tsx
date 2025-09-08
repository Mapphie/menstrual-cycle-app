"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Utensils, Droplets, Zap, Heart, TrendingUp } from "lucide-react"
import { nutritionRecommendations } from "@/data/nutrition-data"

interface NutritionDashboardProps {
  currentPhase: "menstruation" | "follicular" | "ovulation" | "luteal"
}

export function NutritionDashboard({ currentPhase }: NutritionDashboardProps) {
  const [dailyIntake, setDailyIntake] = useState({
    water: 6, // glasses
    iron: 75, // percentage of daily needs
    calories: 1200,
    targetCalories: 1800,
  })

  const currentRecommendation = nutritionRecommendations.find((rec) => rec.phase === currentPhase)

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "menstruation":
        return "bg-red-100 text-red-800"
      case "follicular":
        return "bg-green-100 text-green-800"
      case "ovulation":
        return "bg-blue-100 text-blue-800"
      case "luteal":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPhaseLabel = (phase: string) => {
    switch (phase) {
      case "menstruation":
        return "Règles"
      case "follicular":
        return "Folliculaire"
      case "ovulation":
        return "Ovulation"
      case "luteal":
        return "Lutéale"
      default:
        return phase
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Phase Nutrition */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-primary" />
              Nutrition Personnalisée
            </CardTitle>
            <Badge className={getPhaseColor(currentPhase)} variant="secondary">
              Phase {getPhaseLabel(currentPhase)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentRecommendation && (
            <>
              <div>
                <h3 className="font-medium mb-2">{currentRecommendation.title}</h3>
                <p className="text-sm text-muted-foreground">{currentRecommendation.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Bienfaits clés</h4>
                  <ul className="space-y-1">
                    {currentRecommendation.benefits.slice(0, 3).map((benefit, index) => (
                      <li key={index} className="text-xs flex items-start gap-2">
                        <Heart className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Conseils du jour</h4>
                  <ul className="space-y-1">
                    {currentRecommendation.tips.slice(0, 3).map((tip, index) => (
                      <li key={index} className="text-xs flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Daily Tracking */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Water Intake */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              Hydratation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{dailyIntake.water}</div>
              <div className="text-xs text-muted-foreground">verres / 8</div>
            </div>
            <Progress value={(dailyIntake.water / 8) * 100} className="h-2" />
            <Button
              size="sm"
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => setDailyIntake((prev) => ({ ...prev, water: Math.min(8, prev.water + 1) }))}
            >
              + 1 verre
            </Button>
          </CardContent>
        </Card>

        {/* Iron Intake */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Zap className="h-4 w-4 text-red-500" />
              Fer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">{dailyIntake.iron}%</div>
              <div className="text-xs text-muted-foreground">besoins quotidiens</div>
            </div>
            <Progress value={dailyIntake.iron} className="h-2" />
            <div className="text-xs text-center text-muted-foreground">
              {dailyIntake.iron < 100 ? "Ajoutez des brèdes ou du riz rouge" : "Objectif atteint !"}
            </div>
          </CardContent>
        </Card>

        {/* Calories */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Calories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{dailyIntake.calories}</div>
              <div className="text-xs text-muted-foreground">/ {dailyIntake.targetCalories}</div>
            </div>
            <Progress value={(dailyIntake.calories / dailyIntake.targetCalories) * 100} className="h-2" />
            <div className="text-xs text-center text-muted-foreground">
              {dailyIntake.targetCalories - dailyIntake.calories} calories restantes
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Foods */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Aliments recommandés aujourd'hui</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentRecommendation?.foods.slice(0, 6).map((food) => (
              <div key={food.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Utensils className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{food.name}</h4>
                  <p className="text-xs text-muted-foreground italic">{food.localName}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {food.nutrients.slice(0, 2).map((nutrient) => (
                      <Badge key={nutrient} variant="outline" className="text-xs">
                        {nutrient}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
