import type { Rank } from '../types'

const RANK_STYLES: Record<Rank, string> = {
  Bronze: 'bg-[#c47b4a]/15 text-[#9a5a2f] ring-[#c47b4a]/35',
  Silver: 'bg-slate-200/70 text-slate-600 ring-slate-300',
  Gold: 'bg-primary/10 text-primary ring-primary/30',
  Platinum: 'bg-secondary/20 text-primary-dark ring-secondary/40',
}

export function RankBadge({ rank }: { rank: Rank }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ${RANK_STYLES[rank]}`}
    >
      {rank}
    </span>
  )
}

