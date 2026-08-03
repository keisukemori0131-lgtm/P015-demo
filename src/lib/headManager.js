// ルートごとの document head 直接管理（R4「react-helmet-async か、ルートごとのdocument head設定」の後者）。
// react-helmet-async 2.0.5 が本プロジェクトでは dev / 本番ビルドとも実行時にタグを一切
// 出力しない不具合が確認されたため（2026-08）、直接 DOM を更新する方式に置き換えた。
// index.html の静的タグ（description / og:* 等）は同一セレクタを上書きするため重複しない。
import { useEffect } from 'react'

const JSONLD_ATTR = 'data-jsonld-group'

/** <meta name|property="key"> を上書き（無ければ作成） */
export function upsertMeta(attr, key, content) {
  if (content == null || content === '') return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** <link rel="..."> を上書き（無ければ作成） */
export function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** group 単位で JSON-LD <script> を全入れ替え */
export function setJsonLdGroup(group, ldObjects) {
  document.head
    .querySelectorAll(`script[${JSONLD_ATTR}="${group}"]`)
    .forEach((el) => el.remove())
  for (const ld of ldObjects || []) {
    if (!ld) continue
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.setAttribute(JSONLD_ATTR, group)
    el.textContent = JSON.stringify(ld)
    document.head.appendChild(el)
  }
}

/** JSON-LD を head に出す React コンポーネント（アンマウントで撤去） */
export function JsonLd({ group, data }) {
  const json = data ? JSON.stringify(data) : ''
  useEffect(() => {
    if (!json) return undefined
    setJsonLdGroup(group, [JSON.parse(json)])
    return () => setJsonLdGroup(group, [])
  }, [group, json])
  return null
}
