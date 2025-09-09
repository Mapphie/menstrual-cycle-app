export interface CycleAnalysisData {
  patientId: string
  patientName: string
  cycleHistory: {
    date: string
    cycleLength: number
    painLevel: number
    flowIntensity: number
    symptoms: string[]
  }[]
  trends: {
    averageCycleLength: number
    cycleLengthTrend: "stable" | "increasing" | "decreasing"
    painTrend: "stable" | "increasing" | "decreasing"
    irregularityScore: number
  }
  predictions: {
    nextPeriodDate: string
    ovulationDate: string
    fertilityWindow: { start: string; end: string }
  }
  riskFactors: {
    factor: string
    severity: "low" | "medium" | "high"
    description: string
  }[]
  recommendations: {
    category: "lifestyle" | "medical" | "nutrition" | "monitoring"
    recommendation: string
    priority: "low" | "medium" | "high"
  }[]
}

export interface DiagnosticResult {
  patientId: string
  condition: string
  probability: number
  confidence: "low" | "medium" | "high"
  symptoms: string[]
  supportingEvidence: string[]
  recommendedActions: string[]
  urgency: "routine" | "urgent" | "emergency"
}

export interface ComparisonData {
  metric: string
  patientValue: number
  averageValue: number
  percentile: number
  status: "normal" | "concerning" | "critical"
}

export interface AnalysisReport {
  id: string
  patientId: string
  patientName: string
  generatedDate: string
  analysisType: "cycle_analysis" | "diagnostic_screening" | "comparative_analysis"
  findings: string[]
  recommendations: string[]
  followUpRequired: boolean
  nextReviewDate: string
}
