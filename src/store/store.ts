import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../slices/tasksSlice';

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => store.dispatch;
export default store;
