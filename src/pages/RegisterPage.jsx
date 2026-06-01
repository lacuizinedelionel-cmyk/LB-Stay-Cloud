import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getRedirectPath } from '../lib/roleRedirect'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cloud, UtensilsCrossed, User, Mail, Lock, Phone, Eye, EyeOff,
  ArrowRight, ArrowLeft, AlertCircle, Building2, MapPin, Users,
  Check, Star, Zap, Crown, ChefHat, Store
} from 'lucide-react'
import toast from 'react-hot-toast'

const steps = [
  { number: 1, label: 'Informations personnelles' },
  { number: 2, label: 'Votre restaurant' },
  { number: 3, label: 'Choisir un plan' },
]

const cities = [
  'Douala', 'Yaoundé', 'Bafoussam', 'Bamenda', 'Garoua',
  'Maroua', 'Ngaoundéré', 'Bertoua', 'Kribi', 'Limbé', 'Buea', 'Autre'
]

const branchOptions = [
  { value: '1', label: '1 branche', description: 'Un seul point de vente' },
  { value: '2-5', label: '2 à 5', description: 'Petite chaîne' },
  { value: '5-20', label: '5 à 20', description: 'Chaîne moyenne' },
  { value: '20+', label: '20+', description: 'Grande chaîne' },
]

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '9 900',
    period: '/mois',
    icon: Zap,
    color: 'var(--color-text-secondary)',
    features: ['1 branche', '1 utilisateur', 'POS de base', 'Rapports simples'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '24 900',
    period: '/mois',
    icon: Star,
    color: 'var(--color-gold)',
    popular: true,
    features: ['5 branches', '10 utilisateurs', 'POS avancé', 'CRM & Fidélité', 'WhatsApp Bot'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Sur devis',
    period: '',
    icon: Crown,
    color: 'var(--color-accent)',
    features: ['Branches illimitées', 'Utilisateurs illimités', 'API dédiée', 'Support prioritaire', 'Formation sur site'],
  },
]

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      {steps.map((step, i) => {
        const isActive = currentStep === step.number
        const isDone = currentStep > step.number
        return (
          <div key={step.number} className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isDone
                    ? 'bg-[var(--color-gold)] text-[var(--color-bg-main)]'
                    : isActive
                    ? 'bg-[var(--color-gold)]/15 text-[var(--color-gold)] ring-2 ring-[var(--color-gold)]/30'
                    : 'bg-[var(--color-bg-input)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
                }`}
              >
                {isDone ? <Check size={14} /> : step.number}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block transition-colors ${
                  isActive ? 'text-white' : 'text-[var(--color-text-muted)]'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-10 h-[2px] rounded-full transition-colors duration-300 ${
                  isDone ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-border)]'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function StepOne({ form, setField }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Créez votre compte</h2>
        <p className="text-sm text-[var(--color-text-muted)]">Vos informations personnelles</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Prénom</label>
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => setField('firstName', e.target.value)}
              placeholder="Jean"
              required
              className="input pl-11"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Nom</label>
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => setField('lastName', e.target.value)}
              placeholder="Kamga"
              required
              className="input pl-11"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Adresse email</label>
        <div className="relative">
          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            placeholder="jean@restaurant.cm"
            required
            autoComplete="email"
            className="input pl-11"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Téléphone</label>
        <div className="relative flex gap-2">
          <div className="flex items-center px-4 rounded-xl bg-[var(--color-bg-input)] border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] whitespace-nowrap">
            🇨🇲 +237
          </div>
          <div className="relative flex-1">
            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setField('phone', e.target.value.replace(/\D/g, '').slice(0, 9))}
              placeholder="6XX XXX XXX"
              required
              className="input pl-11"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Mot de passe</label>
        <div className="relative">
          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={(e) => setField('password', e.target.value)}
            placeholder="Min. 8 caractères"
            required
            minLength={8}
            autoComplete="new-password"
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
        <p className="text-[10px] text-[var(--color-text-muted)] mt-1.5">Minimum 8 caractères</p>
      </div>
    </motion.div>
  )
}

function StepTwo({ form, setField }) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Votre restaurant</h2>
        <p className="text-sm text-[var(--color-text-muted)]">Configurez votre établissement</p>
      </div>

      <div>
        <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Nom du restaurant</label>
        <div className="relative">
          <Store size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={form.restaurantName}
            onChange={(e) => setField('restaurantName', e.target.value)}
            placeholder="Ex: Restaurant Chez Mama"
            required
            className="input pl-11"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Ville</label>
        <div className="relative">
          <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] z-10" />
          <select
            value={form.city}
            onChange={(e) => setField('city', e.target.value)}
            required
            className="input pl-11 appearance-none cursor-pointer"
          >
            <option value="">Sélectionner une ville</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-3 block">Nombre de branches</label>
        <div className="grid grid-cols-2 gap-3">
          {branchOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setField('branches', opt.value)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 ${
                form.branches === opt.value
                  ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/5'
                  : 'border-[var(--color-border)] bg-[var(--color-bg-input)] hover:border-[var(--color-gold)]/30'
              }`}
            >
              <p className={`text-sm font-bold ${
                form.branches === opt.value ? 'text-[var(--color-gold)]' : 'text-white'
              }`}>{opt.label}</p>
              <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{opt.description}</p>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function StepThree({ form, setField }) {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Choisissez votre plan</h2>
        <p className="text-sm text-[var(--color-text-muted)]">Vous pourrez changer à tout moment</p>
      </div>

      <div className="space-y-3">
        {plans.map((plan) => {
          const Icon = plan.icon
          const isSelected = form.plan === plan.id
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setField('plan', plan.id)}
              className={`relative w-full p-4 rounded-xl border text-left transition-all duration-200 ${
                isSelected
                  ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/5'
                  : 'border-[var(--color-border)] bg-[var(--color-bg-input)] hover:border-[var(--color-gold)]/30'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-[var(--color-gold)] text-[var(--color-bg-main)] text-[9px] font-bold uppercase rounded-full tracking-wider">
                  Populaire
                </span>
              )}
              <div className="flex items-start gap-3.5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `color-mix(in srgb, ${plan.color} 15%, transparent)` }}
                >
                  <Icon size={18} style={{ color: plan.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-sm font-bold ${isSelected ? 'text-[var(--color-gold)]' : 'text-white'}`}>
                      {plan.name}
                    </p>
                    <p className="text-sm font-bold text-white">
                      {plan.price} <span className="text-[10px] font-normal text-[var(--color-text-muted)]">FCFA{plan.period}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {plan.features.map((f) => (
                      <span key={f} className="text-[10px] text-[var(--color-text-muted)] flex items-center gap-1">
                        <Check size={10} style={{ color: plan.color }} />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    isSelected
                      ? 'border-[var(--color-gold)] bg-[var(--color-gold)]'
                      : 'border-[var(--color-border)]'
                  }`}
                >
                  {isSelected && <Check size={10} className="text-[var(--color-bg-main)]" />}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}

export default function RegisterPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    restaurantName: '',
    city: '',
    branches: '1',
    plan: 'pro',
  })

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function canGoNext() {
    if (currentStep === 1) {
      return form.firstName && form.lastName && form.email && form.phone.length >= 9 && form.password.length >= 8
    }
    if (currentStep === 2) {
      return form.restaurantName && form.city && form.branches
    }
    return form.plan
  }

  async function handleSubmit() {
    setError('')
    setLoading(true)

    try {
      await signUp(form.email, form.password, {
        full_name: `${form.firstName} ${form.lastName}`,
        phone: `+237${form.phone}`,
        restaurant_name: form.restaurantName,
        city: form.city,
        branches: form.branches,
        plan: form.plan,
        role: 'admin',
      })

      toast.success('Compte créé avec succès !')
      navigate(getRedirectPath('admin'))
    } catch (err) {
      setError(
        err.message === 'User already registered'
          ? 'Un compte existe déjà avec cet email.'
          : err.message || 'Erreur lors de la création du compte.'
      )
    } finally {
      setLoading(false)
    }
  }

  function handleNext() {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  return (
    <div className="min-h-screen flex bg-[var(--color-bg-main)]">
      {/* Panneau gauche — Illustration */}
      <div className="hidden lg:flex lg:w-[45%] relative border-r border-[var(--color-border)] items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute top-[30%] left-[25%] w-[350px] h-[350px] bg-[var(--color-gold)]/[0.06] rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] bg-[var(--color-accent)]/[0.05] rounded-full blur-[100px]" />
        </div>
        <div className="absolute inset-0 grid-bg opacity-40" />

        <div className="relative z-10 flex flex-col items-center text-center px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 mb-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-light)] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[var(--color-gold)]/20">
              <ChefHat size={28} className="text-[var(--color-bg-main)]" />
            </div>
            <h3
              className="text-2xl font-extrabold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Lancez votre restaurant en ligne
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[280px]">
              Rejoignez des centaines de restaurateurs qui gèrent leur business avec LB Stay Cloud.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-6"
          >
            {[
              { value: '500+', label: 'Restaurants' },
              { value: '12K+', label: 'Commandes/jour' },
              { value: '99.9%', label: 'Disponibilité' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-lg font-bold text-[var(--color-gold)]">{s.value}</p>
                <p className="text-[10px] text-[var(--color-text-muted)]">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Panneau droit — Formulaire wizard */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[480px]"
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-light)] flex items-center justify-center shadow-lg shadow-[var(--color-gold)]/20">
              <Cloud size={15} className="text-[var(--color-bg-main)] absolute top-1.5 left-2" />
              <UtensilsCrossed size={12} className="text-[var(--color-bg-main)] absolute bottom-1.5 right-1.5" />
            </div>
            <span className="text-base font-bold text-white">LB Stay Cloud</span>
          </div>

          {/* Indicateur d'étapes */}
          <StepIndicator currentStep={currentStep} />

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

          {/* Contenu de l'étape */}
          <AnimatePresence mode="wait">
            {currentStep === 1 && <StepOne form={form} setField={setField} />}
            {currentStep === 2 && <StepTwo form={form} setField={setField} />}
            {currentStep === 3 && <StepThree form={form} setField={setField} />}
          </AnimatePresence>

          {/* Boutons navigation */}
          <div className="flex items-center gap-3 mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="btn-secondary flex items-center gap-2 px-5 py-3 rounded-xl text-sm"
              >
                <ArrowLeft size={16} />
                Précédent
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={!canGoNext() || loading}
              className="btn-primary flex-1 flex items-center justify-center gap-2 py-3.5 text-[15px] rounded-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[var(--color-bg-main)] border-t-transparent rounded-full animate-spin" />
              ) : currentStep === 3 ? (
                <>
                  Créer mon compte
                  <ArrowRight size={16} />
                </>
              ) : (
                <>
                  Suivant
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          {/* Lien connexion */}
          <p className="text-center text-sm text-[var(--color-text-muted)] mt-8">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-[var(--color-gold)] font-semibold hover:underline">
              Se connecter <ArrowRight size={13} className="inline" />
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
