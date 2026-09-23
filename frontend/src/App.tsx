import { Routes, Route, Navigate } from 'react-router-dom'
import { useValueStore } from './store/valueStore'
import HomePage from './pages/HomePage'

// Value Game Pages
import ValueSelectPage from './pages/ValueSelectPage'
import ValueComparePage from './pages/ValueComparePage'
import ValueSummaryPage from './pages/ValueSummaryPage'

export default function App() {
  const valueStatus = useValueStore((s) => s.status)

  return (
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
  )
}
