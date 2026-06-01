import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Percent, Plus, Tag, Clock, Calendar, Users, TrendingUp,
  Zap, Gift, Copy, Pencil, Trash2, Eye, Check, X, ToggleLeft
} from 'lucide-react'
import { formatPrice, formatDate } from '../../lib/utils'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import toast from 'react-hot-toast'

const demoPromos = [
  { id: 'p1', name: 'Happy Hour -30%', code: 'HAPPY30', type: 'percent', value: 30, min_order: 5000, max_uses: 500, used: 234, start: '2026-05-01', end: '2026-06-30', status: 'active', target: 'all', description: 'Tous les jours de 15h à 18h', conditions: 'Hors boissons alcoolisées' },
  { id: 'p2', name: 'Nouveau client -20%', code: 'BIENVENUE20', type: 'percent', value: 20, min_order: 3000, max_uses: 1000, used: 156, start: '2026-01-01', end: '2026-12-31', status: 'active', target: 'new', description: 'Première commande uniquement', conditions: 'Non cumulable' },
  { id: 'p3', name: 'Livraison gratuite', code: 'LIVFREE', type: 'fixed', value: 2000, min_order: 8000, max_uses: 300, used: 89, start: '2026-05-15', end: '2026-06-15', status: 'active', target: 'all', description: 'Frais de livraison offerts', conditions: 'Min. 8 000 FCFA de commande' },
  { id: 'p4', name: 'Poulet DG x2 = -25%', code: 'DG25', type: 'percent', value: 25, min_order: 9000, max_uses: 200, used: 67, start: '2026-05-20', end: '2026-06-20', status: 'active', target: 'all', description: '2 Poulets DG commandés, -25% sur le 2ème', conditions: 'Valide sur place et à emporter' },
  { id: 'p5', name: 'Weekend spécial -15%', code: 'WEEKEND15', type: 'percent', value: 15, min_order: 4000, max_uses: 400, used: 312, start: '2026-04-01', end: '2026-05-31', status: 'expiring', target: 'all', description: 'Samedi et dimanche uniquement', conditions: '' },
  { id: 'p6', name: 'Fidélité Gold -10%', code: 'GOLD10', type: 'percent', value: 10, min_order: 0, max_uses: -1, used: 445, start: '2026-01-01', end: '2026-12-31', status: 'active', target: 'vip', description: 'Réduction permanente pour membres Gold+', conditions: 'Cumulable avec Happy Hour' },
  { id: 'p7', name: 'Flash 50% midi', code: 'FLASH50', type: 'percent', value: 50, min_order: 6000, max_uses: 50, used: 50, start: '2026-05-25', end: '2026-05-25', status: 'expired', target: 'all', description: 'Vente flash du 25 mai, midi uniquement', conditions: '50 premiers clients' },
  { id: 'p8', name: 'Dessert offert', code: 'SWEETFREE', type: 'product', value: 0, min_order: 10000, max_uses: 150, used: 43, start: '2026-06-01', end: '2026-06-30', status: 'scheduled', target: 'all', description: 'Un dessert au choix offert', conditions: 'Commande min. 10 000 FCFA' },
]

const statusColors = {
  active: { label: 'Active', variant: 'success' },
  expiring: { label: 'Expire bientôt', variant: 'warning' },
  expired: { label: 'Expirée', variant: 'danger' },
  scheduled: { label: 'Planifiée', variant: 'info' },
  paused: { label: 'En pause', variant: 'accent' },
}

const kpis = [
  { icon: Percent, label: 'Promos actives', value: '5', color: 'var(--color-gold)' },
  { icon: Users, label: 'Utilisations ce mois', value: '1 346', color: 'var(--color-success)' },
  { icon: TrendingUp, label: 'CA généré par promos', value: formatPrice(4800000), color: 'var(--color-accent)' },
  { icon: Zap, label: 'Taux conversion', value: '34%', color: 'var(--color-info)' },
]

export default function AdminPromotionsPage() {
  const [filterStatus, setFilterStatus] = useState('all')
  const [addModal, setAddModal] = useState(false)
  const [selectedPromo, setSelectedPromo] = useState(null)

  const filtered = filterStatus === 'all' ? demoPromos : demoPromos.filter(p => p.status === filterStatus)

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Promotions</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Codes promo, remises et campagnes marketing</p>
        </div>
        <button onClick={() => setAddModal(true)} className="btn-primary flex items-center gap-2 text-sm py-2.5 px-5"><Plus size={15} /> Créer une promo</button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-5">
            <div className="p-2.5 rounded-xl w-fit mb-3" style={{ background: `color-mix(in srgb, ${kpi.color} 12%, transparent)` }}>
              <kpi.icon size={18} style={{ color: kpi.color }} />
            </div>
            <p className="text-xl font-bold text-white">{kpi.value}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {[{ key: 'all', label: 'Toutes' }, ...Object.entries(statusColors).map(([k, v]) => ({ key: k, label: v.label }))].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key)}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${filterStatus === tab.key ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/30' : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-white'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Promo cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((promo, i) => {
          const status = statusColors[promo.status]
          const usagePercent = promo.max_uses > 0 ? Math.round((promo.used / promo.max_uses) * 100) : null
          return (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedPromo(promo)}
              className="glass-card p-5 hover:border-[var(--color-border-active)] transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center">
                    {promo.type === 'percent' ? <Percent size={18} className="text-[var(--color-gold)]" /> : promo.type === 'fixed' ? <Tag size={18} className="text-[var(--color-gold)]" /> : <Gift size={18} className="text-[var(--color-gold)]" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{promo.name}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">{promo.description}</p>
                  </div>
                </div>
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>

              {/* Code */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 bg-[var(--color-bg-main)] border border-dashed border-[var(--color-gold)]/30 rounded-lg px-3 py-2 text-center">
                  <p className="text-sm font-mono font-bold text-[var(--color-gold)] tracking-wider">{promo.code}</p>
                </div>
                <button onClick={e => { e.stopPropagation(); navigator.clipboard.writeText(promo.code); toast.success('Code copié !') }} className="p-2 rounded-lg bg-[var(--color-bg-main)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-all">
                  <Copy size={14} />
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-[10px] text-[var(--color-text-muted)] mb-2">
                <span>{promo.type === 'percent' ? `-${promo.value}%` : promo.type === 'fixed' ? `-${formatPrice(promo.value)}` : 'Produit offert'}</span>
                <span>{promo.used} utilisations{promo.max_uses > 0 ? ` / ${promo.max_uses}` : ''}</span>
              </div>

              {/* Usage bar */}
              {usagePercent !== null && (
                <div className="w-full h-1.5 rounded-full bg-[var(--color-bg-main)] overflow-hidden">
                  <div className={`h-full rounded-full ${usagePercent >= 90 ? 'bg-[var(--color-danger)]' : usagePercent >= 70 ? 'bg-[var(--color-warning)]' : 'bg-[var(--color-gold)]'}`} style={{ width: `${Math.min(usagePercent, 100)}%` }} />
                </div>
              )}

              {/* Dates */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-border)] text-[10px] text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1"><Calendar size={9} /> {promo.start} → {promo.end}</span>
                <span className="flex items-center gap-1"><Users size={9} /> {promo.target === 'all' ? 'Tous' : promo.target === 'new' ? 'Nouveaux' : 'VIP'}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Promo detail modal */}
      <Modal open={!!selectedPromo} onClose={() => setSelectedPromo(null)} title={selectedPromo?.name} maxWidth="max-w-md">
        {selectedPromo && (
          <div className="space-y-4">
            <div className="bg-[var(--color-bg-main)] border border-dashed border-[var(--color-gold)]/30 rounded-xl p-4 text-center">
              <p className="text-2xl font-mono font-bold text-[var(--color-gold)] tracking-widest">{selectedPromo.code}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                {selectedPromo.type === 'percent' ? `-${selectedPromo.value}%` : selectedPromo.type === 'fixed' ? `-${formatPrice(selectedPromo.value)}` : 'Produit gratuit'}
                {selectedPromo.min_order > 0 ? ` · Min. ${formatPrice(selectedPromo.min_order)}` : ''}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[var(--color-bg-main)] rounded-xl p-3 text-center border border-[var(--color-border)]">
                <p className="text-[9px] text-[var(--color-text-muted)]">Utilisations</p>
                <p className="text-base font-bold text-white">{selectedPromo.used}{selectedPromo.max_uses > 0 ? ` / ${selectedPromo.max_uses}` : ''}</p>
              </div>
              <div className="bg-[var(--color-bg-main)] rounded-xl p-3 text-center border border-[var(--color-border)]">
                <p className="text-[9px] text-[var(--color-text-muted)]">Période</p>
                <p className="text-xs font-bold text-white">{selectedPromo.start}<br />{selectedPromo.end}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <p><span className="text-[var(--color-text-muted)]">Description:</span> {selectedPromo.description}</p>
              {selectedPromo.conditions && <p><span className="text-[var(--color-text-muted)]">Conditions:</span> {selectedPromo.conditions}</p>}
              <p><span className="text-[var(--color-text-muted)]">Cible:</span> {selectedPromo.target === 'all' ? 'Tous les clients' : selectedPromo.target === 'new' ? 'Nouveaux clients' : 'Membres VIP'}</p>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setSelectedPromo(null)} className="btn-secondary flex-1 py-3 text-sm">Fermer</button>
              <button onClick={() => { toast.success('Promo dupliquée !'); setSelectedPromo(null) }} className="btn-primary flex-1 py-3 text-sm flex items-center justify-center gap-2"><Copy size={14} /> Dupliquer</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add promo modal */}
      <Modal open={addModal} onClose={() => setAddModal(false)} title="Créer une promotion" maxWidth="max-w-lg">
        <form onSubmit={e => { e.preventDefault(); toast.success('Promotion créée !'); setAddModal(false) }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Nom de la promo</label>
              <input type="text" placeholder="Ex: Flash -40%" required className="input text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Code promo</label>
              <input type="text" placeholder="Ex: FLASH40" required className="input text-sm uppercase" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Type</label>
              <select required className="input text-sm appearance-none cursor-pointer">
                <option value="percent">Pourcentage (%)</option>
                <option value="fixed">Montant fixe</option>
                <option value="product">Produit offert</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Valeur</label>
              <input type="number" min="0" placeholder="30" required className="input text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Min. commande</label>
              <input type="number" min="0" placeholder="5000" className="input text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Début</label>
              <input type="date" required className="input text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Fin</label>
              <input type="date" required className="input text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Limite utilisations</label>
              <input type="number" min="0" placeholder="500 (0 = illimité)" className="input text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Cible</label>
            <select className="input text-sm appearance-none cursor-pointer">
              <option value="all">Tous les clients</option>
              <option value="new">Nouveaux clients uniquement</option>
              <option value="vip">Membres fidélité VIP</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setAddModal(false)} className="btn-secondary flex-1 py-3 text-sm">Annuler</button>
            <button type="submit" className="btn-primary flex-[2] py-3 text-sm flex items-center justify-center gap-2"><Zap size={14} /> Créer la promo</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
