import type { CycleAnalysisData, DiagnosticResult, ComparisonData } from "@/types/analysis"

export const mockCycleAnalysis: CycleAnalysisData[] = [
  {
    patientId: "1",
    patientName: "Hery Rakoto",
    cycleHistory: [
      {
        date: "2024-01-15",
        cycleLength: 32,
        painLevel: 8,
        flowIntensity: 7,
        symptoms: ["Crampes sévères", "Maux de tête", "Fatigue"],
      },
      {
        date: "2023-12-14",
        cycleLength: 30,
        painLevel: 9,
        flowIntensity: 8,
        symptoms: ["Crampes sévères", "Nausées", "Irritabilité"],
      },
      {
        date: "2023-11-16",
        cycleLength: 34,
        painLevel: 7,
        flowIntensity: 6,
        symptoms: ["Crampes modérées", "Fatigue"],
      },
    ],
    trends: {
      averageCycleLength: 32,
      cycleLengthTrend: "stable",
      painTrend: "increasing",
      irregularityScore: 7,
    },
    predictions: {
      nextPeriodDate: "2024-02-16",
      ovulationDate: "2024-02-02",
      fertilityWindow: { start: "2024-01-30", end: "2024-02-05" },
    },
    riskFactors: [
      {
        factor: "Dysménorrhée sévère",
        severity: "high",
        description: "Douleurs menstruelles persistantes niveau 8-9/10",
      },
      {
        factor: "Cycles irréguliers",
        severity: "medium",
        description: "Variation de 4 jours entre les cycles",
      },
    ],
    recommendations: [
      {
        category: "medical",
        recommendation: "Consultation spécialisée pour dysménorrhée",
        priority: "high",
      },
      {
        category: "lifestyle",
        recommendation: "Techniques de gestion de la douleur (yoga, méditation)",
        priority: "medium",
      },
    ],
  },
]

export const mockDiagnosticResults: DiagnosticResult[] = [
  {
    patientId: "1",
    condition: "Dysménorrhée primaire sévère",
    probability: 85,
    confidence: "high",
    symptoms: ["Crampes sévères", "Douleur pelvienne", "Nausées"],
    supportingEvidence: [
      "Niveau de douleur constant 8-9/10",
      "Symptômes récurrents depuis 6 mois",
      "Absence de pathologie organique détectée",
    ],
    recommendedActions: [
      "Prescription d'anti-inflammatoires",
      "Évaluation échographique",
      "Suivi mensuel de la douleur",
    ],
    urgency: "urgent",
  },
  {
    patientId: "3",
    condition: "Syndrome des ovaires polykystiques (SOPK)",
    probability: 78,
    confidence: "medium",
    symptoms: ["Cycles irréguliers", "Acné", "Prise de poids"],
    supportingEvidence: ["Cycles variant de 35 à 60 jours", "Hyperandrogénie clinique", "Antécédents familiaux"],
    recommendedActions: ["Bilan hormonal complet", "Échographie pelvienne", "Consultation endocrinologique"],
    urgency: "routine",
  },
]

export const mockComparisonData: ComparisonData[] = [
  {
    metric: "Durée moyenne du cycle",
    patientValue: 32,
    averageValue: 28,
    percentile: 75,
    status: "normal",
  },
  {
    metric: "Niveau de douleur",
    patientValue: 8,
    averageValue: 4,
    percentile: 95,
    status: "critical",
  },
  {
    metric: "Score d'irrégularité",
    patientValue: 7,
    averageValue: 3,
    percentile: 85,
    status: "concerning",
  },
]
