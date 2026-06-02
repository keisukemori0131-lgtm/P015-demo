import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { seoFor, DEFAULT_DESCRIPTION } from '../constants/seo.js'
import { SITE } from '../constants/site.js'
import { publicUrl } from '../lib/publicUrl.js'

// 全ルートで title / description / canonical / OGP / Twitter / robots / JSON-LD（R4 / R11-B）
export default function DocumentMeta({ title, description, jsonLd }) {
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

  // 全ページ共通 LocalBusiness（R11-B #4）。児童向け英語スクールのため EducationalOrganization。
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE.name,
    telephone: SITE.tel,
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'JP',
      addressRegion: '北海道',
      addressLocality: '札幌市中央区',
      streetAddress: '北5条西23丁目2-1 第16藤栄ビル1階',
      postalCode: '060-0005',
    },
  }

  return (
    <Helmet>
      <html lang="ja" />
      <title>{pageTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />
      {gsc && <meta name="google-site-verification" content={gsc} />}
      <meta name="robots" content={isPublic ? 'index,follow' : 'noindex,nofollow'} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="icon" type="image/svg+xml" href={publicUrl('/logo.svg')} />
      <link rel="apple-touch-icon" href={publicUrl('/logo.svg')} />

      <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
