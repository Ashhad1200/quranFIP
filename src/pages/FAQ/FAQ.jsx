import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentPage } from '@store/slices/uiSlice'
import styles from './FAQ.module.css'

function FAQ() {
  const dispatch = useDispatch()
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    dispatch(setCurrentPage('faq'))
  }, [dispatch])

  const faqs = [
    {
      question: 'What is QuranLearnAI?',
      answer: 'QuranLearnAI is a Progressive Web App that helps you learn the Holy Quran through AI-powered features including interactive quizzes, pronunciation assistance, and an Islamic chatbot.'
    },
    {
      question: 'Is this app free to use?',
      answer: 'Yes! QuranLearnAI is completely free to use. This is an educational project (FYP-1) created to help Muslims learn the Quran effectively.'
    },
    {
      question: 'How does the pronunciation feature work?',
      answer: 'The pronunciation assistant uses ASR (Automatic Speech Recognition) technology to analyze your recitation and provide real-time feedback on your pronunciation accuracy with color-coded scores (Good, Intermediate, Wrong).'
    },
    {
      question: 'What languages are supported for translations?',
      answer: 'Currently, we support English and Urdu translations. You can easily toggle between these languages when reading ayahs.'
    },
    {
      question: 'How does the quiz system work?',
      answer: 'After studying an ayah and its word meanings, you take a quiz to test your knowledge. The quiz uses MCQ format with 4 options. If you answer incorrectly 3 times, the correct answer is auto-selected to help you learn.'
    },
    {
      question: 'Can I use this app offline?',
      answer: 'Yes! QuranLearnAI is a Progressive Web App (PWA) with offline support. Once you visit the app, it will be cached on your device and you can access it even without internet (limited functionality).'
    },
    {
      question: 'How does the chatbot work?',
      answer: 'Our Islamic chatbot uses RAG (Retrieval-Augmented Generation) technology to answer your questions about the Quran, Tafseer, and Islamic teachings. It provides authenticated references from classical scholars.'
    },
    {
      question: 'Is my progress saved?',
      answer: 'Yes! Your learning progress (studied ayahs, quiz scores, etc.) is automatically saved in your browser using Redux Persist. Your data stays private on your device.'
    },
    {
      question: 'What is word-by-word mode?',
      answer: 'Word-by-word mode lets you hover over individual Arabic words to see their English translations and transliterations. This helps you understand the structure and meaning of each ayah in detail.'
    },
    {
      question: 'Is this app available on mobile?',
      answer: 'Yes! QuranLearnAI is fully responsive and works perfectly on mobile devices. You can also install it as a PWA on your phone for an app-like experience.'
    },
    {
      question: 'Which Quranic script is used?',
      answer: 'We use the Amiri Quran font, which is an open-source, authentic Arabic script specifically designed for Quranic text.'
    },
    {
      question: 'Can I suggest new features?',
      answer: 'Absolutely! We welcome feedback and feature suggestions. Please reach out to us through our contact page or social media links in the About section.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={styles.faq}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h1 className="gradient-text">Frequently Asked Questions</h1>
          <p className={styles.subtitle}>
            Find answers to common questions about QuranLearnAI
          </p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <span className={styles.toggleIcon}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>

              {openIndex === index && (
                <div className={styles.faqAnswer}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.contactBox}>
          <h3>Still have questions?</h3>
          <p>Feel free to reach out to us through our social media or website!</p>
          <div className={styles.contactLinks}>
            <a href="https://www.instagram.com/bdmatrix1" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="http://bdmatrix.org/" target="_blank" rel="noopener noreferrer">
              Website
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ
