import { apiRequest, USE_MOCK_DATA } from './api'
import { getBotResponse as getMockBotResponse } from '@mockData/chatbot'

// Send chatbot query
export const sendChatbotQuery = async (message) => {
    if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 800))
        return getMockBotResponse(message)
    }

    return apiRequest('/chatbot/query', {
        method: 'POST',
        body: JSON.stringify({ message })
    })
}

// Get chat history (optional)
export const getChatHistory = async () => {
    if (USE_MOCK_DATA) {
        return []
    }

    return apiRequest('/chatbot/history')
}

export default {
    sendChatbotQuery,
    getChatHistory
}
