import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const NeuralBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for that "Silk" feel
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Small movement range for professional subtlety
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-[-1] bg-[#050505] overflow-hidden pointer-events-none">
      {/* Interactive Gradient Mesh */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute inset-[-100px] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_50%)]"
      />
      
      {/* Secondary Distant Aura */}
      <motion.div 
        style={{ x: springX, y: springY }}
        transition={{ mass: 2 }} // Slower movement for depth
        className="absolute inset-[-200px] bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.01)_0%,transparent_60%)]"
      />

      {/* Static Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none neural-grain" />
      
      {/* Decorative Blur Spots */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[150px]" />
      <div className="absolute bottom-[20%] right-[10%] w-[700px] h-[700px] bg-white/[0.005] rounded-full blur-[200px]" />
    </div>
  );
};

export default NeuralBackground;
