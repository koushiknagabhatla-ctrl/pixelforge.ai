import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineCloudUpload, HiOutlinePhotograph, HiX } from 'react-icons/hi'
import useEnhancementStore from '../store/useEnhancementStore'

export default function UploadZone() {
  const [preview, setPreview] = useState(null)
  const { uploadImage, isUploading, uploadProgress, clearEnhancement } = useEnhancementStore()

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (!file) return

      const result = await uploadImage(file)
      if (result) {
        setPreview(result.previewUrl)
      }
    },
    [uploadImage]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  })

  const handleClear = () => {
    setPreview(null)
    clearEnhancement()
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative glass-card overflow-hidden rounded-[32px] p-4"
          >
            <button
              onClick={handleClear}
              className="absolute top-6 right-6 z-10 p-3 rounded-2xl glass-dark hover:bg-white/10 border border-white/5 backdrop-blur-3xl transition-all duration-300"
            >
              <HiX className="w-5 h-5 text-white" />
            </button>
            <img
              src={preview}
              alt="Uploaded preview"
              className="w-full max-h-[500px] object-contain rounded-[24px]"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">Matrix Ready for Architecture Update</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              {...getRootProps()}
              className={`relative cursor-pointer transition-all duration-500 overflow-hidden rounded-[32px] ${
                isDragActive ? 'scale-[0.99]' : ''
              }`}
            >
              <input {...getInputProps()} id="upload-input" />

              <div className="relative z-10 flex flex-col items-center justify-center p-20 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500">
                  {isUploading ? (
                    <div className="text-center">
                      <div className="w-20 h-20 mb-8 mx-auto relative flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.05)"
                            strokeWidth="4"
                          />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="white"
                            strokeWidth="4"
                            strokeDasharray="283"
                            animate={{ strokeDashoffset: 283 - (283 * uploadProgress) / 100 }}
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="text-sm font-bold text-white">
                          {uploadProgress}%
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Streaming Data...</p>
                    </div>
                  ) : (
                    <>
                      <motion.div
                        animate={isDragActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-8"
                      >
                        <div className="relative w-16 h-16 flex items-center justify-center bg-white/5 rounded-2xl border border-white/5 group-hover:border-white/10 transition-all">
                          <HiOutlineCloudUpload className="w-8 h-8 text-white/40" />
                          <div className="absolute -inset-4 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </motion.div>
                      <p className="text-xl font-bold text-white mb-3 uppercase tracking-widest">
                        {isDragActive ? 'Release Source' : 'Drop Source Image'}
                      </p>
                      <p className="text-[10px] font-bold text-gray-600 mb-8 uppercase tracking-[0.3em] text-center max-w-xs leading-loose">
                        Drag or browse to initialize forge pipeline • Max 10MB
                      </p>
                      <div className="flex gap-4">
                        {['JPG', 'PNG', 'WebP'].map((fmt) => (
                          <span
                            key={fmt}
                            className="px-5 py-2 rounded-xl text-[9px] font-bold text-gray-400 bg-white/5 border border-white/5 uppercase tracking-widest"
                          >
                            {fmt}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
