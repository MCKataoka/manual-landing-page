import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import quizReducer from '@/store/quiz/slice';
import QuizModal from '@/components/quiz/QuizModal';

global.fetch = jest.fn();

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

const createMockStore = (initialState = {}) => {
    const store = configureStore({
        reducer: {
            quiz: quizReducer
        },
        preloadedState: {
            quiz: {
                quizData: mockQuizData,
                currentQuestionIndex: 0,
                answers: [],
                isLoading: false,
                error: null,
                isQuizOpen: true,
                isComplete: false,
                hasRejection: false,
                ...initialState
            }
        }
    });
    return store;
};

const QuizWithProvider = ({ store }: { store: any }) => (
    <Provider store={store}>
        <QuizModal />
    </Provider>
);

describe('Quiz Flow Integration', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockQuizData)
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Quiz Rendering', () => {
        it('should render quiz when open', () => {
            const store = createMockStore();
            render(<QuizWithProvider store={store} />);

            expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
            expect(screen.getByText('Which image best matches your hair loss?')).toBeInTheDocument();
        });

        it('should not render quiz when closed', () => {
            const store = createMockStore({ isQuizOpen: false });
            const { container } = render(<QuizWithProvider store={store} />);

            expect(container.firstChild).toBeNull();
        });

        it('should render question options', () => {
            const store = createMockStore();
            render(<QuizWithProvider store={store} />);

            expect(screen.getByText('Temples')).toBeInTheDocument();
            expect(screen.getByText('Patchy')).toBeInTheDocument();
        });
    });

    describe('Quiz Navigation', () => {
        it('should disable Previous button on first question', () => {
            const store = createMockStore();
            render(<QuizWithProvider store={store} />);

            const previousButton = screen.getByRole('button', { name: /previous/i });
            expect(previousButton).toBeDisabled();
        });

        it('should disable Next button without answer', () => {
            const store = createMockStore();
            render(<QuizWithProvider store={store} />);

            const nextButton = screen.getByRole('button', { name: /next/i });
            expect(nextButton).toBeDisabled();
        });

        it('should navigate to next question', async () => {
            const user = userEvent.setup();
            const store = createMockStore();
            render(<QuizWithProvider store={store} />);

            const templesOption = screen.getByText('Temples');
            await user.click(templesOption);

            const nextButton = screen.getByRole('button', { name: /next/i });
            await user.click(nextButton);


            await waitFor(() => {
                expect(screen.getByText('Question 2 of 2')).toBeInTheDocument();
                expect(screen.getByText('Have you been diagnosed with prostate cancer?')).toBeInTheDocument();
            });
        });

        it('should navigate back to previous question', async () => {
            const user = userEvent.setup();
            const store = createMockStore({ currentQuestionIndex: 1 });
            render(<QuizWithProvider store={store} />);

            const previousButton = screen.getByRole('button', { name: /previous/i });
            await user.click(previousButton);

            await waitFor(() => {
                expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
            });
        });
    });

    describe('Quiz Completion', () => {
        it('should show rejection result for rejection answer', async () => {
            const user = userEvent.setup();
            const store = createMockStore();
            render(<QuizWithProvider store={store} />);

            // Select rejection answer
            const patchyOption = screen.getByText('Patchy');
            await user.click(patchyOption);

            await waitFor(() => {
                expect(screen.getByText('Not Eligible')).toBeInTheDocument();
                expect(screen.getByText(/Unfortunately, we are unable to prescribe/)).toBeInTheDocument();
            });
        });

        it('should show success result for completing without rejection', async () => {
            const store = createMockStore({
                isComplete: true,
                hasRejection: false
            });
            render(<QuizWithProvider store={store} />);

            expect(screen.getByText('Congratulations!')).toBeInTheDocument();
            expect(screen.getByText(/Great news! We have the perfect treatment/)).toBeInTheDocument();
        });

    });

    describe('Quiz Close', () => {

        it('should close quiz when close button clicked', async () => {
            const user = userEvent.setup();
            const store = createMockStore();
            const { container } = render(<QuizWithProvider store={store} />);

            const closeButton = screen.getByRole('button', { name: '✕' });
            await user.click(closeButton);

            await waitFor(() => {
                expect(container.firstChild).toBeNull();
            });
        });
    });

});