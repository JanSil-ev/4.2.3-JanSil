import { configureStore} from '@reduxjs/toolkit';

import JobSlice from "./slice/JobSlice"


export const store = configureStore({
    reducer: {
        job: JobSlice
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch