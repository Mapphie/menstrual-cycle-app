import type { ProfessionalProfile, UserRole, TeamMember, ProfessionalSettings } from "@/types/professional"

export const mockProfessionalProfile: ProfessionalProfile = {
  id: "prof-1",
  firstName: "Dr. Hanta",
  lastName: "Razafy",
  title: "Docteur en Gynécologie-Obstétrique",
  specialization: "Gynécologie, Santé reproductive",
  licenseNumber: "MG-GYN-2018-0456",
  hospital: "Hôpital Universitaire Joseph Ravoahangy Andrianavalona",
  address: "Antananarivo, Madagascar",
  phone: "+261 34 12 345 67",
  email: "dr.razafy@hospital.mg",
  certifications: [
    {
      id: "cert-1",
      name: "Diplôme de Gynécologie-Obstétrique",
      issuingOrganization: "Université d'Antananarivo",
      issueDate: "2018-07-15",
      certificateNumber: "UNIV-GYN-2018-045",
      verified: true,
    },
    {
      id: "cert-2",
      name: "Formation en Médecine Traditionnelle",
      issuingOrganization: "Institut Malgache de Recherches Appliquées",
      issueDate: "2020-03-10",
      expiryDate: "2025-03-10",
      certificateNumber: "IMRA-MT-2020-123",
      verified: true,
    },
  ],
  experience: 6,
  languages: ["Français", "Malgache", "Anglais"],
  avatar: "/doctor-avatar.jpg",
}

export const mockUserRoles: UserRole[] = [
  {
    id: "role-admin",
    name: "Administrateur",
    description: "Accès complet à toutes les fonctionnalités",
    permissions: [
      {
        id: "perm-1",
        name: "Gestion complète des patients",
        category: "patients",
        actions: ["read", "write", "delete", "admin"],
      },
      {
        id: "perm-2",
        name: "Gestion des rapports",
        category: "reports",
        actions: ["read", "write", "delete", "admin"],
      },
      {
        id: "perm-3",
        name: "Administration des remèdes",
        category: "remedies",
        actions: ["read", "write", "delete", "admin"],
      },
      {
        id: "perm-4",
        name: "Paramètres système",
        category: "settings",
        actions: ["read", "write", "admin"],
      },
    ],
  },
  {
    id: "role-doctor",
    name: "Gynécologue",
    description: "Accès médical complet avec restrictions administratives",
    permissions: [
      {
        id: "perm-5",
        name: "Gestion des patients",
        category: "patients",
        actions: ["read", "write"],
      },
      {
        id: "perm-6",
        name: "Génération de rapports",
        category: "reports",
        actions: ["read", "write"],
      },
      {
        id: "perm-7",
        name: "Consultation des remèdes",
        category: "remedies",
        actions: ["read", "write"],
      },
    ],
  },
  {
    id: "role-assistant",
    name: "Assistant Médical",
    description: "Accès limité pour assistance administrative",
    permissions: [
      {
        id: "perm-8",
        name: "Consultation des patients",
        category: "patients",
        actions: ["read"],
      },
      {
        id: "perm-9",
        name: "Consultation des rapports",
        category: "reports",
        actions: ["read"],
      },
    ],
  },
]

export const mockTeamMembers: TeamMember[] = [
  {
    id: "team-1",
    firstName: "Dr. Hanta",
    lastName: "Razafy",
    email: "dr.razafy@hospital.mg",
    role: mockUserRoles[0],
    status: "active",
    joinDate: "2023-01-15",
    lastLogin: "2024-02-15T10:30:00Z",
  },
  {
    id: "team-2",
    firstName: "Miora",
    lastName: "Rakoto",
    email: "m.rakoto@hospital.mg",
    role: mockUserRoles[2],
    status: "active",
    joinDate: "2023-06-01",
    lastLogin: "2024-02-14T16:45:00Z",
  },
  {
    id: "team-3",
    firstName: "Hery",
    lastName: "Andry",
    email: "h.andry@hospital.mg",
    role: mockUserRoles[1],
    status: "pending",
    joinDate: "2024-02-10",
  },
]

export const mockProfessionalSettings: ProfessionalSettings = {
  interface: {
    theme: "light",
    language: "fr",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    defaultView: "dashboard",
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    criticalAlerts: true,
    appointmentReminders: true,
    reportGeneration: true,
    systemUpdates: false,
  },
  privacy: {
    dataRetention: 60,
    anonymizeReports: true,
    shareStatistics: false,
    allowResearch: true,
  },
  backup: {
    autoBackup: true,
    backupFrequency: "weekly",
    cloudStorage: true,
    localBackup: false,
  },
}
