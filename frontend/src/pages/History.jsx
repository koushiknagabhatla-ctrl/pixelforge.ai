import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useAuthStore from '../store/useAuthStore';
import useImageStore from '../store/useImageStore';
import { HiOutlineEye, HiOutlineDownload, HiOutlineTrash } from 'react-icons/hi';

export default function History() {
  const { user } = useAuthStore();
  const { history, fetchHistory } = useImageStore();

  useEffect(() => {
    if (user) fetchHistory(user.id);
  }, [user]);

  return (
    <div className="min-h-screen bg-black pt-32 px-6 lg:px-12 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] block mb-2">Architectural Records</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Neural <span className="text-gray-600">Archive</span></h1>
        </div>

        {history.length === 0 ? (
          <div className="py-40 text-center glass-card rounded-[3rem]">
            <p className="text-gray-500 font-light uppercase tracking-widest text-sm">The forge archives are empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {history.map((record, i) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-[2.5rem] p-4 flex flex-col group"
              >
                <div className="aspect-square rounded-[2rem] overflow-hidden relative mb-6">
                  <img src={record.enhanced_url} alt="Historic Forge" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                     <a href={record.enhanced_url} target="_blank" rel="noreferrer" className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform">
                        <HiOutlineEye className="w-5 h-5" />
                     </a>
                     <a href={record.enhanced_url} download className="p-4 glass-button text-white rounded-full hover:scale-110 transition-transform">
                        <HiOutlineDownload className="w-5 h-5" />
                     </a>
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">{new Date(record.created_at).toLocaleDateString()}</span>
                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[7px] font-bold text-gray-500 uppercase">Archive ID: {record.id.slice(0, 8)}</span>
                  </div>
                  <p className="text-gray-500 text-xs font-light italic line-clamp-2">
                    "{record.original_url}"
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
