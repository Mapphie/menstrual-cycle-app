"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentCalendar } from "@/components/appointment-calendar"
import { AppointmentForm } from "@/components/appointment-form"
import { FollowUpManagement } from "@/components/follow-up-management"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, Users, Clock } from "lucide-react"

export default function AppointmentsPage() {
  const [showNewAppointment, setShowNewAppointment] = useState(false)

  return (
    <div className="min-h-screen bg-medical-bg p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-medical-primary">Gestion des Rendez-vous</h1>
            <p className="text-medical-text-secondary mt-2">Planifiez et suivez les consultations de vos patientes</p>
          </div>
          <Button
            onClick={() => setShowNewAppointment(true)}
            className="bg-medical-primary hover:bg-medical-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Rendez-vous
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-medical-primary" />
                <div>
                  <p className="text-sm text-medical-text-secondary">Aujourd'hui</p>
                  <p className="text-2xl font-bold text-medical-primary">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-sm text-medical-text-secondary">En attente</p>
                  <p className="text-2xl font-bold text-amber-600">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-medical-text-secondary">Complétés</p>
                  <p className="text-2xl font-bold text-green-600">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-medical-accent" />
                <div>
                  <p className="text-sm text-medical-text-secondary">Cette semaine</p>
                  <p className="text-2xl font-bold text-medical-accent">24</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
            <TabsTrigger value="followup">Suivi</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <AppointmentCalendar />
          </TabsContent>

          <TabsContent value="followup" className="space-y-6">
            <FollowUpManagement />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Historique des Consultations</CardTitle>
                <CardDescription>Consultez l'historique complet des rendez-vous</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-medical-text-secondary">Fonctionnalité en développement</div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* New Appointment Modal */}
        {showNewAppointment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <AppointmentForm onClose={() => setShowNewAppointment(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
