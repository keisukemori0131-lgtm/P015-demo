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

export function getContentCategory(item) {
  return pick(item?.data, ['category', 'カテゴリ'])
}

export function getContentAuthor(item) {
  return pick(item?.data, ['author_name', 'author', '著者'])
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

// members（役員・従業員）— UpNote data フィールドキー（日本語 + 公開APIスラッグ + 互換キー）
export const MEMBER_DATA_KEYS = {
  name: ['名前', 'member_name', 'name', 'staff_name', 'article_title'],
  nameRomaji: ['名前ローマ字', 'member_name_romaji', 'name_romaji', 'name_roman', 'romaji', 'english_name'],
  position: ['役職', 'job_title', 'position', 'role', 'subtitle'],
  department: ['所属部署', 'department', 'division', 'affiliation'],
  duties: ['担当業務', 'responsible_tasks', 'duties', 'responsibility', 'job_description'],
  career: ['経歴', 'career_history', 'career', 'history', 'bio', 'body', 'body_html'],
  qualifications: ['資格', 'certifications', 'qualifications', 'qualification', 'credentials', 'tag_name'],
  comment: ['コメント', 'comment_text', 'comment', 'message', 'lead', 'summary'],
}

function pickDataField(data, keys) {
  for (const k of keys) {
    const v = data?.[k]
    if (v != null && v !== '') return typeof v === 'string' ? v.trim() : v
  }
  return ''
}

export function parseMemberListField(value) {
  if (!value) return []
  return String(value)
    .split(/[\n,、/／|]/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function stripHtml(html) {
  if (!html) return ''
  return String(html)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function truncateText(text, max = 140) {
  if (!text || text.length <= max) return text
  return `${text.slice(0, max).replace(/\s+\S*$/, '')}…`
}

const HTML_RE = /<[a-z][\s\S]*>/i

export function isHtmlContent(value) {
  return typeof value === 'string' && HTML_RE.test(value)
}

/** UpNote members 1件を表示用オブジェクトに正規化 */
export function normalizeMemberItem(item) {
  const data = item?.data || {}
  const name = pickDataField(data, MEMBER_DATA_KEYS.name)
  const nameRomaji = pickDataField(data, MEMBER_DATA_KEYS.nameRomaji)
  const positionRaw = pickDataField(data, MEMBER_DATA_KEYS.position)
  const department = pickDataField(data, MEMBER_DATA_KEYS.department)
  const duties = pickDataField(data, MEMBER_DATA_KEYS.duties)
  const career = pickDataField(data, MEMBER_DATA_KEYS.career)
  const qualificationsRaw = pickDataField(data, MEMBER_DATA_KEYS.qualifications)
  const comment = pickDataField(data, MEMBER_DATA_KEYS.comment)
  const qualifications = parseMemberListField(qualificationsRaw)
  const positions = parseMemberListField(positionRaw)
  const displayName = nameRomaji || name || item?.title || '（名前未設定）'

  const summary = comment ? truncateText(stripHtml(comment), 140) : ''

  const hasDetail =
    Boolean(stripHtml(career)) ||
    Boolean(stripHtml(comment)) ||
    qualifications.length > 0 ||
    Boolean(duties)

  return {
    id: item.id,
    name,
    nameRomaji,
    displayName,
    positions: positions.length ? positions : positionRaw ? [positionRaw] : [],
    department,
    duties,
    career,
    qualifications,
    comment,
    summary,
    hasDetail,
    thumb: getContentThumb(item),
  }
}

// members（役員・従業員）向けヘルパー — 正規化結果のショートカット
export function getMemberName(item) {
  const m = normalizeMemberItem(item)
  return m.name || m.displayName
}

export function getMemberNameRomaji(item) {
  return normalizeMemberItem(item).nameRomaji
}

export function getMemberRole(item) {
  const m = normalizeMemberItem(item)
  return m.positions.join('、') || ''
}

export function getMemberDepartment(item) {
  return normalizeMemberItem(item).department
}

export function getMemberDuties(item) {
  return normalizeMemberItem(item).duties
}

export function getMemberCareer(item) {
  return normalizeMemberItem(item).career
}

export function getMemberComment(item) {
  return normalizeMemberItem(item).comment
}

export function getMemberLead(item) {
  const m = normalizeMemberItem(item)
  return m.comment || m.duties
}

export function getMemberBody(item) {
  return normalizeMemberItem(item).career
}

export function getMemberQualifications(item) {
  return normalizeMemberItem(item).qualifications
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
  'category',
  'author_name',
  'author',
  // 掲載期間（掲載開始日・掲載終了日）は運用情報のため画面に表示しない
  'posted_period_start',
  'posted_period_end',
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
