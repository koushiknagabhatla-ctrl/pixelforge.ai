import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HiOutlineSparkles, 
  HiOutlineDownload, 
  HiOutlineArrowRight, 
  HiOutlineX, 
  HiOutlinePhotograph, 
  HiOutlineEye,
  HiOutlineAdjustments
} from 'react-icons/hi'
import UploadZone from '../components/UploadZone'
import ModeSelector from '../components/ModeSelector'
import ScaleSelector from '../components/ScaleSelector'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import EnhancementCard from '../components/EnhancementCard'
import useAuthStore from '../store/useAuthStore'
import useEnhancementStore from '../store/useEnhancementStore'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { user } = useAuthStore()
  const {
    originalUrl,
    enhancedUrl,
    isEnhancing,
    enhanceProgress,
    enhanceStatus,
    processingTime,
    enhanceImage,
    cancelEnhancement,
    downloadImage,
    history,
    fetchHistory,
    clearEnhancement
  } = useEnhancementStore()

  const [downloadFormat, setDownloadFormat] = useState('png')
  const [activeTab, setActiveTab] = useState('config') // config, studio

  useEffect(() => {
    if (user) {
      fetchHistory(user.id, 10)
    }
  }, [user])

  useEffect(() => {
    if (enhancedUrl) {
        setActiveTab('studio')
    }
  }, [enhancedUrl])

  const handleEnhance = async () => {
    await enhanceImage(user.id)
    fetchHistory(user.id, 10)
  }

  return (
    <div className="p-4 lg:p-8 animate-fade-in w-full bg-black min-h-screen text-white">
        <div className="max-w-5xl mx-auto space-y-12 pb-20">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.5em]">Digital Foundry</span>
                <h1 className="text-4xl font-black uppercase tracking-tighter">
                    AI Tools <span className="text-gray-600">Console</span>
                </h1>
              </div>
              
              <div className="flex gap-4 p-1 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-xl">
                  {['config', 'studio'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => enhancedUrl && setActiveTab(tab)}
                        disabled={!enhancedUrl && tab === 'studio'}
                        className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                            activeTab === tab 
                            ? 'bg-white text-black shadow-xl scale-[1.05]' 
                            : 'text-gray-500 hover:text-white disabled:opacity-30 disabled:hover:text-gray-500'
                        }`}
                      >
                        {tab === 'config' ? 'Configuration' : 'Result Studio'}
                      </button>
                  ))}
              </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === 'config' ? (
                <motion.div
                    key="config"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12"
                >
                    {/* Left Column: Asset Configuration */}
                    <div className="lg:col-span-12 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">Asset Protocol</span>
                                <UploadZone />
                            </div>

                            <div className="space-y-8">
                                <div className="glass-card p-8 rounded-[2.5rem] border-white/5 hover:border-white/10 transition-all">
                                    <div className="flex items-center gap-3 mb-6">
                                        <HiOutlineAdjustments className="text-gray-500" />
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Modulation Params</span>
                                    </div>
                                    <div className="space-y-8">
                                        <ModeSelector />
                                        <ScaleSelector />
                                    </div>
                                </div>
                                
                                <div className="relative">
                                    <Button
                                        variant="default"
                                        onClick={handleEnhance}
                                        disabled={isEnhancing || !originalUrl}
                                        className={`w-full py-8 rounded-[2rem] font-black text-sm uppercase tracking-[0.4em] transition-all ${
                                            isEnhancing
                                            ? 'bg-white/5 text-gray-700'
                                            : !originalUrl
                                            ? 'bg-white/5 text-gray-900 border-white/5 opacity-40 cursor-not-allowed'
                                            : 'bg-white text-black hover:scale-[1.01] shadow-2xl shadow-white/10 active:scale-[0.98]'
                                        }`}
                                    >
                                        {isEnhancing ? (
                                            <div className="flex items-center gap-4">
                                                <div className="w-5 h-5 border-2 border-gray-400 border-t-black rounded-full animate-spin" />
                                                <span>Forging Neural Matrix...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <HiOutlineSparkles className="w-5 h-5" />
                                                Initialize Forge
                                            </div>
                                        )}
                                    </Button>

                                    {isEnhancing && (
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            onClick={cancelEnhancement}
                                            className="absolute -right-4 -top-4 w-12 h-12 rounded-full bg-red-500/20 text-red-500 border border-red-500/20 flex items-center justify-center backdrop-blur-3xl hover:bg-red-500 hover:text-white transition-all z-20"
                                        >
                                            <HiOutlineX className="w-6 h-6" />
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="studio"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-12"
                >
                    {/* Result Studio Hub */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-8">
                            <div className="glass-card p-3 rounded-[3rem] overflow-hidden shadow-3xl bg-white/[0.01]">
                                <BeforeAfterSlider originalUrl={originalUrl} enhancedUrl={enhancedUrl} />
                            </div>
                        </div>

                        <div className="lg:col-span-4 space-y-8">
                            <div className="glass-card p-8 rounded-[2.5rem] border-white/5 space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Matrix Success</h3>
                                    <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[8px] font-black text-green-500 uppercase tracking-[0.2em]">Validated</div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-4 border-b border-white/5">
                                        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Process Time</span>
                                        <span className="text-[10px] font-bold text-white uppercase tracking-tighter">{processingTime || '0.4'}s</span>
                                    </div>
                                    <div className="flex items-center justify-between py-4 border-b border-white/5">
                                        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Architectural Depth</span>
                                        <span className="text-[10px] font-bold text-white uppercase tracking-tighter">High Fidelity</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-white/5 p-1 rounded-2xl border border-white/5 flex gap-2">
                                        {['png', 'webp', 'jpeg'].map((fmt) => (
                                            <button
                                                key={fmt}
                                                onClick={() => setDownloadFormat(fmt)}
                                                className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                                                    downloadFormat === fmt ? 'bg-white text-black' : 'text-gray-600 hover:text-white'
                                                }`}
                                            >
                                                {fmt}
                                            </button>
                                        ))}
                                    </div>
                                    <Button
                                        variant="default"
                                        onClick={() => downloadImage(enhancedUrl, downloadFormat)}
                                        className="w-full py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] bg-white text-black shadow-2xl"
                                    >
                                        <HiOutlineDownload className="inline-block mr-2 w-4 h-4" />
                                        Export Asset
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => { clearEnhancement(); setActiveTab('config'); }}
                                        className="w-full py-4 rounded-2xl font-bold text-[9px] uppercase tracking-[0.4em] border-white/10 text-gray-500 hover:text-white"
                                    >
                                        Re-Modulate
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>

          {/* Records Ledger */}
          {history.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-20 border-t border-white/5"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="space-y-1">
                    <span className="text-[9px] font-bold text-gray-700 uppercase tracking-[0.5em] block">Foundry Ledger</span>
                    <h3 className="text-xl font-bold uppercase tracking-tighter">Previous <span className="text-gray-600">Forges</span></h3>
                </div>
                <Link to="/history" className="px-6 py-3 bg-white/5 border border-white/5 rounded-2xl text-[9px] font-bold text-white uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                  Full Archive <HiOutlineArrowRight className="inline ml-1" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                {history.slice(0, 5).map((item, i) => (
                  <div key={item.id} className="glass-card p-3 rounded-3xl group transition-all hover:scale-[1.03] hover:border-white/20 shadow-2xl">
                    <EnhancementCard enhancement={item} index={i} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
    </div>
  )
}

function Button({ children, variant, className, disabled, onClick, ...props }) {
    const variants = {
        default: "bg-white text-black hover:bg-gray-200",
        outline: "border border-white/10 hover:bg-white/5 text-white"
    };
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center transition-all active:scale-[0.98] disabled:opacity-50 disabled:scale-100 ${variants[variant || 'default']} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
