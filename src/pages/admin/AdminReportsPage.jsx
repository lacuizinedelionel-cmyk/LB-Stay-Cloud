import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3, TrendingUp, TrendingDown, Download, Calendar,
  DollarSign, ShoppingCart, Users, Star, ArrowUpRight
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { formatPrice } from '../../lib/utils'

const periods = ['7 jours', '30 jours', '3 mois', '6 mois', '1 an']

const revenueData = [
  { date: '01 Mai', revenue: 720000, orders: 94 },
  { date: '05 Mai', revenue: 850000, orders: 112 },
  { date: '10 Mai', revenue: 680000, orders: 87 },
  { date: '15 Mai', revenue: 940000, orders: 128 },
  { date: '20 Mai', revenue: 1020000, orders: 142 },
  { date: '25 Mai', revenue: 890000, orders: 118 },
  { date: '30 Mai', revenue: 960000, orders: 134 },
]

const branchComparison = [
  { branch: 'Akwa', ca: 12500000, orders: 1680, clients: 890 },
  { branch: 'Bastos', ca: 8900000, orders: 1120, clients: 620 },
  { branch: 'Bafoussam', ca: 5200000, orders: 720, clients: 380 },
]

const paymentBreakdown = [
  { name: 'Espèces', value: 42, color: '#00D4AA' },
  { name: 'Orange Money', value: 28, color: '#FF6600' },
  { name: 'MTN MoMo', value: 22, color: '#FFCC00' },
  { name: 'Carte', value: 8, color: '#3B82F6' },
]

const topProducts = [
  { name: 'Poulet DG', units: 486, revenue: 2187000, growth: 12.4 },
  { name: 'Ndolé Complet', units: 362, revenue: 1267000, growth: 8.7 },
  { name: 'Poisson Braisé', units: 298, revenue: 1490000, growth: -2.1 },
  { name: 'Brochettes Mixtes', units: 274, revenue: 1096000, growth: 15.3 },
  { name: 'Bière 33 Export', units: 892, revenue: 892000, growth: 5.6 },
]

const peakHours = [
  { hour: '08h', avg: 8 }, { hour: '09h', avg: 12 }, { hour: '10h', avg: 18 },
  { hour: '11h', avg: 28 }, { hour: '12h', avg: 52 }, { hour: '13h', avg: 64 },
  { hour: '14h', avg: 42 }, { hour: '15h', avg: 22 }, { hour: '16h', avg: 16 },
  { hour: '17h', avg: 14 }, { hour: '18h', avg: 24 }, { hour: '19h', avg: 48 },
  { hour: '20h', avg: 56 }, { hour: '21h', avg: 38 }, { hour: '22h', avg: 18 },
]

const kpis = [
  { icon: DollarSign, label: 'CA total (mois)', value: formatPrice(26600000), change: 11.2, color: 'var(--color-gold)' },
  { icon: ShoppingCart, label: 'Commandes totales', value: '3 520', change: 8.5, color: 'var(--color-success)' },
  { icon: Users, label: 'Clients uniques', value: '1 890', change: 6.3, color: 'var(--color-accent)' },
  { icon: Star, label: 'Panier moyen', value: formatPrice(7557), change: 2.8, color: 'var(--color-info)' },
]

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card px-3 py-2 shadow-xl">
      <p className="text-[10px] text-[var(--color-text-muted)] mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs font-semibold" style={{ color: p.color }}>{typeof p.value === 'number' && p.value > 10000 ? formatPrice(p.value) : p.value}</p>
      ))}
    </div>
  )
}

export default function AdminReportsPage() {
  const [period, setPeriod] = useState('30 jours')

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Rapports</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Analyse détaillée de vos performances</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl overflow-hidden">
            {periods.map(p => (
              <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-2 text-xs font-semibold transition-all ${period === p ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)]' : 'text-[var(--color-text-muted)] hover:text-white'}`}>{p}</button>
            ))}
          </div>
          <button className="btn-secondary flex items-center gap-2 text-xs py-2 px-3"><Download size={13} /> PDF</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, i) => {
          const isPositive = kpi.change >= 0
          return (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl" style={{ background: `color-mix(in srgb, ${kpi.color} 12%, transparent)` }}>
                  <kpi.icon size={18} style={{ color: kpi.color }} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold ${isPositive ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]'}`}>
                  {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {isPositive ? '+' : ''}{kpi.change}%
                </div>
              </div>
              <p className="text-xl font-bold text-white mb-0.5">{kpi.value}</p>
              <p className="text-xs text-[var(--color-text-secondary)]">{kpi.label}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Revenue chart + Payment pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="lg:col-span-2 glass-card p-6">
          <h3 className="text-base font-bold text-white mb-1">Évolution du CA</h3>
          <p className="text-xs text-[var(--color-text-muted)] mb-5">{period}</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5A623" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#F5A623" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="date" stroke="#6B6B80" tick={{ fontSize: 10 }} />
              <YAxis stroke="#6B6B80" tick={{ fontSize: 10 }} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#F5A623" strokeWidth={2.5} fill="url(#revenueGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="glass-card p-6">
          <h3 className="text-base font-bold text-white mb-1">Modes de paiement</h3>
          <p className="text-xs text-[var(--color-text-muted)] mb-4">Répartition ce mois</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={paymentBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                {paymentBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {paymentBreakdown.map(p => (
              <div key={p.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-[var(--color-text-secondary)]">{p.name}</span>
                </div>
                <span className="font-semibold text-white">{p.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Peak hours + Top products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="glass-card p-6">
          <h3 className="text-base font-bold text-white mb-1">Heures de pointe</h3>
          <p className="text-xs text-[var(--color-text-muted)] mb-5">Commandes moyennes par heure</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={peakHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="hour" stroke="#6B6B80" tick={{ fontSize: 9 }} />
              <YAxis stroke="#6B6B80" tick={{ fontSize: 10 }} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="avg" radius={[4, 4, 0, 0]} fill="#F5A623" fillOpacity={0.8} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-6">
          <h3 className="text-base font-bold text-white mb-5">Top produits</h3>
          <div className="space-y-4">
            {topProducts.map((product, i) => (
              <div key={product.name} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-[var(--color-gold)]/8 flex items-center justify-center text-[10px] font-bold text-[var(--color-gold)]">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white truncate">{product.name}</span>
                    <span className="text-xs font-bold text-white">{formatPrice(product.revenue)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[var(--color-text-muted)]">{product.units} unités</span>
                    <span className={`text-[10px] font-semibold ${product.growth >= 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
                      {product.growth >= 0 ? '+' : ''}{product.growth}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Branch comparison */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-card p-6">
        <h3 className="text-base font-bold text-white mb-5">Comparaison des branches</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
                <th className="pb-3 font-medium">Branche</th>
                <th className="pb-3 font-medium">CA mensuel</th>
                <th className="pb-3 font-medium">Commandes</th>
                <th className="pb-3 font-medium">Clients</th>
                <th className="pb-3 font-medium">Panier moyen</th>
              </tr>
            </thead>
            <tbody>
              {branchComparison.map(b => (
                <tr key={b.branch} className="border-t border-[var(--color-border)]">
                  <td className="py-3.5 text-white font-semibold">{b.branch}</td>
                  <td className="py-3.5 text-[var(--color-gold)] font-bold">{formatPrice(b.ca)}</td>
                  <td className="py-3.5 text-white">{b.orders.toLocaleString('fr-FR')}</td>
                  <td className="py-3.5 text-white">{b.clients.toLocaleString('fr-FR')}</td>
                  <td className="py-3.5 text-white">{formatPrice(Math.round(b.ca / b.orders))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
