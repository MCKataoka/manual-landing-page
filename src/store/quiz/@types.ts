export interface QuizOption {
    display: string;
    value: string | boolean;
    isRejection: boolean;
}

export interface QuizQuestion {
    question: string;
    type: string;
    options: QuizOption[];
}

export interface QuizData {
    questions: QuizQuestion[];
}

export interface QuizAnswer {
    questionIndex: number;
    selectedOption: QuizOption;
}

export interface QuizState {
    quizData: QuizData | null;
    currentQuestionIndex: number;
    answers: QuizAnswer[];
    isLoading: boolean;
    error: string | null;
    isQuizOpen: boolean;
    isComplete: boolean;
    hasRejection: boolean;
}