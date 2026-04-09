import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import {
  HiOutlinePhotograph,
  HiOutlineChatAlt2,
  HiOutlineLogout,
  HiOutlineClock,
  HiOutlineRefresh,
  HiChevronRight,
  HiChevronLeft,
  HiMenuAlt4
} from 'react-icons/hi'
import { FcGoogle } from 'react-icons/fc'
import useAuthStore from '../store/useAuthStore'
import useEnhancementStore from '../store/useEnhancementStore'
import useUIStore from '../store/useUIStore'

const navigation = [
  { name: 'Image Generator', path: '/tools?mode=synth', icon: HiOutlinePhotograph },
  { name: 'AI Enhancer', path: '/tools?mode=enhance', icon: HiOutlineRefresh },
  { name: 'AI Chatbot', path: '/chatbot', icon: HiOutlineChatAlt2 },
]

export default function Sidebar() {
  const { user, signOut } = useAuthStore()
  const { history, fetchHistory } = useEnhancementStore()
  const { isSidebarMinimized, toggleMinimize } = useUIStore()
  const [isSwiping, setIsSwiping] = useState(false)

  useEffect(() => {
    if (user) {
      fetchHistory(user.id, 5)
    }
  }, [user])

  // Drag logic for edge-swipe
  const onDragEnd = (event, info) => {
    if (info.offset.x > 100 && isSidebarMinimized) {
      toggleMinimize()
    } else if (info.offset.x < -100 && !isSidebarMinimized) {
      toggleMinimize()
    }
    setIsSwiping(false)
  }

  return (
    <>
      {/* Edge Handle for Swiping */}
      <motion.div 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragStart={() => setIsSwiping(true)}
        onDragEnd={onDragEnd}
        className="fixed left-0 top-0 bottom-0 w-4 z-50 cursor-grab active:cursor-grabbing"
      />

      <motion.aside
        animate={{ 
          width: isSidebarMinimized ? 84 : 320,
          x: 0,
          opacity: 1
        }}
        initial={{ x: -100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className="flex flex-col h-[calc(100vh-8rem)] glass-glow glass-edge z-40 fixed left-0 top-[6rem] mx-4 rounded-[2rem] overflow-hidden group/sidebar"
      >
        {/* Toggle Bar / Menu Trigger */}
        <button 
          onClick={toggleMinimize}
          className="p-6 border-b border-white/5 flex items-center justify-between group hover:bg-white/5 transition-all"
        >
          <div className="flex items-center gap-4">
            <HiMenuAlt4 size={20} className="text-gray-500 group-hover:text-white transition-colors" />
            {!isSidebarMinimized && (
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.6em]">Menu</span>
            )}
          </div>
          {!isSidebarMinimized && <HiChevronLeft size={14} className="text-gray-700" />}
        </button>

        {/* Main Navigation */}
        <nav className="space-y-3 mt-8 px-4 overflow-hidden">
          {navigation.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-5 px-5 py-5 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-500 relative group overflow-hidden ${
                  isActive
                    ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.1)]'
                    : 'text-gray-700 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <link.icon className={`w-5 h-5 shrink-0 transition-transform duration-500 group-hover:scale-110 ${isSidebarMinimized ? 'mx-auto' : ''}`} />
              {!isSidebarMinimized && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {link.name}
                </motion.span>
              )}
              {/* Premium Glow Spot */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        {/* Recent History */}
        {!isSidebarMinimized && (
          <div className="mt-12 px-8 flex-1 overflow-y-auto scrollbar-hide">
            <div className="flex items-center gap-3 mb-8 opacity-40">
                <HiOutlineClock className="w-4 h-4" />
                <span className="text-[8px] font-black uppercase tracking-[0.5em]">Archives</span>
            </div>
            
            <div className="space-y-6">
              {(Array.isArray(history) ? history : []).slice(0, 4).map((item) => (
                <motion.div 
                  key={item.id}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-5 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/5 bg-white/5 shadow-inner">
                    <img src={item.enhanced_url} alt="History" className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-700" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-black text-gray-600 group-hover:text-white transition-colors truncate w-32 uppercase tracking-widest">
                      {item.mode}
                    </span>
                    <span className="text-[7px] font-bold text-gray-800 uppercase tracking-widest">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className={`mt-auto pt-4 border-t border-white/5 flex flex-col gap-6 p-6 ${isSidebarMinimized ? 'items-center' : ''}`}>
          <button
            onClick={signOut}
            className={`flex items-center gap-4 px-4 py-4 rounded-xl text-[9px] font-black uppercase tracking-[0.4em] text-gray-700 hover:text-white transition-all duration-500 group whitespace-nowrap overflow-hidden hover:bg-white/[0.02]`}
          >
            <div className="relative">
              {user?.app_metadata?.provider === 'google' ? (
                  <FcGoogle className="w-5 h-5 shrink-0 transition-all duration-700 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
              ) : (
                  <HiOutlineLogout className="w-5 h-5 shrink-0 transition-all duration-700 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
              )}
              <div className="absolute inset-0 bg-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {!isSidebarMinimized && "SIGNOUT"}
          </button>
        </div>
      </motion.aside>
      
      {/* Background Dim (Optional for focus) */}
      <AnimatePresence>
        {!isSidebarMinimized && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-30 lg:hidden pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  )
}
