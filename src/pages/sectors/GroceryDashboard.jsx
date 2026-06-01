import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, DollarSign, Package, Truck, AlertTriangle, Search, Plus, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react'
import { formatPrice } from '../../lib/utils'
import Badge from '../../components/ui/Badge'
import toast from 'react-hot-toast'

const kpis = [
  { icon: DollarSign, label: 'Ventes du jour', value: formatPrice(1230000), change: 5.4, color: 'var(--color-success)' },
  { icon: Package, label: 'Articles vendus', value: '847', change: 12.1, color: 'var(--color-gold)' },
  { icon: AlertTriangle, label: 'Ruptures de stock', value: '12', change: -33.3, color: 'var(--color-danger)' },
  { icon: Truck, label: 'Fournisseurs actifs', value: '8', change: 0, color: 'var(--color-info)' },
]

const categories = ['Alimentaire', 'Boissons', 'Hygiène', 'Produits frais']

const products = [
  { id: 1, name: 'Riz Uncle Ben\'s 5kg', category: 'Alimentaire', price: 4500, stock: 45, min_stock: 20, sold_today: 23 },
  { id: 2, name: 'Huile Diamaor 1L', category: 'Alimentaire', price: 1800, stock: 32, min_stock: 15, sold_today: 18 },
  { id: 3, name: 'Coca-Cola 50cl (pack 12)', category: 'Boissons', price: 4800, stock: 8, min_stock: 10, sold_today: 34 },
  { id: 4, name: 'Lait Nestlé 400g', category: 'Alimentaire', price: 2200, stock: 56, min_stock: 20, sold_today: 15 },
  { id: 5, name: 'Savon Palmolive 200g', category: 'Hygiène', price: 500, stock: 3, min_stock: 15, sold_today: 42 },
  { id: 6, name: 'Tomates fraîches (kg)', category: 'Produits frais', price: 800, stock: 25, min_stock: 10, sold_today: 30 },
  { id: 7, name: 'Pâtes Spaghetti 500g', category: 'Alimentaire', price: 650, stock: 67, min_stock: 25, sold_today: 28 },
  { id: 8, name: 'Eau Supermont 1.5L (pack 6)', category: 'Boissons', price: 2400, stock: 0, min_stock: 15, sold_today: 0 },
  { id: 9, name: 'Sucre en poudre 1kg', category: 'Alimentaire', price: 900, stock: 41, min_stock: 20, sold_today: 19 },
  { id: 10, name: 'Poulet congelé (kg)', category: 'Produits frais', price: 2800, stock: 5, min_stock: 10, sold_today: 25 },
  { id: 11, name: 'Détergent Omo 500g', category: 'Hygiène', price: 1200, stock: 28, min_stock: 10, sold_today: 8 },
  { id: 12, name: 'Bière 33 Export (casier)', category: 'Boissons', price: 8500, stock: 14, min_stock: 5, sold_today: 6 },
]

const suppliers = [
  { name: 'SABC Cameroun', category: 'Boissons', lastOrder: '28 Avr', amount: 450000, status: 'livré' },
  { name: 'Nestlé Cameroun', category: 'Alimentaire', lastOrder: '25 Avr', amount: 320000, status: 'livré' },
  { name: 'Marché Central Douala', category: 'Produits frais', lastOrder: '02 Mai', amount: 85000, status: 'en_cours' },
  { name: 'Procter & Gamble', category: 'Hygiène', lastOrder: '20 Avr', amount: 210000, status: 'livré' },
  { name: 'Brasseries du Cameroun', category: 'Boissons', lastOrder: '01 Mai', amount: 680000, status: 'en_cours' },
]

export default function GroceryDashboard() {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCat, setActiveCat] = useState('all')
  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t) }, [])

  const filtered = products.filter((p) => {
    if (activeCat !== 'all' && p.category !== activeCat) return false
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  if (loading) return <div className="space-y-6">{[...Array(3)].map((_, i) => <div key={i} className="glass-card p-6"><div className="skeleton h-32 w-full rounded-xl" /></div>)}</div>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 cursor-default">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl" style={{ background: `color-mix(in srgb, ${kpi.color} 12%, transparent)` }}><kpi.icon size={22} style={{ color: kpi.color }} /></div>
              {kpi.change !== 0 && <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${kpi.change >= 0 ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]'}`}>{kpi.change >= 0 ? '+' : ''}{kpi.change}%</span>}
            </div>
            <p className="text-2xl font-bold text-white mb-1">{kpi.value}</p>
            <p className="text-sm text-[var(--color-text-secondary)]">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Catalogue produits */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-white">Stock en temps réel</h3>
          <div className="flex items-center gap-3">
            <div className="relative"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" /><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher..." className="input pl-9 py-2 text-sm w-48" /></div>
            <div className="flex gap-1.5">
              <button onClick={() => setActiveCat('all')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeCat === 'all' ? 'bg-[var(--color-gold)] text-[var(--color-bg-main)]' : 'bg-[var(--color-bg-main)] text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}>Tout</button>
              {categories.map((c) => <button key={c} onClick={() => setActiveCat(c)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeCat === c ? 'bg-[var(--color-gold)] text-[var(--color-bg-main)]' : 'bg-[var(--color-bg-main)] text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}>{c}</button>)}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
              <th className="pb-3 font-medium">Produit</th><th className="pb-3 font-medium">Catégorie</th><th className="pb-3 font-medium">Prix</th><th className="pb-3 font-medium">Stock</th><th className="pb-3 font-medium">Vendus aujourd'hui</th><th className="pb-3 font-medium">Statut</th>
            </tr></thead>
            <tbody>
              {filtered.map((p, i) => {
                const isLow = p.stock <= p.min_stock && p.stock > 0
                const isOut = p.stock === 0
                return (
                  <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 * i }} className="border-t border-[var(--color-border)] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 text-white font-medium">{p.name}</td>
                    <td className="py-3 text-[var(--color-text-secondary)] text-xs">{p.category}</td>
                    <td className="py-3 text-white font-semibold">{formatPrice(p.price)}</td>
                    <td className="py-3"><span className={`font-bold ${isOut ? 'text-[var(--color-danger)]' : isLow ? 'text-[var(--color-warning)]' : 'text-white'}`}>{p.stock}</span><span className="text-[10px] text-[var(--color-text-muted)] ml-1">/ min {p.min_stock}</span></td>
                    <td className="py-3 text-white">{p.sold_today}</td>
                    <td className="py-3">{isOut ? <Badge variant="danger">Rupture</Badge> : isLow ? <Badge variant="warning">Stock bas</Badge> : <Badge variant="success">En stock</Badge>}</td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Fournisseurs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Fournisseurs</h3>
        <div className="space-y-2">
          {suppliers.map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)]">
              <div className="flex-1"><p className="text-sm font-medium text-white">{s.name}</p><p className="text-[10px] text-[var(--color-text-muted)]">{s.category} · Dernière commande : {s.lastOrder}</p></div>
              <div className="text-right mr-4"><p className="text-sm font-bold text-[var(--color-gold)]">{formatPrice(s.amount)}</p></div>
              <Badge variant={s.status === 'livré' ? 'success' : 'warning'}>{s.status === 'livré' ? 'Livré' : 'En cours'}</Badge>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
