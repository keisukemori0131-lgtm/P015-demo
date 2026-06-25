import DocumentMeta from '../components/DocumentMeta.jsx'
import PageHero from '../components/PageHero.jsx'
import ContactAside from '../components/ContactAside.jsx'

// 問い合わせは Googleフォーム埋め込み（YAML contact.method = "Googleフォーム"）。
// 埋め込み URL は環境変数 VITE_GOOGLE_FORM_EMBED_URL（embedded=true 付き）から。
const FORM_URL = import.meta.env.VITE_GOOGLE_FORM_EMBED_URL

export default function ContactPage() {
  return (
    <>
      <DocumentMeta />
      <PageHero title="見学・お問い合わせ" image="/images/contact/cover.svg" />

      <section className="section">
        <div className="container container--narrow">
          <p className="eyebrow">CONTACT</p>
          <h2 className="section-title">見学・体験のお問い合わせ</h2>
          <p className="section-lead">
            見学・体験のお申し込みや、お子さまの発達についてのご相談は、お電話・メール、または下記フォームより承ります。
            まずはお気軽にお問い合わせください。お子さまの様子や保護者の方のお悩みを伺いながら、
            最適な支援についてご案内いたします。園や自宅への送迎にも対応しています。
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
                    お問い合わせフォームは現在準備中です。お電話・メールにてお気軽にご連絡ください。
                    （公開前に Googleフォームの埋め込み URL を設定します。）
                  </p>
                </div>
              )}
            </div>

            <ContactAside />
          </div>
        </div>
      </section>
    </>
  )
}
