import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/types';

interface TasksState {
    tasks: Task[];
    filteredTasks: Task[];
}

const initialState: TasksState = {
    tasks: [],
    filteredTasks: [],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<Task>) {
            state.tasks.push(action.payload);
            state.filteredTasks.push(action.payload);
        },
        editTask(state, action: PayloadAction<Task>) {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
                state.filteredTasks[index] = action.payload;
            }
        },
        deleteTask(state, action: PayloadAction<string>) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            state.filteredTasks = state.filteredTasks.filter(task => task.id !== action.payload);
        },
        filterTasks(state, action: PayloadAction<Partial<Task>>) {
            const filter = action.payload;
            state.filteredTasks = state.tasks.filter(task =>
                (filter.title ? task.title.includes(filter.title) : true) &&
                (filter.status ? task.status === filter.status : true) &&
                (filter.priority ? task.priority === filter.priority : true)
            );
        },
    },
});

export const { addTask, editTask, deleteTask, filterTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
