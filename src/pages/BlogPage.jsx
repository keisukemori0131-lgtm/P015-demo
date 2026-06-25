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
            児童発達支援・放課後等デイサービスや、英語・運動を通した子育てのヒントなど、
            子どもたちの成長に役立つ情報をペラペラスタジオの視点でお届けします。
          </p>
          <ContentListSection slug={CONTENT_TYPE_FOR.blog} emptyLabel={EMPTY_MESSAGES.columns} />
        </div>
      </section>
    </>
  )
}
