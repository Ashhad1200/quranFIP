import axios from 'axios'

// Environment variables for backend service URLs
const CHATBOT_URL = import.meta.env.VITE_API_CHATBOT_URL || 'http://localhost:8001'
const LEARNING_URL = import.meta.env.VITE_API_LEARNING_URL || 'http://localhost:8002'
const PRONUNCIATION_URL = import.meta.env.VITE_API_PRONUNCIATION_URL || 'http://localhost:8003'

// 1. Chatbot Service API
export const apiChatbot = axios.create({
    baseURL: CHATBOT_URL,
    timeout: 30000, // 30 second timeout for LLM responses
    headers: {
        'Content-Type': 'application/json',
    },
})

// 2. Ayah Learning Service API
export const apiLearning = axios.create({
    baseURL: LEARNING_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// 3. Pronunciation Service API
export const apiPronunciation = axios.create({
    baseURL: PRONUNCIATION_URL,
    timeout: 30000, // 30 second timeout for audio processing
})

// Unified error handling with helpful messages
const handleApiError = (error) => {
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        error.message = 'Backend server is not running. Please start the Docker containers.'
    }
    console.error('API Error:', error.message)
    return Promise.reject(error)
}

apiChatbot.interceptors.response.use((response) => response, handleApiError)
apiLearning.interceptors.response.use((response) => response, handleApiError)
apiPronunciation.interceptors.response.use((response) => response, handleApiError)

// Unified health check for all services
export const checkAllServicesHealth = async () => {
    const results = {
        chatbot: { status: 'unknown', url: CHATBOT_URL },
        learning: { status: 'unknown', url: LEARNING_URL },
        pronunciation: { status: 'unknown', url: PRONUNCIATION_URL }
    }

    try {
        const chatbotRes = await apiChatbot.get('/health')
        results.chatbot = { ...chatbotRes.data, status: 'ok', url: CHATBOT_URL }
    } catch (e) {
        results.chatbot = { status: 'error', error: e.message, url: CHATBOT_URL }
    }

    try {
        const learningRes = await apiLearning.get('/health')
        results.learning = { ...learningRes.data, status: 'ok', url: LEARNING_URL }
    } catch (e) {
        results.learning = { status: 'error', error: e.message, url: LEARNING_URL }
    }

    try {
        const pronunciationRes = await apiPronunciation.get('/health')
        results.pronunciation = { ...pronunciationRes.data, status: 'ok', url: PRONUNCIATION_URL }
    } catch (e) {
        results.pronunciation = { status: 'error', error: e.message, url: PRONUNCIATION_URL }
    }

    return results
}

// Export URLs for debugging
export const API_URLS = {
    chatbot: CHATBOT_URL,
    learning: LEARNING_URL,
    pronunciation: PRONUNCIATION_URL
}

// Log API configuration on startup (dev mode only)
if (import.meta.env.DEV) {
    console.log('📡 API Configuration:')
    console.log(`   Chatbot: ${CHATBOT_URL}`)
    console.log(`   Learning: ${LEARNING_URL}`)
    console.log(`   Pronunciation: ${PRONUNCIATION_URL}`)
}
