import { create } from 'zustand'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const useEnhancementStore = create((set, get) => ({
  // Upload state
  originalImage: null,
  originalUrl: null,
  uploadProgress: 0,
  isUploading: false,

  // Enhancement settings
  mode: 'auto',
  scale: 2,

  // Enhancement state
  enhancedUrl: null,
  isEnhancing: false,
  enhanceProgress: 0,
  enhanceStatus: '',
  processingTime: null,
  
  // Abort Protocol
  abortController: null,

  // History
  history: [],
  historyLoading: false,

  // --- Actions ---

  setMode: (mode) => set({ mode }),
  setScale: (scale) => set({ scale }),

  uploadImage: async (file) => {
    set({ isUploading: true, uploadProgress: 0, enhancedUrl: null, processingTime: null })

    const formData = new FormData()
    formData.append('file', file)

    try {
      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded * 100) / e.total)
          set({ uploadProgress: progress })
        },
      })

      const previewUrl = URL.createObjectURL(file)

      set({
        originalImage: file,
        originalUrl: data.image_url,
        isUploading: false,
        uploadProgress: 100,
      })

      toast.success('Image uploaded successfully!')
      return { previewUrl, cloudinaryUrl: data.image_url }
    } catch (error) {
      set({ isUploading: false, uploadProgress: 0 })
      const msg = error.response?.data?.detail || 'Upload failed'
      toast.error(msg)
      throw error
    }
  },

  enhanceImage: async (userId) => {
    const { originalUrl, mode, scale } = get()
    if (!originalUrl) {
      toast.error('Please upload an image first')
      return
    }

    // Initialize Abort Controller
    const controller = new AbortController()
    
    set({
      isEnhancing: true,
      enhanceProgress: 0,
      enhanceStatus: 'Analyzing image...',
      enhancedUrl: null,
      processingTime: null,
      abortController: controller
    })

    const progressSteps = [
      { progress: 15, status: 'Analyzing image...', delay: 800 },
      { progress: 35, status: 'Selecting AI model...', delay: 1200 },
      { progress: 55, status: 'Applying AI enhancement...', delay: 2000 },
      { progress: 75, status: 'Processing details...', delay: 2500 },
      { progress: 90, status: 'Finalizing output...', delay: 1500 },
    ]

    let stepIndex = 0
    const progressInterval = setInterval(() => {
      if (stepIndex < progressSteps.length) {
        const step = progressSteps[stepIndex]
        set({ enhanceProgress: step.progress, enhanceStatus: step.status })
        stepIndex++
      }
    }, 1800)

    try {
      const { data } = await api.post('/enhance', {
        image_url: originalUrl,
        mode,
        scale,
        user_id: userId,
      }, {
        signal: controller.signal
      })

      clearInterval(progressInterval)

      set({
        enhancedUrl: data.enhanced_url,
        isEnhancing: false,
        enhanceProgress: 100,
        enhanceStatus: 'Enhancement complete!',
        processingTime: data.processing_time,
        abortController: null
      })

      toast.success(`Enhanced in ${data.processing_time}s!`)
    } catch (error) {
      clearInterval(progressInterval)
      if (error.name === 'CanceledError' || error.name === 'AbortError') {
        console.log('Forge Aborted Successfully')
      } else {
        const msg = error.response?.data?.detail || 'Enhancement failed'
        toast.error(msg)
      }
      
      set({
        isEnhancing: false,
        enhanceProgress: 0,
        enhanceStatus: '',
        abortController: null
      })
    }
  },

  cancelEnhancement: () => {
    const { abortController } = get()
    if (abortController) {
      abortController.abort()
      toast.error('Gorge Cancelled Engine Halted.')
      set({ 
        isEnhancing: false, 
        enhanceProgress: 0, 
        enhanceStatus: '', 
        abortController: null 
      })
    }
  },

  fetchHistory: async (userId, limit = 50) => {
    set({ historyLoading: true })
    try {
      const { data } = await api.get(`/history/${userId}?limit=${limit}`)
      set({ history: Array.isArray(data) ? data : [], historyLoading: false })
    } catch (error) {
      set({ historyLoading: false })
      console.error('Failed to fetch history:', error)
    }
  },

  clearEnhancement: () => {
    set({
      originalImage: null,
      originalUrl: null,
      enhancedUrl: null,
      uploadProgress: 0,
      enhanceProgress: 0,
      enhanceStatus: '',
      processingTime: null,
    })
  },

  downloadImage: async (url, format = 'png') => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = `pixelforge-enhanced.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(downloadUrl)
      toast.success('Download started!')
    } catch (error) {
      toast.error('Download failed')
    }
  },
}))

export default useEnhancementStore
