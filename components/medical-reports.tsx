"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Download, Eye, Plus, Calendar, TrendingUp, Users, Activity, AlertCircle, CheckCircle } from "lucide-react"
import { mockReports, mockStatistics } from "@/data/reports-data"
import type { MedicalReport } from "@/types/reports"
import { Bar, BarChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const COLORS = ["#0891b2", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6"]

export default function MedicalReports() {
  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(null)
  const [activeTab, setActiveTab] = useState("reports")

  const getStatusColor = (status: MedicalReport["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getReportTypeLabel = (type: MedicalReport["reportType"]) => {
    switch (type) {
      case "cycle_analysis":
        return "Analyse des Cycles"
      case "symptom_tracking":
        return "Suivi des Symptômes"
      case "treatment_progress":
        return "Progrès du Traitement"
      case "comprehensive":
        return "Rapport Complet"
      default:
        return type
    }
  }

  if (selectedReport) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setSelectedReport(null)}>
            ← Retour aux rapports
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter PDF
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter Excel
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Rapport Médical - {selectedReport.patientName}</CardTitle>
                <CardDescription>
                  {getReportTypeLabel(selectedReport.reportType)} • Période:{" "}
                  {new Date(selectedReport.period.startDate).toLocaleDateString("fr-FR")} -
                  {new Date(selectedReport.period.endDate).toLocaleDateString("fr-FR")}
                </CardDescription>
              </div>
              <Badge className={getStatusColor(selectedReport.status)}>{selectedReport.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Résumé</h3>
              <p className="text-muted-foreground">{selectedReport.summary}</p>
            </div>

            {/* Comprehensive Data */}
            {selectedReport.data.comprehensiveData && (
              <div className="space-y-6">
                {/* Cycle Analysis */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Analyse des Cycles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary">
                            {selectedReport.data.comprehensiveData.cycleData.averageCycleLength}j
                          </p>
                          <p className="text-sm text-muted-foreground">Durée moyenne</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">
                            {selectedReport.data.comprehensiveData.cycleData.cycleRegularity}%
                          </p>
                          <p className="text-sm text-muted-foreground">Régularité</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">
                            {selectedReport.data.comprehensiveData.cycleData.totalCycles}
                          </p>
                          <p className="text-sm text-muted-foreground">Total cycles</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-amber-600">
                            {selectedReport.data.comprehensiveData.cycleData.irregularCycles}
                          </p>
                          <p className="text-sm text-muted-foreground">Cycles irréguliers</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Symptom Analysis */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Analyse des Symptômes</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Symptômes les Plus Fréquents</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedReport.data.comprehensiveData.symptomData.mostCommonSymptoms.map(
                            (symptom, index) => (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>{symptom.symptom}</span>
                                  <span className="font-medium">{symptom.frequency}%</span>
                                </div>
                                <Progress value={symptom.frequency} className="h-2" />
                                <p className="text-xs text-muted-foreground">Sévérité moyenne: {symptom.severity}/10</p>
                              </div>
                            ),
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Niveaux de Douleur par Phase</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={selectedReport.data.comprehensiveData.symptomData.painLevels}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="phase" />
                            <YAxis domain={[0, 10]} />
                            <Tooltip />
                            <Bar dataKey="averagePain" fill="#0891b2" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Treatment Progress */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Progrès du Traitement</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Traitements Actuels</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedReport.data.comprehensiveData.treatmentData.treatments.map((treatment, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{treatment.name}</h4>
                                <Badge variant="outline">{treatment.effectiveness}% efficace</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Début: {new Date(treatment.startDate).toLocaleDateString("fr-FR")}
                              </p>
                              {treatment.sideEffects.length > 0 && (
                                <p className="text-sm text-amber-600 mt-1">
                                  Effets secondaires: {treatment.sideEffects.join(", ")}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Métriques de Progrès</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedReport.data.comprehensiveData.treatmentData.progressMetrics.map((metric, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>{metric.metric}</span>
                                <span className="font-medium text-green-600">+{metric.improvement}%</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>Baseline: {metric.baseline}</span>
                                <span>→</span>
                                <span>Actuel: {metric.current}</span>
                              </div>
                              <Progress value={(metric.current / metric.baseline) * 100} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Health Score & Risk Factors */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Score de Santé Global</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">
                          {selectedReport.data.comprehensiveData.healthScore}/100
                        </div>
                        <Progress value={selectedReport.data.comprehensiveData.healthScore} className="h-3" />
                        <p className="text-sm text-muted-foreground mt-2">
                          {selectedReport.data.comprehensiveData.healthScore >= 80
                            ? "Excellent"
                            : selectedReport.data.comprehensiveData.healthScore >= 60
                              ? "Bon"
                              : selectedReport.data.comprehensiveData.healthScore >= 40
                                ? "Moyen"
                                : "Nécessite attention"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Facteurs de Risque</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedReport.data.comprehensiveData.riskFactors.map((factor, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
                            <AlertCircle className="w-4 h-4 text-amber-600" />
                            <span className="text-sm">{factor}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Recommandations</h3>
              <div className="space-y-2">
                {selectedReport.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{recommendation}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rapports & Statistiques</h1>
          <p className="text-muted-foreground mt-2">Générez et consultez les rapports médicaux détaillés</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Rapport
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reports">Rapports Médicaux</TabsTrigger>
          <TabsTrigger value="statistics">Statistiques Globales</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {mockReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{report.patientName}</h3>
                        <Badge variant="outline">{getReportTypeLabel(report.reportType)}</Badge>
                        <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Période: {new Date(report.period.startDate).toLocaleDateString("fr-FR")} -
                        {new Date(report.period.endDate).toLocaleDateString("fr-FR")}
                      </p>
                      <p className="text-sm">{report.summary}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6">
          {/* Patient Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Patientes</p>
                    <p className="text-2xl font-bold">{mockStatistics.patientStatistics.totalPatients}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Patientes Actives</p>
                    <p className="text-2xl font-bold text-green-600">
                      {mockStatistics.patientStatistics.activePatients}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Nouvelles ce mois</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {mockStatistics.patientStatistics.newPatientsThisMonth}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Âge Moyen</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {mockStatistics.patientStatistics.averageAge} ans
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribution par Âge</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockStatistics.patientStatistics.ageDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ageRange" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#0891b2" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Symptômes les Plus Fréquents</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mockStatistics.symptomStatistics.mostCommonSymptoms}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ symptom, percentage }) => `${symptom}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {mockStatistics.symptomStatistics.mostCommonSymptoms.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Treatment Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Traitements les Plus Prescrits</CardTitle>
              <CardDescription>Efficacité et fréquence d'utilisation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStatistics.treatmentStatistics.mostPrescribedTreatments.map((treatment, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{treatment.treatment}</span>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">{treatment.count} prescriptions</span>
                        <Badge variant="outline">{treatment.successRate}% succès</Badge>
                      </div>
                    </div>
                    <Progress value={treatment.successRate} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
