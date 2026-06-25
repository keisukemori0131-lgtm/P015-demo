import { Link } from 'react-router-dom'
import DocumentMeta from '../components/DocumentMeta.jsx'
import PageHero from '../components/PageHero.jsx'
import ValueCard from '../components/ValueCard.jsx'
import { PROMISES } from '../constants/site.js'

// 私たちについて（理念）+ 私たちの願い + 私たちの約束（2026）。
const BELIEFS = [
  {
    title: '「できた！」が自信になる',
    body: '英語であいさつができた。お友だちと一緒に遊べた。最後まで活動に参加できた。新しいことに挑戦できた。子どもたちは成功体験を積み重ねることで、自信を育てていきます。小さな「できた！」の積み重ねが、将来の大きな力になります。私たちは、その一歩一歩を大切にしています。',
  },
  {
    title: '英語という大きな贈り物',
    body: 'ペラペラスタジオでは、外国人スタッフと一緒に活動する機会を大切にしています。英語を教科として学ぶのではなく、日常のコミュニケーションの中で自然に触れていきます。子どもたちは驚くほど柔軟に言葉を吸収します。幼い頃から英語に親しむことで、将来の選択肢を広げ、世界とつながるための大切なツールを手にします。',
  },
  {
    title: '身体を動かすことも療育です',
    body: '私たちは運動療育にも力を入れています。走る、跳ぶ、投げる、バランスをとる。身体を動かす経験は、集中力や自己調整力、社会性の発達にもつながります。子どもたちが楽しみながら身体を使うことで、自信と達成感を育てていきます。',
  },
  {
    title: '保護者とともに歩む',
    body: '療育は施設だけで完結するものではありません。私たちは保護者の皆さまと情報を共有しながら、お子さまの成長を一緒に支えていきたいと考えています。悩みや不安を抱えることは決して特別なことではありません。どんな小さなことでも相談できる場所でありたいと願っています。',
  },
]

const WISH_HIGHLIGHTS = [
  { label: '好きなこと', text: 'は自信につながり' },
  { label: '得意なこと', text: 'は将来の力になります' },
  { label: '夢中になれること', text: 'を見つけることから始まります' },
]

export default function AboutPage() {
  return (
    <>
      <DocumentMeta />
      <PageHero title="私たちについて" image="/images/company/cover.svg" />

      <section className="section">
        <div className="container container--narrow">
          <p className="eyebrow">ABOUT US</p>
          <h2 className="section-title">子どもたちの未来のために</h2>
          <p className="section-lead">
            私たちは、子どもたちが大きく成長していく姿を見守ることのできる仕事に、大きな喜びと責任を感じています。
            子どもたちは一人ひとり違います。得意なことも、苦手なことも、成長のスピードも違います。
            だからこそ私たちは、子どもたちを型にはめるのではなく、その子らしさを大切にしながら支援を行っています。
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container--narrow">
          <p className="eyebrow">OUR BELIEF</p>
          <h2 className="section-title">私たちが大切にしていること</h2>
          <div className="belief-grid belief-grid--stack">
            {BELIEFS.map((b) => (
              <article key={b.title} className="belief-card">
                <h3 className="belief-card__title">{b.title}</h3>
                <p className="belief-card__text">{b.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <p className="eyebrow">OUR WISH</p>
          <h2 className="section-title">私たちの願い</h2>

          <div className="wish-flow">
            <p className="wish-flow__intro">
              私たちの支援は、<strong>「できないこと」</strong>を探すためのものではありません。
              子どもたちの中にある可能性を見つけることから始まります。
            </p>

            <ul className="wish-flow__highlights" aria-label="大切にしていること">
              {WISH_HIGHLIGHTS.map((h) => (
                <li key={h.label}>
                  <span className="wish-flow__chip">{h.label}</span>
                  <span>{h.text}</span>
                </li>
              ))}
            </ul>

            <blockquote className="wish-flow__quote">
              <p>
                子どもたちが大人になったとき、自分らしく働き、自分らしく学び、自分らしく生きていけること。
                それが私たちの願いです。
              </p>
            </blockquote>

            <div className="wish-flow__body">
              <p>
                英語も、運動も、学習も、そのための手段です。人生には困ったことや苦しいこともあります。
                そんな時、「助けてくれる人がいる」と信じられること。人を信じ、感謝し、思いやりを持つ心も、
                日々の活動の中で大切に育てていきます。
              </p>
            </div>

            <div className="wish-flow__closing">
              <p>
                私たちは、子どもたちに完璧を求めません。一人ひとりが好きなことを見つけ、得意なことを伸ばし、
                自分らしく成長していくこと。そして「自分は大丈夫」と胸を張って未来へ歩いていけること。
                それが私たちの目指す支援です。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container--narrow">
          <p className="eyebrow">OUR PROMISE</p>
          <h2 className="section-title">私たちの約束</h2>
          <p className="section-lead">
            好きが見つかる。得意が育つ。未来が広がる。英語・運動・コミュニケーションを通して、
            子どもたち一人ひとりの可能性を育てるための、4つの約束です。
          </p>
          <div className="value-grid value-grid--stack">
            {PROMISES.map((p) => (
              <ValueCard key={p.no} no={p.no} title={p.title}>
                <p>{p.text}</p>
              </ValueCard>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band__inner">
          <h2>子どもたちの可能性を、一緒に育てませんか</h2>
          <p>見学・体験を随時受け付けています。お子さまの様子を一緒に見守りながらご案内します。</p>
          <div className="cta-band__actions">
            <Link to="/contact" className="btn btn--primary">
              見学・体験のお問い合わせ
            </Link>
            <Link to="/support" className="btn btn--ghost">
              児童発達支援を見る
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
