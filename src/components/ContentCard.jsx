import { Link } from 'react-router-dom'
import {
  getContentTitle,
  getContentLead,
  getContentTags,
  getContentCategory,
  getContentThumb,
  formatContentDate,
} from '../lib/upnoteContent.js'

/**
 * 一覧/抜粋カード（R14-3）。概要のみ表示・本文は出さない。
 * - `to` があれば <Link> で個別詳細ページへ遷移（新標準・2026-07）
 * - `to` が無ければ従来どおり <button> でモーダルを開く（既存 news 等の保守用）
 * - `size="lg"` でサムネイルを大きく見せるフィーチャーカード（コラム一覧用）
 */
export default function ContentCard({ item, onOpen, to, size }) {
  const title = getContentTitle(item)
  const lead = getContentLead(item)
  const tags = getContentTags(item)
  const category = getContentCategory(item)
  const thumb = getContentThumb(item)
  const date = formatContentDate(item)

  const className = `content-card${size === 'lg' ? ' content-card--lg' : ''}`

  const inner = (
    <>
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
          {category ? (
            <span className="chip chip--sm content-card__category">{category}</span>
          ) : null}
          {tags.slice(0, 2).map((t) => (
            <span key={t} className="chip chip--sm">
              {t}
            </span>
          ))}
        </span>
        <span className="content-card__title">{title}</span>
        {lead && <span className="content-card__lead">{lead}</span>}
        {size === 'lg' && <span className="content-card__more">続きを読む →</span>}
      </span>
    </>
  )

  if (to) {
    return (
      <Link className={className} to={to}>
        {inner}
      </Link>
    )
  }

  return (
    <button type="button" className={className} onClick={() => onOpen(item)}>
      {inner}
    </button>
  )
}
