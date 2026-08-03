#!/usr/bin/env node
/**
 * postbuild: dist/sitemap.xml と dist/robots.txt を生成（R11-B #3 / R10 SEO / R14-3）。
 * - VITE_SITE_URL を基点に各ルートの <loc> を出力（site-routes.json が単一の正）。
 * - コラム記事詳細（/blog/:id）を UpNote 公開 API から取得して sitemap に含める（R14-3）。
 *   Build 環境変数 VITE_UPNOTE_API_BASE_URL / VITE_UPNOTE_PUBLIC_API_KEY が未設定なら
 *   記事はスキップし静的ルートのみ生成（警告を出して続行・デプロイは止めない）。
 * - VITE_SITE_PUBLIC=1 のときだけ robots.txt を Allow + sitemap 参照。未設定時は Disallow（誤公開防止）。
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dist = join(root, 'dist')

const SITE_URL = (process.env.VITE_SITE_URL || 'https://peraperastudio.jp').replace(/\/$/, '')
const IS_PUBLIC = process.env.VITE_SITE_PUBLIC === '1'

const API_BASE = (process.env.VITE_UPNOTE_API_BASE_URL || '').trim().replace(/\/$/, '')
const API_KEY = (process.env.VITE_UPNOTE_PUBLIC_API_KEY || '').trim()
const KEY_HEADER = (process.env.VITE_UPNOTE_API_KEY_HEADER || 'X-API-Key').trim()

// 記事詳細を sitemap に載せるコンテンツタイプ（ルート → contentTypeSlug）
const ARTICLE_ROUTES = [{ basePath: '/blog', slug: 'columns' }]

const routesPath = join(root, 'src', 'constants', 'site-routes.json')
const { routes } = JSON.parse(readFileSync(routesPath, 'utf8'))

if (!existsSync(dist)) mkdirSync(dist, { recursive: true })

const today = new Date().toISOString().slice(0, 10)

/** UpNote 公開 API から全件取得（page 送り）。失敗しても throw せず空配列（exit 0 維持） */
async function fetchAllArticles(slug) {
  if (!API_BASE || !API_KEY) {
    console.warn(`[sitemap] VITE_UPNOTE_API_BASE_URL / VITE_UPNOTE_PUBLIC_API_KEY 未設定のため記事詳細（${slug}）はスキップ`)
    return []
  }
  const endpoint = /\/api\/v\d+$/.test(API_BASE) ? API_BASE : `${API_BASE}/api/v1`
  const items = []
  try {
    let page = 1
    let totalPages = 1
    while (page <= totalPages) {
      const res = await fetch(`${endpoint}/contents?contentTypeSlug=${slug}&page=${page}&limit=50`, {
        headers: { Accept: 'application/json', [KEY_HEADER]: API_KEY },
      })
      const json = await res.json()
      if (!res.ok || json.success === false) {
        console.warn(`[sitemap] ${slug} の取得に失敗（${json.errorCode || res.status}）。記事詳細はスキップ`)
        return []
      }
      items.push(...(json.data?.items || []))
      totalPages = json.data?.totalPages || 1
      page += 1
    }
  } catch (e) {
    console.warn(`[sitemap] ${slug} の取得に失敗（${e.message}）。記事詳細はスキップ`)
    return []
  }
  return items
}

function urlEntry(loc, { lastmod = today, changefreq = 'monthly', priority = 0.6 } = {}) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
}

const staticUrls = routes.map((r) =>
  urlEntry(`${SITE_URL}${r.path}`, { changefreq: r.changefreq, priority: r.priority }),
)

let articleCount = 0
const articleUrls = []
for (const { basePath, slug } of ARTICLE_ROUTES) {
  const items = await fetchAllArticles(slug)
  for (const item of items) {
    const lastmod = (item.updatedAt || item.publishedAt || item.createdAt || today).slice(0, 10)
    articleUrls.push(urlEntry(`${SITE_URL}${basePath}/${item.id}`, { lastmod, priority: 0.6 }))
    articleCount += 1
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...staticUrls, ...articleUrls].join('\n')}\n</urlset>\n`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)

const robots = IS_PUBLIC
  ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
  : `User-agent: *\nDisallow: /\n`
writeFileSync(join(dist, 'robots.txt'), robots)

console.log(`[sitemap] ${routes.length} routes + ${articleCount} articles → ${SITE_URL} (public=${IS_PUBLIC})`)
