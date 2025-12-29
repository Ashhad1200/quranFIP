import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Logo - Left */}
                <Link to="/" className={styles.logo}>
                    <span className={styles.logoIcon}>Q</span>
                    <span className={styles.logoText}>QURANLEARNAI</span>
                </Link>

                {/* Navigation Links - Center */}
                <nav className={styles.navLinks}>
                    <Link to="/read">Read Qur'an</Link>
                    <Link to="/learn">Learn Qur'an</Link>
                    <Link to="/pronunciation">Pronunciation</Link>
                    <Link to="/chatbot">Chatbot</Link>
                </nav>

                {/* Copyright - Right */}
                <p className={styles.copyright}>
                    © {currentYear} QURANLEARNAI. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
