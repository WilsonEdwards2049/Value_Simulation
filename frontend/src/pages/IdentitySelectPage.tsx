import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'

interface IdentityConfig {
  id: string
  icon: string
  name: string
  subtitle: string
  description: string
  keyMetrics: string[]
  color: string
  bgColor: string
  borderColor: string
}

const IDENTITIES: IdentityConfig[] = [
  {
    id: 'small_company',
    icon: '🏢',
    name: '小公司老板',
    subtitle: '初创企业',
    description: '带领初创团队，在竞争激烈的市场中生存与成长，每一分钱都要花在刀刃上',
    keyMetrics: ['营收', '现金流', '员工满意度'],
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-900/20',
    borderColor: 'border-emerald-700 hover:border-emerald-400',
  },
  {
    id: 'tech_giant',
    icon: '💻',
    name: '头部科技公司老板',
    subtitle: '科技巨头',
    description: '掌舵科技巨头，平衡创新、垄断与社会责任，在监管压力下寻找可持续增长',
    keyMetrics: ['市值', '研发投入比', '监管风险'],
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/20',
    borderColor: 'border-purple-700 hover:border-purple-400',
  },
  {
    id: 'mayor',
    icon: '🏛️',
    name: '市长',
    subtitle: '城市管理者',
    description: '管理一座城市，平衡发展、民生与环境，在财政约束下让每位市民生活更美好',
    keyMetrics: ['财政收入', '市民满意度', '环境指数'],
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/20',
    borderColor: 'border-blue-700 hover:border-blue-400',
  },
  {
    id: 'small_nation',
    icon: '🌍',
    name: '小国元首',
    subtitle: '新兴国家',
    description: '引领小国崛起，在大国博弈的夹缝中寻找生机，用智慧弥补实力的不足',
    keyMetrics: ['国民支持率', '外交关系', 'GDP增速'],
    color: 'text-amber-400',
    bgColor: 'bg-amber-900/20',
    borderColor: 'border-amber-700 hover:border-amber-400',
  },
  {
    id: 'superpower',
    icon: '🦅',
    name: '大国元首',
    subtitle: '超级大国',
    description: '执掌超级大国，每一个决定都可能影响全球格局，在利益与价值观之间艰难抉择',
    keyMetrics: ['军事实力', '外交影响力', '科技领先'],
    color: 'text-red-400',
    bgColor: 'bg-red-900/20',
    borderColor: 'border-red-700 hover:border-red-400',
  },
]

export default function IdentitySelectPage() {
  const { startGame, isLoading } = useGameStore()
  const navigate = useNavigate()

  const handleSelect = async (identityId: string) => {
    await startGame(identityId)
    navigate('/economic/game')
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
          价值观模拟器
        </h1>
        <p className="text-slate-400 text-lg">
          选择你的身份，开启决策之旅
        </p>
        <p className="text-slate-500 text-sm mt-1">
          共 9 轮决策，每一个选择都会产生真实的经济后果
        </p>
      </div>

      {/* Identity Cards */}
      <div className="flex-1 flex items-start justify-center px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl w-full">
          {IDENTITIES.map((identity) => (
            <button
              key={identity.id}
              onClick={() => handleSelect(identity.id)}
              disabled={isLoading}
              className={`
                relative text-left p-6 rounded-xl border-2 transition-all duration-200
                ${identity.bgColor} ${identity.borderColor}
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02] hover:shadow-xl'}
              `}
            >
              {/* Icon + Name */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{identity.icon}</span>
                <div>
                  <div className={`text-lg font-bold ${identity.color}`}>
                    {identity.name}
                  </div>
                  <div className="text-xs text-slate-500">{identity.subtitle}</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {identity.description}
              </p>

              {/* Key Metrics */}
              <div className="flex flex-wrap gap-2">
                {identity.keyMetrics.map((m) => (
                  <span
                    key={m}
                    className="px-2 py-0.5 text-xs rounded-full bg-slate-800 text-slate-400"
                  >
                    {m}
                  </span>
                ))}
              </div>

              {/* Click indicator */}
              <div className={`absolute top-4 right-4 text-xs ${identity.color} opacity-60`}>
                点击选择 →
              </div>
            </button>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-white text-xl animate-pulse">游戏初始化中...</div>
        </div>
      )}
    </div>
  )
}
