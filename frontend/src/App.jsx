import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import useAuthStore from './store/useAuthStore'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import MobileNav from './components/MobileNav'

const Landing = lazy(() => import('./pages/Landing'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const History = lazy(() => import('./pages/History'))
const ChatbotPage = lazy(() => import('./pages/ChatbotPage'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const About = lazy(() => import('./pages/About'))

/* Smooth page wrapper */
const PageWrap = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="w-full min-h-screen"
  >
    {children}
  </motion.div>
)

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore()
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-white/10 border-t-white rounded-full animate-spin" />
    </div>
  )
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  const { initialize, user } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => { initialize() }, [])

  useEffect(() => {
    if (user && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/chatbot', { replace: true })
    }
  }, [user, location.pathname, navigate])

  const isAuthPage = ['/login', '/signup'].includes(location.pathname)

  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] text-[#fafafa] selection:bg-white/10">
      <Navbar />

      <div className="flex flex-1 pt-16 relative">
        {user && !isAuthPage && <Sidebar />}
        
        <main className={`flex-1 relative min-w-0 transition-all duration-500 ease-out ${user && !isAuthPage ? 'lg:pl-[72px]' : ''}`}>
          <Suspense fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white/10 border-t-white rounded-full animate-spin" />
            </div>
          }>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrap><Landing /></PageWrap>} />
                <Route path="/tools" element={<ProtectedRoute><PageWrap><Dashboard /></PageWrap></ProtectedRoute>} />
                <Route path="/chatbot" element={<ProtectedRoute><PageWrap><ChatbotPage /></PageWrap></ProtectedRoute>} />
                <Route path="/history" element={<ProtectedRoute><PageWrap><History /></PageWrap></ProtectedRoute>} />
                <Route path="/login" element={<PageWrap><Login /></PageWrap>} />
                <Route path="/about" element={<PageWrap><About /></PageWrap>} />
                <Route path="/signup" element={<PageWrap><Signup /></PageWrap>} />
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
