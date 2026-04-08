import { create } from 'zustand'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const useImageStore = create((set, get) => ({
  isGenerating: false,
  resultImage: null,
  enhancedPrompt: null,
  history: [],

  generateImage: async (prompt, userId) => {
    set({ isGenerating: true, resultImage: null, enhancedPrompt: null })
    try {
      const { data } = await api.post('/api/generate', { prompt, user_id: userId })
      set({ 
        resultImage: data.image_url, 
        enhancedPrompt: data.enhanced_prompt,
        isGenerating: false 
      })
      toast.success('Matrix Forged Successfully')
      await get().fetchHistory(userId)
    } catch (error) {
      console.error('Forge Failure:', error)
      toast.error('Architecture Failure: Matrix Collapse')
      set({ isGenerating: false })
    }
  },

  fetchHistory: async (userId) => {
    try {
      const { data } = await api.get(`/api/user/history?user_id=${userId}`)
      set({ history: data })
    } catch (error) {
      console.error('History Retrieval Failed:', error)
    }
  },

  clearResult: () => set({ resultImage: null, enhancedPrompt: null })
}))

export default useImageStore
