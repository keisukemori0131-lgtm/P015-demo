import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import { HEADER_NAV, CTA_NAV } from '../constants/nav.js'

function isGroupActive(children, pathname) {
  return children.some((c) => pathname === c.to || pathname.startsWith(`${c.to}/`))
}

function NavItem({ item, pathname, onNavigate }) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = Array.isArray(item.children) && item.children.length > 0

  useEffect(() => {
    setExpanded(false)
  }, [pathname])

  if (!hasChildren) {
    return (
      <li>
        <NavLink
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
          onClick={onNavigate}
        >
          {item.label}
        </NavLink>
      </li>
    )
  }

  const active = isGroupActive(item.children, pathname)

  return (
    <li
      className={`nav__item--has-children${expanded ? ' is-expanded' : ''}${active ? ' is-active' : ''}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <button
        type="button"
        className={`nav__link nav__link--parent${active ? ' is-active' : ''}`}
        aria-expanded={expanded}
        aria-haspopup="true"
        onClick={() => setExpanded((v) => !v)}
      >
        {item.label}
        <span className="nav__caret" aria-hidden="true" />
      </button>
      <div className={`nav__dropdown${expanded ? ' is-open' : ''}`}>
        <ul className="nav__dropdown-inner" role="list">
          {item.children.map((child) => (
            <li key={child.to}>
              <NavLink
                to={child.to}
                className={({ isActive }) => `nav__dropdown-link${isActive ? ' is-active' : ''}`}
                onClick={onNavigate}
              >
                {child.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export default function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [overlay, setOverlay] = useState(isHome)
  const [open, setOpen] = useState(false)

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

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const closeMenu = () => setOpen(false)
  const onNavigate = () => {
    closeMenu()
    scrollToTop()
  }

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
            {HEADER_NAV.map((item) => (
              <NavItem key={item.label} item={item} pathname={pathname} onNavigate={onNavigate} />
            ))}
            <li className="nav__cta-li">
              <Link to={CTA_NAV.to} className="btn btn--nav-cta" onClick={onNavigate}>
                {CTA_NAV.label}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {open
        ? createPortal(
            <div className="nav__overlay is-visible" onClick={closeMenu} aria-hidden="true" />,
            document.body,
          )
        : null}
    </header>
  )
}
