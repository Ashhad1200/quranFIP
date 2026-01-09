import { apiRequest, USE_MOCK_DATA } from './api'
import { generateAyahQuiz, generateWordQuiz } from '@mockData/quizzes'

// Get ayah learning content
export const getAyahLearning = async (ayahId) => {
    if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300))
        // Return mock ayah with learning metadata
        return {
            ayahId,
            studied: false,
            lastStudied: null
        }
    }

    return apiRequest(`/learn/ayah/${ayahId}`)
}

// Get ayah quiz
export const getAyahQuiz = async (ayahId) => {
    if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500))
        return generateAyahQuiz(ayahId)
    }

    return apiRequest(`/quiz/ayah/${ayahId}`)
}

// Submit quiz answer
export const submitQuizAnswer = async (data) => {
    if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 200))
        return { success: true }
    }

    return apiRequest('/quiz/ayah/submit', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

// Get word learning (FYP-2)
export const getWordLearning = async (wordId) => {
    if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300))
        return { wordId, studied: false }
    }

    return apiRequest(`/learn/word/${wordId}`)
}

// Get word quiz (FYP-2)
export const getWordQuiz = async (wordId) => {
    if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500))
        return generateWordQuiz(wordId)
    }

    return apiRequest(`/quiz/word/${wordId}`)
}

export default {
    getAyahLearning,
    getAyahQuiz,
    submitQuizAnswer,
    getWordLearning,
    getWordQuiz
}
