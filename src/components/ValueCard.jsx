// 番号付きコンテンツカード（特徴・約束など）。
export default function ValueCard({ no, title, meta, children, className = '', image, imageAlt = '' }) {
  const classes = ['value-card', image && 'value-card--with-media', className].filter(Boolean).join(' ')

  const body = (
    <div className="value-card__body">
      {meta}
      <h3>{title}</h3>
      {children}
    </div>
  )

  if (image) {
    return (
      <article className={classes}>
        <div className="value-card__aside">
          {no ? (
            <span className="value-card__no" aria-hidden="true">
              {no}
            </span>
          ) : null}
          {body}
        </div>
        <div className="value-card__media">
          <img src={image} alt={imageAlt} width={160} height={213} loading="lazy" decoding="async" />
        </div>
      </article>
    )
  }

  return (
    <article className={classes}>
      {no ? (
        <span className="value-card__no" aria-hidden="true">
          {no}
        </span>
      ) : null}
      {body}
    </article>
  )
}
