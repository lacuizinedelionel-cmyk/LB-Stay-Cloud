import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import DemoTooltip from '../components/DemoTooltip'
import {
  Search, UserPlus, Star, Mail, Phone, MessageCircle, Gift,
  Crown, Award, Medal, Shield, TrendingUp, Calendar, Clock,
  ChevronRight, Send
} from 'lucide-react'

const paliers = [
  { id: 'bronze', label: 'Bronze', icon: Medal, couleur: 'text-orange-600', bg: 'bg-orange-600/20', seuil: '0 - 4 999 pts', avantages: 'Accès de base, reçu par e-mail' },
  { id: 'silver', label: 'Silver', icon: Award, couleur: 'text-gray-300', bg: 'bg-gray-400/20', seuil: '5 000 - 14 999 pts', avantages: '+5% réduction, priorité réservation' },
  { id: 'gold', label: 'Gold', icon: Crown, couleur: 'text-[var(--color-primary)]', bg: 'bg-[var(--color-primary)]/20', seuil: '15 000 - 29 999 pts', avantages: '+10% réduction, coupon anniversaire' },
  { id: 'platinum', label: 'Platinum', icon: Shield, couleur: 'text-purple-400', bg: 'bg-purple-500/20', seuil: '30 000+ pts', avantages: '+15% réduction, accès VIP, service dédié' },
]

const clients = [
  { id: 1, nom: 'Jean-Pierre Kamga', email: 'jp.kamga@email.cm', tel: '+237 699 123 456', palier: 'gold', points: 18750, visites: 42, totalDepense: '2 850 000', derniereVisite: '01 Mai 2026', anniversaire: '15 Juin', photo: 'JPK' },
  { id: 2, nom: 'Marie-Claire Fotso', email: 'mc.fotso@email.cm', tel: '+237 677 234 567', palier: 'platinum', points: 34200, visites: 78, totalDepense: '5 100 000', derniereVisite: '02 Mai 2026', anniversaire: '22 Août', photo: 'MCF' },
  { id: 3, nom: 'Paul Ndjock', email: 'p.ndjock@email.cm', tel: '+237 655 345 678', palier: 'silver', points: 8900, visites: 23, totalDepense: '1 420 000', derniereVisite: '28 Avr 2026', anniversaire: '03 Mars', photo: 'PN' },
  { id: 4, nom: 'Aissatou Bello', email: 'a.bello@email.cm', tel: '+237 690 456 789', palier: 'bronze', points: 2100, visites: 8, totalDepense: '780 000', derniereVisite: '20 Avr 2026', anniversaire: '10 Nov', photo: 'AB' },
  { id: 5, nom: 'Emmanuel Tchoupo', email: 'e.tchoupo@email.cm', tel: '+237 670 567 890', palier: 'gold', points: 22400, visites: 56, totalDepense: '3 200 000', derniereVisite: '30 Avr 2026', anniversaire: '07 Jan', photo: 'ET' },
  { id: 6, nom: 'Blandine Eyinga', email: 'b.eyinga@email.cm', tel: '+237 680 678 901', palier: 'silver', points: 12300, visites: 31, totalDepense: '1 950 000', derniereVisite: '25 Avr 2026', anniversaire: '18 Déc', photo: 'BE' },
]

const historique = [
  { date: '02 Mai 2026', action: 'Achat — Poulet DG + Jus', montant: '+45 000 XAF', points: '+450 pts' },
  { date: '28 Avr 2026', action: 'Réservation Suite Prestige', montant: '+125 000 XAF', points: '+1 250 pts' },
  { date: '22 Avr 2026', action: 'Spa Détente 1h', montant: '+35 000 XAF', points: '+350 pts' },
  { date: '15 Avr 2026', action: 'Coupon anniversaire utilisé', montant: '-5 000 XAF', points: '0 pts' },
  { date: '10 Avr 2026', action: 'Achat — Ndolé + Bière', montant: '+28 000 XAF', points: '+280 pts' },
]

const palierConfig = {
  bronze: { couleur: 'text-orange-600', bg: 'bg-orange-600/20', border: 'border-orange-600/40' },
  silver: { couleur: 'text-gray-300', bg: 'bg-gray-400/20', border: 'border-gray-400/40' },
  gold: { couleur: 'text-[var(--color-primary)]', bg: 'bg-[var(--color-primary)]/20', border: 'border-[var(--color-primary)]/40' },
  platinum: { couleur: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/40' },
}

export default function Step6_CRM() {
  const [recherche, setRecherche] = useState('')
  const [clientSelectionne, setClientSelectionne] = useState(clients[0])
  const [filtrePalier, setFiltrePalier] = useState('tous')

  const clientsFiltres = clients.filter(c =>
    (filtrePalier === 'tous' || c.palier === filtrePalier) &&
    c.nom.toLowerCase().includes(recherche.toLowerCase())
  )

  const pc = palierConfig[clientSelectionne.palier]
  const palierInfo = paliers.find(p => p.id === clientSelectionne.palier)

  return (
    <DashboardLayout activeMenu="clients">
      <div className="flex flex-col lg:flex-row gap-5 h-full">
        {/* ═══ TABLEAU CLIENTS GAUCHE ═══ */}
        <div className="lg:flex-1 space-y-4 min-w-0">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-xl font-bold text-white font-[family-name:var(--font-title)]">CRM — Clients & Fidélité</h2>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-[var(--color-primary)] text-[var(--color-bg-main)] hover:brightness-110 transition-all">
              <UserPlus size={14} /> Nouveau client
            </button>
          </div>

          {/* Stats rapides */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-white">342</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">Clients totaux</p>
            </div>
            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-[var(--color-primary)]">47</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">Nouveaux (mois)</p>
            </div>
            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-[var(--color-success)]">89%</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">Rétention</p>
            </div>
            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-purple-400">12</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">Platinum</p>
            </div>
          </div>

          {/* Paliers fidélité */}
          <DemoTooltip label="4 paliers de fidélité — points cumulés automatiquement à chaque achat" position="bottom" highlight>
            <div className="grid grid-cols-4 gap-2">
              {paliers.map(p => {
                const Icon = p.icon
                return (
                  <div key={p.id} className={`${p.bg} rounded-xl p-3 text-center cursor-pointer hover:scale-[1.03] transition-all`} onClick={() => setFiltrePalier(p.id === filtrePalier ? 'tous' : p.id)}>
                    <Icon size={18} className={`mx-auto mb-1 ${p.couleur}`} />
                    <p className={`text-xs font-bold ${p.couleur}`}>{p.label}</p>
                    <p className="text-[9px] text-[var(--color-text-muted)] mt-0.5">{p.seuil}</p>
                  </div>
                )
              })}
            </div>
          </DemoTooltip>

          {/* Recherche */}
          <DemoTooltip label="Base clients enrichie automatiquement à chaque interaction" position="bottom" highlight>
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Rechercher un client par nom..."
                value={recherche}
                onChange={e => setRecherche(e.target.value)}
                className="w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>
          </DemoTooltip>

          {/* Liste clients */}
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
            <div className="divide-y divide-[var(--color-border)]">
              {clientsFiltres.map(client => {
                const cfg = palierConfig[client.palier]
                const actif = clientSelectionne.id === client.id
                return (
                  <button
                    key={client.id}
                    onClick={() => setClientSelectionne(client)}
                    className={`w-full flex items-center gap-3 p-4 text-left transition-all ${
                      actif ? 'bg-[var(--color-primary)]/5' : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0`}>
                      <span className={`text-xs font-bold ${cfg.couleur}`}>{client.photo}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white truncate">{client.nom}</span>
                        <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold ${cfg.bg} ${cfg.couleur}`}>{client.palier.toUpperCase()}</span>
                      </div>
                      <p className="text-[10px] text-[var(--color-text-muted)]">{client.points.toLocaleString('fr-FR')} pts — {client.visites} visites</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-white">{client.totalDepense} XAF</p>
                      <p className="text-[10px] text-[var(--color-text-muted)]">{client.derniereVisite}</p>
                    </div>
                    <ChevronRight size={14} className={`shrink-0 ${actif ? 'text-[var(--color-primary)]' : 'text-[var(--color-border)]'}`} />
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ═══ DÉTAIL PROFIL DROITE ═══ */}
        <div className="lg:w-96 shrink-0 space-y-4">
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5">
            {/* En-tête profil */}
            <div className="flex items-center gap-4 mb-5">
              <div className={`w-14 h-14 rounded-2xl ${pc.bg} flex items-center justify-center`}>
                <span className={`text-lg font-bold ${pc.couleur}`}>{clientSelectionne.photo}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-white truncate">{clientSelectionne.nom}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${pc.bg} ${pc.couleur}`}>
                    {palierInfo.icon && <palierInfo.icon size={10} className="inline mr-1" />}
                    {clientSelectionne.palier.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-[var(--color-text-muted)]">{clientSelectionne.points.toLocaleString('fr-FR')} points</span>
                </div>
              </div>
            </div>

            {/* Infos contact */}
            <div className="space-y-2.5 mb-5">
              <div className="flex items-center gap-2 text-xs">
                <Mail size={14} className="text-[var(--color-text-muted)]" />
                <span className="text-[var(--color-text-muted)]">{clientSelectionne.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Phone size={14} className="text-[var(--color-text-muted)]" />
                <span className="text-[var(--color-text-muted)]">{clientSelectionne.tel}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Calendar size={14} className="text-[var(--color-text-muted)]" />
                <span className="text-[var(--color-text-muted)]">Anniversaire : {clientSelectionne.anniversaire}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Clock size={14} className="text-[var(--color-text-muted)]" />
                <span className="text-[var(--color-text-muted)]">Dernière visite : {clientSelectionne.derniereVisite}</span>
              </div>
            </div>

            {/* Statistiques client */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              <div className="bg-[var(--color-bg-main)] rounded-xl p-2.5 text-center">
                <p className="text-base font-bold text-white">{clientSelectionne.visites}</p>
                <p className="text-[9px] text-[var(--color-text-muted)]">Visites</p>
              </div>
              <div className="bg-[var(--color-bg-main)] rounded-xl p-2.5 text-center">
                <p className="text-base font-bold text-[var(--color-primary)]">{clientSelectionne.points.toLocaleString('fr-FR')}</p>
                <p className="text-[9px] text-[var(--color-text-muted)]">Points</p>
              </div>
              <div className="bg-[var(--color-bg-main)] rounded-xl p-2.5 text-center">
                <p className="text-base font-bold text-[var(--color-success)]">{clientSelectionne.totalDepense}</p>
                <p className="text-[9px] text-[var(--color-text-muted)]">XAF dépensés</p>
              </div>
            </div>

            {/* Barre de progression palier */}
            <DemoTooltip label="Points cumulés automatiquement — 1 point pour 100 XAF dépensés" position="left">
              <div className="mb-5">
                <div className="flex justify-between text-[10px] mb-1.5">
                  <span className={pc.couleur}>{clientSelectionne.palier.toUpperCase()}</span>
                  <span className="text-[var(--color-text-muted)]">Prochain palier : {clientSelectionne.palier === 'platinum' ? 'MAX' : paliers[paliers.findIndex(p => p.id === clientSelectionne.palier) + 1]?.label}</span>
                </div>
                <div className="h-2.5 bg-[var(--color-bg-main)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] transition-all"
                    style={{ width: clientSelectionne.palier === 'platinum' ? '100%' : `${Math.min((clientSelectionne.points % 15000) / 15000 * 100, 100)}%` }}
                  />
                </div>
              </div>
            </DemoTooltip>

            {/* Actions */}
            <div className="space-y-2">
              <DemoTooltip label="Envoyer un message WhatsApp directement depuis le CRM" position="left" highlight>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium border border-green-500/30 text-green-400 hover:bg-green-500/10 transition-colors">
                  <MessageCircle size={14} /> Envoyer WhatsApp
                </button>
              </DemoTooltip>
              <DemoTooltip label="Coupon anniversaire automatique — personnalisé par palier" position="left" highlight>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium border border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors">
                  <Gift size={14} /> Envoyer coupon anniversaire
                </button>
              </DemoTooltip>
            </div>
          </div>

          {/* Historique */}
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Historique récent</h3>
            <div className="space-y-3">
              {historique.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white">{h.action}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">{h.date}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-xs font-medium ${h.montant.startsWith('+') ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>{h.montant}</p>
                    <p className="text-[10px] text-[var(--color-primary)]">{h.points}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
