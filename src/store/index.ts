import { configureStore } from '@reduxjs/toolkit';
import filtersSlice from './slice/filtersSlice';
import JobSlice from './slice/JobSlice';
import searchReducer from './slice/searchSlice';
import skillsSlice from './slice/skillsSlice';

export const store = configureStore({
  reducer: {
    job: JobSlice,
    filters: filtersSlice,
    skills: skillsSlice,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
