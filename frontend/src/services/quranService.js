import { apiLearning } from './api'
import MOCK_SURAHS, { getSurahById as getMockSurahById } from '@mockData/surahs'

// Backend only supports these Surahs currently
const AVAILABLE_SURAHS = [112, 113, 114]

// Get all surahs - Uses static data as backend doesn't have full surah list endpoint
// This is intentional: the 114 surahs metadata is static and doesn't change
export const getSurahs = async () => {
    return MOCK_SURAHS
}

// Get surah by ID - Uses static data for metadata
export const getSurahById = async (surahId) => {
    return getMockSurahById(surahId)
}

// Get ayahs by surah - Uses real backend for supported surahs
export const getAyahs = async (surahId) => {
    const surahNum = Number(surahId)

    if (!AVAILABLE_SURAHS.includes(surahNum)) {
        console.warn(`Surah ${surahId} not available in backend. Only Surahs 112-114 have word-by-word data.`)
        return []
    }

    try {
        // Fetch all ayahs for the surah from backend
        // Backend provides word-by-word data for surahs 112-114
        const ayahIndex = await apiLearning.get('/api/ayah_index')
        const ayahsForSurah = []

        // Get surah metadata to know how many ayahs
        const surahMeta = getMockSurahById(surahId)
        const ayahCount = surahMeta?.ayahCount || 0

        // Fetch each ayah
        for (let ayahNum = 1; ayahNum <= ayahCount; ayahNum++) {
            try {
                const response = await apiLearning.get(`/api/ayah/${surahNum}/${ayahNum}`)
                const data = response.data

                ayahsForSurah.push({
                    id: `${surahNum}:${ayahNum}`,
                    surahId: surahNum,
                    numberInSurah: ayahNum,
                    number: ayahNum,
                    textArabic: data.arabic,
                    translationEnglish: data.english,
                    translationUrdu: data.urdu || '',
                    audio: data.audio_url,
                    words: data.words?.map((w, idx) => ({
                        id: idx + 1,
                        arabic: w.arabic,
                        translation: w.english,
                        transliteration: w.transliteration || ''
                    })) || []
                })
            } catch (err) {
                console.error(`Error fetching ayah ${surahNum}:${ayahNum}:`, err)
            }
        }

        return ayahsForSurah
    } catch (error) {
        console.error('API Error fetching ayahs:', error)
        throw new Error(`Failed to load ayahs for surah ${surahId}: ${error.message}`)
    }
}

// Get ayah by ID - Uses real backend for supported surahs
export const getAyahById = async (ayahId) => {
    // ayahId format: "112:1" or similar
    const [surahId, ayahNum] = String(ayahId).split(':').map(Number)

    if (!AVAILABLE_SURAHS.includes(surahId)) {
        throw new Error(`Surah ${surahId} is not available. Only Surahs 112-114 are supported by the backend.`)
    }

    try {
        const response = await apiLearning.get(`/api/ayah/${surahId}/${ayahNum}`)
        const data = response.data

        // Map API Response to Frontend Model
        return {
            id: `${surahId}:${ayahNum}`,
            surahId: Number(surahId),
            numberInSurah: Number(ayahNum),
            number: Number(ayahNum),
            textArabic: data.arabic,
            text: {
                arabic: data.arabic,
                english: data.english,
                urdu: data.urdu || "Urdu translation not available"
            },
            translationEnglish: data.english,
            translationUrdu: data.urdu || '',
            audio: data.audio_url,
            words: data.words?.map((w, idx) => ({
                id: idx + 1,
                arabic: w.arabic,
                translation: w.english,
                transliteration: w.transliteration || ""
            })) || []
        }
    } catch (error) {
        console.error('Ayah API Error:', error)
        throw new Error(`Failed to load ayah ${ayahId}: ${error.message}`)
    }
}

// Check if a surah has backend support
export const isSurahSupported = (surahId) => {
    return AVAILABLE_SURAHS.includes(Number(surahId))
}

// Get list of supported surahs
export const getSupportedSurahs = () => {
    return AVAILABLE_SURAHS
}

export default {
    getSurahs,
    getSurahById,
    getAyahs,
    getAyahById,
    isSurahSupported,
    getSupportedSurahs
}
