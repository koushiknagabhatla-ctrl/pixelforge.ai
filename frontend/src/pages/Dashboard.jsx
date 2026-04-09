import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useImageStore from '../store/useImageStore';
import { HiOutlineSparkles, HiOutlineDownload, HiOutlineRefresh, HiOutlineCloudUpload } from 'react-icons/hi';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { isGenerating, resultImage, generateImage, runTool, fetchHistory, clearResult } = useImageStore();
  const [prompt, setPrompt] = useState("");
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'synth'; 
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (user) fetchHistory(user.id);
  }, [user]);

  const handleForge = () => {
    if (mode === 'synth') {
      if (!prompt.trim()) return;
      generateImage(prompt, user.id);
    } else {
      if (!selectedFile) return;
      runTool(mode, selectedFile, user.id);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-6 lg:px-20 pb-32 font-sans relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6">
           <div className="space-y-2">
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest block">Pixel Forge Tools</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                {mode === 'synth' ? 'Image Generation' : 'Image Enhancer'}
              </h2>
           </div>
           <div className="flex items-center gap-4 py-3 px-6 glass border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest">System Ready</span>
           </div>
        </div>

        {/* Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8"
          >
            <div className="glass-strong p-2 h-full flex flex-col border border-white/5">
                {mode === 'synth' ? (
                  <div className="relative group flex-1">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
                      placeholder="Describe the image you want to create..."
                      className="w-full h-64 bg-white/[0.01] border border-white/5 rounded-xl p-6 text-base font-medium resize-none focus:outline-none focus:bg-white/[0.02] transition-all placeholder:text-gray-700"
                    />
                    <div className="absolute bottom-6 right-6 text-[9px] font-bold text-gray-700 uppercase tracking-widest">
                      {prompt.length} / 500
                    </div>
                  </div>
                ) : (
                  <div className="tool-dropzone flex flex-col items-center justify-center min-h-[300px] flex-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                    />
                    <div className="flex flex-col items-center gap-6 text-center pointer-events-none">
                      <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-gray-600 border border-white/5">
                        <HiOutlineCloudUpload className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">Upload Image</h3>
                        <p className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">
                             JPG / PNG / WEBP (MAX 10MB)
                        </p>
                      </div>
                    </div>
                  </div>
                )}
            </div>

            <button
              onClick={handleForge}
              disabled={isGenerating || (mode === 'synth' ? !prompt.trim() : !selectedFile)}
              className={`w-full mt-6 py-5 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-4 border border-white/5 ${
                isGenerating 
                ? 'bg-white/5 text-gray-700 cursor-not-allowed' 
                : 'bg-white text-black hover:opacity-90 active:scale-95'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <HiOutlineSparkles className="w-4 h-4" />
                  {mode === 'synth' ? 'Generate Image' : 'Enhance Image'}
                </>
              )}
            </button>
          </motion.div>

          {/* Quick Info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="glass p-8 flex-1 border border-white/5">
                  <h4 className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-6">Quick Tips</h4>
                  <ul className="space-y-4 text-[11px] text-gray-400 font-medium leading-relaxed">
                      <li className="flex gap-3">
                          <span className="text-white/20">01</span>
                          <span>Use simple, descriptive sentences.</span>
                      </li>
                      <li className="flex gap-3">
                          <span className="text-white/20">02</span>
                          <span>Mention colors and lighting for better results.</span>
                      </li>
                      <li className="flex gap-3">
                          <span className="text-white/20">03</span>
                          <span>High-quality inputs work best for enhancing.</span>
                      </li>
                  </ul>
              </div>
          </div>
        </div>

        {/* Result Area */}
        <AnimatePresence mode="wait">
          {resultImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-20 pt-16 border-t border-white/5"
            >
               <div className="max-w-3xl mx-auto glass-strong p-3 relative group overflow-hidden border border-white/5 shadow-2xl">
                  <div className="absolute top-6 right-6 z-20 flex gap-4">
                      <a href={resultImage} download className="h-12 w-12 glass rounded-xl text-white flex items-center justify-center hover:bg-white hover:text-black transition-all">
                          <HiOutlineDownload className="w-5 h-5" />
                      </a>
                      <button onClick={clearResult} className="h-12 w-12 glass rounded-xl text-white flex items-center justify-center hover:bg-white/10 transition-all">
                          <HiOutlineRefresh className="w-5 h-5" />
                      </button>
                  </div>
                  <img src={resultImage} alt="AI Generated" className="w-full h-auto rounded-lg" />
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
