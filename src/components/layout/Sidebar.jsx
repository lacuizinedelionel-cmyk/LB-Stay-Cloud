import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getInitials } from '../../lib/utils'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, ShoppingCart, UtensilsCrossed, ClipboardList,
  BarChart3, Users, MessageCircle, Settings, LogOut, Zap, HelpCircle
} from 'lucide-react'

const navigation = [
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/app/pos', icon: ShoppingCart, label: 'Caisse / POS' },
  { to: '/app/menu', icon: UtensilsCrossed, label: 'Menu & Catalogue' },
  { to: '/app/orders', icon: ClipboardList, label: 'Commandes' },
  { to: '/app/reports', icon: BarChart3, label: 'Rapports' },
  { to: '/app/crm', icon: Users, label: 'Clients & CRM' },
  { to: '/app/whatsapp', icon: MessageCircle, label: 'WhatsApp' },
  { to: '/app/settings', icon: Settings, label: 'Paramètres' },
]

export default function Sidebar() {
  const { profile, signOut } = useAuth()
  const location = useLocation()

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-[var(--color-bg-sidebar)] border-r border-[var(--color-border)] flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 h-16 flex items-center gap-3 border-b border-[var(--color-border)]">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-light)] flex items-center justify-center shadow-lg shadow-[var(--color-gold)]/20">
          <Zap size={18} className="text-[var(--color-bg-main)]" />
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-tight">LB Stay Cloud</p>
          <p className="text-[10px] text-[var(--color-text-muted)]">Multi-Restaurants</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item?.icon || HelpCircle
          const isActive = location.pathname === item.to || (item.to !== '/app/dashboard' && location.pathname.startsWith(item.to))
          const isDashboard = item.to === '/app/dashboard' && (location.pathname === '/app' || location.pathname === '/app/dashboard')

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="block"
            >
              <motion.div
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive || isDashboard
                    ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
                    : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {(isActive || isDashboard) && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[var(--color-gold)] rounded-r-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={18} />
                <span>{item.label}</span>
              </motion.div>
            </NavLink>
          )
        })}
      </nav>

      {/* Profil */}
      <div className="border-t border-[var(--color-border)] p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-accent)] flex items-center justify-center text-xs font-bold text-white">
            {profile ? getInitials(profile.full_name || 'U') : 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{profile?.full_name || 'Utilisateur'}</p>
            <p className="text-[10px] text-[var(--color-text-muted)] truncate">{profile?.role || 'admin'}</p>
          </div>
          <button
            onClick={signOut}
            className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-all"
            title="Déconnexion"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}
