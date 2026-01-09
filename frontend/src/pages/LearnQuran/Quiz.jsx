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
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="animate-spin text-4xl">⏳</div>
        <p className="text-text-secondary">Loading Quiz...</p>
      </div>
    )
  }

  // Quiz Summary Screen
  if (completed) {
    const totalWords = questions.length
    const percentage = Math.round((score / totalWords) * 100)

    return (
      <div className="min-h-screen py-24">
        <div className="container px-4 max-w-xl">
          <div className="glass p-8 rounded-2xl text-center space-y-8">
            <div className="text-7xl">🎉</div>

            <h1 className="gradient-text text-4xl font-bold">
              Mashallah, you did great!
            </h1>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-dark-tertiary p-4 rounded-xl">
                <div className="text-3xl font-bold text-lime-neon">{score}</div>
                <div className="text-xs text-text-secondary uppercase tracking-wider">Correct Answers</div>
              </div>

              <div className="bg-dark-tertiary p-4 rounded-xl">
                <div className="text-3xl font-bold text-lime-neon">{totalWords}</div>
                <div className="text-xs text-text-secondary uppercase tracking-wider">Words Reviewed</div>
              </div>

              <div className="bg-dark-tertiary p-4 rounded-xl">
                <div className="text-3xl font-bold text-lime-neon">{percentage}%</div>
                <div className="text-xs text-text-secondary uppercase tracking-wider">Final Score</div>
              </div>
            </div>

            <div className="text-text-secondary">
              {percentage >= 80 ? (
                <p>🌟 Excellent work! You're mastering the Quran beautifully!</p>
              ) : percentage >= 60 ? (
                <p>✨ Good job! Keep practicing to improve further!</p>
              ) : (
                <p>💪 Great effort! Review the words again to strengthen your knowledge.</p>
              )}
            </div>

            <div className="flex gap-4 justify-center">
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
    <div className="min-h-screen py-24">
      <div className="container px-4 max-w-xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-text-secondary">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>
          <div className="h-2 bg-dark-tertiary rounded-full overflow-hidden">
            <div
              className="h-full bg-lime-neon rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Word Display */}
        <div className="glass p-8 rounded-2xl text-center mb-6">
          <h2 className="arabic-text text-5xl text-text-primary mb-4">
            {currentQuestion.word}
          </h2>

          {!studiedWord && (
            <p className="text-text-secondary text-sm">
              Study this word before taking the quiz
            </p>
          )}
        </div>

        {/* Translation Display (shown immediately) */}
        <div className="bg-dark-secondary p-6 rounded-xl text-center mb-6">
          <div className="text-xs text-text-tertiary uppercase tracking-wider mb-2">Meaning:</div>
          <div className="text-lg text-lime-neon font-medium">
            {currentQuestion.translation}
          </div>
        </div>

        {/* Action Buttons */}
        {!studiedWord ? (
          <div className="flex gap-4 justify-center">
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
            <div className="space-y-4">
              <p className="text-center text-text-secondary mb-4">
                What is the meaning of this word?
              </p>

              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswer === option
                  const isCorrect = option === currentQuestion.correctAnswer
                  const isWrong = isSelected && !isCorrect

                  let optionClass = "w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer text-left "
                  if (showFeedback) {
                    if (isCorrect) optionClass += "bg-success/20 border-success animate-quiz-correct"
                    else if (isWrong) optionClass += "bg-error/20 border-error animate-quiz-wrong"
                    else optionClass += "bg-dark-tertiary border-white/10 opacity-50"
                  } else if (isSelected) {
                    optionClass += "bg-lime-neon/10 border-lime-neon"
                  } else {
                    optionClass += "bg-dark-tertiary border-white/10 hover:border-lime-neon/30"
                  }

                  return (
                    <button
                      key={idx}
                      className={optionClass}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={showFeedback}
                    >
                      <span className="w-8 h-8 rounded-full bg-dark-primary flex items-center justify-center text-sm font-bold text-lime-neon shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 text-text-primary">{option}</span>
                      {showFeedback && isCorrect && (
                        <span className="text-success text-xl">✓</span>
                      )}
                      {showFeedback && isWrong && (
                        <span className="text-error text-xl">✗</span>
                      )}
                    </button>
                  )
                })}
              </div>

              {wrongAttempts > 0 && !showFeedback && (
                <p className="text-center text-error text-sm mt-4">
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
