import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wrench, DollarSign, Car, FileText, Package, Clock } from 'lucide-react'
import { formatPrice } from '../../lib/utils'
import Badge from '../../components/ui/Badge'

const kpis = [
  { icon: Car, label: 'Véhicules en cours', value: '8', change: 14.3, color: 'var(--color-warning)' },
  { icon: FileText, label: 'Devis en attente', value: '5', change: -16.7, color: 'var(--color-info)' },
  { icon: DollarSign, label: 'CA semaine', value: formatPrice(890000), change: 22.5, color: 'var(--color-success)' },
  { icon: Package, label: 'Pièces en rupture', value: '2', change: -50.0, color: 'var(--color-danger)' },
]

const vehicles = [
  { id: 'v1', plate: 'LT 2847 A', owner: 'Jean Kamga', model: 'Toyota Corolla 2019', issue: 'Vidange + Freins', status: 'en_cours', progress: 65, amount: 85000, mechanic: 'Paul M.' },
  { id: 'v2', plate: 'CE 1234 B', owner: 'Marie Fotso', model: 'Honda CR-V 2021', issue: 'Diagnostic moteur', status: 'diagnostic', progress: 20, amount: 15000, mechanic: 'Alain T.' },
  { id: 'v3', plate: 'LT 9087 C', owner: 'Ibrahim Sow', model: 'Hyundai Tucson 2020', issue: 'Remplacement embrayage', status: 'attente_pieces', progress: 40, amount: 250000, mechanic: 'Paul M.' },
  { id: 'v4', plate: 'CE 5678 D', owner: 'Awa Diallo', model: 'Toyota RAV4 2018', issue: 'Climatisation', status: 'en_cours', progress: 80, amount: 120000, mechanic: 'Bertrand K.' },
  { id: 'v5', plate: 'LT 3456 E', owner: 'Fatou Mbaye', model: 'Nissan X-Trail 2022', issue: 'Pneus + Géométrie', status: 'termine', progress: 100, amount: 180000, mechanic: 'Alain T.' },
  { id: 'v6', plate: 'CE 7890 F', owner: 'Paul Ndjock', model: 'Mercedes C200 2020', issue: 'Révision complète', status: 'en_cours', progress: 45, amount: 350000, mechanic: 'Bertrand K.' },
  { id: 'v7', plate: 'LT 1122 G', owner: 'Claire Bessala', model: 'Kia Sportage 2021', issue: 'Électricité tableau bord', status: 'diagnostic', progress: 10, amount: 0, mechanic: 'Paul M.' },
  { id: 'v8', plate: 'CE 3344 H', owner: 'Roger Atangana', model: 'Toyota Hilux 2017', issue: 'Suspension + Amortisseurs', status: 'livre', progress: 100, amount: 280000, mechanic: 'Alain T.' },
]

const quotes = [
  { id: 'DEV-041', client: 'Famille Onana', vehicle: 'Peugeot 3008', description: 'Courroie distribution + Pompe eau', amount: 420000, date: '01 Mai', status: 'envoyé' },
  { id: 'DEV-040', client: 'Entreprise TechCam', vehicle: 'Toyota Hiace (flotte)', description: 'Révision x3 véhicules', amount: 750000, date: '30 Avr', status: 'en_attente' },
  { id: 'DEV-039', client: 'M. Talla', vehicle: 'BMW X3 2019', description: 'Freins avant + Disques', amount: 180000, date: '28 Avr', status: 'accepté' },
  { id: 'DEV-038', client: 'Mme Ewane', vehicle: 'Renault Duster', description: 'Turbo + Main d\'œuvre', amount: 520000, date: '25 Avr', status: 'refusé' },
  { id: 'DEV-037', client: 'M. Ngono', vehicle: 'Ford Ranger', description: 'Boîte de vitesses', amount: 680000, date: '22 Avr', status: 'en_attente' },
]

const statusConfig = {
  diagnostic: { label: 'Diagnostic', variant: 'info', color: 'var(--color-info)' },
  en_cours: { label: 'En cours', variant: 'warning', color: 'var(--color-warning)' },
  attente_pieces: { label: 'Attente pièces', variant: 'danger', color: 'var(--color-danger)' },
  termine: { label: 'Terminé', variant: 'success', color: 'var(--color-success)' },
  livre: { label: 'Livré', variant: 'gold', color: 'var(--color-gold)' },
}

export default function GarageDashboard() {
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t) }, [])

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

      {/* Véhicules en réparation */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Véhicules en atelier</h3>
        <div className="space-y-3">
          {vehicles.map((v, i) => {
            const st = statusConfig[v.status]
            return (
              <motion.div key={v.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + i * 0.05 }} className="p-4 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="px-2.5 py-1 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-xs font-mono font-bold text-white">{v.plate}</div>
                    <div><p className="text-sm font-medium text-white">{v.model}</p><p className="text-[10px] text-[var(--color-text-muted)]">{v.owner} · Mécanicien : {v.mechanic}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    {v.amount > 0 && <span className="text-sm font-bold text-[var(--color-gold)]">{formatPrice(v.amount)}</span>}
                    <Badge variant={st.variant}>{st.label}</Badge>
                  </div>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] mb-2">{v.issue}</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 rounded-full bg-[var(--color-bg-elevated)] overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${v.progress}%` }} transition={{ delay: 0.6 + i * 0.05, duration: 0.8 }} className="h-full rounded-full" style={{ backgroundColor: st.color }} />
                  </div>
                  <span className="text-xs font-bold text-white w-10 text-right">{v.progress}%</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Devis */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Devis récents</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
              <th className="pb-3 font-medium">N° Devis</th><th className="pb-3 font-medium">Client</th><th className="pb-3 font-medium">Véhicule</th><th className="pb-3 font-medium">Description</th><th className="pb-3 font-medium">Montant</th><th className="pb-3 font-medium">Statut</th>
            </tr></thead>
            <tbody>
              {quotes.map((q, i) => (
                <motion.tr key={q.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 + i * 0.05 }} className="border-t border-[var(--color-border)] hover:bg-white/[0.02]">
                  <td className="py-3 text-white font-medium">{q.id}</td>
                  <td className="py-3 text-white">{q.client}</td>
                  <td className="py-3 text-[var(--color-text-secondary)] text-xs">{q.vehicle}</td>
                  <td className="py-3 text-[var(--color-text-muted)] text-xs truncate max-w-48">{q.description}</td>
                  <td className="py-3 text-[var(--color-gold)] font-bold">{formatPrice(q.amount)}</td>
                  <td className="py-3"><Badge variant={q.status === 'accepté' ? 'success' : q.status === 'refusé' ? 'danger' : q.status === 'envoyé' ? 'info' : 'warning'}>{q.status === 'en_attente' ? 'En attente' : q.status.charAt(0).toUpperCase() + q.status.slice(1)}</Badge></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
