import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectMessages,
  selectIsTyping,
  selectQuickActions,
  addUserMessage,
  sendMessage
} from '@store/slices/chatbotSlice'
import { setCurrentPage } from '@store/slices/uiSlice'
import ChatBubble from '@components/chatbot/ChatBubble/ChatBubble'
import TypingIndicator from '@components/chatbot/TypingIndicator/TypingIndicator'

function Chatbot() {
  const dispatch = useDispatch()
  const messages = useSelector(selectMessages)
  const isTyping = useSelector(selectIsTyping)
  const quickActions = useSelector(selectQuickActions)

  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    dispatch(setCurrentPage('chatbot'))

    // Welcome message
    if (messages.length === 0) {
      setTimeout(() => {
        dispatch(sendMessage('As-Salaam-Alaikum'))
      }, 1000)
    }
  }, [dispatch])

  // Auto-scroll to latest message
  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!inputText.trim()) return

    // Add user message
    dispatch(addUserMessage(inputText))

    // Send to bot (will show typing indicator and return response)
    dispatch(sendMessage(inputText))

    // Clear input
    setInputText('')
    inputRef.current?.focus()
  }

  const handleQuickAction = (action) => {
    dispatch(addUserMessage(action.label))
    dispatch(sendMessage(action.query || action.label))
  }

  return (
    <div className="min-h-screen flex flex-col pt-16">
      {/* Header */}
      <div className="glass border-b border-glass-border p-4">
        <div className="container flex items-center gap-4">
          <div className="w-12 h-12 bg-lime-neon/15 rounded-xl flex items-center justify-center text-2xl">🤖</div>
          <div>
            <h2 className="text-lg font-bold text-text-primary m-0">Islamic Chatbot</h2>
            <p className={`text-sm m-0 ${isTyping ? 'text-lime-neon' : 'text-text-secondary'}`}>
              {isTyping ? 'Typing...' : 'Online'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="container py-6 space-y-4">
          {/* Welcome Card */}
          {messages.length === 0 && !isTyping && (
            <div className="glass p-8 rounded-2xl text-center max-w-lg mx-auto">
              <div className="text-6xl mb-4">🕌</div>
              <h3 className="text-xl font-bold text-text-primary mb-3">As-Salaam-Alaikum! Welcome to QuranLearnAI</h3>
              <p className="text-text-secondary mb-4">I'm here to help you understand the Quran, learn about Tafseer, and answer your Islamic questions.</p>
              <p className="text-sm text-lime-neon">
                💡 Try asking about ayah meanings, Tafseer, or use the quick actions below!
              </p>
            </div>
          )}

          {/* Chat Messages */}
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}

          {/* Typing Indicator */}
          {isTyping && <TypingIndicator />}

          {/* Scroll Anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions (show when no typing) */}
      {!isTyping && messages.length > 0 && (
        <div className="border-t border-white/10 p-4">
          <div className="container">
            <div className="text-xs text-text-tertiary mb-2">Quick Actions:</div>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-dark-tertiary border border-white/10 rounded-full text-sm text-text-primary transition-all duration-200 hover:border-lime-neon/30 hover:bg-lime-neon/10"
                  onClick={() => handleQuickAction(action)}
                >
                  <span>{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <form className="border-t border-white/10 p-4" onSubmit={handleSendMessage}>
        <div className="container">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask me anything about the Quran..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 py-4 px-6 bg-dark-tertiary border border-white/10 rounded-full text-text-primary text-base transition-all duration-200 focus:border-lime-neon focus:shadow-glow-sm placeholder:text-text-tertiary"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="w-14 h-14 bg-lime-neon rounded-full flex items-center justify-center text-black text-xl transition-all duration-200 hover:bg-lime-light hover:shadow-glow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!inputText.trim() || isTyping}
            >
              {isTyping ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <span>➤</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Chatbot
