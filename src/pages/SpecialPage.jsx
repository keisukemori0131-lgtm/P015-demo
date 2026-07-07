import { Link } from 'react-router-dom'
import DocumentMeta from '../components/DocumentMeta.jsx'
import PageHero from '../components/PageHero.jsx'

// 独自の取り組み（ペラペラスペシャル）。具体的な内容は未定のため準備中として掲載。
const SPECIALS = [
  {
    no: '01',
    eyebrow: 'MEDICAL LESSON',
    title: '専門家によるメディカルレッスン',
    text: '専門家と連携した、ペラペラスタジオならではのメディカルレッスンを準備しています。具体的な内容は現在調整中です。詳細が決まり次第、こちらでご案内いたします。',
  },
  {
    no: '02',
    eyebrow: 'BODY ANALYSIS',
    title: 'PT（理学療法士）による体の分析',
    text: '理学療法士（PT）による身体の分析を取り入れた支援を検討しています。具体的な内容は現在調整中です。詳細が決まり次第、こちらでご案内いたします。',
  },
]

export default function SpecialPage() {
  return (
    <>
      <DocumentMeta />
      <PageHero title="独自の取り組み（ペラペラスペシャル）" image="/images/services/cover.svg" />

      <section className="section special-intro">
        <div className="container container--narrow">
          <div className="special-brand">
            <span className="special-brand__label">独自の取り組み</span>
            <p className="special-brand__name">
              ペラペラ<span className="special-brand__accent">スペシャル</span>
            </p>
            <p className="special-brand__en">PERAPERA SPECIAL</p>
          </div>
          <p className="section-lead special-intro__lead">
            ペラペラスタジオならではの、専門家と連携した独自の取り組みです。
            現在、具体的な内容を調整中です。準備が整い次第、こちらでご案内いたします。
          </p>
        </div>
      </section>

      {SPECIALS.map((item, i) => (
        <section key={item.no} className={`section${i % 2 === 0 ? ' section--alt' : ''}`}>
          <div className="container container--narrow">
            <p className="eyebrow">{item.eyebrow}</p>
            <h2 className="section-title">
              {item.no}. {item.title}
            </h2>
            <div className="note-box">
              <p className="special-status">
                <span className="chip">準備中</span>
              </p>
              <p>{item.text}</p>
            </div>
          </div>
        </section>
      ))}

      <section className="cta-band">
        <div className="container cta-band__inner">
          <h2>見学・体験受付中</h2>
          <p>独自の取り組みについてのご質問も、お気軽にお問い合わせください。</p>
          <div className="cta-band__actions">
            <Link to="/contact" className="btn btn--primary">
              見学・体験のお問い合わせ
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
