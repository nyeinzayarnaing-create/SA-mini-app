import { Award } from 'lucide-react'

/** Stamp seal + plain achievement title under Hall badge. */
export function AchievementTitleBanner({ title }: { title: string }) {
  return (
    <div className="lb-achieve flex items-center gap-2.5" role="status">
      <span
        className="lb-achieve-stamp relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-primary/50 bg-sky text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_6px_rgba(0,84,166,0.12)]"
        aria-hidden
      >
        <span className="absolute inset-[3px] rounded-full border border-dashed border-primary/35" />
        <Award className="relative h-4 w-4" strokeWidth={2.4} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink-mid">Achievement Title</p>
        <p className="truncate text-[12px] font-extrabold leading-snug text-ink">{title}</p>
      </div>
    </div>
  )
}
