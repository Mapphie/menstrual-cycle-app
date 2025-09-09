"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Users, Plus, Search, Edit, Trash2, Eye, Download, AlertTriangle } from "lucide-react"
import { mockPatients } from "@/data/medical-data"
import type { Patient } from "@/types/medical"
import PatientForm from "./patient-form"
import PatientOverview from "./patient-overview"

export default function PatientManagement() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "form" | "view">("list")
  const [isEditing, setIsEditing] = useState(false)

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || patient.status === statusFilter

    return matchesSearch && matchesStatus
  })

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

  const handleAddPatient = () => {
    setSelectedPatient(null)
    setIsEditing(false)
    setViewMode("form")
  }

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setIsEditing(true)
    setViewMode("form")
  }

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setViewMode("view")
  }

  const handleSavePatient = (patientData: Partial<Patient>) => {
    if (isEditing && selectedPatient) {
      // Update existing patient
      setPatients((prev) =>
        prev.map((p) =>
          p.id === selectedPatient.id ? { ...p, ...patientData, lastVisit: new Date().toISOString().split("T")[0] } : p,
        ),
      )
    } else {
      // Add new patient
      const newPatient: Patient = {
        id: (patients.length + 1).toString(),
        ...patientData,
        alerts: [],
        lastVisit: new Date().toISOString().split("T")[0],
        status: "active",
      } as Patient
      setPatients((prev) => [...prev, newPatient])
    }
    setViewMode("list")
    setSelectedPatient(null)
  }

  const handleDeletePatient = (patientId: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== patientId))
  }

  const exportPatients = () => {
    const dataStr = JSON.stringify(patients, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `patients_export_${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  if (viewMode === "form") {
    return (
      <PatientForm
        patient={selectedPatient || undefined}
        onSave={handleSavePatient}
        onCancel={() => setViewMode("list")}
        isEditing={isEditing}
      />
    )
  }

  if (viewMode === "view" && selectedPatient) {
    return <PatientOverview patientId={selectedPatient.id} onBack={() => setViewMode("list")} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestion des Patientes</h1>
          <p className="text-sm text-muted-foreground">Gérer les dossiers et informations des patientes</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={exportPatients}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button onClick={handleAddPatient}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Patiente
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-foreground">{patients.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Actives</p>
                <p className="text-2xl font-bold text-chart-3">
                  {patients.filter((p) => p.status === "active").length}
                </p>
              </div>
              <Users className="h-8 w-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critiques</p>
                <p className="text-2xl font-bold text-destructive">
                  {patients.filter((p) => p.status === "critical").length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avec Alertes</p>
                <p className="text-2xl font-bold text-chart-4">{patients.filter((p) => p.alerts.length > 0).length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, prénom ou téléphone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actives</SelectItem>
                <SelectItem value="critical">Critiques</SelectItem>
                <SelectItem value="inactive">Inactives</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
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
            {searchTerm ? `Résultats pour "${searchTerm}"` : `${filteredPatients.length} patientes au total`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">
                        {patient.firstName} {patient.lastName}
                      </h3>
                      <Badge className={`text-xs ${getStatusColor(patient.status)}`}>{patient.status}</Badge>
                      {patient.alerts.length > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {patient.alerts.length} alerte(s)
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <span>{patient.phone}</span>
                      <span>Cycle: {patient.cycleData.averageCycleLength}j</span>
                      <span>Dernière visite: {new Date(patient.lastVisit).toLocaleDateString("fr-FR")}</span>
                    </div>
                    {patient.alerts.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-destructive font-medium">
                          Alertes: {patient.alerts.map((a) => a.title).join(", ")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewPatient(patient)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditPatient(patient)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer la patiente</AlertDialogTitle>
                        <AlertDialogDescription>
                          Êtes-vous sûr de vouloir supprimer le dossier de {patient.firstName} {patient.lastName} ?
                          Cette action est irréversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeletePatient(patient.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Supprimer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}

            {filteredPatients.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Aucune patiente trouvée</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchTerm ? "Aucun résultat pour votre recherche." : "Commencez par ajouter une nouvelle patiente."}
                </p>
                {!searchTerm && (
                  <Button onClick={handleAddPatient}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une Patiente
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
