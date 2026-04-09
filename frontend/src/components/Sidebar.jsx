import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (user) {
      fetchHistory(user.id, 5)
    }
  }, [user])

  // Intelligence Hover Logic
  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  // Combined state: open if explicitly toggled OR hovered
  const isOpen = !isSidebarMinimized || isHovered

  return (
    <>
      <motion.aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{ 
          width: isOpen ? 320 : 84,
          x: 0,
          opacity: 1
        }}
        initial={{ x: -100, opacity: 0 }}
        transition={{ 
            type: 'spring', 
            stiffness: 250, 
            damping: 32,
            mass: 0.8
        }}
        className="flex flex-col h-[calc(100vh-8rem)] glass-glow glass-edge z-50 fixed left-0 top-[6rem] mx-4 rounded-[2.5rem] overflow-hidden group/sidebar shadow-[0_0_50px_rgba(0,0,0,0.5)] border-white/5"
      >
        {/* Header / Brand Pivot */}
        <div className="p-8 border-b border-white/5 flex items-center gap-5 overflow-hidden whitespace-nowrap">
            <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] shrink-0">
                <span className="font-black text-sm">F</span>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex flex-col"
                    >
                        <span className="text-[11px] font-black text-white uppercase tracking-[0.5em]">Forge AI</span>
                        <span className="text-[8px] font-bold text-gray-700 uppercase tracking-[0.3em]">Menu Console</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Global Navigation */}
        <nav className="space-y-4 mt-8 px-4 overflow-hidden">
          {navigation.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-6 px-6 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 relative group overflow-hidden ${
                  isActive
                    ? 'bg-white text-black shadow-xl scale-[1.02]'
                    : 'text-gray-600 hover:bg-white/[0.03] hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <link.icon className={`w-5 h-5 shrink-0 transition-all duration-700 ${isOpen ? '' : 'mx-auto'} ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <AnimatePresence>
                      {isOpen && (
                        <motion.span 
                          initial={{ opacity: 0, x: -20 }} 
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.5 }}
                        >
                          {link.name}
                        </motion.span>
                      )}
                  </AnimatePresence>
                  {/* Premium Interaction Wave */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Historical Archives */}
        <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-12 px-10 flex-1 overflow-y-auto scrollbar-hide"
              >
                <div className="flex items-center gap-4 mb-8 opacity-30">
                    <HiOutlineClock className="w-4 h-4" />
                    <span className="text-[9px] font-black uppercase tracking-[0.6em]">Archives</span>
                </div>
                
                <div className="space-y-6 pb-10">
                  {(Array.isArray(history) ? history : []).slice(0, 4).map((item) => (
                    <motion.div 
                      key={item.id}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-center gap-5 group cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/5 bg-white/5 shadow-inner">
                        <img src={item.enhanced_url} alt="Forge History" className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-black text-gray-700 group-hover:text-white transition-colors truncate w-32 uppercase tracking-widest">
                          {item.mode}
                        </span>
                        <span className="text-[8px] font-bold text-gray-900 uppercase tracking-widest">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
        </AnimatePresence>

        {/* Profile / Signout Pivot */}
        <div className={`mt-auto pt-6 border-t border-white/5 flex flex-col gap-6 p-6 ${isOpen ? '' : 'items-center'}`}>
          <button
            onClick={signOut}
            className={`flex items-center gap-5 px-6 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 hover:text-white transition-all duration-700 group whitespace-nowrap overflow-hidden hover:bg-white/[0.03]`}
          >
            <div className="relative">
              {user?.app_metadata?.provider === 'google' ? (
                  <FcGoogle className="w-5 h-5 shrink-0 transition-all duration-700 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
              ) : (
                  <HiOutlineLogout className="w-5 h-5 shrink-0 transition-all duration-700 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
              )}
            </div>
            {isOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>SIGNOUT</motion.span>}
          </button>
        </div>
      </motion.aside>

      {/* Background Dim (Mobile fallback / Visual depth) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-[4px] z-40 lg:hidden"
            onClick={toggleMinimize}
          />
        )}
      </AnimatePresence>
    </>
  )
}
