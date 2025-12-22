import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSurahs, selectFilteredSurahs, selectSurahLoading, setSearchQuery, selectSearchQuery } from '@store/slices/surahSlice'
import { setCurrentPage } from '@store/slices/uiSlice'
import SurahCard from '@components/read/SurahCard/SurahCard'
import styles from './SurahGrid.module.css'

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
        <div className={styles.surahGrid}>
            <div className={`container ${styles.container}`}>
                {/* Header */}
                <div className={styles.header}>
                    <h1 className="gradient-text">Read the Holy Qur'an</h1>
                    <p className={styles.subtitle}>
                        Browse all 114 Surahs with English and Urdu translations
                    </p>
                </div>

                {/* Search Bar */}
                <div className={styles.searchContainer}>
                    <div className={styles.searchWrapper}>
                        <span className={styles.searchIcon}>🔍</span>
                        <input
                            type="text"
                            placeholder="Search by surah name, number, or translation..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        {searchQuery && (
                            <button
                                className={styles.clearButton}
                                onClick={() => dispatch(setSearchQuery(''))}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className={styles.loadingGrid}>
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className={`${styles.skeletonCard} skeleton`} />
                        ))}
                    </div>
                )}

                {/* Surah Grid */}
                {!loading && surahs.length > 0 && (
                    <div className={styles.grid}>
                        {surahs.map((surah) => (
                            <SurahCard key={surah.id} surah={surah} />
                        ))}
                    </div>
                )}

                {/* No Results */}
                {!loading && surahs.length === 0 && searchQuery && (
                    <div className={styles.noResults}>
                        <p>No surahs found for "{searchQuery}"</p>
                        <button
                            className={styles.resetButton}
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
