import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Loading, ErrorMsg, EmptyMsg } from './StateMessage.jsx'
import { useContentList } from '../lib/useUpNote.js'
import { isEnabled, CONTENT_TYPE_FOR } from '../config/upnoteContentTypes.js'
import { getContentTitle, getContentBody } from '../lib/upnoteContent.js'
import { buildFaqPage } from '../lib/structuredData.js'
import { EMPTY_MESSAGES } from '../lib/upnote.js'

// よくあるご質問のアコーディオン + FAQPage 構造化データ
export default function FaqList() {
  const slug = CONTENT_TYPE_FOR.faq
  const enabled = isEnabled(slug)
  const { data, error, loading } = useContentList(enabled ? slug : null, { page: 1, limit: 10 })
  const [open, setOpen] = useState(null)

  if (!enabled) return <EmptyMsg label="よくあるご質問は現在準備中です。" />
  if (loading) return <Loading />
  if (error) return <ErrorMsg />
  if (!data || data.totalCount === 0) return <EmptyMsg label={EMPTY_MESSAGES.faq} />

  const faqLd = buildFaqPage(
    data.items,
    (item) => item?.data?.question || getContentTitle(item),
    getContentBody,
  )

  return (
    <>
      {faqLd && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        </Helmet>
      )}
      <div className="faq">
        {data.items.map((item, i) => {
          const q = item?.data?.question || getContentTitle(item)
          const a = getContentBody(item)
          const isOpen = open === i
          return (
            <div key={item.id} className={`faq-item${isOpen ? ' is-open' : ''}`}>
              <button
                type="button"
                className="faq-item__q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="faq-item__mark" aria-hidden="true">
                  Q
                </span>
                <span className="faq-item__qtext">{q}</span>
                <span className="faq-item__toggle" aria-hidden="true">
                  {isOpen ? '−' : '＋'}
                </span>
              </button>
              {isOpen && (
                <div className="faq-item__a">
                  <span className="faq-item__mark faq-item__mark--a" aria-hidden="true">
                    A
                  </span>
                  <div className="faq-item__atext" dangerouslySetInnerHTML={{ __html: a }} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
