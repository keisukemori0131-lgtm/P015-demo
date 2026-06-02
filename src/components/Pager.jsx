// ページャ（R14-1）。Prev / 1..n / Next。current ハイライト、端で disabled。
export default function Pager({ current, totalPages, onChange }) {
  if (!totalPages || totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const go = (p) => {
    if (p < 1 || p > totalPages || p === current) return
    onChange(p)
  }
  return (
    <nav className="pager" aria-label="ページ送り">
      <button
        type="button"
        className="pager__btn"
        onClick={() => go(current - 1)}
        disabled={current <= 1}
        aria-label="前のページ"
      >
        ‹ 前へ
      </button>
      <ul className="pager__list">
        {pages.map((p) => (
          <li key={p}>
            <button
              type="button"
              className={`pager__num${p === current ? ' is-current' : ''}`}
              onClick={() => go(p)}
              aria-current={p === current ? 'page' : undefined}
            >
              {p}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="pager__btn"
        onClick={() => go(current + 1)}
        disabled={current >= totalPages}
        aria-label="次のページ"
      >
        次へ ›
      </button>
    </nav>
  )
}
