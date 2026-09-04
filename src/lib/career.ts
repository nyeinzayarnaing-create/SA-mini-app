import { hallTagsOf } from './hall'
import type { Ambassador } from '../types'

export type CareerRole = {
  id: string
  title: string
  startLabel: string
  endLabel: string
  rangeLabel: string
  durationLabel: string
  location?: string
  workType?: string
  skills: string[]
}

export type CareerExperience = {
  company: string
  companyLogoText: string
  employmentType: string
  totalDurationLabel: string
  roles: CareerRole[]
}

const INTERN_SKILLS = [
  'Onboarding Support',
  'Campus Events',
  'Student Outreach',
  'KBZ Pay Demo',
  'Peer Coaching',
]

const PERM_SKILLS = [
  'Mentorship',
  'Leadership',
  'Campus Partnerships',
  'Recruiting',
  'Event Hosting',
  'Training',
]

function parseDisplayDate(value: string): Date | null {
  const parsed = Date.parse(value)
  if (Number.isNaN(parsed)) return null
  return new Date(parsed)
}

function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function formatDuration(start: Date, end: Date): string {
  let months =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  if (end.getDate() < start.getDate()) months -= 1
  months = Math.max(1, months)
  const years = Math.floor(months / 12)
  const rem = months % 12
  if (years > 0 && rem > 0) return `${years} yr${years > 1 ? 's' : ''} ${rem} mo${rem > 1 ? 's' : ''}`
  if (years > 0) return `${years} yr${years > 1 ? 's' : ''}`
  return `${months} mo${months > 1 ? 's' : ''}`
}

function addMonths(date: Date, months: number): Date {
  const next = new Date(date)
  next.setMonth(next.getMonth() + months)
  return next
}

function roleBlock(
  id: string,
  title: string,
  start: Date,
  end: Date,
  isCurrent: boolean,
  skills: string[],
  location: string,
): CareerRole {
  const startLabel = formatMonthYear(start)
  const endLabel = isCurrent ? 'Present' : formatMonthYear(end)
  const durationLabel = formatDuration(start, end)
  return {
    id,
    title,
    startLabel,
    endLabel,
    rangeLabel: `${startLabel} - ${endLabel}`,
    durationLabel,
    location,
    workType: 'On-site',
    skills,
  }
}

/** Build LinkedIn-style KBZ career progress for Internship / Permanent. */
export function careerProgressOf(
  person: Pick<Ambassador, 'id' | 'joinDate' | 'trainingRegion' | 'hallTag' | 'hallTags'>,
): CareerExperience | null {
  const tags = hallTagsOf(person)
  const hasIntern = tags.includes('internship')
  const hasPerm = tags.includes('permanent')
  if (!hasIntern && !hasPerm) return null

  const join = parseDisplayDate(person.joinDate) ?? new Date()
  const now = new Date()
  const location = `${person.trainingRegion}, Myanmar`
  const roles: CareerRole[] = []

  if (hasPerm) {
    const start = hasIntern ? addMonths(join, 6) : join
    roles.push(
      roleBlock(
        `${person.id}-permanent`,
        'Permanent Student Ambassador',
        start,
        now,
        true,
        PERM_SKILLS,
        location,
      ),
    )
  }

  if (hasIntern) {
    const start = join
    const end = hasPerm ? addMonths(join, 6) : now
    roles.push(
      roleBlock(
        `${person.id}-internship`,
        'Student Ambassador Intern',
        start,
        end,
        !hasPerm,
        INTERN_SKILLS,
        location,
      ),
    )
  }

  const earliest = hasIntern ? join : hasPerm ? join : now
  const employmentType = hasPerm ? 'Full-time' : 'Internship'

  return {
    company: 'KBZ Bank',
    companyLogoText: 'KBZ',
    employmentType,
    totalDurationLabel: formatDuration(earliest, now),
    roles,
  }
}
