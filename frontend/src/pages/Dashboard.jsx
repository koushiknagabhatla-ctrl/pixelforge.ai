import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../store/useAuthStore';
import useImageStore from '../store/useImageStore';
import { HiOutlineSparkles, HiOutlineDownload, HiOutlineEye, HiOutlineRefresh } from 'react-icons/hi';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { isGenerating, resultImage, enhancedPrompt, history, generateImage, fetchHistory, clearResult } = useImageStore();
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    if (user) fetchHistory(user.id);
  }, [user]);

  const handleForge = () => {
    if (!prompt.trim()) return;
    generateImage(prompt, user.id);
  };

  return (
    <div className="min-h-screen bg-black pt-32 px-6 lg:px-12 pb-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Forge Console */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-10 rounded-[3rem] text-center"
          >
            <div className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] mb-10">Forge Infrastructure v2.0</div>
            
            <div className="relative mb-8">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
                placeholder="Describe your vision..."
                className="forge-input h-48 resize-none text-xl font-light"
              />
              <div className="absolute bottom-6 right-8 text-[10px] font-bold text-gray-700 uppercase tracking-widest">
                {prompt.length} / 500
              </div>
            </div>

            <button
              onClick={handleForge}
              disabled={isGenerating || !prompt.trim()}
              className={`w-full py-8 rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 ${
                isGenerating 
                ? 'bg-white/5 text-gray-700' 
                : 'bg-white text-black hover:scale-[1.02] active:scale-[0.98] shadow-2xl'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-600 border-t-black rounded-full animate-spin" />
                  Synthesizing Neural Matrix...
                </>
              ) : (
                <>
                  <HiOutlineSparkles className="w-5 h-5" />
                  Initialize Forge
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Result Stage */}
        <AnimatePresence>
          {resultImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto mb-20"
            >
              <div className="glass-card p-4 rounded-[3rem] overflow-hidden group relative">
                <img src={resultImage} alt="Generated Asset" className="w-full h-auto rounded-[2rem]" />
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-6">
                  <a 
                    href={resultImage} 
                    download 
                    className="p-6 rounded-full bg-white text-black hover:scale-110 transition-transform"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <HiOutlineDownload className="w-6 h-6" />
                  </a>
                  <button 
                    onClick={clearResult}
                    className="p-6 rounded-full glass-button text-white hover:scale-110 transition-transform"
                  >
                    <HiOutlineRefresh className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              {enhancedPrompt && (
                <div className="mt-8 px-8 py-6 glass-card rounded-2xl">
                  <span className="text-[10px] font-black text-gray-700 uppercase tracking-[0.4em] block mb-4">Neural Expansion Details</span>
                  <p className="text-gray-500 font-light italic text-sm leading-relaxed">
                    "{enhancedPrompt}"
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Grid */}
        <section className="pt-20 border-t border-white/5">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] block mb-2">Architect's Records</span>
              <h2 className="text-4xl font-black uppercase tracking-tighter">Previous <span className="text-gray-600">Forges</span></h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {history.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="aspect-square glass-card rounded-2xl group transition-all hover:scale-[1.05] shadow-2xl overflow-hidden"
              >
                <img src={item.enhanced_url} alt="History asset" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-x-6 bottom-6 opacity-0 group-hover:opacity-100 transition-all">
                   <a href={item.enhanced_url} target="_blank" rel="noreferrer" className="w-full py-4 glass-button rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest">
                     <HiOutlineEye /> View Matrix
                   </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
