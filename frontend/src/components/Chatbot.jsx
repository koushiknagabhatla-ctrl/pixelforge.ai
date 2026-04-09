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
      setMessages((prev) => [...prev, { role: 'assistant', content: "FORGE AI Synchronization Failed" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/40 backdrop-blur-3xl overflow-hidden relative">
      {/* Cinematic Header Overlay */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none flex items-center justify-center">
            <h1 className="text-4xl font-black text-white/10 uppercase tracking-[0.8em] select-none">FORGE AI</h1>
      </div>
      
      {/* Thought Stream */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide pt-24 pb-32"
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
              <div className={`max-w-[85%] lg:max-w-[70%] space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-2 mb-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        {msg.role === 'user' ? <HiOutlineUser className="w-3 h-3 text-gray-400" /> : <HiOutlineChip className="w-3 h-3 text-gray-400" />}
                    </div>
                  </div>
                  <div className={`p-4 lg:p-6 rounded-3xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-white text-black font-medium' 
                    : 'glass-card border-white/5 text-gray-300'
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
                <div className="glass-card p-4 lg:p-6 rounded-3xl flex items-center gap-3">
                    <div className="flex gap-1">
                        <motion.div className="w-1.5 h-1.5 bg-white/40 rounded-full" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                        <motion.div className="w-1.5 h-1.5 bg-white/40 rounded-full" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} />
                        <motion.div className="w-1.5 h-1.5 bg-white/40 rounded-full" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest italic">Forge Processing...</span>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Prompt Pill (Bottom Fixed) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] lg:w-[80%] z-20">
        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col gap-2"
        >
            <div className="glass-dark border border-white/10 rounded-[2rem] p-2 pr-4 shadow-2xl flex items-center gap-4 group focus-within:border-white/20 transition-all">
                <div className="w-12 h-12 rounded-[1.5rem] bg-white/5 flex items-center justify-center shrink-0 border border-white/5 text-gray-600">
                    <HiOutlineSparkles className="w-5 h-5 group-focus-within:text-white transition-colors" />
                </div>
                
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="say hello to our ai"
                    className="flex-1 bg-transparent border-none outline-none text-white text-sm font-medium placeholder:text-gray-700 h-full py-4"
                />

                <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className={`p-4 rounded-[1.5rem] transition-all flex items-center justify-center ${
                        loading || !input.trim() 
                        ? 'bg-transparent text-gray-800' 
                        : 'bg-white text-black active:scale-95 shadow-xl'
                    }`}
                >
                    <HiOutlineArrowUp className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
        
        {/* Cinematic branding label */}
        <div className="mt-4 text-center">
            <span className="text-[8px] font-bold text-gray-800 uppercase tracking-[0.6em]">Forge Intelligence Nexus • High Fidelity Intelligence</span>
        </div>
      </div>
      
      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default Chatbot;
