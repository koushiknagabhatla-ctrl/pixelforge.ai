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
    <div className="flex flex-col h-full bg-transparent overflow-hidden relative">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/50 to-transparent z-10 px-8 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3">
              <div className="w-8 h-8 glass flex items-center justify-center text-indigo-400">
                  <HiOutlineChip className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-white/50">Core Interface</h2>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
      
      {/* Message Stream */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 scrollbar-hide pt-24 pb-32"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                  type: "spring", 
                  damping: 24, 
                  stiffness: 120,
                  delay: 0.05
              }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] sm:max-w-[75%] space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-3 mb-1 px-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-6 h-6 rounded-lg glass flex items-center justify-center border-white/5">
                        {msg.role === 'user' ? <HiOutlineUser className="w-3.5 h-3.5 text-indigo-400" /> : <HiOutlineChip className="w-3.5 h-3.5 text-purple-400" />}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{msg.role === 'user' ? 'Architect' : 'Archon AI'}</span>
                  </div>
                  <div className={`p-4 sm:p-6 rounded-2xl text-sm sm:text-[15px] leading-relaxed relative ${
                    msg.role === 'user' 
                    ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white font-medium shadow-xl shadow-indigo-500/10' 
                    : 'glass text-slate-300 border-purple-500/10'
                  }`}>
                    {msg.content}
                    {/* Perspective Highlight */}
                    {msg.role === 'user' && <div className="absolute inset-0 bg-white/5 rounded-2xl pointer-events-none" />}
                  </div>
              </div>
            </motion.div>
          ))}
          
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-start"
            >
                <div className="glass px-6 py-4 flex items-center gap-3">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                        <HiOutlineSparkles className="w-4 h-4 text-purple-400" />
                    </motion.div>
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.4em]">Synthesizing...</span>
                    <div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                            <motion.div 
                                key={i}
                                animate={{ y: [0, -4, 0] }}
                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                className="w-1 h-1 bg-purple-400 rounded-full"
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Bar (Floating & Glass) */}
      <div className="absolute bottom-8 left-0 right-0 px-6 sm:px-10 z-20">
        <div className="max-w-4xl mx-auto glass-strong p-2 sm:p-2.5 flex items-center gap-4 group focus-within:border-indigo-500/30 transition-all duration-500">
            <div className="w-12 h-12 rounded-xl bg-white/5 text-slate-400 flex items-center justify-center shrink-0">
                <HiOutlineDotsHorizontal className="w-6 h-6" />
            </div>
            
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Submit neural prompt..."
                className="flex-1 bg-transparent border-none outline-none text-white text-[15px] font-medium placeholder:text-slate-600 h-12"
            />

            <motion.button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={input.trim() && !loading ? { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 2 } } : {}}
                className={`h-12 w-12 rounded-xl transition-all duration-500 flex items-center justify-center shrink-0 ${
                    loading || !input.trim() 
                    ? 'bg-white/5 text-slate-600 cursor-not-allowed' 
                    : 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 hover:bg-indigo-500'
                }`}
            >
                <HiOutlineArrowUp className="w-5 h-5" />
            </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
