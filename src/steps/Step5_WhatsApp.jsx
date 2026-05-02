import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import DemoTooltip from '../components/DemoTooltip'
import {
  MessageCircle, Send, CheckCheck, Check, Clock, Users, Zap,
  Eye, Power, BarChart3, ArrowUpRight, FileText, CalendarClock,
  Gift, RotateCcw, Truck, Bell
} from 'lucide-react'

const templates = [
  {
    id: 1,
    nom: 'Confirmation commande',
    icon: Check,
    actif: true,
    couleur: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/30',
    apercu: `Bonjour {nom} ! ✅\n\nVotre commande #{id} a été confirmée.\n\n📋 Détail :\n- {produit_1}\n- {produit_2}\n\n💰 Total : {montant} XAF\n📅 Date : {date}\n\nMerci pour votre confiance !\n— {entreprise}`,
    envois: 847,
    tauxOuverture: '96%',
  },
  {
    id: 2,
    nom: 'Facture PDF',
    icon: FileText,
    actif: true,
    couleur: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/30',
    apercu: `Bonjour {nom},\n\n📄 Votre facture #{facture_id} est disponible.\n\n💰 Montant TTC : {montant} XAF\n💳 Payé par : {mode_paiement}\n\n📎 Facture PDF en pièce jointe.\n\nCordialement,\n{entreprise}`,
    envois: 623,
    tauxOuverture: '92%',
  },
  {
    id: 3,
    nom: 'Livreur en route',
    icon: Truck,
    actif: true,
    couleur: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/30',
    apercu: `Bonjour {nom} ! 🚗\n\nVotre commande #{id} est en route !\n\n🕐 Arrivée estimée : {heure}\n📍 Adresse : {adresse}\n\nLivreur : {livreur}\nTél : {tel_livreur}\n\nBon appétit ! 🍽️`,
    envois: 312,
    tauxOuverture: '98%',
  },
  {
    id: 4,
    nom: 'Rappel RDV',
    icon: CalendarClock,
    actif: true,
    couleur: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/30',
    apercu: `Bonjour {nom},\n\n⏰ Rappel : votre rendez-vous est prévu demain.\n\n📅 Date : {date}\n🕐 Heure : {heure}\n📍 Lieu : {adresse}\n\nRépondez OUI pour confirmer ou NON pour annuler.\n\n— {entreprise}`,
    envois: 456,
    tauxOuverture: '94%',
  },
  {
    id: 5,
    nom: 'Anniversaire',
    icon: Gift,
    actif: false,
    couleur: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/30',
    apercu: `🎂 Joyeux anniversaire {nom} !\n\nToute l'équipe de {entreprise} vous souhaite une excellente journée !\n\n🎁 Cadeau spécial : -{pct}% sur votre prochaine visite avec le code ANNIV{annee}\n\nValable jusqu'au {date_expiration}.\n\nÀ bientôt ! 💛`,
    envois: 89,
    tauxOuverture: '88%',
  },
  {
    id: 6,
    nom: 'Relance 30 jours',
    icon: RotateCcw,
    actif: true,
    couleur: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/30',
    apercu: `Bonjour {nom},\n\nVous nous manquez ! 😊\n\nCela fait {jours} jours que nous ne vous avons pas vu.\n\n🎁 Offre spéciale retour : -{pct}% sur votre prochaine commande avec le code RETOUR{id}\n\nValable 7 jours.\n\nÀ très vite !\n— {entreprise}`,
    envois: 234,
    tauxOuverture: '72%',
  },
]

const statsEnvois = [
  { label: 'Messages envoyés', valeur: '2 561', change: '+18%', icone: MessageCircle, couleur: 'text-green-400' },
  { label: 'Taux d\'ouverture', valeur: '94%', change: '+3%', icone: Eye, couleur: 'text-blue-400' },
  { label: 'Taux de réponse', valeur: '42%', change: '+7%', icone: Send, couleur: 'text-purple-400' },
  { label: 'Automations actives', valeur: '5 / 6', change: '', icone: Zap, couleur: 'text-amber-400' },
]

const envoisParJour = [120, 95, 145, 110, 180, 160, 135, 200, 175, 155, 190, 210, 165, 195]
const envoisMax = Math.max(...envoisParJour)

export default function Step7_WhatsApp() {
  const [templateSelectionne, setTemplateSelectionne] = useState(templates[0])
  const [toggles, setToggles] = useState(() => {
    const init = {}
    templates.forEach(t => { init[t.id] = t.actif })
    return init
  })

  const toggleTemplate = (id) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <DashboardLayout activeMenu="whatsapp">
      <div className="space-y-5">
        {/* En-tête */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <MessageCircle size={22} className="text-green-400" />
            <h2 className="text-xl font-bold text-white font-[family-name:var(--font-title)]">WhatsApp & Automatisation</h2>
          </div>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            API WhatsApp connectée
          </span>
        </div>

        {/* ═══ DASHBOARD ENVOIS ═══ */}
        <DemoTooltip label="Dashboard des envois — statistiques en temps réel" position="bottom" highlight>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statsEnvois.map((s, i) => {
              const Icon = s.icone
              return (
                <div key={i} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon size={18} className={s.couleur} />
                    {s.change && (
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-[var(--color-success)]">
                        <ArrowUpRight size={10} />{s.change}
                      </span>
                    )}
                  </div>
                  <p className="text-xl font-bold text-white">{s.valeur}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{s.label}</p>
                </div>
              )
            })}
          </div>
        </DemoTooltip>

        {/* Graphique envois 14 jours */}
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-green-400" />
              <h3 className="text-sm font-semibold text-white">Messages envoyés — 14 derniers jours</h3>
            </div>
            <span className="text-[10px] text-[var(--color-text-muted)] bg-[var(--color-bg-main)] px-2 py-1 rounded-md">2 561 total</span>
          </div>
          <div className="h-32 flex items-end gap-1.5">
            {envoisParJour.map((val, i) => (
              <div key={i} className="flex-1 group relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded px-2 py-1 text-[9px] text-white whitespace-nowrap z-10">
                  J{i + 1} : {val} msg
                </div>
                <div
                  className="w-full rounded-t bg-gradient-to-t from-green-500 to-green-400 opacity-70 hover:opacity-100 transition-all cursor-pointer"
                  style={{ height: `${(val / envoisMax) * 100}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ═══ TEMPLATES + APERÇU ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Liste des 6 templates */}
          <div className="lg:col-span-2 space-y-3">
            <DemoTooltip label="6 templates activables/désactivables — cliquez pour prévisualiser" position="right" highlight>
              <div className="space-y-2.5">
                {templates.map(t => {
                  const Icon = t.icon
                  const actif = toggles[t.id]
                  const selectionne = templateSelectionne.id === t.id
                  return (
                    <div
                      key={t.id}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectionne
                          ? `${t.bg} shadow-lg`
                          : 'bg-[var(--color-card)] border-[var(--color-border)] hover:border-white/20'
                      }`}
                      onClick={() => setTemplateSelectionne(t)}
                    >
                      <div className={`p-2 rounded-lg ${selectionne ? 'bg-white/10' : 'bg-white/5'}`}>
                        <Icon size={16} className={t.couleur} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{t.nom}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[9px] text-[var(--color-text-muted)]">{t.envois} envois</span>
                          <span className="text-[9px] text-[var(--color-text-muted)]">•</span>
                          <span className="text-[9px] text-[var(--color-text-muted)]">{t.tauxOuverture} ouverture</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleTemplate(t.id) }}
                        className={`w-9 h-5 rounded-full flex items-center px-0.5 shrink-0 transition-colors ${actif ? 'bg-green-500' : 'bg-[var(--color-border)]'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${actif ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </DemoTooltip>
          </div>

          {/* Aperçu message style WhatsApp */}
          <div className="lg:col-span-3">
            <DemoTooltip label="Aperçu du message tel qu'il apparaît sur WhatsApp" position="left" highlight>
              <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
                {/* Header aperçu */}
                <div className="px-5 py-3 border-b border-[var(--color-border)] flex items-center gap-3 bg-green-500/5">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <MessageCircle size={14} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{templateSelectionne.nom}</p>
                    <p className="text-[10px] text-green-400">Aperçu du template</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${toggles[templateSelectionne.id] ? 'bg-green-500/20 text-green-400' : 'bg-[var(--color-border)] text-[var(--color-text-muted)]'}`}>
                      {toggles[templateSelectionne.id] ? 'ACTIF' : 'INACTIF'}
                    </span>
                  </div>
                </div>

                {/* Corps message style WhatsApp */}
                <div className="p-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '24px 24px' }}>
                  <div className="max-w-sm">
                    <div className="bg-[#1A2E1A] border border-green-900/40 rounded-2xl rounded-tl-sm p-4 shadow-lg">
                      <pre className="text-xs text-white/90 whitespace-pre-wrap font-[family-name:var(--font-body)] leading-relaxed">
                        {templateSelectionne.apercu}
                      </pre>
                      <div className="flex items-center justify-end gap-1 mt-2">
                        <span className="text-[9px] text-white/40">14:32</span>
                        <CheckCheck size={12} className="text-blue-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats du template */}
                <div className="px-5 py-3 border-t border-[var(--color-border)] flex items-center gap-6">
                  <div>
                    <p className="text-lg font-bold text-white">{templateSelectionne.envois}</p>
                    <p className="text-[9px] text-[var(--color-text-muted)]">Envois ce mois</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-400">{templateSelectionne.tauxOuverture}</p>
                    <p className="text-[9px] text-[var(--color-text-muted)]">Taux d'ouverture</p>
                  </div>
                  <button className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 transition-colors">
                    <Send size={12} /> Envoyer un test
                  </button>
                </div>
              </div>
            </DemoTooltip>

            {/* Relance 30 jours highlight */}
            <DemoTooltip label="Relance automatique des clients inactifs depuis 30 jours" position="top" highlight>
              <div className="mt-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 flex items-center gap-4">
                <RotateCcw size={20} className="text-amber-400 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-white">Relance automatique 30 jours</p>
                  <p className="text-[10px] text-[var(--color-text-muted)]">23 clients relancés ce mois — 34% sont revenus acheter après réception du message.</p>
                </div>
                <span className="text-sm font-bold text-amber-400 shrink-0">+34%</span>
              </div>
            </DemoTooltip>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
