import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineArrowUp, HiOutlineChip, HiOutlineUser, HiOutlineDotsHorizontal } from 'react-icons/hi';
import { prompt_deepseek } from '../services/api';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Connection established. How may I assist your creative vision today?' }
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
      setMessages((prev) => [...prev, { role: 'assistant', content: "Deployment failed: Connection to neural core interrupted." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#010101] overflow-hidden relative font-sans selection:bg-white/10">
      
      {/* 🎭 NEURAL STAGE (HYPER GLASS) */}
      <div className="flex-1 flex flex-col m-8 glass-hyper overflow-hidden relative shadow-[0_60px_100px_rgba(0,0,0,0.8)] border border-white/5">
          <div className="absolute inset-0 neural-grain opacity-[0.05]" />

          {/* Header Overlay */}
          <div className="h-24 bg-gradient-to-r from-black/80 to-transparent backdrop-blur-3xl z-10 px-12 flex items-center justify-between border-b border-white/[0.05]">
              <div className="flex items-center gap-5">
                  <div className="w-12 h-12 glass-premium flex items-center justify-center text-white/60 border-white/10 shadow-2xl">
                      <HiOutlineChip className="w-6 h-6" />
                  </div>
                  <div>
                      <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-white">Neural Nexus AI</h2>
                      <p className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">Architectural Session v16.0</p>
                  </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest hidden lg:block">Volumetric Synchronization</span>
                <div className="w-2.5 h-2.5 rounded-full bg-white/20 animate-pulse border border-white/10" />
              </div>
          </div>
          
          {/* Message Stream */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-8 sm:p-24 space-y-16 scrollbar-hide pt-12 pb-48"
          >
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] sm:max-w-[75%] space-y-5 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`flex items-center gap-4 mb-2 px-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className="w-9 h-9 rounded-2xl glass flex items-center justify-center border-white/10 bg-white/5 shadow-inner">
                            {msg.role === 'user' ? <HiOutlineUser className="w-5 h-5 text-white/80" /> : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L4 10L12 18L20 10L12 2Z" fill="white" fillOpacity="0.5"/></svg>}
                        </div>
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                            {msg.role === 'user' ? 'Direct Author' : 'Nexus Engine'}
                        </span>
                      </div>
                      <div className={`p-10 sm:p-12 rounded-[3.5rem] text-[16px] leading-[1.8] relative group transition-all duration-700 font-medium ${
                        msg.role === 'user' 
                        ? 'bg-gradient-to-br from-white to-gray-200 text-black shadow-[0_40px_80px_rgba(255,255,255,0.1)]' 
                        : 'glass-premium text-gray-300 border-white/10 hover:border-white/20'
                      }`}>
                        {msg.content}
                        
                        {/* Elite Iridescent Accent (AI Only) */}
                        {msg.role !== 'user' && (
                            <div className="absolute top-0 right-0 w-48 h-48 bg-radial-gradient from-white/[0.1] to-transparent pointer-events-none rounded-tr-[3.5rem] opacity-50" />
                        )}
                      </div>
                  </div>
                </motion.div>
              ))}
              
              {loading && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-start px-4"
                >
                    <div className="px-12 py-8 glass-strong border-white/10 flex items-center gap-8 shadow-4xl">
                        <div className="flex gap-2.5">
                            {[0, 1, 2].map(i => (
                                <motion.div 
                                    key={i}
                                    animate={{ 
                                        scale: [1, 2.2, 1],
                                        opacity: [0.3, 1, 0.3],
                                        boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.6)", "0 0 0px rgba(255,255,255,0)"]
                                    }}
                                    transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.2 }}
                                    className="w-2.5 h-2.5 rounded-full bg-white"
                                />
                            ))}
                        </div>
                        <span className="text-[11px] font-black text-white/30 uppercase tracking-[0.6em]">Analyzing Architecture</span>
                    </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ⌨️ INPUT BRIDGE (TITANIUM GLASS) */}
          <div className="absolute bottom-12 left-0 right-0 px-8 sm:px-24 z-20">
            <div className="max-w-4xl mx-auto relative group">
                <div className="absolute inset-0 bg-white/[0.02] blur-[80px] rounded-full -z-10 group-focus-within:bg-white/[0.06] transition-all duration-1000" />
                
                <div className="glass-premium p-4 flex items-center gap-7 border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.9)] focus-within:border-white/20 transition-all duration-700 min-h-[96px] rounded-[3rem]">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-white/[0.04] text-gray-600 flex items-center justify-center shrink-0 shadow-inner group-focus-within:text-white transition-colors">
                        <HiOutlineDotsHorizontal className="w-7 h-7" />
                    </div>
                    
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Enter architectural directive..."
                        className="flex-1 bg-transparent border-none outline-none text-white text-lg font-semibold placeholder:text-gray-800 h-full px-6"
                    />

                    <motion.button
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,255,255,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        className={`h-16 w-16 rounded-[1.5rem] transition-all duration-1000 flex items-center justify-center shrink-0 ${
                            loading || !input.trim() 
                            ? 'text-gray-900 bg-white/5' 
                            : 'bg-white text-black shadow-4xl'
                        }`}
                    >
                        <HiOutlineArrowUp className="w-7 h-7" />
                    </motion.button>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Chatbot;
