import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const TOTAL_STEPS = 13

const defaultBrandConfig = {
  primaryColor: '#F4A623',
  secondaryColor: '#C8A96E',
  bgColor: '#1A1A28',
  cardColor: '#252538',
  logo: null,
  companyName: 'LB Stay Cloud',
  slogan: 'Plateforme SaaS de Gestion Multi-Secteurs — 100% Afrique',
  fontTitle: "'Playfair Display', serif",
  fontBody: "'Inter', sans-serif",
}

const stepTitles = [
  'Accueil',
  'Fonctionnalités & Tarifs',
  'Connexion & Rôles',
  'Dashboard',
  'Point de Vente',
  'Rapports & Analyses',
  'CRM & Clients',
  'WhatsApp',
  'Gestion Hôtelière',
  'Super Admin',
  'Onboarding',
  'Guide de Démarrage',
  'Écran Final',
]

const DemoContext = createContext(null)

export function DemoProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [selectedSector, setSelectedSector] = useState('hotel')
  const [brandConfig, setBrandConfig] = useState(defaultBrandConfig)
  const [showWhiteLabel, setShowWhiteLabel] = useState(false)

  const nextStep = useCallback(() => {
    setCurrentStep(s => Math.min(s + 1, TOTAL_STEPS - 1))
  }, [])

  const prevStep = useCallback(() => {
    setCurrentStep(s => Math.max(s - 1, 0))
  }, [])

  const goToStep = useCallback((step) => {
    setCurrentStep(Math.max(0, Math.min(step, TOTAL_STEPS - 1)))
  }, [])

  const updateBrand = useCallback((updates) => {
    setBrandConfig(prev => ({ ...prev, ...updates }))
  }, [])

  const resetBrand = useCallback(() => {
    setBrandConfig(defaultBrandConfig)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--brand-primary', brandConfig.primaryColor)
    root.style.setProperty('--brand-secondary', brandConfig.secondaryColor)
    root.style.setProperty('--brand-bg', brandConfig.bgColor)
    root.style.setProperty('--brand-card', brandConfig.cardColor)
    root.style.setProperty('--brand-font-title', brandConfig.fontTitle)
    root.style.setProperty('--brand-font-body', brandConfig.fontBody)
  }, [brandConfig])

  useEffect(() => {
    document.title = `${stepTitles[currentStep] || ''} — ${brandConfig.companyName}`
  }, [currentStep, brandConfig.companyName])

  useEffect(() => {
    if (!isAutoPlay) return
    const timer = setInterval(() => {
      setCurrentStep(s => {
        if (s >= TOTAL_STEPS - 1) {
          setIsAutoPlay(false)
          return s
        }
        return s + 1
      })
    }, 3000)
    return () => clearInterval(timer)
  }, [isAutoPlay])

  return (
    <DemoContext.Provider value={{
      currentStep, setCurrentStep, nextStep, prevStep, goToStep,
      isAutoPlay, setIsAutoPlay,
      selectedSector, setSelectedSector,
      brandConfig, updateBrand, resetBrand,
      showWhiteLabel, setShowWhiteLabel,
      totalSteps: TOTAL_STEPS,
    }}>
      {children}
    </DemoContext.Provider>
  )
}

export function useDemo() {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo must be used within DemoProvider')
  return ctx
}
