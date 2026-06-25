// UpNote コンテンツ（item）から表示用の値を取り出す共通ヘルパー（R14-3a）。
// 一覧ページ・モーダル・トップ抜粋はすべてここを経由する（直 item.data.X 参照は禁止）。
import { formatDateJST } from './upnote.js'

const pick = (data, keys) => {
  for (const k of keys) {
    const v = data?.[k]
    if (v != null && v !== '') return v
  }
  return ''
}

export function getContentTitle(item) {
  return pick(item?.data, ['article_title']) || item?.title || '（無題）'
}

export function getContentSubtitle(item) {
  return pick(item?.data, ['subtitle'])
}

export function getContentDate(item) {
  return item?.publishedAt || item?.data?.notice_date || item?.createdAt || ''
}

export function formatContentDate(item) {
  const d = getContentDate(item)
  if (!d) return ''
  // DATE型(YYYY-MM-DD)はそのまま、ISOはJST整形
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) {
    const [y, m, day] = d.split('-')
    return `${y}年${Number(m)}月${Number(day)}日`
  }
  return formatDateJST(d)
}

export function getContentLead(item) {
  return pick(item?.data, ['lead', 'summary', 'description'])
}

export function getContentBody(item) {
  return pick(item?.data, ['body', 'body_html', 'description', 'answer'])
}

export function getContentTags(item) {
  const t = pick(item?.data, ['tag_name'])
  if (!t) return []
  return String(t)
    .split(/[,、]/)
    .map((s) => s.trim())
    .filter(Boolean)
}

const IMG_RE = /\.(png|jpe?g|gif|webp|svg)(\?|$)/i

export function isImageUrl(v) {
  return typeof v === 'string' && (IMG_RE.test(v) || /^https?:.*(image|s3|amazonaws)/i.test(v))
}

export function resolveMediaUrl(v) {
  return typeof v === 'string' ? v : ''
}

/** ヒーロー/サムネに使える画像 URL を返す（thumbnail → attachment → mediaFiles の順） */
export function getContentImageUrls(item) {
  const data = item?.data || {}
  const urls = []
  for (const k of ['thumbnail', 'attachment_1', 'attachment_2', 'attachment_3']) {
    if (isImageUrl(data[k])) urls.push(data[k])
  }
  for (const mf of item?.mediaFiles || []) {
    if (mf?.fileUrl && isImageUrl(mf.fileUrl)) urls.push(mf.fileUrl)
  }
  return urls
}

export function getContentThumb(item) {
  return getContentImageUrls(item)[0] || ''
}

// members（役員・従業員）向けヘルパー
export function getMemberName(item) {
  return getContentTitle(item)
}

export function getMemberRole(item) {
  return getContentSubtitle(item)
}

export function getMemberLead(item) {
  return getContentLead(item)
}

export function getMemberBody(item) {
  return getContentBody(item)
}

export function getMemberQualifications(item) {
  return getContentTags(item)
}

// モーダル上段スロットで描画済み → 詳細情報グリッドから除外するキー（R14-3a）
export const DEFAULT_MODAL_SKIP_KEYS = [
  'article_title',
  'subtitle',
  'lead',
  'summary',
  'body',
  'body_html',
  'description',
  'answer',
  'thumbnail',
  'attachment_1',
  'attachment_2',
  'attachment_3',
  'tag_name',
  'notice_date',
  'challenge',
  'approach',
  'outcome',
  'testimonial',
]

/**
 * 「詳細情報」グリッドに出す残りの非空フィールドのみ返す。
 * skipKeys（既定 DEFAULT_MODAL_SKIP_KEYS）と null/空文字は除外。
 */
export function getContentFieldEntries(item, skipKeys = DEFAULT_MODAL_SKIP_KEYS) {
  const data = item?.data || {}
  return Object.entries(data).filter(([k, v]) => {
    if (skipKeys.includes(k)) return false
    if (v == null || v === '') return false
    if (typeof v === 'object') return false
    return true
  })
}
