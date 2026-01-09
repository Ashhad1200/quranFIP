import { createSlice } from '@reduxjs/toolkit'

const pronunciationSlice = createSlice({
    name: 'pronunciation',
    initialState: {
        recordings: [],
        currentRecording: null,
        feedback: null, // { score: 85, level: 'good'|'intermediate'|'wrong' }
        isRecording: false,
        audioBlob: null
    },
    reducers: {
        startRecording: (state) => {
            state.isRecording = true
            state.feedback = null
            state.audioBlob = null
        },
        stopRecording: (state, action) => {
            state.isRecording = false
            state.audioBlob = action.payload
        },
        submitRecording: (state, action) => {
            state.currentRecording = {
                id: Date.now(),
                blob: action.payload,
                timestamp: new Date().toISOString()
            }
            state.recordings.push(state.currentRecording)
        },
        receiveFeedback: (state, action) => {
            state.feedback = action.payload
        },
        clearFeedback: (state) => {
            state.feedback = null
            state.audioBlob = null
        }
    }
})

export const {
    startRecording,
    stopRecording,
    submitRecording,
    receiveFeedback,
    clearFeedback
} = pronunciationSlice.actions

// Selectors
export const selectIsRecording = (state) => state.pronunciation.isRecording
export const selectFeedback = (state) => state.pronunciation.feedback
export const selectRecordings = (state) => state.pronunciation.recordings

export default pronunciationSlice.reducer
