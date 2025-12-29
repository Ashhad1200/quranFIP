import { useEffect, useState } from 'react'
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

    const faqData = [
        {
            question: "How does Ayah learning work?",
            answer: "Our platform breaks down each Ayah word-by-word, showing you the Arabic text, transliteration, and translation. You can study at your own pace and test your knowledge with interactive quizzes."
        },
        {
            question: "How accurate is the pronunciation checker?",
            answer: "Our AI-powered pronunciation checker uses advanced speech recognition technology to provide real-time feedback on your Qur'anic recitation with high accuracy."
        },
        {
            question: "Is the chatbot information authentic?",
            answer: "Yes, all information provided by our Islamic chatbot is sourced from authentic Tafseer texts and verified Islamic sources to ensure accuracy."
        },
        {
            question: "Is this platform free to use?",
            answer: "Yes! QURANLEARNAI is completely free to use. We believe Qur'an education should be accessible to everyone, with no subscriptions or hidden costs."
        }
    ]

    const [expandedFaq, setExpandedFaq] = useState(0)

    return (
        <div className={styles.home}>
            {/* Hero Section */}
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>
                        Learn the Qur'an
                    </h1>
                    <p className={styles.tagline}>
                        Your Journey Starts Here
                    </p>
                    <p className={styles.description}>
                        Master Qur'anic Arabic with AI-powered tools. Read, learn, and perfect<br />
                        your pronunciation with authentic Islamic guidance.
                    </p>

                    {/* Two CTA Buttons */}
                    <div className={styles.heroButtons}>
                        <Link to="/learn" className={styles.primaryButton}>
                            Start Learning <span className={styles.arrow}>›</span>
                        </Link>
                        <Link to="/read" className={styles.secondaryButton}>
                            Read Quran <span className={styles.arrow}>›</span>
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

            {/* Four Powerful Learning Modules */}
            <div className={styles.modulesSection}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Four Powerful Learning Modules</h2>
                    <p className={styles.sectionSubtitle}>
                        Everything you need to understand and memorize the Qur'an
                    </p>

                    <div className={styles.modulesGrid}>
                        <Link to="/read" className={styles.moduleCard} data-number="01">
                            <div className={styles.moduleIconBox}>📖</div>
                            <span className={styles.moduleNumber}>01</span>
                            <h3 className={styles.moduleTitle}>Read Qur'an</h3>
                            <p className={styles.moduleDescription}>
                                Access all 114 Surahs with translations in English and Urdu. Beautiful interface for reading and reflection.
                            </p>
                            <span className={styles.moduleLink}>Start Reading ›</span>
                        </Link>

                        <Link to="/learn" className={styles.moduleCard} data-number="02">
                            <div className={styles.moduleIconBox}>🎓</div>
                            <span className={styles.moduleNumber}>02</span>
                            <h3 className={styles.moduleTitle}>Learn Qur'an</h3>
                            <p className={styles.moduleDescription}>
                                Ayah-by-Ayah and Word-by-Word learning with interactive quizzes. Master meanings at your own pace.
                            </p>
                            <span className={styles.moduleLink}>Start Learning ›</span>
                        </Link>

                        <Link to="/pronunciation" className={styles.moduleCard} data-number="03">
                            <div className={styles.moduleIconBox}>🎤</div>
                            <span className={styles.moduleNumber}>03</span>
                            <h3 className={styles.moduleTitle}>Pronunciation Assistant</h3>
                            <p className={styles.moduleDescription}>
                                AI-powered pronunciation checker. Practice and perfect your recitation with instant feedback.
                            </p>
                            <span className={styles.moduleLink}>Check Pronunciation ›</span>
                        </Link>

                        <Link to="/chatbot" className={styles.moduleCard} data-number="04">
                            <div className={styles.moduleIconBox}>💬</div>
                            <span className={styles.moduleNumber}>04</span>
                            <h3 className={styles.moduleTitle}>Islamic Chatbot</h3>
                            <p className={styles.moduleDescription}>
                                RAG-based chatbot for authentic Islamic knowledge. Ask questions about Tafseer, meanings, and more.
                            </p>
                            <span className={styles.moduleLink}>Ask the Chatbot ›</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* About QURANLEARNAI Section */}
            <div className={styles.aboutSection}>
                <div className="container">
                    <div className={styles.aboutGrid}>
                        {/* Left side - Image with decorative frame */}
                        <div className={styles.aboutImageWrapper}>
                            <div className={styles.aboutImageFrame}>
                                <img
                                    src="/assets/hero-bg.png"
                                    alt="Mosque at night"
                                    className={styles.aboutImage}
                                />
                            </div>
                            {/* Decorative dots */}
                            <div className={styles.decorativeDots}></div>
                        </div>

                        {/* Right side - Content */}
                        <div className={styles.aboutContent}>
                            <h2 className={styles.aboutTitle}>About QURANLEARNAI</h2>
                            <p className={styles.aboutDescription}>
                                QURANLEARNAI is a modern platform designed to make Qur'an learning accessible, engaging, and effective for beginners and advanced learners alike.
                            </p>

                            <ul className={styles.featuresList}>
                                <li>
                                    <span className={styles.checkIcon}>✓</span>
                                    <div>
                                        <strong>Beginner-Friendly:</strong> Start from basics with word-by-word breakdowns
                                    </div>
                                </li>
                                <li>
                                    <span className={styles.checkIcon}>✓</span>
                                    <div>
                                        <strong>Authentic Sources:</strong> All content verified from classical Tafseer texts
                                    </div>
                                </li>
                                <li>
                                    <span className={styles.checkIcon}>✓</span>
                                    <div>
                                        <strong>AI-Powered:</strong> Advanced technology for pronunciation and learning
                                    </div>
                                </li>
                                <li>
                                    <span className={styles.checkIcon}>✓</span>
                                    <div>
                                        <strong>Free Forever:</strong> No subscriptions, no hidden costs
                                    </div>
                                </li>
                            </ul>

                            <Link to="/about" className={styles.exploreButton}>
                                EXPLORE
                            </Link>
                        </div>
                    </div>
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

            {/* FAQ Section */}
            <div className={styles.faqSection}>
                <div className="container">
                    <div className={styles.faqGrid}>
                        {/* Left side - FAQ Accordion */}
                        <div className={styles.faqContent}>
                            <h2 className={styles.faqTitle}>Frequently<br />asked questions</h2>

                            <div className={styles.faqAccordion}>
                                {faqData.map((faq, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.faqItem} ${expandedFaq === index ? styles.expanded : ''}`}
                                        onClick={() => setExpandedFaq(expandedFaq === index ? -1 : index)}
                                    >
                                        <div className={styles.faqQuestion}>
                                            <span>{faq.question}</span>
                                            <span className={styles.faqToggle}>+</span>
                                        </div>
                                        {expandedFaq === index && (
                                            <div className={styles.faqAnswer}>
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right side - Chatbot Card */}
                        <div className={styles.faqSidebar}>
                            <div className={styles.chatbotCard}>
                                <div className={styles.chatbotIcon}>💬</div>
                                <h3>Do you have more questions?</h3>
                                <p>End-to-end payments and financial management in a single solution. Meet the right platform to help realize.</p>
                                <Link to="/chatbot" className={styles.askChatbotBtn}>
                                    Ask Chatbot
                                </Link>
                            </div>
                        </div>
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
