import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { seoFor, DEFAULT_DESCRIPTION } from '../constants/seo.js'
import { SITE } from '../constants/site.js'
import { publicUrl } from '../lib/publicUrl.js'
import { buildSiteGraph, buildBreadcrumb } from '../lib/structuredData.js'

// 全ルートで title / description / canonical / OGP / Twitter / robots / JSON-LD
export default function DocumentMeta({ title, description, robots, jsonLd }) {
  const { pathname } = useLocation()
  const seo = seoFor(pathname)
  const pageTitle = title || seo.title
  const desc = description || seo.description || DEFAULT_DESCRIPTION

  const siteUrl = SITE.url.replace(/\/$/, '')
  const canonical = `${siteUrl}${pathname}`
  const ogImage =
    import.meta.env.VITE_OG_IMAGE_URL || `${siteUrl}${publicUrl('/og-image.svg')}`
  const isPublic = import.meta.env.VITE_SITE_PUBLIC === '1'
  const gsc = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION
  const robotsContent = robots ?? (isPublic ? 'index,follow' : 'noindex,nofollow')

  const siteGraph = buildSiteGraph(siteUrl)
  const breadcrumb = buildBreadcrumb(pathname, siteUrl)
  const extraLd = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []
  const jsonLdScripts = [siteGraph, breadcrumb, ...extraLd].filter(Boolean)

  return (
    <Helmet>
      <html lang="ja" />
      <title>{pageTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />
      {gsc && <meta name="google-site-verification" content={gsc} />}
      <meta name="robots" content={robotsContent} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="icon" type="image/png" href={publicUrl('/logo-header.png')} />
      <link rel="apple-touch-icon" href={publicUrl('/logo-header.png')} />

      {jsonLdScripts.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  )
}
