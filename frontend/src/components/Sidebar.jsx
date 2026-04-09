import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HiOutlineSparkles, 
  HiOutlineChatAlt2, 
  HiOutlineLogout, 
  HiOutlineClock,
  HiChevronRight
} from 'react-icons/hi'
import { LuWand2 } from 'react-icons/lu'
import useAuthStore from '../store/useAuthStore'

const navigation = [
  { name: 'IMAGE GENERATOR', path: '/tools?mode=synth', icon: HiOutlineSparkles },
  { name: 'AI ENHANCER', path: '/tools?mode=enhance', icon: LuWand2 },
  { name: 'AI CHATBOT', path: '/chatbot', icon: HiOutlineChatAlt2 },
  { name: 'ARCHIVES', path: '/history', icon: HiOutlineClock },
]

export default function Sidebar() {
  const { signOut } = useAuthStore()

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 bottom-0 w-80 z-[80] bg-[#050505] border-r border-white/5 flex flex-col p-8 pt-32 overflow-hidden"
    >
      {/* Brand Header (Sync with Screenshot 2) */}
      <div className="mb-16 px-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-black text-sm">F</div>
            <div>
              <h2 className="text-xs font-black text-white uppercase tracking-widest">Forge AI</h2>
              <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Menu Console</span>
            </div>
          </div>
      </div>

      {/* Navigation - Tablet/Capsule Style (Screenshot 2 Alignment) */}
      <nav className="flex-1 space-y-4">
         {navigation.map((item) => (
           <NavLink
             key={item.name}
             to={item.path}
             className={({ isActive }) => `
               flex items-center gap-6 px-6 py-5 rounded-[1.5rem] transition-all duration-500 group relative
               ${isActive ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'text-gray-500 hover:text-white hover:bg-white/5'}
             `}
           >
             <item.icon className="w-6 h-6 shrink-0" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                {item.name}
             </span>
             <HiChevronRight className={`ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'text-black' : 'text-white/20'}`} />
           </NavLink>
         ))}
      </nav>

      {/* Footer / Sign Out */}
      <div className="pt-8 border-t border-white/5">
        <button
          onClick={signOut}
          className="w-full flex items-center gap-6 px-6 py-4 rounded-2xl text-gray-600 hover:bg-red-500/10 hover:text-red-400 transition-all group"
        >
          <HiOutlineLogout className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">Terminate Session</span>
        </button>
      </div>
    </motion.aside>
  )
}
