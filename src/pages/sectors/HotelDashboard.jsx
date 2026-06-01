import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Hotel, DoorOpen, CalendarCheck, DollarSign, Users, Clock, ChevronRight, Check, X, AlertCircle } from 'lucide-react'
import { formatPrice } from '../../lib/utils'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import toast from 'react-hot-toast'

const kpis = [
  { icon: Hotel, label: "Taux d'occupation", value: '78%', change: 4.2, color: '#6C63FF' },
  { icon: DoorOpen, label: 'Chambres libres', value: '12', change: -8.3, color: 'var(--color-success)' },
  { icon: CalendarCheck, label: "Réservations aujourd'hui", value: '8', change: 12.5, color: 'var(--color-gold)' },
  { icon: DollarSign, label: 'Revenu nuit', value: formatPrice(2340000), change: 6.1, color: 'var(--color-success)' },
]

const roomTypes = {
  standard: { label: 'Standard', price: 25000, color: '#8B8FA8' },
  superieure: { label: 'Supérieure', price: 45000, color: '#3B82F6' },
  suite: { label: 'Suite', price: 85000, color: '#F5A623' },
  presidentielle: { label: 'Suite Présidentielle', price: 150000, color: '#6C63FF' },
}

const floors = [
  { name: 'Étage 1', rooms: [
    { id: 'r101', num: '101', type: 'standard', status: 'libre' },
    { id: 'r102', num: '102', type: 'standard', status: 'occupee', guest: 'Jean-Pierre Kamga', checkin: '29 Avr', checkout: '03 Mai', amount: 125000 },
    { id: 'r103', num: '103', type: 'standard', status: 'occupee', guest: 'Marie Fotso', checkin: '01 Mai', checkout: '04 Mai', amount: 75000 },
    { id: 'r104', num: '104', type: 'superieure', status: 'libre' },
    { id: 'r105', num: '105', type: 'superieure', status: 'reservee', guest: 'Paul Ndjock', checkin: '02 Mai', checkout: '05 Mai', amount: 135000 },
    { id: 'r106', num: '106', type: 'standard', status: 'nettoyage' },
    { id: 'r107', num: '107', type: 'standard', status: 'libre' },
    { id: 'r108', num: '108', type: 'superieure', status: 'occupee', guest: 'Awa Diallo', checkin: '30 Avr', checkout: '02 Mai', amount: 90000 },
    { id: 'r109', num: '109', type: 'standard', status: 'libre' },
    { id: 'r110', num: '110', type: 'standard', status: 'occupee', guest: 'Ibrahim Sow', checkin: '01 Mai', checkout: '03 Mai', amount: 50000 },
  ]},
  { name: 'Étage 2', rooms: [
    { id: 'r201', num: '201', type: 'superieure', status: 'occupee', guest: 'Fatou Mbaye', checkin: '28 Avr', checkout: '02 Mai', amount: 180000 },
    { id: 'r202', num: '202', type: 'superieure', status: 'libre' },
    { id: 'r203', num: '203', type: 'suite', status: 'occupee', guest: 'Famille Tchoupo', checkin: '30 Avr', checkout: '05 Mai', amount: 425000 },
    { id: 'r204', num: '204', type: 'suite', status: 'libre' },
    { id: 'r205', num: '205', type: 'superieure', status: 'reservee', guest: 'Claire Bessala', checkin: '02 Mai', checkout: '04 Mai', amount: 90000 },
    { id: 'r206', num: '206', type: 'superieure', status: 'occupee', guest: 'Roger Atangana', checkin: '01 Mai', checkout: '03 Mai', amount: 90000 },
    { id: 'r207', num: '207', type: 'suite', status: 'nettoyage' },
    { id: 'r208', num: '208', type: 'superieure', status: 'libre' },
    { id: 'r209', num: '209', type: 'superieure', status: 'occupee', guest: 'Anne Mbappe', checkin: '29 Avr', checkout: '02 Mai', amount: 135000 },
    { id: 'r210', num: '210', type: 'suite', status: 'libre' },
  ]},
  { name: 'Étage 3 — VIP', rooms: [
    { id: 'r301', num: '301', type: 'suite', status: 'occupee', guest: 'Dr. Mbarga', checkin: '30 Avr', checkout: '04 Mai', amount: 340000 },
    { id: 'r302', num: '302', type: 'suite', status: 'libre' },
    { id: 'r303', num: '303', type: 'presidentielle', status: 'occupee', guest: 'Ambassadeur Nguema', checkin: '01 Mai', checkout: '06 Mai', amount: 750000 },
    { id: 'r304', num: '304', type: 'presidentielle', status: 'libre' },
    { id: 'r305', num: '305', type: 'suite', status: 'reservee', guest: 'M. & Mme Eto\'o', checkin: '03 Mai', checkout: '07 Mai', amount: 340000 },
    { id: 'r306', num: '306', type: 'suite', status: 'occupee', guest: 'CEO TechCam', checkin: '01 Mai', checkout: '04 Mai', amount: 255000 },
    { id: 'r307', num: '307', type: 'suite', status: 'libre' },
    { id: 'r308', num: '308', type: 'suite', status: 'libre' },
    { id: 'r309', num: '309', type: 'presidentielle', status: 'nettoyage' },
    { id: 'r310', num: '310', type: 'presidentielle', status: 'libre' },
  ]},
]

const timeline = [
  { time: '08:00', type: 'checkout', guest: 'M. Talla', room: '106', status: 'done' },
  { time: '10:00', type: 'checkout', guest: 'Mme Ngo', room: '207', status: 'done' },
  { time: '12:00', type: 'checkin', guest: 'Paul Ndjock', room: '105', status: 'pending' },
  { time: '14:00', type: 'checkin', guest: 'Claire Bessala', room: '205', status: 'pending' },
  { time: '15:00', type: 'checkout', guest: 'Awa Diallo', room: '208', status: 'pending' },
  { time: '16:00', type: 'checkin', guest: 'Famille Onana', room: '302', status: 'pending' },
]

const statusColors = {
  libre: { bg: 'bg-[var(--color-success)]/15', border: 'border-[var(--color-success)]/40', text: 'text-[var(--color-success)]' },
  occupee: { bg: 'bg-[var(--color-danger)]/15', border: 'border-[var(--color-danger)]/40', text: 'text-[var(--color-danger)]' },
  reservee: { bg: 'bg-[var(--color-warning)]/15', border: 'border-[var(--color-warning)]/40', text: 'text-[var(--color-warning)]' },
  nettoyage: { bg: 'bg-[var(--color-info)]/15', border: 'border-[var(--color-info)]/40', text: 'text-[var(--color-info)]' },
}
const statusLabels = { libre: 'Libre', occupee: 'Occupée', reservee: 'Réservée', nettoyage: 'Nettoyage' }

export default function HotelDashboard() {
  const [loading, setLoading] = useState(true)
  const [roomModal, setRoomModal] = useState(null)

  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t) }, [])

  if (loading) return <div className="space-y-6">{[...Array(3)].map((_, i) => <div key={i} className="glass-card p-6"><div className="skeleton h-32 w-full rounded-xl" /></div>)}</div>

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 hover:border-[var(--color-border-active)] transition-all cursor-default">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl" style={{ background: `color-mix(in srgb, ${kpi.color} 12%, transparent)` }}>
                <kpi.icon size={22} style={{ color: kpi.color }} />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${kpi.change >= 0 ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]'}`}>
                {kpi.change >= 0 ? '+' : ''}{kpi.change}%
              </span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{kpi.value}</p>
            <p className="text-sm text-[var(--color-text-secondary)]">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Légende */}
      <div className="flex items-center gap-5">
        {Object.entries(statusLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-2 text-xs">
            <div className={`w-3 h-3 rounded-full ${statusColors[key].bg} border ${statusColors[key].border}`} />
            <span className="text-[var(--color-text-secondary)]">{label}</span>
          </div>
        ))}
        <div className="h-4 w-px bg-[var(--color-border)] mx-2" />
        {Object.entries(roomTypes).map(([key, t]) => (
          <div key={key} className="flex items-center gap-1.5 text-[10px]">
            <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: t.color }} />
            <span className="text-[var(--color-text-muted)]">{t.label}</span>
          </div>
        ))}
      </div>

      {/* Plan des chambres */}
      {floors.map((floor, fi) => (
        <motion.div key={floor.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + fi * 0.1 }} className="glass-card p-6">
          <h3 className="text-base font-semibold text-white mb-4">{floor.name}</h3>
          <div className="grid grid-cols-5 lg:grid-cols-10 gap-3">
            {floor.rooms.map((room) => {
              const st = statusColors[room.status]
              const rt = roomTypes[room.type]
              return (
                <button key={room.id} onClick={() => setRoomModal(room)} className={`relative p-3 rounded-xl border-2 text-center transition-all hover:scale-105 active:scale-95 ${st.bg} ${st.border}`}>
                  <div className="w-2 h-2 rounded-full absolute top-2 right-2" style={{ backgroundColor: rt.color }} />
                  <p className={`text-sm font-bold ${st.text}`}>{room.num}</p>
                  <p className="text-[8px] text-[var(--color-text-muted)] mt-0.5">{rt.label}</p>
                  {room.status === 'occupee' && <p className="text-[7px] text-[var(--color-text-muted)] truncate mt-0.5">{room.guest?.split(' ')[0]}</p>}
                </button>
              )
            })}
          </div>
        </motion.div>
      ))}

      {/* Timeline arrivées/départs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Arrivées & Départs du jour</h3>
        <div className="space-y-3">
          {timeline.map((ev, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.05 }} className="flex items-center gap-4 p-3 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)]">
              <span className="text-xs font-mono text-[var(--color-text-muted)] w-12">{ev.time}</span>
              <Badge variant={ev.type === 'checkin' ? 'success' : 'warning'}>
                {ev.type === 'checkin' ? 'Arrivée' : 'Départ'}
              </Badge>
              <span className="text-sm text-white font-medium flex-1">{ev.guest}</span>
              <span className="text-xs text-[var(--color-text-muted)]">Ch. {ev.room}</span>
              {ev.status === 'done' ? (
                <span className="badge badge-success text-[10px]"><Check size={10} />Effectué</span>
              ) : (
                <div className="flex gap-1.5">
                  <button onClick={() => toast.success(`${ev.type === 'checkin' ? 'Check-in' : 'Check-out'} effectué`)} className="px-3 py-1.5 rounded-lg bg-[var(--color-success)]/10 text-[var(--color-success)] text-[10px] font-semibold hover:bg-[var(--color-success)]/20 transition-all">
                    {ev.type === 'checkin' ? 'Check-in' : 'Check-out'}
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal chambre */}
      <Modal open={!!roomModal} onClose={() => setRoomModal(null)} title={roomModal ? `Chambre ${roomModal.num}` : ''} maxWidth="max-w-md">
        {roomModal && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant={roomModal.status === 'libre' ? 'success' : roomModal.status === 'occupee' ? 'danger' : roomModal.status === 'reservee' ? 'warning' : 'info'}>
                {statusLabels[roomModal.status]}
              </Badge>
              <span className="text-xs font-semibold" style={{ color: roomTypes[roomModal.type].color }}>{roomTypes[roomModal.type].label} — {formatPrice(roomTypes[roomModal.type].price)}/nuit</span>
            </div>
            {roomModal.guest && (
              <div className="p-4 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)] space-y-2">
                <div className="flex justify-between text-sm"><span className="text-[var(--color-text-muted)]">Client</span><span className="text-white font-medium">{roomModal.guest}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[var(--color-text-muted)]">Arrivée</span><span className="text-white">{roomModal.checkin}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[var(--color-text-muted)]">Départ</span><span className="text-white">{roomModal.checkout}</span></div>
                <div className="flex justify-between text-sm pt-2 border-t border-[var(--color-border)]"><span className="text-[var(--color-text-muted)]">Montant total</span><span className="text-[var(--color-gold)] font-bold">{formatPrice(roomModal.amount)}</span></div>
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => { setRoomModal(null); toast.success('Action effectuée') }} className="btn-primary flex-1 py-3 text-sm">
                {roomModal.status === 'occupee' ? 'Check-out' : roomModal.status === 'reservee' ? 'Check-in' : 'Réserver'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
