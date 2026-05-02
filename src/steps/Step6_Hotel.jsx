import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import DemoTooltip from '../components/DemoTooltip'
import {
  DoorOpen, DoorClosed, Sparkles, CalendarCheck, User, Clock,
  BedDouble, ArrowRightLeft, Bell, AlertTriangle, CheckCircle,
  LogIn, LogOut, Plus
} from 'lucide-react'

const statutConfig = {
  libre: { label: 'Libre', couleur: 'bg-[var(--color-success)]/20 border-[var(--color-success)]/40 text-[var(--color-success)]', icon: DoorOpen, dot: 'bg-[var(--color-success)]' },
  occupee: { label: 'Occupée', couleur: 'bg-blue-500/20 border-blue-500/40 text-blue-400', icon: DoorClosed, dot: 'bg-blue-500' },
  reservee: { label: 'Réservée', couleur: 'bg-purple-500/20 border-purple-500/40 text-purple-400', icon: CalendarCheck, dot: 'bg-purple-500' },
  nettoyage: { label: 'Nettoyage', couleur: 'bg-amber-500/20 border-amber-500/40 text-amber-400', icon: Sparkles, dot: 'bg-amber-500' },
}

const etages = [
  {
    nom: 'Rez-de-chaussée',
    chambres: [
      { num: 'R01', statut: 'occupee', type: 'Standard', client: 'M. Kamga', checkin: '30 Avr', checkout: '03 Mai', prix: '25 000' },
      { num: 'R02', statut: 'libre', type: 'Standard', client: null, checkin: null, checkout: null, prix: '25 000' },
      { num: 'R03', statut: 'nettoyage', type: 'Standard', client: null, checkin: null, checkout: null, prix: '25 000' },
      { num: 'R04', statut: 'reservee', type: 'Supérieure', client: 'Mme Eyinga', checkin: '02 Mai', checkout: '05 Mai', prix: '40 000' },
    ],
  },
  {
    nom: '1er Étage',
    chambres: [
      { num: '101', statut: 'occupee', type: 'Supérieure', client: 'Mme Fotso', checkin: '29 Avr', checkout: '04 Mai', prix: '40 000' },
      { num: '102', statut: 'libre', type: 'Supérieure', client: null, checkin: null, checkout: null, prix: '40 000' },
      { num: '103', statut: 'occupee', type: 'Supérieure', client: 'M. Ndjock', checkin: '01 Mai', checkout: '05 Mai', prix: '40 000' },
      { num: '104', statut: 'occupee', type: 'Suite Junior', client: 'M. Bello', checkin: '28 Avr', checkout: '02 Mai', prix: '65 000' },
      { num: '105', statut: 'nettoyage', type: 'Suite Junior', client: null, checkin: null, checkout: null, prix: '65 000' },
    ],
  },
  {
    nom: '2ème Étage — Suites',
    chambres: [
      { num: '201', statut: 'occupee', type: 'Suite Prestige', client: 'M. Tchoupo', checkin: '30 Avr', checkout: '06 Mai', prix: '120 000' },
      { num: '202', statut: 'reservee', type: 'Suite Prestige', client: 'Mme Ngono', checkin: '03 Mai', checkout: '07 Mai', prix: '120 000' },
      { num: '203', statut: 'libre', type: 'Suite Royale', client: null, checkin: null, checkout: null, prix: '180 000' },
      { num: '204', statut: 'occupee', type: 'Suite Royale', client: 'M. Mbarga', checkin: '01 Mai', checkout: '04 Mai', prix: '180 000' },
    ],
  },
]

const alertes = [
  { type: 'depart', heure: '10:00', chambre: '104', client: 'M. Bello', detail: 'Check-out prévu aujourd\'hui', urgence: 'high' },
  { type: 'arrivee', heure: '14:00', chambre: 'R04', client: 'Mme Eyinga', detail: 'Check-in prévu aujourd\'hui', urgence: 'medium' },
  { type: 'nettoyage', heure: '11:30', chambre: 'R03', detail: 'Nettoyage en cours — prêt vers 12h00', urgence: 'low' },
  { type: 'nettoyage', heure: '12:00', chambre: '105', detail: 'Nettoyage programmé après libération', urgence: 'low' },
  { type: 'depart', heure: '10:00', chambre: '204', client: 'M. Mbarga', detail: 'Check-out dans 2 jours', urgence: 'low' },
]

const urgenceCouleur = {
  high: 'border-[var(--color-error)]/40 bg-[var(--color-error)]/5',
  medium: 'border-[var(--color-primary)]/40 bg-[var(--color-primary)]/5',
  low: 'border-[var(--color-border)]',
}

const totalChambres = etages.reduce((s, e) => s + e.chambres.length, 0)
const occupees = etages.reduce((s, e) => s + e.chambres.filter(c => c.statut === 'occupee').length, 0)
const libres = etages.reduce((s, e) => s + e.chambres.filter(c => c.statut === 'libre').length, 0)
const reservees = etages.reduce((s, e) => s + e.chambres.filter(c => c.statut === 'reservee').length, 0)
const enNettoyage = etages.reduce((s, e) => s + e.chambres.filter(c => c.statut === 'nettoyage').length, 0)

export default function Step8_Hotel() {
  const [chambreSelectionnee, setChambreSelectionnee] = useState(null)

  return (
    <DashboardLayout activeMenu="secteur">
      <div className="space-y-5">
        {/* En-tête */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold text-white font-[family-name:var(--font-title)]">Gestion Hôtelière</h2>
            <p className="text-xs text-[var(--color-text-muted)]">Plan des chambres — 2 mai 2026</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-[var(--color-primary)] text-[var(--color-bg-main)] hover:brightness-110 transition-all">
              <Plus size={14} /> Nouvelle réservation
            </button>
          </div>
        </div>

        {/* KPIs + Légende */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 grid grid-cols-5 gap-3">
            <StatCard label="Total" valeur={totalChambres} />
            <StatCard label="Occupées" valeur={occupees} couleur="text-blue-400" />
            <StatCard label="Libres" valeur={libres} couleur="text-[var(--color-success)]" />
            <StatCard label="Réservées" valeur={reservees} couleur="text-purple-400" />
            <StatCard label="Nettoyage" valeur={enNettoyage} couleur="text-amber-400" />
          </div>
        </div>

        {/* Légende code couleur */}
        <DemoTooltip label="Code couleur — 4 états visuels pour identifier chaque chambre" position="bottom" highlight>
          <div className="flex items-center gap-4 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl px-4 py-2.5">
            {Object.entries(statutConfig).map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${cfg.dot}`} />
                <span className="text-xs text-[var(--color-text-muted)]">{cfg.label}</span>
              </div>
            ))}
            <span className="text-[var(--color-border)]">|</span>
            <span className="text-[10px] text-[var(--color-text-muted)]">Taux d'occupation : <strong className="text-[var(--color-primary)]">{Math.round((occupees / totalChambres) * 100)}%</strong></span>
          </div>
        </DemoTooltip>

        {/* ═══ PLAN DES CHAMBRES PAR ÉTAGE ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-4">
            <DemoTooltip label="Plan visuel par étage — cliquez une chambre pour les détails" position="top" highlight>
              <div className="space-y-4">
                {etages.map(etage => (
                  <div key={etage.nom} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-4">
                    <h3 className="text-sm font-semibold text-white mb-3">{etage.nom}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {etage.chambres.map(chambre => {
                        const cfg = statutConfig[chambre.statut]
                        const Icon = cfg.icon
                        const actif = chambreSelectionnee?.num === chambre.num
                        return (
                          <button
                            key={chambre.num}
                            onClick={() => setChambreSelectionnee(chambre)}
                            className={`relative border rounded-xl p-3 text-left transition-all hover:scale-[1.03] ${cfg.couleur} ${actif ? 'ring-2 ring-[var(--color-primary)] shadow-lg' : ''}`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-lg font-bold">{chambre.num}</span>
                              <Icon size={16} />
                            </div>
                            <p className="text-[10px] opacity-70 mb-1">{chambre.type}</p>
                            <p className="text-[10px] font-bold">{chambre.prix} XAF/nuit</p>
                            {chambre.client && (
                              <div className="flex items-center gap-1 mt-1.5">
                                <User size={10} />
                                <span className="text-[10px] truncate">{chambre.client}</span>
                              </div>
                            )}
                            {chambre.checkout && chambre.statut === 'occupee' && (
                              <div className="flex items-center gap-1 mt-0.5">
                                <Clock size={10} />
                                <span className="text-[10px]">→ {chambre.checkout}</span>
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </DemoTooltip>
          </div>

          {/* Panneau détail + alertes */}
          <div className="space-y-4">
            {/* Détail chambre sélectionnée */}
            {chambreSelectionnee ? (
              <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5 animate-fade-slide" key={chambreSelectionnee.num}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white">Chambre {chambreSelectionnee.num}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statutConfig[chambreSelectionnee.statut].couleur}`}>
                    {statutConfig[chambreSelectionnee.statut].label}
                  </span>
                </div>

                <div className="space-y-2.5 mb-5">
                  <InfoLigne label="Type" valeur={chambreSelectionnee.type} />
                  <InfoLigne label="Tarif / nuit" valeur={`${chambreSelectionnee.prix} XAF`} />
                  {chambreSelectionnee.client && <InfoLigne label="Client" valeur={chambreSelectionnee.client} />}
                  {chambreSelectionnee.checkin && <InfoLigne label="Check-in" valeur={chambreSelectionnee.checkin} />}
                  {chambreSelectionnee.checkout && <InfoLigne label="Check-out" valeur={chambreSelectionnee.checkout} />}
                </div>

                {/* Actions */}
                <DemoTooltip label="Check-in et check-out en 1 clic" position="left" highlight>
                  <div className="space-y-2">
                    {chambreSelectionnee.statut === 'occupee' && (
                      <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium bg-[var(--color-primary)] text-[var(--color-bg-main)] hover:brightness-110 transition-all">
                        <LogOut size={14} /> Check-out en 1 clic
                      </button>
                    )}
                    {chambreSelectionnee.statut === 'reservee' && (
                      <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium bg-[var(--color-success)] text-white hover:brightness-110 transition-all">
                        <LogIn size={14} /> Check-in en 1 clic
                      </button>
                    )}
                    {chambreSelectionnee.statut === 'libre' && (
                      <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium bg-purple-500 text-white hover:brightness-110 transition-all">
                        <CalendarCheck size={14} /> Réserver cette chambre
                      </button>
                    )}
                    {chambreSelectionnee.statut === 'nettoyage' && (
                      <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium bg-amber-500 text-[var(--color-bg-main)] hover:brightness-110 transition-all">
                        <CheckCircle size={14} /> Marquer comme prête
                      </button>
                    )}
                    <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-medium border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-white hover:bg-white/5 transition-colors">
                      <ArrowRightLeft size={12} /> Changer de chambre
                    </button>
                  </div>
                </DemoTooltip>
              </div>
            ) : (
              <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5 text-center">
                <BedDouble size={32} className="mx-auto mb-3 text-[var(--color-border)]" />
                <p className="text-xs text-[var(--color-text-muted)]">Sélectionnez une chambre pour voir les détails</p>
              </div>
            )}

            {/* Alertes départs/arrivées */}
            <DemoTooltip label="Alertes départs et arrivées du jour" position="left" highlight>
              <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Bell size={16} className="text-[var(--color-primary)]" />
                  <h3 className="text-sm font-semibold text-white">Alertes du jour</h3>
                </div>
                <div className="space-y-2.5">
                  {alertes.map((a, i) => (
                    <div key={i} className={`border rounded-xl p-3 ${urgenceCouleur[a.urgence]}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] text-[var(--color-text-muted)]">{a.heure}</span>
                        {a.type === 'depart' && <LogOut size={12} className="text-[var(--color-error)]" />}
                        {a.type === 'arrivee' && <LogIn size={12} className="text-[var(--color-success)]" />}
                        {a.type === 'nettoyage' && <Sparkles size={12} className="text-amber-400" />}
                        <span className="text-xs font-medium text-[var(--color-primary)]">#{a.chambre}</span>
                        {a.client && <span className="text-xs text-white">{a.client}</span>}
                      </div>
                      <p className="text-[10px] text-[var(--color-text-muted)]">{a.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </DemoTooltip>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function StatCard({ label, valeur, couleur = 'text-white' }) {
  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-3 text-center">
      <p className={`text-xl font-bold ${couleur}`}>{valeur}</p>
      <p className="text-[9px] text-[var(--color-text-muted)]">{label}</p>
    </div>
  )
}

function InfoLigne({ label, valeur }) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-[var(--color-text-muted)]">{label}</span>
      <span className="text-white font-medium">{valeur}</span>
    </div>
  )
}
