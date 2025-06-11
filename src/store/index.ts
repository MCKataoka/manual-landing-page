import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './quiz/slice';

export const store = configureStore({
    reducer: {
        quiz: quizReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export a type that includes thunk actions
export type AppThunk<ReturnType = void> = (
    dispatch: AppDispatch,
    getState: () => RootState
) => ReturnType;