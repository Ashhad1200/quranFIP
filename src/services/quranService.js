import { apiRequest, USE_MOCK_DATA } from './api'
import MOCK_SURAHS, { getSurahById as getMockSurahById } from '@mockData/surahs'
import MOCK_AYAHS, { getAyahsBySurah as getMockAyahsBySurah, getAyahById as getMockAyahById } from '@mockData/ayahs'

// Get all surahs
export const getSurahs = async () => {
    if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300))
        return MOCK_SURAHS
    }

    return apiRequest('/surahs')
}

// Get surah by ID
export const getSurahById = async (surahId) => {
    if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 200))
        return getMockSurahById(surahId)
    }

    return apiRequest(`/surahs/${surahId}`)
}

// Get ayahs by surah
export const getAyahs = async (surahId) => {
    if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 400))
        return getMockAyahsBySurah(surahId)
    }

    return apiRequest(`/ayahs?surah=${surahId}`)
}

// Get ayah by ID
export const getAyahById = async (ayahId) => {
    if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 200))
        return getMockAyahById(ayahId)
    }

    return apiRequest(`/ayahs/${ayahId}`)
}

export default {
    getSurahs,
    getSurahById,
    getAyahs,
    getAyahById
}
