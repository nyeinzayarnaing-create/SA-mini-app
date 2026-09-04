import { Gem } from 'lucide-react'
import type { CareerExperience, CareerRole } from '../lib/career'

function SkillsLine({ skills }: { skills: string[] }) {
  if (skills.length === 0) return null
  const shown = skills.slice(0, 2)
  const extra = skills.length - shown.length
  return (
    <p className="mt-1.5 flex items-start gap-1.5 text-[12px] leading-snug text-ink-mid">
      <Gem className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-mid" aria-hidden />
      <span>
        <span className="font-semibold text-ink">{shown.join(', ')}</span>
        {extra > 0 ? (
          <>
            {' '}
            and <span className="font-semibold text-ink">+{extra} skills</span>
          </>
        ) : null}
      </span>
    </p>
  )
}

function RoleDetails({ role, compact }: { role: CareerRole; compact?: boolean }) {
  return (
    <div className={compact ? 'min-w-0 flex-1 pb-4 last:pb-0' : 'min-w-0 flex-1'}>
      <h4 className="text-[15px] font-extrabold leading-snug text-ink">{role.title}</h4>
      <p className="mt-0.5 text-[12px] font-semibold text-ink-mid">
        {role.rangeLabel} · {role.durationLabel}
      </p>
      {role.location ? (
        <p className="mt-0.5 text-[12px] font-semibold text-ink-mid">
          {role.location}
          {role.workType ? ` · ${role.workType}` : ''}
        </p>
      ) : null}
      <SkillsLine skills={role.skills} />
    </div>
  )
}

function CompanyMark({ text }: { text: string }) {
  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-[11px] font-extrabold tracking-wide text-white shadow-sm"
      aria-hidden
    >
      {text}
    </div>
  )
}

/** LinkedIn-style career progress for Internship → Permanent. */
export function CareerProgress({ experience }: { experience: CareerExperience }) {
  const multi = experience.roles.length > 1

  if (!multi) {
    const role = experience.roles[0]!
    return (
      <article className="rounded-2xl border border-line bg-white p-4 shadow-[0_6px_18px_rgba(0,84,166,0.06)]">
        <div className="flex items-start gap-3">
          <CompanyMark text={experience.companyLogoText} />
          <div className="min-w-0 flex-1">
            <h3 className="text-[15px] font-extrabold text-ink">{role.title}</h3>
            <p className="mt-0.5 text-[12px] font-semibold text-ink-mid">{experience.company}</p>
            <p className="mt-0.5 text-[12px] font-semibold text-ink-mid">
              {experience.employmentType}
            </p>
            <p className="mt-0.5 text-[12px] font-semibold text-ink-mid">
              {role.rangeLabel} · {role.durationLabel}
            </p>
            {role.location ? (
              <p className="mt-0.5 text-[12px] font-semibold text-ink-mid">
                {role.location}
                {role.workType ? ` · ${role.workType}` : ''}
              </p>
            ) : null}
            <SkillsLine skills={role.skills} />
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="rounded-2xl border border-line bg-white p-4 shadow-[0_6px_18px_rgba(0,84,166,0.06)]">
      <div className="flex items-start gap-3">
        <CompanyMark text={experience.companyLogoText} />
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-extrabold text-ink">{experience.company}</h3>
          <p className="mt-0.5 text-[12px] font-semibold text-ink-mid">
            {experience.employmentType} · {experience.totalDurationLabel}
          </p>
        </div>
      </div>

      <ol className="relative mt-3 ml-[22px] border-l border-[#D0D5DD] pl-5">
        {experience.roles.map((role) => (
          <li key={role.id} className="relative">
            <span
              className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[#98A2B3] bg-white"
              aria-hidden
            />
            <RoleDetails role={role} compact />
          </li>
        ))}
      </ol>
    </article>
  )
}
