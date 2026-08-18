import { ListFilter, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AmbassadorRow } from '../components/AmbassadorRow'
import { emptyFilters, FilterSheet, type AmbassadorFilters } from '../components/FilterSheet'
import { TrophyIllu } from '../components/Illustrations'
import { useProfile } from '../context/ProfileContext'
import { ambassadors } from '../data/mock'
import { HALL_TAG_LABEL } from '../lib/hall'
import type { HallTag } from '../types'

const TABS: { id: 'all' | HallTag; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'top-onboarder', label: HALL_TAG_LABEL['top-onboarder'] },
  { id: 'youth-creator', label: HALL_TAG_LABEL['youth-creator'] },
  { id: 'internship', label: HALL_TAG_LABEL.internship },
  { id: 'permanent', label: HALL_TAG_LABEL.permanent },
]

export function HallOfFrame() {
  const { user } = useProfile()
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('all')
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<AmbassadorFilters>(emptyFilters)
  const [sheetOpen, setSheetOpen] = useState(false)

  const members = useMemo(
    () => ambassadors.filter((person) => person.id !== user.id && person.hallTag),
    [user.id],
  )

  const colleges = useMemo(
    () => [...new Set(members.map((person) => person.schoolName))].sort(),
    [members],
  )
  const regions = useMemo(
    () => [...new Set(members.map((person) => person.trainingRegion))].sort(),
    [members],
  )
  const batches = useMemo(
    () => [...new Set(members.map((person) => person.saBatch))].sort(),
    [members],
  )

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return members.filter((person) => {
      if (tab !== 'all' && person.hallTag !== tab) return false
      const matchesQuery =
        !q || person.name.toLowerCase().includes(q) || person.id.toLowerCase().includes(q)
      const matchesCollege =
        filters.collegeName.length === 0 || filters.collegeName.includes(person.schoolName)
      const matchesRegion =
        filters.trainingRegion.length === 0 || filters.trainingRegion.includes(person.trainingRegion)
      const matchesBatch = filters.saBatch.length === 0 || filters.saBatch.includes(person.saBatch)
      return matchesQuery && matchesCollege && matchesRegion && matchesBatch
    })
  }, [members, tab, query, filters])

  const filtersActive =
    filters.collegeName.length > 0 || filters.trainingRegion.length > 0 || filters.saBatch.length > 0
  const searching = Boolean(query.trim()) || filtersActive

  const selectedChips: { group: keyof AmbassadorFilters; value: string }[] = [
    ...filters.collegeName.map((value) => ({ group: 'collegeName' as const, value })),
    ...filters.trainingRegion.map((value) => ({ group: 'trainingRegion' as const, value })),
    ...filters.saBatch.map((value) => ({ group: 'saBatch' as const, value })),
  ]

  function removeChip(group: keyof AmbassadorFilters, value: string) {
    setFilters((prev) => ({
      ...prev,
      [group]: prev[group].filter((item) => item !== value),
    }))
  }

  return (
    <main className="px-4 pb-6 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Campus Quest</p>
          <h1 className="text-xl font-extrabold text-ink">Hall of Frame</h1>
          <p className="mt-1 text-xs text-ink-mid">
            {shown.length} {tab === 'all' ? 'ambassadors' : HALL_TAG_LABEL[tab]}
          </p>
        </div>
        <TrophyIllu className="illu-float h-14 w-14" />
      </header>

      <div className="-mx-4 mb-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-2 rounded-full bg-ink-soft p-1">
          {TABS.map((item) => {
            const active = item.id === tab
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[11px] font-extrabold transition-all duration-300 ${
                  active ? 'bg-primary text-white shadow-[0_6px_16px_rgba(0,84,166,0.28)]' : 'text-ink-mid'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <form
          onSubmit={(event) => event.preventDefault()}
          className="relative min-w-0 flex-1"
        >
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Student Name and Student ID"
            aria-label="Search by Student Name and Student ID"
            className="h-11 w-full rounded-2xl border border-line bg-white pl-10 pr-3 text-sm text-ink outline-none placeholder:text-ink/35 focus:border-primary/50 focus:ring-2 focus:ring-secondary/40"
          />
        </form>
        <button
          type="button"
          aria-label="Filter By"
          onClick={() => setSheetOpen(true)}
          className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border bg-white ${
            filtersActive ? 'border-primary text-primary' : 'border-line text-ink'
          }`}
        >
          <ListFilter className="h-5 w-5" />
          {filtersActive ? <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-secondary" /> : null}
        </button>
      </div>

      {selectedChips.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedChips.map((chip) => (
            <span
              key={`${chip.group}-${chip.value}`}
              className="inline-flex max-w-full items-center gap-1 rounded-full bg-primary/10 py-1 pl-2.5 pr-1 text-xs font-semibold text-primary"
            >
              <span className="min-w-0 truncate">{chip.value}</span>
              <button
                type="button"
                aria-label={`Remove ${chip.value}`}
                onClick={() => removeChip(chip.group, chip.value)}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full hover:bg-primary/15"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      ) : null}

      <section className="mt-4 space-y-2">
        {shown.map((person) => (
          <Link
            key={person.id}
            to={`/ambassadors/${encodeURIComponent(person.id)}`}
            className="block w-full text-left"
          >
            <AmbassadorRow ambassador={person} showHallTag />
          </Link>
        ))}
        {shown.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line bg-white p-6 text-center text-sm text-ink-mid">
            {searching ? 'No ambassadors match that search.' : 'No ambassadors in this category yet.'}
          </p>
        ) : null}
      </section>

      <FilterSheet
        open={sheetOpen}
        value={filters}
        colleges={colleges}
        regions={regions}
        batches={batches}
        onClose={() => setSheetOpen(false)}
        onApply={setFilters}
      />
    </main>
  )
}
