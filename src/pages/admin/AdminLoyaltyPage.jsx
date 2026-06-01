import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Heart, Star, Gift, Users, TrendingUp, Crown, Award,
  Plus, Search, Eye, Phone, ShoppingCart
} from 'lucide-react'
import { formatPrice, getInitials } from '../../lib/utils'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'

const tiers = [
  { id: 'bronze', label: 'Bronze', color: '#CD7F32', minPoints: 0, discount: 5, icon: Award },
  { id: 'silver', label: 'Argent', color: '#C0C0C0', minPoints: 500, discount: 10, icon: Star },
  { id: 'gold', label: 'Or', color: '#F5A623', minPoints: 1500, discount: 15, icon: Crown },
  { id: 'platinum', label: 'Platine', color: '#6C63FF', minPoints: 5000, discount: 20, icon: Gift },
]

const demoMembers = [
  { id: 'cl1', name: 'Marie Fotso', phone: '+237 6 99 12 34 56', tier: 'gold', points: 2840, visits: 86, total_spent: 1245000, last_visit: '2026-05-30', rewards_used: 4 },
  { id: 'cl2', name: 'Paul Ndjock', phone: '+237 6 77 88 99 00', tier: 'silver', points: 1120, visits: 42, total_spent: 620000, last_visit: '2026-05-29', rewards_used: 2 },
  { id: 'cl3', name: 'Awa Diallo', phone: '+237 6 55 44 33 22', tier: 'gold', points: 3450, visits: 124, total_spent: 2100000, last_visit: '2026-05-31', rewards_used: 7 },
  { id: 'cl4', name: 'Jean Kamga', phone: '+237 6 90 11 22 33', tier: 'platinum', points: 6200, visits: 210, total_spent: 4500000, last_visit: '2026-05-31', rewards_used: 12 },
  { id: 'cl5', name: 'Fatou Mbaye', phone: '+237 6 78 56 34 12', tier: 'bronze', points: 280, visits: 15, total_spent: 185000, last_visit: '2026-05-25', rewards_used: 0 },
  { id: 'cl6', name: 'Sophie Atangana', phone: '+237 6 80 12 45 67', tier: 'silver', points: 890, visits: 38, total_spent: 540000, last_visit: '2026-05-28', rewards_used: 1 },
  { id: 'cl7', name: 'David Tchoupo', phone: '+237 6 22 33 44 55', tier: 'gold', points: 2100, visits: 76, total_spent: 980000, last_visit: '2026-05-30', rewards_used: 3 },
  { id: 'cl8', name: 'Pierre Essomba', phone: '+237 6 99 88 77 66', tier: 'bronze', points: 420, visits: 22, total_spent: 310000, last_visit: '2026-05-27', rewards_used: 1 },
]

const rewards = [
  { id: 'r1', name: 'Boisson offerte', cost: 200, type: 'product', uses: 124 },
  { id: 'r2', name: '-10% sur la prochaine commande', cost: 500, type: 'discount', uses: 87 },
  { id: 'r3', name: 'Dessert gratuit', cost: 350, type: 'product', uses: 56 },
  { id: 'r4', name: '-20% spécial fidélité', cost: 1000, type: 'discount', uses: 34 },
  { id: 'r5', name: 'Menu complet offert', cost: 2000, type: 'product', uses: 12 },
]

const kpis = [
  { icon: Users, label: 'Membres fidélité', value: '847', change: '+23 ce mois', color: 'var(--color-gold)' },
  { icon: Heart, label: 'Taux de rétention', value: '78%', change: '+3.2%', color: 'var(--color-danger)' },
  { icon: ShoppingCart, label: 'Panier moyen fidèles', value: formatPrice(12400), change: '+18% vs non-fidèles', color: 'var(--color-success)' },
  { icon: Gift, label: 'Récompenses utilisées', value: '156', change: 'ce mois', color: 'var(--color-accent)' },
]

export default function AdminLoyaltyPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTier, setFilterTier] = useState('all')
  const [selectedMember, setSelectedMember] = useState(null)

  const filtered = demoMembers.filter(m => {
    if (filterTier !== 'all' && m.tier !== filterTier) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return m.name.toLowerCase().includes(q) || m.phone.includes(q)
    }
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Programme Fidélité</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Gérez vos clients fidèles et récompenses</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-sm py-2.5 px-5"><Plus size={15} /> Nouvelle récompense</button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-5">
            <div className="p-2.5 rounded-xl w-fit mb-3" style={{ background: `color-mix(in srgb, ${kpi.color} 12%, transparent)` }}>
              <kpi.icon size={18} style={{ color: kpi.color }} />
            </div>
            <p className="text-xl font-bold text-white mb-0.5">{kpi.value}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">{kpi.label}</p>
            <p className="text-[10px] text-[var(--color-success)] mt-1 font-semibold">{kpi.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Tiers */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card p-6">
        <h3 className="text-base font-bold text-white mb-4">Niveaux de fidélité</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map(tier => {
            const Icon = tier.icon
            const count = demoMembers.filter(m => m.tier === tier.id).length
            return (
              <div key={tier.id} className="bg-[var(--color-bg-main)] rounded-xl p-4 border border-[var(--color-border)] text-center">
                <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ background: `color-mix(in srgb, ${tier.color} 15%, transparent)` }}>
                  <Icon size={18} style={{ color: tier.color }} />
                </div>
                <p className="text-sm font-bold" style={{ color: tier.color }}>{tier.label}</p>
                <p className="text-[10px] text-[var(--color-text-muted)] mt-1">{tier.minPoints}+ pts · -{tier.discount}%</p>
                <p className="text-xs font-semibold text-white mt-2">{count} membres</p>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Rewards catalog */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="glass-card p-6">
        <h3 className="text-base font-bold text-white mb-4">Catalogue de récompenses</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {rewards.map(r => (
            <div key={r.id} className="bg-[var(--color-bg-main)] rounded-xl p-4 border border-[var(--color-border)] text-center">
              <Gift size={20} className="text-[var(--color-gold)] mx-auto mb-2" />
              <p className="text-xs font-semibold text-white mb-1">{r.name}</p>
              <p className="text-sm font-bold text-[var(--color-gold)]">{r.cost} pts</p>
              <p className="text-[9px] text-[var(--color-text-muted)] mt-1">{r.uses} utilisations</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Members */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="glass-card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
          <h3 className="text-base font-bold text-white">Membres ({filtered.length})</h3>
          <div className="flex gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Rechercher..." className="input pl-9 text-sm py-2 w-48" />
            </div>
            <select value={filterTier} onChange={e => setFilterTier(e.target.value)} className="input text-sm py-2 w-36 appearance-none cursor-pointer">
              <option value="all">Tous niveaux</option>
              {tiers.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
                <th className="pb-3 font-medium">Client</th>
                <th className="pb-3 font-medium">Niveau</th>
                <th className="pb-3 font-medium">Points</th>
                <th className="pb-3 font-medium">Visites</th>
                <th className="pb-3 font-medium">Total dépensé</th>
                <th className="pb-3 font-medium">Dernière visite</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(member => {
                const tier = tiers.find(t => t.id === member.tier)
                return (
                  <tr key={member.id} onClick={() => setSelectedMember(member)} className="border-t border-[var(--color-border)] hover:bg-white/[0.02] transition-colors cursor-pointer">
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-accent)] flex items-center justify-center text-[9px] font-bold text-white">{getInitials(member.name)}</div>
                        <div>
                          <p className="text-sm font-medium text-white">{member.name}</p>
                          <p className="text-[10px] text-[var(--color-text-muted)]">{member.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3"><span className="text-xs font-semibold px-2 py-1 rounded-lg" style={{ color: tier.color, background: `color-mix(in srgb, ${tier.color} 12%, transparent)` }}>{tier.label}</span></td>
                    <td className="py-3 text-white font-semibold">{member.points.toLocaleString('fr-FR')}</td>
                    <td className="py-3 text-[var(--color-text-secondary)]">{member.visits}</td>
                    <td className="py-3 text-white font-semibold">{formatPrice(member.total_spent)}</td>
                    <td className="py-3 text-[var(--color-text-muted)] text-xs">{member.last_visit}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Member detail */}
      <Modal open={!!selectedMember} onClose={() => setSelectedMember(null)} title={selectedMember?.name} maxWidth="max-w-md">
        {selectedMember && (() => {
          const tier = tiers.find(t => t.id === selectedMember.tier)
          return (
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-[var(--color-border)]">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-accent)] flex items-center justify-center text-sm font-bold text-white">{getInitials(selectedMember.name)}</div>
                <div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ color: tier.color, background: `color-mix(in srgb, ${tier.color} 12%, transparent)` }}>{tier.label}</span>
                  <p className="text-lg font-bold text-[var(--color-gold)] mt-1">{selectedMember.points.toLocaleString('fr-FR')} points</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[var(--color-bg-main)] rounded-xl p-3 text-center border border-[var(--color-border)]">
                  <p className="text-[9px] text-[var(--color-text-muted)]">Visites</p>
                  <p className="text-base font-bold text-white">{selectedMember.visits}</p>
                </div>
                <div className="bg-[var(--color-bg-main)] rounded-xl p-3 text-center border border-[var(--color-border)]">
                  <p className="text-[9px] text-[var(--color-text-muted)]">Total dépensé</p>
                  <p className="text-base font-bold text-[var(--color-gold)]">{formatPrice(selectedMember.total_spent)}</p>
                </div>
                <div className="bg-[var(--color-bg-main)] rounded-xl p-3 text-center border border-[var(--color-border)]">
                  <p className="text-[9px] text-[var(--color-text-muted)]">Récompenses</p>
                  <p className="text-base font-bold text-[var(--color-success)]">{selectedMember.rewards_used}</p>
                </div>
              </div>
              <button onClick={() => setSelectedMember(null)} className="btn-secondary w-full py-3 text-sm">Fermer</button>
            </div>
          )
        })()}
      </Modal>
    </div>
  )
}
