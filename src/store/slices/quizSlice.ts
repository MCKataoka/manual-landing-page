import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { QuizState, QuizData, QuizOption } from '@/types/quiz';

export const fetchQuizData = createAsyncThunk(
    'quiz/fetchQuizData',
    async () => {
        // Use our API route instead of the external URL
        const response = await fetch('/api/quiz');
        if (!response.ok) {
            throw new Error('Failed to fetch quiz data');
        }
        const data: QuizData = await response.json();
        return data;
    }
);

const initialState: QuizState = {
    quizData: null,
    currentQuestionIndex: 0,
    answers: [],
    isLoading: false,
    error: null,
    isQuizOpen: false,
    isComplete: false,
    hasRejection: false,
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        openQuiz: (state) => {
            state.isQuizOpen = true;
        },
        closeQuiz: (state) => {
            state.isQuizOpen = false;
            state.currentQuestionIndex = 0;
            state.answers = [];
            state.isComplete = false;
            state.hasRejection = false;
        },
        selectAnswer: (state, action: PayloadAction<QuizOption>) => {
            const currentAnswer = {
                questionIndex: state.currentQuestionIndex,
                selectedOption: action.payload,
            };

            // Remove existing answer for current question if it exists
            state.answers = state.answers.filter(
                (answer) => answer.questionIndex !== state.currentQuestionIndex
            );

            // Add new answer
            state.answers.push(currentAnswer);

            // Check for rejection
            if (action.payload.isRejection) {
                state.hasRejection = true;
                state.isComplete = true;
            }
        },
        nextQuestion: (state) => {
            if (state.quizData && state.currentQuestionIndex < state.quizData.questions.length - 1) {
                state.currentQuestionIndex += 1;
            } else {
                state.isComplete = true;
            }
        },
        previousQuestion: (state) => {
            if (state.currentQuestionIndex > 0) {
                state.currentQuestionIndex -= 1;
            }
        },
        goToQuestion: (state, action: PayloadAction<number>) => {
            if (state.quizData && action.payload >= 0 && action.payload < state.quizData.questions.length) {
                state.currentQuestionIndex = action.payload;
                state.isComplete = false;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchQuizData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.quizData = action.payload;
            })
            .addCase(fetchQuizData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch quiz data';
            });
    },
});

export const {
    openQuiz,
    closeQuiz,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
} = quizSlice.actions;

export default quizSlice.reducer;