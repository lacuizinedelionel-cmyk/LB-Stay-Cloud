import { useState, useRef, useEffect } from 'react'

const arrowPositions = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-3',
  left: 'right-full top-1/2 -translate-y-1/2 mr-3',
  right: 'left-full top-1/2 -translate-y-1/2 ml-3',
}

const arrowStyles = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-[var(--color-primary)] border-x-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[var(--color-primary)] border-x-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-[var(--color-primary)] border-y-transparent border-r-transparent',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-[var(--color-primary)] border-y-transparent border-l-transparent',
}

export default function DemoTooltip({ children, label, position = 'top', highlight = false, visible = true }) {
  const [show, setShow] = useState(visible)
  const containerRef = useRef(null)

  useEffect(() => {
    setShow(visible)
  }, [visible])

  if (!label) return children

  return (
    <div ref={containerRef} className="relative inline-block">
      {highlight && (
        <div className="absolute inset-0 rounded-lg ring-2 ring-[var(--color-primary)] animate-pulse-ring pointer-events-none z-10" />
      )}
      {children}
      {show && (
        <div className={`absolute z-50 ${arrowPositions[position]} pointer-events-none`}>
          <div className="relative animate-fade-slide">
            <div className="bg-[var(--color-card)] border border-[var(--color-primary)] rounded-lg px-4 py-2 shadow-lg shadow-black/30 whitespace-nowrap">
              <span className="text-sm font-medium text-white">{label}</span>
            </div>
            <div className={`absolute w-0 h-0 border-[6px] ${arrowStyles[position]}`} />
            <div className={`absolute ${position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1' : position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1' : ''}`}>
              <span className="text-[var(--color-primary)] text-lg animate-bounce-arrow inline-block">
                {position === 'top' ? '↓' : position === 'bottom' ? '↑' : position === 'left' ? '→' : '←'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
