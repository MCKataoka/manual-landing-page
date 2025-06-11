// src/__tests__/components/HeroSection.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Mock dependencies
jest.mock('../../constants/colors', () => ({
    colors: {
        primary: { green: '#2c5530' },
        text: { primary: '#0B3B3C' },
        background: { mobileHero: '#a1b89e' }
    }
}));

jest.mock('../../store/quiz/actions', () => ({
    fetchQuizData: jest.fn(() => ({ type: 'quiz/fetchQuizData' }))
}));

jest.mock('../../components/ui/Button', () => {
    return function MockButton({ children, onClick }: any) {
        return <button onClick={onClick}>{children}</button>;
    };
});

describe('HeroSection Component', () => {
    const HeroSection = require('../../components/sections/HeroSection').default;
    const { fetchQuizData } = require('../../store/quiz/actions');

    const createMockStore = () => configureStore({
        reducer: {
            quiz: (state = { isQuizOpen: false }, action) => {
                if (action.type === 'quiz/openQuiz') {
                    return { ...state, isQuizOpen: true };
                }
                return state;
            }
        }
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the main heading', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <HeroSection />
            </Provider>
        );

        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
        expect(screen.getByText(/Be good/)).toBeInTheDocument();
        expect(screen.getByText(/to yourself/)).toBeInTheDocument();
    });

    it('renders the subtext', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <HeroSection />
            </Provider>
        );

        expect(screen.getByText(/We're working around the clock to bring you a holistic approach/)).toBeInTheDocument();
    });

    it('renders the quiz button', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <HeroSection />
            </Provider>
        );

        const button = screen.getByRole('button', { name: /take the quiz/i });
        expect(button).toBeInTheDocument();
    });

    it('fetches quiz data on mount', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <HeroSection />
            </Provider>
        );

        expect(fetchQuizData).toHaveBeenCalledTimes(1);
    });

    it('dispatches openQuiz when button is clicked', async () => {
        const store = createMockStore();
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        const user = userEvent.setup();

        render(
            <Provider store={store}>
                <HeroSection />
            </Provider>
        );

        const button = screen.getByRole('button', { name: /take the quiz/i });
        await user.click(button);

        expect(dispatchSpy).toHaveBeenCalledWith({ type: 'quiz/openQuiz' });
    });

    it('button click works without crashing', async () => {
        const user = userEvent.setup();
        const store = createMockStore();

        render(
            <Provider store={store}>
                <HeroSection />
            </Provider>
        );

        const button = screen.getByRole('button', { name: /take the quiz/i });

        await expect(user.click(button)).resolves.not.toThrow();
        expect(button).toBeInTheDocument();
    });

    it('has proper accessibility structure', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <HeroSection />
            </Provider>
        );

        const heading = screen.getByRole('heading', { level: 1 });
        const button = screen.getByRole('button');

        expect(heading).toBeInTheDocument();
        expect(button).not.toBeDisabled();
    });

    it('renders all content elements together', () => {
        const store = createMockStore();
        render(
            <Provider store={store}>
                <HeroSection />
            </Provider>
        );

        // Check that all main elements are present
        expect(screen.getByRole('heading')).toBeInTheDocument();
        expect(screen.getByText(/holistic approach/)).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});