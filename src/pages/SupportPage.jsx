import { Link } from 'react-router-dom'
import DocumentMeta from '../components/DocumentMeta.jsx'
import PageHero from '../components/PageHero.jsx'
import FaqList from '../components/FaqList.jsx'

// 児童発達支援（・放課後等デイサービス）。
const SIGNS = [
  '落ち着いて座ることが難しい',
  '集団活動が苦手',
  '言葉の発達がゆっくり',
  'お友だちとの関わりが苦手',
  '切り替えに時間がかかる',
  '感覚の過敏さがある',
  '初めての場所や活動が苦手',
  '就学に向けて準備をしたい',
]

const PILLARS = [
  {
    title: '英語に親しむ',
    text: '外国人スタッフと一緒に活動しながら、自然な形で英語に触れます。英語を勉強としてではなく、遊びやコミュニケーションの中で経験していきます。',
  },
  {
    title: '身体を育てる',
    text: '走る、跳ぶ、投げる、バランスを取る。子どもたちにとって身体を動かすことは発達の基礎です。楽しく身体を使いながら、集中力や協調性も育てていきます。',
  },
  {
    title: '社会性を育てる',
    text: '順番を待つ。相手の話を聞く。気持ちを伝える。お友だちと協力する。将来につながる社会性を、日々の活動の中で学びます。',
  },
  {
    title: '成功体験を増やす',
    text: '私たちが大切にしているのは「できた！」という気持ちです。小さな成功体験の積み重ねが、自己肯定感につながります。',
  },
]

const SCHOOL_READY = [
  '話を聞く力',
  '集団で活動する力',
  '自分の気持ちを伝える力',
  '生活習慣',
  '学習の土台づくり',
]

export default function SupportPage() {
  return (
    <>
      <DocumentMeta />
      <PageHero title="児童発達支援・放課後等デイサービス" image="/images/services/cover.svg" />

      <section className="section">
        <div className="container container--narrow">
          <p className="eyebrow">SUPPORT</p>
          <h2 className="section-title">小学校へ向かう大切な準備期間</h2>
          <p className="section-lead">
            児童発達支援は、発達に特性のある未就学のお子さまを対象とした福祉サービスです。
            ペラペラスタジオでは、2歳頃から就学前までのお子さまを対象に、一人ひとりの発達段階に合わせた支援を行っています。
            私たちは「できないこと」に注目するのではなく、「できるようになる力」を育てることを大切にしています。
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
        <div className="container">
          <p className="eyebrow">PROGRAM</p>
          <h2 className="section-title">ペラペラスタジオの児童発達支援</h2>
          <p className="section-lead">
            英語・運動・社会性・成功体験。4つの柱を通して、お子さま一人ひとりの「できるようになる力」を育てます。
          </p>
          <div className="pillar-grid">
            {PILLARS.map((p) => (
              <article key={p.title} className="pillar-card">
                <h3 className="pillar-card__title">{p.title}</h3>
                <p className="pillar-card__text">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container--narrow">
          <p className="eyebrow">FOR PARENTS</p>
          <h2 className="section-title">保護者の皆さまへ</h2>
          <p className="section-lead">
            初めて相談するとき、「うちの子は利用できるのかな」「まだ小さいのに相談していいのかな」と悩まれる方も少なくありません。
            しかし早い時期から適切な支援を受けることで、お子さまの可能性は大きく広がります。
            まずは見学や体験利用から始めてみませんか。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <p className="eyebrow">SCHOOL READY</p>
          <h2 className="section-title">小学校入学に向けて</h2>
          <p className="section-lead">
            私たちは就学後を見据えた支援を行っています。小学校での生活につながる力を、少しずつ育てていきます。
          </p>
          <div className="note-box">
            <ul className="plan-card__points">
              {SCHOOL_READY.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container--narrow">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title">よくあるご質問</h2>
          <p className="section-lead">
            見学・体験、対象年齢、送迎など、よくいただくご質問をまとめました。ほかにご不明点があればお気軽にお問い合わせください。
          </p>
          <FaqList />
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band__inner">
          <h2>見学・体験受付中</h2>
          <p>
            お子さまの発達や成長について気になることがありましたら、お気軽にご相談ください。
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
