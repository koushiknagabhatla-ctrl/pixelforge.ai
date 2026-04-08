import React from 'react';
import { motion } from 'framer-motion';
import Chatbot from '../components/Chatbot';

export default function ChatbotPage() {
  return (
    <div className="p-4 lg:p-12 animate-fade-in w-full bg-black min-h-screen text-white flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4 mb-12"
            >
                <div className="inline-block p-1 px-3 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-gray-500 uppercase tracking-[0.4em]">
                    Intelligence Matrix
                </div>
                <h1 className="text-4xl font-bold uppercase tracking-tighter">
                  OpenAI <span className="text-gray-600">Archon</span>
                </h1>
                <p className="max-w-xl mx-auto text-gray-700 text-[11px] font-medium uppercase tracking-widest leading-relaxed">
                    A dedicated OpenAI nexus for architectural advice, lighting modulation, and professional photography composition.
                </p>
            </motion.div>

            {/* Premium Full-Screen Chat Hub */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-[3rem] overflow-hidden border-white/5 shadow-3xl h-[650px] relative"
            >
                {/* Decorative background element for the page */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/[0.02] blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />
                
                <Chatbot />
            </motion.div>
        </div>
    </div>
  );
}
