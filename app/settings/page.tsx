import SecuritySettings from "@/components/security-settings"

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres de Sécurité</h1>
        <p className="text-gray-600">
          Gérez la sécurité de vos données, le mode hors ligne et vos préférences de confidentialité
        </p>
      </div>

      <SecuritySettings />
    </div>
  )
}
