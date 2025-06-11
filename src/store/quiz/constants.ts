import {QuizState} from "@/store/quiz/@types";

export const QUIZ_INITIAL_STATE: QuizState = {
    quizData: null,
    currentQuestionIndex: 0,
    answers: [],
    isLoading: false,
    error: null,
    isQuizOpen: false,
    isComplete: false,
    hasRejection: false,
};