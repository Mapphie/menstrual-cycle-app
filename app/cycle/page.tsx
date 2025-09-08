import { CycleCalendar } from "@/components/cycle-calendar"
import { SymptomTracker } from "@/components/symptom-tracker"
import { CycleInsights } from "@/components/cycle-insights"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CyclePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-foreground">Suivi Détaillé du Cycle</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Calendar */}
        <CycleCalendar />

        {/* Two column layout for larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SymptomTracker />
          <CycleInsights />
        </div>
      </main>
    </div>
  )
}
