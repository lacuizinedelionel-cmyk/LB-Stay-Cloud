import { useState } from 'react'
import { useDemo } from '../context/DemoContext'
import DemoTooltip from './DemoTooltip'
import {
  LayoutDashboard, ShoppingCart, BookOpen, BarChart3, Users, MessageCircle,
  Hotel, Shield, Settings, ChevronLeft, ChevronRight, Bell, ChevronDown,
  User, Search, LogOut, UtensilsCrossed, Scissors, Heart, Wrench
} from 'lucide-react'

const sectorModules = {
  hotel: { label: 'Gestion Hôtel', icon: Hotel },
  restaurant: { label: 'Gestion Restaurant', icon: UtensilsCrossed },
  beaute: { label: 'Gestion Salon', icon: Scissors },
  sante: { label: 'Gestion Santé', icon: Heart },
  garage: { label: 'Gestion Garage', icon: Wrench },
  epicerie: { label: 'Gestion Épicerie', icon: ShoppingCart },
}

const branches = [
  { id: 1, nom: 'Branche Douala — Akwa' },
  { id: 2, nom: 'Branche Yaoundé — Bastos' },
  { id: 3, nom: 'Branche Bafoussam — Centre' },
]

export default function DashboardLayout({ children, activeMenu = 'dashboard', tooltipSidebar = false }) {
  const { selectedSector, brandConfig } = useDemo()
  const [collapsed, setCollapsed] = useState(false)
  const [brancheOuverte, setBrancheOuverte] = useState(false)
  const [brancheActive, setBrancheActive] = useState(branches[0])
  const [notifOuverte, setNotifOuverte] = useState(false)

  const sectorMod = sectorModules[selectedSector] || sectorModules.hotel

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'commandes', label: 'Commandes', icon: ShoppingCart },
    { id: 'menu', label: 'Menu / Catalogue', icon: BookOpen },
    { id: 'rapports', label: 'Rapports', icon: BarChart3 },
    { id: 'clients', label: 'Clients & Fidélité', icon: Users },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    { id: 'secteur', label: sectorMod.label, icon: sectorMod.icon },
    { id: 'superadmin', label: 'Super Admin', icon: Shield },
    { id: 'parametres', label: 'Paramètres', icon: Settings },
  ]

  const notifications = [
    { texte: 'Nouvelle commande #1247 — 45 000 XAF', temps: 'Il y a 2 min', type: 'info' },
    { texte: 'Stock bas : Coca-Cola 33cl < seuil', temps: 'Il y a 15 min', type: 'warning' },
    { texte: 'Paiement reçu : Mobile Money 120 000 XAF', temps: 'Il y a 32 min', type: 'success' },
  ]

  return (
    <div className="animate-fade-slide flex min-h-[calc(100vh-4rem)]">
      {/* ═══ SIDEBAR ═══ */}
      <DemoTooltip label={tooltipSidebar ? "Sidebar — navigation entre modules" : ""} position="right" visible={tooltipSidebar}>
        <aside className={`shrink-0 bg-[var(--color-card)] border-r border-[var(--color-border)] flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
          {/* Logo */}
          <div className="h-14 flex items-center justify-between px-4 border-b border-[var(--color-border)]">
            {!collapsed && (
              <span className="text-sm font-bold text-[var(--color-primary)] font-[family-name:var(--font-title)] truncate">
                {brandConfig.companyName}
              </span>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors ml-auto"
            >
              {collapsed ? <ChevronRight size={16} className="text-[var(--color-text-muted)]" /> : <ChevronLeft size={16} className="text-[var(--color-text-muted)]" />}
            </button>
          </div>

          {/* Items */}
          <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto scrollbar-hide">
            {menuItems.map(item => {
              const Icon = item.icon
              const actif = activeMenu === item.id
              return (
                <button
                  key={item.id}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${
                    actif
                      ? 'bg-[var(--color-primary)]/15 text-[var(--color-primary)]'
                      : 'text-[var(--color-text-muted)] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={18} className={actif ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] group-hover:text-white'} />
                  {!collapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
                </button>
              )
            })}
          </nav>

          {/* Profil bas */}
          {!collapsed && (
            <div className="p-3 border-t border-[var(--color-border)]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/20 flex items-center justify-center">
                  <User size={14} className="text-[var(--color-primary)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">Admin Démo</p>
                  <p className="text-[10px] text-[var(--color-text-muted)]">admin@demo-lbstay.cm</p>
                </div>
                <LogOut size={14} className="text-[var(--color-text-muted)] shrink-0 cursor-pointer hover:text-[var(--color-error)]" />
              </div>
            </div>
          )}
        </aside>
      </DemoTooltip>

      {/* ═══ CONTENU PRINCIPAL ═══ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-14 bg-[var(--color-card)] border-b border-[var(--color-border)] flex items-center justify-between px-5 shrink-0">
          {/* Fil d'ariane */}
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <span>{brandConfig.companyName}</span>
            <span>/</span>
            <span className="text-white font-medium">{menuItems.find(m => m.id === activeMenu)?.label || 'Dashboard'}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Dropdown branche */}
            <DemoTooltip label="Basculer entre branches / points de vente" position="bottom" visible={tooltipSidebar}>
              <div className="relative">
                <button
                  onClick={() => { setBrancheOuverte(!brancheOuverte); setNotifOuverte(false) }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-bg-main)] border border-[var(--color-border)] text-xs text-white hover:border-[var(--color-primary)]/40 transition-colors"
                >
                  <span className="truncate max-w-36">{brancheActive.nom}</span>
                  <ChevronDown size={14} className="text-[var(--color-text-muted)]" />
                </button>
                {brancheOuverte && (
                  <div className="absolute right-0 top-full mt-1 w-64 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl shadow-xl z-30 py-1 animate-fade-slide">
                    {branches.map(b => (
                      <button
                        key={b.id}
                        onClick={() => { setBrancheActive(b); setBrancheOuverte(false) }}
                        className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                          brancheActive.id === b.id ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10' : 'text-[var(--color-text-muted)] hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {b.nom}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </DemoTooltip>

            {/* Cloche notifications */}
            <div className="relative">
              <button
                onClick={() => { setNotifOuverte(!notifOuverte); setBrancheOuverte(false) }}
                className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Bell size={18} className="text-[var(--color-text-muted)]" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--color-error)]" />
              </button>
              {notifOuverte && (
                <div className="absolute right-0 top-full mt-1 w-72 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl shadow-xl z-30 animate-fade-slide">
                  <div className="p-3 border-b border-[var(--color-border)]">
                    <span className="text-xs font-semibold text-white">Notifications</span>
                  </div>
                  {notifications.map((n, i) => (
                    <div key={i} className="px-3 py-2.5 border-b border-[var(--color-border)] last:border-0 hover:bg-white/[0.02]">
                      <p className="text-xs text-white">{n.texte}</p>
                      <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{n.temps}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/20 flex items-center justify-center cursor-pointer">
              <User size={14} className="text-[var(--color-primary)]" />
            </div>
          </div>
        </header>

        {/* Contenu */}
        <main className="flex-1 overflow-y-auto p-5">
          {children}
        </main>
      </div>
    </div>
  )
}
