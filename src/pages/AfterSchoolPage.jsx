import { Link } from 'react-router-dom'
import DocumentMeta from '../components/DocumentMeta.jsx'
import PageHero from '../components/PageHero.jsx'

// 放課後等デイサービス（小学生〜高校生）。
const SIGNS = [
  '学校生活に疲れやすい',
  '友だちとの関わりに悩んでいる',
  '集中が続かない',
  '運動に苦手意識がある',
  '勉強に自信が持てない',
  '自己肯定感が低い',
  '好きなこと・得意なことを見つけたい',
  '将来に向けて自信を育てたい',
]

const PILLARS = [
  {
    title: '得意を見つける',
    paragraphs: [
      '一人ひとりの興味や個性を大切にし、「好き」を将来の力へ育てます。',
      '子どもたちの「好き」は、将来の可能性につながる大切な芽です。',
      'ペラペラスタジオでは、英語だけでなく、医学・生物・化学などの身近な科学の世界にも楽しく触れながら、「どうして？」「もっと知りたい！」という知的好奇心を育てています。',
      '人体のしくみや栄養、動物や植物、自然現象など、子どもたちが興味を持ちやすいテーマを取り入れ、一人ひとりの「好き」や「得意」を広げていきます。',
      '知ることの楽しさを積み重ねることで、自分から学び、自分で考える力を育み、未来へつながる可能性を広げていきます。',
    ],
  },
  {
    title: '身体を育てる',
    paragraphs: [
      '運動療育やPTサポートを取り入れ、体幹・バランス・身体の使い方を楽しく学びます。',
    ],
  },
  {
    title: '社会性を育てる',
    paragraphs: [
      '友だちとの関わりや協力する力、自分の気持ちを伝える力など、社会で必要な力を育てます。',
    ],
  },
]

const GROWTH_MOMENTS = [
  '昨日より少し話せた。',
  '初めて最後まで挑戦できた。',
  '友だちに「ありがとう」が言えた。',
]

export default function AfterSchoolPage() {
  return (
    <>
      <DocumentMeta />
      <PageHero title="放課後等デイサービス" image="/images/services/cover.svg" />

      <section className="section">
        <div className="container container--narrow">
          <p className="eyebrow">AFTER SCHOOL</p>
          <h2 className="section-title">学校生活をもっと楽しく、自分らしく</h2>
          <p className="section-lead">
            発達に特性のある小学生から高校生までのお子さまを対象に、一人ひとりの「好き」や「得意」を大切にした支援を行います。英語・運動・知育を通して、自信と社会性を育み、未来へ向かう力を伸ばします。
          </p>
          <p className="section-lead">
            放課後等デイサービスは、小学生から高校生までの発達に特性のある子どもたちが、学校生活や日常生活で必要な力を身につけ、自分らしく成長していくための福祉サービスです。
          </p>
          <p className="section-lead">
            ペラペラスタジオでは、英語・運動・知育・コミュニケーションを組み合わせながら、一人ひとりの得意なことを伸ばし、自信につながる成功体験を大切にしています。
          </p>
          <p className="section-lead">
            私たちが目指しているのは、「支援を受ける場所」ではなく、「自分の可能性を広げる場所」です。
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container--narrow">
          <p className="eyebrow">CHECK</p>
          <h2 className="section-title">こんなお子さまはいませんか？</h2>
          <div className="note-box">
            <ul className="plan-card__points">
              {SIGNS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <p className="section-lead">一つでも当てはまる場合は、お気軽にご相談ください。</p>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <p className="eyebrow">PROGRAM</p>
          <h2 className="section-title">ペラペラスタジオの放課後等デイサービス</h2>
          <p className="section-lead">
            英語で世界を広げる、イマージョンスタイルで知性を伸ばします。
            外国人スタッフとの自然なコミュニケーションを通して、生きた英語に親しみます。
          </p>
          <div className="pillar-grid pillar-grid--after-school">
            {PILLARS.map((p) => (
              <article
                key={p.title}
                className={`pillar-card${p.title === '得意を見つける' ? ' pillar-card--wide' : ''}`}
              >
                <h3 className="pillar-card__title">{p.title}</h3>
                {p.paragraphs.map((para) => (
                  <p key={para} className="pillar-card__text">
                    {para}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container--narrow">
          <p className="eyebrow">GROWTH</p>
          <h2 className="section-title">「できた！」を積み重ねる</h2>
          <p className="section-lead">
            学校では見えにくい小さな成長も、私たちは大切にしています。
          </p>
          <div className="note-box">
            <ul className="plan-card__points">
              {GROWTH_MOMENTS.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
          <p className="section-lead">その一つひとつが、自信となり、未来につながっていきます。</p>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <p className="eyebrow">FUTURE</p>
          <h2 className="section-title">将来を見据えた支援</h2>
          <p className="section-lead">
            私たちは、目の前の困りごとだけを解決するのではなく、その先の人生を見据えています。
          </p>
          <p className="section-lead">
            子どもたちが、自分で考え、自分で選び、自分らしく生きていける力を育てること。
          </p>
          <p className="section-lead">それがペラペラスタジオの放課後等デイサービスです。</p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container--narrow">
          <p className="eyebrow">FOR PARENTS</p>
          <h2 className="section-title">保護者の皆さまへ</h2>
          <p className="section-lead">
            学校生活の悩みや家庭での困りごと、お子さまの将来について、一緒に考えていきます。
          </p>
          <p className="section-lead">
            「今、何を伸ばせば、この子はもっと自信を持てるのか。」
          </p>
          <p className="section-lead">
            保護者の皆さまと情報を共有しながら、一人ひとりに合った支援を行っています。
          </p>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band__inner">
          <h2>見学・体験受付中</h2>
          <p>
            お子さまの学校生活や将来について気になることがありましたら、お気軽にご相談ください。
            見学や体験利用は随時受け付けています。
          </p>
          <div className="cta-band__actions">
            <Link to="/contact" className="btn btn--primary">
              見学・体験のお問い合わせ
            </Link>
            <Link to="/cases" className="btn btn--ghost">
              成長事例を見る
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
