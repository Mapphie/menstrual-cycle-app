"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Users,
  AlertTriangle,
  Calendar,
  TrendingUp,
  Activity,
  Clock,
  FileText,
  Settings,
  Search,
  Filter,
  Eye,
  BarChart3,
} from "lucide-react"
import { mockPatients, mockMedicalStats } from "@/data/medical-data"
import type { Patient } from "@/types/medical"
import PatientOverview from "./patient-overview"
import Link from "next/link"

export default function MedicalDashboard() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const stats = mockMedicalStats
  const criticalPatients = mockPatients.filter((p) => p.status === "critical")
  const todayAppointments = mockPatients.filter((p) => p.nextAppointment === "2024-02-15")

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm),
  )

  if (selectedPatientId) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dossier Patient</h1>
                <p className="text-sm text-muted-foreground">Interface Gynécologue - CycleCare Madagascar</p>
              </div>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-6 py-6">
          <PatientOverview patientId={selectedPatientId} onBack={() => setSelectedPatientId(null)} />
        </main>
      </div>
    )
  }

  const getStatusColor = (status: Patient["status"]) => {
    switch (status) {
      case "critical":
        return "bg-destructive text-destructive-foreground"
      case "active":
        return "bg-chart-3 text-white"
      case "inactive":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getAlertColor = (type: "critical" | "warning" | "info") => {
    switch (type) {
      case "critical":
        return "border-destructive bg-destructive/10"
      case "warning":
        return "border-chart-4 bg-chart-4/10"
      case "info":
        return "border-primary bg-primary/10"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard Médical</h1>
              <p className="text-sm text-muted-foreground">Interface Gynécologue - CycleCare Madagascar</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une patiente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6 space-y-6">
        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Patientes</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalPatients}</p>
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
                  <p className="text-2xl font-bold text-chart-3">{stats.activePatients}</p>
                </div>
                <Activity className="h-8 w-8 text-chart-3" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Alertes Critiques</p>
                  <p className="text-2xl font-bold text-destructive">{stats.criticalAlerts}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">RDV Aujourd'hui</p>
                  <p className="text-2xl font-bold text-primary">{stats.appointmentsToday}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Critical Alerts */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Alertes Critiques
              </CardTitle>
              <CardDescription>Patientes nécessitant une attention immédiate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {criticalPatients.map((patient) => (
                <div key={patient.id} className="space-y-2">
                  {patient.alerts.map((alert) => (
                    <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm">
                              {patient.firstName} {patient.lastName}
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              {alert.category.replace("_", " ")}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-foreground">{alert.title}</p>
                          <p className="text-xs text-muted-foreground">{alert.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Dernière visite: {new Date(patient.lastVisit).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => setSelectedPatientId(patient.id)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Voir Dossier
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Today's Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                RDV Aujourd'hui
              </CardTitle>
              <CardDescription>{stats.appointmentsToday} rendez-vous programmés</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayAppointments.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">
                      {patient.firstName} {patient.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">{patient.phone}</p>
                    <Badge className={`text-xs mt-1 ${getStatusColor(patient.status)}`}>{patient.status}</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">15:30</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-1 bg-transparent"
                      onClick={() => setSelectedPatientId(patient.id)}
                    >
                      Voir
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* All Patients List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Liste des Patientes
              {searchTerm && (
                <Badge variant="outline" className="ml-2">
                  {filteredPatients.length} résultat(s)
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              {searchTerm ? `Résultats pour "${searchTerm}"` : "Toutes les patientes enregistrées"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredPatients.slice(0, 5).map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium">
                        {patient.firstName} {patient.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">{patient.phone}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-xs ${getStatusColor(patient.status)}`}>{patient.status}</Badge>
                        {patient.alerts.length > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {patient.alerts.length} alerte(s)
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground">Dernière visite</p>
                      <p>{new Date(patient.lastVisit).toLocaleDateString("fr-FR")}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setSelectedPatientId(patient.id)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Voir
                    </Button>
                  </div>
                </div>
              ))}

              {filteredPatients.length > 5 && (
                <div className="text-center pt-4">
                  <Link href="/medical/patients">
                    <Button variant="outline">Voir toutes les patientes ({filteredPatients.length - 5} de plus)</Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Medical Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Statistiques Médicales
              </CardTitle>
              <CardDescription>Tendances générales des patientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Durée moyenne des cycles</span>
                  <span className="font-medium">{stats.averageCycleLength} jours</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taux d'irrégularité</span>
                  <span className="font-medium text-chart-2">{stats.irregularityRate}%</span>
                </div>
                <Progress value={stats.irregularityRate} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Symptômes les Plus Fréquents</CardTitle>
              <CardDescription>Basé sur les données de toutes les patientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats.commonSymptoms.map((symptom, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{symptom.symptom}</span>
                    <span className="font-medium">{symptom.percentage}%</span>
                  </div>
                  <Progress value={symptom.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
            <CardDescription>Accès rapide aux fonctionnalités principales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/medical/patients">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent w-full">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Gestion Patientes</span>
                </Button>
              </Link>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <FileText className="h-6 w-6" />
                <span className="text-sm">Rapports Médicaux</span>
              </Button>
              <Link href="/medical/appointments">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent w-full">
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm">Planifier RDV</span>
                </Button>
              </Link>
              <Link href="/medical/analysis">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent w-full">
                  <BarChart3 className="h-6 w-6" />
                  <span className="text-sm">Analyses Avancées</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
