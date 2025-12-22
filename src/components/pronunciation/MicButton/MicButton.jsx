import styles from './MicButton.module.css'

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
            className={`${styles.micButton} ${isRecording ? styles.recording : ''} ${disabled ? styles.disabled : ''}`}
            onClick={handleClick}
            disabled={disabled}
            aria-label={isRecording ? 'Stop recording' : 'Start recording'}
        >
            <div className={styles.micIcon}>
                {isRecording ? '⏹' : '🎤'}
            </div>

            {isRecording && (
                <div className={styles.pulseRing} />
            )}
        </button>
    )
}

export default MicButton
