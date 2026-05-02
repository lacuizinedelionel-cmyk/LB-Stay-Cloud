import { useDemo } from '../context/DemoContext'
import DashboardLayout from '../components/DashboardLayout'
import DemoTooltip from '../components/DemoTooltip'
import {
  DollarSign, ShoppingCart, Users, Star, ArrowUpRight, ArrowDownRight,
  TrendingUp, Clock
} from 'lucide-react'

const kpis = [
  { label: 'CA du Jour', valeur: '1 245 000', unite: 'XAF', change: '+12,5%', positif: true, icon: DollarSign, couleur: 'from-amber-500/20 to-amber-600/5' },
  { label: 'Commandes / Ventes', valeur: '87', unite: '', change: '+8,3%', positif: true, icon: ShoppingCart, couleur: 'from-blue-500/20 to-blue-600/5' },
  { label: 'Clients actifs', valeur: '342', unite: '', change: '+3,1%', positif: true, icon: Users, couleur: 'from-emerald-500/20 to-emerald-600/5' },
  { label: 'Note moyenne', valeur: '4.8', unite: '/ 5', change: '+0,2', positif: true, icon: Star, couleur: 'from-purple-500/20 to-purple-600/5' },
]

const ca30jours = [
  820, 950, 780, 1100, 980, 1250, 1050, 890, 1300, 1150, 1000, 1400,
  1200, 1350, 1100, 980, 1450, 1300, 1150, 1500, 1250, 1100, 1600, 1400,
  1200, 1550, 1350, 1180, 1650, 1245
]
const caMax = Math.max(...ca30jours)

const commandesParHeure = [
  { heure: '08h', val: 5 }, { heure: '09h', val: 12 }, { heure: '10h', val: 18 },
  { heure: '11h', val: 25 }, { heure: '12h', val: 42 }, { heure: '13h', val: 38 },
  { heure: '14h', val: 22 }, { heure: '15h', val: 15 }, { heure: '16h', val: 20 },
  { heure: '17h', val: 28 }, { heure: '18h', val: 35 }, { heure: '19h', val: 45 },
  { heure: '20h', val: 40 }, { heure: '21h', val: 30 }, { heure: '22h', val: 12 },
]
const cmdMax = Math.max(...commandesParHeure.map(c => c.val))

const transactions = [
  { id: '#1247', client: 'Jean-Pierre Kamga', montant: '45 000 XAF', mode: 'Orange Money', heure: '14:32', statut: 'success' },
  { id: '#1246', client: 'Marie-Claire Fotso', montant: '78 500 XAF', mode: 'MTN MoMo', heure: '14:15', statut: 'success' },
  { id: '#1245', client: 'Paul Ndjock', montant: '120 000 XAF', mode: 'Carte bancaire', heure: '13:58', statut: 'success' },
  { id: '#1244', client: 'Aissatou Bello', montant: '15 000 XAF', mode: 'Espèces', heure: '13:40', statut: 'pending' },
  { id: '#1243', client: 'Emmanuel Tchoupo', montant: '92 000 XAF', mode: 'Orange Money', heure: '13:22', statut: 'success' },
]

const topProduits = [
  { nom: 'Poulet DG', ventes: 156, ca: '702 000 XAF', pct: 100 },
  { nom: 'Suite Prestige', ventes: 23, ca: '575 000 XAF', pct: 82 },
  { nom: 'Ndolé complet', ventes: 134, ca: '469 000 XAF', pct: 67 },
  { nom: 'Jus de fruits frais', ventes: 210, ca: '315 000 XAF', pct: 45 },
  { nom: 'Bière 33 Export', ventes: 189, ca: '189 000 XAF', pct: 27 },
]

const statutBadge = {
  success: 'bg-[var(--color-success)]/20 text-[var(--color-success)]',
  pending: 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]',
}

export default function Step3_Dashboard() {
  const { selectedSector } = useDemo()

  return (
    <DashboardLayout activeMenu="dashboard" tooltipSidebar={true}>
      <div className="space-y-5">
        {/* En-tête */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold text-white font-[family-name:var(--font-title)]">
              Dashboard — Vue 360°
            </h2>
            <p className="text-xs text-[var(--color-text-muted)]">
              Aujourd'hui, 2 mai 2026 — Secteur : {selectedSector.charAt(0).toUpperCase() + selectedSector.slice(1)}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-medium bg-[var(--color-success)]/20 text-[var(--color-success)]">
            Données temps réel
          </span>
        </div>

        {/* ═══ KPI CARDS ═══ */}
        <DemoTooltip label="KPIs du jour — CA, ventes, clients et satisfaction en temps réel" position="bottom" highlight>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi, i) => {
              const Icon = kpi.icon
              return (
                <div key={i} className={`bg-gradient-to-br ${kpi.couleur} bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5 hover:shadow-lg hover:shadow-black/10 transition-all`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-[var(--color-primary)]/10">
                      <Icon size={20} className="text-[var(--color-primary)]" />
                    </div>
                    <span className={`flex items-center gap-0.5 text-xs font-semibold ${kpi.positif ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                      {kpi.positif ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {kpi.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {kpi.valeur} <span className="text-sm font-normal text-[var(--color-text-muted)]">{kpi.unite}</span>
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">{kpi.label}</p>
                </div>
              )
            })}
          </div>
        </DemoTooltip>

        {/* ═══ GRAPHIQUES ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Courbe CA 30 jours */}
          <DemoTooltip label="Courbe de chiffre d'affaires sur 30 jours" position="top" highlight>
            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-[var(--color-primary)]" />
                  <h3 className="text-sm font-semibold text-white">Chiffre d'affaires — 30 derniers jours</h3>
                </div>
                <span className="text-[10px] text-[var(--color-text-muted)] bg-[var(--color-bg-main)] px-2 py-1 rounded-md">en milliers XAF</span>
              </div>
              <div className="h-48 flex items-end gap-[3px]">
                {ca30jours.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded px-2 py-1 text-[9px] text-white whitespace-nowrap z-10">
                      J{i + 1} : {val}k XAF
                    </div>
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-secondary)] opacity-80 hover:opacity-100 transition-all cursor-pointer"
                      style={{ height: `${(val / caMax) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[9px] text-[var(--color-text-muted)]">
                <span>1 Avr</span><span>10 Avr</span><span>20 Avr</span><span>30 Avr</span>
              </div>
            </div>
          </DemoTooltip>

          {/* Histogramme commandes/heure */}
          <DemoTooltip label="Histogramme des commandes par tranche horaire" position="top" highlight>
            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[var(--color-primary)]" />
                  <h3 className="text-sm font-semibold text-white">Commandes par heure — Aujourd'hui</h3>
                </div>
                <span className="text-[10px] text-[var(--color-text-muted)] bg-[var(--color-bg-main)] px-2 py-1 rounded-md">87 total</span>
              </div>
              <div className="h-48 flex items-end gap-1.5">
                {commandesParHeure.map((c, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded px-2 py-1 text-[9px] text-white whitespace-nowrap z-10">
                      {c.heure} : {c.val} cmd
                    </div>
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-[var(--color-info)] to-blue-400 opacity-70 hover:opacity-100 transition-all cursor-pointer"
                      style={{ height: `${(c.val / cmdMax) * 100}%` }}
                    />
                    <span className="text-[8px] text-[var(--color-text-muted)]">{c.heure}</span>
                  </div>
                ))}
              </div>
            </div>
          </DemoTooltip>
        </div>

        {/* ═══ TABLEAUX ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* 5 dernières transactions */}
          <DemoTooltip label="5 dernières transactions avec mode de paiement" position="top" highlight>
            <div className="lg:col-span-2 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[var(--color-border)]">
                <h3 className="text-sm font-semibold text-white">Dernières transactions</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[var(--color-border)]">
                      <th className="px-5 py-2.5 text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">N°</th>
                      <th className="px-5 py-2.5 text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Client</th>
                      <th className="px-5 py-2.5 text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Montant</th>
                      <th className="px-5 py-2.5 text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Paiement</th>
                      <th className="px-5 py-2.5 text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Heure</th>
                      <th className="px-5 py-2.5 text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t, i) => (
                      <tr key={i} className="border-b border-[var(--color-border)] last:border-0 hover:bg-white/[0.02]">
                        <td className="px-5 py-3 text-xs font-mono text-[var(--color-primary)]">{t.id}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[var(--color-primary)]/15 flex items-center justify-center text-[10px] font-bold text-[var(--color-primary)]">
                              {t.client.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <span className="text-xs text-white font-medium">{t.client}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-xs text-white font-semibold">{t.montant}</td>
                        <td className="px-5 py-3 text-xs text-[var(--color-text-muted)]">{t.mode}</td>
                        <td className="px-5 py-3 text-xs text-[var(--color-text-muted)]">{t.heure}</td>
                        <td className="px-5 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statutBadge[t.statut]}`}>
                            {t.statut === 'success' ? 'Payé' : 'En attente'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </DemoTooltip>

          {/* Top 5 produits */}
          <DemoTooltip label="Top 5 produits/services par chiffre d'affaires" position="left" highlight>
            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Top 5 produits / services</h3>
              <div className="space-y-4">
                {topProduits.map((p, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-[var(--color-primary)]/15 text-[10px] font-bold text-[var(--color-primary)] flex items-center justify-center">{i + 1}</span>
                        <span className="text-xs text-white font-medium">{p.nom}</span>
                      </div>
                      <span className="text-[10px] text-[var(--color-text-muted)]">{p.ventes} ventes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-[var(--color-bg-main)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
                          style={{ width: `${p.pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-[var(--color-secondary)] font-medium w-24 text-right">{p.ca}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DemoTooltip>
        </div>
      </div>
    </DashboardLayout>
  )
}
