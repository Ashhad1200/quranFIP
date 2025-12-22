import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { toggleDrawer, selectDrawerOpen, setNavbarShrunk } from '@store/slices/uiSlice'
import styles from './Navbar.module.css'

function Navbar() {
    const dispatch = useDispatch()
    const location = useLocation()
    const drawerOpen = useSelector(selectDrawerOpen)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50
            setScrolled(isScrolled)
            dispatch(setNavbarShrunk(isScrolled))
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [dispatch])

    const handleDrawerToggle = () => {
        dispatch(toggleDrawer())
    }

    const isHome = location.pathname === '/'

    return (
        <>
            <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
                <div className={styles.container}>
                    {/* Menu Icon */}
                    <button
                        className={styles.menuButton}
                        onClick={handleDrawerToggle}
                        aria-label="Toggle menu"
                    >
                        <div className={styles.hamburger}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>

                    {/* Logo */}
                    <Link to="/" className={styles.logo}>
                        <span className="gradient-text">QuranLearnAI</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className={`${styles.navLinks} mobile-hidden`}>
                        <Link to="/read" className={styles.navLink}>Read</Link>
                        <Link to="/learn" className={styles.navLink}>Learn</Link>
                        <Link to="/pronunciation" className={styles.navLink}>Pronunciation</Link>
                        <Link to="/chatbot" className={styles.navLink}>Chatbot</Link>
                    </div>
                </div>
            </nav>

            {/* Drawer */}
            <div className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''}`}>
                <div className={styles.drawerContent}>
                    <div className={styles.drawerHeader}>
                        <h2 className="gradient-text">Menu</h2>
                        <button
                            className={styles.closeButton}
                            onClick={handleDrawerToggle}
                            aria-label="Close menu"
                        >
                            ✕
                        </button>
                    </div>

                    <nav className={styles.drawerNav}>
                        <Link to="/" className={styles.drawerLink} onClick={handleDrawerToggle}>
                            <span className={styles.drawerIcon}>🏠</span>
                            Home
                        </Link>
                        <Link to="/read" className={styles.drawerLink} onClick={handleDrawerToggle}>
                            <span className={styles.drawerIcon}>📖</span>
                            Read Qur'an
                        </Link>
                        <Link to="/learn" className={styles.drawerLink} onClick={handleDrawerToggle}>
                            <span className={styles.drawerIcon}>🎓</span>
                            Learn Qur'an
                        </Link>
                        <Link to="/pronunciation" className={styles.drawerLink} onClick={handleDrawerToggle}>
                            <span className={styles.drawerIcon}>🎤</span>
                            Pronunciation
                        </Link>
                        <Link to="/chatbot" className={styles.drawerLink} onClick={handleDrawerToggle}>
                            <span className={styles.drawerIcon}>💬</span>
                            Chatbot
                        </Link>
                        <Link to="/about" className={styles.drawerLink} onClick={handleDrawerToggle}>
                            <span className={styles.drawerIcon}>ℹ️</span>
                            About
                        </Link>
                        <Link to="/faq" className={styles.drawerLink} onClick={handleDrawerToggle}>
                            <span className={styles.drawerIcon}>❓</span>
                            FAQ
                        </Link>
                    </nav>
                </div>
            </div>

            {/* Overlay */}
            {drawerOpen && (
                <div
                    className={styles.overlay}
                    onClick={handleDrawerToggle}
                />
            )}
        </>
    )
}

export default Navbar
