import { configureStore } from '@reduxjs/toolkit';
import filtersSlice from './slice/filtersSlice';
import JobSlice from './slice/JobSlice';
import skillsSlice from './slice/skillsSlice';

export const store = configureStore({
  reducer: {
    job: JobSlice,
    filters: filtersSlice,
    skills: skillsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
