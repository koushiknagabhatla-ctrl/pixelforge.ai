import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuthStore from '../store/useAuthStore'
import { HiOutlineChatAlt2 } from 'react-icons/hi'

export default function Navbar() {
  const { user, signOut } = useAuthStore()

  return (
    <nav className="fixed top-0 left-0 right-0 h-24 flex items-center justify-between px-8 lg:px-12 bg-black/50 backdrop-blur-xl border-b border-white/5 z-50">
      <Link to="/" className="flex items-center gap-4 group">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-black text-xl text-black shadow-2xl shadow-white/20 group-hover:scale-110 transition-transform duration-500">
          P
        </div>
        <div className="flex flex-col">
          <span className="font-black text-lg tracking-tighter uppercase leading-none">Pixel Forge</span>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mt-1">Architecture AI</span>
        </div>
      </Link>

      <div className="flex items-center gap-8 lg:gap-12">
        {user && (
          <div className="hidden md:flex items-center gap-10">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:text-white ${
                  isActive ? 'text-white' : 'text-gray-500'
                }`
              }
            >
              AI Tools
            </NavLink>
            <NavLink
              to="/chatbot"
              className={({ isActive }) =>
                `text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:text-white flex items-center gap-2 ${
                  isActive ? 'text-white' : 'text-gray-500'
                }`
              }
            >
              AI Chatbot
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:text-white ${
                  isActive ? 'text-white' : 'text-gray-500'
                }`
              }
            >
              Archive
            </NavLink>
          </div>
        )}

        <div className="flex items-center gap-6">
          {user ? (
            <button
              onClick={signOut}
              className="flex items-center gap-3 px-6 py-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white hover:text-black text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 group"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 group-hover:bg-black transition-colors" />
              Sign Out
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
              >
                Join Forge
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
