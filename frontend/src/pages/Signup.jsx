import { useState, useEffect } from 'react'
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
  const [loading, setLoading] = useState(false)
  const { signUpWithEmail, signInWithGoogle, user } = useAuthStore()
  const navigate = useNavigate()

  // Requirement #2: Immediate Redirect
  useEffect(() => {
    if (user) navigate('/chatbot', { replace: true })
  }, [user, navigate])

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    const toastId = toast.loading('Architecting identity sequence...')
    try {
      await signUpWithEmail(email, password, name)
      toast.success('Sequence Complete', { id: toastId })
    } catch (error) {
      toast.error(error.message || 'Architectural failure', { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      toast.error('Google synchronization failed')
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-[#0f0f13] p-12 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5"
      >
        <div className="text-center mb-12">
          {/* Neural Badge */}
          <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(99,102,241,0.4)]">
            <span className="font-black text-2xl text-white">P</span>
          </div>
          
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">Create Index</h1>
          <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Engineer your PixelForge identity.</p>
        </div>

        {/* Google Primary Anchor */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleSignup}
          className="w-full h-16 bg-white/5 rounded-2xl flex items-center justify-center gap-4 group hover:bg-white/10 transition-all mb-12"
        >
          <FcGoogle className="w-6 h-6" />
          <span className="text-xs font-black text-white uppercase tracking-[0.2em]">Synchronize via Google</span>
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-6 mb-12">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-[10px] text-gray-700 font-black uppercase tracking-[0.5em]">Primary Index</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <form onSubmit={handleSignup} className="space-y-10">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">Architect Name</label>
            <div className="relative group">
              <HiOutlineUser className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-white transition-colors" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Identifier"
                required
                className="w-full h-16 pl-16 pr-8 bg-white/[0.02] border border-white/5 rounded-2xl text-white text-sm focus:outline-none focus:border-white/10 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">Email Domain</label>
            <div className="relative group">
              <HiOutlineMail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-white transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architect@pixelforge.ai"
                required
                className="w-full h-16 pl-16 pr-8 bg-white/[0.02] border border-white/5 rounded-2xl text-white text-sm focus:outline-none focus:border-white/10 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">Secret Key</label>
            <div className="relative group">
              <HiOutlineLockClosed className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-white transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                className="w-full h-16 pl-16 pr-8 bg-white/[0.02] border border-white/5 rounded-2xl text-white text-sm focus:outline-none focus:border-white/10 transition-all font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-16 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              'Construct Identity'
            )}
          </button>
        </form>

        <p className="text-center mt-12 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
          Existing Architect? {' '}
          <Link to="/login" className="text-white hover:underline underline-offset-4">Initialize Login</Link>
        </p>
      </motion.div>
    </div>
  )
}
