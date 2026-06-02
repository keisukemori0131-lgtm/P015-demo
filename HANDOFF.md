# HANDOFF — ペラペラキッズカレッジ札幌（P015-demo）

React + Vite で生成した提案サイトの引き継ぎメモ。**機械チェック（check.mjs）は ERROR 0**。
以下は人の目・人の判断が必要なポイントと、公開（Cloudflare）に必要な設定。

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

YAML に値が無い項目は**創作していません**。以下は確認・追記が必要です。

| # | 項目 | 状況・対応 |
|---|------|-----------|
| 1 | **電話番号 `011-676-5814`** | 旧サイト記載値を採用（`src/constants/site.js`）。現行で正しいか顧客に確認。 |
| 2 | **住所** | YAML「第16藤栄ビル1」＋旧サイト郵便番号 `〒060-0005` を採用し「**1階**」と解釈。階数・部屋番号を確認。 |
| 3 | **料金（金額）** | YAML・旧サイトに記載なし → **金額は一切記載していません**（R2）。`/pricing` はコース構成のみ。月謝・入会金が確定したら Pricing と FAQ(UpNote) に反映。 |
| 4 | **受付時間 / 定休** | 記載なし → 出していません。確定したら `site.js` とフッターに追加。 |
| 5 | **メールアドレス** | YAML 空 → `mailto` 導線なし。必要なら追加。 |
| 6 | **SNS** | YAML 全て空 → リンク非表示。アカウントがあれば `site.js` / Footer に追加。 |
| 7 | **講師紹介・教育方針の文面** | 旧サイト TEACHERS の固有情報（氏名・経歴・資格）は未取得のため**一般化して記述**。実在講師の情報があれば `CompanyPage.jsx` に追記。 |
| 8 | キャッチコピー・本文の語感 | ブランドトーン（優しい・淡い水色）で作成。教室の言葉づかいに合うか確認。 |

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
2. **旧 URL → 新 URL マッピング**（新サイト内の互換）: `public/_redirects` に `/access → /company` を設定済み。旧 Ameba Ownd の各ページ（HOME / TEACHERS / BLOG 等）に対応する新ページは下表。旧側に 301 は張れないため、**新ドメインの該当ページを早期にインデックスさせる**。

   | 旧サイト導線 | 新サイト |
   |--------------|----------|
   | HOME | `/` |
   | TEACHERS | `/company`（講師セクション） |
   | BLOG（Blogspot 外部） | `/blog`（UpNote columns） |
   | ENGLISH BOOT CAMP | `/services`（コース紹介） |

3. **ブログ個別記事**: 旧 BLOG は外部 Blogspot。GSC で表示回数上位の記事を特定し、新 `/blog`（UpNote columns）へ同等記事を用意。残りは `/blog` への誘導でフォロー。
4. **GSC 所有権・アドレス変更手順**:
   - 新ドメインを GSC にプロパティ登録 → `VITE_GOOGLE_SITE_VERIFICATION` に HTML タグ verification 値を設定（`DocumentMeta` が `<meta name="google-site-verification">` を出力）。
   - 旧 Ameba Ownd プロパティが GSC にある場合は「**アドレス変更**」を申請（別ドメインのため必要）。
   - 新 `sitemap.xml` を GSC に送信。
5. **canonical / robots / 構造化データ**（実装済み）:
   - canonical: `DocumentMeta.jsx` が `${VITE_SITE_URL}${pathname}` を全ページ出力。
   - robots/sitemap: `scripts/generate-sitemap.mjs`（postbuild）。**`VITE_SITE_PUBLIC=1` のときだけ** `Allow` + sitemap 参照（未設定時 `Disallow` で誤公開防止）。
   - JSON-LD: `EducationalOrganization`（全ページ）+ `WebSite`（トップ）。住所・電話は `site.js`。
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
- [x] `node check.mjs .` → **ERROR 0**（WARN は装飾画像の alt 空 / ロゴ・PageHero の loading=lazy のみ＝意図した WARN）
- [x] `node check.mjs dist` → ERROR 0 / WARN 0

## 6. 実機で確認してほしいこと（R14-4）

- [ ] スマホでハンバーガーメニュー開閉（オーバーレイ / Esc / リンクで閉じる / 背景スクロールロック）
- [ ] トップのお知らせ・コラム抜粋が **各3件**、カード押下でモーダルが開く
- [ ] `/news` `/blog` でページャが動作（11件目以降）、モーダルに本文が出る（カードには出ない）
- [ ] `/services` の FAQ アコーディオン開閉
- [ ] `/company#access` で地図セクションへスクロール、Google 地図が表示される
- [ ] 1024 / 768 / 480px で横スクロールが出ない・崩れない
