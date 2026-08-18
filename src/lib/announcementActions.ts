import type { ActivityStatus, Announcement, RegistrationInfo } from '../types'

const ACTION_KEY = 'sa-announcement-actions'
const SEEN_KEY = 'sa-announcement-seen'
const REG_KEY = 'sa-announcement-registrations'
const STATUSES = new Set<ActivityStatus>(['pending', 'approved', 'expired', 'cancelled', 'closed'])

const DEMO_ACTIVITY: Record<string, ActivityStatus> = {
  a2: 'pending',
  a6: 'approved',
  a1: 'expired',
  v2: 'cancelled',
}

const DEMO_REGISTRATIONS: Record<string, RegistrationInfo> = {
  a2: {
    fullName: 'Su Myat Aung',
    ambassadorId: 'SA-2026-0842',
    age: '21',
    batch: 'SA Batch 2025',
    university: 'University of Yangon',
    sameKbzPhone: true,
    phone: '+95 9 421 558 210',
    address: 'No. 12, University Avenue, Kamayut Township, Yangon',
  },
  a6: {
    fullName: 'Su Myat Aung',
    ambassadorId: 'SA-2026-0842',
    age: '21',
    batch: 'SA Batch 2025',
    university: 'University of Yangon',
    sameKbzPhone: false,
    phone: '+95 9 777 221 008',
    address: 'Room 8B, Dagon Housing, Dagon Township, Yangon',
  },
  a1: {
    fullName: 'Su Myat Aung',
    ambassadorId: 'SA-2026-0842',
    age: '21',
    batch: 'SA Batch 2025',
    university: 'University of Yangon',
    sameKbzPhone: true,
    phone: '+95 9 421 558 210',
    address: 'No. 12, University Avenue, Kamayut Township, Yangon',
  },
  v3: {
    fullName: 'Su Myat Aung',
    ambassadorId: 'SA-2026-0842',
    age: '21',
    batch: 'SA Batch 2025',
    university: 'University of Yangon',
    sameKbzPhone: true,
    phone: '+95 9 421 558 210',
    address: '72nd Street, Chanayethazan, Mandalay',
  },
  v2: {
    fullName: 'Su Myat Aung',
    ambassadorId: 'SA-2026-0842',
    age: '21',
    batch: 'SA Batch 2025',
    university: 'University of Yangon',
    sameKbzPhone: false,
    phone: '+95 9 250 114 332',
    address: 'Campus Quest HQ dorm, Yankin, Yangon',
  },
}

export const ACTIVITY_STATUS_LABEL: Record<ActivityStatus, string> = {
  pending: 'Pending Approval',
  approved: 'Approved',
  expired: 'Expired',
  cancelled: 'Cancelled',
  closed: 'Register Closed!',
}

export const ACTIVITY_STATUS_CLASS: Record<ActivityStatus, string> = {
  pending: 'bg-[#FFF3C4] text-[#8A5A00]',
  approved: 'bg-[#DCFCE7] text-[#166534]',
  expired: 'bg-[#EEF0F4] text-[#6B7280]',
  cancelled: 'bg-[#FEE2E2] text-[#B91C1C]',
  closed: 'bg-[#FFE8D6] text-[#B45309]',
}

export function readActions(): Record<string, ActivityStatus> {
  try {
    const raw = localStorage.getItem(ACTION_KEY)
    const stored = raw ? normalizeActions(JSON.parse(raw)) : {}
    return withSingleApproved({ ...DEMO_ACTIVITY, ...stored })
  } catch {
    return { ...DEMO_ACTIVITY }
  }
}

function withSingleApproved(actions: Record<string, ActivityStatus>) {
  const next = { ...actions, a6: 'approved' as const }
  for (const id of Object.keys(next)) {
    if (id !== 'a6' && next[id] === 'approved') delete next[id]
  }
  return next
}

export function setAction(id: string, value: boolean | ActivityStatus) {
  const current = readActions()
  if (value === false) {
    const { [id]: _removed, ...rest } = current
    localStorage.setItem(ACTION_KEY, JSON.stringify(rest))
    return rest
  }
  const status: ActivityStatus = value === true ? 'pending' : value
  const next = { ...current, [id]: status }
  localStorage.setItem(ACTION_KEY, JSON.stringify(next))
  return next
}

export function resolveStatus(item: Announcement, stored?: ActivityStatus): ActivityStatus | null {
  if (!stored || stored === 'closed') return null
  return stored
}

export function isRegisterClosed(closeDate: string) {
  return isPastClose(closeDate)
}

export function announcementStatus(item: Announcement, stored?: ActivityStatus): ActivityStatus | null {
  const activity = resolveStatus(item, stored)
  if (activity === 'approved' || activity === 'pending') return activity
  if (activity === 'expired' || activity === 'cancelled') return activity
  if (isPastClose(item.closeDate)) return 'closed'
  return null
}

export function readSeen(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(SEEN_KEY)
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {}
  } catch {
    return {}
  }
}

export function markSeen(id: string) {
  const next = { ...readSeen(), [id]: true }
  localStorage.setItem(SEEN_KEY, JSON.stringify(next))
  return next
}

export function isSeen(id: string) {
  return Boolean(readSeen()[id])
}

export function showNewBadge(isNew: boolean, id: string) {
  return isNew && !isSeen(id)
}

export function getRegistration(id: string): RegistrationInfo | null {
  try {
    const raw = localStorage.getItem(REG_KEY)
    const stored = raw ? (JSON.parse(raw) as Record<string, RegistrationInfo>) : {}
    return stored[id] ?? DEMO_REGISTRATIONS[id] ?? null
  } catch {
    return DEMO_REGISTRATIONS[id] ?? null
  }
}

export function setRegistration(id: string, info: RegistrationInfo) {
  let stored: Record<string, RegistrationInfo> = {}
  try {
    const raw = localStorage.getItem(REG_KEY)
    stored = raw ? (JSON.parse(raw) as Record<string, RegistrationInfo>) : {}
  } catch {
    stored = {}
  }
  stored[id] = info
  localStorage.setItem(REG_KEY, JSON.stringify(stored))
  return info
}

function normalizeActions(raw: unknown): Record<string, ActivityStatus> {
  if (!raw || typeof raw !== 'object') return {}
  const out: Record<string, ActivityStatus> = {}
  for (const [id, value] of Object.entries(raw as Record<string, unknown>)) {
    if (value === true) out[id] = 'pending'
    else if (typeof value === 'string' && STATUSES.has(value as ActivityStatus)) {
      out[id] = value as ActivityStatus
    }
  }
  return out
}

function isPastClose(closeDate: string) {
  const close = Date.parse(closeDate)
  if (Number.isNaN(close)) return false
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  return close < startOfToday.getTime()
}
