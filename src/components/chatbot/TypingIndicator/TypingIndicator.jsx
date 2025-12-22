import styles from './TypingIndicator.module.css'

function TypingIndicator() {
    return (
        <div className={styles.typingContainer}>
            <div className={styles.avatar}>🤖</div>
            <div className={styles.typingBubble}>
                <div className={styles.typingDots}>
                    <span className={`${styles.dot} typing-dot`}></span>
                    <span className={`${styles.dot} typing-dot`}></span>
                    <span className={`${styles.dot} typing-dot`}></span>
                </div>
            </div>
        </div>
    )
}

export default TypingIndicator
