import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAyahById, selectCurrentAyah, selectTranslationLang } from '@store/slices/ayahSlice'
import Button from '@components/common/Button/Button'
import styles from './AyahLearning.module.css'

function AyahLearning() {
  const { ayahId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const ayah = useSelector(selectCurrentAyah)
  const selectedLang = useSelector(selectTranslationLang)

  useEffect(() => {
    dispatch(fetchAyahById(ayahId))
  }, [dispatch, ayahId])

  const handleStartQuiz = () => {
    navigate(`/quiz/ayah/${ayahId}`)
  }

  if (!ayah) {
    return (
      <div className={styles.loading}>
        <div className="spinner" />
        <p>Loading Ayah...</p>
      </div>
    )
  }

  const translation = selectedLang === 'urdu'
    ? ayah.translationUrdu
    : ayah.translationEnglish

  return (
    <div className={styles.ayahLearning}>
      <div className={`container ${styles.container}`}>
        {/* Back Link */}
        <Link to="/learn" className={styles.backLink}>
          ← Back to Learn
        </Link>

        {/* Header */}
        <div className={styles.header}>
          <h1 className="gradient-text">Learn Ayah</h1>
          <p className={styles.subtitle}>
            Study this ayah carefully before taking the quiz
          </p>
        </div>

        {/* Ayah Display Card */}
        <div className={styles.ayahCard}>
          {/* Arabic Text */}
          <div className={styles.arabicSection}>
            <div className={styles.sectionLabel}>Arabic Text</div>
            <p className={`${styles.arabicText} arabic-text`}>
              {ayah.textArabic}
            </p>
          </div>

          {/* Translation */}
          <div className={styles.translationSection}>
            <div className={styles.sectionLabel}>
              Translation ({selectedLang === 'english' ? 'English' : 'Urdu'})
            </div>
            <p className={styles.translationText}>
              {translation}
            </p>
          </div>

          {/* Words List */}
          {ayah.words && ayah.words.length > 0 && (
            <div className={styles.wordsSection}>
              <div className={styles.sectionLabel}>Word-by-Word Meanings</div>
              <div className={styles.wordsList}>
                {ayah.words.map((word, idx) => (
                  <div key={idx} className={styles.wordItem}>
                    <div className={`${styles.wordArabic} arabic-text`}>
                      {word.arabic}
                    </div>
                    <div className={styles.wordMeaning}>
                      {word.translation}
                    </div>
                    <div className={styles.wordTranslit}>
                      {word.transliteration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Learning Tips */}
        <div className={styles.tipsCard}>
          <div className={styles.tipsIcon}>💡</div>
          <div className={styles.tipsContent}>
            <h3>Learning Tips</h3>
            <ul>
              <li>Read the Arabic text carefully</li>
              <li>Understand the translation</li>
              <li>Review each word's meaning</li>
              <li>Try to connect words with the overall meaning</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Button variant="secondary" size="large" onClick={() => navigate(-1)}>
            « Previous Ayah
          </Button>
          <Button variant="primary" size="large" onClick={handleStartQuiz}>
            Start Quiz »
          </Button>
        </div>

        {/* Progress Note */}
        <div className={styles.progressNote}>
          <p>
            📚 After completing the quiz, this ayah will be marked as studied in your progress.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AyahLearning
