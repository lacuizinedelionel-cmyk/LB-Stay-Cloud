import { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const sidebarWidth = collapsed ? 72 : 260

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar — hidden on mobile unless mobileOpen */}
      <div className={`fixed inset-y-0 left-0 z-50 lg:z-40 transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} onNavigate={() => setMobileOpen(false)} />
      </div>

      <AdminHeader sidebarWidth={sidebarWidth} onMenuToggle={() => setMobileOpen(true)} />
      <main
        className="pt-16 p-4 md:p-8 min-h-screen transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        {children}
      </main>
    </div>
  )
}
