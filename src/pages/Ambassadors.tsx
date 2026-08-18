import { ListFilter, Search, X } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AmbassadorRow } from '../components/AmbassadorRow'
import { emptyFilters, FilterSheet, type AmbassadorFilters } from '../components/FilterSheet'
import { EmptySearchIllu } from '../components/Illustrations'
import { useProfile } from '../context/ProfileContext'
import { ambassadors } from '../data/mock'
import type { Ambassador } from '../types'

const RECENT_KEY = 'sa-recent-profiles'

export function Ambassadors() {
  const { user } = useProfile()
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<AmbassadorFilters>(emptyFilters)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [recentIds, setRecentIds] = useState<string[]>(() => loadRecentIds())

  const others = useMemo(
    () => ambassadors.filter((person) => person.id !== user.id),
    [user.id],
  )

  const colleges = useMemo(
    () => [...new Set(others.map((person) => person.schoolName))].sort(),
    [others],
  )
  const regions = useMemo(
    () => [...new Set(others.map((person) => person.trainingRegion))].sort(),
    [others],
  )
  const batches = useMemo(
    () => [...new Set(others.map((person) => person.saBatch))].sort(),
    [others],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return others.filter((person) => {
      const matchesQuery =
        !q ||
        person.name.toLowerCase().includes(q) ||
        person.id.toLowerCase().includes(q)
      const matchesCollege =
        filters.collegeName.length === 0 || filters.collegeName.includes(person.schoolName)
      const matchesRegion =
        filters.trainingRegion.length === 0 || filters.trainingRegion.includes(person.trainingRegion)
      const matchesBatch = filters.saBatch.length === 0 || filters.saBatch.includes(person.saBatch)
      return matchesQuery && matchesCollege && matchesRegion && matchesBatch
    })
  }, [query, filters, others])

  const recents = useMemo(
    () =>
      recentIds
        .map((id) => others.find((person) => person.id === id))
        .filter((person): person is Ambassador => person != null),
    [recentIds, others],
  )

  const filtersActive =
    filters.collegeName.length > 0 || filters.trainingRegion.length > 0 || filters.saBatch.length > 0
  const searching = Boolean(query.trim()) || filtersActive

  useEffect(() => {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recentIds))
  }, [recentIds])

  function remember(person: Ambassador) {
    setRecentIds((prev) => [person.id, ...prev.filter((id) => id !== person.id)].slice(0, 5))
  }

  function onSearch(event: FormEvent) {
    event.preventDefault()
    const q = query.trim()
    if (!q) return
    const needle = q.toLowerCase()
    const hit = others.find(
      (person) => person.name.toLowerCase().includes(needle) || person.id.toLowerCase().includes(needle),
    )
    if (hit) remember(hit)
  }

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
      <header className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Category</p>
        <h1 className="text-xl font-extrabold text-ink">Student Ambassadors</h1>
      </header>

      <div className="flex items-center gap-2">
        <form onSubmit={onSearch} className="relative min-w-0 flex-1">
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

      {searching ? (
        <section className="mt-5">
          <div className="space-y-2">
            {filtered.map((person) => (
              <Link
                key={person.id}
                to={`/ambassadors/${encodeURIComponent(person.id)}`}
                className="block w-full text-left"
                onClick={() => remember(person)}
              >
                <AmbassadorRow ambassador={person} />
              </Link>
            ))}
            {filtered.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-line bg-white p-6 text-center text-sm text-ink-mid">
                No ambassadors match that search.
              </p>
            ) : null}
          </div>
        </section>
      ) : (
        <section className="mt-5">
          {recents.length > 0 ? (
            <>
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-bold text-ink">Recent search</h2>
                <button
                  type="button"
                  onClick={() => setRecentIds([])}
                  className="text-[11px] font-semibold text-ink-mid"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-2">
                {recents.map((person) => (
                  <Link
                    key={person.id}
                    to={`/ambassadors/${encodeURIComponent(person.id)}`}
                    className="block w-full text-left"
                    onClick={() => remember(person)}
                  >
                    <AmbassadorRow ambassador={person} />
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-line bg-white px-5 py-8 text-center">
              <EmptySearchIllu className="mx-auto h-40 w-48" />
              <p className="mt-3 text-sm font-bold text-ink">No recent search profiles yet.</p>
              <p className="mt-1 text-xs text-ink-mid">Search by student name or student ID to see profiles here.</p>
            </div>
          )}
        </section>
      )}

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

function loadRecentIds(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((id): id is string => typeof id === 'string')
  } catch {
    return []
  }
}
