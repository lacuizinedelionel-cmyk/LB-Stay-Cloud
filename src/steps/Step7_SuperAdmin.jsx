import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import DemoTooltip from '../components/DemoTooltip'
import {
  Shield, Building2, Users, TrendingUp, UserPlus, CreditCard,
  CheckCircle2, AlertTriangle, Activity, Server, Database,
  Wifi, HardDrive, Cpu, Pause, Play, Ban, RotateCcw,
  ArrowUpRight, Eye
} from 'lucide-react'

const kpis = [
  { label: 'Clients plateforme', valeur: '127', change: '+12', icone: Building2, couleur: 'from-blue-500/20 to-blue-600/5' },
  { label: 'MRR Total', valeur: '4,2M XAF', change: '+18%', icone: TrendingUp, couleur: 'from-[var(--color-primary)]/20 to-amber-600/5' },
  { label: 'Nouveaux comptes', valeur: '23', change: '+8 ce mois', icone: UserPlus, couleur: 'from-emerald-500/20 to-emerald-600/5' },
  { label: 'Essais gratuits', valeur: '41', change: '14 jours restants', icone: CreditCard, couleur: 'from-purple-500/20 to-purple-600/5' },
]

const clientsPlateforme = [
  { id: 1, nom: 'Hôtel Le Palmier', secteur: 'Hébergement', ville: 'Douala', utilisateurs: 12, mrr: '450 000', plan: 'Enterprise', statut: 'actif', depuis: 'Jan 2025' },
  { id: 2, nom: 'Restaurant Chez Mama', secteur: 'Restauration', ville: 'Yaoundé', utilisateurs: 5, mrr: '249 000', plan: 'Pro', statut: 'actif', depuis: 'Mar 2025' },
  { id: 3, nom: 'Pharmacie du Carrefour', secteur: 'Santé', ville: 'Bafoussam', utilisateurs: 8, mrr: '249 000', plan: 'Pro', statut: 'actif', depuis: 'Avr 2025' },
  { id: 4, nom: 'Salon Beauté Prestige', secteur: 'Beauté', ville: 'Kribi', utilisateurs: 3, mrr: '99 000', plan: 'Starter', statut: 'actif', depuis: 'Juin 2025' },
  { id: 5, nom: 'Garage Express Auto', secteur: 'Mécanique', ville: 'Douala', utilisateurs: 4, mrr: '0', plan: 'Essai', statut: 'essai', depuis: 'Avr 2026' },
  { id: 6, nom: 'Épicerie Bonne Santé', secteur: 'Épicerie', ville: 'Yaoundé', utilisateurs: 2, mrr: '99 000', plan: 'Starter', statut: 'suspendu', depuis: 'Fév 2026' },
  { id: 7, nom: 'CoWork Hub Bastos', secteur: 'Coworking', ville: 'Yaoundé', utilisateurs: 6, mrr: '249 000', plan: 'Pro', statut: 'actif', depuis: 'Sep 2025' },
  { id: 8, nom: 'Clinique Soleil', secteur: 'Santé', ville: 'Douala', utilisateurs: 15, mrr: '450 000', plan: 'Enterprise', statut: 'actif', depuis: 'Nov 2024' },
]

const statutBadge = {
  actif: { bg: 'bg-[var(--color-success)]/20 text-[var(--color-success)]', label: 'Actif' },
  essai: { bg: 'bg-[var(--color-info)]/20 text-[var(--color-info)]', label: 'Essai 14j' },
  suspendu: { bg: 'bg-[var(--color-error)]/20 text-[var(--color-error)]', label: 'Suspendu' },
}

const planBadge = {
  Starter: 'bg-gray-500/20 text-gray-300',
  Pro: 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]',
  Enterprise: 'bg-purple-500/20 text-purple-400',
  Essai: 'bg-[var(--color-info)]/20 text-[var(--color-info)]',
}

const serveurs = [
  { nom: 'API Gateway', icone: Wifi, statut: 'ok', cpu: '23%', ram: '45%', uptime: '99,99%' },
  { nom: 'Base de données', icone: Database, statut: 'ok', cpu: '41%', ram: '68%', uptime: '99,98%' },
  { nom: 'WhatsApp Service', icone: Activity, statut: 'ok', cpu: '12%', ram: '34%', uptime: '99,95%' },
  { nom: 'Paiements', icone: CreditCard, statut: 'warning', cpu: '67%', ram: '72%', uptime: '99,90%' },
  { nom: 'Stockage fichiers', icone: HardDrive, statut: 'ok', cpu: '8%', ram: '52%', uptime: '100%' },
  { nom: 'Worker Jobs', icone: Cpu, statut: 'ok', cpu: '34%', ram: '41%', uptime: '99,97%' },
]

const mrrParMois = [2800, 3100, 3200, 3400, 3500, 3700, 3800, 3900, 4000, 4100, 4150, 4200]
const mrrMax = Math.max(...mrrParMois)

export default function Step9_SuperAdmin() {
  const [filtreStatut, setFiltreStatut] = useState('tous')

  const clientsFiltres = clientsPlateforme.filter(c =>
    filtreStatut === 'tous' || c.statut === filtreStatut
  )

  return (
    <DashboardLayout activeMenu="superadmin">
      <div className="space-y-5">
        {/* En-tête */}
        <div className="flex items-center gap-3">
          <Shield size={22} className="text-[var(--color-primary)]" />
          <h2 className="text-xl font-bold text-white font-[family-name:var(--font-title)]">Super Admin — Dashboard Plateforme</h2>
        </div>

        {/* ═══ KPIs PLATEFORME ═══ */}
        <DemoTooltip label="KPIs plateforme — vision globale multi-tenant" position="bottom" highlight>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi, i) => {
              const Icon = kpi.icone
              return (
                <div key={i} className={`bg-gradient-to-br ${kpi.couleur} bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5`}>
                  <Icon size={20} className="text-[var(--color-primary)] mb-3" />
                  <p className="text-2xl font-bold text-white">{kpi.valeur}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">{kpi.label}</p>
                  <span className="flex items-center gap-0.5 text-[10px] font-bold text-[var(--color-success)] mt-1">
                    <ArrowUpRight size={10} />{kpi.change}
                  </span>
                </div>
              )
            })}
          </div>
        </DemoTooltip>

        {/* Graphique MRR */}
        <DemoTooltip label="Évolution du MRR sur 12 mois — revenu mensuel récurrent" position="top" highlight>
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-[var(--color-primary)]" />
                <h3 className="text-sm font-semibold text-white">MRR — 12 derniers mois (en milliers XAF)</h3>
              </div>
              <span className="text-[10px] text-[var(--color-success)] bg-[var(--color-success)]/10 px-2 py-1 rounded-md font-bold">+50% en 12 mois</span>
            </div>
            <div className="h-36 flex items-end gap-2">
              {mrrParMois.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded px-2 py-1 text-[9px] text-white whitespace-nowrap z-10">
                    {val}k XAF
                  </div>
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-secondary)] opacity-75 hover:opacity-100 transition-all cursor-pointer"
                    style={{ height: `${(val / mrrMax) * 100}%` }}
                  />
                  <span className="text-[8px] text-[var(--color-text-muted)]">{['M','J','J','A','S','O','N','D','J','F','M','A'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </DemoTooltip>

        {/* ═══ TABLEAU CLIENTS PLATEFORME ═══ */}
        <DemoTooltip label="Tableau des clients plateforme — actions suspendre/réactiver" position="top" highlight>
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center justify-between flex-wrap gap-3">
              <h3 className="text-sm font-semibold text-white">Clients plateforme ({clientsPlateforme.length})</h3>
              <div className="flex items-center gap-2">
                {['tous', 'actif', 'essai', 'suspendu'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFiltreStatut(f)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                      filtreStatut === f
                        ? 'bg-[var(--color-primary)] text-[var(--color-bg-main)]'
                        : 'text-[var(--color-text-muted)] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {f === 'tous' ? 'Tous' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="px-5 py-2.5 text-[9px] font-medium text-[var(--color-text-muted)] uppercase">Établissement</th>
                    <th className="px-5 py-2.5 text-[9px] font-medium text-[var(--color-text-muted)] uppercase">Secteur</th>
                    <th className="px-5 py-2.5 text-[9px] font-medium text-[var(--color-text-muted)] uppercase">Ville</th>
                    <th className="px-5 py-2.5 text-[9px] font-medium text-[var(--color-text-muted)] uppercase">Users</th>
                    <th className="px-5 py-2.5 text-[9px] font-medium text-[var(--color-text-muted)] uppercase">Plan</th>
                    <th className="px-5 py-2.5 text-[9px] font-medium text-[var(--color-text-muted)] uppercase">MRR</th>
                    <th className="px-5 py-2.5 text-[9px] font-medium text-[var(--color-text-muted)] uppercase">Statut</th>
                    <th className="px-5 py-2.5 text-[9px] font-medium text-[var(--color-text-muted)] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clientsFiltres.map(client => {
                    const sb = statutBadge[client.statut]
                    return (
                      <tr key={client.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-white/[0.02]">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/15 flex items-center justify-center text-[10px] font-bold text-[var(--color-primary)]">
                              {client.nom.split(' ').slice(-1)[0]?.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-xs font-medium text-white">{client.nom}</p>
                              <p className="text-[9px] text-[var(--color-text-muted)]">Depuis {client.depuis}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-xs text-[var(--color-text-muted)]">{client.secteur}</td>
                        <td className="px-5 py-3 text-xs text-[var(--color-text-muted)]">{client.ville}</td>
                        <td className="px-5 py-3 text-xs text-white">{client.utilisateurs}</td>
                        <td className="px-5 py-3">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${planBadge[client.plan]}`}>{client.plan}</span>
                        </td>
                        <td className="px-5 py-3 text-xs text-white font-medium">{client.mrr === '0' ? '—' : `${client.mrr} XAF`}</td>
                        <td className="px-5 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${sb.bg}`}>{sb.label}</span>
                        </td>
                        <td className="px-5 py-3">
                          <DemoTooltip label={client.statut === 'suspendu' ? "Réactiver ce compte" : client.statut === 'actif' ? "Suspendre ce compte" : ""} position="left" visible={client.statut !== 'essai'}>
                            <div className="flex items-center gap-1">
                              <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" title="Voir">
                                <Eye size={13} className="text-[var(--color-text-muted)]" />
                              </button>
                              {client.statut === 'actif' && (
                                <button className="p-1.5 rounded-lg hover:bg-[var(--color-error)]/20 transition-colors" title="Suspendre">
                                  <Pause size={13} className="text-[var(--color-error)]" />
                                </button>
                              )}
                              {client.statut === 'suspendu' && (
                                <button className="p-1.5 rounded-lg hover:bg-[var(--color-success)]/20 transition-colors" title="Réactiver">
                                  <RotateCcw size={13} className="text-[var(--color-success)]" />
                                </button>
                              )}
                            </div>
                          </DemoTooltip>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </DemoTooltip>

        {/* ═══ MONITORING TECHNIQUE ═══ */}
        <DemoTooltip label="Monitoring technique — état des serveurs en temps réel" position="top" highlight>
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Server size={16} className="text-[var(--color-primary)]" />
              <h3 className="text-sm font-semibold text-white">Monitoring technique</h3>
              <span className="ml-auto text-[10px] text-[var(--color-success)] bg-[var(--color-success)]/10 px-2 py-0.5 rounded-md font-medium">Tous les systèmes opérationnels</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {serveurs.map((s, i) => {
                const Icon = s.icone
                const isWarning = s.statut === 'warning'
                return (
                  <div key={i} className={`bg-[var(--color-bg-main)] rounded-xl p-4 border ${isWarning ? 'border-[var(--color-primary)]/40' : 'border-[var(--color-border)]'}`}>
                    <div className="flex items-center gap-2.5 mb-3">
                      {isWarning ? <AlertTriangle size={16} className="text-[var(--color-primary)]" /> : <CheckCircle2 size={16} className="text-[var(--color-success)]" />}
                      <div className="flex-1">
                        <p className="text-xs font-medium text-white">{s.nom}</p>
                        <p className={`text-[9px] ${isWarning ? 'text-[var(--color-primary)]' : 'text-[var(--color-success)]'}`}>
                          {isWarning ? 'Charge élevée' : 'Opérationnel'}
                        </p>
                      </div>
                      <Icon size={14} className="text-[var(--color-text-muted)]" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <Jauge label="CPU" valeur={s.cpu} warning={parseInt(s.cpu) > 60} />
                      <Jauge label="RAM" valeur={s.ram} warning={parseInt(s.ram) > 70} />
                      <div className="text-center">
                        <p className="text-[9px] text-[var(--color-text-muted)]">Uptime</p>
                        <p className="text-xs font-bold text-[var(--color-success)]">{s.uptime}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </DemoTooltip>
      </div>
    </DashboardLayout>
  )
}

function Jauge({ label, valeur, warning = false }) {
  const pct = parseInt(valeur)
  return (
    <div className="text-center">
      <p className="text-[9px] text-[var(--color-text-muted)]">{label}</p>
      <div className="h-1.5 bg-[var(--color-border)] rounded-full mt-1 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${warning ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-success)]'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className={`text-[10px] font-bold mt-0.5 ${warning ? 'text-[var(--color-primary)]' : 'text-white'}`}>{valeur}</p>
    </div>
  )
}
