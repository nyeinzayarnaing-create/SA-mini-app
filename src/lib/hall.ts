import type { Ambassador, HallTag } from '../types'

export const HALL_TAG_LABEL: Record<HallTag, string> = {
  'top-onboarder': 'Highest Onboarding',
  'youth-creator': 'Youth Creator',
  internship: 'Internship',
  permanent: 'Permanent',
}

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
