import { useState, useRef, useCallback } from 'react'

/**
 * Custom hook for audio recording using MediaRecorder API
 * @returns {object} Recording state and controls
 */
function useAudioRecorder() {
    const [isRecording, setIsRecording] = useState(false)
    const [audioBlob, setAudioBlob] = useState(null)
    const [error, setError] = useState(null)

    const mediaRecorderRef = useRef(null)
    const chunksRef = useRef([])

    const startRecording = useCallback(async () => {
        try {
            setError(null)

            // Request microphone permission
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            })

            // Create MediaRecorder instance
            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm;codecs=opus'
            })

            chunksRef.current = []

            // Handle data available event
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data)
                }
            }

            // Handle recording stop
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm;codecs=opus' })
                setAudioBlob(blob)

                // Stop all tracks
                stream.getTracks().forEach(track => track.stop())
            }

            mediaRecorderRef.current = mediaRecorder
            mediaRecorder.start()
            setIsRecording(true)

        } catch (err) {
            console.error('Error accessing microphone:', err)
            setError('Microphone access denied. Please allow microphone permissions.')
        }
    }, [])

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
        }
    }, [isRecording])

    const clearRecording = useCallback(() => {
        setAudioBlob(null)
        chunksRef.current = []
    }, [])

    return {
        isRecording,
        audioBlob,
        error,
        startRecording,
        stopRecording,
        clearRecording
    }
}

export default useAudioRecorder
