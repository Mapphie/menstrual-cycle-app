export interface TraditionalRemedy {
  id: string
  name: string
  localName: string
  description: string
  ingredients: string[]
  preparation: string[]
  usage: string
  benefits: string[]
  symptoms: string[]
  difficulty: "facile" | "moyen" | "difficile"
  preparationTime: string
  region: string
  warnings?: string[]
  userRating: number
  reviewCount: number
  imageUrl?: string
}

export interface RemedyReview {
  id: string
  remedyId: string
  userName: string
  rating: number
  comment: string
  date: string
  helpful: number
}
