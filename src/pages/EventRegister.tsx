import { ChevronLeft, Clock, MapPin, Upload } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { SuccessRegisterIllu } from '../components/Illustrations'
import { useProfile } from '../context/ProfileContext'
import { announcements, ambassadorAge } from '../data/mock'
import { isRegisterClosed, readActions, setAction, setRegistration } from '../lib/announcementActions'

export function EventRegister() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const fromActivity = searchParams.get('from') === 'activity'
  const detailPath = `/announcements/${id}${fromActivity ? '?from=activity' : ''}`
  const listPath = fromActivity ? '/my-activity' : '/announcements'
  const { user } = useProfile()
  const item = announcements.find(
    (entry) =>
      entry.id === id &&
      (entry.category === 'event' || entry.category === 'volunteer' || entry.category === 'job'),
  )

  const [sameKbzPhone, setSameKbzPhone] = useState(false)
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState(user.email)
  const [address, setAddress] = useState('')
  const [cvFileName, setCvFileName] = useState('')
  const [interest, setInterest] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!item) return <Navigate to={listPath} replace />
  if (readActions()[item.id] && !submitted) return <Navigate to={detailPath} replace />
  if (isRegisterClosed(item.closeDate) && !submitted) return <Navigate to={listPath} replace />

  const kindLabel =
    item.category === 'job' ? 'Job' : item.category === 'volunteer' ? 'Volunteer' : 'Event'

  const isJob = item.category === 'job'

  function toggleKbzPhone() {
    setSameKbzPhone((on) => {
      const next = !on
      setPhone(next ? user.phone : '')
      return next
    })
  }

  function submit(eventSubmit: FormEvent) {
    eventSubmit.preventDefault()
    if (!phone.trim()) {
      setError('Please enter a phone number, or turn on the KBZPay toggle to auto-fill.')
      return
    }
    if (isJob) {
      if (!email.trim()) {
        setError('Please enter your email address.')
        return
      }
      if (!cvFileName) {
        setError('Please upload your CV.')
        return
      }
      if (!interest.trim()) {
        setError('Please tell us why you are interested in this position.')
        return
      }
    }
    if (!address.trim()) {
      setError('Please enter your current address.')
      return
    }
    setRegistration(item.id, {
      fullName: user.name,
      ambassadorId: user.id,
      age: String(ambassadorAge(user)),
      batch: user.saBatch,
      university: user.schoolName,
      trainingRegion: user.trainingRegion,
      sameKbzPhone,
      phone: phone.trim(),
      address: address.trim(),
      ...(isJob
        ? {
            email: email.trim(),
            cvFileName,
            interest: interest.trim(),
          }
        : {}),
    })
    setAction(item.id, true)
    setSubmitted(true)
  }

  return (
    <main className="min-h-svh bg-sky px-4 pb-6 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="mb-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(detailPath)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary shadow-sm ring-1 ring-line"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{kindLabel}</p>
          <h1 className="text-xl font-extrabold text-ink">{item.category === 'job' ? 'Apply' : 'Register'}</h1>
        </div>
      </header>

      {submitted ? (
        <section className="flex flex-col items-center rounded-2xl border border-line bg-white px-5 py-8 text-center shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
          <SuccessRegisterIllu className="h-40 w-48" />
          <h2 className="mt-4 text-2xl font-extrabold text-ink">
            {item.category === 'job' ? 'Successfully applied' : 'Successfully registered'}
          </h2>
          <span className="mt-3 inline-flex rounded-full bg-[#FFF3C4] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-[#8A5A00]">
            Pending approval
          </span>
          <p className="mt-3 text-sm leading-relaxed text-ink-mid">
            Your {item.category === 'job' ? 'application' : 'registration'} for{' '}
            <span className="font-semibold text-ink">{item.title}</span> was submitted.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-mid">
            Your request will be reviewed by the Admin. You will receive a notification after approval.
          </p>
          <button
            type="button"
            onClick={() => navigate(detailPath)}
            className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-primary text-[15px] font-bold text-white shadow-[0_8px_18px_rgba(0,84,166,0.28)]"
          >
            Done
          </button>
        </section>
      ) : (
        <>
      <section className="mb-4 rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
        <h2 className="text-[17px] font-extrabold leading-snug text-ink">{item.title}</h2>
        <div className="mt-2.5 space-y-1.5 text-[13px] text-ink-mid">
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-primary" />
            {item.date}
            {item.time ? ` | ${item.time}` : ''}
          </p>
          {item.location ? (
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              {item.location}
            </p>
          ) : null}
        </div>
      </section>

      <form onSubmit={submit} className="space-y-4">
        <section className="rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
          <h2 className="text-sm font-extrabold text-ink">Ambassador details</h2>
          <p className="mt-1 text-[11px] text-ink-mid">Filled from your profile. You can’t edit these here.</p>
          <div className="mt-3 space-y-3">
            <DisabledField label="Student name" value={user.name} />
            <DisabledField label="SA ID" value={user.id} />
            <DisabledField label="Age" value={String(ambassadorAge(user))} />
            <DisabledField label="SA Batch" value={user.saBatch} />
            <DisabledField label="College Name" value={user.schoolName} />
            <DisabledField label="Training Region" value={user.trainingRegion} />
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
          <h2 className="text-sm font-extrabold text-ink">Contact information</h2>

          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-sky px-3 py-3">
            <p className="min-w-0 flex-1 text-[13px] font-semibold leading-snug text-ink">
              Same phone number as KBZPay registered?
            </p>
            <button
              type="button"
              role="switch"
              aria-checked={sameKbzPhone}
              onClick={toggleKbzPhone}
              className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 ${
                sameKbzPhone ? 'bg-primary' : 'bg-[#C9D4DE]'
              }`}
            >
              <span
                className={`block h-6 w-6 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-transform duration-200 ease-out ${
                  sameKbzPhone ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <label className="mt-3 block">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-mid">Phone number</span>
            <input
              type="tel"
              value={phone}
              disabled={sameKbzPhone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={sameKbzPhone ? user.phone : 'Enter phone number'}
              className="mt-1 h-11 w-full rounded-xl border border-line bg-sky px-3 text-sm text-ink disabled:cursor-not-allowed disabled:opacity-60"
            />
          </label>

          {isJob ? (
            <label className="mt-3 block">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-mid">Email address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="mt-1 h-11 w-full rounded-xl border border-line bg-sky px-3 text-sm text-ink"
              />
            </label>
          ) : null}

          <label className="mt-3 block">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-mid">Current address</span>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              placeholder="Enter your current address"
              className="mt-1 w-full resize-none rounded-xl border border-line bg-sky px-3 py-2.5 text-sm text-ink"
            />
          </label>
        </section>

        {isJob ? (
          <>
            <section className="rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
              <h2 className="text-sm font-extrabold text-ink">Upload CV</h2>
              <p className="mt-1 text-[11px] text-ink-mid">PDF, DOC, or DOCX. Max 10 MB.</p>
              <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-primary/40 bg-sky px-4 py-6 text-center">
                <Upload className="h-6 w-6 text-primary" />
                <span className="mt-2 text-sm font-extrabold text-primary">
                  {cvFileName ? 'Replace CV' : 'Upload CV'}
                </span>
                <span className="mt-1 text-[12px] font-semibold text-ink-mid">
                  {cvFileName || 'Tap to choose a file'}
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf"
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    setCvFileName(file ? file.name : '')
                  }}
                />
              </label>
            </section>

            <section className="rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
              <h2 className="text-sm font-extrabold text-ink">Additional info</h2>
              <label className="mt-3 block">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-mid">
                  Why are you interested in this position?
                </span>
                <textarea
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  rows={4}
                  placeholder="Write a short answer"
                  className="mt-1 w-full resize-none rounded-xl border border-line bg-sky px-3 py-2.5 text-sm text-ink"
                />
              </label>
            </section>
          </>
        ) : null}

        {error ? <p className="text-xs font-semibold text-rose-600">{error}</p> : null}

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center rounded-full bg-primary text-[15px] font-bold text-white shadow-[0_8px_18px_rgba(0,84,166,0.28)]"
        >
          {isJob ? 'Apply Now' : 'Submit'}
        </button>
      </form>
        </>
      )}
    </main>
  )
}

function DisabledField({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-mid">{label}</span>
      <input
        type="text"
        value={value}
        disabled
        readOnly
        className="mt-1 h-11 w-full cursor-not-allowed rounded-xl border border-line bg-[#E8F0F6] px-3 text-sm font-semibold text-ink opacity-80"
      />
    </label>
  )
}
