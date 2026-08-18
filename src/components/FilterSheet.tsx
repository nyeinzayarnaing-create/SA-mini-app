import { Check, ChevronDown, X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'

export type AmbassadorFilters = {
  collegeName: string[]
  trainingRegion: string[]
  saBatch: string[]
}

type Props = {
  open: boolean
  value: AmbassadorFilters
  colleges: string[]
  regions: string[]
  batches: string[]
  onClose: () => void
  onApply: (filters: AmbassadorFilters) => void
}

export const emptyFilters: AmbassadorFilters = {
  collegeName: [],
  trainingRegion: [],
  saBatch: [],
}

export function FilterSheet({ open, value, colleges, regions, batches, onClose, onApply }: Props) {
  const [draft, setDraft] = useState(value)

  useEffect(() => {
    if (open) setDraft(value)
  }, [open, value])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <button
        type="button"
        aria-label="Close filter"
        onClick={onClose}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-title"
        className={`absolute bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 rounded-t-3xl bg-white px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_40px_rgba(0,84,166,0.18)] transition-transform duration-300 ease-out ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-line" />
        <div className="mb-4 flex items-center justify-between">
          <h2 id="filter-title" className="text-lg font-extrabold text-ink">
            Filter By
          </h2>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 text-ink-mid hover:bg-sky">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[55vh] space-y-3 overflow-y-auto">
          <MultiSelect
            label="College Name"
            placeholder="Select College Name"
            options={colleges}
            value={draft.collegeName}
            onChange={(collegeName) => setDraft((prev) => ({ ...prev, collegeName }))}
          />
          <MultiSelect
            label="Training Region"
            placeholder="Select Training Region"
            options={regions}
            value={draft.trainingRegion}
            onChange={(trainingRegion) => setDraft((prev) => ({ ...prev, trainingRegion }))}
          />
          <MultiSelect
            label="SA Batch"
            placeholder="Select SA Batch"
            options={batches}
            value={draft.saBatch}
            onChange={(saBatch) => setDraft((prev) => ({ ...prev, saBatch }))}
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setDraft(emptyFilters)}
            className="h-11 rounded-2xl border border-line text-sm font-semibold text-ink-mid"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => {
              onApply(draft)
              onClose()
            }}
            className="h-11 rounded-2xl bg-primary text-sm font-extrabold text-white"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

function MultiSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
}) {
  const [open, setOpen] = useState(false)
  const listId = useId()
  const summary =
    value.length === 0 ? placeholder : value.length === 1 ? value[0] : `${value.length} selected`

  function toggle(option: string) {
    onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option])
  }

  return (
    <section>
      <h3 className="mb-1.5 text-sm font-bold text-ink">{label}</h3>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-line bg-sky px-3 text-left text-sm text-ink"
      >
        <span className={`min-w-0 truncate ${value.length === 0 ? 'text-ink/40' : ''}`}>{summary}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-ink-mid transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open ? (
        <ul
          id={listId}
          className="mt-1 max-h-40 overflow-y-auto rounded-xl border border-line bg-white py-1 shadow-[0_8px_24px_rgba(0,84,166,0.08)]"
        >
          {options.map((option) => {
            const selected = value.includes(option)
            return (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => toggle(option)}
                  className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm text-ink hover:bg-sky"
                >
                  <span className="min-w-0 flex-1 leading-snug">{option}</span>
                  {selected ? <Check className="h-4 w-4 shrink-0 text-primary" /> : null}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </section>
  )
}
