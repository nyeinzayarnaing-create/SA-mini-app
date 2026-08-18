import { ChevronLeft, Pencil } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { CertificateList } from '../components/CertificateList'
import { KpiAchievement } from '../components/KpiAchievement'
import { useProfile } from '../context/ProfileContext'
import { ambassadorAge } from '../data/mock'
import { profileBanner } from '../lib/profileBanner'

export function ProfileView() {
  const { user } = useProfile()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const saved = params.get('saved') === '1'
  const banner = profileBanner(user)

  return (
    <main className="min-h-svh bg-sky px-4 pb-8 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm ring-1 ring-line"
            aria-label="Back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Account</p>
            <h1 className="truncate text-xl font-extrabold text-ink">Profile</h1>
          </div>
        </div>
        <Link
          to="/profile/edit"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-white"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </Link>
      </header>

      {saved ? (
        <p className="mb-3 rounded-xl bg-secondary/20 px-3 py-2 text-xs font-semibold text-primary">
          Profile updated.
        </p>
      ) : null}

      {banner ? (
        <div className="mb-4 overflow-hidden rounded-2xl border border-line bg-primary shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
          <img src={banner} alt="" className="h-[160px] w-full object-cover" />
        </div>
      ) : null}

      <section>
        <h2 className="mb-2 text-sm font-bold text-ink">Personal information</h2>
        <div className="space-y-3 rounded-2xl border border-line bg-white p-3">
          <div className="flex items-center gap-3 rounded-xl border border-line bg-sky px-3 py-3">
            <div className="relative h-16 w-16 shrink-0">
              <span className="id-photo-ring absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary" />
              <img
                src={user.photo}
                alt={`${user.name} profile photo`}
                className="relative h-full w-full rounded-2xl bg-ink-soft object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-mid">Profile photo</p>
              <p className="mt-0.5 text-sm font-extrabold text-ink">{user.name}</p>
            </div>
          </div>
          <ReadOnly label="Full Name" value={user.name} />
          <ReadOnly label="SA ID" value={user.id} />
          <ReadOnly label="School Name" value={user.schoolName} />
          <ReadOnly label="Training Region" value={user.trainingRegion} />
          <ReadOnly label="SA Batch" value={user.saBatch} />
          <ReadOnly label="Status" value={user.status} />
          <ReadOnly label="Age" value={String(ambassadorAge(user))} />
          <ReadOnly label="Education / Qualification" value={user.qualification || user.year} />
          <ReadOnly label="Phone Number" value={user.phone} />
          <ReadOnly label="Email Address" value={user.email} />
          <ReadOnly label="Current Address" value={user.currentAddress ?? '—'} />
          <ReadOnly label="Permanent Address" value={user.permanentAddress ?? '—'} />
        </div>
      </section>

      <div className="mt-4">
        <KpiAchievement />
      </div>

      <CertificateList documents={user.certificates ?? []} badges={user.badges} />
    </main>
  )
}

function ReadOnly({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-mid">{label}</span>
      <p className="mt-1 rounded-xl border border-line bg-sky px-3 py-2.5 text-sm font-semibold text-ink">{value}</p>
    </div>
  )
}
