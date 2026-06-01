import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Filter, Clock, CheckCircle, XCircle, Eye, Printer,
  ChevronDown, ChevronLeft, ChevronRight, Download, RefreshCw,
  MapPin, User, CreditCard, Phone
} from 'lucide-react'
import { formatPrice, formatDateTime } from '../../lib/utils'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'

const demoOrders = [
  { id: 'CMD-3045', customer: 'Marie Fotso', phone: '+237 6 99 12 34 56', branch: 'Douala — Akwa', type: 'dine_in', table: 'T3', items: [{ name: 'Poulet DG', qty: 2, price: 4500 }, { name: 'Bière 33 Export', qty: 2, price: 1000 }], subtotal: 11000, total: 13118, payment: 'orange_money', status: 'paye', created_at: '2026-05-31T14:32:00', paid_at: '2026-05-31T14:45:00' },
  { id: 'CMD-3044', customer: 'Paul Ndjock', phone: '+237 6 77 88 99 00', branch: 'Douala — Akwa', type: 'takeaway', table: null, items: [{ name: 'Ndolé Complet', qty: 1, price: 3500 }, { name: 'Plantain Frit', qty: 2, price: 1500 }, { name: 'Coca-Cola 50cl', qty: 1, price: 500 }], subtotal: 7000, total: 8348, payment: 'cash', status: 'en_preparation', created_at: '2026-05-31T14:28:00', paid_at: null },
  { id: 'CMD-3043', customer: 'Awa Diallo', phone: '+237 6 55 44 33 22', branch: 'Yaoundé — Bastos', type: 'delivery', table: null, items: [{ name: 'Poisson Braisé', qty: 1, price: 5000 }, { name: 'Brochettes Mixtes', qty: 2, price: 4000 }, { name: 'Jus Tangui', qty: 3, price: 800 }], subtotal: 15400, total: 18365, payment: 'mtn_momo', status: 'pret', created_at: '2026-05-31T14:15:00', paid_at: '2026-05-31T14:15:00' },
  { id: 'CMD-3042', customer: 'Jean Kamga', phone: '+237 6 90 11 22 33', branch: 'Douala — Akwa', type: 'dine_in', table: 'VIP 1', items: [{ name: 'Eru & Waterfufu', qty: 2, price: 3000 }, { name: 'Guinness 65cl', qty: 2, price: 1200 }], subtotal: 8400, total: 10017, payment: 'card', status: 'servi', created_at: '2026-05-31T13:55:00', paid_at: null },
  { id: 'CMD-3041', customer: 'Fatou Mbaye', phone: '+237 6 78 56 34 12', branch: 'Bafoussam', type: 'dine_in', table: 'T5', items: [{ name: 'Salade Mixte', qty: 1, price: 2500 }, { name: 'Gâteau Chocolat', qty: 1, price: 2000 }, { name: 'Eau Supermont 1L', qty: 2, price: 300 }], subtotal: 5100, total: 6082, payment: 'cash', status: 'en_attente', created_at: '2026-05-31T13:48:00', paid_at: null },
  { id: 'CMD-3040', customer: 'Sophie Atangana', phone: '+237 6 80 12 45 67', branch: 'Douala — Akwa', type: 'takeaway', table: null, items: [{ name: 'Koki', qty: 3, price: 2500 }, { name: 'Beignets (x5)', qty: 2, price: 500 }], subtotal: 8500, total: 10136, payment: 'orange_money', status: 'paye', created_at: '2026-05-31T13:30:00', paid_at: '2026-05-31T13:35:00' },
  { id: 'CMD-3039', customer: 'Pierre Essomba', phone: '+237 6 99 88 77 66', branch: 'Yaoundé — Bastos', type: 'dine_in', table: 'T2', items: [{ name: 'Poulet DG', qty: 1, price: 4500 }, { name: 'Crème Glacée', qty: 2, price: 1500 }, { name: 'Bière 33 Export', qty: 1, price: 1000 }], subtotal: 8500, total: 10136, payment: 'mtn_momo', status: 'annule', created_at: '2026-05-31T13:15:00', paid_at: null },
  { id: 'CMD-3038', customer: 'Amina Bello', phone: '+237 6 44 55 66 77', branch: 'Douala — Akwa', type: 'delivery', table: null, items: [{ name: 'Ndolé Complet', qty: 2, price: 3500 }, { name: 'Plantain Frit', qty: 1, price: 1500 }, { name: 'Coca-Cola 50cl', qty: 2, price: 500 }], subtotal: 9500, total: 11329, payment: 'cash', status: 'paye', created_at: '2026-05-31T12:55:00', paid_at: '2026-05-31T13:20:00' },
  { id: 'CMD-3037', customer: 'David Tchoupo', phone: '+237 6 22 33 44 55', branch: 'Bafoussam', type: 'dine_in', table: 'T1', items: [{ name: 'Brochettes Mixtes', qty: 3, price: 4000 }, { name: 'Salade Mixte', qty: 1, price: 2500 }, { name: 'Guinness 65cl', qty: 3, price: 1200 }], subtotal: 18100, total: 21584, payment: 'cash', status: 'paye', created_at: '2026-05-31T12:30:00', paid_at: '2026-05-31T13:00:00' },
  { id: 'CMD-3036', customer: 'Grace Njoya', phone: '+237 6 11 22 33 44', branch: 'Douala — Akwa', type: 'takeaway', table: null, items: [{ name: 'Poisson Braisé', qty: 1, price: 5000 }, { name: 'Jus Tangui', qty: 2, price: 800 }], subtotal: 6600, total: 7870, payment: 'orange_money', status: 'paye', created_at: '2026-05-31T12:10:00', paid_at: '2026-05-31T12:12:00' },
]

const statusConfig = {
  en_attente: { label: 'En attente', variant: 'warning' },
  en_preparation: { label: 'En préparation', variant: 'info' },
  pret: { label: 'Prêt', variant: 'success' },
  servi: { label: 'Servi', variant: 'success' },
  paye: { label: 'Payé', variant: 'gold' },
  annule: { label: 'Annulé', variant: 'danger' },
}

const typeLabels = { dine_in: 'Sur place', takeaway: 'À emporter', delivery: 'Livraison' }
const paymentLabels = { cash: 'Espèces', orange_money: 'Orange Money', mtn_momo: 'MTN MoMo', card: 'Carte' }

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterBranch, setFilterBranch] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const perPage = 8

  const filteredOrders = useMemo(() => {
    let list = [...demoOrders]
    if (filterStatus !== 'all') list = list.filter(o => o.status === filterStatus)
    if (filterBranch !== 'all') list = list.filter(o => o.branch === filterBranch)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(o => o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q))
    }
    return list
  }, [filterStatus, filterBranch, searchQuery])

  const totalPages = Math.ceil(filteredOrders.length / perPage)
  const paginated = filteredOrders.slice((currentPage - 1) * perPage, currentPage * perPage)

  const statusCounts = useMemo(() => {
    const counts = { all: demoOrders.length }
    demoOrders.forEach(o => { counts[o.status] = (counts[o.status] || 0) + 1 })
    return counts
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Commandes</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Suivi en temps réel de toutes vos commandes</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2 text-xs py-2 px-3"><Download size={13} /> Export CSV</button>
          <button className="btn-secondary flex items-center gap-2 text-xs py-2 px-3"><RefreshCw size={13} /> Rafraîchir</button>
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {[{ key: 'all', label: 'Toutes' }, ...Object.entries(statusConfig).map(([k, v]) => ({ key: k, label: v.label }))].map(tab => (
          <button
            key={tab.key}
            onClick={() => { setFilterStatus(tab.key); setCurrentPage(1) }}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${filterStatus === tab.key ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/30' : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-white'}`}
          >
            {tab.label}
            <span className="ml-2 text-[10px] bg-[var(--color-bg-main)] px-1.5 py-0.5 rounded-md">{statusCounts[tab.key] || 0}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input type="text" value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1) }} placeholder="Rechercher par N° ou client..." className="input pl-9 text-sm py-2" />
        </div>
        <select value={filterBranch} onChange={e => { setFilterBranch(e.target.value); setCurrentPage(1) }} className="input text-sm py-2 w-48 appearance-none cursor-pointer">
          <option value="all">Toutes les branches</option>
          <option value="Douala — Akwa">Douala — Akwa</option>
          <option value="Yaoundé — Bastos">Yaoundé — Bastos</option>
          <option value="Bafoussam">Bafoussam</option>
        </select>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
                <th className="pb-4 font-medium">N° Commande</th>
                <th className="pb-4 font-medium">Client</th>
                <th className="pb-4 font-medium">Branche</th>
                <th className="pb-4 font-medium">Type</th>
                <th className="pb-4 font-medium">Montant</th>
                <th className="pb-4 font-medium">Paiement</th>
                <th className="pb-4 font-medium">Statut</th>
                <th className="pb-4 font-medium">Date</th>
                <th className="pb-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((order, i) => {
                const status = statusConfig[order.status]
                return (
                  <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-[var(--color-border)] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 text-white font-semibold">{order.id}</td>
                    <td className="py-3.5 text-white">{order.customer}</td>
                    <td className="py-3.5 text-[var(--color-text-secondary)] text-xs">{order.branch}</td>
                    <td className="py-3.5 text-[var(--color-text-secondary)] text-xs">{typeLabels[order.type]}</td>
                    <td className="py-3.5 text-white font-semibold">{formatPrice(order.total)}</td>
                    <td className="py-3.5 text-[var(--color-text-secondary)] text-xs">{paymentLabels[order.payment]}</td>
                    <td className="py-3.5"><Badge variant={status.variant}>{status.label}</Badge></td>
                    <td className="py-3.5 text-[var(--color-text-muted)] text-xs">{formatDateTime(order.created_at)}</td>
                    <td className="py-3.5 text-right">
                      <button onClick={() => setSelectedOrder(order)} className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-all"><Eye size={14} /></button>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--color-border)]">
            <p className="text-xs text-[var(--color-text-muted)]">Page {currentPage} sur {totalPages}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg bg-[var(--color-bg-main)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-white disabled:opacity-40 transition-all"><ChevronLeft size={14} /></button>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg bg-[var(--color-bg-main)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-white disabled:opacity-40 transition-all"><ChevronRight size={14} /></button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Order detail modal */}
      <Modal open={!!selectedOrder} onClose={() => setSelectedOrder(null)} title={`Commande ${selectedOrder?.id}`} maxWidth="max-w-lg">
        {selectedOrder && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)]">
                <User size={14} className="text-[var(--color-gold)]" />
                <div>
                  <p className="text-[10px] text-[var(--color-text-muted)]">Client</p>
                  <p className="text-sm font-medium text-white">{selectedOrder.customer}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)]">
                <Phone size={14} className="text-[var(--color-gold)]" />
                <div>
                  <p className="text-[10px] text-[var(--color-text-muted)]">Téléphone</p>
                  <p className="text-sm font-medium text-white">{selectedOrder.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)]">
                <MapPin size={14} className="text-[var(--color-gold)]" />
                <div>
                  <p className="text-[10px] text-[var(--color-text-muted)]">Branche</p>
                  <p className="text-sm font-medium text-white">{selectedOrder.branch}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)]">
                <CreditCard size={14} className="text-[var(--color-gold)]" />
                <div>
                  <p className="text-[10px] text-[var(--color-text-muted)]">Paiement</p>
                  <p className="text-sm font-medium text-white">{paymentLabels[selectedOrder.payment]}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
              <div className="bg-[var(--color-bg-main)] px-4 py-2.5 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Articles</div>
              {selectedOrder.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 border-t border-[var(--color-border)]">
                  <div>
                    <p className="text-sm text-white">{item.name}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">x{item.qty}</p>
                  </div>
                  <p className="text-sm font-semibold text-white">{formatPrice(item.price * item.qty)}</p>
                </div>
              ))}
              <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-bg-main)]">
                <p className="text-sm font-bold text-white">TOTAL TTC</p>
                <p className="text-base font-bold text-[var(--color-gold)]">{formatPrice(selectedOrder.total)}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setSelectedOrder(null)} className="btn-secondary flex-1 py-3 text-sm">Fermer</button>
              <button className="btn-primary flex-1 py-3 text-sm flex items-center justify-center gap-2"><Printer size={14} /> Imprimer</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
