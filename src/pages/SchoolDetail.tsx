import { Calendar, ChevronLeft, MapPin, Users } from 'lucide-react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { SchoolMark } from '../components/SchoolCard'
import { ambassadors, schools } from '../data/mock'

export function SchoolDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const school = schools.find((entry) => entry.id === id)

  if (!school) return <Navigate to="/schools" replace />

  const active = school.status === 'Active'
  const squad = ambassadors.filter((person) => person.schoolId === school.id).slice(0, 4)

  return (
    <main className="relative min-h-svh bg-white">
      <section className="relative h-[240px] overflow-hidden bg-[#00315F]">
        <img src={school.banner} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55" />
        <button
          type="button"
          onClick={() => navigate('/schools')}
          className="absolute left-4 top-[max(0.85rem,env(safe-area-inset-top))] z-10 inline-flex items-center gap-0.5 text-[15px] font-medium text-white"
        >
          <ChevronLeft className="h-6 w-6" />
          back
        </button>
        <span
          className={`absolute right-3 top-[max(0.85rem,env(safe-area-inset-top))] z-10 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide shadow-sm ${
            active ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#EEF0F4] text-[#6B7280]'
          }`}
        >
          {school.status}
        </span>
      </section>

      <section className="relative -mt-8 rounded-t-[28px] bg-white px-5 pb-10 pt-5">
        <div className="flex items-end gap-3">
          <div className="-mt-10 shrink-0 rounded-[22px] bg-white p-1 shadow-[0_8px_20px_rgba(0,84,166,0.12)]">
            <SchoolMark school={school} size="lg" />
          </div>
          <div className="min-w-0 flex-1 pb-0.5">
            <h1 className="text-[20px] font-extrabold leading-snug text-ink">{school.name}</h1>
            <span
              className={`mt-1.5 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
                school.type === 'government' ? 'bg-[#E8F1FA] text-primary' : 'bg-[#E6F8FD] text-[#0A73C7]'
              }`}
            >
              {school.type === 'government' ? 'Government' : 'Private'}
            </span>
          </div>
        </div>

        <p className="mt-4 flex items-center gap-2 text-[13px] font-semibold text-ink-mid">
          <MapPin className="h-4 w-4 text-primary" />
          {school.location}
        </p>

        <h2 className="mt-5 text-[17px] font-extrabold text-ink">About School</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-mid">{school.about}</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-sky px-3 py-3">
            <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-ink-mid">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              Partner since
            </p>
            <p className="mt-1 text-sm font-extrabold text-ink">{school.partnerSince}</p>
          </div>
          <div className="rounded-2xl bg-sky px-3 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-mid">Status</p>
            <p className={`mt-1 text-sm font-extrabold ${active ? 'text-[#166534]' : 'text-[#6B7280]'}`}>
              {school.status}
            </p>
          </div>
        </div>

        <h2 className="mt-6 text-[17px] font-extrabold text-ink">Details</h2>
        <dl className="mt-3 divide-y divide-line rounded-2xl border border-line bg-white">
          <DetailRow label="School type" value={school.type === 'government' ? 'Government' : 'Private'} />
          <DetailRow label="Region" value={school.region} />
          <DetailRow label="City" value={school.city} />
          <DetailRow label="Founded" value={school.founded} />
          <DetailRow label="Focus" value={school.focus} />
          <DetailRow label="Student Ambassadors" value={String(school.ambassadorCount)} />
        </dl>

        {squad.length > 0 ? (
          <div className="mt-5 flex items-center gap-2">
            <div className="flex">
              {squad.map((person, index) => (
                <img
                  key={person.id}
                  src={person.photo}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                  style={{ marginLeft: index === 0 ? 0 : -8 }}
                />
              ))}
            </div>
            <p className="flex items-center gap-1 text-sm text-ink-mid">
              <Users className="h-4 w-4 text-primary" />
              {school.ambassadorCount} Student Ambassadors
            </p>
          </div>
        ) : (
          <p className="mt-4 flex items-center gap-1 text-sm text-ink-mid">
            <Users className="h-4 w-4 text-primary" />
            {school.ambassadorCount} Student Ambassadors
          </p>
        )}
      </section>
    </main>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3">
      <dt className="text-[12px] font-semibold text-ink-mid">{label}</dt>
      <dd className="text-right text-[13px] font-extrabold text-ink">{value}</dd>
    </div>
  )
}
