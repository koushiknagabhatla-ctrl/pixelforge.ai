import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function FramerBackground({ mouse }) {
  const [windowSize, setWindowSize] = useState({ w: typeof window !== 'undefined' ? window.innerWidth : 1000, h: typeof window !== 'undefined' ? window.innerHeight : 1000 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute smooth spring-based mouse positions. If mouse ref isn't available, fallback to center.
  // The mouse ref values are 0-1 normalized from the parent component.
  const mX = mouse?.current?.x || 0.5;
  const mY = mouse?.current?.y || 0.5;

  return (
    <div className="fixed inset-0 w-full h-[100vh] -z-20 overflow-hidden bg-[#010101] pointer-events-none">
      
      {/* 🎭 CORE DARK GRADIENT BASE */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#080808] via-[#010101] to-black" />
      
      {/* 🌟 PARALLAX ORBS & NEBULA FIELDS */}
      <motion.div 
         animate={{
            x: (mX - 0.5) * -100, // Move opposite to mouse
            y: (mY - 0.5) * -100
         }}
         transition={{ type: "spring", damping: 30, stiffness: 40 }}
         className="absolute inset-0 w-full h-full"
      >
        
        {/* Core Starburst */}
        <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[800px] md:h-[800px] bg-white opacity-[0.03] rounded-full blur-[100px] md:blur-[140px]" 
        />

        {/* Dynamic Orb 1 - Top Left */}
        <motion.div 
            animate={{ 
                x: (mX - 0.5) * 60, 
                y: (mY - 0.5) * 80,
                rotate: [0, 90, 0]
            }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-gray-600/[0.04] rounded-full blur-[80px]" 
        />

        {/* Dynamic Orb 2 - Bottom Right */}
        <motion.div 
            animate={{ 
                x: (mX - 0.5) * -120, 
                y: (mY - 0.5) * -60 
            }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-[#333]/[0.08] rounded-full blur-[120px]" 
        />

        {/* Pure Contrast Accents */}
        <div className="absolute top-[30%] left-[20%] w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_20px_4px_rgba(255,255,255,0.8)] opacity-20" />
        <div className="absolute bottom-[40%] right-[30%] w-[1px] h-[1px] bg-white rounded-full shadow-[0_0_30px_5px_rgba(255,255,255,0.5)] opacity-40" />

      </motion.div>

      {/* 🧊 FOREGROUND NOISE & GLASS DIFFUSION */}
      {/* SVG Noise filter for extreme premium tactile texture */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay z-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* Extreme Vignette to hide borders and emphasize center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-20 pointer-events-none" />

    </div>
  );
}
