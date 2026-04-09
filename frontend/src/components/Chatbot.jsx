import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineArrowUp, HiOutlineChip, HiOutlineUser, HiOutlineDotsHorizontal } from 'react-icons/hi';
import { prompt_deepseek } from '../services/api';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Neural link established. How can I assist your creative process today?' }
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
      setMessages((prev) => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting to the neural core. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden relative font-sans selection:bg-white/10">
      {/* 🎭 ARCHITECTURAL HEADER */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-black/40 backdrop-blur-xl z-10 px-10 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-4">
              <div className="w-8 h-8 glass flex items-center justify-center text-white/20">
                  <HiOutlineChip className="w-4 h-4" />
              </div>
              <div>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Forge AI Nexus</h2>
                  <p className="text-[8px] font-bold text-gray-700 uppercase tracking-widest">Active Intelligence Session</p>
              </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">Secure Link</span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" />
          </div>
      </div>
      
      {/* 🧬 MESSAGE STREAM */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 sm:p-20 space-y-10 scrollbar-hide pt-28 pb-40"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] sm:max-w-[70%] space-y-3 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-3 mb-1 px-1 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-7 h-7 rounded-full glass flex items-center justify-center border-white/5 bg-white/5">
                        {msg.role === 'user' ? <HiOutlineUser className="w-3.5 h-3.5 text-white/60" /> : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L4 10L12 18L20 10L12 2Z" fill="white" fillOpacity="0.2"/></svg>}
                    </div>
                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">
                        {msg.role === 'user' ? 'Author' : 'Nexus AI'}
                    </span>
                  </div>
                  <div className={`p-6 sm:p-8 rounded-[2rem] text-sm leading-[1.7] relative group transition-all duration-700 ${
                    msg.role === 'user' 
                    ? 'bg-white text-black font-medium shadow-[0_20px_40px_rgba(255,255,255,0.05)]' 
                    : 'glass-premium text-gray-300 border-white/10 hover:border-white/20'
                  }`}>
                    {msg.content}
                    
                    {/* Iridescent Corner Accent (AI Only) */}
                    {msg.role !== 'user' && (
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none rounded-tr-[2rem]" />
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
                <div className="px-8 py-5 glass border-white/5 flex items-center gap-4">
                    <div className="flex gap-1.5">
                        {[0, 1, 2].map(i => (
                            <motion.div 
                                key={i}
                                animate={{ 
                                    scale: [1, 1.5, 1],
                                    opacity: [0.3, 1, 0.3],
                                    backgroundColor: ["#ffffff10", "#ffffff60", "#ffffff10"]
                                }}
                                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15 }}
                                className="w-1.5 h-1.5 rounded-full"
                            />
                        ))}
                    </div>
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Analyzing Context</span>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ⌨️ INPUT BRIDGE (HYPER GLASS) */}
      <div className="absolute bottom-10 left-0 right-0 px-6 sm:px-20 z-20">
        <div className="max-w-3xl mx-auto relative group">
            {/* Soft Glow Underlay */}
            <div className="absolute inset-0 bg-white/[0.01] blur-2xl rounded-3xl -z-10 group-focus-within:bg-white/[0.03] transition-all duration-700" />
            
            <div className="glass-strong p-2 flex items-center gap-4 border border-white/5 shadow-3xl focus-within:border-white/10 transition-all duration-500 min-h-[72px]">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.02] text-gray-600 flex items-center justify-center shrink-0">
                    <HiOutlineDotsHorizontal className="w-5 h-5" />
                </div>
                
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Enter architectural directive..."
                    className="flex-1 bg-transparent border-none outline-none text-white text-sm font-medium placeholder:text-gray-700 h-full px-2"
                />

                <motion.button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`h-12 w-12 rounded-2xl transition-all duration-500 flex items-center justify-center shrink-0 ${
                        loading || !input.trim() 
                        ? 'text-gray-800' 
                        : 'bg-white text-black shadow-xl'
                    }`}
                >
                    <HiOutlineArrowUp className="w-5 h-5" />
                </motion.button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
