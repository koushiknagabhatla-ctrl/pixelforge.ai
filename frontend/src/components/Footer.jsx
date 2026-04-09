import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { useState, useEffect } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [vibration, setVibration] = useState(0)

  const githubUrl = "https://github.com/koushiknagabhatla-ctrl"

  // Typing "Vibration" Effect logic
  useEffect(() => {
    if (email.length > 0) {
      setVibration(2)
      const timer = setTimeout(() => setVibration(0), 100)
      return () => clearTimeout(timer)
    }
  }, [email])

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 pt-40 pb-20 overflow-hidden neural-grain">
      {/* Dynamic Background Aura */}
      <motion.div 
        animate={{ 
          scale: isFocused ? 1.2 : 1,
          opacity: isFocused ? 0.05 : 0.02
        }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-white rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32 w-full max-w-3xl"
          >
            <h2 className="text-5xl md:text-8xl archon-heading mb-10 text-white/90">Prepare for Ignition</h2>
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.8em] mb-16">
              Neural Network Expansion Now Open
            </p>

            {/* Extraordinary Email Forge */}
            <div className="relative group max-w-xl mx-auto">
              <motion.div
                animate={{ x: vibration }}
                className="relative"
              >
                <input
                  type="email"
                  placeholder="IDENTITY@NEURAL.LINK"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="forge-input-premium text-center tracking-[0.4em] font-black uppercase text-xl md:text-2xl py-8 
                             bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-1000 border-white/[0.05] focus:border-white/20"
                />
                
                {/* Reactive Keystroke Glow */}
                <AnimatePresence>
                  {isFocused && (
                    <motion.div 
                      layoutId="glow"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm"
                    />
                  )}
                </AnimatePresence>

                {/* Particle Emitters (Visual Only) */}
                {email && isFocused && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-white/10 blur-xl animate-pulse"
                    />
                )}
              </motion.div>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pill-button pill-primary mt-12 w-full shadow-[0_0_50px_rgba(255,255,255,0.1)]"
              >
                Request Authorization
              </motion.button>
            </div>
          </motion.div>

          {/* Signature & GitHub Architectural Core */}
          <div className="grid grid-cols-1 md:grid-cols-3 w-full items-center gap-16 pt-20 border-t border-white/[0.03]">
            <div className="order-2 md:order-1 flex flex-col items-center md:items-start gap-3">
                <span className="text-[11px] font-black text-white uppercase tracking-[0.5em]">Pixel Forge</span>
                <span className="text-[8px] font-bold text-gray-800 uppercase tracking-[0.3em]">Architect Neural Console v3.4.2</span>
            </div>

            <div className="order-1 md:order-2 flex flex-col items-center gap-6">
              <span className="text-[9px] font-black text-gray-700 uppercase tracking-[0.8em]">Masterwork by</span>
              <a 
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center"
              >
                <span className="text-3xl font-black uppercase tracking-[0.4em] text-white group-hover:text-white/70 transition-all duration-700">
                    Koushik
                </span>
                <motion.div 
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    className="h-px bg-white/20 mt-2"
                />
                <div className="mt-8 p-4 glass-premium rounded-2xl group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <FaGithub className="w-6 h-6" />
                </div>
              </a>
            </div>

            <div className="order-3 flex flex-col items-center md:items-end gap-3">
               <a 
                 href="mailto:architect@pixelforge.ai"
                 className="flex items-center gap-4 text-[10px] font-black text-gray-600 hover:text-white transition-all uppercase tracking-[0.4em] group"
               >
                 <HiOutlineMail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                 Forge Communication
               </a>
               <span className="text-[7px] font-black text-gray-900 uppercase tracking-[1em]">Universal Domain 2026</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
