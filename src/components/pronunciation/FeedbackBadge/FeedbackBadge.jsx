import styles from './FeedbackBadge.module.css'

/**
 * FeedbackBadge Component - Display pronunciation feedback
 * @param {object} feedback - { score, level: 'good'|'intermediate'|'wrong', feedback }
 */
function FeedbackBadge({ feedback }) {
    if (!feedback) return null

    const { score, level, feedback: message } = feedback

    const getBadgeClass = () => {
        switch (level) {
            case 'good':
                return styles.good
            case 'intermediate':
                return styles.intermediate
            case 'wrong':
                return styles.wrong
            default:
                return ''
        }
    }

    const getIcon = () => {
        switch (level) {
            case 'good':
                return '✓'
            case 'intermediate':
                return '~'
            case 'wrong':
                return '✗'
            default:
                return ''
        }
    }

    const getLabel = () => {
        switch (level) {
            case 'good':
                return 'Good'
            case 'intermediate':
                return 'Intermediate'
            case 'wrong':
                return 'Wrong'
            default:
                return ''
        }
    }

    return (
        <div className={`${styles.feedbackContainer} ${getBadgeClass()}`}>
            <div className={styles.badge}>
                <div className={styles.badgeIcon}>{getIcon()}</div>
                <div className={styles.badgeLabel}>{getLabel()}</div>
            </div>

            <div className={styles.scoreSection}>
                <div className={styles.scoreCircle}>
                    <svg className={styles.progressRing} width="120" height="120">
                        <circle
                            className={styles.progressRingCircle}
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            r="52"
                            cx="60"
                            cy="60"
                            style={{
                                strokeDasharray: `${2 * Math.PI * 52}`,
                                strokeDashoffset: `${2 * Math.PI * 52 * (1 - score / 100)}`
                            }}
                        />
                    </svg>
                    <div className={styles.scoreText}>
                        <span className={styles.scoreValue}>{score}</span>
                        <span className={styles.scorePercent}>%</span>
                    </div>
                </div>
            </div>

            {message && (
                <div className={styles.feedbackMessage}>
                    {message}
                </div>
            )}
        </div>
    )
}

export default FeedbackBadge
