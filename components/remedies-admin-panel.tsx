"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Upload,
  Save,
  X,
} from "lucide-react"
import { traditionalRemedies } from "@/data/traditional-remedies"
import type { TraditionalRemedy } from "@/types/remedies"

interface RemedyFormData {
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
  imageUrl?: string
}

export default function RemediesAdminPanel() {
  const [activeTab, setActiveTab] = useState("manage")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRemedy, setSelectedRemedy] = useState<TraditionalRemedy | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [formData, setFormData] = useState<RemedyFormData>({
    name: "",
    localName: "",
    description: "",
    ingredients: [""],
    preparation: [""],
    usage: "",
    benefits: [""],
    symptoms: [],
    difficulty: "facile",
    preparationTime: "",
    region: "",
    warnings: [],
    imageUrl: "",
  })

  const filteredRemedies = traditionalRemedies.filter(
    (remedy) =>
      remedy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      remedy.localName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      remedy.symptoms.some((symptom) => symptom.toLowerCase().includes(searchTerm.toLowerCase())),
  )

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

  const handleInputChange = (field: keyof RemedyFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayInputChange = (field: keyof RemedyFormData, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: keyof RemedyFormData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""],
    }))
  }

  const removeArrayItem = (field: keyof RemedyFormData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      localName: "",
      description: "",
      ingredients: [""],
      preparation: [""],
      usage: "",
      benefits: [""],
      symptoms: [],
      difficulty: "facile",
      preparationTime: "",
      region: "",
      warnings: [],
      imageUrl: "",
    })
  }

  const handleEdit = (remedy: TraditionalRemedy) => {
    setFormData({
      name: remedy.name,
      localName: remedy.localName,
      description: remedy.description,
      ingredients: remedy.ingredients,
      preparation: remedy.preparation,
      usage: remedy.usage,
      benefits: remedy.benefits,
      symptoms: remedy.symptoms,
      difficulty: remedy.difficulty,
      preparationTime: remedy.preparationTime,
      region: remedy.region,
      warnings: remedy.warnings || [],
      imageUrl: remedy.imageUrl,
    })
    setSelectedRemedy(remedy)
    setIsEditing(true)
    setShowAddDialog(true)
  }

  const handleSave = () => {
    // Here you would typically save to a database
    console.log("Saving remedy:", formData)
    setShowAddDialog(false)
    setIsEditing(false)
    resetForm()
  }

  const handleDelete = (remedyId: string) => {
    // Here you would typically delete from database
    console.log("Deleting remedy:", remedyId)
  }

  const mockPendingRemedies = [
    {
      id: "pending-1",
      name: "Tisane de Citronnelle",
      localName: "Veromanitra",
      submittedBy: "Dr. Rakoto",
      submittedDate: "2024-02-10",
      status: "pending",
      description: "Remède pour les maux de tête menstruels",
    },
    {
      id: "pending-2",
      name: "Cataplasme d'Aloe Vera",
      localName: "Vahona",
      submittedBy: "Sage Razafy",
      submittedDate: "2024-02-08",
      status: "pending",
      description: "Application externe pour les irritations",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Administration des Remèdes Traditionnels</h1>
          <p className="text-muted-foreground mt-2">Gérez la base de données des remèdes traditionnels malgaches</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un Remède
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="manage">Gestion</TabsTrigger>
          <TabsTrigger value="pending">En Attente</TabsTrigger>
          <TabsTrigger value="analytics">Analyses</TabsTrigger>
          <TabsTrigger value="categories">Catégories</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, nom local ou symptôme..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
          </div>

          {/* Remedies List */}
          <div className="grid grid-cols-1 gap-4">
            {filteredRemedies.map((remedy) => (
              <Card key={remedy.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{remedy.name}</h3>
                        <Badge variant="outline">{remedy.localName}</Badge>
                        <Badge className={getDifficultyColor(remedy.difficulty)}>{remedy.difficulty}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{remedy.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{remedy.userRating}</span>
                          <span className="text-muted-foreground">({remedy.reviewCount} avis)</span>
                        </div>
                        <span className="text-muted-foreground">Région: {remedy.region}</span>
                        <span className="text-muted-foreground">Temps: {remedy.preparationTime}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {remedy.symptoms.map((symptom, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => setSelectedRemedy(remedy)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(remedy)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(remedy.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                Remèdes en Attente de Validation
              </CardTitle>
              <CardDescription>Remèdes soumis par la communauté nécessitant une validation médicale</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPendingRemedies.map((remedy) => (
                  <div key={remedy.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{remedy.name}</h4>
                      <p className="text-sm text-muted-foreground">{remedy.localName}</p>
                      <p className="text-sm text-muted-foreground">{remedy.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Soumis par: {remedy.submittedBy}</span>
                        <span>Date: {new Date(remedy.submittedDate).toLocaleDateString("fr-FR")}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Examiner
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approuver
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        <X className="w-4 h-4 mr-1" />
                        Rejeter
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{traditionalRemedies.length}</p>
                  <p className="text-sm text-muted-foreground">Total Remèdes</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {traditionalRemedies.filter((r) => r.userRating >= 4).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Bien Notés (4+)</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-600">2</p>
                  <p className="text-sm text-muted-foreground">En Attente</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round(
                      (traditionalRemedies.reduce((acc, r) => acc + r.userRating, 0) / traditionalRemedies.length) * 10,
                    ) / 10}
                  </p>
                  <p className="text-sm text-muted-foreground">Note Moyenne</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Remèdes les Plus Populaires</CardTitle>
              <CardDescription>Basé sur les notes et le nombre d'avis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {traditionalRemedies
                  .sort((a, b) => b.reviewCount - a.reviewCount)
                  .slice(0, 5)
                  .map((remedy, index) => (
                    <div key={remedy.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{remedy.name}</p>
                        <p className="text-sm text-muted-foreground">{remedy.localName}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">{remedy.userRating}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{remedy.reviewCount} avis</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Catégories</CardTitle>
              <CardDescription>Organisez les remèdes par symptômes et catégories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Fonctionnalité de gestion des catégories en développement
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Modifier le Remède" : "Ajouter un Nouveau Remède"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Modifiez les informations du remède traditionnel"
                : "Ajoutez un nouveau remède traditionnel à la base de données"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du Remède</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Ex: Tisane de Gingembre"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="localName">Nom Local (Malgache)</Label>
                <Input
                  id="localName"
                  value={formData.localName}
                  onChange={(e) => handleInputChange("localName", e.target.value)}
                  placeholder="Ex: Sakamalaho"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Description détaillée du remède..."
                rows={3}
              />
            </div>

            {/* Ingredients */}
            <div className="space-y-2">
              <Label>Ingrédients</Label>
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={ingredient}
                    onChange={(e) => handleArrayInputChange("ingredients", index, e.target.value)}
                    placeholder="Ex: Gingembre frais (2-3 cm)"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("ingredients", index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => addArrayItem("ingredients")}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un Ingrédient
              </Button>
            </div>

            {/* Preparation Steps */}
            <div className="space-y-2">
              <Label>Étapes de Préparation</Label>
              {formData.preparation.map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={step}
                    onChange={(e) => handleArrayInputChange("preparation", index, e.target.value)}
                    placeholder={`Étape ${index + 1}...`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("preparation", index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => addArrayItem("preparation")}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une Étape
              </Button>
            </div>

            {/* Usage and Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="usage">Mode d'Utilisation</Label>
                <Textarea
                  id="usage"
                  value={formData.usage}
                  onChange={(e) => handleInputChange("usage", e.target.value)}
                  placeholder="Comment utiliser ce remède..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Bienfaits</Label>
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={benefit}
                      onChange={(e) => handleArrayInputChange("benefits", index, e.target.value)}
                      placeholder="Bienfait du remède..."
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("benefits", index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => addArrayItem("benefits")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un Bienfait
                </Button>
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulté</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value: any) => handleInputChange("difficulty", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facile">Facile</SelectItem>
                    <SelectItem value="moyen">Moyen</SelectItem>
                    <SelectItem value="difficile">Difficile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preparationTime">Temps de Préparation</Label>
                <Input
                  id="preparationTime"
                  value={formData.preparationTime}
                  onChange={(e) => handleInputChange("preparationTime", e.target.value)}
                  placeholder="Ex: 15 minutes"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Région</Label>
                <Input
                  id="region"
                  value={formData.region}
                  onChange={(e) => handleInputChange("region", e.target.value)}
                  placeholder="Ex: Toute l'île"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image du Remède</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                  placeholder="URL de l'image ou chemin du fichier"
                />
                <Button type="button" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddDialog(false)
                  setIsEditing(false)
                  resetForm()
                }}
              >
                Annuler
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? "Mettre à Jour" : "Ajouter"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Remedy Dialog */}
      {selectedRemedy && !isEditing && (
        <Dialog open={!!selectedRemedy} onOpenChange={() => setSelectedRemedy(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedRemedy.name}</DialogTitle>
              <DialogDescription>{selectedRemedy.localName}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p>{selectedRemedy.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Difficulté:</strong> {selectedRemedy.difficulty}
                </div>
                <div>
                  <strong>Temps:</strong> {selectedRemedy.preparationTime}
                </div>
                <div>
                  <strong>Région:</strong> {selectedRemedy.region}
                </div>
                <div>
                  <strong>Note:</strong> {selectedRemedy.userRating}/5 ({selectedRemedy.reviewCount} avis)
                </div>
              </div>
              {selectedRemedy.warnings && selectedRemedy.warnings.length > 0 && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <strong className="text-amber-800">Avertissements:</strong>
                  </div>
                  <ul className="text-sm text-amber-700 space-y-1">
                    {selectedRemedy.warnings.map((warning, index) => (
                      <li key={index}>• {warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
