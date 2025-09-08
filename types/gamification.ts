export interface Challenge {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "monthly"
  category: "nutrition" | "exercise" | "wellness" | "tracking" | "community"
  difficulty: "easy" | "medium" | "hard"
  points: number
  duration: number // in days
  requirements: string[]
  cyclePhase?: "menstrual" | "follicular" | "ovulation" | "luteal"
  startDate: Date
  endDate: Date
  participants: number
  completed: boolean
  progress: number // 0-100
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: "tracking" | "wellness" | "community" | "knowledge" | "consistency"
  rarity: "common" | "rare" | "epic" | "legendary"
  requirements: string[]
  unlockedAt?: Date
  progress: number // 0-100
}

export interface UserProgress {
  id: string
  totalPoints: number
  level: number
  streak: number // consecutive days of activity
  badges: Badge[]
  completedChallenges: string[]
  currentChallenges: string[]
  monthlyGoals: {
    trackingDays: number
    wellnessActivities: number
    communityContributions: number
  }
}

export interface ProductReview {
  id: string
  productId: string
  productName: string
  productType: "remedy" | "supplement" | "hygiene" | "pain_relief" | "other"
  userId: string
  userName: string
  rating: number // 1-5
  review: string
  pros: string[]
  cons: string[]
  wouldRecommend: boolean
  cyclePhaseUsed?: string[]
  effectivenessRating: number // 1-5
  createdAt: Date
  helpful: number // number of users who found it helpful
  verified: boolean
}

export interface CommunityPost {
  id: string
  userId: string
  userName: string
  title: string
  content: string
  type: "question" | "tip" | "experience" | "remedy_share"
  tags: string[]
  likes: number
  replies: number
  createdAt: Date
  anonymous: boolean
}
