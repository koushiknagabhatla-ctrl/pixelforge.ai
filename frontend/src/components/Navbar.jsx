import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuthStore from '../store/useAuthStore'
import useUIStore from '../store/useUIStore'
import { HiMenuAlt4, HiX } from 'react-icons/hi'

export default function Navbar() {
  const { user } = useAuthStore()
  const { toggleSidebar, isSidebarOpen } = useUIStore()

  return (
    <nav className="fixed top-0 inset-x-0 h-16 z-[100] px-6 lg:px-12 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-md">
      {/* Brand */}
      <Link to="/" className="flex items-center gap-3">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 10L12 2L20 10L12 18L4 10Z" stroke="white" strokeWidth="2" strokeLinecap="square"/>
          <path d="M12 18V22" stroke="white" strokeWidth="2"/>
          <path d="M8 22H16" stroke="white" strokeWidth="2"/>
        </svg>
        <span className="text-xs font-black uppercase tracking-widest text-white">Pixel Forge</span>
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <a 
          href="#about" 
          className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
        >
          About
        </a>
        
        {user ? (
            <div className="flex items-center gap-4">
                <span className="hidden sm:block text-[10px] font-bold text-gray-500 uppercase tracking-widest">{user.email?.split('@')[0]}</span>
                <button 
                    onClick={toggleSidebar}
                    className="p-2.5 glass rounded-lg hover:bg-white hover:text-black transition-all"
                >
                    {isSidebarOpen ? <HiX className="w-4 h-4" /> : <HiMenuAlt4 className="w-4 h-4" />}
                </button>
            </div>
        ) : (
            <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-white hover:opacity-70 transition-opacity">
                Sign In
            </Link>
        )}
      </div>
    </nav>
  )
}
