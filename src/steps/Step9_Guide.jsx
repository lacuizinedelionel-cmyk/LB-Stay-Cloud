import DemoTooltip from '../components/DemoTooltip'
import { useDemo } from '../context/DemoContext'
import {
  UserPlus, Building2, CreditCard, BookOpen, Monitor, MessageCircle,
  Check, ArrowRight, Clock, Headphones, Mail, Phone, Star,
  ChevronRight, Rocket, Shield, Zap
} from 'lucide-react'

const etapesGuide = [
  {
    num: 1,
    titre: 'Inscription',
    desc: 'Créez votre compte en 2 minutes avec votre email et mot de passe. Aucune carte bancaire requise pour l\'essai gratuit de 14 jours.',
    icone: UserPlus,
    duree: '2 min',
    couleur: 'from-blue-500/20 to-blue-600/5 border-blue-500/30',
    dot: 'bg-blue-500',
    details: ['Nom, email, mot de passe', 'Validation par e-mail', 'Accès immédiat au dashboard'],
  },
  {
    num: 2,
    titre: 'Configurer votre commerce',
    desc: 'Renseignez le nom de votre établissement, votre secteur d\'activité, la ville et le nombre de branches ou points de vente.',
    icone: Building2,
    duree: '3 min',
    couleur: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/30',
    dot: 'bg-emerald-500',
    details: ['Nom et secteur', 'Ville et branches', 'Upload du logo (optionnel)'],
  },
  {
    num: 3,
    titre: 'Choisir votre plan',
    desc: 'Sélectionnez le plan adapté à vos besoins : Starter, Pro ou Enterprise. Paiement par Orange Money, MTN MoMo, virement ou carte bancaire.',
    icone: CreditCard,
    duree: '2 min',
    couleur: 'from-purple-500/20 to-purple-600/5 border-purple-500/30',
    dot: 'bg-purple-500',
    details: ['3 plans disponibles', 'Paiement Mobile Money natif', '-20% en paiement annuel'],
  },
  {
    num: 4,
    titre: 'Créer votre menu / catalogue',
    desc: 'Ajoutez vos produits ou services avec photos, prix, catégories et gestion de la disponibilité en temps réel.',
    icone: BookOpen,
    duree: '5 min',
    couleur: 'from-orange-500/20 to-orange-600/5 border-orange-500/30',
    dot: 'bg-orange-500',
    details: ['Import en masse possible', 'Photos HD', 'Catégories personnalisées', 'Gestion des stocks'],
  },
  {
    num: 5,
    titre: 'Former votre caissier',
    desc: 'L\'interface POS est conçue pour être utilisée sans formation. Votre caissier est opérationnel en 5 minutes grâce au mode guidé.',
    icone: Monitor,
    duree: '5 min',
    couleur: 'from-pink-500/20 to-pink-600/5 border-pink-500/30',
    dot: 'bg-pink-500',
    details: ['Interface tactile intuitive', 'Mode guidé intégré', 'Aucune formation technique'],
  },
  {
    num: 6,
    titre: 'Activer WhatsApp',
    desc: 'Connectez votre numéro WhatsApp Business et activez les templates automatiques : confirmation, facture, rappel, anniversaire.',
    icone: MessageCircle,
    duree: '3 min',
    couleur: 'from-green-500/20 to-green-600/5 border-green-500/30',
    dot: 'bg-green-500',
    details: ['Connexion API WhatsApp', '6 templates prêts à l\'emploi', 'Envois automatiques'],
  },
]

const totalMinutes = etapesGuide.reduce((s, e) => s + parseInt(e.duree), 0)

const contacts = [
  { icone: MessageCircle, label: 'WhatsApp Support', valeur: '+237 699 000 000', couleur: 'text-green-400 border-green-500/30 hover:bg-green-500/10' },
  { icone: Mail, label: 'E-mail', valeur: 'support@lbstay.cm', couleur: 'text-blue-400 border-blue-500/30 hover:bg-blue-500/10' },
  { icone: Headphones, label: 'Chat en direct', valeur: 'Disponible 24/7', couleur: 'text-purple-400 border-purple-500/30 hover:bg-purple-500/10' },
]

export default function Step9_Guide() {
  const { goToStep } = useDemo()

  return (
    <div className="animate-fade-slide p-6 sm:p-10">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* En-tête */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 mb-6">
            <Rocket size={14} className="text-[var(--color-primary)]" />
            <span className="text-sm font-medium text-[var(--color-primary)]">Guide de démarrage rapide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-title)]">
            Démarrez en <span className="text-[var(--color-primary)]">{totalMinutes} minutes</span>
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
            Suivez ces 6 étapes simples pour configurer votre espace et devenir opérationnel dès aujourd'hui.
          </p>
        </div>

        {/* Barre de progression globale */}
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[var(--color-primary)]" />
              <span className="text-sm font-medium text-white">Temps total estimé</span>
            </div>
            <span className="text-sm font-bold text-[var(--color-primary)]">~{totalMinutes} minutes</span>
          </div>
          <div className="flex gap-1.5">
            {etapesGuide.map((e, i) => (
              <div key={i} className="flex-1">
                <div className={`h-2 rounded-full ${e.dot}`} />
                <p className="text-[8px] text-[var(--color-text-muted)] mt-1 text-center">{e.duree}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ TIMELINE 6 ÉTAPES ═══ */}
        <DemoTooltip label="Timeline de démarrage — 6 étapes pour être opérationnel" position="top" highlight>
          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500 via-[var(--color-primary)] to-green-500 rounded-full hidden sm:block" />

            <div className="space-y-5">
              {etapesGuide.map((etape, i) => {
                const Icon = etape.icone
                return (
                  <div
                    key={i}
                    className="animate-fade-slide"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className={`relative flex gap-5 bg-gradient-to-r ${etape.couleur} bg-[var(--color-card)] border rounded-2xl p-5 hover:scale-[1.01] transition-all`}>
                      {/* Numéro */}
                      <div className={`w-14 h-14 rounded-2xl ${etape.dot} flex items-center justify-center shrink-0 shadow-lg`}>
                        <span className="text-lg font-bold text-white">{etape.num}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-base font-bold text-white">{etape.titre}</h3>
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-medium text-white">
                            <Clock size={10} /> {etape.duree}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-3">{etape.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {etape.details.map((d, j) => (
                            <span key={j} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--color-bg-main)]/60 text-[10px] text-white border border-[var(--color-border)]">
                              <Check size={10} className="text-[var(--color-success)]" /> {d}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Icon size={24} className="text-white/20 shrink-0 hidden sm:block" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </DemoTooltip>

        {/* ═══ CONTACT SUPPORT ═══ */}
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-white font-[family-name:var(--font-title)] mb-1">Besoin d'aide ?</h3>
            <p className="text-xs text-[var(--color-text-muted)]">Notre équipe vous accompagne à chaque étape de votre mise en route.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {contacts.map((c, i) => {
              const Icon = c.icone
              return (
                <button key={i} className={`flex items-center gap-3 p-4 rounded-xl border ${c.couleur} transition-all text-left`}>
                  <Icon size={20} />
                  <div>
                    <p className="text-xs font-semibold text-white">{c.label}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">{c.valeur}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* CTA suivant */}
        <div className="text-center">
          <p className="text-xs text-[var(--color-text-muted)] mb-3">
            Prêt ? Cliquez sur « Suivant » pour voir le résumé final de la démo.
          </p>
          <div className="flex items-center justify-center gap-1 text-[var(--color-secondary)] text-xs">
            <ArrowRight size={14} />
            <span>Dernière étape : écran de clôture</span>
          </div>
        </div>
      </div>
    </div>
  )
}
