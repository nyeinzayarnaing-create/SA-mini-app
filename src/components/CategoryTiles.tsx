import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SchoolIllu, SquadIllu } from './Illustrations'

const tiles = [
  {
    to: '/schools',
    title: 'Partner School List',
    subtitle: 'Campuses in the quest',
    art: SchoolIllu,
  },
  {
    to: '/ambassadors',
    title: 'Student Ambassadors',
    subtitle: 'Meet the squad',
    art: SquadIllu,
  },
] as const

export function CategoryTiles() {
  return (
    <section>
      <h3 className="mb-2 text-sm font-bold text-ink">Categories</h3>
      <div className="grid grid-cols-2 gap-3">
        {tiles.map((tile) => {
          const Art = tile.art
          return (
            <Link
              key={tile.to}
              to={tile.to}
              className="rounded-2xl border border-line bg-white p-3.5 shadow-[0_8px_24px_rgba(0,84,166,0.06)] transition-transform active:scale-[0.98]"
            >
              <Art className="h-14 w-14" />
              <p className="mt-2 text-sm font-extrabold leading-snug text-ink">{tile.title}</p>
              <p className="mt-0.5 text-[11px] text-ink-mid">{tile.subtitle}</p>
              <ChevronRight className="mt-2 h-4 w-4 text-primary/50" />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
