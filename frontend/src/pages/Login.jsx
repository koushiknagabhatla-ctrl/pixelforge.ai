import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi'
import useAuthStore from '../store/useAuthStore'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signInWithGoogle, signInWithEmail } = useAuthStore()
  const navigate = useNavigate()

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const toastId = toast.loading('Synchronizing identity...')
    try {
      await signInWithEmail(email, password)
      toast.success('Welcome Back', { id: toastId })
      navigate('/chatbot') // Directly to Chat for v8.0
    } catch (error) {
      toast.error(error.message || 'Verification failed', { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      toast.error('Google synchronization failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent relative overflow-hidden selection:bg-white selection:text-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative glass-glow glass-edge p-10 w-full max-w-sm rounded-[2.5rem] border border-white/5 shadow-3xl"
      >
        {/* Compact Logo */}
        <div className="flex flex-col items-center mb-10">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 1 }}
            className="w-11 h-11 rounded-2xl bg-white text-black flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <span className="font-black text-xl leading-none">F</span>
          </motion.div>
          <h1 className="text-xl font-black text-white uppercase tracking-[0.5rem]">
            Forge <span className="text-gray-700 font-light">AI</span>
          </h1>
        </div>

        <div className="text-center mb-10">
            <h2 className="text-white font-bold uppercase tracking-[0.4em] text-[10px] mb-3">Identity Forge</h2>
            <p className="text-gray-700 text-[9px] font-medium uppercase tracking-[0.2em] leading-relaxed max-w-[180px] mx-auto opacity-60">Authorize architectural access keys to begin session.</p>
        </div>

        {/* Google Auth (Compact) */}
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,1)' }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-4 py-4 rounded-2xl bg-white/95 text-black font-black text-[9px] uppercase tracking-[0.2em] transition-all duration-300 mb-8 shadow-xl"
        >
          <FcGoogle className="w-4 h-4" />
          Sign in via Google
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8 px-4">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-[8px] text-gray-900 font-black uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Email Form (Compact) */}
        <form onSubmit={handleEmailLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[8px] font-black text-gray-800 ml-4 block uppercase tracking-[0.3em] opacity-40">Email Domain</label>
            <div className="relative group">
              <HiOutlineMail className="absolute left-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-800 group-focus-within:text-white transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architect@forge.ai"
                required
                className="w-full pl-14 pr-6 py-4 bg-white/[0.01] border border-white/5 rounded-xl text-white text-[10px] font-medium placeholder-gray-900 focus:outline-none focus:border-white/10 transition-all shadow-inner"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[8px] font-black text-gray-800 ml-4 block uppercase tracking-[0.3em] opacity-40">Secret Key</label>
            <div className="relative group">
              <HiOutlineLockClosed className="absolute left-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-800 group-focus-within:text-white transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-14 pr-6 py-4 bg-white/[0.01] border border-white/5 rounded-xl text-white text-[10px] font-medium placeholder-gray-900 focus:outline-none focus:border-white/10 transition-all shadow-inner"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/5 py-4 rounded-xl font-black text-[9px] uppercase tracking-[0.4em] transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-3 h-3 border-2 border-white/10 border-t-white rounded-full animate-spin" />
                Synchronizing...
              </div>
            ) : (
              'Initialize'
            )}
          </button>
        </form>

        <p className="text-[8px] text-gray-800 font-bold uppercase tracking-[0.2em] text-center mt-12 opacity-60">
          New to Forge?{' '}
          <Link to="/signup" className="text-white hover:text-gray-400 transition-colors underline-offset-8">
            Create Index
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
