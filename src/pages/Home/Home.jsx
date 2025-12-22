import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCurrentPage } from '@store/slices/uiSlice'
import { selectTotalAyahsLearned, selectTotalWordsLearned } from '@store/slices/learnSlice'
import styles from './Home.module.css'

function Home() {
    const dispatch = useDispatch()
    const totalAyahsLearned = useSelector(selectTotalAyahsLearned)
    const totalWordsLearned = useSelector(selectTotalWordsLearned)

    useEffect(() => {
        dispatch(setCurrentPage('home'))
    }, [dispatch])

    const featuredSurahs = [
        { id: 1, name: 'Al-Fatihah', translation: 'The Opening', ayahs: 7 },
        { id: 112, name: 'Al-Ikhlas', translation: 'The Sincerity', ayahs: 4 },
        { id: 113, name: 'Al-Falaq', translation: 'The Daybreak', ayahs: 5 },
        { id: 114, name: 'An-Nas', translation: 'Mankind', ayahs: 6 }
    ]

    const islamicQuotes = [
        { text: "The best of you are those who learn the Quran and teach it", source: "Prophet Muhammad (ﷺ)" },
        { text: "Read the Quran, for it will come as an intercessor for its reciter", source: "Prophet Muhammad (ﷺ)" }
    ]

    return (
        <div className={styles.home}>
            {/* Hero Section */}
            <div className={styles.hero}>
                <div className="container">
                    <h1 className={`${styles.title} gradient-text`}>
                        QuranLearnAI
                    </h1>
                    <p className={styles.subtitle}>
                        Learn the Holy Quran with AI-powered features
                    </p>
                    <p className={styles.description}>
                        Master Arabic pronunciation, understand meanings, and explore Tafseer
                    </p>

                    {/* Quick Start Buttons */}
                    <div className={styles.quickStart}>
                        <Link to="/read" className={styles.primaryButton}>
                            Start Reading
                        </Link>
                        <Link to="/learn" className={styles.secondaryButton}>
                            Begin Learning
                        </Link>
                    </div>
                </div>
            </div>

            {/* Statistics Overview */}
            <div className={styles.statsSection}>
                <div className="container">
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>📚</div>
                            <div className={styles.statValue}>114</div>
                            <div className={styles.statLabel}>Surahs Available</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>📖</div>
                            <div className={styles.statValue}>{totalAyahsLearned}</div>
                            <div className={styles.statLabel}>Ayahs Learned</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>🔤</div>
                            <div className={styles.statValue}>{totalWordsLearned}</div>
                            <div className={styles.statLabel}>Words Mastered</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>🎯</div>
                            <div className={styles.statValue}>
                                {totalAyahsLearned > 0 ? Math.round((totalAyahsLearned / 6236) * 100) : 0}%
                            </div>
                            <div className={styles.statLabel}>Overall Progress</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Modules */}
            <div className="container">
                <h2 className={styles.sectionTitle}>Explore Features</h2>
                <div className={styles.features}>
                    <Link to="/read" className={`${styles.featureCard} card-hover`}>
                        <div className={styles.featureIcon}>📖</div>
                        <h3>Read Qur'an</h3>
                        <p>Browse all 114 Surahs with translations</p>
                        <span className={styles.featureLink}>Start Reading →</span>
                    </Link>

                    <Link to="/learn" className={`${styles.featureCard} card-hover`}>
                        <div className={styles.featureIcon}>🎓</div>
                        <h3>Learn Qur'an</h3>
                        <p>Ayah-by-Ayah & Word-by-Word learning</p>
                        <span className={styles.featureLink}>Begin Learning →</span>
                    </Link>

                    <Link to="/pronunciation" className={`${styles.featureCard} card-hover`}>
                        <div className={styles.featureIcon}>🎤</div>
                        <h3>Pronunciation Assistant</h3>
                        <p>Perfect your recitation with AI feedback</p>
                        <span className={styles.featureLink}>Practice Now →</span>
                    </Link>

                    <Link to="/chatbot" className={`${styles.featureCard} card-hover`}>
                        <div className={styles.featureIcon}>💬</div>
                        <h3>Islamic Chatbot</h3>
                        <p>Ask questions about Quran & Tafseer</p>
                        <span className={styles.featureLink}>Ask Questions →</span>
                    </Link>
                </div>
            </div>

            {/* Featured Surahs */}
            <div className={styles.featuredSection}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Featured Surahs</h2>
                    <div className={styles.featuredSurahs}>
                        {featuredSurahs.map(surah => (
                            <Link
                                key={surah.id}
                                to={`/read/${surah.id}`}
                                className={styles.featuredSurahCard}
                            >
                                <div className={styles.surahNumber}>{surah.id}</div>
                                <h4>{surah.name}</h4>
                                <p className={styles.surahTranslation}>{surah.translation}</p>
                                <p className={styles.surahAyahs}>{surah.ayahs} Ayahs</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Islamic Quotes */}
            <div className={styles.quotesSection}>
                <div className="container">
                    <div className={styles.quoteCarousel}>
                        {islamicQuotes.map((quote, index) => (
                            <div key={index} className={styles.quoteCard}>
                                <div className={styles.quoteIcon}>🕌</div>
                                <blockquote className={styles.quoteText}>
                                    "{quote.text}"
                                </blockquote>
                                <p className={styles.quoteSource}>— {quote.source}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className={styles.ctaSection}>
                <div className="container">
                    <h2>Ready to Begin Your Journey?</h2>
                    <p>Start learning the Holy Quran today with our AI-powered platform</p>
                    <div className={styles.ctaButtons}>
                        <Link to="/learn" className={styles.ctaPrimary}>
                            Start Learning Now
                        </Link>
                        <Link to="/about" className={styles.ctaSecondary}>
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
