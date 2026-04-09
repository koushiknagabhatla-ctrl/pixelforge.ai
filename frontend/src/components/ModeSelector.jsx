import { motion } from 'framer-motion'
import {
  HiOutlineSparkles,
  HiOutlineUser,
  HiOutlinePhotograph,
  HiOutlineClock,
  HiOutlineMoon,
} from 'react-icons/hi'
import useEnhancementStore from '../store/useEnhancementStore'

const modes = [
  {
    id: 'auto',
    name: 'Neural Auto',
    description: 'Autonomous optimization',
    icon: HiOutlineSparkles,
  },
  {
    id: 'portrait',
    name: 'Biometric Face',
    description: 'Neural face restoration',
    icon: HiOutlineUser,
  },
  {
    id: 'landscape',
    name: 'Scenic Matrix',
    description: 'Environment synthesis',
    icon: HiOutlinePhotograph,
  },
  {
    id: 'old_photo',
    name: 'Chronos Restore',
    description: 'Temporal detail retrieval',
    icon: HiOutlineClock,
  },
  {
    id: 'low_light',
    name: 'Lumen Forge',
    description: 'Low-light amplification',
    icon: HiOutlineMoon,
  },
]

export default function ModeSelector() {
  const { mode, setMode } = useEnhancementStore()

  return (
    <div className="neural-grain p-1 rounded-3xl">
      <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.5em] mb-8 px-2 flex items-center gap-4">
        Modality Configuration
        <div className="h-px flex-1 bg-white/5" />
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {modes.map((m) => (
          <motion.button
            key={m.id}
            onClick={() => setMode(m.id)}
            whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.04)' }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-6 rounded-3xl text-left transition-all duration-500 border overflow-hidden group ${
              mode === m.id
                ? 'bg-white text-black border-white shadow-[0_0_40px_rgba(255,255,255,0.15)]'
                : 'bg-white/[0.01] border-white/5 text-gray-500 hover:text-white hover:border-white/20'
            }`}
          >
            {/* Background Texture for Active Mode */}
            {mode === m.id && (
                <div className="absolute inset-0 neural-grain opacity-10 pointer-events-none" />
            )}

            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-500 ${
                mode === m.id ? 'border-black/20 bg-black/5 rotate-3' : 'border-white/5 bg-white/5 group-hover:rotate-6'
            }`}>
              <m.icon className="w-6 h-6" />
            </div>
            
            <p className="text-xs font-black uppercase tracking-[0.2em] mb-2 leading-none">
              {m.name}
            </p>
            <p className="text-[9px] font-bold opacity-60 uppercase tracking-widest leading-relaxed">
              {m.description}
            </p>
            
            {mode === m.id && (
              <motion.div
                layoutId="mode-indicator"
                className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-black/30"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
