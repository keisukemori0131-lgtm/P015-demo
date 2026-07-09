import { Loading, ErrorMsg, EmptyMsg } from './StateMessage.jsx'
import { useContentList } from '../lib/useUpNote.js'
import { isEnabled, CONTENT_TYPE_FOR } from '../config/upnoteContentTypes.js'
import { normalizeMemberItem } from '../lib/upnoteContent.js'
import { EMPTY_MESSAGES } from '../lib/upnote.js'

// 役員・従業員一覧（UpNote members slug）。StaffSection と同一フィールドで表示。
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
        const member = normalizeMemberItem(item)

        return (
          <article key={item.id} className="member-card">
            {member.thumb ? (
              <div className="member-card__media">
                <img src={member.thumb} alt={member.displayName} width={160} height={160} loading="lazy" decoding="async" />
              </div>
            ) : null}
            <div className="member-card__body">
              {member.department ? <p className="member-card__role">{member.department}</p> : null}
              <h3 className="member-card__name">{member.displayName}</h3>
              {member.name && member.name !== member.displayName ? (
                <p className="member-card__lead">{member.name}</p>
              ) : null}
              {member.positions.length > 0 ? (
                <p className="member-card__quals">
                  {member.positions.map((q) => (
                    <span key={q} className="chip">
                      {q}
                    </span>
                  ))}
                </p>
              ) : null}
              {member.summary ? <p className="member-card__lead">{member.summary}</p> : null}
            </div>
          </article>
        )
      })}
    </div>
  )
}
