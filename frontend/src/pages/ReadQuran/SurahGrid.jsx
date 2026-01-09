import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchSurahs, selectFilteredSurahs, selectSurahLoading, setSearchQuery, selectSearchQuery } from '@store/slices/surahSlice'
import { setCurrentPage } from '@store/slices/uiSlice'
import SurahCard from '@components/read/SurahCard/SurahCard'

function SurahGrid() {
    const dispatch = useDispatch()
    const surahs = useSelector(selectFilteredSurahs)
    const loading = useSelector(selectSurahLoading)
    const searchQuery = useSelector(selectSearchQuery)

    useEffect(() => {
        dispatch(setCurrentPage('read'))
        dispatch(fetchSurahs())
    }, [dispatch])

    const handleSearch = (e) => {
        dispatch(setSearchQuery(e.target.value))
    }

    return (
        <div className="min-h-screen py-12">
            <div className="container p-4">
                {/* Back Button */}
                <Link to="/" className="inline-flex items-center gap-2 text-text-secondary no-underline text-sm mb-8 transition-colors duration-200 hover:text-lime-neon">
                    ← Back to Home
                </Link>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-5xl md:text-4xl sm:text-3xl font-bold text-text-primary mb-3">Read the Qur'an</h1>
                    <p className="text-base text-text-secondary mb-12">
                        Select a Surah to begin reading with translations
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-[500px] mb-12">
                    <div className="relative flex items-center">
                        <span className="absolute left-4 text-lg pointer-events-none">🔍</span>
                        <input
                            type="text"
                            placeholder="Search by Surah name or number..."
                            className="w-full py-4 px-12 bg-dark-card border-2 border-lime-neon/20 rounded-xl text-text-primary text-base transition-all duration-150 focus:border-lime-neon focus:shadow-glow-sm placeholder:text-text-tertiary"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        {searchQuery && (
                            <button
                                className="absolute right-4 bg-transparent border-none text-text-secondary cursor-pointer text-xl p-2 transition-all duration-150 hover:text-lime-neon hover:rotate-90"
                                onClick={() => dispatch(setSearchQuery(''))}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="skeleton h-[200px] rounded-xl" />
                        ))}
                    </div>
                )}

                {/* Surah Grid */}
                {!loading && surahs.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-page-enter">
                        {surahs.map((surah) => (
                            <SurahCard key={surah.id} surah={surah} />
                        ))}
                    </div>
                )}

                {/* No Results */}
                {!loading && surahs.length === 0 && searchQuery && (
                    <div className="text-center py-16 px-4 text-text-secondary">
                        <p className="text-lg mb-4">No surahs found for "{searchQuery}"</p>
                        <button
                            className="py-3 px-6 bg-lime-neon text-dark-primary border-none rounded-lg text-base font-medium cursor-pointer transition-all duration-150 hover:bg-lime-light hover:shadow-glow-md"
                            onClick={() => dispatch(setSearchQuery(''))}
                        >
                            Clear Search
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SurahGrid
