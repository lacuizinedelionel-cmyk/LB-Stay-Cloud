import { cn } from '../../lib/utils'

const variants = {
  success: 'badge-success',
  danger: 'badge-danger',
  warning: 'badge-warning',
  info: 'badge-info',
  gold: 'badge-gold',
}

export default function Badge({ variant = 'gold', children, className }) {
  return (
    <span className={cn('badge', variants[variant], className)}>
      {children}
    </span>
  )
}
