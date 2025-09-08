"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Shield, Lock, Download, Upload, Trash2, Wifi, WifiOff, Key, AlertTriangle } from "lucide-react"
import { OfflineStorageService } from "@/utils/offline-storage"

export default function SecuritySettings() {
  const [offlineMode, setOfflineMode] = useState(false)
  const [encryptionEnabled, setEncryptionEnabled] = useState(true)
  const [autoSync, setAutoSync] = useState(true)
  const [encryptionPassword, setEncryptionPassword] = useState("")
  const [isOnline, setIsOnline] = useState(true)
  const [storageUsage, setStorageUsage] = useState({ used: 0, available: 0 })
  const [unsyncedCount, setUnsyncedCount] = useState(0)

  useEffect(() => {
    // Check online status
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Load storage usage
    const usage = OfflineStorageService.getStorageUsage()
    setStorageUsage(usage)

    // Load unsynced data count
    OfflineStorageService.getUnsyncedData().then((data) => {
      setUnsyncedCount(data.length)
    })

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleOfflineModeToggle = async (enabled: boolean) => {
    try {
      if (enabled) {
        if (!OfflineStorageService.isOfflineModeAvailable()) {
          alert("Le mode hors ligne n'est pas disponible sur ce navigateur")
          return
        }
        await OfflineStorageService.initializeEncryption(encryptionPassword || undefined)
      }
      setOfflineMode(enabled)
    } catch (error) {
      console.error("[v0] Failed to toggle offline mode:", error)
      alert("Erreur lors de l'activation du mode hors ligne")
    }
  }

  const handleEncryptionSetup = async () => {
    try {
      await OfflineStorageService.initializeEncryption(encryptionPassword)
      alert("Chiffrement configuré avec succès")
    } catch (error) {
      console.error("[v0] Failed to setup encryption:", error)
      alert("Erreur lors de la configuration du chiffrement")
    }
  }

  const handleDataExport = async () => {
    try {
      const data = await OfflineStorageService.getDecryptedOfflineData()
      const exportData = {
        version: "1.0",
        exportDate: new Date().toISOString(),
        data: data,
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `cyclecare-backup-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("[v0] Failed to export data:", error)
      alert("Erreur lors de l'export des données")
    }
  }

  const handleDataClear = () => {
    if (confirm("Êtes-vous sûre de vouloir supprimer toutes les données hors ligne ? Cette action est irréversible.")) {
      OfflineStorageService.clearOfflineData()
      setStorageUsage({ used: 0, available: 0 })
      setUnsyncedCount(0)
      alert("Données supprimées avec succès")
    }
  }

  const handleSync = async () => {
    try {
      const unsyncedData = await OfflineStorageService.getUnsyncedData()
      // In a real app, this would sync with the server
      console.log("[v0] Syncing data:", unsyncedData)

      // Simulate sync
      const ids = unsyncedData.map((item) => item.id)
      await OfflineStorageService.markAsSynced(ids)
      setUnsyncedCount(0)
      alert("Synchronisation terminée")
    } catch (error) {
      console.error("[v0] Failed to sync data:", error)
      alert("Erreur lors de la synchronisation")
    }
  }

  const storagePercentage = storageUsage.available > 0 ? (storageUsage.used / storageUsage.available) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Alert className={isOnline ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}>
        <div className="flex items-center gap-2">
          {isOnline ? <Wifi className="h-4 w-4 text-green-600" /> : <WifiOff className="h-4 w-4 text-amber-600" />}
          <AlertDescription className={isOnline ? "text-green-800" : "text-amber-800"}>
            {isOnline
              ? "Connexion active - Synchronisation disponible"
              : "Mode hors ligne - Données stockées localement"}
          </AlertDescription>
        </div>
      </Alert>

      {/* Offline Mode Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WifiOff className="h-5 w-5 text-blue-600" />
            Mode Hors Ligne
          </CardTitle>
          <CardDescription>Continuez à utiliser l'application même sans connexion internet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="offline-mode">Activer le mode hors ligne</Label>
              <p className="text-sm text-muted-foreground">Stocke vos données localement de manière sécurisée</p>
            </div>
            <Switch id="offline-mode" checked={offlineMode} onCheckedChange={handleOfflineModeToggle} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-sync">Synchronisation automatique</Label>
              <p className="text-sm text-muted-foreground">Synchronise automatiquement quand la connexion revient</p>
            </div>
            <Switch id="auto-sync" checked={autoSync} onCheckedChange={setAutoSync} />
          </div>

          {unsyncedCount > 0 && (
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-blue-900">{unsyncedCount} éléments non synchronisés</p>
                <p className="text-xs text-blue-700">Données en attente de synchronisation avec le serveur</p>
              </div>
              <Button size="sm" onClick={handleSync} disabled={!isOnline}>
                <Upload className="h-4 w-4 mr-2" />
                Synchroniser
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Encryption Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Chiffrement des Données
          </CardTitle>
          <CardDescription>Protection end-to-end de vos données sensibles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="encryption">Chiffrement activé</Label>
              <p className="text-sm text-muted-foreground">Toutes vos données sont chiffrées avant stockage</p>
            </div>
            <Switch
              id="encryption"
              checked={encryptionEnabled}
              onCheckedChange={setEncryptionEnabled}
              disabled={true} // Always enabled for security
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="encryption-password">Mot de passe de chiffrement (optionnel)</Label>
            <div className="flex gap-2">
              <Input
                id="encryption-password"
                type="password"
                placeholder="Laissez vide pour un chiffrement automatique"
                value={encryptionPassword}
                onChange={(e) => setEncryptionPassword(e.target.value)}
              />
              <Button variant="outline" onClick={handleEncryptionSetup}>
                <Key className="h-4 w-4 mr-2" />
                Configurer
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Un mot de passe personnalisé offre une sécurité renforcée mais doit être mémorisé
            </p>
          </div>

          <Alert>
            <Lock className="h-4 w-4" />
            <AlertDescription>
              <strong>Important :</strong> Vos données sont chiffrées localement. Même nous ne pouvons pas y accéder
              sans votre mot de passe.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Storage Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-purple-600" />
            Gestion du Stockage
          </CardTitle>
          <CardDescription>Gérez vos données locales et sauvegardes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Utilisation du stockage</span>
              <span>
                {Math.round(storageUsage.used / 1024)} KB / {Math.round(storageUsage.available / 1024)} KB
              </span>
            </div>
            <Progress value={storagePercentage} className="h-2" />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDataExport} className="flex-1 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Exporter les données
            </Button>
            <Button
              variant="outline"
              onClick={handleDataClear}
              className="flex-1 text-red-600 hover:text-red-700 bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Effacer les données
            </Button>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Exportez régulièrement vos données pour éviter toute perte en cas de problème technique.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-600" />
            Confidentialité
          </CardTitle>
          <CardDescription>Contrôlez la visibilité de vos données</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Profil anonyme</Label>
                <p className="text-sm text-muted-foreground">Masquer votre identité dans la communauté</p>
              </div>
              <Switch defaultChecked={true} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Partage des statistiques</Label>
                <p className="text-sm text-muted-foreground">Contribuer aux recherches (données anonymisées)</p>
              </div>
              <Switch defaultChecked={false} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Notifications de sécurité</Label>
                <p className="text-sm text-muted-foreground">Alertes en cas d'activité suspecte</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
