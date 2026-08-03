import { Link } from 'react-router-dom'
import {
  getContentTitle,
  getContentSubtitle,
  getContentLead,
  getContentBody,
  getContentTags,
  getContentCategory,
  getContentAuthor,
  getContentImageUrls,
  formatContentDate,
} from '../lib/upnoteContent.js'

/**
 * コラム記事詳細（/blog/:id）。
 * 構成: パンくず → メタ（日付・カテゴリ・タグ）→ タイトル → ヒーロー → リード → 本文
 *       → ギャラリー → 著者 → 一覧へ戻る
 * 「詳細情報」グリッドは表示しない。
 */
export default function ArticleDetail({ item, listPath, listLabel, sections = [] }) {
  const title = getContentTitle(item)
  const subtitle = getContentSubtitle(item)
  const lead = getContentLead(item)
  const body = getContentBody(item)
  const tags = getContentTags(item)
  const category = getContentCategory(item)
  const author = getContentAuthor(item)
  const images = getContentImageUrls(item)
  const hero = images[0]
  const gallery = images.slice(1)
  const date = formatContentDate(item)
  const activeSections = sections.filter((s) => s.html != null && s.html !== '')

  return (
    <article className="article">
      <nav className="article__breadcrumb" aria-label="パンくずリスト">
        <ol>
          <li>
            <Link to="/">ホーム</Link>
          </li>
          <li>
            <Link to={listPath}>{listLabel}</Link>
          </li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav>

      <div className="article__meta">
        {date && <time>{date}</time>}
        {category ? <span className="chip">{category}</span> : null}
        {tags.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      <h1 className="article__title">{title}</h1>
      {subtitle && <p className="article__subtitle">{subtitle}</p>}

      {hero && (
        <div className="article__hero">
          <img src={hero} alt={title} decoding="async" />
        </div>
      )}

      {lead && <p className="article__lead">{lead}</p>}
      {body && <div className="article__body" dangerouslySetInnerHTML={{ __html: body }} />}

      {activeSections.map((s) => (
        <section key={s.label} className="article__section">
          <h2>{s.label}</h2>
          {s.quote ? (
            <blockquote dangerouslySetInnerHTML={{ __html: s.html }} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: s.html }} />
          )}
        </section>
      ))}

      {gallery.length > 0 && (
        <div className="article__gallery">
          {gallery.map((src, i) => (
            <img key={i} src={src} alt={`${title} 画像${i + 2}`} loading="lazy" decoding="async" />
          ))}
        </div>
      )}

      {author ? <p className="article__author">著者：{author}</p> : null}

      <div className="article__back">
        <Link to={listPath} className="btn btn--outline">
          ← {listLabel}一覧へ戻る
        </Link>
      </div>
    </article>
  )
}
