import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const IntroForge = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),  // Branding reveal
      setTimeout(() => setPhase(2), 2400), // Neural sync
      setTimeout(() => onComplete(), 3600) // Finish
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
        {/* Cinematic Backdrop Pulse */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 3, ease: 'easeOut' }}
            className="absolute w-[800px] h-[800px] bg-white/[0.015] rounded-full blur-[150px]" 
        />

        <AnimatePresence mode="wait">
            {phase === 1 && (
                <motion.div
                    key="branding"
                    initial={{ opacity: 0, letterSpacing: '0.1em', filter: 'blur(10px)' }}
                    animate={{ opacity: 1, letterSpacing: '2em', filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex flex-col items-center"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-widest text-center">
                        PIXEL FORGE
                    </h1>
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="h-px bg-white/20 mt-12 w-32"
                    />
                </motion.div>
            )}

            {phase === 2 && (
                <motion.div
                    key="sync"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center gap-4"
                >
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[1em] animate-pulse">
                        Neural Synapse Online
                    </span>
                    <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                className="w-1.5 h-1.5 bg-white rounded-full"
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Shutter Reveal Foundation */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-20"
        >
            <span className="text-[9px] font-bold text-gray-800 uppercase tracking-[0.5em]">Forge AI Architecture v9.0</span>
        </motion.div>
    </div>
  );
};

export default IntroForge;
