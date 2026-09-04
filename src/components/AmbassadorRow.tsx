import { GraduationCap, MapPin, Users } from 'lucide-react'
import type { Ambassador, HallTag } from '../types'
import { AvatarImage } from './AvatarImage'
import { HallBadgeStack } from './HallBadgeStack'

export function AmbassadorRow({
  ambassador,
  showHallTag = false,
  preferTag,
}: {
  ambassador: Ambassador
  showHallTag?: boolean
  preferTag?: HallTag
}) {
  const active = ambassador.status === 'Active'

  return (
    <article className="rounded-2xl border border-line bg-white p-4 shadow-[0_6px_18px_rgba(0,84,166,0.06)]">
      <div className="flex items-start gap-3">
        <AvatarImage
          src={ambassador.photo}
          alt={ambassador.name}
          seed={ambassador.name}
          className="h-14 w-14 shrink-0 rounded-2xl bg-ink-soft object-cover ring-1 ring-secondary/60"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[15px] font-extrabold leading-snug text-ink">{ambassador.name}</h3>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
                active ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#EEF0F4] text-[#6B7280]'
              }`}
            >
              {ambassador.status}
            </span>
          </div>
          <p className="mt-0.5 font-mono text-[12px] font-semibold text-primary">{ambassador.id}</p>
          {showHallTag ? (
            <p className="mt-1.5">
              <HallBadgeStack ambassador={ambassador} prefer={preferTag} />
            </p>
          ) : null}
          <p className="mt-1 flex items-center gap-1 text-[13px] font-semibold text-ink-mid">
            <GraduationCap className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="truncate">{ambassador.schoolName}</span>
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-[13px] font-semibold text-ink-mid">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
            {ambassador.trainingRegion}
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-[13px] font-semibold text-ink-mid">
            <Users className="h-3.5 w-3.5 shrink-0 text-primary" />
            {ambassador.saBatch}
          </p>
        </div>
      </div>
    </article>
  )
}
