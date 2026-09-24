import { useNavigate } from 'react-router-dom'
import { VALUES } from '../engine/data'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">价值观模拟器</h1>
          <p className="text-slate-400 text-lg">
            通过案例情境探索你的价值观体系
          </p>
        </div>

        <div className="max-w-md mx-auto">
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
                从 {VALUES.length} 个核心价值中选择至少 2 个，通过案例中的艰难抉择，发现你内心真正的价值观排序
              </p>
            </div>
            <div className="space-y-2 text-left">
              <div className="flex items-start gap-2 text-slate-400 text-sm">
                <span className="text-indigo-400">✓</span>
                <span>借鉴现实议题的道德困境</span>
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
        </div>
      </div>
    </div>
  )
}
