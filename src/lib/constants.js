export const APP_NAME = 'LB Stay Cloud'
export const APP_TAGLINE = 'Plateforme SaaS multi-secteurs — Cameroun & Afrique'

export const TVA_RATE = 0.1925
export const CURRENCY = 'FCFA'
export const LOCALE = 'fr-CM'

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  OWNER: 'owner',
  MANAGER: 'manager',
  STAFF: 'staff',
}

export const ROLE_LABELS = {
  super_admin: 'Super Admin',
  owner: 'Propriétaire',
  manager: 'Manager',
  staff: 'Personnel',
}

export const PLANS = {
  starter: { label: 'Starter', price: 9900, color: '#8B8FA8' },
  pro: { label: 'Pro', price: 24900, color: '#F5A623' },
  enterprise: { label: 'Enterprise', price: 0, color: '#6C63FF' },
}

export const ORDER_STATUS = {
  PENDING: 'en_attente',
  PREPARING: 'en_preparation',
  READY: 'pret',
  SERVED: 'servi',
  PAID: 'paye',
  CANCELLED: 'annule',
}

export const PAYMENT_METHODS = {
  CASH: 'cash',
  ORANGE_MONEY: 'orange_money',
  MTN_MOMO: 'mtn_momo',
  CARD: 'carte_bancaire',
}

export const ORDER_STATUS_CONFIG = {
  en_attente: { label: 'En attente', color: 'warning' },
  en_preparation: { label: 'En préparation', color: 'info' },
  pret: { label: 'Prêt', color: 'success' },
  servi: { label: 'Servi', color: 'success' },
  paye: { label: 'Payé', color: 'gold' },
  annule: { label: 'Annulé', color: 'danger' },
}

export const PAYMENT_METHOD_LABELS = {
  cash: 'Espèces',
  orange_money: 'Orange Money',
  mtn_momo: 'MTN MoMo',
  carte_bancaire: 'Carte Bancaire',
}
