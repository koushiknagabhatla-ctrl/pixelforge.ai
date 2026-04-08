import { motion } from 'framer-motion'
import {
  HiOutlineSparkles,
  HiOutlineUser,
  HiOutlinePhotograph,
  HiOutlineClock,
  HiOutlineMoon,
  HiOutlineScissors,
  HiOutlineAdjustments,
} from 'react-icons/hi'
import useEnhancementStore from '../store/useEnhancementStore'

const modes = [
  {
    id: 'auto',
    name: 'Auto Enhance',
    description: 'Smart AI enhancement',
    icon: HiOutlineSparkles,
  },
  {
    id: 'portrait',
    name: 'Portrait & Face',
    description: 'Face restoration & detail',
    icon: HiOutlineUser,
  },
  {
    id: 'landscape',
    name: 'Landscape & Nature',
    description: 'Scenic enhancement',
    icon: HiOutlinePhotograph,
  },
  {
    id: 'old_photo',
    name: 'Old Photo Restore',
    description: 'Revive old memories',
    icon: HiOutlineClock,
  },
  {
    id: 'low_light',
    name: 'Low Light / Night',
    description: 'Brighten dark photos',
    icon: HiOutlineMoon,
  },
  {
    id: 'remove_bg',
    name: 'Remove Background',
    description: 'Clean background removal',
    icon: HiOutlineScissors,
  },
  {
    id: 'denoise',
    name: 'Denoise & Sharpen',
    description: 'Reduce noise & sharpen',
    icon: HiOutlineAdjustments,
  },
]

export default function ModeSelector() {
  const { mode, setMode } = useEnhancementStore()

  return (
    <div>
      <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] mb-6">
        Modality Configuration
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modes.map((m) => (
          <motion.button
            key={m.id}
            onClick={() => setMode(m.id)}
            whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.05)' }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-5 rounded-2xl text-left transition-all duration-300 border ${
              mode === m.id
                ? 'bg-white text-black border-white shadow-2xl'
                : 'bg-white/[0.02] border-white/5 text-gray-500 hover:text-white hover:border-white/10'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${
                mode === m.id ? 'border-black/10 bg-black/5' : 'border-white/5 bg-white/5'
            }`}>
              <m.icon className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1">
              {m.name}
            </p>
            <p className="text-[9px] font-medium opacity-60 uppercase tracking-wider">{m.description}</p>
            
            {mode === m.id && (
              <motion.div
                layoutId="mode-indicator"
                className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-black/20"
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
