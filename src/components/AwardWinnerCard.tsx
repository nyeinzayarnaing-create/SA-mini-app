import type { Award } from '../types'

export function AwardWinnerCard({ award }: { award: Award }) {
  return (
    <article className="rounded-2xl border border-secondary/40 bg-white p-4 shadow-[0_8px_24px_rgba(0,84,166,0.08)]">
      <div className="flex gap-3">
        <img
          src={award.winnerPhoto}
          alt={award.winnerName}
          className="h-16 w-16 shrink-0 rounded-2xl bg-ink-soft object-cover ring-2 ring-secondary"
        />
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">{award.title}</p>
          <h2 className="mt-0.5 truncate text-base font-extrabold text-ink">{award.winnerName}</h2>
          <p className="truncate font-mono text-[11px] text-primary">{award.winnerId}</p>
        </div>
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
        <Field label="College Name" value={award.collegeName} />
        <Field label="Batch" value={award.saBatch} />
        <Field label="Award Title" value={award.title} />
        <Field label="Awarded Year" value={award.awardedYear} />
      </dl>
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-ink-mid">Achievement</p>
      <p className="mt-0.5 text-xs leading-snug text-ink">{award.achievement}</p>
    </article>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[10px] font-semibold uppercase tracking-wide text-ink-mid">{label}</dt>
      <dd className="truncate font-semibold text-ink">{value}</dd>
    </div>
  )
}
