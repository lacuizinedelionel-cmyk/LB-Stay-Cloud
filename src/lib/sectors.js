import {
  UtensilsCrossed, Hotel, Scissors, ShoppingCart,
  Heart, Wrench, Dumbbell, GraduationCap
} from 'lucide-react'

export const SECTORS = {
  restaurant: {
    id: 'restaurant',
    label: 'Restauration',
    icon: UtensilsCrossed,
    color: '#F5A623',
    emoji: '🍽️',
  },
  hotel: {
    id: 'hotel',
    label: 'Hôtel / Hébergement',
    icon: Hotel,
    color: '#6C63FF',
    emoji: '🏨',
  },
  beauty: {
    id: 'beauty',
    label: 'Salon de beauté',
    icon: Scissors,
    color: '#FF6B9D',
    emoji: '💇‍♀️',
  },
  grocery: {
    id: 'grocery',
    label: 'Épicerie / Supermarché',
    icon: ShoppingCart,
    color: '#00D4AA',
    emoji: '🛒',
  },
  pharmacy: {
    id: 'pharmacy',
    label: 'Pharmacie / Santé',
    icon: Heart,
    color: '#FF4757',
    emoji: '💊',
  },
  garage: {
    id: 'garage',
    label: 'Garage / Mécanique',
    icon: Wrench,
    color: '#FBBF24',
    emoji: '🔧',
  },
  fitness: {
    id: 'fitness',
    label: 'Sport / Fitness',
    icon: Dumbbell,
    color: '#3B82F6',
    emoji: '🏋️',
  },
  education: {
    id: 'education',
    label: 'Éducation / Formation',
    icon: GraduationCap,
    color: '#A78BFA',
    emoji: '🎓',
  },
}

export const SECTOR_LIST = Object.values(SECTORS)

export const DEMO_BUSINESSES = [
  { id: 'biz1', name: 'Restaurant Chez Mama', sector: 'restaurant', city: 'Douala', plan: 'pro', ca_month: 2560000, status: 'active', branches: 3 },
  { id: 'biz2', name: 'Hôtel Le Prestige', sector: 'hotel', city: 'Yaoundé', plan: 'enterprise', ca_month: 8450000, status: 'active', branches: 1 },
  { id: 'biz3', name: 'Beauty Palace', sector: 'beauty', city: 'Douala', plan: 'pro', ca_month: 1230000, status: 'active', branches: 2 },
  { id: 'biz4', name: 'Super Marché Central', sector: 'grocery', city: 'Bafoussam', plan: 'pro', ca_month: 4870000, status: 'active', branches: 1 },
  { id: 'biz5', name: 'Pharmacie Centrale Plus', sector: 'pharmacy', city: 'Douala', plan: 'starter', ca_month: 3210000, status: 'active', branches: 2 },
  { id: 'biz6', name: 'Garage Auto Excellence', sector: 'garage', city: 'Yaoundé', plan: 'pro', ca_month: 1890000, status: 'active', branches: 1 },
  { id: 'biz7', name: 'FitZone Cameroun', sector: 'fitness', city: 'Douala', plan: 'pro', ca_month: 4680000, status: 'active', branches: 3 },
  { id: 'biz8', name: 'Institut Formation Excellence', sector: 'education', city: 'Yaoundé', plan: 'enterprise', ca_month: 5340000, status: 'active', branches: 1 },
  { id: 'biz9', name: 'Ristorante Da Luigi', sector: 'restaurant', city: 'Douala', plan: 'starter', ca_month: 980000, status: 'active', branches: 1 },
  { id: 'biz10', name: 'Résidence Les Palmiers', sector: 'hotel', city: 'Kribi', plan: 'pro', ca_month: 3200000, status: 'active', branches: 1 },
  { id: 'biz11', name: 'Glam Hair Studio', sector: 'beauty', city: 'Yaoundé', plan: 'starter', ca_month: 670000, status: 'active', branches: 1 },
  { id: 'biz12', name: 'MiniPrix Express', sector: 'grocery', city: 'Douala', plan: 'pro', ca_month: 2340000, status: 'suspended', branches: 2 },
  { id: 'biz13', name: 'Pharmacie du Peuple', sector: 'pharmacy', city: 'Bafoussam', plan: 'pro', ca_month: 1890000, status: 'active', branches: 1 },
  { id: 'biz14', name: 'Mécanique Générale Plus', sector: 'garage', city: 'Douala', plan: 'starter', ca_month: 560000, status: 'active', branches: 1 },
  { id: 'biz15', name: 'CrossFit Douala', sector: 'fitness', city: 'Douala', plan: 'starter', ca_month: 1120000, status: 'active', branches: 1 },
  { id: 'biz16', name: 'Académie Bilingue du Savoir', sector: 'education', city: 'Bamenda', plan: 'pro', ca_month: 3890000, status: 'active', branches: 2 },
]

export const CAMEROON_CITIES = [
  'Douala', 'Yaoundé', 'Bafoussam', 'Bamenda', 'Garoua',
  'Maroua', 'Ngaoundéré', 'Bertoua', 'Kribi', 'Limbé', 'Buea', 'Ebolowa'
]
