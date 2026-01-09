import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  startRecording as startRecordingAction,
  stopRecording as stopRecordingAction,
  submitRecording,
  clearFeedback,
  selectIsRecording,
  selectFeedback
} from '@store/slices/pronunciationSlice'
import { setCurrentPage } from '@store/slices/uiSlice'
import useAudioRecorder from '@hooks/useAudioRecorder'
import MicButton from '@components/pronunciation/MicButton/MicButton'
import FeedbackBadge from '@components/pronunciation/FeedbackBadge/FeedbackBadge'
import Button from '@components/common/Button/Button'

function Pronunciation() {
  const { type, id } = useParams()
  const dispatch = useDispatch()

  const isRecordingStore = useSelector(selectIsRecording)
  const feedback = useSelector(selectFeedback)

  const {
    isRecording: isRecordingLocal,
    audioBlob,
    error: recordError,
    startRecording,
    stopRecording,
    clearRecording
  } = useAudioRecorder()

  const [currentWord, setCurrentWord] = useState({
    arabic: 'بِسْمِ',
    transliteration: 'Bismi',
    translation: 'In the name of'
  })

  useEffect(() => {
    dispatch(setCurrentPage('pronunciation'))

    // Load word/ayah based on type and id
    if (type && id) {
      // Would fetch from API in real implementation
      console.log(`Loading ${type} ${id} for pronunciation practice`)
    }
  }, [dispatch, type, id])

  const handleStartRecording = async () => {
    dispatch(clearFeedback())
    clearRecording()
    dispatch(startRecordingAction())
    await startRecording()
  }

  const handleStopRecording = () => {
    stopRecording()
    dispatch(stopRecordingAction())
  }

  const handleSubmit = async () => {
    if (!audioBlob) return

    // Submit to backend ASR (currently using mock)
    const wordId = id || '1'
    await dispatch(submitRecording({ audioBlob, wordId }))

    // Clear the recording
    clearRecording()
  }

  const handleTryAgain = () => {
    dispatch(clearFeedback())
    clearRecording()
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="gradient-text text-5xl font-bold mb-4">Pronunciation Assistant</h1>
          <p className="text-lg text-text-secondary">
            Perfect your Quranic recitation with AI-powered feedback
          </p>
        </div>

        {/* Word Display */}
        <div className="max-w-md mx-auto glass p-8 rounded-2xl text-center mb-8">
          <div className="text-xs text-text-tertiary uppercase tracking-wider mb-4">Practice This Word</div>
          <div className="arabic-text text-5xl text-text-primary mb-4">
            {currentWord.arabic}
          </div>
          <div className="text-lg font-semibold text-lime-neon mb-2">
            {currentWord.transliteration}
          </div>
          <div className="text-text-secondary">
            {currentWord.translation}
          </div>
        </div>

        {/* Recording Section */}
        {!feedback && (
          <div className="max-w-md mx-auto text-center mb-8">
            <div className="mb-6">
              <MicButton
                isRecording={isRecordingLocal}
                onStart={handleStartRecording}
                onStop={handleStopRecording}
              />
            </div>

            <div className="space-y-3">
              {isRecordingLocal ? (
                <>
                  <div className="flex items-center justify-center gap-2 text-error">
                    <span className="w-3 h-3 bg-error rounded-full animate-pulse" />
                    Recording in progress...
                  </div>
                  <p className="text-sm text-text-tertiary">
                    Speak clearly and tap again to stop
                  </p>
                </>
              ) : audioBlob ? (
                <>
                  <div className="text-success font-medium">
                    ✓ Recording complete!
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Button variant="secondary" onClick={handleTryAgain}>
                      🔄 Record Again
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                      ✓ Submit for Feedback
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-text-secondary">
                    Tap the microphone to start recording
                  </p>
                  <p className="text-sm text-text-tertiary">
                    💡 Listen to how the word should sound, then record yourself
                  </p>
                </>
              )}
            </div>

            {recordError && (
              <div className="mt-4 p-4 bg-error/10 border border-error/30 rounded-lg text-error">
                ⚠️ {recordError}
              </div>
            )}
          </div>
        )}

        {/* Feedback Section */}
        {feedback && (
          <div className="max-w-md mx-auto text-center space-y-6 mb-8">
            <FeedbackBadge feedback={feedback} />

            <div className="flex gap-4 justify-center">
              <Button variant="secondary" size="large" onClick={handleTryAgain}>
                🔄 Try Again
              </Button>
              <Button variant="primary" size="large" onClick={() => window.history.back()}>
                ✓ Continue Learning
              </Button>
            </div>
          </div>
        )}

        {/* Tips Card */}
        <div className="max-w-2xl mx-auto glass p-6 rounded-2xl flex items-start gap-4 mb-8">
          <div className="text-3xl shrink-0">🎯</div>
          <div>
            <h3 className="text-lg font-bold text-text-primary mb-3">Tajweed Tips</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>• Focus on proper Makhraj (articulation points)</li>
              <li>• Pay attention to vowel lengths (short vs long)</li>
              <li>• Practice Ghunnah for nasal sounds</li>
              <li>• Maintain correct pronunciation of heavy/light letters</li>
            </ul>
          </div>
        </div>

        {/* FYP-2 Notice */}
        <div className="max-w-2xl mx-auto p-4 bg-warning/10 border border-warning/30 rounded-lg text-center">
          <p className="text-sm text-text-secondary">
            📝 <strong className="text-warning">Note:</strong> Ayah-level pronunciation practice will be available in FYP-2.
            Currently practicing word-level pronunciation with backend ASR integration.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Pronunciation
