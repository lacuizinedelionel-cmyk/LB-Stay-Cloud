import { useState } from 'react'
import { useDemo } from '../context/DemoContext'
import DemoTooltip from '../components/DemoTooltip'
import {
  Shield, ShieldCheck, Users, Monitor, Eye, EyeOff, Lock, Mail,
  CheckCircle, Loader2, ArrowRight, Star, Clock, Headphones,
  Building2, TrendingUp, UserCheck
} from 'lucide-react'

const roles = [
  {
    id: 'super_admin',
    label: 'Super Admin',
    icon: Shield,
    couleur: 'from-purple-500/20 to-purple-600/5 border-purple-500/40',
    couleurTexte: 'text-purple-400',
    badge: 'bg-purple-500/20 text-purple-400',
    description: 'Vision globale de la plateforme. Accès à tous les tenants, monitoring système, gestion des abonnements, configuration MRR et santé technique.',
    permissions: ['Tous les modules', 'Gestion multi-tenant', 'Monitoring système', 'Configuration globale', 'Rapports consolidés'],
  },
  {
    id: 'restaurant_admin',
    label: 'Admin Établissement',
    icon: ShieldCheck,
    couleur: 'from-blue-500/20 to-blue-600/5 border-blue-500/40',
    couleurTexte: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-400',
    description: 'Propriétaire ou gérant d\'un établissement. Accès complet au dashboard, rapports, CRM, WhatsApp et gestion du personnel de toutes ses branches.',
    permissions: ['Dashboard complet', 'Rapports & Analytics', 'CRM & Fidélité', 'WhatsApp Automation', 'Gestion du personnel'],
  },
  {
    id: 'branch_manager',
    label: 'Gérant de Branche',
    icon: Users,
    couleur: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/40',
    couleurTexte: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-400',
    description: 'Responsable d\'une branche spécifique. Accès au POS, rapports de sa branche, gestion du stock local et suivi des ventes quotidiennes.',
    permissions: ['POS de sa branche', 'Rapports de branche', 'Gestion du stock', 'Suivi des ventes', 'Équipe locale'],
  },
  {
    id: 'staff',
    label: 'Personnel / Caissier',
    icon: Monitor,
    couleur: 'from-amber-500/20 to-amber-600/5 border-amber-500/40',
    couleurTexte: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-400',
    description: 'Accès restreint au Point de Vente uniquement. Peut créer des ventes, encaisser les clients et imprimer les reçus. Aucun accès aux rapports.',
    permissions: ['Interface POS', 'Encaissement', 'Impression reçus'],
  },
]

const commerces = [
  { nom: 'Hôtel Le Palmier Douala', ville: 'Douala', secteur: 'Hébergement', clients: '1 240', avatar: 'HP' },
  { nom: 'Restaurant Chez Mama', ville: 'Yaoundé', secteur: 'Restauration', clients: '3 850', avatar: 'CM' },
  { nom: 'Pharmacie du Carrefour', ville: 'Bafoussam', secteur: 'Santé', clients: '2 100', avatar: 'PC' },
  { nom: 'Salon Beauté Prestige', ville: 'Kribi', secteur: 'Beauté', clients: '890', avatar: 'BP' },
]

const statsConfiance = [
  { icon: Building2, valeur: '500+', label: 'Commerces actifs' },
  { icon: Clock, valeur: '99,9%', label: 'Disponibilité' },
  { icon: Headphones, valeur: '24/7', label: 'Support technique' },
]

export default function Step2_Auth() {
  const { brandConfig, nextStep } = useDemo()
  const [selectedRole, setSelectedRole] = useState('restaurant_admin')
  const [email] = useState('admin@demo-lbstay.cm')
  const [password, setPassword] = useState('demo1234')
  const [showPassword, setShowPassword] = useState(false)
  const [resterConnecte, setResterConnecte] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const roleActif = roles.find(r => r.id === selectedRole)

  const handleConnexion = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setToast(`Connexion réussie en tant que "${roleActif.label}" — Redirection vers le dashboard...`)
      setTimeout(() => {
        setToast(null)
        nextStep()
      }, 1500)
    }, 1200)
  }

  return (
    <div className="animate-fade-slide min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">

        {/* ═══ GAUCHE — FORMULAIRE (55%) ═══ */}
        <div className="lg:w-[55%] flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md space-y-8">

            {/* Logo + Titre */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-[family-name:var(--font-title)]">
                Connexion à <span className="text-[var(--color-primary)]">{brandConfig.companyName}</span>
              </h1>
              <p className="text-sm text-[var(--color-text-muted)]">
                Accédez à votre espace de gestion sécurisé
              </p>
            </div>

            {/* Champ Email */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5">Adresse e-mail</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-[var(--color-primary)] transition-colors"
                  />
                </div>
              </div>

              {/* Champ Mot de passe */}
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5">Mot de passe</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl pl-10 pr-12 py-3 text-sm text-white outline-none focus:border-[var(--color-primary)] transition-colors"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} className="text-[var(--color-text-muted)]" /> : <Eye size={16} className="text-[var(--color-text-muted)]" />}
                  </button>
                </div>
              </div>

              {/* Rester connecté + Mot de passe oublié */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    onClick={() => setResterConnecte(!resterConnecte)}
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer ${
                      resterConnecte
                        ? 'bg-[var(--color-primary)] border-[var(--color-primary)]'
                        : 'border-[var(--color-border)] bg-transparent'
                    }`}
                  >
                    {resterConnecte && <CheckCircle size={10} className="text-[var(--color-bg-main)]" />}
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)]">Rester connecté</span>
                </label>
                <button className="text-xs text-[var(--color-primary)] hover:underline">
                  Mot de passe oublié ?
                </button>
              </div>
            </div>

            {/* Sélecteur de rôles */}
            <div>
              <DemoTooltip label="4 niveaux d'accès — chaque rôle voit un périmètre différent" position="top" highlight>
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-3">Se connecter en tant que :</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {roles.map(role => {
                      const Icon = role.icon
                      const actif = selectedRole === role.id
                      return (
                        <DemoTooltip
                          key={role.id}
                          label={role.id === 'super_admin' ? 'Vision plateforme globale' : role.id === 'staff' ? 'POS uniquement' : ''}
                          position="bottom"
                          visible={role.id === 'super_admin' || role.id === 'staff'}
                        >
                          <button
                            onClick={() => setSelectedRole(role.id)}
                            className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all duration-200 w-full ${
                              actif
                                ? `bg-gradient-to-br ${role.couleur} shadow-lg`
                                : 'bg-[var(--color-card)] border-[var(--color-border)] hover:border-white/20'
                            }`}
                          >
                            <div className={`p-1.5 rounded-lg ${actif ? 'bg-white/10' : 'bg-white/5'}`}>
                              <Icon size={16} className={actif ? role.couleurTexte : 'text-[var(--color-text-muted)]'} />
                            </div>
                            <span className={`text-xs font-medium ${actif ? 'text-white' : 'text-[var(--color-text-muted)]'}`}>
                              {role.label}
                            </span>
                          </button>
                        </DemoTooltip>
                      )
                    })}
                  </div>
                </div>
              </DemoTooltip>

              {/* Description dynamique du rôle */}
              <div className="mt-4 bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-xl p-4 animate-fade-slide" key={selectedRole}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${roleActif.badge}`}>
                    {roleActif.label}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-3">{roleActif.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {roleActif.permissions.map((perm, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--color-card)] text-[10px] text-[var(--color-text-muted)] border border-[var(--color-border)]">
                      <CheckCircle size={10} className="text-[var(--color-success)]" />
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bouton Connexion */}
            <DemoTooltip label="Accès immédiat avec données démo" position="right" highlight>
              <button
                onClick={handleConnexion}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold bg-[var(--color-primary)] text-[var(--color-bg-main)] hover:brightness-110 disabled:opacity-70 transition-all shadow-lg shadow-[var(--color-primary)]/20"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Se connecter
                  </>
                )}
              </button>
            </DemoTooltip>

            {/* Lien inscription */}
            <p className="text-center text-xs text-[var(--color-text-muted)]">
              Pas encore de compte ?{' '}
              <button className="text-[var(--color-primary)] font-medium hover:underline">
                Créer un compte gratuitement
              </button>
            </p>
          </div>
        </div>

        {/* ═══ DROITE — PANNEAU DE CONFIANCE (45%) ═══ */}
        <div className="lg:w-[45%] bg-gradient-to-br from-[var(--color-card)] to-[var(--color-bg-main)] border-l border-[var(--color-border)] flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-sm space-y-8">

            {/* Titre panneau */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-title)]">
                Rejoignez <span className="text-[var(--color-primary)]">500+</span> commerces
              </h2>
              <p className="text-sm text-[var(--color-text-muted)]">
                qui font confiance à {brandConfig.companyName} en Afrique Centrale
              </p>
            </div>

            {/* Stats de confiance */}
            <div className="grid grid-cols-3 gap-3">
              {statsConfiance.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={i} className="bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-xl p-3 text-center">
                    <Icon size={18} className="mx-auto mb-1.5 text-[var(--color-primary)]" />
                    <p className="text-base font-bold text-white">{stat.valeur}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">{stat.label}</p>
                  </div>
                )
              })}
            </div>

            {/* Commerces fictifs */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Ils nous font confiance</h3>
              {commerces.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-xl p-3 animate-fade-slide"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/15 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-[var(--color-primary)]">{c.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{c.nom}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">{c.ville} — {c.secteur}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-[var(--color-primary)]">{c.clients}</p>
                    <p className="text-[9px] text-[var(--color-text-muted)]">clients</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Témoignage */}
            <div className="bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-xl p-4">
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={14} className="text-[var(--color-primary)] fill-[var(--color-primary)]" />
                ))}
              </div>
              <p className="text-xs text-white/90 italic leading-relaxed mb-3">
                « Depuis qu'on utilise LB Stay Cloud, on a réduit nos erreurs de caisse de 80% et nos clients reçoivent leur facture WhatsApp en temps réel. »
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center">
                  <UserCheck size={12} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-white">Marie-Claire Fotso</p>
                  <p className="text-[10px] text-[var(--color-text-muted)]">Gérante — Restaurant Chez Mama, Yaoundé</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ═══ TOAST SUCCÈS ═══ */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[70] animate-fade-slide">
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[var(--color-card)] border border-[var(--color-success)] shadow-2xl shadow-[var(--color-success)]/20">
            <CheckCircle size={18} className="text-[var(--color-success)] shrink-0" />
            <span className="text-sm text-white font-medium">{toast}</span>
          </div>
        </div>
      )}
    </div>
  )
}
