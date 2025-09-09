"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, CalendarIcon, Clock, User, Phone, Plus } from "lucide-react"
import { mockAppointments, appointmentTypeLabels, appointmentStatusLabels } from "@/data/appointments-data"
import type { Appointment, AppointmentStatus, AppointmentType } from "@/types/appointments"
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addWeeks, subWeeks } from "date-fns"
import { fr } from "date-fns/locale"

interface AppointmentCalendarProps {
  onNewAppointment: () => void
  onEditAppointment: (appointment: Appointment) => void
}

export default function AppointmentCalendar({ onNewAppointment, onEditAppointment }: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("week")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case "scheduled":
        return "bg-chart-1 text-white"
      case "confirmed":
        return "bg-chart-3 text-white"
      case "in_progress":
        return "bg-chart-4 text-white"
      case "completed":
        return "bg-muted text-muted-foreground"
      case "cancelled":
        return "bg-destructive text-destructive-foreground"
      case "no_show":
        return "bg-chart-2 text-white"
      case "rescheduled":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getTypeColor = (type: AppointmentType) => {
    switch (type) {
      case "consultation_initiale":
        return "border-l-chart-1"
      case "suivi_regulier":
        return "border-l-chart-3"
      case "urgence":
        return "border-l-destructive"
      case "consultation_specialisee":
        return "border-l-chart-4"
      case "teleconsultation":
        return "border-l-primary"
      default:
        return "border-l-muted"
    }
  }

  const getAppointmentsForDate = (date: Date) => {
    return mockAppointments.filter((apt) => isSameDay(new Date(apt.date), date))
  }

  const getWeekDays = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 })
    const end = endOfWeek(currentDate, { weekStartsOn: 1 })
    return eachDayOfInterval({ start, end })
  }

  const navigateWeek = (direction: "prev" | "next") => {
    setCurrentDate(direction === "next" ? addWeeks(currentDate, 1) : subWeeks(currentDate, 1))
  }

  const renderWeekView = () => {
    const weekDays = getWeekDays()
    const timeSlots = Array.from({ length: 10 }, (_, i) => `${8 + i}:00`)

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-medium">
              {format(weekDays[0], "dd MMM", { locale: fr })} - {format(weekDays[6], "dd MMM yyyy", { locale: fr })}
            </h3>
            <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={onNewAppointment}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau RDV
          </Button>
        </div>

        <div className="grid grid-cols-8 gap-2">
          {/* Time column */}
          <div className="space-y-2">
            <div className="h-12 flex items-center justify-center text-sm font-medium">Heure</div>
            {timeSlots.map((time) => (
              <div key={time} className="h-16 flex items-center justify-center text-xs text-muted-foreground border-r">
                {time}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDays.map((day) => {
            const dayAppointments = getAppointmentsForDate(day)
            return (
              <div key={day.toISOString()} className="space-y-2">
                <div className="h-12 flex flex-col items-center justify-center border-b">
                  <div className="text-sm font-medium">{format(day, "EEE", { locale: fr })}</div>
                  <div className="text-lg">{format(day, "dd")}</div>
                </div>
                <div className="space-y-1 min-h-[640px] relative">
                  {dayAppointments.map((appointment) => {
                    const timeIndex = timeSlots.findIndex((slot) => slot === appointment.time)
                    const topPosition = timeIndex * 68 // 64px height + 4px gap
                    return (
                      <div
                        key={appointment.id}
                        className={`absolute left-0 right-0 p-2 rounded border-l-4 bg-card cursor-pointer hover:shadow-md transition-shadow ${getTypeColor(appointment.type)}`}
                        style={{ top: `${topPosition}px`, height: `${(appointment.duration / 30) * 32}px` }}
                        onClick={() => onEditAppointment(appointment)}
                      >
                        <div className="text-xs font-medium truncate">{appointment.patientName}</div>
                        <div className="text-xs text-muted-foreground truncate">{appointment.reason}</div>
                        <Badge className={`text-xs mt-1 ${getStatusColor(appointment.status)}`}>
                          {appointmentStatusLabels[appointment.status]}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderDayView = () => {
    const dayAppointments = getAppointmentsForDate(selectedDate || new Date())
    const timeSlots = Array.from({ length: 10 }, (_, i) => `${8 + i}:00`)

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">
            {selectedDate ? format(selectedDate, "EEEE dd MMMM yyyy", { locale: fr }) : "Sélectionner une date"}
          </h3>
          <Button onClick={onNewAppointment}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau RDV
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sélectionner une Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} locale={fr} />
            </CardContent>
          </Card>

          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Rendez-vous du jour ({dayAppointments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dayAppointments.length > 0 ? (
                  <div className="space-y-3">
                    {dayAppointments
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((appointment) => (
                        <div
                          key={appointment.id}
                          className={`p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow border-l-4 ${getTypeColor(appointment.type)}`}
                          onClick={() => onEditAppointment(appointment)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">{appointment.time}</span>
                                  <span className="text-sm text-muted-foreground">({appointment.duration}min)</span>
                                </div>
                                <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>
                                  {appointmentStatusLabels[appointment.status]}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{appointment.patientName}</span>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{appointment.patientPhone}</span>
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">Motif:</span> {appointment.reason}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                <span className="font-medium">Type:</span> {appointmentTypeLabels[appointment.type]}
                              </div>
                              {appointment.notes && (
                                <div className="text-sm text-muted-foreground mt-2">
                                  <span className="font-medium">Notes:</span> {appointment.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">Aucun rendez-vous</h3>
                    <p className="text-sm text-muted-foreground mb-4">Aucun rendez-vous programmé pour cette date.</p>
                    <Button onClick={onNewAppointment}>
                      <Plus className="h-4 w-4 mr-2" />
                      Planifier un RDV
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* View Mode Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select value={viewMode} onValueChange={(value: "month" | "week" | "day") => setViewMode(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Mode d'affichage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Vue Jour</SelectItem>
                  <SelectItem value="week">Vue Semaine</SelectItem>
                  <SelectItem value="month">Vue Mois</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                Aujourd'hui
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Calendrier des Rendez-vous
          </CardTitle>
          <CardDescription>Gestion et visualisation des rendez-vous patients</CardDescription>
        </CardHeader>
        <CardContent>{viewMode === "week" ? renderWeekView() : renderDayView()}</CardContent>
      </Card>
    </div>
  )
}
