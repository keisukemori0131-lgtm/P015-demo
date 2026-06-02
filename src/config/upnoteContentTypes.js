// ページslug → UpNote contentTypeSlug の対応表
//
// 生成時に顧客YAML(P015 / ペラペラキッズカレッジ札幌)の upnote.content_types({}) を
// DEFAULT_PAGE_CONTENT_TYPES に上書きマージした最終形。content_types が空のため既定どおり。
//
// UpNote 側で利用可能な contentTypeSlug:
//   news / stores / members / products / rental_properties / sale_properties /
//   faq / events / player_roster / columns / case_studies

export const DEFAULT_PAGE_CONTENT_TYPES = {
  // ─── CMS連携あり ───
  news: 'news',
  blog: 'columns',
  works: 'case_studies',
  shop_info: 'stores',
  access: 'stores',
  company: 'members',
  service_detail: 'products',
  pricing: 'products',
  faq: 'faq',

  // ─── CMS連携なし (本文ベース) ───
  top: null,
  recruit: null,
  lp: null,

  // ─── 問い合わせ系もCMS無し ───
  contact_google: null,
  contact_web3forms: null,
  contact_other: null,
}

/**
 * ページslug → contentTypeSlug の最終形（YAML の content_types マージ済み）。
 * ページコードはここから読む: CONTENT_TYPE_FOR.news → 'news'
 */
export const CONTENT_TYPE_FOR = {
  ...DEFAULT_PAGE_CONTENT_TYPES,
  // 顧客YAML upnote.content_types は {} （上書きなし）
}

/**
 * この顧客が UpNote に実際に登録するコンテンツタイプ一覧（YAML upnote.contents をそのまま）。
 * ページコードはこの配列に含まれない slug を取得しに行かない（必ず空になるため）。
 */
export const ENABLED_CONTENT_TYPES = ['news', 'faq', 'columns']

/** その contentTypeSlug がこの顧客で有効か */
export const isEnabled = (slug) => ENABLED_CONTENT_TYPES.includes(slug)
