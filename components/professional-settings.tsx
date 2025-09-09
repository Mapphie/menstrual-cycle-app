"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Settings,
  Shield,
  Bell,
  Database,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  Upload,
  Download,
  CheckCircle,
} from "lucide-react"
import {
  mockProfessionalProfile,
  mockUserRoles,
  mockTeamMembers,
  mockProfessionalSettings,
} from "@/data/professional-data"
import type { ProfessionalProfile, TeamMember, ProfessionalSettings } from "@/types/professional"

export default function ProfessionalSettingsPanel() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profile, setProfile] = useState<ProfessionalProfile>(mockProfessionalProfile)
  const [settings, setSettings] = useState<ProfessionalSettings>(mockProfessionalSettings)
  const [showAddMember, setShowAddMember] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  const handleProfileUpdate = (field: keyof ProfessionalProfile, value: any) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleSettingsUpdate = (category: keyof ProfessionalSettings, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }))
  }

  const getStatusColor = (status: TeamMember["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (roleName: string) => {
    switch (roleName) {
      case "Administrateur":
        return "bg-red-100 text-red-800"
      case "Gynécologue":
        return "bg-blue-100 text-blue-800"
      case "Assistant Médical":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Paramètres Professionnels</h1>
          <p className="text-muted-foreground mt-2">Gérez votre profil, équipe et préférences système</p>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="team">Équipe</TabsTrigger>
          <TabsTrigger value="interface">Interface</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profil Professionnel
              </CardTitle>
              <CardDescription>Informations personnelles et professionnelles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-start gap-6">
                <div className="space-y-2">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {profile.firstName[0]}
                      {profile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Changer
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => handleProfileUpdate("firstName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => handleProfileUpdate("lastName", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre Professionnel</Label>
                    <Input
                      id="title"
                      value={profile.title}
                      onChange={(e) => handleProfileUpdate("title", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Professional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="specialization">Spécialisation</Label>
                  <Input
                    id="specialization"
                    value={profile.specialization}
                    onChange={(e) => handleProfileUpdate("specialization", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">Numéro de Licence</Label>
                  <Input
                    id="licenseNumber"
                    value={profile.licenseNumber}
                    onChange={(e) => handleProfileUpdate("licenseNumber", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hospital">Établissement</Label>
                <Input
                  id="hospital"
                  value={profile.hospital}
                  onChange={(e) => handleProfileUpdate("hospital", e.target.value)}
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleProfileUpdate("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileUpdate("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Textarea
                  id="address"
                  value={profile.address}
                  onChange={(e) => handleProfileUpdate("address", e.target.value)}
                  rows={2}
                />
              </div>

              {/* Certifications */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Certifications</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
                <div className="space-y-3">
                  {profile.certifications.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground">{cert.issuingOrganization}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {new Date(cert.issueDate).toLocaleDateString("fr-FR")}
                          </Badge>
                          {cert.verified && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Vérifié
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Gestion de l'Équipe
                  </CardTitle>
                  <CardDescription>Gérez les membres de votre équipe médicale</CardDescription>
                </div>
                <Button onClick={() => setShowAddMember(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un Membre
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTeamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {member.firstName[0]}
                          {member.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">
                          {member.firstName} {member.lastName}
                        </h4>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getRoleColor(member.role.name)}>{member.role.name}</Badge>
                          <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right text-sm text-muted-foreground">
                        <p>Rejoint le {new Date(member.joinDate).toLocaleDateString("fr-FR")}</p>
                        {member.lastLogin && (
                          <p>Dernière connexion: {new Date(member.lastLogin).toLocaleDateString("fr-FR")}</p>
                        )}
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setSelectedMember(member)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Roles Management */}
          <Card>
            <CardHeader>
              <CardTitle>Rôles et Permissions</CardTitle>
              <CardDescription>Configurez les rôles et leurs permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUserRoles.map((role) => (
                  <div key={role.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{role.name}</h4>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission) => (
                        <Badge key={permission.id} variant="outline" className="text-xs">
                          {permission.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interface" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Préférences d'Interface
              </CardTitle>
              <CardDescription>Personnalisez l'apparence et le comportement de l'interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="theme">Thème</Label>
                  <Select
                    value={settings.interface.theme}
                    onValueChange={(value: any) => handleSettingsUpdate("interface", "theme", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Clair</SelectItem>
                      <SelectItem value="dark">Sombre</SelectItem>
                      <SelectItem value="system">Système</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Langue</Label>
                  <Select
                    value={settings.interface.language}
                    onValueChange={(value: any) => handleSettingsUpdate("interface", "language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="mg">Malgache</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Format de Date</Label>
                  <Select
                    value={settings.interface.dateFormat}
                    onValueChange={(value: any) => handleSettingsUpdate("interface", "dateFormat", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeFormat">Format d'Heure</Label>
                  <Select
                    value={settings.interface.timeFormat}
                    onValueChange={(value: any) => handleSettingsUpdate("interface", "timeFormat", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">24 heures</SelectItem>
                      <SelectItem value="12h">12 heures</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="defaultView">Vue par Défaut</Label>
                  <Select
                    value={settings.interface.defaultView}
                    onValueChange={(value: any) => handleSettingsUpdate("interface", "defaultView", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="patients">Liste des Patients</SelectItem>
                      <SelectItem value="calendar">Calendrier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Paramètres de Notifications
              </CardTitle>
              <CardDescription>Configurez vos préférences de notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Notifications Email</Label>
                    <p className="text-sm text-muted-foreground">Recevoir les notifications par email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => handleSettingsUpdate("notifications", "emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotifications">Notifications SMS</Label>
                    <p className="text-sm text-muted-foreground">Recevoir les notifications par SMS</p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={settings.notifications.smsNotifications}
                    onCheckedChange={(checked) => handleSettingsUpdate("notifications", "smsNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="criticalAlerts">Alertes Critiques</Label>
                    <p className="text-sm text-muted-foreground">Notifications pour les urgences médicales</p>
                  </div>
                  <Switch
                    id="criticalAlerts"
                    checked={settings.notifications.criticalAlerts}
                    onCheckedChange={(checked) => handleSettingsUpdate("notifications", "criticalAlerts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="appointmentReminders">Rappels de Rendez-vous</Label>
                    <p className="text-sm text-muted-foreground">Rappels automatiques des rendez-vous</p>
                  </div>
                  <Switch
                    id="appointmentReminders"
                    checked={settings.notifications.appointmentReminders}
                    onCheckedChange={(checked) =>
                      handleSettingsUpdate("notifications", "appointmentReminders", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reportGeneration">Génération de Rapports</Label>
                    <p className="text-sm text-muted-foreground">Notifications lors de la génération de rapports</p>
                  </div>
                  <Switch
                    id="reportGeneration"
                    checked={settings.notifications.reportGeneration}
                    onCheckedChange={(checked) => handleSettingsUpdate("notifications", "reportGeneration", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="systemUpdates">Mises à Jour Système</Label>
                    <p className="text-sm text-muted-foreground">Notifications des mises à jour du système</p>
                  </div>
                  <Switch
                    id="systemUpdates"
                    checked={settings.notifications.systemUpdates}
                    onCheckedChange={(checked) => handleSettingsUpdate("notifications", "systemUpdates", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Sécurité et Confidentialité
              </CardTitle>
              <CardDescription>Paramètres de sécurité et de protection des données</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dataRetention">Rétention des Données (mois)</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={settings.privacy.dataRetention}
                    onChange={(e) =>
                      handleSettingsUpdate("privacy", "dataRetention", Number.parseInt(e.target.value) || 60)
                    }
                  />
                  <p className="text-sm text-muted-foreground">
                    Durée de conservation des données patients (minimum 24 mois)
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="anonymizeReports">Anonymiser les Rapports</Label>
                    <p className="text-sm text-muted-foreground">Anonymiser automatiquement les rapports exportés</p>
                  </div>
                  <Switch
                    id="anonymizeReports"
                    checked={settings.privacy.anonymizeReports}
                    onCheckedChange={(checked) => handleSettingsUpdate("privacy", "anonymizeReports", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="shareStatistics">Partager les Statistiques</Label>
                    <p className="text-sm text-muted-foreground">
                      Partager les statistiques anonymisées pour la recherche
                    </p>
                  </div>
                  <Switch
                    id="shareStatistics"
                    checked={settings.privacy.shareStatistics}
                    onCheckedChange={(checked) => handleSettingsUpdate("privacy", "shareStatistics", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowResearch">Autoriser la Recherche</Label>
                    <p className="text-sm text-muted-foreground">
                      Permettre l'utilisation des données pour la recherche médicale
                    </p>
                  </div>
                  <Switch
                    id="allowResearch"
                    checked={settings.privacy.allowResearch}
                    onCheckedChange={(checked) => handleSettingsUpdate("privacy", "allowResearch", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Sauvegarde et Récupération
              </CardTitle>
              <CardDescription>Paramètres de sauvegarde automatique des données</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoBackup">Sauvegarde Automatique</Label>
                    <p className="text-sm text-muted-foreground">Activer les sauvegardes automatiques</p>
                  </div>
                  <Switch
                    id="autoBackup"
                    checked={settings.backup.autoBackup}
                    onCheckedChange={(checked) => handleSettingsUpdate("backup", "autoBackup", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Fréquence de Sauvegarde</Label>
                  <Select
                    value={settings.backup.backupFrequency}
                    onValueChange={(value: any) => handleSettingsUpdate("backup", "backupFrequency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Quotidienne</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                      <SelectItem value="monthly">Mensuelle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="cloudStorage">Stockage Cloud</Label>
                    <p className="text-sm text-muted-foreground">Sauvegarder dans le cloud sécurisé</p>
                  </div>
                  <Switch
                    id="cloudStorage"
                    checked={settings.backup.cloudStorage}
                    onCheckedChange={(checked) => handleSettingsUpdate("backup", "cloudStorage", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="localBackup">Sauvegarde Locale</Label>
                    <p className="text-sm text-muted-foreground">Créer des sauvegardes locales</p>
                  </div>
                  <Switch
                    id="localBackup"
                    checked={settings.backup.localBackup}
                    onCheckedChange={(checked) => handleSettingsUpdate("backup", "localBackup", checked)}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Créer une Sauvegarde
                </Button>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Restaurer une Sauvegarde
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Member Dialog */}
      <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un Membre à l'Équipe</DialogTitle>
            <DialogDescription>Invitez un nouveau membre à rejoindre votre équipe médicale</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newMemberFirstName">Prénom</Label>
                <Input id="newMemberFirstName" placeholder="Prénom" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newMemberLastName">Nom</Label>
                <Input id="newMemberLastName" placeholder="Nom" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newMemberEmail">Email</Label>
              <Input id="newMemberEmail" type="email" placeholder="email@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newMemberRole">Rôle</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  {mockUserRoles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowAddMember(false)}>
                Annuler
              </Button>
              <Button onClick={() => setShowAddMember(false)}>Envoyer l'Invitation</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Member Dialog */}
      {selectedMember && (
        <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedMember.firstName} {selectedMember.lastName}
              </DialogTitle>
              <DialogDescription>{selectedMember.role.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedMember.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedMember.firstName[0]}
                    {selectedMember.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {selectedMember.firstName} {selectedMember.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{selectedMember.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getRoleColor(selectedMember.role.name)}>{selectedMember.role.name}</Badge>
                    <Badge className={getStatusColor(selectedMember.status)}>{selectedMember.status}</Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Date d'adhésion:</strong> {new Date(selectedMember.joinDate).toLocaleDateString("fr-FR")}
                </p>
                {selectedMember.lastLogin && (
                  <p>
                    <strong>Dernière connexion:</strong>{" "}
                    {new Date(selectedMember.lastLogin).toLocaleDateString("fr-FR")}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.role.permissions.map((permission) => (
                    <Badge key={permission.id} variant="outline" className="text-xs">
                      {permission.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
