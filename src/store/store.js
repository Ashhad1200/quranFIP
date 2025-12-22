import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'

// Import slices
import surahReducer from './slices/surahSlice'
import ayahReducer from './slices/ayahSlice'
import learnReducer from './slices/learnSlice'
import quizReducer from './slices/quizSlice'
import pronunciationReducer from './slices/pronunciationSlice'
import chatbotReducer from './slices/chatbotSlice'
import uiReducer from './slices/uiSlice'

// Combine all reducers
const rootReducer = combineReducers({
    surah: surahReducer,
    ayah: ayahReducer,
    learn: learnReducer,
    quiz: quizReducer,
    pronunciation: pronunciationReducer,
    chatbot: chatbotReducer,
    ui: uiReducer
})

// Persist config
const persistConfig = {
    key: 'quranlearnai',
    version: 1,
    storage,
    whitelist: ['learn', 'ui'], // Only persist learn progress and UI state
    blacklist: ['chatbot'] // Don't persist chat history
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
            }
        }),
    devTools: process.env.NODE_ENV !== 'production'
})

export const persistor = persistStore(store)
