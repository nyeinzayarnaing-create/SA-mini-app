import type { Ambassador, Announcement, Award, HallTag, KpiAchievement, MarketingBanner, School } from '../types'
import { ambassadorCertificates } from '../lib/certificates'
import { HALL_TAG_LABEL } from '../lib/hall'

const AVATAR_PHOTOS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=256&h=256&q=80',
] as const

function hashSeed(seed: string) {
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  return hash
}

export function avatarUrl(seed: string, _bg = '5ad2f2') {
  return AVATAR_PHOTOS[hashSeed(seed) % AVATAR_PHOTOS.length]!
}

/** Offline-safe fallback when remote avatar fails to load. */
export function avatarFallbackUrl(seed: string, bg = '5ad2f2') {
  const spaced = seed
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z]+/g, ' ')
    .trim()
  const parts = spaced.split(/\s+/).filter(Boolean)
  const initials = (
    (parts[0]?.[0] ?? seed[0] ?? '?') + (parts[1]?.[0] ?? parts[0]?.[1] ?? '')
  )
    .toUpperCase()
    .slice(0, 2)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" rx="64" fill="#${bg}"/><text x="64" y="68" text-anchor="middle" font-family="Outfit, system-ui, sans-serif" font-size="44" font-weight="700" fill="#00315f">${initials}</text></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export function ambassadorAge(person: Pick<Ambassador, 'age' | 'year'> & { dateOfBirth?: string }) {
  if (person.dateOfBirth) {
    const born = new Date(person.dateOfBirth)
    if (!Number.isNaN(born.getTime())) {
      const today = new Date()
      let age = today.getFullYear() - born.getFullYear()
      const monthDiff = today.getMonth() - born.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < born.getDate())) age -= 1
      if (age > 0) return age
    }
  }
  if (typeof person.age === 'number' && person.age > 0) return person.age
  const byYear: Record<string, number> = {
    '1st Year': 19,
    '2nd Year': 20,
    '3rd Year': 21,
    '4th Year': 22,
  }
  return byYear[person.year] ?? 21
}

export const schools: School[] = [
  {
    id: 'uoy',
    name: 'University of Yangon',
    city: 'Yangon',
    region: 'Yangon',
    location: 'Kamayut Township, Yangon',
    ambassadorCount: 18,
    initials: 'UY',
    accent: '#0054A6',
    partnerSince: 'Jan 2023',
    status: 'Active',
    type: 'government',
    banner: '/schools/historic.jpg',
    logo: '/schools/logos/uoy.svg',
    about:
      'Myanmar’s oldest university and a flagship Campus Quest partner. Ambassadors here run onboarding quests around Convocation Hall, faculty clubs, and city-wide student outreach.',
    founded: '1878',
    focus: 'Arts, Science, and Social Sciences',
  },
  {
    id: 'ytu',
    name: 'Yangon Technological University',
    city: 'Yangon',
    region: 'Yangon',
    location: 'Gyogone, Insein Township, Yangon',
    ambassadorCount: 14,
    initials: 'YT',
    accent: '#5AD2F2',
    partnerSince: 'Mar 2023',
    status: 'Active',
    type: 'government',
    banner: '/schools/tech.jpg',
    logo: '/schools/logos/ytu.svg',
    about:
      'A leading engineering campus for STEM ambassadors. The YTU squad hosts tech talks, lab tours, and KBZPay digital-literacy booths for first-year students.',
    founded: '1924',
    focus: 'Engineering and Applied Technology',
  },
  {
    id: 'mu',
    name: 'Mandalay University',
    city: 'Mandalay',
    region: 'Mandalay',
    location: 'Mahaaungmye Township, Mandalay',
    ambassadorCount: 11,
    initials: 'MU',
    accent: '#0a73c7',
    partnerSince: 'Jun 2023',
    status: 'Active',
    type: 'government',
    banner: '/schools/courtyard.jpg',
    logo: '/schools/logos/mu.svg',
    about:
      'The Upper Myanmar hub for Campus Quest. Ambassadors coordinate regional training, campus markets, and peer mentoring across Mandalay faculties.',
    founded: '1925',
    focus: 'Liberal Arts and Sciences',
  },
  {
    id: 'dagon',
    name: 'Dagon University',
    city: 'Yangon',
    region: 'Yangon',
    location: 'North Dagon Township, Yangon',
    ambassadorCount: 9,
    initials: 'DU',
    accent: '#2bb8de',
    partnerSince: 'Aug 2023',
    status: 'Inactive',
    type: 'government',
    banner: '/schools/courtyard.jpg',
    logo: '/schools/logos/dagon.svg',
    about:
      'A large arts-and-science campus that previously ran SA recruitment fairs. Partnership is paused while the next training batch is planned.',
    founded: '1993',
    focus: 'Arts, Law, and Business',
  },
  {
    id: 'ucsy',
    name: 'University of Computer Studies, Yangon',
    city: 'Yangon',
    region: 'Yangon',
    location: 'Hlaing Township, Yangon',
    ambassadorCount: 16,
    initials: 'UC',
    accent: '#003d7a',
    partnerSince: 'Feb 2024',
    status: 'Active',
    type: 'government',
    banner: '/schools/tech.jpg',
    logo: '/schools/logos/ucsy.svg',
    about:
      'Home of the digital creator squad. UCSY ambassadors lead coding clinics, app demos, and Hall of Fame content shoots for Campus Quest.',
    founded: '1988',
    focus: 'Computer Science and IT',
  },
  {
    id: 'eyu',
    name: 'East Yangon University',
    city: 'Thanlyin',
    region: 'Yangon',
    location: 'Thanlyin Township, Yangon Region',
    ambassadorCount: 7,
    initials: 'EY',
    accent: '#7adcf5',
    partnerSince: 'Sep 2023',
    status: 'Active',
    type: 'government',
    banner: '/schools/courtyard.jpg',
    logo: '/schools/logos/eyu.svg',
    about:
      'A growing East Yangon partner campus. Ambassadors cover Thanlyin outreach, freshman welcome weeks, and volunteer drives with nearby townships.',
    founded: '2000',
    focus: 'Undergraduate Arts and Science',
  },
  {
    id: 'um1',
    name: 'University of Medicine 1',
    city: 'Yangon',
    region: 'Yangon',
    location: 'Lanmadaw Township, Yangon',
    ambassadorCount: 6,
    initials: 'M1',
    accent: '#0054A6',
    partnerSince: 'Nov 2023',
    status: 'Inactive',
    type: 'government',
    banner: '/schools/medical.jpg',
    logo: '/schools/logos/um1.svg',
    about:
      'A medical campus partner focused on health-literacy quests. The current SA cohort is on hold pending the next academic-year kickoff.',
    founded: '1927',
    focus: 'Medicine and Health Sciences',
  },
  {
    id: 'miit',
    name: 'Myanmar Institute of Information Technology',
    city: 'Mandalay',
    region: 'Mandalay',
    location: 'Chanmyathazi Township, Mandalay',
    ambassadorCount: 8,
    initials: 'MI',
    accent: '#5AD2F2',
    partnerSince: 'Apr 2024',
    status: 'Active',
    type: 'private',
    banner: '/schools/tech.jpg',
    logo: '/schools/logos/miit.svg',
    about:
      'A private IT institute partnering with Campus Quest on innovation days, intern pipelines, and Mandalay tech-community events.',
    founded: '2015',
    focus: 'Information Technology',
  },
  {
    id: 'sfu',
    name: 'Strategy First University',
    city: 'Yangon',
    region: 'Yangon',
    location: 'Bahan Township, Yangon',
    ambassadorCount: 10,
    initials: 'SF',
    accent: '#0a73c7',
    partnerSince: 'Jan 2024',
    status: 'Active',
    type: 'private',
    banner: '/schools/private.jpg',
    logo: '/schools/logos/sfu.svg',
    about:
      'A private business campus where ambassadors run career talks, startup booths, and KBZPay campus markets for commerce students.',
    founded: '2010',
    focus: 'Business and Management',
  },
  {
    id: 'sti',
    name: 'STI Myanmar University',
    city: 'Yangon',
    region: 'Yangon',
    location: 'Yankin Township, Yangon',
    ambassadorCount: 5,
    initials: 'ST',
    accent: '#2bb8de',
    partnerSince: 'May 2024',
    status: 'Active',
    type: 'private',
    banner: '/schools/private.jpg',
    logo: '/schools/logos/sti.svg',
    about:
      'A compact private campus with a hands-on SA team. Ambassadors support orientation weeks, English clubs, and partner-school visits.',
    founded: '2006',
    focus: 'Business, IT, and Hospitality',
  },
  {
    id: 'mic',
    name: 'Myanmar Imperial College',
    city: 'Yangon',
    region: 'Yangon',
    location: 'Mayangone Township, Yangon',
    ambassadorCount: 4,
    initials: 'IC',
    accent: '#003d7a',
    partnerSince: 'Jul 2024',
    status: 'Inactive',
    type: 'private',
    banner: '/schools/private.jpg',
    logo: '/schools/logos/mic.svg',
    about:
      'A private college partner currently inactive while Campus Quest reviews the next ambassador intake and campus event calendar.',
    founded: '2015',
    focus: 'Business and International Programmes',
  },
]

export const currentUser: Ambassador = {
  id: 'SA-2026-0842',
  name: 'Su Myat Aung',
  photo: avatarUrl('SuMyatAung', '5ad2f2'),
  schoolId: 'uoy',
  schoolName: 'University of Yangon',
  trainingRegion: 'Yangon',
  saBatch: 'SA Batch 2025',
  rank: 'Gold',
  level: 12,
  xp: 1840,
  xpToNext: 2000,
  year: '3rd Year',
  age: 21,
  dateOfBirth: '2005-03-14',
  phone: '+95 9 421 558 210',
  email: 'sumyat.aung@campusquest.edu',
  joinDate: '12 Jan 2025',
  status: 'Active',
  badges: ['Highest Onboarding', 'Youth Creator'],
  qualification: 'B.A. International Relations',
  currentAddress: 'No. 12, University Avenue, Kamayut Township, Yangon',
  permanentAddress: 'No. 8, 35th Street, Chanayethazan Township, Mandalay',
  onboardingCount: 25,
  hallTags: ['top-onboarder', 'youth-creator'],
  onboardingAwardTitle: '2nd Top Highest Onboarding Award',
  youthCreatorAwardTitle: 'Top View Magnet Winner',
  badgeGotDates: {
    'Highest Onboarding': '18 Apr 2025',
    'Youth Creator': '28 May 2025',
  },
  certificates: ambassadorCertificates({
    id: 'SA-2026-0842',
    name: 'Su Myat Aung',
    joinDate: '12 Jan 2025',
    badges: ['Highest Onboarding', 'Youth Creator'],
  }),
}

const HALL_ASSIGN: Record<string, HallTag[]> = {
  'SA-2026-0311': ['top-onboarder', 'internship', 'permanent'],
  'SA-2026-0577': ['youth-creator', 'internship'],
  'SA-2026-0901': ['internship', 'youth-creator', 'top-onboarder'],
  'SA-2026-0128': ['permanent', 'internship', 'youth-creator', 'top-onboarder'],
  'SA-2026-0664': ['internship', 'permanent'],
  'SA-2026-0440': ['youth-creator'],
  'SA-2026-0788': ['permanent', 'youth-creator', 'internship'],
}

const coreAmbassadors: Ambassador[] = ([
  currentUser,
  {
    id: 'SA-2026-0311',
    name: 'Hein Min Khant',
    photo: avatarUrl('HeinMinKhant', 'c5f0fa'),
    schoolId: 'ytu',
    schoolName: 'Yangon Technological University',
    trainingRegion: 'Yangon',
    saBatch: 'SA Batch 2024',
    rank: 'Platinum',
    level: 16,
    xp: 3100,
    xpToNext: 3500,
    year: '4th Year',
    age: 22,
    phone: '+95 9 250 441 090',
    email: 'hein.min@campusquest.edu',
    joinDate: '03 Sep 2024',
    status: 'Active',
    badges: ['Highest Onboarding', 'Internship', 'Permanent'],
    onboardingCount: 47,
    onboardingAwardTitle: '1st Top Highest Onboarding Award',
    hallTags: ['top-onboarder', 'internship', 'permanent'],
    badgeGotDates: {
      'Highest Onboarding': '10 Nov 2024',
      Internship: '03 Sep 2024',
      Permanent: '15 Mar 2025',
    },
  },
  {
    id: 'SA-2026-0577',
    name: 'Hnin Ei Phyu',
    photo: avatarUrl('HninEiPhyu', '8de4f7'),
    schoolId: 'mu',
    schoolName: 'Mandalay University',
    trainingRegion: 'Mandalay',
    saBatch: 'SA Batch 2025',
    rank: 'Gold',
    level: 14,
    xp: 2560,
    xpToNext: 2800,
    year: '3rd Year',
    age: 21,
    phone: '+95 9 796 220 118',
    email: 'hnin.ei@campusquest.edu',
    joinDate: '18 Feb 2025',
    status: 'Active',
    badges: ['Youth Creator', 'Internship'],
    youthCreatorAwardTitle: 'Top View Magnet Winner',
    badgeGotDates: {
      'Youth Creator': '22 Feb 2025',
      Internship: '18 Feb 2025',
    },
  },
  {
    id: 'SA-2026-0901',
    name: 'Nay Chi Lin',
    photo: avatarUrl('NayChiLin', 'b3eaf8'),
    schoolId: 'ucsy',
    schoolName: 'University of Computer Studies, Yangon',
    trainingRegion: 'Yangon',
    saBatch: 'SA Batch 2026',
    rank: 'Silver',
    level: 8,
    xp: 920,
    xpToNext: 1200,
    year: '2nd Year',
    age: 20,
    phone: '+95 9 444 102 883',
    email: 'naychi.lin@campusquest.edu',
    joinDate: '04 Mar 2026',
    status: 'Active',
    badges: ['Internship', 'Youth Creator', 'Highest Onboarding'],
    onboardingCount: 18,
    youthCreatorAwardTitle: 'Most Engaging Creator Winner',
    badgeGotDates: {
      Internship: '04 Mar 2026',
      'Youth Creator': '20 Apr 2026',
      'Highest Onboarding': '12 May 2026',
    },
  },
  {
    id: 'SA-2026-0128',
    name: 'Aung Ko Ko',
    photo: avatarUrl('AungKoKo', 'e8f7fc'),
    schoolId: 'dagon',
    schoolName: 'Dagon University',
    trainingRegion: 'Yangon',
    saBatch: 'SA Batch 2024',
    rank: 'Gold',
    level: 11,
    xp: 1600,
    xpToNext: 2000,
    year: '4th Year',
    age: 22,
    phone: '+95 9 511 773 042',
    email: 'aung.koko@campusquest.edu',
    joinDate: '21 Nov 2024',
    status: 'Inactive',
    badges: ['Permanent', 'Internship', 'Youth Creator', 'Highest Onboarding'],
    onboardingCount: 15,
    youthCreatorAwardTitle: 'Most Creative Content Winner',
    badgeGotDates: {
      Internship: '21 Nov 2024',
      Permanent: '01 Jun 2025',
      'Youth Creator': '12 Aug 2025',
      'Highest Onboarding': '03 Sep 2025',
    },
  },
  {
    id: 'SA-2026-0664',
    name: 'May Thiri Zaw',
    photo: avatarUrl('MayThiriZaw', '5ad2f2'),
    schoolId: 'eyu',
    schoolName: 'East Yangon University',
    trainingRegion: 'Yangon',
    saBatch: 'SA Batch 2026',
    rank: 'Bronze',
    level: 5,
    xp: 410,
    xpToNext: 600,
    year: '1st Year',
    age: 19,
    phone: '+95 9 260 998 451',
    email: 'may.thiri@campusquest.edu',
    joinDate: '09 Jun 2026',
    status: 'Active',
    badges: ['Internship', 'Permanent'],
    badgeGotDates: {
      Internship: '09 Jun 2026',
      Permanent: '01 Aug 2026',
    },
  },
  {
    id: 'SA-2026-0440',
    name: 'Kyaw Zin Oo',
    photo: avatarUrl('KyawZinOo', 'c5f0fa'),
    schoolId: 'um1',
    schoolName: 'University of Medicine 1',
    trainingRegion: 'Yangon',
    saBatch: 'SA Batch 2025',
    rank: 'Silver',
    level: 9,
    xp: 1100,
    xpToNext: 1400,
    year: '2nd Year',
    age: 20,
    phone: '+95 9 777 304 219',
    email: 'kyaw.zin@campusquest.edu',
    joinDate: '15 Oct 2025',
    status: 'Inactive',
    badges: ['Youth Creator'],
    youthCreatorAwardTitle: 'Most Creative Content Winner',
    badgeGotDates: {
      'Youth Creator': '02 Nov 2025',
    },
  },
  {
    id: 'SA-2026-0788',
    name: 'Thiri Nwe',
    photo: avatarUrl('ThiriNwe', '8de4f7'),
    schoolId: 'miit',
    schoolName: 'Myanmar Institute of Information Technology',
    trainingRegion: 'Mandalay',
    saBatch: 'SA Batch 2025',
    rank: 'Gold',
    level: 13,
    xp: 2100,
    xpToNext: 2400,
    year: '3rd Year',
    age: 21,
    phone: '+95 9 430 661 275',
    email: 'thiri.nwe@campusquest.edu',
    joinDate: '02 Jan 2025',
    status: 'Active',
    badges: ['Permanent', 'Youth Creator', 'Internship'],
    youthCreatorAwardTitle: 'Most Creative Content Winner',
    badgeGotDates: {
      Internship: '02 Jan 2025',
      'Youth Creator': '14 Feb 2025',
      Permanent: '01 Jun 2025',
    },
  },
] as Ambassador[]).map((person) => {
  const hallTags = person.hallTags ?? HALL_ASSIGN[person.id] ?? (person.hallTag ? [person.hallTag] : undefined)
  const badges = hallTags?.length
    ? [...new Set(hallTags.map((tag) => HALL_TAG_LABEL[tag]))]
    : person.badges.filter((badge) =>
        ['Highest Onboarding', 'Youth Creator', 'Internship', 'Permanent'].includes(badge),
      )
  const normalized = {
    ...person,
    hallTags,
    hallTag: person.hallTag ?? hallTags?.[0],
    badges,
  }
  return {
    ...normalized,
    certificates: person.certificates ?? ambassadorCertificates(normalized),
  }
})

export const ambassadors: Ambassador[] = [...coreAmbassadors, ...buildHallAmbassadors()]

function buildHallAmbassadors(): Ambassador[] {
  // Counts drive rank; award titles are assigned separately (may sit below rank 3).
  const onboarders: {
    name: string
    count: number
    award?: Ambassador['onboardingAwardTitle']
  }[] = [
    { name: 'Min Thu Aung', count: 44, award: '2nd Top Highest Onboarding Award' },
    { name: 'Htet Aung Shine', count: 38, award: '3rd Top Highest Onboarding Award' },
    { name: 'Ye Min Oo', count: 31, award: '1st Top Highest Onboarding Award' },
    { name: 'Phyo Zaw Win', count: 28, award: '2nd Top Highest Onboarding Award' },
    { name: 'Aye Chan Moe', count: 28 },
    { name: 'Lin Htet Oo', count: 24, award: '3rd Top Highest Onboarding Award' },
    { name: 'Thin Zar Aung', count: 22 },
    { name: 'Kaung Myat', count: 19 },
  ]
  const creators: { name: string; award?: Ambassador['youthCreatorAwardTitle'] }[] = [
    { name: 'Ei Mon Kyaw', award: 'Top View Magnet Winner' },
    { name: 'Nandar Moe', award: 'Most Engaging Creator Winner' },
    { name: 'Su Su Hlaing', award: 'Most Creative Content Winner' },
    { name: 'Myat Noe Oo' },
    { name: 'Hnin Wai Hlaing', award: 'Most Engaging Creator Winner' },
  ]
  const interns = ['Soe Wai Lin', 'Zaw Lin Htut', 'Pyae Phyo Naing', 'Thu Zar Win', 'Aung Kyaw Min']
  const permanents = ['Phyu Phyu Win', 'Khin Myat Noe', 'Moe Moe Khaing', 'Sandi Oo', 'Kyaw Swar']
  const bg = ['5ad2f2', 'c5f0fa', '8de4f7', 'b3eaf8'] as const
  const ranks: Ambassador['rank'][] = ['Gold', 'Platinum', 'Silver', 'Gold']
  const years = ['3rd Year', '4th Year', '2nd Year', '3rd Year']

  const groups: {
    tag: HallTag
    people: {
      name: string
      count?: number
      award?: Ambassador['onboardingAwardTitle']
      youthAward?: Ambassador['youthCreatorAwardTitle']
    }[]
  }[] = [
    { tag: 'top-onboarder', people: onboarders },
    {
      tag: 'youth-creator',
      people: creators.map((entry) => ({ name: entry.name, youthAward: entry.award })),
    },
    { tag: 'internship', people: interns.map((name) => ({ name })) },
    { tag: 'permanent', people: permanents.map((name) => ({ name })) },
  ]

  const labelByTag: Record<HallTag, string> = {
    'top-onboarder': 'Highest Onboarding',
    'youth-creator': 'Youth Creator',
    internship: 'Internship',
    permanent: 'Permanent',
  }

  let id = 1101
  const result: Ambassador[] = []

  for (const group of groups) {
    group.people.forEach((entry, index) => {
      const school = schools[index % schools.length]
      const extraTags: HallTag[] =
        index % 4 === 0
          ? ['internship', 'permanent']
          : index % 4 === 1
            ? ['youth-creator', 'internship', 'permanent']
            : index % 4 === 2
              ? ['permanent']
              : []
      const hallTags = [...new Set<HallTag>([group.tag, ...extraTags])]
      const person: Ambassador = {
        id: `SA-2026-${id}`,
        name: entry.name,
        photo: avatarUrl(entry.name.replaceAll(' ', ''), bg[index % bg.length]),
        schoolId: school.id,
        schoolName: school.name,
        trainingRegion: school.region,
        saBatch: `SA Batch ${2024 + (index % 3)}`,
        rank: ranks[index % ranks.length],
        level: 8 + (index % 8),
        xp: 900 + index * 120,
        xpToNext: 1400 + index * 80,
        year: years[index % years.length],
        age: 19 + (index % 5),
        phone: `+95 9 ${400 + (id % 100)} ${100 + (id % 50)} ${200 + (id % 80)}`,
        email: `${entry.name.toLowerCase().replaceAll(' ', '.')}@campusquest.edu`,
        joinDate: `${10 + (index % 18)} Mar ${2024 + (index % 3)}`,
        status: 'Active',
        badges: hallTags.map((tag) => labelByTag[tag]),
        hallTag: group.tag,
        hallTags,
        onboardingCount: entry.count,
        onboardingAwardTitle: entry.award,
        youthCreatorAwardTitle: entry.youthAward,
        badgeGotDates: Object.fromEntries(
          hallTags.map((tag, tagIndex) => [
            labelByTag[tag],
            `${5 + tagIndex * 7} ${['Jan', 'Mar', 'May', 'Jul'][tagIndex % 4]} ${2024 + (index % 3)}`,
          ]),
        ) as Ambassador['badgeGotDates'],
      }
      id += 1
      result.push({ ...person, certificates: ambassadorCertificates(person) })
    })
  }

  return result
}

export const awards: Award[] = buildAwards()

function buildAwards(): Award[] {
  const titles = ['Highest On-Boarding Award', 'Youth Creator Award']
  const batches = ['SA Batch 2024', 'SA Batch 2025', 'SA Batch 2026']
  const years = ['2024', '2025', '2026']
  const firstNames = ['Hein', 'Hnin', 'Aung', 'May', 'Nay', 'Kyaw', 'Thiri', 'Su', 'Min', 'Ei', 'Ko', 'Phyu', 'Zin', 'Myat', 'Lin']
  const lastNames = ['Khant', 'Phyu', 'Ko', 'Zaw', 'Lin', 'Oo', 'Nwe', 'Aung', 'Win', 'Htet', 'Soe', 'Maw']
  const achievements = [
    'Onboarded 47 new students this cycle — a campus record.',
    'Top campus story this month, 120k views across channels.',
    'Led a campus quest that brought in 30 verified referrals.',
    'Created the highest-engagement ambassador reel of the season.',
    'Mentored a new SA cohort through their first onboarding week.',
    'Won the monthly campus voice challenge with a live Q&A.',
  ]
  const bg = ['5ad2f2', 'c5f0fa', '8de4f7', 'b3eaf8', 'e8f7fc'] as const

  const featured: Award[] = [
    {
      id: 'award-001',
      winnerId: 'SA-2026-0311',
      winnerName: 'Hein Min Khant',
      winnerPhoto: avatarUrl('HeinMinKhant', 'c5f0fa'),
      collegeName: 'Yangon Technological University',
      saBatch: 'SA Batch 2024',
      title: 'Highest On-Boarding Award',
      awardedYear: '2026',
      achievement: 'Onboarded 47 new students this cycle — a campus record.',
      featured: true,
    },
    {
      id: 'award-002',
      winnerId: 'SA-2026-0577',
      winnerName: 'Hnin Ei Phyu',
      winnerPhoto: avatarUrl('HninEiPhyu', '8de4f7'),
      collegeName: 'Mandalay University',
      saBatch: 'SA Batch 2025',
      title: 'Youth Creator Award',
      awardedYear: '2026',
      achievement: 'Top campus story this month, 120k views across channels.',
      featured: true,
    },
  ]

  const generated = Array.from({ length: 118 }, (_, index) => {
    const n = index + 3
    const first = firstNames[index % firstNames.length]
    const last = lastNames[(index * 3) % lastNames.length]
    const name = `${first} ${last}`
    const school = schools[index % schools.length]
    return {
      id: `award-${String(n).padStart(3, '0')}`,
      winnerId: `SA-${years[index % years.length]}-${String(1100 + index).slice(-4)}`,
      winnerName: name,
      winnerPhoto: avatarUrl(name.replaceAll(' ', ''), bg[index % bg.length]),
      collegeName: school.name,
      saBatch: batches[index % batches.length],
      title: titles[index % titles.length],
      awardedYear: years[index % years.length],
      achievement: achievements[index % achievements.length],
      featured: n <= 5,
    }
  })

  return [...featured, ...generated]
}

export const announcements: Announcement[] = [
  {
    id: 'a3',
    category: 'event',
    title: 'Campus Voice open mic',
    body: 'Share your onboarding story, practice your pitch, and earn the Campus Voice badge.',
    date: '24 Oct 2026',
    time: '5:00 PM – 7:00 PM',
    location: 'University of Mandalay',
    closeDate: '20 Oct 2026',
    isNew: true,
    photo:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&h=640&q=80',
    details:
      'Open mic for Student Ambassadors. Tell your campus story, practice your pitch, and unlock the Campus Voice badge with the crew.',
    highlights: ['Open-mic slots', 'Campus Voice badge quest', 'Peer feedback round'],
    tags: ['Voice', 'Meetup', 'Badge'],
    goingCount: 22,
  },
  {
    id: 'a1',
    category: 'event',
    title: 'August On-Boarding Sprint is live',
    body: 'Log campus sign-ups by Friday to compete for the Highest On-Boarding Award. Double XP on verified referrals.',
    date: '12 Aug 2026',
    time: '9:00 AM – 5:00 PM',
    location: 'University of Yangon',
    closeDate: '14 Aug 2026',
    isNew: true,
    featured: true,
    photo:
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&h=640&q=80',
    details:
      'Join the August sprint to log campus sign-ups, coach new students, and climb the Highest On-Boarding leaderboard. Bring your SA ID and a classmate if you can.',
    highlights: ['Double XP on verified referrals', 'Live leaderboard updates', 'Highest Onboarding badge for top 10'],
    tags: ['Onboarding', 'Sprint', 'Campus'],
    goingCount: 42,
  },
  {
    id: 'a2',
    category: 'event',
    title: 'Youth Creator submissions close 25 Sep',
    body: 'Upload your campus story clip before 25 September, 6pm and join the screening night.',
    date: '18 Sep 2026',
    time: '6:00 PM',
    location: 'Hall of Fame studio',
    closeDate: '25 Sep 2026',
    isNew: true,
    photo:
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&h=640&q=80',
    details:
      'Screening night for Youth Creator clips. Submit your campus story, then watch the shortlist with other ambassadors and the Hall of Fame jury.',
    highlights: ['Submit by 25 Sep, 6pm', 'Live screening and voting', 'Winner framed in Hall of Fame'],
    tags: ['Creator', 'Screening', 'Award'],
    goingCount: 28,
  },
  {
    id: 'a6',
    category: 'event',
    title: 'SA meetup this Friday',
    body: 'Train together, share onboarding tips, and unlock the Campus Voice badge.',
    date: '16 Oct 2026',
    time: '4:00 PM – 6:00 PM',
    location: 'Dagon University',
    closeDate: '14 Oct 2026',
    isNew: true,
    photo:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&h=640&q=80',
    details:
      'Friday huddle for Student Ambassadors. Share onboarding tips, practice your pitch, and unlock the Campus Voice badge with the crew.',
    highlights: ['Skill share in small groups', 'Campus Voice badge quest', 'Snacks and photo booth'],
    tags: ['Meetup', 'Training', 'Badge'],
    goingCount: 36,
  },
  {
    id: 'a5',
    category: 'event',
    title: 'XP weekend starts Friday',
    body: 'Verified onboarding logs earn 2x XP from Friday 6pm through Sunday midnight.',
    date: '04 Aug 2026',
    time: 'Fri 6:00 PM',
    location: 'All campuses',
    closeDate: '16 Aug 2026',
    isNew: false,
    photo:
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&h=640&q=80',
    details:
      'XP Weekend runs on every partner campus. Log verified onboarding from Friday evening through Sunday midnight to earn 2x XP.',
    highlights: ['2x XP on verified logs', 'All campuses eligible', 'Results drop Monday morning'],
    tags: ['XP', 'Weekend', 'Quest'],
    goingCount: 51,
  },
  {
    id: 'v1',
    category: 'volunteer',
    title: 'Orientation week greeters',
    body: 'Welcome new students at partner-school gates and help them complete onboarding.',
    date: '26 Oct 2026',
    time: '8:00 AM – 12:00 PM',
    location: 'UCSY campus',
    closeDate: '22 Oct 2026',
    isNew: true,
    photo:
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&h=640&q=80',
    details:
      'Greet first-year students at partner-school gates, help them find the onboarding desk, and log new Campus Quest sign-ups.',
    highlights: ['Morning gate shifts', 'Onboarding support', 'Campus Voice badge progress'],
    tags: ['Volunteer', 'Orientation', 'Campus'],
    goingCount: 18,
  },
  {
    id: 'v2',
    category: 'volunteer',
    title: 'Hall of Fame setup crew',
    body: 'Help hang July winner portraits and keep the trophy wall game-ready.',
    date: '16 Aug 2026',
    time: '2:00 PM – 5:00 PM',
    location: 'Campus Quest HQ',
    closeDate: '15 Aug 2026',
    isNew: true,
    photo:
      'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&h=640&q=80',
    details:
      'Set up the Hall of Fame wall, hang winner portraits, and keep trophies display-ready before the next ceremony.',
    highlights: ['Portrait hanging', 'Trophy wall styling', 'Afternoon crew shift'],
    tags: ['Volunteer', 'Hall of Fame', 'Setup'],
    goingCount: 12,
  },
  {
    id: 'v3',
    category: 'volunteer',
    title: 'Peer tutoring for first-years',
    body: 'Volunteer two hours a week to coach first-year students through SA basics.',
    date: '31 Oct 2026',
    time: 'Weekends',
    location: 'Mandalay University',
    closeDate: '28 Oct 2026',
    isNew: false,
    photo:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&h=640&q=80',
    details:
      'Coach first-year students through SA basics on weekends. Share onboarding tips and help them complete their first quests.',
    highlights: ['Weekend sessions', 'Peer mentoring', 'Two hours a week'],
    tags: ['Volunteer', 'Tutoring', 'First-year'],
    goingCount: 9,
  },
  {
    id: 'j1',
    category: 'job',
    title: 'Campus coordinator',
    body: 'Lead weekly SA huddles, track onboarding KPIs, and support partner-school visits.',
    date: '05 Sep 2026',
    time: '15 hrs / week',
    location: 'Yangon',
    closeDate: '30 Sep 2026',
    isNew: true,
    photo:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&h=640&q=80',
    companyName: 'KBZ Bank',
    companyLogo: 'KBZ',
    employmentType: 'Part-time',
    industry: 'Banking',
    details:
      'Lead weekly Student Ambassador huddles, track onboarding KPIs, and support partner-school visits across Yangon campuses. You will work closely with the KBZ Bank Campus Quest crew to keep weekly targets on track.',
    responsibilities: [
      'Run weekly Student Ambassador huddles',
      'Track onboarding KPIs and weekly targets',
      'Coordinate partner-school campus visits',
      'Share updates with the KBZ Bank campus team',
    ],
    requirements: [
      'Active Student Ambassador in good standing',
      'Able to commit 15 hours per week',
      'Strong communication in English and Myanmar',
      'Comfortable visiting partner campuses',
    ],
    benefits: [
      'Monthly stipend',
      'Transport allowance for campus visits',
      'KBZ Bank coordinator certificate',
      'Priority for Hall of Fame features',
    ],
    descriptionFileName: 'Campus-Coordinator-Job-Description.pdf',
    descriptionFileUrl: '/jobs/j1-description.pdf',
  },
  {
    id: 'j2',
    category: 'job',
    title: 'Youth Creator intern',
    body: 'Shoot and edit campus stories for Hall of Fame and KBZ Pay campaigns.',
    date: '08 Sep 2026',
    time: '3-month intern',
    location: 'Remote + Yangon',
    closeDate: '10 Oct 2026',
    isNew: true,
    photo:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=640&q=80',
    companyName: 'KBZ Pay',
    companyLogo: 'PAY',
    employmentType: 'Full-time',
    industry: 'Fintech',
    details:
      'Shoot and edit campus stories for Hall of Fame and KBZ Pay campaigns. You will capture SA moments, cut short clips, and help the KBZ Pay creator team ship weekly content.',
    responsibilities: [
      'Capture campus stories and SA moments',
      'Edit short clips for Hall of Fame and KBZ Pay',
      'Support Home banner creator content',
      'Collaborate with the KBZ Pay content team weekly',
    ],
    requirements: [
      'Basic video shooting and editing skills',
      'Own or can borrow a smartphone with 1080p camera',
      'Able to work on-site in Yangon 3 days a week',
      'Portfolio of 2–3 short campus or social clips',
    ],
    benefits: [
      'Full-time intern stipend',
      'Mentorship from KBZ Pay content editors',
      'Credit on published campus stories',
      'KBZ Pay creator experience letter',
    ],
    descriptionFileName: 'Youth-Creator-Intern-Job-Description.pdf',
    descriptionFileUrl: '/jobs/j2-description.pdf',
  },
  {
    id: 'j3',
    category: 'job',
    title: 'Onboarding desk assistant',
    body: 'Help new students complete forms, scan IDs, and log referrals during peak weeks.',
    date: '07 Aug 2026',
    time: 'Shift-based',
    location: 'University of Yangon',
    closeDate: '18 Aug 2026',
    isNew: false,
    photo:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=640&q=80',
    companyName: 'KBZ Bank',
    companyLogo: 'KBZ',
    employmentType: 'Part-time',
    industry: 'Banking',
    details:
      'Help new students complete forms, scan IDs, and log referrals during peak onboarding weeks at the University of Yangon desk. You will be the first smile students meet when they join Campus Quest with KBZ Bank.',
    responsibilities: [
      'Greet students at the onboarding desk',
      'Help complete forms and scan IDs',
      'Log referrals during peak weeks',
      'Keep the desk queue moving smoothly',
    ],
    requirements: [
      'Friendly, patient, and detail-oriented',
      'Available for shift-based hours',
      'Able to use a tablet for form logging',
      'Currently enrolled at a partner university',
    ],
    benefits: [
      'Shift allowance',
      'KBZ Bank campus desk experience',
      'Meal voucher on duty days',
      'Letter of recommendation after 8 weeks',
    ],
    descriptionFileName: 'Onboarding-Desk-Assistant-Job-Description.pdf',
    descriptionFileUrl: '/jobs/j3-description.pdf',
  },
]

export const marketingBanners: MarketingBanner[] = [
  {
    id: 'b1',
    image:
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&h=640&q=80',
    kicker: 'Onboarding week',
    title: 'Invite 3 classmates',
    subtitle: 'Top onboarders earn a Highest Onboarding badge.',
  },
  {
    id: 'b2',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&h=640&q=80',
    kicker: 'Campus crew',
    title: 'SA meetup this Friday',
    subtitle: 'Train together and unlock Youth Creator.',
  },
  {
    id: 'b3',
    image:
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&h=640&q=80',
    kicker: 'Partner schools',
    title: 'New campuses join Quest',
    subtitle: 'Help more students start their journey.',
  },
  {
    id: 'b4',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&h=640&q=80',
    kicker: 'Hall of Fame',
    title: 'Youth Creator Award',
    subtitle: 'Share your story and get featured.',
  },
]

export const kpiAchievements: KpiAchievement[] = [
  {
    id: 'attendance',
    label: 'Full Attendance',
    subtitle: 'Show up for every SA session',
    current: 20,
    target: 20,
    unit: 'days',
    earned: true,
    status: 'completed',
  },
  {
    id: 'ojt',
    label: 'OJT Completed',
    subtitle: 'Finish on-the-job training',
    current: 1,
    target: 1,
    unit: 'course',
    earned: true,
    status: 'completed',
  },
  {
    id: 'onboarding',
    label: '10 Onboarding Completed',
    subtitle: 'Bring 10 new students on board',
    current: 10,
    target: 10,
    unit: 'students',
    earned: true,
    status: 'completed',
  },
  {
    id: 'assignment',
    label: 'Group Assignment Completed',
    subtitle: 'Submit the campus group project',
    current: 1,
    target: 2,
    unit: 'tasks',
    earned: false,
    status: 'in-progress',
  },
  {
    id: 'training',
    label: 'SA Training Completed',
    subtitle: 'Complete ambassador core training',
    current: 0,
    target: 1,
    unit: 'module',
    earned: false,
    status: 'locked',
  },
]
