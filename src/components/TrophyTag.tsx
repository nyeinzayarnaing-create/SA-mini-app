import { MiniTrophyBadge } from './Illustrations'

export function TrophyTag({ label }: { label: string }) {
  return (
    <span className="inline-flex max-w-full items-center gap-1 rounded-full bg-sky px-2 py-0.5 text-[11px] font-bold text-primary">
      <MiniTrophyBadge className="h-4 w-4 shrink-0" />
      <span className="truncate">{label}</span>
    </span>
  )
}
