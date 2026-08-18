import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'

function SettingPage({ title, children }: { title: string; children: ReactNode }) {
  const navigate = useNavigate()
  return (
    <main className="min-h-svh bg-sky px-4 pb-8 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="mb-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/profile')}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary shadow-sm ring-1 ring-line"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Setting</p>
          <h1 className="text-xl font-extrabold text-ink">{title}</h1>
        </div>
      </header>
      <section className="rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
        {children}
      </section>
    </main>
  )
}

export function Faqs() {
  const items = [
    {
      q: 'How do I update my profile photo?',
      a: 'Open Profile, tap View Profile, then Edit. Tap the photo to upload a new image and save.',
    },
    {
      q: 'Where are my certificates?',
      a: 'Certificates are on View Profile, under the Certificate section. You can view or download each soft copy.',
    },
    {
      q: 'How do I join an event or apply for a job?',
      a: 'Go to Announcement, open the item, then Join or Apply. Your status appears in My Activity after you submit.',
    },
    {
      q: 'Who can see my personal information?',
      a: 'Other Student Ambassadors can see your public profile card and certificates. Personal information stays on your profile only.',
    },
  ]

  return (
    <SettingPage title="FAQs">
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.q}>
            <p className="text-sm font-extrabold text-ink">{item.q}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-mid">{item.a}</p>
          </li>
        ))}
      </ul>
    </SettingPage>
  )
}

export function Terms() {
  return (
    <SettingPage title="Terms & Conditions">
      <div className="space-y-3 text-[13px] leading-relaxed text-ink-mid">
        <p className="text-sm font-extrabold text-ink">Campus Quest Student Ambassador Programme</p>
        <p>
          By using this mini-app you agree to keep your ambassador details accurate, follow Campus Quest
          activity rules, and use announcement, job, and volunteer features in good faith.
        </p>
        <p>
          Certificates and awards uploaded here are for your own records. Do not share another ambassador’s
          personal data outside the programme.
        </p>
        <p>
          Campus Quest may review registrations and applications. Pending items can be approved or declined
          by programme admins.
        </p>
      </div>
    </SettingPage>
  )
}

export function ContactUs() {
  return (
    <SettingPage title="Contact Us">
      <div className="space-y-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-mid">Programme desk</p>
          <p className="mt-1 text-sm font-extrabold text-ink">Campus Quest Support</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-mid">Email</p>
          <p className="mt-1 text-sm font-semibold text-primary">support@campusquest.edu</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-mid">Phone</p>
          <p className="mt-1 text-sm font-semibold text-ink">+95 1 230 4500</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-mid">Hours</p>
          <p className="mt-1 text-sm font-semibold text-ink">Mon–Fri, 9:00 AM – 5:00 PM</p>
        </div>
      </div>
    </SettingPage>
  )
}
