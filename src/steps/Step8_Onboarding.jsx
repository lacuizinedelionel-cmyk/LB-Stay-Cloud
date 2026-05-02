import { useState } from 'react'
import { useDemo } from '../context/DemoContext'
import DemoTooltip from '../components/DemoTooltip'
import {
  User, Building2, CreditCard, CheckCircle, ArrowRight, ArrowLeft,
  Rocket, Check, Star, Clock, Shield, Zap, Upload, MapPin,
  GitBranch, Mail, Phone, Lock, Palette
} from 'lucide-react'

const etapesOnboarding = [
  { id: 0, label: 'Votre compte', icon: User, desc: 'Créez votre accès' },
  { id: 1, label: 'Votre commerce', icon: Building2, desc: 'Décrivez votre activité' },
  { id: 2, label: 'Choisir un plan', icon: CreditCard, desc: 'Sélectionnez votre offre' },
  { id: 3, label: 'Confirmation', icon: CheckCircle, desc: 'Lancez-vous !' },
]

const secteurs = [
  { id: 'restaurant', label: 'Restauration' },
  { id: 'epicerie', label: 'Épicerie / Supermarché' },
  { id: 'beaute', label: 'Salon de beauté' },
  { id: 'hotel', label: 'Hôtel / Hébergement' },
  { id: 'sante', label: 'Santé / Pharmacie' },
  { id: 'garage', label: 'Garage / Mécanique' },
]

const villes = ['Douala', 'Yaoundé', 'Bafoussam', 'Bamenda', 'Kribi', 'Garoua', 'Maroua', 'Bertoua', 'Limbé', 'Buea']

const plans = [
  {
    nom: 'STARTER',
    prixMensuel: '9 900',
    prixAnnuel: '7 920',
    desc: 'Pour démarrer avec un seul point de vente.',
    populaire: false,
    fonctionnalites: ['1 utilisateur', '1 branche', 'POS complet', 'Rapports basiques', 'Support e-mail'],
  },
  {
    nom: 'PRO',
    prixMensuel: '24 900',
    prixAnnuel: '19 920',
    desc: 'Le plan le plus choisi — tout pour croître.',
    populaire: true,
    fonctionnalites: ['5 utilisateurs', '3 branches', 'Tous les modules', 'CRM & WhatsApp', 'Export PDF/Excel', 'Support prioritaire'],
  },
  {
    nom: 'ENTERPRISE',
    prixMensuel: 'Sur devis',
    prixAnnuel: 'Sur devis',
    desc: 'Solution complète et sur mesure.',
    populaire: false,
    fonctionnalites: ['Utilisateurs illimités', 'Branches illimitées', 'White-label complet', 'API & intégrations', 'Support dédié 24/7', 'SLA 99,9%'],
  },
]

const promesses = [
  { icone: Clock, texte: 'Opérationnel en 15 minutes' },
  { icone: Shield, texte: 'Données sécurisées et chiffrées' },
  { icone: Zap, texte: 'Aucune installation requise' },
  { icone: Star, texte: 'Essai gratuit 14 jours — sans CB' },
]

export default function Step10_Onboarding() {
  const { setShowWhiteLabel } = useDemo()
  const [etapeActive, setEtapeActive] = useState(0)
  const [annuel, setAnnuel] = useState(false)
  const [planChoisi, setPlanChoisi] = useState('PRO')
  const [formulaire, setFormulaire] = useState({
    nom: '', prenom: '', email: '', motDePasse: '',
    nomCommerce: '', secteur: 'restaurant', ville: 'Douala', branches: '1', telephone: '',
  })
  const [confirme, setConfirme] = useState(false)

  const maj = (champ, valeur) => setFormulaire(prev => ({ ...prev, [champ]: valeur }))

  const suivant = () => setEtapeActive(e => Math.min(e + 1, 3))
  const precedent = () => setEtapeActive(e => Math.max(e - 1, 0))

  const handleConfirmer = () => {
    setConfirme(true)
  }

  return (
    <div className="animate-fade-slide min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">

        {/* ═══ GAUCHE — FORMULAIRE (60%) ═══ */}
        <div className="lg:w-[60%] p-6 sm:p-10 overflow-y-auto">
          <div className="max-w-lg mx-auto">
            {/* Titre */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-title)]">
                Créez votre espace <span className="text-[var(--color-primary)]">LB Stay Cloud</span>
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">Complétez les 4 étapes pour commencer</p>
            </div>

            {/* ═══ STEPPER ═══ */}
            <DemoTooltip label="Onboarding guidé en 4 étapes — progression visuelle" position="bottom" highlight>
              <div className="flex items-center gap-2 mb-10">
                {etapesOnboarding.map((etape, i) => {
                  const Icon = etape.icon
                  const actif = i === etapeActive
                  const termine = i < etapeActive
                  return (
                    <div key={etape.id} className="flex items-center gap-2 flex-1">
                      <button
                        onClick={() => setEtapeActive(i)}
                        className="flex items-center gap-2 group"
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                          termine ? 'bg-[var(--color-success)]' : actif ? 'bg-[var(--color-primary)] ring-4 ring-[var(--color-primary)]/20' : 'bg-[var(--color-border)]'
                        }`}>
                          {termine ? <Check size={16} className="text-white" /> : <Icon size={16} className={actif ? 'text-[var(--color-bg-main)]' : 'text-[var(--color-text-muted)]'} />}
                        </div>
                        <div className="hidden sm:block">
                          <p className={`text-[10px] font-semibold ${actif ? 'text-[var(--color-primary)]' : termine ? 'text-[var(--color-success)]' : 'text-[var(--color-text-muted)]'}`}>{etape.label}</p>
                        </div>
                      </button>
                      {i < etapesOnboarding.length - 1 && (
                        <div className={`flex-1 h-0.5 rounded ${termine ? 'bg-[var(--color-success)]' : 'bg-[var(--color-border)]'}`} />
                      )}
                    </div>
                  )
                })}
              </div>
            </DemoTooltip>

            {/* ═══ CONTENU ÉTAPES ═══ */}
            <div className="animate-fade-slide" key={etapeActive}>

              {/* ÉTAPE 0 — Votre compte */}
              {etapeActive === 0 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-title)]">Votre compte</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Champ label="Prénom" icone={User} valeur={formulaire.prenom} onChange={v => maj('prenom', v)} placeholder="Jean-Pierre" />
                    <Champ label="Nom" icone={User} valeur={formulaire.nom} onChange={v => maj('nom', v)} placeholder="Kamga" />
                  </div>
                  <Champ label="Adresse e-mail" icone={Mail} type="email" valeur={formulaire.email} onChange={v => maj('email', v)} placeholder="jp.kamga@email.cm" />
                  <Champ label="Mot de passe" icone={Lock} type="password" valeur={formulaire.motDePasse} onChange={v => maj('motDePasse', v)} placeholder="Minimum 8 caractères" />
                </div>
              )}

              {/* ÉTAPE 1 — Votre commerce */}
              {etapeActive === 1 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-title)]">Votre commerce</h3>
                  <Champ label="Nom de l'établissement" icone={Building2} valeur={formulaire.nomCommerce} onChange={v => maj('nomCommerce', v)} placeholder="Restaurant Chez Mama" />
                  <Champ label="Téléphone" icone={Phone} valeur={formulaire.telephone} onChange={v => maj('telephone', v)} placeholder="+237 6XX XXX XXX" />

                  <DemoTooltip label="Sélecteur de secteur — adapte toute la plateforme" position="right" highlight>
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5">Secteur d'activité</label>
                      <div className="grid grid-cols-2 gap-2">
                        {secteurs.map(s => (
                          <button
                            key={s.id}
                            onClick={() => maj('secteur', s.id)}
                            className={`px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                              formulaire.secteur === s.id
                                ? 'bg-[var(--color-primary)]/15 border-2 border-[var(--color-primary)] text-[var(--color-primary)]'
                                : 'bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-white hover:border-white/20'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </DemoTooltip>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5">Ville</label>
                      <select
                        value={formulaire.ville}
                        onChange={e => maj('ville', e.target.value)}
                        className="w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl px-3 py-3 text-sm text-white outline-none focus:border-[var(--color-primary)] cursor-pointer"
                      >
                        {villes.map(v => <option key={v} value={v} className="bg-[var(--color-card)]">{v}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5">Nombre de branches</label>
                      <select
                        value={formulaire.branches}
                        onChange={e => maj('branches', e.target.value)}
                        className="w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl px-3 py-3 text-sm text-white outline-none focus:border-[var(--color-primary)] cursor-pointer"
                      >
                        {['1', '2', '3', '4', '5', '10+'].map(n => <option key={n} value={n} className="bg-[var(--color-card)]">{n}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5">Logo (optionnel)</label>
                    <div className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-6 text-center hover:border-[var(--color-primary)]/40 transition-colors cursor-pointer">
                      <Upload size={24} className="mx-auto mb-2 text-[var(--color-text-muted)]" />
                      <p className="text-xs text-[var(--color-text-muted)]">Glissez votre logo ici ou <span className="text-[var(--color-primary)]">parcourir</span></p>
                      <p className="text-[9px] text-[var(--color-text-muted)] mt-1">PNG, JPG, SVG — max 2 Mo</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ÉTAPE 2 — Choisir un plan */}
              {etapeActive === 2 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white font-[family-name:var(--font-title)]">Choisir un plan</h3>
                    <DemoTooltip label="Paiement annuel : -20% sur tous les plans" position="left" highlight>
                      <div className="flex items-center gap-2 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-1">
                        <button
                          onClick={() => setAnnuel(false)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${!annuel ? 'bg-[var(--color-primary)] text-[var(--color-bg-main)]' : 'text-[var(--color-text-muted)]'}`}
                        >
                          Mensuel
                        </button>
                        <button
                          onClick={() => setAnnuel(true)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${annuel ? 'bg-[var(--color-primary)] text-[var(--color-bg-main)]' : 'text-[var(--color-text-muted)]'}`}
                        >
                          Annuel <span className={`text-[9px] ${annuel ? 'text-[var(--color-bg-main)]' : 'text-[var(--color-success)]'} font-bold`}>-20%</span>
                        </button>
                      </div>
                    </DemoTooltip>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {plans.map((plan, i) => {
                      const prix = annuel ? plan.prixAnnuel : plan.prixMensuel
                      const actif = planChoisi === plan.nom
                      return (
                        <button
                          key={i}
                          onClick={() => setPlanChoisi(plan.nom)}
                          className={`relative text-left rounded-2xl p-5 border transition-all ${
                            actif
                              ? 'bg-[var(--color-primary)]/5 border-[var(--color-primary)] shadow-xl shadow-[var(--color-primary)]/10'
                              : 'bg-[var(--color-card)] border-[var(--color-border)] hover:border-[var(--color-primary)]/30'
                          }`}
                        >
                          {plan.populaire && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[9px] font-bold bg-[var(--color-primary)] text-[var(--color-bg-main)]">
                              <Star size={10} /> PLUS POPULAIRE
                            </span>
                          )}
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-[var(--color-text-muted)] tracking-wider">{plan.nom}</span>
                            {actif && <CheckCircle size={16} className="text-[var(--color-primary)]" />}
                          </div>
                          {prix === 'Sur devis' ? (
                            <p className="text-2xl font-bold text-white mb-1">Sur devis</p>
                          ) : (
                            <div className="flex items-baseline gap-1 mb-1">
                              <span className="text-2xl font-bold text-white">{prix}</span>
                              <span className="text-[10px] text-[var(--color-text-muted)]">XAF/{annuel ? 'mois facturé annuellement' : 'mois'}</span>
                            </div>
                          )}
                          <p className="text-[10px] text-[var(--color-text-muted)] mb-3">{plan.desc}</p>
                          <ul className="space-y-1.5">
                            {plan.fonctionnalites.map((f, j) => (
                              <li key={j} className="flex items-center gap-2 text-[10px] text-[var(--color-text-muted)]">
                                <Check size={12} className="text-[var(--color-success)] shrink-0" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </button>
                      )
                    })}
                  </div>
                  <p className="text-[10px] text-[var(--color-text-muted)] text-center">TVA 19,25% incluse — Orange Money, MTN MoMo, Virement, CB</p>
                </div>
              )}

              {/* ÉTAPE 3 — Confirmation */}
              {etapeActive === 3 && !confirme && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-title)]">Confirmation & Lancement</h3>

                  <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-5 space-y-4">
                    <h4 className="text-sm font-semibold text-white">Récapitulatif</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Recap label="Compte" valeur={formulaire.email || 'jp.kamga@email.cm'} />
                      <Recap label="Commerce" valeur={formulaire.nomCommerce || 'Restaurant Chez Mama'} />
                      <Recap label="Secteur" valeur={secteurs.find(s => s.id === formulaire.secteur)?.label} />
                      <Recap label="Ville" valeur={formulaire.ville} />
                      <Recap label="Branches" valeur={formulaire.branches} />
                      <Recap label="Plan" valeur={planChoisi} />
                    </div>
                  </div>

                  <DemoTooltip label="Lancez votre espace — opérationnel en 15 minutes !" position="top" highlight>
                    <button
                      onClick={handleConfirmer}
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-base font-bold bg-[var(--color-primary)] text-[var(--color-bg-main)] hover:brightness-110 transition-all shadow-xl shadow-[var(--color-primary)]/20"
                    >
                      <Rocket size={20} />
                      Lancer mon espace LB Stay Cloud
                    </button>
                  </DemoTooltip>

                  <button
                    onClick={() => setShowWhiteLabel(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium border border-[var(--color-secondary)]/30 text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/10 transition-colors"
                  >
                    <Palette size={16} />
                    Personnaliser l'apparence (White-Label)
                  </button>
                </div>
              )}

              {/* ÉTAPE 3 — Succès */}
              {etapeActive === 3 && confirme && (
                <div className="text-center py-8 animate-fade-slide">
                  <div className="w-20 h-20 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-[var(--color-success)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 font-[family-name:var(--font-title)]">
                    Votre espace est prêt !
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] max-w-sm mx-auto mb-6">
                    Félicitations ! Votre espace <strong className="text-[var(--color-primary)]">{formulaire.nomCommerce || 'Restaurant Chez Mama'}</strong> est configuré et opérationnel.
                  </p>
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-sm font-medium text-[var(--color-primary)]">
                    <Rocket size={16} />
                    Accéder au Dashboard →
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            {!(etapeActive === 3 && confirme) && (
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-[var(--color-border)]">
                <button
                  onClick={precedent}
                  disabled={etapeActive === 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-[var(--color-text-muted)] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft size={14} /> Précédent
                </button>
                {etapeActive < 3 && (
                  <button
                    onClick={suivant}
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-[var(--color-primary)] text-[var(--color-bg-main)] hover:brightness-110 transition-all"
                  >
                    Suivant <ArrowRight size={14} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ═══ DROITE — GUIDE VISUEL (40%) ═══ */}
        <DemoTooltip label="Panneau d'accompagnement — guide visuel et promesses" position="left">
          <div className="lg:w-[40%] bg-gradient-to-br from-[var(--color-card)] to-[var(--color-bg-main)] border-l border-[var(--color-border)] flex items-center justify-center p-6 sm:p-10">
            <div className="max-w-sm space-y-8">
              {/* Illustration */}
              <div className="text-center">
                <div className="w-24 h-24 rounded-3xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-6 animate-float">
                  <Rocket size={40} className="text-[var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-title)] mb-2">
                  Opérationnel en <span className="text-[var(--color-primary)]">15 minutes</span>
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Suivez les 4 étapes et commencez à gérer votre commerce immédiatement.
                </p>
              </div>

              {/* Promesses */}
              <div className="space-y-3">
                {promesses.map((p, i) => {
                  const Icon = p.icone
                  return (
                    <div key={i} className="flex items-center gap-3 bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-xl p-3">
                      <div className="p-2 rounded-lg bg-[var(--color-primary)]/10">
                        <Icon size={16} className="text-[var(--color-primary)]" />
                      </div>
                      <span className="text-xs text-white font-medium">{p.texte}</span>
                    </div>
                  )
                })}
              </div>

              {/* Progression visuelle */}
              <div className="bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[var(--color-text-muted)]">Progression</span>
                  <span className="text-xs font-bold text-[var(--color-primary)]">{Math.round(((etapeActive + (confirme ? 1 : 0)) / 4) * 100)}%</span>
                </div>
                <div className="h-2.5 bg-[var(--color-border)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] transition-all duration-500"
                    style={{ width: `${((etapeActive + (confirme ? 1 : 0)) / 4) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  {etapesOnboarding.map((e, i) => (
                    <span key={i} className={`text-[8px] ${i <= etapeActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`}>
                      {e.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Témoignage */}
              <div className="bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-xl p-4">
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={12} className="text-[var(--color-primary)] fill-[var(--color-primary)]" />
                  ))}
                </div>
                <p className="text-[11px] text-white/90 italic leading-relaxed mb-2">
                  « J'ai configuré mon restaurant en 10 minutes. Le lendemain, mes caissiers utilisaient déjà le POS sans aucune formation. »
                </p>
                <p className="text-[10px] text-[var(--color-text-muted)]">— Paul Ndjock, gérant à Bafoussam</p>
              </div>
            </div>
          </div>
        </DemoTooltip>
      </div>
    </div>
  )
}

function Champ({ label, icone: Icon, type = 'text', valeur, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5">{label}</label>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />}
        <input
          type={type}
          value={valeur}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 text-sm text-white placeholder:text-[var(--color-text-muted)]/50 outline-none focus:border-[var(--color-primary)] transition-colors`}
        />
      </div>
    </div>
  )
}

function Recap({ label, valeur }) {
  return (
    <div className="bg-[var(--color-bg-main)] rounded-xl p-3">
      <p className="text-[9px] text-[var(--color-text-muted)] uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-xs text-white font-medium">{valeur}</p>
    </div>
  )
}
