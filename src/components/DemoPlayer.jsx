import { useDemo } from '../context/DemoContext'
import { ChevronLeft, ChevronRight, Play, Pause, Palette } from 'lucide-react'

const stepLabels = [
  'Accueil & Sélection Secteur',
  'Fonctionnalités & Tarifs',
  'Connexion & Rôles',
  'Dashboard Principal',
  'Point de Vente (POS)',
  'Rapports & Analyses',
  'CRM & Clients',
  'WhatsApp & Notifications',
  'Gestion Hôtelière',
  'Super Admin',
  'Onboarding & White-Label',
  'Guide de Démarrage',
  'Écran Final',
]

export default function DemoPlayer() {
  const {
    currentStep, nextStep, prevStep,
    isAutoPlay, setIsAutoPlay,
    totalSteps, setShowWhiteLabel,
  } = useDemo()

  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-[var(--color-card)] border-t-2 border-[var(--color-primary)] flex items-center justify-between px-6 gap-4">
      <div className="absolute top-0 left-0 h-0.5 bg-[var(--color-primary)] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />

      <button
        onClick={prevStep}
        disabled={currentStep === 0}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={18} />
        Precedent
      </button>

      <div className="flex items-center gap-4 flex-1 justify-center">
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium bg-[var(--color-primary)] text-[var(--color-bg-main)] hover:brightness-110 transition-all"
        >
          {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
          {isAutoPlay ? 'Pause' : 'Lancer la visite'}
        </button>

        <div className="flex flex-col items-center">
          <span className="text-xs text-[var(--color-text-muted)]">
            Etape {currentStep + 1} / {totalSteps}
          </span>
          <span className="text-xs text-[var(--color-secondary)] font-medium truncate max-w-48">
            {stepLabels[currentStep]}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowWhiteLabel(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--color-secondary)] border border-[var(--color-secondary)]/30 hover:bg-[var(--color-secondary)]/10 transition-colors"
        >
          <Palette size={16} />
          Personnaliser
        </button>

        <button
          onClick={nextStep}
          disabled={currentStep === totalSteps - 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Suivant
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
