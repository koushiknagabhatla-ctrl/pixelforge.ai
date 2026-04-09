import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import useAuthStore from './store/useAuthStore'

// Components
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'
import Sidebar from './components/Sidebar'
import MobileNav from './components/MobileNav'

// Lazy Pages
const Landing = lazy(() => import('./pages/Landing'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const History = lazy(() => import('./pages/History'))
const ChatbotPage = lazy(() => import('./pages/ChatbotPage'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))

/* ===== Protected Route ===== */
function ProtectedRoute({ children, allowGuest = false }) {
  const { user, loading } = useAuthStore()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  if (!user && !allowGuest) return <Navigate to="/login" replace />
  return children
}

/* ===== Main App Architecture v25.0 ===== */
export default function App() {
  const { initialize, user } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    initialize()
  }, [])

  // Nav Liberation: Remove auto-redirect away from Landing for Auth users
  useEffect(() => {
    if (user && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/chatbot', { replace: true })
    }
  }, [user, location.pathname, navigate])

  const isAuthPage = ['/login', '/signup'].includes(location.pathname)

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-[#f8fafc] selection:bg-white/10">
      
      <Navbar />

      <div className="flex flex-1 pt-20 relative">
        {user && !isAuthPage && <Sidebar />}
        
        <main className={`flex-1 relative min-w-0 transition-all duration-300 ${user && !isAuthPage ? 'lg:pl-[80px]' : ''}`}>
          <Suspense fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white/10 border-t-white rounded-full animate-spin" />
            </div>
          }>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                  <PageTransition>
                    <Landing />
                  </PageTransition>
                } 
                />
                
                <Route path="/tools" element={
                  <ProtectedRoute>
                    <PageTransition>
                      <Dashboard />
                    </PageTransition>
                  </ProtectedRoute>
                } 
                />
                
                <Route path="/chatbot" element={
                  <ProtectedRoute>
                    <PageTransition>
                      <ChatbotPage />
                    </PageTransition>
                  </ProtectedRoute>
                } 
                />
                
                <Route path="/history" element={
                  <ProtectedRoute>
                    <PageTransition>
                      <History />
                    </PageTransition>
                  </ProtectedRoute>
                } 
                />

                <Route path="/login" element={
                  <PageTransition>
                    <Login />
                  </PageTransition>
                } 
                />
                
                <Route path="/signup" element={
                  <PageTransition>
                    <Signup />
                  </PageTransition>
                } 
                />
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>
      </div>

      {user && !isAuthPage && <MobileNav />}
    </div>
  )
}
