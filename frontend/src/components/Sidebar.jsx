import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlinePhotograph,
  HiOutlineChatAlt2,
  HiOutlineLogout,
  HiOutlineClock,
  HiOutlineRefresh,
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
  const location = useLocation()

  useEffect(() => {
    if (user) {
      fetchHistory(user.id, 5)
    }
  }, [user])

  // Precision Active State Check (Param-Aware)
  const isNavActive = (path) => {
    const [pathname, search] = path.split('?')
    if (search) {
      return location.pathname === pathname && location.search.includes(search)
    }
    return location.pathname === pathname
  }

  // Combined state: open if explicitly toggled OR hovered
  const isOpen = !isSidebarMinimized || isHovered

  return (
    <>
      {/* Invisible Hover Aura Trigger Zone */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        className="fixed left-0 top-0 bottom-0 w-16 z-[60] pointer-events-auto cursor-none lg:block hidden"
      />

      <motion.aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{ 
          width: isOpen ? 260 : 72, // Refined compact widths
          x: 0,
          opacity: 1
        }}
        initial={{ x: -100, opacity: 0 }}
        transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 35,
            mass: 0.8
        }}
        className="flex flex-col h-[calc(100vh-6rem)] glass-glow glass-edge z-50 fixed left-0 top-12 mx-3 rounded-[2rem] overflow-hidden group/sidebar shadow-[0_0_40px_rgba(0,0,0,0.6)] border-white/[0.03]"
      >
        {/* Header / Identity Pivot */}
        <div className="p-6 border-b border-white/5 flex items-center gap-4 overflow-hidden whitespace-nowrap">
            <div className="w-7 h-7 rounded-xl bg-white text-black flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)] shrink-0">
                <span className="font-black text-xs">F</span>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex flex-col"
                    >
                        <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">Forge AI</span>
                        <span className="text-[7px] font-bold text-gray-800 uppercase tracking-[0.2em]">Console v8.0</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Intelligence Navigation */}
        <nav className="space-y-3 mt-8 px-3 overflow-hidden">
          {navigation.map((link) => {
            const active = isNavActive(link.path)
            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={`flex items-center gap-5 px-5 py-4 rounded-2xl text-[8.5px] font-black uppercase tracking-[0.3em] transition-all duration-700 relative group overflow-hidden ${
                  active
                    ? 'bg-white text-black shadow-lg scale-[1.02]'
                    : 'text-gray-700 hover:bg-white/[0.02] hover:text-white'
                }`}
              >
                {({ isActive }) => (
                  <>
                    <link.icon className={`w-4 h-4 shrink-0 transition-all duration-700 ${isOpen ? '' : 'mx-auto'} ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <AnimatePresence>
                        {isOpen && (
                          <motion.span 
                            initial={{ opacity: 0, x: -15 }} 
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -15 }}
                            className="whitespace-nowrap"
                          >
                            {link.name}
                          </motion.span>
                        )}
                    </AnimatePresence>
                    {/* Interactive Hover Wave */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Historical Archives */}
        <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-10 px-8 flex-1 overflow-y-auto scrollbar-hide"
              >
                <div className="flex items-center gap-3 mb-6 opacity-30">
                    <HiOutlineClock className="w-3.5 h-3.5" />
                    <span className="text-[8px] font-black uppercase tracking-[0.5em]">Archives</span>
                </div>
                
                <div className="space-y-5 pb-8">
                  {(Array.isArray(history) ? history : []).slice(0, 4).map((item) => (
                    <motion.div 
                      key={item.id}
                      whileHover={{ x: 6, scale: 1.01 }}
                      className="flex items-center gap-4 group cursor-pointer"
                    >
                      <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/5 bg-white/5 shadow-inner">
                        <img src={item.enhanced_url} alt="Forge History" className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-black text-gray-800 group-hover:text-white transition-colors truncate w-24 uppercase tracking-widest">
                          {item.mode}
                        </span>
                        <span className="text-[7px] font-bold text-gray-900 uppercase tracking-widest">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
        </AnimatePresence>

        {/* Global Action Pivot */}
        <div className={`mt-auto pt-4 border-t border-white/5 flex flex-col gap-4 p-5 ${isOpen ? '' : 'items-center'}`}>
          <button
            onClick={signOut}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl text-[8.5px] font-black uppercase tracking-[0.4em] text-gray-800 hover:text-white transition-all duration-700 group whitespace-nowrap overflow-hidden hover:bg-white/[0.02]`}
          >
            <div className="relative">
              {user?.app_metadata?.provider === 'google' ? (
                  <FcGoogle className="w-4.5 h-4.5 shrink-0 transition-all duration-700 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
              ) : (
                  <HiOutlineLogout className="w-4.5 h-4.5 shrink-0 transition-all duration-700 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
              )}
            </div>
            {isOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>SIGNOUT</motion.span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Interaction Bridge */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-[4px] z-40 lg:hidden"
            onClick={() => {
                setIsHovered(false)
                toggleMinimize()
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
