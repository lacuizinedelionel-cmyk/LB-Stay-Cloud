import { useDemo } from '../context/DemoContext'
import DemoTooltip from '../components/DemoTooltip'
import {
  Rocket, RotateCcw, MessageCircle, Star, CheckCircle,
  LayoutDashboard, Monitor, BookOpen, BarChart3, Users,
  Hotel, Shield, Zap, ArrowRight
} from 'lucide-react'

const modules = [
  { icone: LayoutDashboard, label: 'Dashboard Admin' },
  { icone: Monitor, label: 'Interface POS' },
  { icone: BookOpen, label: 'Gestion Menu' },
  { icone: BarChart3, label: 'Rapports & Analytics' },
  { icone: Users, label: 'CRM & Fidélité' },
  { icone: MessageCircle, label: 'WhatsApp Automation' },
  { icone: Hotel, label: 'Gestion Hôtel' },
  { icone: Shield, label: 'Super Admin' },
]

const temoignages = [
  {
    texte: '« Depuis LB Stay Cloud, on a réduit nos erreurs de caisse de 80%. Les factures WhatsApp en temps réel, c\'est magique ! »',
    nom: 'Marie-Claire Fotso',
    role: 'Gérante — Restaurant Chez Mama, Yaoundé',
    etoiles: 5,
  },
  {
    texte: '« J\'ai configuré mes 3 branches en une matinée. Le dashboard multi-branche me fait gagner 2h par jour. »',
    nom: 'Jean-Pierre Kamga',
    role: 'Directeur — Hôtel Le Palmier, Douala',
    etoiles: 5,
  },
  {
    texte: '« Le programme de fidélité a augmenté notre taux de retour client de 34% en 3 mois. »',
    nom: 'Paul Ndjock',
    role: 'Gérant — Pharmacie du Carrefour, Bafoussam',
    etoiles: 5,
  },
]

export default function Step10_Final() {
  const { goToStep, setIsAutoPlay, brandConfig } = useDemo()

  const revoirDemo = () => {
    goToStep(0)
  }

  const revoirAutoPlay = () => {
    goToStep(0)
    setTimeout(() => setIsAutoPlay(true), 500)
  }

  return (
    <div className="animate-fade-slide">
      {/* ═══ HERO FINAL ═══ */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-1/3 w-80 h-80 bg-[var(--color-primary)]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/3 w-96 h-96 bg-[var(--color-secondary)]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-[var(--color-success)]/20 flex items-center justify-center mx-auto mb-8 animate-float">
            <CheckCircle size={40} className="text-[var(--color-success)]" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-title)]">
            Vous venez de découvrir{' '}
            <span className="text-[var(--color-primary)]">{brandConfig.companyName}</span>
          </h1>

          <p className="text-xl text-[var(--color-secondary)] font-medium mb-3">
            8 modules. 8 secteurs. 1 seul outil.
          </p>

          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto mb-10">
            La plateforme SaaS qui centralise toute votre gestion commerciale — conçue 100% pour l'Afrique, avec Mobile Money natif, WhatsApp intégré et tarification en FCFA.
          </p>

          {/* ═══ 3 CTA ═══ */}
          <DemoTooltip label="3 actions possibles — essai, contact ou revoir la démo" position="bottom" highlight>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold bg-[var(--color-primary)] text-[var(--color-bg-main)] hover:brightness-110 hover:scale-[1.02] transition-all shadow-xl shadow-[var(--color-primary)]/20">
                <Rocket size={20} />
                Essai gratuit — 14 jours
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="flex items-center gap-2.5 px-6 py-4 rounded-2xl text-base font-medium border-2 border-green-500/40 text-green-400 hover:bg-green-500/10 transition-all">
                <MessageCircle size={20} />
                Contact commercial WhatsApp
              </button>

              <button
                onClick={revoirDemo}
                className="flex items-center gap-2 px-6 py-4 rounded-2xl text-base font-medium border-2 border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-white hover:border-white/20 transition-all"
              >
                <RotateCcw size={18} />
                Revoir la démo
              </button>
            </div>
          </DemoTooltip>
        </div>
      </section>

      {/* ═══ RÉCAP 8 MODULES ═══ */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-center text-lg font-bold text-white mb-8 font-[family-name:var(--font-title)]">
            Ce que vous avez exploré
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {modules.map((m, i) => {
              const Icon = m.icone
              return (
                <div
                  key={i}
                  className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-4 text-center hover:border-[var(--color-primary)]/40 hover:scale-[1.03] transition-all cursor-pointer animate-fade-slide"
                  style={{ animationDelay: `${i * 80}ms` }}
                  onClick={() => goToStep(i + 3)}
                >
                  <div className="p-3 rounded-xl bg-[var(--color-primary)]/10 w-fit mx-auto mb-3">
                    <Icon size={22} className="text-[var(--color-primary)]" />
                  </div>
                  <p className="text-xs font-medium text-white">{m.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ SÉPARATEUR ═══ */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      </div>

      {/* ═══ TÉMOIGNAGES ═══ */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-center text-lg font-bold text-white mb-8 font-[family-name:var(--font-title)]">
            Ils nous font confiance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {temoignages.map((t, i) => (
              <div
                key={i}
                className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5 animate-fade-slide"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.etoiles }).map((_, j) => (
                    <Star key={j} size={14} className="text-[var(--color-primary)] fill-[var(--color-primary)]" />
                  ))}
                </div>
                <p className="text-xs text-white/90 italic leading-relaxed mb-4">{t.texte}</p>
                <div>
                  <p className="text-xs font-semibold text-white">{t.nom}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)]">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CHIFFRES CLÉS ═══ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 border border-[var(--color-primary)]/20 rounded-3xl p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { valeur: '500+', label: 'Commerces' },
                { valeur: '2 000+', label: 'Branches' },
                { valeur: '98%', label: 'Satisfaction' },
                { valeur: '15', label: 'Pays' },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)]">{s.valeur}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL BAS ═══ */}
      <section className="py-12 px-6 text-center">
        <p className="text-sm text-[var(--color-text-muted)] mb-6">
          Prêt à transformer votre commerce ? Lancez-vous dès maintenant.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[var(--color-primary)] text-[var(--color-bg-main)] hover:brightness-110 transition-all shadow-lg shadow-[var(--color-primary)]/20">
            <Rocket size={16} /> Démarrer gratuitement
          </button>
          <button
            onClick={revoirAutoPlay}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-white hover:bg-white/5 transition-colors"
          >
            <RotateCcw size={16} /> Relancer la visite automatique
          </button>
        </div>
        <p className="text-[10px] text-[var(--color-text-muted)] mt-8">
          © 2026 {brandConfig.companyName} — Plateforme SaaS de Gestion Multi-Secteurs — 100% Afrique
        </p>
      </section>
    </div>
  )
}
