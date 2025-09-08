export interface CycleData {
  id: string
  startDate: Date
  endDate?: Date
  length: number
  flowIntensity: "light" | "normal" | "heavy"
  painLevel: number // 1-10 scale
  symptoms: string[]
}

export interface HealthAnomaly {
  id: string
  type: "irregular_cycle" | "excessive_pain" | "heavy_flow" | "missed_period" | "short_cycle" | "long_cycle"
  severity: "low" | "medium" | "high"
  description: string
  recommendation: string
  detectedAt: Date
  cycleIds: string[]
}

export interface HealthInsight {
  id: string
  category: "cycle_pattern" | "pain_trend" | "symptom_correlation" | "flow_analysis"
  title: string
  description: string
  actionable: boolean
  priority: "low" | "medium" | "high"
}

export interface HealthAlert {
  id: string
  type: "warning" | "urgent" | "info"
  title: string
  message: string
  timestamp: Date
  acknowledged: boolean
  relatedAnomaly?: string
}
