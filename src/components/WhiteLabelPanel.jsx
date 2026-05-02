import { useState } from 'react'
import { useDemo } from '../context/DemoContext'
import DemoTooltip from './DemoTooltip'
import {
  X, RotateCcw, Eye, Download, Upload, Palette, Type, Image,
  Phone, Mail, Globe, CheckCircle
} from 'lucide-react'

const presets = [
  { nom: 'LB Stay Cloud (défaut)', primaire: '#F4A623', secondaire: '#C8A96E', fond: '#1A1A28', carte: '#252538' },
  { nom: 'Océan Bleu', primaire: '#3B82F6', secondaire: '#60A5FA', fond: '#0F172A', carte: '#1E293B' },
  { nom: 'Forêt Émeraude', primaire: '#10B981', secondaire: '#34D399', fond: '#0F1F1A', carte: '#1A2F28' },
  { nom: 'Rouge Passion', primaire: '#EF4444', secondaire: '#F87171', fond: '#1A0F0F', carte: '#2A1A1A' },
  { nom: 'Violet Royal', primaire: '#8B5CF6', secondaire: '#A78BFA', fond: '#150F28', carte: '#221A38' },
  { nom: 'Rose Sakura', primaire: '#EC4899', secondaire: '#F472B6', fond: '#1A0F18', carte: '#2A1A28' },
]

const policesTitres = [
  "'Playfair Display', serif",
  "'Georgia', serif",
  "'Merriweather', serif",
  "'Lora', serif",
  "system-ui, sans-serif",
]

const policesCorps = [
  "'Inter', sans-serif",
  "system-ui, sans-serif",
  "'Roboto', sans-serif",
  "'Open Sans', sans-serif",
  "'Nunito', sans-serif",
]

export default function WhiteLabelPanel() {
  const { brandConfig, updateBrand, resetBrand, showWhiteLabel, setShowWhiteLabel } = useDemo()
  const [toast, setToast] = useState(null)
  const [section, setSection] = useState('identite')

  if (!showWhiteLabel) return null

  const exporterConfig = () => {
    const json = JSON.stringify(brandConfig, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'lb-stay-cloud-theme.json'
    a.click()
    URL.revokeObjectURL(url)
    afficherToast('Configuration exportée en JSON')
  }

  const afficherToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const appliquerPreset = (preset) => {
    updateBrand({
      primaryColor: preset.primaire,
      secondaryColor: preset.secondaire,
      bgColor: preset.fond,
      cardColor: preset.carte,
    })
    afficherToast(`Préset "${preset.nom}" appliqué`)
  }

  const sections = [
    { id: 'identite', label: 'Identité', icone: Globe },
    { id: 'couleurs', label: 'Couleurs', icone: Palette },
    { id: 'presets', label: 'Présets', icone: Eye },
    { id: 'typo', label: 'Typographies', icone: Type },
    { id: 'contact', label: 'Contact', icone: Phone },
  ]

  return (
    <div className="fixed inset-0 z-[60] flex">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowWhiteLabel(false)} />

      <DemoTooltip label="Panneau White-Label — personnalisation complète en temps réel" position="left" highlight>
        <div className="relative ml-auto w-[420px] h-full bg-[var(--color-card)] border-l border-[var(--color-border)] flex flex-col animate-fade-slide">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)] shrink-0">
            <div>
              <h3 className="text-base font-bold text-white font-[family-name:var(--font-title)]">Panneau White-Label</h3>
              <p className="text-[10px] text-[var(--color-text-muted)]">Les modifications s'appliquent instantanément</p>
            </div>
            <button onClick={() => setShowWhiteLabel(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X size={18} className="text-[var(--color-text-muted)]" />
            </button>
          </div>

          {/* Onglets */}
          <div className="flex border-b border-[var(--color-border)] px-2 shrink-0 overflow-x-auto scrollbar-hide">
            {sections.map(s => {
              const Icon = s.icone
              return (
                <button
                  key={s.id}
                  onClick={() => setSection(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 text-[10px] font-medium whitespace-nowrap border-b-2 transition-all ${
                    section === s.id
                      ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                      : 'border-transparent text-[var(--color-text-muted)] hover:text-white'
                  }`}
                >
                  <Icon size={12} /> {s.label}
                </button>
              )
            })}
          </div>

          {/* Contenu scrollable */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-hide">

            {/* ═══ IDENTITÉ ═══ */}
            {section === 'identite' && (
              <>
                <Champ label="Nom de l'entreprise">
                  <input
                    type="text"
                    value={brandConfig.companyName}
                    onChange={e => updateBrand({ companyName: e.target.value })}
                    className="w-full bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[var(--color-primary)] transition-colors"
                  />
                </Champ>

                <Champ label="Slogan">
                  <input
                    type="text"
                    value={brandConfig.slogan}
                    onChange={e => updateBrand({ slogan: e.target.value })}
                    className="w-full bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[var(--color-primary)] transition-colors"
                  />
                </Champ>

                <Champ label="Logo">
                  <div className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-6 text-center hover:border-[var(--color-primary)]/40 transition-colors cursor-pointer">
                    <Upload size={20} className="mx-auto mb-2 text-[var(--color-text-muted)]" />
                    <p className="text-[10px] text-[var(--color-text-muted)]">Glissez votre logo ou <span className="text-[var(--color-primary)]">parcourir</span></p>
                  </div>
                </Champ>

                <Champ label="Image Hero (page d'accueil)">
                  <div className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-4 text-center hover:border-[var(--color-primary)]/40 transition-colors cursor-pointer">
                    <Image size={18} className="mx-auto mb-1.5 text-[var(--color-text-muted)]" />
                    <p className="text-[10px] text-[var(--color-text-muted)]">Image d'arrière-plan hero</p>
                  </div>
                </Champ>

                {/* Aperçu live */}
                <div className="bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-xl p-4">
                  <p className="text-[9px] text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Aperçu en direct</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-[var(--color-primary)]">
                        {brandConfig.companyName.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--color-primary)] font-[family-name:var(--font-title)]">{brandConfig.companyName}</p>
                      <p className="text-[9px] text-[var(--color-text-muted)] truncate max-w-48">{brandConfig.slogan}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ═══ COULEURS ═══ */}
            {section === 'couleurs' && (
              <>
                <CouleurChamp label="Couleur primaire" valeur={brandConfig.primaryColor} onChange={v => updateBrand({ primaryColor: v })} />
                <CouleurChamp label="Couleur secondaire" valeur={brandConfig.secondaryColor} onChange={v => updateBrand({ secondaryColor: v })} />
                <CouleurChamp label="Fond principal" valeur={brandConfig.bgColor} onChange={v => updateBrand({ bgColor: v })} />
                <CouleurChamp label="Fond cartes / panneaux" valeur={brandConfig.cardColor} onChange={v => updateBrand({ cardColor: v })} />

                {/* Aperçu palette */}
                <div className="bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-xl p-4">
                  <p className="text-[9px] text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Aperçu de la palette</p>
                  <div className="flex gap-2">
                    {[
                      { label: 'Primaire', couleur: brandConfig.primaryColor },
                      { label: 'Secondaire', couleur: brandConfig.secondaryColor },
                      { label: 'Fond', couleur: brandConfig.bgColor },
                      { label: 'Carte', couleur: brandConfig.cardColor },
                    ].map((c, i) => (
                      <div key={i} className="flex-1 text-center">
                        <div className="w-full h-10 rounded-lg border border-[var(--color-border)] mb-1" style={{ backgroundColor: c.couleur }} />
                        <p className="text-[8px] text-[var(--color-text-muted)]">{c.label}</p>
                        <p className="text-[8px] font-mono text-white/60">{c.couleur}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ═══ PRÉSETS ═══ */}
            {section === 'presets' && (
              <>
                <p className="text-xs text-[var(--color-text-muted)]">Choisissez un thème prédéfini — les couleurs s'appliquent instantanément.</p>
                <div className="grid grid-cols-2 gap-3">
                  {presets.map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => appliquerPreset(preset)}
                      className="bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-xl p-3 text-left hover:border-white/20 transition-all hover:scale-[1.02] group"
                    >
                      <div className="flex gap-1.5 mb-2">
                        <div className="w-5 h-5 rounded-full border border-white/10" style={{ backgroundColor: preset.primaire }} />
                        <div className="w-5 h-5 rounded-full border border-white/10" style={{ backgroundColor: preset.secondaire }} />
                        <div className="w-5 h-5 rounded-full border border-white/10" style={{ backgroundColor: preset.fond }} />
                        <div className="w-5 h-5 rounded-full border border-white/10" style={{ backgroundColor: preset.carte }} />
                      </div>
                      <p className="text-[10px] font-medium text-white group-hover:text-[var(--color-primary)] transition-colors">{preset.nom}</p>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* ═══ TYPOGRAPHIES ═══ */}
            {section === 'typo' && (
              <>
                <Champ label="Police des titres">
                  <select
                    value={brandConfig.fontTitle}
                    onChange={e => updateBrand({ fontTitle: e.target.value })}
                    className="w-full bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[var(--color-primary)] cursor-pointer"
                  >
                    {policesTitres.map(f => (
                      <option key={f} value={f} className="bg-[var(--color-card)]" style={{ fontFamily: f }}>{f.split("'")[1] || f.split(',')[0]}</option>
                    ))}
                  </select>
                </Champ>

                <Champ label="Police du corps">
                  <select
                    value={brandConfig.fontBody}
                    onChange={e => updateBrand({ fontBody: e.target.value })}
                    className="w-full bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[var(--color-primary)] cursor-pointer"
                  >
                    {policesCorps.map(f => (
                      <option key={f} value={f} className="bg-[var(--color-card)]" style={{ fontFamily: f }}>{f.split("'")[1] || f.split(',')[0]}</option>
                    ))}
                  </select>
                </Champ>

                {/* Aperçu typo */}
                <div className="bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-xl p-4 space-y-2">
                  <p className="text-[9px] text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Aperçu typographique</p>
                  <h4 className="text-lg font-bold text-white" style={{ fontFamily: brandConfig.fontTitle }}>Titre en {brandConfig.fontTitle.split("'")[1] || 'défaut'}</h4>
                  <p className="text-sm text-[var(--color-text-muted)]" style={{ fontFamily: brandConfig.fontBody }}>Corps de texte en {brandConfig.fontBody.split("'")[1] || 'défaut'} — Lorem ipsum dolor sit amet.</p>
                </div>
              </>
            )}

            {/* ═══ CONTACT ═══ */}
            {section === 'contact' && (
              <>
                <p className="text-xs text-[var(--color-text-muted)]">Informations de contact affichées dans la plateforme.</p>
                <Champ label="E-mail de support">
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                    <input type="email" defaultValue="support@lbstay.cm" className="w-full bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white outline-none focus:border-[var(--color-primary)]" />
                  </div>
                </Champ>
                <Champ label="Téléphone">
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                    <input type="tel" defaultValue="+237 699 000 000" className="w-full bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white outline-none focus:border-[var(--color-primary)]" />
                  </div>
                </Champ>
                <Champ label="Site web">
                  <div className="relative">
                    <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                    <input type="url" defaultValue="www.lbstay.cm" className="w-full bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white outline-none focus:border-[var(--color-primary)]" />
                  </div>
                </Champ>
              </>
            )}
          </div>

          {/* Footer actions */}
          <div className="px-5 py-4 border-t border-[var(--color-border)] space-y-2 shrink-0">
            <div className="flex gap-2">
              <button
                onClick={resetBrand}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-white hover:bg-white/5 transition-colors"
              >
                <RotateCcw size={14} /> Réinitialiser
              </button>
              <button
                onClick={exporterConfig}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium bg-[var(--color-primary)] text-[var(--color-bg-main)] hover:brightness-110 transition-all"
              >
                <Download size={14} /> Exporter JSON
              </button>
            </div>
          </div>
        </div>
      </DemoTooltip>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[80] animate-fade-slide">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-card)] border border-[var(--color-success)] shadow-2xl">
            <CheckCircle size={14} className="text-[var(--color-success)]" />
            <span className="text-xs text-white font-medium">{toast}</span>
          </div>
        </div>
      )}
    </div>
  )
}

function Champ({ label, children }) {
  return (
    <div>
      <label className="block text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function CouleurChamp({ label, valeur, onChange }) {
  return (
    <Champ label={label}>
      <div className="flex items-center gap-2.5">
        <input
          type="color"
          value={valeur}
          onChange={e => onChange(e.target.value)}
          className="w-10 h-10 rounded-xl border border-[var(--color-border)] cursor-pointer bg-transparent shrink-0"
        />
        <input
          type="text"
          value={valeur}
          onChange={e => onChange(e.target.value)}
          className="flex-1 bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-xl px-3 py-2.5 text-sm text-white font-mono outline-none focus:border-[var(--color-primary)] transition-colors"
        />
        <div className="w-10 h-10 rounded-xl border border-[var(--color-border)]" style={{ backgroundColor: valeur }} />
      </div>
    </Champ>
  )
}
