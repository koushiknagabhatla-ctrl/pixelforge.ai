import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  HiOutlineSparkles, 
  HiOutlineChatAlt2, 
  HiOutlineLogout, 
  HiOutlineClock,
  HiChevronRight,
  HiOutlineLightningBolt,
  HiOutlineHome
} from 'react-icons/hi'
import useAuthStore from '../store/useAuthStore'
import { useState } from 'react'

const navigation = [
  { name: 'HOME', path: '/', icon: HiOutlineHome },
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
        className="fixed left-0 top-0 bottom-0 w-24 z-[75]"
      />

      <motion.aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={false}
        animate={{ 
          width: isHovered ? 280 : 96,
          background: isHovered ? 'linear-gradient(135deg, rgba(15,15,15,0.98), rgba(5,5,5,0.9))' : 'rgba(5,5,5,0.4)',
          backdropFilter: isHovered ? 'blur(60px)' : 'blur(20px)',
          borderRightColor: isHovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.02)'
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed left-0 top-0 bottom-0 z-[80] border-r flex flex-col p-8 pt-24 overflow-hidden selection:bg-white/10"
      >
        <div className="absolute inset-0 neural-grain opacity-[0.04] pointer-events-none" />

        {/* Brand Header */}
        <div className="mb-16 px-2 whitespace-nowrap overflow-hidden">
            <div className="flex items-center gap-6">
                <div className="w-12 h-12 glass flex items-center justify-center shrink-0 border-white/10">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 10L12 2L20 10L12 18L4 10Z" stroke="white" strokeWidth="2.5" strokeLinecap="square"/>
                    </svg>
                </div>
                <motion.div animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}>
                  <h2 className="text-[11px] font-black text-white uppercase tracking-[0.5em]">Forge Nexus</h2>
                  <span className="text-[8px] font-bold text-gray-700 uppercase tracking-widest">Neural Link v16.0</span>
                </motion.div>
            </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-5">
           {navigation.map((item) => {
             const isActive = item.mode 
                ? (location.pathname === '/tools' && currentMode === item.mode)
                : (location.pathname === item.path)

             return (
               <NavLink
                 key={item.name}
                 to={item.path}
                 className={`
                   flex items-center gap-7 px-5 py-5 rounded-[2.5rem] transition-all duration-700 group relative
                   ${isActive ? 'bg-white text-black shadow-[0_20px_50px_rgba(255,255,255,0.15)] scale-[1.02]' : 'text-gray-600 hover:text-white hover:bg-white/5'}
                 `}
               >
                 <item.icon className="w-7 h-7 shrink-0" />
                 <motion.span 
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
                    className="text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap"
                 >
                    {item.name}
                 </motion.span>
                 {isHovered && (
                   <HiChevronRight className={`ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform ${isActive ? 'text-black translate-x-0' : 'text-white/20 -translate-x-2'}`} />
                 )}
               </NavLink>
             )
           })}
        </nav>

        {/* Footer / Sign Out */}
        <div className="pt-10 border-t border-white/5 overflow-hidden">
          <button
            onClick={signOut}
            className="w-full flex items-center gap-7 px-5 py-5 rounded-[2.5rem] text-gray-700 hover:bg-white hover:text-black transition-all duration-700 group"
          >
            <HiOutlineLogout className="w-7 h-7 shrink-0" />
            <motion.span 
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
              className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
            >
              Sign Out
            </motion.span>
          </button>
        </div>
      </motion.aside>
    </>
  )
}
