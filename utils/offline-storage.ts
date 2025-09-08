import { EncryptionService } from "./encryption"

export interface OfflineData {
  id: string
  type: "cycle" | "symptom" | "nutrition" | "remedy" | "emergency"
  data: any
  timestamp: Date
  encrypted: boolean
  synced: boolean
}

export class OfflineStorageService {
  private static readonly STORAGE_KEY = "cyclecare_offline_data"
  private static readonly ENCRYPTION_KEY = "cyclecare_encryption_key"
  private static readonly SALT_KEY = "cyclecare_salt"

  private static encryptionKey: CryptoKey | null = null

  // Initialize encryption for offline storage
  static async initializeEncryption(userPassword?: string): Promise<void> {
    try {
      let salt = this.getSalt()
      if (!salt) {
        salt = EncryptionService.generateSalt()
        this.storeSalt(salt)
      }

      if (userPassword) {
        // Use user password for key derivation
        this.encryptionKey = await EncryptionService.deriveKeyFromPassword(userPassword, salt)
      } else {
        // Generate a random key for this session
        this.encryptionKey = await EncryptionService.generateKey()
      }
    } catch (error) {
      console.error("[v0] Failed to initialize encryption:", error)
      throw new Error("Échec de l'initialisation du chiffrement")
    }
  }

  // Store sensitive data offline with encryption
  static async storeOfflineData(data: OfflineData): Promise<void> {
    try {
      if (!this.encryptionKey) {
        await this.initializeEncryption()
      }

      const existingData = this.getOfflineData()

      if (data.encrypted && this.encryptionKey) {
        const dataString = JSON.stringify(data.data)
        const { encrypted, iv } = await EncryptionService.encrypt(dataString, this.encryptionKey)

        data.data = {
          encrypted: EncryptionService.arrayBufferToBase64(encrypted),
          iv: Array.from(iv),
        }
      }

      const updatedData = existingData.filter((item) => item.id !== data.id)
      updatedData.push(data)

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData))
    } catch (error) {
      console.error("[v0] Failed to store offline data:", error)
      throw new Error("Échec de la sauvegarde hors ligne")
    }
  }

  // Retrieve and decrypt offline data
  static async getDecryptedOfflineData(): Promise<OfflineData[]> {
    try {
      const data = this.getOfflineData()
      const decryptedData: OfflineData[] = []

      for (const item of data) {
        if (item.encrypted && this.encryptionKey && item.data.encrypted) {
          try {
            const encryptedBuffer = EncryptionService.base64ToArrayBuffer(item.data.encrypted)
            const iv = new Uint8Array(item.data.iv)
            const decryptedString = await EncryptionService.decrypt(encryptedBuffer, this.encryptionKey, iv)

            item.data = JSON.parse(decryptedString)
            item.encrypted = false // Mark as decrypted for this session
          } catch (decryptError) {
            console.error("[v0] Failed to decrypt item:", item.id, decryptError)
            continue // Skip corrupted items
          }
        }
        decryptedData.push(item)
      }

      return decryptedData
    } catch (error) {
      console.error("[v0] Failed to retrieve offline data:", error)
      return []
    }
  }

  // Get raw offline data (encrypted)
  static getOfflineData(): OfflineData[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error("[v0] Failed to parse offline data:", error)
      return []
    }
  }

  // Clear all offline data
  static clearOfflineData(): void {
    localStorage.removeItem(this.STORAGE_KEY)
    localStorage.removeItem(this.SALT_KEY)
    this.encryptionKey = null
  }

  // Get unsynced data for synchronization
  static async getUnsyncedData(): Promise<OfflineData[]> {
    const data = await this.getDecryptedOfflineData()
    return data.filter((item) => !item.synced)
  }

  // Mark data as synced
  static async markAsSynced(ids: string[]): Promise<void> {
    const data = this.getOfflineData()
    const updatedData = data.map((item) => (ids.includes(item.id) ? { ...item, synced: true } : item))
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData))
  }

  // Check if offline mode is available
  static isOfflineModeAvailable(): boolean {
    return typeof Storage !== "undefined" && "crypto" in window && "subtle" in crypto
  }

  // Get storage usage
  static getStorageUsage(): { used: number; available: number } {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY) || ""
      const used = new Blob([data]).size
      const available = 5 * 1024 * 1024 // Assume 5MB limit for localStorage
      return { used, available }
    } catch (error) {
      return { used: 0, available: 0 }
    }
  }

  private static getSalt(): Uint8Array | null {
    try {
      const saltString = localStorage.getItem(this.SALT_KEY)
      return saltString ? new Uint8Array(JSON.parse(saltString)) : null
    } catch (error) {
      return null
    }
  }

  private static storeSalt(salt: Uint8Array): void {
    localStorage.setItem(this.SALT_KEY, JSON.stringify(Array.from(salt)))
  }
}
