#!/usr/bin/env node
/**
 * postbuild: dist/sitemap.xml と dist/robots.txt を生成（R11-B #3 / R10 SEO）。
 * - VITE_SITE_URL を基点に各ルートの <loc> を出力（site-routes.json が単一の正）。
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

const routesPath = join(root, 'src', 'constants', 'site-routes.json')
const { routes } = JSON.parse(readFileSync(routesPath, 'utf8'))

if (!existsSync(dist)) mkdirSync(dist, { recursive: true })

const today = new Date().toISOString().slice(0, 10)
const urls = routes
  .map(
    (r) =>
      `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
  )
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
writeFileSync(join(dist, 'sitemap.xml'), sitemap)

const robots = IS_PUBLIC
  ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
  : `User-agent: *\nDisallow: /\n`
writeFileSync(join(dist, 'robots.txt'), robots)

console.log(`[sitemap] ${routes.length} routes → ${SITE_URL} (public=${IS_PUBLIC})`)
