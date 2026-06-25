import { CURRICULUM } from '../constants/site.js'

// カリキュラムの一例（未就学児・Lesson Plan Timeline より）。
export default function CurriculumExample() {
  const { target, duration, programs, dayFlow, timeline, aims, materials } = CURRICULUM

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">CURRICULUM</p>
        <h2 className="section-title">カリキュラムの一例</h2>
        <p className="section-lead curriculum__lead">
          {target}向け（{duration}）の一日の流れです。円山校・宮の森校で、英語・運動・遊びを組み合わせた療育プログラムを行っています。
        </p>
        <p className="curriculum__programs">
          {programs.map((p) => (
            <span key={p} className="chip">
              {p}
            </span>
          ))}
        </p>

        <div className="curriculum__layout">
          <div className="curriculum__flow">
            <h3 className="curriculum__subheading">未就学児の一日の流れ</h3>
            <ol className="curriculum-dayflow">
              {dayFlow.map((item) => (
                <li key={`${item.time}-${item.title}`} className={`curriculum-dayflow__item curriculum-dayflow__item--${item.tone}`}>
                  <span className="curriculum-dayflow__time">{item.time}</span>
                  <span className="curriculum-dayflow__title">{item.title}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="curriculum__goals">
            <h3 className="curriculum__subheading">療育レッスンの目的</h3>
            <dl className="curriculum-goals">
              <div className="curriculum-goals__row">
                <dt>主目標</dt>
                <dd>{aims.main}</dd>
              </div>
              <div className="curriculum-goals__row">
                <dt>副目標</dt>
                <dd>
                  <ul>
                    {aims.sub.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="curriculum-goals__row">
                <dt>使用教材</dt>
                <dd>
                  <p>
                    <strong>語彙：</strong>
                    {materials.vocab}
                  </p>
                  <p>
                    <strong>文法：</strong>
                    {materials.grammar}
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <h3 className="curriculum__subheading curriculum__subheading--center">時間割の詳細</h3>
        <div className="curriculum-timeline">
          {timeline.map((item) => (
            <article key={`${item.time}-${item.title}`} className={`curriculum-timeline__item curriculum-timeline__item--${item.tone}`}>
              <div className="curriculum-timeline__time">{item.time}〜</div>
              <div className="curriculum-timeline__body">
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
