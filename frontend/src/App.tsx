import { Routes, Route, Navigate } from 'react-router-dom'
import { useGameStore } from './store/gameStore'
import { useValueStore } from './store/valueStore'
import HomePage from './pages/HomePage'

// Economic Game Pages
import IdentitySelectPage from './pages/IdentitySelectPage'
import GamePage from './pages/GamePage'
import SummaryPage from './pages/SummaryPage'

// Value Game Pages
import ValueSelectPage from './pages/ValueSelectPage'
import ValueComparePage from './pages/ValueComparePage'
import ValueSummaryPage from './pages/ValueSummaryPage'

export default function App() {
  const economicStatus = useGameStore((s) => s.appStatus)
  const valueStatus = useValueStore((s) => s.status)

  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<HomePage />} />

      {/* Economic Game Routes */}
      <Route
        path="/economic"
        element={
          economicStatus === 'identity_select' ? (
            <IdentitySelectPage />
          ) : economicStatus === 'summary' ? (
            <Navigate to="/economic/summary" replace />
          ) : (
            <Navigate to="/economic/game" replace />
          )
        }
      />
      <Route
        path="/economic/game"
        element={
          economicStatus === 'identity_select' ? (
            <Navigate to="/economic" replace />
          ) : economicStatus === 'summary' ? (
            <Navigate to="/economic/summary" replace />
          ) : (
            <GamePage />
          )
        }
      />
      <Route
        path="/economic/summary"
        element={
          economicStatus !== 'summary' ? <Navigate to="/economic" replace /> : <SummaryPage />
        }
      />

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
  )
}
