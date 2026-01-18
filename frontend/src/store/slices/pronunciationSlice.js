import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    submitWordRecording,
    submitAyahRecording,
    submitSurahRecording
} from '@services/pronunciationService'

// Async thunk for word pronunciation evaluation
export const evaluateWordPronunciation = createAsyncThunk(
    'pronunciation/evaluateWord',
    async ({ audioBlob, wordId }, { rejectWithValue }) => {
        try {
            const response = await submitWordRecording(audioBlob, wordId)
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

// Async thunk for ayah pronunciation evaluation
export const evaluateAyahPronunciation = createAsyncThunk(
    'pronunciation/evaluateAyah',
    async ({ audioBlob, ayahId }, { rejectWithValue }) => {
        try {
            const response = await submitAyahRecording(audioBlob, ayahId)
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

// Async thunk for surah pronunciation evaluation
export const evaluateSurahPronunciation = createAsyncThunk(
    'pronunciation/evaluateSurah',
    async ({ audioBlob, surahId }, { rejectWithValue }) => {
        try {
            const response = await submitSurahRecording(audioBlob, surahId)
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

const pronunciationSlice = createSlice({
    name: 'pronunciation',
    initialState: {
        recordings: [],
        currentRecording: null,
        feedback: null, // { score: 85, level: 'good'|'intermediate'|'wrong', feedback: '...', details: {...} }
        isRecording: false,
        isEvaluating: false,
        audioBlob: null,
        error: null
    },
    reducers: {
        startRecording: (state) => {
            state.isRecording = true
            state.feedback = null
            state.audioBlob = null
            state.error = null
        },
        stopRecording: (state, action) => {
            state.isRecording = false
            state.audioBlob = action.payload
        },
        receiveFeedback: (state, action) => {
            state.feedback = action.payload
        },
        clearFeedback: (state) => {
            state.feedback = null
            state.audioBlob = null
            state.error = null
        },
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        // Word evaluation
        builder
            .addCase(evaluateWordPronunciation.pending, (state) => {
                state.isEvaluating = true
                state.error = null
            })
            .addCase(evaluateWordPronunciation.fulfilled, (state, action) => {
                state.isEvaluating = false
                state.feedback = action.payload
                state.currentRecording = {
                    id: Date.now(),
                    type: 'word',
                    timestamp: new Date().toISOString(),
                    feedback: action.payload
                }
                state.recordings.push(state.currentRecording)
            })
            .addCase(evaluateWordPronunciation.rejected, (state, action) => {
                state.isEvaluating = false
                state.error = action.payload || 'Failed to evaluate pronunciation'
            })

        // Ayah evaluation
        builder
            .addCase(evaluateAyahPronunciation.pending, (state) => {
                state.isEvaluating = true
                state.error = null
            })
            .addCase(evaluateAyahPronunciation.fulfilled, (state, action) => {
                state.isEvaluating = false
                state.feedback = action.payload
                state.currentRecording = {
                    id: Date.now(),
                    type: 'ayah',
                    timestamp: new Date().toISOString(),
                    feedback: action.payload
                }
                state.recordings.push(state.currentRecording)
            })
            .addCase(evaluateAyahPronunciation.rejected, (state, action) => {
                state.isEvaluating = false
                state.error = action.payload || 'Failed to evaluate ayah recitation'
            })

        // Surah evaluation
        builder
            .addCase(evaluateSurahPronunciation.pending, (state) => {
                state.isEvaluating = true
                state.error = null
            })
            .addCase(evaluateSurahPronunciation.fulfilled, (state, action) => {
                state.isEvaluating = false
                state.feedback = action.payload
                state.currentRecording = {
                    id: Date.now(),
                    type: 'surah',
                    timestamp: new Date().toISOString(),
                    feedback: action.payload
                }
                state.recordings.push(state.currentRecording)
            })
            .addCase(evaluateSurahPronunciation.rejected, (state, action) => {
                state.isEvaluating = false
                state.error = action.payload || 'Failed to evaluate surah recitation'
            })
    }
})

export const {
    startRecording,
    stopRecording,
    receiveFeedback,
    clearFeedback,
    clearError
} = pronunciationSlice.actions

// Selectors
export const selectIsRecording = (state) => state.pronunciation.isRecording
export const selectIsEvaluating = (state) => state.pronunciation.isEvaluating
export const selectFeedback = (state) => state.pronunciation.feedback
export const selectRecordings = (state) => state.pronunciation.recordings
export const selectPronunciationError = (state) => state.pronunciation.error

export default pronunciationSlice.reducer
