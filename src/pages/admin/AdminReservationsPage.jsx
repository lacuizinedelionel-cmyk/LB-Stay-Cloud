import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  CalendarDays, Clock, Users, Phone, Plus, Check, X, Search,
  ChevronLeft, ChevronRight, MapPin, Edit3, AlertCircle
} from 'lucide-react'
import { formatDate, formatTime, getInitials } from '../../lib/utils'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import toast from 'react-hot-toast'

const statusConfig = {
  confirmed: { label: 'Confirmée', variant: 'success' },
  pending: { label: 'En attente', variant: 'warning' },
  seated: { label: 'Installé', variant: 'gold' },
  completed: { label: 'Terminée', variant: 'info' },
  cancelled: { label: 'Annulée', variant: 'danger' },
  no_show: { label: 'No-show', variant: 'danger' },
}

const demoReservations = [
  { id: 'r1', customer: 'Marie Fotso', phone: '+237 6 99 12 34 56', guests: 4, date: '2026-05-31', time: '19:30', table: 'VIP 1', branch: 'Douala — Akwa', status: 'confirmed', notes: 'Anniversaire — prévoir gâteau', created_at: '2026-05-29T10:00:00' },
  { id: 'r2', customer: 'Jean Kamga', phone: '+237 6 90 11 22 33', guests: 8, date: '2026-05-31', time: '20:00', table: 'VIP 2', branch: 'Douala — Akwa', status: 'confirmed', notes: 'Réunion d\'affaires', created_at: '2026-05-28T15:30:00' },
  { id: 'r3', customer: 'Paul Ndjock', phone: '+237 6 77 88 99 00', guests: 2, date: '2026-05-31', time: '12:30', table: 'T3', branch: 'Douala — Akwa', status: 'seated', notes: '', created_at: '2026-05-31T09:00:00' },
  { id: 'r4', customer: 'Awa Diallo', phone: '+237 6 55 44 33 22', guests: 6, date: '2026-05-31', time: '13:00', table: 'T5', branch: 'Yaoundé — Bastos', status: 'pending', notes: 'Demande terrasse si possible', created_at: '2026-05-30T18:00:00' },
  { id: 'r5', customer: 'David Tchoupo', phone: '+237 6 22 33 44 55', guests: 3, date: '2026-05-31', time: '19:00', table: 'Ter. 1', branch: 'Douala — Akwa', status: 'confirmed', notes: '', created_at: '2026-05-30T12:00:00' },
  { id: 'r6', customer: 'Sophie Atangana', phone: '+237 6 80 12 45 67', guests: 2, date: '2026-06-01', time: '12:00', table: 'T2', branch: 'Douala — Akwa', status: 'pending', notes: '', created_at: '2026-05-31T08:00:00' },
  { id: 'r7', customer: 'Amina Bello', phone: '+237 6 44 55 66 77', guests: 4, date: '2026-06-01', time: '19:30', table: 'T6', branch: 'Bafoussam', status: 'confirmed', notes: 'Menu végétarien pour 1 personne', created_at: '2026-05-30T20:00:00' },
  { id: 'r8', customer: 'Pierre Essomba', phone: '+237 6 99 88 77 66', guests: 5, date: '2026-05-30', time: '20:00', table: 'VIP 1', branch: 'Douala — Akwa', status: 'completed', notes: '', created_at: '2026-05-28T09:00:00' },
  { id: 'r9', customer: 'Grace Njoya', phone: '+237 6 11 22 33 44', guests: 2, date: '2026-05-30', time: '13:00', table: 'T4', branch: 'Yaoundé — Bastos', status: 'no_show', notes: '', created_at: '2026-05-29T14:00:00' },
  { id: 'r10', customer: 'Fatou Mbaye', phone: '+237 6 78 56 34 12', guests: 3, date: '2026-05-30', time: '12:30', table: 'T1', branch: 'Douala — Akwa', status: 'cancelled', notes: 'Annulé par le client', created_at: '2026-05-29T11:00:00' },
]

const timeSlots = ['12:00', '12:30', '13:00', '13:30', '14:00', '19:00', '19:30', '20:00', '20:30', '21:00']

const kpis = [
  { icon: CalendarDays, label: "Réservations aujourd'hui", value: '5', color: 'var(--color-gold)' },
  { icon: Users, label: 'Couverts attendus', value: '23', color: 'var(--color-success)' },
  { icon: Clock, label: 'Prochain créneau', value: '19:00', color: 'var(--color-info)' },
  { icon: AlertCircle, label: 'En attente de confirmation', value: '2', color: 'var(--color-warning)' },
]

export default function AdminReservationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDate, setFilterDate] = useState('2026-05-31')
  const [addModal, setAddModal] = useState(false)
  const [selectedRes, setSelectedRes] = useState(null)

  const filtered = useMemo(() => {
    let list = [...demoReservations]
    if (filterDate) list = list.filter(r => r.date === filterDate)
    if (filterStatus !== 'all') list = list.filter(r => r.status === filterStatus)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(r => r.customer.toLowerCase().includes(q) || r.phone.includes(q))
    }
    return list.sort((a, b) => a.time.localeCompare(b.time))
  }, [filterDate, filterStatus, searchQuery])

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Réservations</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Planning et gestion des réservations</p>
        </div>
        <button onClick={() => setAddModal(true)} className="btn-primary flex items-center gap-2 text-sm py-2.5 px-5"><Plus size={15} /> Nouvelle réservation</button>
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

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="input text-sm py-2 w-44" />
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Rechercher un client..." className="input pl-9 text-sm py-2" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="input text-sm py-2 w-40 appearance-none cursor-pointer">
          <option value="all">Tous statuts</option>
          {Object.entries(statusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      {/* Timeline / List */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <h3 className="text-base font-bold text-white mb-5">
          {filterDate === '2026-05-31' ? "Aujourd'hui" : formatDate(filterDate)} — {filtered.length} réservation{filtered.length > 1 ? 's' : ''}
        </h3>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <CalendarDays size={32} className="text-[var(--color-text-muted)] mb-3" />
            <p className="text-sm text-[var(--color-text-muted)]">Aucune réservation pour cette date</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((res, i) => {
              const status = statusConfig[res.status]
              return (
                <motion.div
                  key={res.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedRes(res)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)] hover:border-[var(--color-gold)]/30 transition-all cursor-pointer"
                >
                  {/* Time */}
                  <div className="w-16 text-center shrink-0">
                    <p className="text-lg font-bold text-[var(--color-gold)]">{res.time}</p>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-12 bg-[var(--color-border)]" />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-white">{res.customer}</p>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-[var(--color-text-muted)]">
                      <span className="flex items-center gap-1"><Users size={10} /> {res.guests} pers.</span>
                      <span className="flex items-center gap-1"><MapPin size={10} /> {res.table}</span>
                      <span className="flex items-center gap-1"><Phone size={10} /> {res.phone}</span>
                    </div>
                    {res.notes && <p className="text-[10px] text-[var(--color-warning)] mt-1 italic">{res.notes}</p>}
                  </div>

                  {/* Branch */}
                  <span className="text-[10px] text-[var(--color-text-muted)] bg-[var(--color-bg-card)] px-2 py-1 rounded-lg border border-[var(--color-border)] shrink-0">{res.branch}</span>
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>

      {/* Reservation detail */}
      <Modal open={!!selectedRes} onClose={() => setSelectedRes(null)} title={`Réservation — ${selectedRes?.customer}`} maxWidth="max-w-md">
        {selectedRes && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[var(--color-bg-main)] rounded-xl p-3 text-center border border-[var(--color-border)]">
                <p className="text-[9px] text-[var(--color-text-muted)]">Date</p>
                <p className="text-sm font-bold text-white">{formatDate(selectedRes.date)}</p>
              </div>
              <div className="bg-[var(--color-bg-main)] rounded-xl p-3 text-center border border-[var(--color-border)]">
                <p className="text-[9px] text-[var(--color-text-muted)]">Heure</p>
                <p className="text-sm font-bold text-[var(--color-gold)]">{selectedRes.time}</p>
              </div>
              <div className="bg-[var(--color-bg-main)] rounded-xl p-3 text-center border border-[var(--color-border)]">
                <p className="text-[9px] text-[var(--color-text-muted)]">Couverts</p>
                <p className="text-sm font-bold text-white">{selectedRes.guests}</p>
              </div>
              <div className="bg-[var(--color-bg-main)] rounded-xl p-3 text-center border border-[var(--color-border)]">
                <p className="text-[9px] text-[var(--color-text-muted)]">Table</p>
                <p className="text-sm font-bold text-white">{selectedRes.table}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]"><Phone size={14} className="text-[var(--color-gold)]" />{selectedRes.phone}</div>
              <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]"><MapPin size={14} className="text-[var(--color-gold)]" />{selectedRes.branch}</div>
              {selectedRes.notes && <div className="flex items-center gap-2.5 text-sm text-[var(--color-warning)]"><Edit3 size={14} />{selectedRes.notes}</div>}
            </div>
            <div className="flex gap-3 pt-2">
              {selectedRes.status === 'pending' && (
                <button onClick={() => { toast.success('Réservation confirmée !'); setSelectedRes(null) }} className="btn-primary flex-1 py-3 text-sm flex items-center justify-center gap-2"><Check size={14} /> Confirmer</button>
              )}
              {(selectedRes.status === 'confirmed' || selectedRes.status === 'pending') && (
                <button onClick={() => { toast('Réservation annulée', { icon: '❌' }); setSelectedRes(null) }} className="btn-secondary flex-1 py-3 text-sm flex items-center justify-center gap-2 text-[var(--color-danger)]"><X size={14} /> Annuler</button>
              )}
              {selectedRes.status !== 'pending' && selectedRes.status !== 'confirmed' && (
                <button onClick={() => setSelectedRes(null)} className="btn-secondary flex-1 py-3 text-sm">Fermer</button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Add reservation modal */}
      <Modal open={addModal} onClose={() => setAddModal(false)} title="Nouvelle réservation" maxWidth="max-w-lg">
        <form onSubmit={e => { e.preventDefault(); toast.success('Réservation créée !'); setAddModal(false) }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Nom du client</label>
              <input type="text" placeholder="Prénom Nom" required className="input text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Téléphone</label>
              <input type="tel" placeholder="+237 6 XX XX XX XX" required className="input text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Date</label>
              <input type="date" required className="input text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Heure</label>
              <select required className="input text-sm appearance-none cursor-pointer">
                {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Couverts</label>
              <input type="number" min="1" max="20" placeholder="4" required className="input text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Table</label>
              <select className="input text-sm appearance-none cursor-pointer">
                <option value="">Attribution auto</option>
                <option>T1</option><option>T2</option><option>T3</option><option>T4</option><option>T5</option><option>T6</option>
                <option>VIP 1</option><option>VIP 2</option>
                <option>Ter. 1</option><option>Ter. 2</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Branche</label>
              <select className="input text-sm appearance-none cursor-pointer">
                <option>Douala — Akwa</option>
                <option>Yaoundé — Bastos</option>
                <option>Bafoussam</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Notes</label>
            <textarea rows={2} placeholder="Occasion spéciale, allergies, demandes..." className="input text-sm resize-none" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setAddModal(false)} className="btn-secondary flex-1 py-3 text-sm">Annuler</button>
            <button type="submit" className="btn-primary flex-[2] py-3 text-sm flex items-center justify-center gap-2"><CalendarDays size={14} /> Créer la réservation</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
