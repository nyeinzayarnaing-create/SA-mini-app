import { ChevronRight, FileQuestion, Headphones, ScrollText } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { ProfileCard } from '../components/ProfileCard'
import { useProfile } from '../context/ProfileContext'

const SETTINGS = [
  { to: '/profile/faqs', label: 'FAQs', icon: FileQuestion },
  { to: '/profile/terms', label: 'Terms & Conditions', icon: ScrollText },
  { to: '/profile/contact', label: 'Contact Us', icon: Headphones },
] as const

export function Profile() {
  const { user } = useProfile()
  const [params] = useSearchParams()
  const saved = params.get('saved') === '1'

  return (
    <main className="px-4 pb-6 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Account</p>
        <h1 className="text-xl font-extrabold text-ink">Your profile</h1>
      </header>

      <ProfileCard ambassador={user} action="view-profile" />

      {saved ? (
        <p className="mt-3 rounded-xl bg-secondary/20 px-3 py-2 text-xs font-semibold text-primary">
          Profile updated.
        </p>
      ) : null}

      <section className="mt-4">
        <h2 className="mb-2 text-sm font-bold text-ink">Setting</h2>
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
          {SETTINGS.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3.5 ${
                  index === 0 ? '' : 'border-t border-line'
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1 text-sm font-extrabold text-ink">{item.label}</span>
                <ChevronRight className="h-4 w-4 text-ink/30" />
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
