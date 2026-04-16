import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0=grid, 1=text, 2=fade-out
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 3200);
    const t3 = setTimeout(() => onComplete?.(), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#0a0a0f] via-black to-[#0d0d15] text-white overflow-hidden flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* SVG Grid */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="introGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(99,102,241,0.06)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#introGrid)" />
            {/* Animated grid lines */}
            <motion.line x1="0" y1="20%" x2="100%" y2="20%" stroke="rgba(99,102,241,0.1)" strokeWidth="0.5"
              strokeDasharray="5 5" initial={{ strokeDashoffset: 1000 }} animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, ease: "easeOut" }} />
            <motion.line x1="0" y1="80%" x2="100%" y2="80%" stroke="rgba(99,102,241,0.1)" strokeWidth="0.5"
              strokeDasharray="5 5" initial={{ strokeDashoffset: 1000 }} animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.3 }} />
            <motion.line x1="20%" y1="0" x2="20%" y2="100%" stroke="rgba(99,102,241,0.1)" strokeWidth="0.5"
              strokeDasharray="5 5" initial={{ strokeDashoffset: 1000 }} animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.6 }} />
            <motion.line x1="80%" y1="0" x2="80%" y2="100%" stroke="rgba(99,102,241,0.1)" strokeWidth="0.5"
              strokeDasharray="5 5" initial={{ strokeDashoffset: 1000 }} animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.9 }} />
            {/* Intersection dots */}
            <motion.circle cx="20%" cy="20%" r="2" fill="rgba(129,140,248,0.3)"
              initial={{ opacity: 0 }} animate={{ opacity: [0, 0.3, 0.1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
            <motion.circle cx="80%" cy="20%" r="2" fill="rgba(129,140,248,0.3)"
              initial={{ opacity: 0 }} animate={{ opacity: [0, 0.3, 0.1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.2 }} />
            <motion.circle cx="20%" cy="80%" r="2" fill="rgba(129,140,248,0.3)"
              initial={{ opacity: 0 }} animate={{ opacity: [0, 0.3, 0.1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.4 }} />
            <motion.circle cx="80%" cy="80%" r="2" fill="rgba(129,140,248,0.3)"
              initial={{ opacity: 0 }} animate={{ opacity: [0, 0.3, 0.1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.6 }} />
          </svg>

          {/* Corner elements */}
          {[
            'top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'
          ].map((pos, i) => (
            <motion.div key={i}
              className={`absolute ${pos} w-8 h-8 border border-indigo-500/10`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.15, duration: 0.6 }}
            >
              <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-indigo-400/20 rounded-full" />
            </motion.div>
          ))}

          {/* Mouse glow */}
          <div
            className="fixed w-80 h-80 rounded-full pointer-events-none"
            style={{
              left: mousePos.x, top: mousePos.y,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(99,102,241,0.04), transparent 70%)',
              transition: 'left 70ms linear, top 70ms linear',
            }}
          />

          {/* Central content */}
          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            {phase >= 1 && (
              <>
                {/* Logo */}
                <motion.div
                  className="flex items-center justify-center gap-3 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="#818cf8" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M12 8L8 10.5V15.5L12 18L16 15.5V10.5L12 8Z" fill="#6366f1" fillOpacity="0.3" stroke="#818cf8" strokeWidth="1" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.4em] text-indigo-200/60">Pixel Forge</span>
                </motion.div>

                {/* Main heading */}
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight leading-tight tracking-tight text-white/90 font-['Manrope']"
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-200/50">Create</span>
                  {' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-indigo-100 to-indigo-400/30">without</span>
                  {' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-200/50">limits</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  className="mt-6 text-sm md:text-base text-indigo-200/30 font-light tracking-wide max-w-lg mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  Neural image synthesis, powered by precision
                </motion.p>

                {/* Decorative line */}
                <motion.div
                  className="mt-10 mx-auto h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: 160 }}
                  transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
                />

                {/* Bottom dots */}
                <motion.div
                  className="mt-8 flex justify-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                >
                  <div className="w-1 h-1 bg-indigo-400/30 rounded-full" />
                  <div className="w-1 h-1 bg-indigo-400/50 rounded-full" />
                  <div className="w-1 h-1 bg-indigo-400/30 rounded-full" />
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
