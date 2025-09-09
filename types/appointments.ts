export interface Appointment {
  id: string
  patientId: string
  patientName: string
  patientPhone: string
  date: string
  time: string
  duration: number // in minutes
  type: AppointmentType
  status: AppointmentStatus
  reason: string
  notes?: string
  followUpRequired: boolean
  followUpDate?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export type AppointmentType =
  | "consultation_initiale"
  | "suivi_regulier"
  | "urgence"
  | "controle_post_traitement"
  | "consultation_specialisee"
  | "teleconsultation"

export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "no_show"
  | "rescheduled"

export interface FollowUp {
  id: string
  patientId: string
  patientName: string
  appointmentId: string
  type: FollowUpType
  dueDate: string
  status: FollowUpStatus
  priority: "low" | "medium" | "high"
  description: string
  completedDate?: string
  completedBy?: string
  notes?: string
}

export type FollowUpType =
  | "medication_check"
  | "symptom_monitoring"
  | "test_results"
  | "treatment_progress"
  | "lifestyle_changes"
  | "next_appointment"

export type FollowUpStatus = "pending" | "in_progress" | "completed" | "overdue" | "cancelled"

export interface AppointmentSlot {
  date: string
  time: string
  available: boolean
  duration: number
}

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  type: AppointmentType
  status: AppointmentStatus
  patientName: string
  backgroundColor?: string
  borderColor?: string
}
