import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineArrowUp, HiOutlineChip, HiOutlineDotsHorizontal } from 'react-icons/hi';
import { prompt_deepseek } from '../services/api';
import useAuthStore from '../store/useAuthStore';

const Chatbot = () => {
  const { user } = useAuthStore();
  
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: user ? `Hey ${user.email?.split('@')[0]}!` : 'Hey User!' 
    }
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
    <div className="flex flex-col h-full bg-transparent overflow-hidden relative font-sans selection:bg-white/10 pb-16 lg:pb-0">
      
      {/* 🎭 NEURAL STAGE (HYPER GLASS) */}
      <div className="flex-1 flex flex-col sm:m-4 m-0 glass-hyper lg:m-8 overflow-hidden relative border border-white/[0.03] shadow-[0_80px_160px_rgba(0,0,0,1)]">
          <div className="absolute inset-0 neural-grain opacity-[0.06]" />

          {/* Header Overlay */}
          <div className="h-16 sm:h-20 bg-black/60 backdrop-blur-3xl z-10 px-6 sm:px-10 flex items-center justify-between border-b border-white/[0.04]">
              <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 glass-premium flex items-center justify-center text-white/40 border-white/5 shadow-2xl">
                      <HiOutlineChip className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h2 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.6em] text-white">Forge AI</h2>
                    <p className="text-[7px] sm:text-[8px] font-bold text-gray-800 uppercase tracking-widest leading-none mt-1">Matrix Core v24.0</p>
                  </div>
              </div>
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20 animate-pulse border border-white/10" />
          </div>
          
          {/* Message Stream */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-5 sm:p-20 space-y-8 scrollbar-hide pt-6 sm:pt-10"
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
                  <div className={`max-w-[92%] sm:max-w-[70%] group`}>
                      <div className={`p-5 sm:p-7 rounded-[1.8rem] sm:rounded-[2.2rem] text-[11px] sm:text-[13px] leading-[1.6] relative transition-all duration-1000 font-medium ${
                        msg.role === 'user' 
                        ? 'glass-premium border-white/20 text-white shadow-3xl' 
                        : 'glass-strong border-white/[0.05] text-gray-400'
                      }`}>
                        {msg.content}
                        
                        {/* Messenger Edge Glow */}
                        <div className={`absolute top-0 w-24 h-24 bg-radial-gradient from-white/[0.06] to-transparent pointer-events-none ${msg.role === 'user' ? 'right-0 rounded-tr-[1.8rem] sm:rounded-tr-[2.2rem]' : 'left-0 rotate-180 rounded-tr-[1.8rem] sm:rounded-tr-[2.2rem]'}`} />
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
                    <div className="px-6 py-3 glass border-white/10 flex items-center gap-4">
                        <div className="flex gap-2">
                            {[0, 1, 2].map(i => (
                                <motion.div 
                                    key={i}
                                    animate={{ 
                                        scale: [1, 1.8, 1],
                                        opacity: [0.3, 1, 0.3]
                                    }}
                                    transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.2 }}
                                    className="w-1.2 h-1.2 rounded-full bg-white"
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ⌨️ SEPARATED INPUT AREA */}
          <div className="p-4 sm:p-6 bg-black/40 backdrop-blur-3xl border-t border-white/[0.03]">
            <div className="max-w-3xl mx-auto relative group">
                <div className="absolute inset-0 bg-white/[0.01] blur-[80px] rounded-full -z-10 group-focus-within:bg-white/[0.05] transition-all duration-1000" />
                
                <div className="glass-premium p-1.5 sm:p-2 flex items-center gap-3 sm:gap-5 border border-white/5 shadow-2xl transition-all duration-1000 min-h-[56px] sm:min-h-[64px] rounded-[1.2rem] sm:rounded-[1.5rem]">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/[0.03] text-gray-800 flex items-center justify-center shrink-0">
                        <HiOutlineDotsHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder=""
                        className="flex-1 bg-transparent border-none outline-none text-white text-[13px] sm:text-base font-semibold placeholder:text-gray-900 h-full px-2"
                    />

                    <motion.button
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl transition-all duration-1000 flex items-center justify-center shrink-0 ${
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
