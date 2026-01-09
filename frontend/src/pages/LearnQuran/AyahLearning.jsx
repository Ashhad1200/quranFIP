import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAyahById, selectCurrentAyah, selectTranslationLang } from '@store/slices/ayahSlice'
import Button from '@components/common/Button/Button'

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
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="animate-spin text-4xl">⏳</div>
        <p className="text-text-secondary">Loading Ayah...</p>
      </div>
    )
  }

  const translation = selectedLang === 'urdu'
    ? ayah.translationUrdu
    : ayah.translationEnglish

  return (
    <div className="min-h-screen py-24">
      <div className="container px-4 max-w-3xl">
        {/* Back Link */}
        <Link to="/learn" className="inline-flex items-center gap-2 text-text-secondary no-underline text-sm mb-8 transition-colors duration-200 hover:text-lime-neon">
          ← Back to Learn
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="gradient-text text-4xl font-bold mb-3">Learn Ayah</h1>
          <p className="text-text-secondary">
            Study this ayah carefully before taking the quiz
          </p>
        </div>

        {/* Ayah Display Card */}
        <div className="glass p-8 rounded-2xl space-y-8 mb-8">
          {/* Arabic Text */}
          <div>
            <div className="text-xs text-text-tertiary uppercase tracking-wider mb-3">Arabic Text</div>
            <p className="arabic-text text-4xl text-text-primary text-center leading-relaxed">
              {ayah.textArabic}
            </p>
          </div>

          {/* Translation */}
          <div className="pt-6 border-t border-white/10">
            <div className="text-xs text-text-tertiary uppercase tracking-wider mb-3">
              Translation ({selectedLang === 'english' ? 'English' : 'Urdu'})
            </div>
            <p className="text-text-secondary text-lg leading-relaxed text-center">
              {translation}
            </p>
          </div>

          {/* Words List */}
          {ayah.words && ayah.words.length > 0 && (
            <div className="pt-6 border-t border-white/10">
              <div className="text-xs text-text-tertiary uppercase tracking-wider mb-4">Word-by-Word Meanings</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {ayah.words.map((word, idx) => (
                  <div key={idx} className="bg-dark-tertiary p-4 rounded-xl text-center">
                    <div className="arabic-text text-2xl text-text-primary mb-2">
                      {word.arabic}
                    </div>
                    <div className="text-lime-neon text-sm font-medium mb-1">
                      {word.translation}
                    </div>
                    <div className="text-text-tertiary text-xs">
                      {word.transliteration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Learning Tips */}
        <div className="glass p-6 rounded-2xl flex items-start gap-4 mb-8">
          <div className="text-3xl shrink-0">💡</div>
          <div>
            <h3 className="text-lg font-bold text-text-primary mb-3">Learning Tips</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>• Read the Arabic text carefully</li>
              <li>• Understand the translation</li>
              <li>• Review each word's meaning</li>
              <li>• Try to connect words with the overall meaning</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button variant="secondary" size="large" onClick={() => navigate(-1)}>
            « Previous Ayah
          </Button>
          <Button variant="primary" size="large" onClick={handleStartQuiz}>
            Start Quiz »
          </Button>
        </div>

        {/* Progress Note */}
        <div className="text-center p-4 bg-info/10 border border-info/30 rounded-lg">
          <p className="text-sm text-text-secondary">
            📚 After completing the quiz, this ayah will be marked as studied in your progress.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AyahLearning
