import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCurrentPage } from '@store/slices/uiSlice'
import { selectTotalAyahsLearned, selectTotalWordsLearned } from '@store/slices/learnSlice'

function Home() {
    const dispatch = useDispatch()
    const totalAyahsLearned = useSelector(selectTotalAyahsLearned)
    const totalWordsLearned = useSelector(selectTotalWordsLearned)

    useEffect(() => {
        dispatch(setCurrentPage('home'))
    }, [dispatch])

    const featuredSurahs = [
        { id: 1, name: 'Al-Fatihah', translation: 'The Opening', ayahs: 7 },
        { id: 112, name: 'Al-Ikhlas', translation: 'The Sincerity', ayahs: 4 },
        { id: 113, name: 'Al-Falaq', translation: 'The Daybreak', ayahs: 5 },
        { id: 114, name: 'An-Nas', translation: 'Mankind', ayahs: 6 }
    ]

    const islamicQuotes = [
        { text: "The best of you are those who learn the Quran and teach it", source: "Prophet Muhammad (ﷺ)" },
        { text: "Read the Quran, for it will come as an intercessor for its reciter", source: "Prophet Muhammad (ﷺ)" }
    ]

    const faqData = [
        {
            question: "How does Ayah learning work?",
            answer: "Our platform breaks down each Ayah word-by-word, showing you the Arabic text, transliteration, and translation. You can study at your own pace and test your knowledge with interactive quizzes."
        },
        {
            question: "How accurate is the pronunciation checker?",
            answer: "Our AI-powered pronunciation checker uses advanced speech recognition technology to provide real-time feedback on your Qur'anic recitation with high accuracy."
        },
        {
            question: "Is the chatbot information authentic?",
            answer: "Yes, all information provided by our Islamic chatbot is sourced from authentic Tafseer texts and verified Islamic sources to ensure accuracy."
        },
        {
            question: "Is this platform free to use?",
            answer: "Yes! QURANLEARNAI is completely free to use. We believe Qur'an education should be accessible to everyone, with no subscriptions or hidden costs."
        }
    ]

    const [expandedFaq, setExpandedFaq] = useState(0)

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative overflow-hidden" style={{ backgroundImage: "url('/assets/hero-bg.png')" }}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-dark-primary/30 to-dark-primary/70 z-0"></div>

                <div className="relative z-10 text-center max-w-[900px] px-6">
                    <h1 className="text-[72px] font-bold text-text-primary mb-4 animate-page-enter leading-tight">
                        Learn the Qur'an
                    </h1>
                    <p className="text-5xl font-bold italic text-lime-neon mb-6 animate-page-enter">
                        Your Journey Starts Here
                    </p>
                    <p className="text-lg text-text-secondary mb-10 animate-page-enter leading-relaxed">
                        Master Qur'anic Arabic with AI-powered tools. Read, learn, and perfect<br />
                        your pronunciation with authentic Islamic guidance.
                    </p>

                    {/* Two CTA Buttons */}
                    <div className="flex gap-4 justify-center animate-page-enter">
                        <Link to="/learn" className="inline-flex items-center gap-2 bg-lime-neon text-black px-8 py-4 rounded-full font-semibold text-lg shadow-glow-md hover:bg-lime-light hover:-translate-y-0.5 hover:shadow-glow-lg transition-all duration-300">
                            Start Learning <span className="text-xl font-bold">›</span>
                        </Link>
                        <Link to="/read" className="inline-flex items-center gap-2 bg-transparent text-lime-neon px-8 py-4 rounded-full font-semibold text-lg border-2 border-lime-neon hover:bg-lime-neon/10 hover:-translate-y-0.5 transition-all duration-300">
                            Read Quran <span className="text-xl font-bold">›</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Statistics Overview */}
            <div className="py-[120px]">
                <div className="container">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="glass border-2 border-glass-border rounded-xl p-8 text-center transition-all duration-300 hover:border-lime-neon hover:-translate-y-1 hover:shadow-glow-md">
                            <div className="text-5xl mb-3">📚</div>
                            <div className="text-5xl font-bold text-lime-neon mb-2">114</div>
                            <div className="text-text-secondary text-sm uppercase tracking-wider">Surahs Available</div>
                        </div>
                        <div className="glass border-2 border-glass-border rounded-xl p-8 text-center transition-all duration-300 hover:border-lime-neon hover:-translate-y-1 hover:shadow-glow-md">
                            <div className="text-5xl mb-3">📖</div>
                            <div className="text-5xl font-bold text-lime-neon mb-2">{totalAyahsLearned}</div>
                            <div className="text-text-secondary text-sm uppercase tracking-wider">Ayahs Learned</div>
                        </div>
                        <div className="glass border-2 border-glass-border rounded-xl p-8 text-center transition-all duration-300 hover:border-lime-neon hover:-translate-y-1 hover:shadow-glow-md">
                            <div className="text-5xl mb-3">🔤</div>
                            <div className="text-5xl font-bold text-lime-neon mb-2">{totalWordsLearned}</div>
                            <div className="text-text-secondary text-sm uppercase tracking-wider">Words Mastered</div>
                        </div>
                        <div className="glass border-2 border-glass-border rounded-xl p-8 text-center transition-all duration-300 hover:border-lime-neon hover:-translate-y-1 hover:shadow-glow-md">
                            <div className="text-5xl mb-3">🎯</div>
                            <div className="text-5xl font-bold text-lime-neon mb-2">
                                {totalAyahsLearned > 0 ? Math.round((totalAyahsLearned / 6236) * 100) : 0}%
                            </div>
                            <div className="text-text-secondary text-sm uppercase tracking-wider">Overall Progress</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Four Powerful Learning Modules */}
            <div className="py-[120px]">
                <div className="container">
                    <h2 className="text-center text-5xl font-bold text-text-primary mb-[60px]">Four Powerful Learning Modules</h2>
                    <p className="text-center text-lg text-text-secondary mb-[60px] -mt-10">
                        Everything you need to understand and memorize the Qur'an
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link to="/read" className="bg-[rgba(20,30,25,0.8)] backdrop-blur-[10px] border border-white/10 rounded-2xl p-8 no-underline relative flex flex-col items-start transition-all duration-300 hover:border-lime-neon/30 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] group">
                            <div className="w-12 h-12 bg-lime-neon/15 rounded-xl flex items-center justify-center text-2xl mb-5">📖</div>
                            <span className="absolute top-6 right-8 text-[80px] font-bold text-white/[0.08] leading-none">01</span>
                            <h3 className="text-xl font-bold text-text-primary mb-3">Read Qur'an</h3>
                            <p className="text-sm text-text-secondary leading-relaxed mb-5">
                                Access all 114 Surahs with translations in English and Urdu. Beautiful interface for reading and reflection.
                            </p>
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-lime-neon bg-lime-neon/10 px-4 py-2 rounded-lg border border-lime-neon/20 group-hover:bg-lime-neon/20 group-hover:border-lime-neon transition-all duration-200">Start Reading ›</span>
                        </Link>

                        <Link to="/learn" className="bg-[rgba(20,30,25,0.8)] backdrop-blur-[10px] border border-white/10 rounded-2xl p-8 no-underline relative flex flex-col items-start transition-all duration-300 hover:border-lime-neon/30 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] group">
                            <div className="w-12 h-12 bg-lime-neon/15 rounded-xl flex items-center justify-center text-2xl mb-5">🎓</div>
                            <span className="absolute top-6 right-8 text-[80px] font-bold text-white/[0.08] leading-none">02</span>
                            <h3 className="text-xl font-bold text-text-primary mb-3">Learn Qur'an</h3>
                            <p className="text-sm text-text-secondary leading-relaxed mb-5">
                                Ayah-by-Ayah and Word-by-Word learning with interactive quizzes. Master meanings at your own pace.
                            </p>
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-lime-neon bg-lime-neon/10 px-4 py-2 rounded-lg border border-lime-neon/20 group-hover:bg-lime-neon/20 group-hover:border-lime-neon transition-all duration-200">Start Learning ›</span>
                        </Link>

                        <Link to="/pronunciation" className="bg-[rgba(20,30,25,0.8)] backdrop-blur-[10px] border border-white/10 rounded-2xl p-8 no-underline relative flex flex-col items-start transition-all duration-300 hover:border-lime-neon/30 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] group">
                            <div className="w-12 h-12 bg-lime-neon/15 rounded-xl flex items-center justify-center text-2xl mb-5">🎤</div>
                            <span className="absolute top-6 right-8 text-[80px] font-bold text-white/[0.08] leading-none">03</span>
                            <h3 className="text-xl font-bold text-text-primary mb-3">Pronunciation Assistant</h3>
                            <p className="text-sm text-text-secondary leading-relaxed mb-5">
                                AI-powered pronunciation checker. Practice and perfect your recitation with instant feedback.
                            </p>
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-lime-neon bg-lime-neon/10 px-4 py-2 rounded-lg border border-lime-neon/20 group-hover:bg-lime-neon/20 group-hover:border-lime-neon transition-all duration-200">Check Pronunciation ›</span>
                        </Link>

                        <Link to="/chatbot" className="bg-[rgba(20,30,25,0.8)] backdrop-blur-[10px] border border-white/10 rounded-2xl p-8 no-underline relative flex flex-col items-start transition-all duration-300 hover:border-lime-neon/30 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] group">
                            <div className="w-12 h-12 bg-lime-neon/15 rounded-xl flex items-center justify-center text-2xl mb-5">💬</div>
                            <span className="absolute top-6 right-8 text-[80px] font-bold text-white/[0.08] leading-none">04</span>
                            <h3 className="text-xl font-bold text-text-primary mb-3">Islamic Chatbot</h3>
                            <p className="text-sm text-text-secondary leading-relaxed mb-5">
                                RAG-based chatbot for authentic Islamic knowledge. Ask questions about Tafseer, meanings, and more.
                            </p>
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-lime-neon bg-lime-neon/10 px-4 py-2 rounded-lg border border-lime-neon/20 group-hover:bg-lime-neon/20 group-hover:border-lime-neon transition-all duration-200">Ask the Chatbot ›</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* About QURANLEARNAI Section */}
            <div className="py-[120px]">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        {/* Left side - Image with decorative frame */}
                        <div className="relative">
                            <div className="relative border-2 border-lime-neon/30 rounded-lg p-4 bg-black/30">
                                <img
                                    src="/assets/hero-bg.png"
                                    alt="Mosque at night"
                                    className="w-full h-auto rounded block"
                                />
                            </div>
                            {/* Decorative dots */}
                            <div className="absolute -bottom-8 -left-8 w-[100px] h-[120px] -z-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(191, 255, 0, 0.4) 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
                            <div className="absolute -top-5 -right-5 w-[100px] h-[80px]" style={{ backgroundImage: 'radial-gradient(circle, rgba(191, 255, 0, 0.4) 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
                        </div>

                        {/* Right side - Content */}
                        <div className="pl-0 lg:pl-5">
                            <h2 className="text-4xl font-bold italic text-lime-neon mb-6">About QURANLEARNAI</h2>
                            <p className="text-base text-text-secondary leading-[1.7] mb-8">
                                QURANLEARNAI is a modern platform designed to make Qur'an learning accessible, engaging, and effective for beginners and advanced learners alike.
                            </p>

                            <ul className="list-none p-0 mb-10 space-y-4">
                                <li className="flex items-start gap-3 text-sm text-text-secondary">
                                    <span className="flex items-center justify-center w-5 h-5 bg-lime-neon/15 text-lime-neon rounded-full text-xs shrink-0 mt-0.5">✓</span>
                                    <div><strong className="text-lime-neon">Beginner-Friendly:</strong> Start from basics with word-by-word breakdowns</div>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-text-secondary">
                                    <span className="flex items-center justify-center w-5 h-5 bg-lime-neon/15 text-lime-neon rounded-full text-xs shrink-0 mt-0.5">✓</span>
                                    <div><strong className="text-lime-neon">Authentic Sources:</strong> All content verified from classical Tafseer texts</div>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-text-secondary">
                                    <span className="flex items-center justify-center w-5 h-5 bg-lime-neon/15 text-lime-neon rounded-full text-xs shrink-0 mt-0.5">✓</span>
                                    <div><strong className="text-lime-neon">AI-Powered:</strong> Advanced technology for pronunciation and learning</div>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-text-secondary">
                                    <span className="flex items-center justify-center w-5 h-5 bg-lime-neon/15 text-lime-neon rounded-full text-xs shrink-0 mt-0.5">✓</span>
                                    <div><strong className="text-lime-neon">Free Forever:</strong> No subscriptions, no hidden costs</div>
                                </li>
                            </ul>

                            <Link to="/about" className="inline-block bg-lime-neon text-black px-12 py-4 rounded-full font-bold text-sm tracking-widest shadow-glow-sm hover:bg-lime-light hover:-translate-y-0.5 hover:shadow-glow-md transition-all duration-300">
                                EXPLORE
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Surahs */}
            <div className="py-[120px]">
                <div className="container">
                    <h2 className="text-center text-5xl font-bold text-text-primary mb-[60px]">Featured Surahs</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {featuredSurahs.map(surah => (
                            <Link
                                key={surah.id}
                                to={`/read/${surah.id}`}
                                className="glass border-2 border-glass-border rounded-xl p-6 no-underline text-center relative transition-all duration-300 hover:border-lime-neon hover:-translate-y-1 hover:shadow-glow-sm"
                            >
                                <div className="absolute top-2 right-2 w-8 h-8 bg-lime-neon/10 rounded-full flex items-center justify-center text-lime-neon font-bold text-sm">{surah.id}</div>
                                <h4 className="text-text-primary text-lg mt-4 mb-2">{surah.name}</h4>
                                <p className="text-text-tertiary text-sm italic mb-2">{surah.translation}</p>
                                <p className="text-text-secondary text-xs">{surah.ayahs} Ayahs</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Islamic Quotes */}
            <div className="py-[120px]">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {islamicQuotes.map((quote, index) => (
                            <div key={index} className="glass border-2 border-lime-neon/30 rounded-xl p-10 text-center">
                                <div className="text-5xl mb-4">🕌</div>
                                <blockquote className="text-text-primary text-lg italic leading-relaxed mb-4">
                                    "{quote.text}"
                                </blockquote>
                                <p className="text-lime-neon text-sm font-semibold">— {quote.source}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="py-[120px]">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-[60px] items-start">
                        {/* Left side - FAQ Accordion */}
                        <div>
                            <h2 className="text-5xl font-bold text-text-primary mb-10 leading-tight">Frequently<br />asked questions</h2>

                            <div className="flex flex-col gap-4">
                                {faqData.map((faq, index) => (
                                    <div
                                        key={index}
                                        className={`bg-[rgba(20,30,25,0.6)] border rounded-xl px-6 py-5 cursor-pointer transition-all duration-300 ${expandedFaq === index ? 'border-lime-neon/30' : 'border-white/10 hover:border-lime-neon/20'}`}
                                        onClick={() => setExpandedFaq(expandedFaq === index ? -1 : index)}
                                    >
                                        <div className="flex justify-between items-center gap-4">
                                            <span className="text-base font-semibold text-text-primary">{faq.question}</span>
                                            <span className={`text-2xl text-text-secondary transition-transform duration-300 ${expandedFaq === index ? 'rotate-45 text-lime-neon' : ''}`}>+</span>
                                        </div>
                                        {expandedFaq === index && (
                                            <div className="mt-4 pt-4 border-t border-white/10 text-sm text-text-secondary leading-[1.7]">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right side - Chatbot Card */}
                        <div className="bg-[rgba(20,30,25,0.6)] border border-white/10 rounded-2xl px-8 py-10 text-center">
                            <div className="w-14 h-14 bg-lime-neon/15 rounded-xl flex items-center justify-center text-3xl mx-auto mb-6">💬</div>
                            <h3 className="text-lg font-bold text-text-primary mb-3">Do you have more questions?</h3>
                            <p className="text-sm text-text-secondary leading-relaxed mb-6">End-to-end payments and financial management in a single solution. Meet the right platform to help realize.</p>
                            <Link to="/chatbot" className="inline-block w-full bg-lime-neon text-black px-8 py-4 rounded-full font-bold text-sm shadow-glow-sm hover:bg-lime-light hover:-translate-y-0.5 hover:shadow-glow-md transition-all duration-300">
                                Ask Chatbot
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="py-[120px] text-center">
                <div className="container">
                    <h2 className="text-5xl text-text-primary mb-4">Ready to Begin Your Journey?</h2>
                    <p className="text-lg text-text-secondary mb-8">Start learning the Holy Quran today with our AI-powered platform</p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/learn" className="px-10 py-5 rounded-full font-semibold text-lg bg-lime-neon text-black shadow-glow-md hover:bg-lime-light hover:-translate-y-0.5 hover:shadow-glow-lg transition-all duration-300">
                            Start Learning Now
                        </Link>
                        <Link to="/about" className="px-10 py-5 rounded-full font-semibold text-lg bg-transparent text-lime-neon border-2 border-lime-neon hover:bg-lime-neon/10 hover:-translate-y-0.5 transition-all duration-300">
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
