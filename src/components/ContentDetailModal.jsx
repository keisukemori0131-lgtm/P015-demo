import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import UpnoteFieldValue from './UpnoteFieldValue.jsx'
import { labelForField } from '../constants/upnoteFieldLabels.js'
import {
  getContentTitle,
  getContentSubtitle,
  getContentLead,
  getContentBody,
  getContentTags,
  getContentImageUrls,
  getContentFieldEntries,
  formatContentDate,
} from '../lib/upnoteContent.js'

/**
 * 記事/事例の詳細モーダル（R9 / R14-3 / R14-3a）。
 * 構成: ヒーロー画像 → メタ → タイトル → サブタイトル → リード → 本文
 *       → 追加セクション(sections) → ギャラリー → 「詳細情報」グリッド
 * item.data の全フィールドを漏れなく描画（既定スロット済みは skipKeys で重複回避）。
 */
export default function ContentDetailModal({ item, sections = [], onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  if (!item) return null

  const title = getContentTitle(item)
  const subtitle = getContentSubtitle(item)
  const lead = getContentLead(item)
  const body = getContentBody(item)
  const tags = getContentTags(item)
  const images = getContentImageUrls(item)
  const hero = images[0]
  const gallery = images.slice(1)
  const date = formatContentDate(item)
  const entries = getContentFieldEntries(item)
  const activeSections = sections.filter((s) => s.html != null && s.html !== '')

  return createPortal(
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal__overlay" onClick={onClose} aria-hidden="true" />
      <div className="modal__panel" role="document">
        <button type="button" className="modal__close" onClick={onClose} aria-label="閉じる">
          ✕
        </button>

        {hero && (
          <div className="modal__hero">
            <img src={hero} alt={title} loading="lazy" decoding="async" />
          </div>
        )}

        <div className="modal__content">
          <div className="modal__meta">
            {date && <time>{date}</time>}
            {tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>

          <h2 id="modal-title" className="modal__title">
            {title}
          </h2>
          {subtitle && <p className="modal__subtitle">{subtitle}</p>}
          {lead && <p className="modal__lead">{lead}</p>}
          {body && <div className="modal__body" dangerouslySetInnerHTML={{ __html: body }} />}

          {activeSections.map((s) => (
            <section key={s.label} className="modal__section">
              <h3>{s.label}</h3>
              {s.quote ? (
                <blockquote dangerouslySetInnerHTML={{ __html: s.html }} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: s.html }} />
              )}
            </section>
          ))}

          {gallery.length > 0 && (
            <div className="modal__gallery">
              {gallery.map((src, i) => (
                <img key={i} src={src} alt={`${title} 画像${i + 2}`} loading="lazy" decoding="async" />
              ))}
            </div>
          )}

          {entries.length > 0 && (
            <div className="modal__detail">
              <h3 className="modal__detail-title">詳細情報</h3>
              <dl className="detail-grid">
                {entries.map(([k, v]) => (
                  <div key={k} className="detail-grid__cell">
                    <dt>{labelForField(k)}</dt>
                    <dd>
                      <UpnoteFieldValue value={v} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
