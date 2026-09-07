import { Calendar, ChevronRight, MapPin } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CategoryChip } from '../components/AnnouncementHeader'
import { ActivityIllu } from '../components/Illustrations'
import { StatusBadge } from '../components/StatusBadge'
import { announcements } from '../data/mock'
import { announcementStatus, readActions } from '../lib/announcementActions'
import type { ActivityStatus, Announcement, AnnouncementCategory } from '../types'

const CATEGORY_TABS: { id: 'all' | AnnouncementCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'event', label: 'Event' },
  { id: 'volunteer', label: 'Volunteer' },
  { id: 'job', label: 'Job' },
]

type StatusFilter = 'all' | 'pending' | 'approved' | 'expired' | 'applied'

const DEFAULT_STATUS_FILTERS: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'approved', label: 'Approved' },
  { id: 'expired', label: 'Expired' },
]

const JOB_STATUS_FILTERS: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'applied', label: 'Applied' },
  { id: 'expired', label: 'Expired' },
]

function isJobAppliedStatus(status: ActivityStatus) {
  return status === 'pending' || status === 'approved'
}

export function MyActivity() {
  const location = useLocation()
  const [category, setCategory] = useState<(typeof CATEGORY_TABS)[number]['id']>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [actions, setActions] = useState(() => readActions())

  useEffect(() => {
    setActions(readActions())
  }, [location.key])

  const activityItems = useMemo(() => {
    return announcements.flatMap((item) => {
      const stored = actions[item.id]
      if (!stored) return []
      const status = activityListStatus(item, stored)
      if (!status || status === 'cancelled' || status === 'closed') return []
      if (category !== 'all' && item.category !== category) return []
      return [{ item, status }]
    })
  }, [actions, category])

  const statusFilters =
    category === 'all' ? [] : category === 'job' ? JOB_STATUS_FILTERS : DEFAULT_STATUS_FILTERS

  useEffect(() => {
    if (category === 'all') {
      if (statusFilter !== 'all') setStatusFilter('all')
      return
    }
    const allowed = new Set(statusFilters.map((filter) => filter.id))
    if (!allowed.has(statusFilter)) setStatusFilter('all')
  }, [category, statusFilter, statusFilters])

  const statusCounts = useMemo(() => {
    const nonJobPending = activityItems.filter(
      (entry) => entry.status === 'pending' && entry.item.category !== 'job',
    )
    const applied = activityItems.filter((entry) => isJobAppliedStatus(entry.status)).length
    return {
      all: activityItems.length,
      pending: nonJobPending.length,
      approved: activityItems.filter((entry) => entry.status === 'approved').length,
      expired: activityItems.filter((entry) => entry.status === 'expired').length,
      applied,
    }
  }, [activityItems])

  const items = useMemo(() => {
    if (statusFilter === 'all') return activityItems
    if (statusFilter === 'pending') {
      return activityItems.filter(
        (entry) => entry.status === 'pending' && entry.item.category !== 'job',
      )
    }
    if (statusFilter === 'applied') {
      return activityItems.filter((entry) => isJobAppliedStatus(entry.status))
    }
    return activityItems.filter((entry) => entry.status === statusFilter)
  }, [activityItems, statusFilter])

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

      <div
        className={`grid grid-cols-4 rounded-full bg-ink-soft p-1 ${
          statusFilters.length > 0 ? 'mb-3' : 'mb-4'
        }`}
      >
        {CATEGORY_TABS.map((item) => {
          const active = item.id === category
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              className={`rounded-full py-2 text-[11px] font-extrabold transition-all duration-300 ${
                active ? 'bg-primary text-white shadow-[0_6px_16px_rgba(0,84,166,0.28)]' : 'text-ink-mid'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {statusFilters.length > 0 ? (
        <div className="-mx-4 mb-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max items-center gap-3">
            {statusFilters.map((filter, index) => {
              const active = filter.id === statusFilter
              const count = statusCounts[filter.id]
              return (
                <div key={filter.id} className="flex items-center gap-3">
                  {index === 1 ? <span className="h-4 w-px shrink-0 bg-line" aria-hidden /> : null}
                  <button
                    type="button"
                    onClick={() => setStatusFilter(filter.id)}
                    className={`inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] transition-colors ${
                      active ? 'font-bold text-primary' : 'font-semibold text-ink-mid'
                    }`}
                  >
                    {filter.label}
                    <span
                      className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-extrabold ${
                        active ? 'bg-primary text-white' : 'bg-[#C9CED8] text-white'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      ) : null}

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

/** Status for My Activity rows — applied items (no register-closed). */
function activityListStatus(item: Announcement, stored: ActivityStatus): ActivityStatus | null {
  if (stored === 'closed') return null
  if (stored === 'expired' || stored === 'cancelled') return stored
  const status = announcementStatus(item, stored)
  if (status === 'closed') return null
  if (status === 'pending' || status === 'approved' || status === 'expired') return status
  return stored
}

function ActivityCard({ item, status }: { item: Announcement; status: ActivityStatus }) {
  return (
    <Link
      to={`/announcements/${item.id}?from=activity`}
      className="block overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_24px_rgba(0,84,166,0.06)]"
    >
      {item.photo ? (
        <div className="relative">
          <img src={item.photo} alt={item.title} className="h-36 w-full object-cover" />
          <StatusBadge status={status} category={item.category} className="absolute right-2 top-2 shadow-sm" />
        </div>
      ) : null}
      <div className="flex items-start gap-2 p-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <CategoryChip category={item.category} />
            {item.photo ? null : <StatusBadge status={status} category={item.category} />}
          </div>
          {item.category === 'job' && item.companyName ? (
            <div className="mt-2 flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-[9px] font-extrabold tracking-wide text-white">
                {item.companyLogo ?? item.companyName.slice(0, 3).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-extrabold text-ink">{item.companyName}</p>
                {item.employmentType || item.industry ? (
                  <p className="truncate text-[11px] font-semibold text-ink-mid">
                    {[item.employmentType, item.industry].filter(Boolean).join(' · ')}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
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
        </div>
        <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-ink/30" aria-hidden />
      </div>
    </Link>
  )
}
