// サイト共通の事実情報（合同会社ペラペラスタジオ）。
// ※ 連絡先（住所・電話）は確定情報が未提供のため本文に出さず、確定後に差し替える（伏せる方針）。
//    スタジオの所在地・電話は確定後に CAMPUSES と各セクションへ反映する。

export const SITE = {
  // 表示ブランド名
  name: 'ペラペラスタジオ',
  // 正式企業名（フッターのコピーライト等）
  company: '合同会社ペラペラスタジオ',
  nameEn: 'PERAPERA STUDIO',
  catch: '英語で学び　運動で育ち　自信をつける',
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
    { time: '14:20', title: '英語で各教科のレッスン', tone: 'sky' },
    { time: '15:00', title: 'おやつの時間', tone: 'mint' },
    { time: '15:30', title: 'エクササイズとABC SONG', tone: 'sun' },
    { time: '16:00', title: '英語でグループレッスン', tone: 'sun' },
    { time: '16:30', title: '英語でレゴやカプラなどの遊び', tone: 'sky' },
  ],
  aims: {
    main: 'コミュニケーション、社会性、運動、健康　これらを全て英語で行う。',
  },
}

// ペラペラスタジオの特徴（トップ FEATURES）
export const FEATURES = [
  {
    title: '英語は「勉強道具」ではなく、人生を助ける便利なツールです。',
    paragraphs: [
      'ペラペラスタジオでは、活動の時間を通して英語を自然に使っています。',
      '外国人スタッフとの会話はもちろん、クラフト、サイエンス、ゲーム、歌、運動など、さまざまな活動が英語を交えながら進みます。',
      '子どもたちは「英語を勉強する」のではなく、「英語で遊び、英語で考え、英語で挑戦する」毎日を過ごします。',
      'だからこそ、英語が特別なものではなく、自然なコミュニケーションの一つになっていくのです。',
    ],
  },
  {
    title: '「英語ができないから…」という心配はいりません。',
    paragraphs: [
      '初めて利用する子どもたちの多くは、英語が話せません。それでも心配はいりません。',
      '子どもたちは遊びや活動の中で、先生の表情やジェスチャー、友だちとのやり取りを通して、驚くほど自然に英語を吸収していきます。',
    ],
    phrases: ['Hello!', 'Let\'s go!', 'Good job!'],
    closing:
      '毎日の小さな積み重ねが、英語への親しみと自信を育てます。',
  },
  {
    title: '好きなことをしていると、英語が自然に入ってくる。',
    paragraphs: [
      '子どもは夢中になっているとき、一番よく学びます。',
    ],
    list: [
      '工作をしているとき。',
      '実験で驚いているとき。',
      '身体を動かして遊んでいるとき。',
      'ゲームで笑っているとき。',
    ],
    closing:
      'そんな楽しい時間の中で、英語はごく自然に耳に入り、少しずつ自分の言葉になっていきます。私たちは、「英語を教え込む」のではなく、「英語がある環境」をつくることを大切にしています。',
  },
  {
    title: '英語は、未来への贈り物。',
    paragraphs: [
      '幼い頃に英語に親しむことは、単に英語が話せるようになることだけが目的ではありません。',
      '異なる文化に興味を持つこと。世界にはさまざまな人がいることを知ること。「伝えたい」「わかりたい」という気持ちを育てること。',
      'ペラペラスタジオでは、英語を通して子どもたちの世界を広げ、未来の選択肢を増やしていきたいと考えています。',
    ],
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

function buildMapEmbedUrl(query, { zoom = 17, lat, lng } = {}) {
  if (lat != null && lng != null) {
    return `https://maps.google.com/maps?q=${lat},${lng}&hl=ja&z=${zoom}&output=embed`
  }
  const q = encodeURIComponent(query)
  return `https://maps.google.com/maps?q=${q}&hl=ja&z=${zoom}&output=embed`
}

// スタジオごとの所在地（TEL・メールは SHARED_CONTACT を参照）。
const CONTACT_MARUYAMA = {
  campus: '円山ベース',
  program: 'ペラペラ ENGLISH BOOT CAMP',
  ...SHARED_CONTACT,
  postal: '〒060-0005',
  postalCode: '060-0005',
  address: '北海道札幌市中央区北5条西23丁目2-1 FC Farnest北円山 1F',
  streetAddress: '北5条西23丁目2-1 FC Farnest北円山 1F',
  // Google Maps: https://maps.app.goo.gl/2pJY7c5ZnUWkgEd5A
  mapEmbedUrl: buildMapEmbedUrl(null, { lat: 43.0634722, lng: 141.3211665, zoom: 18 }),
}

const CONTACT_MIYANOMORI = {
  campus: '宮の森ベース',
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

// スタジオ紹介（円山ベース・宮の森ベース）。
export const CAMPUSES = [
  {
    name: '円山ベース',
    program: 'ペラペラ ENGLISH BOOT CAMP',
    programLogo: '/images/home/english-boot-camp-logo.png',
    programLogoAlt: 'ペラペラスタジオ ENGLISH BOOT CAMP',
    text: '子どもたちの「大好き」を発見するための知育活動は、すべて英語でおこないます。',
    points: ['英語を楽しく学べる', '園や自宅への送迎あり', '見学・体験受付中'],
    contact: CONTACT_MARUYAMA,
  },
  {
    name: '宮の森ベース',
    program: 'ペラペラキッズ②スポーツラボ',
    programLogo: '/images/home/sports-lab-logo.png',
    programLogoAlt: 'ペラペラキッズ② スポーツラボ',
    badge: 'NEW OPEN',
    text: [
      'ADHDの子どもたちの中には、身体を動かすことが大好きで、運動面で優れた力や豊かな可能性を持っている子どもがたくさんいます。',
      '世界のトップアスリートやプロスポーツ選手の中にも、ADHDの特性を公表して活躍している人たちがいます。',
      '私たちは、その可能性に注目しています。',
      '体幹を育て、身体の使い方を学び、思いきり身体を動かすことは、運動能力だけではなく、集中力や自己コントロール、健康な身体づくりにもつながります。',
      '私たちは、一人ひとりの身体能力や得意なことを伸ばし、その子らしい人生を、豊かに切り拓くお手伝いをしたいと考えています。',
    ],
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
