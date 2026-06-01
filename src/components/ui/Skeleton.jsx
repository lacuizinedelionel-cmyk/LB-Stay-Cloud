export function SkeletonBlock({ className = '' }) {
  return <div className={`skeleton ${className}`} />
}

export function SkeletonCard() {
  return (
    <div className="glass-card p-5 space-y-3">
      <SkeletonBlock className="h-4 w-24" />
      <SkeletonBlock className="h-8 w-36" />
      <SkeletonBlock className="h-3 w-20" />
    </div>
  )
}

export function SkeletonTable({ rows = 5, cols = 4 }) {
  return (
    <div className="glass-card p-5 space-y-4">
      <SkeletonBlock className="h-5 w-40 mb-4" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <SkeletonBlock key={j} className="h-3 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function SkeletonKpi() {
  return (
    <div className="glass-card p-5 space-y-3">
      <div className="flex justify-between">
        <SkeletonBlock className="w-10 h-10 rounded-xl" />
        <SkeletonBlock className="w-14 h-6 rounded-lg" />
      </div>
      <SkeletonBlock className="h-7 w-28" />
      <SkeletonBlock className="h-3 w-20" />
    </div>
  )
}
