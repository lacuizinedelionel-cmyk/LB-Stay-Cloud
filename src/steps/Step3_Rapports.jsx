import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import DemoTooltip from '../components/DemoTooltip'
import {
  BarChart3, PieChart, Download, Calendar, GitBranch, TrendingUp,
  ArrowUpRight, FileText, Table
} from 'lucide-react'

const periodes = [
  { id: '7j', label: '7 jours' },
  { id: '30j', label: '30 jours' },
  { id: '90j', label: '90 jours' },
]

const branchesDispos = ['Toutes les branches', 'Douala — Akwa', 'Yaoundé — Bastos', 'Bafoussam — Centre']

const caParPeriode = {
  '7j': [980, 1150, 1050, 1300, 1200, 1400, 1245],
  '30j': [820, 950, 780, 1100, 980, 1250, 1050, 890, 1300, 1150, 1000, 1400, 1200, 1350, 1100, 980, 1450, 1300, 1150, 1500, 1250, 1100, 1600, 1400, 1200, 1550, 1350, 1180, 1650, 1245],
  '90j': Array.from({ length: 90 }, (_, i) => 700 + Math.floor(Math.random() * 1000)),
}

const repartitionPaiements = [
  { mode: 'Orange Money', pct: 38, couleur: 'bg-orange-500', montant: '7 125 000 XAF' },
  { mode: 'MTN MoMo', pct: 28, couleur: 'bg-yellow-500', montant: '5 250 000 XAF' },
  { mode: 'Espèces', pct: 22, couleur: 'bg-green-500', montant: '4 125 000 XAF' },
  { mode: 'Carte bancaire', pct: 12, couleur: 'bg-blue-500', montant: '2 250 000 XAF' },
]

const comparaisonBranches = [
  { nom: 'Douala — Akwa', ca: 8500, objectif: 9000, pct: 94, couleur: 'from-[var(--color-primary)] to-[var(--color-secondary)]' },
  { nom: 'Yaoundé — Bastos', ca: 6200, objectif: 7000, pct: 89, couleur: 'from-blue-500 to-blue-400' },
  { nom: 'Bafoussam — Centre', ca: 4050, objectif: 5000, pct: 81, couleur: 'from-emerald-500 to-emerald-400' },
]

const top10Produits = [
  { rang: 1, nom: 'Poulet DG', ventes: 312, ca: '1 404 000', tendance: '+15%' },
  { rang: 2, nom: 'Suite Prestige', ventes: 45, ca: '1 125 000', tendance: '+22%' },
  { rang: 3, nom: 'Ndolé complet', ventes: 278, ca: '973 000', tendance: '+8%' },
  { rang: 4, nom: 'Poisson braisé', ventes: 189, ca: '945 000', tendance: '+12%' },
  { rang: 5, nom: 'Riz sauté crevettes', ventes: 201, ca: '804 000', tendance: '+5%' },
  { rang: 6, nom: 'Chambre Standard', ventes: 67, ca: '670 000', tendance: '-3%' },
  { rang: 7, nom: 'Jus de fruits', ventes: 420, ca: '630 000', tendance: '+18%' },
  { rang: 8, nom: 'Bière 33 Export', ventes: 540, ca: '540 000', tendance: '+2%' },
  { rang: 9, nom: 'Spa Détente 1h', ventes: 89, ca: '445 000', tendance: '+25%' },
  { rang: 10, nom: 'Gâteau chocolat', ventes: 156, ca: '312 000', tendance: '+10%' },
]

export default function Step5_Rapports() {
  const [periodeActive, setPeriodeActive] = useState('30j')
  const [brancheActive, setBrancheActive] = useState(branchesDispos[0])

  const donneesCa = caParPeriode[periodeActive]
  const caMax = Math.max(...donneesCa)

  return (
    <DashboardLayout activeMenu="rapports">
      <div className="space-y-5">
        {/* En-tête */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-xl font-bold text-white font-[family-name:var(--font-title)]">Rapports & Analytics</h2>
          <div className="flex items-center gap-2">
            <DemoTooltip label="Export en un clic — PDF ou Excel" position="bottom" highlight>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-[var(--color-error)]/10 border border-[var(--color-error)]/30 text-[var(--color-error)] hover:bg-[var(--color-error)]/20 transition-colors">
                  <FileText size={14} /> Export PDF
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-[var(--color-success)]/10 border border-[var(--color-success)]/30 text-[var(--color-success)] hover:bg-[var(--color-success)]/20 transition-colors">
                  <Table size={14} /> Export Excel
                </button>
              </div>
            </DemoTooltip>
          </div>
        </div>

        {/* Filtres période + branche */}
        <div className="flex flex-wrap items-center gap-3">
          <DemoTooltip label="Sélecteur de période — 7, 30 ou 90 jours" position="bottom" highlight>
            <div className="flex bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-1">
              {periodes.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPeriodeActive(p.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                    periodeActive === p.id
                      ? 'bg-[var(--color-primary)] text-[var(--color-bg-main)] shadow-lg shadow-[var(--color-primary)]/20'
                      : 'text-[var(--color-text-muted)] hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </DemoTooltip>

          <DemoTooltip label="Filtrer par branche / point de vente" position="bottom">
            <select
              value={brancheActive}
              onChange={e => setBrancheActive(e.target.value)}
              className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[var(--color-primary)] cursor-pointer"
            >
              {branchesDispos.map(b => <option key={b} value={b} className="bg-[var(--color-card)]">{b}</option>)}
            </select>
          </DemoTooltip>
        </div>

        {/* ═══ GRAPHIQUES ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Courbe CA */}
          <DemoTooltip label="Courbe du chiffre d'affaires sur la période sélectionnée" position="top" highlight>
            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-[var(--color-primary)]" />
                  <h3 className="text-sm font-semibold text-white">Chiffre d'affaires — {periodes.find(p => p.id === periodeActive).label}</h3>
                </div>
                <span className="flex items-center gap-1 text-[10px] text-[var(--color-success)]">
                  <ArrowUpRight size={12} /> +15,2% vs période précédente
                </span>
              </div>
              <div className="h-44 flex items-end gap-px">
                {donneesCa.map((val, i) => (
                  <div key={i} className="flex-1 group relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded px-2 py-1 text-[9px] text-white whitespace-nowrap z-10">
                      {val}k XAF
                    </div>
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-secondary)] opacity-75 hover:opacity-100 transition-all cursor-pointer"
                      style={{ height: `${(val / caMax) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </DemoTooltip>

          {/* Camembert paiements */}
          <DemoTooltip label="Répartition par mode de paiement — Mobile Money dominant" position="top" highlight>
            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <PieChart size={16} className="text-[var(--color-primary)]" />
                <h3 className="text-sm font-semibold text-white">Répartition des paiements</h3>
              </div>

              {/* Camembert CSS */}
              <div className="flex items-center gap-6">
                <div className="relative w-36 h-36 shrink-0">
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      background: `conic-gradient(
                        #f97316 0% 38%,
                        #eab308 38% 66%,
                        #22c55e 66% 88%,
                        #3b82f6 88% 100%
                      )`
                    }}
                  />
                  <div className="absolute inset-4 rounded-full bg-[var(--color-card)] flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">18,75M</p>
                      <p className="text-[9px] text-[var(--color-text-muted)]">XAF total</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 flex-1">
                  {repartitionPaiements.map((r, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-sm ${r.couleur} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-white">{r.mode}</span>
                          <span className="text-xs font-bold text-white">{r.pct}%</span>
                        </div>
                        <p className="text-[10px] text-[var(--color-text-muted)]">{r.montant}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DemoTooltip>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Comparaison branches */}
          <DemoTooltip label="Comparaison des performances entre branches" position="top" highlight>
            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <GitBranch size={16} className="text-[var(--color-primary)]" />
                <h3 className="text-sm font-semibold text-white">Comparaison branches</h3>
              </div>
              <div className="space-y-5">
                {comparaisonBranches.map((b, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white font-medium">{b.nom}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--color-text-muted)]">{b.ca.toLocaleString('fr-FR')}k / {b.objectif.toLocaleString('fr-FR')}k XAF</span>
                        <span className={`text-[10px] font-bold ${b.pct >= 90 ? 'text-[var(--color-success)]' : 'text-[var(--color-primary)]'}`}>{b.pct}%</span>
                      </div>
                    </div>
                    <div className="h-3 bg-[var(--color-bg-main)] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${b.couleur} transition-all duration-700`}
                        style={{ width: `${b.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DemoTooltip>

          {/* Top 10 produits */}
          <DemoTooltip label="Top 10 produits/services par chiffre d'affaires" position="top" highlight>
            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center gap-2">
                <BarChart3 size={16} className="text-[var(--color-primary)]" />
                <h3 className="text-sm font-semibold text-white">Top 10 produits</h3>
              </div>
              <div className="overflow-y-auto max-h-64 scrollbar-hide">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[var(--color-border)]">
                      <th className="px-4 py-2 text-[9px] font-medium text-[var(--color-text-muted)] uppercase">#</th>
                      <th className="px-4 py-2 text-[9px] font-medium text-[var(--color-text-muted)] uppercase">Produit</th>
                      <th className="px-4 py-2 text-[9px] font-medium text-[var(--color-text-muted)] uppercase">Ventes</th>
                      <th className="px-4 py-2 text-[9px] font-medium text-[var(--color-text-muted)] uppercase">CA (XAF)</th>
                      <th className="px-4 py-2 text-[9px] font-medium text-[var(--color-text-muted)] uppercase">Tend.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {top10Produits.map(p => (
                      <tr key={p.rang} className="border-b border-[var(--color-border)] last:border-0 hover:bg-white/[0.02]">
                        <td className="px-4 py-2.5">
                          <span className={`w-5 h-5 rounded-md text-[10px] font-bold flex items-center justify-center ${
                            p.rang <= 3 ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]' : 'bg-white/5 text-[var(--color-text-muted)]'
                          }`}>{p.rang}</span>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-white font-medium">{p.nom}</td>
                        <td className="px-4 py-2.5 text-xs text-[var(--color-text-muted)]">{p.ventes}</td>
                        <td className="px-4 py-2.5 text-xs text-white font-medium">{p.ca}</td>
                        <td className="px-4 py-2.5">
                          <span className={`text-[10px] font-bold ${p.tendance.startsWith('+') ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                            {p.tendance}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </DemoTooltip>
        </div>
      </div>
    </DashboardLayout>
  )
}
