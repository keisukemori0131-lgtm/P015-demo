import DocumentMeta from '../components/DocumentMeta.jsx'
import PageHero from '../components/PageHero.jsx'
import ContentListSection from '../components/ContentListSection.jsx'
import { CONTENT_TYPE_FOR } from '../config/upnoteContentTypes.js'
import { EMPTY_MESSAGES } from '../lib/upnote.js'

export default function BlogPage() {
  return (
    <>
      <DocumentMeta />
      <PageHero title="コラム" image="/images/blog/cover.svg" />
      <section className="section">
        <div className="container">
          <p className="eyebrow">COLUMN</p>
          <h2 className="section-title">コラム</h2>
          <p className="section-lead">
            おうちでできる英語あそびのヒントや、バイリンガル教育・イマージョン学習の考え方など、
            子どもの英語に役立つ情報をスクールの視点でお届けします。
          </p>
          <ContentListSection slug={CONTENT_TYPE_FOR.blog} emptyLabel={EMPTY_MESSAGES.columns} />
        </div>
      </section>
    </>
  )
}
