export interface EmergencyContact {
  id: string
  name: string
  phone: string
  type: "police" | "medical" | "support" | "family" | "friend"
  available24h: boolean
  location?: string
  description?: string
}

export interface EmergencyResource {
  id: string
  title: string
  description: string
  type: "hotline" | "shelter" | "legal" | "medical" | "counseling"
  contact: string
  website?: string
  address?: string
  available24h: boolean
  languages: string[]
}

export interface EmergencyAlert {
  id: string
  type: "medical" | "violence" | "harassment" | "general"
  severity: "low" | "medium" | "high" | "critical"
  message: string
  location?: {
    latitude: number
    longitude: number
    address?: string
  }
  timestamp: Date
  status: "active" | "resolved" | "cancelled"
  contacts: string[] // Contact IDs to notify
}
