import { Link } from 'react-router-dom'
import DocumentMeta from '../components/DocumentMeta.jsx'

// 404 ルート（R7 / 納品チェック【3】）
export default function NotFoundPage() {
  return (
    <>
      <DocumentMeta title="ページが見つかりません｜ペラペラキッズカレッジ札幌" />
      <section className="section notfound">
        <div className="container container--narrow">
          <p className="notfound__code">404</p>
          <h1 className="section-title">ページが見つかりませんでした</h1>
          <p className="section-lead">
            お探しのページは移動または削除された可能性があります。お手数ですが、トップページから
            お探しください。
          </p>
          <Link to="/" className="btn btn--primary">
            ホームへ戻る
          </Link>
        </div>
      </section>
    </>
  )
}
