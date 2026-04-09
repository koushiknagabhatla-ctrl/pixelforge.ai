import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const ElysiumScene = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Parallax Fallback Logic (v8.0 Engine)
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-[#050505] overflow-hidden">
      {/* 1. LAYER ONE: Permanent Pinnacle Fallback (Stable Gradient) */}
      <motion.div 
        animate={{ 
          x: mousePos.x,
          y: mousePos.y
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        className="absolute inset-[-100px] bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,1)_0%,rgba(5,5,5,1)_100%)]"
      />

      <motion.div 
        animate={{ 
          x: mousePos.x * 1.5,
          y: mousePos.y * 1.5,
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-white rounded-full blur-[160px] pointer-events-none" 
      />

      {/* 2. LAYER TWO: The 3D Neural Scene (Fades in on success) */}
      {!hasError && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full"
        >
          <Spline 
            scene="https://prod.spline.design/RcapcZRKPY2TfIgK/scene.splinecode" 
            onLoad={() => setIsLoaded(true)}
            onError={() => {
                console.error("Elysium 3D Engine Blocked - Initializing Pinnacle Fallback");
                setHasError(true);
            }}
            className="w-full h-full pointer-events-none"
          />
        </motion.div>
      )}

      {/* 3. ATMOSPHERIC OVERLAYS */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] pointer-events-none z-10" />
      
      {/* Cinematic Film Grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none neural-grain z-20" />
    </div>
  );
};

export default ElysiumScene;
