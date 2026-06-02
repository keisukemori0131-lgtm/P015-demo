// UpNote コンテンツの data フィールド → 日本語ラベル対応表（案件横断）。
// 新しいフィールドの日本語化はここを更新するだけで全画面（モーダルの「詳細情報」グリッド等）に反映される。

export const UPNOTE_FIELD_LABELS = {
  article_title: '見出し',
  subtitle: 'サブタイトル',
  lead: 'リード文',
  summary: '概要',
  body: '本文',
  body_html: '本文',
  description: '説明',
  answer: '回答',
  question: '質問',
  thumbnail: 'サムネイル',
  attachment_1: '添付画像1',
  attachment_2: '添付画像2',
  attachment_3: '添付画像3',
  tag_name: 'タグ',
  notice_date: '掲載日',
  posted_period_start: '掲載開始日',
  posted_period_end: '掲載終了日',
  challenge: '課題',
  approach: '取り組み',
  outcome: '成果',
  testimonial: 'お客様の声',
  author: '担当',
  related_url: '関連リンク',
  category: 'カテゴリ',
  target_age: '対象年齢',
  course_name: 'コース名',
  event_date: '開催日',
}

export function labelForField(key) {
  return UPNOTE_FIELD_LABELS[key] || key
}
