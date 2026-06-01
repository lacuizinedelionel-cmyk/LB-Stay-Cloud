import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Users, Search, Plus, Phone, Mail, MessageCircle, Star,
  ShoppingCart, Calendar, Eye, Filter, Download, Send,
  TrendingUp, Heart, ChevronLeft, ChevronRight
} from 'lucide-react'
import { formatPrice, getInitials, formatDate } from '../../lib/utils'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import toast from 'react-hot-toast'

const segments = [
  { id: 'all', label: 'Tous', count: 847, color: 'var(--color-text-secondary)' },
  { id: 'vip', label: 'VIP', count: 42, color: 'var(--color-gold)' },
  { id: 'regulier', label: 'Réguliers', count: 285, color: 'var(--color-success)' },
  { id: 'occasionnel', label: 'Occasionnels', count: 380, color: 'var(--color-info)' },
  { id: 'inactif', label: 'Inactifs', count: 140, color: 'var(--color-danger)' },
]

const demoClients = [
  { id: 'c1', name: 'Marie Fotso', phone: '+237 6 99 12 34 56', email: 'marie.fotso@gmail.com', segment: 'vip', orders: 86, total_spent: 1245000, avg_basket: 14476, last_order: '2026-05-31', since: '2024-08-15', favorite: 'Poulet DG', birthday: '1990-03-12', notes: 'Allergique aux arachides' },
  { id: 'c2', name: 'Jean Kamga', phone: '+237 6 90 11 22 33', email: 'jkamga@yahoo.fr', segment: 'vip', orders: 210, total_spent: 4500000, avg_basket: 21428, last_order: '2026-05-31', since: '2023-11-20', favorite: 'Poisson Braisé', birthday: '1985-07-24', notes: 'Client très fidèle, toujours en VIP' },
  { id: 'c3', name: 'Awa Diallo', phone: '+237 6 55 44 33 22', email: 'awa.diallo@outlook.com', segment: 'vip', orders: 124, total_spent: 2100000, avg_basket: 16935, last_order: '2026-05-31', since: '2024-02-10', favorite: 'Ndolé Complet', birthday: '1992-11-05', notes: '' },
  { id: 'c4', name: 'Paul Ndjock', phone: '+237 6 77 88 99 00', email: 'paul.n@gmail.com', segment: 'regulier', orders: 42, total_spent: 620000, avg_basket: 14762, last_order: '2026-05-29', since: '2025-01-18', favorite: 'Brochettes Mixtes', birthday: '1988-05-30', notes: '' },
  { id: 'c5', name: 'Fatou Mbaye', phone: '+237 6 78 56 34 12', email: 'fatou.m@gmail.com', segment: 'occasionnel', orders: 15, total_spent: 185000, avg_basket: 12333, last_order: '2026-05-25', since: '2025-09-03', favorite: 'Salade Mixte', birthday: '1995-09-18', notes: 'Végétarienne' },
  { id: 'c6', name: 'Sophie Atangana', phone: '+237 6 80 12 45 67', email: 'sophie.a@live.fr', segment: 'regulier', orders: 38, total_spent: 540000, avg_basket: 14210, last_order: '2026-05-28', since: '2025-03-22', favorite: 'Eru & Waterfufu', birthday: '1993-01-07', notes: '' },
  { id: 'c7', name: 'David Tchoupo', phone: '+237 6 22 33 44 55', email: 'david.t@gmail.com', segment: 'regulier', orders: 76, total_spent: 980000, avg_basket: 12894, last_order: '2026-05-30', since: '2024-06-14', favorite: 'Bière 33 Export', birthday: '1987-12-02', notes: '' },
  { id: 'c8', name: 'Pierre Essomba', phone: '+237 6 99 88 77 66', email: 'p.essomba@gmail.com', segment: 'occasionnel', orders: 22, total_spent: 310000, avg_basket: 14091, last_order: '2026-05-27', since: '2025-07-10', favorite: 'Guinness 65cl', birthday: '1982-04-15', notes: '' },
  { id: 'c9', name: 'Amina Bello', phone: '+237 6 44 55 66 77', email: 'amina.b@yahoo.com', segment: 'regulier', orders: 56, total_spent: 780000, avg_basket: 13928, last_order: '2026-05-30', since: '2024-10-05', favorite: 'Poisson Braisé', birthday: '1991-08-20', notes: '' },
  { id: 'c10', name: 'Grace Njoya', phone: '+237 6 11 22 33 44', email: 'grace.n@hotmail.com', segment: 'inactif', orders: 8, total_spent: 96000, avg_basket: 12000, last_order: '2026-03-14', since: '2025-11-20', favorite: 'Jus Tangui', birthday: '1998-06-30', notes: 'N\'est pas revenue depuis mars' },
]

const kpis = [
  { icon: Users, label: 'Clients total', value: '847', color: 'var(--color-gold)' },
  { icon: TrendingUp, label: 'Nouveaux (ce mois)', value: '+34', color: 'var(--color-success)' },
  { icon: ShoppingCart, label: 'Panier moyen', value: formatPrice(14200), color: 'var(--color-accent)' },
  { icon: Heart, label: 'Taux retour', value: '72%', color: 'var(--color-danger)' },
]

export default function AdminCRMPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSegment, setActiveSegment] = useState('all')
  const [selectedClient, setSelectedClient] = useState(null)
  const [smsModal, setSmsModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 8

  const filtered = useMemo(() => {
    let list = [...demoClients]
    if (activeSegment !== 'all') list = list.filter(c => c.segment === activeSegment)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.email.toLowerCase().includes(q))
    }
    return list
  }, [activeSegment, searchQuery])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Clients & CRM</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Base clients et communication</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setSmsModal(true)} className="btn-secondary flex items-center gap-2 text-xs py-2 px-3"><Send size={13} /> Campagne SMS</button>
          <button className="btn-secondary flex items-center gap-2 text-xs py-2 px-3"><Download size={13} /> Exporter</button>
          <button className="btn-primary flex items-center gap-2 text-sm py-2.5 px-5"><Plus size={15} /> Nouveau client</button>
        </div>
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

      {/* Segments */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {segments.map(seg => (
          <button
            key={seg.id}
            onClick={() => { setActiveSegment(seg.id); setCurrentPage(1) }}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeSegment === seg.id ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/30' : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-white'}`}
          >
            <span className="w-2 h-2 rounded-full inline-block mr-2" style={{ backgroundColor: seg.color }} />
            {seg.label}
            <span className="ml-2 text-[10px] bg-[var(--color-bg-main)] px-1.5 py-0.5 rounded-md">{seg.count}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <input type="text" value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1) }} placeholder="Rechercher par nom, téléphone, email..." className="input pl-9 text-sm py-2" />
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
                <th className="pb-4 font-medium">Client</th>
                <th className="pb-4 font-medium">Segment</th>
                <th className="pb-4 font-medium">Commandes</th>
                <th className="pb-4 font-medium">Total dépensé</th>
                <th className="pb-4 font-medium">Panier moy.</th>
                <th className="pb-4 font-medium">Plat favori</th>
                <th className="pb-4 font-medium">Dernière cmd</th>
                <th className="pb-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((client, i) => {
                const seg = segments.find(s => s.id === client.segment)
                return (
                  <motion.tr key={client.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-[var(--color-border)] hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => setSelectedClient(client)}>
                    <td className="py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-accent)] flex items-center justify-center text-[9px] font-bold text-white">{getInitials(client.name)}</div>
                        <div>
                          <p className="text-sm font-medium text-white">{client.name}</p>
                          <p className="text-[10px] text-[var(--color-text-muted)]">{client.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5"><span className="text-xs font-semibold px-2 py-1 rounded-lg" style={{ color: seg.color, background: `color-mix(in srgb, ${seg.color} 12%, transparent)` }}>{seg.label}</span></td>
                    <td className="py-3.5 text-white font-semibold">{client.orders}</td>
                    <td className="py-3.5 text-[var(--color-gold)] font-bold">{formatPrice(client.total_spent)}</td>
                    <td className="py-3.5 text-white">{formatPrice(client.avg_basket)}</td>
                    <td className="py-3.5 text-[var(--color-text-secondary)] text-xs">{client.favorite}</td>
                    <td className="py-3.5 text-[var(--color-text-muted)] text-xs">{client.last_order}</td>
                    <td className="py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-success)] hover:bg-[var(--color-success)]/10 transition-all" title="WhatsApp"><MessageCircle size={14} /></button>
                        <button className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-all" title="Voir"><Eye size={14} /></button>
                      </div>
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

      {/* Client detail modal */}
      <Modal open={!!selectedClient} onClose={() => setSelectedClient(null)} title={selectedClient?.name} maxWidth="max-w-lg">
        {selectedClient && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-[var(--color-border)]">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-accent)] flex items-center justify-center text-sm font-bold text-white">{getInitials(selectedClient.name)}</div>
              <div>
                <p className="text-base font-bold text-white">{selectedClient.name}</p>
                <p className="text-xs text-[var(--color-text-muted)]">Client depuis {formatDate(selectedClient.since)}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[var(--color-bg-main)] rounded-xl p-3 text-center border border-[var(--color-border)]">
                <p className="text-[9px] text-[var(--color-text-muted)]">Commandes</p>
                <p className="text-base font-bold text-white">{selectedClient.orders}</p>
              </div>
              <div className="bg-[var(--color-bg-main)] rounded-xl p-3 text-center border border-[var(--color-border)]">
                <p className="text-[9px] text-[var(--color-text-muted)]">Dépensé</p>
                <p className="text-base font-bold text-[var(--color-gold)]">{formatPrice(selectedClient.total_spent)}</p>
              </div>
              <div className="bg-[var(--color-bg-main)] rounded-xl p-3 text-center border border-[var(--color-border)]">
                <p className="text-[9px] text-[var(--color-text-muted)]">Panier moy.</p>
                <p className="text-base font-bold text-[var(--color-success)]">{formatPrice(selectedClient.avg_basket)}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]"><Phone size={14} className="text-[var(--color-gold)]" /> {selectedClient.phone}</div>
              <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]"><Mail size={14} className="text-[var(--color-gold)]" /> {selectedClient.email}</div>
              <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]"><Star size={14} className="text-[var(--color-gold)]" /> Plat favori: {selectedClient.favorite}</div>
              <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]"><Calendar size={14} className="text-[var(--color-gold)]" /> Anniversaire: {formatDate(selectedClient.birthday)}</div>
              {selectedClient.notes && <div className="flex items-center gap-2.5 text-sm text-[var(--color-warning)]"><Star size={14} /> {selectedClient.notes}</div>}
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => { setSelectedClient(null); toast.success('Message WhatsApp envoyé !') }} className="btn-secondary flex-1 py-3 text-sm flex items-center justify-center gap-2"><MessageCircle size={14} /> WhatsApp</button>
              <button onClick={() => setSelectedClient(null)} className="btn-primary flex-1 py-3 text-sm">Fermer</button>
            </div>
          </div>
        )}
      </Modal>

      {/* SMS Campaign modal */}
      <Modal open={smsModal} onClose={() => setSmsModal(false)} title="Campagne SMS" maxWidth="max-w-lg">
        <form onSubmit={e => { e.preventDefault(); toast.success('Campagne envoyée à 847 clients !'); setSmsModal(false) }} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Segment ciblé</label>
            <select className="input text-sm appearance-none cursor-pointer">
              <option>Tous les clients (847)</option>
              <option>VIP (42)</option>
              <option>Réguliers (285)</option>
              <option>Occasionnels (380)</option>
              <option>Inactifs (140)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Message (160 car. max)</label>
            <textarea rows={3} maxLength={160} placeholder="Chez Mama: -20% sur votre prochain repas avec le code MAMA20! Valable ce weekend. A bientôt!" className="input text-sm resize-none" />
          </div>
          <div className="p-3 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--color-text-muted)]">Coût estimé</span>
              <span className="font-semibold text-white">847 SMS x 25 FCFA = {formatPrice(847 * 25)}</span>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setSmsModal(false)} className="btn-secondary flex-1 py-3 text-sm">Annuler</button>
            <button type="submit" className="btn-primary flex-[2] py-3 text-sm flex items-center justify-center gap-2"><Send size={14} /> Envoyer la campagne</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
