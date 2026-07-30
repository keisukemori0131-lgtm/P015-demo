import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import { MAIN_NAV, CTA_NAV } from '../constants/nav.js'

export default function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [overlay, setOverlay] = useState(isHome)
  const [open, setOpen] = useState(false)

  // ヒーロー上にいる間だけ透過オーバーレイ（R16-1）。トップ以外は常に通常表示。
  useEffect(() => {
    if (!isHome) {
      setOverlay(false)
      return
    }
    const onScroll = () => {
      const hero = document.querySelector('.hero')
      const h = hero ? hero.offsetHeight : window.innerHeight
      setOverlay(window.scrollY < h - 1)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  // メニュー展開時は body スクロールロック（R1）
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // ルート遷移時はメニューを閉じる
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Esc で閉じる
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const closeMenu = () => setOpen(false)

  const headerClass = [
    'header',
    isHome ? 'header--home' : '',
    isHome && overlay && !open ? 'header--overlay' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClass}>
      <div className="header__inner">
        <Link to="/" className="header__logo" onClick={scrollToTop} aria-label="ペラペラスタジオ ホーム">
          <Logo height={46} />
        </Link>

        <button
          type="button"
          className={`header__burger${open ? ' is-open' : ''}`}
          aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={open}
          aria-controls="global-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="global-nav" className={`nav${open ? ' is-open' : ''}`} aria-label="グローバルナビゲーション">
          <ul className="nav__list">
            {MAIN_NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
                  onClick={() => {
                    closeMenu()
                    scrollToTop()
                  }}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="nav__cta-li">
              <Link
                to={CTA_NAV.to}
                className="btn btn--nav-cta"
                onClick={() => {
                  closeMenu()
                  scrollToTop()
                }}
              >
                {CTA_NAV.label}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* header の backdrop-filter 外へ出し、画面全体を覆う（メニュー外タップで閉じる） */}
      {open
        ? createPortal(
            <div className="nav__overlay is-visible" onClick={closeMenu} aria-hidden="true" />,
            document.body,
          )
        : null}
    </header>
  )
}
