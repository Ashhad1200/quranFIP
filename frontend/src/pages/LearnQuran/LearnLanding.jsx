import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTotalAyahsLearned, selectTotalWordsLearned } from '@store/slices/learnSlice'

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
    <div className="min-h-screen py-24">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="gradient-text text-5xl font-bold mb-4">Learn the Holy Qur'an</h1>
          <p className="text-lg text-text-secondary">
            Master Quranic Arabic word-by-word with interactive quizzes
          </p>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
          <div className="glass border border-glass-border rounded-xl p-6 text-center">
            <div className="text-4xl mb-2">📖</div>
            <div className="text-4xl font-bold text-lime-neon mb-1">{totalAyahs}</div>
            <div className="text-sm text-text-secondary uppercase tracking-wider">Ayahs Learned</div>
          </div>
          <div className="glass border border-glass-border rounded-xl p-6 text-center">
            <div className="text-4xl mb-2">🔤</div>
            <div className="text-4xl font-bold text-lime-neon mb-1">{totalWords}</div>
            <div className="text-sm text-text-secondary uppercase tracking-wider">Words Learned</div>
          </div>
          <div className="glass border border-glass-border rounded-xl p-6 text-center">
            <div className="text-4xl mb-2">🎯</div>
            <div className="text-4xl font-bold text-lime-neon mb-1">
              {totalAyahs > 0 ? Math.round((totalAyahs / 6236) * 100) : 0}%
            </div>
            <div className="text-sm text-text-secondary uppercase tracking-wider">Progress</div>
          </div>
        </div>

        {/* Learning Modes */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-text-primary text-center mb-8">Choose Learning Mode</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass border-2 border-lime-neon/30 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Ayah-by-Ayah Learning</h3>
              <p className="text-text-secondary text-sm mb-4">Study complete verses with translations and take word-meaning quizzes</p>
              <span className="inline-block px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium">✅ Available (FYP-1)</span>
            </div>

            <div className="glass border border-white/10 rounded-2xl p-8 text-center opacity-70">
              <div className="text-5xl mb-4">🔤</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Word-by-Word Learning</h3>
              <p className="text-text-secondary text-sm mb-4">Build your Arabic vocabulary by learning individual words</p>
              <span className="inline-block px-4 py-2 bg-warning/10 text-warning rounded-full text-sm font-medium">🔜 Coming in FYP-2</span>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-text-primary text-center mb-8">Quick Start - Practice These Ayahs</h2>
          <div className="space-y-4">
            {sampleAyahs.map((ayah) => (
              <Link
                key={ayah.id}
                to={`/learn/ayah/${ayah.id}`}
                className="flex items-center justify-between p-5 bg-dark-card border border-white/10 rounded-xl no-underline transition-all duration-300 hover:border-lime-neon/30 hover:-translate-x-1 group"
              >
                <div>
                  <div className="text-sm text-text-secondary mb-1">
                    {ayah.surahName} - Ayah {ayah.number}
                  </div>
                  <div className="arabic-text text-2xl text-text-primary">
                    {ayah.preview}
                  </div>
                </div>
                <div className="text-lime-neon font-medium shrink-0 ml-4 group-hover:translate-x-1 transition-transform">
                  Start Learning →
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="max-w-2xl mx-auto glass p-6 rounded-2xl flex items-start gap-4">
          <div className="text-3xl shrink-0">ℹ️</div>
          <div>
            <h3 className="text-lg font-bold text-text-primary mb-3">How It Works</h3>
            <ol className="space-y-2 text-sm text-text-secondary list-decimal list-inside">
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
