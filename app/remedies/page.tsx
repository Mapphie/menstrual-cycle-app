"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Filter, Leaf } from "lucide-react"
import Link from "next/link"
import { RemedyCard } from "@/components/remedy-card"
import { RemedyDetailsModal } from "@/components/remedy-details-modal"
import { traditionalRemedies } from "@/data/traditional-remedies"
import type { TraditionalRemedy } from "@/types/remedies"

export default function RemediesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null)
  const [selectedRemedy, setSelectedRemedy] = useState<TraditionalRemedy | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Get unique symptoms for filtering
  const allSymptoms = Array.from(new Set(traditionalRemedies.flatMap((remedy) => remedy.symptoms)))

  // Filter remedies based on search and symptom
  const filteredRemedies = traditionalRemedies.filter((remedy) => {
    const matchesSearch =
      remedy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      remedy.localName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      remedy.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSymptom = !selectedSymptom || remedy.symptoms.includes(selectedSymptom)

    return matchesSearch && matchesSymptom
  })

  const handleViewDetails = (remedy: TraditionalRemedy) => {
    setSelectedRemedy(remedy)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedRemedy(null)
  }

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
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">Remèdes Traditionnels</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Introduction */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Médecine Traditionnelle Malgache</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Découvrez les remèdes ancestraux de Madagascar pour soulager naturellement les troubles menstruels. Ces
              pratiques transmises de génération en génération utilisent les plantes locales et les savoir-faire
              traditionnels.
            </p>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un remède..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Symptom filters */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filtrer par symptôme:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedSymptom === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSymptom(null)}
                >
                  Tous
                </Button>
                {allSymptoms.map((symptom) => (
                  <Button
                    key={symptom}
                    variant={selectedSymptom === symptom ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSymptom(symptom)}
                  >
                    {symptom}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredRemedies.length} remède{filteredRemedies.length > 1 ? "s" : ""} trouvé
            {filteredRemedies.length > 1 ? "s" : ""}
          </p>
          {selectedSymptom && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Filtré par: {selectedSymptom}
              <button
                onClick={() => setSelectedSymptom(null)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
        </div>

        {/* Remedies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRemedies.map((remedy) => (
            <RemedyCard key={remedy.id} remedy={remedy} onViewDetails={handleViewDetails} />
          ))}
        </div>

        {/* No results */}
        {filteredRemedies.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Leaf className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">Aucun remède trouvé</h3>
              <p className="text-sm text-muted-foreground">
                Essayez de modifier vos critères de recherche ou de filtrage.
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Remedy Details Modal */}
      <RemedyDetailsModal remedy={selectedRemedy} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
