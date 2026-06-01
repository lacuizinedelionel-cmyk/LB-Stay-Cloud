import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User, Mail, Phone, MapPin, Camera, Save, Shield,
  Eye, EyeOff, Calendar, Building2
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { getInitials } from '../../lib/utils'
import Badge from '../../components/ui/Badge'
import toast from 'react-hot-toast'

export default function AdminProfilePage() {
  const { profile, restaurant } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    full_name: profile?.full_name || 'Jean Kamga',
    email: profile?.email || 'demo@lbcloud.cm',
    phone: profile?.phone || '+237 6 99 00 00 00',
    role: profile?.role || 'admin',
    city: 'Douala',
    bio: 'Propriétaire et gérant de Restaurant Chez Mama depuis 2023. Passionné de gastronomie camerounaise.',
  })

  function handleSave(e) {
    e.preventDefault()
    toast.success('Profil mis à jour !')
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Mon Profil</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Gérez vos informations personnelles</p>
      </div>

      {/* Profile header card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-accent)] flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-[var(--color-gold)]/20">
              {getInitials(form.full_name)}
            </div>
            <div className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <Camera size={20} className="text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{form.full_name}</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">{form.email}</p>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant="gold">Administrateur</Badge>
              <span className="text-[10px] text-[var(--color-text-muted)] flex items-center gap-1">
                <Building2 size={10} /> {restaurant?.name || 'Restaurant Chez Mama'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Edit form */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
        <h3 className="text-base font-bold text-white mb-5">Informations personnelles</h3>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Nom complet</label>
              <div className="relative">
                <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input type="text" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} className="input text-sm pl-10" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input text-sm pl-10" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Téléphone</label>
              <div className="relative">
                <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input text-sm pl-10" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Ville</label>
              <div className="relative">
                <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input type="text" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="input text-sm pl-10" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Bio</label>
            <textarea rows={3} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} className="input text-sm resize-none" />
          </div>

          <button type="submit" className="btn-primary flex items-center gap-2 text-sm py-3 px-6"><Save size={14} /> Enregistrer les modifications</button>
        </form>
      </motion.div>

      {/* Change password */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
        <h3 className="text-base font-bold text-white mb-5">Changer le mot de passe</h3>
        <form onSubmit={e => { e.preventDefault(); toast.success('Mot de passe modifié !') }} className="space-y-4 max-w-md">
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Mot de passe actuel</label>
            <div className="relative">
              <Shield size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="input text-sm pl-10 pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-white">
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Nouveau mot de passe</label>
            <input type="password" placeholder="Min. 8 caractères" className="input text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Confirmer</label>
            <input type="password" placeholder="Répétez le nouveau mot de passe" className="input text-sm" />
          </div>
          <button type="submit" className="btn-secondary flex items-center gap-2 text-sm py-2.5 px-5"><Shield size={14} /> Mettre à jour</button>
        </form>
      </motion.div>

      {/* Account info */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <h3 className="text-base font-bold text-white mb-4">Informations du compte</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[var(--color-bg-main)] rounded-xl p-4 border border-[var(--color-border)]">
            <p className="text-[10px] text-[var(--color-text-muted)] mb-1">Rôle</p>
            <p className="text-sm font-semibold text-white">Administrateur</p>
          </div>
          <div className="bg-[var(--color-bg-main)] rounded-xl p-4 border border-[var(--color-border)]">
            <p className="text-[10px] text-[var(--color-text-muted)] mb-1">Membre depuis</p>
            <p className="text-sm font-semibold text-white">Mars 2025</p>
          </div>
          <div className="bg-[var(--color-bg-main)] rounded-xl p-4 border border-[var(--color-border)]">
            <p className="text-[10px] text-[var(--color-text-muted)] mb-1">Plan actuel</p>
            <p className="text-sm font-semibold text-[var(--color-gold)]">Pro</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
