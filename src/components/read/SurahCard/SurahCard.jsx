import { Link } from 'react-router-dom'
import styles from './SurahCard.module.css'

/**
 * SurahCard Component
 * @param {object} surah - Surah data
 */
function SurahCard({ surah }) {
    return (
        <Link
            to={`/read/${surah.id}`}
            className={`${styles.card} card-hover`}
        >
            <div className={styles.number}>{surah.number}</div>

            <div className={styles.content}>
                <h3 className={`${styles.arabicName} arabic-text`}>
                    {surah.nameArabic}
                </h3>

                <h4 className={styles.englishName}>
                    {surah.nameEnglish}
                </h4>

                <p className={styles.translation}>
                    {surah.translation}
                </p>
            </div>

            <div className={styles.meta}>
                <span className={styles.type}>
                    {surah.revelationType}
                </span>
                <span className={styles.ayahCount}>
                    {surah.ayahCount} Ayahs
                </span>
            </div>
        </Link>
    )
}

export default SurahCard
