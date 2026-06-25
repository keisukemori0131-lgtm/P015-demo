// ページ → UpNote contentTypeSlug の対応（このサイトで実際に利用するもののみ）

export const CONTENT_TYPE_FOR = {
  news: 'news',
  blog: 'columns',
  faq: 'faq',
  members: 'members',
}

/** この顧客が UpNote に登録するコンテンツタイプ */
export const ENABLED_CONTENT_TYPES = ['news', 'faq', 'columns', 'members']

export const isEnabled = (slug) => ENABLED_CONTENT_TYPES.includes(slug)
