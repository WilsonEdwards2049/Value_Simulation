import type { Locale } from './locales'

interface EngineMessages {
  startPrompt: string
  selectedStart: string
  intuition: string
  firstChallenge: string
  secondChallenge: string
  allComplete: string
  recorded: string
  summaryReady: string
  notEnoughPairs: string
  recommend1: string
  recommend2: string
  errSelectRange: string
  errNoCase: string
  errNotSelecting: string
  errNotComparing: string
  errNoActiveComparison: string
  errGameEnded: string
  errAllCompleted: string
  errInvalidValue: string
  errInvalidWinner: string
  errInvalidStage: string
  errNotFinished: string
}

export const ENGINE_MESSAGES: Record<Locale, EngineMessages> = {
  'zh-CN': {
    startPrompt: '请从以下价值观中选择至少2个你认为最重要的',
    selectedStart: '你选择了{count}个价值观，现在开始配对比较',
    intuition: '请凭直觉选择：这两个价值观中，哪个对你更重要？',
    firstChallenge: '让我们看一个真实案例，挑战你的选择...',
    secondChallenge: '让我们再看一个案例，确认你的新选择...',
    allComplete: '所有比较已完成！正在生成你的价值观谱系...',
    recorded: '比较已记录，准备下一对比较',
    summaryReady: '你的价值观谱系已生成',
    notEnoughPairs:
      '所选价值观之间只有 {pairs} 个可比较的配对，至少需要 {min} 个才能完成排序。\n' +
      '当前可比较的配对：\n{pairList}\n\n请尝试选择以下组合之一：\n  {rec1}\n  {rec2}',
    recommend1: '推荐组合1: 正义、忠诚、真实、生命、自由、安全',
    recommend2: '推荐组合2: 信仰、亲情、正义、忠诚、真实',
    errSelectRange: '请选择 2-{max} 个价值观',
    errNoCase: '没有找到可用于挑战的案例',
    errNotSelecting: '游戏不在选择阶段',
    errNotComparing: '游戏不在比较阶段',
    errNoActiveComparison: '当前没有进行中的比较',
    errGameEnded: '游戏已结束',
    errAllCompleted: '所有比较已完成',
    errInvalidValue: '无效的价值观 ID：{id}',
    errInvalidWinner: '获胜方必须是 value_a 或 value_b',
    errInvalidStage: '无效的阶段：{stage}',
    errNotFinished: '游戏尚未结束',
  },
  'zh-TW': {
    startPrompt: '請從以下價值觀中選擇至少2個你認為最重要的',
    selectedStart: '你選擇了{count}個價值觀，現在開始配對比較',
    intuition: '請憑直覺選擇：這兩個價值觀中，哪個對你更重要？',
    firstChallenge: '讓我們看一個真實案例，挑戰你的選擇...',
    secondChallenge: '讓我們再看一個案例，確認你的新選擇...',
    allComplete: '所有比較已完成！正在生成你的價值觀譜系...',
    recorded: '比較已記錄，準備下一對比較',
    summaryReady: '你的價值觀譜系已生成',
    notEnoughPairs:
      '所選價值觀之間只有 {pairs} 個可比較的配對，至少需要 {min} 個才能完成排序。\n' +
      '目前可比較的配對：\n{pairList}\n\n請嘗試選擇以下組合之一：\n  {rec1}\n  {rec2}',
    recommend1: '推薦組合1: 正義、忠誠、真實、生命、自由、安全',
    recommend2: '推薦組合2: 信仰、親情、正義、忠誠、真實',
    errSelectRange: '請選擇 2-{max} 個價值觀',
    errNoCase: '沒有找到可用於挑戰的案例',
    errNotSelecting: '遊戲不在選擇階段',
    errNotComparing: '遊戲不在比較階段',
    errNoActiveComparison: '目前沒有進行中的比較',
    errGameEnded: '遊戲已結束',
    errAllCompleted: '所有比較已完成',
    errInvalidValue: '無效的價值觀 ID：{id}',
    errInvalidWinner: '獲勝方必須是 value_a 或 value_b',
    errInvalidStage: '無效的階段：{stage}',
    errNotFinished: '遊戲尚未結束',
  },
  en: {
    startPrompt: 'Choose at least 2 values that matter most to you',
    selectedStart: 'You selected {count} values. Starting pairwise comparisons.',
    intuition: 'Follow your instinct: which of these two values matters more to you?',
    firstChallenge: 'Let us look at a real case to challenge your choice...',
    secondChallenge: 'Let us look at another case to confirm your new choice...',
    allComplete: 'All comparisons complete! Generating your value profile...',
    recorded: 'Comparison recorded. Preparing the next pair.',
    summaryReady: 'Your value profile is ready',
    notEnoughPairs:
      'The selected values have only {pairs} comparable pair(s), but at least {min} are needed to complete the ranking.\n' +
      'Comparable pairs:\n{pairList}\n\nTry one of these combinations:\n  {rec1}\n  {rec2}',
    recommend1: 'Recommended 1: Justice, Loyalty, Truth, Life, Freedom, Safety',
    recommend2: 'Recommended 2: Faith, Family, Justice, Loyalty, Truth',
    errSelectRange: 'Please select 2-{max} values',
    errNoCase: 'No case is available for this challenge',
    errNotSelecting: 'The game is not in the selection phase',
    errNotComparing: 'The game is not in the comparison phase',
    errNoActiveComparison: 'There is no active comparison',
    errGameEnded: 'The game has ended',
    errAllCompleted: 'All comparisons are complete',
    errInvalidValue: 'Invalid value ID: {id}',
    errInvalidWinner: 'The winner must be value_a or value_b',
    errInvalidStage: 'Invalid stage: {stage}',
    errNotFinished: 'The game has not finished yet',
  },
  de: {
    startPrompt: 'Wähle mindestens 2 Werte, die dir am wichtigsten sind',
    selectedStart: 'Du hast {count} Werte gewählt. Die Paarvergleiche beginnen.',
    intuition: 'Folge deinem Instinkt: Welcher dieser beiden Werte ist dir wichtiger?',
    firstChallenge: 'Betrachten wir einen realen Fall, der deine Wahl herausfordert...',
    secondChallenge: 'Betrachten wir noch einen Fall, um deine neue Wahl zu bestätigen...',
    allComplete: 'Alle Vergleiche abgeschlossen! Dein Werteprofil wird erstellt...',
    recorded: 'Vergleich gespeichert. Das nächste Paar wird vorbereitet.',
    summaryReady: 'Dein Werteprofil ist fertig',
    notEnoughPairs:
      'Die gewählten Werte haben nur {pairs} vergleichbare Paar(e), aber mindestens {min} sind für die Rangliste nötig.\n' +
      'Vergleichbare Paare:\n{pairList}\n\nVersuche eine dieser Kombinationen:\n  {rec1}\n  {rec2}',
    recommend1: 'Empfehlung 1: Gerechtigkeit, Loyalität, Wahrheit, Leben, Freiheit, Sicherheit',
    recommend2: 'Empfehlung 2: Glaube, Familie, Gerechtigkeit, Loyalität, Wahrheit',
    errSelectRange: 'Bitte wähle 2-{max} Werte',
    errNoCase: 'Für diese Herausforderung ist kein Fall verfügbar',
    errNotSelecting: 'Das Spiel befindet sich nicht in der Auswahlphase',
    errNotComparing: 'Das Spiel befindet sich nicht in der Vergleichsphase',
    errNoActiveComparison: 'Es gibt keinen laufenden Vergleich',
    errGameEnded: 'Das Spiel ist beendet',
    errAllCompleted: 'Alle Vergleiche sind abgeschlossen',
    errInvalidValue: 'Ungültige Wert-ID: {id}',
    errInvalidWinner: 'Der Gewinner muss value_a oder value_b sein',
    errInvalidStage: 'Ungültige Phase: {stage}',
    errNotFinished: 'Das Spiel ist noch nicht beendet',
  },
  ja: {
    startPrompt: '以下から、あなたにとって最も重要な価値観を 2 つ以上選んでください',
    selectedStart: '{count} 個の価値観を選びました。ペア比較を開始します。',
    intuition: '直感で選んでください：この 2 つの価値観のうち、あなたにとってより重要なのはどちらですか？',
    firstChallenge: '実際の事例を見て、あなたの選択を試しましょう...',
    secondChallenge: 'もう一つの事例を見て、新しい選択を確認しましょう...',
    allComplete: 'すべての比較が完了しました！価値観の系譜を生成しています...',
    recorded: '比較を記録しました。次のペアを準備しています。',
    summaryReady: '価値観の系譜が完成しました',
    notEnoughPairs:
      '選んだ価値観の間には比較可能なペアが {pairs} 組しかなく、ランキングには少なくとも {min} 組必要です。\n' +
      '比較可能なペア：\n{pairList}\n\n次のいずれかの組み合わせを試してください：\n  {rec1}\n  {rec2}',
    recommend1: 'おすすめ1：正義、忠誠、真実、生命、自由、安全',
    recommend2: 'おすすめ2：信仰、家族愛、正義、忠誠、真実',
    errSelectRange: '価値観を 2〜{max} 個選んでください',
    errNoCase: 'この挑戦に使える事例が見つかりません',
    errNotSelecting: 'ゲームは選択段階ではありません',
    errNotComparing: 'ゲームは比較段階ではありません',
    errNoActiveComparison: '進行中の比較がありません',
    errGameEnded: 'ゲームは終了しました',
    errAllCompleted: 'すべての比較が完了しました',
    errInvalidValue: '無効な価値観 ID：{id}',
    errInvalidWinner: '勝者 は value_a または value_b でなければなりません',
    errInvalidStage: '無効な段階：{stage}',
    errNotFinished: 'ゲームはまだ終了していません',
  },
  fr: {
    startPrompt: 'Choisissez au moins 2 valeurs qui comptent le plus pour vous',
    selectedStart: 'Vous avez sélectionné {count} valeurs. Les comparaisons par paires commencent.',
    intuition: 'Suivez votre instinct : laquelle de ces deux valeurs compte le plus pour vous ?',
    firstChallenge: 'Regardons un cas réel pour remettre votre choix en question...',
    secondChallenge: 'Regardons un autre cas pour confirmer votre nouveau choix...',
    allComplete: 'Toutes les comparaisons sont terminées ! Génération de votre profil de valeurs...',
    recorded: 'Comparaison enregistrée. Préparation de la paire suivante.',
    summaryReady: 'Votre profil de valeurs est prêt',
    notEnoughPairs:
      'Les valeurs sélectionnées ne forment que {pairs} paire(s) comparable(s), alors qu’au moins {min} sont nécessaires pour établir le classement.\n' +
      'Paires comparables :\n{pairList}\n\nEssayez l’une de ces combinaisons :\n  {rec1}\n  {rec2}',
    recommend1: 'Recommandation 1 : Justice, Loyauté, Vérité, Vie, Liberté, Sécurité',
    recommend2: 'Recommandation 2 : Foi, Famille, Justice, Loyauté, Vérité',
    errSelectRange: 'Veuillez choisir 2 à {max} valeurs',
    errNoCase: 'Aucun cas n’est disponible pour ce défi',
    errNotSelecting: 'Le jeu n’est pas en phase de sélection',
    errNotComparing: 'Le jeu n’est pas en phase de comparaison',
    errNoActiveComparison: 'Aucune comparaison n’est en cours',
    errGameEnded: 'La partie est terminée',
    errAllCompleted: 'Toutes les comparaisons sont terminées',
    errInvalidValue: 'ID de valeur invalide : {id}',
    errInvalidWinner: 'Le gagnant doit être value_a ou value_b',
    errInvalidStage: 'Étape invalide : {stage}',
    errNotFinished: 'La partie n’est pas encore terminée',
  },
  ko: {
    startPrompt: '가장 중요하다고 생각하는 가치관을 2개 이상 선택하세요',
    selectedStart: '가치관 {count}개를 선택했습니다. 이제 1대1 비교를 시작합니다.',
    intuition: '직관으로 선택하세요: 이 두 가치관 중 어느 것이 당신에게 더 중요한가요?',
    firstChallenge: '실제 사례를 통해 당신의 선택에 도전해 보겠습니다...',
    secondChallenge: '사례를 하나 더 살펴보고 새로운 선택을 확인해 보겠습니다...',
    allComplete: '모든 비교가 끝났습니다! 가치관 체계를 생성하는 중...',
    recorded: '비교가 기록되었습니다. 다음 쌍을 준비합니다.',
    summaryReady: '가치관 체계가 완성되었습니다',
    notEnoughPairs:
      '선택한 가치관 사이에는 비교 가능한 쌍이 {pairs}개뿐이며, 순위를 완성하려면 최소 {min}개가 필요합니다.\n' +
      '비교 가능한 쌍:\n{pairList}\n\n다음 조합 중 하나를 선택해 보세요:\n  {rec1}\n  {rec2}',
    recommend1: '추천 조합 1: 정의, 충성, 진실, 생명, 자유, 안전',
    recommend2: '추천 조합 2: 신앙, 가족애, 정의, 충성, 진실',
    errSelectRange: '가치관을 2~{max}개 선택하세요',
    errNoCase: '이 도전에 사용할 사례를 찾지 못했습니다',
    errNotSelecting: '게임이 선택 단계가 아닙니다',
    errNotComparing: '게임이 비교 단계가 아닙니다',
    errNoActiveComparison: '진행 중인 비교가 없습니다',
    errGameEnded: '게임이 종료되었습니다',
    errAllCompleted: '모든 비교가 완료되었습니다',
    errInvalidValue: '잘못된 가치관 ID: {id}',
    errInvalidWinner: '승자는 value_a 또는 value_b여야 합니다',
    errInvalidStage: '잘못된 단계: {stage}',
    errNotFinished: '게임이 아직 끝나지 않았습니다',
  },
  es: {
    startPrompt: 'Elige al menos 2 valores que sean más importantes para ti',
    selectedStart: 'Has seleccionado {count} valores. Comienzan las comparaciones por pares.',
    intuition: 'Sigue tu instinto: ¿cuál de estos dos valores es más importante para ti?',
    firstChallenge: 'Veamos un caso real que desafíe tu elección...',
    secondChallenge: 'Veamos otro caso para confirmar tu nueva elección...',
    allComplete: '¡Todas las comparaciones han terminado! Generando tu perfil de valores...',
    recorded: 'Comparación registrada. Preparando el siguiente par.',
    summaryReady: 'Tu perfil de valores está listo',
    notEnoughPairs:
      'Los valores seleccionados solo tienen {pairs} par(es) comparable(s), pero se necesitan al menos {min} para completar la clasificación.\n' +
      'Pares comparables:\n{pairList}\n\nPrueba una de estas combinaciones:\n  {rec1}\n  {rec2}',
    recommend1: 'Recomendación 1: Justicia, Lealtad, Verdad, Vida, Libertad, Seguridad',
    recommend2: 'Recomendación 2: Fe, Familia, Justicia, Lealtad, Verdad',
    errSelectRange: 'Elige entre 2 y {max} valores',
    errNoCase: 'No hay ningún caso disponible para este desafío',
    errNotSelecting: 'El juego no está en la fase de selección',
    errNotComparing: 'El juego no está en la fase de comparación',
    errNoActiveComparison: 'No hay una comparación activa',
    errGameEnded: 'El juego ha terminado',
    errAllCompleted: 'Todas las comparaciones están completas',
    errInvalidValue: 'ID de valor no válido: {id}',
    errInvalidWinner: 'El ganador debe ser value_a o value_b',
    errInvalidStage: 'Fase no válida: {stage}',
    errNotFinished: 'El juego aún no ha terminado',
  },
}

export function engineMessage(
  locale: Locale,
  key: keyof EngineMessages,
  params?: Record<string, string | number>
): string {
  const template = ENGINE_MESSAGES[locale][key]
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (match, name) =>
    params[name] !== undefined ? String(params[name]) : match
  )
}
