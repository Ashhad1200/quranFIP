import { apiChatbot } from './api'

// Send chatbot query - Always uses real backend
export const sendChatbotQuery = async (message, language = 'en') => {
    try {
        // Backend expects: { query: "...", lang: "en", top_k: 3, show_tafsir: true }
        const response = await apiChatbot.post('/query', {
            query: message,
            lang: language,
            top_k: 3,
            show_tafsir: true
        })

        const data = response.data

        // Check if it's a pronunciation response
        if (data.pronunciation !== undefined) {
            return {
                type: 'pronunciation',
                text: data.pronunciation.length > 0
                    ? `Pronunciation guide for "${data.pronunciation[0]?.arabic || message}":\n${data.pronunciation.map(p => `${p.arabic} - ${p.transliteration}`).join('\n')}`
                    : 'No pronunciation found.',
                pronunciations: data.pronunciation,
                cautions: data.cautions || []
            }
        }

        // QuranAnswer response
        return {
            type: 'quran',
            text: data.response,
            ayahRef: data.ayah_ref,
            ayahArabic: data.ayah_arabic,
            translation: data.translation,
            tafsirSnippet: data.tafsir_snippet,
            keyThemes: data.key_themes || [],
            cautions: data.cautions || [],
            retrieval: data.retrieval,
            relatedAyahs: data.retrieval?.candidates?.map(c => ({
                ref: c.ref,
                score: c.score
            })) || []
        }
    } catch (error) {
        console.error('Chatbot API Error:', error)
        // Return a friendly error response instead of throwing
        return {
            type: 'error',
            text: 'Sorry, I am unable to connect to the server right now. Please make sure the backend is running.',
            error: error.message
        }
    }
}

// Get chat history (backend doesn't have this endpoint yet)
export const getChatHistory = async () => {
    return []
}

// Check chatbot service health
export const checkHealth = async () => {
    try {
        const response = await apiChatbot.get('/health')
        return response.data
    } catch (error) {
        console.error('Chatbot Health Check Error:', error)
        return { status: 'error', error: error.message }
    }
}

export default {
    sendChatbotQuery,
    getChatHistory,
    checkHealth
}
