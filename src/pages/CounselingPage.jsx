import { Link } from 'react-router-dom'
import DocumentMeta from '../components/DocumentMeta.jsx'
import PageHero from '../components/PageHero.jsx'
import MemberList from '../components/MemberList.jsx'
import { SHARED_CONTACT } from '../constants/site.js'

// ペラペラ こころの相談室（円山校 カウンセリング部）。チラシより。
const TAGS = ['発達支援', '家族療法', 'チャイルドケア']

const WORRIES = [
  '子どもの発達について相談したい',
  '家族や子どもの関わりに悩んでいる',
  'イライラや不安を誰かに聞いてほしい',
  '子育ての仕方がわからなくて不安、自信がない',
  '誰に相談したらいいか分からない',
  '誰にも知られず相談したい',
  '子どもの将来が不安',
  '仕事と子育ての両立が難しい',
]

const TOPICS = [
  '育児ストレスや不安への対応',
  '子どもの発達や行動についての心配',
  '家族内の人間関係の悩み（夫婦・親子・きょうだい等）',
  '学校や園での困りごと',
]

const SERVICES = [
  { title: '対面・オンラインカウンセリング', text: 'ご来所での対面、またはオンラインでのカウンセリングに対応しています。' },
  { title: '子育てコーチング', text: '具体的な関わり方のアドバイスを通して、日々の子育てをサポートします。' },
  { title: 'ご家族への心理的サポート', text: 'お子さまだけでなく、保護者・ご家族の心にも寄り添います。' },
  { title: 'メンタルケアコーチング', text: '心を落ち着ける方法を一緒に身につけていきます。' },
]

const PARENT_TRAINING = [
  'お子様の困った行動にどうすればいいか',
  '子どもの関わり方のコツ（ほめ方・叱り方）',
  '心の安定を育む関わりの実践方法',
]

export default function CounselingPage() {
  return (
    <>
      <DocumentMeta />
      <PageHero title="こころの相談室" image="/images/about/philosophy.svg" />

      <section className="section">
        <div className="container container--narrow">
          <p className="eyebrow">COUNSELING</p>
          <h2 className="section-title">ママ、パパ、ご家族のための心のサポートルーム</h2>
          <p className="section-lead">
            「ペラペラ こころの相談室」は、ペラペラ ENGLISH BOOT CAMP（円山校）のカウンセリング部です。
            安心して相談できる場所で、子どもと家族の心をサポートします。
          </p>
          <p className="counsel-tags">
            {TAGS.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </p>
          <div className="note-box">
            <p style={{ marginBottom: '0.6rem', fontWeight: 700, color: 'var(--ink)' }}>
              こんなお気持ち・お悩みはありませんか？
            </p>
            <ul className="plan-card__points">
              {WORRIES.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container--narrow">
          <p className="eyebrow">COUNSELOR</p>
          <h2 className="section-title">カウンセラーのご紹介</h2>
          <MemberList limit={5} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card-grid card-grid--2">
            <article className="plan-card">
              <h3 className="plan-card__name">主なご相談内容</h3>
              <ul className="plan-card__points">
                {TOPICS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
            <article className="plan-card">
              <h3 className="plan-card__name">カウンセリング内容</h3>
              <ul className="plan-card__points">
                {SERVICES.map((s) => (
                  <li key={s.title}>
                    <strong>{s.title}</strong>
                    <br />
                    {s.text}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container--narrow">
          <p className="eyebrow">PARENT TRAINING</p>
          <h2 className="section-title">ペアレントトレーニング実施中</h2>
          <p className="section-lead">
            保護者の方が、お子さまとの関わり方を具体的に学べるトレーニングです。
          </p>
          <div className="note-box">
            <ul className="plan-card__points">
              {PARENT_TRAINING.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <p className="section-lead">
            自分自身の心も大切にしながら、お子様の成長を一緒に支えていきましょう。
            <strong>トライアルカウンセリングも実施中</strong>です。
          </p>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band__inner">
          <h2>まずはお気軽にご相談ください</h2>
          <p>
            ペラペラ こころの相談室（ペラペラ ENGLISH BOOT CAMP カウンセリング部）。
            対面・オンラインに対応しています。
          </p>
          <div className="cta-band__actions">
            <a href={`tel:${SHARED_CONTACT.telHref}`} className="btn btn--primary">
              TEL {SHARED_CONTACT.tel}
            </a>
            <Link to="/contact" className="btn btn--ghost">
              フォームでお問い合わせ
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
