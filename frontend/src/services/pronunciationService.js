import { apiPronunciation } from './api'

// Submit word pronunciation recording - Always uses real backend
export const submitWordRecording = async (audioBlob, wordId) => {
    // Parse wordId format: "surah:ayah:word" (e.g., "112:1:1")
    const [surah, ayah, word] = String(wordId).split(':').map(Number)

    const formData = new FormData()
    formData.append('audio', audioBlob, 'recording.wav')
    formData.append('surah', surah)
    formData.append('ayah', ayah)
    formData.append('word', word)

    try {
        const response = await apiPronunciation.post('/evaluate/word', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        // Map backend response to frontend expected format
        const data = response.data
        return {
            score: data.score_percent,
            level: data.label,
            feedback: data.label === 'good'
                ? 'Excellent pronunciation! Mashallah!'
                : data.label === 'intermediate'
                    ? 'Good attempt! Keep practicing.'
                    : 'Try again. Focus on the Tajweed rules.',
            details: {
                dtwDistance: data.dtw_distance,
                avgCost: data.avg_cost,
                color: data.color
            }
        }
    } catch (error) {
        console.error('Pronunciation API Error:', error)
        throw new Error(`Pronunciation evaluation failed: ${error.message}. Make sure the backend is running.`)
    }
}

// Submit ayah pronunciation recording - Always uses real backend
export const submitAyahRecording = async (audioBlob, ayahId) => {
    // Parse ayahId format: "surah:ayah" (e.g., "112:1")
    const [surah, ayah] = String(ayahId).split(':').map(Number)

    const formData = new FormData()
    formData.append('audio', audioBlob, 'recording.wav')
    formData.append('surah', surah)
    formData.append('ayah', ayah)

    try {
        const response = await apiPronunciation.post('/evaluate/ayah', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        const data = response.data
        return {
            score: data.score_percent,
            level: data.label,
            feedback: data.label === 'good'
                ? 'Excellent recitation! Mashallah!'
                : data.label === 'intermediate'
                    ? 'Good attempt! Keep practicing the ayah.'
                    : 'Try again. Focus on the pronunciation.',
            details: {
                dtwDistance: data.dtw_distance,
                avgCost: data.avg_cost,
                color: data.color
            }
        }
    } catch (error) {
        console.error('Pronunciation API Error:', error)
        throw new Error(`Ayah evaluation failed: ${error.message}. Make sure the backend is running.`)
    }
}

// Submit surah pronunciation recording - Always uses real backend
export const submitSurahRecording = async (audioBlob, surahId) => {
    const formData = new FormData()
    formData.append('audio', audioBlob, 'recording.wav')
    formData.append('surah', Number(surahId))

    try {
        const response = await apiPronunciation.post('/evaluate/surah', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        const data = response.data
        return {
            score: data.score_percent,
            level: data.label,
            feedback: data.label === 'good'
                ? 'Excellent surah recitation! Mashallah!'
                : data.label === 'intermediate'
                    ? 'Good attempt! Keep practicing.'
                    : 'Try again. Focus on your recitation.',
            details: {
                dtwDistance: data.dtw_distance,
                avgCost: data.avg_cost,
                color: data.color
            }
        }
    } catch (error) {
        console.error('Pronunciation API Error:', error)
        throw new Error(`Surah evaluation failed: ${error.message}. Make sure the backend is running.`)
    }
}

// Check pronunciation service health
export const checkHealth = async () => {
    try {
        const response = await apiPronunciation.get('/health')
        return response.data
    } catch (error) {
        console.error('Pronunciation Health Check Error:', error)
        return { status: 'error', error: error.message }
    }
}

export default {
    submitWordRecording,
    submitAyahRecording,
    submitSurahRecording,
    checkHealth
}
