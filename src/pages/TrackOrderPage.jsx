import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Clock, CheckCircle, ChefHat, Truck, MapPin, Phone,
  UtensilsCrossed, Star, MessageCircle, Package
} from 'lucide-react'

const demoOrder = {
  id: 'CMD-3045',
  restaurant: 'Restaurant Chez Mama',
  branch: 'Douala — Akwa',
  customer: 'Marie',
  type: 'delivery',
  status: 'en_preparation',
  created_at: '2026-05-31T14:32:00',
  estimated_time: 35,
  items: [
    { name: 'Poulet DG', qty: 2, price: 4500 },
    { name: 'Bière 33 Export', qty: 2, price: 1000 },
  ],
  total: 13118,
  payment: 'Orange Money',
  delivery_address: 'Bonamoussadi, près du carrefour Total',
  driver: { name: 'Emmanuel', phone: '+237 6 70 00 00 00' },
}

const steps = [
  { key: 'en_attente', label: 'Commande reçue', icon: CheckCircle, desc: 'Votre commande a été confirmée' },
  { key: 'en_preparation', label: 'En préparation', icon: ChefHat, desc: 'Le chef prépare votre repas' },
  { key: 'pret', label: 'Prête', icon: Package, desc: 'Votre commande est prête' },
  { key: 'en_livraison', label: 'En livraison', icon: Truck, desc: 'Le livreur est en route' },
  { key: 'livre', label: 'Livrée', icon: Star, desc: 'Bon appétit !' },
]

function getStepIndex(status) {
  const idx = steps.findIndex(s => s.key === status)
  return idx >= 0 ? idx : 1
}

export default function TrackOrderPage() {
  const [order] = useState(demoOrder)
  const [now, setNow] = useState(new Date())
  const currentStep = getStepIndex(order.status)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const elapsed = Math.floor((now - new Date(order.created_at)) / 60000)
  const remaining = Math.max(0, order.estimated_time - elapsed)

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-light)] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[var(--color-gold)]/20">
            <UtensilsCrossed size={24} className="text-[var(--color-bg-main)]" />
          </div>
          <h1 className="text-xl font-bold text-white">{order.restaurant}</h1>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">{order.branch}</p>
        </div>

        {/* Order card */}
        <div className="glass-card p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-[var(--color-text-muted)]">Commande</p>
              <p className="text-lg font-bold text-[var(--color-gold)]">{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[var(--color-text-muted)]">Temps restant estimé</p>
              <p className="text-lg font-bold text-white">{remaining > 0 ? `~${remaining} min` : 'Imminente'}</p>
            </div>
          </div>

          {/* Progress steps */}
          <div className="space-y-0 mb-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isCompleted = i < currentStep
              const isCurrent = i === currentStep
              const isFuture = i > currentStep
              return (
                <div key={step.key} className="flex items-start gap-3">
                  {/* Line + dot */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${isCompleted ? 'bg-[var(--color-success)]' : isCurrent ? 'bg-[var(--color-gold)] animate-pulse-gold' : 'bg-[var(--color-bg-main)] border border-[var(--color-border)]'}`}>
                      <Icon size={14} className={isCompleted || isCurrent ? 'text-white' : 'text-[var(--color-text-muted)]'} />
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`w-0.5 h-8 ${isCompleted ? 'bg-[var(--color-success)]' : 'bg-[var(--color-border)]'}`} />
                    )}
                  </div>
                  {/* Text */}
                  <div className="pt-1 pb-4">
                    <p className={`text-sm font-semibold ${isCompleted ? 'text-[var(--color-success)]' : isCurrent ? 'text-[var(--color-gold)]' : 'text-[var(--color-text-muted)]'}`}>{step.label}</p>
                    {(isCompleted || isCurrent) && <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{step.desc}</p>}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Items */}
          <div className="border-t border-[var(--color-border)] pt-4">
            <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Votre commande</p>
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[var(--color-gold)] bg-[var(--color-gold)]/10 w-6 h-6 rounded-md flex items-center justify-center">{item.qty}</span>
                  <span className="text-sm text-white">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-white">{(item.price * item.qty).toLocaleString('fr-FR')} FCFA</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-[var(--color-border)]">
              <span className="text-sm font-bold text-white">Total TTC</span>
              <span className="text-base font-bold text-[var(--color-gold)]">{order.total.toLocaleString('fr-FR')} FCFA</span>
            </div>
          </div>
        </div>

        {/* Delivery info */}
        {order.type === 'delivery' && order.driver && (
          <div className="glass-card p-4 mb-4">
            <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Livraison</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-success)] to-[var(--color-gold)] flex items-center justify-center text-xs font-bold text-white">EM</div>
                <div>
                  <p className="text-sm font-semibold text-white">{order.driver.name}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)] flex items-center gap-1"><MapPin size={9} />{order.delivery_address}</p>
                </div>
              </div>
              <a href={`tel:${order.driver.phone}`} className="p-2.5 rounded-xl bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 text-[var(--color-success)] hover:bg-[var(--color-success)]/20 transition-all">
                <Phone size={16} />
              </a>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center space-y-3">
          <p className="text-xs text-[var(--color-text-muted)]">
            Payé via <span className="text-white font-semibold">{order.payment}</span>
          </p>
          <a href="#" className="inline-flex items-center gap-2 text-xs text-[var(--color-success)] font-semibold hover:underline">
            <MessageCircle size={13} /> Contacter le restaurant
          </a>
          <p className="text-[10px] text-[var(--color-text-muted)]">Propulsé par LB Stay Cloud</p>
        </div>
      </motion.div>
    </div>
  )
}
