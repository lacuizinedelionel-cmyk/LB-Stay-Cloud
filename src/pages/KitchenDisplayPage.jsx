import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock, Check, ChefHat, Flame, Bell, LogOut, RefreshCw,
  Timer, UtensilsCrossed, AlertCircle
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const demoOrders = [
  { id: 'CMD-3045', time: '14:32', type: 'dine_in', table: 'T3', items: [{ name: 'Poulet DG', qty: 2, notes: '' }, { name: 'Bière 33 Export', qty: 2, notes: 'bien fraîche' }], status: 'new', elapsed: 0 },
  { id: 'CMD-3044', time: '14:28', type: 'takeaway', table: null, items: [{ name: 'Ndolé Complet', qty: 1, notes: 'sans piment' }, { name: 'Plantain Frit', qty: 2, notes: '' }, { name: 'Coca-Cola 50cl', qty: 1, notes: '' }], status: 'cooking', elapsed: 4 },
  { id: 'CMD-3043', time: '14:15', type: 'delivery', table: null, items: [{ name: 'Poisson Braisé', qty: 1, notes: 'bien grillé' }, { name: 'Brochettes Mixtes', qty: 2, notes: '' }, { name: 'Jus Tangui', qty: 3, notes: '' }], status: 'cooking', elapsed: 17 },
  { id: 'CMD-3042', time: '13:55', type: 'dine_in', table: 'VIP 1', items: [{ name: 'Eru & Waterfufu', qty: 2, notes: '' }, { name: 'Guinness 65cl', qty: 2, notes: '' }], status: 'ready', elapsed: 37 },
  { id: 'CMD-3041', time: '13:48', type: 'dine_in', table: 'T5', items: [{ name: 'Salade Mixte', qty: 1, notes: 'vinaigrette à part' }, { name: 'Gâteau Chocolat', qty: 1, notes: '' }, { name: 'Eau Supermont', qty: 2, notes: '' }], status: 'new', elapsed: 2 },
  { id: 'CMD-3040', time: '13:30', type: 'takeaway', table: null, items: [{ name: 'Koki', qty: 3, notes: '' }, { name: 'Beignets (x5)', qty: 2, notes: '' }], status: 'cooking', elapsed: 22 },
]

const statusConfig = {
  new: { label: 'Nouvelle', color: 'var(--color-info)', bg: 'bg-[var(--color-info)]/10 border-[var(--color-info)]/30' },
  cooking: { label: 'En cours', color: 'var(--color-warning)', bg: 'bg-[var(--color-warning)]/10 border-[var(--color-warning)]/30' },
  ready: { label: 'Prête', color: 'var(--color-success)', bg: 'bg-[var(--color-success)]/10 border-[var(--color-success)]/30' },
}

const typeLabels = { dine_in: 'Sur place', takeaway: 'Emporter', delivery: 'Livraison' }
const typeColors = { dine_in: 'var(--color-gold)', takeaway: 'var(--color-accent)', delivery: 'var(--color-info)' }

export default function KitchenDisplayPage() {
  const { signOut } = useAuth()
  const [orders, setOrders] = useState(demoOrders)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  function advanceStatus(orderId) {
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o
      if (o.status === 'new') return { ...o, status: 'cooking' }
      if (o.status === 'cooking') return { ...o, status: 'ready' }
      return o
    }))
  }

  function completeOrder(orderId) {
    setOrders(prev => prev.filter(o => o.id !== orderId))
  }

  const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const columns = {
    new: orders.filter(o => o.status === 'new'),
    cooking: orders.filter(o => o.status === 'cooking'),
    ready: orders.filter(o => o.status === 'ready'),
  }

  return (
    <div className="h-screen flex flex-col bg-[var(--color-bg-main)] overflow-hidden select-none">
      {/* Top bar */}
      <div className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-[var(--color-border)] bg-[var(--color-bg-sidebar)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-warning)] to-[var(--color-gold)] flex items-center justify-center">
            <ChefHat size={14} className="text-[var(--color-bg-main)]" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">Écran Cuisine (KDS)</p>
            <p className="text-[10px] text-[var(--color-text-muted)]">Chez Mama — Douala Akwa</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <Clock size={13} />
            <span className="font-mono text-white text-sm">{timeStr}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-bg-main)] border border-[var(--color-border)]">
            <Flame size={12} className="text-[var(--color-warning)]" />
            <span className="text-xs font-semibold text-white">{orders.length}</span>
            <span className="text-[10px] text-[var(--color-text-muted)]">en cours</span>
          </div>
          <button onClick={signOut} className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-all" title="Déconnexion">
            <LogOut size={15} />
          </button>
        </div>
      </div>

      {/* Kanban columns */}
      <div className="flex-1 flex overflow-hidden p-4 gap-4">
        {Object.entries(columns).map(([status, columnOrders]) => {
          const config = statusConfig[status]
          return (
            <div key={status} className="flex-1 flex flex-col min-w-0">
              {/* Column header */}
              <div className={`flex items-center justify-between px-4 py-3 rounded-t-xl border ${config.bg}`}>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full animate-pulse-dot" style={{ backgroundColor: config.color }} />
                  <span className="text-sm font-bold" style={{ color: config.color }}>{config.label}</span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-[var(--color-bg-main)]" style={{ color: config.color }}>{columnOrders.length}</span>
              </div>

              {/* Cards */}
              <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-[var(--color-bg-card)]/30 rounded-b-xl border-x border-b border-[var(--color-border)]">
                <AnimatePresence>
                  {columnOrders.map(order => (
                    <motion.div
                      key={order.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`glass-card p-4 ${order.elapsed > 20 && status !== 'ready' ? 'border-[var(--color-danger)]/40' : ''}`}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{order.id}</span>
                          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-md" style={{ color: typeColors[order.type], background: `color-mix(in srgb, ${typeColors[order.type]} 12%, transparent)` }}>
                            {typeLabels[order.type]}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Timer size={11} className={order.elapsed > 20 && status !== 'ready' ? 'text-[var(--color-danger)]' : 'text-[var(--color-text-muted)]'} />
                          <span className={`text-xs font-mono font-semibold ${order.elapsed > 20 && status !== 'ready' ? 'text-[var(--color-danger)]' : 'text-[var(--color-text-muted)]'}`}>{order.elapsed}min</span>
                        </div>
                      </div>

                      {/* Table */}
                      {order.table && (
                        <div className="text-[10px] font-semibold text-[var(--color-gold)] mb-2">Table: {order.table}</div>
                      )}

                      {/* Items */}
                      <div className="space-y-1.5 mb-3">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-xs font-bold text-white bg-[var(--color-bg-main)] w-5 h-5 rounded-md flex items-center justify-center shrink-0">{item.qty}</span>
                            <div>
                              <p className="text-xs font-medium text-white">{item.name}</p>
                              {item.notes && <p className="text-[10px] text-[var(--color-warning)] italic">{item.notes}</p>}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Action */}
                      {status === 'ready' ? (
                        <button onClick={() => completeOrder(order.id)} className="w-full py-2.5 rounded-xl bg-[var(--color-success)] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[var(--color-success)]/90 transition-all active:scale-[0.97]">
                          <Check size={14} /> Servie / Récupérée
                        </button>
                      ) : (
                        <button onClick={() => advanceStatus(order.id)} className="w-full py-2.5 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)] text-xs font-semibold text-white flex items-center justify-center gap-2 hover:border-[var(--color-gold)]/40 transition-all active:scale-[0.97]">
                          {status === 'new' ? <><Flame size={13} className="text-[var(--color-warning)]" /> Commencer</> : <><Bell size={13} className="text-[var(--color-success)]" /> Prête</>}
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {columnOrders.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center opacity-50">
                    <UtensilsCrossed size={24} className="text-[var(--color-text-muted)] mb-2" />
                    <p className="text-xs text-[var(--color-text-muted)]">Aucune commande</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
