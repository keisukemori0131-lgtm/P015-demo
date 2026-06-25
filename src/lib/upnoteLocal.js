// ローカル開発用データソース（R15 / R15-0）
// npm run dev では公開 API を叩かず public/upnote-local/{slug}.json → {slug}.sample.json を読む。
import { publicUrl } from './publicUrl.js'

/**
 * Vite dev サーバーは存在しないパスへ SPA フォールバック(index.html)を返すことがある。
 * その HTML を JSON パースして例外になるのを防ぐため、Content-Type を必ず確認する（R15-0）。
 */
async function tryFetch(url) {
  let res
  try {
    res = await fetch(url, { cache: 'no-store' })
  } catch {
    return null
  }
  if (!res.ok) return null
  const ct = res.headers.get('content-type') || ''
  if (!/json/i.test(ct)) {
    console.warn(`[upnote-local] ${url} が JSON ではありません（SPA フォールバックの可能性）。次の候補へ。`)
    return null
  }
  try {
    return await res.json()
  } catch {
    console.warn(`[upnote-local] ${url} の JSON パースに失敗。次の候補へ。`)
    return null
  }
}

async function loadAll(slug) {
  const candidates = [
    publicUrl(`/upnote-local/${slug}.json`),
    publicUrl(`/upnote-local/${slug}.sample.json`),
  ]
  for (const url of candidates) {
    const json = await tryFetch(url)
    if (json) return Array.isArray(json) ? json : json.items || []
  }
  console.warn(`[upnote-local] ${slug} のローカル JSON が見つかりません（${candidates.join(' , ')}）。`)
  const err = new Error(`LOCAL_NOT_FOUND: ${slug}`)
  err.errorCode = 'LOCAL_NOT_FOUND'
  throw err
}

export async function fetchLocalContents(slug, options = {}) {
  const all = await loadAll(slug)
  const page = options.page || 1
  const limit = options.limit || all.length || 1
  const start = (page - 1) * limit
  return {
    items: all.slice(start, start + limit),
    page,
    limit,
    totalCount: all.length,
    totalPages: Math.max(1, Math.ceil(all.length / limit)),
  }
}

