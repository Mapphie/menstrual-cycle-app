"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Phone, Mail, MapPin, AlertTriangle, Activity, Heart, Clock, ArrowLeft } from "lucide-react"
import type { Patient } from "@/types/medical"
import { mockPatients } from "@/data/medical-data"

interface PatientOverviewProps {
  patientId: string
  onBack: () => void
}

export default function PatientOverview({ patientId, onBack }: PatientOverviewProps) {
  const patient = mockPatients.find((p) => p.id === patientId)

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Patiente non trouvée</p>
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

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birth = new Date(dateOfBirth)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const daysSinceLastPeriod = Math.floor(
    (new Date().getTime() - new Date(patient.cycleData.lastPeriodDate).getTime()) / (1000 * 3600 * 24),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {patient.firstName} {patient.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {calculateAge(patient.dateOfBirth)} ans • Patiente #{patient.id}
            </p>
          </div>
        </div>
        <Badge className={`${getStatusColor(patient.status)}`}>{patient.status}</Badge>
      </div>

      {/* Alert Banner */}
      {patient.alerts.length > 0 && (
        <Card className="border-destructive bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-destructive mb-2">{patient.alerts.length} alerte(s) active(s)</h3>
                <div className="space-y-2">
                  {patient.alerts.map((alert) => (
                    <div key={alert.id} className="text-sm">
                      <p className="font-medium">{alert.title}</p>
                      <p className="text-muted-foreground">{alert.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="cycle">Données de Cycle</TabsTrigger>
          <TabsTrigger value="medical">Historique Médical</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Current Cycle Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Activity className="h-4 w-4" />
                  Cycle Actuel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Dernières règles</span>
                    <span className="font-medium">Il y a {daysSinceLastPeriod} jours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Durée moyenne</span>
                    <span className="font-medium">{patient.cycleData.averageCycleLength} jours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Score d'irrégularité</span>
                    <span
                      className={`font-medium ${patient.cycleData.irregularityScore > 7 ? "text-destructive" : patient.cycleData.irregularityScore > 4 ? "text-chart-4" : "text-chart-3"}`}
                    >
                      {patient.cycleData.irregularityScore}/10
                    </span>
                  </div>
                  <Progress value={patient.cycleData.irregularityScore * 10} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Pain Level */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Heart className="h-4 w-4" />
                  Niveau de Douleur
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold ${patient.cycleData.painLevel > 7 ? "text-destructive" : patient.cycleData.painLevel > 4 ? "text-chart-4" : "text-chart-3"}`}
                  >
                    {patient.cycleData.painLevel}/10
                  </div>
                  <p className="text-sm text-muted-foreground">Niveau moyen</p>
                </div>
                <Progress value={patient.cycleData.painLevel * 10} className="h-2" />
                <div className="space-y-1">
                  {patient.cycleData.symptoms.map((symptom, index) => (
                    <Badge key={index} variant="outline" className="text-xs mr-1">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="h-4 w-4" />
                  Rendez-vous
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Dernière visite</p>
                    <p className="font-medium">{new Date(patient.lastVisit).toLocaleDateString("fr-FR")}</p>
                  </div>
                  {patient.nextAppointment && (
                    <div>
                      <p className="text-sm text-muted-foreground">Prochain RDV</p>
                      <p className="font-medium text-primary">
                        {new Date(patient.nextAppointment).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  )}
                </div>
                <Button size="sm" className="w-full">
                  <Clock className="h-4 w-4 mr-2" />
                  Planifier RDV
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cycle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyse des Cycles Menstruels</CardTitle>
              <CardDescription>Données détaillées sur les cycles de la patiente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Statistiques Générales</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Durée moyenne des cycles</span>
                      <span className="font-medium">{patient.cycleData.averageCycleLength} jours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Dernières règles</span>
                      <span className="font-medium">
                        {new Date(patient.cycleData.lastPeriodDate).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Niveau de douleur moyen</span>
                      <span
                        className={`font-medium ${patient.cycleData.painLevel > 7 ? "text-destructive" : "text-foreground"}`}
                      >
                        {patient.cycleData.painLevel}/10
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Symptômes Fréquents</h4>
                  <div className="flex flex-wrap gap-2">
                    {patient.cycleData.symptoms.map((symptom, index) => (
                      <Badge key={index} variant="secondary">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Allergies</CardTitle>
              </CardHeader>
              <CardContent>
                {patient.medicalHistory.allergies.length > 0 ? (
                  <div className="space-y-2">
                    {patient.medicalHistory.allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive" className="mr-2">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Aucune allergie connue</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Médicaments Actuels</CardTitle>
              </CardHeader>
              <CardContent>
                {patient.medicalHistory.medications.length > 0 ? (
                  <div className="space-y-2">
                    {patient.medicalHistory.medications.map((medication, index) => (
                      <div key={index} className="text-sm">
                        <p className="font-medium">{medication}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Aucun médicament</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Conditions Médicales</CardTitle>
              </CardHeader>
              <CardContent>
                {patient.medicalHistory.conditions.length > 0 ? (
                  <div className="space-y-2">
                    {patient.medicalHistory.conditions.map((condition, index) => (
                      <Badge key={index} variant="outline" className="mr-2">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Aucune condition particulière</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Chirurgies</CardTitle>
              </CardHeader>
              <CardContent>
                {patient.medicalHistory.surgeries.length > 0 ? (
                  <div className="space-y-2">
                    {patient.medicalHistory.surgeries.map((surgery, index) => (
                      <div key={index} className="text-sm">
                        <p className="font-medium">{surgery.procedure}</p>
                        <p className="text-muted-foreground">{new Date(surgery.date).toLocaleDateString("fr-FR")}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Aucune chirurgie</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Informations de Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.phone}</span>
                </div>
                {patient.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{patient.email}</span>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm">{patient.address}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Contact d'Urgence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium text-sm">{patient.emergencyContact.name}</p>
                  <p className="text-sm text-muted-foreground">{patient.emergencyContact.relationship}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.emergencyContact.phone}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
