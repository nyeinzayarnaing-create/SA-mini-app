import { Link } from 'react-router-dom'
import { hallBadgesOf } from '../lib/hall'
import { profileBanner } from '../lib/profileBanner'
import type { Ambassador } from '../types'
import { TrophyTag } from './TrophyTag'

type Props = {
  ambassador: Ambassador
  action?: 'status' | 'view-profile'
  showAchievements?: boolean
}

export function ProfileCard({
  ambassador,
  action = 'status',
  showAchievements = true,
}: Props) {
  const active = ambassador.status === 'Active'
  const banner = profileBanner(ambassador)
  const bio = [ambassador.schoolName, ambassador.trainingRegion, ambassador.saBatch]
    .filter(Boolean)
    .join(' · ')
  const badges = hallBadgesOf(ambassador)

  return (
    <section className="overflow-hidden rounded-[28px] bg-white shadow-[0_12px_32px_rgba(0,84,166,0.08)]">
      <div className="relative h-[120px] bg-primary">
        {banner ? <img src={banner} alt="" className="h-full w-full object-cover" /> : null}
        {action === 'status' ? (
          <span
            className={`absolute right-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${
              active ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-white/90 text-[#6B7280]'
            }`}
          >
            {ambassador.status}
          </span>
        ) : null}
      </div>

      <div className="-mt-10 px-5 pb-6 text-center">
        <div className="relative mx-auto h-[84px] w-[84px]">
          <span className="id-photo-ring absolute -inset-[3px] rounded-full bg-gradient-to-br from-primary via-secondary to-primary" />
          <img
            src={ambassador.photo}
            alt={`${ambassador.name} profile photo`}
            className="relative h-full w-full rounded-full bg-ink-soft object-cover"
          />
        </div>

        <h2 className="mt-3 text-[22px] font-extrabold leading-tight text-ink">{ambassador.name}</h2>
        <p className="mt-1 font-mono text-[13px] text-primary">{ambassador.id}</p>
        <p className="mx-auto mt-1.5 max-w-[280px] text-[13px] leading-relaxed text-ink-mid">{bio}</p>

        {action === 'view-profile' ? (
          <Link to="/profile/view" className="mt-3 inline-block text-[13px] font-bold text-primary">
            View profile
          </Link>
        ) : null}

        {showAchievements && badges.length > 0 ? (
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {badges.map((badge) => (
              <TrophyTag key={badge} label={badge} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
