import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useImageStore from '../store/useImageStore';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { Sparkles, Download, RotateCcw, Upload, Check } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { isGenerating, resultImage, generateImage, runTool, fetchHistory, clearResult } = useImageStore();
  const [prompt, setPrompt] = useState("");
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'generate'; 
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => { if (user) fetchHistory(user.id); }, [user]);
  useEffect(() => { return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }; }, [previewUrl]);
  useEffect(() => {
    clearResult(); setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl); setPreviewUrl(null);
  }, [mode]);

  const handleExecute = () => {
    if (mode === 'generate') { if (!prompt.trim()) return; generateImage(prompt, user.id); }
    else { if (!selectedFile) return; runTool(mode, selectedFile, user.id); }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) { setSelectedFile(file); setPreviewUrl(URL.createObjectURL(file)); clearResult(); }
  };

  return (
    <div className="min-h-screen pt-8 px-4 sm:px-8 lg:px-20 pb-32 relative">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <motion.div className="mb-10 sm:mb-14" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-medium text-white/30">Ready</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-headline tracking-tight text-white">
            {mode === 'generate' ? 'Create an image' : 'Enhance an image'}
          </h2>
          <p className="text-white/25 text-sm mt-2 max-w-md">
            {mode === 'generate' ? 'Describe what you want to see and the AI will generate it.' : 'Upload an image and the AI will sharpen and upscale it.'}
          </p>
        </motion.div>

        {/* Main area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-8 flex flex-col">
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-2 flex-1 flex flex-col">
              {mode === 'generate' ? (
                <div className="relative flex-1 flex flex-col">
                  <textarea
                    value={prompt} onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
                    placeholder="A serene Japanese garden at sunset, golden light filtering through maple trees..."
                    className="flex-1 w-full min-h-[280px] bg-transparent rounded-xl p-6 text-[15px] font-normal resize-none focus:outline-none placeholder:text-white/10 text-white/80 leading-relaxed"
                  />
                  <div className="absolute bottom-4 right-4 text-[10px] font-medium text-white/10">{prompt.length}/500</div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[350px] flex-1 relative overflow-hidden rounded-xl">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30" />
                  {previewUrl ? (
                    <>
                      <div className="absolute inset-0 bg-cover bg-center blur-3xl opacity-15" style={{ backgroundImage: `url(${previewUrl})` }} />
                      <img src={previewUrl} alt="Preview" className="w-[75%] h-[75%] object-contain rounded-lg relative z-20 border border-white/[0.06]" />
                      <div className="absolute top-4 right-4 z-40 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-xl rounded-full border border-white/[0.06]">
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-[10px] font-medium text-white/50">Loaded</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-center pointer-events-none p-6 z-20">
                      <div className="w-16 h-16 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                        <Upload className="w-6 h-6 text-white/20" />
                      </div>
                      <div>
                        <h3 className="text-base font-headline font-semibold text-white/60 mb-1">Upload an image</h3>
                        <p className="text-xs text-white/20">Click or drag to select a file</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <motion.button
              onClick={handleExecute}
              disabled={isGenerating || (mode === 'generate' ? !prompt.trim() : !selectedFile)}
              whileHover={{ scale: isGenerating ? 1 : 1.01 }}
              whileTap={{ scale: isGenerating ? 1 : 0.99 }}
              className={`w-full mt-4 h-14 rounded-xl font-medium text-sm flex items-center justify-center gap-2.5 transition-all duration-300 ${
                isGenerating
                  ? 'bg-white/[0.03] text-white/20 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-white/90 cursor-pointer'
              }`}>
              {isGenerating ? (
                <><div className="w-4 h-4 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" /> Processing...</>
              ) : (
                <><Sparkles className="w-4 h-4" /> {mode === 'generate' ? 'Generate' : 'Enhance'}</>
              )}
            </motion.button>
          </motion.div>

          {/* Tips */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-4">
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 h-full flex flex-col justify-center">
              <h4 className="text-[11px] font-medium text-white/20 uppercase tracking-wider mb-5">Quick tips</h4>
              <ul className="space-y-4 text-[13px] text-white/30 leading-relaxed">
                <li className="flex gap-3"><span className="text-white/10 font-semibold shrink-0">01</span> Be specific about what you want — mention colors, styles, and moods.</li>
                <li className="flex gap-3"><span className="text-white/10 font-semibold shrink-0">02</span> Use the toggle in the navbar to switch between Generate and Enhance.</li>
                <li className="flex gap-3"><span className="text-white/10 font-semibold shrink-0">03</span> Results appear below — hover for download and redo options.</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Result */}
        <AnimatePresence mode="wait">
          {resultImage && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="mt-8 relative">
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 relative group overflow-hidden">
                <div className="absolute top-4 right-4 z-50 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <a href={resultImage} download className="h-10 w-10 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Download className="w-4 h-4" />
                  </a>
                  <button onClick={clearResult} className="h-10 w-10 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white flex items-center justify-center hover:bg-white/[0.1] transition-all">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative rounded-xl overflow-hidden bg-black/20 border border-white/[0.04]">
                  {mode === 'enhance' && previewUrl ? (
                    <div className="w-full relative aspect-video rounded-xl overflow-hidden">
                      <ReactCompareSlider
                        itemOne={<ReactCompareSliderImage src={previewUrl} alt="Original" className="object-contain w-full h-full" />}
                        itemTwo={<ReactCompareSliderImage src={resultImage} alt="Enhanced" className="object-contain w-full h-full" />}
                        className="w-full h-full rounded-xl" />
                    </div>
                  ) : (
                    <img src={resultImage} alt="Generated" className="w-full h-auto object-contain rounded-xl" />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
