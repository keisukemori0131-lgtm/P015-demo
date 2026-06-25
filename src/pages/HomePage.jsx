import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DocumentMeta from '../components/DocumentMeta.jsx'
import Logo from '../components/Logo.jsx'
import ContentCard from '../components/ContentCard.jsx'
import ContentDetailModal from '../components/ContentDetailModal.jsx'
import { Loading, EmptyMsg } from '../components/StateMessage.jsx'
import ValueCard from '../components/ValueCard.jsx'
import RepresentativeMessage from '../components/RepresentativeMessage.jsx'
import CurriculumExample from '../components/CurriculumExample.jsx'
import { publicUrl } from '../lib/publicUrl.js'
import { useContentList } from '../lib/useUpNote.js'
import { CONTENT_TYPE_FOR, isEnabled } from '../config/upnoteContentTypes.js'
import { SITE, FEATURES, RECOMMEND, CAMPUSES, SHARED_CONTACT } from '../constants/site.js'
import { EMPTY_MESSAGES } from '../lib/upnote.js'

const HERO_SLIDES = ['/images/hero/main-hero.png']

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
  const news = useContentList(isEnabled(newsSlug) ? newsSlug : null, { page: 1, limit: 3 })

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url.replace(/\/$/, ''),
    inLanguage: 'ja',
    publisher: { '@id': `${SITE.url.replace(/\/$/, '')}/#organization` },
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
              <span className="hero__line hero__line--lead">英語で学び、運動で育ち、</span>
              <span className="hero__line hero__line--main">自信をつける。</span>
            </h1>
            <p className="hero__sub">
              <span className="hero__sub-line">
                児童発達支援・放課後等デイサービス{' '}
                <span className="hero__sub-brand">ペラペラスタジオ</span>
              </span>
              <span className="hero__sub-line">子どもたちの「できた！」を大切に。</span>
            </p>
          </div>
        </div>
      </section>

      {/* ───── スタジオ紹介（R16-3） ───── */}
      <section className="section section--strength">
        <div className="container">
          <div className="section-logo">
            <Logo height={120} />
          </div>
          <p className="eyebrow">OUR STUDIO</p>
          <h2 className="section-title">子どもたちの「できた！」を大切に</h2>
          <p className="section-lead">
            ペラペラスタジオは、児童発達支援・放課後等デイサービスとして、子どもたち一人ひとりの個性を大切にしながら、
            将来につながる力を育てています。私たちは、単に子どもを預かる場所ではありません。
            英語、運動、コミュニケーション、社会性、そして自己肯定感。
            未来へ向かって力強く歩いていくために必要な力を、日々の活動を通して育てています。
          </p>
        </div>
      </section>

      <RepresentativeMessage />

      {/* ───── 校舎紹介 ───── */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">CAMPUS</p>
          <h2 className="section-title">校舎紹介</h2>
          <p className="section-lead">
            ペラペラスタジオには、特色の異なる2つの校舎があります。お子さまに合った環境をお選びいただけます。
            児童募集中。見学・体験を随時受け付けています。
          </p>
          <div className="card-grid card-grid--2">
            {CAMPUSES.map((c) => (
              <article key={c.name} className="plan-card campus-card">
                {c.programLogo ? (
                  <>
                    <p className="campus-card__program-logo">
                      <img
                        src={publicUrl(c.programLogo)}
                        alt={c.programLogoAlt || c.program}
                        width={400}
                        height={80}
                        loading="lazy"
                        decoding="async"
                      />
                    </p>
                    <div className="campus-card__head">
                      <h3 className="plan-card__name">{c.name}</h3>
                      {c.badge && <span className="campus-card__badge">{c.badge}</span>}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="campus-card__head">
                      <h3 className="plan-card__name">{c.name}</h3>
                      {c.badge && <span className="campus-card__badge">{c.badge}</span>}
                    </div>
                    <p className="plan-card__target">{c.program}</p>
                  </>
                )}
                <p>{c.text}</p>

                {c.pillars && (
                  <ul className="campus-card__pillars">
                    {c.pillars.map((p) => (
                      <li key={p.title}>
                        <strong>{p.title}</strong>
                        <span>{p.text}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {c.activities && (
                  <p className="campus-card__activities">
                    {c.activities.map((a) => (
                      <span key={a} className="chip">
                        {a}
                      </span>
                    ))}
                  </p>
                )}

                {c.points && (
                  <ul className="plan-card__points">
                    {c.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                )}

                {c.contact && (
                  <p className="campus-card__contact">
                    <span className="campus-card__addr">
                      {c.contact.postal} {c.contact.address}
                    </span>
                  </p>
                )}

                {c.contact?.mapEmbedUrl && (
                  <div className="campus-card__map">
                    <iframe
                      title={`${c.name}の地図`}
                      src={c.contact.mapEmbedUrl}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
          <p className="campus-contact-shared">
            お問い合わせ：
            <a href={`tel:${SHARED_CONTACT.telHref}`}>TEL {SHARED_CONTACT.tel}</a>
            ／
            <a href={`mailto:${SHARED_CONTACT.email}`}>{SHARED_CONTACT.email}</a>
          </p>
        </div>
      </section>

      {/* ───── 5つの特徴 ───── */}
      <section className="section section--alt">
        <div className="container">
          <p className="eyebrow">FEATURES</p>
          <h2 className="section-title">ペラペラスタジオの5つの特徴</h2>
          <div className="value-grid value-grid--stack">
            {FEATURES.map((f) => (
              <ValueCard key={f.no} no={f.no} title={f.title}>
                <p>{f.text}</p>
              </ValueCard>
            ))}
          </div>
        </div>
      </section>

      <CurriculumExample />

      {/* ───── こんなお子さまにおすすめ ───── */}
      <section className="section section--alt">
        <div className="container container--narrow">
          <p className="eyebrow">FOR YOUR CHILD</p>
          <h2 className="section-title">こんなお子さまにおすすめです</h2>
          <p className="section-lead">
            一つでも当てはまるものがあれば、ぜひお気軽にご相談ください。
          </p>
          <div className="note-box">
            <ul className="plan-card__points">
              {RECOMMEND.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───── 私たちについて プレビュー ───── */}
      <PreviewSection
        eyebrow="ABOUT US"
        title="私たちについて"
        image="/images/company/cover-photo.png"
        side="left"
        to="/about"
        cta="私たちについて"
      >
        子どもたちは一人ひとり違います。だからこそ私たちは、型にはめるのではなく、その子らしさを大切にしながら支援を行っています。
        ペラペラスタジオが大切にしている想いと願いをご紹介します。
      </PreviewSection>

      {/* ───── 児童発達支援 プレビュー ───── */}
      <PreviewSection
        eyebrow="SUPPORT"
        title="児童発達支援"
        image="/images/services/cover-photo.png"
        side="right"
        altBg
        to="/support"
        cta="児童発達支援を見る"
      >
        発達に特性のある未就学のお子さまを対象に、一人ひとりの発達段階に合わせた支援を行います。
        英語・運動・社会性・成功体験を通して、小学校入学に向けた力を育てます。
      </PreviewSection>

      {/* ───── こころの相談室 プレビュー ───── */}
      <PreviewSection
        eyebrow="COUNSELING"
        title="こころの相談室"
        image="/images/services/support.svg"
        side="left"
        to="/counseling"
        cta="こころの相談室を見る"
      >
        ママ、パパ、ご家族のための心のサポートルーム。家族支援カウンセラー・保育士の資格を持つカウンセラーが、
        対面・オンラインで子育ての不安や家族の悩みに寄り添います。ペアレントトレーニング・トライアルカウンセリングも実施中です。
      </PreviewSection>

      {/* ───── 成長事例 プレビュー ───── */}
      <PreviewSection
        eyebrow="CASES"
        title="成長事例"
        image="/images/pricing/cover-photo.png"
        side="right"
        altBg
        to="/cases"
        cta="成長事例を見る"
      >
        パニックが減ってお友だちと遊べるように。ことば・運動・学習が大きく成長。
        ペラペラスタジオに通うお子さまの「できた！」の積み重ねをご紹介します。
      </PreviewSection>

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
              <p>見学・体験のご案内や季節のイベント、休所日のお知らせなど、大切なお知らせをお届けします。</p>
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
          <h2>まずはお気軽に見学へお越しください</h2>
          <p>
            お子さまの様子や保護者の方のお悩みを伺いながら、最適な支援についてご案内いたします。
            見学・体験を随時受け付けています。
          </p>
          <div className="cta-band__actions">
            <Link to="/contact" className="btn btn--primary">
              見学・体験のお問い合わせ
            </Link>
          </div>
        </div>
      </section>

      {modalItem && (
        <ContentDetailModal item={modalItem} onClose={() => setModalItem(null)} />
      )}
    </>
  )
}

function PreviewSection({ eyebrow, title, image, side, to, cta, children, altBg = false }) {
  return (
    <section className={`section${altBg ? ' section--alt' : ''}`}>
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
