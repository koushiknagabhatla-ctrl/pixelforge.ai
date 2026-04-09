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
      const { data } = await api.post('/generate', { prompt, user_id: userId })
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

  runTool: async (tool, imageFile, userId) => {
    set({ isGenerating: true, resultImage: null })
    try {
      const formData = new FormData()
      formData.append('file', imageFile)
      
      const { data } = await api.post('/tools/enhance', formData, {
        params: { user_id: userId },
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      
      set({ 
        resultImage: data.url, 
        isGenerating: false 
      })
      toast.success('Tool Execution Successful')
      await get().fetchHistory(userId)
    } catch (error) {
      console.error('Tool Failure:', error)
      toast.error('Tool execution failed')
      set({ isGenerating: false })
    }
  },

  fetchHistory: async (userId) => {
    try {
      const { data } = await api.get(`/user/history/${userId}`)
      set({ history: Array.isArray(data) ? data : [] })
    } catch (error) {
      console.error('History Retrieval Failed:', error)
    }
  },

  clearResult: () => set({ resultImage: null, enhancedPrompt: null })
}))

export default useImageStore
