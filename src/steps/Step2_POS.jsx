import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import DemoTooltip from '../components/DemoTooltip'
import {
  Plus, Minus, Trash2, CreditCard, Smartphone, Banknote, QrCode,
  Search, AlertTriangle, CheckCircle, MessageCircle, Printer,
  Receipt, Tag
} from 'lucide-react'

const categories = [
  { id: 'tout', label: 'Tout' },
  { id: 'boissons', label: 'Boissons' },
  { id: 'plats', label: 'Plats principaux' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'snacks', label: 'Snacks & Entrées' },
]

const produits = [
  { id: 1, nom: 'Jus de fruits frais', prix: 1500, cat: 'boissons', dispo: true },
  { id: 2, nom: 'Coca-Cola 33cl', prix: 800, cat: 'boissons', dispo: true },
  { id: 3, nom: 'Bière 33 Export', prix: 1000, cat: 'boissons', dispo: true },
  { id: 4, nom: 'Eau minérale 1.5L', prix: 500, cat: 'boissons', dispo: false },
  { id: 5, nom: 'Ndolé complet', prix: 3500, cat: 'plats', dispo: true },
  { id: 6, nom: 'Poulet DG', prix: 4500, cat: 'plats', dispo: true },
  { id: 7, nom: 'Poisson braisé', prix: 5000, cat: 'plats', dispo: true },
  { id: 8, nom: 'Eru & Waterfufu', prix: 3000, cat: 'plats', dispo: false },
  { id: 9, nom: 'Riz sauté crevettes', prix: 4000, cat: 'plats', dispo: true },
  { id: 10, nom: 'Gâteau chocolat', prix: 2000, cat: 'desserts', dispo: true },
  { id: 11, nom: 'Crème brûlée', prix: 2500, cat: 'desserts', dispo: true },
  { id: 12, nom: 'Beignets (x5)', prix: 500, cat: 'snacks', dispo: true },
  { id: 13, nom: 'Samossa poulet (x3)', prix: 1200, cat: 'snacks', dispo: true },
  { id: 14, nom: 'Plantain frit', prix: 800, cat: 'snacks', dispo: true },
]

const modesPaiement = [
  { id: 'cash', label: 'Espèces', icon: Banknote, couleur: 'text-green-400' },
  { id: 'orange', label: 'Orange Money', icon: Smartphone, couleur: 'text-orange-400' },
  { id: 'mtn', label: 'MTN MoMo', icon: Smartphone, couleur: 'text-yellow-400' },
  { id: 'carte', label: 'Carte bancaire', icon: CreditCard, couleur: 'text-blue-400' },
]

const TVA_RATE = 0.1925

export default function Step4_POS() {
  const [catActive, setCatActive] = useState('tout')
  const [recherche, setRecherche] = useState('')
  const [panier, setPanier] = useState([])
  const [modePaiement, setModePaiement] = useState(null)
  const [factureEnvoyee, setFactureEnvoyee] = useState(false)

  const ajouterAuPanier = (produit) => {
    if (!produit.dispo) return
    setPanier(prev => {
      const existant = prev.find(item => item.id === produit.id)
      if (existant) return prev.map(item => item.id === produit.id ? { ...item, qte: item.qte + 1 } : item)
      return [...prev, { ...produit, qte: 1 }]
    })
  }

  const modifierQte = (id, delta) => {
    setPanier(prev => prev.map(item => {
      if (item.id !== id) return item
      const nouvelleQte = item.qte + delta
      return nouvelleQte > 0 ? { ...item, qte: nouvelleQte } : item
    }).filter(item => item.qte > 0))
  }

  const supprimerItem = (id) => setPanier(prev => prev.filter(item => item.id !== id))

  const sousTotal = panier.reduce((sum, item) => sum + item.prix * item.qte, 0)
  const tva = Math.round(sousTotal * TVA_RATE)
  const total = sousTotal + tva

  const filtres = produits.filter(p =>
    (catActive === 'tout' || p.cat === catActive) &&
    p.nom.toLowerCase().includes(recherche.toLowerCase())
  )

  const handleValider = () => {
    setFactureEnvoyee(true)
    setTimeout(() => setFactureEnvoyee(false), 3000)
  }

  return (
    <DashboardLayout activeMenu="commandes">
      <div className="flex flex-col lg:flex-row gap-5 h-full">
        {/* ═══ CATALOGUE GAUCHE ═══ */}
        <div className="lg:flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white font-[family-name:var(--font-title)]">Interface POS — Caissier</h2>
          </div>

          {/* Barre de recherche + filtres */}
          <DemoTooltip label="Filtres par catégorie et recherche instantanée" position="bottom" highlight>
            <div className="space-y-3">
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={recherche}
                  onChange={e => setRecherche(e.target.value)}
                  className="w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-primary)] transition-colors"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCatActive(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                      catActive === cat.id
                        ? 'bg-[var(--color-primary)] text-[var(--color-bg-main)] shadow-lg shadow-[var(--color-primary)]/20'
                        : 'bg-[var(--color-card)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:text-white hover:border-white/20'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </DemoTooltip>

          {/* Grille produits */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtres.map(produit => (
              <DemoTooltip
                key={produit.id}
                label={!produit.dispo ? "Badge rupture — produit indisponible" : ""}
                position="top"
                visible={!produit.dispo && produit.id === 4}
              >
                <button
                  onClick={() => ajouterAuPanier(produit)}
                  disabled={!produit.dispo}
                  className={`relative bg-[var(--color-card)] border rounded-xl p-4 text-left transition-all group ${
                    !produit.dispo
                      ? 'border-[var(--color-error)]/30 opacity-50 cursor-not-allowed'
                      : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:shadow-lg hover:shadow-black/10 hover:scale-[1.02] cursor-pointer'
                  }`}
                >
                  {!produit.dispo && (
                    <span className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[var(--color-error)]/20 text-[8px] font-bold text-[var(--color-error)]">
                      <AlertTriangle size={10} />
                      RUPTURE
                    </span>
                  )}
                  <p className="text-xs font-medium text-white group-hover:text-[var(--color-primary)] transition-colors mb-2 pr-12">{produit.nom}</p>
                  <p className="text-lg font-bold text-[var(--color-primary)]">{produit.prix.toLocaleString('fr-FR')} <span className="text-[10px] font-normal text-[var(--color-text-muted)]">XAF</span></p>
                </button>
              </DemoTooltip>
            ))}
          </div>
        </div>

        {/* ═══ PANIER + PAIEMENT DROITE ═══ */}
        <div className="lg:w-96 shrink-0">
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl flex flex-col h-full">
            <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Panier</h3>
              <span className="text-[10px] text-[var(--color-text-muted)] bg-[var(--color-bg-main)] px-2 py-0.5 rounded-md">
                {panier.reduce((s, i) => s + i.qte, 0)} article{panier.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Liste panier */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 max-h-64 scrollbar-hide">
              {panier.length === 0 ? (
                <div className="text-center py-10">
                  <Receipt size={32} className="mx-auto mb-3 text-[var(--color-border)]" />
                  <p className="text-xs text-[var(--color-text-muted)]">Panier vide — cliquez sur un produit</p>
                </div>
              ) : (
                panier.map(item => (
                  <div key={item.id} className="flex items-center gap-3 bg-[var(--color-bg-main)] rounded-xl p-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white font-medium truncate">{item.nom}</p>
                      <p className="text-[10px] text-[var(--color-text-muted)]">{item.prix.toLocaleString('fr-FR')} XAF × {item.qte}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => modifierQte(item.id, -1)} className="p-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><Minus size={12} className="text-white" /></button>
                      <span className="text-xs font-bold text-white w-5 text-center">{item.qte}</span>
                      <button onClick={() => modifierQte(item.id, 1)} className="p-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><Plus size={12} className="text-white" /></button>
                      <button onClick={() => supprimerItem(item.id)} className="p-1 rounded-lg bg-white/5 hover:bg-[var(--color-error)]/20 transition-colors ml-1"><Trash2 size={12} className="text-[var(--color-error)]" /></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Totaux */}
            <div className="px-5 py-4 border-t border-[var(--color-border)] space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[var(--color-text-muted)]">Sous-total</span>
                <span className="text-white">{sousTotal.toLocaleString('fr-FR')} XAF</span>
              </div>
              <DemoTooltip label="TVA 19,25% CEMAC calculée automatiquement" position="left" highlight>
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--color-text-muted)] flex items-center gap-1">
                    <Tag size={10} />
                    TVA 19,25%
                  </span>
                  <span className="text-[var(--color-primary)]">{tva.toLocaleString('fr-FR')} XAF</span>
                </div>
              </DemoTooltip>
              <div className="h-px bg-[var(--color-border)]" />
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-white">Total TTC</span>
                <span className="text-xl font-bold text-[var(--color-primary)]">{total.toLocaleString('fr-FR')} XAF</span>
              </div>
            </div>

            {/* Modes de paiement */}
            <div className="px-5 pb-4 space-y-3">
              <DemoTooltip label="Orange Money et MTN MoMo — paiement en 30 secondes" position="left" highlight>
                <div className="grid grid-cols-2 gap-2">
                  {modesPaiement.map(mp => {
                    const Icon = mp.icon
                    return (
                      <button
                        key={mp.id}
                        onClick={() => setModePaiement(mp.id)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                          modePaiement === mp.id
                            ? 'bg-[var(--color-primary)]/15 border-2 border-[var(--color-primary)] text-[var(--color-primary)]'
                            : 'bg-[var(--color-bg-main)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-white hover:border-white/20'
                        }`}
                      >
                        <Icon size={16} className={modePaiement === mp.id ? 'text-[var(--color-primary)]' : mp.couleur} />
                        {mp.label}
                      </button>
                    )
                  })}
                </div>
              </DemoTooltip>

              {/* Boutons validation */}
              <DemoTooltip label="Validation + envoi facture WhatsApp automatique" position="top" highlight>
                <div className="space-y-2">
                  <button
                    onClick={handleValider}
                    disabled={panier.length === 0 || !modePaiement}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-[var(--color-primary)] text-[var(--color-bg-main)] hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-[var(--color-primary)]/20"
                  >
                    <CheckCircle size={16} />
                    Valider le paiement
                  </button>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[10px] font-medium border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-white hover:bg-white/5">
                      <Printer size={12} /> Imprimer reçu
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[10px] font-medium border border-green-500/30 text-green-400 hover:bg-green-500/10">
                      <MessageCircle size={12} /> Facture WhatsApp
                    </button>
                  </div>
                </div>
              </DemoTooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Toast facture */}
      {factureEnvoyee && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[70] animate-fade-slide">
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[var(--color-card)] border border-[var(--color-success)] shadow-2xl shadow-[var(--color-success)]/20">
            <CheckCircle size={18} className="text-[var(--color-success)] shrink-0" />
            <span className="text-sm text-white font-medium">Paiement validé — Facture PDF envoyée par WhatsApp</span>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
