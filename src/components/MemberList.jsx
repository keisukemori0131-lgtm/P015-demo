import { Loading, ErrorMsg, EmptyMsg } from './StateMessage.jsx'
import { useContentList } from '../lib/useUpNote.js'
import { isEnabled, CONTENT_TYPE_FOR } from '../config/upnoteContentTypes.js'
import {
  getMemberName,
  getMemberRole,
  getMemberLead,
  getMemberBody,
  getMemberQualifications,
  getContentThumb,
} from '../lib/upnoteContent.js'
import { EMPTY_MESSAGES } from '../lib/upnote.js'

// 役員・従業員一覧（UpNote members slug）。
export default function MemberList({ limit = 10 }) {
  const slug = CONTENT_TYPE_FOR.members
  const enabled = isEnabled(slug)
  const { data, error, loading } = useContentList(enabled ? slug : null, { page: 1, limit })

  if (!enabled) return <EmptyMsg label="スタッフ紹介は現在準備中です。" />
  if (loading) return <Loading />
  if (error) return <ErrorMsg />
  if (!data || data.totalCount === 0) return <EmptyMsg label={EMPTY_MESSAGES.members} />

  return (
    <div className="member-list">
      {data.items.map((item) => {
        const name = getMemberName(item)
        const role = getMemberRole(item)
        const lead = getMemberLead(item)
        const body = getMemberBody(item)
        const quals = getMemberQualifications(item)
        const thumb = getContentThumb(item)

        return (
          <article key={item.id} className="member-card">
            {thumb ? (
              <div className="member-card__media">
                <img src={thumb} alt="" width={160} height={160} loading="lazy" decoding="async" />
              </div>
            ) : null}
            <div className="member-card__body">
              <h3 className="member-card__name">{name}</h3>
              {role ? <p className="member-card__role">{role}</p> : null}
              {quals.length > 0 ? (
                <p className="member-card__quals">
                  {quals.map((q) => (
                    <span key={q} className="chip">
                      {q}
                    </span>
                  ))}
                </p>
              ) : null}
              {lead ? <p className="member-card__lead">{lead}</p> : null}
              {body ? (
                <div className="member-card__bio" dangerouslySetInnerHTML={{ __html: body }} />
              ) : null}
            </div>
          </article>
        )
      })}
    </div>
  )
}
