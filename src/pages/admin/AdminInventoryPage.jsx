import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Package, Search, Plus, AlertTriangle, TrendingDown, TrendingUp,
  Truck, Edit3, Trash2, Download, Filter, Eye, RotateCcw,
  ChevronLeft, ChevronRight, Check
} from 'lucide-react'
import { formatPrice } from '../../lib/utils'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import toast from 'react-hot-toast'

const categories = ['Tout', 'Viandes', 'Boissons', 'Légumes', 'Épices', 'Emballages', 'Autres']

const demoStock = [
  { id: 's1', name: 'Poulet entier (kg)', category: 'Viandes', unit: 'kg', qty: 45, min_qty: 20, max_qty: 100, cost: 2200, supplier: 'Ferme Bamenda', branch: 'Douala — Akwa', last_restock: '2026-05-28', status: 'ok' },
  { id: 's2', name: 'Bœuf (kg)', category: 'Viandes', unit: 'kg', qty: 12, min_qty: 15, max_qty: 60, cost: 3500, supplier: 'Ferme Bamenda', branch: 'Douala — Akwa', last_restock: '2026-05-27', status: 'low' },
  { id: 's3', name: 'Crevettes fraîches (kg)', category: 'Viandes', unit: 'kg', qty: 8, min_qty: 10, max_qty: 30, cost: 6000, supplier: 'Pêche Kribi', branch: 'Douala — Akwa', last_restock: '2026-05-30', status: 'low' },
  { id: 's4', name: 'Poisson Bar (kg)', category: 'Viandes', unit: 'kg', qty: 22, min_qty: 10, max_qty: 40, cost: 4500, supplier: 'Pêche Kribi', branch: 'Douala — Akwa', last_restock: '2026-05-30', status: 'ok' },
  { id: 's5', name: 'Bière 33 Export (casier)', category: 'Boissons', unit: 'casier', qty: 18, min_qty: 10, max_qty: 50, cost: 8500, supplier: 'Brasseries du Cameroun', branch: 'Douala — Akwa', last_restock: '2026-05-29', status: 'ok' },
  { id: 's6', name: 'Coca-Cola 50cl (pack 24)', category: 'Boissons', unit: 'pack', qty: 6, min_qty: 8, max_qty: 30, cost: 5800, supplier: 'Brasseries du Cameroun', branch: 'Douala — Akwa', last_restock: '2026-05-26', status: 'low' },
  { id: 's7', name: 'Guinness 65cl (casier)', category: 'Boissons', unit: 'casier', qty: 14, min_qty: 8, max_qty: 40, cost: 11000, supplier: 'Brasseries du Cameroun', branch: 'Douala — Akwa', last_restock: '2026-05-28', status: 'ok' },
  { id: 's8', name: 'Eau Supermont 1L (pack 12)', category: 'Boissons', unit: 'pack', qty: 25, min_qty: 10, max_qty: 60, cost: 2400, supplier: 'Supermont SA', branch: 'Douala — Akwa', last_restock: '2026-05-30', status: 'ok' },
  { id: 's9', name: 'Plantain mûr (régime)', category: 'Légumes', unit: 'régime', qty: 5, min_qty: 8, max_qty: 20, cost: 3000, supplier: 'Marché Mboppi', branch: 'Douala — Akwa', last_restock: '2026-05-31', status: 'low' },
  { id: 's10', name: 'Tomates fraîches (cagette)', category: 'Légumes', unit: 'cagette', qty: 10, min_qty: 5, max_qty: 20, cost: 4500, supplier: 'Marché Mboppi', branch: 'Douala — Akwa', last_restock: '2026-05-31', status: 'ok' },
  { id: 's11', name: 'Huile végétale (bidon 5L)', category: 'Autres', unit: 'bidon', qty: 8, min_qty: 4, max_qty: 15, cost: 4200, supplier: 'Azur SA', branch: 'Douala — Akwa', last_restock: '2026-05-25', status: 'ok' },
  { id: 's12', name: 'Piment frais (kg)', category: 'Épices', unit: 'kg', qty: 3, min_qty: 5, max_qty: 15, cost: 1500, supplier: 'Marché Mboppi', branch: 'Douala — Akwa', last_restock: '2026-05-29', status: 'low' },
  { id: 's13', name: 'Sel fin (sac 25kg)', category: 'Épices', unit: 'sac', qty: 4, min_qty: 2, max_qty: 8, cost: 3800, supplier: 'Azur SA', branch: 'Douala — Akwa', last_restock: '2026-05-20', status: 'ok' },
  { id: 's14', name: 'Barquettes aluminium (x100)', category: 'Emballages', unit: 'paquet', qty: 2, min_qty: 5, max_qty: 20, cost: 8500, supplier: 'Pack Express', branch: 'Douala — Akwa', last_restock: '2026-05-22', status: 'critical' },
  { id: 's15', name: 'Sachets kraft (x200)', category: 'Emballages', unit: 'paquet', qty: 12, min_qty: 5, max_qty: 30, cost: 4500, supplier: 'Pack Express', branch: 'Douala — Akwa', last_restock: '2026-05-27', status: 'ok' },
]

const suppliers = [
  { id: 'f1', name: 'Ferme Bamenda', contact: '+237 6 70 12 34 56', items: 4, total: 1250000 },
  { id: 'f2', name: 'Brasseries du Cameroun', contact: '+237 6 80 98 76 54', items: 3, total: 890000 },
  { id: 'f3', name: 'Pêche Kribi', contact: '+237 6 55 67 89 01', items: 2, total: 620000 },
  { id: 'f4', name: 'Marché Mboppi', contact: '+237 6 44 33 22 11', items: 3, total: 340000 },
  { id: 'f5', name: 'Azur SA', contact: '+237 6 33 44 55 66', items: 2, total: 280000 },
  { id: 'f6', name: 'Pack Express', contact: '+237 6 22 11 00 99', items: 2, total: 180000 },
  { id: 'f7', name: 'Supermont SA', contact: '+237 6 88 77 66 55', items: 1, total: 120000 },
]

const kpis = [
  { icon: Package, label: 'Articles en stock', value: '15', color: 'var(--color-gold)' },
  { icon: AlertTriangle, label: 'Alertes stock bas', value: '5', color: 'var(--color-danger)' },
  { icon: Truck, label: 'Fournisseurs actifs', value: '7', color: 'var(--color-info)' },
  { icon: TrendingDown, label: 'Valeur stock totale', value: formatPrice(680000), color: 'var(--color-success)' },
]

export default function AdminInventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCat, setFilterCat] = useState('Tout')
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [restockModal, setRestockModal] = useState(null)
  const [addModal, setAddModal] = useState(false)
  const [supplierView, setSupplierView] = useState(false)
  const perPage = 10

  const filtered = useMemo(() => {
    let list = [...demoStock]
    if (filterCat !== 'Tout') list = list.filter(i => i.category === filterCat)
    if (filterStatus !== 'all') list = list.filter(i => i.status === filterStatus)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(i => i.name.toLowerCase().includes(q) || i.supplier.toLowerCase().includes(q))
    }
    return list
  }, [filterCat, filterStatus, searchQuery])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Inventaire & Stock</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Suivi en temps réel de vos stocks</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setSupplierView(!supplierView)} className={`btn-secondary flex items-center gap-2 text-xs py-2 px-3 ${supplierView ? 'border-[var(--color-gold)]/40 text-[var(--color-gold)]' : ''}`}><Truck size={13} /> Fournisseurs</button>
          <button onClick={() => setAddModal(true)} className="btn-primary flex items-center gap-2 text-sm py-2.5 px-5"><Plus size={15} /> Ajouter un article</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-5">
            <div className="p-2.5 rounded-xl w-fit mb-3" style={{ background: `color-mix(in srgb, ${kpi.color} 12%, transparent)` }}>
              <kpi.icon size={18} style={{ color: kpi.color }} />
            </div>
            <p className="text-xl font-bold text-white">{kpi.value}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      {supplierView ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <h3 className="text-base font-bold text-white mb-5">Fournisseurs ({suppliers.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {suppliers.map(s => (
              <div key={s.id} className="bg-[var(--color-bg-main)] rounded-xl p-4 border border-[var(--color-border)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center"><Truck size={16} className="text-[var(--color-gold)]" /></div>
                  <div>
                    <p className="text-sm font-bold text-white">{s.name}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">{s.contact}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--color-text-muted)]">{s.items} articles</span>
                  <span className="font-semibold text-[var(--color-gold)]">{formatPrice(s.total)}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <>
          {/* Filters */}
          <div className="flex gap-3 flex-wrap">
            <div className="relative flex-1 max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input type="text" value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1) }} placeholder="Rechercher un article..." className="input pl-9 text-sm py-2" />
            </div>
            <select value={filterCat} onChange={e => { setFilterCat(e.target.value); setCurrentPage(1) }} className="input text-sm py-2 w-40 appearance-none cursor-pointer">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1) }} className="input text-sm py-2 w-40 appearance-none cursor-pointer">
              <option value="all">Tous statuts</option>
              <option value="ok">En stock</option>
              <option value="low">Stock bas</option>
              <option value="critical">Critique</option>
            </select>
          </div>

          {/* Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
                    <th className="pb-4 font-medium">Article</th>
                    <th className="pb-4 font-medium">Catégorie</th>
                    <th className="pb-4 font-medium">Quantité</th>
                    <th className="pb-4 font-medium">Min / Max</th>
                    <th className="pb-4 font-medium">Coût unitaire</th>
                    <th className="pb-4 font-medium">Fournisseur</th>
                    <th className="pb-4 font-medium">Statut</th>
                    <th className="pb-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((item, i) => (
                    <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-t border-[var(--color-border)] hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5">
                        <p className="text-sm font-medium text-white">{item.name}</p>
                        <p className="text-[10px] text-[var(--color-text-muted)]">Dernier réappro: {item.last_restock}</p>
                      </td>
                      <td className="py-3.5 text-[var(--color-text-secondary)] text-xs">{item.category}</td>
                      <td className="py-3.5">
                        <span className={`text-sm font-bold ${item.status === 'critical' ? 'text-[var(--color-danger)]' : item.status === 'low' ? 'text-[var(--color-warning)]' : 'text-white'}`}>
                          {item.qty} {item.unit}
                        </span>
                      </td>
                      <td className="py-3.5 text-[var(--color-text-muted)] text-xs">{item.min_qty} / {item.max_qty}</td>
                      <td className="py-3.5 text-white">{formatPrice(item.cost)}</td>
                      <td className="py-3.5 text-[var(--color-text-secondary)] text-xs">{item.supplier}</td>
                      <td className="py-3.5">
                        <Badge variant={item.status === 'ok' ? 'success' : item.status === 'low' ? 'warning' : 'danger'}>
                          {item.status === 'ok' ? 'OK' : item.status === 'low' ? 'Bas' : 'Critique'}
                        </Badge>
                      </td>
                      <td className="py-3.5 text-right">
                        <button onClick={() => setRestockModal(item)} className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-all" title="Réapprovisionner"><RotateCcw size={14} /></button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-text-muted)]">Page {currentPage} sur {totalPages}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg bg-[var(--color-bg-main)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-white disabled:opacity-40 transition-all"><ChevronLeft size={14} /></button>
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg bg-[var(--color-bg-main)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-white disabled:opacity-40 transition-all"><ChevronRight size={14} /></button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}

      {/* Restock modal */}
      <Modal open={!!restockModal} onClose={() => setRestockModal(null)} title="Réapprovisionner" maxWidth="max-w-md">
        {restockModal && (
          <form onSubmit={e => { e.preventDefault(); toast.success(`${restockModal.name} réapprovisionné !`); setRestockModal(null) }} className="space-y-4">
            <div className="p-4 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)]">
              <p className="text-sm font-bold text-white">{restockModal.name}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">Stock actuel: <span className="text-white font-semibold">{restockModal.qty} {restockModal.unit}</span> — Min: {restockModal.min_qty}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Quantité à ajouter ({restockModal.unit})</label>
              <input type="number" min="1" placeholder="Ex: 20" required className="input text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Fournisseur</label>
              <input type="text" defaultValue={restockModal.supplier} className="input text-sm" />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setRestockModal(null)} className="btn-secondary flex-1 py-3 text-sm">Annuler</button>
              <button type="submit" className="btn-primary flex-[2] py-3 text-sm flex items-center justify-center gap-2"><Check size={14} /> Confirmer</button>
            </div>
          </form>
        )}
      </Modal>

      {/* Add article modal */}
      <Modal open={addModal} onClose={() => setAddModal(false)} title="Ajouter un article" maxWidth="max-w-lg">
        <form onSubmit={e => { e.preventDefault(); toast.success('Article ajouté !'); setAddModal(false) }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Nom de l'article</label>
              <input type="text" placeholder="Ex: Riz basmati (sac 25kg)" required className="input text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Catégorie</label>
              <select required className="input text-sm appearance-none cursor-pointer">
                {categories.filter(c => c !== 'Tout').map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Quantité</label>
              <input type="number" min="0" required className="input text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Seuil min</label>
              <input type="number" min="0" required className="input text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Unité</label>
              <input type="text" placeholder="kg, L, pack..." required className="input text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Coût unitaire (FCFA)</label>
              <input type="number" min="0" required className="input text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Fournisseur</label>
              <input type="text" placeholder="Nom du fournisseur" className="input text-sm" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setAddModal(false)} className="btn-secondary flex-1 py-3 text-sm">Annuler</button>
            <button type="submit" className="btn-primary flex-[2] py-3 text-sm flex items-center justify-center gap-2"><Plus size={14} /> Ajouter</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
