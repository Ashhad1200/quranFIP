/**
 * ChatBubble Component - Display chat messages
 * @param {object} message - Message object { id, text, sender, timestamp, reference }
 */
function ChatBubble({ message }) {
    const isUser = message.sender === 'user'

    const formatTime = (timestamp) => {
        const date = new Date(timestamp)
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    return (
        <div className={`flex items-end gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="w-10 h-10 bg-lime-neon/15 rounded-xl flex items-center justify-center text-xl shrink-0">
                    🤖
                </div>
            )}

            <div className={`max-w-[70%] p-4 rounded-2xl animate-fade-in ${isUser ? 'bg-lime-neon text-black rounded-br-md' : 'bg-dark-tertiary text-text-primary rounded-bl-md'}`}>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.text}
                </div>

                {message.reference && !isUser && (
                    <div className="mt-2 pt-2 border-t border-white/10 text-xs text-text-secondary">
                        📚 Reference: {message.reference}
                    </div>
                )}

                <div className={`text-xs mt-2 ${isUser ? 'text-black/60' : 'text-text-tertiary'}`}>
                    {formatTime(message.timestamp)}
                </div>
            </div>

            {isUser && (
                <div className="w-10 h-10 bg-dark-tertiary rounded-xl flex items-center justify-center text-xl shrink-0">
                    👤
                </div>
            )}
        </div>
    )
}

export default ChatBubble
