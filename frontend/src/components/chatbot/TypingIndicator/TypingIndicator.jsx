function TypingIndicator() {
    return (
        <div className="flex items-end gap-3 justify-start">
            <div className="w-10 h-10 bg-lime-neon/15 rounded-xl flex items-center justify-center text-xl shrink-0">
                🤖
            </div>
            <div className="bg-dark-tertiary p-4 rounded-2xl rounded-bl-md animate-fade-in">
                <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-text-tertiary rounded-full animate-typing-dot" />
                    <span className="w-2 h-2 bg-text-tertiary rounded-full animate-typing-dot animation-delay-200" />
                    <span className="w-2 h-2 bg-text-tertiary rounded-full animate-typing-dot animation-delay-400" />
                </div>
            </div>
        </div>
    )
}

export default TypingIndicator
