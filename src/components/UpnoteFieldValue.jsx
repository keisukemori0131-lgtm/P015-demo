import { formatDateJST } from '../lib/upnote.js'
import { isImageUrl } from '../lib/upnoteContent.js'

const ISO_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const HTML_RE = /<[a-z][\s\S]*>/i

// 値の種別を自動判定して描画（R14-3a #2）
export default function UpnoteFieldValue({ value }) {
  if (value == null || value === '') return null
  const v = typeof value === 'string' ? value : String(value)

  if (isImageUrl(v)) {
    return <img className="field-img" src={v} alt="" loading="lazy" decoding="async" />
  }
  if (/^https?:\/\//i.test(v)) {
    return (
      <a href={v} target="_blank" rel="noopener noreferrer">
        {v}
      </a>
    )
  }
  if (ISO_RE.test(v)) return <span>{formatDateJST(v)}</span>
  if (DATE_RE.test(v)) {
    const [y, m, d] = v.split('-')
    return <span>{`${y}年${Number(m)}月${Number(d)}日`}</span>
  }
  if (typeof value === 'boolean') return <span>{value ? 'はい' : 'いいえ'}</span>
  if (HTML_RE.test(v)) return <span dangerouslySetInnerHTML={{ __html: v }} />
  return <span>{v}</span>
}
