import { CAMPUSES, SHARED_CONTACT } from '../constants/site.js'

// 共通の電話・メールをまとめ、校舎ごとは住所（とFAX）のみ表示。
export default function ContactAside({ note = '見学・体験は随時受け付けています。' }) {
  return (
    <aside className="contact-side">
      <div className="contact-side__shared">
        <p className="contact-side__label">お問い合わせ</p>
        <p className="contact-side__tel">
          <a href={`tel:${SHARED_CONTACT.telHref}`}>{SHARED_CONTACT.tel}</a>
        </p>
        <p>
          <a href={`mailto:${SHARED_CONTACT.email}`}>{SHARED_CONTACT.email}</a>
        </p>
      </div>

      {CAMPUSES.map((c) => (
        <div key={c.name} className="contact-side__campus">
          <h3>
            {c.name}（{c.program}）
          </h3>
          {c.contact ? (
            <>
              {c.contact.fax && <p className="contact-side__fax">FAX: {c.contact.fax}</p>}
              <p className="contact-side__addr">
                {c.contact.postal} {c.contact.address}
              </p>
            </>
          ) : (
            <p>所在地は準備が整い次第ご案内いたします。</p>
          )}
        </div>
      ))}

      {note ? <p className="contact-side__note">{note}</p> : null}
    </aside>
  )
}
