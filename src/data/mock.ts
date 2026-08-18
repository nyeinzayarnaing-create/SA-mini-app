import type { Ambassador, Announcement, Award, HallTag, KpiAchievement, MarketingBanner, School } from '../types'
import { ambassadorCertificates } from '../lib/certificates'

export function avatarUrl(seed: string, bg = '5ad2f2') {
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed)}&backgroundColor=${bg}`
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
    about:
      'Home of the digital creator squad. UCSY ambassadors lead coding clinics, app demos, and Hall of Frame content shoots for Campus Quest.',
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
  badges: ['Top Onboarder', 'Gold Rank', 'Campus Voice'],
  qualification: 'B.A. International Relations',
  currentAddress: 'No. 12, University Avenue, Kamayut Township, Yangon',
  permanentAddress: 'No. 8, 35th Street, Chanayethazan Township, Mandalay',
  certificates: ambassadorCertificates({
    id: 'SA-2026-0842',
    name: 'Su Myat Aung',
    joinDate: '12 Jan 2025',
    badges: ['Top Onboarder', 'Gold Rank', 'Campus Voice'],
  }),
}

const HALL_ASSIGN: Record<string, HallTag> = {
  'SA-2026-0311': 'top-onboarder',
  'SA-2026-0577': 'youth-creator',
  'SA-2026-0901': 'internship',
  'SA-2026-0128': 'permanent',
  'SA-2026-0664': 'internship',
  'SA-2026-0440': 'youth-creator',
  'SA-2026-0788': 'permanent',
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
    badges: ['Highest On-Boarding', 'Recruiter'],
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
    badges: ['Youth Creator', 'Storyteller'],
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
    badges: ['Builder'],
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
    badges: ['Mentor'],
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
    badges: ['Rookie'],
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
    badges: ['Campus Voice'],
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
    badges: ['Tech Lead'],
  },
] as Ambassador[]).map((person) => ({
  ...person,
  certificates: person.certificates ?? ambassadorCertificates(person),
  hallTag: person.hallTag ?? HALL_ASSIGN[person.id],
}))

export const ambassadors: Ambassador[] = [...coreAmbassadors, ...buildHallAmbassadors()]

function buildHallAmbassadors(): Ambassador[] {
  const tags: HallTag[] = ['top-onboarder', 'youth-creator', 'internship', 'permanent']
  const names = [
    'Min Thu Aung',
    'Ei Mon Kyaw',
    'Soe Wai Lin',
    'Phyu Phyu Win',
    'Htet Aung Shine',
    'Nandar Moe',
    'Zaw Lin Htut',
    'Khin Myat Noe',
    'Ye Min Oo',
    'Su Su Hlaing',
    'Pyae Phyo Naing',
    'Moe Moe Khaing',
  ]
  const ranks: Ambassador['rank'][] = ['Gold', 'Platinum', 'Silver', 'Gold']
  const years = ['3rd Year', '4th Year', '2nd Year', '3rd Year']
  const badges: Record<HallTag, string[]> = {
    'top-onboarder': ['Top On-Boarder', 'Recruiter'],
    'youth-creator': ['Youth Creator', 'Storyteller'],
    internship: ['Internship', 'Rising Star'],
    permanent: ['Permanent', 'Mentor'],
  }
  const bg = ['5ad2f2', 'c5f0fa', '8de4f7', 'b3eaf8'] as const

  return names.map((name, index) => {
    const school = schools[index % schools.length]
    const tag = tags[index % tags.length]
    const person: Ambassador = {
      id: `SA-2026-${1101 + index}`,
      name,
      photo: avatarUrl(name.replaceAll(' ', ''), bg[index % bg.length]),
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
      phone: `+95 9 ${400 + index} ${100 + index} ${200 + index}`,
      email: `${name.toLowerCase().replaceAll(' ', '.')}@campusquest.edu`,
      joinDate: `${10 + (index % 18)} Mar ${2024 + (index % 3)}`,
      status: index === 7 ? 'Inactive' : 'Active',
      badges: badges[tag],
      hallTag: tag,
    }
    return { ...person, certificates: ambassadorCertificates(person) }
  })
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
    date: '25 Aug 2026',
    time: '5:00 PM – 7:00 PM',
    location: 'University of Mandalay',
    closeDate: '24 Aug 2026',
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
    highlights: ['Double XP on verified referrals', 'Live leaderboard updates', 'Gold Rank badge for top 10'],
    tags: ['Onboarding', 'Sprint', 'Campus'],
    goingCount: 42,
  },
  {
    id: 'a2',
    category: 'event',
    title: 'Youth Creator submissions close 20 Aug',
    body: 'Upload your campus story clip before 20 August, 6pm and join the screening night.',
    date: '10 Aug 2026',
    time: '6:00 PM',
    location: 'Hall of Frame studio',
    closeDate: '20 Aug 2026',
    isNew: true,
    photo:
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&h=640&q=80',
    details:
      'Screening night for Youth Creator clips. Submit your campus story, then watch the shortlist with other ambassadors and the Hall of Frame jury.',
    highlights: ['Submit by 20 Aug, 6pm', 'Live screening and voting', 'Winner framed in Hall of Frame'],
    tags: ['Creator', 'Screening', 'Award'],
    goingCount: 28,
  },
  {
    id: 'a6',
    category: 'event',
    title: 'SA meetup this Friday',
    body: 'Train together, share onboarding tips, and unlock the Campus Voice badge.',
    date: '15 Aug 2026',
    time: '4:00 PM – 6:00 PM',
    location: 'Dagon University',
    closeDate: '14 Aug 2026',
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
    date: '18 Aug 2026',
    time: '8:00 AM – 12:00 PM',
    location: 'UCSY campus',
    closeDate: '17 Aug 2026',
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
    title: 'Hall of Frame setup crew',
    body: 'Help hang July winner portraits and keep the trophy wall game-ready.',
    date: '16 Aug 2026',
    time: '2:00 PM – 5:00 PM',
    location: 'Campus Quest HQ',
    closeDate: '15 Aug 2026',
    isNew: true,
    photo:
      'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&h=640&q=80',
    details:
      'Set up the Hall of Frame wall, hang winner portraits, and keep trophies display-ready before the next ceremony.',
    highlights: ['Portrait hanging', 'Trophy wall styling', 'Afternoon crew shift'],
    tags: ['Volunteer', 'Hall of Frame', 'Setup'],
    goingCount: 12,
  },
  {
    id: 'v3',
    category: 'volunteer',
    title: 'Peer tutoring for first-years',
    body: 'Volunteer two hours a week to coach first-year students through SA basics.',
    date: '22 Aug 2026',
    time: 'Weekends',
    location: 'Mandalay University',
    closeDate: '21 Aug 2026',
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
    date: '11 Aug 2026',
    time: '15 hrs / week',
    location: 'Yangon',
    closeDate: '25 Aug 2026',
    isNew: true,
    companyName: 'Campus Quest',
    companyLogo: 'CQ',
    employmentType: 'Part-time',
    industry: 'Education',
    details:
      'Lead weekly Student Ambassador huddles, track onboarding KPIs, and support partner-school visits across Yangon campuses. You will work closely with the Campus Quest crew to keep weekly targets on track.',
    requirements: [
      'Active Student Ambassador in good standing',
      'Able to commit 15 hours per week',
      'Strong communication in English and Myanmar',
      'Comfortable visiting partner campuses',
    ],
    benefits: [
      'Monthly stipend',
      'Transport allowance for campus visits',
      'Campus Quest coordinator certificate',
      'Priority for Hall of Frame features',
    ],
  },
  {
    id: 'j2',
    category: 'job',
    title: 'Youth Creator intern',
    body: 'Shoot and edit campus stories for Hall of Frame and the Home banner.',
    date: '09 Aug 2026',
    time: '3-month intern',
    location: 'Remote + Yangon',
    closeDate: '22 Aug 2026',
    isNew: true,
    companyName: 'Hall of Frame Studio',
    companyLogo: 'HF',
    employmentType: 'Full-time',
    industry: 'Media',
    details:
      'Shoot and edit campus stories for Hall of Frame and the Home banner. You will capture SA moments, cut short clips, and help the studio ship weekly creator content.',
    requirements: [
      'Basic video shooting and editing skills',
      'Own or can borrow a smartphone with 1080p camera',
      'Able to work on-site in Yangon 3 days a week',
      'Portfolio of 2–3 short campus or social clips',
    ],
    benefits: [
      'Full-time intern stipend',
      'Mentorship from Hall of Frame editors',
      'Credit on published campus stories',
      'Equipment access at the studio',
    ],
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
    companyName: 'KBZ Bank',
    companyLogo: 'KBZ',
    employmentType: 'Part-time',
    industry: 'Banking',
    details:
      'Help new students complete forms, scan IDs, and log referrals during peak onboarding weeks at the University of Yangon desk. You will be the first smile students meet when they join Campus Quest.',
    requirements: [
      'Friendly, patient, and detail-oriented',
      'Available for shift-based hours',
      'Able to use a tablet for form logging',
      'Currently enrolled at a partner university',
    ],
    benefits: [
      'Shift allowance',
      'KBZ campus desk experience',
      'Meal voucher on duty days',
      'Letter of recommendation after 8 weeks',
    ],
  },
]

export const marketingBanners: MarketingBanner[] = [
  {
    id: 'b1',
    image:
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&h=640&q=80',
    kicker: 'Onboarding week',
    title: 'Invite 3 classmates',
    subtitle: 'Top onboarders earn a Gold Rank badge.',
  },
  {
    id: 'b2',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&h=640&q=80',
    kicker: 'Campus crew',
    title: 'SA meetup this Friday',
    subtitle: 'Train together and unlock Campus Voice.',
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
    kicker: 'Hall of Frame',
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
