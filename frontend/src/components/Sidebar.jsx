import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  HiOutlineHome,
  HiOutlinePhotograph,
  HiOutlineChatAlt2,
  HiOutlineColorSwatch,
  HiOutlineLogout,
  HiOutlineClock,
  HiOutlineRefresh,
  HiOutlineEye
} from 'react-icons/hi'
import { FcGoogle } from 'react-icons/fc'
import useAuthStore from '../store/useAuthStore'
import useEnhancementStore from '../store/useEnhancementStore'

const navigation = [
  { name: 'ai image generator', path: '/tools?mode=synth', icon: HiOutlinePhotograph },
  { name: 'image enhancer', path: '/tools?mode=enhance', icon: HiOutlineRefresh },
  { name: 'ai image denoise', path: '/tools?mode=denoise', icon: HiOutlineColorSwatch },
  { name: 'ai background remover', path: '/tools?mode=extract', icon: HiOutlineEye },
  { name: 'ai chatbot', path: '/chatbot', icon: HiOutlineChatAlt2 },
]

export default function Sidebar() {
  const { user, signOut } = useAuthStore()
  const { history, fetchHistory } = useEnhancementStore()

  useEffect(() => {
    if (user) {
      fetchHistory(user.id, 5)
    }
  }, [user])

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col w-[300px] h-[calc(100vh-8rem)] glass-dark border-r border-white/5 p-6 z-40 fixed left-0 top-[6rem] mx-4 rounded-3xl"
    >
      {/* Search Header Style */}
      <div className="px-4 mb-10 mt-4">
        <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.5em]">Forge Archon</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-2 mb-10 px-2">
        {navigation.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 ${
                isActive
                  ? 'bg-white text-black shadow-2xl'
                  : 'text-gray-600 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <link.icon className="w-4 h-4" />
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Recent History (Stitch Style) */}
      <div className="px-4 mb-4 flex-1 overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-2 mb-6">
            <HiOutlineClock className="text-gray-700 w-3 h-3" />
            <span className="text-[9px] font-bold text-gray-700 uppercase tracking-[0.4em]">Recent Modulations</span>
        </div>
        
        <div className="space-y-4">
          {history.length > 0 ? history.slice(0, 6).map((item) => (
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
          )) : (
            <span className="text-[9px] font-bold text-gray-800 uppercase tracking-widest block px-2">Empty Ledger</span>
          )}
        </div>
      </div>

      {/* Sign Out Action */}
      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between px-4">
        <button
          onClick={signOut}
          className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-gray-600 hover:text-red-400 transition-colors"
        >
          {user?.app_metadata?.provider === 'google' ? (
            <FcGoogle className="w-3.5 h-3.5" />
          ) : (
            <HiOutlineLogout className="w-3.5 h-3.5" />
          )}
          Sign Out
        </button>
        <span className="text-[8px] font-bold text-gray-900 uppercase tracking-[0.3em]">PRO v3</span>
      </div>
    </motion.aside>
  )
}
