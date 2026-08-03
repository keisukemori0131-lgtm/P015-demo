import { Link } from 'react-router-dom'
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
 * 記事詳細ページ本体（R14-3 / R14-3a・個別 URL 版）。
 * 構成順: パンくず → メタ（日付・タグ）→ タイトル → サブタイトル → ヒーロー画像
 *         → リード → 本文（HTML 整形）→ 追加セクション → ギャラリー → 「詳細情報」グリッド → 一覧へ戻る
 * item.data の全フィールドを漏れなく描画（既定スロット済みは skipKeys で重複回避）。
 * @param {object} item UpNote コンテンツ
 * @param {string} listPath 一覧ページのパス（例 "/blog"）
 * @param {string} listLabel 一覧ページの表示名（例 "コラム"）
 * @param {Array} [sections] 追加セクション（case_studies の課題/取り組み等）
 */
export default function ArticleDetail({ item, listPath, listLabel, sections = [] }) {
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

  return (
    <article className="article">
      {/* 可視パンくず（R14-3） */}
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

      {entries.length > 0 && (
        <div className="article__detail">
          <h2 className="article__detail-title">詳細情報</h2>
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

      <div className="article__back">
        <Link to={listPath} className="btn btn--outline">
          ← {listLabel}一覧へ戻る
        </Link>
      </div>
    </article>
  )
}
