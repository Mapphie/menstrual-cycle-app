"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, CheckCircle, Clock, TrendingUp, BarChart3, Users } from "lucide-react"
import { mockDiagnosticResults, mockComparisonData, mockCycleAnalysis } from "@/data/analysis-data"
import { mockPatients } from "@/data/medical-data"
import CycleAnalysisChart from "./cycle-analysis-chart"
import type { DiagnosticResult, ComparisonData } from "@/types/analysis"

export default function DiagnosticTools() {
  const [selectedPatientId, setSelectedPatientId] = useState<string>("1")
  const [analysisType, setAnalysisType] = useState<string>("cycle_analysis")

  const selectedPatient = mockPatients.find((p) => p.id === selectedPatientId)
  const patientAnalysis = mockCycleAnalysis.find((a) => a.patientId === selectedPatientId)
  const patientDiagnostics = mockDiagnosticResults.filter((d) => d.patientId === selectedPatientId)

  const getUrgencyColor = (urgency: DiagnosticResult["urgency"]) => {
    switch (urgency) {
      case "emergency":
        return "bg-destructive text-destructive-foreground"
      case "urgent":
        return "bg-chart-2 text-white"
      case "routine":
        return "bg-chart-1 text-white"
    }
  }

  const getConfidenceColor = (confidence: DiagnosticResult["confidence"]) => {
    switch (confidence) {
      case "high":
        return "text-chart-3"
      case "medium":
        return "text-chart-4"
      case "low":
        return "text-muted-foreground"
    }
  }

  const getStatusColor = (status: ComparisonData["status"]) => {
    switch (status) {
      case "normal":
        return "text-chart-3"
      case "concerning":
        return "text-chart-4"
      case "critical":
        return "text-destructive"
    }
  }

  const getStatusIcon = (status: ComparisonData["status"]) => {
    switch (status) {
      case "normal":
        return <CheckCircle className="h-4 w-4 text-chart-3" />
      case "concerning":
        return <Clock className="h-4 w-4 text-chart-4" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Outils d'Analyse et de Diagnostic</h1>
          <p className="text-sm text-muted-foreground">
            Analyse avancée des données menstruelles et diagnostic assisté
          </p>
        </div>
      </div>

      {/* Patient Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground">Sélectionner une patiente</label>
              <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choisir une patiente" />
                </SelectTrigger>
                <SelectContent>
                  {mockPatients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.firstName} {patient.lastName} - {patient.phone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground">Type d'analyse</label>
              <Select value={analysisType} onValueChange={setAnalysisType}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Type d'analyse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cycle_analysis">Analyse des Cycles</SelectItem>
                  <SelectItem value="diagnostic_screening">Dépistage Diagnostique</SelectItem>
                  <SelectItem value="comparative_analysis">Analyse Comparative</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedPatient && (
        <Tabs value={analysisType} onValueChange={setAnalysisType} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cycle_analysis" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analyse des Cycles
            </TabsTrigger>
            <TabsTrigger value="diagnostic_screening" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Dépistage Diagnostique
            </TabsTrigger>
            <TabsTrigger value="comparative_analysis" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analyse Comparative
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cycle_analysis" className="space-y-4">
            {patientAnalysis ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Analyse pour {selectedPatient.firstName} {selectedPatient.lastName}
                    </CardTitle>
                    <CardDescription>Analyse détaillée des cycles menstruels et tendances</CardDescription>
                  </CardHeader>
                </Card>

                <CycleAnalysisChart data={patientAnalysis} />

                {/* Risk Factors */}
                <Card>
                  <CardHeader>
                    <CardTitle>Facteurs de Risque Identifiés</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {patientAnalysis.riskFactors.map((risk, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <AlertTriangle
                          className={`h-5 w-5 mt-0.5 ${
                            risk.severity === "high"
                              ? "text-destructive"
                              : risk.severity === "medium"
                                ? "text-chart-4"
                                : "text-chart-1"
                          }`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{risk.factor}</h4>
                            <Badge
                              variant={
                                risk.severity === "high"
                                  ? "destructive"
                                  : risk.severity === "medium"
                                    ? "secondary"
                                    : "default"
                              }
                            >
                              {risk.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{risk.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recommandations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {patientAnalysis.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <CheckCircle
                          className={`h-5 w-5 mt-0.5 ${
                            rec.priority === "high"
                              ? "text-destructive"
                              : rec.priority === "medium"
                                ? "text-chart-4"
                                : "text-chart-3"
                          }`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {rec.category}
                            </Badge>
                            <Badge
                              variant={
                                rec.priority === "high"
                                  ? "destructive"
                                  : rec.priority === "medium"
                                    ? "secondary"
                                    : "default"
                              }
                              className="text-xs"
                            >
                              {rec.priority}
                            </Badge>
                          </div>
                          <p className="text-sm">{rec.recommendation}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">Aucune donnée d'analyse disponible pour cette patiente</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="diagnostic_screening" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Résultats du Dépistage Diagnostique
                </CardTitle>
                <CardDescription>Conditions potentielles identifiées par l'analyse des symptômes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {patientDiagnostics.length > 0 ? (
                  patientDiagnostics.map((diagnostic, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-lg">{diagnostic.condition}</h3>
                            <Badge className={getUrgencyColor(diagnostic.urgency)}>{diagnostic.urgency}</Badge>
                          </div>
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Probabilité:</span>
                              <span className="font-medium">{diagnostic.probability}%</span>
                              <Progress value={diagnostic.probability} className="w-20 h-2" />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Confiance:</span>
                              <span className={`font-medium ${getConfidenceColor(diagnostic.confidence)}`}>
                                {diagnostic.confidence}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">Symptômes</h4>
                          <div className="space-y-1">
                            {diagnostic.symptoms.map((symptom, i) => (
                              <Badge key={i} variant="outline" className="text-xs mr-1">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2">Preuves</h4>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {diagnostic.supportingEvidence.map((evidence, i) => (
                              <li key={i}>• {evidence}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2">Actions Recommandées</h4>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {diagnostic.recommendedActions.map((action, i) => (
                              <li key={i}>• {action}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-chart-3 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">Aucune condition détectée</h3>
                    <p className="text-sm text-muted-foreground">
                      L'analyse des symptômes ne révèle aucune condition nécessitant une attention particulière.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparative_analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Analyse Comparative
                </CardTitle>
                <CardDescription>Comparaison avec les moyennes de la population</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockComparisonData.map((comparison, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(comparison.status)}
                        <h3 className="font-medium">{comparison.metric}</h3>
                      </div>
                      <Badge
                        variant={
                          comparison.status === "normal"
                            ? "default"
                            : comparison.status === "concerning"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {comparison.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Valeur patiente</p>
                        <p className={`font-medium ${getStatusColor(comparison.status)}`}>
                          {comparison.metric.includes("Niveau")
                            ? `${comparison.patientValue}/10`
                            : `${comparison.patientValue}${comparison.metric.includes("Durée") ? " jours" : ""}`}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Moyenne population</p>
                        <p className="font-medium">
                          {comparison.metric.includes("Niveau")
                            ? `${comparison.averageValue}/10`
                            : `${comparison.averageValue}${comparison.metric.includes("Durée") ? " jours" : ""}`}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Percentile</p>
                        <p className="font-medium">{comparison.percentile}e</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Écart</p>
                        <p
                          className={`font-medium ${comparison.patientValue > comparison.averageValue ? "text-chart-2" : "text-chart-3"}`}
                        >
                          {comparison.patientValue > comparison.averageValue ? "+" : ""}
                          {comparison.patientValue - comparison.averageValue}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <Progress value={comparison.percentile} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Position dans la population (percentile {comparison.percentile})
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
