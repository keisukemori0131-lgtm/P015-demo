// 全ルートの title / description の単一ソース（R10 SEO）。
// index.html の description とトップの文面はここに揃える。
import { SITE } from './site.js'

export const DEFAULT_DESCRIPTION =
  '札幌市中央区の児童向け英語スクール、ペラペラキッズカレッジ札幌。2歳からの少人数制で、英語で学ぶイマージョンスタイル。現役ドクターによる専門レッスンや、発達特性に寄り添った指導も行います。'

export const PAGE_SEO = {
  '/': {
    title: `${SITE.name}｜2歳からの少人数制イマージョン英語スクール`,
    description: DEFAULT_DESCRIPTION,
  },
  '/services': {
    title: `スクール紹介｜${SITE.name}`,
    description:
      '少人数制・イマージョンスタイルの英語レッスン、現役ドクターによる専門レッスン、発達特性に寄り添った指導まで。ペラペラキッズカレッジ札幌のレッスン内容をご紹介します。',
  },
  '/pricing': {
    title: `料金・コース｜${SITE.name}`,
    description:
      '年齢や目的に合わせたコース構成と、レッスンに含まれる内容をご案内します。料金の詳細や体験レッスンのご相談はお気軽にお問い合わせください。',
  },
  '/blog': {
    title: `コラム｜${SITE.name}`,
    description:
      'おうち英語のヒントや、子どものバイリンガル教育・イマージョン学習に役立つコラムをお届けします。',
  },
  '/news': {
    title: `お知らせ｜${SITE.name}`,
    description: '体験レッスンや季節のイベント、休講のご案内など、ペラペラキッズカレッジ札幌からの大切なお知らせです。',
  },
  '/contact': {
    title: `体験・お問い合わせ｜${SITE.name}`,
    description:
      '体験レッスンのお申し込み・ご相談はお問い合わせフォームまたはお電話から。ペラペラキッズカレッジ札幌へお気軽にどうぞ。',
  },
}

export function seoFor(pathname) {
  return PAGE_SEO[pathname] || PAGE_SEO['/']
}
