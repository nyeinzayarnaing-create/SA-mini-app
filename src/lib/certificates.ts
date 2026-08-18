import type { Ambassador, ProfileDocument } from '../types'

export function certificatePreview(title: string, holder: string, year: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="560" viewBox="0 0 800 560">
    <rect width="800" height="560" fill="#E8F1FA"/>
    <rect x="28" y="28" width="744" height="504" fill="#ffffff" stroke="#0054A6" stroke-width="4" rx="18"/>
    <rect x="44" y="44" width="712" height="472" fill="none" stroke="#5AD2F2" stroke-width="2" rx="12"/>
    <text x="400" y="130" text-anchor="middle" font-size="14" font-family="Arial" fill="#0054A6" letter-spacing="4">CAMPUS QUEST</text>
    <text x="400" y="170" text-anchor="middle" font-size="22" font-family="Arial" fill="#8A93A6">Certificate of Achievement</text>
    <text x="400" y="270" text-anchor="middle" font-size="32" font-weight="700" font-family="Arial" fill="#00315F">${escapeXml(title)}</text>
    <text x="400" y="320" text-anchor="middle" font-size="18" font-family="Arial" fill="#334155">Awarded to ${escapeXml(holder)}</text>
    <text x="400" y="370" text-anchor="middle" font-size="16" font-family="Arial" fill="#64748B">${escapeXml(year)}</text>
  </svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export function ambassadorCertificates(
  person: Pick<Ambassador, 'id' | 'name' | 'joinDate' | 'badges'>,
): ProfileDocument[] {
  return [
    {
      id: `${person.id}-training`,
      kind: 'certificate',
      title: 'Student Ambassador Training',
      issuedOn: person.joinDate,
      fileName: 'SA-Training-Certificate.svg',
      fileUrl: certificatePreview('Student Ambassador Training', person.name, person.joinDate),
    },
    ...person.badges.map((badge, index) => ({
      id: `${person.id}-badge-${index}`,
      kind: 'award' as const,
      title: badge,
      issuedOn: person.joinDate,
      fileName: `${badge.replaceAll(' ', '-')}.svg`,
      fileUrl: certificatePreview(badge, person.name, person.joinDate),
    })),
  ]
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}
