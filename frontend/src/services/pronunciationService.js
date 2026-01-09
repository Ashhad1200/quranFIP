import { apiRequest, USE_MOCK_DATA } from './api'

// Submit word pronunciation recording
export const submitWordRecording = async (audioBlob, wordId) => {
    if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        // Mock feedback - randomize for demo
        const scores = [65, 75, 85, 90, 95]
        const score = scores[Math.floor(Math.random() * scores.length)]

        let level = 'good'
        if (score < 70) level = 'wrong'
        else if (score < 85) level = 'intermediate'

        return {
            score,
            level,
            feedback: level === 'good'
                ? 'Excellent pronunciation! Mashallah!'
                : level === 'intermediate'
                    ? 'Good attempt! Keep practicing.'
                    : 'Try again. Focus on the Tajweed rules.'
        }
    }

    const formData = new FormData()
    formData.append('audio', audioBlob)
    formData.append('wordId', wordId)

    return apiRequest('/pronunciation/word', {
        method: 'POST',
        body: formData,
        headers: {} // Let browser set Content-Type for FormData
    })
}

// Submit ayah pronunciation recording (FYP-2)
export const submitAyahRecording = async (audioBlob, ayahId) => {
    if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 1500))
        return {
            score: 80,
            level: 'good',
            feedback: 'Well done! Your ayah recitation is improving.'
        }
    }

    const formData = new FormData()
    formData.append('audio', audioBlob)
    formData.append('ayahId', ayahId)

    return apiRequest('/pronunciation/ayah', {
        method: 'POST',
        body: formData,
        headers: {}
    })
}

export default {
    submitWordRecording,
    submitAyahRecording
}
