// UpNote 公開API クライアント — 標準: パターン B 直叩き・crecomsence 互換セット 1
// 仕様: 共通資料/設計書/公開API設計書_v1.0.md (§13) に準拠
//
// 環境変数 (Vite) — 解決優先度の順:
//   VITE_UPNOTE_API_BASE_URL=https://api.upnote.jp   ← /api/v1 を含めない（コードが付与）
//   VITE_UPNOTE_PUBLIC_API_KEY=up_xxxxxxxxxxxxxxxxxxxxx
//   VITE_UPNOTE_API_KEY_HEADER=X-API-Key             ← 任意（既定 X-API-Key）
//
//   npm run dev   → 既定はローカル JSON（public/upnote-local/*.sample.json）。API は叩かない
//   npm run build → .env.production / Cloudflare Build 環境変数で公開 API 直叩き
//
// ※ R15: dev でキー・ベース URL 未設定なら fetchLocalContents 経由でローカル JSON を読む。

import { fetchLocalContents, fetchLocalContentById } from './upnoteLocal.js'

const DEFAULT_KEY_HEADER = 'X-API-Key'
const PROXY_PREFIX = '/api/upnote/v1'

const RAW_BASE_URL = import.meta.env.VITE_UPNOTE_API_BASE_URL?.trim() || ''
const RAW_BASE = import.meta.env.VITE_UPNOTE_API_BASE?.trim() || ''
const RAW_KEY =
  import.meta.env.VITE_UPNOTE_PUBLIC_API_KEY?.trim() ||
  import.meta.env.VITE_UPNOTE_API_KEY?.trim() ||
  import.meta.env.UPNOTE_API_KEY?.trim() || // セット 2 (P002) 互換: envPrefix 経由で公開
  ''
const KEY_HEADER = import.meta.env.VITE_UPNOTE_API_KEY_HEADER?.trim() || DEFAULT_KEY_HEADER

// ローカルモード判定（R15-1）: dev かつキー・ベース URL 未設定ならローカル JSON を読む
const USE_LOCAL_DATA = import.meta.env.DEV && !RAW_KEY && !RAW_BASE_URL && !RAW_BASE

// ベース URL の解決優先度:
//   1. VITE_UPNOTE_API_BASE_URL（セット 1・新規標準）→ 例 https://api.upnote.jp
//   2. VITE_UPNOTE_API_BASE（セット 2 or パターン A）
//   3. デフォルト proxy パス /api/upnote/v1
const RESOLVED_BASE = (RAW_BASE_URL || RAW_BASE || PROXY_PREFIX).replace(/\/$/, '')
const VIA_PROXY = RESOLVED_BASE.startsWith('/')

function endpoint(path) {
  if (VIA_PROXY) return `${RESOLVED_BASE}${path}`
  if (/\/api\/v\d+$/.test(RESOLVED_BASE)) return `${RESOLVED_BASE}${path}` // セット 2
  return `${RESOLVED_BASE}/api/v1${path}` // セット 1
}

if (!USE_LOCAL_DATA && !VIA_PROXY && !RAW_KEY) {
  console.error(
    '[upnote] 直叩きモードでは VITE_UPNOTE_PUBLIC_API_KEY が必須です。Cloudflare Build に追加してください。',
  )
}

async function request(path, init = {}) {
  const headers = { Accept: 'application/json', ...(init.headers ?? {}) }
  if (!VIA_PROXY && RAW_KEY) headers[KEY_HEADER] = RAW_KEY

  let res
  try {
    res = await fetch(endpoint(path), { ...init, headers, cache: 'no-store' })
  } catch {
    const err = new Error('NETWORK: ネットワークエラー（CORS の許可オリジン未登録などを確認）')
    err.errorCode = 'NETWORK'
    throw err
  }

  let json
  try {
    json = await res.json()
  } catch {
    const err = new Error(`HTTP_${res.status}: ${res.statusText}`)
    err.status = res.status
    throw err
  }

  if (!res.ok || json.success === false) {
    const err = new Error(`${json.errorCode ?? `HTTP_${res.status}`}: ${json.message ?? res.statusText}`)
    err.errorCode = json.errorCode
    err.status = res.status
    throw err
  }
  return json.data
}

/**
 * コンテンツ一覧取得 (PUBLISHED かつ掲載期間内のみ・sortOrder昇順)
 * dev のローカルモードでも page/limit を適用する（R14 のページャを dev で検証可能に）
 */
export async function fetchContents(contentTypeSlug, options = {}) {
  if (USE_LOCAL_DATA) return fetchLocalContents(contentTypeSlug, options)
  const params = new URLSearchParams({ contentTypeSlug })
  if (options.page) params.set('page', String(options.page))
  if (options.limit) params.set('limit', String(options.limit))
  if (options.q) params.set('q', options.q)
  return request(`/contents?${params.toString()}`)
}

/**
 * コンテンツ詳細取得 (GET /api/v1/contents/{id})。
 * 下書き・掲載期間外・削除済みは 404 (NOT_FOUND) を投げる。
 * dev のローカルモードでは localSlug のローカル JSON から id 一致を探す（R15）。
 *
 * @param {string} id コンテンツ ID
 * @param {{ localSlug?: string }} [options] ローカルモードで読む contentTypeSlug
 */
export async function fetchContentById(id, options = {}) {
  if (USE_LOCAL_DATA) return fetchLocalContentById(options.localSlug, id)
  return request(`/contents/${id}`)
}

/**
 * 問い合わせ送信 (POST /api/v1/inquiries・設計書 v1.1 §7.3)
 *
 * その企業の UpNote 管理者メールアドレスへ通知メールが送られる（DB 保存なし）。
 * ローカルモード（dev かつ API 未設定）では API に送信せず成功をシミュレートする（R15）。
 *
 * 失敗時は errorCode 付き Error を投げる:
 *   VALIDATION_ERROR (400) — 必須欠落・文字数超過・メール形式不正
 *   MAIL_SEND_FAILED (500) — メール送信失敗。入力値を保持したまま再送を促すこと
 *
 * @param {{ name: string, email: string, subject?: string, message: string }} inquiry
 */
export async function submitInquiry(inquiry) {
  if (USE_LOCAL_DATA) {
    console.warn('[upnote] 問い合わせ送信(シミュレート): API 未設定のため送信していません', inquiry)
    await new Promise((resolve) => setTimeout(resolve, 600))
    return { simulated: true }
  }
  await request('/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiry),
  })
  return { simulated: false }
}

/* ───────────── 表示ヘルパー ───────────── */

export function formatDateJST(utcString, options) {
  if (!utcString) return ''
  return new Date(utcString).toLocaleDateString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(options ?? {}),
  })
}

export const EMPTY_MESSAGES = {
  news: 'お知らせは現在登録されていません。',
  case_studies: '実績・事例は現在登録されていません。',
  faq: 'よくあるご質問は現在登録されていません。',
  columns: 'コラムは現在登録されていません。',
  members: 'スタッフ紹介は現在登録されていません。',
}
