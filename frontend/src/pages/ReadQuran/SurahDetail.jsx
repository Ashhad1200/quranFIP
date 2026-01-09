import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSurahById, selectCurrentSurah, selectSurahLoading } from '@store/slices/surahSlice'
import { fetchAyahsBySurah, selectAyahsBySurah, selectTranslationLang, selectWordByWordMode, toggleTranslation, toggleWordByWord } from '@store/slices/ayahSlice'
import { setCurrentPage } from '@store/slices/uiSlice'
import AyahBlock from '@components/read/AyahBlock/AyahBlock'
import Button from '@components/common/Button/Button'

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
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="animate-spin text-4xl">⏳</div>
        <p className="text-text-secondary">Loading Surah...</p>
      </div>
    )
  }

  if (!surah) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-3xl font-bold text-text-primary">Surah Not Found</h1>
        <Link to="/read">
          <Button variant="primary">Back to Surahs</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container px-4">
        {/* Back Button */}
        <Link to="/read" className="inline-flex items-center gap-2 text-text-secondary no-underline text-sm mb-8 transition-colors duration-200 hover:text-lime-neon">
          ← Back to Surahs
        </Link>

        {/* Surah Header */}
        <div className="glass p-8 rounded-2xl text-center mb-8">
          <h1 className="arabic-text text-5xl text-text-primary mb-4">
            {surah.nameArabic}
          </h1>
          <h2 className="text-2xl font-bold text-lime-neon mb-2">
            {surah.nameEnglish}
          </h2>
          <p className="text-text-secondary mb-4">
            {surah.translation}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-dark-tertiary rounded-full text-sm text-text-secondary">
              📖 Surah {surah.number}
            </span>
            <span className="px-4 py-2 bg-dark-tertiary rounded-full text-sm text-text-secondary">
              {surah.revelationType === 'Meccan' ? '🕋' : '🕌'} {surah.revelationType}
            </span>
            <span className="px-4 py-2 bg-dark-tertiary rounded-full text-sm text-text-secondary">
              📝 {surah.ayahCount} Ayahs
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-dark-secondary rounded-xl">
          {/* Translation Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-text-secondary">Translation:</span>
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedLang === 'english' ? 'bg-lime-neon text-black' : 'bg-dark-tertiary text-text-secondary hover:bg-dark-hover'}`}
                onClick={() => handleTranslationToggle('english')}
              >
                English
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedLang === 'urdu' ? 'bg-lime-neon text-black' : 'bg-dark-tertiary text-text-secondary hover:bg-dark-hover'}`}
                onClick={() => handleTranslationToggle('urdu')}
              >
                Urdu
              </button>
            </div>
          </div>

          {/* Word-by-Word Toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={wordByWordMode}
                onChange={handleWordByWordToggle}
                className="sr-only"
              />
              <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${wordByWordMode ? 'bg-lime-neon' : 'bg-dark-tertiary'}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 absolute top-0.5 ${wordByWordMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </div>
            </div>
            <span className="text-sm text-text-secondary">Word-by-Word Mode</span>
          </label>
        </div>

        {/* Ayahs List */}
        <div className="space-y-6">
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
            <div className="text-center py-16 text-text-secondary">
              <p className="text-lg mb-3">No ayahs available for this surah yet.</p>
              <p className="text-sm text-text-tertiary">
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
