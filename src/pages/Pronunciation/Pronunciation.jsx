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
import styles from './Pronunciation.module.css'

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
    <div className={styles.pronunciation}>
      <div className={`container ${styles.container}`}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className="gradient-text">Pronunciation Assistant</h1>
          <p className={styles.subtitle}>
            Perfect your Quranic recitation with AI-powered feedback
          </p>
        </div>

        {/* Word Display */}
        <div className={styles.wordCard}>
          <div className={styles.wordLabel}>Practice This Word</div>
          <div className={`${styles.arabicWord} arabic-text`}>
            {currentWord.arabic}
          </div>
          <div className={styles.transliteration}>
            {currentWord.transliteration}
          </div>
          <div className={styles.translation}>
            {currentWord.translation}
          </div>
        </div>

        {/* Recording Section */}
        {!feedback && (
          <div className={styles.recordingSection}>
            <div className={styles.micContainer}>
              <MicButton
                isRecording={isRecordingLocal}
                onStart={handleStartRecording}
                onStop={handleStopRecording}
              />
            </div>

            <div className={styles.recordingStatus}>
              {isRecordingLocal ? (
                <>
                  <div className={styles.recordingIndicator}>
                    <span className={styles.recordingDot} />
                    Recording in progress...
                  </div>
                  <p className={styles.recordingTip}>
                    Speak clearly and tap again to stop
                  </p>
                </>
              ) : audioBlob ? (
                <>
                  <div className={styles.recordedStatus}>
                    ✓ Recording complete!
                  </div>
                  <div className={styles.recordingActions}>
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
                  <p className={styles.instruction}>
                    Tap the microphone to start recording
                  </p>
                  <p className={styles.tip}>
                    💡 Listen to how the word should sound, then record yourself
                  </p>
                </>
              )}
            </div>

            {recordError && (
              <div className={styles.errorMessage}>
                ⚠️ {recordError}
              </div>
            )}
          </div>
        )}

        {/* Feedback Section */}
        {feedback && (
          <div className={styles.feedbackSection}>
            <FeedbackBadge feedback={feedback} />

            <div className={styles.feedbackActions}>
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
        <div className={styles.tipsCard}>
          <div className={styles.tipsIcon}>🎯</div>
          <div className={styles.tipsContent}>
            <h3>Tajweed Tips</h3>
            <ul>
              <li>Focus on proper Makhraj (articulation points)</li>
              <li>Pay attention to vowel lengths (short vs long)</li>
              <li>Practice Ghunnah for nasal sounds</li>
              <li>Maintain correct pronunciation of heavy/light letters</li>
            </ul>
          </div>
        </div>

        {/* FYP-2 Notice */}
        <div className={styles.notice}>
          <p>
            📝 <strong>Note:</strong> Ayah-level pronunciation practice will be available in FYP-2.
            Currently practicing word-level pronunciation with backend ASR integration.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Pronunciation
