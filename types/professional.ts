export interface ProfessionalProfile {
  id: string
  firstName: string
  lastName: string
  title: string
  specialization: string
  licenseNumber: string
  hospital: string
  address: string
  phone: string
  email: string
  certifications: Certification[]
  experience: number
  languages: string[]
  avatar?: string
  signature?: string
}

export interface Certification {
  id: string
  name: string
  issuingOrganization: string
  issueDate: string
  expiryDate?: string
  certificateNumber: string
  verified: boolean
}

export interface UserRole {
  id: string
  name: string
  permissions: Permission[]
  description: string
}

export interface Permission {
  id: string
  name: string
  category: "patients" | "reports" | "remedies" | "settings" | "analytics"
  actions: ("read" | "write" | "delete" | "admin")[]
}

export interface ProfessionalSettings {
  interface: {
    theme: "light" | "dark" | "system"
    language: "fr" | "mg" | "en"
    dateFormat: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD"
    timeFormat: "24h" | "12h"
    defaultView: "dashboard" | "patients" | "calendar"
  }
  notifications: {
    emailNotifications: boolean
    smsNotifications: boolean
    criticalAlerts: boolean
    appointmentReminders: boolean
    reportGeneration: boolean
    systemUpdates: boolean
  }
  privacy: {
    dataRetention: number // in months
    anonymizeReports: boolean
    shareStatistics: boolean
    allowResearch: boolean
  }
  backup: {
    autoBackup: boolean
    backupFrequency: "daily" | "weekly" | "monthly"
    cloudStorage: boolean
    localBackup: boolean
  }
}

export interface TeamMember {
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  status: "active" | "inactive" | "pending"
  joinDate: string
  lastLogin?: string
  avatar?: string
}
