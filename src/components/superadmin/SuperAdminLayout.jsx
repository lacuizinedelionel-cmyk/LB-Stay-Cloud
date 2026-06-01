import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getInitials } from '../../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Building2, Users, BarChart3, Settings, LogOut,
  ChevronLeft, ChevronRight, Bell, Shield, HelpCircle
} from 'lucide-react'

const navigation = [
  { to: '/super-admin/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
  { to: '/super-admin/businesses', icon: Building2, label: 'Enseignes' },
  { to: '/super-admin/users', icon: Users, label: 'Utilisateurs' },
  { to: '/super-admin/reports', icon: BarChart3, label: 'Rapports' },
  { to: '/super-admin/settings', icon: Settings, label: 'Paramètres' },
]

export default function SuperAdminLayout({ children }) {
  const { profile, signOut } = useAuth()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [now, setNow] = useState(new Date())
  const sidebarWidth = collapsed ? 72 : 260

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed left-0 top-0 bottom-0 bg-[var(--color-bg-sidebar)] border-r border-[var(--color-border)] flex flex-col z-40 overflow-hidden"
      >
        <div className="h-16 flex items-center gap-3 border-b border-[var(--color-border)] px-4 shrink-0">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-gold)] flex items-center justify-center shadow-lg shrink-0">
            <Shield size={16} className="text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden whitespace-nowrap">
                <p className="text-sm font-bold text-white leading-tight">LB Stay Cloud</p>
                <p className="text-[10px] text-[var(--color-accent)] font-semibold">SUPER ADMIN</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button onClick={() => setCollapsed(!collapsed)} className="absolute top-4 -right-3 w-6 h-6 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-white z-50 transition-all">
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>

        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item?.icon || HelpCircle
            const isActive = location.pathname === item.to || (item.to !== '/super-admin/dashboard' && item.to !== '/super-admin/dashboard' && location.pathname.startsWith(item.to))
            const isIndex = item.to === '/super-admin/dashboard' && (location.pathname === '/super-admin' || location.pathname === '/super-admin/dashboard')
            return (
              <NavLink key={item.to} to={item.to} className="block">
                <div className={`relative flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 ${collapsed ? 'px-0 py-2.5 justify-center' : 'px-4 py-2.5'} ${isActive || isIndex ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/[0.03]'}`} title={collapsed ? item.label : undefined}>
                  {(isActive || isIndex) && !collapsed && (
                    <motion.div layoutId="sa-sidebar-active" className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[var(--color-accent)] rounded-r-full" />
                  )}
                  <Icon size={18} className="shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </div>
              </NavLink>
            )
          })}
        </nav>

        <div className="border-t border-[var(--color-border)] p-3 shrink-0">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-gold)] flex items-center justify-center text-xs font-bold text-white shrink-0">
              {profile ? getInitials(profile.full_name || 'SA') : 'SA'}
            </div>
            {!collapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{profile?.full_name || 'Super Admin'}</p>
                  <p className="text-[10px] text-[var(--color-accent)]">Super Admin</p>
                </div>
                <button onClick={signOut} className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-all" title="Déconnexion">
                  <LogOut size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Header */}
      <header className="fixed top-0 right-0 h-16 glass border-b border-[var(--color-border)] flex items-center justify-between px-8 z-30 transition-all" style={{ left: sidebarWidth }}>
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-white">Tableau de bord global</h1>
          <span className="badge badge-accent text-[10px]">
            <Shield size={10} /> SUPER ADMIN
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-[var(--color-text-muted)] font-mono">{now.toLocaleTimeString('fr-FR')}</span>
          <button className="relative p-2.5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-white transition-all">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-danger)] rounded-full text-[9px] font-bold flex items-center justify-center text-white animate-pulse">7</span>
          </button>
        </div>
      </header>

      <main className="pt-16 p-8 min-h-screen transition-all" style={{ marginLeft: sidebarWidth }}>
        {children}
      </main>
    </div>
  )
}
