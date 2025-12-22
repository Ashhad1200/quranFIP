// Mock chatbot responses with keyword matching

const QUICK_RESPONSES = {
    greeting: [
        'As-Salaam-Alaikum! How can I assist you in your Quran learning journey today?',
        'Peace be upon you! I\'m here to help you learn and understand the Quran.',
        'Welcome! Ask me anything about the Quran, Tafseer, or learning guidance.'
    ],
    ayah_explanation: [
        'This ayah emphasizes the importance of seeking guidance from Allah...',
        'The meaning of this sacred verse teaches us about...',
        'According to authentic Tafseer, this ayah explains...'
    ],
    tafseer: [
        'The classical scholars have explained this passage as...',
        'Ibn Kathir mentions in his Tafseer that...',
        'According to Tafsir al-Jalalayn, this verse means...'
    ],
    learning_help: [
        'Start with shorter surahs like Al-Fatiha and Al-Ikhlas.',
        'Practice word-by-word to build your vocabulary.',
        'Use our pronunciation assistant to perfect your recitation!'
    ],
    pronunciation: [
        'Focus on Tajweed rules for proper pronunciation.',
        'Try our pronunciation assistant feature to get real-time feedback.',
        'Practice slowly and repeat difficult words multiple times.'
    ],
    default: [
        'I\'m here to help with Quran learning. You can ask about ayah meanings, Tafseer, or learning guidance.',
        'That\'s an interesting question! Could you please be more specific?',
        'I can help you understand the Quran better. What would you like to know?'
    ]
}

const detectIntent = (message) => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.match(/salam|hello|hi|hey/)) return 'greeting'
    if (lowerMessage.match(/explain|meaning|what does|tell me about/)) return 'ayah_explanation'
    if (lowerMessage.match(/tafseer|tafsir|commentary|interpretation/)) return 'tafseer'
    if (lowerMessage.match(/learn|study| help|guide|start/)) return 'learning_help'
    if (lowerMessage.match(/pronounce|pronunciation|recite|tajweed/)) return 'pronunciation'

    return 'default'
}

export const getBotResponse = (userMessage) => {
    const intent = detectIntent(userMessage)
    const responses = QUICK_RESPONSES[intent]
    const randomIndex = Math.floor(Math.random() * responses.length)

    return {
        text: responses[randomIndex],
        reference: intent === 'tafseer' ? 'Tafsir Ibn Kathir' : null
    }
}

export const QUICK_ACTIONS = [
    { id: 1, label: 'Explain this Ayah', icon: '📖', query: 'Can you explain this ayah?' },
    { id: 2, label: 'Tafseer', icon: '📚', query: 'Show me the Tafseer for this verse' },
    { id: 3, label: 'Help me learn', icon: '🎓', query: 'How can I start learning the Quran?' },
    { id: 4, label: 'Pronunciation help', icon: '🎤', query: 'Help me with pronunciation and Tajweed' }
]

export default { getBotResponse, QUICK_ACTIONS }
