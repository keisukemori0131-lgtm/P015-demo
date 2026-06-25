// 全ルートの title / description の単一ソース（R10 SEO）。
// index.html の description とトップの文面はここに揃える。
import { SITE } from './site.js'

export const DEFAULT_DESCRIPTION =
  '札幌・円山／宮の森の児童発達支援・放課後等デイサービス、ペラペラスタジオ。英語イマージョン環境と運動療育を軸に、ASD・ADHD など一人ひとりの特性に寄り添い、子どもたちの「できた！」と自己肯定感を育てます。'

export const PAGE_SEO = {
  '/': {
    title: `${SITE.name}｜児童発達支援・放課後等デイサービス（札幌・円山／宮の森）`,
    description: DEFAULT_DESCRIPTION,
  },
  '/about': {
    title: `私たちについて｜${SITE.name}`,
    description:
      '子どもたち一人ひとりの個性を大切にしながら、未来につながる力を育てる、ペラペラスタジオの想いと願い。「できた！」が自信になる支援、英語と運動を通した療育について。',
  },
  '/support': {
    title: `児童発達支援・放課後等デイサービス｜${SITE.name}`,
    description:
      '発達に特性のある未就学のお子さまを対象とした児童発達支援。英語に親しみ、身体を育て、社会性と成功体験を積み重ねながら、小学校入学に向けた力を育てます。見学・体験、よくあるご質問もご覧いただけます。',
  },
  '/counseling': {
    title: `こころの相談室｜${SITE.name}`,
    description:
      'ママ、パパ、ご家族のための心のサポートルーム「ペラペラ こころの相談室」。家族支援カウンセラー・保育士の資格を持つカウンセラーが、対面・オンラインで子どもと家族の心をサポートします。',
  },
  '/cases': {
    title: `成長事例｜${SITE.name}`,
    description:
      'ペラペラスタジオに通うお子さまの成長事例をご紹介します。パニックの軽減、お友だちとの関わり、ことば・運動・学習の成長など、一人ひとりの「できた！」の積み重ね。',
  },
  '/blog': {
    title: `コラム｜${SITE.name}`,
    description:
      '児童発達支援・放課後等デイサービスや、英語・運動を通した子育てに役立つコラムをお届けします。',
  },
  '/news': {
    title: `お知らせ｜${SITE.name}`,
    description: '見学・体験のご案内や季節のイベント、休所日のお知らせなど、ペラペラスタジオからの大切なお知らせです。',
  },
  '/contact': {
    title: `見学・お問い合わせ｜${SITE.name}`,
    description:
      '見学・体験のお申し込み、お子さまの発達についてのご相談は、お問い合わせフォームからお気軽にどうぞ。ペラペラスタジオ（円山校・宮の森校）。',
  },
}

export function seoFor(pathname) {
  if (pathname !== '/' && !PAGE_SEO[pathname]) {
    return {
      title: `ページが見つかりません｜${SITE.name}`,
      description: DEFAULT_DESCRIPTION,
    }
  }
  return PAGE_SEO[pathname] || PAGE_SEO['/']
}
