import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../store/useAuthStore';

export default function Navbar() {
  const { user, signOut } = useAuthStore();

  return (
    <nav className="fixed top-0 left-0 right-0 h-24 flex items-center justify-between px-8 lg:px-12 bg-black/50 backdrop-blur-2xl border-b border-white/5 z-[100]">
      <Link to="/" className="flex items-center gap-4 group">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-black text-xl text-black shadow-2xl transition-transform duration-500 group-hover:scale-110">
          P
        </div>
        <div className="flex flex-col">
          <span className="font-black text-lg tracking-tighter uppercase leading-none">Pixel Forge</span>
          <span className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.4em] mt-1">Digital Foundry</span>
        </div>
      </Link>

      <div className="flex items-center gap-10">
        {user && (
          <div className="hidden md:flex items-center gap-10">
            {[
              { label: 'AI Tools', path: '/tools' },
              { label: 'Chatbot', path: '/chatbot' },
              { label: 'History', path: '/history' }
            ].map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-white ${
                    isActive ? 'text-white' : 'text-gray-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}

        <div className="flex items-center gap-6">
          {user ? (
            <button
              onClick={signOut}
              className="px-6 py-3 glass-button rounded-xl text-[10px] font-black uppercase tracking-[0.2em]"
            >
              Sign Out
            </button>
          ) : (
            <div className="flex items-center gap-8">
              <Link to="/login" className="text-[10px] font-black text-gray-600 hover:text-white uppercase tracking-widest transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="px-8 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
                Join Archive
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
