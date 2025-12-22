import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTotalAyahsLearned, selectTotalWordsLearned } from '@store/slices/learnSlice'
import styles from './LearnLanding.module.css'

function LearnLanding() {
  const totalAyahs = useSelector(selectTotalAyahsLearned)
  const totalWords = useSelector(selectTotalWordsLearned)

  // Sample ayahs for quick access (from our mock data)
  const sampleAyahs = [
    { id: 1, surahId: 1, surahName: 'Al-Fatihah', number: 1, preview: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
    { id: 2, surahId: 1, surahName: 'Al-Fatihah', number: 2, preview: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ' },
    { id: 3, surahId: 1, surahName: 'Al-Fatihah', number: 3, preview: 'الرَّحْمَٰنِ الرَّحِيمِ' },
    { id: 446, surahId: 112, surahName: 'Al-Ikhlas', number: 1, preview: 'قُلْ هُوَ اللَّهُ أَحَدٌ' },
  ]

  return (
    <div className={styles.learnLanding}>
      <div className={`container ${styles.container}`}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className="gradient-text">Learn the Holy Qur'an</h1>
          <p className={styles.subtitle}>
            Master Quranic Arabic word-by-word with interactive quizzes
          </p>
        </div>

        {/* Progress Stats */}
        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📖</div>
            <div className={styles.statValue}>{totalAyahs}</div>
            <div className={styles.statLabel}>Ayahs Learned</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🔤</div>
            <div className={styles.statValue}>{totalWords}</div>
            <div className={styles.statLabel}>Words Learned</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🎯</div>
            <div className={styles.statValue}>
              {totalAyahs > 0 ? Math.round((totalAyahs / 6236) * 100) : 0}%
            </div>
            <div className={styles.statLabel}>Progress</div>
          </div>
        </div>

        {/* Learning Modes */}
        <div className={styles.modesSection}>
          <h2>Choose Learning Mode</h2>

          <div className={styles.modeCards}>
            <div className={`${styles.modeCard} ${styles.modeAvailable}`}>
              <div className={styles.modeIcon}>📝</div>
              <h3>Ayah-by-Ayah Learning</h3>
              <p>Study complete verses with translations and take word-meaning quizzes</p>
              <span className={styles.modeBadge}>✅ Available (FYP-1)</span>
            </div>

            <div className={`${styles.modeCard} ${styles.modeComingSoon}`}>
              <div className={styles.modeIcon}>🔤</div>
              <h3>Word-by-Word Learning</h3>
              <p>Build your Arabic vocabulary by learning individual words</p>
              <span className={styles.modeBadge}>🔜 Coming in FYP-2</span>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className={styles.quickStart}>
          <h2>Quick Start - Practice These Ayahs</h2>
          <div className={styles.ayahList}>
            {sampleAyahs.map((ayah) => (
              <Link
                key={ayah.id}
                to={`/learn/ayah/${ayah.id}`}
                className={styles.ayahItem}
              >
                <div className={styles.ayahNumber}>
                  {ayah.surahName} - Ayah {ayah.number}
                </div>
                <div className={`${styles.ayahPreview} arabic-text`}>
                  {ayah.preview}
                </div>
                <div className={styles.ayahAction}>
                  Start Learning →
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className={styles.infoBox}>
          <div className={styles.infoIcon}>ℹ️</div>
          <div className={styles.infoContent}>
            <h3>How It Works</h3>
            <ol>
              <li>Select an ayah to study</li>
              <li>Read the Arabic text and translation</li>
              <li>Review word-by-word meanings</li>
              <li>Take a quiz to test your knowledge</li>
              <li>Track your progress as you learn!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearnLanding
