type IlluProps = { className?: string }

export function CoinIllu({ className = 'h-8 w-8' }: IlluProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="34" r="22" fill="#2bb8de" />
      <circle cx="32" cy="30" r="22" fill="#5AD2F2" stroke="#0054A6" strokeWidth="3" />
      <circle cx="32" cy="30" r="14" fill="#E8F7FC" stroke="#0054A6" strokeWidth="2" />
      <path d="M32 20v20M26 24c2-2 10-2 12 0M26 36c2 2 10 2 12 0" fill="none" stroke="#0054A6" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

export function TrophyIllu({ className = 'h-16 w-16' }: IlluProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden>
      <ellipse cx="40" cy="72" rx="18" ry="4" fill="#0054A6" opacity="0.15" />
      <path d="M28 58h24v4c0 4-5 8-12 8s-12-4-12-8z" fill="#0054A6" />
      <rect x="36" y="50" width="8" height="10" rx="2" fill="#0054A6" />
      <path d="M22 18h36v16c0 12-8 20-18 20s-18-8-18-20z" fill="#5AD2F2" stroke="#0054A6" strokeWidth="3" />
      <path d="M22 22h-10c0 10 4 16 12 18M58 22h10c0 10-4 16-12 18" fill="none" stroke="#0054A6" strokeWidth="3" strokeLinecap="round" />
      <circle cx="40" cy="32" r="7" fill="#fff" stroke="#0054A6" strokeWidth="2" />
      <path d="M40 27v10M36 30l8 4M36 34l8-4" stroke="#0054A6" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function StarIllu({ className = 'h-7 w-7' }: IlluProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        d="M24 4l6 12 13 2-9 9 2 13-12-6-12 6 2-13-9-9 13-2z"
        fill="#5AD2F2"
        stroke="#0054A6"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SchoolIllu({ className = 'h-16 w-16' }: IlluProps) {
  return (
    <svg viewBox="0 0 88 72" className={className} aria-hidden>
      <path d="M10 32 44 12l34 20v32H10z" fill="#E8F7FC" stroke="#0054A6" strokeWidth="3" strokeLinejoin="round" />
      <rect x="34" y="38" width="20" height="26" rx="2" fill="#0054A6" />
      <rect x="16" y="38" width="12" height="12" rx="2" fill="#5AD2F2" stroke="#0054A6" strokeWidth="2" />
      <rect x="60" y="38" width="12" height="12" rx="2" fill="#5AD2F2" stroke="#0054A6" strokeWidth="2" />
      <circle cx="44" cy="24" r="5" fill="#5AD2F2" stroke="#0054A6" strokeWidth="2" />
      <path d="M44 8v8" stroke="#0054A6" strokeWidth="3" strokeLinecap="round" />
      <path d="M44 8h10l-2 4H44z" fill="#5AD2F2" stroke="#0054A6" strokeWidth="2" />
    </svg>
  )
}

export function SquadIllu({ className = 'h-16 w-16' }: IlluProps) {
  return (
    <svg viewBox="0 0 88 72" className={className} aria-hidden>
      <circle cx="32" cy="22" r="11" fill="#FFD7B5" stroke="#0054A6" strokeWidth="2.4" />
      <path d="M21 24c3-8 19-8 22 0" fill="#0054A6" />
      <path d="M16 58c0-12 8-18 16-18s16 6 16 18" fill="#5AD2F2" stroke="#0054A6" strokeWidth="2.4" />
      <circle cx="58" cy="24" r="11" fill="#F6C7A3" stroke="#0054A6" strokeWidth="2.4" />
      <path d="M48 24c2-9 18-8 21 1" fill="#003d7a" />
      <path d="M44 58c0-11 7-17 14-17s14 6 14 17" fill="#0054A6" stroke="#003d7a" strokeWidth="2.4" />
      <circle cx="28" cy="22" r="1.4" fill="#0054A6" />
      <circle cx="36" cy="22" r="1.4" fill="#0054A6" />
      <circle cx="54" cy="24" r="1.4" fill="#0054A6" />
      <circle cx="62" cy="24" r="1.4" fill="#0054A6" />
    </svg>
  )
}

export function BannerHeroIllu({ className = 'h-28 w-28' }: IlluProps) {
  return (
    <svg viewBox="0 0 140 140" className={className} aria-hidden>
      <ellipse cx="78" cy="126" rx="38" ry="8" fill="#003d7a" opacity="0.18" />
      <circle cx="70" cy="42" r="22" fill="#FFD7B5" stroke="#0054A6" strokeWidth="3" />
      <path d="M48 40c6-18 40-18 46 2-8-12-38-14-46-2z" fill="#0054A6" />
      <circle cx="62" cy="42" r="2.4" fill="#0054A6" />
      <circle cx="80" cy="42" r="2.4" fill="#0054A6" />
      <path d="M64 52c4 4 10 4 14 0" fill="none" stroke="#0054A6" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M48 72c2-14 44-16 48 2 2 18-8 42-24 42s-27-22-24-44z" fill="#5AD2F2" stroke="#0054A6" strokeWidth="3" />
      <path d="M52 86c-16 2-22 18-14 24" fill="none" stroke="#0054A6" strokeWidth="3" strokeLinecap="round" />
      <path d="M96 78c16-10 28 2 22 16" fill="none" stroke="#0054A6" strokeWidth="3" strokeLinecap="round" />
      <circle cx="118" cy="28" r="10" fill="#5AD2F2" stroke="#0054A6" strokeWidth="2.4" />
      <path d="M118 22v12M113 25c2-2 8-2 10 0M113 33c2 2 8 2 10 0" fill="none" stroke="#0054A6" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="22" cy="36" r="8" fill="#fff" stroke="#0054A6" strokeWidth="2.2" />
      <path d="M22 32l2 4 4 .5-3 3 .8 4-3.8-2-3.8 2 .8-4-3-3 4-.5z" fill="#5AD2F2" />
    </svg>
  )
}

export function MegaphoneIllu({ className = 'h-8 w-8' }: IlluProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path d="M14 28h10l22-12v32L24 36H14a6 6 0 0 1-6-6 6 6 0 0 1 6-6z" fill="#5AD2F2" stroke="#0054A6" strokeWidth="3" strokeLinejoin="round" />
      <path d="M24 36v8a8 8 0 0 0 8 2" fill="none" stroke="#0054A6" strokeWidth="3" strokeLinecap="round" />
      <path d="M50 24c4 4 4 12 0 16" fill="none" stroke="#0054A6" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

export function BadgeRibbonIllu({ className = 'h-10 w-10' }: IlluProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="26" r="16" fill="#5AD2F2" stroke="#0054A6" strokeWidth="3" />
      <circle cx="32" cy="26" r="8" fill="#fff" stroke="#0054A6" strokeWidth="2" />
      <path d="M24 38 18 58l14-8 14 8-6-20" fill="#0054A6" />
      <path d="M32 22v8M28 25l8 4M28 29l8-4" stroke="#0054A6" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function MiniTrophyBadge({ className = 'h-5 w-5' }: IlluProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="14" fill="#FFF3C4" stroke="#0054A6" strokeWidth="2" />
      <path d="M11 10h10v5c0 3.2-2.2 5.2-5 5.2S11 18.2 11 15z" fill="#5AD2F2" stroke="#0054A6" strokeWidth="1.5" />
      <path d="M11 12H8c0 3 1.2 4.5 3 5M21 12h3c0 3-1.2 4.5-3 5" fill="none" stroke="#0054A6" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="14.2" y="20" width="3.6" height="2.2" rx="0.6" fill="#0054A6" />
      <path d="M12.5 24h7v1.4c0 1-1.4 1.8-3.5 1.8s-3.5-.8-3.5-1.8z" fill="#0054A6" />
      <path d="M23.5 7.5 24.4 9.4 26.3 10.3 24.4 11.2 23.5 13.1 22.6 11.2 20.7 10.3 22.6 9.4z" fill="#5AD2F2" />
    </svg>
  )
}

export function SuccessRegisterIllu({ className = 'h-40 w-40' }: IlluProps) {
  return (
    <svg viewBox="0 0 200 170" className={className} aria-hidden>
      <ellipse cx="100" cy="156" rx="58" ry="10" fill="#0054A6" opacity="0.12" />
      <circle cx="100" cy="58" r="30" fill="#FFD7B5" stroke="#0054A6" strokeWidth="3" />
      <path d="M72 56c8-22 48-22 56 4-12-14-44-16-56-4z" fill="#0054A6" />
      <circle cx="90" cy="56" r="3.2" fill="#0054A6" />
      <circle cx="110" cy="56" r="3.2" fill="#0054A6" />
      <path d="M92 68c5 6 12 6 16 0" fill="none" stroke="#0054A6" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M70 102c2-18 56-20 60 2 3 18-12 40-30 40s-33-22-30-42z" fill="#5AD2F2" stroke="#0054A6" strokeWidth="3" />
      <rect x="84" y="108" width="32" height="26" rx="4" fill="#fff" stroke="#0054A6" strokeWidth="2.2" />
      <path d="M92 121l6 6 12-12" fill="none" stroke="#16a34a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="148" cy="46" r="18" fill="#FFF3C4" stroke="#0054A6" strokeWidth="2.4" />
      <path d="M148 38v10" stroke="#0054A6" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="148" cy="54" r="1.8" fill="#0054A6" />
      <circle cx="52" cy="40" r="7" fill="#5AD2F2" stroke="#0054A6" strokeWidth="2" />
      <path d="M168 78l4 8 8 1-6 6 1.5 8-7.5-4-7.5 4 1.5-8-6-6 8-1z" fill="#5AD2F2" stroke="#0054A6" strokeWidth="1.6" />
    </svg>
  )
}

export function ActivityIllu({ className = 'h-16 w-16' }: IlluProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden>
      <ellipse cx="40" cy="72" rx="18" ry="4" fill="#0054A6" opacity="0.15" />
      <rect x="18" y="16" width="44" height="52" rx="8" fill="#E8F7FC" stroke="#0054A6" strokeWidth="3" />
      <rect x="28" y="10" width="24" height="12" rx="6" fill="#5AD2F2" stroke="#0054A6" strokeWidth="2.4" />
      <circle cx="28" cy="38" r="5" fill="#fff" stroke="#0054A6" strokeWidth="2" />
      <path d="M25.5 38l2 2 4-4" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 38h16" fill="none" stroke="#0054A6" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="28" cy="50" r="5" fill="#fff" stroke="#0054A6" strokeWidth="2" />
      <path d="M25.5 50l2 2 4-4" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 50h12" fill="none" stroke="#0054A6" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

export function EmptySearchIllu({ className = 'h-40 w-40' }: IlluProps) {
  return (
    <svg viewBox="0 0 200 160" className={className} aria-hidden>
      <ellipse cx="100" cy="142" rx="58" ry="10" fill="#0054A6" opacity="0.12" />
      <circle cx="78" cy="58" r="28" fill="#FFD7B5" stroke="#0054A6" strokeWidth="3" />
      <path d="M52 58c8-22 44-22 52 2-10-14-42-16-52-2z" fill="#0054A6" />
      <circle cx="68" cy="56" r="3" fill="#0054A6" />
      <circle cx="88" cy="56" r="3" fill="#0054A6" />
      <path d="M70 68c5 5 12 5 16 0" fill="none" stroke="#0054A6" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M52 96c2-16 48-18 52 2 3 16-10 36-26 36s-29-20-26-38z" fill="#5AD2F2" stroke="#0054A6" strokeWidth="3" />
      <path d="M54 108c-14 4-18 18-10 24" fill="none" stroke="#0054A6" strokeWidth="3" strokeLinecap="round" />
      <circle cx="138" cy="78" r="28" fill="#E8F7FC" stroke="#0054A6" strokeWidth="4" />
      <circle cx="138" cy="78" r="16" fill="#fff" stroke="#0054A6" strokeWidth="2.5" />
      <path d="M158 98 178 122" stroke="#0054A6" strokeWidth="6" strokeLinecap="round" />
      <path d="M132 72h12M138 66v12" stroke="#5AD2F2" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="48" cy="36" r="6" fill="#5AD2F2" stroke="#0054A6" strokeWidth="2" />
      <path d="M172 40l4 8 8 1-6 6 1.5 8-7.5-4-7.5 4 1.5-8-6-6 8-1z" fill="#5AD2F2" stroke="#0054A6" strokeWidth="1.8" />
    </svg>
  )
}
