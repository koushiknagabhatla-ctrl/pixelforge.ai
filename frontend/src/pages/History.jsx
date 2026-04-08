import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import EnhancementCard from '../components/EnhancementCard'
import useAuthStore from '../store/useAuthStore'
import useEnhancementStore from '../store/useEnhancementStore'
import { HiOutlineClock, HiOutlineFilter } from 'react-icons/hi'

const modeFilters = [
  { id: 'all', label: 'All' },
  { id: 'auto', label: 'Auto' },
  { id: 'portrait', label: 'Portrait' },
  { id: 'landscape', label: 'Landscape' },
  { id: 'old_photo', label: 'Old Photo' },
  { id: 'low_light', label: 'Low Light' },
  { id: 'remove_bg', label: 'Remove BG' },
  { id: 'denoise', label: 'Denoise' },
]

export default function History() {
  const { user } = useAuthStore()
  const { history, historyLoading, fetchHistory } = useEnhancementStore()
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (user) {
      fetchHistory(user.id, 50)
    }
  }, [user])

  const filteredHistory =
    filter === 'all'
      ? history
      : history.filter((item) => item.mode === filter)

  return (
    <div className="w-full bg-black min-h-screen text-white">
      <div className="p-4 lg:p-8 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-2">
              <HiOutlineClock className="w-6 h-6 text-gray-500" />
              <h1 className="text-2xl lg:text-3xl font-bold text-white uppercase tracking-tight">
                Operations <span className="text-gray-500">History</span>
              </h1>
            </div>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">
              Archive of all architectural image modifications.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 mb-12 overflow-x-auto pb-4 scrollbar-hide"
          >
            <HiOutlineFilter className="w-4 h-4 text-gray-600 flex-shrink-0" />
            <div className="flex gap-2">
                {modeFilters.map((m) => (
                <button
                    key={m.id}
                    onClick={() => setFilter(m.id)}
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                    filter === m.id
                        ? 'bg-white text-black'
                        : 'bg-white/5 text-gray-500 hover:text-white border border-white/5 hover:border-white/10'
                    }`}
                >
                    {m.label}
                </button>
                ))}
            </div>
          </motion.div>

          {/* Grid */}
          {historyLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="glass-card aspect-[4/3] animate-pulse rounded-2xl"
                />
              ))}
            </div>
          ) : filteredHistory.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredHistory.map((item, i) => (
                <div key={item.id} className="glass-card p-2 rounded-2xl group transition-all">
                    <EnhancementCard enhancement={item} index={i} />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 glass-card rounded-3xl"
            >
              <HiOutlineClock className="w-16 h-16 text-gray-800 mx-auto mb-6" />
              <p className="text-lg text-white font-bold uppercase tracking-widest mb-2">No Records Found</p>
              <p className="text-sm text-gray-600 uppercase tracking-widest">
                {filter !== 'all'
                  ? 'No modifications match the current architecture filter.'
                  : 'Start enhancing images to populate the operations ledger.'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
