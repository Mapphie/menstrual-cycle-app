import GamificationDashboard from "@/components/gamification-dashboard"

export default function WellnessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Défis Bien-être</h1>
        <p className="text-gray-600">
          Participez aux défis communautaires, gagnez des badges et partagez votre expérience
        </p>
      </div>

      <GamificationDashboard />
    </div>
  )
}
