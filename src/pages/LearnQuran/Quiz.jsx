import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchQuiz,
  selectQuestions,
  selectCurrentQuestion,
  selectCurrentQuestionIndex,
  selectQuizScore,
  selectQuizCompleted,
  selectWrongAttempts,
  answerQuestion,
  nextQuestion,
  completeQuiz,
  retryQuiz,
  resetQuiz
} from '@store/slices/quizSlice'
import { markAyahStudied } from '@store/slices/learnSlice'
import Button from '@components/common/Button/Button'
import styles from './Quiz.module.css'

function Quiz() {
  const { type, id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const questions = useSelector(selectQuestions)
  const currentQuestion = useSelector(selectCurrentQuestion)
  const currentIndex = useSelector(selectCurrentQuestionIndex)
  const score = useSelector(selectQuizScore)
  const completed = useSelector(selectQuizCompleted)
  const wrongAttempts = useSelector(selectWrongAttempts(currentIndex))

  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [studiedWord, setStudiedWord] = useState(false)

  useEffect(() => {
    dispatch(fetchQuiz({ type, id }))

    return () => {
      dispatch(resetQuiz())
    }
  }, [dispatch, type, id])

  const handleReciteWord = () => {
    // Placeholder for audio playback
    alert('🎤 Audio playback coming in FYP-2!')
  }

  const handleStudied = () => {
    setStudiedWord(true)
  }

  const handleAnswerSelect = (answer) => {
    if (showFeedback) return // Prevent re-selection after answering

    setSelectedAnswer(answer)
    const isCorrect = answer === currentQuestion.correctAnswer

    dispatch(answerQuestion({
      questionIndex: currentIndex,
      answer,
      isCorrect
    }))

    setShowFeedback(true)

    // Auto-proceed to next question after 2 seconds
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        dispatch(nextQuestion())
        setSelectedAnswer(null)
        setShowFeedback(false)
        setStudiedWord(false)
      } else {
        // Complete quiz
        dispatch(completeQuiz())
        if (type === 'ayah') {
          dispatch(markAyahStudied(id))
        }
      }
    }, 2000)
  }

  const handleRetry = () => {
    dispatch(retryQuiz())
    setSelectedAnswer(null)
    setShowFeedback(false)
    setStudiedWord(false)
  }

  const handleExit = () => {
    navigate('/learn')
  }

  // Auto-select correct answer after 3 wrong attempts
  useEffect(() => {
    if (wrongAttempts >= 3 && !showFeedback) {
      handleAnswerSelect(currentQuestion?.correctAnswer)
    }
  }, [wrongAttempts])

  if (!currentQuestion && !completed) {
    return (
      <div className={styles.loading}>
        <div className="spinner" />
        <p>Loading Quiz...</p>
      </div>
    )
  }

  // Quiz Summary Screen
  if (completed) {
    const totalWords = questions.length
    const percentage = Math.round((score / totalWords) * 100)

    return (
      <div className={styles.quiz}>
        <div className={`container ${styles.container}`}>
          <div className={styles.summary}>
            <div className={styles.summaryIcon}>🎉</div>

            <h1 className={`${styles.summaryTitle} gradient-text`}>
              Mashallah, you did great!
            </h1>

            <div className={styles.summaryStats}>
              <div className={styles.statBox}>
                <div className={styles.statValue}>{score}</div>
                <div className={styles.statLabel}>Correct Answers</div>
              </div>

              <div className={styles.statBox}>
                <div className={styles.statValue}>{totalWords}</div>
                <div className={styles.statLabel}>Words Reviewed</div>
              </div>

              <div className={styles.statBox}>
                <div className={styles.statValue}>{percentage}%</div>
                <div className={styles.statLabel}>Final Score</div>
              </div>
            </div>

            <div className={styles.motivationalMessage}>
              {percentage >= 80 ? (
                <p>🌟 Excellent work! You're mastering the Quran beautifully!</p>
              ) : percentage >= 60 ? (
                <p>✨ Good job! Keep practicing to improve further!</p>
              ) : (
                <p>💪 Great effort! Review the words again to strengthen your knowledge.</p>
              )}
            </div>

            <div className={styles.summaryActions}>
              <Button variant="secondary" size="large" onClick={handleRetry}>
                🔄 Retry Quiz
              </Button>
              <Button variant="primary" size="large" onClick={handleExit}>
                ✅ Continue Learning
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Mandatory Quiz Flow Template
  return (
    <div className={styles.quiz}>
      <div className={`container ${styles.container}`}>
        {/* Progress Bar */}
        <div className={styles.progress}>
          <div className={styles.progressLabel}>
            Question {currentIndex + 1} of {questions.length}
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Word Display */}
        <div className={styles.wordSection}>
          <h2 className={`${styles.arabicWord} arabic-text`}>
            {currentQuestion.word}
          </h2>

          {!studiedWord && (
            <p className={styles.instruction}>
              Study this word before taking the quiz
            </p>
          )}
        </div>

        {/* Translation Display (shown immediately) */}
        <div className={styles.translationBox}>
          <div className={styles.translationLabel}>Meaning:</div>
          <div className={styles.translationText}>
            {currentQuestion.translation}
          </div>
        </div>

        {/* Action Buttons */}
        {!studiedWord ? (
          <div className={styles.studyActions}>
            <Button
              variant="secondary"
              size="large"
              onClick={handleReciteWord}
            >
              🎤 Recite Word
            </Button>
            <Button
              variant="primary"
              size="large"
              onClick={handleStudied}
            >
              ✓ I've studied this
            </Button>
          </div>
        ) : (
          <>
            {/* MCQ Options */}
            <div className={styles.optionsSection}>
              <p className={styles.questionPrompt}>
                What is the meaning of this word?
              </p>

              <div className={styles.options}>
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswer === option
                  const isCorrect = option === currentQuestion.correctAnswer
                  const isWrong = isSelected && !isCorrect

                  let optionClass = styles.option
                  if (showFeedback) {
                    if (isCorrect) optionClass += ` ${styles.correct}`
                    else if (isWrong) optionClass += ` ${styles.wrong}`
                  }
                  if (isSelected && !showFeedback) optionClass += ` ${styles.selected}`

                  return (
                    <button
                      key={idx}
                      className={optionClass}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={showFeedback}
                    >
                      <span className={styles.optionLetter}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className={styles.optionText}>{option}</span>
                      {showFeedback && isCorrect && (
                        <span className={styles.optionIcon}>✓</span>
                      )}
                      {showFeedback && isWrong && (
                        <span className={styles.optionIcon}>✗</span>
                      )}
                    </button>
                  )
                })}
              </div>

              {wrongAttempts > 0 && !showFeedback && (
                <p className={styles.wrongAttemptMessage}>
                  ❌ Wrong attempt {wrongAttempts}/3. Try again!
                  {wrongAttempts === 2 && " (One more wrong answer will auto-select the correct one)"}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Quiz
