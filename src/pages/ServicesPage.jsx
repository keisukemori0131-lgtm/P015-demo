import { Link } from 'react-router-dom'
import DocumentMeta from '../components/DocumentMeta.jsx'
import PageHero from '../components/PageHero.jsx'
import FaqList from '../components/FaqList.jsx'
import { publicUrl } from '../lib/publicUrl.js'
import { SITE } from '../constants/site.js'

const PROGRAMS = [
  {
    image: '/images/services/immersion.svg',
    title: 'イマージョンレッスン',
    text: '算数・サイエンス・アートなど、さまざまな分野を「英語で」学ぶ没入型レッスン。英語を覚えるのではなく、英語を使って世界を広げます。',
  },
  {
    image: '/images/services/doctor.svg',
    title: '現役ドクターによる専門レッスン',
    text: '現役のドクターが専門分野を英語で教える特別レッスン。本物の知識と表現にふれ、「もっと知りたい」という探究心を英語で育てます。',
  },
  {
    image: '/images/services/smallgroup.svg',
    title: '少人数制クラス',
    text: '少人数だからこそ、一人ひとりが英語を話す時間がたっぷり。先生がそれぞれの理解度を見ながら、ていねいに声かけをします。',
  },
  {
    image: '/images/services/support.svg',
    title: '発達特性に寄り添う指導',
    text: 'ADHD・ASD など、お子さまの発達の特性に配慮したレッスンにも対応。一人ひとりのペースを大切に、安心して学べる環境を整えます。',
  },
]

const OWND_FEATURES = [
  '少人数制だから、インプットとアウトプットを同時に進めやすい環境',
  '現役ドクターによるメディカルレッスンで探究心を育む学び',
  'ADHD・ASD など発達特性にも配慮し、個性を尊重したレッスン',
  '英語で学ぶイマージョンスタイルで、自然に英語を使う力を育成',
  'サイエンス・マス・多言語・プログラミングなど多彩な学習機会',
]

export default function ServicesPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`

  return (
    <>
      <DocumentMeta />
      <PageHero title="スクール紹介" image="/images/services/cover.svg" />

      <section className="section">
        <div className="container">
          <p className="eyebrow">SCHOOL</p>
          <h2 className="section-title">英語を「学ぶ」から「英語で学ぶ」へ</h2>
          <p className="section-lead">
            ペラペラキッズカレッジ札幌では、スクール内では日本語を使いません。
            英語に囲まれた環境の中で、聞く・話す・考えるを自然にくり返し、
            小学校入学前からバイリンガルの土台を育てます。
          </p>

          <div className="card-grid card-grid--2">
            {PROGRAMS.map((p) => (
              <article key={p.title} className="feature-card">
                <div className="feature-card__media">
                  <img
                    src={publicUrl(p.image)}
                    alt={`${p.title}のイメージ`}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="feature-card__body">
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 公式サイト掲載内容の要約 */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">PROGRAM DETAIL</p>
          <h2 className="section-title">スクール情報</h2>
          <p className="section-lead">
            2歳からのこども英会話として、幼児期の「自分で考える力」を育むことを大切にしています。
            少人数制の環境で、一人ひとりの個性と成長に寄り添ったレッスンを行います。
          </p>

          <div className="note-box">
            <h3>レッスンの特徴</h3>
            <ul className="plan-card__points">
              {OWND_FEATURES.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="card-grid card-grid--2">
            <article className="plan-card">
              <h3 className="plan-card__name">授業時間（月〜金）</h3>
              <ul className="plan-card__points">
                <li>9:00-12:00 メディカルレッスン（現役ドクター担当）</li>
                <li>12:00-13:00 ランチ</li>
                <li>13:00-14:00 公園で外遊び</li>
                <li>14:00-16:30 各専門の外国人講師によるレッスン</li>
              </ul>
              <p className="plan-card__target">※ 14:00以降は曜日ごとに内容が変わります。</p>
            </article>

            <article className="plan-card">
              <h3 className="plan-card__name">募集要項（目安）</h3>
              <ul className="plan-card__points">
                <li>対象年齢: 2歳〜5歳</li>
                <li>募集人数: 限定5名</li>
                <li>入会金: 31,000円</li>
                <li>月謝: 55,000円〜</li>
                <li>1日参加: 12,000円〜</li>
              </ul>
              <p className="plan-card__target">最新情報はお問い合わせ時にご確認ください。</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="access">
        <div className="container">
          <p className="eyebrow">ACCESS</p>
          <h2 className="section-title">アクセス</h2>
          <div className="access">
            <div className="access__info">
              <dl className="access__dl">
                <div>
                  <dt>スクール名</dt>
                  <dd>{SITE.name}</dd>
                </div>
                <div>
                  <dt>所在地</dt>
                  <dd>{SITE.address}</dd>
                </div>
                <div>
                  <dt>お電話</dt>
                  <dd>
                    <a href={`tel:${SITE.telHref}`}>{SITE.tel}</a>
                  </dd>
                </div>
              </dl>
              <img
                className="access__deco"
                src={publicUrl('/images/access/map-deco.svg')}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="access__map">
              <iframe
                title={`${SITE.name}の地図`}
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* よくあるご質問（UpNote faq） */}
      <section className="section">
        <div className="container container--narrow">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title">よくあるご質問</h2>
          <p className="section-lead">
            入会前によくいただくご質問をまとめました。ここにないご質問は、お気軽にお問い合わせください。
          </p>
          <FaqList />
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band__inner">
          <h2>まずは体験レッスンへ</h2>
          <p>英語だけの世界を、お子さまと一緒に体験してみませんか。</p>
          <div className="cta-band__actions">
            <Link to="/contact" className="btn btn--primary">
              体験・お問い合わせ
            </Link>
            <Link to="/pricing" className="btn btn--ghost">
              料金・コースを見る
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
