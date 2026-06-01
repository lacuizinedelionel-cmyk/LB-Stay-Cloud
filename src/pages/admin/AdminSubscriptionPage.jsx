import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CreditCard, Check, Zap, Crown, Building2, Shield, Clock,
  Download, ArrowUpRight, AlertCircle, Star
} from 'lucide-react'
import { formatPrice } from '../../lib/utils'
import Badge from '../../components/ui/Badge'

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 9900,
    color: '#8B8FA8',
    popular: false,
    features: ['1 branche', '2 utilisateurs', 'POS basique', 'Rapports simples', 'Support email'],
    limits: { branches: 1, users: 2, orders: 500 },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 24900,
    color: '#F5A623',
    popular: true,
    features: ['Jusqu\'à 5 branches', '10 utilisateurs', 'POS complet', 'Rapports avancés', 'Programme fidélité', 'Support prioritaire', 'API accès'],
    limits: { branches: 5, users: 10, orders: 5000 },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 0,
    color: '#6C63FF',
    popular: false,
    features: ['Branches illimitées', 'Utilisateurs illimités', 'POS + Kitchen Display', 'BI & Analytics', 'Multi-devises', 'Support dédié 24/7', 'SLA 99.9%', 'Formation sur site'],
    limits: { branches: -1, users: -1, orders: -1 },
  },
]

const currentPlan = plans[1]

const invoices = [
  { id: 'INV-2026-05', date: '01/05/2026', amount: 24900, status: 'paid' },
  { id: 'INV-2026-04', date: '01/04/2026', amount: 24900, status: 'paid' },
  { id: 'INV-2026-03', date: '01/03/2026', amount: 24900, status: 'paid' },
  { id: 'INV-2026-02', date: '01/02/2026', amount: 24900, status: 'paid' },
  { id: 'INV-2026-01', date: '01/01/2026', amount: 24900, status: 'paid' },
  { id: 'INV-2025-12', date: '01/12/2025', amount: 24900, status: 'paid' },
]

const usage = [
  { label: 'Branches', current: 3, max: 5, pct: 60 },
  { label: 'Utilisateurs', current: 8, max: 10, pct: 80 },
  { label: 'Commandes/mois', current: 3520, max: 5000, pct: 70 },
]

export default function AdminSubscriptionPage() {
  const [billingPeriod, setBillingPeriod] = useState('monthly')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Abonnement</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Gérez votre plan et votre facturation</p>
      </div>

      {/* Current plan */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `color-mix(in srgb, ${currentPlan.color} 15%, transparent)` }}>
              <Crown size={24} style={{ color: currentPlan.color }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Plan {currentPlan.name}</h2>
                <Badge variant="gold">Actif</Badge>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">Renouvellement le 01/06/2026</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[var(--color-gold)]">{formatPrice(currentPlan.price)}<span className="text-sm font-normal text-[var(--color-text-muted)]">/mois</span></p>
            <p className="text-xs text-[var(--color-text-muted)]">Facturé mensuellement</p>
          </div>
        </div>

        {/* Usage */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[var(--color-border)]">
          {usage.map(u => (
            <div key={u.label}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[var(--color-text-secondary)]">{u.label}</span>
                <span className="text-xs font-semibold text-white">{u.current.toLocaleString('fr-FR')} / {u.max.toLocaleString('fr-FR')}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[var(--color-bg-main)] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${u.pct >= 80 ? 'bg-[var(--color-warning)]' : 'bg-[var(--color-gold)]'}`}
                  style={{ width: `${u.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Plans comparison */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white">Changer de plan</h3>
          <div className="flex bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl overflow-hidden">
            <button onClick={() => setBillingPeriod('monthly')} className={`px-4 py-2 text-xs font-semibold transition-all ${billingPeriod === 'monthly' ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)]' : 'text-[var(--color-text-muted)] hover:text-white'}`}>Mensuel</button>
            <button onClick={() => setBillingPeriod('yearly')} className={`px-4 py-2 text-xs font-semibold transition-all ${billingPeriod === 'yearly' ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)]' : 'text-[var(--color-text-muted)] hover:text-white'}`}>Annuel <span className="text-[var(--color-success)]">-20%</span></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => {
            const isCurrent = plan.id === currentPlan.id
            const price = billingPeriod === 'yearly' ? Math.round(plan.price * 0.8) : plan.price
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`glass-card p-6 relative ${isCurrent ? 'border-[var(--color-gold)]/40' : ''} ${plan.popular ? 'ring-1 ring-[var(--color-gold)]/30' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-gold)] text-[var(--color-bg-main)] text-[10px] font-bold px-3 py-1 rounded-full">Populaire</div>
                )}
                <div className="text-center mb-5">
                  <h4 className="text-lg font-bold" style={{ color: plan.color }}>{plan.name}</h4>
                  <div className="mt-2">
                    {plan.price === 0 ? (
                      <p className="text-2xl font-bold text-white">Sur devis</p>
                    ) : (
                      <p className="text-2xl font-bold text-white">{formatPrice(price)}<span className="text-sm font-normal text-[var(--color-text-muted)]">/mois</span></p>
                    )}
                  </div>
                </div>

                <div className="space-y-2.5 mb-6">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                      <Check size={12} style={{ color: plan.color }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  disabled={isCurrent}
                  className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${isCurrent ? 'bg-[var(--color-bg-main)] border border-[var(--color-border)] text-[var(--color-text-muted)] cursor-default' : 'btn-primary'}`}
                >
                  {isCurrent ? 'Plan actuel' : plan.price === 0 ? 'Nous contacter' : 'Passer au ' + plan.name}
                </button>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Invoices */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-white">Historique de facturation</h3>
          <button className="btn-secondary flex items-center gap-2 text-xs py-2 px-3"><Download size={13} /> Tout télécharger</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
                <th className="pb-3 font-medium">N° Facture</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Montant</th>
                <th className="pb-3 font-medium">Statut</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id} className="border-t border-[var(--color-border)]">
                  <td className="py-3 text-white font-medium">{inv.id}</td>
                  <td className="py-3 text-[var(--color-text-secondary)]">{inv.date}</td>
                  <td className="py-3 text-white font-semibold">{formatPrice(inv.amount)}</td>
                  <td className="py-3"><Badge variant="success">Payé</Badge></td>
                  <td className="py-3 text-right">
                    <button className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-all"><Download size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
