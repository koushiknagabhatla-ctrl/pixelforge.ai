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
      toast.success('Access Granted', { id: toastId })
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
      toast.error('Neural link synchronization failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black relative overflow-hidden">
      {/* Background Elements (Static) */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gray-600/5 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative glass-card p-10 w-full max-w-md rounded-3xl"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 border border-white/10">
            <span className="text-white font-bold text-lg leading-none">P</span>
          </div>
          <h1 className="text-xl font-bold text-white uppercase tracking-[0.3em]">
            Pixel <span className="text-gray-500">Forge</span>
          </h1>
        </div>

        <div className="text-center mb-10">
            <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Identify Yourself</h2>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest leading-loose">Enter your coordinates to access the forge architecture.</p>
        </div>

        {/* Google Auth */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-4 py-4 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-widest transition-all duration-300 mb-8 shadow-2xl"
        >
          <FcGoogle className="w-5 h-5" />
          Neural Link: Google
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-[10px] text-gray-700 font-bold uppercase tracking-[0.2em]">or</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div>
            <label className="text-[10px] font-bold text-gray-600 mb-2 block uppercase tracking-widest">Protocol Email</label>
            <div className="relative">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="identity@pixelforge.ai"
                required
                className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/5 rounded-xl text-white text-xs placeholder-gray-800 focus:outline-none focus:border-white/20 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-600 mb-2 block uppercase tracking-widest">Access Key</label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/5 rounded-xl text-white text-xs placeholder-gray-800 focus:outline-none focus:border-white/20 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/10 border-t-white rounded-full animate-spin" />
                Validating Identity...
              </div>
            ) : (
              'Initialize Session'
            )}
          </button>
        </form>

        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest text-center mt-10">
          New Architect?{' '}
          <Link to="/signup" className="text-white hover:underline underline-offset-4 decoration-white/20">
            Register Coordinates
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
