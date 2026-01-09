import { Link } from 'react-router-dom'

/**
 * SurahCard Component
 * @param {object} surah - Surah data
 */
function SurahCard({ surah }) {
    return (
        <Link
            to={`/read/${surah.id}`}
            className="flex items-center gap-4 p-5 bg-dark-card border border-lime-neon/20 rounded-xl no-underline transition-all duration-300 hover:border-lime-neon hover:-translate-y-1 hover:shadow-glow-sm group"
        >
            {/* Green Number Circle - Left */}
            <div className="w-12 h-12 bg-lime-neon/10 rounded-xl flex items-center justify-center text-lime-neon font-bold text-lg shrink-0 transition-all duration-300 group-hover:bg-lime-neon group-hover:text-black">
                {surah.number}
            </div>

            {/* Main Content - Center/Left */}
            <div className="flex-1 min-w-0">
                <h3 className="text-text-primary font-semibold text-base m-0 mb-1">
                    {surah.nameEnglish}
                </h3>
                <p className="text-text-tertiary text-sm m-0 mb-1">
                    {surah.translation}
                </p>
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <span className="uppercase tracking-wider">
                        {surah.revelationType}
                    </span>
                    <span className="text-text-tertiary">•</span>
                    <span>
                        {surah.ayahCount} Ayahs
                    </span>
                </div>
            </div>

            {/* Arabic Name - Right */}
            <h3 className="arabic-text text-text-primary text-2xl m-0 shrink-0">
                {surah.nameArabic}
            </h3>
        </Link>
    )
}

export default SurahCard
