import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi'
import useAuthStore from '../store/useAuthStore'
import toast from 'react-hot-toast'
import ThreeBackground from '../components/ThreeBackground'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const { signInWithEmail, signInWithGoogle, loading } = useAuthStore()
  const navigate = useNavigate()
  
  // Tracking mouse for 3D Background effect
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmail(email, password)
      toast.success('Successfully Signed In.')
      navigate('/tools')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle()
      toast.success('Google authentication complete.')
      navigate('/tools')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div onMouseMove={handleMouseMove} className="min-h-screen bg-[#010101] flex items-center justify-center p-8 relative overflow-hidden font-sans selection:bg-white/10">
      
      {/* NATIVE 3D MODEL BACKGROUND */}
      <ThreeBackground mouse={mouseRef} />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg glass-hyper p-10 sm:p-16 rounded-[3rem] sm:rounded-[4rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative z-10 bg-black/60 backdrop-blur-3xl"
      >
        <div className="text-center mb-12 sm:mb-16">
          <div className="w-16 h-16 rounded-[1.5rem] glass-premium flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-2xl bg-white/5">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10L12 2L20 10L12 18L4 10Z" stroke="white" strokeWidth="2.5" strokeLinecap="square"/>
                <path d="M12 18V22" stroke="white" strokeWidth="2.5"/>
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-4 tracking-tighter text-white">Sign In</h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Access Your Workspace</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full h-16 py-5 glass border border-white/10 rounded-2xl flex items-center justify-center gap-6 hover:bg-white/5 transition-all mb-10 group relative overflow-hidden"
        >
          <div className="relative">
            <FcGoogle className="w-5 h-5 relative z-10" />
            <div className="absolute inset-0 bg-white blur-xl opacity-20 group-hover:opacity-60 transition-opacity rounded-full scale-110" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Sign in with Google</span>
        </button>

        <div className="flex items-center gap-8 mb-10">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.5em]">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] ml-2">Email Address</label>
            <div className="relative group">
              <HiOutlineMail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex. hello@pixelforge.ai"
                required
                className="w-full h-16 pl-16 pr-6 bg-white/[0.03] border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-white/30 transition-all font-medium placeholder:text-gray-700 shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] ml-2">Password</label>
            <div className="relative">
              <HiOutlineLockClosed className={`absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors z-20 ${isPasswordFocused ? 'text-white' : 'text-gray-500'}`} />
              
              <motion.div
                animate={{ 
                    boxShadow: isPasswordFocused ? "0 0 20px rgba(255,255,255,0.1)" : "0 0 0px rgba(255,255,255,0)",
                    scale: isPasswordFocused ? 1.01 : 1
                }}
                className="relative"
              >
                  <input
                    type="password"
                    value={password}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full h-16 pl-16 pr-6 bg-white/[0.03] border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-white/30 transition-all font-medium placeholder:text-gray-700 shadow-inner relative z-10"
                  />
              </motion.div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-16 mt-4 bg-white text-black rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-gray-200 transition-all flex items-center justify-center shadow-2xl"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black/10 border-t-black rounded-full animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="text-center mt-12 text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">
          Don't have an account? {' '}
          <Link to="/signup" className="text-white hover:text-gray-300 transition-colors border-b border-white/20 pb-0.5">Register Here</Link>
        </p>
      </motion.div>
    </div>
  )
}
