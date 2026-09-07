import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { hallBadgesOf } from '../lib/hall'
import type { Ambassador } from '../types'
import { CoinIllu, MiniTrophyBadge, StarIllu } from './Illustrations'

type Props = {
  ambassador: Ambassador
  to?: string
  size?: 'hero' | 'full'
}

export function AmbassadorIdCard({ ambassador, to, size = 'hero' }: Props) {
  const photoSize = size === 'full' ? 'h-24 w-24' : 'h-20 w-20'
  const badges = hallBadgesOf(ambassador)

  const identity = (
    <>
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Student Ambassador</p>

      <div className="flex gap-3">
        <div className={`relative shrink-0 ${photoSize}`}>
          <div className="id-photo-ring absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary" />
          <img
            src={ambassador.photo}
            alt={`${ambassador.name} photo ID`}
            className="relative h-full w-full rounded-2xl bg-ink-soft object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-extrabold leading-tight text-ink">{ambassador.name}</h2>
              <p className="mt-0.5 font-mono text-xs text-primary">{ambassador.id}</p>
            </div>
            {to ? <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-ink/30" /> : null}
          </div>
          <p className="mt-1 truncate text-xs text-ink-mid">{ambassador.schoolName}</p>
        </div>
      </div>
    </>
  )

  return (
    <article className="id-card rounded-2xl p-4 shadow-[0_10px_28px_rgba(0,84,166,0.12)]">
      <div className={to ? 'id-card-press' : undefined}>
        <StarIllu className="illu-twinkle pointer-events-none absolute -right-1 -top-1 h-9 w-9 opacity-90" />
        <CoinIllu className="illu-coin pointer-events-none absolute -bottom-1 right-10 h-8 w-8 opacity-80" />

        {to ? (
          <Link
            to={to}
            className="relative z-[1] block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            {identity}
          </Link>
        ) : (
          identity
        )}

        <div className="relative z-[1] mt-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink-mid">Achievement</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {badges.map((badge, index) => (
              <AchievementBadge key={badge} label={badge} delayMs={220 + index * 120} />
            ))}
          </div>
        </div>

        {to ? (
          <p className="relative z-[1] mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
            Tap to manage profile
          </p>
        ) : null}
      </div>
    </article>
  )
}

function AchievementBadge({ label, delayMs }: { label: string; delayMs: number }) {
  const [popped, setPopped] = useState(false)

  function pop() {
    setPopped(false)
    requestAnimationFrame(() => setPopped(true))
  }

  return (
    <button
      type="button"
      onClick={pop}
      onAnimationEnd={(event) => {
        if (event.animationName === 'badge-tap') setPopped(false)
      }}
      style={{ animationDelay: `${delayMs}ms` }}
      className="quest-badge inline-flex items-center gap-1 rounded-full bg-white/90 py-0.5 pl-0.5 pr-2 text-[11px] font-bold text-ink shadow-sm ring-1 ring-[#F5C518]/50"
    >
      <span className={`inline-flex items-center gap-1 ${popped ? 'quest-badge-pop' : ''}`}>
        <MiniTrophyBadge className="quest-trophy h-5 w-5" />
        {label}
      </span>
    </button>
  )
}
