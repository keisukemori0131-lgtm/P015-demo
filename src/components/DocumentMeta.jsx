import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { seoFor, DEFAULT_DESCRIPTION } from '../constants/seo.js'
import { SITE } from '../constants/site.js'
import { publicUrl } from '../lib/publicUrl.js'
import { buildSiteGraph, buildBreadcrumb } from '../lib/structuredData.js'
import { upsertMeta, upsertLink, setJsonLdGroup } from '../lib/headManager.js'

// 全ルートで title / description / canonical / OGP / Twitter / robots / JSON-LD（R4）。
// document head を直接更新する（headManager.js 参照。react-helmet-async は不具合のため不使用）。
export default function DocumentMeta({ title, description, robots, jsonLd, ogType = 'website', ogImage: ogImageProp }) {
  const { pathname } = useLocation()
  const seo = seoFor(pathname)
  const pageTitle = title || seo.title
  const desc = description || seo.description || DEFAULT_DESCRIPTION

  const siteUrl = SITE.url.replace(/\/$/, '')
  const canonical = `${siteUrl}${pathname}`
  const ogImage =
    ogImageProp || import.meta.env.VITE_OG_IMAGE_URL || `${siteUrl}${publicUrl('/og-image.svg')}`
  const isPublic = import.meta.env.VITE_SITE_PUBLIC === '1'
  const gsc = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION
  const robotsContent = robots ?? (isPublic ? 'index,follow' : 'noindex,nofollow')

  const extraLd = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []
  const jsonLdJson = JSON.stringify(
    [buildSiteGraph(siteUrl), buildBreadcrumb(pathname, siteUrl), ...extraLd].filter(Boolean),
  )

  useEffect(() => {
    document.documentElement.lang = 'ja'
    document.title = pageTitle

    upsertMeta('name', 'description', desc)
    upsertMeta('name', 'robots', robotsContent)
    if (gsc) upsertMeta('name', 'google-site-verification', gsc)

    upsertLink('canonical', canonical)

    upsertMeta('property', 'og:type', ogType)
    upsertMeta('property', 'og:locale', 'ja_JP')
    upsertMeta('property', 'og:site_name', SITE.name)
    upsertMeta('property', 'og:title', pageTitle)
    upsertMeta('property', 'og:description', desc)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', ogImage)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', pageTitle)
    upsertMeta('name', 'twitter:description', desc)
    upsertMeta('name', 'twitter:image', ogImage)

    upsertLink('icon', publicUrl('/logo-header.png'))
    upsertLink('apple-touch-icon', publicUrl('/logo-header.png'))

    setJsonLdGroup('page', JSON.parse(jsonLdJson))
  }, [pageTitle, desc, robotsContent, gsc, canonical, ogType, ogImage, jsonLdJson])

  return null
}
