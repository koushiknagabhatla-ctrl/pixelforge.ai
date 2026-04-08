import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { motion } from 'framer-motion'

export default function BeforeAfterSlider({ originalUrl, enhancedUrl }) {
  if (!originalUrl || !enhancedUrl) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="glass-card overflow-hidden rounded-[32px] border border-white/5"
    >
      <div className="p-6 border-b border-white/5 bg-white/[0.01]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] bg-white/5 text-gray-500 border border-white/5">
              Source
            </span>
            <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.4em]">Comparison Architecture</span>
                <div className="w-1 h-1 rounded-full bg-white/20" />
            </div>
            <span className="px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] bg-white text-black border border-white">
              Processed
            </span>
          </div>
        </div>
      </div>
      <div className="relative bg-black">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src={originalUrl}
              alt="Original"
              style={{ objectFit: 'contain', maxHeight: '600px', width: '100%' }}
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={enhancedUrl}
              alt="Enhanced"
              style={{ objectFit: 'contain', maxHeight: '600px', width: '100%' }}
            />
          }
          style={{ height: '600px' }}
          position={50}
        />
      </div>
    </motion.div>
  )
}
