import PatientManagement from "@/components/patient-management"

export default function PatientsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Gestion des Patientes</h1>
              <p className="text-sm text-muted-foreground">Interface Gynécologue - CycleCare Madagascar</p>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-6">
        <PatientManagement />
      </main>
    </div>
  )
}
