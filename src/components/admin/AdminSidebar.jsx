import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getInitials } from '../../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, UtensilsCrossed, Building2, ClipboardList,
  Users, BarChart3, Heart, CreditCard, Settings, LogOut,
  Cloud, ChevronLeft, ChevronRight, HelpCircle,
  Package, UserCheck, CalendarDays, Percent, MessageCircle, Bell
} from 'lucide-react'

const navigation = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
  { to: '/admin/menu', icon: UtensilsCrossed, label: 'Menu & Plats' },
  { to: '/admin/orders', icon: ClipboardList, label: 'Commandes' },
  { to: '/admin/reservations', icon: CalendarDays, label: 'Réservations' },
  { to: '/admin/inventory', icon: Package, label: 'Stock & Inventaire' },
  { to: '/admin/crm', icon: UserCheck, label: 'Clients & CRM' },
  { to: '/admin/whatsapp', icon: MessageCircle, label: 'WhatsApp' },
  { to: '/admin/branches', icon: Building2, label: 'Mes Branches' },
  { to: '/admin/team', icon: Users, label: 'Équipe' },
  { to: '/admin/promotions', icon: Percent, label: 'Promotions' },
  { to: '/admin/loyalty', icon: Heart, label: 'Fidélité' },
  { to: '/admin/reports', icon: BarChart3, label: 'Rapports' },
  { to: '/admin/notifications', icon: Bell, label: 'Notifications' },
  { to: '/admin/subscription', icon: CreditCard, label: 'Abonnement' },
  { to: '/admin/settings', icon: Settings, label: 'Paramètres' },
]

export default function AdminSidebar({ collapsed, setCollapsed, onNavigate }) {
  const { profile, restaurant, signOut } = useAuth()
  const location = useLocation()

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 bottom-0 bg-[var(--color-bg-sidebar)] border-r border-[var(--color-border)] flex flex-col z-40 overflow-hidden"
    >
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 border-b border-[var(--color-border)] px-4 shrink-0">
        <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-light)] flex items-center justify-center shadow-lg shadow-[var(--color-gold)]/20 shrink-0">
          <Cloud size={14} className="text-[var(--color-bg-main)] absolute top-1 left-1.5" />
          <UtensilsCrossed size={10} className="text-[var(--color-bg-main)] absolute bottom-1 right-1" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <p className="text-sm font-bold text-white leading-tight">LB Stay Cloud</p>
              <p className="text-[10px] text-[var(--color-text-muted)] truncate max-w-[160px]">
                {restaurant?.name || 'Mon Restaurant'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-4 -right-3 w-6 h-6 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-white hover:border-[var(--color-gold)]/40 transition-all z-50"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto overflow-x-hidden">
        {navigation.map((item) => {
          const Icon = item?.icon || HelpCircle
          const isActive =
            location.pathname === item.to ||
            (item.to !== '/admin/dashboard' && location.pathname.startsWith(item.to))
          const isDashboard =
            item.to === '/admin/dashboard' &&
            (location.pathname === '/admin' || location.pathname === '/admin/dashboard')

          return (
            <NavLink key={item.to} to={item.to} className="block" onClick={onNavigate}>
              <motion.div
                whileHover={{ x: collapsed ? 0 : 2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  collapsed ? 'px-0 py-2.5 justify-center' : 'px-4 py-2.5'
                } ${
                  isActive || isDashboard
                    ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
                    : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/[0.03]'
                }`}
                title={collapsed ? item.label : undefined}
              >
                {(isActive || isDashboard) && !collapsed && (
                  <motion.div
                    layoutId="admin-sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[var(--color-gold)] rounded-r-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={18} className="shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </NavLink>
          )
        })}
      </nav>

      {/* Profil */}
      <div className="border-t border-[var(--color-border)] p-3 shrink-0">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <NavLink to="/admin/profile" onClick={onNavigate} className="shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-accent)] flex items-center justify-center text-xs font-bold text-white hover:ring-2 hover:ring-[var(--color-gold)]/40 transition-all">
              {profile ? getInitials(profile.full_name || 'U') : 'U'}
            </div>
          </NavLink>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 min-w-0 overflow-hidden"
              >
                <p className="text-xs font-semibold text-white truncate">
                  {profile?.full_name || 'Utilisateur'}
                </p>
                <p className="text-[10px] text-[var(--color-text-muted)] truncate">
                  {profile?.role === 'admin' ? 'Administrateur' : profile?.role || 'admin'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          {!collapsed && (
            <button
              onClick={signOut}
              className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-all shrink-0"
              title="Déconnexion"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  )
}
