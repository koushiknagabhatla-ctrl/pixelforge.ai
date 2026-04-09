import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineSparkles, HiOutlineArrowUp, HiOutlineChip, HiOutlineUser, HiOutlineDotsHorizontal } from 'react-icons/hi';
import { prompt_deepseek } from '../services/api';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Neural link established. How shall we engineer the future today?' }
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
      setMessages((prev) => [...prev, { role: 'assistant', content: "Synchronization Error: Neural Core Offline." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden relative selection:bg-white/10 font-sans">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/80 to-transparent z-10 px-8 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-4">
              <div className="w-10 h-10 glass flex items-center justify-center text-white/40">
                  <HiOutlineChip className="w-5 h-5" />
              </div>
              <div>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Forge AI Console</h2>
                  <p className="text-[8px] font-bold text-gray-700 uppercase tracking-widest">Active Neural Session</p>
              </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[8px] font-bold text-gray-700 uppercase tracking-widest">Core Synchronized</span>
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse" />
          </div>
      </div>
      
      {/* Message Stream */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 sm:p-20 space-y-12 scrollbar-hide pt-32 pb-40"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                  type: "spring", 
                  damping: 30, 
                  stiffness: 100,
                  delay: 0.1
              }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] sm:max-w-[70%] space-y-4 ${msg.role === 'user' ? 'items-end text-right' : 'items-start'}`}>
                  <div className={`flex items-center gap-4 mb-2 px-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-8 h-8 rounded-full glass flex items-center justify-center border-white/5 bg-white/5">
                        {msg.role === 'user' ? <HiOutlineUser className="w-4 h-4 text-white" /> : <HiOutlineChip className="w-4 h-4 text-white/40" />}
                    </div>
                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] font-sans">
                        {msg.role === 'user' ? 'Architect' : 'Archon Neural'}
                    </span>
                  </div>
                  <div className={`p-8 rounded-[2.5rem] text-sm sm:text-[16px] leading-[1.8] relative tracking-tight font-medium ${
                    msg.role === 'user' 
                    ? 'bg-white text-black shadow-[0_20px_50px_rgba(255,255,255,0.05)] border border-white/10' 
                    : 'glass-premium text-gray-300'
                  }`}>
                    {msg.content}
                  </div>
              </div>
            </motion.div>
          ))}
          
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
                <div className="glass px-8 py-5 flex items-center gap-4">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    >
                        <HiOutlineSparkles className="w-4 h-4 text-white/20" />
                    </motion.div>
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">Deconstructing...</span>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Bar (Floating & Glass) */}
      <div className="absolute bottom-10 left-0 right-0 px-6 sm:px-20 z-20">
        <div className="max-w-4xl mx-auto glass-strong p-3 flex items-center gap-6 group focus-within:border-white/20 transition-all duration-700 border border-white/5 h-20">
            <div className="w-14 h-14 rounded-2xl bg-white/5 text-gray-600 flex items-center justify-center shrink-0">
                <HiOutlineDotsHorizontal className="w-6 h-6" />
            </div>
            
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Submit architectural directive..."
                className="flex-1 bg-transparent border-none outline-none text-white text-[16px] font-medium placeholder:text-gray-700 h-full font-sans"
            />

            <motion.button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`h-14 w-14 rounded-2xl transition-all duration-700 flex items-center justify-center shrink-0 ${
                    loading || !input.trim() 
                    ? 'bg-white/[0.02] text-gray-800 cursor-not-allowed' 
                    : 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)]'
                }`}
            >
                <HiOutlineArrowUp className="w-6 h-6" />
            </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
