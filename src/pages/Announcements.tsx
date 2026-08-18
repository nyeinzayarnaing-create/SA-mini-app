import { Calendar, ChevronRight, MapPin } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnnouncementHeader } from '../components/AnnouncementHeader'
import { JobCard } from '../components/JobCard'
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
  const [tab, setTab] = useState<AnnouncementCategory>('event')
  const [actions] = useState<Record<string, ActivityStatus>>(readActions)

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
          const applied = status === 'pending' || status === 'approved'
          const closed = status === 'closed'

          if (item.category === 'job') {
            return (
              <JobCard key={item.id} item={item} applied={applied} closed={closed} />
            )
          }

          return (
            <article
              key={item.id}
              className={`overflow-hidden rounded-2xl border bg-white shadow-[0_8px_24px_rgba(0,84,166,0.06)] ${
                item.featured ? 'border-secondary' : 'border-line'
              }`}
            >
              {item.photo ? (
                <div className="relative">
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="h-36 w-full object-cover"
                  />
                  {status ? <StatusBadge status={status} className="absolute right-2 top-2 shadow-sm" /> : null}
                </div>
              ) : status ? (
                <div className="relative flex h-10 items-center justify-end px-2">
                  <StatusBadge status={status} />
                </div>
              ) : null}
              <div className="p-4">
              <AnnouncementHeader item={item} />
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
              {applied || closed ? (
                <Link
                  to={`/announcements/${item.id}`}
                  className="mt-3 flex h-10 w-full items-center justify-center gap-1 rounded-2xl border border-primary bg-transparent text-sm font-extrabold text-primary"
                >
                  Details
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  to={`/announcements/${item.id}`}
                  onClick={() => markSeen(item.id)}
                  className="mt-3 flex h-10 w-full items-center justify-center rounded-2xl bg-primary text-sm font-extrabold text-white"
                >
                  {item.category === 'volunteer' ? 'Apply' : 'Join'}
                </Link>
              )}
              </div>
            </article>
          )
        })}
      </div>
    </main>
  )
}
