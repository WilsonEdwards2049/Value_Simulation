import { useState, useEffect } from 'react'
import { useValueStore } from '../store/valueStore'

export default function ValueComparePage() {
  const { currentComparison, isLoading, submitChoice } = useValueStore()
  const [selectedChoice, setSelectedChoice] = useState<'value_a' | 'value_b' | null>(null)

  useEffect(() => {
    // 重置选择当比较变化时
    setSelectedChoice(null)
  }, [currentComparison?.value_a?.id, currentComparison?.value_b?.id])

  if (!currentComparison) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400 animate-pulse">正在加载...</div>
      </div>
    )
  }

  const { value_a, value_b, case: caseInfo, progress, stage, initial_choice } = currentComparison

  const handleChoiceSelect = (choice: 'value_a' | 'value_b') => {
    setSelectedChoice(choice)
  }

  const handleSubmit = () => {
    if (!selectedChoice) return
    submitChoice(selectedChoice)
    setSelectedChoice(null)
  }

  // 阶段1: 初始选择（无案例）
  if (stage === 'initial') {
    return (
      <div className="min-h-screen bg-slate-950 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-slate-400 text-xl mb-1">第一步：凭直觉选择</h2>
              <h1 className="text-5xl font-bold text-white">
                {value_a.name} vs {value_b.name}
              </h1>
            </div>
            <div className="text-right">
              <div className="text-slate-400 text-xl mb-1">进度</div>
              <div className="text-xl font-bold text-indigo-400">
                {progress.completed}/{progress.total}
              </div>
              <div className="w-32 h-1.5 bg-slate-800 rounded-full mt-2">
                <div
                  className="h-1.5 bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mb-6 p-4 bg-indigo-900/30 border border-indigo-700/50 rounded-lg">
            <p className="text-indigo-300 text-xl">
              💭 请凭你的直觉选择：这两个价值观中，哪个对你更重要？
            </p>
            <p className="text-indigo-400/70 text-lg mt-2">
              不要过度思考，跟随你的第一感觉。接下来我们会用真实案例挑战你的选择。
            </p>
          </div>

          {/* Value Cards */}
          <div className="space-y-4 mb-8">
            <button
              onClick={() => handleChoiceSelect('value_a')}
              disabled={isLoading}
              className={`
                w-full p-6 rounded-xl border-2 text-left transition-all duration-200
                ${selectedChoice === 'value_a'
                  ? 'bg-indigo-900/40 border-indigo-500 shadow-lg'
                  : 'bg-slate-900/60 border-slate-700 hover:border-slate-500'
                }
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className="flex items-center gap-3 mb-3">
                {selectedChoice === 'value_a' && (
                  <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <h3 className="text-5xl font-bold text-white">{value_a.name}</h3>
              </div>
              <p className="text-slate-300 text-xl leading-relaxed">{value_a.description}</p>
            </button>

            <button
              onClick={() => handleChoiceSelect('value_b')}
              disabled={isLoading}
              className={`
                w-full p-6 rounded-xl border-2 text-left transition-all duration-200
                ${selectedChoice === 'value_b'
                  ? 'bg-indigo-900/40 border-indigo-500 shadow-lg'
                  : 'bg-slate-900/60 border-slate-700 hover:border-slate-500'
                }
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className="flex items-center gap-3 mb-3">
                {selectedChoice === 'value_b' && (
                  <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <h3 className="text-5xl font-bold text-white">{value_b.name}</h3>
              </div>
              <p className="text-slate-300 text-xl leading-relaxed">{value_b.description}</p>
            </button>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={!selectedChoice || isLoading}
              className={`
                px-10 py-4 rounded-xl font-semibold text-xl transition-all duration-200
                ${selectedChoice && !isLoading
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 active:scale-[0.98]'
                  : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                }
              `}
            >
              {isLoading ? '正在处理...' : '确认选择'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 阶段2和3: 展示案例挑战
  if (stage === 'first_challenge' || stage === 'second_challenge') {
    const chosenValue = initial_choice === 'value_a' ? value_a : value_b
    const isSecondChallenge = stage === 'second_challenge'

    return (
      <div className="min-h-screen bg-slate-950 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Progress Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-slate-400 text-xl mb-1">
                {isSecondChallenge ? '第三步：再次确认' : '第二步：案例挑战'}
              </h2>
              <h1 className="text-5xl font-bold text-white">
                {value_a.name} vs {value_b.name}
              </h1>
            </div>
            <div className="text-right">
              <div className="text-slate-400 text-xl mb-1">进度</div>
              <div className="text-xl font-bold text-indigo-400">
                {progress.completed}/{progress.total}
              </div>
              <div className="w-32 h-1.5 bg-slate-800 rounded-full mt-2">
                <div
                  className="h-1.5 bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Challenge Notice */}
          <div className="mb-4 p-4 bg-amber-900/30 border border-amber-700/50 rounded-lg">
            <p className="text-amber-300 text-xl">
              ⚡ {isSecondChallenge ? '让我们再看一个真实案例，确认你的新选择...' : `你选择了 ${chosenValue.name}。现在让我们用一个真实案例挑战你的选择...`}
            </p>
          </div>

          {/* Case Card */}
          {caseInfo && (
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mb-6">
              {/* Case Header */}
              <div className="mb-4 pb-4 border-b border-slate-700">
                <h2 className="text-5xl font-bold text-white mb-2">{caseInfo.title}</h2>
                <div className="flex items-center gap-4 text-slate-400 text-xl">
                  <span>👤 {caseInfo.real_person}</span>
                  <span>📅 {caseInfo.year}年</span>
                  <span>📍 {caseInfo.location}</span>
                </div>
              </div>

              {/* Context */}
              <div className="mb-4">
                <h3 className="text-indigo-400 font-semibold mb-2">历史背景</h3>
                <p className="text-slate-300 text-xl leading-relaxed">{caseInfo.context}</p>
              </div>

              {/* Dilemma */}
              <div className="mb-4 p-4 bg-slate-800/60 rounded-lg border-l-4 border-amber-500">
                <h3 className="text-amber-400 font-semibold mb-2">核心困境</h3>
                <p className="text-slate-300 text-xl leading-relaxed">{caseInfo.dilemma}</p>
              </div>

              {/* Actual Choice */}
              <div className="mb-4">
                <h3 className="text-emerald-400 font-semibold mb-2">真实选择</h3>
                <p className="text-slate-300 text-xl leading-relaxed">{caseInfo.actual_choice}</p>
              </div>

              {/* Consequences */}
              <div className="mb-4">
                <h3 className="text-red-400 font-semibold mb-2">后果</h3>
                <p className="text-slate-300 text-xl leading-relaxed">{caseInfo.consequences}</p>
              </div>

              {/* Reflection */}
              <div className="p-4 bg-indigo-950/40 rounded-lg border border-indigo-800/50">
                <p className="text-indigo-300 text-xl italic">{caseInfo.reflection}</p>
              </div>
            </div>
          )}

          {/* Choice Buttons */}
          <div className="mb-6 bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">读完这个真实案例后，你的选择是？</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleChoiceSelect('value_a')}
                disabled={isLoading}
                className={`
                  w-full p-4 rounded-lg border-2 text-left transition-all duration-200
                  ${selectedChoice === 'value_a'
                    ? 'bg-indigo-900/40 border-indigo-500'
                    : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'
                  }
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <div className="flex items-center gap-3">
                  {selectedChoice === 'value_a' && (
                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <div className="text-white font-semibold mb-1">{value_a.name}</div>
                    <p className="text-slate-400 text-xl">{caseInfo?.choice_a_text}</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleChoiceSelect('value_b')}
                disabled={isLoading}
                className={`
                  w-full p-4 rounded-lg border-2 text-left transition-all duration-200
                  ${selectedChoice === 'value_b'
                    ? 'bg-indigo-900/40 border-indigo-500'
                    : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'
                  }
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <div className="flex items-center gap-3">
                  {selectedChoice === 'value_b' && (
                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <div className="text-white font-semibold mb-1">{value_b.name}</div>
                    <p className="text-slate-400 text-xl">{caseInfo?.choice_b_text}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={!selectedChoice || isLoading}
              className={`
                px-10 py-4 rounded-xl font-semibold text-xl transition-all duration-200
                ${selectedChoice && !isLoading
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 active:scale-[0.98]'
                  : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                }
              `}
            >
              {isLoading ? '正在处理...' : '确认选择'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
