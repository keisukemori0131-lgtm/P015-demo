import { useState } from 'react'
import { Loading, ErrorMsg, EmptyMsg } from './StateMessage.jsx'
import { useContentList } from '../lib/useUpNote.js'
import { isEnabled, CONTENT_TYPE_FOR } from '../config/upnoteContentTypes.js'
import { normalizeMemberItem } from '../lib/upnoteContent.js'
import { EMPTY_MESSAGES } from '../lib/upnote.js'
import StaffDetailModal from './StaffDetailModal.jsx'

function staffInitials(name) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function StaffCard({ member, onOpen, revealDelay = 0 }) {
  const isPartTime = member.positions.includes('非常勤')
  const hasComment = Boolean(member.comment?.trim())

  return (
    <article
      className={`staff-card${isPartTime ? ' staff-card--part-time' : ''}`}
      style={{ '--staff-delay': `${revealDelay}s` }}
    >
      <div className="staff-card__head">
        <div className="staff-card__head-inner">
          {member.thumb ? (
            <div className="staff-card__avatar staff-card__avatar--photo">
              <img src={member.thumb} alt={member.displayName} width={80} height={80} loading="lazy" decoding="async" />
            </div>
          ) : (
            <div className="staff-card__avatar" aria-hidden="true">
              <span className="staff-card__initials">{staffInitials(member.displayName)}</span>
            </div>
          )}
          <div className="staff-card__identity">
            {member.department ? <p className="staff-card__dept">{member.department}</p> : null}
            <h3 className="staff-card__name">{member.displayName}</h3>
            {member.name && member.name !== member.displayName ? (
              <p className="staff-card__name-ja">{member.name}</p>
            ) : null}
            {member.positions.length > 0 && (
              <ul className="staff-card__roles" aria-label="役職">
                {member.positions.map((role) => (
                  <li key={role}>
                    <span className="staff-card__role">{role}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {(hasComment || member.hasDetail) && (
        <div className={`staff-card__body${hasComment ? '' : ' staff-card__body--actions-only'}`}>
          {hasComment ? (
            <blockquote className="staff-card__quote">
              <p>{member.summary}</p>
            </blockquote>
          ) : null}
          {member.hasDetail ? (
            <button type="button" className="staff-card__more" onClick={() => onOpen(member)}>
              <span>詳細を見る</span>
              <span className="staff-card__more-icon" aria-hidden="true">
                →
              </span>
            </button>
          ) : null}
        </div>
      )}
    </article>
  )
}

export default function StaffSection({ limit = 50 }) {
  const [activeMember, setActiveMember] = useState(null)
  const slug = CONTENT_TYPE_FOR.members
  const enabled = isEnabled(slug)
  const { data, error, loading } = useContentList(enabled ? slug : null, { page: 1, limit })

  if (!enabled) return <EmptyMsg label="スタッフ紹介は現在準備中です。" />
  if (loading) return <Loading />
  if (error) return <ErrorMsg />
  if (!data || data.totalCount === 0) return <EmptyMsg label={EMPTY_MESSAGES.members} />

  const members = data.items.map(normalizeMemberItem)

  return (
    <>
      <div className="staff-section">
        {members.map((member, index) => (
          <StaffCard key={member.id} member={member} onOpen={setActiveMember} revealDelay={index * 0.07} />
        ))}
      </div>

      {activeMember ? <StaffDetailModal member={activeMember} onClose={() => setActiveMember(null)} /> : null}
    </>
  )
}
