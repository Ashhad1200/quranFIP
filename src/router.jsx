import { Routes, Route } from 'react-router-dom'
import Home from '@pages/Home/Home'
import SurahGrid from '@pages/ReadQuran/SurahGrid'
import SurahDetail from '@pages/ReadQuran/SurahDetail'
import LearnLanding from '@pages/LearnQuran/LearnLanding'
import AyahLearning from '@pages/LearnQuran/AyahLearning'
import WordLearning from '@pages/LearnQuran/WordLearning'
import Quiz from '@pages/LearnQuran/Quiz'
import Pronunciation from '@pages/Pronunciation/Pronunciation'
import Chatbot from '@pages/Chatbot/Chatbot'
import About from '@pages/About/About'
import FAQ from '@pages/FAQ/FAQ'

function AppRouter() {
    return (
        <Routes>
            {/* Homepage */}
            <Route path="/" element={<Home />} />

            {/* Read Quran Module */}
            <Route path="/read" element={<SurahGrid />} />
            <Route path="/read/:surahId" element={<SurahDetail />} />

            {/* Learn Quran Module */}
            <Route path="/learn" element={<LearnLanding />} />
            <Route path="/learn/ayah/:ayahId" element={<AyahLearning />} />
            <Route path="/learn/word/:wordId" element={<WordLearning />} />
            <Route path="/quiz/:type/:id" element={<Quiz />} />

            {/* Pronunciation Assistant */}
            <Route path="/pronunciation" element={<Pronunciation />} />
            <Route path="/pronunciation/:type/:id" element={<Pronunciation />} />

            {/* Chatbot */}
            <Route path="/chatbot" element={<Chatbot />} />

            {/* Static Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />

            {/* 404 */}
            <Route path="*" element={<Home />} />
        </Routes>
    )
}

export default AppRouter
