"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Star, Clock, MapPin, AlertTriangle, Heart, Users } from "lucide-react"
import type { TraditionalRemedy } from "@/types/remedies"
import Image from "next/image"

interface RemedyDetailsModalProps {
  remedy: TraditionalRemedy | null
  isOpen: boolean
  onClose: () => void
}

export function RemedyDetailsModal({ remedy, isOpen, onClose }: RemedyDetailsModalProps) {
  if (!remedy) return null

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "facile":
        return "bg-green-100 text-green-800"
      case "moyen":
        return "bg-yellow-100 text-yellow-800"
      case "difficile":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{remedy.name}</h2>
              <p className="text-sm text-muted-foreground italic">{remedy.localName}</p>
            </div>
            <Badge className={getDifficultyColor(remedy.difficulty)} variant="secondary">
              {remedy.difficulty}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          {remedy.imageUrl && (
            <div className="relative h-48 w-full rounded-lg overflow-hidden">
              <Image src={remedy.imageUrl || "/placeholder.svg"} alt={remedy.name} fill className="object-cover" />
            </div>
          )}

          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{remedy.preparationTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{remedy.region}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{remedy.userRating}</span>
              <span className="text-muted-foreground">({remedy.reviewCount} avis)</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-sm text-muted-foreground">{remedy.description}</p>
          </div>

          {/* Symptoms */}
          <div>
            <h3 className="font-semibold mb-2">Symptômes traités</h3>
            <div className="flex flex-wrap gap-2">
              {remedy.symptoms.map((symptom) => (
                <Badge key={symptom} variant="outline">
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Ingredients */}
          <div>
            <h3 className="font-semibold mb-2">Ingrédients</h3>
            <ul className="space-y-1">
              {remedy.ingredients.map((ingredient, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Preparation */}
          <div>
            <h3 className="font-semibold mb-2">Préparation</h3>
            <ol className="space-y-2">
              {remedy.preparation.map((step, index) => (
                <li key={index} className="text-sm flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Usage */}
          <div>
            <h3 className="font-semibold mb-2">Utilisation</h3>
            <p className="text-sm bg-accent/10 p-3 rounded-lg">{remedy.usage}</p>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="font-semibold mb-2">Bienfaits</h3>
            <ul className="space-y-1">
              {remedy.benefits.map((benefit, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <Heart className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Warnings */}
          {remedy.warnings && remedy.warnings.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-amber-800">
                <AlertTriangle className="h-4 w-4" />
                Précautions
              </h3>
              <ul className="space-y-1">
                {remedy.warnings.map((warning, index) => (
                  <li key={index} className="text-sm text-amber-700">
                    • {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 pt-4">
            <Button className="flex-1">
              <Heart className="h-4 w-4 mr-2" />
              Ajouter aux favoris
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Users className="h-4 w-4 mr-2" />
              Voir les avis
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
