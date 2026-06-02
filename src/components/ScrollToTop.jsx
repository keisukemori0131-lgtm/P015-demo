import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// ルート遷移時に先頭へ。ただしハッシュ(#access)がある場合は対象要素へスムーズスクロール。
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname, hash])
  return null
}
