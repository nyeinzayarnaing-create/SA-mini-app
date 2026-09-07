import { Calendar, ChevronRight, MapPin } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnnouncementHeader } from '../components/AnnouncementHeader'
import { MegaphoneIllu } from '../components/Illustrations'
import { StatusBadge } from '../components/StatusBadge'
import { useSeen } from '../context/SeenContext'
import { announcements } from '../data/mock'
import { readActions, announcementStatus } from '../lib/announcementActions'
import type { ActivityStatus, AnnouncementCategory } from '../types'

const TABS: { id: AnnouncementCategory; label: string }[] = [
  { id: 'event', label: 'Event' },
  { id: 'volunteer', label: 'Volunteer' },
  { id: 'job', label: 'Job' },
]

export function Announcements() {
  const { markSeen } = useSeen()
  const location = useLocation()
  const [tab, setTab] = useState<AnnouncementCategory>('event')
  const [actions, setActions] = useState<Record<string, ActivityStatus>>(readActions)

  useEffect(() => {
    setActions(readActions())
  }, [location.key, tab])

  const items = useMemo(
    () =>
      announcements.filter((item) => {
        if (item.category !== tab) return false
        const status = announcementStatus(item, actions[item.id])
        return status !== 'expired' && status !== 'cancelled'
      }),
    [tab, actions],
  )

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
              onClick={() => setTab(item.id)}
              className={`rounded-full py-2 text-xs font-extrabold transition-all duration-300 ${
                active ? 'bg-primary text-white shadow-[0_6px_16px_rgba(0,84,166,0.28)]' : 'text-ink-mid'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

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
                  {showCornerBadge && status ? (
                    <StatusBadge
                      status={status}
                      category={item.category}
                      className="absolute right-2 top-2 shadow-sm"
                    />
                  ) : null}
                </div>
              ) : showCornerBadge && status ? (
                <div className="relative flex h-10 items-center justify-end px-2">
                  <StatusBadge status={status} category={item.category} />
                </div>
              ) : null}
              <div className="flex items-start gap-2 p-4">
                <div className="min-w-0 flex-1">
                  <AnnouncementHeader item={item} showOpenClosed />
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
            No announcements in this category.
          </p>
        ) : null}
      </div>
    </main>
  )
}
