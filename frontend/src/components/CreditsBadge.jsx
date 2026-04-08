import { motion } from 'framer-motion'
import { HiOutlineSparkles } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

export default function CreditsBadge() {
  const { credits, plan } = useAuthStore()
  const isLow = credits <= 2
  const isEmpty = credits <= 0

  return (
    <Link to="/pricing">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
          isEmpty
            ? 'bg-red-500/10 border border-red-500/30 text-red-400'
            : isLow
            ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
            : 'bg-white/5 border border-white/10 text-gray-300 hover:border-accent-blue/30'
        }`}
      >
        <HiOutlineSparkles className={`w-4 h-4 ${isEmpty ? 'text-red-400' : isLow ? 'text-amber-400' : 'text-accent-blue'}`} />
        <span className="font-bold">{credits}</span>
        <span className="text-gray-500 hidden sm:inline">credits</span>
        {plan !== 'free' && (
          <span className="ml-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-accent-purple/20 text-accent-purple">
            {plan}
          </span>
        )}
      </motion.div>
    </Link>
  )
}
