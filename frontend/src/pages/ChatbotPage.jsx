import React from 'react';
import { motion } from 'framer-motion';
import Chatbot from '../components/Chatbot';

export default function ChatbotPage() {
  return (
    <div className="min-h-screen pt-4 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="max-w-6xl w-full h-[calc(100vh-140px)] min-h-[500px] z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="glass-strong h-full overflow-hidden relative shadow-2xl shadow-black/50"
            >
                <Chatbot />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 text-center"
            >
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.8em]">PixelForge Neural Alpha v10.0</span>
            </motion.div>
        </div>
    </div>
  );
}
