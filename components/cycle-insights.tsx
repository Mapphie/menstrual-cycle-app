"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Calendar, AlertTriangle, CheckCircle } from "lucide-react"

interface CycleData {
  averageLength: number
  lastCycleLength: number
  regularityScore: number
  nextPeriodPrediction: string
  insights: string[]
  warnings: string[]
}

export function CycleInsights() {
  // Mock data for demonstration
  const cycleData: CycleData = {
    averageLength: 28,
    lastCycleLength: 30,
    regularityScore: 85,
    nextPeriodPrediction: "13 septembre 2024",
    insights: [
      "Votre cycle est généralement régulier",
      "Vos symptômes sont plus intenses pendant l'ovulation",
      "Vous avez tendance à avoir des crampes les 2 premiers jours",
    ],
    warnings: ["Votre dernier cycle était plus long que la moyenne"],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Analyse de votre Cycle
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cycle Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center space-y-1">
            <p className="text-2xl font-bold text-primary">{cycleData.averageLength}</p>
            <p className="text-xs text-muted-foreground">Durée moyenne (jours)</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-2xl font-bold text-accent">{cycleData.lastCycleLength}</p>
            <p className="text-xs text-muted-foreground">Dernier cycle (jours)</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-2xl font-bold text-chart-1">{cycleData.regularityScore}%</p>
            <p className="text-xs text-muted-foreground">Régularité</p>
          </div>
        </div>

        {/* Regularity Score */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Score de régularité</span>
            <span>{cycleData.regularityScore}%</span>
          </div>
          <Progress value={cycleData.regularityScore} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {cycleData.regularityScore >= 80 ? "Excellent" : cycleData.regularityScore >= 60 ? "Bon" : "À surveiller"}
          </p>
        </div>

        {/* Next Period Prediction */}
        <div className="p-4 bg-primary/5 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-medium">Prochaines règles prévues</h4>
          </div>
          <p className="text-sm text-primary font-medium">{cycleData.nextPeriodPrediction}</p>
        </div>

        {/* Insights */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Observations
          </h4>
          <div className="space-y-2">
            {cycleData.insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Warnings */}
        {cycleData.warnings.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              Points d'attention
            </h4>
            <div className="space-y-2">
              {cycleData.warnings.map((warning, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">{warning}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
