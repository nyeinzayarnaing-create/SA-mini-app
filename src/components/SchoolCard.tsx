import { Calendar, MapPin, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { School } from '../types'

function initialsColor(hex: string) {
  const h = hex.replace('#', '')
  const r = Number.parseInt(h.slice(0, 2), 16)
  const g = Number.parseInt(h.slice(2, 4), 16)
  const b = Number.parseInt(h.slice(4, 6), 16)
  const luminance = (r * 299 + g * 587 + b * 114) / 1000
  return luminance > 155 ? '#00315F' : '#ffffff'
}

export function SchoolMark({ school, size = 'md' }: { school: School; size?: 'md' | 'lg' }) {
  const box = size === 'lg' ? 'h-16 w-16 text-[15px] rounded-[18px]' : 'h-14 w-14 text-sm rounded-2xl'
  return (
    <div
      className={`flex shrink-0 items-center justify-center font-extrabold ${box}`}
      style={{ backgroundColor: school.accent, color: initialsColor(school.accent) }}
      aria-hidden
    >
      {school.initials}
    </div>
  )
}

export function SchoolCard({ school }: { school: School }) {
  const active = school.status === 'Active'

  return (
    <Link to={`/schools/${school.id}`} className="block">
      <article className="rounded-2xl border border-line bg-white p-4 shadow-[0_6px_18px_rgba(0,84,166,0.06)]">
        <div className="flex items-start gap-3">
          <SchoolMark school={school} />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-[15px] font-extrabold leading-snug text-ink">{school.name}</h3>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
                  active ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#EEF0F4] text-[#6B7280]'
                }`}
              >
                {school.status}
              </span>
            </div>
            <span
              className={`mt-1.5 inline-flex rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
                school.type === 'government'
                  ? 'bg-[#E8F1FA] text-primary'
                  : 'bg-[#E6F8FD] text-[#0A73C7]'
              }`}
            >
              {school.type === 'government' ? 'Government' : 'Private'}
            </span>
            <p className="mt-1 flex items-center gap-1 text-[13px] font-semibold text-ink-mid">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              {school.region}
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[13px] font-semibold text-ink-mid">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              Partner since {school.partnerSince}
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[13px] font-semibold text-ink-mid">
              <Users className="h-3.5 w-3.5 text-primary" />
              {school.ambassadorCount} Student Ambassadors
            </p>
          </div>
        </div>
      </article>
    </Link>
  )
}
