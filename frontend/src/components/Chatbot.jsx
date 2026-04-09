import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineSparkles, HiOutlineArrowUp, HiOutlineChip, HiOutlineUser } from 'react-icons/hi';
import { prompt_deepseek } from '../services/api';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to the Forge. What immersive architecture shall we forge today?' }
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
      setMessages((prev) => [...prev, { role: 'assistant', content: "Synchronization Error: Engine Offline" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/20 backdrop-blur-3xl overflow-hidden relative selection:bg-white selection:text-black">
      {/* Cinematic Header Overlay */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none flex items-center justify-center pt-6">
            <h1 className="text-3xl font-black text-white/[0.03] uppercase tracking-[1rem] select-none">AI Chatbot</h1>
      </div>
      
      {/* Thought Stream */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 scrollbar-hide pt-24 pb-40"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] lg:max-w-[70%] space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-2 mb-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-5 h-5 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/5 shadow-inner">
                        {msg.role === 'user' ? <HiOutlineUser className="w-3 h-3 text-gray-700" /> : <HiOutlineChip className="w-3 h-3 text-gray-700" />}
                    </div>
                  </div>
                  <div className={`p-5 lg:p-6 rounded-[1.8rem] text-[12px] lg:text-[13px] leading-relaxed shadow-xl glass-glow glass-edge ${
                    msg.role === 'user' 
                    ? 'bg-white text-black font-bold' 
                    : 'text-gray-400'
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
                <div className="glass-glow glass-edge px-5 py-4 rounded-[1.5rem] flex items-center gap-3">
                    <div className="flex gap-1">
                        <motion.div className="w-1.5 h-1.5 bg-white/30 rounded-full" animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} />
                        <motion.div className="w-1.5 h-1.5 bg-white/30 rounded-full" animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2, delay: 0.3 }} />
                        <motion.div className="w-1.5 h-1.5 bg-white/30 rounded-full" animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }} />
                    </div>
                    <span className="text-[8px] font-black text-gray-800 uppercase tracking-[0.3em]">Processing...</span>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Prompt Pill (Bottom Fixed) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[92%] lg:w-[65%] z-20">
        <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col gap-3"
        >
            <div className="glass-glow glass-edge border border-white/5 rounded-[2.5rem] p-2.5 shadow-2xl flex items-center gap-5 group hover:border-white/10 focus-within:border-white/20 transition-all duration-700">
                <div className="w-11 h-11 rounded-[1.8rem] bg-white text-black flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                    <HiOutlineSparkles className="w-5 h-5" />
                </div>
                
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="say hello to our ai"
                    className="flex-1 bg-transparent border-none outline-none text-white text-[14px] font-medium placeholder:text-gray-900 h-full py-5"
                />

                <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className={`h-11 w-11 rounded-[1.8rem] transition-all duration-700 flex items-center justify-center mr-1 ${
                        loading || !input.trim() 
                        ? 'bg-transparent text-gray-900' 
                        : 'bg-white/5 text-white hover:bg-white hover:text-black active:scale-90 shadow-xl'
                    }`}
                >
                    <HiOutlineArrowUp className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
        
        {/* Cinematic branding label */}
        <div className="mt-4 text-center">
            <span className="text-[8px] font-black text-gray-900 uppercase tracking-[0.8em] opacity-30 select-none">Neural Nexus • v8.0 Architecture</span>
        </div>
      </div>
      
      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default Chatbot;
