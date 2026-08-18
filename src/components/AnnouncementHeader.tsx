import { Briefcase, Calendar, Clock, HeartHandshake } from 'lucide-react'
import { useSeen } from '../context/SeenContext'
import type { Announcement, AnnouncementCategory } from '../types'

export function AnnouncementHeader({ item }: { item: Announcement }) {
  const { showNew } = useSeen()
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 flex-wrap items-center gap-1.5">
        <CategoryChip category={item.category} />
        <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF3C4] px-2 py-0.5 text-[10px] font-bold text-[#8A5A00]">
          <Clock className="h-3 w-3" />
          {item.category === 'event' ? 'Join close' : 'Apply close'}: {item.closeDate}
        </span>
      </div>
      {showNew(item.isNew, item.id) ? (
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
