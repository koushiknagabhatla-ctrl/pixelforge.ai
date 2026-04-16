import { useEffect, useRef, useCallback, useState } from "react"
import { cn } from "../../lib/utils"
import { Send, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { prompt_deepseek } from "../../services/api"
import useAuthStore from "../../store/useAuthStore"

function useAutoResizeTextarea({ minHeight, maxHeight }) {
  const textareaRef = useRef(null)
  const adjustHeight = useCallback((reset) => {
    const textarea = textareaRef.current
    if (!textarea) return
    if (reset) { textarea.style.height = `${minHeight}px`; return }
    textarea.style.height = `${minHeight}px`
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight ?? Infinity)}px`
  }, [minHeight, maxHeight])
  useEffect(() => { if (textareaRef.current) textareaRef.current.style.height = `${minHeight}px` }, [minHeight])
  return { textareaRef, adjustHeight }
}

export function AnimatedAIChat() {
  const { user } = useAuthStore()
  const [value, setValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({ minHeight: 48, maxHeight: 180 })
  const scrollRef = useRef(null)

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.user_metadata?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'there'

  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hey ${firstName}! What are you working on today?` },
  ])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, isTyping])

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); if (value.trim()) handleSend() }
  }

  const handleSend = async () => {
    if (!value.trim() || isTyping) return
    const msg = value.trim()
    setMessages(prev => [...prev, { role: "user", content: msg }])
    setValue(""); adjustHeight(true); setIsTyping(true)
    try {
      const response = await prompt_deepseek(msg)
      setMessages(prev => [...prev, { role: "assistant", content: response }])
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Try again in a moment." }])
    } finally { setIsTyping(false) }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col w-full items-center justify-center p-4 sm:p-6 relative">
      <div className="w-full max-w-2xl mx-auto relative">
        <motion.div className="relative z-10 space-y-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          
          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-headline tracking-tight text-white/90">Forge AI</h1>
            <p className="text-xs text-white/20">Your creative assistant</p>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="max-h-[50vh] overflow-y-auto space-y-3 px-1 scrollbar-hide">
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <motion.div key={i} layout
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={cn(
                    "max-w-[85%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed",
                    msg.role === "user"
                      ? "bg-white text-black rounded-br-md"
                      : "bg-white/[0.03] text-white/60 border border-white/[0.05] rounded-bl-md"
                  )}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <AnimatePresence>
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex justify-start">
                  <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
                    <span className="text-xs text-white/25">Thinking</span>
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map(d => (
                        <motion.div key={d} className="w-1 h-1 bg-white/25 rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input */}
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
            <div className="p-3">
              <textarea ref={textareaRef} value={value}
                onChange={(e) => { setValue(e.target.value); adjustHeight() }}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                className="w-full px-3 py-2 resize-none bg-transparent border-none text-white/80 text-sm focus:outline-none placeholder:text-white/10 min-h-[48px]"
                style={{ overflow: "hidden" }} />
            </div>
            <div className="px-3 pb-3 flex items-center justify-end">
              <motion.button onClick={handleSend} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                disabled={isTyping || !value.trim()}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                  value.trim() ? "bg-white text-black hover:bg-white/90" : "bg-white/[0.03] text-white/15"
                )}>
                {isTyping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                Send
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
