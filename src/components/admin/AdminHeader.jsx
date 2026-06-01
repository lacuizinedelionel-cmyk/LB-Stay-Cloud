import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRestaurant } from '../../context/RestaurantContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, ChevronDown, MapPin, Calendar, Clock, Menu } from 'lucide-react'

export default function AdminHeader({ sidebarWidth, onMenuToggle }) {
  const navigate = useNavigate()
  const { branches, activeBranch, setActiveBranch } = useRestaurant()
  const [branchOpen, setBranchOpen] = useState(false)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const dateStr = now.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const timeStr = now.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <header
      className="fixed top-0 right-0 h-16 glass border-b border-[var(--color-border)] flex items-center justify-between px-8 z-30 transition-all duration-300"
      style={{ left: sidebarWidth }}
    >
      {/* Mobile menu button + Date & heure */}
      <div className="flex items-center gap-4">
        {onMenuToggle && (
          <button onClick={onMenuToggle} className="lg:hidden p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5 transition-all">
            <Menu size={20} />
          </button>
        )}
        <div className="hidden md:flex items-center gap-2 text-sm">
          <Calendar size={14} className="text-[var(--color-gold)]" />
          <span className="text-[var(--color-text-secondary)] capitalize">{dateStr}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-mono">
          <Clock size={14} className="text-[var(--color-gold)]" />
          <span className="text-white font-semibold">{timeStr}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Sélecteur branche */}
        <div className="relative">
          <button
            onClick={() => setBranchOpen(!branchOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:text-white transition-all"
          >
            <MapPin size={14} className="text-[var(--color-gold)]" />
            <span className="max-w-40 truncate">{activeBranch?.name || 'Toutes les branches'}</span>
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
                  className="absolute top-full mt-2 right-0 w-64 glass-card p-2 z-50"
                >
                  <button
                    onClick={() => { setActiveBranch(null); setBranchOpen(false) }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${
                      !activeBranch
                        ? 'text-[var(--color-gold)] bg-[var(--color-gold)]/5'
                        : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    <p className="font-medium">Toutes les branches</p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">Vue globale</p>
                  </button>
                  {branches.length > 0 && (
                    <div className="h-px bg-[var(--color-border)] my-1" />
                  )}
                  {branches.map((b) => (
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
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <button
          onClick={() => navigate('/admin/notifications')}
          className="relative p-2.5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-white transition-all"
        >
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-[var(--color-danger)] rounded-full text-[9px] font-bold flex items-center justify-center text-white animate-pulse">
            5
          </span>
        </button>
      </div>
    </header>
  )
}
