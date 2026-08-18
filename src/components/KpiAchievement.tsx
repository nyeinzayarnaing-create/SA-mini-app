import { BookOpen, Briefcase, Check, ChevronDown, ClipboardList, UserPlus, Users } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { kpiAchievements } from '../data/mock'
import type { KpiAchievement as KpiItem } from '../types'

const ICONS: Record<string, ReactNode> = {
  attendance: <ClipboardList className="h-5 w-5" />,
  ojt: <Briefcase className="h-5 w-5" />,
  onboarding: <UserPlus className="h-5 w-5" />,
  assignment: <Users className="h-5 w-5" />,
  training: <BookOpen className="h-5 w-5" />,
}

const ICON_WRAP: Record<string, string> = {
  attendance: 'bg-[#FFF3C4] text-[#C4920A]',
  ojt: 'bg-[#FFEDD5] text-[#EA580C]',
  onboarding: 'bg-[#DBEAFE] text-primary',
  assignment: 'bg-[#EDE9FE] text-[#7C3AED]',
  training: 'bg-[#F1F5F9] text-slate-400',
}

export function KpiAchievement() {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const earnedCount = kpiAchievements.filter((item) => item.earned).length

  return (
    <section className="rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-ink">KPI Achievement</h3>
        <button
          type="button"
          aria-expanded={detailsOpen}
          onClick={() => setDetailsOpen((open) => !open)}
          className="inline-flex items-center gap-0.5 text-xs font-semibold text-primary"
        >
          {detailsOpen ? 'Hide details' : 'Show details'}
          <ChevronDown className={`h-4 w-4 transition-transform ${detailsOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2">
        {kpiAchievements.map((item) => (
          <KpiStar key={item.id} filled={item.earned} />
        ))}
      </div>
      <p className="mt-2 text-center text-xs font-semibold text-ink-mid">{earnedCount}/5 Stars</p>

      {detailsOpen ? (
        <ul className="mt-4 space-y-2.5">
          {kpiAchievements.map((item) => (
            <li key={item.id}>
              <KpiDetailCard item={item} />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

function KpiStar({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden>
      <path
        d="M24 4l6 12 13 2-9 9 2 13-12-6-12 6 2-13-9-9 13-2z"
        fill={filled ? '#5AD2F2' : '#E8F7FC'}
        stroke="#0054A6"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function KpiDetailCard({ item }: { item: KpiItem }) {
  const pct = Math.min(100, Math.round((item.current / item.target) * 100))
  const bar =
    item.status === 'completed' ? 'bg-success' : item.status === 'in-progress' ? 'bg-primary' : 'bg-slate-300'
  const pctColor =
    item.status === 'completed' ? 'text-success' : item.status === 'in-progress' ? 'text-primary' : 'text-slate-400'
  const muted = item.status === 'locked'

  return (
    <article className="rounded-2xl border border-line bg-sky/60 p-3">
      <div className="flex gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
            item.status === 'locked' ? 'bg-slate-100 text-slate-400' : ICON_WRAP[item.id]
          }`}
        >
          {ICONS[item.id]}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className={`truncate text-sm font-bold ${muted ? 'text-slate-400' : 'text-ink'}`}>{item.label}</h4>
              <p className={`text-xs ${muted ? 'text-slate-400' : 'text-ink-mid'}`}>{item.subtitle}</p>
            </div>
            {item.status === 'completed' ? (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-white">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
            ) : null}
          </div>
          <div className="mt-2 flex items-end justify-between gap-2">
            <p className={`text-xs ${muted ? 'text-slate-400' : 'text-ink'}`}>
              <span className="text-sm font-extrabold">{item.current}</span>
              <span className="text-ink-mid">
                {' '}
                / {item.target} {item.unit}
              </span>
            </p>
            <p className={`text-sm font-extrabold ${pctColor}`}>{pct}%</p>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div className={`h-full rounded-full ${bar}`} style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    </article>
  )
}
