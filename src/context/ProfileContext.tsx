import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { currentUser as seedUser } from '../data/mock'
import { ambassadorCertificates } from '../lib/certificates'
import { hallBadgesOf } from '../lib/hall'
import type { Ambassador } from '../types'

/** Bump to drop stale local profiles that still carry Gold Rank / Campus Voice. */
const STORAGE_KEY = 'sa-profile-v4'

type ProfileContextValue = {
  user: Ambassador
  updateUser: (patch: Partial<Ambassador>) => void
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

function normalizeUser(person: Ambassador): Ambassador {
  const hallTags = person.hallTags?.length ? person.hallTags : seedUser.hallTags
  const withTags = {
    ...person,
    hallTags,
    hallTag: person.hallTag ?? hallTags?.[0],
    onboardingCount: person.onboardingCount ?? seedUser.onboardingCount,
    onboardingAwardTitle: person.onboardingAwardTitle ?? seedUser.onboardingAwardTitle,
    youthCreatorAwardTitle: person.youthCreatorAwardTitle ?? seedUser.youthCreatorAwardTitle,
    badgeGotDates: person.badgeGotDates ?? seedUser.badgeGotDates,
  }
  const badges = hallBadgesOf(withTags)
  return {
    ...withTags,
    badges,
    certificates: ambassadorCertificates({ ...withTags, badges }),
  }
}

function loadUser(): Ambassador {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return normalizeUser({ ...seedUser })
    const stored = JSON.parse(raw) as Partial<Ambassador>
    return normalizeUser({ ...seedUser, ...stored })
  } catch {
    return normalizeUser({ ...seedUser })
  }
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Ambassador>(loadUser)

  const value = useMemo(
    () => ({
      user,
      updateUser: (patch: Partial<Ambassador>) =>
        setUser((prev) => {
          const next = normalizeUser({ ...prev, ...patch })
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
          } catch {
            /* ignore quota errors on large photo uploads */
          }
          return next
        }),
    }),
    [user],
  )

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used inside ProfileProvider')
  return ctx
}
