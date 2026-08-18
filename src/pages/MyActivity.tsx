import { Calendar, ChevronRight, MapPin } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CategoryChip } from '../components/AnnouncementHeader'
import { ActivityIllu } from '../components/Illustrations'
import { StatusBadge } from '../components/StatusBadge'
import { announcements } from '../data/mock'
import { readActions, resolveStatus } from '../lib/announcementActions'
import type { ActivityStatus, Announcement, AnnouncementCategory } from '../types'

const TABS: { id: 'all' | AnnouncementCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'event', label: 'Event' },
  { id: 'volunteer', label: 'Volunteer' },
  { id: 'job', label: 'Job' },
]

export function MyActivity() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('all')
  const actions = useMemo(() => readActions(), [])

  const items = useMemo(() => {
    return announcements.flatMap((item) => {
      const status = resolveStatus(item, actions[item.id])
      if (!status || status === 'closed') return []
      if (tab !== 'all' && item.category !== tab) return []
      return [{ item, status }]
    })
  }, [actions, tab])

  return (
    <main className="px-4 pb-6 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Campus Quest</p>
          <h1 className="text-xl font-extrabold text-ink">My Activity</h1>
          <p className="mt-1 text-xs text-ink-mid">Your announcement applications</p>
        </div>
        <ActivityIllu className="h-14 w-14" />
      </header>

      <div className="mb-4 grid grid-cols-4 rounded-full bg-ink-soft p-1">
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

      {items.length === 0 ? (
        <section className="flex flex-col items-center rounded-2xl border border-line bg-white px-5 py-10 text-center shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
          <ActivityIllu className="h-16 w-16" />
          <h2 className="mt-4 text-lg font-extrabold text-ink">No activity yet</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-mid">
            Join events or apply to volunteer and job postings. They will show up here.
          </p>
          <Link
            to="/announcements"
            className="mt-5 flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-white shadow-[0_8px_18px_rgba(0,84,166,0.28)]"
          >
            Go to Announcement
          </Link>
        </section>
      ) : (
        <div className="space-y-3">
          {items.map(({ item, status }) => (
            <ActivityCard key={item.id} item={item} status={status} />
          ))}
        </div>
      )}
    </main>
  )
}

function ActivityCard({ item, status }: { item: Announcement; status: ActivityStatus }) {
  const hasDetail = item.category === 'event' || item.category === 'volunteer' || item.category === 'job'

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
      {item.photo ? (
        <div className="relative">
          <img src={item.photo} alt={item.title} className="h-36 w-full object-cover" />
          <StatusBadge status={status} category={item.category} className="absolute right-2 top-2 shadow-sm" />
        </div>
      ) : null}
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <CategoryChip category={item.category} />
          {item.photo ? null : <StatusBadge status={status} category={item.category} />}
        </div>
        <h2 className="mt-2 text-[15px] font-extrabold leading-snug text-ink">{item.title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-ink-mid">{item.body}</p>
        {item.location || item.time || item.date ? (
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold text-ink-mid">
            {item.date || item.time ? (
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                {item.date}
                {item.time ? ` | ${item.time}` : ''}
              </span>
            ) : null}
            {item.location ? (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {item.location}
              </span>
            ) : null}
          </div>
        ) : null}
        {hasDetail ? (
          <Link
            to={`/announcements/${item.id}?from=activity`}
            className="mt-3 flex h-10 w-full items-center justify-center gap-1 rounded-2xl border border-primary bg-transparent text-sm font-extrabold text-primary"
          >
            Details
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </article>
  )
}
