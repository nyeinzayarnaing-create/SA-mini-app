import { ClipboardList, Frame, House, Megaphone, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: 'Home', icon: House, end: true },
  { to: '/announcements', label: 'Announcement', icon: Megaphone, end: false },
  { to: '/hall-of-frame', label: 'Hall of Frame', icon: Frame, end: false },
  { to: '/my-activity', label: 'My Activity', icon: ClipboardList, end: false },
  { to: '/profile', label: 'Profile', icon: User, end: true },
] as const

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
      <ul className="grid grid-cols-5 px-0.5 pt-1.5 pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <li key={tab.to}>
              <NavLink
                to={tab.to}
                end={tab.end}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-0.5 rounded-xl px-0.5 py-1.5 text-[10px] font-semibold leading-tight ${
                    isActive ? 'text-primary' : 'text-ink-mid'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span className="text-center">{tab.label}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
