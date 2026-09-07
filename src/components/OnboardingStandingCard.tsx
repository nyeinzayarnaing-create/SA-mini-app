import { Crown, Users } from 'lucide-react'
import type { OnboardingStanding } from '../lib/hall'

/** Profile / Achievement leaderboard block for Highest Onboarding. */
export function OnboardingStandingCard({
  standing,
  embedded = false,
}: {
  standing: OnboardingStanding
  /** When true, skip the outer section heading (used inside Achievement). */
  embedded?: boolean
}) {
  const card = (
    <div className="rounded-2xl border border-[#F5C518]/45 bg-gradient-to-r from-[#FFF8E0] via-white to-white p-4 shadow-[0_8px_20px_rgba(196,146,10,0.12)]">
      <div className="flex items-center gap-3">
        <div
          className="relative flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-[#FFE9A0] to-[#F5C518] text-[#5C3D00] shadow-[0_8px_18px_rgba(196,146,10,0.35)] ring-1 ring-[#F5C518]/70"
          aria-label={`Leaderboard rank ${standing.rank}`}
        >
          <Crown className="absolute -top-2 h-3.5 w-3.5 text-[#C4920A]" fill="currentColor" aria-hidden />
          <span className="text-[9px] font-bold uppercase tracking-wide opacity-70">Rank</span>
          <span className="text-[18px] font-extrabold leading-none">{standing.rank}</span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#C4920A]">
            Leaderboard
          </p>
          <p className="mt-0.5 text-[15px] font-extrabold text-ink">
            Rank #{standing.rank}
            <span className="font-semibold text-ink-mid"> of {standing.total}</span>
          </p>
          <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#F5C518]/18 px-2.5 py-1 text-[12px] font-extrabold text-[#8A5A00]">
            <Users className="h-3.5 w-3.5" />
            Onboarding Count: {standing.count}
          </p>
        </div>
      </div>
    </div>
  )

  if (embedded) return card

  return (
    <section className="mt-4">
      <h2 className="mb-2 text-sm font-bold text-ink">Highest Onboarding</h2>
      {card}
    </section>
  )
}
