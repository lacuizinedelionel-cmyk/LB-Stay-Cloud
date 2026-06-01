import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2, MapPin, Users, Phone, Clock, Plus, Pencil, Trash2,
  CheckCircle, XCircle, BarChart3, Eye
} from 'lucide-react'
import { formatPrice } from '../../lib/utils'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import toast from 'react-hot-toast'

const demoBranches = [
  {
    id: 'b1', name: 'Douala — Akwa', address: 'Rue de la Joie, Akwa, Douala',
    phone: '+237 6 99 12 34 56', manager: 'Marie Fotso', staff: 8, tables: 12,
    hours: '08h00 - 23h00', status: 'active',
    kpis: { ca_day: 547000, orders_day: 86, clients_day: 62, rating: 4.8 },
  },
  {
    id: 'b2', name: 'Yaoundé — Bastos', address: 'Avenue Kennedy, Bastos, Yaoundé',
    phone: '+237 6 77 88 99 00', manager: 'Paul Ndjock', staff: 6, tables: 10,
    hours: '09h00 - 22h30', status: 'active',
    kpis: { ca_day: 385000, orders_day: 54, clients_day: 41, rating: 4.6 },
  },
  {
    id: 'b3', name: 'Bafoussam — Centre', address: 'Carrefour Total, Bafoussam',
    phone: '+237 6 55 44 33 22', manager: 'Jean Kamga', staff: 4, tables: 8,
    hours: '08h30 - 22h00', status: 'active',
    kpis: { ca_day: 215000, orders_day: 32, clients_day: 24, rating: 4.5 },
  },
]

export default function AdminBranchesPage() {
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [addModal, setAddModal] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Mes Branches</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{demoBranches.length} branches actives</p>
        </div>
        <button onClick={() => setAddModal(true)} className="btn-primary flex items-center gap-2 text-sm py-2.5 px-5">
          <Plus size={15} /> Nouvelle branche
        </button>
      </div>

      {/* Branch cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {demoBranches.map((branch, i) => (
          <motion.div
            key={branch.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 hover:border-[var(--color-border-active)] transition-all cursor-pointer group"
            onClick={() => setSelectedBranch(branch)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center">
                  <Building2 size={20} className="text-[var(--color-gold)]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{branch.name}</h3>
                  <p className="text-[10px] text-[var(--color-text-muted)] flex items-center gap-1"><MapPin size={9} />{branch.address}</p>
                </div>
              </div>
              <Badge variant={branch.status === 'active' ? 'success' : 'danger'}>
                {branch.status === 'active' ? 'Actif' : 'Fermé'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[var(--color-bg-main)] rounded-xl p-3 text-center">
                <p className="text-[9px] text-[var(--color-text-muted)]">CA du jour</p>
                <p className="text-sm font-bold text-[var(--color-gold)]">{formatPrice(branch.kpis.ca_day)}</p>
              </div>
              <div className="bg-[var(--color-bg-main)] rounded-xl p-3 text-center">
                <p className="text-[9px] text-[var(--color-text-muted)]">Commandes</p>
                <p className="text-sm font-bold text-[var(--color-success)]">{branch.kpis.orders_day}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[var(--color-text-muted)] pt-3 border-t border-[var(--color-border)]">
              <span className="flex items-center gap-1"><Users size={10} />{branch.staff} employés</span>
              <span className="flex items-center gap-1"><Clock size={10} />{branch.hours}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Branch detail modal */}
      <Modal open={!!selectedBranch} onClose={() => setSelectedBranch(null)} title={selectedBranch?.name} maxWidth="max-w-2xl">
        {selectedBranch && (
          <div className="space-y-5">
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'CA jour', value: formatPrice(selectedBranch.kpis.ca_day), color: 'var(--color-gold)' },
                { label: 'Commandes', value: selectedBranch.kpis.orders_day, color: 'var(--color-success)' },
                { label: 'Clients', value: selectedBranch.kpis.clients_day, color: 'var(--color-accent)' },
                { label: 'Note', value: `${selectedBranch.kpis.rating}/5`, color: 'var(--color-warning)' },
              ].map((kpi, i) => (
                <div key={i} className="bg-[var(--color-bg-main)] rounded-xl p-4 text-center border border-[var(--color-border)]">
                  <p className="text-[9px] text-[var(--color-text-muted)] mb-1">{kpi.label}</p>
                  <p className="text-lg font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"><MapPin size={14} className="text-[var(--color-gold)]" />{selectedBranch.address}</div>
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"><Phone size={14} className="text-[var(--color-gold)]" />{selectedBranch.phone}</div>
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"><Clock size={14} className="text-[var(--color-gold)]" />{selectedBranch.hours}</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"><Users size={14} className="text-[var(--color-gold)]" />{selectedBranch.staff} employés · {selectedBranch.tables} tables</div>
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"><Users size={14} className="text-[var(--color-gold)]" />Manager: {selectedBranch.manager}</div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setSelectedBranch(null)} className="btn-secondary flex-1 py-3 text-sm">Fermer</button>
              <button className="btn-primary flex-1 py-3 text-sm flex items-center justify-center gap-2"><Pencil size={14} /> Modifier</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add branch modal */}
      <Modal open={addModal} onClose={() => setAddModal(false)} title="Nouvelle branche" maxWidth="max-w-lg">
        <form onSubmit={e => { e.preventDefault(); toast.success('Branche créée !'); setAddModal(false) }} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Nom de la branche</label>
            <input type="text" placeholder="Ex: Kribi — Centre-ville" required className="input text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Adresse</label>
              <input type="text" placeholder="Adresse complète" className="input text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Téléphone</label>
              <input type="tel" placeholder="+237 6 XX XX XX XX" className="input text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Manager</label>
              <input type="text" placeholder="Nom du responsable" className="input text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Horaires</label>
              <input type="text" placeholder="08h00 - 23h00" className="input text-sm" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setAddModal(false)} className="btn-secondary flex-1 py-3 text-sm">Annuler</button>
            <button type="submit" className="btn-primary flex-[2] py-3 text-sm flex items-center justify-center gap-2"><Plus size={14} /> Créer la branche</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
