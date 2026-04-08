import { motion } from 'framer-motion'
import { HiCheck, HiOutlineSparkles } from 'react-icons/hi'

export default function PricingCard({ plan, isPopular = false, onSelect, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className={`relative glass-card p-8 flex flex-col transition-all duration-500 ${
        isPopular ? 'glass-strong border-pink-500/30' : ''
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-pink-500 to-rose-400 text-white flex items-center gap-1.5 uppercase tracking-widest shadow-lg shadow-pink-500/20">
            <HiOutlineSparkles className="w-3.5 h-3.5" />
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{plan.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          {plan.price === 0 ? (
            <span className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Free</span>
          ) : (
            <>
              <span className="text-lg text-gray-500 font-bold">₹</span>
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{plan.price}</span>
              <span className="text-gray-500 font-medium ml-1">/month</span>
            </>
          )}
        </div>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="mt-0.5">
              <HiCheck className={`w-4 h-4 ${isPopular ? 'text-pink-500' : 'text-gray-400'}`} />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onSelect && onSelect(plan)}
        className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm ${
          isPopular
            ? 'btn-primary'
            : 'glass border border-[var(--glass-border)] text-gray-700 dark:text-white hover:bg-[var(--glass-border-hover)]'
        }`}
      >
        {plan.price === 0 ? 'Get Started Free' : `Upgrade to ${plan.name}`}
      </motion.button>
    </motion.div>
  )
}
