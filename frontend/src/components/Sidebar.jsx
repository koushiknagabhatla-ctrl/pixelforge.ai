import { NavLink, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Sparkles, Zap, MessageSquare, Clock, LogOut, ChevronRight } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'
import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'

const navigation = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Generate', path: '/tools?mode=generate', icon: Sparkles, mode: 'generate' },
  { name: 'Enhance', path: '/tools?mode=enhance', icon: Zap, mode: 'enhance' },
  { name: 'Forge AI', path: '/chatbot', icon: MessageSquare },
  { name: 'Archives', path: '/history', icon: Clock },
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
      <div onMouseEnter={() => setIsHovered(true)} className="fixed left-0 top-0 bottom-0 w-[72px] z-[75] hidden md:block" />

      <motion.aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={false}
        animate={{
          width: isHovered ? 240 : 72,
          borderRightColor: isHovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)'
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="fixed left-0 top-0 bottom-0 z-[80] border-r hidden md:flex flex-col p-4 pt-24 overflow-hidden"
        style={{
          background: isHovered ? 'rgba(9,9,11,0.97)' : 'rgba(9,9,11,0.3)',
          backdropFilter: isHovered ? 'blur(40px)' : 'blur(12px)',
        }}
      >
        {/* Brand */}
        <Link to="/" className="mb-10 px-2 whitespace-nowrap overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
              <div className="w-2.5 h-2.5 rounded-sm bg-white/70" />
            </div>
            <motion.div animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }} transition={{ duration: 0.2 }}>
              <h2 className="text-[13px] font-semibold text-white/80 font-headline">Pixel Forge</h2>
              <span className="text-[9px] text-white/20">Creative Studio</span>
            </motion.div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = item.mode
              ? (location.pathname === '/tools' && currentMode === item.mode)
              : (location.pathname === item.path)
            const Icon = item.icon

            return (
              <NavLink key={item.name} to={item.path}>
                <motion.div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 group relative ${
                    isActive ? 'bg-white text-black' : 'text-white/25 hover:text-white/50 hover:bg-white/[0.03]'
                  }`}
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.15 }}
                >
                  <Icon className="w-[18px] h-[18px] shrink-0" />
                  <motion.span
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-[13px] font-medium whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                  {isHovered && isActive && <ChevronRight className="ml-auto w-3.5 h-3.5" />}
                </motion.div>
              </NavLink>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="pt-4 border-t border-white/[0.04] space-y-1">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2 whitespace-nowrap overflow-hidden">
              <Avatar className="h-7 w-7 shrink-0 border border-white/[0.06]">
                <AvatarImage src={getUserAvatar()} />
                <AvatarFallback className="text-[9px]">{getUserInitials()}</AvatarFallback>
              </Avatar>
              <motion.span
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                transition={{ duration: 0.2 }}
                className="text-[11px] text-white/30 truncate"
              >
                {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </motion.span>
            </div>
          )}

          <motion.button
            onClick={() => { if(window.confirm('Sign out?')) signOut() }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/15 hover:bg-white/[0.03] hover:text-white/35 transition-colors group"
            whileHover={{ x: 2 }}
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            <motion.span
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
              transition={{ duration: 0.2 }}
              className="text-[13px] font-medium whitespace-nowrap"
            >
              Sign Out
            </motion.span>
          </motion.button>
        </div>
      </motion.aside>
    </>
  )
}
