import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// .reveal 要素をスクロールインで表示（R16-5）。ルート遷移ごとに再スキャン。
const SELECTOR =
  '.section, .preview, .usp-card, .card-grid > *, .faq-item, .cta-band, .reveal'

export default function ScrollReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = Array.from(document.querySelectorAll(SELECTOR)).filter(
      (el) => !el.closest('.hero') && !el.classList.contains('flow-steps'),
    )
    if (reduce) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }
    targets.forEach((el) => el.classList.add('reveal'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
  return null
}
