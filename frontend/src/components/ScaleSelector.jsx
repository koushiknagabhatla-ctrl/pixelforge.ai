import { motion } from 'framer-motion'
import useEnhancementStore from '../store/useEnhancementStore'

const scales = [
  { value: 2, label: '2x', desc: 'Standard' },
  { value: 4, label: '4x', desc: 'High Quality' },
  { value: 8, label: '8x', desc: 'Ultra' },
]

export default function ScaleSelector() {
  const { scale, setScale } = useEnhancementStore()

  return (
    <div>
      <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] mb-6">
        Upscale Factor
      </h3>
      <div className="flex gap-4">
        {scales.map((s) => (
          <motion.button
            key={s.value}
            onClick={() => setScale(s.value)}
            whileHover={{ y: -2, backgroundColor: s.value === scale ? '' : 'rgba(255,255,255,0.05)' }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 py-6 px-4 rounded-2xl text-center transition-all duration-300 border ${
              scale === s.value
                ? 'bg-white text-black border-white shadow-2xl'
                : 'bg-white/[0.02] border-white/5 text-gray-500 hover:text-white hover:border-white/10'
            }`}
          >
            <span className="text-3xl font-bold tracking-tighter">
              {s.label}
            </span>
            <p className={`text-[9px] mt-2 font-bold uppercase tracking-widest ${scale === s.value ? 'text-black/40' : 'text-gray-600'}`}>
              {s.desc}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
