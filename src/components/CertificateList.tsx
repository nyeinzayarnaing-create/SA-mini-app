import { Download, Eye, FileText } from 'lucide-react'
import { useState } from 'react'
import type { ProfileDocument } from '../types'
import { DocumentViewer, isDocumentImage } from './DocumentViewer'

export function CertificateList({
  documents,
  canDownload = false,
}: {
  documents: ProfileDocument[]
  /** Download only on own profile. */
  canDownload?: boolean
}) {
  const [viewing, setViewing] = useState<ProfileDocument | null>(null)

  return (
    <section className="mt-4">
      <h2 className="mb-2 text-sm font-bold text-ink">Certificate</h2>
      <div className="rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
        {documents.length === 0 ? (
          <p className="text-center text-xs text-ink-mid">No certificates yet.</p>
        ) : (
          <ul className="space-y-2">
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
                      {canDownload ? (
                        <a
                          href={doc.fileUrl}
                          download={doc.fileName}
                          className="inline-flex h-8 items-center gap-1 rounded-full bg-primary px-3 text-[11px] font-bold text-white"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {viewing ? (
        <DocumentViewer
          document={viewing}
          canDownload={canDownload}
          onClose={() => setViewing(null)}
        />
      ) : null}
    </section>
  )
}
