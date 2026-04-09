import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlinePhotograph,
  HiOutlineChatAlt2,
  HiOutlineLogout,
  HiOutlineClock,
  HiOutlineRefresh,
  HiChevronRight,
  HiChevronLeft
} from 'react-icons/hi'
import { FcGoogle } from 'react-icons/fc'
import useAuthStore from '../store/useAuthStore'
import useEnhancementStore from '../store/useEnhancementStore'
import useUIStore from '../store/useUIStore'

const navigation = [
  { name: 'Image Synth', path: '/tools?mode=synth', icon: HiOutlinePhotograph },
  { name: 'Enhancer', path: '/tools?mode=enhance', icon: HiOutlineRefresh },
  { name: 'Neural Chat', path: '/chatbot', icon: HiOutlineChatAlt2 },
]

export default function Sidebar() {
  const { user, signOut } = useAuthStore()
  const { history, fetchHistory } = useEnhancementStore()
  const { isSidebarMinimized, toggleMinimize } = useUIStore()

  useEffect(() => {
    if (user) {
      fetchHistory(user.id, 5)
    }
  }, [user])

  return (
    <motion.aside
      animate={{ 
        width: isSidebarMinimized ? 80 : 300,
        x: 0,
        opacity: 1
      }}
      initial={{ x: -100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="flex flex-col h-[calc(100vh-8rem)] glass-premium border-r border-white/5 z-40 fixed left-0 top-[6rem] mx-4 rounded-3xl neural-grain overflow-hidden"
    >
      {/* Toggle Bar */}
      <button 
        onClick={toggleMinimize}
        className="absolute right-0 top-0 bottom-0 w-2 hover:bg-white/5 group transition-colors flex items-center justify-center"
      >
        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 rounded-full p-0.5">
          {isSidebarMinimized ? <HiChevronRight size={10} /> : <HiChevronLeft size={10} />}
        </div>
      </button>

      {/* Header */}
      <div className="px-6 mb-10 mt-6 overflow-hidden whitespace-nowrap">
        <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse shrink-0" />
            {!isSidebarMinimized && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.5em]"
              >
                Archon Console
              </motion.span>
            )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-2 mb-10 px-3 overflow-hidden">
        {navigation.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 relative group overflow-hidden ${
                isActive
                  ? 'bg-white text-black'
                  : 'text-gray-600 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <link.icon className={`w-5 h-5 shrink-0 ${isSidebarMinimized ? 'mx-auto' : ''}`} />
            {!isSidebarMinimized && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {link.name}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Recent History */}
      {!isSidebarMinimized && (
        <div className="px-6 mb-4 flex-1 overflow-y-auto scrollbar-hide">
          <div className="flex items-center gap-2 mb-6">
              <HiOutlineClock className="text-gray-700 w-3 h-3" />
              <span className="text-[9px] font-bold text-gray-700 uppercase tracking-[0.4em]">Historical Forge</span>
          </div>
          
          <div className="space-y-4">
            {(Array.isArray(history) ? history : []).slice(0, 4).map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/5 bg-white/5">
                  <img src={item.enhanced_url} alt="History" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-gray-500 group-hover:text-white transition-colors truncate w-32 uppercase tracking-widest leading-none">
                    {item.mode}
                  </span>
                  <span className="text-[7px] font-bold text-gray-800 uppercase tracking-[0.2em] mt-1.5">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className={`mt-auto pt-4 border-t border-white/5 flex flex-col gap-4 p-6 ${isSidebarMinimized ? 'items-center' : ''}`}>
        <button
          onClick={signOut}
          className={`flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-gray-600 hover:text-white transition-colors overflow-hidden whitespace-nowrap`}
        >
          {user?.app_metadata?.provider === 'google' ? (
            <FcGoogle className="w-4 h-4 shrink-0" />
          ) : (
            <HiOutlineLogout className="w-4 h-4 shrink-0" />
          )}
          {!isSidebarMinimized && "Terminate Session"}
        </button>
      </div>
    </motion.aside>
  )
}
