import { createSlice } from '@reduxjs/toolkit';
import * as reducers from './reducers';
import { QUIZ_INITIAL_STATE } from "@/store/quiz/constants";
import { fetchQuizData } from "@/store/quiz/actions";

const initialState = QUIZ_INITIAL_STATE;

const slice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        ...reducers,
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
} = slice.actions;

export default slice.reducer;