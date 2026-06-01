import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, ShoppingCart, Users, TrendingUp, AlertTriangle, CheckCircle, Clock, ArrowUpRight } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useRestaurant } from '../context/RestaurantContext'
import { supabase } from '../lib/supabase'
import { formatPrice, formatTime } from '../lib/utils'
import KpiCard from '../components/ui/KpiCard'
import Badge from '../components/ui/Badge'
import { SkeletonKpi, SkeletonTable } from '../components/ui/Skeleton'

const defaultChartData = [
  { jour: 'Lun', montant: 245000 },
  { jour: 'Mar', montant: 312000 },
  { jour: 'Mer', montant: 278000 },
  { jour: 'Jeu', montant: 390000 },
  { jour: 'Ven', montant: 420000 },
  { jour: 'Sam', montant: 510000 },
  { jour: 'Dim', montant: 385000 },
]

const defaultOrders = [
  { id: 'CMD-2847', client: 'Marie Fotso', montant: 12500, statut: 'paye', created_at: new Date().toISOString() },
  { id: 'CMD-2846', client: 'Paul Ndjock', montant: 8200, statut: 'en_preparation', created_at: new Date().toISOString() },
  { id: 'CMD-2845', client: 'Awa Diallo', montant: 25000, statut: 'paye', created_at: new Date().toISOString() },
  { id: 'CMD-2844', client: 'Jean Kamga', montant: 6800, statut: 'servi', created_at: new Date().toISOString() },
  { id: 'CMD-2843', client: 'Fatou Mbaye', montant: 15400, statut: 'en_attente', created_at: new Date().toISOString() },
]

const statusConfig = {
  en_attente: { label: 'En attente', variant: 'warning' },
  en_preparation: { label: 'En préparation', variant: 'info' },
  pret: { label: 'Prêt', variant: 'success' },
  servi: { label: 'Servi', variant: 'success' },
  paye: { label: 'Payé', variant: 'gold' },
  annule: { label: 'Annulé', variant: 'danger' },
}

const alerts = [
  { type: 'warning', message: 'Stock faible : Coca-Cola 33cl (8 restants)', time: 'Il y a 12 min' },
  { type: 'success', message: 'Nouveau client fidélité : Awa Diallo (Gold)', time: 'Il y a 25 min' },
  { type: 'info', message: 'Rapport hebdomadaire prêt à être exporté', time: 'Il y a 1h' },
]

const alertIcons = {
  warning: AlertTriangle,
  success: CheckCircle,
  info: Clock,
}

const alertColors = {
  warning: 'text-[var(--color-warning)]',
  success: 'text-[var(--color-success)]',
  info: 'text-[var(--color-info)]',
}

export default function DashboardPage() {
  const { activeBranch } = useRestaurant()
  const [loading, setLoading] = useState(true)
  const [kpis, setKpis] = useState(null)
  const [chartData, setChartData] = useState(defaultChartData)
  const [recentOrders, setRecentOrders] = useState(defaultOrders)

  async function loadDashboardData() {
    setLoading(true)
    try {
      if (activeBranch?.id) {
        const { data: orders } = await supabase
          .from('orders')
          .select('*')
          .eq('branch_id', activeBranch.id)
          .order('created_at', { ascending: false })
          .limit(5)

        if (orders && orders.length > 0) {
          setRecentOrders(orders)
        }
      }
    } catch (err) {
      console.error('Erreur chargement dashboard:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [activeBranch?.id])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => <SkeletonKpi key={i} />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2"><SkeletonTable rows={6} cols={2} /></div>
          <SkeletonTable rows={3} cols={1} />
        </div>
        <SkeletonTable rows={5} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard icon={DollarSign} label="Chiffre d'affaires (mois)" value={formatPrice(2560000)} change={12.5} delay={0} />
        <KpiCard icon={ShoppingCart} label="Commandes (mois)" value="1 284" change={8.3} delay={0.08} />
        <KpiCard icon={Users} label="Clients actifs" value="847" change={5.1} delay={0.16} />
        <KpiCard icon={TrendingUp} label="Panier moyen" value={formatPrice(2554)} change={3.2} delay={0.24} />
      </div>

      {/* Graphique + Alertes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-white">Ventes de la semaine</h3>
            <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-main)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
              7 derniers jours
            </span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5A623" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#F5A623" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="jour" stroke="#6B6B80" tick={{ fontSize: 12 }} />
              <YAxis stroke="#6B6B80" tick={{ fontSize: 12 }} tickFormatter={(v) => `${v/1000}k`} />
              <Tooltip
                contentStyle={{
                  background: '#12121A',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12,
                  fontSize: 12,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
                formatter={(value) => [`${value.toLocaleString('fr-FR')} FCFA`, 'Ventes']}
              />
              <Area type="monotone" dataKey="montant" stroke="#F5A623" strokeWidth={2.5} fill="url(#goldGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h3 className="text-base font-bold text-white mb-4">Alertes récentes</h3>
          <div className="space-y-3">
            {alerts.map((a, i) => {
              const Icon = alertIcons[a.type]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[var(--color-bg-main)]/60 border border-[var(--color-border)]"
                >
                  <Icon size={16} className={`${alertColors[a.type]} shrink-0 mt-0.5`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white leading-relaxed">{a.message}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)] mt-1">{a.time}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Dernières commandes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-white">Dernières commandes</h3>
          <button className="flex items-center gap-1 text-xs text-[var(--color-gold)] hover:underline">
            Voir tout <ArrowUpRight size={12} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--color-text-muted)] text-xs">
                <th className="pb-3 font-medium">Réf.</th>
                <th className="pb-3 font-medium">Client</th>
                <th className="pb-3 font-medium">Montant</th>
                <th className="pb-3 font-medium">Statut</th>
                <th className="pb-3 font-medium">Heure</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => {
                const status = statusConfig[order.statut] || statusConfig.en_attente
                return (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    className="border-t border-[var(--color-border)] hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 text-white font-medium">{order.id}</td>
                    <td className="py-3.5 text-white">{order.client || order.customer_name || '—'}</td>
                    <td className="py-3.5 text-white font-medium">{formatPrice(order.montant || order.total || 0)}</td>
                    <td className="py-3.5">
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </td>
                    <td className="py-3.5 text-[var(--color-text-muted)]">{formatTime(order.created_at)}</td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
