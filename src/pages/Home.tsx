import { CoinIllu, StarIllu } from '../components/Illustrations'
import { AmbassadorIdCard } from '../components/AmbassadorIdCard'
import { AnnouncementList } from '../components/AnnouncementList'
import { CategoryTiles } from '../components/CategoryTiles'
import { KpiAchievement } from '../components/KpiAchievement'
import { MarketingBanner } from '../components/MarketingBanner'
import { useProfile } from '../context/ProfileContext'

export function Home() {
  const { user } = useProfile()

  return (
    <main className="px-4 pb-6 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Campus Quest</p>
          <h1 className="text-xl font-extrabold text-ink">Student Ambassador</h1>
        </div>
        <div className="relative flex h-11 w-11 items-center justify-center">
          <CoinIllu className="illu-coin h-10 w-10" />
          <StarIllu className="illu-twinkle absolute -right-1 -top-1 h-5 w-5" />
        </div>
      </header>

      <div className="space-y-4">
        <AmbassadorIdCard ambassador={user} to="/profile" />
        <KpiAchievement />
        <MarketingBanner />
        <AnnouncementList />
        <CategoryTiles />
      </div>
    </main>
  )
}
