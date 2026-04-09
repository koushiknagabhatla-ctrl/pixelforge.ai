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
      {/* Dynamic Glass Bridge */}
      <div className="absolute inset-0 glass-strong border-b border-white/10" />
      <div className="absolute inset-0 opacity-[0.02] neural-grain" />

      {/* Brand */}
      <Link to="/" className="relative flex items-center gap-4 group">
        <div className="w-10 h-10 flex items-center justify-center">
            {/* Minimalist Forge Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10L12 2L20 10L12 18L4 10Z" stroke="white" strokeWidth="2" strokeLinecap="square"/>
                <path d="M12 18V22" stroke="white" strokeWidth="2"/>
                <path d="M8 22H16" stroke="white" strokeWidth="2"/>
            </svg>
        </div>
        <div className="flex flex-col">
            <span className="text-sm font-black uppercase tracking-[0.4em] text-white">Pixel Forge</span>
            <span className="text-[8px] font-bold text-gray-700 uppercase tracking-widest">Architect Neural V12.0</span>
        </div>
      </Link>

      {/* Actions */}
      <div className="relative flex items-center gap-8">
        <a 
          href="#about" 
          className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-white transition-colors"
        >
          About
        </a>
        
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
            <div className="flex items-center gap-6">
                <Link to="/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-white hover:opacity-70 transition-opacity">
                    Sign In
                </Link>
            </div>
        )}
      </div>
    </nav>
  )
}
