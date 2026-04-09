import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineArrowUp, HiOutlineChip, HiOutlineUser, HiOutlineDotsHorizontal } from 'react-icons/hi';
import { prompt_deepseek } from '../services/api';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Neural link active. Directive requested.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await prompt_deepseek(input);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: "Synchronization failure. Core unavailable." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#010101] overflow-hidden relative font-sans selection:bg-white/10">
      
      {/* 🎭 NEURAL STAGE (HYPER GLASS) */}
      <div className="flex-1 flex flex-col m-4 sm:m-8 glass-hyper overflow-hidden relative border border-white/[0.03] shadow-[0_80px_160px_rgba(0,0,0,1)]">
          <div className="absolute inset-0 neural-grain opacity-[0.06]" />

          {/* Header Overlay */}
          <div className="h-20 bg-black/60 backdrop-blur-3xl z-10 px-10 flex items-center justify-between border-b border-white/[0.04]">
              <div className="flex items-center gap-4">
                  <div className="w-10 h-10 glass-premium flex items-center justify-center text-white/40 border-white/5 shadow-2xl">
                      <HiOutlineChip className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-white">Forge AI</h2>
                    <p className="text-[8px] font-bold text-gray-800 uppercase tracking-widest leading-none mt-1">Llama 3.3 Core v18.1</p>
                  </div>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/20 animate-pulse border border-white/10" />
          </div>
          
          {/* Message Stream */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 sm:p-20 space-y-8 scrollbar-hide pt-10"
          >
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] sm:max-w-[70%] group`}>
                      <div className={`p-6 sm:p-7 rounded-[2.2rem] text-[13px] leading-[1.6] relative transition-all duration-1000 font-medium ${
                        msg.role === 'user' 
                        ? 'glass-premium border-white/20 text-white shadow-3xl' 
                        : 'glass-strong border-white/[0.05] text-gray-400'
                      }`}>
                        {msg.content}
                        
                        {/* Messenger Edge Glow */}
                        <div className={`absolute top-0 w-24 h-24 bg-radial-gradient from-white/[0.06] to-transparent pointer-events-none rounded-tr-[2.2rem] ${msg.role === 'user' ? 'right-0' : 'left-0 rotate-180'}`} />
                      </div>
                  </div>
                </motion.div>
              ))}
              
              {loading && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-start px-2"
                >
                    <div className="px-7 py-4 glass border-white/10 flex items-center gap-5">
                        <div className="flex gap-2">
                            {[0, 1, 2].map(i => (
                                <motion.div 
                                    key={i}
                                    animate={{ 
                                        scale: [1, 1.8, 1],
                                        opacity: [0.3, 1, 0.3]
                                    }}
                                    transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.2 }}
                                    className="w-1.5 h-1.5 rounded-full bg-white"
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ⌨️ SEPARATED INPUT AREA (NO OVERLAP) */}
          <div className="p-6 bg-black/40 backdrop-blur-3xl border-t border-white/[0.03]">
            <div className="max-w-3xl mx-auto relative group">
                <div className="absolute inset-0 bg-white/[0.01] blur-[80px] rounded-full -z-10 group-focus-within:bg-white/[0.05] transition-all duration-1000" />
                
                <div className="glass-premium p-2 flex items-center gap-5 border border-white/5 shadow-2xl transition-all duration-1000 min-h-[64px] rounded-[1.5rem]">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] text-gray-800 flex items-center justify-center shrink-0">
                        <HiOutlineDotsHorizontal className="w-5 h-5" />
                    </div>
                    
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder=""
                        className="flex-1 bg-transparent border-none outline-none text-white text-base font-semibold placeholder:text-gray-900 h-full px-2"
                    />

                    <motion.button
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`h-10 w-10 rounded-xl transition-all duration-1000 flex items-center justify-center shrink-0 ${
                            loading || !input.trim() 
                            ? 'text-gray-900 bg-white/5' 
                            : 'bg-white text-black shadow-white/10 shadow-xl'
                        }`}
                    >
                        <HiOutlineArrowUp className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Chatbot;
