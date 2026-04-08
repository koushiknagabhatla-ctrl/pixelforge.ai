import { motion } from 'framer-motion'
import { HiOutlineDownload, HiOutlineClock } from 'react-icons/hi'
import useEnhancementStore from '../store/useEnhancementStore'

const modeLabels = {
  auto: 'Auto Enhance',
  portrait: 'Portrait & Face',
  landscape: 'Landscape',
  old_photo: 'Old Photo Restore',
  low_light: 'Low Light',
  remove_bg: 'Remove BG',
  denoise: 'Denoise',
}

export default function EnhancementCard({ enhancement, index = 0 }) {
  const { downloadImage } = useEnhancementStore()
  const date = new Date(enhancement.created_at).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="glass-card overflow-hidden group rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={enhancement.enhanced_url}
          alt="Enhanced"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Download overlay */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => downloadImage(enhancement.enhanced_url)}
            className="p-3 rounded-xl glass-dark hover:bg-white text-white hover:text-black transition-all duration-300 shadow-2xl border border-white/10"
          >
            <HiOutlineDownload className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider bg-white/5 text-gray-400 border border-white/5">
            {modeLabels[enhancement.mode] || enhancement.mode}
          </span>
          <span className="px-2 py-1 rounded-lg text-[9px] font-bold bg-white/10 text-white border border-white/5">
            {enhancement.scale}x
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
          <HiOutlineClock className="w-3 h-3" />
          {date}
        </div>
      </div>
    </motion.div>
  )
}
