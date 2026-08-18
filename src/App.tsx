import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { ProfileProvider } from './context/ProfileContext'
import { SeenProvider } from './context/SeenContext'
import { Ambassadors } from './pages/Ambassadors'
import { AmbassadorProfile } from './pages/AmbassadorProfile'
import { Announcements } from './pages/Announcements'
import { AnnouncementDetail } from './pages/AnnouncementDetail'
import { EventRegister } from './pages/EventRegister'
import { HallOfFrame } from './pages/HallOfFrame'
import { Home } from './pages/Home'
import { MyActivity } from './pages/MyActivity'
import { Profile } from './pages/Profile'
import { ProfileView } from './pages/ProfileView'
import { ContactUs, Faqs, Terms } from './pages/SettingsPages'
import { EditProfile } from './pages/EditProfile'
import { SchoolDetail } from './pages/SchoolDetail'
import { Schools } from './pages/Schools'
import { SearchPage } from './pages/Search'

export default function App() {
  return (
    <ProfileProvider>
      <SeenProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/view" element={<ProfileView />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/faqs" element={<Faqs />} />
            <Route path="/profile/terms" element={<Terms />} />
            <Route path="/profile/contact" element={<ContactUs />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/announcements/:id" element={<AnnouncementDetail />} />
            <Route path="/announcements/:id/register" element={<EventRegister />} />
            <Route path="/hall-of-frame" element={<HallOfFrame />} />
            <Route path="/my-activity" element={<MyActivity />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/schools/:id" element={<SchoolDetail />} />
            <Route path="/ambassadors" element={<Ambassadors />} />
            <Route path="/ambassadors/:id" element={<AmbassadorProfile />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </SeenProvider>
    </ProfileProvider>
  )
}
