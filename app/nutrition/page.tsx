"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { NutritionDashboard } from "@/components/nutrition-dashboard"
import { MealPlanner } from "@/components/meal-planner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NutritionPage() {
  // Mock current phase - in real app this would come from user's cycle data
  const [currentPhase] = useState<"menstruation" | "follicular" | "ovulation" | "luteal">("menstruation")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-foreground">Nutrition Personnalisée</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
            <TabsTrigger value="meals">Plan de repas</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <NutritionDashboard currentPhase={currentPhase} />
          </TabsContent>

          <TabsContent value="meals">
            <MealPlanner currentPhase={currentPhase} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
