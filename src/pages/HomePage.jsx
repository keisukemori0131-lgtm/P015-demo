import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DocumentMeta from '../components/DocumentMeta.jsx'
import Logo from '../components/Logo.jsx'
import ContentCard from '../components/ContentCard.jsx'
import ContentDetailModal from '../components/ContentDetailModal.jsx'
import { Loading, EmptyMsg } from '../components/StateMessage.jsx'
import { publicUrl } from '../lib/publicUrl.js'
import { useContentList } from '../lib/useUpNote.js'
import { CONTENT_TYPE_FOR, isEnabled } from '../config/upnoteContentTypes.js'
import { SITE, USP } from '../constants/site.js'
import { EMPTY_MESSAGES } from '../lib/upnote.js'

const HERO_SLIDES = [
  '/images/hero/main-kids.jpg',
]

const PRINCIPAL_PROFILE = [
  '1955年 大阪生まれ',
  '私立梅花女子大学大学院修士課程修了 文学修士',
  '関西圏の大学で児童文学と幼児教育を講義',
  '45歳でバイリンガルになるためアメリカに留学',
  '帰国後は北海道に移住し、幼児の英語教育に取り組む',
  '2010年 こどもの英会話スクールを札幌で開校',
]

export default function HomePage() {
  const [heroReady, setHeroReady] = useState(false)
  const [slide, setSlide] = useState(0)
  const [modalItem, setModalItem] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 6000)
    return () => clearInterval(t)
  }, [])

  const newsSlug = CONTENT_TYPE_FOR.news
  const blogSlug = CONTENT_TYPE_FOR.blog
  const news = useContentList(isEnabled(newsSlug) ? newsSlug : null, { page: 1, limit: 3 })
  const blog = useContentList(isEnabled(blogSlug) ? blogSlug : null, { page: 1, limit: 3 })

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
  }

  return (
    <>
      <DocumentMeta jsonLd={homeJsonLd} />

      {/* ───── ヒーロー（R16-2） ───── */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          {HERO_SLIDES.map((src, i) => (
            <span
              key={src}
              className={`hero__scrim-slide${i === slide ? ' is-active' : ''}`}
              style={{ backgroundImage: `url(${publicUrl(src)})` }}
            />
          ))}
          <span className="hero__scrim-overlay" />
        </div>
        <div className="hero__inner">
          <div className={`hero__content${heroReady ? ' is-ready' : ''}`}>
            <h1 className="hero__title">
              <span className="hero__line hero__line--lead">2歳から、</span>
              <span className="hero__line hero__line--main">英語で世界とつながる。</span>
            </h1>
            <span className="hero__divider" aria-hidden="true" />
            <p className="hero__sub">
              <span className="hero__sub-line">札幌・中央区の少人数制イマージョン英語スクール。</span>
              <span className="hero__sub-line">英語を「学ぶ」から「英語で学ぶ」へ。</span>
            </p>
          </div>
        </div>
      </section>

      {/* ───── 強みのサマリ（R16-3） ───── */}
      <section className="section section--strength">
        <div className="container">
          <div className="section-logo">
            <Logo height={120} src="/logo-header.png" />
          </div>
          <p className="eyebrow">OUR STRENGTH</p>
          <h2 className="section-title">ペラペラキッズカレッジ札幌が選ばれる理由</h2>
          <p className="section-lead">
            スクールでは日本語を使わない「英語だけ」の環境。少人数制で一人ひとりに寄り添いながら、
            英語を浴びるように学びます。発達の特性に配慮した指導も大切にし、
            お子さま自身の「考える力」と「伝えたい気持ち」を育てます。
          </p>
          <div className="usp-grid">
            {USP.map((u) => (
              <article key={u.no} className="usp-card">
                <span className="usp-card__no">{u.no}</span>
                <h3>{u.title}</h3>
                <p>{u.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 園長からのご挨拶 ───── */}
      <section className="section section--alt">
        <div className="container">
          <div className="greeting">
            <div className="greeting__media">
              <img
                src={publicUrl('/images/home/principal-shiraki.png')}
                alt="園長 しらきゆみこ"
                width={360}
                height={420}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="greeting__body">
              <p className="eyebrow">MESSAGE</p>
              <h2 className="section-title">園長からのご挨拶</h2>
              <p className="greeting__name">園長 しらきゆみこ</p>
              <h3 className="greeting__subtitle">プロフィール</h3>
              <ul className="greeting__profile">
                {PRINCIPAL_PROFILE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="greeting__message">
                幼児期にバイリンガルに育てることが世界のスタンダードであるように、
                日本でもそれを「あたりまえ」にすることを目標に、日々スクール運営に情熱を注いでいます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── スクール紹介プレビュー ───── */}
      <PreviewSection
        eyebrow="SCHOOL"
        title="スクール紹介"
        image="/images/services/cover-photo.png"
        side="left"
        to="/services"
        cta="スクール紹介を見る"
      >
        イマージョンスタイルのレッスン、現役ドクターによる専門レッスン、少人数制のクラス編成。
        英語を「教科」ではなく「世界を広げる道具」として身につける、ペラペラキッズカレッジの学び方をご紹介します。
      </PreviewSection>

      {/* ───── 料金・コースプレビュー ───── */}
      <PreviewSection
        eyebrow="COURSE"
        title="料金・コース"
        image="/images/pricing/cover-photo.png"
        side="right"
        to="/pricing"
        cta="料金・コースを見る"
      >
        年齢や目的に合わせて選べるコースをご用意しています。レッスンに含まれる内容や、
        体験レッスンのご案内はこちら。詳しい料金は、お子さまの年齢・ご希望をうかがってご案内します。
      </PreviewSection>

      {/* ───── コラム プレビュー（UpNote 抜粋 3 件） ───── */}
      <section className="section section--alt">
        <div className="container">
          <div className="preview preview--right">
            <div className="preview__media">
              <img
                src={publicUrl('/images/blog/cover.svg')}
                alt="コラムのイメージ"
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="preview__text">
              <p className="eyebrow">COLUMN</p>
              <h2 className="section-title">コラム</h2>
              <p>おうち英語のコツや、子どものバイリンガル教育に役立つ情報をお届けします。</p>
              <div className="excerpt-cards">
                {isEnabled(blogSlug) ? (
                  blog.loading ? (
                    <Loading />
                  ) : blog.data && blog.data.items.length ? (
                    blog.data.items.map((item) => (
                      <ContentCard key={item.id} item={item} onOpen={setModalItem} />
                    ))
                  ) : (
                    <EmptyMsg label={EMPTY_MESSAGES.columns} />
                  )
                ) : null}
              </div>
              <Link to="/blog" className="btn btn--outline">
                コラム一覧へ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───── お知らせ プレビュー（UpNote 抜粋 3 件） ───── */}
      <section className="section">
        <div className="container">
          <div className="preview preview--left">
            <div className="preview__media">
              <img
                src={publicUrl('/images/news/cover.svg')}
                alt="お知らせのイメージ"
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="preview__text">
              <p className="eyebrow">NEWS</p>
              <h2 className="section-title">お知らせ</h2>
              <p>体験レッスンや季節のイベント、休講のご案内など、大切なお知らせをお届けします。</p>
              <div className="excerpt-cards">
                {news.loading ? (
                  <Loading />
                ) : news.data && news.data.items.length ? (
                  news.data.items.map((item) => (
                    <ContentCard key={item.id} item={item} onOpen={setModalItem} />
                  ))
                ) : (
                  <EmptyMsg label={EMPTY_MESSAGES.news} />
                )}
              </div>
              <Link to="/news" className="btn btn--outline">
                お知らせ一覧へ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───── 最終 CTA ───── */}
      <section className="cta-band">
        <div className="container cta-band__inner">
          <h2>まずは、英語の世界をのぞいてみませんか</h2>
          <p>体験レッスンを随時受付中です。お問い合わせフォームまたはお電話からご連絡ください。</p>
          <div className="cta-band__actions">
            <Link to="/contact" className="btn btn--primary">
              体験・お問い合わせ
            </Link>
            <a href={`tel:${SITE.telHref}`} className="btn btn--ghost">
              TEL {SITE.tel}
            </a>
          </div>
        </div>
      </section>

      {modalItem && (
        <ContentDetailModal item={modalItem} onClose={() => setModalItem(null)} />
      )}
    </>
  )
}

function PreviewSection({ eyebrow, title, image, side, to, cta, children }) {
  const alt = side === 'alt'
  return (
    <section className={`section${alt ? ' section--alt' : ''}`}>
      <div className="container">
        <div className={`preview preview--${side}`}>
          <div className="preview__media">
            <img
              src={publicUrl(image)}
              alt={`${title}のイメージ`}
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="preview__text">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="section-title">{title}</h2>
            <p>{children}</p>
            <Link to={to} className="btn btn--outline">
              {cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
