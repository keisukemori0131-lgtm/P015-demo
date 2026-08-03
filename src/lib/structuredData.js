import { SITE, CAMPUSES, SHARED_CONTACT } from '../constants/site.js'
import { publicUrl } from './publicUrl.js'

const BREADCRUMB_LABELS = {
  '/': 'ホーム',
  '/about': '私たちについて',
  '/support': '児童発達支援',
  '/after-school': '放課後等デイサービス',
  '/special': '独自の取り組み',
  '/counseling': 'こころの相談室',
  '/cases': '成長事例',
  '/blog': 'コラム',
  '/news': 'お知らせ',
  '/contact': '見学・お問い合わせ',
}

function campusChildCare(campus, siteUrl, orgId) {
  const c = campus.contact
  return {
    '@type': 'ChildCare',
    '@id': `${siteUrl}/#${campus.name === '円山ベース' ? 'maruyama' : 'miyanomori'}`,
    name: `${SITE.name} ${campus.name}`,
    alternateName: campus.program,
    parentOrganization: { '@id': orgId },
    url: siteUrl,
    telephone: c.tel,
    email: c.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'JP',
      addressRegion: '北海道',
      addressLocality: SITE.addressLocality,
      streetAddress: c.streetAddress,
      postalCode: c.postalCode,
    },
    areaServed: {
      '@type': 'City',
      name: SITE.area,
    },
  }
}

/** 全ページ共通の組織・2拠点 JSON-LD（@graph） */
export function buildSiteGraph(siteUrl) {
  const origin = siteUrl.replace(/\/$/, '')
  const orgId = `${origin}/#organization`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: SITE.company,
        alternateName: SITE.name,
        url: origin,
        logo: `${origin}${publicUrl('/logo-header.png')}`,
        telephone: SHARED_CONTACT.tel,
        email: SHARED_CONTACT.email,
        description: SITE.catch,
      },
      ...CAMPUSES.map((campus) => campusChildCare(campus, origin, orgId)),
    ],
  }
}

/** パンくずリスト JSON-LD */
export function buildBreadcrumb(pathname, siteUrl) {
  if (pathname === '/') return null
  const origin = siteUrl.replace(/\/$/, '')
  const label = BREADCRUMB_LABELS[pathname]
  if (!label) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: origin,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: label,
        item: `${origin}${pathname}`,
      },
    ],
  }
}

/** 記事詳細ページ用の 3 階層パンくず JSON-LD（ホーム / 一覧 / 記事名・R14-3） */
export function buildArticleBreadcrumb(siteUrl, listPath, listLabel, articleTitle, articlePath) {
  const origin = siteUrl.replace(/\/$/, '')
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: origin },
      { '@type': 'ListItem', position: 2, name: listLabel, item: `${origin}${listPath}` },
      { '@type': 'ListItem', position: 3, name: articleTitle, item: `${origin}${articlePath}` },
    ],
  }
}

/**
 * コラム記事の BlogPosting JSON-LD（R14-3。news は NewsArticle、事例は Article）
 * @param {{ title, description, path, image?, publishedAt?, updatedAt? }} article
 */
export function buildBlogPosting(siteUrl, article, type = 'BlogPosting') {
  const origin = siteUrl.replace(/\/$/, '')
  const url = `${origin}${article.path}`
  const ld = {
    '@context': 'https://schema.org',
    '@type': type,
    headline: article.title,
    description: article.description || undefined,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    author: { '@type': 'Organization', name: SITE.company },
    publisher: {
      '@type': 'Organization',
      name: SITE.company,
      logo: { '@type': 'ImageObject', url: `${origin}${publicUrl('/logo-header.png')}` },
    },
  }
  if (article.image) ld.image = [article.image]
  if (article.publishedAt) ld.datePublished = article.publishedAt
  if (article.updatedAt) ld.dateModified = article.updatedAt
  return ld
}

/** FAQ 一覧から FAQPage スキーマを生成 */
export function buildFaqPage(items, getQuestion, getAnswer) {
  if (!items?.length) return null
  const mainEntity = items
    .map((item) => {
      const name = getQuestion(item)?.trim()
      const text = getAnswer(item)?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
      if (!name || !text) return null
      return {
        '@type': 'Question',
        name,
        acceptedAnswer: {
          '@type': 'Answer',
          text,
        },
      }
    })
    .filter(Boolean)
  if (!mainEntity.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  }
}
