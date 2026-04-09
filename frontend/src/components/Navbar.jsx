import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuthStore from '../store/useAuthStore'
import useUIStore from '../store/useUIStore'
import { HiMenuAlt4, HiX } from 'react-icons/hi'

export default function Navbar() {
  const { user } = useAuthStore()
  const { toggleSidebar, isSidebarOpen } = useUIStore()

  return (
    <nav className="fixed top-0 inset-x-0 h-24 z-[100] px-4 sm:px-8 flex items-center justify-between overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl border-b border-white/[0.03] neural-grain" />

      {/* Brand */}
      <Link to="/" className="relative flex items-center gap-4 group">
        <motion.div 
            whileHover={{ scale: 1.1, rotate: 90 }}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-black group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all"
        >
          P
        </motion.div>
        <div className="flex flex-col">
            <span className="text-sm font-black uppercase tracking-[0.4em] text-white">Pixel Forge</span>
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Architect Neural v3</span>
        </div>
      </Link>

      {/* Actions */}
      <div className="relative flex items-center gap-6">
        {user ? (
            <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end mr-4">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{user.email?.split('@')[0]}</span>
                    <span className="text-[8px] font-bold text-gray-700 uppercase tracking-widest">Verified Architect</span>
                </div>
                <button 
                    onClick={toggleSidebar}
                    className="p-4 glass-premium rounded-2xl hover:bg-white hover:text-black transition-all group"
                >
                    {isSidebarOpen ? <HiX className="w-5 h-5" /> : <HiMenuAlt4 className="w-5 h-5" />}
                </button>
            </div>
        ) : (
            <div className="flex items-center gap-4">
                <Link to="/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors">
                    Sign In
                </Link>
                <Link to="/signup" className="pill-button !py-3 !px-8 pill-primary !text-[10px]">
                    Get Access
                </Link>
            </div>
        )}
      </div>
    </nav>
  )
}
