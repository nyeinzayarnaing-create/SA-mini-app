import { useMemo, useState } from 'react'
import { SchoolCard } from '../components/SchoolCard'
import { SearchBar } from '../components/SearchBar'
import { schools } from '../data/mock'
import type { SchoolType } from '../types'

const TABS: { id: 'all' | SchoolType; label: string }[] = [
  { id: 'all', label: 'All Schools' },
  { id: 'government', label: 'Government' },
  { id: 'private', label: 'Private' },
]

export function Schools() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return schools.filter((school) => {
      if (tab !== 'all' && school.type !== tab) return false
      if (!q) return true
      return (
        school.name.toLowerCase().includes(q) ||
        school.region.toLowerCase().includes(q) ||
        school.city.toLowerCase().includes(q)
      )
    })
  }, [query, tab])

  return (
    <main className="px-4 pb-6 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Campus Quest</p>
        <h1 className="text-xl font-extrabold text-ink">Partner Schools</h1>
      </header>

      <div className="mb-4 grid grid-cols-3 rounded-full bg-ink-soft p-1">
        {TABS.map((item) => {
          const active = item.id === tab
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`rounded-full py-2 text-[11px] font-extrabold transition-all duration-300 ${
                active ? 'bg-primary text-white shadow-[0_6px_16px_rgba(0,84,166,0.28)]' : 'text-ink-mid'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <SearchBar onFilter={setQuery} placeholder="Search partner schools" />
      <p className="mt-3 text-xs text-ink-mid">{filtered.length} partner schools</p>
      <div className="mt-3 space-y-2">
        {filtered.map((school) => (
          <SchoolCard key={school.id} school={school} />
        ))}
        {filtered.length === 0 ? <Empty label="No schools match that search." /> : null}
      </div>
    </main>
  )
}

function Empty({ label }: { label: string }) {
  return (
    <p className="rounded-2xl border border-dashed border-line bg-white p-6 text-center text-sm text-ink-mid">{label}</p>
  )
}
