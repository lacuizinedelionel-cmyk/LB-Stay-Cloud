import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Search, Pencil, Trash2, Copy, Upload, X, Clock,
  UtensilsCrossed, Coffee, IceCream, Wine, Salad, ChefHat,
  GripVertical, AlertCircle, Check, ChevronDown, ImagePlus
} from 'lucide-react'
import { formatPrice } from '../../lib/utils'
import Modal from '../../components/ui/Modal'
import Badge from '../../components/ui/Badge'
import toast from 'react-hot-toast'

// ─── Demo data ───────────────────────────────────────────────────────
const catIcons = { c1: UtensilsCrossed, c2: Salad, c3: Wine, c4: IceCream }
const catEmoji = { c1: '🍗', c2: '🥗', c3: '🍺', c4: '🍰' }

const initialCategories = [
  { id: 'c1', name: 'Plats principaux', icon: 'c1', count: 6 },
  { id: 'c2', name: 'Entrées', icon: 'c2', count: 3 },
  { id: 'c3', name: 'Boissons', icon: 'c3', count: 5 },
  { id: 'c4', name: 'Desserts', icon: 'c4', count: 3 },
]

const initialItems = [
  { id: 'm1', category_id: 'c1', name: 'Poulet DG', description: 'Poulet directeur général avec plantain frit et légumes sautés', price: 4500, is_available: true, prep_time: 25, allergens: [], variants: [{ size: 'M', price: 4500 }, { size: 'L', price: 6500 }] },
  { id: 'm2', category_id: 'c1', name: 'Ndolé Complet', description: 'Ndolé traditionnel avec viande, crevettes et plantain', price: 3500, is_available: true, prep_time: 30, allergens: ['crustaces'], variants: [] },
  { id: 'm3', category_id: 'c1', name: 'Poisson Braisé', description: 'Poisson frais braisé avec condiments et miondo', price: 5000, is_available: true, prep_time: 35, allergens: ['poisson'], variants: [{ size: 'M', price: 5000 }, { size: 'L', price: 7500 }] },
  { id: 'm4', category_id: 'c1', name: 'Eru & Waterfufu', description: 'Eru traditionnel du Nord-Ouest avec waterfufu', price: 3000, is_available: true, prep_time: 20, allergens: [], variants: [] },
  { id: 'm5', category_id: 'c1', name: 'Koki', description: 'Gâteau de haricots niébé à la vapeur', price: 2500, is_available: false, prep_time: 45, allergens: [], variants: [] },
  { id: 'm6', category_id: 'c1', name: 'Brochettes Mixtes', description: 'Bœuf, poulet et saucisse grillés', price: 4000, is_available: true, prep_time: 20, allergens: [], variants: [{ size: 'S', price: 2500 }, { size: 'M', price: 4000 }, { size: 'L', price: 6000 }] },
  { id: 'm7', category_id: 'c2', name: 'Salade Mixte', description: 'Salade fraîche de saison avec vinaigrette', price: 2500, is_available: true, prep_time: 10, allergens: [], variants: [] },
  { id: 'm8', category_id: 'c2', name: 'Plantain Frit', description: 'Alloco croustillant doré', price: 1500, is_available: true, prep_time: 8, allergens: [], variants: [] },
  { id: 'm9', category_id: 'c2', name: 'Beignets (x5)', description: 'Beignets haricots maison', price: 500, is_available: true, prep_time: 12, allergens: ['gluten'], variants: [] },
  { id: 'm10', category_id: 'c3', name: 'Bière 33 Export', description: 'Bière locale 65cl', price: 1000, is_available: true, prep_time: 1, allergens: ['gluten'], variants: [] },
  { id: 'm11', category_id: 'c3', name: 'Coca-Cola 50cl', description: 'Coca-Cola frais', price: 500, is_available: true, prep_time: 1, allergens: [], variants: [] },
  { id: 'm12', category_id: 'c3', name: 'Jus Tangui', description: 'Jus de fruits local', price: 800, is_available: true, prep_time: 1, allergens: [], variants: [] },
  { id: 'm13', category_id: 'c3', name: 'Eau Supermont 1L', description: 'Eau minérale naturelle', price: 300, is_available: true, prep_time: 1, allergens: [], variants: [] },
  { id: 'm14', category_id: 'c3', name: 'Guinness 65cl', description: 'Stout premium importée', price: 1200, is_available: true, prep_time: 1, allergens: ['gluten'], variants: [] },
  { id: 'm15', category_id: 'c4', name: 'Gâteau Chocolat', description: 'Moelleux au chocolat fondant', price: 2000, is_available: true, prep_time: 5, allergens: ['gluten', 'lactose'], variants: [] },
  { id: 'm16', category_id: 'c4', name: 'Crème Glacée', description: 'Vanille, chocolat ou fraise', price: 1500, is_available: true, prep_time: 3, allergens: ['lactose'], variants: [{ size: '1 boule', price: 1500 }, { size: '2 boules', price: 2500 }] },
  { id: 'm17', category_id: 'c4', name: 'Salade de Fruits', description: 'Fruits frais de saison', price: 1200, is_available: false, prep_time: 8, allergens: [], variants: [] },
]

const allAllergens = [
  { id: 'gluten', label: 'Gluten' },
  { id: 'lactose', label: 'Lactose' },
  { id: 'noix', label: 'Noix' },
  { id: 'arachides', label: 'Arachides' },
  { id: 'crustaces', label: 'Crustacés' },
  { id: 'poisson', label: 'Poisson' },
  { id: 'soja', label: 'Soja' },
  { id: 'oeufs', label: 'Œufs' },
]

const demoBranches = [
  { id: 'b1', name: 'Douala — Akwa' },
  { id: 'b2', name: 'Yaoundé — Bastos' },
  { id: 'b3', name: 'Bafoussam — Centre' },
]

const emptyItem = {
  name: '',
  category_id: 'c1',
  description: '',
  price: '',
  prep_time: '',
  is_available: true,
  allergens: [],
  variants: [],
  branchMode: 'all',
  selectedBranches: [],
}

// ─── Main component ──────────────────────────────────────────────────
export default function AdminMenuPage() {
  const [categories, setCategories] = useState(initialCategories)
  const [items, setItems] = useState(initialItems)
  const [activeCat, setActiveCat] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [syncAll, setSyncAll] = useState(true)

  // Modals
  const [itemModal, setItemModal] = useState(null)       // null | 'new' | item object
  const [catModal, setCatModal] = useState(null)          // null | 'new' | category object
  const [deleteModal, setDeleteModal] = useState(null)    // { type: 'item'|'cat', target }

  // ─── Filtered items ───
  const filteredItems = useMemo(() => {
    let list = items
    if (activeCat !== 'all') list = list.filter((i) => i.category_id === activeCat)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter((i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
    }
    return list
  }, [items, activeCat, searchQuery])

  // ─── Actions ───
  function toggleAvailability(itemId) {
    setItems((prev) => prev.map((i) =>
      i.id === itemId ? { ...i, is_available: !i.is_available } : i
    ))
    const item = items.find((i) => i.id === itemId)
    toast.success(item?.is_available ? 'Marqué en rupture' : 'Remis en disponible')
  }

  function duplicateItem(item) {
    const newItem = {
      ...item,
      id: `m${Date.now()}`,
      name: `${item.name} (copie)`,
    }
    setItems((prev) => [...prev, newItem])
    toast.success('Plat dupliqué')
  }

  function deleteItem(itemId) {
    setItems((prev) => prev.filter((i) => i.id !== itemId))
    setDeleteModal(null)
    toast.success('Plat supprimé')
  }

  function deleteCategory(catId) {
    setCategories((prev) => prev.filter((c) => c.id !== catId))
    setItems((prev) => prev.filter((i) => i.category_id !== catId))
    if (activeCat === catId) setActiveCat('all')
    setDeleteModal(null)
    toast.success('Catégorie supprimée')
  }

  function saveItem(data) {
    if (itemModal && typeof itemModal === 'object' && itemModal.id) {
      setItems((prev) => prev.map((i) => i.id === itemModal.id ? { ...itemModal, ...data } : i))
      toast.success('Plat mis à jour')
    } else {
      const newItem = { ...data, id: `m${Date.now()}`, allergens: data.allergens || [], variants: data.variants || [] }
      setItems((prev) => [...prev, newItem])
      toast.success('Plat ajouté')
    }
    setItemModal(null)
  }

  function saveCategory(data) {
    if (catModal && typeof catModal === 'object' && catModal.id) {
      setCategories((prev) => prev.map((c) => c.id === catModal.id ? { ...catModal, ...data } : c))
      toast.success('Catégorie mise à jour')
    } else {
      const newCat = { ...data, id: `c${Date.now()}`, icon: 'c1', count: 0 }
      setCategories((prev) => [...prev, newCat])
      toast.success('Catégorie ajoutée')
    }
    setCatModal(null)
  }

  const catCounts = useMemo(() => {
    const counts = {}
    items.forEach((i) => { counts[i.category_id] = (counts[i.category_id] || 0) + 1 })
    return counts
  }, [items])

  return (
    <div className="space-y-6">
      {/* ═══ HEADER ═══ */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Mon Menu
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Gérez vos plats et catégories</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Sync toggle */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <span className="text-xs text-[var(--color-text-secondary)]">Synchroniser toutes les branches</span>
            <button
              onClick={() => setSyncAll(!syncAll)}
              className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
                syncAll ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-bg-input)] border border-[var(--color-border)]'
              }`}
            >
              <motion.div
                animate={{ x: syncAll ? 20 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`absolute top-1 w-4 h-4 rounded-full transition-colors ${
                  syncAll ? 'bg-[var(--color-bg-main)]' : 'bg-[var(--color-text-muted)]'
                }`}
              />
            </button>
          </label>

          <button
            onClick={() => setCatModal('new')}
            className="btn-secondary flex items-center gap-2 text-sm py-2.5 px-4"
          >
            <Plus size={15} />
            Nouvelle catégorie
          </button>
          <button
            onClick={() => setItemModal('new')}
            className="btn-primary flex items-center gap-2 text-sm py-2.5 px-5"
          >
            <Plus size={15} />
            Ajouter un plat
          </button>
        </div>
      </div>

      {/* ═══ CATEGORIES BAR ═══ */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setActiveCat('all')}
          className={`shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeCat === 'all'
              ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/30'
              : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-white hover:border-[var(--color-gold)]/20'
          }`}
        >
          <ChefHat size={16} />
          Tout
          <span className="text-[10px] font-bold bg-[var(--color-bg-main)] px-2 py-0.5 rounded-md">
            {items.length}
          </span>
        </button>

        {categories.map((cat) => {
          const Icon = catIcons[cat.icon] || UtensilsCrossed
          const isActive = activeCat === cat.id
          return (
            <div key={cat.id} className="shrink-0 flex items-center group">
              <button
                onClick={() => setActiveCat(cat.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/30'
                    : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-white hover:border-[var(--color-gold)]/20'
                }`}
              >
                <Icon size={16} />
                {cat.name}
                <span className="text-[10px] font-bold bg-[var(--color-bg-main)] px-2 py-0.5 rounded-md">
                  {catCounts[cat.id] || 0}
                </span>
              </button>
              <div className="flex ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setCatModal(cat)}
                  className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-all"
                >
                  <Pencil size={12} />
                </button>
                <button
                  onClick={() => setDeleteModal({ type: 'cat', target: cat })}
                  className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-all"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* ═══ SEARCH BAR ═══ */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un plat..."
          className="input pl-11 pr-10 py-2.5 text-sm"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-white">
            <X size={14} />
          </button>
        )}
      </div>

      {/* ═══ ITEMS GRID ═══ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, i) => {
            const cat = categories.find((c) => c.id === item.category_id)
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                className="glass-card overflow-hidden group"
              >
                {/* Image area */}
                <div className="relative h-40 bg-[var(--color-bg-main)] flex items-center justify-center overflow-hidden">
                  <span className="text-5xl">{catEmoji[item.category_id] || '🍽️'}</span>

                  {/* Upload overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <div className="flex flex-col items-center gap-1 text-white/80">
                      <ImagePlus size={20} />
                      <span className="text-[10px] font-medium">Changer la photo</span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <button
                    onClick={() => toggleAvailability(item.id)}
                    className="absolute top-3 left-3 z-10"
                  >
                    <Badge variant={item.is_available ? 'success' : 'danger'}>
                      {item.is_available ? 'Disponible' : 'Rupture'}
                    </Badge>
                  </button>

                  {/* Prep time */}
                  {item.prep_time > 1 && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-[10px] text-white/80 px-2 py-1 rounded-lg">
                      <Clock size={10} />
                      {item.prep_time} min
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-bold text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-muted)] line-clamp-2 mb-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <p className="text-base font-bold text-[var(--color-gold)]">{formatPrice(item.price)}</p>
                    {cat && (
                      <span className="text-[10px] font-semibold text-[var(--color-text-muted)] bg-[var(--color-bg-main)] px-2 py-1 rounded-lg border border-[var(--color-border)]">
                        {cat.name}
                      </span>
                    )}
                  </div>

                  {/* Variants preview */}
                  {item.variants.length > 0 && (
                    <div className="flex gap-1.5 mb-3">
                      {item.variants.map((v) => (
                        <span key={v.size} className="text-[9px] font-semibold text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-0.5 rounded-md">
                          {v.size} — {formatPrice(v.price)}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-1.5 pt-3 border-t border-[var(--color-border)]">
                    <button
                      onClick={() => setItemModal(item)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[var(--color-bg-main)] border border-[var(--color-border)] text-[var(--color-text-secondary)] text-xs font-medium hover:text-[var(--color-gold)] hover:border-[var(--color-gold)]/30 transition-all"
                    >
                      <Pencil size={12} />
                      Modifier
                    </button>
                    <button
                      onClick={() => duplicateItem(item)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[var(--color-bg-main)] border border-[var(--color-border)] text-[var(--color-text-secondary)] text-xs font-medium hover:text-[var(--color-info)] hover:border-[var(--color-info)]/30 transition-all"
                    >
                      <Copy size={12} />
                      Dupliquer
                    </button>
                    <button
                      onClick={() => setDeleteModal({ type: 'item', target: item })}
                      className="px-3 py-2 rounded-lg bg-[var(--color-bg-main)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:border-[var(--color-danger)]/30 hover:bg-[var(--color-danger)]/5 transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg-card)] flex items-center justify-center mb-4">
            <Search size={24} className="text-[var(--color-text-muted)]" />
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">Aucun plat trouvé</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCat('all') }}
            className="text-xs text-[var(--color-gold)] hover:underline mt-2"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* ═══ ADD/EDIT ITEM MODAL ═══ */}
      <ItemFormModal
        open={!!itemModal}
        onClose={() => setItemModal(null)}
        item={typeof itemModal === 'object' ? itemModal : null}
        categories={categories}
        branches={demoBranches}
        onSave={saveItem}
      />

      {/* ═══ ADD/EDIT CATEGORY MODAL ═══ */}
      <CategoryFormModal
        open={!!catModal}
        onClose={() => setCatModal(null)}
        category={typeof catModal === 'object' ? catModal : null}
        onSave={saveCategory}
      />

      {/* ═══ DELETE CONFIRM MODAL ═══ */}
      <Modal
        open={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title={deleteModal?.type === 'cat' ? 'Supprimer la catégorie' : 'Supprimer le plat'}
        maxWidth="max-w-sm"
      >
        {deleteModal && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-danger)]/8 border border-[var(--color-danger)]/15">
              <AlertCircle size={20} className="text-[var(--color-danger)] shrink-0" />
              <p className="text-sm text-[var(--color-text-secondary)]">
                {deleteModal.type === 'cat'
                  ? <>Supprimer <span className="text-white font-semibold">{deleteModal.target.name}</span> et tous ses plats ?</>
                  : <>Supprimer <span className="text-white font-semibold">{deleteModal.target.name}</span> du menu ?</>
                }
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal(null)} className="flex-1 py-3 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)] text-sm font-semibold text-[var(--color-text-secondary)] hover:text-white transition-all">
                Annuler
              </button>
              <button
                onClick={() => deleteModal.type === 'cat' ? deleteCategory(deleteModal.target.id) : deleteItem(deleteModal.target.id)}
                className="flex-1 py-3 rounded-xl bg-[var(--color-danger)] text-white text-sm font-bold hover:bg-[var(--color-danger)]/90 transition-all"
              >
                Supprimer
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

// ─── Item Form Modal ─────────────────────────────────────────────────
function ItemFormModal({ open, onClose, item, categories, branches, onSave }) {
  const isEdit = !!item
  const [form, setForm] = useState(emptyItem)
  const [dragOver, setDragOver] = useState(false)

  useEffect(() => {
    if (open && item) {
      setForm({
        name: item.name || '',
        category_id: item.category_id || 'c1',
        description: item.description || '',
        price: item.price || '',
        prep_time: item.prep_time || '',
        is_available: item.is_available !== false,
        allergens: item.allergens || [],
        variants: item.variants || [],
        branchMode: 'all',
        selectedBranches: [],
      })
    } else if (open) {
      setForm(emptyItem)
    }
  }, [open, item])

  function setField(key, value) {
    setForm((p) => ({ ...p, [key]: value }))
  }

  function toggleAllergen(id) {
    setForm((p) => ({
      ...p,
      allergens: p.allergens.includes(id) ? p.allergens.filter((a) => a !== id) : [...p.allergens, id],
    }))
  }

  function toggleBranch(id) {
    setForm((p) => ({
      ...p,
      selectedBranches: p.selectedBranches.includes(id) ? p.selectedBranches.filter((b) => b !== id) : [...p.selectedBranches, id],
    }))
  }

  function addVariant() {
    setForm((p) => ({ ...p, variants: [...p.variants, { size: '', price: '' }] }))
  }

  function updateVariant(index, field, value) {
    setForm((p) => ({
      ...p,
      variants: p.variants.map((v, i) => i === index ? { ...v, [field]: value } : v),
    }))
  }

  function removeVariant(index) {
    setForm((p) => ({ ...p, variants: p.variants.filter((_, i) => i !== index) }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({
      ...form,
      price: Number(form.price),
      prep_time: Number(form.prep_time) || 0,
      variants: form.variants.filter((v) => v.size && v.price).map((v) => ({ ...v, price: Number(v.price) })),
    })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Modifier le plat' : 'Ajouter un plat'}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5 max-h-[75vh] overflow-y-auto pr-1">
        {/* Image upload zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); toast('Upload bientôt disponible', { icon: '📷' }) }}
          className={`relative h-40 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
            dragOver
              ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/5'
              : 'border-[var(--color-border)] bg-[var(--color-bg-main)] hover:border-[var(--color-gold)]/30'
          }`}
        >
          <Upload size={28} className="text-[var(--color-text-muted)] mb-2" />
          <p className="text-sm text-[var(--color-text-secondary)]">Glissez une photo ou <span className="text-[var(--color-gold)] font-semibold">parcourir</span></p>
          <p className="text-[10px] text-[var(--color-text-muted)] mt-1">JPG, PNG — max 5 Mo</p>
        </div>

        {/* Name + Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Nom du plat</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
              placeholder="Ex: Poulet DG"
              required
              className="input text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Catégorie</label>
            <select
              value={form.category_id}
              onChange={(e) => setField('category_id', e.target.value)}
              className="input text-sm appearance-none cursor-pointer"
            >
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        {/* Price + Prep time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Prix (FCFA)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setField('price', e.target.value)}
              placeholder="4500"
              required
              min="0"
              className="input text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Temps de préparation (min)</label>
            <div className="relative">
              <Clock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="number"
                value={form.prep_time}
                onChange={(e) => setField('prep_time', e.target.value)}
                placeholder="20"
                min="0"
                className="input text-sm pl-10"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setField('description', e.target.value)}
            placeholder="Décrivez votre plat..."
            rows={3}
            className="input text-sm resize-none"
          />
        </div>

        {/* Variants */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-[var(--color-text-secondary)]">Variantes (taille / prix)</label>
            <button
              type="button"
              onClick={addVariant}
              className="text-[10px] font-semibold text-[var(--color-gold)] hover:underline flex items-center gap-1"
            >
              <Plus size={10} /> Ajouter
            </button>
          </div>
          {form.variants.length === 0 && (
            <p className="text-[11px] text-[var(--color-text-muted)] italic">Aucune variante — prix unique</p>
          )}
          <div className="space-y-2">
            {form.variants.map((v, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={v.size}
                  onChange={(e) => updateVariant(i, 'size', e.target.value)}
                  placeholder="S / M / L"
                  className="input text-sm flex-1"
                />
                <input
                  type="number"
                  value={v.price}
                  onChange={(e) => updateVariant(i, 'price', e.target.value)}
                  placeholder="Prix FCFA"
                  className="input text-sm flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeVariant(i)}
                  className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-all shrink-0"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Allergens */}
        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2.5 block">Allergènes</label>
          <div className="flex flex-wrap gap-2">
            {allAllergens.map((a) => {
              const selected = form.allergens.includes(a.id)
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => toggleAllergen(a.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    selected
                      ? 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/30'
                      : 'bg-[var(--color-bg-main)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:text-white'
                  }`}
                >
                  {selected && <Check size={10} className="inline mr-1" />}
                  {a.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Branch availability */}
        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2.5 block">Disponibilité</label>
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              onClick={() => setField('branchMode', 'all')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                form.branchMode === 'all'
                  ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)] border-[var(--color-gold)]/30'
                  : 'bg-[var(--color-bg-main)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:text-white'
              }`}
            >
              Toutes les branches
            </button>
            <button
              type="button"
              onClick={() => setField('branchMode', 'select')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                form.branchMode === 'select'
                  ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)] border-[var(--color-gold)]/30'
                  : 'bg-[var(--color-bg-main)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:text-white'
              }`}
            >
              Sélectionner
            </button>
          </div>
          <AnimatePresence>
            {form.branchMode === 'select' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 overflow-hidden"
              >
                {branches.map((b) => {
                  const selected = form.selectedBranches.includes(b.id)
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => toggleBranch(b.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm text-left transition-all border ${
                        selected
                          ? 'bg-[var(--color-gold)]/5 border-[var(--color-gold)]/30 text-white'
                          : 'bg-[var(--color-bg-main)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-white'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        selected ? 'border-[var(--color-gold)] bg-[var(--color-gold)]' : 'border-[var(--color-border)]'
                      }`}>
                        {selected && <Check size={10} className="text-[var(--color-bg-main)]" />}
                      </div>
                      {b.name}
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-secondary flex-1 py-3 text-sm">
            Annuler
          </button>
          <button type="submit" className="btn-primary flex-[2] py-3 text-sm flex items-center justify-center gap-2">
            <Check size={16} />
            {isEdit ? 'Enregistrer les modifications' : 'Enregistrer le plat'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

// ─── Category Form Modal ─────────────────────────────────────────────
function CategoryFormModal({ open, onClose, category, onSave }) {
  const isEdit = !!category
  const [name, setName] = useState('')

  useEffect(() => {
    if (open && category) setName(category.name || '')
    else if (open) setName('')
  }, [open, category])

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onSave({ name: name.trim() })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Nom de la catégorie</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Plats VIP"
            required
            autoFocus
            className="input text-sm"
          />
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="btn-secondary flex-1 py-3 text-sm">
            Annuler
          </button>
          <button type="submit" className="btn-primary flex-[2] py-3 text-sm flex items-center justify-center gap-2">
            <Check size={16} />
            {isEdit ? 'Mettre à jour' : 'Créer la catégorie'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
