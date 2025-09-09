"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { mockFollowUps } from "@/data/appointments-data"
import type { FollowUp, FollowUpStatus } from "@/types/appointments"

export default function FollowUpManagement() {
  const [followUps, setFollowUps] = useState<FollowUp[]>(mockFollowUps)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredFollowUps = followUps.filter((followUp) => {
    const matchesStatus = filterStatus === "all" || followUp.status === filterStatus
    const matchesPriority = filterPriority === "all" || followUp.priority === filterPriority
    return matchesStatus && matchesPriority
  })

  const getStatusColor = (status: FollowUpStatus) => {
    switch (status) {
      case "pending":
        return "bg-chart-4 text-white"
      case "in_progress":
        return "bg-chart-1 text-white"
      case "completed":
        return "bg-chart-3 text-white"
      case "overdue":
        return "bg-destructive text-destructive-foreground"
      case "cancelled":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getPriorityColor = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "high":
        return "text-destructive"
      case "medium":
        return "text-chart-4"
      case "low":
        return "text-chart-3"
    }
  }

  const getPriorityIcon = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "medium":
        return <Clock className="h-4 w-4 text-chart-4" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-chart-3" />
    }
  }

  const handleCompleteFollowUp = (followUpId: string, notes: string) => {
    setFollowUps((prev) =>
      prev.map((fu) =>
        fu.id === followUpId
          ? {
              ...fu,
              status: "completed" as FollowUpStatus,
              completedDate: new Date().toISOString().split("T")[0],
              completedBy: "Dr. Andry",
              notes: notes,
            }
          : fu,
      ),
    )
    setIsDialogOpen(false)
    setSelectedFollowUp(null)
  }

  const handleUpdateFollowUp = (followUpId: string, updates: Partial<FollowUp>) => {
    setFollowUps((prev) => prev.map((fu) => (fu.id === followUpId ? { ...fu, ...updates } : fu)))
  }

  const overdueCount = followUps.filter((fu) => fu.status === "overdue").length
  const pendingCount = followUps.filter((fu) => fu.status === "pending").length
  const highPriorityCount = followUps.filter((fu) => fu.priority === "high" && fu.status !== "completed").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestion du Suivi</h1>
          <p className="text-sm text-muted-foreground">Suivi post-consultation et rappels patients</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En Retard</p>
                <p className="text-2xl font-bold text-destructive">{overdueCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En Attente</p>
                <p className="text-2xl font-bold text-chart-4">{pendingCount}</p>
              </div>
              <Clock className="h-8 w-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Priorité Haute</p>
                <p className="text-2xl font-bold text-destructive">{highPriorityCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">\
