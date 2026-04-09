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
      navigate('/dashboard')
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
    <div className="min-h-screen flex items-center justify-center p-6 bg-black relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative glass-card p-10 w-full max-w-md rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.03)] after:absolute after:inset-0 after:rounded-[2.5rem] after:border after:border-white/20 after:pointer-events-none"
      >
        {/* Rebranded Logo */}
        <div className="flex flex-col items-center mb-12">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.8 }}
            className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span className="font-black text-2xl leading-none">F</span>
          </motion.div>
          <h1 className="text-2xl font-black text-white uppercase tracking-[0.4em]">
            Forge <span className="text-gray-600 font-light">AI</span>
          </h1>
        </div>

        <div className="text-center mb-10">
            <h2 className="text-white font-bold uppercase tracking-[0.3em] text-xs mb-3">Welcome to the Forge</h2>
            <p className="text-gray-600 text-[10px] font-medium uppercase tracking-[0.2em] leading-relaxed max-w-[200px] mx-auto">Access the world's most advanced architectural intelligence.</p>
        </div>

        {/* Google Auth (Rebranded) */}
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,1)' }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-4 py-5 rounded-2xl bg-white/95 text-black font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 mb-8 shadow-xl"
        >
          <FcGoogle className="w-5 h-5" />
          Sign in via Google
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-6 mb-8 px-4">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-[9px] text-gray-800 font-black uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-gray-700 ml-4 block uppercase tracking-[0.3em]">Email Address</label>
            <div className="relative group">
              <HiOutlineMail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within:text-white transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architect@forge.ai"
                required
                className="w-full pl-14 pr-6 py-5 bg-white/[0.02] border border-white/5 rounded-2xl text-white text-[11px] font-medium placeholder-gray-800 focus:outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-gray-700 ml-4 block uppercase tracking-[0.3em]">Access Key</label>
            <div className="relative group">
              <HiOutlineLockClosed className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within:text-white transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-14 pr-6 py-5 bg-white/[0.02] border border-white/5 rounded-2xl text-white text-[11px] font-medium placeholder-gray-800 focus:outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-3 h-3 border-2 border-white/10 border-t-white rounded-full animate-spin" />
                Authorizing...
              </div>
            ) : (
              'Enter the Forge'
            )}
          </button>
        </form>

        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em] text-center mt-12">
          New to Forge?{' '}
          <Link to="/signup" className="text-white hover:text-gray-300 transition-colors underline-offset-8 decoration-white/10 hover:decoration-white/40">
            Create Account
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
