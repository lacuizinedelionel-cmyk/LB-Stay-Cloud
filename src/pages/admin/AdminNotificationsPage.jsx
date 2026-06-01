import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bell, Check, CheckCheck, Trash2, ShoppingCart, AlertTriangle,
  Star, Users, TrendingUp, Package, Calendar, MessageCircle
} from 'lucide-react'
import { formatDateTime } from '../../lib/utils'

const demoNotifications = [
  { id: 'n1', type: 'order', icon: ShoppingCart, color: 'var(--color-gold)', title: 'Nouvelle commande #CMD-3045', message: 'Marie Fotso — 13 118 FCFA (Orange Money)', time: '2026-05-31T14:32:00', read: false },
  { id: 'n2', type: 'stock', icon: AlertTriangle, color: 'var(--color-warning)', title: 'Stock faible : Coca-Cola 50cl', message: 'Il ne reste que 6 packs. Seuil minimum : 8', time: '2026-05-31T14:15:00', read: false },
  { id: 'n3', type: 'order', icon: ShoppingCart, color: 'var(--color-gold)', title: 'Commande #CMD-3044 en préparation', message: 'Paul Ndjock — Ndolé + Plantain + Coca', time: '2026-05-31T14:28:00', read: false },
  { id: 'n4', type: 'review', icon: Star, color: 'var(--color-gold)', title: 'Nouvel avis 5 étoiles', message: 'Awa Diallo : "Meilleur ndolé de Douala !"', time: '2026-05-31T13:45:00', read: true },
  { id: 'n5', type: 'loyalty', icon: Users, color: 'var(--color-accent)', title: 'Nouveau membre fidélité Gold', message: 'David Tchoupo a atteint le niveau Gold (2 100 pts)', time: '2026-05-31T12:30:00', read: true },
  { id: 'n6', type: 'report', icon: TrendingUp, color: 'var(--color-success)', title: 'Rapport quotidien disponible', message: 'CA jour : 847 500 FCFA (+12.4% vs hier)', time: '2026-05-31T08:00:00', read: true },
  { id: 'n7', type: 'stock', icon: Package, color: 'var(--color-danger)', title: 'Rupture : Barquettes aluminium', message: 'Stock critique (2 paquets restants). Commande fournisseur recommandée.', time: '2026-05-30T22:00:00', read: true },
  { id: 'n8', type: 'reservation', icon: Calendar, color: 'var(--color-info)', title: 'Nouvelle réservation', message: 'Jean Kamga — 8 pers. VIP 2, demain 20h00', time: '2026-05-30T18:00:00', read: true },
  { id: 'n9', type: 'whatsapp', icon: MessageCircle, color: 'var(--color-success)', title: 'Message WhatsApp reçu', message: 'Sophie Atangana : "Bonjour, vous faites la livraison à Bonamoussadi ?"', time: '2026-05-30T16:45:00', read: true },
  { id: 'n10', type: 'order', icon: ShoppingCart, color: 'var(--color-gold)', title: 'Commande #CMD-3039 annulée', message: 'Pierre Essomba — Annulation client (pas de paiement)', time: '2026-05-30T13:15:00', read: true },
]

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState(demoNotifications)
  const [filter, setFilter] = useState('all')

  const unreadCount = notifications.filter(n => !n.read).length
  const filtered = filter === 'all' ? notifications : filter === 'unread' ? notifications.filter(n => !n.read) : notifications.filter(n => n.type === filter)

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  function markRead(id) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  function deleteNotif(id) {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Notifications</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{unreadCount} non lue{unreadCount > 1 ? 's' : ''}</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="btn-secondary flex items-center gap-2 text-xs py-2 px-3"><CheckCheck size={13} /> Tout marquer comme lu</button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {[
          { key: 'all', label: 'Toutes' },
          { key: 'unread', label: 'Non lues' },
          { key: 'order', label: 'Commandes' },
          { key: 'stock', label: 'Stock' },
          { key: 'reservation', label: 'Réservations' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${filter === tab.key ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/30' : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-white'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="space-y-2">
        {filtered.map((notif, i) => {
          const Icon = notif.icon
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${!notif.read ? 'bg-[var(--color-gold)]/[0.03] border-[var(--color-gold)]/20' : 'bg-[var(--color-bg-card)] border-[var(--color-border)] hover:bg-white/[0.02]'}`}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `color-mix(in srgb, ${notif.color} 12%, transparent)` }}>
                <Icon size={18} style={{ color: notif.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className={`text-sm font-semibold ${!notif.read ? 'text-white' : 'text-[var(--color-text-secondary)]'}`}>{notif.title}</p>
                  {!notif.read && <div className="w-2 h-2 rounded-full bg-[var(--color-gold)] animate-pulse-dot shrink-0" />}
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mb-1">{notif.message}</p>
                <p className="text-[10px] text-[var(--color-text-muted)]">{formatDateTime(notif.time)}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {!notif.read && (
                  <button onClick={() => markRead(notif.id)} className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-success)] hover:bg-[var(--color-success)]/10 transition-all" title="Marquer comme lu"><Check size={14} /></button>
                )}
                <button onClick={() => deleteNotif(notif.id)} className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-all" title="Supprimer"><Trash2 size={14} /></button>
              </div>
            </motion.div>
          )
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Bell size={32} className="text-[var(--color-text-muted)] mb-3" />
            <p className="text-sm text-[var(--color-text-muted)]">Aucune notification</p>
          </div>
        )}
      </div>
    </div>
  )
}
