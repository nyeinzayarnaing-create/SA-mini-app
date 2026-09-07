import type { ReactNode } from 'react'
import { ambassadors } from '../data/mock'
import { careerProgressOf } from '../lib/career'
import { badgeGotDateOf, hallBadgesOf, onboardingStandingOf } from '../lib/hall'
import type { Ambassador } from '../types'
import { AchievementTitleBanner } from './AchievementTitleBanner'
import { CareerProgress } from './CareerProgress'
import { OnboardingStandingCard } from './OnboardingStandingCard'

function AchieveBlock({
  label,
  gotDate,
  showDivider,
  children,
}: {
  label: string
  gotDate?: string
  showDivider?: boolean
  children: ReactNode
}) {
  return (
    <div className={showDivider ? 'border-t border-line pt-5' : undefined}>
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-mid">{label}</p>
        {gotDate ? (
          <p className="text-[11px] font-semibold text-ink-mid">
            Achievement Got Date · {gotDate}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  )
}

/** Clean Achievement board on profile (Hall badges only). */
export function ProfileAchievements({ ambassador }: { ambassador: Ambassador }) {
  const badges = hallBadgesOf(ambassador)
  if (badges.length === 0) return null

  const normalized = { ...ambassador, badges }
  const pool = ambassadors.map((entry) => ({ ...entry, badges: hallBadgesOf(entry) }))
  const standing = badges.includes('Highest Onboarding')
    ? onboardingStandingOf(normalized, pool)
    : null
  const showCreator = badges.includes('Youth Creator')
  const creatorTitle = ambassador.youthCreatorAwardTitle
  const career =
    badges.includes('Internship') || badges.includes('Permanent')
      ? careerProgressOf(normalized)
      : null

  if (!standing && !showCreator && !career) return null

  let blockIndex = 0

  return (
    <section className="mt-4">
      <h2 className="mb-3 text-sm font-bold text-ink">Achievement</h2>

      <div className="space-y-5 rounded-2xl border border-line bg-white p-4 shadow-[0_6px_18px_rgba(0,84,166,0.06)]">
        {standing ? (
          <AchieveBlock
            label="Leaderboard"
            gotDate={badgeGotDateOf(ambassador, 'Highest Onboarding')}
            showDivider={blockIndex++ > 0}
          >
            <OnboardingStandingCard standing={standing} embedded />
            {ambassador.onboardingAwardTitle ? (
              <div className="mt-2.5">
                <AchievementTitleBanner title={ambassador.onboardingAwardTitle} />
              </div>
            ) : null}
          </AchieveBlock>
        ) : null}

        {showCreator ? (
          <AchieveBlock
            label="Creator Title"
            gotDate={badgeGotDateOf(ambassador, 'Youth Creator')}
            showDivider={blockIndex++ > 0}
          >
            {creatorTitle ? (
              <AchievementTitleBanner title={creatorTitle} />
            ) : (
              <p className="text-[13px] font-semibold text-ink-mid">No creator title yet.</p>
            )}
          </AchieveBlock>
        ) : null}

        {career ? (
          <AchieveBlock label="Career Progress" showDivider={blockIndex++ > 0}>
            <CareerProgress experience={career} />
          </AchieveBlock>
        ) : null}
      </div>
    </section>
  )
}
