// グローバルナビ（ヘッダーはグループ化・ホバー展開、フッターはフラット）。

/** ヘッダー用（まとめ項目は children を持つ） */
export const HEADER_NAV = [
  { label: 'ホーム', to: '/' },
  { label: '私たちについて', to: '/about' },
  {
    label: '支援内容',
    children: [
      { label: '児童発達支援', to: '/support' },
      { label: '放課後等デイサービス', to: '/after-school' },
      { label: '独自の取り組み', to: '/special' },
      { label: 'こころの相談室', to: '/counseling' },
    ],
  },
  { label: '成長事例', to: '/cases' },
  { label: 'コラム', to: '/blog' },
  { label: 'お知らせ', to: '/news' },
]

/** フッター用（全ページをフラットに） */
export const FOOTER_NAV = [
  { label: 'ホーム', to: '/' },
  { label: '私たちについて', to: '/about' },
  { label: '児童発達支援', to: '/support' },
  { label: '放課後等デイサービス', to: '/after-school' },
  { label: '独自の取り組み', to: '/special' },
  { label: 'こころの相談室', to: '/counseling' },
  { label: '成長事例', to: '/cases' },
  { label: 'コラム', to: '/blog' },
  { label: 'お知らせ', to: '/news' },
]

export const CTA_NAV = { label: '見学・体験のお問い合わせ', to: '/contact' }
