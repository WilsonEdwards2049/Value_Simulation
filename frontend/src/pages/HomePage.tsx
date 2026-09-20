import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">价值观模拟器</h1>
          <p className="text-slate-400 text-lg">
            通过真实案例探索你的价值观体系，或体验经济学仿真游戏
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 价值观排序游戏 */}
          <button
            onClick={() => navigate('/values')}
            className="group p-8 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-2 border-indigo-500/50 rounded-2xl hover:border-indigo-400 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20"
          >
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-4xl">⚖️</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">价值观排序游戏</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                从 10 个核心价值中选择 6-8 个，通过真实历史案例中的艰难抉择，发现你内心真正的价值观排序
              </p>
            </div>
            <div className="space-y-2 text-left">
              <div className="flex items-start gap-2 text-slate-400 text-sm">
                <span className="text-indigo-400">✓</span>
                <span>基于真实历史人物的道德困境</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400 text-sm">
                <span className="text-indigo-400">✓</span>
                <span>多元文化视角，避免单一立场</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400 text-sm">
                <span className="text-indigo-400">✓</span>
                <span>建立经得住现实考验的价值体系</span>
              </div>
            </div>
            <div className="mt-6 text-indigo-400 font-semibold group-hover:text-indigo-300">
              开始探索 →
            </div>
          </button>

          {/* 经济模拟游戏 */}
          <button
            onClick={() => navigate('/economic')}
            className="group p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-2 border-slate-600/50 rounded-2xl hover:border-slate-500 transition-all duration-300 hover:shadow-xl"
          >
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-slate-700/40 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-4xl">📊</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">经济学仿真游戏</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                选择一个身份，在 9 轮决策中体验经济学原理如何影响现实世界的复杂系统
              </p>
            </div>
            <div className="space-y-2 text-left">
              <div className="flex items-start gap-2 text-slate-400 text-sm">
                <span className="text-emerald-400">✓</span>
                <span>5 种身份：公司老板、市长、国家元首</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400 text-sm">
                <span className="text-emerald-400">✓</span>
                <span>乘数效应、外部性、博弈论等原理</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400 text-sm">
                <span className="text-emerald-400">✓</span>
                <span>实时指标反馈与决策后果分析</span>
              </div>
            </div>
            <div className="mt-6 text-emerald-400 font-semibold group-hover:text-emerald-300">
              开始模拟 →
            </div>
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            两个游戏相互独立，可以分别体验
          </p>
        </div>
      </div>
    </div>
  )
}
