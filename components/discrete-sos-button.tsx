"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertTriangle, Phone, Shield } from "lucide-react"

interface DiscreteSosButtonProps {
  variant?: "default" | "discrete"
}

export default function DiscreteSosButton({ variant = "default" }: DiscreteSosButtonProps) {
  const [sosDialogOpen, setSosDialogOpen] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)

  const activateEmergencySOS = () => {
    // Start 5-second countdown before activating SOS
    let count = 5
    setCountdown(count)

    const timer = setInterval(() => {
      count--
      setCountdown(count)

      if (count === 0) {
        clearInterval(timer)
        // Activate actual SOS
        console.log("[v0] Emergency SOS activated")
        // In real app: send location, alert contacts, call emergency services
        setCountdown(null)
        setSosDialogOpen(false)
      }
    }, 1000)
  }

  const cancelSOS = () => {
    setCountdown(null)
    setSosDialogOpen(false)
  }

  if (variant === "discrete") {
    return (
      <>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSosDialogOpen(true)}
          className="text-gray-400 hover:text-red-600"
        >
          •••
        </Button>

        <Dialog open={sosDialogOpen} onOpenChange={setSosDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-700">
                <Shield className="h-5 w-5" />
                Mode SOS Discret
              </DialogTitle>
              <DialogDescription>Activation discrète des services d'urgence</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {countdown !== null ? (
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-red-600">{countdown}</div>
                  <p className="text-sm text-gray-600">SOS sera activé dans {countdown} secondes</p>
                  <Button variant="outline" onClick={cancelSOS} className="w-full bg-transparent">
                    Annuler
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Cette fonction activera discrètement les services d'urgence et alertera vos contacts de confiance.
                  </p>

                  <div className="grid grid-cols-1 gap-3">
                    <Button variant="destructive" onClick={activateEmergencySOS} className="w-full">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Activer SOS d'Urgence
                    </Button>

                    <Button variant="outline" onClick={() => window.open("tel:117")} className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Appeler Police (117)
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <Button variant="destructive" size="sm" onClick={() => setSosDialogOpen(true)}>
      <AlertTriangle className="h-4 w-4 mr-2" />
      SOS
    </Button>
  )
}
