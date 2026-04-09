import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  HiOutlineSparkles, 
  HiOutlineChatAlt2, 
  HiOutlineLogout, 
  HiOutlineClock,
  HiChevronRight,
  HiOutlineLightningBolt
} from 'react-icons/hi'
import useAuthStore from '../store/useAuthStore'
import { useState } from 'react'

const navigation = [
  { name: 'IMAGE GENERATOR', path: '/tools?mode=synth', icon: HiOutlineSparkles, mode: 'synth' },
  { name: 'IMAGE ENHANCER', path: '/tools?mode=enhance', icon: HiOutlineLightningBolt, mode: 'enhance' },
  { name: 'FORGE AI', path: '/chatbot', icon: HiOutlineChatAlt2 },
  { name: 'ARCHIVES', path: '/history', icon: HiOutlineClock },
]

export default function Sidebar() {
  const { signOut } = useAuthStore()
  const [isHovered, setIsHovered] = useState(false)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const currentMode = searchParams.get('mode')

  return (
    <>
      {/* Invisible Trigger Zone */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        className="fixed left-0 top-0 bottom-0 w-20 z-[75]"
      />

      <motion.aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={false}
        animate={{ 
          width: isHovered ? 280 : 80,
          background: isHovered ? 'rgba(5, 5, 5, 0.98)' : 'rgba(5, 5, 5, 0.4)',
          backdropFilter: isHovered ? 'blur(40px)' : 'blur(10px)',
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)'
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed left-0 top-0 bottom-0 z-[80] border-r flex flex-col p-6 pt-24 overflow-hidden selection:bg-white/10"
      >
        {/* Brand Header */}
        <div className="mb-16 px-2 whitespace-nowrap overflow-hidden">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 10L12 2L20 10L12 18L4 10Z" stroke="white" strokeWidth="2" strokeLinecap="square"/>
                    </svg>
                </div>
                <motion.div animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}>
                  <h2 className="text-xs font-black text-white uppercase tracking-[0.3em]">Menu Console</h2>
                  <span className="text-[8px] font-bold text-gray-700 uppercase tracking-widest">Architectural Navigation</span>
                </motion.div>
            </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-4">
           {navigation.map((item) => {
             // Precise matching for tools with mode params
             const isActive = item.mode 
                ? (location.pathname === '/tools' && currentMode === item.mode)
                : (location.pathname === item.path)

             return (
               <NavLink
                 key={item.name}
                 to={item.path}
                 className={`
                   flex items-center gap-6 px-4 py-4 rounded-2xl transition-all duration-500 group relative
                   ${isActive ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'text-gray-600 hover:text-white hover:bg-white/5'}
                 `}
               >
                 <item.icon className="w-6 h-6 shrink-0" />
                 <motion.span 
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                    className="text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap"
                 >
                    {item.name}
                 </motion.span>
                 {isHovered && (
                   <HiChevronRight className={`ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'text-black' : 'text-white/20'}`} />
                 )}
               </NavLink>
             )
           })}
        </nav>

        {/* Footer / Sign Out */}
        <div className="pt-8 border-t border-white/5 overflow-hidden">
          <button
            onClick={signOut}
            className="w-full flex items-center gap-6 px-4 py-4 rounded-2xl text-gray-700 hover:bg-neutral-900 hover:text-white transition-all group"
          >
            <HiOutlineLogout className="w-6 h-6 shrink-0" />
            <motion.span 
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
              className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
            >
              Terminate Session
            </motion.span>
          </button>
        </div>
      </motion.aside>
    </>
  )
}
