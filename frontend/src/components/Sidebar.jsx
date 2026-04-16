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
import useAuthStore from '../store/useAuthStore'
import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'

const navigation = [
  { name: 'HOME', path: '/', icon: HiOutlineHome },
  { name: 'GENERATE', path: '/tools?mode=generate', icon: HiOutlineSparkles, mode: 'generate' },
  { name: 'ENHANCE', path: '/tools?mode=enhance', icon: HiOutlineLightningBolt, mode: 'enhance' },
  { name: 'FORGE AI', path: '/chatbot', icon: HiOutlineChatAlt2 },
  { name: 'ARCHIVES', path: '/history', icon: HiOutlineClock },
]

export default function Sidebar() {
  const { user, signOut } = useAuthStore()
  const [isHovered, setIsHovered] = useState(false)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const currentMode = searchParams.get('mode')

  const getUserAvatar = () => user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;
  const getUserInitials = () => {
    const name = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || '';
    if (name.includes('@')) return name.charAt(0).toUpperCase();
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

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
          borderRightColor: isHovered ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.02)'
        }}
        transition={{ type: "spring", stiffness: 450, damping: 40 }}
        className="fixed left-0 top-0 bottom-0 z-[80] border-r hidden lg:flex flex-col p-6 pt-24 overflow-hidden selection:bg-indigo-500/20"
        style={{
          background: isHovered 
            ? 'linear-gradient(135deg, rgba(10,10,15,0.98), rgba(5,5,10,0.95))' 
            : 'rgba(5,5,10,0.3)',
          backdropFilter: isHovered ? 'blur(60px)' : 'blur(15px)',
        }}
      >
        {/* Brand Header */}
        <Link to="/" className="mb-14 px-1 whitespace-nowrap overflow-hidden transition-transform cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="#818cf8" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M12 8L8 10.5V15.5L12 18L16 15.5V10.5L12 8Z" fill="#6366f1" fillOpacity="0.3" stroke="#818cf8" strokeWidth="1" strokeLinejoin="round"/>
                  </svg>
                </div>
                <motion.div animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}>
                  <h2 className="text-[10px] font-bold text-white/80 uppercase tracking-[0.3em]">Pixel Forge</h2>
                  <span className="text-[7px] font-semibold text-indigo-300/20 uppercase tracking-widest">Neural Engine</span>
                </motion.div>
            </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
           {navigation.map((item) => {
             const isActive = item.mode 
                ? (location.pathname === '/tools' && currentMode === item.mode)
                : (location.pathname === item.path)

             return (
               <NavLink
                 key={item.name}
                 to={item.path}
                 className={`
                   flex items-center gap-5 px-4 py-3.5 rounded-xl transition-all duration-500 group relative
                   ${isActive 
                     ? 'bg-indigo-500/10 text-indigo-200 border border-indigo-500/20' 
                     : 'text-white/20 hover:text-white/50 hover:bg-white/[0.03]'}
                 `}
               >
                 <item.icon className="w-5 h-5 shrink-0" />
                 <motion.span 
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
                    className="text-[9px] font-bold uppercase tracking-[0.25em] whitespace-nowrap"
                 >
                    {item.name}
                 </motion.span>
                 {isHovered && isActive && (
                   <HiChevronRight className="ml-auto w-3.5 h-3.5 text-indigo-300" />
                 )}
               </NavLink>
             )
           })}
        </nav>

        {/* Footer / Account & Sign Out */}
        <div className="pt-6 border-t border-white/[0.04] space-y-2">
          {user && (
            <div className="flex items-center gap-4 px-4 py-2 whitespace-nowrap overflow-hidden">
               <Avatar className="h-7 w-7 shrink-0 border border-white/[0.06]">
                 <AvatarImage src={getUserAvatar()} />
                 <AvatarFallback className="text-[9px]">{getUserInitials()}</AvatarFallback>
               </Avatar>
               <motion.span 
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
                className="text-[9px] font-bold text-white/40 uppercase tracking-wider truncate"
               >
                 {user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0]}
               </motion.span>
            </div>
          )}

          <button
            onClick={() => { if(window.confirm('Sign out?')) signOut() }}
            className="w-full flex items-center gap-5 px-4 py-3.5 rounded-xl text-white/15 hover:bg-white/[0.03] hover:text-white/40 transition-all duration-500 group overflow-hidden"
          >
            <HiOutlineLogout className="w-5 h-5 shrink-0" />
            <motion.span 
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
              className="text-[9px] font-bold uppercase tracking-wider whitespace-nowrap"
            >
              Sign Out
            </motion.span>
          </button>
        </div>
      </motion.aside>
    </>
  )
}
