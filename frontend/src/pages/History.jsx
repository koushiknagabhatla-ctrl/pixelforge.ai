import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useAuthStore from '../store/useAuthStore';
import useImageStore from '../store/useImageStore';
import { HiOutlineEye, HiOutlineDownload } from 'react-icons/hi';

export default function History() {
  const { user } = useAuthStore();
  const { history, fetchHistory } = useImageStore();

  useEffect(() => {
    if (user) fetchHistory(user.id);
  }, [user]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-12 px-6 lg:px-12 pb-20">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <span className="text-[10px] font-semibold text-indigo-300/40 uppercase tracking-[0.4em] block mb-3">Archives</span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter font-['Manrope']">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200/40">Neural</span>
            {' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-100 to-indigo-400/30">Archive</span>
          </h1>
        </div>

        {history.length === 0 ? (
          <div className="py-32 text-center rounded-3xl border border-white/[0.05] bg-white/[0.02]">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center mx-auto mb-6">
              <HiOutlineEye className="w-7 h-7 text-indigo-300/40" />
            </div>
            <p className="text-white/20 font-medium text-sm">The forge archives are empty.</p>
            <p className="text-white/10 text-xs mt-2">Generate or enhance images to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((record, i) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-3 flex flex-col group hover:border-indigo-500/10 transition-all duration-500"
              >
                <div className="aspect-square rounded-xl overflow-hidden relative mb-4">
                  <img src={record.enhanced_url} alt="Archive" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                     <a href={record.enhanced_url} target="_blank" rel="noreferrer" 
                        className="p-3 bg-white/10 border border-white/10 backdrop-blur-xl text-white rounded-xl hover:bg-white hover:text-black transition-all">
                        <HiOutlineEye className="w-5 h-5" />
                     </a>
                     <a href={record.enhanced_url} download 
                        className="p-3 bg-indigo-500/20 border border-indigo-500/20 backdrop-blur-xl text-indigo-200 rounded-xl hover:bg-indigo-500 hover:text-white transition-all">
                        <HiOutlineDownload className="w-5 h-5" />
                     </a>
                  </div>
                </div>
                
                <div className="px-2 pb-2">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-bold text-white/25 uppercase tracking-wider">{new Date(record.created_at).toLocaleDateString()}</span>
                    <span className="px-2 py-0.5 bg-indigo-500/5 border border-indigo-500/10 rounded-full text-[7px] font-bold text-indigo-300/40 uppercase">{record.id.slice(0, 8)}</span>
                  </div>
                  <p className="text-white/20 text-xs line-clamp-2 leading-relaxed">
                    {record.original_url}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
