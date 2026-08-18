import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AmbassadorRow } from '../components/AmbassadorRow'
import { SchoolCard } from '../components/SchoolCard'
import { SearchBar } from '../components/SearchBar'
import { ambassadors, schools } from '../data/mock'

export function SearchPage() {
  const [params] = useSearchParams()
  const q = params.get('q') ?? ''

  const schoolHits = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return schools
    return schools.filter(
      (school) => school.name.toLowerCase().includes(needle) || school.city.toLowerCase().includes(needle),
    )
  }, [q])

  const ambassadorHits = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return ambassadors
    return ambassadors.filter(
      (person) =>
        person.name.toLowerCase().includes(needle) ||
        person.schoolName.toLowerCase().includes(needle) ||
        person.id.toLowerCase().includes(needle),
    )
  }, [q])

  return (
    <main className="px-4 pb-6 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Search</p>
        <h1 className="text-xl font-extrabold text-ink">{q ? `Results for “${q}”` : 'Search the quest'}</h1>
      </header>
      <SearchBar key={q} initialValue={q} />

      <section className="mt-5">
        <h2 className="mb-2 text-sm font-bold text-ink">Partner schools</h2>
        <div className="space-y-2">
          {schoolHits.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
          {schoolHits.length === 0 ? <Empty /> : null}
        </div>
      </section>

      <section className="mt-5">
        <h2 className="mb-2 text-sm font-bold text-ink">Student ambassadors</h2>
        <div className="space-y-2">
          {ambassadorHits.map((person) => (
            <Link key={person.id} to={`/ambassadors/${encodeURIComponent(person.id)}`} className="block">
              <AmbassadorRow ambassador={person} />
            </Link>
          ))}
          {ambassadorHits.length === 0 ? <Empty /> : null}
        </div>
      </section>
    </main>
  )
}

function Empty() {
  return (
    <p className="rounded-2xl border border-dashed border-line bg-white p-5 text-center text-sm text-ink-mid">
      Nothing matched that query.
    </p>
  )
}
