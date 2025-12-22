import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSurahById, selectCurrentSurah, selectSurahLoading } from '@store/slices/surahSlice'
import { fetchAyahsBySurah, selectAyahsBySurah, selectTranslationLang, selectWordByWordMode, toggleTranslation, toggleWordByWord } from '@store/slices/ayahSlice'
import { setCurrentPage } from '@store/slices/uiSlice'
import AyahBlock from '@components/read/AyahBlock/AyahBlock'
import Button from '@components/common/Button/Button'
import styles from './SurahDetail.module.css'

function SurahDetail() {
  const { surahId } = useParams()
  const dispatch = useDispatch()

  const surah = useSelector(selectCurrentSurah)
  const ayahs = useSelector(selectAyahsBySurah(parseInt(surahId)))
  const loading = useSelector(selectSurahLoading)
  const selectedLang = useSelector(selectTranslationLang)
  const wordByWordMode = useSelector(selectWordByWordMode)

  useEffect(() => {
    dispatch(setCurrentPage('read'))
    dispatch(fetchSurahById(surahId))
    dispatch(fetchAyahsBySurah(surahId))
  }, [dispatch, surahId])

  const handleTranslationToggle = (lang) => {
    dispatch(toggleTranslation(lang))
  }

  const handleWordByWordToggle = () => {
    dispatch(toggleWordByWord())
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className="spinner" />
        <p>Loading Surah...</p>
      </div>
    )
  }

  if (!surah) {
    return (
      <div className={styles.notFound}>
        <h1>Surah Not Found</h1>
        <Link to="/read">
          <Button variant="primary">Back to Surahs</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.surahDetail}>
      <div className={`container ${styles.container}`}>
        {/* Back Button */}
        <Link to="/read" className={styles.backLink}>
          ← Back to Surahs
        </Link>

        {/* Surah Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={`${styles.arabicName} arabic-text`}>
              {surah.nameArabic}
            </h1>
            <h2 className={styles.englishName}>
              {surah.nameEnglish}
            </h2>
            <p className={styles.subtitle}>
              {surah.translation}
            </p>
            <div className={styles.meta}>
              <span className={styles.metaBadge}>
                📖 Surah {surah.number}
              </span>
              <span className={styles.metaBadge}>
                {surah.revelationType === 'Meccan' ? '🕋' : '🕌'} {surah.revelationType}
              </span>
              <span className={styles.metaBadge}>
                📝 {surah.ayahCount} Ayahs
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          {/* Translation Toggle */}
          <div className={styles.translationToggle}>
            <span className={styles.controlLabel}>Translation:</span>
            <div className={styles.toggleButtons}>
              <button
                className={`${styles.toggleButton} ${selectedLang === 'english' ? styles.active : ''}`}
                onClick={() => handleTranslationToggle('english')}
              >
                English
              </button>
              <button
                className={`${styles.toggleButton} ${selectedLang === 'urdu' ? styles.active : ''}`}
                onClick={() => handleTranslationToggle('urdu')}
              >
                Urdu
              </button>
            </div>
          </div>

          {/* Word-by-Word Toggle */}
          <div className={styles.wordByWordToggle}>
            <label className={styles.switchLabel}>
              <input
                type="checkbox"
                checked={wordByWordMode}
                onChange={handleWordByWordToggle}
                className={styles.switchInput}
              />
              <span className={styles.switch}>
                <span className={styles.switchSlider}></span>
              </span>
              <span className={styles.switchText}>
                Word-by-Word Mode
              </span>
            </label>
          </div>
        </div>

        {/* Ayahs List */}
        <div className={styles.ayahsList}>
          {ayahs.length > 0 ? (
            ayahs.map((ayah, index) => (
              <AyahBlock
                key={ayah.id}
                ayah={ayah}
                index={index}
                selectedLang={selectedLang}
                showWordByWord={wordByWordMode}
              />
            ))
          ) : (
            <div className={styles.noAyahs}>
              <p>No ayahs available for this surah yet.</p>
              <p className={styles.note}>
                This is a demo with limited data. Ayahs for Surah 1 (Al-Fatihah) and Surah 112 (Al-Ikhlas) are available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SurahDetail
