import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Heart, Droplets, Activity, AlertCircle, TrendingUp, Trophy, Shield, Settings } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  // Mock data for demonstration
  const currentDay = 15
  const cycleLength = 28
  const nextPeriod = 13
  const currentPhase = "Ovulation"

  const hasHealthAlerts = true // This would come from actual health analysis

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">CycleCare Madagascar</h1>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/emergency">
                <Button variant="outline" size="sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  SOS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Bonjour, Marie</h2>
          <p className="text-muted-foreground">Voici votre suivi de cycle aujourd'hui</p>
        </div>

        {/* Current Cycle Status */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Cycle Actuel
            </CardTitle>
            <CardDescription>Jour {currentDay} de votre cycle</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Phase actuelle</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {currentPhase}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression du cycle</span>
                <span>
                  {currentDay}/{cycleLength} jours
                </span>
              </div>
              <Progress value={(currentDay / cycleLength) * 100} className="h-2" />
            </div>
            <div className="bg-accent/10 p-3 rounded-lg">
              <p className="text-sm text-accent-foreground">
                <strong>Prochaines règles dans {nextPeriod} jours</strong>
              </p>
            </div>
            <Link href="/cycle">
              <Button className="w-full bg-transparent" variant="outline">
                Voir le suivi détaillé
              </Button>
            </Link>
          </CardContent>
        </Card>

        {hasHealthAlerts && (
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <div>
                    <h3 className="font-medium text-amber-900">Alertes de santé détectées</h3>
                    <p className="text-xs text-amber-700">Des anomalies ont été identifiées dans vos cycles récents</p>
                  </div>
                </div>
                <Link href="/health">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-300 text-amber-700 hover:bg-amber-100 bg-transparent"
                  >
                    Voir l'analyse
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link href="/cycle">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center space-y-2">
                <Heart className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-medium">Symptômes</h3>
                <p className="text-xs text-muted-foreground">Enregistrer vos symptômes</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/nutrition">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center space-y-2">
                <Activity className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-medium">Nutrition</h3>
                <p className="text-xs text-muted-foreground">Conseils alimentaires</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/remedies">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center space-y-2">
                <Droplets className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-medium">Remèdes</h3>
                <p className="text-xs text-muted-foreground">Médecine traditionnelle</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/health">
            <Card className="hover:shadow-md transition-shadow cursor-pointer relative">
              <CardContent className="p-4 text-center space-y-2">
                <TrendingUp className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-medium">Analyse Santé</h3>
                <p className="text-xs text-muted-foreground">Détection d'anomalies</p>
                {hasHealthAlerts && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
                )}
              </CardContent>
            </Card>
          </Link>

          <Link href="/wellness">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center space-y-2">
                <Trophy className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-medium">Défis</h3>
                <p className="text-xs text-muted-foreground">Bien-être & badges</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/emergency">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-red-200">
              <CardContent className="p-4 text-center space-y-2">
                <Shield className="h-8 w-8 text-red-600 mx-auto" />
                <h3 className="font-medium text-red-700">SOS</h3>
                <p className="text-xs text-muted-foreground">Services d'urgence</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Today's Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Recommandations du jour</CardTitle>
            <CardDescription>Conseils personnalisés pour votre phase actuelle</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Nutrition</p>
                <p className="text-xs text-muted-foreground">
                  Consommez des aliments riches en fer comme les épinards et les lentilles
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Activité physique</p>
                <p className="text-xs text-muted-foreground">
                  Privilégiez des exercices modérés comme la marche ou le yoga
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-chart-3/5 rounded-lg">
              <div className="w-2 h-2 bg-chart-3 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Bien-être</p>
                <p className="text-xs text-muted-foreground">
                  Prenez du temps pour vous détendre avec une tisane de camomille
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Section */}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-destructive">Besoin d'aide urgente ?</h3>
                <p className="text-xs text-muted-foreground">Accès rapide aux services d'urgence et de soutien</p>
              </div>
              <Link href="/emergency">
                <Button variant="destructive" size="sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  SOS
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
