import { Check, ChevronLeft, Clock, Download, FileText, MapPin } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { RegistrationSummary } from '../components/RegistrationSummary'
import { StatusBadge } from '../components/StatusBadge'
import { useProfile } from '../context/ProfileContext'
import { useSeen } from '../context/SeenContext'
import { ambassadorAge, ambassadors, announcements } from '../data/mock'
import {
  announcementStatus,
  getRegistration,
  readActions,
  resolveStatus,
  setAction,
} from '../lib/announcementActions'

export function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const fromActivity = searchParams.get('from') === 'activity'
  const backTo = fromActivity ? '/my-activity' : '/announcements'
  const { markSeen } = useSeen()
  const { user } = useProfile()
  const item = announcements.find((entry) => entry.id === id)
  const [expanded, setExpanded] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [actions, setActions] = useState(readActions)
  const [confirmCancel, setConfirmCancel] = useState(false)
  const activity = item ? resolveStatus(item, actions[item.id]) : null
  const status = item ? announcementStatus(item, actions[item.id]) : null
  const registered = Boolean(activity)
  const closed = status === 'closed'
  const pending = status === 'pending'
  const isJob = item?.category === 'job'
  const isVolunteer = item?.category === 'volunteer'

  useEffect(() => {
    if (item) markSeen(item.id)
  }, [item, markSeen])

  const gallery = useMemo(() => {
    if (!item?.photo) return []
    return [item.photo, extraPhoto(item.id)].filter(Boolean) as string[]
  }, [item])

  const going = ambassadors.slice(0, 3)
  const hosts = ambassadors.slice(1, 4)

  function cancelRegistration() {
    if (!item) return
    setActions(setAction(item.id, 'cancelled'))
    setConfirmCancel(false)
  }

  if (!item) return <Navigate to={backTo} replace />

  const synopsis = item.details ?? item.body
  const shortSynopsis = synopsis.length > 150 && !expanded ? `${synopsis.slice(0, 150).trim()}...` : synopsis
  const kindLabel = isJob ? 'Job' : isVolunteer ? 'Volunteer' : 'Event'
  const peopleLabel = isJob || isVolunteer ? 'Applied' : 'Going'
  const ctaLabel = item.category === 'event' ? 'Register' : 'Apply'
  const tags =
    item.tags ??
    ([item.employmentType, item.industry, item.companyName].filter(Boolean) as string[])
  const highlights = item.highlights ?? item.requirements?.slice(0, 3)

  return (
    <main className="relative min-h-svh bg-white">
      <section className="relative h-[280px] bg-primary">
        {gallery[photoIndex] || item.photo ? (
          <img
            src={gallery[photoIndex] ?? item.photo}
            alt={item.title}
            className="h-full w-full object-cover"
            onClick={() => setPhotoIndex((i) => (i + 1) % Math.max(gallery.length, 1))}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/20" />
        <button
          type="button"
          onClick={() => navigate(backTo)}
          className="absolute left-4 top-[max(0.85rem,env(safe-area-inset-top))] z-10 inline-flex items-center gap-0.5 text-[15px] font-medium text-white"
        >
          <ChevronLeft className="h-6 w-6" />
          back
        </button>
        {status === 'pending' || status === 'approved' ? (
          <StatusBadge
            status={status}
            category={item.category}
            className="absolute right-3 top-[max(0.85rem,env(safe-area-inset-top))] z-10 shadow-sm"
          />
        ) : null}
        {gallery.length > 1 ? (
          <div className="absolute bottom-11 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {gallery.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Photo ${i + 1}`}
                onClick={() => setPhotoIndex(i)}
                className={`h-1 rounded-full transition-all ${i === photoIndex ? 'w-6 bg-white' : 'w-4 bg-white/45'}`}
              />
            ))}
          </div>
        ) : null}
      </section>

      <section
        className={`relative -mt-8 rounded-t-[28px] bg-white px-5 pt-6 ${
          (pending && !isJob) || (!registered && !closed) ? 'pb-28' : 'pb-8'
        }`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{kindLabel}</p>
        <h1 className="mt-1 text-[26px] font-extrabold leading-tight text-[#1B2A4A]">{item.title}</h1>

        <div className="mt-3 space-y-1.5 text-[13px] text-[#8A93A6]">
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#8A93A6]" />
            {item.date}
            {item.time ? ` | ${item.time}` : ''}
          </p>
          {item.location ? (
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#8A93A6]" />
              {item.location}
            </p>
          ) : null}
          {isJob ? (
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#8A93A6]" />
              Apply close: {item.closeDate}
            </p>
          ) : null}
        </div>

        {tags.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#E4E7EE] px-3 py-1 text-[11px] font-medium text-[#7A8499]"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {!isJob ? (
          <div className="mt-4 flex items-center gap-2">
            <div className="flex">
              {going.map((person, index) => (
                <img
                  key={person.id}
                  src={person.photo}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                  style={{ marginLeft: index === 0 ? 0 : -8 }}
                />
              ))}
            </div>
            <p className="text-sm text-[#8A93A6]">
              +{item.goingCount ?? going.length} {peopleLabel}
            </p>
          </div>
        ) : null}

        <hr className="mt-4 border-[#EEEFF3]" />

        {isJob ? (
          <>
            <h2 className="mt-4 text-[17px] font-extrabold text-[#1B2A4A]">Job Summary</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-[#8A93A6]">{synopsis}</p>

            {item.responsibilities?.length ? (
              <>
                <h2 className="mt-5 text-[17px] font-extrabold text-[#1B2A4A]">Job Responsibilities</h2>
                <ul className="mt-2 space-y-2">
                  {item.responsibilities.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-[13px] text-[#8A93A6]">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {item.requirements?.length ? (
              <>
                <h2 className="mt-5 text-[17px] font-extrabold text-[#1B2A4A]">Job Requirements</h2>
                <ul className="mt-2 space-y-2">
                  {item.requirements.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-[13px] text-[#8A93A6]">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {item.descriptionFileUrl ? (
              <>
                <h2 className="mt-5 text-[17px] font-extrabold text-[#1B2A4A]">Job description</h2>
                <div className="mt-2 rounded-2xl border border-line bg-sky/50 p-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-line">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-extrabold text-ink">
                        {item.descriptionFileName ?? 'Job-Description.pdf'}
                      </p>
                      <p className="mt-0.5 text-[11px] font-semibold text-ink-mid">PDF document</p>
                      <a
                        href={item.descriptionFileUrl}
                        download={item.descriptionFileName ?? 'Job-Description.pdf'}
                        className="mt-2 inline-flex h-8 items-center gap-1 rounded-full bg-primary px-3 text-[11px] font-bold text-white"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </>
        ) : (
          <>
            <h2 className="mt-4 text-[17px] font-extrabold text-[#1B2A4A]">Synopsis</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-[#8A93A6]">
              {shortSynopsis}{' '}
              {synopsis.length > 150 ? (
                <button
                  type="button"
                  onClick={() => setExpanded((open) => !open)}
                  className="font-semibold text-primary"
                >
                  {expanded ? 'see less' : 'see more'}
                </button>
              ) : null}
            </p>
            {expanded && highlights?.length ? (
              <ul className="mt-2 space-y-1">
                {highlights.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-[13px] text-[#8A93A6]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        )}

        {item.category === 'event' ? (
          <>
            <h2 className="mt-5 text-[17px] font-extrabold text-[#1B2A4A]">Host</h2>
            <div className="mt-3 flex gap-3">
              {hosts.map((person) => (
                <img
                  key={person.id}
                  src={person.photo}
                  alt={person.name}
                  title={person.name}
                  className="h-[72px] w-[72px] rounded-2xl object-cover"
                />
              ))}
            </div>
          </>
        ) : null}

        {status ? (
          <div className="mt-5 flex items-center justify-between rounded-xl bg-sky px-3 py-3">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-mid">Status</span>
            <StatusBadge status={status} category={item.category} />
          </div>
        ) : null}

        {registered ? (
          <RegistrationSummary
            title={isJob ? 'Applied information' : undefined}
            info={
              getRegistration(item.id) ?? {
                fullName: user.name,
                ambassadorId: user.id,
                age: String(ambassadorAge(user)),
                batch: user.saBatch,
                university: user.schoolName,
                trainingRegion: user.trainingRegion,
                sameKbzPhone: true,
                phone: user.phone,
                address: user.schoolName,
              }
            }
          />
        ) : null}
      </section>

      {pending && !isJob ? (
        <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 bg-white px-4 pt-2 pb-[max(0.85rem,env(safe-area-inset-bottom))]">
          {confirmCancel ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmCancel(false)}
                className="flex h-12 flex-1 items-center justify-center rounded-full border border-line bg-white text-[15px] font-bold text-ink"
              >
                Keep
              </button>
              <button
                type="button"
                onClick={cancelRegistration}
                className="flex h-12 flex-1 items-center justify-center rounded-full bg-[#B91C1C] text-[15px] font-bold text-white shadow-[0_8px_18px_rgba(185,28,28,0.24)]"
              >
                Confirm cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmCancel(true)}
              className="flex h-12 w-full items-center justify-center rounded-full border border-[#B91C1C] bg-white text-[15px] font-bold text-[#B91C1C]"
            >
              Cancel
            </button>
          )}
        </div>
      ) : registered || closed ? null : (
        <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 bg-white px-4 pt-2 pb-[max(0.85rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={() =>
              navigate(`/announcements/${item.id}/register${fromActivity ? '?from=activity' : ''}`)
            }
            className="flex h-12 w-full items-center justify-center rounded-full bg-primary text-[15px] font-bold text-white shadow-[0_8px_18px_rgba(0,84,166,0.28)]"
          >
            {ctaLabel}
          </button>
        </div>
      )}
    </main>
  )
}

function extraPhoto(id: string) {
  const extras: Record<string, string> = {
    a3: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&h=640&q=80',
    a2: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&h=640&q=80',
    a6: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&h=640&q=80',
    a5: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&h=640&q=80',
    v1: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&h=640&q=80',
    v2: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&h=640&q=80',
    v3: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&h=640&q=80',
    j1: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&h=640&q=80',
    j2: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&h=640&q=80',
    j3: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&h=640&q=80',
  }
  return extras[id]
}
