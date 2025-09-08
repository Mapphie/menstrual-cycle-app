"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Droplets, Zap, Brain, Utensils } from "lucide-react"

interface Symptom {
  id: string
  name: string
  icon: React.ReactNode
  category: "physical" | "emotional" | "other"
}

const symptoms: Symptom[] = [
  { id: "cramps", name: "Crampes", icon: <Zap className="h-4 w-4" />, category: "physical" },
  { id: "headache", name: "Maux de tête", icon: <Brain className="h-4 w-4" />, category: "physical" },
  { id: "bloating", name: "Ballonnements", icon: <Utensils className="h-4 w-4" />, category: "physical" },
  { id: "fatigue", name: "Fatigue", icon: <Heart className="h-4 w-4" />, category: "physical" },
  { id: "mood-swings", name: "Sautes d'humeur", icon: <Brain className="h-4 w-4" />, category: "emotional" },
  { id: "irritability", name: "Irritabilité", icon: <Brain className="h-4 w-4" />, category: "emotional" },
  { id: "tender-breasts", name: "Seins sensibles", icon: <Heart className="h-4 w-4" />, category: "physical" },
  { id: "acne", name: "Acné", icon: <Droplets className="h-4 w-4" />, category: "physical" },
]

export function SymptomTracker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [notes, setNotes] = useState("")
  const [flowIntensity, setFlowIntensity] = useState<"light" | "medium" | "heavy" | null>(null)

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId) ? prev.filter((id) => id !== symptomId) : [...prev, symptomId],
    )
  }

  const handleSave = () => {
    // Here you would save the data to your backend/local storage
    console.log({
      symptoms: selectedSymptoms,
      notes,
      flowIntensity,
      date: new Date().toISOString(),
    })

    // Reset form
    setSelectedSymptoms([])
    setNotes("")
    setFlowIntensity(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Suivi des Symptômes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Flow Intensity */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Intensité du flux</h3>
          <div className="flex gap-2">
            {[
              { value: "light", label: "Léger", color: "bg-green-100 text-green-800" },
              { value: "medium", label: "Moyen", color: "bg-yellow-100 text-yellow-800" },
              { value: "heavy", label: "Abondant", color: "bg-red-100 text-red-800" },
            ].map(({ value, label, color }) => (
              <Button
                key={value}
                variant={flowIntensity === value ? "default" : "outline"}
                size="sm"
                onClick={() => setFlowIntensity(value as any)}
                className={flowIntensity === value ? "" : color}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Symptoms */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Symptômes ressentis</h3>
          <div className="grid grid-cols-2 gap-2">
            {symptoms.map((symptom) => (
              <Button
                key={symptom.id}
                variant={selectedSymptoms.includes(symptom.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSymptom(symptom.id)}
                className="justify-start h-auto p-3"
              >
                <div className="flex items-center gap-2">
                  {symptom.icon}
                  <span className="text-xs">{symptom.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Notes personnelles</h3>
          <Textarea
            placeholder="Comment vous sentez-vous aujourd'hui ? Notez tout ce qui vous semble important..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full">
          Enregistrer les données du jour
        </Button>

        {/* Today's Summary */}
        {(selectedSymptoms.length > 0 || flowIntensity || notes) && (
          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
            <h4 className="text-sm font-medium">Résumé d'aujourd'hui</h4>
            {flowIntensity && (
              <p className="text-xs text-muted-foreground">
                Flux:{" "}
                <Badge variant="secondary">
                  {flowIntensity === "light" ? "Léger" : flowIntensity === "medium" ? "Moyen" : "Abondant"}
                </Badge>
              </p>
            )}
            {selectedSymptoms.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedSymptoms.map((symptomId) => {
                  const symptom = symptoms.find((s) => s.id === symptomId)
                  return symptom ? (
                    <Badge key={symptomId} variant="outline" className="text-xs">
                      {symptom.name}
                    </Badge>
                  ) : null
                })}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
