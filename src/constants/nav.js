// グローバルナビ（ヘッダー・フッターで共通・R16-1）。
export const MAIN_NAV = [
  { label: 'ホーム', to: '/' },
  { label: '私たちについて', to: '/about' },
  { label: '児童発達支援', to: '/support' },
  { label: 'こころの相談室', to: '/counseling' },
  { label: '成長事例', to: '/cases' },
  { label: 'お知らせ', to: '/news' },
]

// フッターでは MAIN_NAV に加えてコラムも掲載（ヘッダーは項目数を抑えるため省略）。
export const FOOTER_NAV = [...MAIN_NAV, { label: 'コラム', to: '/blog' }]

export const CTA_NAV = { label: '見学・体験のお問い合わせ', to: '/contact' }
