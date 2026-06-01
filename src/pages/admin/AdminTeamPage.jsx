import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, Plus, Pencil, Trash2, Search, Shield, Clock, Phone,
  Mail, MapPin, Check, X, MoreHorizontal, Star
} from 'lucide-react'
import { getInitials } from '../../lib/utils'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import toast from 'react-hot-toast'

const roleConfig = {
  admin: { label: 'Administrateur', variant: 'gold', permissions: 'Accès complet' },
  manager: { label: 'Manager', variant: 'info', permissions: 'Gestion branche' },
  cashier: { label: 'Caissier(e)', variant: 'success', permissions: 'POS uniquement' },
  waiter: { label: 'Serveur(se)', variant: 'accent', permissions: 'Commandes & service' },
  chef: { label: 'Chef cuisinier', variant: 'warning', permissions: 'Cuisine & préparation' },
}

const demoTeam = [
  { id: 't1', name: 'Marie Fotso', email: 'marie@chezmama.cm', phone: '+237 6 99 12 34 56', role: 'manager', branch: 'Douala — Akwa', status: 'active', avatar: null, joined: '2025-03-15', schedule: 'Lun-Ven 08h-17h', performance: 94 },
  { id: 't2', name: 'Paul Ndjock', email: 'paul@chezmama.cm', phone: '+237 6 77 88 99 00', role: 'cashier', branch: 'Douala — Akwa', status: 'active', avatar: null, joined: '2025-06-20', schedule: 'Lun-Sam 10h-19h', performance: 88 },
  { id: 't3', name: 'Awa Diallo', email: 'awa@chezmama.cm', phone: '+237 6 55 44 33 22', role: 'waiter', branch: 'Douala — Akwa', status: 'active', avatar: null, joined: '2025-09-01', schedule: 'Mar-Dim 11h-20h', performance: 91 },
  { id: 't4', name: 'Jean Kamga', email: 'jean@chezmama.cm', phone: '+237 6 90 11 22 33', role: 'manager', branch: 'Bafoussam', status: 'active', avatar: null, joined: '2025-01-10', schedule: 'Lun-Ven 08h30-17h30', performance: 87 },
  { id: 't5', name: 'Fatou Mbaye', email: 'fatou@chezmama.cm', phone: '+237 6 78 56 34 12', role: 'chef', branch: 'Douala — Akwa', status: 'active', avatar: null, joined: '2024-11-05', schedule: 'Lun-Sam 07h-16h', performance: 96 },
  { id: 't6', name: 'David Tchoupo', email: 'david@chezmama.cm', phone: '+237 6 22 33 44 55', role: 'waiter', branch: 'Yaoundé — Bastos', status: 'active', avatar: null, joined: '2026-01-15', schedule: 'Mer-Lun 11h-20h', performance: 82 },
  { id: 't7', name: 'Sophie Atangana', email: 'sophie@chezmama.cm', phone: '+237 6 80 12 45 67', role: 'cashier', branch: 'Yaoundé — Bastos', status: 'inactive', avatar: null, joined: '2025-04-22', schedule: '—', performance: 0 },
  { id: 't8', name: 'Pierre Essomba', email: 'pierre@chezmama.cm', phone: '+237 6 99 88 77 66', role: 'chef', branch: 'Bafoussam', status: 'active', avatar: null, joined: '2025-08-12', schedule: 'Mar-Dim 07h-16h', performance: 90 },
]

export default function AdminTeamPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [addModal, setAddModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)

  const filtered = demoTeam.filter(m => {
    if (filterRole !== 'all' && m.role !== filterRole) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.branch.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Équipe</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{demoTeam.filter(m => m.status === 'active').length} membres actifs sur {demoTeam.length}</p>
        </div>
        <button onClick={() => setAddModal(true)} className="btn-primary flex items-center gap-2 text-sm py-2.5 px-5">
          <Plus size={15} /> Ajouter un membre
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Rechercher un membre..." className="input pl-9 text-sm py-2" />
        </div>
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="input text-sm py-2 w-44 appearance-none cursor-pointer">
          <option value="all">Tous les rôles</option>
          {Object.entries(roleConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      {/* Team grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((member, i) => {
          const role = roleConfig[member.role]
          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedMember(member)}
              className="glass-card p-5 hover:border-[var(--color-border-active)] transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-accent)] flex items-center justify-center text-xs font-bold text-white">
                    {getInitials(member.name)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{member.name}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">{member.email}</p>
                  </div>
                </div>
                <div className={`w-2.5 h-2.5 rounded-full ${member.status === 'active' ? 'bg-[var(--color-success)] animate-pulse-dot' : 'bg-[var(--color-text-muted)]'}`} />
              </div>

              <div className="flex items-center justify-between mb-3">
                <Badge variant={role.variant}>{role.label}</Badge>
                <span className="text-[10px] text-[var(--color-text-muted)]">{member.branch}</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
                <div className="flex items-center gap-1.5 text-[10px] text-[var(--color-text-muted)]">
                  <Clock size={10} /> {member.schedule}
                </div>
                {member.performance > 0 && (
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-[var(--color-gold)]">
                    <Star size={10} /> {member.performance}%
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Add member modal */}
      <Modal open={addModal} onClose={() => setAddModal(false)} title="Ajouter un membre" maxWidth="max-w-lg">
        <form onSubmit={e => { e.preventDefault(); toast.success('Invitation envoyée !'); setAddModal(false) }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Nom complet</label>
              <input type="text" placeholder="Prénom Nom" required className="input text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Email</label>
              <input type="email" placeholder="email@exemple.cm" required className="input text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Rôle</label>
              <select required className="input text-sm appearance-none cursor-pointer">
                {Object.entries(roleConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Branche</label>
              <select required className="input text-sm appearance-none cursor-pointer">
                <option>Douala — Akwa</option>
                <option>Yaoundé — Bastos</option>
                <option>Bafoussam</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Téléphone</label>
            <input type="tel" placeholder="+237 6 XX XX XX XX" className="input text-sm" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setAddModal(false)} className="btn-secondary flex-1 py-3 text-sm">Annuler</button>
            <button type="submit" className="btn-primary flex-[2] py-3 text-sm flex items-center justify-center gap-2"><Mail size={14} /> Envoyer l'invitation</button>
          </div>
        </form>
      </Modal>

      {/* Member detail modal */}
      <Modal open={!!selectedMember} onClose={() => setSelectedMember(null)} title={selectedMember?.name} maxWidth="max-w-md">
        {selectedMember && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-[var(--color-border)]">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-accent)] flex items-center justify-center text-sm font-bold text-white">
                {getInitials(selectedMember.name)}
              </div>
              <div>
                <p className="text-base font-bold text-white">{selectedMember.name}</p>
                <Badge variant={roleConfig[selectedMember.role].variant}>{roleConfig[selectedMember.role].label}</Badge>
              </div>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]"><Mail size={14} className="text-[var(--color-gold)]" /> {selectedMember.email}</div>
              <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]"><Phone size={14} className="text-[var(--color-gold)]" /> {selectedMember.phone}</div>
              <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]"><MapPin size={14} className="text-[var(--color-gold)]" /> {selectedMember.branch}</div>
              <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]"><Clock size={14} className="text-[var(--color-gold)]" /> {selectedMember.schedule}</div>
              <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]"><Shield size={14} className="text-[var(--color-gold)]" /> {roleConfig[selectedMember.role].permissions}</div>
            </div>
            {selectedMember.performance > 0 && (
              <div className="bg-[var(--color-bg-main)] rounded-xl p-4 border border-[var(--color-border)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[var(--color-text-muted)]">Performance</span>
                  <span className="text-sm font-bold text-[var(--color-gold)]">{selectedMember.performance}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[var(--color-bg-card)] overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)]" style={{ width: `${selectedMember.performance}%` }} />
                </div>
              </div>
            )}
            <div className="flex gap-3 pt-2">
              <button onClick={() => setSelectedMember(null)} className="btn-secondary flex-1 py-3 text-sm">Fermer</button>
              <button className="btn-primary flex-1 py-3 text-sm flex items-center justify-center gap-2"><Pencil size={14} /> Modifier</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
