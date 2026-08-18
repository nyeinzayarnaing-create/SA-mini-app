import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function AppShell() {
  const { pathname } = useLocation()
  const hideNav =
    /^\/announcements\/[^/]+/.test(pathname) ||
    /^\/schools\/[^/]+/.test(pathname) ||
    /^\/ambassadors\/[^/]+/.test(pathname) ||
    pathname.startsWith('/profile/')

  return (
    <div className="quest-bg min-h-svh">
      <div
        className={`relative mx-auto min-h-svh w-full max-w-[430px] text-ink shadow-[0_0_48px_rgba(0,84,166,0.08)] ${
          hideNav ? 'bg-white pb-0' : 'bg-sky/70 pb-20'
        }`}
      >
        <Outlet />
        {hideNav ? null : <BottomNav />}
      </div>
    </div>
  )
}
