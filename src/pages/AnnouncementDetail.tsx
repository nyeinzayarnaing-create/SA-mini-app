import { Navigate, useParams } from 'react-router-dom'
import { announcements } from '../data/mock'
import { EventDetail } from './EventDetail'

export function AnnouncementDetail() {
  const { id } = useParams()
  const item = announcements.find((entry) => entry.id === id)
  if (!item) return <Navigate to="/announcements" replace />
  return <EventDetail />
}
