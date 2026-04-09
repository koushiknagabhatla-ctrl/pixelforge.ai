import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineArrowUp, HiOutlineChip, HiOutlineUser, HiOutlineDotsHorizontal } from 'react-icons/hi';
import { prompt_deepseek } from '../services/api';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Connection successful. How can I help you today?' }
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
      setMessages((prev) => [...prev, { role: 'assistant', content: "Sorry, I encountered a connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden relative font-sans">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-black/20 backdrop-blur-md z-10 px-8 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
              <HiOutlineChip className="w-4 h-4 text-gray-400" />
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/60">Forge AI Chat</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Connected</span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
      </div>
      
      {/* Message Stream */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 sm:p-12 space-y-6 scrollbar-hide pt-20 pb-32"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] sm:max-w-[75%] space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-2 mb-1 px-1 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-6 h-6 rounded-lg glass flex items-center justify-center border-white/5">
                        {msg.role === 'user' ? <HiOutlineUser className="w-3.5 h-3.5 text-white/60" /> : <HiOutlineChip className="w-3.5 h-3.5 text-white/40" />}
                    </div>
                    <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                        {msg.role === 'user' ? 'You' : 'AI Assistant'}
                    </span>
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-white text-black font-medium' 
                    : 'glass text-gray-300'
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
              className="flex justify-start px-1"
            >
                <div className="glass px-4 py-2 flex items-center gap-3">
                    <div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                            <motion.div 
                                key={i}
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                className="w-1 h-1 bg-white rounded-full"
                            />
                        ))}
                    </div>
                    <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Assistant is thinking...</span>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Bar (Compact Glass) */}
      <div className="absolute bottom-6 left-0 right-0 px-4 sm:px-12 z-20">
        <div className="max-w-3xl mx-auto glass-premium p-1.5 flex items-center gap-3 border border-white/5 shadow-2xl">
            <div className="w-10 h-10 rounded-lg bg-white/5 text-gray-600 flex items-center justify-center shrink-0">
                <HiOutlineDotsHorizontal className="w-5 h-5" />
            </div>
            
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-transparent border-none outline-none text-white text-sm font-medium placeholder:text-gray-700 h-10"
            />

            <motion.button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                whileTap={{ scale: 0.95 }}
                className={`h-10 w-10 rounded-lg transition-all flex items-center justify-center shrink-0 ${
                    loading || !input.trim() 
                    ? 'text-gray-800' 
                    : 'bg-white text-black'
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
