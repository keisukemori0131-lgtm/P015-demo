# HANDOFF — 合同会社ペラペラスタジオ（ペラペラスタジオ / P015-demo）

React + Vite で生成した提案サイトの引き継ぎメモ。**機械チェック（check.mjs）は ERROR 0**。
以下は人の目・人の判断が必要なポイントと、公開（Cloudflare）に必要な設定。

> **2026-06-25 内容刷新**: 旧「ペラペラスタジオ（英語スクール）」から、
> **合同会社ペラペラスタジオ／児童発達支援・放課後等デイサービス**（円山校・宮の森校）へ全面刷新。
> ページ構成: `/`ホーム ／ `/about`私たちについて ／ `/support`児童発達支援 ／ `/counseling`こころの相談室 ／
> `/cases`成長事例 ／ `/blog`コラム(UpNote) ／ `/news`お知らせ(UpNote) ／ `/contact`見学・お問い合わせ。
> ヘッダーナビは6項目（コラムはフッターのみ）。旧 `/services` `/pricing` `/company` `/access` は新ページへ 301。
> **両校（円山校・宮の森校）の連絡先はチラシより反映済み**（フッター／`/contact`／JSON-LD／ホーム校舎紹介）。
> 円山校のカウンセリング部「こころの相談室」は `/counseling` を新設。郵便番号 060-0005・メール englishbootcampp@gmail.com は確認済み。

- **Worker 名（重要）**: `p015demo`（`wrangler.jsonc` の `name` と一致。Cloudflare 側も同名で作成すること。違う名前だと別 Worker が自動生成され設定変数が当たらない / P008 2026-05 事故）
- 技術: React 18 + Vite 6.4 / react-router-dom / react-helmet-async。UpNote は**パターン B 直叩き**（proxy Worker なし）。
- 連絡方式: **Googleフォーム埋め込み**（YAML `contact.method = Googleフォーム`）。

---

## 1. 公開前に必ず設定（人の入力が必要）

### Cloudflare Build → Variables and secrets（パターン B・Type は全て Variable）

```env
VITE_SITE_URL=https://<確定ドメイン>
VITE_SITE_PUBLIC=1
VITE_OG_IMAGE_URL=https://<確定ドメイン>/og-image.svg
VITE_UPNOTE_API_BASE_URL=https://api.upnote.jp
VITE_UPNOTE_PUBLIC_API_KEY=up_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_UPNOTE_API_KEY_HEADER=X-API-Key
VITE_GOOGLE_FORM_EMBED_URL=https://docs.google.com/forms/d/e/xxxx/viewform?embedded=true
# 任意
# VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
# VITE_GOOGLE_SITE_VERIFICATION=xxxxxxxxxxxxxxxxxxxx
```

- **Runtime タブには何も置かない**（パターン B は Build 変数だけで完結）。
- Build command: `npm run build:cloudflare:public`（= `VITE_SITE_PUBLIC=1`）／ Output: `dist`／ Deploy: `npx wrangler deploy`。
- 変更後は **Deployments → Retry deployment** で再ビルド。

### UpNote 管理画面 — 「許可オリジン」に登録（パターン B 必須・登録漏れは CORS で確実に失敗）

- `https://p015demo.<account>.workers.dev`（動作確認用・恒久）
- `https://<確定ドメイン>`（DNS 切替後）

### Google フォーム

- `VITE_GOOGLE_FORM_EMBED_URL` 未設定の場合、`/contact` はフォームを出さず「準備中」+ 電話導線を表示する（壊れない）。
- フォーム作成 → 「送信」→ `< >`（埋め込み）→ `src="..."` の URL（`embedded=true` 付き）を上記変数に設定。

---

## 2. 人の目で要確認（事実・コピー）

提供のあった本文をもとに記述し、値が無い項目は**創作していません**。以下は確認・追記が必要です。

| # | 項目 | 状況・対応 |
|---|------|-----------|
| 1 | **連絡先（チラシより反映済み）** | 2枚のチラシから両校の連絡先を `src/constants/site.js`（`CONTACT_MARUYAMA` / `CONTACT_MIYANOMORI`）へ記載。フッター・`/contact`・JSON-LD・ホーム校舎紹介に表示。<br>・**円山校**: TEL 080-7560-6611／Mail englishbootcampp@gmail.com／〒060-0005 札幌市中央区北5条西23丁目2-1 FCFarnest北円山<br>・**宮の森校**: TEL 080-7560-6611／FAX 011-676-5814／Mail englishbootcampp@gmail.com／〒064-0952 札幌市中央区宮の森二条17丁目9-10 |
| 2 | **円山校の郵便番号（確認済み）** | 「こころの相談室」チラシに **〒060-0005** と明記 → 060-0005 で確定（最初の英語チラシの 006-0005 は誤記）。住所は「FC Farnest北円山 1階」。 |
| 3 | **メールの綴り（確認済み）** | 「こころの相談室」チラシで `englishbootcampp@gmail.com` を確認 → これで確定（宮の森チラシも同一とみなす）。 |
| 3b | **こころの相談室（`/counseling`）** | 円山校のカウンセリング部「ペラペラ こころの相談室」をチラシより新規ページ化。発達支援/家族療法/チャイルドケア、相談内容・カウンセリング内容・ペアレントトレーニング・トライアルを掲載。連絡先は円山校と共通。 |
| 4 | **受付時間 / 営業日（開所日）** | 記載なし → 出していません。確定したら `site.js` とフッターに追加。 |
| 5 | **料金・利用者負担** | 福祉サービスのため記載なし → 料金ページは廃止（`/pricing`→`/support` へ 301）。必要なら別途追記。 |
| 5b | **SNS** | 未提供 → 導線なし。アカウントがあれば `site.js` / Footer に追加。 |
| 6 | **成長事例（`/cases`）** | 提供本文の5事例をそのまま掲載（`src/pages/CasesPage.jsx`）。年齢・特性のチップ付き。掲載可否・表現は要確認（個人が特定されない範囲か）。免責文を1行添えています。 |
| 7 | **ロゴ / OG 画像** | `public/logo.svg`・`public/og-image.svg` を「ペラペラスタジオ / STUDIO」表記に更新済み。**正式ロゴ（正方形 PNG 推奨）支給時に差し替え**。旧 `public/logo-header.png` は旧ブランド表記のため**不使用**（参照を `logo.svg` に変更済み）。 |
| 8 | キャッチコピー・本文の語感 | ブランドトーン（優しい・淡い水色）で作成。事業所の言葉づかいに合うか確認。 |

---

## 3. 画像（生成 SVG）について

- 現状は **ブランドカラー（淡い水色）に沿った生成 SVG イラスト**（`public/images/` 配下・約19点）。仮の写真 URL は使っていません（R13）。
- 正式な写真素材ができたら **同じパス・同じファイル名**（例 `public/images/services/immersion.svg` → `.jpg`/`.webp`）で差し替え、各 `<img>` の **`alt` を写真の内容に合わせて更新**してください。200KB 超の写真は WebP 化推奨。
- **ロゴ**: 現状 `public/logo.svg`（生成）。ヘッダー/フッター/favicon/OG で共通使用。正式ロゴ（できれば**正方形 PNG**＝favicon 用も）を支給され次第差し替え。

---

## 4. ローカル開発・データ

- `npm run dev` は**公開 API を叩かず** `public/upnote-local/*.sample.json` を読みます（news 12件 / faq 7件 / columns 6件）。社内レビュー・提案はキー無しで全画面動作。
- 一覧は `limit=10` ページャ、トップ抜粋は `limit=3`、カード押下でモーダル詳細（R14）。
- UpNote 有効コンテンツ: **news / faq / columns**（`ENABLED_CONTENT_TYPES`）。`case_studies` は本案件では未使用。
- `*.sample.json` は Git コミット可。実 API のエクスポート（`*.json`）は `.gitignore` 済み。

---

## 🔍 SEO 移行 — 旧サイトの検索順位を新サイトへ引き継ぐ（R11-C）

> **重要な前提（ドメインが変わるケース）**
> 旧サイトは **`https://peraperakidscollege.amebaownd.com/`（Ameba Ownd の別ドメイン）**。
> 新サイトは Cloudflare の独自ドメインで公開予定 → **同一ドメインではない**ため、
> 旧ドメイン側で 301 リダイレクトを設定できません（Ameba Ownd は任意の 301 を張れない）。
> したがって被リンク・順位の引き継ぎは、下記 **GSC の「アドレス変更」** と
> **同等コンテンツの再インデックス**で行います（数ヶ月かかる前提）。

1. **大前提**: 可能なら独自ドメインを取得し、以後は同一ドメインで運用。旧 Ameba Ownd からは手動で「移転のお知らせ」リンクを新サイトへ貼る。
2. **旧 URL → 新 URL マッピング**（新サイト内の互換）: `public/_redirects` と `App.jsx` で `/services→/support` `/pricing→/support` `/company→/about` `/access→/contact` を 301 設定済み。旧側に 301 は張れないため、**新ドメインの該当ページを早期にインデックスさせる**。

   | 旧サイト導線 | 新サイト |
   |--------------|----------|
   | HOME | `/` |
   | 私たち / 理念 | `/about`（私たちについて） |
   | BLOG（Blogspot 外部） | `/blog`（UpNote columns） |
   | サービス内容 | `/support`（児童発達支援） |
   | 事例 | `/cases`（成長事例） |

3. **ブログ個別記事**: 旧 BLOG は外部 Blogspot。GSC で表示回数上位の記事を特定し、新 `/blog`（UpNote columns）へ同等記事を用意。残りは `/blog` への誘導でフォロー。
4. **GSC 所有権・アドレス変更手順**:
   - 新ドメインを GSC にプロパティ登録 → `VITE_GOOGLE_SITE_VERIFICATION` に HTML タグ verification 値を設定（`DocumentMeta` が `<meta name="google-site-verification">` を出力）。
   - 旧 Ameba Ownd プロパティが GSC にある場合は「**アドレス変更**」を申請（別ドメインのため必要）。
   - 新 `sitemap.xml` を GSC に送信。
5. **canonical / robots / 構造化データ**（実装済み）:
   - canonical: `DocumentMeta.jsx` が `${VITE_SITE_URL}${pathname}` を全ページ出力。
   - robots/sitemap: `scripts/generate-sitemap.mjs`（postbuild）。**`VITE_SITE_PUBLIC=1` のときだけ** `Allow` + sitemap 参照（未設定時 `Disallow` で誤公開防止）。
   - JSON-LD: `ChildCare`（全ページ・社名 `合同会社ペラペラスタジオ`、所在地は `札幌市中央区` まで）+ `WebSite`（トップ）。詳細住所・電話は確定後に `DocumentMeta.jsx` へ追記。
6. **デプロイ前チェック**: Build 変数（`VITE_SITE_URL` / `VITE_SITE_PUBLIC=1` / `VITE_GOOGLE_FORM_EMBED_URL` / UpNote セット）+ UpNote 許可オリジン + カスタムドメイン疎通（`curl -i https://<ドメイン>/` で `Server: cloudflare`）。
7. **ローンチ当日**: DNS 切替 → 主要ページを GSC「URL 検査」でインデックス申請 → sitemap 送信 → 旧サイトに新サイトへの導線設置。
8. **ローンチ後 1〜3 ヶ月**: GSC カバレッジ / 主要 KW（「札幌 子供 英語」「イマージョン 英語 札幌」等）順位を週次記録 → 残存 404 を `_redirects` に追加。
9. **やってはいけない**: 旧プロパティの闇雲な削除 / 無関係ページへの 301 / robots で本番を Disallow のまま公開 / `VITE_SITE_PUBLIC=1` の入れ忘れ。

---

## 5. デプロイ前 自己検証（実施済み）

- [x] `vite` 6.4.2（`^6.0.0` 以上）/ `@vitejs/plugin-react` `^4.4.0`
- [x] `npm run build` 成功（postbuild で `dist/sitemap.xml` `dist/robots.txt` 生成）
- [x] `wrangler.jsonc` は `assets` のみ（`main` なし＝パターン B）。`name: p015demo`
- [x] `public/_redirects` に SPA fallback（`/* /index.html 200`）を入れていない（Workers は `not_found_handling`）
- [x] `node check.mjs dist` → **ERROR 0**（WARN 2 件＝`images/pricing/cover-photo.png` 681KB・`images/services/cover-photo.png` 461KB の WebP 化推奨のみ。正式写真差し替え時に WebP 化）

## 6. 実機で確認してほしいこと（R14-4）

- [ ] スマホでハンバーガーメニュー開閉（オーバーレイ / Esc / リンクで閉じる / 背景スクロールロック）。ナビは6項目＋CTA。
- [ ] トップのお知らせ抜粋が **3件**、カード押下でモーダルが開く
- [ ] `/news` `/blog` でページャが動作（11件目以降）、モーダルに本文が出る（カードには出ない）
- [ ] `/about` `/support` `/counseling` `/cases` の各セクション・カードが崩れず表示される（成長事例は5件＋チップ／相談室は相談内容・カウンセリング内容・ペアレントトレーニング）
- [ ] ホーム校舎紹介に円山校（英語・運動・情操教育＋TEL）と宮の森校（NEW OPEN・スキー/川遊び/山登り＋TEL）が表示される
- [ ] `/contact` の Googleフォーム埋め込み（URL 設定後）。未設定時は「準備中」表示で壊れない
- [ ] 旧 `/services` `/pricing` `/company` `/access` が新ページへリダイレクトする
- [ ] 1024 / 768 / 480px で横スクロールが出ない・崩れない
