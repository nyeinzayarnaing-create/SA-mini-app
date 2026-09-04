import { HALL_TAG_LABEL, hallTagsOf, primaryHallTag } from '../lib/hall'
import type { Ambassador, HallTag } from '../types'
import { TrophyTag } from './TrophyTag'

/** Shows the primary Hall badge and +N when the ambassador has multiple hall badges. */
export function HallBadgeStack({
  ambassador,
  prefer,
}: {
  ambassador: Pick<Ambassador, 'hallTag' | 'hallTags'>
  /** Prefer showing this tab’s label first when present. */
  prefer?: HallTag
}) {
  const tags = hallTagsOf(ambassador)
  if (tags.length === 0) return null

  const primary = (prefer && tags.includes(prefer) ? prefer : primaryHallTag(ambassador))!
  const count = tags.length

  return (
    <span className="inline-flex max-w-full items-center gap-1.5">
      <TrophyTag label={HALL_TAG_LABEL[primary]} />
      {count > 1 ? (
        <span
          className="inline-flex shrink-0 items-center rounded-full bg-primary px-2 py-0.5 text-[11px] font-extrabold text-white"
          aria-label={`${count} hall badges`}
          title={tags.map((tag) => HALL_TAG_LABEL[tag]).join(', ')}
        >
          +{count}
        </span>
      ) : null}
    </span>
  )
}
