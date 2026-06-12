interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
        🔍
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search trucks, dishes, vibes..."
        className="font-body w-full rounded-2xl border border-white/10 bg-night-card py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-coral/50 focus:ring-2 focus:ring-coral/20"
      />
    </div>
  )
}
