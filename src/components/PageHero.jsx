import { publicUrl } from '../lib/publicUrl.js'

// サブページのページヒーロー（R16-4）。文言オーバーレイは出さず、背景画像（SVGカバー）の帯のみ。
// h1 は visually-hidden で保持（SEO・スクリーンリーダー）。
export default function PageHero({ title, image, contain = true }) {
  return (
    <section className="page-hero" aria-label={title}>
      <h1 className="visually-hidden">{title}</h1>
      <img
        className={`page-hero__img${contain ? ' page-hero__img--contain' : ''}`}
        src={publicUrl(image)}
        alt=""
        aria-hidden="true"
      />
    </section>
  )
}
