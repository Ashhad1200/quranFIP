// API Service Layer - Currently using mock data
// Set USE_MOCK_DATA to false when real backend is ready

const USE_MOCK_DATA = true // Toggle this when backend is available
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

// Simulated API delay
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

// Mock/Real API wrapper
const apiRequest = async (endpoint, options = {}) => {
    if (USE_MOCK_DATA) {
        await simulateDelay()
        // Will be replaced with actual fetch when USE_MOCK_DATA = false
        return null
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    })

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
}

export { apiRequest, USE_MOCK_DATA }
