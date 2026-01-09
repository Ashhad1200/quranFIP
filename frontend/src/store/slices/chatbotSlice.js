import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { sendChatbotQuery } from '@services/chatbotService'

// Async thunk
export const sendMessage = createAsyncThunk(
    'chatbot/sendMessage',
    async (message) => {
        const response = await sendChatbotQuery(message)
        return response
    }
)

const chatbotSlice = createSlice({
    name: 'chatbot',
    initialState: {
        messages: [],
        isTyping: false,
        quickActions: [
            { id: 1, label: 'Explain this Ayah', icon: '📖' },
            { id: 2, label: 'Tafseer', icon: '📚' },
            { id: 3, label: 'Help me learn', icon: '🎓' },
            { id: 4, label: 'Pronunciation help', icon: '🎤' }
        ],
        error: null
    },
    reducers: {
        addUserMessage: (state, action) => {
            state.messages.push({
                id: Date.now(),
                text: action.payload,
                sender: 'user',
                timestamp: new Date().toISOString()
            })
        },
        addBotMessage: (state, action) => {
            state.messages.push({
                id: Date.now() + 1,
                text: action.payload.text,
                sender: 'bot',
                timestamp: new Date().toISOString(),
                reference: action.payload.reference || null
            })
            state.isTyping = false
        },
        setTyping: (state, action) => {
            state.isTyping = action.payload
        },
        clearHistory: (state) => {
            state.messages = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.isTyping = true
                state.error = null
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.messages.push({
                    id: Date.now(),
                    text: action.payload.text,
                    sender: 'bot',
                    timestamp: new Date().toISOString(),
                    reference: action.payload.reference || null
                })
                state.isTyping = false
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isTyping = false
                state.error = action.error.message
            })
    }
})

export const {
    addUserMessage,
    addBotMessage,
    setTyping,
    clearHistory
} = chatbotSlice.actions

// Selectors
export const selectMessages = (state) => state.chatbot.messages
export const selectIsTyping = (state) => state.chatbot.isTyping
export const selectQuickActions = (state) => state.chatbot.quickActions

export default chatbotSlice.reducer
