import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function KpiCard({ icon: Icon, label, value, change, delay = 0 }) {
  const isPositive = change >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className="glass-card p-5 hover:border-[var(--color-border-active)] transition-all duration-300 group cursor-default"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-xl bg-[var(--color-gold)]/8 group-hover:bg-[var(--color-gold)]/12 transition-colors duration-300">
          <Icon size={20} className="text-[var(--color-gold)]" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
            isPositive
              ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]'
              : 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]'
          }`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {isPositive ? '+' : ''}{change}%
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-[var(--color-text-secondary)]">{label}</p>
    </motion.div>
  )
}
