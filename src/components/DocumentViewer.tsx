import { Download, X } from 'lucide-react'
import type { ProfileDocument } from '../types'

export function isDocumentImage(url: string) {
  return url.startsWith('data:image/') || /\.(png|jpe?g|gif|webp|svg)$/i.test(url)
}

export function DocumentViewer({
  document,
  onClose,
  canDownload = false,
}: {
  document: ProfileDocument
  onClose: () => void
  canDownload?: boolean
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4" role="dialog" aria-modal>
      <div className="max-h-[85vh] w-full max-w-[430px] overflow-auto rounded-3xl bg-white p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">{document.kind}</p>
            <h3 className="truncate text-base font-extrabold text-ink">{document.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-soft text-ink"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {isDocumentImage(document.fileUrl) ? (
          <img src={document.fileUrl} alt={document.title} className="w-full rounded-2xl bg-sky object-contain" />
        ) : (
          <iframe title={document.title} src={document.fileUrl} className="h-[420px] w-full rounded-2xl bg-sky" />
        )}
        {canDownload ? (
          <a
            href={document.fileUrl}
            download={document.fileName}
            className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-extrabold text-white"
          >
            <Download className="h-4 w-4" />
            Download
          </a>
        ) : null}
      </div>
    </div>
  )
}
