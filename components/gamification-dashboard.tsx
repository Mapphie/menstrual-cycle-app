"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Target, Users, Award, Flame, Calendar, TrendingUp } from "lucide-react"
import { monthlyWellnessChallenges, availableBadges } from "@/data/challenges-badges"

export default function GamificationDashboard() {
  const [activeTab, setActiveTab] = useState("challenges")

  // Mock user progress data
  const userProgress = {
    totalPoints: 2450,
    level: 8,
    streak: 12,
    nextLevelPoints: 3000,
    monthlyGoals: {
      trackingDays: 18,
      wellnessActivities: 12,
      communityContributions: 5,
    },
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-700"
      case "rare":
        return "bg-blue-100 text-blue-700"
      case "epic":
        return "bg-purple-100 text-purple-700"
      case "legendary":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "hard":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      {/* User Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{userProgress.totalPoints}</div>
            <div className="text-sm text-muted-foreground">Points totaux</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">Niveau {userProgress.level}</div>
            <div className="text-sm text-muted-foreground">
              {userProgress.nextLevelPoints - userProgress.totalPoints} pts pour niveau suivant
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{userProgress.streak}</div>
            <div className="text-sm text-muted-foreground">Jours consécutifs</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{availableBadges.filter((b) => b.unlockedAt).length}</div>
            <div className="text-sm text-muted-foreground">Badges débloqués</div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progression Niveau {userProgress.level}</span>
            <span className="text-sm text-muted-foreground">
              {userProgress.totalPoints}/{userProgress.nextLevelPoints}
            </span>
          </div>
          <Progress value={(userProgress.totalPoints / userProgress.nextLevelPoints) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="challenges">Défis</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="community">Communauté</TabsTrigger>
        </TabsList>

        <TabsContent value="challenges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Défis Bien-être du Mois
              </CardTitle>
              <CardDescription>
                Participez aux défis communautaires pour gagner des points et débloquer des badges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyWellnessChallenges.map((challenge) => (
                  <div key={challenge.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{challenge.title}</h4>
                          <Badge className={getDifficultyColor(challenge.difficulty)}>
                            {challenge.difficulty === "easy"
                              ? "Facile"
                              : challenge.difficulty === "medium"
                                ? "Moyen"
                                : "Difficile"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{challenge.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Trophy className="h-4 w-4" />
                            {challenge.points} pts
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {challenge.participants} participants
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {challenge.duration} jours
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progression</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                    </div>

                    <div className="mt-3">
                      <Button
                        size="sm"
                        variant={challenge.progress > 0 ? "outline" : "default"}
                        className="w-full sm:w-auto"
                      >
                        {challenge.progress > 0 ? "Continuer" : "Rejoindre le défi"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                Collection de Badges
              </CardTitle>
              <CardDescription>
                Débloquez des badges en atteignant des objectifs et en adoptant des habitudes saines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`border rounded-lg p-4 ${badge.unlockedAt ? "bg-white" : "bg-gray-50 opacity-75"}`}
                  >
                    <div className="text-center mb-3">
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <h4 className="font-medium">{badge.name}</h4>
                      <Badge className={getRarityColor(badge.rarity)} variant="secondary">
                        {badge.rarity === "common"
                          ? "Commun"
                          : badge.rarity === "rare"
                            ? "Rare"
                            : badge.rarity === "epic"
                              ? "Épique"
                              : "Légendaire"}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground text-center mb-3">{badge.description}</p>

                    {!badge.unlockedAt && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progression</span>
                          <span>{badge.progress}%</span>
                        </div>
                        <Progress value={badge.progress} className="h-2" />
                      </div>
                    )}

                    {badge.unlockedAt && (
                      <div className="text-center">
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Débloqué le {badge.unlockedAt.toLocaleDateString()}
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Objectifs Mensuels
              </CardTitle>
              <CardDescription>Vos contributions à la communauté et objectifs personnels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {userProgress.monthlyGoals.trackingDays}/30
                  </div>
                  <div className="text-sm text-muted-foreground">Jours de suivi</div>
                  <Progress value={(userProgress.monthlyGoals.trackingDays / 30) * 100} className="h-2 mt-2" />
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {userProgress.monthlyGoals.wellnessActivities}/20
                  </div>
                  <div className="text-sm text-muted-foreground">Activités bien-être</div>
                  <Progress value={(userProgress.monthlyGoals.wellnessActivities / 20) * 100} className="h-2 mt-2" />
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {userProgress.monthlyGoals.communityContributions}/10
                  </div>
                  <div className="text-sm text-muted-foreground">Contributions communauté</div>
                  <Progress
                    value={(userProgress.monthlyGoals.communityContributions / 10) * 100}
                    className="h-2 mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leaderboard Communautaire</CardTitle>
              <CardDescription>Top contributeurs de ce mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "Miora R.", points: 3250, badge: "🥇" },
                  { rank: 2, name: "Hanta T.", points: 2890, badge: "🥈" },
                  { rank: 3, name: "Vous", points: 2450, badge: "🥉" },
                  { rank: 4, name: "Noro M.", points: 2100, badge: "" },
                  { rank: 5, name: "Fara L.", points: 1950, badge: "" },
                ].map((user) => (
                  <div key={user.rank} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{user.badge || `#${user.rank}`}</span>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="font-medium">{user.points} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
