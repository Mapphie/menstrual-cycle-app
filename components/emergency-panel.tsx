"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Phone, MapPin, Shield, Heart, AlertTriangle, Clock, ExternalLink, Lock } from "lucide-react"
import { emergencyContacts, emergencyResources } from "@/data/emergency-contacts"

export default function EmergencyPanel() {
  const [sosActivated, setSosActivated] = useState(false)
  const [selectedEmergencyType, setSelectedEmergencyType] = useState<string | null>(null)

  const activateSOS = (type: string) => {
    setSelectedEmergencyType(type)
    setSosActivated(true)
    // In a real app, this would trigger actual emergency protocols
    console.log(`[v0] SOS activated for: ${type}`)
  }

  const cancelSOS = () => {
    setSosActivated(false)
    setSelectedEmergencyType(null)
  }

  const callEmergency = (phone: string) => {
    // In a real app, this would initiate a phone call
    window.open(`tel:${phone}`)
  }

  return (
    <div className="space-y-6">
      {/* SOS Alert Banner */}
      {sosActivated && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <div className="flex items-center justify-between">
              <span>
                <strong>SOS Activé</strong> - Aide en cours d'envoi pour: {selectedEmergencyType}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={cancelSOS}
                className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
              >
                Annuler
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Quick SOS Actions */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <Shield className="h-5 w-5" />
            Actions d'Urgence
          </CardTitle>
          <CardDescription>Accès rapide aux services d'urgence et de soutien</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="destructive"
              size="lg"
              className="h-16 text-lg"
              onClick={() => activateSOS("Violence/Agression")}
            >
              <Shield className="h-6 w-6 mr-2" />
              SOS Violence
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-16 text-lg border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
              onClick={() => activateSOS("Urgence Médicale")}
            >
              <Heart className="h-6 w-6 mr-2" />
              Urgence Médicale
            </Button>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="h-4 w-4" />
              <span>Mode discret activé - Vos données sont protégées</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-blue-600" />
            Contacts d'Urgence
          </CardTitle>
          <CardDescription>Numéros d'urgence et services de soutien à Madagascar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{contact.name}</h4>
                    {contact.available24h && (
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        24h/24
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{contact.description}</p>
                  {contact.location && (
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{contact.location}</span>
                    </div>
                  )}
                </div>
                <Button variant="outline" size="sm" onClick={() => callEmergency(contact.phone)} className="ml-4">
                  <Phone className="h-4 w-4 mr-1" />
                  {contact.phone}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Support Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-purple-600" />
            Ressources d'Aide
          </CardTitle>
          <CardDescription>Services de soutien, hébergement et assistance juridique</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyResources.map((resource) => (
              <div key={resource.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{resource.title}</h4>
                    <Badge variant="outline" className="mt-1">
                      {resource.type === "hotline" && "Ligne d'écoute"}
                      {resource.type === "shelter" && "Hébergement"}
                      {resource.type === "legal" && "Juridique"}
                      {resource.type === "medical" && "Médical"}
                      {resource.type === "counseling" && "Soutien psychologique"}
                    </Badge>
                  </div>
                  {resource.available24h && (
                    <Badge variant="secondary">
                      <Clock className="h-3 w-3 mr-1" />
                      24h/24
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-3">{resource.description}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {resource.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => callEmergency(resource.contact)}>
                    <Phone className="h-4 w-4 mr-1" />
                    Appeler
                  </Button>

                  {resource.website && (
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Site web
                    </Button>
                  )}
                </div>

                {resource.address && (
                  <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                    <MapPin className="h-3 w-3" />
                    {resource.address}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safety Tips */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">Conseils de Sécurité</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-blue-700">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
              <span>Gardez toujours votre téléphone chargé et accessible</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
              <span>Informez une personne de confiance de vos déplacements</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
              <span>En cas de danger immédiat, appelez le 117 (Police)</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
              <span>Utilisez le mode discret pour protéger votre vie privée</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
