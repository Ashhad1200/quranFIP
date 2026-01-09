import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { toggleDrawer, selectDrawerOpen, setNavbarShrunk } from '@store/slices/uiSlice'

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

    const navLinkBase = "text-text-secondary no-underline font-medium relative transition-colors duration-150 hover:text-lime-neon"
    const navLinkActive = "text-lime-neon"

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 h-16 z-fixed transition-all duration-base ease-out ${scrolled ? 'h-14 bg-dark-primary/90 backdrop-blur-[20px] border-b border-lime-neon/10 shadow-glow-sm' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-8 relative">
                    {/* Logo - Left */}
                    <Link to="/" className="flex items-center gap-3 no-underline transition-transform duration-150 hover:scale-[1.02]">
                        <span className="flex items-center justify-center w-8 h-8 bg-lime-neon text-black font-bold text-lg rounded-lg">Q</span>
                        <span className="text-text-primary text-base font-bold tracking-wide">QURANLEARNAI</span>
                    </Link>

                    {/* Centered Navigation Links */}
                    <div className="hidden md:flex gap-6 items-center">
                        <Link to="/" className={`${navLinkBase} ${location.pathname === '/' ? navLinkActive : ''}`}>
                            Home
                        </Link>
                        <Link to="/read" className={`${navLinkBase} ${location.pathname === '/read' || location.pathname.startsWith('/surah') ? navLinkActive : ''}`}>
                            Read Qur'an
                        </Link>
                        <Link to="/learn" className={`${navLinkBase} ${location.pathname.startsWith('/learn') ? navLinkActive : ''}`}>
                            Learn Qur'an
                        </Link>
                        <Link to="/pronunciation" className={`${navLinkBase} ${location.pathname === '/pronunciation' ? navLinkActive : ''}`}>
                            Pronunciation
                        </Link>
                        <Link to="/chatbot" className={`${navLinkBase} ${location.pathname === '/chatbot' ? navLinkActive : ''}`}>
                            Chatbot
                        </Link>
                        <Link to="/about" className={`${navLinkBase} ${location.pathname === '/about' ? navLinkActive : ''}`}>
                            About
                        </Link>
                        <Link to="/faq" className={`${navLinkBase} ${location.pathname === '/faq' ? navLinkActive : ''}`}>
                            FAQ
                        </Link>
                    </div>

                    {/* Mobile Menu Button Only */}
                    <button
                        className="md:hidden bg-none border-none cursor-pointer p-2 flex items-center justify-center transition-transform duration-150 hover:scale-110"
                        onClick={handleDrawerToggle}
                        aria-label="Toggle menu"
                    >
                        <div className="flex flex-col gap-1 w-6">
                            <span className="block h-0.5 w-full bg-lime-neon rounded-sm transition-all duration-150"></span>
                            <span className="block h-0.5 w-full bg-lime-neon rounded-sm transition-all duration-150"></span>
                            <span className="block h-0.5 w-full bg-lime-neon rounded-sm transition-all duration-150"></span>
                        </div>
                    </button>
                </div>
            </nav>

            {/* Drawer */}
            <div className={`fixed top-0 left-0 bottom-0 w-[280px] max-w-[85vw] bg-glass-bg-strong backdrop-blur-[20px] border-r border-lime-neon/20 z-[1051] overflow-y-auto transition-transform duration-base ease-out ${drawerOpen ? 'translate-x-0 animate-slide-in-left' : '-translate-x-full'}`}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="gradient-text text-3xl m-0">Menu</h2>
                        <button
                            className="bg-none border-none text-3xl text-lime-neon cursor-pointer p-2 leading-none transition-transform duration-150 hover:rotate-90"
                            onClick={handleDrawerToggle}
                            aria-label="Close menu"
                        >
                            ✕
                        </button>
                    </div>

                    <nav className="flex flex-col gap-2">
                        <Link to="/" className="flex items-center gap-3 p-4 text-text-primary no-underline rounded-lg transition-all duration-150 font-medium hover:bg-lime-neon/10 hover:text-lime-neon hover:translate-x-1" onClick={handleDrawerToggle}>
                            <span className="text-xl min-w-[24px]">🏠</span>
                            Home
                        </Link>
                        <Link to="/read" className="flex items-center gap-3 p-4 text-text-primary no-underline rounded-lg transition-all duration-150 font-medium hover:bg-lime-neon/10 hover:text-lime-neon hover:translate-x-1" onClick={handleDrawerToggle}>
                            <span className="text-xl min-w-[24px]">📖</span>
                            Read Qur'an
                        </Link>
                        <Link to="/learn" className="flex items-center gap-3 p-4 text-text-primary no-underline rounded-lg transition-all duration-150 font-medium hover:bg-lime-neon/10 hover:text-lime-neon hover:translate-x-1" onClick={handleDrawerToggle}>
                            <span className="text-xl min-w-[24px]">🎓</span>
                            Learn Qur'an
                        </Link>
                        <Link to="/pronunciation" className="flex items-center gap-3 p-4 text-text-primary no-underline rounded-lg transition-all duration-150 font-medium hover:bg-lime-neon/10 hover:text-lime-neon hover:translate-x-1" onClick={handleDrawerToggle}>
                            <span className="text-xl min-w-[24px]">🎤</span>
                            Pronunciation
                        </Link>
                        <Link to="/chatbot" className="flex items-center gap-3 p-4 text-text-primary no-underline rounded-lg transition-all duration-150 font-medium hover:bg-lime-neon/10 hover:text-lime-neon hover:translate-x-1" onClick={handleDrawerToggle}>
                            <span className="text-xl min-w-[24px]">💬</span>
                            Chatbot
                        </Link>
                        <Link to="/about" className="flex items-center gap-3 p-4 text-text-primary no-underline rounded-lg transition-all duration-150 font-medium hover:bg-lime-neon/10 hover:text-lime-neon hover:translate-x-1" onClick={handleDrawerToggle}>
                            <span className="text-xl min-w-[24px]">ℹ️</span>
                            About
                        </Link>
                        <Link to="/faq" className="flex items-center gap-3 p-4 text-text-primary no-underline rounded-lg transition-all duration-150 font-medium hover:bg-lime-neon/10 hover:text-lime-neon hover:translate-x-1" onClick={handleDrawerToggle}>
                            <span className="text-xl min-w-[24px]">❓</span>
                            FAQ
                        </Link>
                    </nav>
                </div>
            </div>

            {/* Overlay */}
            {drawerOpen && (
                <div
                    className="fixed inset-0 bg-black/70 z-modal animate-fade-in"
                    onClick={handleDrawerToggle}
                />
            )}
        </>
    )
}

export default Navbar
