import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

const ElysiumScene = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#050505] overflow-hidden">
      {/* 3D Model Layer using Spline (Professional Neural Mesh) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: 'easeOut', delay: 3.5 }}
        className="absolute inset-0 w-full h-full"
      >
        <Spline 
            scene="https://prod.spline.design/6Wq1Q7nS1u66iC9w/scene.splinecode" 
            className="w-full h-full pointer-events-none"
        />
      </motion.div>

      {/* Atmospheric Overlays for Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] pointer-events-none z-10" />
      
      {/* Cinematic Film Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none neural-grain z-20" />
      
      {/* Dynamic Aura Glow (Follows subtle parallax) */}
      <motion.div 
        animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.02, 0.04, 0.02]
        }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white rounded-full blur-[180px] pointer-events-none" 
      />
    </div>
  );
};

export default ElysiumScene;
