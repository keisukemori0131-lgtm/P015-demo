import { useParams, Link } from 'react-router-dom'
import DocumentMeta from '../components/DocumentMeta.jsx'
import ArticleDetail from '../components/ArticleDetail.jsx'
import { Loading, ErrorMsg } from '../components/StateMessage.jsx'
import { useContentById } from '../lib/useUpNote.js'
import { CONTENT_TYPE_FOR } from '../config/upnoteContentTypes.js'
import { SITE } from '../constants/site.js'
import { buildArticleBreadcrumb, buildBlogPosting } from '../lib/structuredData.js'
import {
  getContentTitle,
  getContentLead,
  getContentBody,
  getContentThumb,
} from '../lib/upnoteContent.js'

function stripHtml(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function truncate(text, max = 120) {
  if (!text || text.length <= max) return text
  return `${text.slice(0, max)}…`
}

/**
 * コラム記事詳細ページ（/blog/:id・R14-3）。
 * 記事固有の title / description / canonical / OGP + BlogPosting / BreadcrumbList JSON-LD。
 * NOT_FOUND（下書き・掲載期間外・削除済み）は noindex + 一覧へ戻る導線。
 */
export default function ColumnDetailPage() {
  const { id } = useParams()
  const { data, error, loading } = useContentById(id, { localSlug: CONTENT_TYPE_FOR.blog })

  const siteUrl = SITE.url.replace(/\/$/, '')

  if (loading) {
    return (
      <section className="section">
        <div className="container container--narrow">
          <DocumentMeta title={`コラム｜${SITE.name}`} robots="noindex,nofollow" />
          <Loading />
        </div>
      </section>
    )
  }

  if (error || !data) {
    const notFound = error?.errorCode === 'NOT_FOUND' || error?.status === 404
    return (
      <section className="section">
        <div className="container container--narrow">
          <DocumentMeta title={`記事が見つかりませんでした｜${SITE.name}`} robots="noindex,nofollow" />
          {notFound ? (
            <div className="article__notfound">
              <h1 className="section-title">記事が見つかりませんでした</h1>
              <p>
                お探しの記事は削除されたか、掲載期間が終了した可能性があります。
                コラム一覧から他の記事をご覧ください。
              </p>
              <Link to="/blog" className="btn btn--outline">
                ← コラム一覧へ戻る
              </Link>
            </div>
          ) : (
            <>
              <ErrorMsg />
              <div className="article__back">
                <Link to="/blog" className="btn btn--outline">
                  ← コラム一覧へ戻る
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    )
  }

  const title = getContentTitle(data)
  const description = truncate(stripHtml(getContentLead(data) || getContentBody(data)), 120)
  const thumb = getContentThumb(data)
  const path = `/blog/${data.id}`

  const jsonLd = [
    buildBlogPosting(siteUrl, {
      title,
      description,
      path,
      image: thumb || undefined,
      publishedAt: data.publishedAt || data.createdAt,
      updatedAt: data.updatedAt,
    }),
    buildArticleBreadcrumb(siteUrl, '/blog', 'コラム', title, path),
  ]

  return (
    <section className="section">
      <div className="container container--narrow">
        <DocumentMeta
          title={`${title}｜コラム｜${SITE.name}`}
          description={description || undefined}
          ogType="article"
          ogImage={thumb || undefined}
          jsonLd={jsonLd}
        />
        <ArticleDetail item={data} listPath="/blog" listLabel="コラム" />
      </div>
    </section>
  )
}
