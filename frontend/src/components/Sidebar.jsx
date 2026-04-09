import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HiOutlineSparkles, 
  HiOutlineChatAlt2, 
  HiOutlineLogout, 
  HiOutlineClock,
  HiOutlineMenu,
  HiX 
} from 'react-icons/hi'
import useAuthStore from '../store/useAuthStore'

const navigation = [
  { name: 'Image Generator', path: '/tools?mode=synth', icon: HiOutlineSparkles },
  { name: 'AI Chatbot', path: '/chatbot', icon: HiOutlineChatAlt2 },
  { name: 'Archives', path: '/history', icon: HiOutlineClock },
]

export default function Sidebar() {
  const { signOut } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Hover zone detection (Invisible 20px trigger on the left)
  // Handled by mouseEnter on the sidebar itself or a trigger div

  return (
    <>
      {/* Mobile Hamburger Trigger */}
      <button 
        onClick={() => setMobileOpen(true)}
        className="fixed top-5 left-5 z-[60] lg:hidden w-12 h-12 flex items-center justify-center glass rounded-xl border-white/20 active:scale-90 transition-transform shadow-2xl"
      >
        <HiOutlineMenu className="w-6 h-6 text-white" />
      </button>

      {/* Desktop Toggle Trigger Zone (Invisible) */}
      <div 
        onMouseEnter={() => setSidebarOpen(true)}
        className="fixed left-0 top-0 bottom-0 w-6 z-[55] lg:block hidden"
      />

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Sidebar Architecture */}
      <motion.aside
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
        initial={false}
        animate={{ 
          width: sidebarOpen ? 280 : 60,
          x: mobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -280 : 0)
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed left-0 top-0 bottom-0 z-[80] glass-strong border-r border-white/10 flex flex-col py-6 overflow-hidden`}
      >
        {/* Header / Identity */}
        <div className="px-5 mb-10 flex items-center justify-between">
           <div className="flex items-center gap-4 min-w-0">
              <div className="w-6 h-6 rounded-md bg-indigo-600 shrink-0 flex items-center justify-center font-bold text-xs shadow-lg shadow-indigo-600/30">P</div>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-bold tracking-tight whitespace-nowrap overflow-hidden"
                  >
                    PixelForge AI
                  </motion.span>
                )}
              </AnimatePresence>
           </div>
           
           {/* Mobile Close Button - Enhanced */}
           {mobileOpen && (
              <button 
                onClick={() => setMobileOpen(false)}
                className="lg:hidden p-2 glass rounded-lg hover:bg-white/10 transition-colors"
              >
                <HiX className="w-5 h-5 text-indigo-400" />
              </button>
           )}
        </div>

        {/* Navigation Stream */}
        <nav className="flex-1 px-3 space-y-2">
           {navigation.map((item) => (
             <NavLink
               key={item.name}
               to={item.path}
               onClick={() => setMobileOpen(false)}
               className={({ isActive }) => `
                 flex items-center gap-4 px-3 py-3 rounded-xl transition-all group
                 ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}
               `}
             >
               <item.icon className="w-5 h-5 shrink-0" />
               <AnimatePresence>
                  {(sidebarOpen || mobileOpen) && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="whitespace-nowrap font-medium"
                    >
                      {item.name}
                    </motion.span>
                  )}
               </AnimatePresence>
             </NavLink>
           ))}
        </nav>

        {/* Action Pivot */}
        <div className="px-3">
          <button
            onClick={signOut}
            className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all group"
          >
            <HiOutlineLogout className="w-5 h-5 shrink-0" />
            <AnimatePresence>
               {(sidebarOpen || mobileOpen) && (
                 <motion.span
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -10 }}
                   className="whitespace-nowrap font-medium"
                 >
                   Sign Out
                 </motion.span>
               )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>
    </>
  )
}
