import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAyahs, getAyahById } from '@services/quranService'

// Async thunks
export const fetchAyahsBySurah = createAsyncThunk(
    'ayah/fetchAyahsBySurah',
    async (surahId) => {
        const response = await getAyahs(surahId)
        return { surahId, ayahs: response }
    }
)

export const fetchAyahById = createAsyncThunk(
    'ayah/fetchAyahById',
    async (ayahId) => {
        const response = await getAyahById(ayahId)
        return response
    }
)

const ayahSlice = createSlice({
    name: 'ayah',
    initialState: {
        ayahs: {}, // Keyed by surahId
        currentAyah: null,
        selectedTranslation: 'english', // 'english' or 'urdu'
        showWordByWord: false,
        loading: false,
        error: null
    },
    reducers: {
        selectAyah: (state, action) => {
            state.currentAyah = action.payload
        },
        toggleTranslation: (state, action) => {
            state.selectedTranslation = action.payload
        },
        toggleWordByWord: (state) => {
            state.showWordByWord = !state.showWordByWord
        },
        setWordByWord: (state, action) => {
            state.showWordByWord = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch ayahs by surah
            .addCase(fetchAyahsBySurah.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAyahsBySurah.fulfilled, (state, action) => {
                state.loading = false
                const { surahId, ayahs } = action.payload
                state.ayahs[surahId] = ayahs
            })
            .addCase(fetchAyahsBySurah.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Fetch ayah by ID
            .addCase(fetchAyahById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAyahById.fulfilled, (state, action) => {
                state.loading = false
                state.currentAyah = action.payload
            })
            .addCase(fetchAyahById.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const {
    selectAyah,
    toggleTranslation,
    toggleWordByWord,
    setWordByWord
} = ayahSlice.actions

// Selectors
export const selectAyahsBySurah = (surahId) => (state) =>
    state.ayah.ayahs[surahId] || []
export const selectCurrentAyah = (state) => state.ayah.currentAyah
export const selectTranslationLang = (state) => state.ayah.selectedTranslation
export const selectWordByWordMode = (state) => state.ayah.showWordByWord
export const selectAyahLoading = (state) => state.ayah.loading

export default ayahSlice.reducer
