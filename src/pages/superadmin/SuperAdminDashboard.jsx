import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2, DollarSign, ArrowRightLeft, UserPlus, TrendingUp, TrendingDown,
  Search, Filter, Plus, MoreHorizontal, ChevronDown, ChevronLeft, ChevronRight,
  Download, Eye, Pencil, Trash2, X, Check, AlertCircle
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatPrice } from '../../lib/utils'
import { SECTORS, SECTOR_LIST, DEMO_BUSINESSES, CAMEROON_CITIES } from '../../lib/sectors'
import { PLANS } from '../../lib/constants'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import toast from 'react-hot-toast'

const kpis = [
  { icon: Building2, label: 'Enseignes actives', value: '47', change: 6.2, color: 'var(--color-gold)' },
  { icon: DollarSign, label: 'CA plateforme ce mois', value: formatPrice(12450000), change: 14.8, color: 'var(--color-success)' },
  { icon: ArrowRightLeft, label: "Transactions aujourd'hui", value: '2 847', change: 8.3, color: 'var(--color-accent)' },
  { icon: UserPlus, label: 'Nouveaux inscrits ce mois', value: '12', change: -2.1, color: 'var(--color-info)' },
]

const caData = [
  { mois: 'Juin', ca: 8200000 },
  { mois: 'Juil', ca: 8900000 },
  { mois: 'Août', ca: 9400000 },
  { mois: 'Sept', ca: 9100000 },
  { mois: 'Oct', ca: 10200000 },
  { mois: 'Nov', ca: 10800000 },
  { mois: 'Déc', ca: 11500000 },
  { mois: 'Jan', ca: 10300000 },
  { mois: 'Fév', ca: 10900000 },
  { mois: 'Mar', ca: 11400000 },
  { mois: 'Avr', ca: 12100000 },
  { mois: 'Mai', ca: 12450000 },
]

function KpiCard({ kpi, delay }) {
  const isPositive = kpi.change >= 0
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card p-6 group cursor-default hover:border-[var(--color-border-active)] transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl transition-colors" style={{ background: `color-mix(in srgb, ${kpi.color} 12%, transparent)` }}>
          <kpi.icon size={22} style={{ color: kpi.color }} />
        </div>
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${isPositive ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]'}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isPositive ? '+' : ''}{kpi.change}%
        </div>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{kpi.value}</p>
      <p className="text-sm text-[var(--color-text-secondary)]">{kpi.label}</p>
    </motion.div>
  )
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card px-4 py-3">
      <p className="text-[10px] text-[var(--color-text-muted)] mb-1">{label}</p>
      <p className="text-sm font-bold text-[var(--color-gold)]">{formatPrice(payload[0].value)}</p>
    </div>
  )
}

export default function SuperAdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterSector, setFilterSector] = useState('all')
  const [filterCity, setFilterCity] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [addModal, setAddModal] = useState(false)
  const perPage = 8

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  const filteredBusinesses = useMemo(() => {
    let list = [...DEMO_BUSINESSES]
    if (filterSector !== 'all') list = list.filter((b) => b.sector === filterSector)
    if (filterCity !== 'all') list = list.filter((b) => b.city === filterCity)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter((b) => b.name.toLowerCase().includes(q) || b.city.toLowerCase().includes(q))
    }
    return list
  }, [filterSector, filterCity, searchQuery])

  const totalPages = Math.ceil(filteredBusinesses.length / perPage)
  const paginatedBiz = filteredBusinesses.slice((currentPage - 1) * perPage, currentPage * perPage)

  const uniqueCities = [...new Set(DEMO_BUSINESSES.map((b) => b.city))].sort()

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card p-6 space-y-3">
              <div className="skeleton w-12 h-12 rounded-xl" />
              <div className="skeleton h-7 w-28" />
              <div className="skeleton h-4 w-20" />
            </div>
          ))}
        </div>
        <div className="glass-card p-6"><div className="skeleton h-64 w-full rounded-xl" /></div>
        <div className="glass-card p-6"><div className="skeleton h-48 w-full rounded-xl" /></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, i) => <KpiCard key={kpi.label} kpi={kpi} delay={i * 0.1} />)}
      </div>

      {/* Graphique CA 12 mois */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">CA Plateforme</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">Évolution sur 12 mois</p>
          </div>
          <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-main)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">12 mois</span>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={caData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="mois" stroke="#6B6B80" tick={{ fontSize: 11 }} />
            <YAxis stroke="#6B6B80" tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
            <Tooltip content={<ChartTooltip />} />
            <Line type="monotone" dataKey="ca" stroke="#F5A623" strokeWidth={3} dot={{ r: 4, fill: '#F5A623', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#FFD700' }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Tableau enseignes */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Toutes les enseignes</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">{filteredBusinesses.length} enseigne{filteredBusinesses.length > 1 ? 's' : ''}</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }} placeholder="Rechercher..." className="input pl-9 pr-4 py-2 text-sm w-48" />
            </div>
            <select value={filterSector} onChange={(e) => { setFilterSector(e.target.value); setCurrentPage(1) }} className="input text-sm py-2 w-44 appearance-none cursor-pointer">
              <option value="all">Tous les secteurs</option>
              {SECTOR_LIST.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
            <select value={filterCity} onChange={(e) => { setFilterCity(e.target.value); setCurrentPage(1) }} className="input text-sm py-2 w-36 appearance-none cursor-pointer">
              <option value="all">Toutes les villes</option>
              {uniqueCities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <button onClick={() => toast.success('Export CSV en cours...')} className="btn-secondary flex items-center gap-2 text-xs py-2 px-3">
              <Download size={13} /> Export
            </button>
            <button onClick={() => setAddModal(true)} className="btn-primary flex items-center gap-2 text-xs py-2 px-4">
              <Plus size={14} /> Ajouter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
                <th className="pb-4 font-medium">Enseigne</th>
                <th className="pb-4 font-medium">Secteur</th>
                <th className="pb-4 font-medium">Ville</th>
                <th className="pb-4 font-medium">Plan</th>
                <th className="pb-4 font-medium">CA ce mois</th>
                <th className="pb-4 font-medium">Statut</th>
                <th className="pb-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBiz.map((biz, i) => {
                const sector = SECTORS[biz.sector]
                const SectorIcon = sector?.icon
                const plan = PLANS[biz.plan]
                return (
                  <motion.tr
                    key={biz.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 * i }}
                    className="border-t border-[var(--color-border)] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base" style={{ background: `color-mix(in srgb, ${sector?.color || '#F5A623'} 12%, transparent)` }}>
                          {sector?.emoji}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{biz.name}</p>
                          <p className="text-[10px] text-[var(--color-text-muted)]">{biz.branches} branche{biz.branches > 1 ? 's' : ''}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-lg" style={{ background: `color-mix(in srgb, ${sector?.color} 10%, transparent)`, color: sector?.color }}>
                        {sector?.label}
                      </span>
                    </td>
                    <td className="py-4 text-[var(--color-text-secondary)]">{biz.city}</td>
                    <td className="py-4">
                      <span className="text-xs font-semibold" style={{ color: plan?.color }}>{plan?.label}</span>
                    </td>
                    <td className="py-4 text-white font-semibold">{formatPrice(biz.ca_month)}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${biz.status === 'active' ? 'bg-[var(--color-success)] animate-pulse-dot' : 'bg-[var(--color-danger)]'}`} />
                        <span className={`text-xs font-medium ${biz.status === 'active' ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
                          {biz.status === 'active' ? 'Actif' : 'Suspendu'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-all"><Eye size={14} /></button>
                        <button className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-info)] hover:bg-[var(--color-info)]/10 transition-all"><Pencil size={14} /></button>
                        <button className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-all"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--color-border)]">
            <p className="text-xs text-[var(--color-text-muted)]">
              Page {currentPage} sur {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg bg-[var(--color-bg-main)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-white disabled:opacity-40 transition-all">
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setCurrentPage(p)} className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${currentPage === p ? 'bg-[var(--color-gold)] text-[var(--color-bg-main)]' : 'bg-[var(--color-bg-main)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-white'}`}>
                  {p}
                </button>
              ))}
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg bg-[var(--color-bg-main)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-white disabled:opacity-40 transition-all">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Modal ajouter enseigne */}
      <AddBusinessModal open={addModal} onClose={() => setAddModal(false)} />
    </div>
  )
}

function AddBusinessModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', sector: 'restaurant', city: 'Douala', plan: 'pro' })

  function handleSubmit(e) {
    e.preventDefault()
    toast.success(`Enseigne "${form.name}" créée !`)
    onClose()
    setForm({ name: '', sector: 'restaurant', city: 'Douala', plan: 'pro' })
  }

  return (
    <Modal open={open} onClose={onClose} title="Ajouter une enseigne" maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Nom de l'enseigne</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex: Restaurant Le Délice" required className="input text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Secteur</label>
            <select value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} className="input text-sm appearance-none cursor-pointer">
              {SECTOR_LIST.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Ville</label>
            <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input text-sm appearance-none cursor-pointer">
              {CAMEROON_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Plan</label>
          <div className="flex gap-3">
            {Object.entries(PLANS).map(([key, p]) => (
              <button key={key} type="button" onClick={() => setForm({ ...form, plan: key })} className={`flex-1 py-3 rounded-xl text-xs font-semibold border transition-all ${form.plan === key ? 'border-[var(--color-gold)]/40 bg-[var(--color-gold)]/5 text-[var(--color-gold)]' : 'border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-muted)] hover:text-white'}`}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-secondary flex-1 py-3 text-sm">Annuler</button>
          <button type="submit" className="btn-primary flex-[2] py-3 text-sm flex items-center justify-center gap-2"><Plus size={15} />Créer l'enseigne</button>
        </div>
      </form>
    </Modal>
  )
}
