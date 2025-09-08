"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, TrendingUp, Heart, Activity, CheckCircle, X } from "lucide-react"
import type { HealthAnomaly, HealthInsight, HealthAlert } from "@/types/health-analysis"
import { HealthAnalyzer } from "@/utils/health-analyzer"

// Mock data for demonstration
const mockCycles = [
  {
    id: "1",
    startDate: new Date("2024-01-15"),
    length: 28,
    flowIntensity: "normal" as const,
    painLevel: 3,
    symptoms: ["cramping"],
  },
  {
    id: "2",
    startDate: new Date("2024-02-10"),
    length: 25,
    flowIntensity: "heavy" as const,
    painLevel: 7,
    symptoms: ["severe_cramping", "headache"],
  },
  {
    id: "3",
    startDate: new Date("2024-03-08"),
    length: 32,
    flowIntensity: "normal" as const,
    painLevel: 8,
    symptoms: ["severe_cramping", "nausea"],
  },
  {
    id: "4",
    startDate: new Date("2024-04-05"),
    length: 26,
    flowIntensity: "heavy" as const,
    painLevel: 9,
    symptoms: ["severe_cramping", "fatigue"],
  },
]

export default function HealthDashboard() {
  const [analysis, setAnalysis] = useState<{
    anomalies: HealthAnomaly[]
    insights: HealthInsight[]
    alerts: HealthAlert[]
  }>({ anomalies: [], insights: [], alerts: [] })

  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<Set<string>>(new Set())

  useEffect(() => {
    const result = HealthAnalyzer.analyzeCycles(mockCycles)
    setAnalysis(result)
  }, [])

  const acknowledgeAlert = (alertId: string) => {
    setAcknowledgedAlerts((prev) => new Set([...prev, alertId]))
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      default:
        return <Activity className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Health Alerts */}
      {analysis.alerts.filter((alert) => !acknowledgedAlerts.has(alert.id)).length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Alertes Santé
          </h3>
          {analysis.alerts
            .filter((alert) => !acknowledgedAlerts.has(alert.id))
            .map((alert) => (
              <Alert
                key={alert.id}
                className={alert.type === "urgent" ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    {getAlertIcon(alert.type)}
                    <div>
                      <AlertTitle className="text-sm">{alert.title}</AlertTitle>
                      <AlertDescription className="text-sm">{alert.message}</AlertDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => acknowledgeAlert(alert.id)} className="h-6 w-6 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </Alert>
            ))}
        </div>
      )}

      {/* Health Score Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-500" />
            Score de Santé Menstruelle
          </CardTitle>
          <CardDescription>Évaluation basée sur vos données des 6 derniers cycles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Score global</span>
              <span className="text-2xl font-bold text-cyan-600">
                {analysis.anomalies.length === 0
                  ? "85"
                  : analysis.anomalies.filter((a) => a.severity === "high").length > 0
                    ? "45"
                    : "65"}
                /100
              </span>
            </div>
            <Progress
              value={
                analysis.anomalies.length === 0
                  ? 85
                  : analysis.anomalies.filter((a) => a.severity === "high").length > 0
                    ? 45
                    : 65
              }
              className="h-2"
            />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-green-600">{6 - analysis.anomalies.length}</div>
                <div className="text-xs text-muted-foreground">Cycles normaux</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-amber-600">
                  {analysis.anomalies.filter((a) => a.severity === "medium").length}
                </div>
                <div className="text-xs text-muted-foreground">Attention</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-red-600">
                  {analysis.anomalies.filter((a) => a.severity === "high").length}
                </div>
                <div className="text-xs text-muted-foreground">Urgent</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anomalies Detected */}
      {analysis.anomalies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Anomalies Détectées
            </CardTitle>
            <CardDescription>Patterns inhabituels identifiés dans vos données</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.anomalies.map((anomaly) => (
                <div key={anomaly.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{anomaly.description}</h4>
                    <Badge variant={getSeverityColor(anomaly.severity)}>
                      {anomaly.severity === "high" ? "Urgent" : anomaly.severity === "medium" ? "Attention" : "Léger"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{anomaly.recommendation}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Voir les remèdes
                    </Button>
                    <Button size="sm" variant="outline">
                      Consulter un professionnel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Health Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Analyses Personnalisées
          </CardTitle>
          <CardDescription>Tendances et recommandations basées sur vos données</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.insights.map((insight) => (
              <div key={insight.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
                {insight.actionable && (
                  <Badge variant="secondary" className="text-xs">
                    Action requise
                  </Badge>
                )}
              </div>
            ))}

            {/* Additional recommendations */}
            <div className="mt-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
              <h4 className="font-medium text-cyan-900 mb-2">Recommandations Personnalisées</h4>
              <ul className="space-y-1 text-sm text-cyan-800">
                {HealthAnalyzer.generateRecommendations(analysis.anomalies).map((rec, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
