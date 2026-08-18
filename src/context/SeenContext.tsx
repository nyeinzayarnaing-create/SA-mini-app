import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { markSeen as persistSeen, readSeen } from '../lib/announcementActions'

type SeenContextValue = {
  seen: Record<string, boolean>
  markSeen: (id: string) => void
  showNew: (isNew: boolean, id: string) => boolean
}

const SeenContext = createContext<SeenContextValue | null>(null)

export function SeenProvider({ children }: { children: ReactNode }) {
  const [seen, setSeen] = useState<Record<string, boolean>>(readSeen)

  const markSeen = useCallback((id: string) => {
    persistSeen(id)
    setSeen((prev) => (prev[id] ? prev : { ...prev, [id]: true }))
  }, [])

  const value = useMemo(
    () => ({
      seen,
      markSeen,
      showNew: (isNew: boolean, id: string) => isNew && !seen[id],
    }),
    [seen, markSeen],
  )

  return <SeenContext.Provider value={value}>{children}</SeenContext.Provider>
}

export function useSeen() {
  const ctx = useContext(SeenContext)
  if (!ctx) throw new Error('useSeen must be used inside SeenProvider')
  return ctx
}
