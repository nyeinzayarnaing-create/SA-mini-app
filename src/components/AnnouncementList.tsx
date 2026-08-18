import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSeen } from '../context/SeenContext'
import { announcements } from '../data/mock'
import type { Announcement, AnnouncementCategory } from '../types'
import { CategoryChip } from './AnnouncementHeader'
import { MegaphoneIllu } from './Illustrations'

const CATEGORIES: AnnouncementCategory[] = ['event', 'volunteer', 'job']

export function AnnouncementList() {
  const { showNew } = useSeen()
  const latest = pickLatest(announcements, 5)

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MegaphoneIllu className="h-7 w-7" />
          <h3 className="text-sm font-bold text-ink">Latest announcement</h3>
        </div>
        <Link to="/announcements" className="text-[11px] font-semibold text-primary">
          See all
        </Link>
      </div>

      <article className="overflow-hidden rounded-2xl border border-line bg-white text-ink shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
        <ul className="divide-y divide-line">
          {latest.map((item) => (
            <li key={item.id}>
              <Link to="/announcements" className="flex items-center gap-2 px-4 py-3">
                <CategoryChip category={item.category} />
                <p className="min-w-0 flex-1 truncate text-sm font-semibold">{item.title}</p>
                {showNew(item.isNew, item.id) ? (
                  <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white">
                    New
                  </span>
                ) : null}
                <ChevronRight className="h-5 w-5 shrink-0 text-ink/30" />
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}

function pickLatest(items: Announcement[], count: number) {
  const newest = items.filter((item) => item.isNew)
  const byDate = [...newest].sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  const picked: Announcement[] = []

  for (const category of CATEGORIES) {
    const item = byDate.find((entry) => entry.category === category)
    if (item) picked.push(item)
  }

  for (const item of byDate) {
    if (picked.length >= count) break
    if (!picked.some((entry) => entry.id === item.id)) picked.push(item)
  }

  return picked.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}
