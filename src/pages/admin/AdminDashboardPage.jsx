import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign, ShoppingCart, Users, Star,
  ArrowUpRight, TrendingUp, TrendingDown
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { useRestaurant } from '../../context/RestaurantContext'
import { formatPrice } from '../../lib/utils'
import Badge from '../../components/ui/Badge'
import { SkeletonKpi, SkeletonTable } from '../../components/ui/Skeleton'

const kpis = [
  {
    icon: DollarSign,
    label: 'CA du jour',
    value: 847500,
    formatted: formatPrice(847500),
    change: 12.4,
    sub: 'vs hier',
  },
  {
    icon: ShoppingCart,
    label: "Commandes aujourd'hui",
    value: 156,
    formatted: '156',
    change: 8.7,
    sub: 'vs hier',
  },
  {
    icon: Users,
    label: 'Clients actifs',
    value: 89,
    formatted: '89',
    change: -2.3,
    sub: 'vs hier',
  },
  {
    icon: Star,
    label: 'Note moyenne',
    value: 4.8,
    formatted: '4.8 / 5',
    change: 1.2,
    sub: 'vs semaine dern.',
  },
]

const revenueData = [
  { jour: '03 Avr', montant: 620000 },
  { jour: '04 Avr', montant: 580000 },
  { jour: '05 Avr', montant: 710000 },
  { jour: '06 Avr', montant: 650000 },
  { jour: '07 Avr', montant: 830000 },
  { jour: '08 Avr', montant: 760000 },
  { jour: '09 Avr', montant: 540000 },
  { jour: '10 Avr', montant: 690000 },
  { jour: '11 Avr', montant: 720000 },
  { jour: '12 Avr', montant: 810000 },
  { jour: '13 Avr', montant: 950000 },
  { jour: '14 Avr', montant: 880000 },
  { jour: '15 Avr', montant: 620000 },
  { jour: '16 Avr', montant: 730000 },
  { jour: '17 Avr', montant: 790000 },
  { jour: '18 Avr', montant: 850000 },
  { jour: '19 Avr', montant: 920000 },
  { jour: '20 Avr', montant: 1010000 },
  { jour: '21 Avr', montant: 870000 },
  { jour: '22 Avr', montant: 640000 },
  { jour: '23 Avr', montant: 750000 },
  { jour: '24 Avr', montant: 830000 },
  { jour: '25 Avr', montant: 910000 },
  { jour: '26 Avr', montant: 960000 },
  { jour: '27 Avr', montant: 1080000 },
  { jour: '28 Avr', montant: 990000 },
  { jour: '29 Avr', montant: 680000 },
  { jour: '30 Avr', montant: 770000 },
  { jour: '01 Mai', montant: 820000 },
  { jour: '02 Mai', montant: 847500 },
]

const ordersPerHour = [
  { heure: '08h', commandes: 4 },
  { heure: '09h', commandes: 8 },
  { heure: '10h', commandes: 12 },
  { heure: '11h', commandes: 18 },
  { heure: '12h', commandes: 35 },
  { heure: '13h', commandes: 42 },
  { heure: '14h', commandes: 28 },
  { heure: '15h', commandes: 14 },
  { heure: '16h', commandes: 10 },
  { heure: '17h', commandes: 8 },
  { heure: '18h', commandes: 15 },
  { heure: '19h', commandes: 32 },
  { heure: '20h', commandes: 38 },
  { heure: '21h', commandes: 24 },
  { heure: '22h', commandes: 12 },
]

const recentOrders = [
  { id: 'CMD-3021', branch: 'Douala — Akwa', montant: 18500, statut: 'paye', heure: '14:32' },
  { id: 'CMD-3020', branch: 'Yaoundé — Bastos', montant: 12800, statut: 'en_preparation', heure: '14:28' },
  { id: 'CMD-3019', branch: 'Douala — Akwa', montant: 27400, statut: 'servi', heure: '14:15' },
  { id: 'CMD-3018', branch: 'Bafoussam', montant: 8600, statut: 'en_attente', heure: '14:08' },
  { id: 'CMD-3017', branch: 'Douala — Akwa', montant: 34200, statut: 'paye', heure: '13:55' },
]

const statusConfig = {
  en_attente: { label: 'En attente', variant: 'warning' },
  en_preparation: { label: 'En préparation', variant: 'info' },
  pret: { label: 'Prêt', variant: 'success' },
  servi: { label: 'Servi', variant: 'success' },
  paye: { label: 'Payé', variant: 'gold' },
  annule: { label: 'Annulé', variant: 'danger' },
}

const topDishes = [
  { name: 'Poulet DG', orders: 248, revenue: 1240000, pct: 100 },
  { name: 'Ndolé Crevettes', orders: 186, revenue: 930000, pct: 75 },
  { name: 'Brochettes Mixtes', orders: 164, revenue: 656000, pct: 66 },
  { name: 'Poisson Braisé', orders: 142, revenue: 852000, pct: 57 },
  { name: 'Eru & Water Fufu', orders: 118, revenue: 472000, pct: 48 },
]

function KpiCardAdmin({ kpi, delay }) {
  const isPositive = kpi.change >= 0
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className="glass-card p-5 hover:border-[var(--color-border-active)] transition-all duration-300 group cursor-default"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-xl bg-[var(--color-gold)]/8 group-hover:bg-[var(--color-gold)]/12 transition-colors duration-300">
          <kpi.icon size={20} className="text-[var(--color-gold)]" />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
          isPositive
            ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]'
            : 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]'
        }`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isPositive ? '+' : ''}{kpi.change}%
        </div>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{kpi.formatted}</p>
      <p className="text-xs text-[var(--color-text-secondary)]">
        {kpi.label} <span className="text-[var(--color-text-muted)]">· {kpi.sub}</span>
      </p>
    </motion.div>
  )
}

function ChartTooltipContent({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl px-3 py-2 shadow-xl">
      <p className="text-[10px] text-[var(--color-text-muted)] mb-1">{label}</p>
      <p className="text-sm font-bold text-white">{formatter(payload[0].value)}</p>
    </div>
  )
}

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => <SkeletonKpi key={i} />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SkeletonTable rows={6} cols={2} />
          <SkeletonTable rows={6} cols={2} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SkeletonTable rows={5} />
          <SkeletonTable rows={5} />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Ligne 1 — KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, i) => (
          <KpiCardAdmin key={kpi.label} kpi={kpi} delay={i * 0.08} />
        ))}
      </div>

      {/* Ligne 2 — Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Revenus 30 jours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Revenus</h3>
              <p className="text-xs text-[var(--color-text-muted)]">30 derniers jours</p>
            </div>
            <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-main)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
              30 jours
            </span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="adminRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5A623" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#F5A623" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="jour"
                stroke="#6B6B80"
                tick={{ fontSize: 10 }}
                interval={4}
              />
              <YAxis
                stroke="#6B6B80"
                tick={{ fontSize: 10 }}
                tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
              />
              <Tooltip content={<ChartTooltipContent formatter={(v) => formatPrice(v)} />} />
              <Area
                type="monotone"
                dataKey="montant"
                stroke="#F5A623"
                strokeWidth={2.5}
                fill="url(#adminRevenueGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Commandes par heure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Commandes par heure</h3>
              <p className="text-xs text-[var(--color-text-muted)]">Aujourd'hui — pic à midi</p>
            </div>
            <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-main)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
              Aujourd'hui
            </span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ordersPerHour}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="heure"
                stroke="#6B6B80"
                tick={{ fontSize: 10 }}
              />
              <YAxis
                stroke="#6B6B80"
                tick={{ fontSize: 10 }}
              />
              <Tooltip content={<ChartTooltipContent formatter={(v) => `${v} commandes`} />} />
              <Bar
                dataKey="commandes"
                radius={[6, 6, 0, 0]}
                fill="#F5A623"
                fillOpacity={0.8}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Ligne 3 — Commandes + Top plats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Dernières commandes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
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
                  <th className="pb-3 font-medium">N° Commande</th>
                  <th className="pb-3 font-medium">Branche</th>
                  <th className="pb-3 font-medium">Montant</th>
                  <th className="pb-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => {
                  const status = statusConfig[order.statut]
                  return (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + i * 0.05 }}
                      className="border-t border-[var(--color-border)] hover:bg-white/[0.02] transition-colors cursor-pointer"
                    >
                      <td className="py-3 text-white font-medium">{order.id}</td>
                      <td className="py-3 text-[var(--color-text-secondary)] text-xs">{order.branch}</td>
                      <td className="py-3 text-white font-medium">{formatPrice(order.montant)}</td>
                      <td className="py-3">
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top 5 plats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-white">Top 5 — Plats les plus commandés</h3>
            <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-main)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
              Ce mois
            </span>
          </div>
          <div className="space-y-4">
            {topDishes.map((dish, i) => (
              <motion.div
                key={dish.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 + i * 0.08 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[var(--color-gold)]/8 flex items-center justify-center text-[10px] font-bold text-[var(--color-gold)]">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-white">{dish.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-white">{dish.orders}</span>
                    <span className="text-[10px] text-[var(--color-text-muted)] ml-1.5">
                      · {formatPrice(dish.revenue)}
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-[var(--color-bg-main)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dish.pct}%` }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
