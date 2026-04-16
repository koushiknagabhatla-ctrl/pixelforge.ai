import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useAuthStore from '../store/useAuthStore';
import useImageStore from '../store/useImageStore';
import { Eye, Download, ImageIcon } from 'lucide-react';

export default function History() {
  const { user } = useAuthStore();
  const { history, fetchHistory } = useImageStore();

  useEffect(() => { if (user) fetchHistory(user.id); }, [user]);

  return (
    <div className="min-h-screen pt-8 px-6 lg:px-12 pb-20">
      <div className="max-w-6xl mx-auto">
        <motion.div className="mb-14" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-[11px] font-medium text-white/20 uppercase tracking-[0.3em] block mb-3">History</span>
          <h1 className="text-4xl md:text-5xl font-headline tracking-tight text-white">Your creations</h1>
          <p className="text-white/25 text-sm mt-2">Everything you've generated and enhanced, saved automatically.</p>
        </motion.div>

        {history.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-28 text-center rounded-2xl border border-white/[0.05] bg-white/[0.015]">
            <div className="w-14 h-14 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-5">
              <ImageIcon className="w-6 h-6 text-white/15" />
            </div>
            <p className="text-white/20 font-medium text-sm">Nothing here yet</p>
            <p className="text-white/10 text-xs mt-1">Generate or enhance an image to see it appear here.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.map((record, i) => (
              <motion.div key={record.id}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-2.5 flex flex-col group hover:border-white/[0.1] transition-all duration-400">
                <div className="aspect-square rounded-lg overflow-hidden relative mb-3">
                  <img src={record.enhanced_url} alt="Archive" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                    <a href={record.enhanced_url} target="_blank" rel="noreferrer" className="p-2.5 bg-white/[0.08] backdrop-blur-xl text-white rounded-lg hover:bg-white hover:text-black transition-all">
                      <Eye className="w-4 h-4" />
                    </a>
                    <a href={record.enhanced_url} download className="p-2.5 bg-white/[0.08] backdrop-blur-xl text-white rounded-lg hover:bg-white hover:text-black transition-all">
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div className="px-1.5 pb-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-white/20">{new Date(record.created_at).toLocaleDateString()}</span>
                    <span className="px-2 py-0.5 bg-white/[0.03] border border-white/[0.05] rounded-full text-[8px] text-white/20">{record.id.slice(0, 8)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
