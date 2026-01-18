import { apiLearning } from './api'
import { generateAyahQuiz, generateWordQuiz } from '@mockData/quizzes'

// Backend only supports Surahs 112-114
const AVAILABLE_SURAHS = [112, 113, 114]

// Get ayah learning content - Uses real backend for supported surahs
export const getAyahLearning = async (ayahId) => {
    const [surahId, ayahNum] = String(ayahId).split(':').map(Number)

    // Backend only supports 112-114
    if (!AVAILABLE_SURAHS.includes(surahId)) {
        console.warn(`Surah ${surahId} not available in backend. Only Surahs 112-114 are supported.`)
        return {
            ayahId,
            studied: false,
            lastStudied: null,
            error: `Surah ${surahId} is not available. Only Surahs 112-114 are supported by the backend.`
        }
    }

    // Call real backend
    try {
        const response = await apiLearning.get(`/api/ayah/${surahId}/${ayahNum}`)
        return {
            ayahId,
            studied: false,
            lastStudied: new Date().toISOString(),
            data: response.data
        }
    } catch (error) {
        console.error("Learn API Error", error)
        throw new Error(`Failed to load ayah ${ayahId}: ${error.message}`)
    }
}

// Get ayah quiz - Backend doesn't have quiz endpoint yet, using generated quizzes
export const getAyahQuiz = async (ayahId) => {
    // TODO: Replace with real backend endpoint when available
    await new Promise(resolve => setTimeout(resolve, 300))
    return generateAyahQuiz(ayahId)
}

// Submit quiz answer - Backend doesn't have quiz endpoint yet
export const submitQuizAnswer = async (data) => {
    // TODO: Replace with real backend endpoint when available
    await new Promise(resolve => setTimeout(resolve, 100))
    return { success: true }
}

// Get word learning - Backend doesn't have this specific endpoint
export const getWordLearning = async (wordId) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return { wordId, studied: false }
}

// Get word quiz - Backend doesn't have quiz endpoint yet
export const getWordQuiz = async (wordId) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return generateWordQuiz(wordId)
}

// Get lexicon data from backend - Always uses real API
export const getLexicon = async () => {
    try {
        const response = await apiLearning.get('/api/lexicon')
        return response.data
    } catch (error) {
        console.error("Lexicon API Error", error)
        throw new Error(`Failed to load lexicon: ${error.message}`)
    }
}

// Get ayah index from backend - Always uses real API
export const getAyahIndex = async () => {
    try {
        const response = await apiLearning.get('/api/ayah_index')
        return response.data
    } catch (error) {
        console.error("Ayah Index API Error", error)
        throw new Error(`Failed to load ayah index: ${error.message}`)
    }
}

// Get next ayah in sequence - Always uses real API for supported surahs
export const getNextAyah = async (surahId, ayahNum) => {
    if (!AVAILABLE_SURAHS.includes(Number(surahId))) {
        return { surah: null, ayah: null, end: true, error: 'Surah not supported' }
    }

    try {
        const response = await apiLearning.get('/api/next', {
            params: { surah: surahId, ayah: ayahNum }
        })
        return response.data
    } catch (error) {
        console.error("Next Ayah API Error", error)
        throw new Error(`Failed to get next ayah: ${error.message}`)
    }
}

// Check learning service health
export const checkHealth = async () => {
    try {
        const response = await apiLearning.get('/health')
        return response.data
    } catch (error) {
        console.error('Learning Health Check Error:', error)
        return { ok: false, error: error.message }
    }
}

export default {
    getAyahLearning,
    getAyahQuiz,
    submitQuizAnswer,
    getWordLearning,
    getWordQuiz,
    getLexicon,
    getAyahIndex,
    getNextAyah,
    checkHealth
}
