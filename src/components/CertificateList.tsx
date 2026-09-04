import { Download, Eye, FileText } from 'lucide-react'
import { useState } from 'react'
import { badgeEarnedOn } from '../lib/certificates'
import type { Ambassador, ProfileDocument } from '../types'
import { DocumentViewer, isDocumentImage } from './DocumentViewer'
import { MiniTrophyBadge } from './Illustrations'

export function CertificateList({
  documents,
  badges = [],
  ambassador,
}: {
  documents: ProfileDocument[]
  badges?: string[]
  ambassador?: Pick<Ambassador, 'joinDate' | 'certificates' | 'badges'>
}) {
  const [viewing, setViewing] = useState<ProfileDocument | null>(null)

  return (
    <section className="mt-4">
      <h2 className="mb-2 text-sm font-bold text-ink">Certificate</h2>
      <div className="rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
        {badges.length > 0 ? (
          <div className="mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-mid">Achievement</p>
            <ul className="mt-2 space-y-2">
              {badges.map((badge, index) => {
                const date = ambassador
                  ? badgeEarnedOn(ambassador, badge, index)
                  : documents.find((doc) => doc.kind === 'award' && doc.title === badge)?.issuedOn
                return (
                  <li
                    key={badge}
                    className="flex items-center gap-2 rounded-2xl border border-[#F5C518]/40 bg-[#FFF9E8]/60 px-2.5 py-2"
                  >
                    <span className="inline-flex min-w-0 flex-1 items-center gap-1.5 text-[12px] font-bold text-ink">
                      <MiniTrophyBadge className="h-5 w-5 shrink-0" />
                      <span className="truncate">{badge}</span>
                    </span>
                    {date ? (
                      <span className="shrink-0 text-[11px] font-semibold text-ink-mid">{date}</span>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </div>
        ) : null}
        {documents.length === 0 && badges.length === 0 ? (
          <p className="text-center text-xs text-ink-mid">No certificates yet.</p>
        ) : documents.length === 0 ? null : (
          <ul className={badges.length > 0 ? 'space-y-2 border-t border-line pt-4' : 'space-y-2'}>
            {documents.map((doc) => (
              <li key={doc.id} className="rounded-2xl border border-line bg-sky/50 p-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-line">
                    {isDocumentImage(doc.fileUrl) ? (
                      <img src={doc.fileUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <FileText className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-extrabold text-ink">{doc.title}</p>
                    <p className="mt-0.5 text-[11px] font-semibold capitalize text-ink-mid">
                      {doc.kind} · {doc.issuedOn}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setViewing(doc)}
                        className="inline-flex h-8 items-center gap-1 rounded-full bg-white px-3 text-[11px] font-bold text-primary ring-1 ring-line"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </button>
                      <a
                        href={doc.fileUrl}
                        download={doc.fileName}
                        className="inline-flex h-8 items-center gap-1 rounded-full bg-primary px-3 text-[11px] font-bold text-white"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {viewing ? <DocumentViewer document={viewing} onClose={() => setViewing(null)} /> : null}
    </section>
  )
}
