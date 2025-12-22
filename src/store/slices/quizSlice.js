import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAyahQuiz } from '@services/learnService'

// Async thunk to fetch quiz
export const fetchQuiz = createAsyncThunk(
    'quiz/fetchQuiz',
    async ({ type, id }) => {
        const response = await getAyahQuiz(id) // Will support word quizzes in FYP-2
        return { type, id, quiz: response }
    }
)

const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        currentQuiz: null,
        quizType: null, // 'ayah' or 'word'
        quizId: null,
        questions: [],
        currentQuestionIndex: 0,
        answers: [],
        wrongAttempts: {}, // Keyed by question index
        score: 0,
        totalQuestions: 0,
        completed: false,
        loading: false,
        error: null
    },
    reducers: {
        answerQuestion: (state, action) => {
            const { questionIndex, answer, isCorrect } = action.payload

            // Record answer
            state.answers[questionIndex] = answer

            // Track wrong attempts
            if (!isCorrect) {
                state.wrongAttempts[questionIndex] = (state.wrongAttempts[questionIndex] || 0) + 1

                // Auto-select after 3 wrong attempts
                if (state.wrongAttempts[questionIndex] >= 3) {
                    const correctAnswer = state.questions[questionIndex]?.correctAnswer
                    state.answers[questionIndex] = correctAnswer
                    state.score += 1 // Give partial credit
                }
            } else {
                state.score += 1
            }
        },
        nextQuestion: (state) => {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex += 1
            }
        },
        previousQuestion: (state) => {
            if (state.currentQuestionIndex > 0) {
                state.currentQuestionIndex -= 1
            }
        },
        completeQuiz: (state) => {
            state.completed = true
        },
        retryQuiz: (state) => {
            state.currentQuestionIndex = 0
            state.answers = []
            state.wrongAttempts = {}
            state.score = 0
            state.completed = false
        },
        resetQuiz: (state) => {
            return {
                ...state,
                currentQuiz: null,
                quizType: null,
                quizId: null,
                questions: [],
                currentQuestionIndex: 0,
                answers: [],
                wrongAttempts: {},
                score: 0,
                totalQuestions: 0,
                completed: false
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuiz.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchQuiz.fulfilled, (state, action) => {
                state.loading = false
                const { type, id, quiz } = action.payload
                state.currentQuiz = quiz
                state.quizType = type
                state.quizId = id
                state.questions = quiz.questions || []
                state.totalQuestions = quiz.questions?.length || 0
                state.currentQuestionIndex = 0
                state.answers = []
                state.wrongAttempts = {}
                state.score = 0
                state.completed = false
            })
            .addCase(fetchQuiz.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const {
    answerQuestion,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    retryQuiz,
    resetQuiz
} = quizSlice.actions

// Selectors
export const selectCurrentQuiz = (state) => state.quiz.currentQuiz
export const selectQuestions = (state) => state.quiz.questions
export const selectCurrentQuestion = (state) =>
    state.quiz.questions[state.quiz.currentQuestionIndex]
export const selectCurrentQuestionIndex = (state) => state.quiz.currentQuestionIndex
export const selectQuizScore = (state) => state.quiz.score
export const selectQuizCompleted = (state) => state.quiz.completed
export const selectWrongAttempts = (questionIndex) => (state) =>
    state.quiz.wrongAttempts[questionIndex] || 0
export const selectQuizLoading = (state) => state.quiz.loading

export default quizSlice.reducer
