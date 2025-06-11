import { configureStore } from '@reduxjs/toolkit';
import quizReducer, {
    openQuiz,
    closeQuiz,
    selectAnswer,
    nextQuestion,
    previousQuestion
} from '@/store/quiz/slice';

const mockQuizData = {
    questions: [
        {
            question: "Which image best matches your hair loss?",
            type: "ChoiceType",
            options: [
                {
                    display: "Temples",
                    value: "Temples",
                    isRejection: false
                },
                {
                    display: "Patchy",
                    value: "Patchy",
                    isRejection: true
                }
            ]
        },
        {
            question: "Have you been diagnosed with prostate cancer?",
            type: "ChoiceType",
            options: [
                {
                    display: "Yes",
                    value: true,
                    isRejection: true
                },
                {
                    display: "No",
                    value: false,
                    isRejection: false
                }
            ]
        }
    ]
};

describe('Quiz Redux Slice', () => {
    let store: any;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                quiz: quizReducer
            }
        });
    });

    // Test initial state
    it('should have correct initial state', () => {
        const state = store.getState().quiz;
        expect(state).toEqual({
            quizData: null,
            currentQuestionIndex: 0,
            answers: [],
            isLoading: false,
            error: null,
            isQuizOpen: false,
            isComplete: false,
            hasRejection: false,
        });
    });

    // Test openQuiz action
    describe('openQuiz', () => {
        it('should open the quiz', () => {
            store.dispatch(openQuiz());
            const state = store.getState().quiz;
            expect(state.isQuizOpen).toBe(true);
        });
    });

    // Test closeQuiz action
    describe('closeQuiz', () => {
        it('should close the quiz and reset state', () => {
            // First open quiz and add some state
            store.dispatch(openQuiz());
            store.dispatch(selectAnswer({ display: "Test", value: "test", isRejection: false }));

            // Then close it
            store.dispatch(closeQuiz());

            const state = store.getState().quiz;
            expect(state.isQuizOpen).toBe(false);
            expect(state.currentQuestionIndex).toBe(0);
            expect(state.answers).toEqual([]);
            expect(state.isComplete).toBe(false);
            expect(state.hasRejection).toBe(false);
        });
    });

    // Test selectAnswer action
    describe('selectAnswer', () => {
        beforeEach(() => {
            // Set up quiz with mock data
            store.dispatch({ type: 'quiz/fetchQuizData/fulfilled', payload: mockQuizData });
        });

        it('should select a non-rejection answer', () => {
            const option = { display: "Temples", value: "Temples", isRejection: false };
            store.dispatch(selectAnswer(option));

            const state = store.getState().quiz;
            expect(state.answers).toHaveLength(1);
            expect(state.answers[0]).toEqual({
                questionIndex: 0,
                selectedOption: option
            });
            expect(state.hasRejection).toBe(false);
            expect(state.isComplete).toBe(false);
        });

        it('should select a rejection answer and complete quiz', () => {
            const option = { display: "Patchy", value: "Patchy", isRejection: true };
            store.dispatch(selectAnswer(option));

            const state = store.getState().quiz;
            expect(state.answers).toHaveLength(1);
            expect(state.hasRejection).toBe(true);
            expect(state.isComplete).toBe(true);
        });
    });

    // Test nextQuestion action
    describe('nextQuestion', () => {
        beforeEach(() => {
            store.dispatch({ type: 'quiz/fetchQuizData/fulfilled', payload: mockQuizData });
        });

        it('should advance to next question', () => {
            store.dispatch(nextQuestion());
            const state = store.getState().quiz;
            expect(state.currentQuestionIndex).toBe(1);
        });

        it('should complete quiz on last question', () => {
            // Go to last question
            store.dispatch(nextQuestion());
            expect(store.getState().quiz.currentQuestionIndex).toBe(1);

            store.dispatch(nextQuestion());
            const state = store.getState().quiz;

            expect(state.isComplete).toBe(true);
        });
    });

    describe('previousQuestion', () => {
        beforeEach(() => {
            store.dispatch({ type: 'quiz/fetchQuizData/fulfilled', payload: mockQuizData });
            store.dispatch(nextQuestion()); // Start at question 1
        });

        it('should go back to previous question', () => {
            store.dispatch(previousQuestion());
            const state = store.getState().quiz;
            expect(state.currentQuestionIndex).toBe(0);
        });

        it('should not go below question 0', () => {
            store.dispatch(previousQuestion()); // Back to 0
            store.dispatch(previousQuestion()); // Try to go below 0

            const state = store.getState().quiz;
            expect(state.currentQuestionIndex).toBe(0);
        });
    });

    describe('Quiz Completion', () => {
        beforeEach(() => {
            store.dispatch({ type: 'quiz/fetchQuizData/fulfilled', payload: mockQuizData });
        });

        it('should complete quiz with rejection', () => {
            const rejectionOption = { display: "Yes", value: true, isRejection: true };
            store.dispatch(selectAnswer(rejectionOption));

            const state = store.getState().quiz;
            expect(state.isComplete).toBe(true);
            expect(state.hasRejection).toBe(true);
        });

        it('should complete quiz without rejection', () => {
            // Answer first question (non-rejection)
            store.dispatch(selectAnswer({ display: "Temples", value: "Temples", isRejection: false }));
            store.dispatch(nextQuestion());

            // Answer second question (non-rejection)
            store.dispatch(selectAnswer({ display: "No", value: false, isRejection: false }));
            store.dispatch(nextQuestion());

            const state = store.getState().quiz;
            expect(state.isComplete).toBe(true);
            expect(state.hasRejection).toBe(false);
        });
    });
});