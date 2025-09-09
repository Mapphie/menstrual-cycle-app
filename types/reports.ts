export interface MedicalReport {
  id: string
  patientId: string
  patientName: string
  reportType: "cycle_analysis" | "symptom_tracking" | "treatment_progress" | "comprehensive"
  dateGenerated: string
  period: {
    startDate: string
    endDate: string
  }
  data: {
    cycleData?: CycleAnalysisData
    symptomData?: SymptomAnalysisData
    treatmentData?: TreatmentProgressData
    comprehensiveData?: ComprehensiveReportData
  }
  summary: string
  recommendations: string[]
  status: "draft" | "completed" | "sent"
}

export interface CycleAnalysisData {
  averageCycleLength: number
  cycleRegularity: number
  totalCycles: number
  irregularCycles: number
  trends: {
    month: string
    cycleLength: number
    regularity: number
  }[]
}

export interface SymptomAnalysisData {
  mostCommonSymptoms: {
    symptom: string
    frequency: number
    severity: number
  }[]
  symptomTrends: {
    date: string
    symptoms: string[]
    severity: number
  }[]
  painLevels: {
    phase: string
    averagePain: number
  }[]
}

export interface TreatmentProgressData {
  treatments: {
    name: string
    startDate: string
    endDate?: string
    effectiveness: number
    sideEffects: string[]
  }[]
  progressMetrics: {
    metric: string
    baseline: number
    current: number
    improvement: number
  }[]
}

export interface ComprehensiveReportData {
  cycleData: CycleAnalysisData
  symptomData: SymptomAnalysisData
  treatmentData: TreatmentProgressData
  riskFactors: string[]
  healthScore: number
}

export interface StatisticsData {
  patientStatistics: {
    totalPatients: number
    activePatients: number
    newPatientsThisMonth: number
    averageAge: number
    ageDistribution: {
      ageRange: string
      count: number
    }[]
  }
  cycleStatistics: {
    averageCycleLength: number
    cycleRegularityRate: number
    commonIrregularities: {
      type: string
      percentage: number
    }[]
  }
  symptomStatistics: {
    mostCommonSymptoms: {
      symptom: string
      percentage: number
    }[]
    severityDistribution: {
      severity: string
      percentage: number
    }[]
  }
  treatmentStatistics: {
    mostPrescribedTreatments: {
      treatment: string
      count: number
      successRate: number
    }[]
    averageTreatmentDuration: number
  }
}
