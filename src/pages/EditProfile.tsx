import { Camera, Check, ChevronLeft, FileText, Pencil, Trash2, Upload } from 'lucide-react'
import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { DocumentViewer, isDocumentImage } from '../components/DocumentViewer'
import { useProfile } from '../context/ProfileContext'
import { ambassadorAge } from '../data/mock'
import { profileBanner } from '../lib/profileBanner'
import type { ProfileDocument, ProfileDocumentKind } from '../types'

export function EditProfile() {
  const navigate = useNavigate()
  const { user, updateUser } = useProfile()
  const photoInput = useRef<HTMLInputElement>(null)
  const bannerInput = useRef<HTMLInputElement>(null)

  const [photo, setPhoto] = useState(user.photo)
  const [banner, setBanner] = useState(profileBanner(user) ?? '')
  const [age, setAge] = useState(String(ambassadorAge(user)))
  const [qualification, setQualification] = useState(user.qualification ?? user.year)
  const [currentAddress, setCurrentAddress] = useState(user.currentAddress ?? '')
  const [permanentAddress, setPermanentAddress] = useState(user.permanentAddress ?? '')
  const [documents, setDocuments] = useState<ProfileDocument[]>(user.certificates ?? [])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [viewing, setViewing] = useState<ProfileDocument | null>(null)
  const [error, setError] = useState('')

  function onPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') setPhoto(reader.result)
    }
    reader.readAsDataURL(file)
  }

  function onBanner(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') setBanner(reader.result)
    }
    reader.readAsDataURL(file)
  }

  function save(event: FormEvent) {
    event.preventDefault()
    const nextAge = Number.parseInt(age, 10)
    if (!Number.isFinite(nextAge) || nextAge < 1) {
      setError('Please enter a valid age.')
      return
    }
    if (!qualification.trim()) {
      setError('Please enter your qualification.')
      return
    }
    if (!currentAddress.trim() || !permanentAddress.trim()) {
      setError('Please enter current and permanent address.')
      return
    }
    updateUser({
      photo,
      banner: banner || undefined,
      age: nextAge,
      qualification: qualification.trim(),
      currentAddress: currentAddress.trim(),
      permanentAddress: permanentAddress.trim(),
      certificates: documents,
    })
    navigate('/profile/view?saved=1')
  }

  return (
    <main className="min-h-svh bg-sky px-4 pb-[max(6rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="mb-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/profile/view')}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary shadow-sm ring-1 ring-line"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Account</p>
          <h1 className="text-xl font-extrabold text-ink">Edit Profile</h1>
        </div>
      </header>

      <form onSubmit={save} className="space-y-4">
        <section className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
          <button
            type="button"
            onClick={() => bannerInput.current?.click()}
            className="relative block h-[140px] w-full bg-primary"
            aria-label="Change banner photo"
          >
            {banner ? <img src={banner} alt="" className="h-full w-full object-cover" /> : null}
            <span className="absolute inset-0 bg-black/20" />
            <span className="absolute bottom-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary shadow-sm">
              <Pencil className="h-3.5 w-3.5" />
            </span>
          </button>
          <input ref={bannerInput} type="file" accept="image/*" className="sr-only" onChange={onBanner} />
          <p className="px-4 pt-2 text-[11px] font-semibold text-ink-mid">Tap the banner to upload a new photo.</p>
          <div className="flex items-center gap-3 p-4">
            <button
              type="button"
              onClick={() => photoInput.current?.click()}
              className="relative h-20 w-20 shrink-0"
              aria-label="Change profile photo"
            >
              <span className="id-photo-ring absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary" />
              <img src={photo} alt="" className="relative h-full w-full rounded-2xl bg-ink-soft object-cover" />
              <span className="absolute bottom-1 right-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                <Camera className="h-3 w-3" />
              </span>
            </button>
            <input ref={photoInput} type="file" accept="image/*" className="sr-only" onChange={onPhoto} />
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-ink">{user.name}</p>
              <p className="font-mono text-xs text-primary">{user.id}</p>
              <p className="mt-1 text-[11px] font-semibold text-ink-mid">Tap the photo to upload a new one.</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
          <h2 className="text-sm font-extrabold text-ink">Personal information</h2>
          <p className="mt-1 text-[11px] text-ink-mid">Age, location, and qualification can be edited.</p>
          <div className="mt-3 space-y-3">
            <Field label="Age" type="number" value={age} onChange={setAge} />
            <Field label="Qualification" value={qualification} onChange={setQualification} />
            <AreaField label="Current address" value={currentAddress} onChange={setCurrentAddress} />
            <AreaField label="Permanent address" value={permanentAddress} onChange={setPermanentAddress} />
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(0,84,166,0.06)]">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-extrabold text-ink">Certificate</h2>
              <p className="mt-1 text-[11px] text-ink-mid">Upload, edit, or remove soft copies.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setUploadOpen((open) => !open)
                setEditingId(null)
              }}
              className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-[11px] font-bold text-white"
            >
              <Upload className="h-3.5 w-3.5" />
              Upload
            </button>
          </div>

          {uploadOpen ? (
            <DocumentForm
              submitLabel="Add to list"
              onCancel={() => setUploadOpen(false)}
              onSave={(doc) => {
                setDocuments((list) => [doc, ...list])
                setUploadOpen(false)
              }}
            />
          ) : null}

          <ul className="mt-3 space-y-2">
            {documents.map((doc) => (
              <li key={doc.id} className="rounded-2xl border border-line bg-sky/50 p-3">
                {editingId === doc.id ? (
                  <DocumentForm
                    initial={doc}
                    submitLabel="Update"
                    onCancel={() => setEditingId(null)}
                    onSave={(next) => {
                      setDocuments((list) => list.map((item) => (item.id === doc.id ? next : item)))
                      setEditingId(null)
                    }}
                  />
                ) : (
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => setViewing(doc)}
                      className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-line"
                    >
                      {isDocumentImage(doc.fileUrl) ? (
                        <img src={doc.fileUrl} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <FileText className="h-5 w-5 text-primary" />
                      )}
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-extrabold text-ink">{doc.title}</p>
                      <p className="mt-0.5 text-[11px] font-semibold capitalize text-ink-mid">
                        {doc.kind} · {doc.issuedOn}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(doc.id)
                            setUploadOpen(false)
                          }}
                          className="inline-flex h-8 items-center gap-1 rounded-full bg-white px-3 text-[11px] font-bold text-primary ring-1 ring-line"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setDocuments((list) => list.filter((item) => item.id !== doc.id))}
                          className="inline-flex h-8 items-center gap-1 rounded-full bg-[#FEE2E2] px-3 text-[11px] font-bold text-[#B91C1C]"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
            {documents.length === 0 && !uploadOpen ? (
              <p className="rounded-2xl border border-dashed border-line bg-sky/40 p-4 text-center text-xs text-ink-mid">
                No certificates or awards yet. Upload a soft copy.
              </p>
            ) : null}
          </ul>
        </section>

        {error ? <p className="text-xs font-semibold text-[#B91C1C]">{error}</p> : null}

        <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 bg-sky px-4 pt-2 pb-[max(0.85rem,env(safe-area-inset-bottom))]">
          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-[15px] font-bold text-white shadow-[0_8px_18px_rgba(0,84,166,0.28)]"
          >
            <Check className="h-4 w-4" />
            Save changes
          </button>
        </div>
      </form>

      {viewing ? <DocumentViewer document={viewing} onClose={() => setViewing(null)} /> : null}
    </main>
  )
}

function DocumentForm({
  initial,
  submitLabel,
  onSave,
  onCancel,
}: {
  initial?: ProfileDocument
  submitLabel: string
  onSave: (doc: ProfileDocument) => void
  onCancel: () => void
}) {
  const fileInput = useRef<HTMLInputElement>(null)
  const [kind, setKind] = useState<ProfileDocumentKind>(initial?.kind ?? 'certificate')
  const [title, setTitle] = useState(initial?.title ?? '')
  const [fileName, setFileName] = useState(initial?.fileName ?? '')
  const [fileUrl, setFileUrl] = useState(initial?.fileUrl ?? '')
  const [error, setError] = useState('')

  function pickFile(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0]
    event.target.value = ''
    if (!next) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFileName(next.name)
        setFileUrl(reader.result)
      }
    }
    reader.readAsDataURL(next)
  }

  function submit() {
    if (!title.trim()) {
      setError('Please enter a title.')
      return
    }
    if (!fileUrl) {
      setError('Please upload a soft copy.')
      return
    }
    onSave({
      id: initial?.id ?? `doc-${Date.now()}`,
      kind,
      title: title.trim(),
      issuedOn:
        initial?.issuedOn ??
        new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      fileName: fileName || 'document',
      fileUrl,
    })
  }

  return (
    <div className="mt-3 space-y-3 rounded-2xl bg-white p-3 ring-1 ring-line">
      <div className="grid grid-cols-2 rounded-full bg-sky p-1">
        {(['certificate', 'award'] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setKind(item)}
            className={`rounded-full py-1.5 text-[11px] font-extrabold capitalize ${
              kind === item ? 'bg-primary text-white' : 'text-ink-mid'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={kind === 'award' ? 'Award title' : 'Certificate title'}
        className="h-10 w-full rounded-xl border border-line bg-sky px-3 text-sm text-ink"
      />
      <button
        type="button"
        onClick={() => fileInput.current?.click()}
        className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary bg-sky text-xs font-bold text-primary"
      >
        <Upload className="h-4 w-4" />
        {fileName || 'Upload soft copy'}
      </button>
      <input ref={fileInput} type="file" accept="image/*,application/pdf" className="sr-only" onChange={pickFile} />
      {error ? <p className="text-xs font-semibold text-[#B91C1C]">{error}</p> : null}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex h-10 flex-1 items-center justify-center rounded-xl border border-line bg-white text-sm font-bold text-ink"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={submit}
          className="flex h-10 flex-1 items-center justify-center rounded-xl bg-primary text-sm font-extrabold text-white"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-mid">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 h-10 w-full rounded-xl border border-line bg-sky px-3 text-sm text-ink"
      />
    </label>
  )
}

function AreaField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-mid">{label}</span>
      <textarea
        value={value}
        rows={2}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full resize-none rounded-xl border border-line bg-sky px-3 py-2 text-sm text-ink"
      />
    </label>
  )
}
