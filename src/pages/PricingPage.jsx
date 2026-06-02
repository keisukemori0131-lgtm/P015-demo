import { Link } from 'react-router-dom'
import DocumentMeta from '../components/DocumentMeta.jsx'
import PageHero from '../components/PageHero.jsx'
import { SITE } from '../constants/site.js'

// ※ 料金（金額）は顧客YAML・既存サイトに記載が無いため創作しない（R2）。
//   コース構成と「含まれる内容」を提示し、金額はお問い合わせ・体験時の案内へ誘導する。
const COURSES = [
  {
    name: 'キッズイマージョンクラス',
    target: '2歳〜未就学・小学生',
    points: [
      '少人数制のグループレッスン',
      '英語だけの環境（日本語禁止）',
      '多分野を英語で学ぶイマージョン',
    ],
  },
  {
    name: 'プライベートレッスン',
    target: 'マンツーマンで学びたいお子さま',
    points: [
      '一人ひとりに合わせた完全個別指導',
      '発達特性に配慮したペース調整',
      '苦手・得意に合わせたカリキュラム',
    ],
  },
  {
    name: 'ドクター専門レッスン',
    target: '探究心を深めたいお子さま',
    points: [
      '現役ドクターによる専門分野レッスン',
      '本物の知識を英語で学ぶ',
      'サイエンス・健康などのテーマ',
    ],
  },
]

const FLOW = [
  { no: '01', title: 'お問い合わせ・体験予約', text: 'フォームまたはお電話で、体験レッスンをお申し込みください。' },
  { no: '02', title: '体験レッスン', text: '実際のレッスンを体験。お子さまの様子を一緒に見守ります。' },
  { no: '03', title: 'カウンセリング', text: 'お子さまの年齢やご希望に合わせて、最適なコースをご提案します。' },
  { no: '04', title: 'ご入会・レッスン開始', text: '英語だけの世界へ、いよいよスタート。一緒に成長を見守ります。' },
]

export default function PricingPage() {
  return (
    <>
      <DocumentMeta />
      <PageHero title="料金・コース" image="/images/pricing/cover.svg" />

      <section className="section">
        <div className="container">
          <p className="eyebrow">COURSE</p>
          <h2 className="section-title">年齢・目的に合わせて選べるコース</h2>
          <p className="section-lead">
            お子さまの年齢やご希望に合わせて、複数のコースをご用意しています。
            料金はクラス形態・回数によって異なるため、体験レッスンやお問い合わせの際に、
            お子さまに合った内容と合わせてご案内いたします。
          </p>

          <div className="card-grid card-grid--3">
            {COURSES.map((c) => (
              <article key={c.name} className="plan-card">
                <h3 className="plan-card__name">{c.name}</h3>
                <p className="plan-card__target">{c.target}</p>
                <ul className="plan-card__points">
                  {c.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <Link to="/contact" className="btn btn--outline btn--block">
                  料金を問い合わせる
                </Link>
              </article>
            ))}
          </div>

          <p className="note-box">
            ※ 上記は代表的なコースです。月謝・入会金などの詳細は、お子さまの年齢やご希望のレッスン回数に応じてご案内します。
            まずは体験レッスンで、レッスンの雰囲気を確かめてください。
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <p className="eyebrow">FLOW</p>
          <h2 className="section-title">体験レッスンから入会までの流れ</h2>
          <ol className="flow-steps">
            {FLOW.map((s) => (
              <li key={s.no} className="flow-step">
                <span className="flow-step__no">{s.no}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band__inner">
          <h2>料金・コースのご相談はお気軽に</h2>
          <p>お子さまにぴったりのコースを、一緒に考えさせてください。</p>
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
    </>
  )
}
