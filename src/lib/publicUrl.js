// GitHub Pages / Cloudflare のサブパス配信に対応するためのパス解決ヘルパー。
// import.meta.env.BASE_URL は vite.config.js の base（既定 '/'）。
const BASE = import.meta.env.BASE_URL || '/'

export function publicUrl(path = '') {
  const clean = String(path).replace(/^\//, '')
  return `${BASE.replace(/\/$/, '')}/${clean}`
}
