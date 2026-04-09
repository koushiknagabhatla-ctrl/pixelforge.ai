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
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md glass-strong p-10 shadow-3xl border-white/10"
      >
        <div className="text-center mb-10">
          <motion.div 
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-600/30"
          >
            <span className="font-bold text-xl text-white">P</span>
          </motion.div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Create Index</h1>
          <p className="text-sm text-slate-500 font-medium">Engineer your PixelForge identity.</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleSignup}
          className="w-full h-14 glass flex items-center justify-center gap-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/5 transition-all mb-8"
        >
          <FcGoogle className="w-5 h-5" />
          Synchronize via Google
        </motion.button>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-[10px] text-slate-700 font-bold uppercase tracking-widest px-2">Primary Index</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Architect Name</label>
            <div className="relative group">
              <HiOutlineUser className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Identifier"
                required
                className="w-full h-14 pl-14 pr-6 bg-white/[0.02] border border-white/5 rounded-xl text-white text-sm focus:outline-none input-glow transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Domain</label>
            <div className="relative group">
              <HiOutlineMail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architect@pixelforge.ai"
                required
                className="w-full h-14 pl-14 pr-6 bg-white/[0.02] border border-white/5 rounded-xl text-white text-sm focus:outline-none input-glow transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Secret Key</label>
            <div className="relative group">
              <HiOutlineLockClosed className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                required
                minLength={8}
                className="w-full h-14 pl-14 pr-6 bg-white/[0.02] border border-white/5 rounded-xl text-white text-sm focus:outline-none input-glow transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 btn-primary flex items-center justify-center gap-3 mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <span className="text-sm font-bold uppercase tracking-widest">Construct Identity</span>
            )}
          </button>
        </form>

        <p className="text-center mt-10 text-xs text-slate-500 font-medium">
          Existing Architect? {' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 link-underscore">Initialize Login</Link>
        </p>
      </motion.div>
    </div>
  )
}
