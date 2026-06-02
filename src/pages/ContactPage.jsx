import { Link } from 'react-router-dom'
import DocumentMeta from '../components/DocumentMeta.jsx'
import PageHero from '../components/PageHero.jsx'
import { SITE } from '../constants/site.js'

// 問い合わせは Googleフォーム埋め込み（YAML contact.method = "Googleフォーム"）。
// 埋め込み URL は環境変数 VITE_GOOGLE_FORM_EMBED_URL（embedded=true 付き）から。
const FORM_URL = import.meta.env.VITE_GOOGLE_FORM_EMBED_URL

export default function ContactPage() {
  return (
    <>
      <DocumentMeta />
      <PageHero title="体験・お問い合わせ" image="/images/contact/cover.svg" />

      <section className="section">
        <div className="container container--narrow">
          <p className="eyebrow">CONTACT</p>
          <h2 className="section-title">体験レッスン・お問い合わせ</h2>
          <p className="section-lead">
            体験レッスンのお申し込みやご相談は、下記フォームまたはお電話で承ります。
            「英語だけ」のレッスンを、まずはお子さまと体験してみてください。
          </p>

          <div className="contact-grid">
            <div className="contact-form-wrap">
              {FORM_URL ? (
                <iframe
                  title="お問い合わせフォーム"
                  src={FORM_URL}
                  width="100%"
                  height="900"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  loading="lazy"
                >
                  読み込んでいます…
                </iframe>
              ) : (
                <div className="note-box">
                  <p>
                    お問い合わせフォームは現在準備中です。お手数ですが、お電話にてお問い合わせください。
                    （公開前に Googleフォームの埋め込み URL を設定します。）
                  </p>
                </div>
              )}
            </div>

            <aside className="contact-side">
              <h3>お電話でのお問い合わせ</h3>
              <p className="contact-side__tel">
                <a href={`tel:${SITE.telHref}`}>{SITE.tel}</a>
              </p>
              <p>受付時間内にお気軽にご連絡ください。</p>
              <h3>所在地</h3>
              <p>{SITE.address}</p>
              <Link to="/services#access" className="btn btn--outline btn--block">
                アクセス・地図を見る
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
