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
    <div className="flex flex-col h-full bg-black/40 backdrop-blur-3xl overflow-hidden relative">
      {/* Cinematic Header Overlay */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none flex items-center justify-center pt-8">
            <h1 className="text-5xl font-black text-white/[0.03] uppercase tracking-[1.2rem] select-none">AI Chatbot</h1>
      </div>
      
      {/* Thought Stream */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-12 scrollbar-hide pt-32 pb-48"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[90%] lg:max-w-[75%] space-y-3 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-3 mb-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                        {msg.role === 'user' ? <HiOutlineUser className="w-3.5 h-3.5 text-gray-500" /> : <HiOutlineChip className="w-3.5 h-3.5 text-gray-400" />}
                    </div>
                  </div>
                  <div className={`p-6 lg:p-8 rounded-[2rem] text-[13px] lg:text-[14px] leading-relaxed shadow-2xl glass-glow glass-edge ${
                    msg.role === 'user' 
                    ? 'bg-white text-black font-semibold' 
                    : 'text-gray-300'
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
                <div className="glass-glow glass-edge p-6 rounded-[2rem] flex items-center gap-4">
                    <div className="flex gap-1.5">
                        <motion.div className="w-2 h-2 bg-white/40 rounded-full" animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }} />
                        <motion.div className="w-2 h-2 bg-white/40 rounded-full" animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2, delay: 0.3 }} />
                        <motion.div className="w-2 h-2 bg-white/40 rounded-full" animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }} />
                    </div>
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] italic">Intelligence Processing...</span>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Prompt Pill (Bottom Fixed) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] lg:w-[70%] z-20">
        <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col gap-4"
        >
            <div className="glass-glow glass-edge border border-white/10 rounded-[3rem] p-3 shadow-2xl flex items-center gap-6 group hover:border-white/20 focus-within:border-white/30 transition-all duration-700">
                <div className="w-14 h-14 rounded-[2.5rem] bg-white text-black flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    <HiOutlineSparkles className="w-6 h-6" />
                </div>
                
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="say hello to our ai"
                    className="flex-1 bg-transparent border-none outline-none text-white text-[15px] font-medium placeholder:text-gray-800 h-full py-6"
                />

                <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className={`p-6 rounded-[2.5rem] transition-all duration-500 flex items-center justify-center mr-2 ${
                        loading || !input.trim() 
                        ? 'bg-transparent text-gray-800' 
                        : 'bg-white/5 text-white hover:bg-white hover:text-black active:scale-90 shadow-2xl'
                    }`}
                >
                    <HiOutlineArrowUp className="w-6 h-6" />
                </button>
            </div>
        </motion.div>
        
        {/* Cinematic branding label */}
        <div className="mt-6 text-center">
            <span className="text-[9px] font-black text-gray-800 uppercase tracking-[1em] opacity-40">Intelligence Nexus • Precision Architecture</span>
        </div>
      </div>
      
      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default Chatbot;
