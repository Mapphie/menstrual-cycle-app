import HealthDashboard from "@/components/health-dashboard"

export default function HealthPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analyse de Santé</h1>
        <p className="text-gray-600">
          Détection précoce d'anomalies et recommandations personnalisées pour votre bien-être menstruel
        </p>
      </div>

      <HealthDashboard />
    </div>
  )
}
