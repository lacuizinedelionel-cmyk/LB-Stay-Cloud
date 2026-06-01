import { useState, useMemo, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRestaurant } from '../context/RestaurantContext'
import { formatPrice, calculateTVA, getInitials, generateOrderRef } from '../lib/utils'
import { TVA_RATE } from '../lib/constants'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from '../components/ui/Modal'
import toast from 'react-hot-toast'
import {
  Search, ShoppingBag, Plus, Minus, Trash2, X, StickyNote,
  MapPin, Truck, UtensilsCrossed, Users as UsersIcon,
  Banknote, Smartphone, Wifi, CreditCard, Printer, AlertCircle,
  LogOut, Clock, ChevronDown
} from 'lucide-react'

// ─── Données fictives réalistes ──────────────────────────────────────
const demoCats = [
  { id: 'all', name: 'Tout' },
  { id: 'c1', name: 'Plats principaux' },
  { id: 'c2', name: 'Entrées' },
  { id: 'c3', name: 'Boissons' },
  { id: 'c4', name: 'Desserts' },
]

const demoItems = [
  { id: 'm1', category_id: 'c1', name: 'Poulet DG', description: 'Poulet directeur général avec plantain', price: 4500, is_available: true, image_url: null },
  { id: 'm2', category_id: 'c1', name: 'Ndolé Complet', description: 'Ndolé traditionnel avec viande et crevettes', price: 3500, is_available: true, image_url: null },
  { id: 'm3', category_id: 'c1', name: 'Poisson Braisé', description: 'Poisson frais braisé avec condiments', price: 5000, is_available: true, image_url: null },
  { id: 'm4', category_id: 'c1', name: 'Eru & Waterfufu', description: 'Eru traditionnel du Nord-Ouest', price: 3000, is_available: true, image_url: null },
  { id: 'm5', category_id: 'c1', name: 'Koki', description: 'Gâteau de haricots traditionnel', price: 2500, is_available: false, image_url: null },
  { id: 'm6', category_id: 'c1', name: 'Brochettes Mixtes', description: 'Bœuf, poulet et saucisse', price: 4000, is_available: true, image_url: null },
  { id: 'm7', category_id: 'c2', name: 'Salade Mixte', description: 'Salade fraîche de saison', price: 2500, is_available: true, image_url: null },
  { id: 'm8', category_id: 'c2', name: 'Plantain Frit', description: 'Alloco croustillant', price: 1500, is_available: true, image_url: null },
  { id: 'm9', category_id: 'c2', name: 'Beignets (x5)', description: 'Beignets haricots maison', price: 500, is_available: true, image_url: null },
  { id: 'm10', category_id: 'c3', name: 'Bière 33 Export', description: 'Bière locale 65cl', price: 1000, is_available: true, image_url: null },
  { id: 'm11', category_id: 'c3', name: 'Coca-Cola 50cl', description: 'Coca-Cola frais', price: 500, is_available: true, image_url: null },
  { id: 'm12', category_id: 'c3', name: 'Jus Tangui', description: 'Jus de fruits local', price: 800, is_available: true, image_url: null },
  { id: 'm13', category_id: 'c3', name: 'Eau Supermont 1L', description: 'Eau minérale', price: 300, is_available: true, image_url: null },
  { id: 'm14', category_id: 'c3', name: 'Guinness 65cl', description: 'Stout premium', price: 1200, is_available: true, image_url: null },
  { id: 'm15', category_id: 'c4', name: 'Gâteau Chocolat', description: 'Moelleux au chocolat', price: 2000, is_available: true, image_url: null },
  { id: 'm16', category_id: 'c4', name: 'Crème Glacée', description: 'Vanille ou chocolat', price: 1500, is_available: true, image_url: null },
  { id: 'm17', category_id: 'c4', name: 'Salade de Fruits', description: 'Fruits frais de saison', price: 1200, is_available: false, image_url: null },
]

const demoTables = [
  { id: 't1', name: 'T1', capacity: 4, status: 'libre', zone: 'salle' },
  { id: 't2', name: 'T2', capacity: 4, status: 'occupee', zone: 'salle' },
  { id: 't3', name: 'T3', capacity: 6, status: 'libre', zone: 'salle' },
  { id: 't4', name: 'T4', capacity: 2, status: 'reservee', zone: 'salle' },
  { id: 't5', name: 'T5', capacity: 8, status: 'libre', zone: 'salle' },
  { id: 't6', name: 'T6', capacity: 4, status: 'libre', zone: 'salle' },
  { id: 'v1', name: 'VIP 1', capacity: 6, status: 'occupee', zone: 'vip' },
  { id: 'v2', name: 'VIP 2', capacity: 10, status: 'libre', zone: 'vip' },
  { id: 'te1', name: 'Ter. 1', capacity: 4, status: 'libre', zone: 'terrasse' },
  { id: 'te2', name: 'Ter. 2', capacity: 4, status: 'nettoyage', zone: 'terrasse' },
]

const tableStatusColors = {
  libre: 'border-[var(--color-success)] text-[var(--color-success)] bg-[var(--color-success)]/8',
  occupee: 'border-[var(--color-danger)] text-[var(--color-danger)] bg-[var(--color-danger)]/8',
  reservee: 'border-[var(--color-warning)] text-[var(--color-warning)] bg-[var(--color-warning)]/8',
  nettoyage: 'border-[var(--color-text-muted)] text-[var(--color-text-muted)] bg-[var(--color-text-muted)]/8',
}

const orderTypes = [
  { id: 'dine_in', label: 'Sur place', icon: UtensilsCrossed },
  { id: 'takeaway', label: 'À emporter', icon: ShoppingBag },
  { id: 'delivery', label: 'Livraison', icon: Truck },
]

const paymentMethods = [
  { id: 'cash', label: 'Espèces', icon: Banknote, color: 'var(--color-success)' },
  { id: 'orange_money', label: 'Orange Money', icon: Smartphone, color: '#FF6600' },
  { id: 'mtn_momo', label: 'MTN MoMo', icon: Wifi, color: '#FFCC00' },
  { id: 'card', label: 'Autre', icon: CreditCard, color: 'var(--color-info)' },
]

// ─── Emoji plats (fallback si pas d'image) ────────────────────────
const catEmoji = {
  c1: '🍗', c2: '🥗', c3: '🍺', c4: '🍰',
}
const itemEmoji = {
  m1: '🍗', m2: '🥬', m3: '🐟', m4: '🥘', m5: '🫘', m6: '🍢',
  m7: '🥗', m8: '🍌', m9: '🧆',
  m10: '🍺', m11: '🥤', m12: '🧃', m13: '💧', m14: '🍺',
  m15: '🍫', m16: '🍨', m17: '🍓',
}

// ─── Composant principal ──────────────────────────────────────────
export default function POSPage() {
  const { profile, signOut } = useAuth()

  // Catalogue state
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCat, setActiveCat] = useState('all')

  // Cart state
  const [cart, setCart] = useState([])
  const [orderRef] = useState(generateOrderRef)
  const [orderType, setOrderType] = useState('dine_in')
  const [selectedTable, setSelectedTable] = useState(null)
  const [notes, setNotes] = useState('')
  const [showTablePlan, setShowTablePlan] = useState(false)

  // Modal state
  const [paymentModal, setPaymentModal] = useState(null)
  const [cancelModal, setCancelModal] = useState(false)

  // ─── Filtered items ───
  const filteredItems = useMemo(() => {
    let items = demoItems
    if (activeCat !== 'all') {
      items = items.filter((i) => i.category_id === activeCat)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      items = items.filter(
        (i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      )
    }
    return items
  }, [activeCat, searchQuery])

  // ─── Cart actions ───
  function addToCart(item) {
    if (!item.is_available) return
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id)
      if (existing) {
        return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  function updateQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((c) => c.id === itemId ? { ...c, qty: c.qty + delta } : c)
        .filter((c) => c.qty > 0)
    )
  }

  function removeItem(itemId) {
    setCart((prev) => prev.filter((c) => c.id !== itemId))
  }

  function clearCart() {
    setCart([])
    setNotes('')
    setSelectedTable(null)
    setCancelModal(false)
    toast('Commande annulée', { icon: '🗑️' })
  }

  // ─── Totals ───
  const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0)
  const tva = calculateTVA(subtotal)
  const total = subtotal + tva
  const itemCount = cart.reduce((sum, c) => sum + c.qty, 0)

  // ─── Payment confirm ───
  function handlePaymentConfirm() {
    setPaymentModal(null)
    toast.success(`Paiement ${formatPrice(total)} validé !`)
    setCart([])
    setNotes('')
    setSelectedTable(null)
  }

  // ─── Time display ───
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(t)
  }, [])
  const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="h-screen flex flex-col bg-[var(--color-bg-main)] overflow-hidden select-none">
      {/* ═══ TOP BAR ═══ */}
      <div className="h-14 shrink-0 flex items-center justify-between px-5 border-b border-[var(--color-border)] bg-[var(--color-bg-sidebar)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-light)] flex items-center justify-center">
            <ShoppingBag size={14} className="text-[var(--color-bg-main)]" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">Point de Vente</p>
            <p className="text-[10px] text-[var(--color-text-muted)]">Chez Mama — Douala Akwa</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <Clock size={13} />
            <span className="font-mono text-white">{timeStr}</span>
          </div>
          <div className="h-5 w-px bg-[var(--color-border)]" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-accent)] flex items-center justify-center text-[9px] font-bold text-white">
              {profile ? getInitials(profile.full_name || 'C') : 'C'}
            </div>
            <span className="text-xs text-[var(--color-text-secondary)] hidden md:block">
              {profile?.full_name || 'Caissier'}
            </span>
          </div>
          <button
            onClick={signOut}
            className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-all"
            title="Déconnexion"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="flex-1 flex overflow-hidden">
        {/* ═══ LEFT: CATALOGUE (60%) ═══ */}
        <div className="w-[60%] flex flex-col border-r border-[var(--color-border)] overflow-hidden">
          {/* Search + Filters */}
          <div className="p-4 pb-3 space-y-3 shrink-0">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un plat..."
                className="input pl-11 pr-4 py-2.5 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {demoCats.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeCat === cat.id
                      ? 'bg-[var(--color-gold)] text-[var(--color-bg-main)] shadow-lg shadow-[var(--color-gold)]/20'
                      : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-white hover:border-[var(--color-gold)]/30'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Items grid */}
          <div className="flex-1 overflow-y-auto p-4 pt-1">
            <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => {
                  const inCart = cart.find((c) => c.id === item.id)
                  return (
                    <motion.button
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => addToCart(item)}
                      disabled={!item.is_available}
                      className={`relative text-left rounded-2xl border transition-all duration-200 overflow-hidden group ${
                        !item.is_available
                          ? 'opacity-40 cursor-not-allowed border-[var(--color-border)] bg-[var(--color-bg-card)]'
                          : 'border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-gold)]/[0.03] active:scale-[0.97]'
                      }`}
                    >
                      {/* Image / Emoji placeholder */}
                      <div className="h-24 bg-[var(--color-bg-main)] flex items-center justify-center text-3xl relative">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <span>{itemEmoji[item.id] || '🍽️'}</span>
                        )}
                        {!item.is_available && (
                          <div className="absolute inset-0 bg-[var(--color-bg-main)]/70 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-[var(--color-danger)] uppercase tracking-wider bg-[var(--color-danger)]/15 px-2 py-1 rounded-lg">
                              Rupture
                            </span>
                          </div>
                        )}
                        {inCart && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[var(--color-gold)] flex items-center justify-center text-[10px] font-bold text-[var(--color-bg-main)]"
                          >
                            {inCart.qty}
                          </motion.div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                        <p className="text-[10px] text-[var(--color-text-muted)] truncate mt-0.5">{item.description}</p>
                        <p className="text-sm font-bold text-[var(--color-gold)] mt-2">{formatPrice(item.price)}</p>
                      </div>
                    </motion.button>
                  )
                })}
              </AnimatePresence>
            </div>
            {filteredItems.length === 0 && (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <Search size={32} className="text-[var(--color-text-muted)] mb-3" />
                <p className="text-sm text-[var(--color-text-muted)]">Aucun plat trouvé</p>
              </div>
            )}
          </div>
        </div>

        {/* ═══ RIGHT: CART (40%) ═══ */}
        <div className="w-[40%] flex flex-col bg-[var(--color-bg-sidebar)] overflow-hidden">
          {/* Order header */}
          <div className="p-4 pb-3 border-b border-[var(--color-border)] shrink-0">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-white">
                Commande <span className="text-[var(--color-gold)]">{orderRef}</span>
              </h2>
              {itemCount > 0 && (
                <span className="text-[10px] font-semibold text-[var(--color-text-muted)] bg-[var(--color-bg-main)] px-2.5 py-1 rounded-lg border border-[var(--color-border)]">
                  {itemCount} article{itemCount > 1 ? 's' : ''}
                </span>
              )}
            </div>

            {/* Order type toggle */}
            <div className="flex gap-2 mb-3">
              {orderTypes.map((t) => {
                const Icon = t.icon
                return (
                  <button
                    key={t.id}
                    onClick={() => setOrderType(t.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      orderType === t.id
                        ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/30'
                        : 'bg-[var(--color-bg-main)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:text-white'
                    }`}
                  >
                    <Icon size={14} />
                    {t.label}
                  </button>
                )
              })}
            </div>

            {/* Table selector (only for dine_in) */}
            {orderType === 'dine_in' && (
              <button
                onClick={() => setShowTablePlan(true)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)] text-sm hover:border-[var(--color-gold)]/30 transition-all"
              >
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-[var(--color-gold)]" />
                  <span className={selectedTable ? 'text-white font-medium' : 'text-[var(--color-text-muted)]'}>
                    {selectedTable ? selectedTable.name : 'Sélectionner une table'}
                  </span>
                </div>
                <ChevronDown size={14} className="text-[var(--color-text-muted)]" />
              </button>
            )}
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <AnimatePresence>
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg-main)] flex items-center justify-center mb-4">
                    <ShoppingBag size={24} className="text-[var(--color-text-muted)]" />
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)]">Panier vide</p>
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-1">Cliquez sur un plat pour l'ajouter</p>
                </motion.div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)]"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-card)] flex items-center justify-center text-lg shrink-0">
                      {itemEmoji[item.id] || '🍽️'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.name}</p>
                      <p className="text-[10px] text-[var(--color-text-muted)]">{formatPrice(item.price)} / unité</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-7 h-7 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-gold)]/30 transition-all active:scale-90"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-7 text-center text-sm font-bold text-white">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-7 h-7 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-gold)]/30 transition-all active:scale-90"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-white w-20 text-right shrink-0">
                      {formatPrice(item.price * item.qty)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-all shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Notes */}
          {cart.length > 0 && (
            <div className="px-4 pb-3 shrink-0">
              <div className="relative">
                <StickyNote size={14} className="absolute left-3 top-3 text-[var(--color-text-muted)]" />
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes spéciales (allergies, cuisson...)"
                  rows={2}
                  className="input pl-9 text-xs resize-none"
                />
              </div>
            </div>
          )}

          {/* Totals + Actions */}
          <div className="border-t border-[var(--color-border)] p-4 space-y-3 shrink-0 bg-[var(--color-bg-sidebar)]">
            {/* Totals */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-[var(--color-text-secondary)]">
                <span>Sous-total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-[var(--color-text-secondary)]">
                <span>TVA ({(TVA_RATE * 100).toFixed(2)}%)</span>
                <span>{formatPrice(tva)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-1.5 border-t border-[var(--color-border)]">
                <span className="text-white">TOTAL</span>
                <span className="text-[var(--color-gold)]">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Payment buttons */}
            {cart.length > 0 && (
              <>
                <div className="grid grid-cols-4 gap-2">
                  {paymentMethods.map((pm) => {
                    const Icon = pm.icon
                    return (
                      <button
                        key={pm.id}
                        onClick={() => setPaymentModal(pm)}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)] hover:border-[var(--color-gold)]/30 transition-all active:scale-95"
                      >
                        <Icon size={18} style={{ color: pm.color }} />
                        <span className="text-[9px] font-semibold text-[var(--color-text-secondary)] text-center leading-tight">
                          {pm.label}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setCancelModal(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20 text-[var(--color-danger)] text-sm font-semibold hover:bg-[var(--color-danger)]/15 transition-all active:scale-[0.98]"
                  >
                    <X size={16} />
                    Annuler
                  </button>
                  <button
                    onClick={() => setPaymentModal(paymentMethods[0])}
                    className="flex-[2] flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--color-success)] text-white text-sm font-bold hover:bg-[var(--color-success)]/90 transition-all active:scale-[0.98] shadow-lg shadow-[var(--color-success)]/20"
                  >
                    <Printer size={16} />
                    Valider & Imprimer
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ═══ TABLE PLAN MODAL ═══ */}
      <Modal
        open={showTablePlan}
        onClose={() => setShowTablePlan(false)}
        title="Plan de salle"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4">
          {/* Légende */}
          <div className="flex items-center gap-4 text-[10px]">
            {[
              { label: 'Libre', color: 'var(--color-success)' },
              { label: 'Occupée', color: 'var(--color-danger)' },
              { label: 'Réservée', color: 'var(--color-warning)' },
              { label: 'Nettoyage', color: 'var(--color-text-muted)' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-[var(--color-text-secondary)]">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Zones */}
          {['salle', 'vip', 'terrasse'].map((zone) => {
            const tables = demoTables.filter((t) => t.zone === zone)
            const zoneLabel = zone === 'salle' ? 'Salle principale' : zone === 'vip' ? 'Zone VIP' : 'Terrasse'
            return (
              <div key={zone}>
                <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                  {zoneLabel}
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {tables.map((table) => {
                    const isAvailable = table.status === 'libre'
                    const isSelected = selectedTable?.id === table.id
                    return (
                      <button
                        key={table.id}
                        onClick={() => {
                          if (isAvailable) {
                            setSelectedTable(table)
                            setShowTablePlan(false)
                          }
                        }}
                        disabled={!isAvailable}
                        className={`relative p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                          isSelected
                            ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10'
                            : isAvailable
                            ? `${tableStatusColors[table.status]} hover:border-[var(--color-gold)]/50 active:scale-95 cursor-pointer`
                            : `${tableStatusColors[table.status]} cursor-not-allowed opacity-60`
                        }`}
                      >
                        <p className={`text-sm font-bold ${isSelected ? 'text-[var(--color-gold)]' : ''}`}>
                          {table.name}
                        </p>
                        <p className="text-[9px] text-[var(--color-text-muted)] mt-0.5">
                          <UsersIcon size={9} className="inline mr-0.5" />{table.capacity} pl.
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </Modal>

      {/* ═══ PAYMENT CONFIRM MODAL ═══ */}
      <Modal
        open={!!paymentModal}
        onClose={() => setPaymentModal(null)}
        title="Confirmer le paiement"
        maxWidth="max-w-md"
      >
        {paymentModal && (
          <div className="space-y-5">
            <div className="text-center p-6 rounded-2xl bg-[var(--color-bg-main)] border border-[var(--color-border)]">
              <paymentModal.icon
                size={36}
                style={{ color: paymentModal.color }}
                className="mx-auto mb-3"
              />
              <p className="text-sm text-[var(--color-text-muted)] mb-1">Montant à encaisser</p>
              <p className="text-3xl font-bold text-[var(--color-gold)]">{formatPrice(total)}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-2">
                via <span className="text-white font-semibold">{paymentModal.label}</span>
              </p>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[var(--color-text-secondary)]">
                <span>Commande</span>
                <span className="text-white font-medium">{orderRef}</span>
              </div>
              <div className="flex justify-between text-[var(--color-text-secondary)]">
                <span>Articles</span>
                <span className="text-white font-medium">{itemCount}</span>
              </div>
              <div className="flex justify-between text-[var(--color-text-secondary)]">
                <span>Type</span>
                <span className="text-white font-medium">
                  {orderTypes.find((t) => t.id === orderType)?.label}
                </span>
              </div>
              {selectedTable && (
                <div className="flex justify-between text-[var(--color-text-secondary)]">
                  <span>Table</span>
                  <span className="text-white font-medium">{selectedTable.name}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setPaymentModal(null)}
                className="flex-1 py-3 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)] text-sm font-semibold text-[var(--color-text-secondary)] hover:text-white transition-all active:scale-[0.98]"
              >
                Retour
              </button>
              <button
                onClick={handlePaymentConfirm}
                className="flex-[2] py-3 rounded-xl bg-[var(--color-success)] text-white text-sm font-bold hover:bg-[var(--color-success)]/90 transition-all active:scale-[0.98] shadow-lg shadow-[var(--color-success)]/20"
              >
                Confirmer {formatPrice(total)}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ═══ CANCEL CONFIRM MODAL ═══ */}
      <Modal
        open={cancelModal}
        onClose={() => setCancelModal(false)}
        title="Annuler la commande"
        maxWidth="max-w-sm"
      >
        <div className="space-y-5">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-danger)]/8 border border-[var(--color-danger)]/15">
            <AlertCircle size={20} className="text-[var(--color-danger)] shrink-0" />
            <p className="text-sm text-[var(--color-text-secondary)]">
              Êtes-vous sûr de vouloir annuler cette commande ?
              <span className="text-white font-semibold"> {itemCount} article{itemCount > 1 ? 's' : ''}</span> seront supprimés.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setCancelModal(false)}
              className="flex-1 py-3 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)] text-sm font-semibold text-[var(--color-text-secondary)] hover:text-white transition-all active:scale-[0.98]"
            >
              Non, garder
            </button>
            <button
              onClick={clearCart}
              className="flex-1 py-3 rounded-xl bg-[var(--color-danger)] text-white text-sm font-bold hover:bg-[var(--color-danger)]/90 transition-all active:scale-[0.98]"
            >
              Oui, annuler
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
