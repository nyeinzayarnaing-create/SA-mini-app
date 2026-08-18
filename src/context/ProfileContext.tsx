import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { currentUser as seedUser } from '../data/mock'
import type { Ambassador } from '../types'

const STORAGE_KEY = 'sa-profile'

type ProfileContextValue = {
  user: Ambassador
  updateUser: (patch: Partial<Ambassador>) => void
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

function loadUser(): Ambassador {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...seedUser }
    const stored = JSON.parse(raw) as Partial<Ambassador>
    return { ...seedUser, ...stored }
  } catch {
    return { ...seedUser }
  }
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Ambassador>(loadUser)

  const value = useMemo(
    () => ({
      user,
      updateUser: (patch: Partial<Ambassador>) =>
        setUser((prev) => {
          const next = { ...prev, ...patch }
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
