import { Briefcase, Building2, ChevronRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSeen } from '../context/SeenContext'
import type { Announcement } from '../types'

type Props = {
  item: Announcement
  applied: boolean
  closed: boolean
}

export const LOGO_COLORS: Record<string, string> = {
  CQ: 'bg-primary',
  HF: 'bg-[#0F766E]',
  KBZ: 'bg-[#0054A6]',
}

export function CompanyMark({ code, name, size = 'md' }: { code?: string; name?: string; size?: 'md' | 'lg' }) {
  const initials = code ?? initialsFrom(name ?? 'Job')
  const box = size === 'lg' ? 'h-16 w-16 text-[15px] rounded-[18px]' : 'h-14 w-14 text-[13px] rounded-2xl'
  return (
    <div
      className={`flex shrink-0 items-center justify-center font-extrabold text-white ${box} ${
        LOGO_COLORS[initials] ?? 'bg-primary'
      }`}
      aria-hidden
    >
      {initials}
    </div>
  )
}

export function JobCard({ item, applied, closed }: Props) {
  const { showNew, markSeen } = useSeen()

  return (
    <article className="relative overflow-hidden rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
      {applied ? (
        <span className="absolute right-3 top-3 rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[#166534]">
          Applied
        </span>
      ) : showNew(item.isNew, item.id) ? (
        <span className="absolute right-3 top-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white">
          New
        </span>
      ) : null}

      <div className="flex gap-3 pr-12">
        <CompanyMark code={item.companyLogo} name={item.companyName} />
        <div className="min-w-0 flex-1">
          <h2 className="text-[16px] font-extrabold leading-snug text-ink">{item.title}</h2>
          {item.companyName ? (
            <p className="mt-1 text-[13px] font-semibold text-ink">{item.companyName}</p>
          ) : null}
          {item.employmentType ? (
            <p className="mt-1 flex items-center gap-1 text-[13px] font-semibold text-ink-mid">
              <Briefcase className="h-3.5 w-3.5 text-primary" />
              {item.employmentType}
            </p>
          ) : null}
          {item.location ? (
            <p className="mt-0.5 flex items-center gap-1 text-[13px] font-semibold text-ink-mid">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              {item.location}
            </p>
          ) : null}
          {item.industry ? (
            <p className="mt-0.5 flex items-center gap-1 text-[13px] font-semibold text-ink-mid">
              <Building2 className="h-3.5 w-3.5 text-primary" />
              {item.industry}
            </p>
          ) : null}
        </div>
      </div>

      {closed ? null : applied ? (
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
          View
        </Link>
      )}
    </article>
  )
}

function initialsFrom(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}
