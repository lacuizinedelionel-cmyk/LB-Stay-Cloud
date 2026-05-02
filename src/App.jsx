import { useDemo } from './context/DemoContext'
import DemoPlayer from './components/DemoPlayer'
import WhiteLabelPanel from './components/WhiteLabelPanel'
import Step0_Accueil from './steps/Step0_Accueil'
import Step1_Features from './steps/Step1_Features'
import Step2_Auth from './steps/Step2_Auth'
import Step3_Dashboard from './steps/Step1_Dashboard'
import Step4_POS from './steps/Step2_POS'
import Step5_Rapports from './steps/Step3_Rapports'
import Step6_CRM from './steps/Step4_CRM'
import Step7_WhatsApp from './steps/Step5_WhatsApp'
import Step8_Hotel from './steps/Step6_Hotel'
import Step9_SuperAdmin from './steps/Step7_SuperAdmin'
import Step10_Onboarding from './steps/Step8_Onboarding'
import Step11_Guide from './steps/Step9_Guide'
import Step12_Final from './steps/Step10_Final'

const steps = [
  Step0_Accueil,
  Step1_Features,
  Step2_Auth,
  Step3_Dashboard,
  Step4_POS,
  Step5_Rapports,
  Step6_CRM,
  Step7_WhatsApp,
  Step8_Hotel,
  Step9_SuperAdmin,
  Step10_Onboarding,
  Step11_Guide,
  Step12_Final,
]

export default function App() {
  const { currentStep } = useDemo()
  const StepComponent = steps[currentStep]

  return (
    <div className="min-h-screen pb-16" style={{ backgroundColor: 'var(--color-bg-main)' }}>
      <div className="max-w-7xl mx-auto">
        <StepComponent key={currentStep} />
      </div>
      <DemoPlayer />
      <WhiteLabelPanel />
    </div>
  )
}
