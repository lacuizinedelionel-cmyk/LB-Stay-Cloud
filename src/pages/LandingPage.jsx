import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Cloud, UtensilsCrossed, ArrowRight, Play, Menu, X,
  Star, Building2, TrendingUp, Globe, Sparkles, CheckCircle,
  ChevronRight, Monitor, BarChart3, QrCode, Smartphone,
  MapPin, MessageCircle, UserPlus, Store, ShoppingBag,
  Check, Crown, Zap, Quote, Heart, ExternalLink
} from 'lucide-react'

/* ═══════════════════════════════════════════════════════════
   HEADER / NAVBAR
   ═══════════════════════════════════════════════════════════ */

const navLinks = [
  { label: 'Fonctionnalités', href: '#features' },
  { label: 'Tarifs', href: '#pricing' },
  { label: 'Restaurants', href: '#restaurants' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-[var(--color-border)] shadow-2xl shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-light)] flex items-center justify-center shadow-lg shadow-[var(--color-gold)]/20 group-hover:shadow-[var(--color-gold)]/30 transition-shadow duration-300">
              <Cloud size={16} className="text-[var(--color-bg-main)] absolute top-2 left-2.5" />
              <UtensilsCrossed size={14} className="text-[var(--color-bg-main)] absolute bottom-2 right-2" />
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight">LB Stay Cloud</span>
              <span className="hidden sm:block text-[10px] text-[var(--color-text-muted)] -mt-0.5 tracking-wider uppercase">Multi-Restaurants</span>
            </div>
          </a>

          {/* Nav centre — desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.04]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Boutons droite — desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2.5 text-sm font-semibold text-[var(--color-gold)] border border-[var(--color-gold)]/30 rounded-xl hover:bg-[var(--color-gold)]/5 hover:border-[var(--color-gold)]/50 transition-all duration-300"
            >
              Se connecter
            </button>
            <button
              onClick={() => navigate('/login')}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              Essai gratuit
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl text-white hover:bg-white/[0.05] transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Menu mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[72px] z-40 glass border-b border-[var(--color-border)] p-6 lg:hidden"
          >
            <nav className="space-y-1 mb-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-[var(--color-text-secondary)] hover:text-white hover:bg-white/[0.04] rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setMobileOpen(false); navigate('/login') }}
                className="w-full py-3 text-sm font-semibold text-[var(--color-gold)] border border-[var(--color-gold)]/30 rounded-xl hover:bg-[var(--color-gold)]/5 transition-all"
              >
                Se connecter
              </button>
              <button
                onClick={() => { setMobileOpen(false); navigate('/login') }}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-sm"
              >
                Essai gratuit
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


/* ═══════════════════════════════════════════════════════════
   MOCKUP DASHBOARD (illustration droite du hero)
   ═══════════════════════════════════════════════════════════ */

function DashboardMockup() {
  return (
    <div className="animate-float-slow">
      <div className="relative">
        {/* Glow derrière */}
        <div className="absolute -inset-6 bg-gradient-to-br from-[var(--color-gold)]/10 via-transparent to-[var(--color-accent)]/10 rounded-3xl blur-2xl" />

        {/* Écran */}
        <div className="relative glass-card overflow-hidden" style={{ width: '100%', maxWidth: 520 }}>
          {/* Barre titre OS */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0A0A0F] border-b border-[var(--color-border)]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-0.5 rounded-md bg-[var(--color-bg-card)] text-[9px] text-[var(--color-text-muted)]">
                app.lbstaycloud.com/dashboard
              </div>
            </div>
          </div>

          {/* Contenu dashboard */}
          <div className="flex bg-[#0A0A0F]">
            {/* Mini sidebar */}
            <div className="w-12 py-3 flex flex-col items-center gap-3 bg-[var(--color-bg-sidebar)] border-r border-[var(--color-border)]">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-light)] flex items-center justify-center">
                <Cloud size={10} className="text-[var(--color-bg-main)]" />
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-5 h-5 rounded-md ${i === 0 ? 'bg-[var(--color-gold)]/20' : 'bg-white/[0.04]'}`}>
                  <div className={`w-full h-full rounded-md flex items-center justify-center ${i === 0 ? 'text-[var(--color-gold)]' : 'text-[var(--color-text-muted)]'}`}>
                    <div className="w-2.5 h-0.5 rounded-full bg-current" />
                  </div>
                </div>
              ))}
            </div>

            {/* Zone principale */}
            <div className="flex-1 p-3 space-y-2.5">
              {/* KPI row */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'CA Jour', value: '847K', color: 'var(--color-gold)' },
                  { label: 'Commandes', value: '156', color: 'var(--color-success)' },
                  { label: 'Clients', value: '89', color: 'var(--color-accent)' },
                ].map((kpi, i) => (
                  <div key={i} className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-2">
                    <p className="text-[7px] text-[var(--color-text-muted)]">{kpi.label}</p>
                    <p className="text-sm font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
                  </div>
                ))}
              </div>

              {/* Graphique simulé */}
              <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-2.5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[8px] font-semibold text-white">Ventes — 7 jours</p>
                  <p className="text-[7px] text-[var(--color-text-muted)]">FCFA</p>
                </div>
                <svg viewBox="0 0 200 60" className="w-full h-auto">
                  <defs>
                    <linearGradient id="mockGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F5A623" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,45 C20,40 30,35 50,30 C70,25 80,20 100,22 C120,24 130,15 150,12 C170,9 180,8 200,5"
                    fill="none"
                    stroke="#F5A623"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0,45 C20,40 30,35 50,30 C70,25 80,20 100,22 C120,24 130,15 150,12 C170,9 180,8 200,5 L200,60 L0,60 Z"
                    fill="url(#mockGrad)"
                  />
                </svg>
              </div>

              {/* Table simulée */}
              <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg p-2">
                <p className="text-[8px] font-semibold text-white mb-1.5">Dernières commandes</p>
                {[
                  { ref: '#2847', client: 'M. Fotso', amount: '12 500', status: 'gold' },
                  { ref: '#2846', client: 'P. Ndjock', amount: '8 200', status: 'success' },
                  { ref: '#2845', client: 'A. Diallo', amount: '25 000', status: 'gold' },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between py-1 border-t border-[var(--color-border)]">
                    <div className="flex items-center gap-2">
                      <span className="text-[7px] text-[var(--color-text-muted)]">{row.ref}</span>
                      <span className="text-[7px] text-white">{row.client}</span>
                    </div>
                    <span className="text-[7px] font-semibold" style={{ color: row.status === 'gold' ? 'var(--color-gold)' : 'var(--color-success)' }}>
                      {row.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Badge flottant */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute -bottom-4 -left-4 glass-card px-3 py-2 flex items-center gap-2"
        >
          <div className="w-7 h-7 rounded-lg bg-[var(--color-success)]/15 flex items-center justify-center">
            <TrendingUp size={14} className="text-[var(--color-success)]" />
          </div>
          <div>
            <p className="text-[9px] text-[var(--color-text-muted)]">CA ce mois</p>
            <p className="text-xs font-bold text-[var(--color-success)]">+23.5%</p>
          </div>
        </motion.div>

        {/* Badge flottant top-right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute -top-3 -right-3 glass-card px-3 py-2 flex items-center gap-2"
        >
          <div className="w-7 h-7 rounded-lg bg-[var(--color-gold)]/15 flex items-center justify-center">
            <CheckCircle size={14} className="text-[var(--color-gold)]" />
          </div>
          <div>
            <p className="text-[9px] text-[var(--color-text-muted)]">Commande payée</p>
            <p className="text-xs font-bold text-white">#CMD-2847</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════════════════════
   COMPTEUR ANIMÉ
   ═══════════════════════════════════════════════════════════ */

function AnimatedStat({ value, suffix = '', label, icon: Icon, delay = 0 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const target = parseInt(value.replace(/\D/g, ''))
    const duration = 1800
    const steps = 40
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [visible, value])

  const displayPrefix = value.startsWith('+') ? '+' : ''

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="text-center group"
    >
      <div className="w-12 h-12 rounded-2xl bg-[var(--color-gold)]/8 flex items-center justify-center mx-auto mb-3 group-hover:bg-[var(--color-gold)]/12 transition-colors duration-300">
        <Icon size={22} className="text-[var(--color-gold)]" />
      </div>
      <p className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
        {displayPrefix}{count.toLocaleString('fr-FR')}{suffix}
      </p>
      <p className="text-sm text-[var(--color-text-secondary)]">{label}</p>
    </motion.div>
  )
}


/* ═══════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════ */

function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-[72px]">
      {/* Fond : grille + gradients */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-[600px] h-[600px] bg-[var(--color-gold)]/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-[var(--color-accent)]/[0.04] rounded-full blur-[120px]" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-gold)]/[0.02] rounded-full blur-[200px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Colonne gauche — Texte */}
          <div className="max-w-2xl lg:max-w-none">
            {/* Badge animé */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-gold)]/8 border border-[var(--color-gold)]/20 mb-8 animate-badge-glow"
            >
              <Sparkles size={14} className="text-[var(--color-gold)]" />
              <span className="text-sm font-semibold text-[var(--color-gold)]">
                N°1 en Afrique Centrale
              </span>
              <ChevronRight size={14} className="text-[var(--color-gold)]/60" />
            </motion.div>

            {/* Titre principal */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-[42px] sm:text-[52px] lg:text-[60px] xl:text-[64px] font-extrabold leading-[1.08] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Gérez{' '}
              <span className="text-gradient-gold">tous vos restaurants</span>
              {' '}depuis un seul endroit
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-10 max-w-xl"
            >
              LB Stay Cloud centralise vos branches, vos équipes et vos ventes en temps réel.
              La solution cloud premium pensée pour l'Afrique.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <button
                onClick={() => navigate('/login')}
                className="btn-primary flex items-center gap-2.5 px-8 py-4 text-[15px] rounded-2xl shadow-xl shadow-[var(--color-gold)]/20"
              >
                Démarrer gratuitement
                <ArrowRight size={18} />
              </button>

              <button className="group flex items-center gap-3 px-6 py-4 text-[15px] font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors duration-300">
                <div className="w-11 h-11 rounded-full border-2 border-[var(--color-border)] flex items-center justify-center group-hover:border-[var(--color-gold)]/40 group-hover:bg-[var(--color-gold)]/5 transition-all duration-300">
                  <Play size={16} className="text-[var(--color-gold)] ml-0.5" />
                </div>
                Voir la démo
              </button>
            </motion.div>

            {/* Micro-preuves */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex items-center gap-5 mt-10"
            >
              <div className="flex -space-x-2">
                {['MF', 'JK', 'AD', 'PN'].map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[var(--color-bg-main)] bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-accent)] flex items-center justify-center text-[8px] font-bold text-white"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-[var(--color-gold)] fill-[var(--color-gold)]" />
                ))}
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">
                <span className="text-white font-semibold">500+</span> restaurants nous font confiance
              </p>
            </motion.div>
          </div>

          {/* Colonne droite — Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="hidden lg:block"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════
   BARRE DE STATS ANIMÉES
   ═══════════════════════════════════════════════════════════ */

function StatsBar() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Séparateur gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <AnimatedStat value="+500" suffix="" label="Restaurants" icon={Building2} delay={0} />
          <AnimatedStat value="+2000" suffix="" label="Branches gérées" icon={Monitor} delay={0.1} />
          <AnimatedStat value="98" suffix="%" label="Satisfaction client" icon={Star} delay={0.2} />
          <AnimatedStat value="15" suffix="" label="Pays en Afrique" icon={Globe} delay={0.3} />
        </div>
      </div>

      {/* Séparateur gradient bas */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════
   SECTION "POURQUOI LB STAY CLOUD ?"
   ═══════════════════════════════════════════════════════════ */

const features = [
  {
    icon: Building2,
    title: 'Multi-branches centralisées',
    desc: 'Gérez 1 à 100 branches depuis un seul tableau de bord en temps réel.',
  },
  {
    icon: BarChart3,
    title: 'Analytics puissants',
    desc: 'Visualisez votre chiffre d\'affaires, vos meilleurs plats et votre taux d\'occupation avec des graphiques interactifs.',
  },
  {
    icon: QrCode,
    title: 'Menu QR Code dynamique',
    desc: 'Vos clients scannent, commandent et paient sans contact depuis leur mobile.',
  },
  {
    icon: Smartphone,
    title: 'Paiements Mobile Money',
    desc: 'Orange Money, MTN Mobile Money et espèces intégrés nativement.',
  },
  {
    icon: MapPin,
    title: 'Suivi livraison GPS',
    desc: 'Vos livreurs suivis en temps réel sur carte, visible par le client.',
  },
  {
    icon: MessageCircle,
    title: 'Notifications WhatsApp',
    desc: 'Commandes, confirmations et promotions envoyés automatiquement sur WhatsApp.',
  },
]

function FeaturesSection() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id="features" className="relative py-24 overflow-hidden">
      {/* Glow de fond */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[var(--color-gold)]/[0.02] rounded-full blur-[180px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header de section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-gold)]/8 border border-[var(--color-gold)]/15 mb-6"
          >
            <Sparkles size={14} className="text-[var(--color-gold)]" />
            <span className="text-sm font-medium text-[var(--color-gold)]">Pourquoi LB Stay Cloud ?</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Tout ce dont vous avez besoin,{' '}
            <span className="text-gradient-gold">enfin réuni</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto"
          >
            Une plateforme complète qui remplace 6 outils différents. Concentrez-vous sur vos clients, on s'occupe du reste.
          </motion.p>
        </div>

        {/* Grille 3×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group glass-card p-7 hover:border-[var(--color-border-active)] transition-all duration-300 cursor-default"
              >
                {/* Icône */}
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-gold)]/8 flex items-center justify-center mb-5 group-hover:bg-[var(--color-gold)]/12 group-hover:shadow-lg group-hover:shadow-[var(--color-gold)]/10 transition-all duration-300">
                  <Icon size={22} className="text-[var(--color-gold)]" />
                </div>

                {/* Texte */}
                <h3 className="text-base font-bold text-white mb-2.5 group-hover:text-[var(--color-gold)] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════
   SECTION "COMMENT ÇA MARCHE ?"
   ═══════════════════════════════════════════════════════════ */

const steps = [
  {
    num: '01',
    icon: UserPlus,
    title: 'Créez votre compte',
    desc: 'Inscription gratuite en 30 secondes. Aucune carte bancaire requise pour l\'essai de 14 jours.',
  },
  {
    num: '02',
    icon: Store,
    title: 'Ajoutez vos branches & menus',
    desc: 'Configurez vos points de vente, importez votre carte et invitez votre équipe.',
  },
  {
    num: '03',
    icon: ShoppingBag,
    title: 'Recevez vos commandes',
    desc: 'Commandes en salle, à emporter ou en livraison — tout arrive dans votre caisse en temps réel.',
  },
]

function HowItWorksSection() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Séparateur top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[var(--color-accent)]/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent)]/8 border border-[var(--color-accent)]/15 mb-6"
          >
            <CheckCircle size={14} className="text-[var(--color-accent)]" />
            <span className="text-sm font-medium text-[var(--color-accent)]">Comment ça marche ?</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Lancez votre restaurant en{' '}
            <span className="text-gradient-gold">3 étapes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto"
          >
            De l'inscription à la première commande, comptez moins de 10 minutes.
          </motion.p>
        </div>

        {/* 3 étapes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-0 items-start">
          {steps.map((step, i) => {
            const Icon = step.icon
            const isLast = i === steps.length - 1
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Ligne connecteur — entre les cards sur desktop */}
                {!isLast && (
                  <div className="hidden lg:block absolute top-[52px] left-[calc(50%+48px)] right-[calc(-50%+48px)] z-10">
                    <div className="h-[2px] w-full bg-gradient-to-r from-[var(--color-gold)]/40 via-[var(--color-gold)]/20 to-[var(--color-gold)]/40 relative">
                      {/* Flèche */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1">
                        <ChevronRight size={16} className="text-[var(--color-gold)]/60" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Flèche mobile entre les étapes */}
                {!isLast && (
                  <div className="lg:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-[2px] h-8 bg-gradient-to-b from-[var(--color-gold)]/30 to-transparent mx-auto" />
                  </div>
                )}

                {/* Card */}
                <div className="glass-card p-8 w-full max-w-xs mb-12 lg:mb-0 hover:border-[var(--color-border-active)] transition-all duration-300 group">
                  {/* Numéro */}
                  <div className="relative mx-auto mb-6">
                    <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[var(--color-gold)]/15 to-[var(--color-gold)]/5 border border-[var(--color-gold)]/20 flex items-center justify-center mx-auto group-hover:shadow-lg group-hover:shadow-[var(--color-gold)]/15 transition-all duration-300">
                      <span className="text-2xl font-extrabold text-gradient-gold">{step.num}</span>
                    </div>
                    {/* Icône dans un badge superposé */}
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)] flex items-center justify-center">
                      <Icon size={14} className="text-[var(--color-gold)]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[var(--color-gold)] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA sous les étapes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center mt-12"
        >
          <button className="btn-primary inline-flex items-center gap-2.5 px-8 py-4 text-[15px] rounded-2xl shadow-xl shadow-[var(--color-gold)]/20">
            Commencer maintenant — c'est gratuit
            <ArrowRight size={18} />
          </button>
          <p className="text-xs text-[var(--color-text-muted)] mt-4">
            Essai gratuit 14 jours · Aucune carte bancaire requise
          </p>
        </motion.div>
      </div>

      {/* Séparateur bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════
   SECTION TARIFS
   ═══════════════════════════════════════════════════════════ */

const plans = [
  {
    name: 'Starter',
    price: '9 900',
    period: '/mois',
    badge: 'Idéal pour débuter',
    badgeColor: 'bg-[var(--color-info)]/10 text-[var(--color-info)] border-[var(--color-info)]/20',
    highlighted: false,
    features: [
      '1 restaurant, 1 branche',
      'Jusqu\'à 3 utilisateurs',
      'Menu numérique QR Code',
      'Commandes & paiements',
      'Rapports basiques',
    ],
    cta: 'Commencer gratuitement',
    ctaStyle: 'btn-secondary w-full flex items-center justify-center gap-2 py-3.5',
  },
  {
    name: 'Pro',
    price: '24 900',
    period: '/mois',
    badge: 'Populaire',
    badgeColor: 'bg-[var(--color-gold)]/15 text-[var(--color-gold)] border-[var(--color-gold)]/25',
    highlighted: true,
    features: [
      '1 restaurant, 5 branches',
      'Utilisateurs illimités',
      'Livraison GPS + livreurs',
      'Programme fidélité',
      'Notifications WhatsApp',
      'Analytiques avancés',
    ],
    cta: 'Choisir Pro',
    ctaStyle: 'btn-primary w-full flex items-center justify-center gap-2 py-3.5',
  },
  {
    name: 'Enterprise',
    price: 'Sur devis',
    period: '',
    badge: 'Grands groupes',
    badgeColor: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20',
    highlighted: false,
    features: [
      'Restaurants & branches illimités',
      'Support dédié 24/7',
      'Formation équipe incluse',
      'API & intégrations custom',
    ],
    cta: 'Nous contacter',
    ctaStyle: 'btn-secondary w-full flex items-center justify-center gap-2 py-3.5',
  },
]

function PricingSection() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id="pricing" className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[var(--color-gold)]/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-gold)]/8 border border-[var(--color-gold)]/15 mb-6"
          >
            <Crown size={14} className="text-[var(--color-gold)]" />
            <span className="text-sm font-medium text-[var(--color-gold)]">Tarifs transparents</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Des tarifs adaptés à{' '}
            <span className="text-gradient-gold">votre croissance</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto"
          >
            Essai gratuit 14 jours sur tous les plans. Aucune carte bancaire requise.
          </motion.p>
        </div>

        {/* Cards tarifaires */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
              className={`relative rounded-2xl p-[1px] ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-[var(--color-gold)]/60 via-[var(--color-gold)]/20 to-transparent'
                  : ''
              }`}
            >
              {/* Badge "Populaire" flottant */}
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)] text-[var(--color-bg-main)] text-xs font-bold shadow-lg shadow-[var(--color-gold)]/25">
                    <Zap size={12} />
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className={`glass-card p-7 h-full flex flex-col ${
                plan.highlighted
                  ? 'border-[var(--color-gold)]/30 bg-[var(--color-gold)]/[0.03]'
                  : ''
              }`}
                style={plan.highlighted ? { borderRadius: '15px' } : {}}
              >
                {/* Badge non-highlighted */}
                {!plan.highlighted && (
                  <div className={`inline-flex items-center self-start gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border mb-5 ${plan.badgeColor}`}>
                    {plan.badge}
                  </div>
                )}
                {plan.highlighted && <div className="mb-5 pt-2" />}

                {/* Nom + Prix */}
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-3xl font-extrabold ${plan.highlighted ? 'text-gradient-gold' : 'text-white'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-[var(--color-text-muted)]">
                      XAF{plan.period}
                    </span>
                  )}
                </div>

                {/* Séparateur */}
                <div className="h-px bg-[var(--color-border)] mb-6" />

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.highlighted
                          ? 'bg-[var(--color-gold)]/15'
                          : 'bg-[var(--color-success)]/10'
                      }`}>
                        <Check size={11} className={
                          plan.highlighted ? 'text-[var(--color-gold)]' : 'text-[var(--color-success)]'
                        } />
                      </div>
                      <span className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className={plan.ctaStyle}>
                  {plan.cta}
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════
   SECTION TÉMOIGNAGES
   ═══════════════════════════════════════════════════════════ */

const testimonials = [
  {
    quote: 'Depuis LB Stay Cloud, on a réduit nos erreurs de caisse de 80%. Les factures WhatsApp automatiques, c\'est un game changer.',
    name: 'Marie-Claire Fotso',
    role: 'Gérante — Restaurant Chez Mama',
    city: 'Douala',
    initials: 'MF',
    gradient: 'from-[#F5A623] to-[#FF6B35]',
  },
  {
    quote: 'J\'ai configuré mes 3 branches en une matinée. Le dashboard multi-branche me fait gagner 2h par jour minimum.',
    name: 'Jean-Pierre Kamga',
    role: 'Directeur — Hôtel Le Palmier',
    city: 'Yaoundé',
    initials: 'JK',
    gradient: 'from-[#6C63FF] to-[#3B82F6]',
  },
  {
    quote: 'Le programme de fidélité a augmenté notre taux de retour client de 34% en 3 mois. L\'équipe support est incroyable.',
    name: 'Awa Diallo',
    role: 'Propriétaire — La Terrasse Gourmande',
    city: 'Bafoussam',
    initials: 'AD',
    gradient: 'from-[#22C55E] to-[#10B981]',
  },
]

function TestimonialsSection() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[var(--color-accent)]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-success)]/8 border border-[var(--color-success)]/15 mb-6"
          >
            <Heart size={14} className="text-[var(--color-success)]" />
            <span className="text-sm font-medium text-[var(--color-success)]">Ils nous font confiance</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ce que disent{' '}
            <span className="text-gradient-gold">nos restaurateurs</span>
          </motion.h2>
        </div>

        {/* Cards témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="glass-card p-7 flex flex-col hover:border-[var(--color-border-active)] transition-all duration-300"
            >
              {/* Étoiles */}
              <div className="flex items-center gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={15} className="text-[var(--color-gold)] fill-[var(--color-gold)]" />
                ))}
              </div>

              {/* Citation */}
              <div className="relative flex-1 mb-6">
                <Quote size={32} className="absolute -top-1 -left-1 text-[var(--color-gold)]/10" />
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed relative z-10 italic">
                  « {t.quote} »
                </p>
              </div>

              {/* Auteur */}
              <div className="flex items-center gap-3 pt-5 border-t border-[var(--color-border)]">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-lg`}>
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{t.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)] truncate">{t.role}</p>
                  <p className="text-[10px] text-[var(--color-gold)]">{t.city}, Cameroun</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════ */

const footerLinks = {
  Produit: [
    { label: 'Fonctionnalités', href: '#features' },
    { label: 'Tarifs', href: '#pricing' },
    { label: 'Intégrations', href: '#' },
    { label: 'Changelog', href: '#' },
  ],
  Entreprise: [
    { label: 'À propos', href: '#' },
    { label: 'Carrières', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Presse', href: '#' },
  ],
  Ressources: [
    { label: 'Documentation', href: '#' },
    { label: 'Guides', href: '#' },
    { label: 'API', href: '#' },
    { label: 'Statut', href: '#' },
  ],
  Contact: [
    { label: '+237 699 000 000', href: 'tel:+237699000000' },
    { label: 'contact@lbstaycloud.com', href: 'mailto:contact@lbstaycloud.com' },
    { label: 'Douala, Cameroun', href: '#' },
    { label: 'Support 24/7', href: '#' },
  ],
}

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const socialLinks = [
  { icon: WhatsAppIcon, href: '#', label: 'WhatsApp' },
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
  { icon: LinkedInIcon, href: '#', label: 'LinkedIn' },
]

function Footer() {
  return (
    <footer id="contact" className="relative pt-20 pb-8" style={{ backgroundColor: '#070707' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-16">
          {/* Colonne logo */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-light)] flex items-center justify-center shadow-lg shadow-[var(--color-gold)]/15">
                <Cloud size={16} className="text-[#070707] absolute" style={{ marginTop: -2, marginLeft: -2 }} />
                <UtensilsCrossed size={12} className="text-[#070707]" style={{ marginTop: 4, marginLeft: 4 }} />
              </div>
              <div>
                <span className="text-base font-bold text-white">LB Stay Cloud</span>
                <p className="text-[10px] text-[var(--color-text-muted)] tracking-wider uppercase">Multi-Restaurants</p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6 max-w-xs">
              La plateforme cloud de gestion multi-restaurants pensée pour le Cameroun et l'Afrique. Dashboard, caisse, CRM et plus encore.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, i) => {
                const Icon = social.icon
                return (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-xl bg-white/[0.04] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)]/30 hover:bg-[var(--color-gold)]/5 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* 4 colonnes de liens */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Ligne basse */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            © 2026 LB Stay Cloud. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            {['Politique de confidentialité', 'Conditions d\'utilisation', 'Mentions légales'].map((text, i) => (
              <a key={i} href="#" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors duration-200">
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}


/* ═══════════════════════════════════════════════════════════
   PAGE LANDING COMPLÈTE
   ═══════════════════════════════════════════════════════════ */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}
