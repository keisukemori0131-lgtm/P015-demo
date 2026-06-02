import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { MAIN_NAV, CTA_NAV } from '../constants/nav.js'
import { SITE } from '../constants/site.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Logo height={56} src="/logo-header.png" />
          <p className="footer__tagline">{SITE.catch}</p>
          <p className="footer__addr">{SITE.address}</p>
          <p className="footer__tel">
            <a href={`tel:${SITE.telHref}`}>TEL {SITE.tel}</a>
          </p>
          <p className="footer__note">2歳からの少人数制イマージョン英語スクール</p>
        </div>

        <nav className="footer__nav" aria-label="フッターナビゲーション">
          <ul>
            {MAIN_NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link to={CTA_NAV.to}>{CTA_NAV.label}</Link>
            </li>
            <li>
              <Link to="/services#access">アクセス</Link>
            </li>
          </ul>
        </nav>

        <div className="footer__contact">
          <h3>体験レッスン受付中</h3>
          <p>
            「英語禁止」の環境で、英語を浴びるように学ぶイマージョンレッスン。
            まずはお気軽に体験レッスンへお越しください。
          </p>
          <Link to="/contact" className="btn btn--primary btn--block">
            体験・お問い合わせ
          </Link>
        </div>
      </div>
      <div className="footer__copy">
        <small>© {SITE.name}. All rights reserved.</small>
      </div>
    </footer>
  )
}
