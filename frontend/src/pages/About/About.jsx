import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentPage } from '@store/slices/uiSlice'

function About() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentPage('about'))
  }, [dispatch])

  return (
    <div className="min-h-screen py-24">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h1 className="gradient-text text-5xl font-bold">About QuranLearnAI</h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <section className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-text-primary mb-4">🕌 Our Mission</h2>
            <p className="text-text-secondary leading-relaxed">
              QuranLearnAI is a modern Progressive Web App designed to help Muslims around the world
              learn and understand the Holy Quran through AI-powered features and interactive learning methods.
            </p>
          </section>

          <section className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-text-primary mb-6">✨ Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 bg-dark-tertiary/50 rounded-xl">
                <div className="text-3xl">📖</div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">Read Quran</h3>
                  <p className="text-sm text-text-secondary">Browse all 114 Surahs with English and Urdu translations</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-dark-tertiary/50 rounded-xl">
                <div className="text-3xl">🎓</div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">Learn Quran</h3>
                  <p className="text-sm text-text-secondary">Ayah-by-ayah learning with interactive quizzes</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-dark-tertiary/50 rounded-xl">
                <div className="text-3xl">🎤</div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">Pronunciation</h3>
                  <p className="text-sm text-text-secondary">Perfect your recitation with AI-powered feedback</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-dark-tertiary/50 rounded-xl">
                <div className="text-3xl">💬</div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">Chatbot</h3>
                  <p className="text-sm text-text-secondary">Get answers to your Quran questions instantly</p>
                </div>
              </div>
            </div>
          </section>

          <section className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-text-primary mb-4">🎯 Project Info</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              This is a Final Year Project (FYP-1) developed as part of academic research to explore
              the integration of AI technologies in Islamic education.
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li><strong className="text-lime-neon">Frontend:</strong> React 18 + Vite</li>
              <li><strong className="text-lime-neon">State Management:</strong> Redux Toolkit</li>
              <li><strong className="text-lime-neon">Styling:</strong> Tailwind CSS</li>
              <li><strong className="text-lime-neon">PWA:</strong> Vite PWA Plugin</li>
              <li><strong className="text-lime-neon">Fonts:</strong> Amiri Quran (Arabic), Poppins (English)</li>
            </ul>
          </section>

          <section className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-text-primary mb-4">📚 Data Sources</h2>
            <p className="text-text-secondary leading-relaxed">
              Quranic text and translations are sourced from authentic Islamic databases and verified by scholars.
            </p>
          </section>

          <section className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-text-primary mb-4">🙏 Acknowledgments</h2>
            <p className="text-text-secondary leading-relaxed">
              We thank Allah (SWT) for guiding us in this project. Special thanks to all contributors,
              Islamic scholars, and the open-source community for their valuable resources.
            </p>
          </section>

          <section className="glass p-8 rounded-2xl text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">📧 Contact</h2>
            <p className="text-text-secondary mb-6">For questions or feedback, please reach out to us.</p>
            <div className="flex justify-center gap-4">
              <a href="https://www.instagram.com/bdmatrix1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-lime-neon/10 text-lime-neon rounded-full border border-lime-neon/30 hover:bg-lime-neon/20 transition-all duration-200">
                📷 Instagram
              </a>
              <a href="http://bdmatrix.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-lime-neon/10 text-lime-neon rounded-full border border-lime-neon/30 hover:bg-lime-neon/20 transition-all duration-200">
                🌐 Website
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About
