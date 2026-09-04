import { Crown, GraduationCap, MapPin, Medal, Sparkles, Users } from 'lucide-react'
import type { Ambassador, HallTag } from '../types'
import { AvatarImage } from './AvatarImage'
import { HallBadgeStack } from './HallBadgeStack'

function RankMark({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div
        className="lb-rank-pulse relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-[#FFE9A0] to-[#F5C518] text-[#5C3D00] shadow-[0_8px_18px_rgba(196,146,10,0.4)] ring-1 ring-[#F5C518]/80"
        aria-label={`Rank ${rank}`}
      >
        <Crown
          className="lb-crown-bob absolute -top-2.5 h-4 w-4 text-[#C4920A]"
          fill="currentColor"
          aria-hidden
        />
        <span className="text-[17px] font-extrabold leading-none">{rank}</span>
      </div>
    )
  }
  if (rank === 2) {
    return (
      <div
        className="lb-rank-pulse lb-rank-delay-1 relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-[#F8FAFC] to-[#C8CDD6] text-[#374151] shadow-[0_8px_16px_rgba(75,85,99,0.22)] ring-1 ring-[#9CA3AF]/55"
        aria-label={`Rank ${rank}`}
      >
        <Medal className="lb-medal-tilt absolute -top-2 h-3.5 w-3.5 text-[#6B7280]" aria-hidden />
        <span className="text-[17px] font-extrabold leading-none">{rank}</span>
      </div>
    )
  }
  if (rank === 3) {
    return (
      <div
        className="lb-rank-pulse lb-rank-delay-2 relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-[#FFE0C2] to-[#E8A06A] text-[#9A3412] shadow-[0_8px_16px_rgba(180,83,9,0.28)] ring-1 ring-[#E8A06A]/60"
        aria-label={`Rank ${rank}`}
      >
        <Medal className="lb-medal-tilt lb-rank-delay-1 absolute -top-2 h-3.5 w-3.5 text-[#D97706]" aria-hidden />
        <span className="text-[17px] font-extrabold leading-none">{rank}</span>
      </div>
    )
  }
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky text-[15px] font-extrabold text-primary ring-1 ring-secondary/40"
      aria-label={`Rank ${rank}`}
    >
      {rank}
    </div>
  )
}

function rowShell(rank: number) {
  if (rank === 1) {
    return 'lb-top-card lb-top-gold border-[#F5C518]/55 bg-gradient-to-r from-[#FFF6D6] via-white to-[#FFFCF0] shadow-[0_12px_28px_rgba(196,146,10,0.2)]'
  }
  if (rank === 2) {
    return 'lb-top-card lb-top-silver border-[#B8BEC8] bg-gradient-to-r from-[#EEF1F5] via-white to-[#F8FAFC] shadow-[0_10px_24px_rgba(75,85,99,0.14)]'
  }
  if (rank === 3) {
    return 'lb-top-card lb-top-bronze border-[#E8A06A]/55 bg-gradient-to-r from-[#FFE8D4] via-white to-[#FFF8F1] shadow-[0_10px_24px_rgba(180,83,9,0.16)]'
  }
  return 'border-line bg-white shadow-[0_6px_18px_rgba(0,84,166,0.06)]'
}

function scoreTone(rank: number) {
  if (rank === 1) return 'lb-score-pop bg-[#F5C518]/22 text-[#8A5A00] ring-[#F5C518]/45'
  if (rank === 2) return 'lb-score-pop lb-rank-delay-1 bg-[#E5E7EB] text-[#4B5563] ring-[#9CA3AF]/45'
  if (rank === 3) return 'lb-score-pop lb-rank-delay-2 bg-[#FFEDD5] text-[#9A3412] ring-[#E8A06A]/45'
  return 'bg-primary/10 text-primary ring-primary/20'
}

function photoRing(rank: number) {
  if (rank === 1) return 'lb-photo-glow ring-2 ring-[#F5C518]'
  if (rank === 2) return 'lb-photo-glow lb-rank-delay-1 ring-2 ring-[#9CA3AF]'
  if (rank === 3) return 'lb-photo-glow lb-rank-delay-2 ring-2 ring-[#E8A06A]'
  return 'ring-2 ring-white'
}

function placeLabel(rank: number) {
  if (rank === 1) return 'Champion'
  if (rank === 2) return 'Runner-up'
  if (rank === 3) return '3rd Place'
  return null
}

/** Horizontal gamification leaderboard row. */
export function LeaderboardRow({
  ambassador,
  rank,
  index = 0,
  preferTag = 'top-onboarder',
}: {
  ambassador: Ambassador
  rank: number
  index?: number
  preferTag?: HallTag
}) {
  const count = ambassador.onboardingCount ?? 0
  const isTop = rank <= 3
  const label = placeLabel(rank)

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border p-3.5 ${rowShell(rank)}`}
      style={isTop ? { animationDelay: `${index * 90}ms` } : undefined}
    >
      {isTop ? (
        <span className="lb-shine pointer-events-none absolute inset-0 z-0" aria-hidden />
      ) : null}
      {rank === 1 ? (
        <Sparkles
          className="lb-sparkle pointer-events-none absolute right-3 top-3 z-20 h-4 w-4 text-[#F5C518]"
          aria-hidden
        />
      ) : null}

      <div className="relative z-10 flex items-center gap-3">
        <RankMark rank={rank} />

        <AvatarImage
          src={ambassador.photo}
          alt={ambassador.name}
          seed={ambassador.name}
          className={`h-12 w-12 shrink-0 rounded-full bg-ink-soft object-cover shadow-sm ${
            isTop ? 'h-[52px] w-[52px]' : ''
          } ${photoRing(rank)}`}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              {label ? (
                <p
                  className={`text-[10px] font-extrabold uppercase tracking-[0.14em] ${
                    rank === 1 ? 'text-[#C4920A]' : rank === 2 ? 'text-[#6B7280]' : 'text-[#D97706]'
                  }`}
                >
                  {label}
                </p>
              ) : null}
              <h3 className="truncate text-[14px] font-extrabold leading-snug text-ink">{ambassador.name}</h3>
              <p className="mt-0.5 font-mono text-[11px] font-semibold text-primary">{ambassador.id}</p>
            </div>
            <div
              className={`shrink-0 rounded-2xl px-2.5 py-1.5 text-center ring-1 ${scoreTone(rank)}`}
              aria-label={`Onboarding Count ${count}`}
            >
              <p className="text-[9px] font-bold uppercase tracking-wide opacity-70">Count</p>
              <p className="text-[16px] font-extrabold leading-none tabular-nums">{count}</p>
            </div>
          </div>

          <p className="mt-1.5">
            <HallBadgeStack ambassador={ambassador} prefer={preferTag} />
          </p>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[12px] font-semibold text-ink-mid">
            <span className="inline-flex min-w-0 max-w-full items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="truncate">{ambassador.schoolName}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
              {ambassador.trainingRegion}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5 shrink-0 text-primary" />
              {ambassador.saBatch}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
