import { Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  initialValue?: string
  onFilter?: (value: string) => void
  placeholder?: string
}

export function SearchBar({
  initialValue = '',
  onFilter,
  placeholder = 'Search schools or ambassadors',
}: Props) {
  const [value, setValue] = useState(initialValue)
  const navigate = useNavigate()

  function submit(event: FormEvent) {
    event.preventDefault()
    const q = value.trim()
    if (onFilter) {
      onFilter(q)
      return
    }
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
  }

  return (
    <form onSubmit={submit} className="relative">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          onFilter?.(e.target.value)
        }}
        placeholder={placeholder}
        aria-label="Search"
        className="h-11 w-full rounded-2xl border border-line bg-white pl-10 pr-4 text-sm text-ink outline-none placeholder:text-ink/35 focus:border-primary/50 focus:ring-2 focus:ring-secondary/40"
      />
    </form>
  )
}
