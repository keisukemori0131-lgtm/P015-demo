import { Link } from 'react-router-dom'
import DocumentMeta from '../components/DocumentMeta.jsx'
import PageHero from '../components/PageHero.jsx'
import ValueCard from '../components/ValueCard.jsx'
import { publicUrl } from '../lib/publicUrl.js'

// 成長事例①〜⑤。年齢・特性はチップで表示。
const CASES = [
  {
    no: '01',
    profile: '5歳・自閉スペクトラム症',
    title: 'パニックが減り、お友だちと遊べるようになった男の子',
    image: '/images/cases/case-01.png',
    imageAlt: '公園を歩く男の子の後ろ姿',
    body: '来所当初は、気持ちをうまく伝えることができず、突然大声で叫んだり、泣いたり、走り回ったりすることが頻繁にありました。お友だちと関わることも苦手で、おもちゃを共有することも難しい状態でした。スタッフがマンツーマンで関わりながら、パニックの原因や本人の気持ちを丁寧に理解し、安心して過ごせる環境づくりを続けました。その結果、パニックは大幅に減少し、お友だちとおもちゃを共有したり、一緒に並んで遊んだりできるようになりました。トイレトレーニングにも取り組み、5歳でおむつを卒業することができました。',
  },
  {
    no: '02',
    profile: '5歳・ADHD',
    title: 'ことば・運動・学習の大きな成長',
    image: '/images/cases/case-02.png',
    imageAlt: '公園で積み木遊びをする女の子の後ろ姿',
    body: '来所当初は、日本語での会話が難しく、奇声をあげながら走り回ることが多く見られました。運動面では転びやすく、公園で走ることも苦手でした。小学校入学後は、読み書きや計算にも困難があり、学習面での支援も必要でした。スタッフが継続的に個別支援を行い、運動療育によって体幹や筋力づくりに取り組みました。言語面や学習面についても、一つひとつ丁寧に支援を続けました。現在では会話もスムーズになり、自転車にも挑戦。補助輪なしで一人で乗れるまで成長し、運動・学習・コミュニケーションの各面で大きな進歩が見られています。',
  },
  {
    no: '03',
    profile: '2歳・ASD（自閉スペクトラム症）・ADHD',
    title: '泣いてばかりだった女の子が、お友だちと遊べるように',
    image: '/images/cases/case-03.png',
    imageAlt: '公園の小道を歩く女の子の後ろ姿',
    body: '来所当初は不安が強く、ほとんどの時間を泣いて過ごしていました。活動への参加も難しく、パニックになることも少なくありませんでした。スタッフがマンツーマンで寄り添いながら、安心して過ごせる環境づくりを続けました。最初は他のお子さまとの関わりを拒否していましたが、少しずつ興味を持ち始め、おもちゃを共有して遊べるようになりました。現在では、自分から気の合うお友だちに声をかけたり、一緒に活動したりする姿も見られます。ご家庭で頻繁に見られていた強い癇癪も大きく減少し、今ではさまざまな活動を楽しみながら参加できるようになっています。',
  },
  {
    no: '04',
    profile: '3歳・ADHD',
    title: '泣いていた男の子が「休みたくない」と言うように',
    image: '/images/cases/case-04.png',
    imageAlt: '公園で積み木遊びをする男の子の後ろ姿',
    body: '来所当初は不安が強く、パニックになったり泣いたりすることが頻繁にありました。お母さまと離れることも難しく、お迎えの時間にはしがみついて泣く姿が見られました。また、トイレへの強い不安があり、トイレトレーニングにも苦労していました。スタッフが根気強く声をかけ、一人ひとりのペースに合わせた支援を続けることで、少しずつ安心して活動できるようになりました。現在では母子分離もスムーズになり、トイレトレーニングも成功。「今日は休みたくない」と言うほど、通所を楽しみにしてくれています。',
  },
  {
    no: '05',
    profile: '4歳・自閉スペクトラム症',
    title: '一人で遊んでいた男の子に大切な友だちができました',
    image: '/images/cases/case-05.png',
    imageAlt: '公園で砂場遊びをする男の子の後ろ姿',
    body: '来所当初は表情が少なく、一人で遊ぶことがほとんどでした。怪我をしていなくても指にたくさんの絆創膏を貼り、それを外すことができない状態が続いていました。また偏食が強く、食べられるものが非常に限られていました。スタッフが安心できる環境づくりを行いながら、少しずつ集団活動への参加を促しました。現在では気の合うお友だちができ、毎回一緒に遊ぶ姿が見られます。友だちとのトラブルもほとんどなく、落ち着いて活動に参加しています。偏食も少しずつ改善し、新しいことに挑戦する力が育っています。',
  },
]

export default function CasesPage() {
  return (
    <>
      <DocumentMeta />
      <PageHero title="成長事例" image="/images/pricing/cover.svg" />

      <section className="section">
        <div className="container container--narrow">
          <p className="eyebrow">CASES</p>
          <h2 className="section-title">子どもたちの「できた！」の積み重ね</h2>
          <p className="section-lead">
            ペラペラスタジオに通うお子さまの成長事例をご紹介します。
            一人ひとりのペースに寄り添いながら積み重ねた、小さな成功体験の物語です。
          </p>
          <div className="value-grid value-grid--stack value-grid--stagger value-grid--cases">
            {CASES.map((c) => (
              <ValueCard
                key={c.no}
                no={c.no}
                title={c.title}
                image={c.image ? publicUrl(c.image) : undefined}
                imageAlt={c.imageAlt}
                meta={
                  <p className="case-card__profile">
                    <span className="chip">{c.profile}</span>
                  </p>
                }
              >
                <p>{c.body}</p>
              </ValueCard>
            ))}
          </div>
          <p className="note-box note-box--reveal">
            ※ 成長の様子は一人ひとり異なります。掲載しているのは実際の支援に基づく事例ですが、
            同じ支援がすべてのお子さまに同じ成果をお約束するものではありません。
            また、掲載の児童写真はイメージです。
          </p>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band__inner">
          <h2>お子さまの「できた！」を一緒に</h2>
          <p>気になることがありましたら、まずはお気軽に見学・ご相談ください。</p>
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
