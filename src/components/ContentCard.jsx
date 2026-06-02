import {
  getContentTitle,
  getContentLead,
  getContentTags,
  getContentThumb,
  formatContentDate,
} from '../lib/upnoteContent.js'

// 一覧/抜粋カード（R14-3）。概要のみ表示・本文は出さない。押下でモーダルを開く。
export default function ContentCard({ item, onOpen }) {
  const title = getContentTitle(item)
  const lead = getContentLead(item)
  const tags = getContentTags(item)
  const thumb = getContentThumb(item)
  const date = formatContentDate(item)

  return (
    <button type="button" className="content-card" onClick={() => onOpen(item)}>
      <span className="content-card__media">
        {thumb ? (
          <img src={thumb} alt={title} loading="lazy" decoding="async" />
        ) : (
          <span className="content-card__noimg" aria-hidden="true">
            🌱
          </span>
        )}
      </span>
      <span className="content-card__body">
        <span className="content-card__meta">
          {date && <time>{date}</time>}
          {tags.slice(0, 2).map((t) => (
            <span key={t} className="chip chip--sm">
              {t}
            </span>
          ))}
        </span>
        <span className="content-card__title">{title}</span>
        {lead && <span className="content-card__lead">{lead}</span>}
      </span>
    </button>
  )
}
