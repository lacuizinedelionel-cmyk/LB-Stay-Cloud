import { CURRENCY, TVA_RATE } from './constants'

export function formatPrice(amount) {
  return `${Math.round(amount).toLocaleString('fr-FR')} ${CURRENCY}`
}

export function calculateTVA(subtotal) {
  return Math.round(subtotal * TVA_RATE)
}

export function calculateTotal(subtotal) {
  return subtotal + calculateTVA(subtotal)
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatTime(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function formatDateTime(date) {
  return `${formatDate(date)} ${formatTime(date)}`
}

export function getInitials(name) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function generateOrderRef() {
  const num = Math.floor(Math.random() * 9000) + 1000
  return `CMD-${num}`
}
