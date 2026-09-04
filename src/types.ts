export type Rank = 'Bronze' | 'Silver' | 'Gold' | 'Platinum'

export type Ambassador = {
  id: string
  name: string
  photo: string
  schoolId: string
  schoolName: string
  trainingRegion: string
  saBatch: string
  rank: Rank
  level: number
  xp: number
  xpToNext: number
  year: string
  age: number
  dateOfBirth?: string
  phone: string
  email: string
  joinDate: string
  status: 'Active' | 'Inactive'
  badges: string[]
  qualification?: string
  currentAddress?: string
  permanentAddress?: string
  certificates?: ProfileDocument[]
  banner?: string
  hallTag?: HallTag
  /** All Hall of Frame categories this ambassador belongs to (3–4 possible). */
  hallTags?: HallTag[]
  onboardingCount?: number
}

export type HallTag = 'top-onboarder' | 'youth-creator' | 'internship' | 'permanent'

export type ProfileDocumentKind = 'certificate' | 'award'

export type ProfileDocument = {
  id: string
  kind: ProfileDocumentKind
  title: string
  issuedOn: string
  fileName: string
  fileUrl: string
}

export type SchoolType = 'government' | 'private'
export type SchoolStatus = 'Active' | 'Inactive'

export type School = {
  id: string
  name: string
  city: string
  region: string
  location: string
  ambassadorCount: number
  initials: string
  accent: string
  partnerSince: string
  status: SchoolStatus
  type: SchoolType
  banner: string
  logo: string
  about: string
  founded: string
  focus: string
}

export type Award = {
  id: string
  winnerId: string
  winnerName: string
  winnerPhoto: string
  collegeName: string
  saBatch: string
  title: string
  awardedYear: string
  achievement: string
  featured?: boolean
}

export type AnnouncementCategory = 'event' | 'volunteer' | 'job'

export type ActivityStatus = 'pending' | 'approved' | 'expired' | 'cancelled' | 'closed'

export type RegistrationInfo = {
  fullName: string
  ambassadorId: string
  age: string
  batch: string
  university: string
  trainingRegion?: string
  sameKbzPhone: boolean
  phone: string
  address: string
  email?: string
  state?: string
  town?: string
  township?: string
  cvFileName?: string
  interest?: string
}

export type Announcement = {
  id: string
  category: AnnouncementCategory
  title: string
  body: string
  date: string
  closeDate: string
  isNew: boolean
  featured?: boolean
  location?: string
  time?: string
  photo?: string
  details?: string
  highlights?: string[]
  tags?: string[]
  goingCount?: number
  companyName?: string
  companyLogo?: string
  employmentType?: 'Part-time' | 'Full-time'
  industry?: string
  responsibilities?: string[]
  requirements?: string[]
  benefits?: string[]
  descriptionFileName?: string
  descriptionFileUrl?: string
}

export type MarketingBanner = {
  id: string
  image: string
  kicker: string
  title: string
  subtitle: string
}

export type KpiStatus = 'completed' | 'in-progress' | 'locked'

export type KpiAchievement = {
  id: string
  label: string
  subtitle: string
  current: number
  target: number
  unit: string
  earned: boolean
  status: KpiStatus
}
