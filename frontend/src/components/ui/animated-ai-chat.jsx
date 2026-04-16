import { useEffect, useRef, useCallback, useState } from "react"
import { cn } from "../../lib/utils"
import { SendIcon, LoaderIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { prompt_deepseek } from "../../services/api"
import useAuthStore from "../../store/useAuthStore"

/* ═══ Auto-resize textarea hook ═══ */
function useAutoResizeTextarea({ minHeight, maxHeight }) {
  const textareaRef = useRef(null)
  const adjustHeight = useCallback(
    (reset) => {
      const textarea = textareaRef.current
      if (!textarea) return
      if (reset) { textarea.style.height = `${minHeight}px`; return }
      textarea.style.height = `${minHeight}px`
      const newHeight = Math.max(minHeight, Math.min(textarea.scrollHeight, maxHeight ?? Infinity))
      textarea.style.height = `${newHeight}px`
    },
    [minHeight, maxHeight]
  )
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) textarea.style.height = `${minHeight}px`
  }, [minHeight])
  return { textareaRef, adjustHeight }
}

/* ═══ Main Chat Component ═══ */
export function AnimatedAIChat() {
  const { user } = useAuthStore()
  const [value, setValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({ minHeight: 56, maxHeight: 200 })
  const scrollRef = useRef(null)

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: user
        ? `Hey ${user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0]}! How can I help you today?`
        : "Hey! How can I help you today?",
    },
  ])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, isTyping])

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) handleSendMessage()
    }
  }

  const handleSendMessage = async () => {
    if (!value.trim() || isTyping) return
    const userMessage = value.trim()
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setValue("")
    adjustHeight(true)
    setIsTyping(true)

    try {
      const response = await prompt_deepseek(userMessage)
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Synchronization failure. Core unavailable." }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col w-full items-center justify-center text-white p-4 sm:p-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" style={{ animationDelay: '700ms' }} />
      </div>

      <div className="w-full max-w-2xl mx-auto relative">
        <motion.div
          className="relative z-10 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <motion.h1
              className="text-2xl sm:text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/40 pb-1 font-['Manrope']"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Forge AI
            </motion.h1>
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent mx-auto"
              initial={{ width: 0 }}
              animate={{ width: "50%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </div>

          {/* Messages area */}
          <div
            ref={scrollRef}
            className="max-h-[50vh] overflow-y-auto space-y-4 px-1 scrollbar-hide"
          >
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={cn(
                      "max-w-[85%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-indigo-500/10 text-white/90 border border-indigo-500/15"
                        : "bg-white/[0.03] text-white/70 border border-white/[0.04]"
                    )}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/[0.03] border border-white/[0.04] rounded-2xl px-5 py-3.5 flex items-center gap-2">
                    <span className="text-xs text-white/40">Thinking</span>
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map((dot) => (
                        <motion.div
                          key={dot}
                          className="w-1.5 h-1.5 bg-indigo-400/60 rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: dot * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input area — clean, no attachments, no quick actions */}
          <motion.div
            className="relative backdrop-blur-2xl rounded-2xl border border-white/[0.05] overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, rgba(20,20,35,0.6) 0%, rgba(10,10,18,0.7) 100%)',
              boxShadow: '0 0 6px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.08), inset 3px 3px 0.5px -3px rgba(99,102,241,0.15), inset -3px -3px 0.5px -3px rgba(99,102,241,0.1), 0 0 12px rgba(99,102,241,0.05)',
            }}
          >
            <div className="p-3 sm:p-4">
              <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => { setValue(e.target.value); adjustHeight() }}
                onKeyDown={handleKeyDown}
                placeholder="Ask Forge anything..."
                className="w-full px-3 py-2 resize-none bg-transparent border-none text-white/90 text-sm focus:outline-none placeholder:text-white/15 min-h-[56px]"
                style={{ overflow: "hidden" }}
              />
            </div>

            {/* Send bar */}
            <div className="px-3 sm:px-4 pb-3 sm:pb-4 flex items-center justify-end">
              <motion.button
                type="button"
                onClick={handleSendMessage}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isTyping || !value.trim()}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2",
                  value.trim()
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400"
                    : "bg-white/[0.04] text-white/20"
                )}
              >
                {isTyping ? (
                  <LoaderIcon className="w-4 h-4 animate-[spin_2s_linear_infinite]" />
                ) : (
                  <SendIcon className="w-4 h-4" />
                )}
                <span>Send</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
