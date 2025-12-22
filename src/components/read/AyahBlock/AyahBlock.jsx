import { useState } from 'react'
import styles from './AyahBlock.module.css'

/**
 * AyahBlock Component - Display individual ayah with translations
 * @param {object} ayah - Ayah data
 * @param {number} index - Ayah index in list
 * @param {string} selectedLang - 'english' or 'urdu'
 * @param {boolean} showWordByWord - Show word-by-word mode
 */
function AyahBlock({ ayah, index, selectedLang, showWordByWord }) {
    const [hoveredWordIndex, setHoveredWordIndex] = useState(null)

    const translation = selectedLang === 'urdu'
        ? ayah.translationUrdu
        : ayah.translationEnglish

    return (
        <div className={styles.ayahBlock}>
            {/* Ayah Number Badge */}
            <div className={styles.ayahNumber}>
                <span className="arabic-text">{ayah.number}</span>
            </div>

            {/* Arabic Text */}
            <div className={styles.arabicSection}>
                {showWordByWord ? (
                    <div className={styles.wordByWord}>
                        {ayah.words?.map((word, idx) => (
                            <div
                                key={idx}
                                className={styles.wordContainer}
                                onMouseEnter={() => setHoveredWordIndex(idx)}
                                onMouseLeave={() => setHoveredWordIndex(null)}
                            >
                                <span className={`${styles.arabicWord} arabic-text`}>
                                    {word.arabic}
                                </span>
                                {hoveredWordIndex === idx && (
                                    <div className={styles.wordTooltip}>
                                        <span className={styles.tooltipTranslation}>
                                            {word.translation}
                                        </span>
                                        <span className={styles.tooltipTransliteration}>
                                            {word.transliteration}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className={`${styles.arabicText} arabic-text`}>
                        {ayah.textArabic}
                    </p>
                )}
            </div>

            {/* Translation */}
            <div className={styles.translationSection}>
                <p className={styles.translationText}>
                    {translation}
                </p>
            </div>

            {/* Audio Placeholder */}
            <div className={styles.actions}>
                <button className={styles.audioButton} disabled title="Audio coming soon">
                    🔊 Play Audio
                </button>
            </div>
        </div>
    )
}

export default AyahBlock
