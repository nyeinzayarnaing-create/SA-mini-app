import type { Ambassador, HallTag } from '../types'

export const HALL_TAG_LABEL: Record<HallTag, string> = {
  'top-onboarder': 'Highest Onboarding',
  'youth-creator': 'Youth Creator',
  internship: 'Internship',
  permanent: 'Permanent',
}

export const HALL_BADGES = [
  'Highest Onboarding',
  'Youth Creator',
  'Internship',
  'Permanent',
] as const

export type HallBadge = (typeof HALL_BADGES)[number]

const HALL_BADGE_SET = new Set<string>(HALL_BADGES)

/** Unique hall tags for an ambassador (supports multi-badge members). */
export function hallTagsOf(person: Pick<Ambassador, 'hallTag' | 'hallTags'>): HallTag[] {
  const tags = person.hallTags?.length
    ? person.hallTags
    : person.hallTag
      ? [person.hallTag]
      : []
  return [...new Set(tags)]
}

export function primaryHallTag(person: Pick<Ambassador, 'hallTag' | 'hallTags'>): HallTag | undefined {
  return hallTagsOf(person)[0]
}

/** Only the four Hall of Fame badges. Prefer hallTags when present. */
export function hallBadgesOf(
  person: Pick<Ambassador, 'badges' | 'hallTag' | 'hallTags'>,
): HallBadge[] {
  const fromTags = hallTagsOf(person).map((tag) => HALL_TAG_LABEL[tag] as HallBadge)
  const source = fromTags.length > 0 ? fromTags : person.badges.map(normalizeLegacyBadge).filter(Boolean) as HallBadge[]
  return [...new Set(source.filter((badge) => HALL_BADGE_SET.has(badge)))]
}

/** Map old badge names onto the four allowed Hall badges (or drop them). */
export function normalizeLegacyBadge(badge: string): HallBadge | null {
  const label = badge.trim().toLowerCase()
  if (label === 'highest onboarding' || label === 'highest on-boarding' || label === 'top onboarder') {
    return 'Highest Onboarding'
  }
  if (label === 'youth creator') return 'Youth Creator'
  if (label === 'internship' || label === 'intern') return 'Internship'
  if (label === 'permanent') return 'Permanent'
  return null
}

export function isHallBadge(badge: string): boolean {
  return HALL_BADGE_SET.has(badge) || normalizeLegacyBadge(badge) !== null
}

export function hasHighestOnboardingBadge(badges: string[]): boolean {
  return badges.some((badge) => badge.trim().toLowerCase() === 'highest onboarding')
}

export function hasYouthCreatorBadge(badges: string[]): boolean {
  return badges.some((badge) => badge.trim().toLowerCase() === 'youth creator')
}

/** Display date when a Hall badge was earned; falls back to join date. */
export function badgeGotDateOf(
  person: Pick<Ambassador, 'joinDate' | 'badgeGotDates'>,
  badge: HallBadge,
): string {
  return person.badgeGotDates?.[badge] ?? person.joinDate
}

/** Competition ranking: tied scores share a rank; next rank skips (e.g. 1,2,3,3,5). */
export function competitionRanks(sortedCounts: number[]): number[] {
  const ranks: number[] = []
  for (let i = 0; i < sortedCounts.length; i += 1) {
    if (i > 0 && sortedCounts[i] === sortedCounts[i - 1]) {
      ranks.push(ranks[i - 1]!)
    } else {
      ranks.push(i + 1)
    }
  }
  return ranks
}

export type OnboardingStanding = {
  rank: number
  count: number
  total: number
}

/** Leaderboard rank + onboarding count for Highest Onboarding badge holders. */
export function onboardingStandingOf(
  person: Pick<Ambassador, 'id' | 'badges' | 'onboardingCount' | 'name'>,
  pool: Ambassador[],
): OnboardingStanding | null {
  if (!hasHighestOnboardingBadge(person.badges)) return null

  const board = pool
    .filter((entry) => hasHighestOnboardingBadge(entry.badges))
    .sort((a, b) => {
      const countDiff = (b.onboardingCount ?? 0) - (a.onboardingCount ?? 0)
      if (countDiff !== 0) return countDiff
      return a.name.localeCompare(b.name)
    })

  const index = board.findIndex((entry) => entry.id === person.id)
  if (index < 0) return null

  const ranks = competitionRanks(board.map((entry) => entry.onboardingCount ?? 0))
  return {
    rank: ranks[index]!,
    count: person.onboardingCount ?? board[index]?.onboardingCount ?? 0,
    total: board.length,
  }
}
