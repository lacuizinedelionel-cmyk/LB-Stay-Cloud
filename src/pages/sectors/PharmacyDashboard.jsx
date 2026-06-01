import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, DollarSign, FileText, AlertTriangle, Search, Clock, Package, CalendarX } from 'lucide-react'
import { formatPrice } from '../../lib/utils'
import Badge from '../../components/ui/Badge'

const kpis = [
  { icon: FileText, label: 'Ordonnances traitées', value: '67', change: 8.2, color: '#FF4757' },
  { icon: Package, label: 'Médicaments vendus', value: '234', change: 15.3, color: 'var(--color-info)' },
  { icon: DollarSign, label: 'CA du jour', value: formatPrice(567000), change: 4.7, color: 'var(--color-success)' },
  { icon: AlertTriangle, label: 'Ruptures critiques', value: '3', change: -25.0, color: 'var(--color-danger)' },
]

const medications = [
  { id: 1, name: 'Paracétamol 500mg', dci: 'Paracétamol', stock: 450, price: 500, expiry: '2026-03-15', category: 'Antalgique' },
  { id: 2, name: 'Amoxicilline 500mg', dci: 'Amoxicilline', stock: 120, price: 2500, expiry: '2025-08-20', category: 'Antibiotique' },
  { id: 3, name: 'Ibuprofène 400mg', dci: 'Ibuprofène', stock: 280, price: 800, expiry: '2026-01-10', category: 'Anti-inflammatoire' },
  { id: 4, name: 'Metformine 850mg', dci: 'Metformine', stock: 85, price: 1500, expiry: '2025-11-30', category: 'Antidiabétique' },
  { id: 5, name: 'Oméprazole 20mg', dci: 'Oméprazole', stock: 0, price: 1200, expiry: '2025-09-15', category: 'Gastro' },
  { id: 6, name: 'Losartan 50mg', dci: 'Losartan', stock: 45, price: 3500, expiry: '2026-06-01', category: 'Antihypertenseur' },
  { id: 7, name: 'Vitamine C 1000mg', dci: 'Acide ascorbique', stock: 340, price: 2000, expiry: '2026-12-31', category: 'Vitamines' },
  { id: 8, name: 'Artemether/Luméfantrine', dci: 'ACT', stock: 0, price: 4500, expiry: '2025-07-20', category: 'Antipaludéen' },
  { id: 9, name: 'Chlorhexidine 0.5%', dci: 'Chlorhexidine', stock: 15, price: 1800, expiry: '2025-06-10', category: 'Antiseptique' },
  { id: 10, name: 'Ciprofloxacine 500mg', dci: 'Ciprofloxacine', stock: 0, price: 3000, expiry: '2025-10-05', category: 'Antibiotique' },
]

const prescriptions = [
  { id: 'ORD-001', patient: 'M. Kamga J.', doctor: 'Dr. Mbarga', items: 3, amount: 8500, status: 'traitee', time: '09:15' },
  { id: 'ORD-002', patient: 'Mme Fotso M.', doctor: 'Dr. Atangana', items: 2, amount: 5200, status: 'traitee', time: '10:30' },
  { id: 'ORD-003', patient: 'M. Ndjock P.', doctor: 'Dr. Bessala', items: 5, amount: 15800, status: 'en_cours', time: '11:45' },
  { id: 'ORD-004', patient: 'Mme Diallo A.', doctor: 'Dr. Onana', items: 1, amount: 4500, status: 'en_attente', time: '13:00' },
  { id: 'ORD-005', patient: 'M. Sow I.', doctor: 'Dr. Mbarga', items: 4, amount: 12000, status: 'en_attente', time: '14:20' },
]

function getDaysUntilExpiry(date) {
  return Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24))
}

export default function PharmacyDashboard() {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t) }, [])

  const filtered = medications.filter((m) => !searchQuery || m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.dci.toLowerCase().includes(searchQuery.toLowerCase()))

  if (loading) return <div className="space-y-6">{[...Array(3)].map((_, i) => <div key={i} className="glass-card p-6"><div className="skeleton h-32 w-full rounded-xl" /></div>)}</div>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 cursor-default">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl" style={{ background: `color-mix(in srgb, ${kpi.color} 12%, transparent)` }}><kpi.icon size={22} style={{ color: kpi.color }} /></div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${kpi.change >= 0 ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]'}`}>{kpi.change >= 0 ? '+' : ''}{kpi.change}%</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{kpi.value}</p>
            <p className="text-sm text-[var(--color-text-secondary)]">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Catalogue médicaments */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Catalogue médicaments</h3>
          <div className="relative"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" /><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher DCI ou nom..." className="input pl-9 py-2 text-sm w-56" /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
              <th className="pb-3 font-medium">Médicament</th><th className="pb-3 font-medium">DCI</th><th className="pb-3 font-medium">Catégorie</th><th className="pb-3 font-medium">Stock</th><th className="pb-3 font-medium">Prix</th><th className="pb-3 font-medium">Expiration</th><th className="pb-3 font-medium">Statut</th>
            </tr></thead>
            <tbody>
              {filtered.map((m, i) => {
                const days = getDaysUntilExpiry(m.expiry)
                const isExpiring = days < 90
                const isCritical = days < 30
                return (
                  <motion.tr key={m.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 * i }} className="border-t border-[var(--color-border)] hover:bg-white/[0.02]">
                    <td className="py-3 text-white font-medium">{m.name}</td>
                    <td className="py-3 text-[var(--color-text-muted)] text-xs">{m.dci}</td>
                    <td className="py-3 text-[var(--color-text-secondary)] text-xs">{m.category}</td>
                    <td className="py-3"><span className={`font-bold ${m.stock === 0 ? 'text-[var(--color-danger)]' : m.stock < 20 ? 'text-[var(--color-warning)]' : 'text-white'}`}>{m.stock}</span></td>
                    <td className="py-3 text-white font-semibold">{formatPrice(m.price)}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        {isCritical && <CalendarX size={12} className="text-[var(--color-danger)]" />}
                        <span className={`text-xs ${isCritical ? 'text-[var(--color-danger)] font-semibold' : isExpiring ? 'text-[var(--color-warning)]' : 'text-[var(--color-text-muted)]'}`}>
                          {new Date(m.expiry).toLocaleDateString('fr-FR')} {isCritical && `(${days}j)`}
                        </span>
                      </div>
                    </td>
                    <td className="py-3">{m.stock === 0 ? <Badge variant="danger">Rupture</Badge> : isCritical ? <Badge variant="danger">Exp. critique</Badge> : isExpiring ? <Badge variant="warning">Exp. proche</Badge> : <Badge variant="success">OK</Badge>}</td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Ordonnances */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Ordonnances du jour</h3>
        <div className="space-y-2">
          {prescriptions.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.65 + i * 0.05 }} className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--color-text-muted)] w-12">{p.time}</span>
                <div><p className="text-sm font-medium text-white">{p.patient}</p><p className="text-[10px] text-[var(--color-text-muted)]">{p.doctor} · {p.items} articles</p></div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-bold text-[var(--color-gold)]">{formatPrice(p.amount)}</p>
                <Badge variant={p.status === 'traitee' ? 'success' : p.status === 'en_cours' ? 'info' : 'warning'}>
                  {p.status === 'traitee' ? 'Traitée' : p.status === 'en_cours' ? 'En cours' : 'En attente'}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
