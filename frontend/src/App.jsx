import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Login from './pages/Login'
import Signup from './pages/Signup'
import useAuthStore from './store/useAuthStore'
import Sidebar from './components/Sidebar'

import ChatbotPage from './pages/ChatbotPage'

/* ===== Protected Route ===== */
function ProtectedRoute({ children, allowGuest = false }) {
  const { user, loading } = useAuthStore()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/5 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">Initializing Identity Forge...</p>
        </div>
      </div>
    )
  }

  if (!user && !allowGuest) {
    return <Navigate to="/login" replace />
  }

  return children
}

/* ===== Page Transition Wrapper ===== */
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

import ErrorBoundary from './components/ErrorBoundary'

/* ===== Main App ===== */
export default function App() {
  const { initialize, user } = useAuthStore()
  const location = useLocation()

  // Initialize auth on mount
  useEffect(() => {
    initialize()
  }, [])

  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-black transition-colors duration-500">
      {/* Navbar always at top */}
      <Navbar />

        {/* Main content area */}
        <main className="flex-1 relative min-w-0">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <ProtectedRoute allowGuest={true}>
                    <PageWrapper>
                      <Landing />
                    </PageWrapper>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tools"
                element={
                  <ProtectedRoute>
                    <PageWrapper>
                      <Dashboard />
                    </PageWrapper>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chatbot"
                element={
                  <ProtectedRoute>
                    <PageWrapper>
                      <ChatbotPage />
                    </PageWrapper>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <PageWrapper>
                      <History />
                    </PageWrapper>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/login"
                element={
                  <PageWrapper>
                    <Login />
                  </PageWrapper>
                }
              />
              <Route
                path="/signup"
                element={
                  <PageWrapper>
                    <Signup />
                  </PageWrapper>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    )
}
