// 読込中 / エラー / 空状態の明示（R9 #5）。仮データで埋めない。
export function Loading({ label = '読み込み中…' }) {
  return <p className="state-msg state-msg--loading">{label}</p>
}

export function ErrorMsg({ label = '現在情報を取得できません。時間をおいて再度お試しください。' }) {
  return <p className="state-msg state-msg--error">{label}</p>
}

export function EmptyMsg({ label }) {
  return <p className="state-msg state-msg--empty">{label}</p>
}
