import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { marketingBanners } from '../data/mock'

const AUTO_MS = 4200
const SWIPE_PX = 48

export function MarketingBanner() {
  const slides = marketingBanners
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const startX = useRef<number | null>(null)

  useEffect(() => {
    if (paused || slides.length < 2) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, AUTO_MS)
    return () => window.clearInterval(timer)
  }, [paused, slides.length])

  function goTo(next: number) {
    const count = slides.length
    setIndex(((next % count) + count) % count)
  }

  function onPointerDown(event: PointerEvent<HTMLElement>) {
    startX.current = event.clientX
    setPaused(true)
  }

  function onPointerUp(event: PointerEvent<HTMLElement>) {
    if (startX.current == null) return
    const delta = event.clientX - startX.current
    startX.current = null
    if (delta <= -SWIPE_PX) goTo(index + 1)
    else if (delta >= SWIPE_PX) goTo(index - 1)
    setPaused(false)
  }

  return (
    <section
      className="banner-slideshow relative overflow-hidden rounded-2xl shadow-[0_10px_28px_rgba(0,84,166,0.18)]"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        startX.current = null
        setPaused(false)
      }}
      onPointerLeave={() => {
        if (startX.current != null) {
          startX.current = null
          setPaused(false)
        }
      }}
    >
      <div
        className="flex h-48 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide) => (
          <article key={slide.id} className="relative h-48 min-w-full shrink-0">
            <img
              src={slide.image}
              alt={slide.title}
              draggable={false}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00315f]/88 via-[#00315f]/28 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 pb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">{slide.kicker}</p>
              <h3 className="mt-1 text-lg font-extrabold leading-tight text-white">{slide.title}</h3>
              <p className="mt-0.5 text-sm text-white/90">{slide.subtitle}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-2.5 z-10 flex justify-center gap-1.5">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show banner ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-5 bg-secondary' : 'w-1.5 bg-white/55'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
