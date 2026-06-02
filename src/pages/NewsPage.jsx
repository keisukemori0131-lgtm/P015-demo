import DocumentMeta from '../components/DocumentMeta.jsx'
import PageHero from '../components/PageHero.jsx'
import ContentListSection from '../components/ContentListSection.jsx'
import { CONTENT_TYPE_FOR } from '../config/upnoteContentTypes.js'
import { EMPTY_MESSAGES } from '../lib/upnote.js'

export default function NewsPage() {
  return (
    <>
      <DocumentMeta />
      <PageHero title="お知らせ" image="/images/news/cover.svg" />
      <section className="section">
        <div className="container container--narrow">
          <p className="eyebrow">NEWS</p>
          <h2 className="section-title">お知らせ</h2>
          <p className="section-lead">
            体験レッスンや季節のイベント、休講・スケジュールの変更など、スクールからの大切なお知らせをお届けします。
            カードを押すと詳しい内容をご覧いただけます。
          </p>
          <ContentListSection slug={CONTENT_TYPE_FOR.news} emptyLabel={EMPTY_MESSAGES.news} />
        </div>
      </section>
    </>
  )
}
