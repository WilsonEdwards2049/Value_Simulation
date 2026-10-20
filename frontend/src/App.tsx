import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useValueStore } from './store/valueStore'
import HomePage from './pages/HomePage'

// Value Game Pages
import ValueSelectPage from './pages/ValueSelectPage'
import ValueComparePage from './pages/ValueComparePage'
import ValueSummaryPage from './pages/ValueSummaryPage'

export default function App() {
  const valueStatus = useValueStore((s) => s.status)
  const isLoading = useValueStore((s) => s.isLoading)
  const reset = useValueStore((s) => s.reset)
  const navigate = useNavigate()
  const location = useLocation()

  const returnToHome = () => {
    const gameInProgress = valueStatus === 'selecting' || valueStatus === 'comparing'
    if (gameInProgress && !window.confirm('当前游戏进度将丢失，确定返回首页吗？')) return
    reset()
    navigate('/', { replace: true })
  }

  return (
    <>
      {location.pathname !== '/' && (
        <button
          type="button"
          onClick={returnToHome}
          disabled={isLoading}
          className="fixed bottom-4 right-4 z-50 rounded-lg border border-slate-600 bg-slate-800/90 px-4 py-2 text-sm text-slate-300 shadow-lg backdrop-blur transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          返回初始页
        </button>
      )}
      <Routes>
      {/* Home Page */}
      <Route path="/" element={<HomePage />} />

      {/* Value Game Routes */}
      <Route
        path="/values"
        element={
          valueStatus === 'selecting' ? (
            <ValueSelectPage />
          ) : valueStatus === 'comparing' ? (
            <Navigate to="/values/compare" replace />
          ) : valueStatus === 'summary' ? (
            <Navigate to="/values/summary" replace />
          ) : (
            <ValueSelectPage />
          )
        }
      />
      <Route
        path="/values/compare"
        element={
          valueStatus !== 'comparing' ? (
            <Navigate to="/values" replace />
          ) : (
            <ValueComparePage />
          )
        }
      />
      <Route
        path="/values/summary"
        element={
          valueStatus !== 'summary' ? (
            <Navigate to="/values" replace />
          ) : (
            <ValueSummaryPage />
          )
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
