import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { RestaurantProvider } from './context/RestaurantContext'
import AdminLayout from './components/admin/AdminLayout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import POSPage from './pages/POSPage'
import AdminMenuPage from './pages/admin/AdminMenuPage'
import AdminOrdersPage from './pages/admin/AdminOrdersPage'
import AdminBranchesPage from './pages/admin/AdminBranchesPage'
import AdminTeamPage from './pages/admin/AdminTeamPage'
import AdminReportsPage from './pages/admin/AdminReportsPage'
import AdminLoyaltyPage from './pages/admin/AdminLoyaltyPage'
import AdminSubscriptionPage from './pages/admin/AdminSubscriptionPage'
import AdminSettingsPage from './pages/admin/AdminSettingsPage'
import AdminInventoryPage from './pages/admin/AdminInventoryPage'
import AdminCRMPage from './pages/admin/AdminCRMPage'
import AdminReservationsPage from './pages/admin/AdminReservationsPage'
import AdminPromotionsPage from './pages/admin/AdminPromotionsPage'
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage'
import AdminProfilePage from './pages/admin/AdminProfilePage'
import AdminWhatsAppPage from './pages/admin/AdminWhatsAppPage'
import KitchenDisplayPage from './pages/KitchenDisplayPage'
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard'
import SuperAdminLayout from './components/superadmin/SuperAdminLayout'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[var(--color-bg-main)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[var(--color-text-secondary)]">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return (
    <RestaurantProvider>
      {children}
    </RestaurantProvider>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* POS — plein écran, pas de layout wrapper */}
      <Route
        path="/pos"
        element={
          <ProtectedRoute>
            <POSPage />
          </ProtectedRoute>
        }
      />

      {/* Kitchen Display — plein écran */}
      <Route
        path="/kitchen"
        element={
          <ProtectedRoute>
            <KitchenDisplayPage />
          </ProtectedRoute>
        }
      />

      {/* Admin restaurant routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route index element={<AdminDashboardPage />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="menu" element={<AdminMenuPage />} />
                <Route path="branches" element={<AdminBranchesPage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="team" element={<AdminTeamPage />} />
                <Route path="reports" element={<AdminReportsPage />} />
                <Route path="loyalty" element={<AdminLoyaltyPage />} />
                <Route path="subscription" element={<AdminSubscriptionPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
                <Route path="inventory" element={<AdminInventoryPage />} />
                <Route path="crm" element={<AdminCRMPage />} />
                <Route path="reservations" element={<AdminReservationsPage />} />
                <Route path="promotions" element={<AdminPromotionsPage />} />
                <Route path="notifications" element={<AdminNotificationsPage />} />
                <Route path="profile" element={<AdminProfilePage />} />
                <Route path="whatsapp" element={<AdminWhatsAppPage />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Super Admin routes */}
      <Route
        path="/super-admin/*"
        element={
          <ProtectedRoute>
            <SuperAdminLayout>
              <Routes>
                <Route index element={<SuperAdminDashboard />} />
                <Route path="dashboard" element={<SuperAdminDashboard />} />
                <Route path="*" element={<Navigate to="/super-admin/dashboard" replace />} />
              </Routes>
            </SuperAdminLayout>
          </ProtectedRoute>
        }
      />

    </Routes>
  )
}
