import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineArrowUp, HiOutlineChip, HiOutlineUser, HiOutlineDotsHorizontal } from 'react-icons/hi';
import { prompt_deepseek } from '../services/api';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Connection established. How may I assist your vision today?' }
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
      setMessages((prev) => [...prev, { role: 'assistant', content: "Neural sync failed. Please re-authorize session." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#010101] overflow-hidden relative font-sans selection:bg-white/10">
      
      {/* 🎭 NEURAL STAGE (HYPER GLASS) */}
      <div className="flex-1 flex flex-col m-4 sm:m-8 glass-hyper overflow-hidden relative border border-white/5">
          <div className="absolute inset-0 neural-grain opacity-[0.06]" />

          {/* Header Overlay */}
          <div className="h-20 bg-black/60 backdrop-blur-3xl z-10 px-10 flex items-center justify-between border-b border-white/[0.04]">
              <div className="flex items-center gap-4">
                  <div className="w-10 h-10 glass-premium flex items-center justify-center text-white/40 border-white/5 shadow-xl">
                      <HiOutlineChip className="w-5 h-5" />
                  </div>
                  <div>
                      <div className="glass-text-inner !px-3 !py-0.5 mb-1">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Forge AI</h2>
                      </div>
                      <p className="text-[8px] font-bold text-gray-800 uppercase tracking-widest ml-3">System v17.0</p>
                  </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
              </div>
          </div>
          
          {/* Message Stream */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 sm:p-20 space-y-12 scrollbar-hide pt-10 pb-40"
          >
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0, scale: 0.98, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] sm:max-w-[70%] space-y-3 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`flex items-center gap-3 mb-1 px-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className="w-7 h-7 rounded-xl glass flex items-center justify-center border-white/5 bg-white/5">
                            {msg.role === 'user' ? <HiOutlineUser className="w-4 h-4 text-white/70" /> : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L4 10L12 18L20 10L12 2Z" fill="white" fillOpacity="0.4"/></svg>}
                        </div>
                        <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">
                            {msg.role === 'user' ? 'Architect' : 'Nexus'}
                        </span>
                      </div>
                      <div className={`p-8 sm:p-9 rounded-[2.5rem] text-[13px] leading-[1.7] relative group transition-all duration-700 font-medium ${
                        msg.role === 'user' 
                        ? 'bg-gradient-to-br from-white to-gray-200 text-black shadow-2xl' 
                        : 'glass-premium text-gray-300 border-white/10 hover:border-white/20'
                      }`}>
                        {msg.content}
                        
                        {/* Edge Glow Accent */}
                        {msg.role !== 'user' && (
                            <div className="absolute top-0 right-0 w-24 h-24 bg-radial-gradient from-white/[0.08] to-transparent pointer-events-none rounded-tr-[2.5rem]" />
                        )}
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
                    <div className="px-8 py-5 glass-strong border-white/10 flex items-center gap-6">
                        <div className="flex gap-2">
                            {[0, 1, 2].map(i => (
                                <motion.div 
                                    key={i}
                                    animate={{ 
                                        scale: [1, 1.8, 1],
                                        opacity: [0.3, 1, 0.3],
                                        boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 10px rgba(255,255,255,0.4)", "0 0 0px rgba(255,255,255,0)"]
                                    }}
                                    transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.2 }}
                                    className="w-1.5 h-1.5 rounded-full bg-white"
                                />
                            ))}
                        </div>
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Synchronizing</span>
                    </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ⌨️ INPUT BRIDGE (HYPER GLASS) */}
          <div className="absolute bottom-10 left-0 right-0 px-6 sm:px-20 z-20">
            <div className="max-w-3xl mx-auto relative group">
                <div className="absolute inset-0 bg-white/[0.01] blur-[60px] rounded-full -z-10 group-focus-within:bg-white/[0.04] transition-all duration-1000" />
                
                <div className="glass-premium p-3 flex items-center gap-6 border border-white/10 shadow-4xl focus-within:border-white/20 transition-all duration-700 min-h-[80px] rounded-[2rem]">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] text-gray-700 flex items-center justify-center shrink-0">
                        <HiOutlineDotsHorizontal className="w-6 h-6" />
                    </div>
                    
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Enter architectural directive..."
                        className="flex-1 bg-transparent border-none outline-none text-white text-base font-semibold placeholder:text-gray-800 h-full px-4"
                    />

                    <motion.button
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`h-12 w-12 rounded-2xl transition-all duration-700 flex items-center justify-center shrink-0 shadow-2xl ${
                            loading || !input.trim() 
                            ? 'text-gray-900 bg-white/5' 
                            : 'bg-white text-black'
                        }`}
                    >
                        <HiOutlineArrowUp className="w-6 h-6" />
                    </motion.button>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Chatbot;
