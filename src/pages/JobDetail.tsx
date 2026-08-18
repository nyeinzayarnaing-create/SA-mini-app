import { Briefcase, Building2, Check, ChevronLeft, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { CompanyMark } from '../components/JobCard'
import { RegistrationSummary } from '../components/RegistrationSummary'
import { StatusBadge } from '../components/StatusBadge'
import { useProfile } from '../context/ProfileContext'
import { useSeen } from '../context/SeenContext'
import { ambassadorAge, announcements } from '../data/mock'
import {
  announcementStatus,
  getRegistration,
  readActions,
  resolveStatus,
} from '../lib/announcementActions'

export function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const fromActivity = searchParams.get('from') === 'activity'
  const backTo = fromActivity ? '/my-activity' : '/announcements'
  const { markSeen } = useSeen()
  const { user } = useProfile()
  const item = announcements.find((entry) => entry.id === id && entry.category === 'job')
  const [actions] = useState(readActions)
  const activity = item ? resolveStatus(item, actions[item.id]) : null
  const status = item ? announcementStatus(item, actions[item.id]) : null
  const applied = Boolean(activity)
  const closed = status === 'closed'

  useEffect(() => {
    if (item) markSeen(item.id)
  }, [item, markSeen])

  if (!item) return <Navigate to={backTo} replace />

  const description = item.details ?? item.body

  return (
    <main className="min-h-svh bg-sky px-4 pb-[max(6rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="mb-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(backTo)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary shadow-sm ring-1 ring-line"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Job</p>
          <h1 className="truncate text-xl font-extrabold text-ink">Details</h1>
        </div>
        {applied ? (
          <span className="inline-flex rounded-full bg-[#DCFCE7] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#166534]">
            Applied
          </span>
        ) : status ? (
          <StatusBadge status={status} />
        ) : null}
      </header>

      <section className="rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
        <div className="flex gap-3">
          <CompanyMark code={item.companyLogo} name={item.companyName} size="lg" />
          <div className="min-w-0 flex-1">
            <h2 className="text-[18px] font-extrabold leading-snug text-ink">{item.title}</h2>
            {item.companyName ? (
              <p className="mt-1 text-sm font-semibold text-ink">{item.companyName}</p>
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
      </section>

      <section className="mt-3 rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
        <h3 className="text-[15px] font-extrabold text-ink">Job description</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-mid">{description}</p>
      </section>

      {item.requirements?.length ? (
        <section className="mt-3 rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
          <h3 className="text-[15px] font-extrabold text-ink">Job requirements</h3>
          <ul className="mt-2 space-y-2">
            {item.requirements.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-ink-mid">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {item.benefits?.length ? (
        <section className="mt-3 rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
          <h3 className="text-[15px] font-extrabold text-ink">Benefits</h3>
          <ul className="mt-2 space-y-2">
            {item.benefits.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-ink-mid">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {applied ? (
        <div className="mt-3">
          <RegistrationSummary
            title="Applied information"
            info={
              getRegistration(item.id) ?? {
                fullName: user.name,
                ambassadorId: user.id,
                age: String(ambassadorAge(user)),
                batch: user.saBatch,
                university: user.schoolName,
                sameKbzPhone: true,
                phone: user.phone,
                address: user.schoolName,
              }
            }
          />
        </div>
      ) : null}

      {applied || closed ? null : (
        <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 bg-sky px-4 pt-2 pb-[max(0.85rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={() =>
              navigate(`/announcements/${item.id}/register${fromActivity ? '?from=activity' : ''}`)
            }
            className="flex h-12 w-full items-center justify-center rounded-full bg-primary text-[15px] font-bold text-white shadow-[0_8px_18px_rgba(0,84,166,0.28)]"
          >
            Apply
          </button>
        </div>
      )}
    </main>
  )
}
