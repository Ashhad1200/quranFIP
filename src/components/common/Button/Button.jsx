import classNames from 'classnames'
import styles from './Button.module.css'

/**
 * Reusable Button Component
 * @param {string} variant - 'primary' | 'secondary' | 'ghost' | 'icon'
 * @param {string} size - 'small' | 'medium' | 'large'
 * @param {boolean} disabled - Disabled state
 * @param {boolean} loading - Loading state
 * @param {React.ReactNode} children - Button content
 * @param {string} className - Additional CSS classes
 * @param {function} onClick - Click handler
 */
function Button({
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    children,
    className,
    onClick,
    ...props
}) {
    const buttonClasses = classNames(
        styles.button,
        styles[variant],
        styles[size],
        {
            [styles.disabled]: disabled,
            [styles.loading]: loading,
            'button-hover': !disabled && !loading
        },
        className
    )

    return (
        <button
            className={buttonClasses}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading && <span className={styles.spinner} />}
            <span className={loading ? styles.hiddenContent : ''}>{children}</span>
        </button>
    )
}

export default Button
