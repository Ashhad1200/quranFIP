/**
 * MicButton Component - Recording button with pulse animation
 * @param {boolean} isRecording - Recording state
 * @param {function} onStart - Start recording callback
 * @param {function} onStop - Stop recording callback
 * @param {boolean} disabled - Disabled state
 */
function MicButton({ isRecording, onStart, onStop, disabled = false }) {
    const handleClick = () => {
        if (disabled) return

        if (isRecording) {
            onStop()
        } else {
            onStart()
        }
    }

    return (
        <button
            className={`relative w-24 h-24 rounded-full flex items-center justify-center text-4xl transition-all duration-300 ${isRecording
                    ? 'bg-error text-white animate-mic-pulse'
                    : 'bg-lime-neon text-black hover:bg-lime-light hover:shadow-glow-md'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={handleClick}
            disabled={disabled}
            aria-label={isRecording ? 'Stop recording' : 'Start recording'}
        >
            <div className="relative z-10">
                {isRecording ? '⏹' : '🎤'}
            </div>
        </button>
    )
}

export default MicButton
