import { MiniTrophyBadge } from './Illustrations'

export function TrophyTag({ label, date }: { label: string; date?: string }) {
  return (
    <span className="inline-flex max-w-full items-center gap-1 rounded-full bg-sky px-2 py-0.5 text-[11px] font-bold text-primary">
      <MiniTrophyBadge className="h-4 w-4 shrink-0" />
      <span className="min-w-0 truncate">{label}</span>
      {date ? (
        <span className="shrink-0 border-l border-primary/20 pl-1.5 text-[10px] font-semibold text-ink-mid">
          {date}
        </span>
      ) : null}
    </span>
  )
}
