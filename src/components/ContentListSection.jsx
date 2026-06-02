import { useRef, useState } from 'react'
import ContentCard from './ContentCard.jsx'
import ContentDetailModal from './ContentDetailModal.jsx'
import Pager from './Pager.jsx'
import { Loading, ErrorMsg, EmptyMsg } from './StateMessage.jsx'
import { useContentList } from '../lib/useUpNote.js'
import { isEnabled } from '../config/upnoteContentTypes.js'

/**
 * 一覧 + ページャ + モーダル詳細（R14）。limit=10 でページング。
 * @param {string} slug contentTypeSlug
 * @param {(item)=>Array} buildSections モーダルの追加セクション生成（任意）
 */
export default function ContentListSection({ slug, emptyLabel, disabledLabel, buildSections }) {
  const [page, setPage] = useState(1)
  const [modalItem, setModalItem] = useState(null)
  const topRef = useRef(null)

  // この顧客の upnote.contents に無い slug は API を送らない（R9）。
  // フックは常に呼ぶ（順序固定）。無効 slug のときは null を渡して fetch をスキップ。
  const enabled = isEnabled(slug)
  const { data, error, loading } = useContentList(enabled ? slug : null, { page, limit: 10 })

  const onChange = (p) => {
    setPage(p)
    if (topRef.current) {
      const y = topRef.current.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  if (!enabled) {
    return <EmptyMsg label={disabledLabel || '現在公開中の情報はありません。'} />
  }

  return (
    <div ref={topRef}>
      {loading && <Loading />}
      {!loading && error && <ErrorMsg />}
      {!loading && !error && data && data.totalCount === 0 && <EmptyMsg label={emptyLabel} />}
      {!loading && !error && data && data.items.length > 0 && (
        <>
          <div className="card-grid">
            {data.items.map((item) => (
              <ContentCard key={item.id} item={item} onOpen={setModalItem} />
            ))}
          </div>
          <Pager current={data.page} totalPages={data.totalPages} onChange={onChange} />
        </>
      )}

      {modalItem && (
        <ContentDetailModal
          item={modalItem}
          sections={buildSections ? buildSections(modalItem) : []}
          onClose={() => setModalItem(null)}
        />
      )}
    </div>
  )
}
