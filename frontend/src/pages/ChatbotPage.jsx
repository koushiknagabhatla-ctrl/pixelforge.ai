import React from 'react';
import { motion } from 'framer-motion';
import Chatbot from '../components/Chatbot';

export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
        {/* Deep Field Atmospheric Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[150px]" />
            <div className="absolute bottom-[10%] right-[5%] w-[800px] h-[800px] bg-white/[0.005] rounded-full blur-[200px]" />
        </div>

        <div className="max-w-7xl w-full px-6 lg:px-12 z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="glass-glow glass-edge rounded-[3.5rem] overflow-hidden border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)] h-[800px] max-h-[85vh] relative"
            >
                <Chatbot />
            </motion.div>
            
            <div className="mt-8 text-center">
                 <span className="text-[10px] font-black text-gray-800 uppercase tracking-[1em] opacity-30">Forge Intelligence • Propietary Neural Architecture</span>
            </div>
        </div>
    </div>
  );
}
