import { useEffect, useRef, useState } from 'react'
import { useDemo } from '../context/DemoContext'
import DemoTooltip from '../components/DemoTooltip'
import {
  Hotel, UtensilsCrossed, Scissors, ShoppingCart, Heart, Wrench,
  Play, Rocket, Star, TrendingUp, Users, Globe, CheckCircle,
  Menu, X
} from 'lucide-react'

const sectors = [
  { id: 'restaurant', label: 'Restauration', icon: UtensilsCrossed, desc: 'Restaurants, bars, cafés, boulangeries', color: 'from-orange-500/20 to-orange-600/5' },
  { id: 'epicerie', label: 'Épicerie / Supermarché', icon: ShoppingCart, desc: 'Commerces de détail, mini-marchés, supérettes', color: 'from-green-500/20 to-green-600/5' },
  { id: 'beaute', label: 'Salon de beauté', icon: Scissors, desc: 'Coiffure, esthétique, barbershop, onglerie', color: 'from-pink-500/20 to-pink-600/5' },
  { id: 'hotel', label: 'Hôtel / Hébergement', icon: Hotel, desc: 'Hôtels, auberges, résidences meublées', color: 'from-blue-500/20 to-blue-600/5' },
  { id: 'sante', label: 'Santé / Pharmacie', icon: Heart, desc: 'Pharmacies, cliniques, cabinets médicaux', color: 'from-red-500/20 to-red-600/5' },
  { id: 'garage', label: 'Garage / Mécanique', icon: Wrench, desc: 'Garages auto, mécanique, carrosserie', color: 'from-gray-500/20 to-gray-600/5' },
]

const stats = [
  { value: 500, suffix: '+', label: 'Commerces', icon: TrendingUp },
  { value: 2000, suffix: '+', label: 'Branches', icon: Globe },
  { value: 98, suffix: '%', label: 'Satisfaction', icon: Star },
  { value: 15, suffix: '', label: 'Pays', icon: Users },
]

const navLinks = [
  { label: 'Fonctionnalités', href: '#fonctionnalites' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'Secteurs', href: '#secteurs' },
  { label: 'Contact', href: '#contact' },
]

function AnimatedCounter({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const startTime = Date.now()
        const tick = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * target))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.3 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString('fr-FR')}{suffix}
    </span>
  )
}

export default function Step0_Accueil() {
  const { selectedSector, setSelectedSector, brandConfig, nextStep } = useDemo()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleSectorClick = (sectorId) => {
    setSelectedSector(sectorId)
    const sector = sectors.find(s => s.id === sectorId)
    setToast(`Secteur "${sector.label}" sélectionné — la démo s'adapte à votre métier`)
    setTimeout(() => setToast(null), 3000)
    setTimeout(() => nextStep(), 800)
  }

  return (
    <div className="animate-fade-slide">
      {/* ═══ NAVBAR STICKY ═══ */}
      <DemoTooltip label="Navigation principale — 4 modules accessibles au public" position="bottom">
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--color-bg-main)]/80 backdrop-blur-nav border-b border-[var(--color-border)] shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <span className="text-xl font-bold font-[family-name:var(--font-title)] text-[var(--color-primary)]">
              {brandConfig.companyName}
            </span>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[var(--color-text-muted)] hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button className="px-4 py-2 rounded-lg text-sm font-medium border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors">
                Se connecter
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-primary)] text-[var(--color-bg-main)] hover:brightness-110 transition-all">
                Essai gratuit
              </button>
            </div>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10"
            >
              {mobileMenu ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white" />}
            </button>
          </div>

          {mobileMenu && (
            <div className="md:hidden bg-[var(--color-card)] border-t border-[var(--color-border)] px-6 py-4 space-y-3 animate-fade-slide">
              {navLinks.map(link => (
                <a key={link.label} href={link.href} className="block text-sm text-[var(--color-text-muted)] hover:text-white py-2">
                  {link.label}
                </a>
              ))}
              <div className="flex gap-3 pt-2">
                <button className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border border-[var(--color-primary)] text-[var(--color-primary)]">Se connecter</button>
                <button className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-primary)] text-[var(--color-bg-main)]">Essai gratuit</button>
              </div>
            </div>
          )}
        </nav>
      </DemoTooltip>

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-[var(--color-primary)]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[var(--color-secondary)]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <DemoTooltip label="Ancrage de crédibilité — +500 commerces font confiance" position="bottom" highlight>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 mb-8 animate-pulse-badge">
              <Star size={14} className="text-[var(--color-primary)]" />
              <span className="text-sm font-medium text-[var(--color-primary)]">N°1 en Afrique Centrale</span>
            </div>
          </DemoTooltip>

          <h1 className="text-4xl sm:text-5xl lg:text-[64px] leading-tight font-bold text-white mb-6 font-[family-name:var(--font-title)]">
            La plateforme SaaS qui{' '}
            <span className="text-[var(--color-primary)]">centralise</span>{' '}
            toute votre gestion commerciale
          </h1>

          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Caisse, menu, clients, rapports, WhatsApp et fidélité — en un seul outil, adapté à l'Afrique.
          </p>

          <DemoTooltip label="2 profils d'intention : décideur direct vs curieux" position="bottom" highlight>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={nextStep}
                className="group flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold bg-[var(--color-primary)] text-[var(--color-bg-main)] hover:brightness-110 hover:scale-[1.02] transition-all shadow-lg shadow-[var(--color-primary)]/20"
              >
                <Rocket size={20} />
                Démarrer gratuitement — 14 jours
              </button>
              <button
                onClick={nextStep}
                className="group flex items-center gap-2 px-8 py-4 rounded-xl text-base font-medium border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-all"
              >
                <Play size={20} />
                Voir la démo
              </button>
            </div>
          </DemoTooltip>

          <DemoTooltip label="Preuves sociales animées — chiffres clés qui rassurent" position="top" highlight>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div
                    key={i}
                    className="animate-count-up text-center"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <Icon size={16} className="text-[var(--color-primary)]" />
                      <span className="text-2xl sm:text-3xl font-bold text-white">
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)]">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </DemoTooltip>
        </div>
      </section>

      {/* ═══ SÉPARATEUR ═══ */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      </div>

      {/* ═══ SÉLECTEUR DE SECTEUR ═══ */}
      <section id="secteurs" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-title)]">
              Pour quel secteur travaillez-vous ?
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
              Sélectionnez votre domaine d'activité — l'ensemble de la démo s'adapte automatiquement à votre métier.
            </p>
          </div>

          <DemoTooltip label="8 secteurs supportés — la démo s'adapte à votre métier" position="top" highlight>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sectors.map(sector => {
                const Icon = sector.icon
                const isActive = selectedSector === sector.id
                return (
                  <button
                    key={sector.id}
                    onClick={() => handleSectorClick(sector.id)}
                    className={`group relative flex items-start gap-4 p-6 rounded-2xl border text-left transition-all duration-300 hover:scale-[1.02] ${
                      isActive
                        ? 'bg-gradient-to-br ' + sector.color + ' border-[var(--color-primary)] shadow-xl shadow-[var(--color-primary)]/10'
                        : 'bg-[var(--color-card)] border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:shadow-lg hover:shadow-black/20'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-3 right-3">
                        <CheckCircle size={18} className="text-[var(--color-primary)]" />
                      </div>
                    )}

                    <div className={`shrink-0 p-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-[var(--color-primary)]/20'
                        : 'bg-white/5 group-hover:bg-[var(--color-primary)]/10'
                    }`}>
                      <Icon size={26} className={`transition-colors ${
                        isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]'
                      }`} />
                    </div>

                    <div>
                      <h3 className={`text-base font-semibold mb-1 transition-colors ${
                        isActive ? 'text-[var(--color-primary)]' : 'text-white'
                      }`}>
                        {sector.label}
                      </h3>
                      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                        {sector.desc}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </DemoTooltip>

          <p className="text-center mt-8 text-sm text-[var(--color-text-muted)]">
            Cliquez sur un secteur pour démarrer la visite guidée interactive
          </p>
        </div>
      </section>

      {/* ═══ TOAST NOTIFICATION ═══ */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[70] animate-fade-slide">
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[var(--color-card)] border border-[var(--color-primary)] shadow-2xl shadow-[var(--color-primary)]/20">
            <CheckCircle size={18} className="text-[var(--color-primary)] shrink-0" />
            <span className="text-sm text-white font-medium">{toast}</span>
          </div>
        </div>
      )}
    </div>
  )
}
