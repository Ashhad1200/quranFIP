import { createSlice } from '@reduxjs/toolkit'

const learnSlice = createSlice({
    name: 'learn',
    initialState: {
        progress: {}, // Keyed by ayahId/wordId
        completedAyahs: [],
        completedWords: [],
        totalWordsLearned: 0,
        totalAyahsLearned: 0
    },
    reducers: {
        markAyahStudied: (state, action) => {
            const ayahId = action.payload
            if (!state.completedAyahs.includes(ayahId)) {
                state.completedAyahs.push(ayahId)
                state.totalAyahsLearned += 1
            }
            state.progress[`ayah_${ayahId}`] = {
                type: 'ayah',
                id: ayahId,
                completedAt: new Date().toISOString(),
                studied: true
            }
        },
        markWordStudied: (state, action) => {
            const wordId = action.payload
            if (!state.completedWords.includes(wordId)) {
                state.completedWords.push(wordId)
                state.totalWordsLearned += 1
            }
            state.progress[`word_${wordId}`] = {
                type: 'word',
                id: wordId,
                completedAt: new Date().toISOString(),
                studied: true
            }
        },
        resetProgress: (state) => {
            state.progress = {}
            state.completedAyahs = []
            state.completedWords = []
            state.totalWordsLearned = 0
            state.totalAyahsLearned = 0
        }
    }
})

export const {
    markAyahStudied,
    markWordStudied,
    resetProgress
} = learnSlice.actions

// Selectors
export const selectLearnProgress = (state) => state.learn.progress
export const selectCompletedAyahs = (state) => state.learn.completedAyahs
export const selectCompletedWords = (state) => state.learn.completedWords
export const selectTotalWordsLearned = (state) => state.learn.totalWordsLearned
export const selectTotalAyahsLearned = (state) => state.learn.totalAyahsLearned
export const selectIsAyahCompleted = (ayahId) => (state) =>
    state.learn.completedAyahs.includes(ayahId)
export const selectIsWordCompleted = (wordId) => (state) =>
    state.learn.completedWords.includes(wordId)

export default learnSlice.reducer
