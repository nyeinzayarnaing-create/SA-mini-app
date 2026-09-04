import { Calendar, ChevronRight, MapPin } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnnouncementHeader } from '../components/AnnouncementHeader'
import { MegaphoneIllu } from '../components/Illustrations'
import { StatusBadge } from '../components/StatusBadge'
import { useSeen } from '../context/SeenContext'
import { announcements } from '../data/mock'
import { readActions, announcementStatus } from '../lib/announcementActions'
import type { ActivityStatus, Announcement, AnnouncementCategory } from '../types'

const TABS: { id: AnnouncementCategory; label: string }[] = [
  { id: 'event', label: 'Event' },
  { id: 'volunteer', label: 'Volunteer' },
  { id: 'job', label: 'Job' },
]

type EventFilter = 'all' | 'pending' | 'approved' | 'closed'

const EVENT_FILTERS: { id: EventFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending Approval' },
  { id: 'approved', label: 'Approved' },
  { id: 'closed', label: 'Register Closed' },
]

export function Announcements() {
  const { markSeen } = useSeen()
  const location = useLocation()
  const [tab, setTab] = useState<AnnouncementCategory>('event')
  const [eventFilter, setEventFilter] = useState<EventFilter>('all')
  const [actions, setActions] = useState<Record<string, ActivityStatus>>(readActions)

  useEffect(() => {
    setActions(readActions())
  }, [location.key, tab])

  const categoryItems = useMemo(
    () =>
      announcements.filter((item) => {
        if (item.category !== tab) return false
        const status = announcementStatus(item, actions[item.id])
        return status !== 'expired' && status !== 'cancelled'
      }),
    [tab, actions],
  )

  const eventCounts = useMemo(() => {
    const events = announcements.filter((item) => {
      if (item.category !== 'event') return false
      const status = announcementStatus(item, actions[item.id])
      return status !== 'expired' && status !== 'cancelled'
    })
    return {
      all: events.length,
      pending: events.filter((item) => announcementStatus(item, actions[item.id]) === 'pending').length,
      approved: events.filter((item) => announcementStatus(item, actions[item.id]) === 'approved').length,
      closed: events.filter((item) => announcementStatus(item, actions[item.id]) === 'closed').length,
    }
  }, [actions])

  const items = useMemo(() => {
    if (tab !== 'event' || eventFilter === 'all') return categoryItems
    return categoryItems.filter((item) => matchesEventFilter(item, actions[item.id], eventFilter))
  }, [tab, eventFilter, categoryItems, actions])

  return (
    <main className="px-4 pb-6 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Campus Quest</p>
          <h1 className="text-xl font-extrabold text-ink">Announcement</h1>
        </div>
        <MegaphoneIllu className="h-12 w-12" />
      </header>

      <div className="mb-4 grid grid-cols-3 rounded-full bg-ink-soft p-1">
        {TABS.map((item) => {
          const active = item.id === tab
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setTab(item.id)
                if (item.id !== 'event') setEventFilter('all')
              }}
              className={`rounded-full py-2 text-xs font-extrabold transition-all duration-300 ${
                active ? 'bg-primary text-white shadow-[0_6px_16px_rgba(0,84,166,0.28)]' : 'text-ink-mid'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {tab === 'event' ? (
        <div className="-mx-4 mb-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max items-center gap-3">
            {EVENT_FILTERS.map((filter, index) => {
              const active = filter.id === eventFilter
              const count = eventCounts[filter.id]
              return (
                <div key={filter.id} className="flex items-center gap-3">
                  {index === 1 ? <span className="h-4 w-px shrink-0 bg-line" aria-hidden /> : null}
                  <button
                    type="button"
                    onClick={() => setEventFilter(filter.id)}
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

      <div className="space-y-3">
        {items.map((item) => {
          const status = announcementStatus(item, actions[item.id])
          const showCornerBadge = status === 'pending' || status === 'approved'

          return (
            <Link
              key={item.id}
              to={`/announcements/${item.id}`}
              onClick={() => markSeen(item.id)}
              className={`block overflow-hidden rounded-2xl border bg-white shadow-[0_8px_24px_rgba(0,84,166,0.06)] ${
                item.featured ? 'border-secondary' : 'border-line'
              }`}
            >
              {item.photo ? (
                <div className="relative">
                  <img src={item.photo} alt={item.title} className="h-36 w-full object-cover" />
                  {showCornerBadge ? (
                    <StatusBadge
                      status={status}
                      category={item.category}
                      className="absolute right-2 top-2 shadow-sm"
                    />
                  ) : null}
                </div>
              ) : showCornerBadge ? (
                <div className="relative flex h-10 items-center justify-end px-2">
                  <StatusBadge status={status} category={item.category} />
                </div>
              ) : null}
              <div className="flex items-start gap-2 p-4">
                <div className="min-w-0 flex-1">
                  <AnnouncementHeader item={item} status={status} />
                  <h2 className="mt-2 text-[15px] font-extrabold leading-snug text-ink">{item.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-ink-mid">{item.body}</p>
                  {item.location || item.time ? (
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold text-ink-mid">
                      {item.time ? (
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-primary" />
                          {item.time}
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
        })}
        {items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line bg-white p-6 text-center text-sm text-ink-mid">
            No announcements in this filter.
          </p>
        ) : null}
      </div>
    </main>
  )
}

function matchesEventFilter(
  item: Announcement,
  stored: ActivityStatus | undefined,
  filter: Exclude<EventFilter, 'all'>,
) {
  return announcementStatus(item, stored) === filter
}
