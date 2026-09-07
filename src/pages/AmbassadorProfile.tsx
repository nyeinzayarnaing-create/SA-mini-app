import { ChevronLeft } from 'lucide-react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { CertificateList } from '../components/CertificateList'
import { ProfileAchievements } from '../components/ProfileAchievements'
import { ProfileCard } from '../components/ProfileCard'
import { useProfile } from '../context/ProfileContext'
import { ambassadors } from '../data/mock'

export function AmbassadorProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useProfile()
  const person = ambassadors.find((entry) => entry.id === id)

  if (!person) return <Navigate to="/ambassadors" replace />
  if (person.id === user.id) return <Navigate to="/profile" replace />

  return (
    <main className="min-h-svh bg-sky px-4 pb-8 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="mb-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary shadow-sm ring-1 ring-line"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Student Ambassador</p>
          <h1 className="truncate text-xl font-extrabold text-ink">Profile</h1>
        </div>
      </header>

      <ProfileCard ambassador={person} />
      <ProfileAchievements ambassador={person} />
      <CertificateList documents={person.certificates ?? []} />
    </main>
  )
}
