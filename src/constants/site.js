// サイト共通の事実情報（合同会社ペラペラスタジオ）。
// ※ 連絡先（住所・電話）は確定情報が未提供のため本文に出さず、確定後に差し替える（伏せる方針）。
//    校舎の所在地・電話は確定後に CAMPUSES と各セクションへ反映する。

export const SITE = {
  // 表示ブランド名
  name: 'ペラペラスタジオ',
  // 正式企業名（フッターのコピーライト等）
  company: '合同会社ペラペラスタジオ',
  nameEn: 'PERAPERA STUDIO',
  catch: '英語で学び、運動で育ち、自信をつける。',
  serviceLabel: '児童発達支援・放課後等デイサービス',
  // 事業エリア（円山・宮の森＝札幌市中央区）
  area: '北海道札幌市中央区',
  addressLocality: '札幌市中央区',
  // 本番オリジン。確定ドメインを VITE_SITE_URL で必ず上書きする（HANDOFF 参照）
  url: import.meta.env.VITE_SITE_URL || 'https://peraperastudio.jp',
}

// 代表からのご挨拶（トップページ）。
export const REPRESENTATIVE = {
  name: '代表 しらきゆみこ',
  image: '/images/home/representative-shiraki.png',
  imageAlt: '代表 しらきゆみこのポートレート',
  profile: [
    '1955年 大阪生まれ',
    '私立梅花女子大学大学院修士課程修了 文学修士',
    '関西圏の大学で児童文学と幼児教育を講義',
    '45歳でバイリンガルになるためアメリカに留学',
    '帰国後は北海道に移住し、幼児の英語教育に取り組む',
    '2010年 こどもの英会話スクールを札幌で開校',
  ],
  message:
    '幼児期にバイリンガルに育てることが世界のスタンダードであるように、日本でもそれを「あたりまえ」にすることを目標に、日々スクール運営に情熱を注いでいます。',
}

// カリキュラムの一例（未就学児・Lesson Plan Timeline より）。
export const CURRICULUM = {
  target: '未就学児（pre-school）',
  duration: '2〜3時間',
  programs: ['ペラペラ ENGLISH BOOT CAMP', 'ペラペラキッズ②スポーツラボ'],
  timeline: [
    {
      time: '13:30',
      title: '公園',
      text: '公園で屋外遊び。できるだけたくさん運動します。ブランコ（春〜）、滑り台、ジャングルジムなどを通年利用。先生から「monster game」や探しゲームなども声かけします。',
      tone: 'coral',
    },
    {
      time: '14:00',
      title: '英語／公園',
      text: 'ABCや書く練習、数字の英語での識別（1〜20を数えるだけでなくカードで認識）。唱歌2〜3曲、数字マッチング、単語カード、絵本の読み聞かせ、書く練習など。遅れて到着したお子さまはこの時間帯に公園へ。',
      tone: 'sky',
    },
    {
      time: '14:30',
      title: '英語',
      text: '遅れて到着したお子さまが、この時間から英語レッスンを開始します。',
      tone: 'sky',
    },
    {
      time: '15:00',
      title: 'おやつの時間',
      text: '手を洗い、自分の椅子を準備します。おやつは持参、またはこちらで用意したものを取ります。',
      tone: 'mint',
    },
    {
      time: '15:20',
      title: 'ABCソング・遊び',
      text: 'おやつに時間がかかるお子さまもいるため、待っている間はABCソングや唱歌を視聴。語彙とイメージの関連付けを学びます。',
      tone: 'sun',
    },
    {
      time: '15:40',
      title: 'グループ英語',
      text: 'フラッシュカードやグループゲーム。算盤やABCブロックなど、教室にある教材を柔軟に使います。',
      tone: 'sun',
    },
    {
      time: '15:50',
      title: 'トイレタイム',
      text: '全員整列してトイレへ。不要な場合も、整列したうえで伝えます。',
      tone: 'mint',
    },
    {
      time: '16:00',
      title: '英会話と自由遊び',
      text: 'レゴ、カプラなどで遊びながら、英語教師が英語で会話。コミュニケーションを楽しみます。',
      tone: 'sky',
    },
  ],
  // 資料の日本語版タイムライン（13:30開始の一日の流れ）。
  dayFlow: [
    { time: '13:30', title: '公園', tone: 'coral' },
    { time: '14:20', title: 'マンツーマンの英語レッスン', tone: 'sky' },
    { time: '15:00', title: 'おやつの時間', tone: 'mint' },
    { time: '15:30', title: 'エクササイズとABC SONG', tone: 'sun' },
    { time: '16:00', title: 'グループ英語レッスン', tone: 'sun' },
    { time: '16:30', title: 'レゴやカプラなどで英会話と遊び', tone: 'sky' },
  ],
  aims: {
    main: '英語での指示を理解し、日常会話で使われる語彙や表現に慣れること。',
    sub: [
      '英語で数字（1〜20）をカードを見て識別できるようになること。',
      '紙にペンや鉛筆を使って書く力を身につけること。',
    ],
  },
  materials: {
    vocab: '数字、日常で使う簡単な単語',
    grammar: '特に扱わない',
  },
}

// ペラペラスタジオの5つの特徴（トップ・私たちについて で共有）
export const FEATURES = [
  {
    no: '01',
    title: '英語イマージョン環境',
    text: '外国人スタッフと自然に英語で関わることで、英語を勉強ではなくコミュニケーションとして身につけます。「英語が好き」「話してみたい」、そんな気持ちを育てます。',
  },
  {
    no: '02',
    title: '運動療育',
    text: '身体を動かすことは、心と脳の発達にも大切です。体幹トレーニング、公園活動、ボール運動などを通して、身体の使い方や協調性を育てます。',
  },
  {
    no: '03',
    title: '個別支援',
    text: 'ASD、ADHD など、それぞれの特性に合わせた支援を行います。一人ひとりに合った方法を考えながら、小さな成功体験を積み重ねていきます。',
  },
  {
    no: '04',
    title: '心理カウンセリング',
    text: '心理専門スタッフによるサポート体制を整えています。保護者の方の不安や悩みにも寄り添いながら、お子さまの成長を一緒に見守ります。',
  },
  {
    no: '05',
    title: '継続した支援',
    text: '未就学のお子さまから小学生まで。成長に合わせながら、長く関わることのできる環境があります。',
  },
]

// こんなお子さまにおすすめです
export const RECOMMEND = [
  '英語に興味を持ってほしい',
  'お友だちとの関わりを増やしたい',
  '集団活動が苦手',
  '身体を動かす機会を増やしたい',
  '落ち着いて活動する力を育てたい',
  '将来の自立につながる力を身につけたい',
]

// 両校共通の連絡先（チラシ記載値）。
// ※ メール englishbootcampp@gmail.com は「こころの相談室」チラシで確認済み。
export const SHARED_CONTACT = {
  tel: '080-7560-6611',
  telHref: '08075606611',
  email: 'englishbootcampp@gmail.com',
}

function buildMapEmbedUrl(query) {
  const q = encodeURIComponent(query)
  return `https://maps.google.com/maps?q=${q}&hl=ja&z=16&output=embed`
}

// 校舎ごとの所在地（TEL・メールは SHARED_CONTACT を参照）。
const CONTACT_MARUYAMA = {
  campus: '円山校',
  program: 'ペラペラ ENGLISH BOOT CAMP',
  ...SHARED_CONTACT,
  postal: '〒060-0005',
  postalCode: '060-0005',
  address: '札幌市中央区北5条西23丁目2-1 FC Farnest北円山 1階',
  streetAddress: '北5条西23丁目2-1 FC Farnest北円山 1階',
  mapEmbedUrl: buildMapEmbedUrl('〒060-0005 札幌市中央区北5条西23丁目2-1 FC Farnest北円山'),
}

const CONTACT_MIYANOMORI = {
  campus: '宮の森校',
  program: 'ペラペラキッズ②スポーツラボ',
  ...SHARED_CONTACT,
  fax: '011-676-5814',
  postal: '〒064-0952',
  postalCode: '064-0952',
  address: '札幌市中央区宮の森二条17丁目9-10',
  streetAddress: '宮の森二条17丁目9-10',
  mapEmbedUrl: buildMapEmbedUrl('〒064-0952 札幌市中央区宮の森二条17丁目9-10'),
}

// 主たる連絡先（フッター・JSON-LD 用）。
export const CONTACT = CONTACT_MARUYAMA

// 校舎紹介（円山校・宮の森校）。
export const CAMPUSES = [
  {
    name: '円山校',
    program: 'ペラペラ ENGLISH BOOT CAMP',
    programLogo: '/images/home/english-boot-camp-logo.png',
    programLogoAlt: 'ペラペラスタジオ ENGLISH BOOT CAMP',
    text: '外国人教師による英語、遊具を使った運動、自然物にふれる情操教育。幼児期に大切な3つのことを土台に療育を行っています。園や自宅への送迎にも対応しています。',
    points: ['英語を楽しく学べる', '園や自宅への送迎あり', '見学・体験受付中'],
    // 幼児期に大切な3つのこと（療育の土台）
    pillars: [
      {
        title: '英語',
        text: '外国人教師がお子様に合わせ、マンツーマンやグループでのレッスンを行います。',
      },
      {
        title: '運動',
        text: '遊具での運動を通して体幹を強化させ、姿勢の維持や集中力を高める支援を行います。',
      },
      {
        title: '情操教育',
        text: '自然物に触れることで感受性を刺激し、自分で考える力、相手を思いやる心を育みます。',
      },
    ],
    contact: CONTACT_MARUYAMA,
  },
  {
    name: '宮の森校',
    program: 'ペラペラキッズ②スポーツラボ',
    programLogo: '/images/home/sports-lab-logo.png',
    programLogoAlt: 'ペラペラキッズ② スポーツラボ',
    badge: 'NEW OPEN',
    text: 'ペラペラスタジオの第2店舗。戸外活動が中心の新しい療育スタイルです。体幹を鍛え、免疫力を高めながら、健康で賢い子どもを育てます。運動で人生を楽しく豊かに。',
    points: ['戸外活動が中心の療育', '体幹を鍛え免疫力を高める', '見学・体験随時受付中'],
    // 戸外を中心とした活動例
    activities: ['スキー', '川遊び', '山登り'],
    contact: CONTACT_MIYANOMORI,
  },
]

// 私たちの約束（2026・私たちについて で使用）
export const PROMISES = [
  {
    no: '01',
    title: '好きなことを発見する',
    text: '子どもたちは必ず何かの才能を持っています。私たちはその芽を見つけることを大切にしています。',
  },
  {
    no: '02',
    title: '得意なことを伸ばす',
    text: '苦手を責めるのではなく、得意を伸ばして自信につなげます。',
  },
  {
    no: '03',
    title: '楽しく自由に生きる力を育てる',
    text: '子どもたちが将来「自分らしく生きていける」、そんな力を身につけられるよう支援します。',
  },
  {
    no: '04',
    title: '人とのつながりを大切にする',
    text: '助けてくれる人がいることを信じる。感謝する心を持つ。それも私たちが大切にしている療育です。',
  },
]
