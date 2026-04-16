import { create } from 'zustand'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const compressImage = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_DIM = 2048; // Max standard bounding box
        if (width > height && width > MAX_DIM) {
          height *= MAX_DIM / width;
          width = MAX_DIM;
        } else if (height > MAX_DIM) {
          width *= MAX_DIM / height;
          height = MAX_DIM;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error('Canvas is empty'));
          const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
              type: 'image/jpeg',
              lastModified: Date.now()
          });
          resolve(newFile);
        }, 'image/jpeg', 0.85); // Standard 85% optimization compression
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

const useImageStore = create((set, get) => ({
  isGenerating: false,
  resultImage: null,
  enhancedPrompt: null,
  history: [],

  generateImage: async (prompt, userId) => {
    set({ isGenerating: true, resultImage: null, enhancedPrompt: null })
    try {
      // Hyper-Performance Prompt Wrapper v10.1
      const hyperPrompt = `[MODE: HYPER-BEST / MAXIMUM THINKING] High-fidelity architectural render, professional lighting, 8k resolution, cinematic composition, photorealistic detail: ${prompt}`;
      const { data } = await api.post('/generate', { prompt: hyperPrompt, user_id: userId })
      set({ 
        resultImage: data.image_url, 
        enhancedPrompt: data.enhanced_prompt,
        isGenerating: false 
      })
      toast.success('Successfully Generated')
      await get().fetchHistory(userId)
    } catch (error) {
      console.error('Generation Error:', error)
      toast.error('Server Request Failed. Please try again.')
      set({ isGenerating: false })
    }
  },

  runTool: async (tool, imageFile, userId) => {
    set({ isGenerating: true, resultImage: null })
    try {
      // Automatic Payload Compression for Vercel 4.5MB limits
      let finalFile = imageFile;
      if (imageFile.size > 2.5 * 1024 * 1024) { 
          finalFile = await compressImage(imageFile);
          if (finalFile.size > 4.5 * 1024 * 1024) {
              toast.error('Image is too large even after compression. Max limit is 4MB.');
              set({ isGenerating: false });
              return;
          }
      }

      const formData = new FormData()
      formData.append('file', finalFile)
      
      const { data } = await api.post(`/tools/${tool}`, formData, {
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
