import type { RegistrationInfo } from '../types'

export function RegistrationSummary({
  info,
  title = 'Registered information',
}: {
  info: RegistrationInfo
  title?: string
}) {
  return (
    <section className="mt-5 overflow-hidden rounded-2xl border border-[#EEEFF3] bg-white shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
      <div className="border-b border-[#EEEFF3] bg-[#F8FBFD] px-4 py-3">
        <h2 className="text-[15px] font-extrabold text-[#1B2A4A]">{title}</h2>
      </div>

      <div className="px-4">
        <p className="pt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A93A6]">Ambassador details</p>
        <InfoRow label="Student name" value={info.fullName} />
        <InfoRow label="SA ID" value={info.ambassadorId} />
        <InfoRow label="Age" value={info.age} />
        <InfoRow label="SA Batch" value={info.batch} />
        <InfoRow label="College Name" value={info.university} />
        {info.trainingRegion ? <InfoRow label="Training Region" value={info.trainingRegion} /> : null}
      </div>

      <div className="border-t border-[#EEEFF3] px-4 pb-1">
        <p className="pt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A93A6]">Contact information</p>
        <InfoRow label="Phone number" value={info.phone} />
        {info.email ? <InfoRow label="Email address" value={info.email} /> : null}
        <InfoRow label="Current address" value={info.address} stacked />
      </div>
      {info.cvFileName || info.interest ? (
        <div className="border-t border-[#EEEFF3] px-4 pb-1">
          <p className="pt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A93A6]">Additional information</p>
          {info.cvFileName ? <InfoRow label="CV" value={info.cvFileName} /> : null}
          {info.interest ? <InfoRow label="Why this position" value={info.interest} stacked /> : null}
        </div>
      ) : null}
    </section>
  )
}

function InfoRow({
  label,
  value,
  stacked = false,
}: {
  label: string
  value: string
  stacked?: boolean
}) {
  if (stacked) {
    return (
      <div className="border-t border-[#F2F4F8] py-3 first:border-t-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8A93A6]">{label}</p>
        <p className="mt-1 text-sm font-semibold leading-relaxed text-[#1B2A4A]">{value}</p>
      </div>
    )
  }

  return (
    <div className="flex items-start justify-between gap-4 border-t border-[#F2F4F8] py-3 first:border-t-0">
      <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-[#8A93A6]">{label}</span>
      <span className="text-right text-sm font-semibold leading-snug text-[#1B2A4A]">{value}</span>
    </div>
  )
}
