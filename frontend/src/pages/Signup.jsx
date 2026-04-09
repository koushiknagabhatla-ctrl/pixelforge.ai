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
      toast.success('Account created.')
      navigate('/chatbot')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle()
      toast.success('Sign up successful.')
      navigate('/chatbot')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="bg-animated" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-strong p-10 rounded-[2rem] border border-white/5 shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mx-auto mb-6 border border-white/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10L12 2L20 10L12 18L4 10Z" stroke="white" strokeWidth="2" strokeLinecap="square"/>
                <path d="M12 18V22" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <h1 className="text-3xl font-black mb-2 tracking-tight">Create Account</h1>
          <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">Start building today</p>
        </div>

        <button
          onClick={handleGoogleSignup}
          className="w-full h-14 glass border border-white/5 rounded-xl flex items-center justify-center gap-4 hover:bg-white/5 transition-all mb-8"
        >
          <FcGoogle className="w-5 h-5" />
          <span className="text-[11px] font-bold uppercase tracking-widest">Sign up with Google</span>
        </button>

        <div className="flex items-center gap-6 mb-8">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-[9px] text-gray-800 font-bold uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-bold text-gray-700 uppercase tracking-widest ml-1">Name</label>
            <div className="relative group">
              <HiOutlineUser className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800 group-focus-within:text-white transition-colors" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
                className="w-full h-14 pl-16 pr-6 bg-white/[0.015] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:border-white/10 transition-all font-medium placeholder:text-gray-800"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-bold text-gray-700 uppercase tracking-widest ml-1">Email</label>
            <div className="relative group">
              <HiOutlineMail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800 group-focus-within:text-white transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="w-full h-14 pl-16 pr-6 bg-white/[0.015] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:border-white/10 transition-all font-medium placeholder:text-gray-800"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-bold text-gray-700 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <HiOutlineLockClosed className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800 group-focus-within:text-white transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                minLength={8}
                className="w-full h-14 pl-16 pr-6 bg-white/[0.015] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:border-white/10 transition-all font-medium placeholder:text-gray-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-white text-black rounded-xl font-bold text-[11px] uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all flex items-center justify-center shadow-2xl"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="text-center mt-10 text-[10px] text-gray-700 font-bold uppercase tracking-widest">
          Already have one? {' '}
          <Link to="/login" className="text-white hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  )
}
