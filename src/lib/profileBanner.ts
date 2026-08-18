import { schools } from '../data/mock'
import type { Ambassador } from '../types'

export function profileBanner(person: Pick<Ambassador, 'banner' | 'schoolId'>) {
  return person.banner ?? schools.find((school) => school.id === person.schoolId)?.banner
}
