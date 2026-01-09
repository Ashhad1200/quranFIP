import classNames from 'classnames'

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
    const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 cursor-pointer border-none outline-none"

    const variants = {
        primary: "bg-lime-neon text-black hover:bg-lime-light hover:shadow-glow-md",
        secondary: "bg-transparent text-lime-neon border-2 border-lime-neon hover:bg-lime-neon/10",
        ghost: "bg-transparent text-text-secondary hover:text-lime-neon hover:bg-lime-neon/10",
        icon: "bg-dark-tertiary text-text-primary hover:bg-lime-neon/10 hover:text-lime-neon"
    }

    const sizes = {
        small: "px-4 py-2 text-sm",
        medium: "px-6 py-3 text-base",
        large: "px-8 py-4 text-lg"
    }

    const buttonClasses = classNames(
        baseStyles,
        variants[variant],
        sizes[size],
        {
            'opacity-50 cursor-not-allowed': disabled || loading,
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
            {loading && <span className="animate-spin">⏳</span>}
            <span className={loading ? 'opacity-0' : ''}>{children}</span>
        </button>
    )
}

export default Button
