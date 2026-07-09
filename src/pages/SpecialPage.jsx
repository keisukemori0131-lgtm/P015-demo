import { Link } from 'react-router-dom'
import DocumentMeta from '../components/DocumentMeta.jsx'
import PageHero from '../components/PageHero.jsx'

const MEDICAL_QUESTIONS = [
  'どうして心臓は動いているの？',
  '骨はどうして折れるの？',
  '筋肉はどうやって力を出すの？',
  '食べたものはどこへ行くの？',
]

const FOOD_EXAMPLES = [
  'お肉は筋肉をつくるよ。',
  '牛乳や小魚は骨を丈夫にするよ。',
  '野菜には体を守る力があるよ。',
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
            ペラペラのスペシャルブランド。専門家と連携した、ペラペラスタジオならではの独自の取り組みです。
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container--narrow">
          <p className="eyebrow">MEDICAL LESSON</p>
          <h2 className="section-title">Medical Lesson（メディカルレッスン）</h2>
          <p className="special-lead">「どうして？」が「もっと知りたい！」に変わる。</p>

          <div className="special-content">
            <p>子どもたちは、生まれながらに強い好奇心を持っています。</p>

            <ul className="special-questions">
              {MEDICAL_QUESTIONS.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>

            <p>そんな「どうして？」は、学びの入り口です。</p>
            <p>
              ペラペラスタジオでは、本物の医学や生物学に触れながら、自分の身体の仕組みや命の不思議を楽しく学びます。
            </p>

            <h3 className="special-content__heading">自分の身体を知ることは、自分を大切にすること。</h3>
            <p>
              私たちは、身体の仕組みを知ることが、自分自身を大切にする心につながると考えています。
            </p>
            <p>例えば、偏食のあるお子さまには、</p>

            <ul className="special-examples">
              {FOOD_EXAMPLES.map((ex) => (
                <li key={ex}>{ex}</li>
              ))}
            </ul>

            <p>というように、医学的な知識を伝えます。</p>
            <p className="special-emphasis">
              「食べなさい」ではなく、「食べる理由」を理解することを大切にしています。
            </p>

            <p>
              ペラペラスタジオでは、医師や生物学教授など、専門家の協力を受けながら、医学を子どもたちに伝えています。
            </p>
            <p>
              医学の世界が、子どもたちの「大好きなこと」のひとつになりますようにと願いながら。
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <p className="eyebrow">PT SUPPORT</p>
          <h2 className="section-title">PTサポート</h2>
          <p className="special-lead">身体づくりから、未来を育てる。</p>

          <div className="special-content">
            <p>身体を動かすことは、子どもの発達に欠かせません。</p>
            <p>
              ペラペラスタジオでは、理学療法士が、子どもたちの身体チェックを行い、データ化しています。
            </p>
            <p>
              身体の使い方や姿勢、バランス感覚などを育てる活動も、これらのデータを元に、ひとりひとりに最適の環境作りをしています。
            </p>
            <p>
              運動が苦手なお子さまには安心して取り組める環境を、運動が得意なお子さまにはさらに力を伸ばせる機会を提供します。
            </p>
          </div>
        </div>
      </section>

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
