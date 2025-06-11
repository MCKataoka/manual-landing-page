import {createAsyncThunk} from "@reduxjs/toolkit";
import {QuizData} from "@/store/quiz/@types";

export const fetchQuizData = createAsyncThunk(
    'quiz/fetchQuizData',
    async () => {
        const response = await fetch('/api/quiz');
        if (!response.ok) {
            throw new Error('Failed to fetch quiz data');
        }
        const data: QuizData = await response.json();
        return data;
    }
);