import type { MedicalReport, StatisticsData } from "@/types/reports"

export const mockReports: MedicalReport[] = [
  {
    id: "report-1",
    patientId: "patient-1",
    patientName: "Hery Rasoamanarivo",
    reportType: "comprehensive",
    dateGenerated: "2024-02-15",
    period: {
      startDate: "2024-01-01",
      endDate: "2024-02-15",
    },
    data: {
      comprehensiveData: {
        cycleData: {
          averageCycleLength: 28,
          cycleRegularity: 85,
          totalCycles: 6,
          irregularCycles: 1,
          trends: [
            { month: "Jan", cycleLength: 29, regularity: 90 },
            { month: "Feb", cycleLength: 27, regularity: 80 },
          ],
        },
        symptomData: {
          mostCommonSymptoms: [
            { symptom: "Crampes", frequency: 80, severity: 6 },
            { symptom: "Fatigue", frequency: 60, severity: 4 },
            { symptom: "Maux de tête", frequency: 40, severity: 5 },
          ],
          symptomTrends: [],
          painLevels: [
            { phase: "Menstruelle", averagePain: 6 },
            { phase: "Folliculaire", averagePain: 2 },
            { phase: "Ovulatoire", averagePain: 3 },
            { phase: "Lutéale", averagePain: 4 },
          ],
        },
        treatmentData: {
          treatments: [
            {
              name: "Tisane de gingembre",
              startDate: "2024-01-15",
              effectiveness: 75,
              sideEffects: [],
            },
          ],
          progressMetrics: [
            { metric: "Niveau de douleur", baseline: 8, current: 6, improvement: 25 },
            { metric: "Régularité du cycle", baseline: 70, current: 85, improvement: 21 },
          ],
        },
        riskFactors: ["Stress élevé", "Alimentation déséquilibrée"],
        healthScore: 75,
      },
    },
    summary: "Amélioration notable de la régularité du cycle et réduction des douleurs menstruelles.",
    recommendations: [
      "Continuer la tisane de gingembre",
      "Améliorer la gestion du stress",
      "Équilibrer l'alimentation avec plus de fer",
    ],
    status: "completed",
  },
  {
    id: "report-2",
    patientId: "patient-2",
    patientName: "Miora Rakotomalala",
    reportType: "cycle_analysis",
    dateGenerated: "2024-02-14",
    period: {
      startDate: "2024-01-01",
      endDate: "2024-02-14",
    },
    data: {
      cycleData: {
        averageCycleLength: 32,
        cycleRegularity: 60,
        totalCycles: 5,
        irregularCycles: 2,
        trends: [
          { month: "Jan", cycleLength: 35, regularity: 50 },
          { month: "Feb", cycleLength: 29, regularity: 70 },
        ],
      },
    },
    summary: "Cycles irréguliers nécessitant un suivi approfondi.",
    recommendations: ["Consultation endocrinologique", "Bilan hormonal complet", "Suivi nutritionnel"],
    status: "completed",
  },
]

export const mockStatistics: StatisticsData = {
  patientStatistics: {
    totalPatients: 156,
    activePatients: 134,
    newPatientsThisMonth: 12,
    averageAge: 28.5,
    ageDistribution: [
      { ageRange: "15-20", count: 23 },
      { ageRange: "21-25", count: 45 },
      { ageRange: "26-30", count: 52 },
      { ageRange: "31-35", count: 28 },
      { ageRange: "36-40", count: 8 },
    ],
  },
  cycleStatistics: {
    averageCycleLength: 29.2,
    cycleRegularityRate: 78,
    commonIrregularities: [
      { type: "Cycles longs (>35j)", percentage: 15 },
      { type: "Cycles courts (<21j)", percentage: 8 },
      { type: "Irrégularité sévère", percentage: 12 },
    ],
  },
  symptomStatistics: {
    mostCommonSymptoms: [
      { symptom: "Crampes menstruelles", percentage: 85 },
      { symptom: "Fatigue", percentage: 72 },
      { symptom: "Maux de tête", percentage: 58 },
      { symptom: "Ballonnements", percentage: 45 },
      { symptom: "Irritabilité", percentage: 38 },
    ],
    severityDistribution: [
      { severity: "Légère (1-3)", percentage: 35 },
      { severity: "Modérée (4-6)", percentage: 45 },
      { severity: "Sévère (7-10)", percentage: 20 },
    ],
  },
  treatmentStatistics: {
    mostPrescribedTreatments: [
      { treatment: "Tisane de gingembre", count: 89, successRate: 78 },
      { treatment: "Suppléments de fer", count: 67, successRate: 82 },
      { treatment: "Écorce de tamarinier", count: 45, successRate: 71 },
      { treatment: "Feuilles de moringa", count: 34, successRate: 69 },
    ],
    averageTreatmentDuration: 45,
  },
}
