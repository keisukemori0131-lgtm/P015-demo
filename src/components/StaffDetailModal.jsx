import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { isHtmlContent } from '../lib/upnoteContent.js'

function HtmlOrText({ value, className = '' }) {
  if (!value) return null
  if (isHtmlContent(value)) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />
  }
  return (
    <div className={className}>
      {String(value)
        .split(/\n+/)
        .filter(Boolean)
        .map((line) => (
          <p key={line}>{line}</p>
        ))}
    </div>
  )
}

export default function StaffDetailModal({ member, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  if (!member) return null

  return createPortal(
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="staff-modal-title">
      <div className="modal__overlay" onClick={onClose} aria-hidden="true" />
      <div className="modal__panel staff-modal__panel" role="document">
        <button type="button" className="modal__close" onClick={onClose} aria-label="閉じる">
          ✕
        </button>

        <div className="modal__content staff-modal__content">
          {member.positions.length > 0 && (
            <div className="staff-modal__meta-row">
              {member.positions.map((role) => (
                <span key={role} className="chip">
                  {role}
                </span>
              ))}
            </div>
          )}

          <h2 id="staff-modal-title" className="modal__title">
            {member.displayName}
          </h2>

          {member.name && member.name !== member.displayName ? (
            <p className="staff-modal__meta-line">名前：{member.name}</p>
          ) : null}
          {member.nameRomaji && member.nameRomaji !== member.displayName ? (
            <p className="staff-modal__meta-line">名前ローマ字：{member.nameRomaji}</p>
          ) : null}
          {member.department ? (
            <p className="staff-modal__meta-line">所属部署：{member.department}</p>
          ) : null}
          {member.duties ? (
            <section className="staff-modal__section">
              <h3>担当業務</h3>
              <HtmlOrText value={member.duties} />
            </section>
          ) : null}
          {member.qualifications.length > 0 ? (
            <section className="staff-modal__section">
              <h3>資格</h3>
              <ul className="staff-modal__list">
                {member.qualifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
          {member.career ? (
            <section className="staff-modal__section">
              <h3>経歴</h3>
              <HtmlOrText value={member.career} className="staff-modal__richtext" />
            </section>
          ) : null}
          {member.comment ? (
            <section className="staff-modal__section staff-modal__message">
              <h3>メッセージ</h3>
              <HtmlOrText value={member.comment} className="staff-modal__richtext" />
            </section>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  )
}
