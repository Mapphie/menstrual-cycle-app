"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import type { CycleAnalysisData } from "@/types/analysis"

interface CycleAnalysisChartProps {
  data: CycleAnalysisData
}

export default function CycleAnalysisChart({ data }: CycleAnalysisChartProps) {
  const getTrendIcon = (trend: "stable" | "increasing" | "decreasing") => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-chart-2" />
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-chart-3" />
      case "stable":
        return <Minus className="h-4 w-4 text-chart-1" />
    }
  }

  const getTrendColor = (trend: "stable" | "increasing" | "decreasing") => {
    switch (trend) {
      case "increasing":
        return "text-chart-2"
      case "decreasing":
        return "text-chart-3"
      case "stable":
        return "text-chart-1"
    }
  }

  const chartData = data.cycleHistory
    .map((cycle, index) => ({
      cycle: `Cycle ${index + 1}`,
      date: new Date(cycle.date).toLocaleDateString("fr-FR", { month: "short", day: "numeric" }),
      cycleLength: cycle.cycleLength,
      painLevel: cycle.painLevel,
      flowIntensity: cycle.flowIntensity,
    }))
    .reverse()

  return (
    <div className="space-y-6">
      {/* Trends Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Durée Moyenne</p>
                <p className="text-2xl font-bold">{data.trends.averageCycleLength}j</p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(data.trends.cycleLengthTrend)}
                <span className={`text-sm ${getTrendColor(data.trends.cycleLengthTrend)}`}>
                  {data.trends.cycleLengthTrend}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tendance Douleur</p>
                <p className="text-2xl font-bold">{data.cycleHistory[0]?.painLevel || 0}/10</p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(data.trends.painTrend)}
                <span className={`text-sm ${getTrendColor(data.trends.painTrend)}`}>{data.trends.painTrend}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Score Irrégularité</p>
                <p className="text-2xl font-bold">{data.trends.irregularityScore}/10</p>
              </div>
              <Badge
                variant={
                  data.trends.irregularityScore > 7
                    ? "destructive"
                    : data.trends.irregularityScore > 4
                      ? "secondary"
                      : "default"
                }
              >
                {data.trends.irregularityScore > 7 ? "Élevé" : data.trends.irregularityScore > 4 ? "Modéré" : "Normal"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cycle Length Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution de la Durée des Cycles</CardTitle>
          <CardDescription>Suivi des derniers cycles menstruels</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[20, 40]} />
              <Tooltip
                labelFormatter={(label) => `Date: ${label}`}
                formatter={(value, name) => [`${value} jours`, "Durée du cycle"]}
              />
              <Line
                type="monotone"
                dataKey="cycleLength"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pain and Flow Intensity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Niveau de Douleur et Intensité du Flux</CardTitle>
          <CardDescription>Comparaison des symptômes par cycle</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} />
              <Tooltip
                formatter={(value, name) => [
                  `${value}/10`,
                  name === "painLevel" ? "Niveau de douleur" : "Intensité du flux",
                ]}
              />
              <Bar dataKey="painLevel" fill="hsl(var(--chart-2))" name="painLevel" />
              <Bar dataKey="flowIntensity" fill="hsl(var(--chart-1))" name="flowIntensity" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>Prédictions</CardTitle>
          <CardDescription>Basées sur l'analyse des cycles précédents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-primary/5 rounded-lg">
              <p className="text-sm text-muted-foreground">Prochaines règles</p>
              <p className="font-medium text-primary">
                {new Date(data.predictions.nextPeriodDate).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <div className="p-3 bg-chart-3/5 rounded-lg">
              <p className="text-sm text-muted-foreground">Ovulation prévue</p>
              <p className="font-medium text-chart-3">
                {new Date(data.predictions.ovulationDate).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <div className="p-3 bg-chart-4/5 rounded-lg">
              <p className="text-sm text-muted-foreground">Fenêtre de fertilité</p>
              <p className="font-medium text-chart-4">
                {new Date(data.predictions.fertilityWindow.start).toLocaleDateString("fr-FR")} -{" "}
                {new Date(data.predictions.fertilityWindow.end).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
