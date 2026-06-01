import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageCircle, Send, Search, Phone, Clock, Check, CheckCheck,
  Plus, Settings, Users, Zap, Bot, Image, Paperclip, Smile
} from 'lucide-react'
import { getInitials, formatTime } from '../../lib/utils'
import Badge from '../../components/ui/Badge'
import toast from 'react-hot-toast'

const demoConversations = [
  { id: 'w1', name: 'Marie Fotso', phone: '+237 6 99 12 34 56', lastMessage: 'Merci ! À ce soir pour la réservation', time: '14:28', unread: 0, status: 'read' },
  { id: 'w2', name: 'Paul Ndjock', phone: '+237 6 77 88 99 00', lastMessage: 'Est-ce que vous faites la livraison à Bonabéri ?', time: '14:15', unread: 2, status: 'delivered' },
  { id: 'w3', name: 'Sophie Atangana', phone: '+237 6 80 12 45 67', lastMessage: 'Bonjour, vous faites la livraison à Bonamoussadi ?', time: '13:45', unread: 1, status: 'delivered' },
  { id: 'w4', name: 'David Tchoupo', phone: '+237 6 22 33 44 55', lastMessage: 'Super, je passe récupérer à 19h', time: '12:30', unread: 0, status: 'read' },
  { id: 'w5', name: 'Awa Diallo', phone: '+237 6 55 44 33 22', lastMessage: 'Confirmation de réservation reçue, merci !', time: '11:20', unread: 0, status: 'read' },
  { id: 'w6', name: 'Jean Kamga', phone: '+237 6 90 11 22 33', lastMessage: 'La commande était parfaite comme d\'habitude', time: 'Hier', unread: 0, status: 'read' },
  { id: 'w7', name: 'Fatou Mbaye', phone: '+237 6 78 56 34 12', lastMessage: 'Vous avez des options végétariennes ?', time: 'Hier', unread: 0, status: 'read' },
]

const demoMessages = [
  { id: 'm1', from: 'client', text: 'Bonjour ! Est-ce que vous êtes ouverts ce soir ?', time: '14:02' },
  { id: 'm2', from: 'bot', text: 'Bonjour Marie ! 🙏 Oui, nous sommes ouverts de 08h à 23h. Souhaitez-vous réserver une table ?', time: '14:02', auto: true },
  { id: 'm3', from: 'client', text: 'Oui je voudrais réserver pour 4 personnes à 20h', time: '14:05' },
  { id: 'm4', from: 'bot', text: '✅ Parfait ! Je vous propose la Table T3 (4 places, salle principale) ou le VIP 2 (10 places) pour 20h ce soir. Quel est votre choix ?', time: '14:05', auto: true },
  { id: 'm5', from: 'client', text: 'T3 ça ira très bien merci', time: '14:08' },
  { id: 'm6', from: 'bot', text: '🎉 Réservation confirmée !\n\n📅 Aujourd\'hui à 20h00\n👥 4 personnes\n🪑 Table T3 (Salle principale)\n\nÀ tout à l\'heure Marie ! N\'hésitez pas si vous avez des demandes spéciales.', time: '14:08', auto: true },
  { id: 'm7', from: 'client', text: 'Merci ! À ce soir pour la réservation', time: '14:28' },
]

const templates = [
  { id: 't1', name: 'Confirmation commande', text: 'Bonjour {name} ! Votre commande #{ref} est confirmée. Montant : {total}. Temps estimé : {time} min.' },
  { id: 't2', name: 'Commande prête', text: '{name}, votre commande #{ref} est prête ! Venez la récupérer ou attendez votre livreur.' },
  { id: 't3', name: 'Confirmation réservation', text: 'Réservation confirmée ! {name}, table {table} pour {guests} personnes le {date} à {time}. À bientôt !' },
  { id: 't4', name: 'Promotion', text: '🔥 {name}, profitez de -{discount}% avec le code {code} ! Valable jusqu\'au {end}. Chez Mama vous attend !' },
  { id: 't5', name: 'Avis client', text: '{name}, merci pour votre visite ! Comment avez-vous trouvé votre expérience ? Répondez avec une note de 1 à 5 ⭐' },
]

const botStats = [
  { label: 'Messages aujourd\'hui', value: '84' },
  { label: 'Réponses auto', value: '72%' },
  { label: 'Temps moyen réponse', value: '< 3s' },
  { label: 'Satisfaction', value: '4.7/5' },
]

export default function AdminWhatsAppPage() {
  const [activeConv, setActiveConv] = useState(demoConversations[0])
  const [messages, setMessages] = useState(demoMessages)
  const [inputMsg, setInputMsg] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showTemplates, setShowTemplates] = useState(false)

  const filteredConvs = searchQuery.trim()
    ? demoConversations.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : demoConversations

  function sendMessage(e) {
    e.preventDefault()
    if (!inputMsg.trim()) return
    setMessages(prev => [...prev, { id: `m${Date.now()}`, from: 'staff', text: inputMsg, time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) }])
    setInputMsg('')
    toast.success('Message envoyé')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>WhatsApp Business</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Messagerie automatisée et conversations clients</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-success)]/10 border border-[var(--color-success)]/20">
            <div className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse-dot" />
            <span className="text-xs font-semibold text-[var(--color-success)]">Bot actif</span>
          </div>
          <button onClick={() => setShowTemplates(!showTemplates)} className={`btn-secondary flex items-center gap-2 text-xs py-2 px-3 ${showTemplates ? 'border-[var(--color-gold)]/40 text-[var(--color-gold)]' : ''}`}><Bot size={13} /> Templates</button>
        </div>
      </div>

      {/* Bot stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {botStats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-4 text-center">
            <p className="text-lg font-bold text-[var(--color-success)]">{stat.value}</p>
            <p className="text-[10px] text-[var(--color-text-muted)]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {showTemplates ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-white">Templates de messages</h3>
            <button className="btn-primary flex items-center gap-2 text-xs py-2 px-4"><Plus size={13} /> Nouveau template</button>
          </div>
          <div className="space-y-3">
            {templates.map(t => (
              <div key={t.id} className="p-4 rounded-xl bg-[var(--color-bg-main)] border border-[var(--color-border)]">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <Badge variant="success">Actif</Badge>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        /* Chat interface */
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden" style={{ height: 520 }}>
          <div className="flex h-full">
            {/* Conversations list */}
            <div className="w-80 border-r border-[var(--color-border)] flex flex-col">
              <div className="p-3 border-b border-[var(--color-border)]">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Rechercher..." className="input pl-9 text-xs py-2" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredConvs.map(conv => (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConv(conv)}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all ${activeConv?.id === conv.id ? 'bg-[var(--color-gold)]/5 border-l-2 border-l-[var(--color-gold)]' : 'hover:bg-white/[0.02] border-l-2 border-l-transparent'}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-success)] to-[var(--color-gold)] flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                      {getInitials(conv.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-white truncate">{conv.name}</p>
                        <span className="text-[9px] text-[var(--color-text-muted)]">{conv.time}</span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="text-[10px] text-[var(--color-text-muted)] truncate pr-2">{conv.lastMessage}</p>
                        {conv.unread > 0 && <span className="w-4 h-4 rounded-full bg-[var(--color-success)] text-[8px] font-bold text-white flex items-center justify-center shrink-0">{conv.unread}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col">
              {/* Chat header */}
              <div className="h-14 flex items-center justify-between px-5 border-b border-[var(--color-border)] shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-success)] to-[var(--color-gold)] flex items-center justify-center text-[9px] font-bold text-white">
                    {getInitials(activeConv?.name || '')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{activeConv?.name}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">{activeConv?.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[var(--color-text-muted)]" />
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.from === 'client' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${msg.from === 'client' ? 'bg-[var(--color-bg-main)] border border-[var(--color-border)] text-white rounded-bl-none' : msg.auto ? 'bg-[var(--color-success)]/15 border border-[var(--color-success)]/20 text-white rounded-br-none' : 'bg-[var(--color-gold)]/15 border border-[var(--color-gold)]/20 text-white rounded-br-none'}`}>
                      {msg.auto && <p className="text-[9px] text-[var(--color-success)] font-semibold mb-1 flex items-center gap-1"><Bot size={9} /> Réponse automatique</p>}
                      <p className="whitespace-pre-line">{msg.text}</p>
                      <p className="text-[9px] text-[var(--color-text-muted)] mt-1.5 flex items-center gap-1 justify-end">
                        {msg.time}
                        {msg.from !== 'client' && <CheckCheck size={10} className="text-[var(--color-success)]" />}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={sendMessage} className="p-3 border-t border-[var(--color-border)] flex items-center gap-2 shrink-0">
                <button type="button" className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-white transition-all"><Paperclip size={16} /></button>
                <button type="button" className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-white transition-all"><Image size={16} /></button>
                <input type="text" value={inputMsg} onChange={e => setInputMsg(e.target.value)} placeholder="Écrire un message..." className="input flex-1 text-xs py-2.5" />
                <button type="submit" disabled={!inputMsg.trim()} className="p-2.5 rounded-xl bg-[var(--color-success)] text-white disabled:opacity-40 hover:bg-[var(--color-success)]/90 transition-all"><Send size={16} /></button>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
