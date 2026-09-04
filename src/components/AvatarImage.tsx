import { useState } from 'react'
import { avatarFallbackUrl } from '../data/mock'

/** Avatar image with offline initials fallback if the remote URL fails. */
export function AvatarImage({
  src,
  alt,
  seed,
  bg = '5ad2f2',
  className = '',
}: {
  src: string
  alt: string
  seed?: string
  bg?: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const fallback = avatarFallbackUrl(seed ?? alt, bg)

  return (
    <img
      src={failed ? fallback : src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}
