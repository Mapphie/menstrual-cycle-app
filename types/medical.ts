export interface Patient {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  phone: string
  email?: string
  address: string
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  medicalHistory: {
    allergies: string[]
    medications: string[]
    conditions: string[]
    surgeries: { date: string; procedure: string }[]
  }
  cycleData: {
    averageCycleLength: number
    lastPeriodDate: string
    irregularityScore: number
    painLevel: number
    symptoms: string[]
  }
  alerts: MedicalAlert[]
  lastVisit: string
  nextAppointment?: string
  status: "active" | "inactive" | "critical"
}

export interface MedicalAlert {
  id: string
  patientId: string
  type: "critical" | "warning" | "info"
  category: "cycle_irregularity" | "severe_pain" | "missed_appointment" | "medication" | "emergency"
  title: string
  description: string
  date: string
  resolved: boolean
  priority: "high" | "medium" | "low"
}

export interface CycleAnalysis {
  patientId: string
  cycleLength: number[]
  painLevels: number[]
  symptoms: { [key: string]: number }
  irregularityTrend: "improving" | "stable" | "worsening"
  recommendations: string[]
  riskFactors: string[]
}

export interface MedicalStats {
  totalPatients: number
  activePatients: number
  criticalAlerts: number
  appointmentsToday: number
  averageCycleLength: number
  commonSymptoms: { symptom: string; percentage: number }[]
  irregularityRate: number
}
