import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useRestaurant } from '../../context/RestaurantContext'
import { getInitials } from '../../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, ChevronDown, Search, MapPin } from 'lucide-react'

const pageTitles = {
  '/app': 'Dashboard',
  '/app/dashboard': 'Dashboard',
  '/app/pos': 'Caisse / POS',
  '/app/menu': 'Menu & Catalogue',
  '/app/orders': 'Commandes',
  '/app/reports': 'Rapports',
  '/app/crm': 'Clients & CRM',
  '/app/whatsapp': 'WhatsApp',
  '/app/settings': 'Paramètres',
}

export default function Header() {
  const location = useLocation()
  const { profile } = useAuth()
  const { branches, activeBranch, setActiveBranch } = useRestaurant()
  const [branchOpen, setBranchOpen] = useState(false)

  const title = pageTitles[location.pathname] || 'LB Stay Cloud'

  return (
    <header className="fixed top-0 left-[260px] right-0 h-16 glass border-b border-[var(--color-border)] flex items-center justify-between px-8 z-30">
      <div>
        <h1 className="text-lg font-bold text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Recherche */}
        <div className="relative hidden lg:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="input pl-9 pr-4 py-2 w-56 text-sm"
          />
        </div>

        {/* Sélecteur branche */}
        <div className="relative">
          <button
            onClick={() => setBranchOpen(!branchOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:text-white transition-all"
          >
            <MapPin size={14} className="text-[var(--color-gold)]" />
            <span className="max-w-32 truncate">{activeBranch?.name || 'Sélectionner'}</span>
            <ChevronDown size={14} className={`transition-transform ${branchOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {branchOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setBranchOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute top-full mt-2 right-0 w-60 glass-card p-2 z-50"
                >
                  {branches.length > 0 ? branches.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => { setActiveBranch(b); setBranchOpen(false) }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${
                        activeBranch?.id === b.id
                          ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/5'
                          : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/[0.03]'
                      }`}
                    >
                      <p className="font-medium">{b.name}</p>
                      <p className="text-[10px] text-[var(--color-text-muted)]">{b.city}</p>
                    </button>
                  )) : (
                    <p className="px-3 py-4 text-sm text-[var(--color-text-muted)] text-center">Aucune branche</p>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-white transition-all">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-danger)] rounded-full text-[9px] font-bold flex items-center justify-center text-white">
            3
          </span>
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-accent)] flex items-center justify-center text-xs font-bold text-white cursor-pointer shadow-lg shadow-[var(--color-gold)]/15">
          {profile ? getInitials(profile.full_name || 'U') : 'U'}
        </div>
      </div>
    </header>
  )
}
