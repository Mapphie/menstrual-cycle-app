import type { CycleData, HealthAnomaly, HealthInsight, HealthAlert } from "@/types/health-analysis"

export class HealthAnalyzer {
  static analyzeCycles(cycles: CycleData[]): {
    anomalies: HealthAnomaly[]
    insights: HealthInsight[]
    alerts: HealthAlert[]
  } {
    const anomalies: HealthAnomaly[] = []
    const insights: HealthInsight[] = []
    const alerts: HealthAlert[] = []

    if (cycles.length < 3) {
      return { anomalies, insights, alerts }
    }

    // Analyze cycle length irregularities
    const cycleLengths = cycles.map((c) => c.length).filter((l) => l > 0)
    const avgCycleLength = cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length
    const irregularCycles = cycleLengths.filter((l) => Math.abs(l - avgCycleLength) > 7)

    if (irregularCycles.length > cycleLengths.length * 0.3) {
      anomalies.push({
        id: `irregular-${Date.now()}`,
        type: "irregular_cycle",
        severity: irregularCycles.length > cycleLengths.length * 0.5 ? "high" : "medium",
        description: `Cycles irréguliers détectés. Variation moyenne: ${Math.round(Math.abs(irregularCycles.reduce((a, b) => a + b, 0) / irregularCycles.length - avgCycleLength))} jours`,
        recommendation: "Consultez un professionnel de santé pour évaluer les causes possibles.",
        detectedAt: new Date(),
        cycleIds: cycles.slice(-irregularCycles.length).map((c) => c.id),
      })

      alerts.push({
        id: `alert-irregular-${Date.now()}`,
        type: "warning",
        title: "Cycles irréguliers détectés",
        message: "Vos derniers cycles montrent des variations importantes. Surveillez vos symptômes.",
        timestamp: new Date(),
        acknowledged: false,
        relatedAnomaly: `irregular-${Date.now()}`,
      })
    }

    // Analyze pain patterns
    const recentCycles = cycles.slice(-6)
    const highPainCycles = recentCycles.filter((c) => c.painLevel >= 7)

    if (highPainCycles.length >= 3) {
      anomalies.push({
        id: `pain-${Date.now()}`,
        type: "excessive_pain",
        severity: "high",
        description: `Douleurs intenses récurrentes (niveau ${Math.round(highPainCycles.reduce((a, c) => a + c.painLevel, 0) / highPainCycles.length)}/10)`,
        recommendation: "Consultez un gynécologue. Explorez les remèdes traditionnels anti-inflammatoires.",
        detectedAt: new Date(),
        cycleIds: highPainCycles.map((c) => c.id),
      })

      alerts.push({
        id: `alert-pain-${Date.now()}`,
        type: "urgent",
        title: "Douleurs menstruelles sévères",
        message: "Vos douleurs sont inhabituellement intenses. Consultez un professionnel de santé.",
        timestamp: new Date(),
        acknowledged: false,
      })
    }

    // Generate insights
    if (cycleLengths.length > 0) {
      insights.push({
        id: `insight-cycle-${Date.now()}`,
        category: "cycle_pattern",
        title: "Analyse de votre cycle",
        description: `Votre cycle moyen est de ${Math.round(avgCycleLength)} jours. ${avgCycleLength >= 21 && avgCycleLength <= 35 ? "C'est dans la normale." : "Cela mérite une attention particulière."}`,
        actionable: !(avgCycleLength >= 21 && avgCycleLength <= 35),
        priority: avgCycleLength >= 21 && avgCycleLength <= 35 ? "low" : "medium",
      })
    }

    return { anomalies, insights, alerts }
  }

  static generateRecommendations(anomalies: HealthAnomaly[]): string[] {
    const recommendations: string[] = []

    anomalies.forEach((anomaly) => {
      switch (anomaly.type) {
        case "irregular_cycle":
          recommendations.push("Maintenez un journal détaillé de vos symptômes")
          recommendations.push("Réduisez le stress par la méditation ou le yoga")
          break
        case "excessive_pain":
          recommendations.push("Essayez les remèdes traditionnels anti-inflammatoires")
          recommendations.push("Appliquez de la chaleur sur le bas-ventre")
          recommendations.push("Consultez pour exclure l'endométriose")
          break
        case "heavy_flow":
          recommendations.push("Augmentez votre apport en fer")
          recommendations.push("Surveillez les signes d'anémie")
          break
      }
    })

    return [...new Set(recommendations)]
  }
}
