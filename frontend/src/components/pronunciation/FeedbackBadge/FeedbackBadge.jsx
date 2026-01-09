/**
 * FeedbackBadge Component - Display pronunciation feedback
 * @param {object} feedback - { score, level: 'good'|'intermediate'|'wrong', feedback }
 */
function FeedbackBadge({ feedback }) {
    if (!feedback) return null

    const { score, level, feedback: message } = feedback

    const levelConfig = {
        good: { color: 'text-success', bg: 'bg-success/10', border: 'border-success', icon: '✓', label: 'Good' },
        intermediate: { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning', icon: '~', label: 'Intermediate' },
        wrong: { color: 'text-error', bg: 'bg-error/10', border: 'border-error', icon: '✗', label: 'Wrong' }
    }

    const config = levelConfig[level] || levelConfig.intermediate

    return (
        <div className={`p-8 rounded-2xl ${config.bg} border ${config.border} text-center space-y-6`}>
            {/* Badge */}
            <div className="flex items-center justify-center gap-3">
                <div className={`text-4xl ${config.color}`}>{config.icon}</div>
                <div className={`text-2xl font-bold ${config.color}`}>{config.label}</div>
            </div>

            {/* Score Circle */}
            <div className="relative w-[120px] h-[120px] mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle
                        className="text-dark-tertiary"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="52"
                        cx="60"
                        cy="60"
                    />
                    <circle
                        className={config.color}
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="52"
                        cx="60"
                        cy="60"
                        strokeLinecap="round"
                        style={{
                            strokeDasharray: `${2 * Math.PI * 52}`,
                            strokeDashoffset: `${2 * Math.PI * 52 * (1 - score / 100)}`
                        }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-3xl font-bold ${config.color}`}>{score}</span>
                    <span className={`text-lg ${config.color}`}>%</span>
                </div>
            </div>

            {/* Message */}
            {message && (
                <div className="text-text-secondary text-sm">
                    {message}
                </div>
            )}
        </div>
    )
}

export default FeedbackBadge
