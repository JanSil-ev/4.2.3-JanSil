import { fetchData } from '@/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ky from 'ky';


interface initialStateType {
  data: fetchData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: initialStateType = {
  data: null,
  isLoading: false,
  error: null,
};

export const fetchJob = createAsyncThunk(
  'product/fetchJob', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await ky.get('https://api.hh.ru/vacancies?industry=7&professional_role=96&per_page=10');
      const json = await response.json() as fetchData;
      console.log(json);
      console.log(3)
      return json;
    } catch (error) {
      return rejectWithValue('Failed to fetch job');
    }
  }
);

const JobSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchJob.fulfilled,
        (state, action: PayloadAction<fetchData>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default JobSlice.reducer;