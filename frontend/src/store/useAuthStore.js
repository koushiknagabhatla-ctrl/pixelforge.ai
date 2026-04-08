import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import api from '../lib/axios'

const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  credits: 0,
  plan: 'free',
  loading: true,

  initialize: async () => {
    try {
      // Get initial session
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        set({ session, user: session.user })
        // Clear loading early if we have a session to speed up render
        set({ loading: false })
        await get().fetchCredits()
        await get().ensureUser(session.user)
      } else {
        set({ loading: false })
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        set({ session, user: session?.user || null })
        
        if (session?.user) {
          // If we had been loading, stop it
          set({ loading: false })
          await get().fetchCredits()
          await get().ensureUser(session.user)
        } else {
          set({ credits: 0, plan: 'free', loading: false })
        }
      })
    } catch (error) {
      console.error('Auth initialization error:', error)
      set({ loading: false })
    }
  },

  ensureUser: async (user) => {
    if (!user) return
    try {
      await api.post(`/api/user/ensure?user_id=${user.id}&email=${user.email}`)
    } catch (e) {
      console.error('User synchronization failed:', e.response?.data?.detail || e.message)
    }
  },

  fetchCredits: async () => {
    const { user } = get()
    if (!user) return
    try {
      const { data } = await api.get(`/api/credits/${user.id}`)
      set({ credits: data.credits, plan: data.plan })
    } catch (error) {
      console.error('Failed to fetch credits:', error)
    }
  },

  signInWithGoogle: async () => {
    // Set loading to true while we prepare OAuth
    set({ loading: true })
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard',
        queryParams: {
          prompt: 'select_account',
          access_type: 'offline',
        },
      },
    })
    if (error) {
      set({ loading: false })
      throw error
    }
  },

  signInWithEmail: async (email, password) => {
    set({ loading: true })
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      set({ loading: false })
      throw error
    }
    return data
  },

  signUpWithEmail: async (email, password) => {
    set({ loading: true })
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/dashboard',
      },
    })
    if (error) {
      set({ loading: false })
      throw error
    }
    return data
  },

  signOut: async () => {
    set({ loading: true })
    await supabase.auth.signOut()
    set({ user: null, session: null, credits: 0, plan: 'free', loading: false })
  },
}))

export default useAuthStore
