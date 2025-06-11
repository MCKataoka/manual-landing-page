import {PayloadAction} from "@reduxjs/toolkit/dist";
import {QuizOption, QuizState} from "@/store/quiz/@types";


export function openQuiz(state: QuizState): void {
        state.isQuizOpen = true;
}

export function closeQuiz(state: QuizState): void {
    state.isQuizOpen = false;
    state.currentQuestionIndex = 0;
    state.answers = [];
    state.isComplete = false;
    state.hasRejection = false;
}

export function selectAnswer(state: QuizState, action: PayloadAction<QuizOption>): void {
    const currentAnswer = {
        questionIndex: state.currentQuestionIndex,
        selectedOption: action.payload,
    };

    state.answers = state.answers.filter(
        (answer) => answer.questionIndex !== state.currentQuestionIndex
    );

    state.answers.push(currentAnswer);

    if (action.payload.isRejection) {
        state.hasRejection = true;
        state.isComplete = true;
    } else {
        nextQuestion(state);
    }
}

export function nextQuestion(state: QuizState): void {
    if (state.quizData && state.currentQuestionIndex < state.quizData.questions.length - 1) {
        state.currentQuestionIndex += 1;
    } else {
        state.isComplete = true;
    }
}

export function previousQuestion(state: QuizState): void {
    if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
    }
}
