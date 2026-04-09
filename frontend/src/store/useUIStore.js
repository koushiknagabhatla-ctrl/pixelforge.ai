import { create } from 'zustand'

const useUIStore = create((set) => ({
  isSidebarOpen: true,
  isSidebarMinimized: false,
  
  toggleSidebar: () => set((state) => ({ 
    isSidebarOpen: !state.isSidebarOpen 
  })),
  
  toggleMinimize: () => set((state) => ({ 
    isSidebarMinimized: !state.isSidebarMinimized,
    isSidebarOpen: true // Ensure open if minimizing
  })),
  
  setSidebarState: (isOpen, isMinimized) => set({ 
    isSidebarOpen: isOpen, 
    isSidebarMinimized: isMinimized 
  })
}))

export default useUIStore
