import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Scissors, DollarSign, Clock, Star, Users, CalendarDays, Plus } from 'lucide-react'
import { formatPrice } from '../../lib/utils'
import Badge from '../../components/ui/Badge'
import toast from 'react-hot-toast'

const kpis = [
  { icon: CalendarDays, label: "RDV aujourd'hui", value: '23', change: 15.0, color: '#FF6B9D' },
  { icon: DollarSign, label: 'CA du jour', value: formatPrice(345000), change: 8.7, color: 'var(--color-success)' },
  { icon: Clock, label: 'Clients en attente', value: '4', change: -20.0, color: 'var(--color-warning)' },
  { icon: Star, label: 'Taux satisfaction', value: '4.8/5', change: 2.1, color: 'var(--color-gold)' },
]

const practitioners = [
  { id: 'p1', name: 'Carine Mballa', specialty: 'Coiffure & Tressage', color: '#FF6B9D', avatar: '👩‍🦱' },
  { id: 'p2', name: 'Diane Essomba', specialty: 'Manucure & Pédicure', color: '#6C63FF', avatar: '💅' },
  { id: 'p3', name: 'Estelle Ngo', specialty: 'Soins visage', color: '#00D4AA', avatar: '🧖‍♀️' },
  { id: 'p4', name: 'Florence Ateba', specialty: 'Extensions & Perruques', color: '#F5A623', avatar: '💇‍♀️' },
]

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

const appointments = [
  { practitioner: 'p1', start: '09:00', end: '10:00', client: 'Marie Fotso', service: 'Coupe femme', amount: 5000, status: 'done' },
  { practitioner: 'p1', start: '10:00', end: '12:00', client: 'Awa Diallo', service: 'Tressage complet', amount: 15000, status: 'in_progress' },
  { practitioner: 'p1', start: '14:00', end: '15:00', client: 'Fatou Mbaye', service: 'Coupe + Brushing', amount: 8000, status: 'upcoming' },
  { practitioner: 'p2', start: '09:00', end: '10:00', client: 'Claire Bessala', service: 'Manucure gel', amount: 5000, status: 'done' },
  { practitioner: 'p2', start: '11:00', end: '12:00', client: 'Anne Mbappe', service: 'Manucure + Pédicure', amount: 7000, status: 'upcoming' },
  { practitioner: 'p2', start: '14:00', end: '16:00', client: 'Rose Onana', service: 'Pose ongles complète', amount: 12000, status: 'upcoming' },
  { practitioner: 'p3', start: '10:00', end: '11:00', client: 'Sylvie Talla', service: 'Soin visage purifiant', amount: 8000, status: 'done' },
  { practitioner: 'p3', start: '13:00', end: '14:00', client: 'Jeanne Kamga', service: 'Soin anti-âge', amount: 12000, status: 'upcoming' },
  { practitioner: 'p4', start: '09:00', end: '11:00', client: 'Patricia Ndje', service: 'Extensions complètes', amount: 25000, status: 'in_progress' },
  { practitioner: 'p4', start: '14:00', end: '16:00', client: 'Brigitte Ewane', service: 'Pose perruque', amount: 18000, status: 'upcoming' },
]

const services = [
  { name: 'Coupe femme', price: 5000, duration: '45 min', category: 'Coiffure' },
  { name: 'Tressage complet', price: 15000, duration: '2h', category: 'Coiffure' },
  { name: 'Manucure simple', price: 3500, duration: '30 min', category: 'Ongles' },
  { name: 'Soin visage', price: 8000, duration: '1h', category: 'Soins' },
  { name: 'Extensions cheveux', price: 25000, duration: '2h30', category: 'Coiffure' },
  { name: 'Maquillage complet', price: 10000, duration: '1h', category: 'Maquillage' },
]

const statusColors = { done: 'bg-[var(--color-success)]/20 border-[var(--color-success)]/30', in_progress: 'bg-[#FF6B9D]/20 border-[#FF6B9D]/30', upcoming: 'bg-[var(--color-bg-elevated)] border-[var(--color-border)]' }

export default function BeautyDashboard() {
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

      {/* Calendrier RDV */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Planning du jour</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">Vendredi 2 mai 2025</p>
          </div>
          <button onClick={() => toast.success('Nouveau RDV créé')} className="btn-primary flex items-center gap-2 text-xs py-2 px-4"><Plus size={14} />Nouveau RDV</button>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Header praticiens */}
            <div className="grid gap-2 mb-3" style={{ gridTemplateColumns: '60px repeat(4, 1fr)' }}>
              <div />
              {practitioners.map((p) => (
                <div key={p.id} className="flex items-center gap-2 px-3">
                  <span className="text-lg">{p.avatar}</span>
                  <div>
                    <p className="text-xs font-semibold text-white">{p.name}</p>
                    <p className="text-[9px] text-[var(--color-text-muted)]">{p.specialty}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Grille horaire */}
            {timeSlots.map((slot) => (
              <div key={slot} className="grid gap-2 mb-1" style={{ gridTemplateColumns: '60px repeat(4, 1fr)' }}>
                <div className="text-[10px] text-[var(--color-text-muted)] font-mono py-2 text-right pr-3">{slot}</div>
                {practitioners.map((p) => {
                  const apt = appointments.find((a) => a.practitioner === p.id && a.start === slot)
                  if (apt) {
                    const startIdx = timeSlots.indexOf(apt.start)
                    const endIdx = timeSlots.indexOf(apt.end)
                    const span = endIdx - startIdx
                    return (
                      <div key={p.id} className={`px-2.5 py-1.5 rounded-lg border text-left ${statusColors[apt.status]}`} style={{ gridRow: `span ${span}` }}>
                        <p className="text-[10px] font-semibold text-white truncate">{apt.client}</p>
                        <p className="text-[9px] text-[var(--color-text-muted)] truncate">{apt.service}</p>
                        <p className="text-[9px] font-semibold text-[var(--color-gold)]">{formatPrice(apt.amount)}</p>
                      </div>
                    )
                  }
                  const isOccupied = appointments.some((a) => a.practitioner === p.id && timeSlots.indexOf(a.start) < timeSlots.indexOf(slot) && timeSlots.indexOf(a.end) > timeSlots.indexOf(slot))
                  if (isOccupied) return <div key={p.id} />
                  return <div key={p.id} className="h-10 rounded-lg bg-[var(--color-bg-main)]/50 border border-transparent hover:border-[var(--color-border)] transition-all cursor-pointer" />
                })}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Services + Praticiens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Catalogue des services</h3>
          <div className="space-y-2">
            {services.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)]">
                <div>
                  <p className="text-sm font-medium text-white">{s.name}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)]">{s.category} · {s.duration}</p>
                </div>
                <p className="text-sm font-bold text-[var(--color-gold)]">{formatPrice(s.price)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Équipe</h3>
          <div className="space-y-3">
            {practitioners.map((p) => {
              const todayApts = appointments.filter((a) => a.practitioner === p.id)
              const revenue = todayApts.reduce((s, a) => s + a.amount, 0)
              return (
                <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)]">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `color-mix(in srgb, ${p.color} 15%, transparent)` }}>{p.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{p.name}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">{p.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[var(--color-gold)]">{formatPrice(revenue)}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">{todayApts.length} RDV</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
