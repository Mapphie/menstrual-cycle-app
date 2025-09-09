"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, X, Save, ArrowLeft } from "lucide-react"
import type { Patient } from "@/types/medical"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface PatientFormProps {
  patient?: Patient
  onSave: (patient: Partial<Patient>) => void
  onCancel: () => void
  isEditing?: boolean
}

export default function PatientForm({ patient, onSave, onCancel, isEditing = false }: PatientFormProps) {
  const [formData, setFormData] = useState({
    firstName: patient?.firstName || "",
    lastName: patient?.lastName || "",
    dateOfBirth: patient?.dateOfBirth || "",
    phone: patient?.phone || "",
    email: patient?.email || "",
    address: patient?.address || "",
    emergencyContact: {
      name: patient?.emergencyContact?.name || "",
      phone: patient?.emergencyContact?.phone || "",
      relationship: patient?.emergencyContact?.relationship || "",
    },
    medicalHistory: {
      allergies: patient?.medicalHistory?.allergies || [],
      medications: patient?.medicalHistory?.medications || [],
      conditions: patient?.medicalHistory?.conditions || [],
      surgeries: patient?.medicalHistory?.surgeries || [],
    },
    cycleData: {
      averageCycleLength: patient?.cycleData?.averageCycleLength || 28,
      lastPeriodDate: patient?.cycleData?.lastPeriodDate || "",
      irregularityScore: patient?.cycleData?.irregularityScore || 0,
      painLevel: patient?.cycleData?.painLevel || 0,
      symptoms: patient?.cycleData?.symptoms || [],
    },
  })

  const [newAllergy, setNewAllergy] = useState("")
  const [newMedication, setNewMedication] = useState("")
  const [newCondition, setNewCondition] = useState("")
  const [newSymptom, setNewSymptom] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(
    patient?.dateOfBirth ? new Date(patient.dateOfBirth) : undefined,
  )
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | undefined>(
    patient?.cycleData?.lastPeriodDate ? new Date(patient.cycleData.lastPeriodDate) : undefined,
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const patientData = {
      ...formData,
      dateOfBirth: dateOfBirth ? format(dateOfBirth, "yyyy-MM-dd") : "",
      cycleData: {
        ...formData.cycleData,
        lastPeriodDate: lastPeriodDate ? format(lastPeriodDate, "yyyy-MM-dd") : "",
      },
    }

    onSave(patientData)
  }

  const addToArray = (field: string, value: string, subField?: string) => {
    if (!value.trim()) return

    setFormData((prev) => {
      if (subField) {
        return {
          ...prev,
          [field]: {
            ...prev[field as keyof typeof prev],
            [subField]: [...(prev[field as keyof typeof prev] as any)[subField], value.trim()],
          },
        }
      } else {
        return {
          ...prev,
          [field]: {
            ...prev[field as keyof typeof prev],
            [subField || field]: [...(prev[field as keyof typeof prev] as any), value.trim()],
          },
        }
      }
    })
  }

  const removeFromArray = (field: string, index: number, subField?: string) => {
    setFormData((prev) => {
      if (subField) {
        const newArray = [...(prev[field as keyof typeof prev] as any)[subField]]
        newArray.splice(index, 1)
        return {
          ...prev,
          [field]: {
            ...prev[field as keyof typeof prev],
            [subField]: newArray,
          },
        }
      } else {
        const newArray = [...(prev[field as keyof typeof prev] as any)]
        newArray.splice(index, 1)
        return {
          ...prev,
          [field]: newArray,
        }
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isEditing ? "Modifier la Patiente" : "Nouvelle Patiente"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isEditing ? "Mettre à jour les informations" : "Ajouter une nouvelle patiente au système"}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Informations Personnelles</TabsTrigger>
            <TabsTrigger value="medical">Historique Médical</TabsTrigger>
            <TabsTrigger value="cycle">Données de Cycle</TabsTrigger>
            <TabsTrigger value="emergency">Contact d'Urgence</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations Personnelles</CardTitle>
                <CardDescription>Données de base de la patiente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date de Naissance *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateOfBirth ? format(dateOfBirth, "dd MMMM yyyy", { locale: fr }) : "Sélectionner une date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={dateOfBirth} onSelect={setDateOfBirth} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="+261 34 12 345 67"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="exemple@email.mg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adresse *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    placeholder="Adresse complète"
                    required
                  />
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
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={newAllergy}
                      onChange={(e) => setNewAllergy(e.target.value)}
                      placeholder="Ajouter une allergie"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addToArray("medicalHistory", newAllergy, "allergies")
                          setNewAllergy("")
                        }
                      }}
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        addToArray("medicalHistory", newAllergy, "allergies")
                        setNewAllergy("")
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.medicalHistory.allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive" className="flex items-center gap-1">
                        {allergy}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeFromArray("medicalHistory", index, "allergies")}
                        />
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Médicaments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={newMedication}
                      onChange={(e) => setNewMedication(e.target.value)}
                      placeholder="Ajouter un médicament"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addToArray("medicalHistory", newMedication, "medications")
                          setNewMedication("")
                        }
                      }}
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        addToArray("medicalHistory", newMedication, "medications")
                        setNewMedication("")
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.medicalHistory.medications.map((medication, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {medication}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeFromArray("medicalHistory", index, "medications")}
                        />
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Conditions Médicales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={newCondition}
                      onChange={(e) => setNewCondition(e.target.value)}
                      placeholder="Ajouter une condition"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addToArray("medicalHistory", newCondition, "conditions")
                          setNewCondition("")
                        }
                      }}
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        addToArray("medicalHistory", newCondition, "conditions")
                        setNewCondition("")
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.medicalHistory.conditions.map((condition, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {condition}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeFromArray("medicalHistory", index, "conditions")}
                        />
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cycle" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Données de Cycle Menstruel</CardTitle>
                <CardDescription>Informations sur les cycles de la patiente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cycleLength">Durée Moyenne du Cycle (jours)</Label>
                    <Input
                      id="cycleLength"
                      type="number"
                      min="21"
                      max="45"
                      value={formData.cycleData.averageCycleLength}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          cycleData: { ...prev.cycleData, averageCycleLength: Number.parseInt(e.target.value) || 28 },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Dernières Règles</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {lastPeriodDate
                            ? format(lastPeriodDate, "dd MMMM yyyy", { locale: fr })
                            : "Sélectionner une date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={lastPeriodDate} onSelect={setLastPeriodDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="irregularityScore">Score d'Irrégularité (0-10)</Label>
                    <Input
                      id="irregularityScore"
                      type="number"
                      min="0"
                      max="10"
                      value={formData.cycleData.irregularityScore}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          cycleData: { ...prev.cycleData, irregularityScore: Number.parseInt(e.target.value) || 0 },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="painLevel">Niveau de Douleur (0-10)</Label>
                    <Input
                      id="painLevel"
                      type="number"
                      min="0"
                      max="10"
                      value={formData.cycleData.painLevel}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          cycleData: { ...prev.cycleData, painLevel: Number.parseInt(e.target.value) || 0 },
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Symptômes Fréquents</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newSymptom}
                      onChange={(e) => setNewSymptom(e.target.value)}
                      placeholder="Ajouter un symptôme"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addToArray("cycleData", newSymptom, "symptoms")
                          setNewSymptom("")
                        }
                      }}
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        addToArray("cycleData", newSymptom, "symptoms")
                        setNewSymptom("")
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.cycleData.symptoms.map((symptom, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {symptom}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeFromArray("cycleData", index, "symptoms")}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emergency" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact d'Urgence</CardTitle>
                <CardDescription>Personne à contacter en cas d'urgence</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">Nom Complet *</Label>
                    <Input
                      id="emergencyName"
                      value={formData.emergencyContact.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          emergencyContact: { ...prev.emergencyContact, name: e.target.value },
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Téléphone *</Label>
                    <Input
                      id="emergencyPhone"
                      value={formData.emergencyContact.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          emergencyContact: { ...prev.emergencyContact, phone: e.target.value },
                        }))
                      }
                      placeholder="+261 34 12 345 67"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relation *</Label>
                  <Select
                    value={formData.emergencyContact.relationship}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        emergencyContact: { ...prev.emergencyContact, relationship: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner la relation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Époux">Époux</SelectItem>
                      <SelectItem value="Épouse">Épouse</SelectItem>
                      <SelectItem value="Mère">Mère</SelectItem>
                      <SelectItem value="Père">Père</SelectItem>
                      <SelectItem value="Sœur">Sœur</SelectItem>
                      <SelectItem value="Frère">Frère</SelectItem>
                      <SelectItem value="Ami(e)">Ami(e)</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? "Mettre à jour" : "Enregistrer"}
          </Button>
        </div>
      </form>
    </div>
  )
}
