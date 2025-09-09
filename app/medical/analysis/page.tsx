import DiagnosticTools from "@/components/diagnostic-tools"

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Analyse et Diagnostic</h1>
              <p className="text-sm text-muted-foreground">Interface Gynécologue - CycleCare Madagascar</p>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-6">
        <DiagnosticTools />
      </main>
    </div>
  )
}
