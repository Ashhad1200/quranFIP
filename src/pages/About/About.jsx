import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentPage } from '@store/slices/uiSlice'
import styles from './About.module.css'

function About() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentPage('about'))
  }, [dispatch])

  return (
    <div className={styles.about}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h1 className="gradient-text">About QuranLearnAI</h1>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>🕌 Our Mission</h2>
            <p>
              QuranLearnAI is a modern Progressive Web App designed to help Muslims around the world
              learn and understand the Holy Quran through AI-powered features and interactive learning methods.
            </p>
          </section>

          <section className={styles.section}>
            <h2>✨ Features</h2>
            <div className={styles.featureGrid}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>📖</div>
                <h3>Read Quran</h3>
                <p>Browse all 114 Surahs with English and Urdu translations</p>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>🎓</div>
                <h3>Learn Quran</h3>
                <p>Ayah-by-ayah learning with interactive quizzes</p>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>🎤</div>
                <h3>Pronunciation</h3>
                <p>Perfect your recitation with AI-powered feedback</p>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>💬</div>
                <h3>Chatbot</h3>
                <p>Get answers to your Quran questions instantly</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>🎯 Project Info</h2>
            <p>
              This is a Final Year Project (FYP-1) developed as part of academic research to explore
              the integration of AI technologies in Islamic education.
            </p>
            <ul className={styles.techList}>
              <li><strong>Frontend:</strong> React 18 + Vite</li>
              <li><strong>State Management:</strong> Redux Toolkit</li>
              <li><strong>Styling:</strong> Pure CSS with CSS Modules</li>
              <li><strong>PWA:</strong> Vite PWA Plugin</li>
              <li><strong>Fonts:</strong> Amiri Quran (Arabic), Poppins (English)</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>📚 Data Sources</h2>
            <p>
              Quranic text and translations are sourced from authentic Islamic databases and verified by scholars.
            </p>
          </section>

          <section className={styles.section}>
            <h2>🙏 Acknowledgments</h2>
            <p>
              We thank Allah (SWT) for guiding us in this project. Special thanks to all contributors,
              Islamic scholars, and the open-source community for their valuable resources.
            </p>
          </section>

          <section className={styles.contactSection}>
            <h2>📧 Contact</h2>
            <p>For questions or feedback, please reach out to us.</p>
            <div className={styles.socialLinks}>
              <a href="https://www.instagram.com/bdmatrix1" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                📷 Instagram
              </a>
              <a href="http://bdmatrix.org/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
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
