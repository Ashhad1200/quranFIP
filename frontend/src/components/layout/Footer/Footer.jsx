import { Link } from 'react-router-dom'

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-dark-secondary border-t border-white/10 py-8">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Logo - Left */}
                <Link to="/" className="flex items-center gap-3 no-underline transition-transform duration-150 hover:scale-[1.02]">
                    <span className="flex items-center justify-center w-8 h-8 bg-lime-neon text-black font-bold text-lg rounded-lg">Q</span>
                    <span className="text-text-primary text-base font-bold tracking-wide">QURANLEARNAI</span>
                </Link>

                {/* Navigation Links - Center */}
                <nav className="flex flex-wrap justify-center gap-6">
                    <Link to="/read" className="text-text-secondary text-sm hover:text-lime-neon transition-colors">Read Qur'an</Link>
                    <Link to="/learn" className="text-text-secondary text-sm hover:text-lime-neon transition-colors">Learn Qur'an</Link>
                    <Link to="/pronunciation" className="text-text-secondary text-sm hover:text-lime-neon transition-colors">Pronunciation</Link>
                    <Link to="/chatbot" className="text-text-secondary text-sm hover:text-lime-neon transition-colors">Chatbot</Link>
                </nav>

                {/* Copyright - Right */}
                <p className="text-text-tertiary text-sm text-center md:text-right">
                    © {currentYear} QURANLEARNAI. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
