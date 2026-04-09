import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi'
import useAuthStore from '../store/useAuthStore'
import toast from 'react-hot-toast'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const { signUpWithEmail, signInWithGoogle, loading } = useAuthStore()
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      await signUpWithEmail(email, password, name)
      toast.success('Identity Constructed.')
      navigate('/chatbot')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle()
      toast.success('Omni-Bridge Synchronized.')
      navigate('/chatbot')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="bg-animated" />
      <div className="fixed inset-0 opacity-[0.015] neural-grain pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg glass-strong p-16 rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5 relative z-10"
      >
        <div className="text-center mb-16">
          {/* Architectural Badge */}
          <div className="w-20 h-20 rounded-3xl glass flex items-center justify-center mx-auto mb-10 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10L12 2L20 10L12 18L4 10Z" stroke="white" strokeWidth="2" strokeLinecap="square"/>
                <path d="M12 18V22" stroke="white" strokeWidth="2"/>
                <path d="M8 22H16" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-6">Create Index</h1>
          <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.6em]">Engineer Your PixelForge Protocol</p>
        </div>

        {/* Action Anchor */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleSignup}
          className="w-full h-20 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex items-center justify-center gap-6 group hover:bg-white/[0.04] transition-all mb-16"
        >
          <FcGoogle className="w-8 h-8" />
          <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Synchronize :: Google Protocol</span>
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-10 mb-16">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-[10px] text-gray-800 font-black uppercase tracking-[0.5em]">Identity Index</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <form onSubmit={handleSignup} className="space-y-12">
          <div className="space-y-4">
            <label className="text-[8px] font-black text-gray-700 uppercase tracking-[0.4em] ml-4">Full Identifier</label>
            <div className="relative group">
              <HiOutlineUser className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-800 group-focus-within:text-white transition-colors" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Architect Name"
                required
                className="w-full h-20 pl-20 pr-10 bg-white/[0.015] border border-white/5 rounded-[2rem] text-white text-md focus:outline-none focus:border-white/10 transition-all font-medium placeholder:text-gray-800"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[8px] font-black text-gray-700 uppercase tracking-[0.4em] ml-4">Email Domain</label>
            <div className="relative group">
              <HiOutlineMail className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-800 group-focus-within:text-white transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architect@pixelforge.ai"
                required
                className="w-full h-20 pl-20 pr-10 bg-white/[0.015] border border-white/5 rounded-[2rem] text-white text-md focus:outline-none focus:border-white/10 transition-all font-medium placeholder:text-gray-800"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[8px] font-black text-gray-700 uppercase tracking-[0.4em] ml-4">Secret Protocol</label>
            <div className="relative group">
              <HiOutlineLockClosed className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-800 group-focus-within:text-white transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                className="w-full h-20 pl-20 pr-10 bg-white/[0.015] border border-white/5 rounded-[2rem] text-white text-md focus:outline-none focus:border-white/10 transition-all font-medium placeholder:text-gray-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-20 bg-white text-black rounded-[2rem] font-black text-[11px] uppercase tracking-[0.6em] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center shadow-[0_20px_60px_rgba(255,255,255,0.1)]"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              'Construct Identity'
            )}
          </button>
        </form>

        <p className="text-center mt-16 text-[9px] text-gray-800 font-black uppercase tracking-widest">
          Already Indexed? {' '}
          <Link to="/login" className="text-white hover:underline underline-offset-8">Initialize Login</Link>
        </p>
      </motion.div>
    </div>
  )
}
