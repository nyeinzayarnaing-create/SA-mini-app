import { isRegisterClosed } from '../lib/announcementActions'
import type { Announcement } from '../types'

/** Registration window status for Event / Volunteer cards. */
export function openClosedOf(item: Pick<Announcement, 'closeDate'>): 'open' | 'closed' {
  return isRegisterClosed(item.closeDate) ? 'closed' : 'open'
}

export function OpenClosedBadge({
  state,
  className = '',
}: {
  state: 'open' | 'closed'
  className?: string
}) {
  const open = state === 'open'
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${
        open ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#EEF0F4] text-[#6B7280]'
      } ${className}`}
    >
      {open ? 'Open' : 'Closed'}
    </span>
  )
}
