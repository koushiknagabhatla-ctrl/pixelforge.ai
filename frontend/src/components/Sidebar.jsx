import { NavLink, useLocation, Link } from 'react-router-dom'
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
import { FcGoogle } from 'react-icons/fc'
import useAuthStore from '../store/useAuthStore'
import { useState } from 'react'

const navigation = [
  { name: 'HOME', path: '/', icon: HiOutlineHome },
  { name: 'GENERATION', path: '/tools?mode=synth', icon: HiOutlineSparkles, mode: 'synth' },
  { name: 'ENHANCEMENT', path: '/tools?mode=enhance', icon: HiOutlineLightningBolt, mode: 'enhance' },
  { name: 'FORGE AI', path: '/chatbot', icon: HiOutlineChatAlt2 },
  { name: 'ARCHIVES', path: '/history', icon: HiOutlineClock },
]

export default function Sidebar() {
  const { user, signOut } = useAuthStore()
  const [isHovered, setIsHovered] = useState(false)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const currentMode = searchParams.get('mode')

  return (
    <>
      <div 
        onMouseEnter={() => setIsHovered(true)}
        className="fixed left-0 top-0 bottom-0 w-20 z-[75] hidden lg:block"
      />

      <motion.aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={false}
        animate={{ 
          width: isHovered ? 260 : 80,
          background: isHovered ? 'linear-gradient(135deg, rgba(10,10,10,0.99), rgba(2,2,2,0.95))' : 'rgba(2,2,2,0.3)',
          backdropFilter: isHovered ? 'blur(60px)' : 'blur(15px)',
          borderRightColor: isHovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.02)'
        }}
        transition={{ type: "spring", stiffness: 450, damping: 40 }}
        className="fixed left-0 top-0 bottom-0 z-[80] border-r hidden lg:flex flex-col p-6 pt-24 overflow-hidden selection:bg-white/10"
      >
        <div className="absolute inset-0 neural-grain opacity-[0.05] pointer-events-none" />

        {/* Brand Header */}
        <Link to="/" className="mb-14 px-1 whitespace-nowrap overflow-hidden hover-lift transition-transform cursor-pointer">
            <div className="flex items-center gap-5">
                <div className="w-10 h-10 glass flex items-center justify-center shrink-0 border-white/5 shadow-2xl">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 10L12 2L20 10L12 18L4 10Z" stroke="white" strokeWidth="2.5" strokeLinecap="square"/>
                    </svg>
                </div>
                <motion.div animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}>
                  <div className="glass-text-inner !px-3 !py-1 mb-1">
                    <h2 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Console</h2>
                  </div>
                  <span className="text-[7px] font-bold text-gray-800 uppercase tracking-widest ml-1">SYSTEM v24.0</span>
                </motion.div>
            </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-4">
           {navigation.map((item) => {
             const isActive = item.mode 
                ? (location.pathname === '/tools' && currentMode === item.mode)
                : (location.pathname === item.path)

             return (
               <NavLink
                 key={item.name}
                 to={item.path}
                 className={`
                   flex items-center gap-6 px-4 py-4 rounded-2xl transition-all duration-700 group relative hover-lift
                   ${isActive ? 'bg-white text-black shadow-[0_15px_40px_rgba(255,255,255,0.2)] scale-[1.02]' : 'text-gray-700 hover:text-white hover:bg-white/5'}
                 `}
               >
                 <item.icon className="w-6 h-6 shrink-0" />
                 <motion.span 
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
                    className="text-[9px] font-black uppercase tracking-[0.3em] whitespace-nowrap"
                 >
                    {item.name}
                 </motion.span>
                 {isHovered && (isActive && (
                   <HiChevronRight className="ml-auto w-4 h-4 text-black" />
                 ))}
               </NavLink>
             )
           })}
        </nav>

        {/* Footer / Account & Sign Out */}
        <div className="pt-8 border-t border-white/5 space-y-3">
          {user && (
            <button 
              onClick={() => { if(window.confirm('Terminate Neural Link? (Sign Out)')) signOut() }}
              className="flex items-center gap-6 px-4 py-2 opacity-50 hover:opacity-100 transition-opacity whitespace-nowrap cursor-pointer overflow-hidden group hover-lift w-full text-left"
            >
               <div className="relative shrink-0">
                  <div className="w-6 h-6 rounded-full glass-strong flex items-center justify-center border border-white/10 relative z-10 shadow-inner">
                      <FcGoogle className="w-4 h-4" />
                  </div>
                  <div className="absolute inset-0 bg-white blur-md opacity-40 group-hover:opacity-100 transition-opacity rounded-full scale-125" />
               </div>
               <motion.span 
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
                className="text-[9px] font-black text-white uppercase tracking-widest"
               >
                 {user.email?.split('@')[0]}
               </motion.span>
            </button>
          )}

          <button
            onClick={signOut}
            className="w-full flex items-center gap-6 px-4 py-4 rounded-2xl text-gray-800 hover:bg-white hover:text-black transition-all duration-700 group overflow-hidden hover-lift"
          >
            <HiOutlineLogout className="w-6 h-6 shrink-0" />
            <motion.span 
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
              className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap"
            >
              Sign Out
            </motion.span>
          </button>
        </div>
      </motion.aside>
    </>
  )
}
