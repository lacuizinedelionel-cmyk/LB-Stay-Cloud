import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getRedirectPath } from '../lib/roleRedirect'
import { motion } from 'framer-motion'
import {
  Cloud, UtensilsCrossed, Mail, Lock, Eye, EyeOff,
  ArrowRight, AlertCircle, Star, Shield, Zap
} from 'lucide-react'
import toast from 'react-hot-toast'

function RestaurantIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Fond radial */}
      <div className="absolute inset-0">
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-[var(--color-gold)]/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-[15%] right-[15%] w-[350px] h-[350px] bg-[var(--color-accent)]/[0.05] rounded-full blur-[100px]" />
      </div>

      {/* Grille subtile */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Mockup restaurant */}
        <div className="relative">
          {/* Grande card principale */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-card p-6 w-[340px]"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-light)] flex items-center justify-center">
                <UtensilsCrossed size={18} className="text-[var(--color-bg-main)]" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Restaurant Chez Mama</p>
                <p className="text-[10px] text-[var(--color-text-muted)]">Douala — Akwa · 3 branches</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'CA Jour', value: '847K', color: 'var(--color-gold)' },
                { label: 'Commandes', value: '156', color: 'var(--color-success)' },
                { label: 'Clients', value: '89', color: 'var(--color-accent)' },
              ].map((kpi, i) => (
                <div key={i} className="bg-[var(--color-bg-main)]/60 rounded-xl p-2.5 text-center">
                  <p className="text-[9px] text-[var(--color-text-muted)]">{kpi.label}</p>
                  <p className="text-base font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-[var(--color-bg-main)]/60 rounded-xl p-3">
              <svg viewBox="0 0 200 50" className="w-full h-auto">
                <defs>
                  <linearGradient id="loginGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F5A623" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,40 C30,35 40,25 70,28 C100,31 110,15 140,12 C170,9 190,5 200,8" fill="none" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />
                <path d="M0,40 C30,35 40,25 70,28 C100,31 110,15 140,12 C170,9 190,5 200,8 L200,50 L0,50 Z" fill="url(#loginGrad)" />
              </svg>
            </div>
          </motion.div>

          {/* Badge flottant haut-droite */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="absolute -top-4 -right-6 glass-card px-3 py-2 flex items-center gap-2"
          >
            <div className="w-6 h-6 rounded-lg bg-[var(--color-success)]/15 flex items-center justify-center">
              <Zap size={12} className="text-[var(--color-success)]" />
            </div>
            <div>
              <p className="text-[8px] text-[var(--color-text-muted)]">Nouvelle commande</p>
              <p className="text-[10px] font-bold text-white">#CMD-2847</p>
            </div>
          </motion.div>

          {/* Badge flottant bas-gauche */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="absolute -bottom-4 -left-6 glass-card px-3 py-2 flex items-center gap-2"
          >
            <div className="flex -space-x-1.5">
              {['MF', 'JK', 'AD'].map((init, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-accent)] flex items-center justify-center text-[7px] font-bold text-white border border-[var(--color-bg-card)]">
                  {init}
                </div>
              ))}
            </div>
            <p className="text-[9px] text-[var(--color-text-muted)]"><span className="text-white font-semibold">+12</span> clients fidèles</p>
          </motion.div>
        </div>

        {/* Stats sous l'illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex items-center gap-8 mt-12"
        >
          {[
            { icon: Shield, label: 'Données chiffrées', value: 'SSL 256-bit' },
            { icon: Star, label: 'Note clients', value: '4.9/5' },
          ].map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className="flex items-center gap-2.5">
                <Icon size={16} className="text-[var(--color-gold)]" />
                <div>
                  <p className="text-[10px] text-[var(--color-text-muted)]">{s.label}</p>
                  <p className="text-xs font-semibold text-white">{s.value}</p>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  const { signIn, signInDemo, profile } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { user } = await signIn(email, password)
      toast.success('Connexion réussie !')
      const role = user?.user_metadata?.role || profile?.role || 'admin'
      navigate(getRedirectPath(role))
    } catch (err) {
      setError(
        err.message === 'Invalid login credentials'
          ? 'Email ou mot de passe incorrect.'
          : err.message || 'Erreur de connexion. Veuillez réessayer.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-[var(--color-bg-main)]">
      {/* Panneau gauche — Formulaire */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[420px]"
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-12">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-light)] flex items-center justify-center shadow-lg shadow-[var(--color-gold)]/20">
              <Cloud size={15} className="text-[var(--color-bg-main)] absolute top-1.5 left-2" />
              <UtensilsCrossed size={12} className="text-[var(--color-bg-main)] absolute bottom-1.5 right-1.5" />
            </div>
            <span className="text-base font-bold text-white">LB Stay Cloud</span>
          </div>

          {/* Titre */}
          <h1
            className="text-3xl font-extrabold text-white mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Bon retour 👋
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mb-8">
            Connectez-vous pour accéder à votre espace de gestion.
          </p>

          {/* Erreur */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 p-3.5 mb-6 rounded-xl bg-[var(--color-danger)]/8 border border-[var(--color-danger)]/15 text-sm text-[var(--color-danger)]"
            >
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </motion.div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
                Adresse email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.cm"
                  required
                  autoComplete="email"
                  className="input pl-11"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
                Mot de passe
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="input pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <div
                  onClick={() => setRemember(!remember)}
                  className={`w-[18px] h-[18px] rounded-md border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    remember
                      ? 'bg-[var(--color-gold)] border-[var(--color-gold)]'
                      : 'bg-[var(--color-bg-input)] border-[var(--color-border)] hover:border-[var(--color-gold)]/40'
                  }`}
                >
                  {remember && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#0A0A0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-xs text-[var(--color-text-secondary)]">Se souvenir de moi</span>
              </label>
              <button type="button" className="text-xs font-medium text-[var(--color-gold)] hover:underline">
                Mot de passe oublié ?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-[15px] rounded-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[var(--color-bg-main)] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Se connecter
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Bouton démo */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--color-border)]" /></div>
            <div className="relative flex justify-center"><span className="px-3 bg-[var(--color-bg-main)] text-xs text-[var(--color-text-muted)]">ou</span></div>
          </div>
          <button
            type="button"
            onClick={() => { signInDemo(); toast.success('Mode démo activé !'); navigate('/admin/dashboard') }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 text-[var(--color-accent)] text-sm font-semibold hover:bg-[var(--color-accent)]/15 transition-all"
          >
            <Zap size={16} />
            Accès Démo (sans inscription)
          </button>

          {/* Lien inscription */}
          <p className="text-center text-sm text-[var(--color-text-muted)] mt-6">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-[var(--color-gold)] font-semibold hover:underline">
              Créer un compte <ArrowRight size={13} className="inline" />
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Panneau droit — Illustration */}
      <div className="hidden lg:block lg:w-[55%] relative border-l border-[var(--color-border)]">
        <RestaurantIllustration />
      </div>
    </div>
  )
}
