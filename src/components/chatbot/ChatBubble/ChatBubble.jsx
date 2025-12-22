import styles from './ChatBubble.module.css'

/**
 * ChatBubble Component - Display chat messages
 * @param {object} message - Message object { id, text, sender, timestamp, reference }
 */
function ChatBubble({ message }) {
    const isUser = message.sender === 'user'
    const bubbleClass = isUser ? styles.userBubble : styles.botBubble

    const formatTime = (timestamp) => {
        const date = new Date(timestamp)
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    return (
        <div className={`${styles.bubbleContainer} ${isUser ? styles.userContainer : styles.botContainer}`}>
            {!isUser && (
                <div className={styles.avatar}>
                    🤖
                </div>
            )}

            <div className={bubbleClass}>
                <div className={styles.messageText}>
                    {message.text}
                </div>

                {message.reference && !isUser && (
                    <div className={styles.reference}>
                        📚 Reference: {message.reference}
                    </div>
                )}

                <div className={styles.timestamp}>
                    {formatTime(message.timestamp)}
                </div>
            </div>

            {isUser && (
                <div className={styles.avatar}>
                    👤
                </div>
            )}
        </div>
    )
}

export default ChatBubble
