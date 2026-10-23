import type { Locale } from './locales'

export interface UIStrings {
  appTitle: string
  homeSubtitle: string
  homeGameTitle: string
  homeGameDesc: string
  homeBullet1: string
  homeBullet2: string
  homeBullet3: string
  homeStart: string
  languageTitle: string
  languageSubtitle: string
  languageContinue: string
  languageChange: string
  returnToHome: string
  returnConfirm: string

  loading: string
  selectTitle: string
  selectSubtitle: string
  selectHint: string
  selectedLabel: string
  preparing: string
  startCompare: string
  selectAtLeast: string

  progress: string
  stepInitial: string
  stepChallenge: string
  stepConfirm: string
  intuitionTitle: string
  intuitionHint: string
  processing: string
  confirmChoice: string
  challengeAfterChoice: string
  secondChallengeNotice: string
  yearSuffix: string
  labelBackground: string
  labelDilemma: string
  labelActualChoice: string
  labelConsequences: string
  labelReflection: string
  afterCaseQuestion: string

  summaryLoading: string
  summaryTitle: string
  summarySubtitle: string
  topPriority: string
  winsLabel: string
  lossesLabel: string
  fullRanking: string
  winCount: string
  winCountOne: string
  lossCount: string
  lossCountOne: string
  analysisTitle: string
  keyConflicts: string
  adjusted: string
  finalChoice: string
  lowerPriority: string
  restart: string
  noValue: string

  analysisIntro: string
  analysisByValue: Record<string, string>
}

const zhCN: UIStrings = {
  appTitle: '价值观模拟器',
  homeSubtitle: '通过案例情境探索你的价值观体系',
  homeGameTitle: '价值观排序游戏',
  homeGameDesc: '从 {n} 个核心价值中选择至少 2 个，通过案例中的艰难抉择，发现你内心真正的价值观排序',
  homeBullet1: '借鉴现实议题的道德困境',
  homeBullet2: '多元文化视角，避免单一立场',
  homeBullet3: '建立经得住现实考验的价值体系',
  homeStart: '开始探索 →',
  languageTitle: '选择语言',
  languageSubtitle: '请选择你偏好的语言，界面与案例将以该语言呈现',
  languageContinue: '继续',
  languageChange: '切换语言',
  returnToHome: '返回初始页',
  returnConfirm: '当前游戏进度将丢失，确定返回首页吗？',

  loading: '正在加载...',
  selectTitle: '价值观排序游戏',
  selectSubtitle: '从以下价值观中选择 2-{n} 个，两两 PK 进行排序',
  selectHint: '游戏将通过真实案例帮助你理解自己的价值观体系',
  selectedLabel: '已选择：',
  preparing: '正在准备...',
  startCompare: '开始比较',
  selectAtLeast: '至少还需选择 {n} 个价值观',

  progress: '进度',
  stepInitial: '第一步：凭直觉选择',
  stepChallenge: '第二步：案例挑战',
  stepConfirm: '第三步：再次确认',
  intuitionTitle: '请凭你的直觉选择：这两个价值观中，哪个对你更重要？',
  intuitionHint: '不要过度思考，跟随你的第一感觉。接下来我们会用真实案例挑战你的选择。',
  processing: '正在处理...',
  confirmChoice: '确认选择',
  challengeAfterChoice: '你选择了 {value}。现在让我们用一个真实案例挑战你的选择...',
  secondChallengeNotice: '让我们再看一个真实案例，确认你的新选择...',
  yearSuffix: '年',
  labelBackground: '历史背景',
  labelDilemma: '核心困境',
  labelActualChoice: '真实选择',
  labelConsequences: '后果',
  labelReflection: '',
  afterCaseQuestion: '读完这个真实案例后，你的选择是？',

  summaryLoading: '正在生成你的价值观谱系...',
  summaryTitle: '你的价值观谱系',
  summarySubtitle: '完成了 {total} 次比较，调整了 {adjustments} 次选择',
  topPriority: '最高优先级',
  winsLabel: '胜场',
  lossesLabel: '败场',
  fullRanking: '完整排序',
  winCount: '{n}胜',
  winCountOne: '{n}胜',
  lossCount: '{n}败',
  lossCountOne: '{n}败',
  analysisTitle: '价值观分析',
  keyConflicts: '关键抉择时刻',
  adjusted: '调整后选择',
  finalChoice: '最终选择',
  lowerPriority: '相对优先级较低',
  restart: '重新测试',
  noValue: '未选择',

  analysisIntro:
    '你的价值观体系中，**{top}**处于最高优先级，而**{bottom}**的优先级相对较低。\n\n',
  analysisByValue: {
    justice:
      '你是一个正义导向的人，重视公平、追究作恶与保护无辜，反对让无关者受到牵连，愿意为此付出代价，即使这意味着与亲人、组织或社会规范产生冲突。',
    freedom:
      '你高度珍视个人自由和自主选择，倾向于抵制任何形式的强制和控制，即使这可能带来风险。',
    family:
      '你把家庭和亲情放在首位，愿意为保护家人做出重大牺牲，血缘关系在你心中具有特殊地位。',
    life:
      '你坚守生命神圣的原则，反对任何形式的杀戮和暴力，相信生命权高于其他一切价值。',
    faith:
      '你是一个理想主义者，愿意为信仰和理念献身，即使这意味着与现实产生激烈冲突。',
    truth:
      '你是一个追求真理的人，珍视客观事实和科学真相，难以接受欺骗和虚假，即使真话可能伤害他人或带来负面后果。',
    loyalty:
      '你是一个重视承诺和忠诚的人，对组织、团队和朋友的忠诚在你心中占据重要位置。',
    safety:
      '你是一个务实的人，认为公共安全和集体利益应该优先于个人自由和权利。',
    environment:
      '你高度关注生态和环境保护，愿意为可持续发展付出经济代价。',
    contract:
      '你是一个重信守诺的人，契约精神和商业诚信在你心中占据重要位置，即使履约会带来损失，你也倾向于坚守承诺。',
  },
}

const zhTW: UIStrings = {
  ...zhCN,
  appTitle: '價值觀模擬器',
  homeSubtitle: '透過案例情境探索你的價值觀體系',
  homeGameTitle: '價值觀排序遊戲',
  homeGameDesc: '從 {n} 個核心價值中選擇至少 2 個，透過案例中的艱難抉擇，發現你內心真正的價值觀排序',
  homeBullet1: '借鑑現實議題的道德困境',
  homeBullet2: '多元文化視角，避免單一立場',
  homeBullet3: '建立經得住現實考驗的價值體系',
  homeStart: '開始探索 →',
  languageTitle: '選擇語言',
  languageSubtitle: '請選擇你偏好的語言，介面與案例將以該語言呈現',
  languageContinue: '繼續',
  languageChange: '切換語言',
  returnToHome: '返回初始頁',
  returnConfirm: '目前遊戲進度將遺失，確定返回首頁嗎？',

  loading: '正在載入...',
  selectTitle: '價值觀排序遊戲',
  selectSubtitle: '從以下價值觀中選擇 2-{n} 個，兩兩 PK 進行排序',
  selectHint: '遊戲將透過真實案例幫助你理解自己的價值觀體系',
  selectedLabel: '已選擇：',
  preparing: '正在準備...',
  startCompare: '開始比較',
  selectAtLeast: '至少還需選擇 {n} 個價值觀',

  progress: '進度',
  stepInitial: '第一步：憑直覺選擇',
  stepChallenge: '第二步：案例挑戰',
  stepConfirm: '第三步：再次確認',
  intuitionTitle: '請憑你的直覺選擇：這兩個價值觀中，哪個對你更重要？',
  intuitionHint: '不要過度思考，跟隨你的第一感覺。接下來我們會用真實案例挑戰你的選擇。',
  processing: '正在處理...',
  confirmChoice: '確認選擇',
  challengeAfterChoice: '你選擇了 {value}。現在讓我們用一個真實案例挑戰你的選擇...',
  secondChallengeNotice: '讓我們再看一個真實案例，確認你的新選擇...',
  yearSuffix: '年',
  labelBackground: '歷史背景',
  labelDilemma: '核心困境',
  labelActualChoice: '真實選擇',
  labelConsequences: '後果',
  afterCaseQuestion: '讀完這個真實案例後，你的選擇是？',

  summaryLoading: '正在生成你的價值觀譜系...',
  summaryTitle: '你的價值觀譜系',
  summarySubtitle: '完成了 {total} 次比較，調整了 {adjustments} 次選擇',
  topPriority: '最高優先級',
  winsLabel: '勝場',
  lossesLabel: '敗場',
  fullRanking: '完整排序',
  winCount: '{n}勝',
  winCountOne: '{n}勝',
  lossCount: '{n}敗',
  lossCountOne: '{n}敗',
  analysisTitle: '價值觀分析',
  keyConflicts: '關鍵抉擇時刻',
  adjusted: '調整後選擇',
  finalChoice: '最終選擇',
  lowerPriority: '相對優先級較低',
  restart: '重新測試',
  noValue: '未選擇',

  analysisIntro:
    '你的價值觀體系中，**{top}**處於最高優先級，而**{bottom}**的優先級相對較低。\n\n',
  analysisByValue: {
    justice:
      '你是一個正義導向的人，重視公平、追究作惡與保護無辜，反對讓無關者受到牽連，願意為此付出代價，即使這意味著與親人、組織或社會規範產生衝突。',
    freedom:
      '你高度珍視個人自由和自主選擇，傾向於抵制任何形式的強制和控制，即使這可能帶來風險。',
    family:
      '你把家庭和親情放在首位，願意為保護家人做出重大犧牲，血緣關係在你心中具有特殊地位。',
    life:
      '你堅守生命神聖的原則，反對任何形式的殺戮和暴力，相信生命權高於其他一切價值。',
    faith:
      '你是一個理想主義者，願意為信仰和理念獻身，即使這意味著與現實產生激烈衝突。',
    truth:
      '你是一個追求真理的人，珍視客觀事實和科學真相，難以接受欺騙和虛假，即使真話可能傷害他人或帶來負面後果。',
    loyalty:
      '你是一個重視承諾和忠誠的人，對組織、團隊和朋友的忠誠在你心中佔據重要位置。',
    safety:
      '你是一個務實的人，認為公共安全和集體利益應該優先於個人自由和權利。',
    environment:
      '你高度關注生態和環境保護，願意為永續發展付出經濟代價。',
    contract:
      '你是一個重信守諾的人，契約精神和商業誠信在你心中佔據重要位置，即使履約會帶來損失，你也傾向於堅守承諾。',
  },
}

const en: UIStrings = {
  appTitle: 'Values Simulator',
  homeSubtitle: 'Explore your value system through real-world dilemmas',
  homeGameTitle: 'Value Ranking Game',
  homeGameDesc:
    'Choose at least 2 of {n} core values and rank them through difficult choices in real cases',
  homeBullet1: 'Moral dilemmas drawn from real issues',
  homeBullet2: 'Multiple cultural perspectives, no single stance',
  homeBullet3: 'Build a value system that withstands reality',
  homeStart: 'Start exploring →',
  languageTitle: 'Choose your language',
  languageSubtitle: 'Select your preferred language. The interface and cases will be shown in it.',
  languageContinue: 'Continue',
  languageChange: 'Change language',
  returnToHome: 'Back to start',
  returnConfirm: 'Current progress will be lost. Return to the home page?',

  loading: 'Loading...',
  selectTitle: 'Value Ranking Game',
  selectSubtitle: 'Choose 2-{n} values below and rank them through head-to-head comparisons',
  selectHint: 'Real cases will help you understand your own value system',
  selectedLabel: 'Selected:',
  preparing: 'Preparing...',
  startCompare: 'Start comparing',
  selectAtLeast: 'Select {n} more value(s)',

  progress: 'Progress',
  stepInitial: 'Step 1: Choose by instinct',
  stepChallenge: 'Step 2: Case challenge',
  stepConfirm: 'Step 3: Confirm again',
  intuitionTitle: 'Follow your instinct: which of these two values matters more to you?',
  intuitionHint: 'Do not overthink. Go with your first feeling. Next, real cases will challenge your choice.',
  processing: 'Processing...',
  confirmChoice: 'Confirm choice',
  challengeAfterChoice: 'You chose {value}. Now let a real case challenge your choice...',
  secondChallengeNotice: 'Let us look at one more real case to confirm your new choice...',
  yearSuffix: '',
  labelBackground: 'Historical background',
  labelDilemma: 'Core dilemma',
  labelActualChoice: 'What actually happened',
  labelConsequences: 'Consequences',
  labelReflection: '',
  afterCaseQuestion: 'After reading this real case, what is your choice?',

  summaryLoading: 'Generating your value profile...',
  summaryTitle: 'Your value profile',
  summarySubtitle: 'Completed {total} comparisons · choices changed: {adjustments}',
  topPriority: 'Highest priority',
  winsLabel: 'Wins',
  lossesLabel: 'Losses',
  fullRanking: 'Full ranking',
  winCount: '{n} wins',
  winCountOne: '{n} win',
  lossCount: '{n} losses',
  lossCountOne: '{n} loss',
  analysisTitle: 'Value analysis',
  keyConflicts: 'Key decision moments',
  adjusted: 'Choice changed',
  finalChoice: 'Final choice',
  lowerPriority: 'Relatively lower priority',
  restart: 'Play again',
  noValue: 'Not selected',

  analysisIntro:
    'In your value system, **{top}** holds the highest priority, while **{bottom}** ranks relatively low.\n\n',
  analysisByValue: {
    justice:
      'You are justice-driven: you value fairness, hold wrongdoers accountable, and protect the innocent, even when it comes at a personal cost and puts you at odds with family, organizations, or social norms.',
    freedom:
      'You deeply value personal freedom and autonomy, and tend to resist coercion and control in any form, even at some risk.',
    family:
      'You put family and kinship first and are willing to make great sacrifices to protect your loved ones. Blood ties hold a special place in your heart.',
    life:
      'You hold life to be sacred, oppose killing and violence in any form, and believe the right to life outranks every other value.',
    faith:
      'You are an idealist willing to devote yourself to a faith or cause, even when it brings you into sharp conflict with reality.',
    truth:
      'You seek truth and prize objective facts and scientific accuracy. You find deception and falsehood hard to accept, even when honesty may hurt others or bring negative consequences.',
    loyalty:
      'You value commitment and loyalty; faithfulness to organizations, teams, and friends occupies an important place in your heart.',
    safety:
      'You are pragmatic and believe public safety and collective interests should take precedence over individual freedoms and rights.',
    environment:
      'You care deeply about ecology and environmental protection, and are willing to bear economic costs for sustainability.',
    contract:
      'You keep your word; contractual integrity and commercial honesty matter greatly to you, and you tend to honor commitments even when performance is costly.',
  },
}

const de: UIStrings = {
  appTitle: 'Werte-Simulator',
  homeSubtitle: 'Erkunde dein Wertesystem anhand realer Dilemmata',
  homeGameTitle: 'Werte-Ranking-Spiel',
  homeGameDesc:
    'Wähle mindestens 2 von {n} Kernwerten und ordne sie durch schwierige Entscheidungen in echten Fällen',
  homeBullet1: 'Moralische Dilemmata aus realen Themen',
  homeBullet2: 'Vielfältige kulturelle Perspektiven, keine einseitige Haltung',
  homeBullet3: 'Ein Wertesystem aufbauen, das der Wirklichkeit standhält',
  homeStart: 'Entdecken →',
  languageTitle: 'Sprache wählen',
  languageSubtitle: 'Wähle deine bevorzugte Sprache. Oberfläche und Fälle werden darin angezeigt.',
  languageContinue: 'Weiter',
  languageChange: 'Sprache ändern',
  returnToHome: 'Zur Startseite',
  returnConfirm: 'Der aktuelle Fortschritt geht verloren. Zur Startseite zurückkehren?',

  loading: 'Wird geladen...',
  selectTitle: 'Werte-Ranking-Spiel',
  selectSubtitle: 'Wähle 2-{n} Werte aus und ordne sie durch direkte Vergleiche',
  selectHint: 'Reale Fälle helfen dir, dein eigenes Wertesystem zu verstehen',
  selectedLabel: 'Ausgewählt:',
  preparing: 'Wird vorbereitet...',
  startCompare: 'Vergleich starten',
  selectAtLeast: 'Wähle noch {n} Wert(e)',
  progress: 'Fortschritt',
  stepInitial: 'Schritt 1: Aus dem Bauch heraus wählen',
  stepChallenge: 'Schritt 2: Fall-Herausforderung',
  stepConfirm: 'Schritt 3: Erneut bestätigen',
  intuitionTitle: 'Folge deinem Instinkt: Welcher dieser beiden Werte ist dir wichtiger?',
  intuitionHint: 'Denk nicht zu viel nach. Folge deinem ersten Gefühl. Danach fordern reale Fälle deine Wahl heraus.',
  processing: 'Wird verarbeitet...',
  confirmChoice: 'Auswahl bestätigen',
  challengeAfterChoice: 'Du hast {value} gewählt. Nun fordert ein realer Fall deine Wahl heraus...',
  secondChallengeNotice: 'Betrachten wir noch einen realen Fall, um deine neue Wahl zu bestätigen...',
  yearSuffix: '',
  labelBackground: 'Historischer Hintergrund',
  labelDilemma: 'Kernkonflikt',
  labelActualChoice: 'Was tatsächlich geschah',
  labelConsequences: 'Folgen',
  labelReflection: '',
  afterCaseQuestion: 'Wie entscheidest du dich nach diesem realen Fall?',

  summaryLoading: 'Dein Werteprofil wird erstellt...',
  summaryTitle: 'Dein Werteprofil',
  summarySubtitle: '{total} Vergleiche abgeschlossen · geänderte Entscheidungen: {adjustments}',
  topPriority: 'Höchste Priorität',
  winsLabel: 'Siege',
  lossesLabel: 'Niederlagen',
  fullRanking: 'Vollständige Rangliste',
  winCount: '{n} Siege',
  winCountOne: '{n} Sieg',
  lossCount: '{n} Niederlagen',
  lossCountOne: '{n} Niederlage',
  analysisTitle: 'Werteanalyse',
  keyConflicts: 'Wichtige Entscheidungsmomente',
  adjusted: 'Wahl geändert',
  finalChoice: 'Endgültige Wahl',
  lowerPriority: 'Relativ niedrigere Priorität',
  restart: 'Erneut spielen',
  noValue: 'Nicht ausgewählt',

  analysisIntro:
    'In deinem Wertesystem hat **{top}** die höchste Priorität, während **{bottom}** relativ niedrig rangiert.\n\n',
  analysisByValue: {
    justice:
      'Du bist gerechtigkeitsorientiert: Fairness, die Verantwortung von Tätern und der Schutz Unschuldiger sind dir wichtig – auch um persönlichen Preis und selbst wenn du dich damit gegen Familie, Organisationen oder gesellschaftliche Normen stellst.',
    freedom:
      'Du schätzt persönliche Freiheit und Selbstbestimmung sehr und neigst dazu, Zwang und Kontrolle jeder Art zu widerstehen, selbst wenn das Risiken birgt.',
    family:
      'Familie und Verwandtschaft stehen für dich an erster Stelle. Du bist bereit, große Opfer zu bringen, um deine Liebsten zu schützen; Blutsbande haben einen besonderen Platz in deinem Herzen.',
    life:
      'Für dich ist das Leben heilig. Du lehnst Töten und Gewalt in jeder Form ab und glaubst, dass das Recht auf Leben alle anderen Werte überragt.',
    faith:
      'Du bist ein Idealist, der sich für einen Glauben oder eine Überzeugung einsetzt, selbst wenn dies zu scharfen Konflikten mit der Wirklichkeit führt.',
    truth:
      'Du suchst die Wahrheit und schätzt objektive Fakten und wissenschaftliche Genauigkeit. Täuschung und Unwahrheit fallen dir schwer zu akzeptieren, selbst wenn Ehrlichkeit andere verletzen oder negative Folgen haben kann.',
    loyalty:
      'Treue und Verlässlichkeit sind dir wichtig; Loyalität gegenüber Organisationen, Teams und Freunden nimmt einen hohen Stellenwert ein.',
    safety:
      'Du bist pragmatisch und findest, dass öffentliche Sicherheit und kollektive Interessen Vorrang vor individuellen Freiheiten und Rechten haben sollten.',
    environment:
      'Ökologie und Umweltschutz liegen dir sehr am Herzen, und du bist bereit, für Nachhaltigkeit wirtschaftliche Kosten zu tragen.',
    contract:
      'Du hältst dein Wort. Vertragstreue und geschäftliche Ehrlichkeit sind dir wichtig, und du neigst dazu, Zusagen auch dann einzuhalten, wenn die Erfüllung teuer wird.',
  },
}

const ja: UIStrings = {
  appTitle: '価値観シミュレーター',
  homeSubtitle: '実際の事例を通して自分の価値観体系を探る',
  homeGameTitle: '価値観ランキングゲーム',
  homeGameDesc: '{n} の核心的価値から少なくとも 2 つを選び、実際の事例の難しい選択を通して本当の価値観の順位を見つけましょう',
  homeBullet1: '現実の課題から生まれた道徳的ジレンマ',
  homeBullet2: '多様な文化的視点、単一の立場に偏らない',
  homeBullet3: '現実に耐える価値観体系を築く',
  homeStart: '探索を始める →',
  languageTitle: '言語を選択',
  languageSubtitle: '希望する言語を選んでください。画面と事例はその言語で表示されます。',
  languageContinue: '続ける',
  languageChange: '言語を変更',
  returnToHome: '最初のページに戻る',
  returnConfirm: '現在のゲーム進行は失われます。ホームに戻りますか？',

  loading: '読み込み中...',
  selectTitle: '価値観ランキングゲーム',
  selectSubtitle: '以下の価値観から 2〜{n} 個を選び、1 対 1 の比較で順位をつけます',
  selectHint: '実際の事例を通して、自分の価値観体系を理解できます',
  selectedLabel: '選択済み：',
  preparing: '準備中...',
  startCompare: '比較を始める',
  selectAtLeast: 'あと {n} 個の価値観を選んでください',
  progress: '進捗',
  stepInitial: 'ステップ1：直感で選ぶ',
  stepChallenge: 'ステップ2：事例による挑戦',
  stepConfirm: 'ステップ3：再確認',
  intuitionTitle: '直感で選んでください：この 2 つの価値観のうち、あなたにとってより重要なのはどちらですか？',
  intuitionHint: '考えすぎず、最初の感覚に従ってください。この後、実際の事例でその選択を揺さぶります。',
  processing: '処理中...',
  confirmChoice: '選択を確定',
  challengeAfterChoice: 'あなたは {value} を選びました。実際の事例でその選択を試しましょう...',
  secondChallengeNotice: 'もう一つの実際の事例を見て、新しい選択を確認しましょう...',
  yearSuffix: '年',
  labelBackground: '歴史的背景',
  labelDilemma: '核心的なジレンマ',
  labelActualChoice: '実際の選択',
  labelConsequences: '結果',
  labelReflection: '',
  afterCaseQuestion: 'この実際の事例を読んだ後、あなたの選択は？',

  summaryLoading: 'あなたの価値観の系譜を生成中...',
  summaryTitle: 'あなたの価値観の系譜',
  summarySubtitle: '{total} 回の比較を完了し、{adjustments} 回選択を変更しました',
  topPriority: '最優先',
  winsLabel: '勝ち',
  lossesLabel: '負け',
  fullRanking: '完全なランキング',
  winCount: '{n}勝',
  winCountOne: '{n}勝',
  lossCount: '{n}敗',
  lossCountOne: '{n}敗',
  analysisTitle: '価値観分析',
  keyConflicts: '重要な決断の瞬間',
  adjusted: '選択を変更',
  finalChoice: '最終的な選択',
  lowerPriority: '相対的に優先度が低い',
  restart: 'もう一度プレイ',
  noValue: '未選択',

  analysisIntro:
    'あなたの価値観体系では **{top}** が最優先であり、**{bottom}** の優先度は相対的に低いです。\n\n',
  analysisByValue: {
    justice:
      'あなたは正義を重んじる人です。公平を守り、悪行を追及し、無実の人を守ろうとします。無関係な人が巻き込まれることに反対し、たとえ家族や組織、社会規範との衝突を招いても、そのために代価を払うことをいとわないでしょう。',
    freedom:
      'あなたは個人の自由と自律を非常に大切にし、リスクを伴うとしても、あらゆる形の強制や支配に抵抗する傾向があります。',
    family:
      'あなたは家族と親情を最優先し、大切な人を守るために大きな犠牲を払うことをいとわないでしょう。血のつながりはあなたにとって特別な意味を持ちます。',
    life:
      'あなたは生命の神聖さを守り、いかなる形の殺戮や暴力にも反対し、生命の権利があらゆる価値に優先すると信じています。',
    faith:
      'あなたは理想主義者で、信念や理念のために身を捧げることをいとわないでしょう。たとえそれが現実との激しい衝突を生んでも変わりません。',
    truth:
      'あなたは真実を追求する人で、客観的事実や科学的真実を大切にします。たとえ真実が人を傷つけたり悪い結果を招いたりする可能性があっても、欺瞞や虚偽を受け入れるのは難しいでしょう。',
    loyalty:
      'あなたは約束と忠誠を重んじる人です。組織やチーム、友人への忠誠はあなたの中で重要な位置を占めています。',
    safety:
      'あなたは現実主義者で、個人の自由や権利よりも公共の安全と集団の利益が優先されるべきだと考えています。',
    environment:
      'あなたは生態系と環境保護に深く関心を持ち、持続可能な発展のために経済的コストを払うことをいとわないでしょう。',
    contract:
      'あなたは約束を守る人です。契約精神と商取引の誠実さを重視し、履行に損失が伴う場合でも約束を守る傾向があります。',
  },
}

const fr: UIStrings = {
  appTitle: 'Simulateur de valeurs',
  homeSubtitle: 'Explorez votre système de valeurs à travers des dilemmes réels',
  homeGameTitle: 'Jeu de classement des valeurs',
  homeGameDesc:
    'Choisissez au moins 2 des {n} valeurs essentielles et classez-les à travers des choix difficiles issus de cas réels',
  homeBullet1: 'Des dilemmes moraux inspirés de problèmes réels',
  homeBullet2: 'Des perspectives culturelles multiples, sans parti pris unique',
  homeBullet3: 'Bâtir un système de valeurs qui résiste au réel',
  homeStart: 'Commencer l’exploration →',
  languageTitle: 'Choisissez votre langue',
  languageSubtitle: 'Sélectionnez votre langue préférée. L’interface et les cas seront affichés dans cette langue.',
  languageContinue: 'Continuer',
  languageChange: 'Changer de langue',
  returnToHome: 'Retour à l’accueil',
  returnConfirm: 'La progression actuelle sera perdue. Revenir à la page d’accueil ?',

  loading: 'Chargement...',
  selectTitle: 'Jeu de classement des valeurs',
  selectSubtitle: 'Choisissez 2 à {n} valeurs ci-dessous et classez-les par comparaisons en tête-à-tête',
  selectHint: 'Des cas réels vous aideront à comprendre votre propre système de valeurs',
  selectedLabel: 'Sélectionnées :',
  preparing: 'Préparation...',
  startCompare: 'Commencer les comparaisons',
  selectAtLeast: 'Sélectionnez encore {n} valeur(s)',
  progress: 'Progression',
  stepInitial: 'Étape 1 : Choisir à l’instinct',
  stepChallenge: 'Étape 2 : Le défi du cas',
  stepConfirm: 'Étape 3 : Confirmer à nouveau',
  intuitionTitle: 'Suivez votre instinct : laquelle de ces deux valeurs compte le plus pour vous ?',
  intuitionHint: 'Ne réfléchissez pas trop. Suivez votre première impression. Ensuite, des cas réels remettront votre choix en question.',
  processing: 'Traitement...',
  confirmChoice: 'Confirmer le choix',
  challengeAfterChoice: 'Vous avez choisi {value}. Laissez maintenant un cas réel remettre votre choix en question...',
  secondChallengeNotice: 'Regardons un autre cas réel pour confirmer votre nouveau choix...',
  yearSuffix: '',
  labelBackground: 'Contexte historique',
  labelDilemma: 'Dilemme central',
  labelActualChoice: 'Ce qui s’est réellement passé',
  labelConsequences: 'Conséquences',
  labelReflection: '',
  afterCaseQuestion: 'Après avoir lu ce cas réel, quel est votre choix ?',

  summaryLoading: 'Génération de votre profil de valeurs...',
  summaryTitle: 'Votre profil de valeurs',
  summarySubtitle: '{total} comparaisons effectuées · choix modifiés : {adjustments}',
  topPriority: 'Priorité absolue',
  winsLabel: 'Victoires',
  lossesLabel: 'Défaites',
  fullRanking: 'Classement complet',
  winCount: '{n} victoires',
  winCountOne: '{n} victoire',
  lossCount: '{n} défaites',
  lossCountOne: '{n} défaite',
  analysisTitle: 'Analyse des valeurs',
  keyConflicts: 'Moments de décision clés',
  adjusted: 'Choix modifié',
  finalChoice: 'Choix final',
  lowerPriority: 'Priorité relativement plus faible',
  restart: 'Rejouer',
  noValue: 'Non sélectionnée',

  analysisIntro:
    'Dans votre système de valeurs, **{top}** occupe la priorité la plus élevée, tandis que **{bottom}** se situe relativement bas.\n\n',
  analysisByValue: {
    justice:
      'Vous êtes guidé par la justice : vous tenez à l’équité, demandez des comptes aux auteurs de méfaits et protégez les innocents, même à un coût personnel et au risque d’entrer en conflit avec votre famille, une organisation ou les normes sociales.',
    freedom:
      'Vous accordez une grande valeur à la liberté individuelle et à l’autonomie, et vous tendez à résister à toute forme de coercition et de contrôle, même au prix d’un certain risque.',
    family:
      'La famille et les liens du sang passent avant tout : vous êtes prêt à de grands sacrifices pour protéger vos proches, et la parenté occupe une place particulière dans votre cœur.',
    life:
      'Vous considérez la vie comme sacrée, vous vous opposez à toute forme de meurtre et de violence, et vous croyez que le droit à la vie prime sur toute autre valeur.',
    faith:
      'Vous êtes un idéaliste prêt à vous consacrer à une foi ou à une cause, même lorsque cela vous oppose durement à la réalité.',
    truth:
      'Vous recherchez la vérité et tenez aux faits objectifs et à l’exactitude scientifique. La tromperie et le mensonge vous sont difficiles à accepter, même quand la vérité peut blesser autrui ou avoir des conséquences négatives.',
    loyalty:
      'Vous accordez de l’importance à l’engagement et à la loyauté ; la fidélité envers les organisations, les équipes et les amis occupe une place importante dans votre cœur.',
    safety:
      'Vous êtes pragmatique et estimez que la sécurité publique et l’intérêt collectif doivent primer sur les libertés et les droits individuels.',
    environment:
      'Vous êtes très attaché à l’écologie et à la protection de l’environnement, et vous acceptez d’en payer le prix économique pour un développement durable.',
    contract:
      'Vous tenez parole ; l’esprit de contrat et l’honnêteté commerciale comptent beaucoup pour vous, et vous avez tendance à honorer vos engagements même lorsque leur exécution coûte cher.',
  },
}

const ko: UIStrings = {
  appTitle: '가치관 시뮬레이터',
  homeSubtitle: '실제 사례 속 딜레마를 통해 나의 가치관 체계를 탐구하세요',
  homeGameTitle: '가치관 순위 게임',
  homeGameDesc: '{n}개의 핵심 가치 중 최소 2개를 선택하고, 실제 사례의 어려운 선택을 통해 진정한 가치관 순위를 발견하세요',
  homeBullet1: '현실의 쟁점에서 가져온 도덕적 딜레마',
  homeBullet2: '다양한 문화적 관점, 단일 입장 지양',
  homeBullet3: '현실의 시험을 견디는 가치관 체계 구축',
  homeStart: '탐구 시작 →',
  languageTitle: '언어 선택',
  languageSubtitle: '원하는 언어를 선택하세요. 화면과 사례가 해당 언어로 표시됩니다.',
  languageContinue: '계속',
  languageChange: '언어 변경',
  returnToHome: '처음 화면으로',
  returnConfirm: '현재 게임 진행 상황이 사라집니다. 홈으로 돌아갈까요?',

  loading: '불러오는 중...',
  selectTitle: '가치관 순위 게임',
  selectSubtitle: '아래 가치관 중 2~{n}개를 선택하고 1대1 비교로 순위를 정하세요',
  selectHint: '실제 사례를 통해 자신의 가치관 체계를 이해할 수 있습니다',
  selectedLabel: '선택됨:',
  preparing: '준비 중...',
  startCompare: '비교 시작',
  selectAtLeast: '가치관 {n}개를 더 선택하세요',
  progress: '진행',
  stepInitial: '1단계: 직관으로 선택',
  stepChallenge: '2단계: 사례 도전',
  stepConfirm: '3단계: 다시 확인',
  intuitionTitle: '직관을 따르세요: 이 두 가치관 중 어느 것이 당신에게 더 중요한가요?',
  intuitionHint: '생각이 너무 많아지지 않게, 첫 느낌을 따르세요. 이어서 실제 사례가 당신의 선택에 도전합니다.',
  processing: '처리 중...',
  confirmChoice: '선택 확정',
  challengeAfterChoice: '당신은 {value}을(를) 선택했습니다. 이제 실제 사례가 그 선택에 도전합니다...',
  secondChallengeNotice: '새로운 선택을 확인하기 위해 실제 사례를 하나 더 살펴보겠습니다...',
  yearSuffix: '년 ',
  labelBackground: '역사적 배경',
  labelDilemma: '핵심 딜레마',
  labelActualChoice: '실제 선택',
  labelConsequences: '결과',
  labelReflection: '',
  afterCaseQuestion: '이 실제 사례를 읽고 나서 당신의 선택은?',

  summaryLoading: '당신의 가치관 체계를 생성하는 중...',
  summaryTitle: '당신의 가치관 체계',
  summarySubtitle: '{total}회 비교 완료, {adjustments}회 선택 변경',
  topPriority: '최우선 순위',
  winsLabel: '승',
  lossesLabel: '패',
  fullRanking: '전체 순위',
  winCount: '{n}승',
  winCountOne: '{n}승',
  lossCount: '{n}패',
  lossCountOne: '{n}패',
  analysisTitle: '가치관 분석',
  keyConflicts: '핵심 결정의 순간',
  adjusted: '선택 변경됨',
  finalChoice: '최종 선택',
  lowerPriority: '상대적으로 낮은 우선순위',
  restart: '다시 테스트',
  noValue: '선택 안 함',

  analysisIntro:
    '당신의 가치관 체계에서 **{top}**이(가) 최우선이며, **{bottom}**의 우선순위는 상대적으로 낮습니다.\n\n',
  analysisByValue: {
    justice:
      '당신은 정의를 중시하는 사람입니다. 공정을 지키고 악행을 추궁하며 무고한 사람을 보호하려 하며, 관계없는 사람이 휘말리는 것을 반대합니다. 그 대가가 크더라도, 가족이나 조직, 사회 규범과 충돌하게 되더라도 기꺼이 감수합니다.',
    freedom:
      '당신은 개인의 자유와 자율성을 매우 소중히 여기며, 위험이 따르더라도 어떤 형태의 강제와 통제에도 저항하는 경향이 있습니다.',
    family:
      '당신은 가족과 혈육을 최우선으로 두며, 가족을 보호하기 위해 큰 희생을 감수합니다. 혈연은 당신 마음속에서 특별한 위치를 차지합니다.',
    life:
      '당신은 생명의 신성함을 굳게 지키며 모든 형태의 살해와 폭력에 반대하고, 생명권이 그 어떤 가치보다 우선한다고 믿습니다.',
    faith:
      '당신은 이상주의자로, 신앙이나 이념을 위해 헌신합니다. 그것이 현실과 격렬한 충돌을 낳더라도 마찬가지입니다.',
    truth:
      '당신은 진실을 추구하는 사람으로, 객관적 사실과 과학적 진실을 소중히 여깁니다. 진실이 타인을 상처 입히거나 부정적 결과를 낳을 수 있더라도 기만과 거짓을 받아들이기 어렵습니다.',
    loyalty:
      '당신은 약속과 충성을 중시하는 사람입니다. 조직, 팀, 친구에 대한 충성은 당신 마음속에서 중요한 위치를 차지합니다.',
    safety:
      '당신은 현실주의자로, 개인의 자유와 권리보다 공공 안전과 집단의 이익이 우선되어야 한다고 생각합니다.',
    environment:
      '당신은 생태와 환경 보호에 깊은 관심을 가지고 있으며, 지속 가능한 발전을 위해 경제적 비용을 감수합니다.',
    contract:
      '당신은 약속을 지키는 사람입니다. 계약 정신과 상업적 정직함을 중요하게 여기며, 이행에 손실이 따르더라도 약속을 지키는 경향이 있습니다.',
  },
}

const es: UIStrings = {
  appTitle: 'Simulador de valores',
  homeSubtitle: 'Explora tu sistema de valores a través de dilemas reales',
  homeGameTitle: 'Juego de clasificación de valores',
  homeGameDesc:
    'Elige al menos 2 de los {n} valores fundamentales y ordénalos mediante decisiones difíciles en casos reales',
  homeBullet1: 'Dilemas morales inspirados en problemas reales',
  homeBullet2: 'Perspectivas culturales diversas, sin una única postura',
  homeBullet3: 'Construir un sistema de valores que resista la realidad',
  homeStart: 'Empezar a explorar →',
  languageTitle: 'Elige tu idioma',
  languageSubtitle: 'Selecciona tu idioma preferido. La interfaz y los casos se mostrarán en ese idioma.',
  languageContinue: 'Continuar',
  languageChange: 'Cambiar idioma',
  returnToHome: 'Volver al inicio',
  returnConfirm: 'Se perderá el progreso actual. ¿Volver a la página de inicio?',

  loading: 'Cargando...',
  selectTitle: 'Juego de clasificación de valores',
  selectSubtitle: 'Elige entre 2 y {n} valores y ordénalos mediante comparaciones uno a uno',
  selectHint: 'Los casos reales te ayudarán a comprender tu propio sistema de valores',
  selectedLabel: 'Seleccionados:',
  preparing: 'Preparando...',
  startCompare: 'Comenzar a comparar',
  selectAtLeast: 'Selecciona {n} valor(es) más',
  progress: 'Progreso',
  stepInitial: 'Paso 1: Elegir por instinto',
  stepChallenge: 'Paso 2: Desafío del caso',
  stepConfirm: 'Paso 3: Confirmar de nuevo',
  intuitionTitle: 'Sigue tu instinto: ¿cuál de estos dos valores es más importante para ti?',
  intuitionHint: 'No lo pienses demasiado. Sigue tu primera impresión. Después, casos reales desafiarán tu elección.',
  processing: 'Procesando...',
  confirmChoice: 'Confirmar elección',
  challengeAfterChoice: 'Has elegido {value}. Ahora deja que un caso real desafíe tu elección...',
  secondChallengeNotice: 'Veamos otro caso real para confirmar tu nueva elección...',
  yearSuffix: '',
  labelBackground: 'Contexto histórico',
  labelDilemma: 'Dilema central',
  labelActualChoice: 'Lo que realmente ocurrió',
  labelConsequences: 'Consecuencias',
  labelReflection: '',
  afterCaseQuestion: 'Tras leer este caso real, ¿cuál es tu elección?',

  summaryLoading: 'Generando tu perfil de valores...',
  summaryTitle: 'Tu perfil de valores',
  summarySubtitle: '{total} comparaciones completadas · elecciones cambiadas: {adjustments}',
  topPriority: 'Máxima prioridad',
  winsLabel: 'Victorias',
  lossesLabel: 'Derrotas',
  fullRanking: 'Clasificación completa',
  winCount: '{n} victorias',
  winCountOne: '{n} victoria',
  lossCount: '{n} derrotas',
  lossCountOne: '{n} derrota',
  analysisTitle: 'Análisis de valores',
  keyConflicts: 'Momentos clave de decisión',
  adjusted: 'Elección modificada',
  finalChoice: 'Elección final',
  lowerPriority: 'Prioridad relativamente menor',
  restart: 'Volver a jugar',
  noValue: 'No seleccionado',

  analysisIntro:
    'En tu sistema de valores, **{top}** ocupa la máxima prioridad, mientras que **{bottom}** queda relativamente abajo.\n\n',
  analysisByValue: {
    justice:
      'Te guía la justicia: valoras la equidad, exiges responsabilidad a quien hace el mal y proteges a los inocentes, incluso a un coste personal y aunque ello te enfrente a tu familia, a una organización o a las normas sociales.',
    freedom:
      'Valoras profundamente la libertad individual y la autonomía, y tiendes a resistirte a cualquier forma de coerción y control, aunque ello entrañe riesgos.',
    family:
      'La familia y los lazos de sangre están por encima de todo: estás dispuesto a grandes sacrificios para proteger a los tuyos, y el parentesco ocupa un lugar especial en tu corazón.',
    life:
      'Consideras sagrada la vida, te opones a cualquier forma de asesinato y violencia, y crees que el derecho a la vida está por encima de cualquier otro valor.',
    faith:
      'Eres un idealista dispuesto a entregarte a una fe o a una causa, incluso cuando ello te enfrenta duramente a la realidad.',
    truth:
      'Buscas la verdad y valoras los hechos objetivos y la exactitud científica. Te cuesta aceptar el engaño y la falsedad, incluso cuando la verdad puede herir a otros o traer consecuencias negativas.',
    loyalty:
      'Valoras el compromiso y la lealtad; la fidelidad a organizaciones, equipos y amigos ocupa un lugar importante en tu corazón.',
    safety:
      'Eres pragmático y crees que la seguridad pública y el interés colectivo deben prevalecer sobre las libertades y los derechos individuales.',
    environment:
      'Te preocupas profundamente por la ecología y la protección del medioambiente, y estás dispuesto a asumir costes económicos por la sostenibilidad.',
    contract:
      'Cumples tu palabra; la integridad contractual y la honestidad comercial son muy importantes para ti, y tiendes a honrar tus compromisos aunque cumplirlos resulte costoso.',
  },
}

export const UI: Record<Locale, UIStrings> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  en,
  de,
  ja,
  fr,
  ko,
  es,
}
