import EmergencyPanel from "@/components/emergency-panel"

export default function EmergencyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Services d'Urgence</h1>
        <p className="text-gray-600">Accès rapide aux services d'urgence, de soutien et de protection à Madagascar</p>
      </div>

      <EmergencyPanel />
    </div>
  )
}
