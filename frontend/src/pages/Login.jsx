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
  const { signInWithEmail, signInWithGoogle, loading } = useAuthStore()
  const navigate = useNavigate()

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmail(email, password)
      toast.success('Neural link verified.')
      navigate('/chatbot')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle()
      toast.success('Connection handshake successful.')
      navigate('/chatbot')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#010101] flex items-center justify-center p-8 relative overflow-hidden font-sans selection:bg-white/10">
      <div className="bg-animated" />
      <div className="absolute inset-0 neural-grain opacity-[0.05]" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg glass-hyper p-16 rounded-[4rem] border border-white/5 shadow-[0_80px_160px_rgba(0,0,0,1)] relative z-10"
      >
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-[1.5rem] glass-premium flex items-center justify-center mx-auto mb-10 border border-white/10 shadow-3xl">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10L12 2L20 10L12 18L4 10Z" stroke="white" strokeWidth="2.5" strokeLinecap="square"/>
                <path d="M12 18V22" stroke="white" strokeWidth="2.5"/>
            </svg>
          </div>
          <h1 className="text-4xl font-black mb-4 tracking-tighter text-white">Sign In</h1>
          <p className="text-[10px] text-gray-700 font-bold uppercase tracking-[0.4em]">Establish Neural Connection</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full h-18 py-5 glass border border-white/10 rounded-2xl flex items-center justify-center gap-6 hover:bg-white/5 transition-all mb-10 group relative overflow-hidden"
        >
          <div className="relative">
            <FcGoogle className="w-6 h-6 relative z-10" />
            <div className="absolute inset-0 bg-white blur-xl opacity-20 group-hover:opacity-60 transition-opacity" />
          </div>
          <span className="text-[12px] font-black uppercase tracking-[0.4em] text-white">Direct Handshake</span>
        </button>

        <div className="flex items-center gap-10 mb-10">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-[10px] text-gray-900 font-bold uppercase tracking-[0.5em]">or</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-800 uppercase tracking-[0.5em] ml-2">Email Identity</label>
            <div className="relative group">
              <HiOutlineMail className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-800 group-focus-within:text-white transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="identity@neural.link"
                required
                className="w-full h-18 pl-20 pr-8 bg-white/[0.015] border border-white/5 rounded-2xl text-white text-base focus:outline-none focus:border-white/20 transition-all font-medium placeholder:text-gray-900 shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-800 uppercase tracking-[0.5em] ml-2">Access Key</label>
            <div className="relative group">
              <HiOutlineLockClosed className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-800 group-focus-within:text-white transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-18 pl-20 pr-8 bg-white/[0.015] border border-white/5 rounded-2xl text-white text-base focus:outline-none focus:border-white/20 transition-all font-medium placeholder:text-gray-900 shadow-inner"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-18 bg-white text-black rounded-2xl font-black text-[12px] uppercase tracking-[0.6em] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center shadow-[0_30px_60px_rgba(255,255,255,0.1)]"
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              'Verify Identity'
            )}
          </button>
        </form>

        <p className="text-center mt-16 text-[11px] text-gray-800 font-bold uppercase tracking-[0.4em]">
          New Identity? {' '}
          <Link to="/signup" className="text-white hover:text-gray-400 transition-colors border-b border-white/10 pb-0.5">Register Now</Link>
        </p>
      </motion.div>
    </div>
  )
}
