import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSurahs, getSurahById } from '@services/quranService'

// Async thunks
export const fetchSurahs = createAsyncThunk(
    'surah/fetchSurahs',
    async () => {
        const response = await getSurahs()
        return response
    }
)

export const fetchSurahById = createAsyncThunk(
    'surah/fetchSurahById',
    async (surahId) => {
        const response = await getSurahById(surahId)
        return response
    }
)

const surahSlice = createSlice({
    name: 'surah',
    initialState: {
        surahs: [],
        currentSurah: null,
        searchQuery: '',
        filteredSurahs: [],
        loading: false,
        error: null
    },
    reducers: {
        selectSurah: (state, action) => {
            state.currentSurah = action.payload
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
            if (action.payload === '') {
                state.filteredSurahs = state.surahs
            } else {
                const query = action.payload.toLowerCase()
                state.filteredSurahs = state.surahs.filter(surah =>
                    surah.nameEnglish.toLowerCase().includes(query) ||
                    surah.nameArabic.includes(query) ||
                    surah.number.toString().includes(query)
                )
            }
        },
        clearSearch: (state) => {
            state.searchQuery = ''
            state.filteredSurahs = state.surahs
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch all surahs
            .addCase(fetchSurahs.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSurahs.fulfilled, (state, action) => {
                state.loading = false
                state.surahs = action.payload
                state.filteredSurahs = action.payload
            })
            .addCase(fetchSurahs.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Fetch surah by ID
            .addCase(fetchSurahById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSurahById.fulfilled, (state, action) => {
                state.loading = false
                state.currentSurah = action.payload
            })
            .addCase(fetchSurahById.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const { selectSurah, setSearchQuery, clearSearch } = surahSlice.actions

// Selectors
export const selectAllSurahs = (state) => state.surah.surahs
export const selectFilteredSurahs = (state) => state.surah.filteredSurahs
export const selectCurrentSurah = (state) => state.surah.currentSurah
export const selectSurahLoading = (state) => state.surah.loading
export const selectSearchQuery = (state) => state.surah.searchQuery

export default surahSlice.reducer
