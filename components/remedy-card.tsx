"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, MapPin } from "lucide-react"
import type { TraditionalRemedy } from "@/types/remedies"
import Image from "next/image"

interface RemedyCardProps {
  remedy: TraditionalRemedy
  onViewDetails: (remedy: TraditionalRemedy) => void
}

export function RemedyCard({ remedy, onViewDetails }: RemedyCardProps) {
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
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg">{remedy.name}</CardTitle>
            <p className="text-sm text-muted-foreground italic">{remedy.localName}</p>
          </div>
          <Badge className={getDifficultyColor(remedy.difficulty)} variant="secondary">
            {remedy.difficulty}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Image */}
        {remedy.imageUrl && (
          <div className="relative h-32 w-full rounded-lg overflow-hidden">
            <Image src={remedy.imageUrl || "/placeholder.svg"} alt={remedy.name} fill className="object-cover" />
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">{remedy.description}</p>

        {/* Symptoms */}
        <div className="flex flex-wrap gap-1">
          {remedy.symptoms.slice(0, 3).map((symptom) => (
            <Badge key={symptom} variant="outline" className="text-xs">
              {symptom}
            </Badge>
          ))}
          {remedy.symptoms.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{remedy.symptoms.length - 3}
            </Badge>
          )}
        </div>

        {/* Meta information */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{remedy.preparationTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{remedy.region}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{remedy.userRating}</span>
            <span className="text-xs text-muted-foreground">({remedy.reviewCount} avis)</span>
          </div>
          <Button size="sm" onClick={() => onViewDetails(remedy)}>
            Voir détails
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
