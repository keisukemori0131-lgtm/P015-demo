import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { FOOTER_NAV, CTA_NAV } from '../constants/nav.js'
import { SITE, CONTACT } from '../constants/site.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Logo height={56} />
          <p className="footer__tagline">{SITE.catch}</p>
          <p className="footer__addr">{SITE.company}</p>
          <p className="footer__note">{SITE.serviceLabel}</p>
          <p className="footer__note">円山校 ／ 宮の森校（{SITE.area}）</p>
          <p className="footer__tel">
            <a href={`tel:${CONTACT.telHref}`}>TEL {CONTACT.tel}</a>
          </p>
          <p className="footer__tel">
            <a href={`mailto:${CONTACT.email}`}>MAIL {CONTACT.email}</a>
          </p>
        </div>

        <nav className="footer__nav" aria-label="フッターナビゲーション">
          <ul>
            {FOOTER_NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link to={CTA_NAV.to}>{CTA_NAV.label}</Link>
            </li>
          </ul>
        </nav>

        <div className="footer__contact">
          <h3>見学・体験受付中</h3>
          <p>
            英語イマージョンと運動療育で、子どもたちの「できた！」を育てます。
            まずはお気軽に見学へお越しください。
          </p>
          <Link to="/contact" className="btn btn--primary btn--block">
            見学・体験のお問い合わせ
          </Link>
        </div>
      </div>
      <div className="footer__copy">
        <small>© {SITE.company}. All rights reserved.</small>
      </div>
    </footer>
  )
}
