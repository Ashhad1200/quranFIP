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
import styles from './Chatbot.module.css'

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
    <div className={styles.chatbot}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.botAvatar}>🤖</div>
          <div className={styles.botInfo}>
            <h2>Islamic Chatbot</h2>
            <p className={styles.status}>
              {isTyping ? 'Typing...' : 'Online'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className={styles.messagesContainer}>
        <div className={styles.messages}>
          {/* Welcome Card */}
          {messages.length === 0 && !isTyping && (
            <div className={styles.welcomeCard}>
              <div className={styles.welcomeIcon}>🕌</div>
              <h3>As-Salaam-Alaikum! Welcome to QuranLearnAI</h3>
              <p>I'm here to help you understand the Quran, learn about Tafseer, and answer your Islamic questions.</p>
              <p className={styles.welcomeTip}>
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
        <div className={styles.quickActionsContainer}>
          <div className={styles.quickActionsLabel}>Quick Actions:</div>
          <div className={styles.quickActions}>
            {quickActions.map((action) => (
              <button
                key={action.id}
                className={styles.quickActionButton}
                onClick={() => handleQuickAction(action)}
              >
                <span className={styles.actionIcon}>{action.icon}</span>
                <span className={styles.actionLabel}>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <form className={styles.inputContainer} onSubmit={handleSendMessage}>
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask me anything about the Quran..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className={styles.input}
            disabled={isTyping}
          />
          <button
            type="submit"
            className={styles.sendButton}
            disabled={!inputText.trim() || isTyping}
          >
            {isTyping ? (
              <span className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
            ) : (
              <span className={styles.sendIcon}>➤</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Chatbot
