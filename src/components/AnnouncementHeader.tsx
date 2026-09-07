import { Briefcase, Calendar, Clock, HeartHandshake } from 'lucide-react'
import { useSeen } from '../context/SeenContext'
import { isRegisterClosed } from '../lib/announcementActions'
import type { Announcement, AnnouncementCategory } from '../types'
import { OpenClosedBadge, openClosedOf } from './OpenClosedBadge'

export function AnnouncementHeader({
  item,
  showOpenClosed = false,
}: {
  item: Announcement
  /** Event / Volunteer / Job: Open or Closed inside the card body. */
  showOpenClosed?: boolean
}) {
  const { showNew } = useSeen()
  const registrationClosed = isRegisterClosed(item.closeDate)
  const closeLabel = item.category === 'event' ? 'Join close' : 'Apply close'

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 flex-wrap items-center gap-1.5">
        <CategoryChip category={item.category} />
        {showOpenClosed ? <OpenClosedBadge state={openClosedOf(item)} /> : null}
        <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF3C4] px-2 py-0.5 text-[10px] font-bold text-[#8A5A00]">
          <Clock className="h-3 w-3" />
          {closeLabel}: {item.closeDate}
        </span>
      </div>
      {showNew(item.isNew, item.id) && !registrationClosed ? (
        <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white">
          New
        </span>
      ) : null}
    </div>
  )
}

export function CategoryChip({ category }: { category: AnnouncementCategory }) {
  const Icon = category === 'event' ? Calendar : category === 'volunteer' ? HeartHandshake : Briefcase
  const label = category === 'event' ? 'Event' : category === 'volunteer' ? 'Volunteer' : 'Job'
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-secondary/20 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
      <Icon className="h-3 w-3" />
      {label}
    </span>
  )
}
