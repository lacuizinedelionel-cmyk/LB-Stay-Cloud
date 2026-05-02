import DemoTooltip from '../components/DemoTooltip'
import {
  LayoutDashboard, Monitor, BookOpen, BarChart3, Users, MessageCircle,
  Hotel, Shield, Check, Star, Smartphone, CreditCard, Banknote, ArrowRight,
  Zap, TrendingUp, PieChart, Gift, Bell, BedDouble, Eye
} from 'lucide-react'

const modules = [
  {
    icon: LayoutDashboard,
    titre: 'Dashboard Admin',
    desc: 'KPIs temps réel, chiffre d\'affaires journalier, graphiques interactifs, top produits, vue multi-branches centralisée.',
    points: ['KPIs temps réel', 'CA journalier', 'Graphiques', 'Top produits', 'Multi-branches'],
    couleur: 'from-blue-500/20 to-blue-600/5',
  },
  {
    icon: Monitor,
    titre: 'Interface POS',
    desc: 'Caisse tactile intuitive, catalogue filtré par catégorie, panier intelligent, paiement Mobile Money en 30 secondes.',
    points: ['Caisse tactile', 'Catalogue filtré', 'Panier intelligent', 'Mobile Money 30s'],
    couleur: 'from-green-500/20 to-green-600/5',
  },
  {
    icon: BookOpen,
    titre: 'Gestion Menu',
    desc: 'Catalogue produits complet, catégories personnalisées, photos HD, gestion de disponibilité en temps réel.',
    points: ['Catalogue produits', 'Catégories', 'Photos HD', 'Disponibilité temps réel'],
    couleur: 'from-orange-500/20 to-orange-600/5',
  },
  {
    icon: BarChart3,
    titre: 'Rapports & Analytics',
    desc: 'CA sur 7, 30 et 90 jours, répartition des modes de paiement, comparaison entre branches, export PDF et Excel.',
    points: ['CA 7/30/90 jours', 'Répartition paiements', 'Comparaison branches', 'Export PDF/Excel'],
    couleur: 'from-purple-500/20 to-purple-600/5',
  },
  {
    icon: Users,
    titre: 'CRM & Fidélité',
    desc: 'Profil client enrichi, cumul de points automatique, niveaux Bronze/Silver/Gold/Platinum, coupons anniversaire.',
    points: ['Profil client', 'Points automatiques', 'Bronze → Platinum', 'Coupons anniversaire'],
    couleur: 'from-pink-500/20 to-pink-600/5',
  },
  {
    icon: MessageCircle,
    titre: 'WhatsApp Automation',
    desc: '6 templates activables : confirmation commande, facture PDF, rappel RDV, promotion, anniversaire et plus encore.',
    points: ['6 templates', 'Confirmation commande', 'Facture PDF', 'Rappel RDV', 'Anniversaire'],
    couleur: 'from-emerald-500/20 to-emerald-600/5',
  },
  {
    icon: Hotel,
    titre: 'Gestion Hôtel',
    desc: 'Plan des chambres par étage, codes couleur d\'état, check-in / check-out en 1 clic, alertes de ménage et maintenance.',
    points: ['Plan par étage', 'Codes couleur', 'Check-in/out 1 clic', 'Alertes'],
    couleur: 'from-cyan-500/20 to-cyan-600/5',
  },
  {
    icon: Shield,
    titre: 'Super Admin',
    desc: 'Vue centralisée de tous les clients, suivi du MRR, gestion des abonnements, monitoring et santé du système.',
    points: ['Vue clients', 'Suivi MRR', 'Gestion abonnements', 'Monitoring'],
    couleur: 'from-amber-500/20 to-amber-600/5',
  },
]

const plans = [
  {
    nom: 'STARTER',
    prix: '9 900',
    periode: '/mois',
    desc: 'Idéal pour démarrer avec un seul point de vente.',
    populaire: false,
    fonctionnalites: [
      '1 utilisateur inclus',
      '1 branche / point de vente',
      'Interface POS complète',
      'Gestion menu & catalogue',
      'Rapports basiques (7 jours)',
      'Paiement espèces & Mobile Money',
      'Support par e-mail',
      'Mises à jour incluses',
    ],
    nonInclus: [
      'CRM & fidélité',
      'WhatsApp Automation',
      'Gestion hôtel',
      'Export PDF/Excel',
      'Multi-branches',
    ],
  },
  {
    nom: 'PRO',
    prix: '24 900',
    periode: '/mois',
    desc: 'Le plan le plus choisi — tout ce qu\'il faut pour croître.',
    populaire: true,
    fonctionnalites: [
      '5 utilisateurs inclus',
      '3 branches / points de vente',
      'Interface POS complète',
      'Gestion menu & catalogue',
      'Dashboard admin complet',
      'Rapports avancés (7/30/90 jours)',
      'Export PDF & Excel',
      'CRM & programme de fidélité',
      'WhatsApp Automation (6 templates)',
      'Paiement espèces, Mobile Money & CB',
      'Support prioritaire',
      'Mises à jour incluses',
    ],
    nonInclus: [
      'Gestion hôtel',
      'Super Admin multi-tenant',
      'API & intégrations',
    ],
  },
  {
    nom: 'ENTERPRISE',
    prix: 'Sur devis',
    periode: '',
    desc: 'Solution complète, sur mesure, pour les grandes structures.',
    populaire: false,
    fonctionnalites: [
      'Utilisateurs illimités',
      'Branches illimitées',
      'Tous les modules activés',
      'Gestion hôtel complète',
      'Super Admin multi-tenant',
      'API & intégrations personnalisées',
      'White-label complet',
      'Domaine personnalisé',
      'Formation sur site',
      'Chef de projet dédié',
      'Support 24/7 par téléphone',
      'SLA garanti 99,9%',
    ],
    nonInclus: [],
  },
]

const moyensPaiement = [
  { icon: Smartphone, label: 'Orange Money' },
  { icon: Smartphone, label: 'MTN MoMo' },
  { icon: Banknote, label: 'Virement bancaire' },
  { icon: CreditCard, label: 'Carte bancaire' },
]

export default function Step1_Features() {
  return (
    <div className="animate-fade-slide">
      {/* ═══ SECTION MODULES ═══ */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 mb-6">
              <Zap size={14} className="text-[var(--color-primary)]" />
              <span className="text-sm font-medium text-[var(--color-primary)]">8 modules puissants</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-title)]">
              Tout ce dont vous avez besoin, dans un seul outil
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
              Chaque module est conçu pour l'Afrique : devises locales, Mobile Money natif, WhatsApp intégré et interface optimisée pour les connexions lentes.
            </p>
          </div>

          <DemoTooltip label="8 modules activables selon votre secteur et plan" position="top" highlight>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {modules.map((mod, i) => {
                const Icon = mod.icon
                return (
                  <div
                    key={i}
                    className={`group relative bg-gradient-to-br ${mod.couleur} bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-primary)]/40 hover:shadow-lg hover:shadow-black/20 hover:scale-[1.02] transition-all duration-300`}
                  >
                    <div className="p-3 rounded-xl bg-[var(--color-primary)]/10 w-fit mb-4 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                      <Icon size={24} className="text-[var(--color-primary)]" />
                    </div>

                    <h3 className="text-base font-bold text-white mb-2">{mod.titre}</h3>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-4">{mod.desc}</p>

                    <ul className="space-y-1.5">
                      {mod.points.map((point, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                          <Check size={12} className="text-[var(--color-success)] shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </DemoTooltip>
        </div>
      </section>

      {/* ═══ SÉPARATEUR ═══ */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      </div>

      {/* ═══ SECTION PRICING ═══ */}
      <section id="tarifs" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 mb-6">
              <TrendingUp size={14} className="text-[var(--color-primary)]" />
              <span className="text-sm font-medium text-[var(--color-primary)]">Tarification transparente</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-title)]">
              Un plan adapté à chaque étape de votre croissance
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
              Pas de frais cachés. Commencez avec Starter, évoluez vers Pro quand vous êtes prêt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <DemoTooltip
                key={i}
                label={plan.populaire ? 'Plan le plus vendu' : ''}
                position="top"
                highlight={plan.populaire}
                visible={plan.populaire}
              >
                <div className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-300 ${
                  plan.populaire
                    ? 'bg-gradient-to-b from-[var(--color-primary)]/10 to-[var(--color-card)] border-[var(--color-primary)] shadow-2xl shadow-[var(--color-primary)]/15 scale-[1.03] z-10'
                    : 'bg-[var(--color-card)] border-[var(--color-border)] hover:border-[var(--color-primary)]/30'
                }`}>
                  {plan.populaire && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold bg-[var(--color-primary)] text-[var(--color-bg-main)] shadow-lg shadow-[var(--color-primary)]/30">
                        <Star size={12} />
                        PLUS POPULAIRE
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-[var(--color-text-muted)] tracking-wider mb-2">{plan.nom}</h3>
                    <DemoTooltip label="Tarification locale CFA" position="right" visible={i === 0}>
                      <div className="flex items-baseline gap-1">
                        {plan.prix === 'Sur devis' ? (
                          <span className="text-3xl font-bold text-white">{plan.prix}</span>
                        ) : (
                          <>
                            <span className="text-4xl font-bold text-white">{plan.prix}</span>
                            <span className="text-sm text-[var(--color-text-muted)]">XAF{plan.periode}</span>
                          </>
                        )}
                      </div>
                    </DemoTooltip>
                    <p className="text-xs text-[var(--color-text-muted)] mt-2">{plan.desc}</p>
                  </div>

                  <div className="flex-1 space-y-2.5 mb-6">
                    {plan.fonctionnalites.map((f, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <Check size={14} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                        <span className="text-sm text-white">{f}</span>
                      </div>
                    ))}
                    {plan.nonInclus.map((f, j) => (
                      <div key={`no-${j}`} className="flex items-start gap-2.5 opacity-40">
                        <span className="w-3.5 h-3.5 shrink-0 mt-0.5 flex items-center justify-center text-[var(--color-text-muted)]">—</span>
                        <span className="text-sm text-[var(--color-text-muted)] line-through">{f}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    plan.populaire
                      ? 'bg-[var(--color-primary)] text-[var(--color-bg-main)] hover:brightness-110 shadow-lg shadow-[var(--color-primary)]/20'
                      : 'border border-[var(--color-border)] text-white hover:bg-white/5 hover:border-[var(--color-primary)]/40'
                  }`}>
                    {plan.prix === 'Sur devis' ? 'Nous contacter' : 'Choisir ce plan'}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </DemoTooltip>
            ))}
          </div>

          {/* ═══ MENTION TVA & MOYENS DE PAIEMENT ═══ */}
          <div className="mt-10 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <DemoTooltip label="TVA 19,25% CEMAC calculée automatiquement" position="top" highlight>
                <div className="text-center sm:text-left">
                  <p className="text-sm font-medium text-white mb-1">
                    TVA 19,25% incluse dans tous les prix
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Conforme à la réglementation CEMAC — calculée et facturée automatiquement.
                  </p>
                </div>
              </DemoTooltip>

              <DemoTooltip label="Orange Money et MTN MoMo natifs" position="top" highlight>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[var(--color-text-muted)] shrink-0">Modes de paiement :</span>
                  <div className="flex items-center gap-3">
                    {moyensPaiement.map((mp, i) => {
                      const Icon = mp.icon
                      return (
                        <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-bg-main)] border border-[var(--color-border)]">
                          <Icon size={14} className="text-[var(--color-primary)]" />
                          <span className="text-xs text-white font-medium whitespace-nowrap">{mp.label}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </DemoTooltip>
            </div>
          </div>

          {/* ═══ CTA FINAL ═══ */}
          <div className="mt-10 text-center">
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              Vous ne savez pas quel plan choisir ? Continuez la visite guidée pour découvrir chaque fonctionnalité en détail.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-[var(--color-secondary)]">
              <ArrowRight size={14} />
              <span>Cliquez sur « Suivant » pour explorer le Dashboard en direct</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
