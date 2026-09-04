import { ACTIVITY_STATUS_CLASS, ACTIVITY_STATUS_LABEL } from '../lib/announcementActions'
import type { ActivityStatus, AnnouncementCategory } from '../types'

export function StatusBadge({
  status,
  className = '',
  category,
}: {
  status: ActivityStatus
  className?: string
  category?: AnnouncementCategory
}) {
  const jobApplied = category === 'job' && (status === 'pending' || status === 'approved')
  const label = jobApplied
    ? 'Applied'
    : category === 'job' && status === 'closed'
      ? 'Apply Closed'
      : ACTIVITY_STATUS_LABEL[status]
  const tone = jobApplied ? 'bg-[#DCFCE7] text-[#166534]' : ACTIVITY_STATUS_CLASS[status]

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${tone} ${className}`}
    >
      {label}
    </span>
  )
}
