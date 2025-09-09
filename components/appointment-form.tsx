"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, Clock, User, Save, ArrowLeft } from "lucide-react"
import { mockPatients } from "@/data/medical-data"
import { mockAvailableSlots, appointmentTypeLabels } from "@/data/appointments-data"
import type { Appointment, AppointmentType } from "@/types/appointments"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface AppointmentFormProps {
  appointment?: Appointment
  onSave: (appointment: Partial<Appointment>) => void
  onCancel: () => void
  isEditing?: boolean
}

export default function AppointmentForm({ appointment, onSave, onCancel, isEditing = false }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    patientId: appointment?.patientId || "",
    date: appointment?.date || "",
    time: appointment?.time || "",
    duration: appointment?.duration || 30,
    type: appointment?.type || ("consultation_initiale" as AppointmentType),
    reason: appointment?.reason || "",
    notes: appointment?.notes || "",
    followUpRequired: appointment?.followUpRequired || false,
    followUpDate: appointment?.followUpDate || "",
  })

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    appointment?.date ? new Date(appointment.date) : undefined,
  )
  const [followUpDate, setFollowUpDate] = useState<Date | undefined>(
    appointment?.followUpDate ? new Date(appointment.followUpDate) : undefined,
  )

  const selectedPatient = mockPatients.find((p) => p.id === formData.patientId)
  const availableSlots = mockAvailableSlots.filter(
    (slot) => slot.date === format(selectedDate || new Date(), "yyyy-MM-dd") && slot.available,
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const appointmentData = {
      ...formData,
      patientName: selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastName}` : "",
      patientPhone: selectedPatient?.phone || "",
      date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      followUpDate: followUpDate ? format(followUpDate, "yyyy-MM-dd") : undefined,
      status: appointment?.status || ("scheduled" as const),
      createdBy: "Dr. Andry",
      createdAt: appointment?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    onSave(appointmentData)
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
              {isEditing ? "Modifier le Rendez-vous" : "Nouveau Rendez-vous"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isEditing ? "Mettre à jour les informations du rendez-vous" : "Planifier un nouveau rendez-vous"}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4" />
                Sélection Patiente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patiente *</Label>
                <Select
                  value={formData.patientId}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, patientId: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une patiente" />
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

              {selectedPatient && (
                <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Nom:</span> {selectedPatient.firstName} {selectedPatient.lastName}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Téléphone:</span> {selectedPatient.phone}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Dernière visite:</span>{" "}
                    {new Date(selectedPatient.lastVisit).toLocaleDateString("fr-FR")}
                  </div>
                  {selectedPatient.alerts.length > 0 && (
                    <div className="text-sm text-destructive">
                      <span className="font-medium">Alertes:</span> {selectedPatient.alerts.length} active(s)
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Date and Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CalendarIcon className="h-4 w-4" />
                Date et Heure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Date du rendez-vous *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "dd MMMM yyyy", { locale: fr }) : "Sélectionner une date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      locale={fr}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Heure *</Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une heure" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSlots.map((slot) => (
                      <SelectItem key={`${slot.date}-${slot.time}`} value={slot.time}>
                        {slot.time} ({slot.duration}min disponible)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Durée (minutes) *</Label>
                <Select
                  value={formData.duration.toString()}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, duration: Number.parseInt(value) }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Durée" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Appointment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-4 w-4" />
                Détails du RDV
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type de consultation *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: AppointmentType) => setFormData((prev) => ({ ...prev, type: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Type de consultation" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(appointmentTypeLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Motif de consultation *</Label>
                <Input
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData((prev) => ({ ...prev, reason: e.target.value }))}
                  placeholder="Ex: Suivi dysménorrhée, Bilan initial..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optionnel)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Notes additionnelles pour le rendez-vous..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Follow-up Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Suivi</CardTitle>
            <CardDescription>Configuration du suivi post-consultation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="followUpRequired"
                checked={formData.followUpRequired}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, followUpRequired: checked as boolean }))
                }
              />
              <Label htmlFor="followUpRequired">Suivi requis après cette consultation</Label>
            </div>

            {formData.followUpRequired && (
              <div className="space-y-2">
                <Label>Date de suivi suggérée</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {followUpDate
                        ? format(followUpDate, "dd MMMM yyyy", { locale: fr })
                        : "Sélectionner une date de suivi"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={followUpDate}
                      onSelect={setFollowUpDate}
                      locale={fr}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3 pt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? "Mettre à jour" : "Planifier"}
          </Button>
        </div>
      </form>
    </div>
  )
}
