import DocumentMeta from '../components/DocumentMeta.jsx'
import PageHero from '../components/PageHero.jsx'
import ContactAside from '../components/ContactAside.jsx'
import ContactForm from '../components/ContactForm.jsx'

// 問い合わせは UpNote 問い合わせ API（R6-upnote・POST /api/v1/inquiries）。
// 認証はコンテンツ取得と同じ公開 API キーで、追加の環境変数は不要。

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
              <ContactForm />
            </div>

            <ContactAside />
          </div>
        </div>
      </section>
    </>
  )
}
