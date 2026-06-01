import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Settings, Building2, Bell, Lock, Palette, Globe, Printer,
  Save, User, Mail, Phone, MapPin, Clock, Shield, Eye, EyeOff,
  Check, Smartphone, CreditCard
} from 'lucide-react'
import Badge from '../../components/ui/Badge'
import toast from 'react-hot-toast'

const tabs = [
  { id: 'general', label: 'Général', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Sécurité', icon: Lock },
  { id: 'payments', label: 'Paiements', icon: CreditCard },
  { id: 'printing', label: 'Impression', icon: Printer },
]

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [showPassword, setShowPassword] = useState(false)

  const [general, setGeneral] = useState({
    name: 'Restaurant Chez Mama',
    email: 'contact@chezmama.cm',
    phone: '+237 6 99 12 34 56',
    address: 'Rue de la Joie, Akwa, Douala',
    city: 'Douala',
    hours: '08h00 - 23h00',
    currency: 'FCFA',
    timezone: 'Africa/Douala',
    language: 'fr',
    tva_rate: '19.25',
  })

  const [notifications, setNotifications] = useState({
    new_order: true,
    order_ready: true,
    low_stock: true,
    new_review: false,
    daily_report: true,
    weekly_report: true,
    email_notifs: true,
    sms_notifs: false,
    push_notifs: true,
  })

  const [payments, setPayments] = useState({
    cash: true,
    orange_money: true,
    mtn_momo: true,
    card: false,
    orange_code: '237XXXXXX',
    mtn_code: '237XXXXXX',
  })

  function handleSave() {
    toast.success('Paramètres enregistrés !')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Paramètres</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Configurez votre espace de gestion</p>
        </div>
        <button onClick={handleSave} className="btn-primary flex items-center gap-2 text-sm py-2.5 px-5"><Save size={15} /> Enregistrer</button>
      </div>

      <div className="flex gap-6">
        {/* Tabs sidebar */}
        <div className="w-56 shrink-0 space-y-1">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)]' : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/[0.03]'}`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6">
            {activeTab === 'general' && (
              <div className="space-y-5">
                <h3 className="text-base font-bold text-white mb-4">Informations générales</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Nom du restaurant</label>
                    <input type="text" value={general.name} onChange={e => setGeneral({ ...general, name: e.target.value })} className="input text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Email</label>
                    <input type="email" value={general.email} onChange={e => setGeneral({ ...general, email: e.target.value })} className="input text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Téléphone</label>
                    <input type="tel" value={general.phone} onChange={e => setGeneral({ ...general, phone: e.target.value })} className="input text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Ville</label>
                    <input type="text" value={general.city} onChange={e => setGeneral({ ...general, city: e.target.value })} className="input text-sm" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Adresse complète</label>
                    <input type="text" value={general.address} onChange={e => setGeneral({ ...general, address: e.target.value })} className="input text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Horaires</label>
                    <input type="text" value={general.hours} onChange={e => setGeneral({ ...general, hours: e.target.value })} className="input text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Taux TVA (%)</label>
                    <input type="text" value={general.tva_rate} onChange={e => setGeneral({ ...general, tva_rate: e.target.value })} className="input text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Devise</label>
                    <select value={general.currency} onChange={e => setGeneral({ ...general, currency: e.target.value })} className="input text-sm appearance-none cursor-pointer">
                      <option value="FCFA">FCFA (XAF)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="USD">Dollar (USD)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Langue</label>
                    <select value={general.language} onChange={e => setGeneral({ ...general, language: e.target.value })} className="input text-sm appearance-none cursor-pointer">
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-5">
                <h3 className="text-base font-bold text-white mb-4">Préférences de notification</h3>
                <div className="space-y-1">
                  {[
                    { key: 'new_order', label: 'Nouvelle commande reçue' },
                    { key: 'order_ready', label: 'Commande prête à servir' },
                    { key: 'low_stock', label: 'Alerte stock faible' },
                    { key: 'new_review', label: 'Nouvel avis client' },
                    { key: 'daily_report', label: 'Rapport quotidien' },
                    { key: 'weekly_report', label: 'Rapport hebdomadaire' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                      <span className="text-sm text-[var(--color-text-secondary)]">{item.label}</span>
                      <button
                        onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                        className={`relative w-11 h-6 rounded-full transition-all duration-300 ${notifications[item.key] ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-bg-input)] border border-[var(--color-border)]'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${notifications[item.key] ? 'left-6 bg-[var(--color-bg-main)]' : 'left-1 bg-[var(--color-text-muted)]'}`} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[var(--color-border)]">
                  <h4 className="text-sm font-semibold text-white mb-3">Canaux</h4>
                  {[
                    { key: 'email_notifs', label: 'Email', icon: Mail },
                    { key: 'sms_notifs', label: 'SMS', icon: Smartphone },
                    { key: 'push_notifs', label: 'Push navigateur', icon: Bell },
                  ].map(item => {
                    const Icon = item.icon
                    return (
                      <div key={item.key} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-center gap-2.5">
                          <Icon size={14} className="text-[var(--color-gold)]" />
                          <span className="text-sm text-[var(--color-text-secondary)]">{item.label}</span>
                        </div>
                        <button
                          onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                          className={`relative w-11 h-6 rounded-full transition-all duration-300 ${notifications[item.key] ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-bg-input)] border border-[var(--color-border)]'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${notifications[item.key] ? 'left-6 bg-[var(--color-bg-main)]' : 'left-1 bg-[var(--color-text-muted)]'}`} />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-5">
                <h3 className="text-base font-bold text-white mb-4">Sécurité du compte</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Mot de passe actuel</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="input text-sm pr-10" />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-white">
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Nouveau mot de passe</label>
                    <input type="password" placeholder="Minimum 8 caractères" className="input text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Confirmer</label>
                    <input type="password" placeholder="Répétez le mot de passe" className="input text-sm" />
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)]">
                  <h4 className="text-sm font-semibold text-white mb-3">Authentification à deux facteurs</h4>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)]">
                    <div className="flex items-center gap-3">
                      <Shield size={18} className="text-[var(--color-gold)]" />
                      <div>
                        <p className="text-sm text-white font-medium">2FA activé</p>
                        <p className="text-[10px] text-[var(--color-text-muted)]">Via application authentificateur</p>
                      </div>
                    </div>
                    <Badge variant="success">Actif</Badge>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)]">
                  <h4 className="text-sm font-semibold text-white mb-3">Sessions actives</h4>
                  <div className="space-y-2">
                    {[
                      { device: 'Chrome — Windows 11', location: 'Douala, CM', current: true },
                      { device: 'Safari — iPhone 15', location: 'Douala, CM', current: false },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)]">
                        <div>
                          <p className="text-xs text-white font-medium">{s.device}</p>
                          <p className="text-[10px] text-[var(--color-text-muted)]">{s.location}</p>
                        </div>
                        {s.current ? <Badge variant="gold">Session actuelle</Badge> : <button className="text-xs text-[var(--color-danger)] hover:underline">Déconnecter</button>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="space-y-5">
                <h3 className="text-base font-bold text-white mb-4">Méthodes de paiement acceptées</h3>
                <div className="space-y-3">
                  {[
                    { key: 'cash', label: 'Espèces', desc: 'Paiement en liquide au comptoir' },
                    { key: 'orange_money', label: 'Orange Money', desc: 'Paiement mobile Orange' },
                    { key: 'mtn_momo', label: 'MTN Mobile Money', desc: 'Paiement mobile MTN' },
                    { key: 'card', label: 'Carte bancaire', desc: 'Visa, Mastercard (terminal TPE)' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)]">
                      <div>
                        <p className="text-sm font-medium text-white">{item.label}</p>
                        <p className="text-[10px] text-[var(--color-text-muted)]">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setPayments(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                        className={`relative w-11 h-6 rounded-full transition-all duration-300 ${payments[item.key] ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-bg-input)] border border-[var(--color-border)]'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${payments[item.key] ? 'left-6 bg-[var(--color-bg-main)]' : 'left-1 bg-[var(--color-text-muted)]'}`} />
                      </button>
                    </div>
                  ))}
                </div>

                {payments.orange_money && (
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Code marchand Orange Money</label>
                    <input type="text" value={payments.orange_code} onChange={e => setPayments({ ...payments, orange_code: e.target.value })} className="input text-sm" />
                  </div>
                )}
                {payments.mtn_momo && (
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Code marchand MTN MoMo</label>
                    <input type="text" value={payments.mtn_code} onChange={e => setPayments({ ...payments, mtn_code: e.target.value })} className="input text-sm" />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'printing' && (
              <div className="space-y-5">
                <h3 className="text-base font-bold text-white mb-4">Configuration impression</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)]">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-white">Imprimante thermique</p>
                      <Badge variant="success">Connectée</Badge>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)]">Epson TM-T88VI — USB</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Largeur papier</label>
                      <select className="input text-sm appearance-none cursor-pointer">
                        <option>80mm</option>
                        <option>58mm</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Copies par ticket</label>
                      <select className="input text-sm appearance-none cursor-pointer">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {[
                      { label: 'Impression automatique à la validation', active: true },
                      { label: 'Inclure le logo sur le ticket', active: true },
                      { label: 'Afficher le QR code fidélité', active: false },
                      { label: 'Ticket cuisine séparé', active: true },
                    ].map(item => (
                      <div key={item.label} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                        <span className="text-sm text-[var(--color-text-secondary)]">{item.label}</span>
                        <div className={`relative w-11 h-6 rounded-full ${item.active ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-bg-input)] border border-[var(--color-border)]'}`}>
                          <div className={`absolute top-1 w-4 h-4 rounded-full ${item.active ? 'left-6 bg-[var(--color-bg-main)]' : 'left-1 bg-[var(--color-text-muted)]'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
